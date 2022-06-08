import Flash from "../../res/shader/effectHit/Flash";
import ProductKey from "../../zsLibs/template/ProductKey";
import { app } from "../app";
import ItemHelper from "../common/ItemHelper";
import { JsonModule } from "../core/conf/ClientConfigMgr";

import { EnemyAniType, EventName, GM, player_deault_attr, RoleState, SoundName } from "../Defines";
import DropMgr from "./DropMgr";
import FightHelper from "./FightHelper";
import EffectMng from "./mng/EffectMng";
import Player from "./role/Player";

const {ccclass, property} = cc._decorator;

/**
 * 怪物类
 */
@ccclass
export default class Enemy extends cc.Component {

    @property({type:cc.Enum(EnemyAniType)})
    aniType:EnemyAniType = EnemyAniType.animation;

    private _flash:Flash = null;

    private _target:Player = null;

    private _moveDir:cc.Vec2 = null;

    private _state:RoleState = null;

    private _isDie:boolean = false;
    private _inView:boolean = false;
    get isDie() {
        return this._isDie;
    }


    private _anim:cc.Animation = null;

    private _spine:sp.Skeleton = null;

    private _curFbCfg:JsonModule.IFbconfig = null;
    
    private _hp:number = 0;
    private _attack:number = 0;
    private _moveSpeed = 0;
    private _liveTime: number = 0;
    private _atkTime:number = 0;
    private _atkInterval:number = 0;

    exp:number = 0;

    private _mstVo:JsonModule.IMonsterJson = null;

    private _isUltDie:boolean = false;  //是否大招清理

    private _isFreeze:boolean = false; //冰冻状态

    private _dropId:number = 0;

    private _lifeTime:number = 0;

    hurtPid:number =1; //击杀标识

    initial(target:Player,fbMonster) {
        this._target = target;
        this._curFbCfg =  app.confMgr.conf.fbconfig.getConfById(fbMonster.fid);
        this._dropId = this._curFbCfg.monster_drop;
        this._lifeTime = this._curFbCfg.monster_lifetime;
        this._mstVo = app.confMgr.conf.monster.getConfById(fbMonster.mid);

        this._state = RoleState.Move;
        this._isFreeze = false;
        this.hurtPid =1;

        if(this.aniType == EnemyAniType.sprite){
            this._flash = this.node.getComponent(Flash);
        }else if(this.aniType == EnemyAniType.animation){
            this._anim = this.node.children[0].getComponent(cc.Animation);
            this._anim.play(`anim_${this._anim.node.name}_move`);
            this._anim.on('finished', this.onAnimFinish, this);
            this._flash = this.node.getComponentInChildren(Flash);        
        }else if(this.aniType == EnemyAniType.spine){
            let spNode = this.node.children[0];
            this._flash = spNode.getComponent(Flash);
            this._spine = spNode.getComponent(sp.Skeleton);
            this._spine && this._spine.setAnimation(0,'go',true);
            this._spine.setCompleteListener((e)=>{
                this.onSpineEndEvt(e);
            })     
        }

        if(app.dataMgr.battleData.isFreezeBuff) {
            this.hitFreeze();
        }
        this.initAttribute();
    }


    get inView(){
        return this._inView;
    }

    get atkVal(){
        return this._attack;
    }

    get hp(){
        return this._hp;
    }

    get isUltDie(){
        return this._isUltDie;
    }

    set isUltDie(v:boolean){
        this._isUltDie = v;
    }

    //基础属性初始
    private initAttribute() {
        this._atkInterval = 0.5;
    
        const lv = this._curFbCfg.monster_level - 1;
        this._hp = (this._mstVo.base_hp + this._mstVo.hp_factor * lv) * this._curFbCfg.monster_factor;

        this._attack = (this._mstVo.base_atk + this._mstVo.atk_factor * lv) * this._curFbCfg.monster_factor;

        this._moveSpeed = this._mstVo.base_speed * player_deault_attr.enemySpeed;
        this.exp = this._curFbCfg.monster_exp;
    }

    onDisable() {
        this._anim && this._anim.off('finished', this.onAnimFinish,this);
    }

    gameUpdate(dt) {
        if(this._isDie){
            return;
        }

        this._inView  = this.isInView();

        if(app.dataMgr.battleData.isFreezeBuff) return;   
        if(this._mstVo.base_atk == 0){  //火把怪物 停止
            return;
        } 

        //存活时间结束
        if(this._lifeTime > 0) {
            this._liveTime +=dt;
            if(this._liveTime >= this._lifeTime) {
                if(!this._inView) {
                    this._isDie = true;
                    app.gameMgr.waveMng.recycleEnemy(this);
                   // app.eventMgr.emit(EventName.enemy_death, this);
                    console.log('怪物存活时间死亡')
                    return;
                }
            }
        }

        this.move();
        this._atkTime += dt;
        if(this._atkTime >= this._atkInterval) {
            this._atkTime = 0;
            this.attack();
        }
    }

    /**
     * 
     * @param val -1时，表示技能清除，不掉落道具
     * @param tag // 技能
     */
    updateHp(val:number, tag?:cc.Node) {
      
        if(this.isUltDie) {
            this._hp = 0;
        }else{
            this._hp += val;
            FightHelper.ins.playHitSound(); 
        }
        if(this._hp <= 0) {
            this._isDie = true;
        }
      
        EffectMng.Instance.playHp(this.node, val,false);
        !app.dataMgr.battleData.isFreezeBuff && this._flash.hitFlash();
        if(tag) {
            const oldPos = cc.v2();
            this.node.getPosition(oldPos);
            let dir = tag.getPosition().sub(oldPos).normalize();
            let dist = this._mstVo.bae_resist * 10;
            const newPos = oldPos.sub(dir.mul(dist));
            cc.tween(this.node).to(0.1, {position: new cc.Vec3(newPos.x, newPos.y, 0)}).call(()=>{
                this._isDie && this.death();
            }).start();
        }else{
            this.death();
        }
    }

    //冰冻受击
    hitFreeze() {

        if(this._isFreeze){
            return;
        }
        this._isFreeze = true;
        this._flash.setFreezeColor();
        this._anim && this._anim.pause();
        this._spine && (this._spine.timeScale =0);

    }
    //清楚冰冻
    clearFreeze() {
        this._isFreeze = false;
        this._flash.clear();
        this._anim && this._anim.resume();
        this._spine && (this._spine.timeScale =1);
    }

    private move() {
        this._moveDir = this._target.node.getPosition().sub(this.node.getPosition()).normalize();

        const oldPos = cc.v2();
        this.node.getPosition(oldPos);
        const newPos = oldPos.add(this._moveDir.mul(this._moveSpeed / 120 * GM.enemyMoveScale));
        this.node.setPosition(newPos);

        if(this._moveDir.x !== 0) {
            this.node.scaleX = this._moveDir.x > 0 ? -1: 1;
        }
    }

    //攻击检测
    private attack() {
        if(!this._inView){
            return;
        }
        const dist = this.node.getPosition().sub(this._target.node.getPosition()).mag();
        if (Math.abs(dist) <= (this.node.width + this._target.node.height) * 0.5) {
            let hurt = FightHelper.ins.enemyAtkPlayer(this,this._target);
            this._target.updateHp(-hurt);
        }
    }

    //掉落逻辑
    private checkDropout() {
        DropMgr.ins.dropItem(this.node, this._dropId);
    }


    private onAnimFinish(evt, state:cc.AnimationState){
        if(state.clip.name.indexOf('die') > -1) {
            this.deathFinish();
        }
    }

    onSpineEndEvt(e:sp.spine.TrackEntry){

        if(e.animation.name == 'die'){
            this.deathFinish();
            ItemHelper.checkEnemyDie(this._mstVo.id);
        }
    }

    public death() {
        
        if(this._isFreeze){ // 冰冻状态死亡
            this.clearFreeze();
        }  

        if(this.aniType == EnemyAniType.sprite){
           this.deathFinish();
        }else if(this.aniType == EnemyAniType.animation){
            if(ProductKey.zs_switch){
                this._anim.play(`anim_${this._anim.node.name}_die`);
            }else{
                this.deathFinish();
            }
        }else if(this.aniType == EnemyAniType.spine){

            this._spine.setAnimation(0,'die',false);
        }

    }

    /**死亡结束 移除 */
    deathFinish(){      
        !this._isUltDie && this.checkDropout();
        app.eventMgr.emit(EventName.enemy_death, this,this.hurtPid);
    }

    getCollisionData(){
        let rect:cc.Rect = this.node.getBoundingBoxToWorld();
        return {x:rect.x, y:rect.y,height:rect.height,width:rect.width,rect:rect,collider:this};
    }

    private isInView() {
        return app.gameMgr.camera.isInView(this.node);
    }
}

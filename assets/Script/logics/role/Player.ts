import Flash from "../../../res/shader/effectHit/Flash";
import { app } from "../../app";
import { resLoader } from "../../core/resLoad/ResLoader";
import { RoleState, EventName, BoundNameEnum, SoundName, Item_type, GM } from "../../Defines";
import BattleRoleData, { Skill } from "../BattleRoleData";
import Enemy from "../Enemy";
import GameCtrl from "../GameCtrl";
import EffectMng from "../mng/EffectMng";
import PropItem from "../DropItem";
import RoleSkill from "../skill/RoleSkill";

import RoleMove from "./RoleMove";
import SkillBasic from "../skillEntity/SkillBasic";
import FightHelper from "../FightHelper";
import DropMgr from "../DropMgr";
import ItemHelper from "../../common/ItemHelper";

const {
    ccclass,
    property
} = cc._decorator;

/**
 * 玩家角色
 */
@ccclass
export default class Player extends RoleMove {
    @property(cc.ProgressBar) barHp: cc.ProgressBar = null;

    private _skills:RoleSkill[] = null;

    /** 大招*/
    private _ultskills:SkillBasic[] = null;

    private _trySuperSkill:RoleSkill = null;
    
    
    private _root:cc.Node = null;

    private _flash:Flash = null;

    private _godTimer:number = 0;

    private _frame:number =0;

    initial(btData:BattleRoleData) {

        super.initial(btData);
        this._root = this.node.parent;
        this._skills = [];
        this._ultskills = [];
    
        this._flash = this.dirNode.getComponent(Flash);

        this.initAttribute();

        app.eventMgr.on(EventName.player_click_die,this.gmDeath,this);
    }

    gmDeath(pid){
        pid == this.btRoleData.pid && this.death();
    }

    onDestroy(): void {
        super.onDestroy();
        app.eventMgr.off(EventName.player_click_die,this.gmDeath,this);
    }

    initAttribute() {
        //设置初始位置
        let pid = this.btRoleData.pid;
        if(ItemHelper.isDoubleMode()){
            let flag:cc.Node = this.node.getChildByName('P' +pid );
            flag && (flag.active = true);
            this.node.x = pid ==1 ?-150:150;

        }else{
            this.node.x = 0;
        }

        /**初始技能 */
        this.btRoleData.skills.forEach(skill =>{

            this.addSkill(skill)
        })

        this.updateHpBar();
    }

    gameUpdate(dt) {
        super.gameUpdate(dt);
        if(this.btRoleData.curHp <= 0) return;

        this._godTimer -= dt;

        //可优化帧率检测
        this._skills.forEach(skill => {
            skill.gameUpdate(dt);
        });

        if(this._trySuperSkill){
            this._trySuperSkill.gameUpdate(dt);
        }

        for (let i = this._ultskills.length - 1; i >= 0; i--) {
            let skill:SkillBasic = this._ultskills[i];
            if(skill.isEnd) {
                this._ultskills.splice(i, 1);
            }else{
                skill.gameUpdate(dt);
            }
        }

        this._frame ++;
        if(this._frame % 6 ==0){
            this.checkPropItem();
        }
        // this.checkBoxArrows();
    }
    
    /**宝箱箭头刷新 */
    checkBoxArrows(){
        app.gameMgr.dropCon.children.forEach(node=>{
            const item:PropItem = node.getComponent(PropItem);
            if(item && item.itemData && item.itemData.item_type == Item_type.goodBox){
                item.updateArrowsPos(this.node);
            }
        })
    }

    private checkPropItem() {

        //可优化帧率检测
        let pickRang = this.btRoleData.getPickRange();      
        app.gameMgr.dropCon.children.forEach(node=>{
            let dist = this.node.getPosition().sub(node.getPosition()).mag();         
 
            if(dist<=pickRang) {
                let item:PropItem = node.getComponent(PropItem);
                if(item && !item.flying){
                    if(!item.isGoodBox() || dist< 25){
                        let topos:cc.Vec2 = this.node.getPosition();
                        item.fly(topos,(itemData)=>{
                            DropMgr.ins.meetDropItem(this.btRoleData.pid,itemData.id);
                        });
                    }

                }
            }
        })
    }

    /**添加技能 */
    addSkill(data:Skill) {
        let conf = app.confMgr.getSkillConf(data.conf.skill_weapon);
        if(conf){
            let rs = new conf.cls(data, this);
            this._skills.push(rs);
        }
    }

    freshSkill(skill:Skill,tp:number){
      
        if(tp==1){  //更新
            let findSkill = this._skills.find(s =>{
                return s.skillData.conf.union_id == skill.conf.union_id;
            })
            findSkill && findSkill.freshSkillData(skill);
        }else if(tp==2){

            this.addSkill(skill);
        }
    }

    /**设置超武 */
    setTrySuper(skill:Skill,tp:number){
        if(skill){
            let conf = app.confMgr.getSkillConf(skill.conf.skill_weapon);
            if(conf){
                let rs = new conf.cls(skill, this);
                this._trySuperSkill = rs;
            }
        }else{
            if(this._trySuperSkill){
                this._trySuperSkill.clear();
            }
            this._trySuperSkill = null;
        }
    }


    /**buff 技能刷新 */
    freshBuffSkill(buff:Skill,tp:number){
      
        this._skills.forEach(s =>{
            s.freshSkillData(s.skillData);
        })
    }

    removeSkill(id:number){
        let skills = this._skills;
        for(let i=0;i<skills.length;i++){         
            if(skills[i].skillData.conf.id == id){

                skills[i].clear();
                skills.splice(i,1)
                break;
            }
        }
    }


    /** 大招*/
    releaseUlt(sId:number) {
        let obj = {100049:'AY3',100045:'AY2',100044:'AY1'};
        resLoader.loadRes<cc.Prefab>(BoundNameEnum.subBattle,'skill/'+obj[sId]).then(prefab=>{
            let node:cc.Node = cc.instantiate(prefab);
            let parent = cc.find('Canvas/effectNode');
            parent.addChild(node);

            node.setSiblingIndex(0);
            let skill:SkillBasic = node.getComponent(SkillBasic);
            skill.bigInit(this);

            this._ultskills.push(skill);
        })
    }

    /**血量更改刷新 */
    freshHpChange(val:number){
        this.updateHpBar();
        EffectMng.Instance.playHp(this.node,val);
    }


    updateHp(val:number=1) {
        if(GM.playerInvincible){
            return;
        }
        if(this._godTimer > 0) return;
        this.btRoleData.addHp(val);
        this.freshHpChange(val);

        if(this.btRoleData.curHp <= 0) {
            this.death();
        }else{
            this._flash.hitFlash();
            FightHelper.ins.playHitSound();      
        }
       
    }

    death() {
        this.roleState = RoleState.Die;
        app.audioMgr.playEffect(SoundName.fpx_sfx_sounds_impact9);
        app.eventMgr.emit(EventName.game_pause,true);
        //游戏失败了清理队列
        app.layerMgr.clearAsyncQueue();
        this.scheduleOnce(()=>{
            app.eventMgr.emit(EventName.game_over,{pid:this.btRoleData.pid});
            this._skills.forEach(e =>{
                e.showEff(false);
            });
        },1.3)
    }

    /** 复活*/
    revive(){
        this._godTimer = 3;
        this.roleState = RoleState.Idle;
        this.updateHpBar();
        app.audioMgr.playEffect(SoundName.fpx_relife);
        EffectMng.Instance.playReviveEff(this.node.getPosition());
        
        this._skills.forEach(e =>{
            e.showEff(true);
        });
    }

    private updateHpBar() {
        this.barHp.progress = this.btRoleData.curHp / this.btRoleData.maxHp;
    }
}
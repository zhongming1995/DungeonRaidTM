
import { app } from "../../app";
import Enemy from "../Enemy";
import FightHelper from "../FightHelper";
import Player from "../role/Player";
import RoleSkill from "../skill/RoleSkill";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillBasic extends cc.Component {

    /** 攻击距离*/
    @property({
        type: cc.Float,
        displayName: "攻击距离",
        tooltip: "攻击距离",
    })
    atkDist = 0;

    /** 攻击速度|技能飞行速度*/
    @property({
        type: cc.Float,
        displayName: "攻击速度",
        tooltip: "攻击速度",
    })
    speed = 0;

    /** 攻击持续时间*/
    @property({
        type: cc.Float,
        displayName: "持续时间",
        tooltip: "持续时间",
    })
    duration = 0;

    @property({
        displayName: "单体攻击",
        tooltip: "单体攻击",
    })
    isAtkOne:boolean = false; 

    speedAdd:number = this.speed;
    atkDistAdd:number = this.atkDist;
    durationAdd:number = this.duration;

    /** 当前攻击攻击持续时间*/
    durTimer:number = 0;

    freshFrameNum:number =0;

    isEnd:boolean = false;  //是否结束
    player:Player = null;
    skill:RoleSkill = null;

    m_idx:number =0; //当前第几个
    m_param = null;  //参数有idx 第几段属性

    atackTargets:Enemy[] = []; //攻击过的敌人
    init(skill:RoleSkill,param) { 
        this.skill = skill;
        this.m_param = param || {idx:1};    
        this.isEnd = false;
        this.freshFrameNum = 0;
        this.atackTargets = [];
        this.setIdx(param.idx);
        this.setPlayer(skill.player);
    }

    /**大招初始化 */
    bigInit(player:Player){
        this.isEnd = false;
        this.freshFrameNum = 0;
        this.setPlayer(player);
    }

    setPlayer(player:Player){
        this.player = player;
    }

    setIdx(idx:number){
        this.m_idx = idx;
    }

    get playerFlag(){
        return this.player.btRoleData.pid;
    }

    private _isAtking:boolean = false;
    get isAtking() {
        return this._isAtking;
    }
    set isAtking(val) {
        this._isAtking = val;
    }

    /** 播放*/
    attack() { }

    /**是否命中 */
    checkHit(e:Enemy){
        return false;
    }

    /**获取碰撞区域 */
    getCheckRect(){
        return this.node.getBoundingBoxToWorld();
    }

    /**小技能检测 */
    checkAtkTarget() {

        if(!app.gameMgr)return;
        let rect = this.getCheckRect();
        let finds = app.gameMgr.waveMng.quadTree.retrieve(rect);

       // console.log('finds----------',finds.length);

        for(let i =0;i<finds.length;i++){
            let fe = finds[i];
            let enemy:Enemy = fe.collider;
            if(cc.isValid(enemy) && !enemy.isDie && rect.intersects(fe.rect)){
                if(this.atackTargets.indexOf(enemy)>-1){
                    continue;
                }
                 
                this.hitEnemy(enemy);
                this.atackTargets.push(enemy);

                if(this.isAtkOne && this.atackTargets.length >0){
                    break;
                } 
            }
        }
   
    }
  
    /**命中攻击敌人 */
    hitEnemy(enemy:Enemy){
        let hurt = FightHelper.ins.playerAtkEnemy(this,enemy);
        enemy.hurtPid = this.playerFlag;
        enemy.updateHp(-hurt,this.node);
    }

    gameUpdate(dt){}

    /** 销毁*/
    dispose() { }
}

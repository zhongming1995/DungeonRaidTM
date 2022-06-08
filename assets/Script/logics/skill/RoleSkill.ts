
import { app } from "../../app";
import { skill_conf_type } from "../../core/conf/ClientConfigMgr";
import NodePoolMgr from "../../core/utils/NodePoolMgr";
import { Skill } from "../BattleRoleData";
import EffectMng from "../mng/EffectMng";
import Player from "../role/Player";
import SkillBasic from "../skillEntity/SkillBasic";


export default class RoleSkill{

    private _skillData:Skill = null; //技能数据
    //发射数量
    public launchNum:number = 0;
    
    public curLauchCnt:number =0;  //当前段数 数量
     
    /** 攻击CD时间*/
    public _cdTimer:number = 0;

    /**当前cd 时间 */
    public _timer:number = 0;
    
    public _createTimer:number = 0;  // 创建技能时间

    public _queue:SkillBasic[] = null;
    public player:Player = null;

    curFrame:number =0;
    nextFrame:number =0;

    skillConf:skill_conf_type;
    
    isRelease:boolean = false   //是否释放技能
    constructor(data:Skill, player:Player){
        this.player = player;
        this._timer = 0;
        this._queue = [];
        this.freshSkillData(data);
    }
   

    freshSkillData(data:Skill){
        this._skillData = data; 
        this.skillConf =  app.confMgr.getSkillConf(this.skillData.conf.skill_weapon);
        this.launchNum = data.getAtkCnt();

        let cdNum = Math.max(this.launchNum -1,0)

        this._cdTimer =(this.skillConf.cd + cdNum * this.skillConf.addCd)  * data.getAtdCd(); 

        if(this.launchNum >6){
            this.launchNum =6;
        } 
    }

    get skillData(){
        return this._skillData;
    }

    gameUpdate(dt) {
        this._timer += dt;
        if(this._timer >= this._cdTimer) {
            this._timer = 0;
            this.releaseSkill();;
        }

        let item:SkillBasic
        for (let i = this._queue.length - 1; i >= 0; i--) {
            item = this._queue[i];
            if(item.isEnd) {
                this._queue.splice(i, 1);
                this.recycleSkillEff(item);
            }else{
                item.gameUpdate(dt);
            }
        }
    }

    /**释放技能 */
    releaseSkill(){

    }

    /**释放技能特效 */
    castSkillEff(param:any){
        EffectMng.Instance.castSkillEff(this,param);
    }

    recycleSkillEff(skillEff:SkillBasic){
        NodePoolMgr.ins.putItem(skillEff.node.name,skillEff.node)  
       // console.log('recycleSkillEff-------',skillEff.node)   
    }

    /**移除技能前清除 */
    clear(){
        
        this._queue.forEach(s =>{
            this.recycleSkillEff(s);
        })
        this._queue = [];
    }

    /**显示 隐藏技能 */
    showEff(show:boolean){

    }

}
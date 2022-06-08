// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ProductKey from "../../zsLibs/template/ProductKey";
import { app } from "../app";
import ItemHelper from "../common/ItemHelper";
import { JsonModule } from "../core/conf/ClientConfigMgr";
import { EventName, main_pro_key, main_pro_type,att_val_type,PopupName, max_skill_num,max_buffskill_num,player_deault_attr, BattleModeType } from "../Defines";


/**进入战斗后 角色数据 */
export default class BattleRoleData  {
    /**角色属性*/
    baseAttr:main_pro_type = Object.create(null);  
    
    baseBuffAttr:main_pro_type = Object.create(null);

    dropAddAttr:main_pro_type = Object.create(null); //掉落增加的属性
     /**经验*/
    exp:number =0;

    /**升级经验*/
    maxExp:number =0;
    /**击杀*/
    kill:number =0; 
    /**等级*/
    lvl:number =1;  
    /**金币*/
    gold:number =0;

    /**当前血量*/
    curHp:number = 0;
    /**最大血量*/
    maxHp:number =0;

    /**当前复活次数 */
    reliveCnt:number =0;

    /**默认复活次数 */
    defaultReliveCnt:number =1;

    /**当前武器 */
    skills:Skill[] =[];  //上面栏武器

    trySuperSkill:Skill = null;

    buffers:BufferSkill[] =[] //下面栏buffer

    ultSkill:{[id:number]:{id,cdTime,skNum,cdRefresh}} = {};

    rid:number=1;
    pid:number =1;

    /** 存活时间*/
    liveTimer:number = 1;

    constructor(id:number,pid:number){

        this.pid = pid;
        this.setRoleId(id);
    }

    private setRoleId(id:number){
        this.rid = id;
        this.lvl =1;

        let roleConf = app.confMgr.conf.role.getConfById(id);
        this.addSkill(roleConf.start_skill);
    
        this.freshBaseAttr();
        this.curHp = this.maxHp;
    
        this.ultSkill[100044] = {id:100044,cdTime:0,skNum:1,cdRefresh:30};
        this.ultSkill[100045] = {id:100045,cdTime:0,skNum:1,cdRefresh:30};
        this.ultSkill[100049] = {id:100049,cdTime:0,skNum:1,cdRefresh:30};
    }

    /**每秒 */
    scheduleTime(){
        let recoverHp = this.getAttrByIdx(main_pro_key.recover_all);
        if(recoverHp > 0){
            this.addHp(recoverHp);
        }
    }

    /**拾取范围 */
    getPickRange(){
        let p = this.getAttrByIdx(main_pro_key.pickrange_all);
        return player_deault_attr.pickRange *(1+p);

    }

    /**角色移动速度 */
    getMoveSpeed(){
        let s_add = this.getAttrByIdx(main_pro_key.speed_all);
        return   player_deault_attr.speed * (1+ s_add);
    }

    /**添加超武 */
    addTrySuper(id:number){
        this.trySuperSkill = new Skill(id,this);
        app.eventMgr.emit(EventName.trySuper_fresh,{pid:this.pid,skill:this.trySuperSkill,tp:1});
    }
    /**移除超武 */
    removeTrySuper(){
        this.trySuperSkill = null;
        app.eventMgr.emit(EventName.trySuper_fresh,{pid:this.pid,skill:null,tp:0});
    }

    removeTrySuperSkill(id:number){
        this.trySuperSkill = null;

    }
    /**添加主技能 */
    addSkill(id:number){
        if(this.skills.length >= max_skill_num){
            return;
        }
        let skill = new Skill(id,this);
        this.skills.push(skill);      
        app.eventMgr.emit(EventName.update_skill,{pid:this.pid,skill:skill,tp:2});
        return skill;
        
    }

    /**移除技能 */
    removeSkill(id:number){
        for(let i=this.skills.length-1;i>=0;i--){
            if(this.skills[i].conf.id == id){
                this.skills.splice(i,1);
                app.eventMgr.emit(EventName.remove_skill,{pid:this.pid,id:id});
                break;
            }
        }
    }
    /**添加buff技能 */
    addBuffer(id:number){
        if(this.buffers.length >= max_buffskill_num){
            return;
        }
        let buff = new Skill(id,this); 
        this.buffers.push(buff);
        this.freshBufferAttr();
        app.eventMgr.emit(EventName.update_buff,{pid:this.pid,Skill:buff,tp:2});
        
        return buff;
    }

    addExp(v:number){
        let p = this.getAttrByIdx(main_pro_key.exprate_all)
        v = v*(p+1);
        app.dataMgr.battleData.addExp(v);

        // let exp = this.exp +v;    
        // if(exp >= this.maxExp){
        //     if(this.lvl < app.confMgr.conf.level.maxLvl){
        //         exp = exp - this.maxExp;
        //         this.levelUp();
        //     }
        // }
        // this.exp = exp;
       // app.layerMgr.open(PopupName.OpenBoxDlg);
    }

    addGold(v:number){
        let p = this.getAttrByIdx(main_pro_key.goldrate_all);
        v = v*(p+1);
        this.gold += v;

        app.eventMgr.emit(EventName.battle_fresh_gold)
    }

    addKillNum(kv:number =1){
        this.kill += kv;
        
        if(ItemHelper.isDaZhaoMode()){
            app.dataMgr.achieve.killEnemy();
        }
        app.eventMgr.emit(EventName.battle_fresh_killNum)
    }
 
    addHp(hp:number){
        let v:number = this.curHp +hp;
        if(hp >0){
            if(v > this.maxHp)v = this.maxHp;      
        }else{
            if(v<=0)v=0;
        }  
        this.curHp = v;
    }

    /**掉落幸运草直接加值 */
    addLuckValue(v:number){
        
        let k = main_pro_key[main_pro_key.luck_all];
        ItemHelper.objAddVal(this.dropAddAttr,k,v)
        ItemHelper.objAddVal(this.baseBuffAttr,k,v);   
        console.log('v-----------',v)
    }

    /**检测是否能复活 */
    checkRelive(){
        let maxCnt = this.getAttrByIdx(main_pro_key.relive_all) + this.defaultReliveCnt;
        if(this.reliveCnt < maxCnt){ 
       
            app.layerMgr.open(PopupName.OverDlg,null,(idx)=>{
                app.layerMgr.open(PopupName.ReviveDlg,null,idx,this.pid);
            });
        }else{
           
            zs.core.workflow.childNext();
        }    
    }
    /**复活 */
    relive(){

        this.reliveCnt ++;
        if(this.reliveCnt <= this.defaultReliveCnt){
            this.curHp = this.maxHp;
        }else{
            let p = this.getAttrByIdx(main_pro_key.reliveblood_all)
            this.curHp = Math.floor(this.maxHp *  p);
        }
        app.eventMgr.emit(EventName.role_revive,this.pid);
        app.eventMgr.emit(EventName.game_pause, false);
    }

    /**升级 */
    levelUp(){
        this.lvl +=1;
        app.dataMgr.achieve.roleLvl(this.lvl);//freshAchieve(AchieveConditionType.roleLvl,this.lvl);
        this.freshBaseAttr();

        // app.eventMgr.emit(EventName.game_pause, true);
        if(ItemHelper.isDoubleMode()){
            app.layerMgr.open(PopupName.DoubleSkillUpgradeDlg);
        }else {
            app.layerMgr.open(PopupName.SkillUpgradeDlg);
        }
    }

    /**角色基础属性 */
    freshBaseAttr(){     
        this.baseAttr = Object.create(null);
        ItemHelper.attr_add_attr(this.baseAttr,this.dropAddAttr);
        
        let strengthAttr = app.dataMgr.battleData.strenthAttr;
        ItemHelper.attr_add_attr(this.baseAttr,strengthAttr);
        let attName:string;
        /**角色额外属性 */
        let extra = app.confMgr.conf.role.getExtraPro(this.rid,this.lvl);
        if(extra){
            attName = ItemHelper.get_attr_name(extra.attIdx);
            ItemHelper.objAddVal(this.baseAttr,attName,extra.val);
        }

        /**强化技能影响 */    
        // let skills = app.dataMgr.roleProxy.data.skills;
        // let lvl:number;
        // for(let sid in skills){
        //     lvl = skills[sid];
        //     if(lvl <1){
        //         continue;
        //     }
        //     let ev = app.confMgr.conf.strength.getStrenthEffectValue(Number(sid),lvl);
        //     if(ev){
        //         attName = ItemHelper.get_attr_name(ev.attIdx);
        //         ItemHelper.objAddVal(this.baseAttr,attName,ev.val);
        //     }      
        // }

        /**buffer */
        this.freshBufferAttr();

        let percent = this.curHp / this.maxHp;

        let hp = this.getAttrByIdx(main_pro_key.hp_all);
        let hpAdd = this.getAttrByIdx(main_pro_key.hpextra_all);
        this.maxHp = Math.floor(hp * (1 + hpAdd));

        this.curHp = Math.round(this.maxHp * percent)
        
       // app.eventMgr.emit(EventName.update_state);

    }

     /**buffer 影响*/ 
    freshBufferAttr(){  
      
        this.baseBuffAttr = Object.create(null);
        ItemHelper.copyObjVal(this.baseBuffAttr,this.baseAttr);    
 
        this.buffers.forEach(buff =>{
            if(!buff)return;
        
            let atts = buff.attributes;
            for(let i=0;i<atts.length;i++){
                let att =atts[i];
                if(att.own <=0){  //对角色属性影响
                    ItemHelper.objAddVal(this.baseBuffAttr,att.attName,att.val);
                }
            }         
        })
    }

    /**获取枚举属性中 值 */
    getAttrByIdx(idx:main_pro_key){

        return this.getAttrByName(main_pro_key[idx]);
        
    }

    getAttrByName(attName:string){
        return this.baseBuffAttr[attName] || 0;
    }

    /** 掉落物品 更角色普通新技能 */
    itemFreshSkill(conf:JsonModule.IItemJson){ 
        let hasWeapon:boolean = false;   
        for(let i=0;i<this.skills.length;i++){
            let skill = this.skills[i];
            if(!skill){
                continue;
            }
            if(skill.conf.skill_weapon == conf.id && !hasWeapon){
                hasWeapon = true;
            }

            if(skill.conf.skill_upitem == conf.id){         
                skill.setSkillId(skill.conf.skill_nextlevel) 
                app.eventMgr.emit(EventName.update_skill,{pid:this.pid,skill:skill,tp:1});
                return; 
            }
        }
        
        //是否生成新技能
        let sid = app.confMgr.conf.skill.getUnlockSkill(conf.id);
        if(sid >0 && !hasWeapon){
            this.addSkill(sid);
        }
    }

    itemFreshBuffSkill(conf:JsonModule.IItemJson){
        let hasWeapon:boolean = false;
        for(let i=0;i<this.buffers.length;i++){
            let skill = this.buffers[i];
            if(!skill){
                continue;
            }
            if(skill.conf.skill_weapon == conf.id && !hasWeapon){
                hasWeapon = true;
            }

            if(skill.conf.skill_upitem == conf.id){         
                skill.setSkillId(skill.conf.skill_nextlevel);
                this.freshBufferAttr();
                app.eventMgr.emit(EventName.update_buff,{pid:this.pid,skill:skill,tp:1});
                return; 
            }
        }
            
        //是否生成新技能
        let sid = app.confMgr.conf.skill.getUnlockSkill(conf.id);
        if(sid >0 && !hasWeapon){
            this.addBuffer(sid);     
        }
    }

    /**获得大招 */
    addUltSkill(sId:number) {
        if(this.ultSkill[sId]){
            this.ultSkill[sId].skNum ++; 
            app.eventMgr.emit(EventName.add_ult_skill,{pid:this.pid,sId:sId});     
        }
    }

    /**释放大招 */
    removeUltSkill(sId:number,isVidoe = false) {
        if(this.ultSkill[sId].skNum > 0 && !isVidoe){
            //保底--0
            this.ultSkill[sId].skNum = Math.max(0,--this.ultSkill[sId].skNum);
            this.ultSkill[sId].cdTime = Date.now();
            app.eventMgr.emit(EventName.release_ult,{pid:this.pid,sId:sId});  
        }else if(isVidoe){
            this.ultSkill[sId].cdTime = Date.now();
            app.eventMgr.emit(EventName.release_ult,{pid:this.pid,sId:sId});  
        }
    }

    /**
     * 根据武器id  查找当前对应技能
     * @param itemId   物品id
     * @param isSkill  //是否主技能
     * @returns 
     */
    getSkillByItem(itemId:number,isSkill:boolean = true){
        let arr = isSkill?this.skills:this.buffers;

        return arr.find((e) =>{
            return e.conf.skill_weapon == itemId;
        })
    }

}


export class Skill {

    idx:number =-1;  //位置索引
    skillAttr:main_pro_type; //技能属性值
    private _conf:JsonModule.ISkillJson;
    battleRole:BattleRoleData;
    attributes:att_val_type[] = [];
    constructor(id:number,br:BattleRoleData){
        this.battleRole = br;     
        this.setSkillId(id);

    }

    setSkillId(id){
        this._conf = app.confMgr.conf.skill.getConfById(id);
        this.freshAttr();
    }

    freshAttr(){
        this.skillAttr = Object.create(null);
        let atts = this.attributes = ItemHelper.idxAttrStrsTranser(this._conf.skill_attribute,this._conf.skill_value);
        atts.forEach(e =>{
            this.skillAttr[e.attName] = e.val;
        })
    }
    /**加成比例 */
    getAtkSpeed(){
        return 1 + this.battleRole.getAttrByIdx(main_pro_key.atkfly_all)+this.getAttr(main_pro_key.atkfly_all)
    }
    /**攻击范围 */
    getAtkRange(){
        return 1+ this.battleRole.getAttrByIdx(main_pro_key.atkrange_all) + this.getAttr(main_pro_key.atkrange_all);
    }
    /**攻击间隔 */
    getAtdCd(){
        let cd = this.battleRole.getAttrByIdx(main_pro_key.cd_all) +  this.getAttr(main_pro_key.cd_all);
        return 1-cd;
    }

    /**技能持续时间 */
    getSkillDuration(){
        return 1+ this.battleRole.getAttrByIdx(main_pro_key.duration_all) + this.getAttr(main_pro_key.duration_all);
    }

    /**获取攻击段数 */
    getAtkCnt(){
        return this.battleRole.getAttrByIdx(main_pro_key.attmulti_all) + this.getAttr(main_pro_key.attmulti_all);
    }

    get wid(){
        return this._conf.id;
    }

    get conf(){
        return this._conf;
    }

    getAttr(att:main_pro_key){
        return this.skillAttr[main_pro_key[att]] || 0;
    }

}

export class BufferSkill extends Skill {

    constructor(id:number,br:BattleRoleData){
       super(id,br);
    }
   
}



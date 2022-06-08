import BianSkill from "../../logics/skill/BianSkill";
import FireBallSkill from "../../logics/skill/FireBallSkill";
import FlyCutterSkill from "../../logics/skill/FlyCutterSkill";
import GarlicSkill from "../../logics/skill/GarlicSkill";
import HammerSkill from "../../logics/skill/HammerSkill";
import PoisonBottleSkill from "../../logics/skill/PoisonBottleSkill";
import RoleSkill from "../../logics/skill/RoleSkill";
import SickleSkill from "../../logics/skill/SickleSkill";
import WandsSkill from "../../logics/skill/WandsSkill";
import Util from "../utils/Util";

/**表数据结构 */
export module JsonModule {
    export interface TableJson {
        id:number
    }

    export  interface IItemJson  extends TableJson{
        item_name:string;
        item_type:number;
        fucntion_num:number;
        item_icon:string;
        item_detail:string;
        item_detailExtra:string;
        item_show:number;
        rank_id:number;
    }

    /**装备等级属性 */
    export interface ISkillJson extends TableJson{
        skill_name:string;
        skill_level:number;
        skill_unlock:number;
        skill_upitem:number;
        skill_nextlevel:number;
        skill_attribute:string;
        skill_value:string;
        skill_detail:string;  //描述
        skill_weapon:number; //道具id
        union_id:number;  //属性影响联合id

    }

    export interface IStrengthJson extends TableJson{
        skill_name:string;
        skill_maxlevel:number;
        skill_cost:string;
        skill_effect:string;
        skill_value:string;
        skill_detail:string;
        skill_icon:number;
    }

    export interface IAttributeJson extends TableJson{

        attribute_type:string;
        attribute_param:string;
        attribute_show:number;
        value_type:number;
        icon_show:number;
        attribute_weapon:number;
    }

    export interface IRoleJson extends TableJson{
        model_id:string;
        role_name:string;      
        unlock_condition:number;

        lock_cost:number;
        video_time:number;
        extra_level:string;
        extra_type:string;
        extra_num:string;
        strat_item:string;
        start_skill:number;
        role_detail:string;
    }

    /**角色等级 */
    export interface ILevelJson extends TableJson{  
        level_num:number;
        reward_box:number;
        attribute_type:string;
        attribute_num:string;
    }

    export interface IAchievememtJson extends TableJson {
        icon:string;
        condition:number;
        condition_num:number;
        unlockitem_id:number;
        reward_detail:string;
        achievement_name:string;
    }

    export interface IMonsterJson extends TableJson {
        id:number;
        monster_name:string;
        model_id:string;
        base_atk:number;
        base_hp:number;
        atk_factor:number;
        hp_factor:number;
        base_speed:number;
        bae_resist:number
    }


    export interface IDropJson extends TableJson {
        drop_id:number
        drop_type:number
        drop_item:number
        num_min:number
        num_max:number
        drop_prob:number

    }

    export interface IFbconfig extends TableJson {
        fresh_type:number; /**刷新类型 */
        fresh_cd:number;  /**刷新间隔 */
        fresh_site:number;	 /**怪物刷新范围 */
        monster_id:string;	 /**怪物id组 */
        monster_num:string; /**怪物数量组 */
        monster_level:number; /**怪物等级 */	
        monster_factor:number;	 /**属性平衡系数 */
        monster_exp:number; /**怪物经验 */
        monster_drop:number; /**怪物掉落 */	
        monster_lifetime:number; /**怪物存活时间 */	
        next_id:string;  /**下一波id组 */
    }

    export interface ISkillBoxJson extends TableJson {

        random_id:number;
        item_id:number;
        random_weight:number;
    }

    export interface ICompoundJson extends TableJson {

        icon01:number;
        icon02:number;
        icon03:number;
        name01:string;
        name02:string;
        name03:string;
    }

    export interface ITips extends TableJson {
        scene_id:number;
        random_wi:number;
        cd_times:number;
        tips:string;
    }
    /**简单配置 */
    export interface IPropJson extends TableJson {

        addShortCutAward:number,  //添加桌面奖励
        shortCutDayAward:number  //添加桌面每日奖励
        videoSupply:number   //视频奖励
    }
}

export interface skill_conf_type {
    id:number;
    cls:typeof RoleSkill;
    path:string;
    cd:number;
    addCd:number;  //段数添加系数
}

export class ClientConfigMgr {       
     /**注册表 */
    _confs = {

        item :new ClientTableBase<JsonModule.IItemJson>(),
        skill:new SkillTable(),
        attribute:new AttributeTable(),
        role:new RoleTable(),
        level:new LevelTable(),
        strength:new StrenthTable(),
        achievememt:new AchievementTable(),
        monster:new ClientTableBase<JsonModule.IMonsterJson>(),
        drop:new DropTable(),
        fbconfig:new ClientTableBase<JsonModule.IFbconfig>(),
        skillbox:new SkillBoxTable(),
        tips:new TipsTable(),
        compound:new CompoundTable(),
        prop:new PropTable()

    }

    /**技能配置     武器id   对应技能  资源路径*/
    skillConf:{[k:number]:skill_conf_type} = {

        100001:{id:100001,cls:BianSkill,path:'skill/Bian',cd:1.1,addCd:0.2},     // 鞭子 200001
        100002:{id:100002,cls:BianSkill,path:'skill/BianX1',cd:1.1,addCd:0.2},
        100003:{id:100003,cls:WandsSkill,path:'skill/Wands',cd:2,addCd:0.2},      // 魔法杖1级 200101
        100004:{id:100004,cls:WandsSkill,path:'skill/WandsX',cd:2,addCd:0.1},

        100005:{id:100005,cls:FlyCutterSkill,path:'skill/FlyCutter',cd:1.5,addCd:0.2}, // 小刀1级 200201
        100006:{id:100006,cls:FlyCutterSkill,path:'skill/FlyCutter',cd:1.5,addCd:0.1},

        100007:{id:100007,cls:HammerSkill,path:'skill/Hammer',cd:3,addCd:0.3},      //铁锤1级  200401
        100008:{id:100008,cls:HammerSkill,path:'skill/HammerX',cd:3,addCd:0.3},

        100015:{id:100015,cls:GarlicSkill,path:'skill/Garlic',cd:1.2,addCd:0},  //伏魔圈1级  200301
        100016:{id:100016,cls:GarlicSkill,path:'skill/GarlicX',cd:1,addCd:0},

        100013:{id:100013,cls:FireBallSkill,path:'skill/FireBall',cd:1.5,addCd:0.2},   //火球1级 200501
        100014:{id:100014,cls:FireBallSkill,path:'skill/FireBallX',cd:1.5,addCd:0.1},

        100017:{id:100017,cls:PoisonBottleSkill,path:'skill/PoisonBottle',cd:2,addCd:0.2},  //腐蚀药水1级
        100018:{id:100018,cls:PoisonBottleSkill,path:'skill/PoisonBottle',cd:2,addCd:0.2},

        100051:{id:100017,cls:SickleSkill,path:'skill/Sickle',cd:2,addCd:0.1},
        100052:{id:100018,cls:SickleSkill,path:'skill/SickleX',cd:3.3,addCd:0.1}      // 镰刀1级
       
    }
     
    init(){
        
    }

    getSkillConf(wid:number){
        return this.skillConf[wid];
    }


    keys(){
        return Object.keys(this._confs);
    }

    get conf(){
        return this._confs;
    }

    parseConf(res:cc.JsonAsset){
        let t = this._confs[res.name];
        if(!t){
            console.log('json noRegister---',res.name);
            return;
        }
        if(res.name == 'prop'){
            t.json = res.json;
        }else{
            t.keepConf(res.json);
        }
        
    }

}

/**配置 保存基类 */
class ClientTableBase<K extends JsonModule.TableJson>{
    _conf:{[id:number]:K} = Object.create(null);
    get conf():{[id:number]:K}{
        return this._conf;
    }
    /**
     * 通过id查找表数据
     * @param id id索引
     * @returns 
     */
    getConfById(id:number):K{
        return this._conf[id]
    }
    /**数组形式 */
    getConfArr():K[]{
        let arr:K[] = [];
        for(let id in this._conf){
            arr.push(this._conf[id]);
        }
        return arr;
    }

    /**
     * 
     * @param json 保存加载的表配置
     */
    keepConf(json:Object):void{

        let row:K;
        for(let idx in json){
            row = json[idx];
            this._conf[row.id] = row;
            this.handleRow(row);
        }
    }

    handleRow(row:K){

    }
}
class TipsTable extends ClientTableBase <JsonModule.ITips>{
    getWeightTips(){
        let arr = [];
        let tips = '',cd_times = 0;
        for (const key in this.conf) {
            const item = this.conf[key];
            if(item){
                arr.push(item.random_wi);
            }else{
                arr.push(0)
            }
        }

        let idx = Util.weightRandomIdx(arr)+1;
        let cfg = this.getConfById(idx);
        if(cfg){
            tips = cfg.tips;
            cd_times = cfg.cd_times || 5;
        }
        return [tips,cd_times];
    }
}
class SkillTable extends ClientTableBase<JsonModule.ISkillJson>{

    unLockMap:{[id:number]:number} = Object.create(null); //可以解锁的技能
    MaxLvlMap:{[id:number]:number} = Object.create(null); //武器技能最大等级

    handleRow(row:JsonModule.ISkillJson){
        let itemId:number = row.skill_unlock;
        if(itemId >0){
            this.unLockMap[itemId] = row.id;
        }
        let weaponItem:number = row.skill_weapon;
        if(!this.MaxLvlMap[weaponItem])this.MaxLvlMap[weaponItem] =0;
        this.MaxLvlMap[weaponItem] ++;
    }
    /**物品获取解锁技能能 */
    getUnlockSkill(itemId:number){
        let id = this.unLockMap[itemId];
        return id>0?id:-1;
    }

    /**获取技能最大等级 */
    getSkillMaxLvl(wid:number){
        return this.MaxLvlMap[wid] || 0;
    }
}

class StrenthTable extends ClientTableBase<JsonModule.IStrengthJson>{

    effectMap:{[k:number]:{attIdx:number,val:number}[]} = Object.create(null)    
    handleRow(row: JsonModule.IStrengthJson): void {
        let atts = Util.splitNumber(row.skill_effect);
        let values = Util.splitNumber(row.skill_value);
        this.effectMap[row.id] = atts.map((e,i) =>{
            return {attIdx:atts[i],val:values[i]}
        })
    }
    getStrenthMaxlvl(id:number){
        let conf = this.getConfById(id);
        return conf.skill_maxlevel;
    }

    getStrenthCost(id:number,lvl:number){
        let conf = this.getConfById(id);
        let values = Util.splitNumber(conf.skill_cost)
        return values[lvl] || 0;
    }

    getStrenthEffectValue(id:number,lvl:number){
        let atts = this.effectMap[id];
        if(!atts)return null;
        return atts[lvl-1];
    }
}


class RoleTable  extends ClientTableBase<JsonModule.IRoleJson>{

    extraAttMap:{[k:number]:{needLvl:number,attIdx:number,val:number}[]}= Object.create(null);
    handleRow(row: JsonModule.IRoleJson): void {
   
        let lvls = Util.splitNumber(row.extra_level);
        let attIdxs =  Util.splitNumber(row.extra_type);
        let vals =  Util.splitNumber(row.extra_num);
        this.extraAttMap[row.id] = lvls.map((e,idx) =>{
            return {needLvl:lvls[idx],attIdx:attIdxs[idx],val:vals[idx]}
        })
    }

    getExtraPro(id:number,lvl:number){
        let extras = this.extraAttMap[id];
        if(!extras)return null;
        for(let i =extras.length-1;i>=0;i--){
            if(lvl > extras[i].needLvl){
                return extras[i];
                
            }
        }
        return null;
    }
}

class AttributeTable extends ClientTableBase<JsonModule.IAttributeJson> {

    _roleShowAtts:JsonModule.IAttributeJson[] = [];
    handleRow(row:JsonModule.IAttributeJson){
        if(row.attribute_show>0){
            this._roleShowAtts.push(row);
        }
    }

    getRoleShowAttr(){
        return this._roleShowAtts.sort((a,b)=>{
            return a.attribute_show - b.attribute_show
        })    
    }
}

class LevelTable extends ClientTableBase<JsonModule.ILevelJson>{
    _maxLvl:number =-1;
    get maxLvl(){
        if(this._maxLvl <0){
           this._maxLvl =Object.keys(this.conf).length;
        }
        return this._maxLvl;
    }


    /**获取升级需要经验 */
    getExp(lvl:number){
        let conf = this.getConfById(lvl);
        return conf.level_num;
    }
}

class AchievementTable extends ClientTableBase<JsonModule.IAchievememtJson> {

    getAchievesByTp(tp:number){
        let arr = [];
        for(let k in this.conf){
            if(this.conf[k].condition == tp){
                arr.push(this.conf[k]);
            }
        }
        return arr;
    }
}

class DropTable extends ClientTableBase<JsonModule.IDropJson>{

    dropGroups:{[k:number]:JsonModule.IDropJson[]}= Object.create(null);

    getDropGroup(dropId:number){
        let arr = this.dropGroups[dropId];
        if(!arr){
            arr = this.dropGroups[dropId] = [];
            for(let  id in this.conf){
                if(this.conf[id].drop_id == dropId){
                    arr.push(this.conf[id]);
                }
            }

        }     
        return arr;
    }

    /**获取掉落的物品 */
    getDropItems(dropId:number){
        let arr = this.getDropGroup(dropId);
        if(!arr  || arr.length ==0){
            return arr;
        }

        let tp = arr[0].drop_type;
        let items:{id:number,num:number}[] = [];
        let num:number;
        if(tp ==1){  //单独概率掉落         
            arr.forEach(e =>{
                let random = Math.random();
                if(random < e.drop_prob/10000){
                    num = Util.randomNumber(e.num_min,e.num_max);
                    items.push({id:e.drop_item,num:num})
                }
            })
        }else if(tp ==2){  //权重掉落
            let weights = arr.map(e =>{
                return e.drop_prob;
            })
            let idx = Util.weightRandomIdx(weights);
            let drop = arr[idx];
            num = Util.randomNumber(drop.num_min,drop.num_max);
            items.push({id:drop.drop_item,num:num})
        }
        return items;
    }
}

class SkillBoxTable extends ClientTableBase<JsonModule.ISkillBoxJson>{


    getItemsByTp(tp:number):JsonModule.ISkillBoxJson[]{
        let arr =[];
        for(let k in this.conf){
            if(this.conf[k].random_id == tp){
                arr.push(this.conf[k]);
            }
        }
        return arr;
    }
}

class  CompoundTable extends ClientTableBase<JsonModule.ICompoundJson>{

    /**武器合成超武  需要的额外buff */
    getCompoundItem(itemId:number){
        for(let k in this.conf){
            if(this.conf[k].icon01 == itemId ){
                return this.conf[k].icon02
            }
        }
        return 0;
    }
}

class PropTable extends ClientTableBase<JsonModule.IPropJson>{
    _json:JsonModule.IPropJson = null;

    set json(conf){
        this._json = conf;
    }

    get json(){
        return this._json;
    }

    get videoGold(){
        return this.json.videoSupply;
    }
}



/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */

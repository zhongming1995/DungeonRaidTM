import { app } from "../app";
import ItemHelper from "../common/ItemHelper";
import { BattleModeType, EventName, main_pro_key, main_pro_type,PopupName } from "../Defines";
import BattleRoleData from "./BattleRoleData";
/**游戏中数据 */
export default class BattleData  {



    /**经验*/
    exp:number =0;

    /**升级经验*/
    maxExp:number =0;

    /**等级*/
    lvl:number =1;

    strenthAttr:main_pro_type =null;  //强化属性

    player1:BattleRoleData = null;
    player2:BattleRoleData = null;

    //是否冰冻buff中
    isFreezeBuff:boolean = false;

    constructor(){
        this.reset();
        this.initAttr();

    }
    reset(){
        this.exp = 0;
        this.maxExp=0;
        this.lvl =1;
        this.strenthAttr = Object.create(null)
    }

    initAttr(){
        this.strenthAttr = Object.create(null);
        //等级基本属性
        let conf = app.confMgr.conf.level.getConfById(this.lvl);
        let atts1 = ItemHelper.idxAttrStrsTranser(conf.attribute_type,conf.attribute_num);
        atts1.forEach((att,idx) =>{
            ItemHelper.objAddVal(this.strenthAttr,att.attName,att.val);
        })

        /**强化技能影响 */
        let skills = app.dataMgr.roleProxy.data.skills;
        let lvl:number,attName:string;
        for(let sid in skills){
            lvl = skills[sid];
            if(lvl <1){
                continue;
            }
            let ev = app.confMgr.conf.strength.getStrenthEffectValue(Number(sid),lvl);
            if(ev){
                attName = ItemHelper.get_attr_name(ev.attIdx);
                ItemHelper.objAddVal(this.strenthAttr,attName,ev.val);
            }             
        }

        this.maxExp = app.confMgr.conf.level.getExp(this.lvl);
    }

    /**获取角色数据 */
    getRoleData(id:number){
        if(this.player1 && this.player1.pid == id) return this.player1;
        if(this.player2 && this.player2.pid == id)  return this.player2;

        return this.player1;
    }


    /**获得经验 */
    addExp(v:number){
        let exp = this.exp +v;    
        if(exp >= this.maxExp){
            if(this.lvl < app.confMgr.conf.level.maxLvl){
                exp = exp - this.maxExp;
                this.levelUp();
            }
        }
        this.exp = exp;
        app.eventMgr.emit(EventName.battle_fresh_exp);
    }

    /**升级 */
    levelUp(){
        this.lvl +=1;

        if(ItemHelper.isDaZhaoMode()){
            app.dataMgr.achieve.roleLvl(this.lvl);
        }
       
        this.initAttr();
        this.player1 && this.player1.freshBaseAttr();
        this.player2 && this.player2.freshBaseAttr();
        if(ItemHelper.isDoubleMode()){
            app.layerMgr.open(PopupName.DoubleSkillUpgradeDlg);
        }else {
            app.layerMgr.open(PopupName.SkillUpgradeDlg);
        }
    }

    backAddGold(){
        let gold = this.player1.gold;
        if(this.player2) gold += this.player2.gold; 
        app.dataMgr.roleProxy.addGold(Math.floor(gold));
    }

    /**每秒计时 */
    schudleTime(){
        this.player1 &&  this.player1.scheduleTime();
        this.player2 && this.player2.scheduleTime();
    }


    //=======试用武器============================
      
    tryWeapon(pid:number,id:number){
        let player = this.getRoleData(pid);
        player && player.addTrySuper(id);
      
    }
    
    /**超武结束 */
    tryWeaponEnd(pid:number){   

        let player = this.getRoleData(pid);
        player && player.removeTrySuper();
        let enemys = app.gameMgr.waveMng.getEnemyList();
        enemys.forEach(enemy=>{          
            enemy.isUltDie = true;
            enemy.death();
        })
        console.log('tryWeaponEnd-----------------',pid);
    }

    // update (dt) {}
}

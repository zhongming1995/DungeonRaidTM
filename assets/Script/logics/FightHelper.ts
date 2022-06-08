import { app } from "../app";
import Util from "../core/utils/Util";
import { main_pro_key, SoundName } from "../Defines";
import Enemy from "./Enemy";
import EffectMng from "./mng/EffectMng";
import Player from "./role/Player";
import SkillBasic from "./skillEntity/SkillBasic";

export default class FightHelper {

    hitCnt:number =0; //受击次数
    hitEffs:cc.Vec2[] = [];
 
    static _ins:FightHelper = null;
    static get ins(){
        if(!this._ins) this._ins = new FightHelper();
        return this._ins;
    }

    /**
     * 
     * @param skillBase 
     * （角色攻击+武器攻击-护甲）*（武器伤害比例*伤害比例）*（1+伤害加深）*（1-伤害减免）*round(0.8,1.4)
     */
    playerAtkEnemy(skillBase:SkillBasic,e:Enemy){
      
        let skillData = skillBase.skill.skillData;
        let playerData =  skillBase.player.btRoleData;
        let p_atk:number = playerData.getAttrByIdx(main_pro_key.atk_all);
        let p_hurt_scale = playerData.getAttrByIdx(main_pro_key.weaponrate_all);
        let p_hurt_add = playerData.getAttrByIdx(main_pro_key.damageup_all)

        let w_atk:number = skillData.getAttr(main_pro_key.atk_all)
        let w_hurt_scale = playerData.getAttrByIdx(main_pro_key.weaponrate_all);
        let w_hurt_add = playerData.getAttrByIdx(main_pro_key.damageup_all) 
   
        let r = Util.randomNumber(8,14);
        let hurt = (p_atk + w_atk)*(1+w_hurt_scale) *(1+p_hurt_scale)*r/10;
       // console.log('playerAtkEnemy-------',hurt)
        return Math.round(hurt) ;      
    }


    enemyAtkPlayer(e:Enemy,player:Player){
        let e_atk = e.atkVal;
        let playerData = player.btRoleData;
        let armor:number = playerData.getAttrByIdx(main_pro_key.armor_all);
        let p_hurt_sub:number = playerData.getAttrByIdx(main_pro_key.damagedown_all);
       // let r = Util.randomNumber(4,14);
        let hurt= Math.round((e_atk-armor)*(1-p_hurt_sub));
        return hurt <0?0:hurt;
        
    }  

    /**受击音效 */
    playHitSound(){
        this.hitCnt++;
        if(this.hitCnt >=2){
            return;
        }   
        app.audioMgr.playEffect(SoundName.fpx_sfx_damage_hit1); 
    }

    playHitEff(effPos:cc.Vec2){
        this.hitEffs.push(effPos);  
    }

    update(dt:number){

        if(this.hitCnt >0){
            this.hitCnt --;
        }
        if(this.hitEffs.length >0){
            EffectMng.Instance.playHitEff(this.hitEffs.shift());
        }
    }

    // update (dt) {}
}

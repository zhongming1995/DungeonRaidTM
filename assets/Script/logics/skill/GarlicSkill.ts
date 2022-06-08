// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Skill } from "../BattleRoleData";
import RoleSkill from "./RoleSkill";


export default class GarlicSkill extends RoleSkill {

    freshSkillData(data:Skill){
        super.freshSkillData(data);

        if(this.skillData.conf.skill_nextlevel < 0){  //升级成超武
            this._queue.forEach(e =>{
                e.isEnd = true;
            })
            this.curLauchCnt =0;
            this.releaseSkill();
        }
    }

    /**释放技能 */
    releaseSkill(){
        if(this.curLauchCnt >0){  //只释放一次
            return;
        }

        this.isRelease = true;
        this.curLauchCnt =1;    
        this.castSkillEff({idx:this.curLauchCnt});
    }

    
    /**隐藏 */
    showEff(show:boolean){
        this._queue.forEach(eff =>{
            if(cc.isValid(eff)){
                eff.node.active = show;
            }
        })
    }

    // update (dt) {}
}

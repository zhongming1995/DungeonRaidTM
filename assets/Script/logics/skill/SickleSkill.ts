// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../../app";
import RoleSkill from "./RoleSkill";


/**镰刀技能 */
export default class SickleSkill extends RoleSkill {

    atkTargets:{end:cc.Vec2,dist:number}[] = [];

    /**释放技能 */
    releaseSkill(){

        this.isRelease = true;
        this.curFrame = 0; 
        this.nextFrame =0;  
        this.curLauchCnt =0;  
        this.playEff();
        
    }

    /**播放技能 */
    playEff(){
             
        this.findTargets();
        for(let i=0;i<this.launchNum;i++){
            this.castSkillEff({idx:i+1,target:this.atkTargets[i],isdivide:false});
        } 
    }

    /**分裂技能 */
    divideEff(pos:cc.Vec3,angle:number){
        for(let i=0;i<2;i++){
            this.castSkillEff({idx:i+1,pos:pos,angle:angle,isdivide:true});
        }

    }

    /**查找攻击目标 */
    findTargets(){  
        this.atkTargets =[];
        
        let curDist = 500;
        let playPos = this.player.node.getPosition();
        let enemys = app.gameMgr.waveMng.checkEnemys;

        for(let i=0;i<enemys.length;i++){
            if(!cc.isValid(enemys[i])){
                continue;
            } 
            let tPos = enemys[i].node.getPosition();
            let dist = playPos.sub(tPos).mag();
            if(dist < curDist) {
                this.atkTargets.push({end:tPos,dist:dist})
            }

            if(this.atkTargets.length >= this.launchNum){
                break;
            }
        }        
    }
    
    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import RoleSkill from "./RoleSkill";



/**鞭子技能 */
export default class BianSkill extends RoleSkill {

    
    /**释放技能 */
    releaseSkill(){

        this.isRelease = true;
        this.curLauchCnt =0; 
        this.curFrame = 0; 
        this.nextFrame =0;  
        
    }

    /**播放技能 */
    playEff(){

        this.curLauchCnt ++;
        let isOu:boolean =  this.curLauchCnt % 2 ==0;   // 5 10 5 10
        
        this.nextFrame = isOu ?10:5;
        if(this.curLauchCnt >= this.launchNum){
            this.isRelease = false;
        }
        this.castSkillEff({idx:this.curLauchCnt});

    }


    gameUpdate(dt) {      
        super.gameUpdate(dt); 

        if(this.isRelease){
            this.curFrame += 1;
            if(this.curFrame >= this.nextFrame) {
                this.curFrame =0;
                this.playEff();
            }
        }
    }
    
    
    // update (dt) {}
}

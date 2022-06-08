// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import RoleSkill from "./RoleSkill";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FlyCutterSkill extends RoleSkill {


    /**释放技能 */
    releaseSkill(){
        this.isRelease = true;
        this.curFrame = 0; 
        this.nextFrame =0;  

        this.curLauchCnt =0; 
    }

    /**播放技能 */
    playEff(){

        this.curLauchCnt ++;
        this.nextFrame =5;
        if(this.curLauchCnt >= this.launchNum){
            this.isRelease = false;
        }
        this.castSkillEff({idx:this.curLauchCnt})
        
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

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import RoleSkill from "./RoleSkill";


/**鞭子技能 */
export default class FireBallSkill extends RoleSkill {

    
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
        for(let i=0;i<this.launchNum;i++){
            this.castSkillEff({idx:i+1});
        } 
    }
    
    // update (dt) {}
}

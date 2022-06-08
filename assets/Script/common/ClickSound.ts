// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../app";
import { SoundName } from "../Defines";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ClickSound extends cc.Component {

    
    @property()
    soundName:string = SoundName.fpx_button;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_END,this.callback,this);
    }

    callback (event) {
        app.audioMgr.playEffect(this.soundName);
        
    }
    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_END, this.callback, this);
    }

    // update (dt) {}
}

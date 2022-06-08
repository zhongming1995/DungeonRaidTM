// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import NodePoolMgr, { PoolName } from "../core/utils/NodePoolMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HitEff extends cc.Component {

    @property(cc.Animation)
    ani:cc.Animation = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.ani = this.ani || this.node.getComponent(cc.Animation);
        this.ani.on('finished',this.onAniFinish,this)
    }

    onEnable(){
        this.ani.play();
    }

    onAniFinish(){

        NodePoolMgr.ins.putItem(PoolName.HitEff,this.node);
    }

    // update (dt) {}
}

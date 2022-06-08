// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import NodePoolMgr, { PoolName } from "../core/utils/NodePoolMgr";
import { float_num_conf } from "../Defines";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FloatNum extends cc.Component {


    @property(cc.Animation)
    ani:cc.Animation = null;

    @property(cc.Label)
    numLab: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    setData(v:number){
        let flag:string = v>0?'+':'';
        let conf = this.getValueType(v);
        this.numLab.node.color = conf.c;
        this.numLab.fontSize = conf.size;
        this.numLab.string = flag + v;
        this.ani.play(conf.ani);

    }

    onEnable(){

        this.ani.on('finished',this.aniFinish,this);
    }


    aniFinish(){
        NodePoolMgr.ins.putItem(PoolName.FloatNum,this.node);
    }


    getValueType(v:number){
        if(v >0) return  float_num_conf[5];

        v= Math.abs(v);
        if(v<=24){
           return float_num_conf[1];         
        }else if(v>=25 && v<=50){
            return float_num_conf[2];
        }else if(v>=51 && v<=75){
            return float_num_conf[3];
        }
        return float_num_conf[4];
    }

    onDisable(){

        this.ani.off('finished',this.aniFinish,this);
    }

    // update (dt) {}
}

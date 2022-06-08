// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemShow extends cc.Component {

    @property(cc.Sprite)
    icon:cc.Sprite = null;

    @property(cc.Label)       
    nameLab:cc.Label = null; //名字

    @property(cc.Label)
    numLab:cc.Label = null;  //数字

    // onLoad () {}

    start () {

    }

    setIcon(){

    }

    setNumLab(num:number){
        if(!num){
            this.numLab.node.active = false;
            return;
        }
        this.numLab.string = num + '';
    }
    setNameLab(name:string){
        if(!name){
            this.nameLab.node.active = false;
            return;
        }
        this.nameLab.string = name;
    }

    // update (dt) {}
}

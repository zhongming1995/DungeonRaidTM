// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../app";
import { JsonModule } from "../core/conf/ClientConfigMgr";
import ResMgr from "../core/resLoad/ResMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PictureItem extends cc.Component {

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Node)
    selectImg: cc.Node = null;

    @property(cc.Node)
    unknown:cc.Node = null;


    m_cb:Function = null;
    m_data:JsonModule.IItemJson;
    m_has:boolean = false;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    setData(data){
        this.m_data = data;
        this.m_has = app.dataMgr.picture.hasMeet(data);
        if(this.m_has){
            this.unknown.active = false;
            this.icon.spriteFrame = ResMgr.ins.getItemSp(data.item_icon);
        }else{
            this.icon.spriteFrame = null;
            this.unknown.active = true;
        }
        
    }
 
    setSelect(show:boolean){
        this.selectImg.active = show;
    }

    setCallBack(cb:Function){
        this.m_cb = cb;
    }


    onItemClk(){
        this.m_cb && this.m_cb(this);
    }
    // update (dt) {}
}

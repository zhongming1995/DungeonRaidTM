// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../app";
import { JsonModule } from "../core/conf/ClientConfigMgr";
import ResMgr from "../core/resLoad/ResMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AttrShowItem extends cc.Component {

    @property(cc.Sprite)
    attIcon: cc.Sprite = null;

    @property(cc.Label)
    attName: cc.Label = null;

    @property(cc.Label)
    attVal: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    conf: JsonModule.IAttributeJson;
    start() {

    }

    pid = 1;

    setData(data: JsonModule.IAttributeJson, id?) {
        if (id) {
            this.pid = id;
        }
        this.conf = data;
        this.attIcon.spriteFrame = ResMgr.ins.getItemSp(data.icon_show)
        this.attName.string = data.attribute_type;

        this.attVal.string = this.getAttStr();
    }

    getAttStr() {
        let val = app.dataMgr.battleData.getRoleData(this.pid).getAttrByName(this.conf.attribute_param);
        let vtp = this.conf.value_type;
        if (val <= 0) return '-';
        if (vtp == 1) {
            return val.toFixed(0) + '';
        }
        else if (vtp == 3) {
            return val.toFixed(1) + '';
        } else {
            return (val * 100).toFixed(0) + '%'
        }
    }
    // update (dt) {}
}

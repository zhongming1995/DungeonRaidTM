/*
* @ Author: yangcheng
* @ Data: 2022-04-06 18:42
*/

import { app } from "../app";
import { JsonModule } from "../core/conf/ClientConfigMgr";
import ResMgr from "../core/resLoad/ResMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DoubleSkillDescItem extends cc.Component {

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Toggle)
    checkBg: cc.Toggle = null;

    conf: JsonModule.IAttributeJson;
    setData(data: JsonModule.IAttributeJson, i?) {
        this.conf = data;
        this.icon.spriteFrame = ResMgr.ins.getItemSp(data.icon_show)

        //背景图切换
        i % 2 == 0 ? this.checkBg.check() : this.checkBg.uncheck();

        //属性值
        for (let j = 0; j < 2; j++) {
            let lab = this.node.getChildByName(j+'').getComponent(cc.Label);
            lab.string = this.getAttStr(j);
        }
    }

    getAttStr(i) {
        let roleData = app.dataMgr.battleData.getRoleData(i + 1)
        let val = roleData.getAttrByName(this.conf.attribute_param);
        let vtp = this.conf.value_type;
        if (val <= 0) return '-';
        if (vtp == 1) {
            return val.toFixed(0) + '';
        } else {
            return (val * 100).toFixed(0) + '%'
        }
    }
}
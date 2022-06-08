/*
* @ Author: yangcheng
* @ Data: 2022-03-30 14:55
*/

import { app } from "../app";
import ResMgr from "../core/resLoad/ResMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkillUpgradeComposedTable extends cc.Component {

    @property(cc.Node)
    composeCon:cc.Node = null;

    protected onLoad(): void {
        this.loadComposeItems();
    }

    loadComposeItems(){

        let arr = app.confMgr.conf.compound.getConfArr();
        let childs = this.composeCon.children;

        for(let i=0;i<arr.length;i++){
            let item = childs[i];
            if(!item){
                item = cc.instantiate(childs[0]);
                item.parent = this.composeCon;
            }
            let data = arr[i]
            item.getChildByName('icon1').getComponent(cc.Sprite).spriteFrame = ResMgr.ins.getItemSp(data.icon01);
            item.getChildByName('icon2').getComponent(cc.Sprite).spriteFrame = ResMgr.ins.getItemSp(data.icon02)
            item.getChildByName('icon3').getComponent(cc.Sprite).spriteFrame = ResMgr.ins.getItemSp(data.icon03)
        }

    }

}
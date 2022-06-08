// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UISuperLayout from "../../lib/UISuperLayout";
import { app } from "../app";
import BasePopup from "../core/gui/BasePopup";
import NodePoolMgr, { PoolName } from "../core/utils/NodePoolMgr";
import { AchieveState, EventName, Item_type } from "../Defines";
import AchieveItem from "./AchieveItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AchieveDlg extends BasePopup {

    @property(cc.Node)
    itemContent: cc.Node = null;

    @property(cc.Prefab)
    itemPre: cc.Prefab = null;

    itemMap: { [k: number]: AchieveItem }

    achieves: any[] = null;

    @property(UISuperLayout) layout: UISuperLayout = null

    onLoad() { }

    start() {
        this.itemMap = {};
        super.start();
        this.loadAchieveArr();
        app.justTrack('成就打开次数');
        zs.Native.TenjinTrackEvent("cv_26")
    }
    protected onEnable(): void {
        super.onEnable();
        app.eventMgr.on(EventName.achieve_state_fresh, this.freshAChieve, this);
    }
    protected onDisable(): void {
        super.onDisable();
        app.eventMgr.off(EventName.achieve_state_fresh, this.freshAChieve, this);
    }

    //加载排序
    loadAchieveArr() {
        let achieves = app.confMgr.conf.achievememt.getConfArr();
        achieves.sort((a, b) => { return a.id - b.id; });
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        achieves.forEach(d => {
            let s = app.dataMgr.achieve.getAchieveState(d.id);
            if (s == AchieveState.reach) {
                arr1.push(d);
            } else if (s == AchieveState.run) {
                arr2.push(d);
            } else {
                arr3.push(d);
            }
        });
        achieves.splice(0, achieves.length);
        this.achieves = arr1.concat(arr2).concat(arr3);
        this.layout.total(this.achieves.length);
    }
    /**item refresh event*/
    onRefreshEvent(node: cc.Node, index: number) {
        node.getComponent(AchieveItem)?.setData(this.achieves[index]);
    }
    refreshItem(id) {
        if (this.achieves) {
            for (let i = 0; i < this.achieves.length; i++) {
                const element = this.achieves[i];
                if (element.id == id) {
                    let item = this.achieves.splice(i, 1);
                    item.forEach(i => { this.achieves.push(i); })
                    this.layout.total(this.achieves.length);
                    return;
                }
            }
        }
    }

    freshAChieve(id) {
        // this.loadAchieveArr();
        //刷新item数据
        this.refreshItem(id);

        const achieve = app.confMgr.conf.achievememt.getConfById(id);
        if (achieve) {
            let cfg = app.confMgr.conf.item.getConfById(achieve.unlockitem_id);
            if (cfg && cfg.item_type == Item_type.gold) {
                app.dataMgr.roleProxy.addGold(100);
            }
        }
    }

    closeUi(): void {
        super.closeUi();
        zs.core.workflow.childNext();
    }

    onUpLv() {
        app.dataMgr.achieve.roleLvl(100);
    }

    onKill() {
        app.dataMgr.achieve.killEnemy(100);
    }

    onLive() {
        app.dataMgr.achieve.roleLiveTime(100)
    }

}

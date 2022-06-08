// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../app";
import BasePopup from "../core/gui/BasePopup";
import ResMgr from "../core/resLoad/ResMgr";
import NodePoolMgr, { PoolName } from "../core/utils/NodePoolMgr";
import { EventName } from "../Defines";
import StrenthItem from "./StrenthItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StrengthenDlg extends BasePopup {

    @property(cc.Node)
    itemContent: cc.Node = null;

    @property(cc.Prefab)
    itemPre: cc.Prefab = null;

    @property(cc.Sprite)
    curIcon: cc.Sprite = null;

    @property(cc.Label)
    nameLab: cc.Label = null;

    @property(cc.Label)
    descLab: cc.Label = null;

    @property(cc.Node)
    upCon: cc.Node = null;

    @property(cc.Node)
    upVideo: cc.Node = null;

    @property(cc.Node)
    maxNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() { }

    curItem: StrenthItem = null;

    start() {
        super.start();

        this.addEvt(EventName.skill_upgrade, this.freshSkillUp, this)
        this.strenthItems();
        app.justTrack("强化打开次数");
        zs.Native.TenjinTrackEvent("cv_7")
    }

    strenthItems() {
        let cb = this.evtCallBack.bind(this);
        let copyItem: cc.Node = null, cmp: StrenthItem;

        let items = app.confMgr.conf.strength.getConfArr();

        for (let i = 0; i < items.length; i++) {
            copyItem = NodePoolMgr.ins.getItem(PoolName.StrenthItem);
            if (!copyItem) {
                copyItem = cc.instantiate(this.itemPre);
            }

            copyItem.parent = this.itemContent;
            cmp = copyItem.getComponent(StrenthItem);
            cmp.setSelect(false);
            if (cmp) {
                cmp.setData(items[i]);
                cmp.setCallBack(cb);
            }

            if (i == 0) {
                this.setItemShow(cmp);
            }
        }
    }

    evtCallBack(e: StrenthItem) {
        if (this.curItem == e) {
            return;
        }
        if (this.curItem) {
            this.curItem.setSelect(false);
        }
        this.setItemShow(e);
    }

    setItemShow(cur: StrenthItem) {

        this.curItem = cur;
        cur.setSelect(true);
        let data = cur.m_data;
        let lvl = app.dataMgr.roleProxy.getSkillLvl(data.id);
        this.nameLab.string = data.skill_name;
        this.descLab.string = data.skill_detail;
        this.curIcon.spriteFrame = ResMgr.ins.getItemSp(data.skill_icon);

        if (lvl < data.skill_maxlevel) {
            this.maxNode.active = false;
            this.upCon.active = true;
            this.upVideo.active = true;
            let cost = app.confMgr.conf.strength.getStrenthCost(data.id, lvl)
            let costLab = this.upCon.getChildByName('costLab').getComponent(cc.Label);
            costLab.string = `${cost}`;
        } else {
            this.upCon.active = false;
            this.upVideo.active = false;
            this.maxNode.active = true;
        }
    }
    /**技能升级刷新 */
    freshSkillUp(id: number) {
        if (!this.curItem) {
            return;
        }
        this.curItem.setLvl();
        this.setItemShow(this.curItem);
    }

    /**升级 */
    onSkillUpBtn() {

        if (!this.curItem) return;
        let data = this.curItem.m_data;
        app.dataMgr.roleProxy.skillUp(data.id);
    }

    onSkillUpVideo() {
        if (!this.curItem) return;
        app.justTrack('强化视频次数');
        zs.Native.TenjinTrackEvent("cv_8")
        zs.platform.async.playVideo().then(
            r => {
                if (r) {
                    app.justTrack('强化视频次数成功');
                    zs.Native.TenjinTrackEvent("cv_9")
                    let data = this.curItem.m_data;
                    app.dataMgr.roleProxy.skillUp(data.id, true);
                }
            }
        ).catch(e => {
            zs.platform.sync.showToast("暂时没有视频资源");
        })
    }

    onClose() {
        NodePoolMgr.ins.putItem(PoolName.StrenthItem, this.itemContent.children);
    }

    closeUi(): void {
        super.closeUi();
        zs.core.workflow.childNext();
    }

    // update (dt) {}
}

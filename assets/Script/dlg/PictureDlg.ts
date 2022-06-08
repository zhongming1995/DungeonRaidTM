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
import PictureItem from "./PictureItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PictureDlg extends BasePopup {

    @property(cc.Node)
    itemContent: cc.Node = null;

    @property(cc.Prefab)
    itemPre: cc.Prefab = null;

    @property(cc.Sprite)
    curIcon: cc.Sprite = null;

    @property(cc.Label)
    nameLab: cc.Label = null;

    @property(cc.Label)
    extraLab: cc.Label = null;

    @property(cc.Label)
    descLab: cc.Label = null;

    @property(cc.Node)
    unknown: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() { }

    curItem: PictureItem;
    start() {
        super.start();
        this.loadPictureItems();
        app.justTrack("图鉴打开次数");
        zs.Native.TenjinTrackEvent("cv_49")
    }


    loadPictureItems() {
        let cb = this.evtCallBack.bind(this);
        let copyItem: cc.Node = null, cmp: PictureItem;

        let items = app.confMgr.conf.item.getConfArr();
        items = items.filter(e => {
            return e.item_show > 0;
        })

        items.sort((a, b) => {
            return a.rank_id - b.rank_id;
        })

        for (let i = 0; i < items.length; i++) {
            copyItem = NodePoolMgr.ins.getItem(PoolName.PictureItem);
            if (!copyItem) {
                copyItem = cc.instantiate(this.itemPre);
            }

            copyItem.parent = this.itemContent;
            cmp = copyItem.getComponent(PictureItem);

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

    evtCallBack(e: PictureItem) {
        this.setItemShow(e);
    }

    setItemShow(cur: PictureItem) {
        if (this.curItem == cur) {
            return;
        }
        if (this.curItem) {
            this.curItem.setSelect(false);
        }
        this.curItem = cur;
        cur.setSelect(true);

        let data = cur.m_data;
        if (cur.m_has) {
            this.nameLab.string = data.item_name;
            this.descLab.string = data.item_detail;
            this.extraLab.string = data.item_detailExtra;
            this.curIcon.spriteFrame = ResMgr.ins.getItemSp(data.item_icon);
            this.unknown.active = false;
        } else {

            this.nameLab.string = '??';
            this.descLab.string = '未找到';
            this.extraLab.string = '';
            this.curIcon.spriteFrame = null;
            this.unknown.active = true;
        }

    }

    onClose() {
        NodePoolMgr.ins.putItem(PoolName.PictureItem, this.itemContent.children);

    }

    closeUi(): void {
        super.closeUi();
        zs.core.workflow.childNext();
    }

    // update (dt) {}
}

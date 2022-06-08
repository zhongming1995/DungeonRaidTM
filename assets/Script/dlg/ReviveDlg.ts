// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameLogic from "../../zsLibs/GameLogic";
import { app } from "../app";
import ItemHelper from "../common/ItemHelper";
import BasePopup from "../core/gui/BasePopup";
import Util from "../core/utils/Util";
import { BattleModeType, EventName, PopupName, SceneNameEnum } from "../Defines";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ReviveDlg extends BasePopup {

    lab_chaofeng: cc.Label;

    @property([cc.SpriteFrame])
    title: cc.SpriteFrame[] = [];
    @property([cc.SpriteFrame])
    title_en: cc.SpriteFrame[] = [];
    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Node)
    lbl_desc: cc.Node = null;

    pid = 1;

    onLoad(): void {
        app.justTrack("复活界面打开次数");
        zs.Native.TenjinTrackEvent("cv_50")

        if (ItemHelper.isDoubleMode()) {
            //结束本局游戏
            this.lbl_desc.active = true;
        }
    }

    protected onEnable(): void {
        super.onEnable();
        zs.Native.ShowBanner();
    }

    protected onDisable(): void {
        super.onDisable();
        zs.Native.HideBanner();
    }

    initData(params: any): void {
        // super.onLoad();
        console.error("initData : ", params)
        let idx = params && params[0];
        if (params && params[1]) {
            this.pid = params[1];
        }

        let title = this.title;
        try {
            if (window["Language"].LanguageMgr.languageType == 'en') {
                title = this.title_en;
            }
        } catch (error) {
            console.error(error);
            title = this.title;
        }
        try {
            this.icon.spriteFrame = title[idx];
        } catch (error) {
            console.warn("ReviveDlg initData : ", error);
        }
    }

    clickRevive() {
        // let str = `等级${app.dataMgr.battleRoleData.lvl}_复活`;
        app.justTrack('复活界面视频次数');
        zs.Native.TenjinTrackEvent("cv_52")
        zs.platform.async.playVideo().then(r => {
            if (r) {
                app.justTrack('复活界面视频次数成功');
                zs.Native.TenjinTrackEvent("cv_53")
                let batData = app.dataMgr.battleData.getRoleData(this.pid);
                if (ItemHelper.isDoubleMode()) {
                    batData && batData.relive();
                } else {
                    batData && batData.relive();
                }
                this.closeUi();
                // zs.core.workflow.childNext("PLAY");
            }
        }).catch(e => {
            zs.platform.sync.showToast("暂时没有视频资源");
        })
    }

    clickBack() {
        this.closeUi();
        GameLogic.isShowOver = true;
        // app.layerMgr.open(PopupName.ResultDlg);
        zs.core.workflow.childNext();
    }
}

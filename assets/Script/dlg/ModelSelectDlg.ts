// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../app";
import BasePopup from "../core/gui/BasePopup";
import { BattleModeType, PopupName } from "../Defines";
import ModelItem from "./ModelItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ModelSelectDlg extends BasePopup {

    @property(ModelItem)
    modeItems: ModelItem[] = []

    curItem: ModelItem = null;
    // LIFE-CYCLE CALLBACKS:

    @property(cc.Node)
    sp: cc.Node = null;

    @property(cc.Button)
    startBtn: cc.Button = null;

    @property(cc.Label)
    lblDoubleVideoNum: cc.Label = null;

    gameCount = 0;
    videoNum = 0;

    onLoad() {
        console.log("onLoad")
        this.sp.active = false;
        this.gameCount = Number(zs.utils.getItem("first_gameCount"));
        this.gameCount = this.gameCount > 0 ? this.gameCount : 0;
        this.videoNum = Number(zs.utils.getItem("double_video_num"));
        this.videoNum = this.videoNum > 0 ? this.videoNum : 0;
        console.log("videoNum:" + this.videoNum);
        console.log("gameCount:" + this.gameCount);
    }

    start() {
        super.start();
        console.log("选择模式界面打开")
        app.justTrack('模式选择界面打开次数');
        zs.Native.TenjinTrackEvent("cv_40")
    }

    initUI() {
        console.log("选择模式界面打开222")
        let modes = [BattleModeType.dazhao, BattleModeType.douleLive, BattleModeType.tangping];
        this.modeItems.forEach((e, i) => {
            e.setSelect(false);
            e.setMode(modes[i], this);

            if (i == 0) {
                this.setCurItem(e);
            } else if (i == 1) {
                if (this.gameCount >= 1) {
                    if (this.videoNum >= 3) {
                        this.lblDoubleVideoNum.string = "";
                    } else {
                        this.lblDoubleVideoNum.string = "(" + this.videoNum + "/3)";
                    }
                } else {
                    this.lblDoubleVideoNum.string = "";
                }
            }
        })

    }

    setCurItem(cur: ModelItem) {
        console.log("setCurItem")
        if (this.curItem) {
            this.curItem.setSelect(false);
        }
        this.curItem = cur;
        cur.setSelect(true);

        if (this.curItem.mode == BattleModeType.douleLive) {
            if (this.gameCount == 0) {
                this.sp && (this.sp.active = false);
            } else {
                this.sp && (this.sp.active = this.videoNum < 3);
            }
        } else {
            this.sp && (this.sp.active = false);
        }
    }


    modeBackEvt(target: ModelItem) {
        console.log("modeBackEvt")
        if (target == this.curItem) {
            return;
        }
        this.setCurItem(target);
        this.startBtn.enabled = target.mode != BattleModeType.tangping;
        this.startBtn.interactable = target.mode != BattleModeType.tangping;
        if (target.mode == BattleModeType.tangping) {
            console.log("躺平模式");
            app.layerMgr.open(PopupName.OutVideoDlg);
        }
    }


    /**开始游戏 */
    onStartBtn() {
        console.log("onStartBtn")
        let call = () => {
            super.closeUi();
            let mode = this.curItem.mode;
            app.dataMgr.selectMode = mode;
            let str = mode == 0 ? '大招' : '双生'
            let str2 = mode == 0 ? 'cv_41' : 'cv_42';
            app.justTrack(str + '模式点击次数');
            zs.Native.TenjinTrackEvent(str2);
            // app.layerMgr.open(PopupName.ChooseRoleDlg);//yc 代码片段已经移至 GameLogic.ts
            zs.core.workflow.childNext();
        }
        console.log("onStartBtn 2")
        if (this.curItem.mode == 2 && this.gameCount > 0) {
            console.log("onStartBtn 23")
            app.justTrack("双人模式看视频进入");
            zs.Native.TenjinTrackEvent("cv_43")
            zs.platform.async.playVideo().then(
                r => {
                    if (r) {
                        app.justTrack("双人模式看视频进入完成");
                        zs.Native.TenjinTrackEvent("cv_44")
                        zs.utils.setItem("double_video_num", (this.videoNum + 1).toString());
                        call();
                    } else {
                        zs.platform.sync.showToast('观看完整视频获得奖励')
                    }
                }
            ).catch(
                e => {
                    zs.platform.sync.showToast('暂时没有视频资源');
                }
            )
        } else {
            app.justTrack("双人模式首次免费进入");
            zs.Native.TenjinTrackEvent("cv_45")
            console.log("onStartBtn 4")
            call();
        }
    }

    closeUi(): void {
        super.closeUi();
        zs.core.workflow.childNext("HOME");
    }

    // update (dt) {}
}

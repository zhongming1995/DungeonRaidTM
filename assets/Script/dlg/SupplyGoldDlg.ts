// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../app";
import BasePopup from "../core/gui/BasePopup";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SupplyGoldDlg extends BasePopup {


    @property(cc.Label)
    goldLab: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        super.start();
    }

    evt = null;

    initData(params: any): void {
        // console.error()
        if (params) {
            this.evt = params[0]
            // app.justTrack('金币弹窗打开次数' + this.evt);
            app.justTrack('金币弹窗打开次数');
            zs.Native.TenjinTrackEvent("cv_10")
        }
    }

    initUI() {
        this.goldLab.string = '+' + app.confMgr.conf.prop.videoGold;
    }

    onVideoGetBtn() {
        let str = "金币弹窗视频次数" //+ this.evt;
        zs.Native.TenjinTrackEvent("cv_11")
        app.justTrack(str);
        zs.platform.async.playVideo().then(r => {
            if (r) {
                app.justTrack(str + '成功');
                zs.Native.TenjinTrackEvent("cv_12")
                app.dataMgr.roleProxy.addGold(app.confMgr.conf.prop.videoGold, 1);
                this.closeUi();
            }
        }).catch(e => {
            zs.platform.sync.showToast("暂时没有视频资源");
        })
    }

    // update (dt) {}
}

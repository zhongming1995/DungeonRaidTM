/*
* @ Author: yangcheng
* @ Data: 2022-03-31 17:16
*/

import BasePopup from "../core/gui/BasePopup";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OutVideo extends BasePopup {

    @property(cc.Node)
    btnGiveUp: cc.Node = null;

    @property(cc.Node)
    btnOk: cc.Node = null;

    onLoad(): void {

    }

    initData(params: any): void {
        let call = () => {
            this.scheduleOnce(() => {

            }, 0.2);
        }
        this.openAni(call);
    }

    btnCancelClick() {
        this.closeUi();
    }

    btnOkClick() {
        zs.platform.async.playVideo().then(r => {
            if (r) {
                zs.Native.TrackEvent("助力视频点");

            }
        }).catch(e => {
            zs.platform.sync.showToast("暂时没有视频资源");
        })
    }


}
import FGUI_RecordPage from "./export/FGUI_RecordPage";
import ProductKey from "./ProductKey";

/*
* @ Desc:  头条分享录屏界面
* @ Author: jiangdiwei
* @ Data: 2021-07-16 10:45
*/
export default class tt_shareRecord extends zs.fgui.baseGeneric<FGUI_RecordPage>{

    static typeDefine = FGUI_RecordPage;

    public event: any;
    public closeEvent: any = null;

    constructor(component) {
        super(component);
        if (component && component instanceof FGUI_RecordPage) {
            console.log(this.view)
            zs.proxy.Event.FGUIOnClick(this.view.btn_drop_share, this, this.onDropClick)
            zs.proxy.Event.FGUIOnClick(this.view.btn_share, this, this.onShareRecord)
            zs.proxy.Event.FGUIOnClick(this.view.btn_share_area, this, this.onShareRecord)
        }
    }

    setRewardEvent(event) {
        this.event = event;
        return this;
    }

    setCloseHandler(callback: zs.Handler) {
        this.closeEvent = callback;
    }

    apply(): tt_shareRecord {
        console.log("=======>分享录屏页面apply")
        zs.platform.sync.recorderStop();
        let zs_switch = ProductKey.zs_switch;
        let delay_time = ProductKey.zs_button_delay_time;
        if (zs_switch && delay_time > 0) {
            this.view.btn_drop_share.visible = false;
            zs.Timer.inst.once(delay_time, this, () => {
                try {
                    this.view.btn_drop_share.visible = true;
                } catch (error) { }
            });
        }
        return this;
    }

    applyConfig(config) {
        if (config) {
            config.event && this.setRewardEvent(config.event);
        }
        return this.apply();
    }

    onDropClick() {
        this.onCloseClick();
    }

    onCloseClick(isSuccess = false) {
        this.view.visible = false;
        cc.systemEvent.emit("share_recore_result", isSuccess)
        if (this.closeEvent)
            this.closeEvent.run();
        else
            zs.core.workflow.childNext();
    }

    onShareRecord() {
        this.setBtnTouchEnable(false);
        if (zs.platform.sync.canShareRecorder()) {
            zs.platform.async.shareRecorderVideo().then(() => {
                //分享录屏成功并领取奖励
                zs.platform.sync.showToast("分享录屏成功！");
                this.setBtnTouchEnable(true);
                zs.core.workflow.runEventConfig(this.event);
                this.onCloseClick(true);
            }).catch(() => {
                //分享录屏失败
                zs.platform.sync.showToast("分享录屏失败！");
                this.setBtnTouchEnable(true);
                this.onCloseClick();
            })
        } else {
            zs.platform.sync.showToast("录屏时间太短！");
            this.setBtnTouchEnable(true);
            this.onCloseClick();
        }

    }

    setBtnTouchEnable(val) {
        this.view.btn_drop_share.touchable = val;
        this.view.btn_share.touchable = val;
    }
}
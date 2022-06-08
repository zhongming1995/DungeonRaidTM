import FGUI_KnockVideo from "./export/FGUI_KnockVideo";


/*
* @ Desc:  
* @ Author: jiangdiwei
* @ Data: 2021-07-16 14:25
*/
export default class tt_knockEgg extends zs.ui.EggKnock {

    static typeDefine = FGUI_KnockVideo;
    // 砸金蛋进度条
    _progressBar: fairygui.GProgressBar;
    // 砸金蛋按钮
    _btnKnock;

    btnSrcOffset = 0;
    btnDstOffset = 370;
    progress = 0;
    constructor(component) {
        super(component);
        if (component && component instanceof FGUI_KnockVideo) {
            this._progressBar = component.bar;
            this._btnKnock = component.btn_click;
        }
    }

    get btnKnock(): fairygui.GButton {
        return this._btnKnock;
    }

    onAppShow() {
    }
    onAppHide() {
    }

    updateProgress(value: number) {
        this._progressBar.value = value * 100;
    }

    handleClick(progress) {
        if (progress >= this.bannerPoint && !this.isOpenAd) {
            this.isOpenAd = true;
            zs.platform.async.playVideo().then(() => {
                console.log("是实打实大苏打");
                this.progress = 1;
            }).catch(() => {
            });
        }
    }

    onFinish() {
        super.onFinish();
        zs.core.workflow.childNext();
    }

}
import FGUI_btn_more_game from "./export/FGUI_btn_more_game";

/*
* @ Desc: 头条更多游戏按钮
* @ Author: jiangdiwei
* @ Data: 2021-07-16 10:53
*/
export default class tt_btnMoreGame extends zs.fgui.baseGeneric<FGUI_btn_more_game>{

    static typeDefine = FGUI_btn_more_game;

    constructor(component) {
        super(component);
        if (component && component instanceof FGUI_btn_more_game) {
            zs.proxy.Event.FGUIOnClick(this.view, this, this.onClick)
        }
    }

    apply() {
        let isIos = cc.sys.os = cc.sys.OS_IOS;
        this.view.visible = !isIos;
        return this;
    }

    /**
     * 显示头条更多游戏
     */
    onClick() {
        zs.platform.async.showMoreGamesModalSimple().then((isToGame) => {
            zs.log.debug("是否跳转了其它小游戏", isToGame);
        }).catch(() => {
            zs.log.debug("跳转了其它小游戏失败");
        });
    }
}
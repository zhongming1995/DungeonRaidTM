import workflow from "../../zsLibs/template/workflow";
import { app } from "../app";
import { JsonModule } from "../core/conf/ClientConfigMgr";
import BasePopup from "../core/gui/BasePopup";
import ResMgr from "../core/resLoad/ResMgr";
import { EventName } from "../Defines";
import DropMgr from "../logics/DropMgr";

/*
* @ Author: yangcheng
* @ Data: 2022-03-29 09:16
*/
const { ccclass, property } = cc._decorator;

@ccclass
export default class StartEnhanceDlg extends BasePopup {

    sp_icon: cc.Sprite = null;
    btn_video: cc.Node = null;
    btn_close: cc.Node = null;
    lab_desc: cc.Label = null;

    m_data: JsonModule.IItemJson = null;

    onLoad(): void {
        super.onLoad();
        //获取组件
        this.sp_icon = this.node.getChildByName("sp_bg").getChildByName("sp_icon").getComponent(cc.Sprite);
        let bottomBtn = this.node.getChildByName("bottom_btn");
        this.btn_video = bottomBtn.getChildByName("btn_video");
        this.btn_close = bottomBtn.getChildByName("btn_close");
        this.lab_desc = this.node.getChildByName("lab_desc").getComponent(cc.Label);
        //绑定事件
        let click = cc.Node.EventType.TOUCH_START;
        this.btn_close.on(click, this.closeUi, this);
        this.btn_video.on(click, this.onPlayVideo, this);
        //获取数据
        this.m_data = app.confMgr.conf.item.getConfById(100024);
        // console.log("free itme :: ",this.m_data);
        //加载icon
        this.sp_icon.spriteFrame = ResMgr.ins.getItemSp(this.m_data.item_icon);
    }

    onPlayVideo() {
        app.audioMgr.playEffect("button");
        app.justTrack('开局增强视频次数');
        zs.Native.TenjinTrackEvent("cv_61")
        zs.platform.async.playVideo().then(r => {
            if (r) {
                app.justTrack('开局增强视频次数成功');
                zs.Native.TenjinTrackEvent("cv_62")
                this.award();
            }
        }).catch(e => {
            zs.platform.sync.showToast("暂时没有视频资源");
        })
    }

    award() {
        //获得奖励
        DropMgr.ins.meetDropItem(1, this.m_data.id, false);
        this.closeUi();
    }

    closeUi(): void {
        app.audioMgr.playEffect("buttonClose");
        super.closeUi();
        //start Game;
        zs.core.workflow.state == workflow.GAME_PLAY && zs.core.workflow.childNext();
    }

    protected onEnable(): void {
        app.eventMgr.emit(EventName.game_pause, true);
    }
    protected onDisable(): void {
        app.eventMgr.emit(EventName.game_pause, false);
        app.gameMgr.waveMng.startWaves();
    }
}
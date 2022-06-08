import workflow from "../../zsLibs/template/workflow";
import { app } from "../app";
import { JsonModule } from "../core/conf/ClientConfigMgr";
import BasePopup from "../core/gui/BasePopup";
import ResMgr from "../core/resLoad/ResMgr";
import { EventName } from "../Defines";



const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinUnlockDlg extends BasePopup {

    @property(cc.Node)
    lightImg: cc.Node = null;

    @property(cc.Sprite)
    sp_icon: cc.Sprite = null;

    @property(cc.Label)
    descLab: cc.Label = null;


    m_id: number = 5;

    onLoad(): void {
        super.onLoad();

    }
    initUI() {

        cc.tween(this.lightImg)
            .by(3, { angle: 360 })
            .repeatForever()
            .start();

        let conf = app.confMgr.conf.role.getConfById(this.m_id);
        this.sp_icon.spriteFrame = ResMgr.ins.getRoleSp(this.m_id);
        this.descLab.string = conf.role_detail;

    }

    onPlayVideo() {
        app.justTrack("皮肤解锁美杜莎")
        zs.Native.TenjinTrackEvent("cv_59")
        app.audioMgr.playEffect("button");
        zs.platform.async.playVideo().then(r => {
            if (r) {
                app.justTrack("皮肤解锁美杜莎成功")
                zs.Native.TenjinTrackEvent("cv_60")
                app.dataMgr.roleProxy.unLockRole(5);
                this.closeUi();
            }
        }).catch(e => {
            zs.platform.sync.showToast("暂时没有视频资源");
        })
    }

    closeUi(): void {
        app.audioMgr.playEffect("buttonClose");
        super.closeUi();

        // zs.core.workflow.state == workflow.GAME_PLAY && zs.core.workflow.childNext();
    }


    protected onEnable(): void {
        app.eventMgr.emit(EventName.game_pause, true);
    }
    protected onDisable(): void {
        app.eventMgr.emit(EventName.game_pause, false);
    }
}
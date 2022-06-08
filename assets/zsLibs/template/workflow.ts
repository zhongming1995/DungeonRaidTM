import * as sdk from "../index";sdk;
import exportBinder from "./export/exportBinder";
import ProductKey from "./ProductKey";
import tt_btnMoreGame from "./tt_btnMoreGame";
import tt_shareRecord from "./tt_shareRecord";
import tt_knockEgg from "./tt_knockEgg";

export default class workflow extends zs.workflow {
    static readonly PRODUCT_START = "PRODUCT_START";
    static readonly PRODUCT_BEGIN = "PRODUCT_BEGIN";
    static readonly GAME_HOME = "GAME_HOME";
    static readonly PRODUCT_HOME_PLAY = "PRODUCT_HOME_PLAY";
    static readonly GAME_PLAY = "GAME_PLAY";
    static readonly PRODUCT_PLAY_END = "PRODUCT_PLAY_END";
    static readonly GAME_END = "GAME_END";
    static readonly PRODUCT_FINISH = "PRODUCT_FINISH";

    //更多好玩按钮
    static readonly btn_more_game = "btn_more_game";
    //分享录屏界面
    static readonly share_record = "share_record";
    //开局砸视频界面
    static readonly knock_video_egg = "knock_video_egg";
    //结束咋视频
    static readonly knock_video_egg_over = "knock_video_egg_over";
    //显示开局视频误触
    static readonly event_start_video = "event_start_video";
    //进入游戏(开始录屏和显示单像素banner)
    static readonly event_game_play = "event_game_play";
    //显示插屏广告
    static readonly event_show_insert = "event_show_insert";
    //派发分享录屏奖励
    static readonly event_share_record_reward = "event_share_record_reward";
    //显示砸视频
    static readonly event_show_knock_video = "event_show_knock_video";
    //显示分享录屏弹窗
    static readonly event_show_share_record = "event_show_share_record"
    //显示游戏进行中视频误触
    static readonly event_game_video = "event_game_video";

    //检测是否砸视频
    static readonly event_check_egg = "event_check_egg";
    //暂停录屏
    static readonly event_record_pause = "event_record_pause";

    static showPanel(type?: typeof zs.fgui.base, fit?: zs.fgui.FitType): zs.fgui.window {
        return zs.fgui.manager.show(true, type, "Workflow_Export", fit);
    }

    static getPanel(): zs.fgui.window {
        return zs.fgui.manager.get("Workflow_Export", true);
    }

    exporterPack = "export/export";
    inRecord: boolean = false;

    _shareRecord: tt_shareRecord = null;

    registe() {
        super.registe();
        exportBinder.bindAll();
        zs.fgui.configs.registeBase(workflow.btn_more_game, tt_btnMoreGame);
        zs.fgui.configs.registeBase(workflow.share_record, tt_shareRecord);
        zs.fgui.configs.registeBase(workflow.knock_video_egg, tt_knockEgg);
        zs.core.workflow.registeEvent(workflow.event_start_video, this, this.playVideo);
        zs.core.workflow.registeEvent(workflow.event_game_play, this, this.gamePlay);
        zs.core.workflow.registeEvent(workflow.event_record_pause, this, this.recordPause);
        zs.core.workflow.registeEvent(workflow.event_show_insert, this, this.showInterstitialAd);
        zs.core.workflow.registeEvent(workflow.event_share_record_reward, this, this.onRecordShareReward);
        zs.core.workflow.registeEvent(workflow.event_show_knock_video, this, this.showKnockVideo);
        zs.core.workflow.registeEvent(workflow.event_check_egg, this, zs.ui.EggKnock.checkEggOpen);
        zs.core.workflow.registeEvent(workflow.event_show_share_record, this, this.showShareRecordView);
        zs.core.workflow.registeEvent(workflow.event_game_video, this, this.playGameVideo);
        // zs.core.workflow.registeEvent(workflow.event_check_egg, this, () => { return true }, true);
    }

    /**
     * 开局视频误触
     */
    playVideo(config: any = {}) {
        console.error("谁调用了这个???");
        if (!config.switch || ProductKey[config.switch]) {
            zs.platform.async.playVideo().then((result) => {
                console.log("视频播放结果1", result);
                zs.core.workflow.childNext();
            }).catch(() => {
                console.log("视频播放出错");
                zs.core.workflow.childNext();
            });
        } else {
            zs.core.workflow.childNext();
        }
    }

    /**游戏中定时拉视频 */
    playGameVideo() {
        zs.platform.async.playVideo().then((result) => {
            console.log("视频播放结果1", result);
            zs.core.workflow.childNext();
        }).catch(() => {
            console.log("视频播放出错");
            zs.core.workflow.childNext();
        });
    }

    gamePlay() {
        if (!this.inRecord) {
            let zs_best_videotape_time = ProductKey.zs_best_videotape_time / 1000;
            let zs_hide_banner_switch = ProductKey.zs_hide_banner_switch;
            //开始录屏
            zs.platform.sync.recorderStart({ maxTime: zs_best_videotape_time });
            //显示单像素banner
            if (zs_hide_banner_switch) {
                zs.platform.sync.showOnePixelBanner();
            }
        }
        else {
            zs.platform.sync.recorderResume();
        }
    }

    recordPause() {
        zs.platform.sync.recorderPause();
    }

    showInterstitialAd() {
        if (ProductKey.zs_full_screen_ad) {
            zs.platform.async.showInterstitialAd().then(() => {
                console.log("显示并关闭了插屏");
                // zs.core.workflow.childNext();
            }).catch(() => {
                console.log("插屏显示有误，中断显示");
                // zs.core.workflow.childNext();
            });
        } else {
            console.log("插屏开关关闭");
        }
    }

    onRecordShareReward() {
    }

    showKnockVideo() {
        console.error("谁调用了这个???2");
        zs.platform.async.playVideo().then((result) => {
            console.log("视频播放结果2", result);
            if (result) {
                //获得砸视频奖励
            }
            zs.core.workflow.childNext();
        }).catch(() => {
            console.log("视频播放出错");
            zs.core.workflow.childNext();
        });
    }

    /**
     * @returns 
     */
    showShareRecordView() {
        console.log("====1")
        if (this._shareRecord) { return; }
        console.log("====2")
        return workflow.showPanel(tt_shareRecord)
            .block(true)
            .fit()
            .update<tt_shareRecord>(tt_shareRecord, (unit) => {
                this._shareRecord = unit;
                unit.setCloseHandler(zs.Handler.create(this, () => {
                    this.hideShareRecordView();
                })
                )
                unit.applyConfig({});
            }).front();
    }

    hideShareRecordView() {
        this._shareRecord && (workflow.getPanel().detach(this._shareRecord));
        this._shareRecord = null;
    }
}
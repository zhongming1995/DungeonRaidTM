import { app } from "../Script/app";
import ItemHelper from "../Script/common/ItemHelper";
import { BattleModeType, EventName, PopupName, SceneNameEnum, SoundName } from "../Script/Defines";
import { btnRecord } from "./btnRecord";
import ProductKey from "./template/ProductKey";
import workflow from "./template/workflow";

/*
* @ Author: yangcheng
* @ Data: 2022-03-21 09:20
*/
export default class GameLogic {

    static firstInit = false;

    static firstPlay = false;

    /**不显示选择模式界面 */
    static dontShowModeSelect = false;

    static GameToHome = false;

    static workflow: workflow = null;

    static isShowOver = true;

    /**最后一次展示插屏时间 */
    static lastInsertTime = 0;
    static startTime = 0;
    static showGameInsertAd(showFunc, closFunc) {
        if (this.lastInsertTime == 0) {
            return;
        }
        let time = Date.now() - this.lastInsertTime;
        console.error(time)
        if (time < (150 * 1000)) {
            console.log("游戏结束插屏 正在cd中 : ", (Date.now() - this.lastInsertTime) / 1000);
            return;
        }
        zs.Native.setInterstitialShowCallBack(() => {
            showFunc && showFunc();
        });
        zs.Native.setInterstitialCloseCallBack(() => {
            closFunc && closFunc();
            //移除所有回调
            zs.Native.clearInterstitialCallBack();
            //记录最后一次展示时间
            this.lastInsertTime = Date.now();
        });
        zs.Native.ShowInsertAd();
    }

    static showInsertByTime() {
        if (Date.now() - GameLogic.startTime >= 300 * 1000) {
            zs.Native.ShowInsertAd();
        } else {
            console.log("OpenMediation启动不超过300秒。不弹插屏")
        }
    }


    static checkGm() {
        return false;
    }

    static async init() {
        window["Language"] && await window["Language"].LanguageMgr.init("en");
        this.startTime = Date.now();
        zs.log.Configs.logLevel = zs.log.Level.DEBUG;
        this.workflow = new workflow();
        zs.core.workflow = this.workflow;

        zs.core.onPrepare = zs.Handler.create(this, () => { });
        //------------------------------Registe_States------------------------------------------------
        //GAME_HOME
        let home = "HOME";
        let child = "CHILD";
        let modeSelect = "MODESELECT";
        let roleSelect = "ROLESELECT";
        /**开局增强 */
        let enhance = "ENHANCE";
        //GAME_PLAY
        let play = "PLAY";
        let pause = "PAUSE";
        let revive = "REVIVE";
        let settle = "SETTLE";
        let box = "BOX";

        zs.core.workflow.setFSM(workflow.GAME_HOME, new zs.fsm()
            //选择模式
            .registe(home, modeSelect, 1)
            .registe(modeSelect, home, -1)
            //选择角色
            .registe(modeSelect, roleSelect, 1)
            //选择角色界面返回首页
            .registe(roleSelect, home, 1)
            .registe(roleSelect, modeSelect, -1)

            .registe(home, child, -1)
            .registe(child, home)

            .setDefault(home)
        )

        zs.core.workflow.setFSM(workflow.GAME_PLAY, new zs.fsm()
            // .registe(play, pause, -1)
            // .registe(pause, play)

            // //技能宝箱奖励
            // .registe(play, box, -2)
            // .registe(box, play)

            // //play-复活
            // .registe(play, revive, 1)
            // //复活-结算
            // .registe(revive, settle, 1)
            // //复活-play
            // .registe(revive, play, -1)

            //开局增强
            .registe(play, enhance)
            .registe(enhance, play)
            //play-结算-返回首页
            .registe(play, settle, 2)

            .setDefault(play)
        )

        //------------------------------GAME_HOME------------------------------------------------
        zs.core.onWorkflow(workflow.GAME_HOME, zs.Handler.create(this, () => {
            console.warn(workflow.GAME_HOME);
            this.GameToHome = false;
            this.isShowOver = false;
        }))

        zs.core.onWorkflow(workflow.GAME_HOME + `.${home}`, zs.Handler.create(this, () => {
            console.warn(workflow.GAME_HOME + `.${home}`);
            app.sceneMgr.enterScene(SceneNameEnum.Home);
            app.justTrack("首页打开次数");
            zs.Native.TenjinTrackEvent("cv_18")
            // zs.Native.ShowBanner();

            if (!this.firstPlay) {
                this.firstPlay = true;
                app.audioMgr.playMusic(SoundName.fpx_home, () => {
                    app.audioMgr.playMusic(SoundName.bgm_game);
                }, false);
            } else {
                app.audioMgr.playMusic(SoundName.bgm_game);
            }
        }))

        zs.core.onWorkflow(workflow.GAME_HOME + `.${child}`, zs.Handler.create(this, () => {
            console.warn(workflow.GAME_HOME + `.${child}`);
            zs.Native.HideBanner();
        }))

        zs.core.onWorkflow(workflow.GAME_HOME + `.${modeSelect}`, zs.Handler.create(this, () => {
            console.warn(workflow.GAME_HOME + `.${modeSelect}`);
            // this.dontShowModeSelect = !!ProductKey.zs_hide_the_upgrade;
            // if (!this.dontShowModeSelect) {
            //     //运营需求 先隐藏起来
            //     zs.core.workflow.childNext();
            //     return;
            // }
            app.layerMgr.open(PopupName.ModelSelectDlg);
        }))

        zs.core.onWorkflow(workflow.GAME_HOME + `.${roleSelect}`, zs.Handler.create(this, () => {
            console.warn(workflow.GAME_HOME + `.${roleSelect}`);
            zs.Native.HideBanner();
            if (ItemHelper.isDaZhaoMode()) {
                app.layerMgr.open(PopupName.ChooseRoleDlg);
            } else if (ItemHelper.isDoubleMode()) {
                app.layerMgr.open(PopupName.DoubleChooseRoleDlg);
                // app.layerMgr.open(PopupName.DoubleSkillUpgradeDlg);
            }
        }))

        zs.core.onWorkflow(workflow.GAME_PLAY + `.${enhance}`, zs.Handler.create(this, () => {
            console.warn(workflow.GAME_PLAY + `.${enhance}`);
            //开局增强
            // app.layerMgr.open(PopupName.StartEnhanceDlg);
            if (ItemHelper.isDaZhaoMode()) {
                app.layerMgr.open(PopupName.StartWeaponDlg)
            } else if (ItemHelper.isDoubleMode()) {
                app.layerMgr.open(PopupName.DoubleStartWeaponDlg);
            }

        }))

        //------------------------------GAME_PLAY------------------------------------------------

        zs.core.onWorkflow(workflow.GAME_PLAY, zs.Handler.create(this, () => {
            console.warn(workflow.GAME_PLAY);
            this.addAutoVideoTrigger();
        }))

        zs.core.onWorkflow(workflow.GAME_PLAY + `.${play}`, zs.Handler.create(this, () => {
            console.warn(workflow.GAME_PLAY + `.${play}`);
            if (cc.director.getScene().name != SceneNameEnum.Game && cc.director.getScene().name != SceneNameEnum.DoubleGame) {
                console.error("curr scenes ", cc.director.getScene().name);
                if (ItemHelper.isDaZhaoMode()) {
                    app.sceneMgr.enterScene(SceneNameEnum.Game, (scene) => {
                        scene && (scene.name = SceneNameEnum.Game);
                        app.justTrack('进入大招版模式');
                        zs.Native.TenjinTrackEvent("cv_19")
                        zs.core.workflow.childState == play && zs.core.workflow.childNext(enhance)
                    })
                } else if (ItemHelper.isDoubleMode()) {
                    app.justTrack('进入双生模式');
                    zs.Native.TenjinTrackEvent("cv_20")
                    app.sceneMgr.enterScene(SceneNameEnum.DoubleGame, (scene) => {
                        scene && (scene.name = SceneNameEnum.DoubleGame);
                        zs.core.workflow.childState == play && zs.core.workflow.childNext(enhance);
                        //第二次开始玩就要看视频进去玩了
                        zs.utils.setItem('first_gameCount', '1');
                    })
                }

            }
            this.lastInsertTime = Date.now();
        }))

        //-----------------------------------以下暂时不用了---------------------------------------

        zs.core.onWorkflow(workflow.GAME_PLAY + `.${box}`, zs.Handler.create(this, () => {
            app.layerMgr.open(PopupName.OpenBoxDlg);
        }))

        zs.core.onWorkflow(workflow.GAME_PLAY + `.${pause}`, zs.Handler.create(this, () => {
            console.warn(workflow.GAME_PLAY + `.${pause}`);
            //暂停界面
            app.layerMgr.open(PopupName.RoleDetailDlg);
        }))

        zs.core.onWorkflow(workflow.GAME_PLAY + `.${revive}`, zs.Handler.create(this, () => {
            console.warn(workflow.GAME_PLAY + `.${revive}`);
            //复活界面
            app.layerMgr.open(PopupName.ReviveDlg);
        }))

        //-----------------------------------以上暂时不用了---------------------------------------

        zs.core.onWorkflow(workflow.GAME_PLAY + `.${settle}`, zs.Handler.create(this, () => {
            console.warn(workflow.GAME_PLAY + `.${settle}`);
            //结算界面
            console.error(this.isShowOver);
            if (this.isShowOver) {
                if (app.dataMgr.selectMode == BattleModeType.dazhao) {
                    app.layerMgr.open(PopupName.ResultDlg)
                }
                else {
                    app.layerMgr.open(PopupName.DoubleResultDlg)
                }
                this.isShowOver = false;
            } else {
                app.layerMgr.open(PopupName.OverDlg, null, () => {
                    if (app.dataMgr.selectMode == BattleModeType.dazhao) {
                        app.layerMgr.open(PopupName.ResultDlg)
                    } else {
                        app.layerMgr.open(PopupName.DoubleResultDlg)
                    }
                });
            }
            this.showInsertByTime();
            this.workflow.inRecord = false;
        }))

        //------------------------------PRODUCT_PLAY_END------------------------------------------------
        zs.core.onWorkflow(workflow.PRODUCT_PLAY_END, zs.Handler.create(this, () => {
            console.warn(workflow.PRODUCT_PLAY_END, "GameToHome :: " + this.GameToHome);
            if (this.GameToHome) {
                zs.core.workflow.next();
                return;
            }
        }))
        //------------------------------GAME_END------------------------------------------------
        zs.core.onWorkflow(workflow.GAME_END, zs.Handler.create(this, () => {
            console.warn(workflow.GAME_END, "GameToHome :: " + this.GameToHome);
            this.workflow.inRecord = false;
            if (this.GameToHome) {
                zs.core.workflow.next();
                return;
            }
            zs.core.workflow.next();
        }))
        //------------------------------GAME_END------------------------------------------------
        zs.core.onWorkflow(workflow.PRODUCT_FINISH, zs.Handler.create(this, () => {
            console.warn(workflow.PRODUCT_FINISH, "GameToHome :: " + this.GameToHome);
            if (this.GameToHome) {
                zs.core.workflow.next();
                return;
            }
        }))
        //------------------------------Registe_Event------------------------------------------------
        zs.core.workflow.registeEvent(workflow.event_share_record_reward, this, () => {

        });

        if (window['tt']) {
            // console.log = () => { };
            // console.warn = () => { };
        }

        //------------------------------Core_Init------------------------------------------------
        await zs.core.init(ProductKey, null);
        zs.platform.async.playVideo = () => {
            return new Promise((resolve, reject) => {
                zs.Native.PlayVideo(
                    () => {
                        let num = Number(zs.utils.getItem("视频次数"));
                        num++;
                        if (num == 3) {
                            zs.Native.TenjinTrackEvent("registration")
                        } else if (num == 5) {
                            zs.Native.TenjinTrackEvent("login")
                        }
                        resolve(true)
                    },
                    () => { resolve(false) },
                    () => { reject(false) });
            })
        };
    }

    static justTrack(evt: string, label: string, params = { userId: zs.core.userId }) {
        //td 上传
        zs.td.justTrack(evt, label, params);
    }


    //--------tt相关处理 start---------------------
    /**自动弹视频定时器 */
    public static addAutoVideoTrigger() {
        if (ProductKey.zs_switch && ProductKey.zs_native_gap_time > 0) {
            let interval = ProductKey.zs_native_gap_time * 1000;
            zs.Timer.inst.once(interval, this, this.onAutoVideoTime);
        }
    }
    /**游戏结束时。关闭定时器 */
    public static removeAutoVideoTrigger() {
        zs.Timer.inst.clear(this, this.onAutoVideoTime);
    }

    private static onAutoVideoTime() {
        // if (GameMananger.Instance.mainScene.isStart) {
        // GameMananger.Instance.GamePause();
        zs.platform.sync.recorderPause();
        this.removeAutoVideoTrigger();
        let self = this;
        zs.platform.async.playVideo()
            .then((isOver) => {
                self.addAutoVideoTrigger();
                // GameMananger.Instance.GameRegain();
                zs.platform.sync.recorderResume();
            })
            .catch(() => {
                // GameMananger.Instance.GameRegain();
                self.addAutoVideoTrigger();
                zs.platform.sync.recorderResume();
            });
        // }
    }

    public static onRecordClick() {
        if (zs.platform.sync.getRecorderTime() > 15) {
            console.log("直接分享视频")
            // this.recordMarkTip.visible = false;
            btnRecord.inst.node && (btnRecord.inst.node.active = false);
            zs.platform.sync.recorderStop({
                callback: () => {
                    // GameMananger.Instance.GamePause();
                    app.eventMgr.emit(EventName.game_pause, true);
                    zs.platform.async.shareRecorderVideo().then(() => {
                        //分享录屏成功并领取奖励
                        zs.platform.sync.showToast("分享录屏成功！")
                        zs.platform.sync.recorderStart({ maxTime: ProductKey.zs_best_videotape_time / 1000 });
                        // this.recordMarkTip.visible = true;
                        btnRecord.inst.node && (btnRecord.inst.node.active = true);
                        // PlayerData.playerInfo.goldNum += 100;
                        // PlayerData.PlayerInfo_save();
                        // zs.platform.sync.showToast("获得100金币！")
                        // GameMananger.Instance.GameRegain();
                        app.eventMgr.emit(EventName.game_pause, false);
                    }).catch(() => {
                        //分享录屏失败
                        zs.platform.sync.showToast("分享录屏失败！")
                        zs.platform.sync.recorderStart({ maxTime: ProductKey.zs_best_videotape_time / 1000 });
                        // this.recordMarkTip.visible = true;
                        btnRecord.inst.node && (btnRecord.inst.node.active = true);
                        // GameMananger.Instance.GameRegain();
                        app.eventMgr.emit(EventName.game_pause, false);
                    })
                }
            });
        } else {
            zs.platform.sync.showToast("录屏时间太短！")
        }
    }

    static updateCheck() {
        //这段对应自动录屏60后弹分享录屏功能 和 recoverGamePlay方法一同存在
        if (ProductKey.zs_game_share_video_switch && !this.isShowShareRecord && zs.platform.sync.getRecorderTime() >= 60) {
            console.log("====录屏时间达60s自动弹分享录屏页面")
            // Laya.stage.once("share_recore_result", this, this.recoverGamePlay);
            cc.systemEvent.once("share_recore_result", this.recoverGamePlay, this);
            this.isShowShareRecord = true;
            // GameMananger.Instance.GamePause();
            zs.core.workflow.runEventConfig("event_show_share_record");
            // this.recordMarkTip.visible = false;
            btnRecord.inst.node && (btnRecord.inst.node.active = false);
            app.eventMgr.emit(EventName.game_pause, true);
        }
    }

    private static isShowShareRecord: boolean = false;
    private static recoverGamePlay(result) {
        console.log("录屏页关闭回调===》", result)
        if (!result) {
            this.isShowShareRecord = false;
            zs.platform.sync.recorderStart({ maxTime: ProductKey.zs_best_videotape_time / 1000 });
            // this.recordMarkTip.visible = true;
            btnRecord.inst.node && (btnRecord.inst.node.active = true);
        } else {
            // PlayerData.playerInfo.goldNum += 100;
            // PlayerData.PlayerInfo_save();
            // zs.platform.sync.showToast("获得100金币！")
        }
        // GameMananger.Instance.GameRegain();
        app.eventMgr.emit(EventName.game_pause, false);
    }
    //--------tt相关处理 end---------------------
}
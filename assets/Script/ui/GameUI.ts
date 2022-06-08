import ProductKey from "../../zsLibs/template/ProductKey";
import { app } from "../app";
import ItemHelper from "../common/ItemHelper";
import ResMgr from "../core/resLoad/ResMgr";
import Util from "../core/utils/Util";
import { BattleModeType, EventName, PopupName } from "../Defines";
import GamePlayeUI from "../douleMode/GamePlayeUI";



const { ccclass, property } = cc._decorator;

@ccclass
export default class GameUI extends cc.Component {
    @property(cc.ProgressBar)
    barLevel: cc.ProgressBar = null;

    @property(cc.Label)
    lblLevel: cc.Label = null;

    @property(cc.Label)
    lblTime: cc.Label = null;

    @property(GamePlayeUI)
    playerUIs: GamePlayeUI[] = [];  // 玩家1  玩家2


    protected onLoad(): void {

        // let uplvVideo = this.node.getChildByName('uplvVideo');
        // let boxVideo = this.node.getChildByName('boxVideo');
        // if(uplvVideo){
        //     uplvVideo.active = !!ProductKey.zs_in_game_video;
        // }
        // if(boxVideo){
        //     boxVideo.active = !!ProductKey.zs_game_treasure_chest_video;
        // }

        app.eventMgr.on(EventName.battle_fresh_exp, this.updateExpBar, this);
        app.eventMgr.on(EventName.battle_fresh_gold, this.updateCoin, this);
        app.eventMgr.on(EventName.battle_fresh_killNum, this.updateKill, this);

    }

    onDisable(): void {
        app.eventMgr.off(EventName.battle_fresh_exp, this.updateExpBar, this);
        app.eventMgr.off(EventName.battle_fresh_gold, this.updateCoin, this);
        app.eventMgr.off(EventName.battle_fresh_killNum, this.updateKill, this);

    }
    initial(pdatds: any[]) {
        this.playerUIs.forEach((p, i) => {
            p.initPlayerData(pdatds[i]);
        })
        this.updateExpBar();
    }

    getPlayerUI(pid: number) {
        if (this.playerUIs.length == 0) return this.playerUIs[0];
        return this.playerUIs.find(e => {
            return e.pid == pid;
        })
    }

    /**设置单前时间 */
    setTimeStr(tm: number) {
        this.lblTime.string = Util.secondFormat(tm);
    }


    /**金币刷新 */
    updateCoin() {
        this.playerUIs.forEach(e => {
            e.updateCoin();
        })
    }

    /**击杀刷新 */
    updateKill() {
        this.playerUIs.forEach(e => {
            e.updateKills();
        })
    }

    /** 经验*/
    updateExpBar() {

        let btData = app.dataMgr.battleData;
        this.barLevel.progress = btData.exp / btData.maxExp;
        this.lblLevel.string = `${btData.lvl}`;
    }


    private clickPause() {
        if (ItemHelper.isDoubleMode()) {
            app.layerMgr.open(PopupName.DoubleRoleDetailDlg);// yc 代码片段移至 GameLogic.ts  
        } else {
            app.layerMgr.open(PopupName.RoleDetailDlg);// yc 代码片段移至 GameLogic.ts  
        }
    }

    gameUpdate(dt) {
        this.playerUIs.forEach(e => {
            e.gameUpdate(dt);
        })
    }

    videoUpLv() {
        let str = '升级视频次数';
        zs.Native.TenjinTrackEvent("cv_14")
        if (ItemHelper.isDoubleMode()) {
            str = "双生" + str;
        }
        app.justTrack(str);
        zs.platform.async.playVideo().then(r => {
            if (r) {
                zs.Native.TenjinTrackEvent("cv_15")
                app.justTrack(str + '成功');
                app.dataMgr.battleData.addExp(app.dataMgr.battleData.maxExp);
            }
        }).catch(e => {
            zs.platform.sync.showToast("暂时没有适配资源");
        })
    }

    videoBox() {
        let str = '宝箱视频次数';
        zs.Native.TenjinTrackEvent("cv_16")
        if (ItemHelper.isDoubleMode()) {
            str = "双生" + str;
        }
        app.justTrack(str);
        zs.platform.async.playVideo().then(r => {
            if (r) {
                app.justTrack(str + '成功');
                zs.Native.TenjinTrackEvent("cv_17")
                if (ItemHelper.isDoubleMode()) {
                    app.layerMgr.open(PopupName.DoubleOpenBoxDlg);
                } else {
                    app.layerMgr.open(PopupName.OpenBoxDlg);
                }
            }
        }).catch(e => {
            zs.platform.sync.showToast("暂时没有适配资源");
        })
    }
}
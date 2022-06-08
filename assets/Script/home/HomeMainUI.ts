import workflow from "../../zsLibs/template/workflow";
import { app } from "../app";
import { AchieveState, EventName, PopupName, SceneNameEnum } from "../Defines";
import PlatformMgr from "../PlatformMgr";

enum btnEnum {
    picture = 0,
    strength = 1,
    achieve = 2
}
const { ccclass, property } = cc._decorator;

@ccclass
export default class HomeMainUI extends cc.Component {

    @property(cc.Label)
    goldLab: cc.Label = null;

    @property(cc.Node)
    strengthBtn: cc.Node = null;

    @property(cc.Node)
    achievevBtn: cc.Node = null;

    @property(cc.Node)
    shortCutBtn:cc.Node = null;


    onLoad() {
        //刷新金币的时候刷新强化界面红点
        app.eventMgr.on(EventName.gold_fresh, this.setGold, this);
        //技能升级的时候也刷新一下
        app.eventMgr.on(EventName.skill_upgrade, this.refreshRedDot, this);
        //获取奖励刷新界面红点
        app.eventMgr.on(EventName.achieve_state_fresh, this.refreshRedDot, this);

        this.shortCutBtn.active = PlatformMgr.isDouYin();
    }

    /**首页红点提示刷新 */
    refreshRedDot() {
        //可升级技能红点的刷新
        if (this.strengthBtn) {
            let items = app.confMgr.conf.strength.getConfArr();
            let num = 0;
            for (let i = 0; i < items.length; i++) {
                num += app.dataMgr.roleProxy.getUpGradeRedDot(items[i]);
            }
            let qipao = this.strengthBtn.getChildByName("qipao");
            if (num > 0) {
                if (qipao) {
                    qipao.active = true;
                    let lab = qipao.getChildByName("redDot")?.getComponent(cc.Label);
                    lab.string = num + '';
                }
            } else {
                qipao && (qipao.active = false);
            }
        }
        if(this.achievevBtn){
            let achieve = app.confMgr.conf.achievememt.getConfArr();
            let num = 0
            achieve.forEach(d=>{
                if(app.dataMgr.achieve.getAchieveState(d.id) == AchieveState.reach){
                    num++;
                }
            })
            let qipao = this.achievevBtn.getChildByName("qipao");
            if (num > 0) {
                if(qipao){
                    qipao.active = true;
                    let lab = qipao.getChildByName("redDot")?.getComponent(cc.Label);
                    lab.string = num + '';
                }
            }else{
                qipao && (qipao.active = false);
            }
        }
    }

    start() {
        this.setGold();
        this.refreshRedDot();
    }

    setGold() {
        this.goldLab.string = app.dataMgr.roleProxy.data.gold + '';
        this.refreshRedDot();
    }

    onStartBtn() {
        //  app.dataMgr.enterBattle(1);
        //  app.layerMgr.open(PopupName.SkillUpgradeDlg)
        // app.layerMgr.open(PopupName.ModelSelectDlg);//yc 代码片段已经移到GameLogic.ts里

        zs.core.workflow.childNext();
    }

    /**添加桌面按钮 */
    onShortCutBtn(){
        app.layerMgr.open(PopupName.ShortCutDlg);
    }

    onSysBtn(e, p: string) {
        if(zs.core.workflow.state != workflow.GAME_HOME){
            return;
        }
        let idx = Number(p);
        switch (idx) {
            case btnEnum.picture:
                app.layerMgr.open(PopupName.PictureDlg);
                break;
            case btnEnum.strength:
                app.layerMgr.open(PopupName.StrengthenDlg);
                break;
            case btnEnum.achieve:
                app.layerMgr.open(PopupName.AchieveDlg);
                break;
        }
        zs.core.workflow.childNext("CHILD");
    }

    onDestroy() {
        app.eventMgr.off(EventName.gold_fresh, this.setGold, this);
        app.eventMgr.off(EventName.skill_upgrade, this.refreshRedDot, this);
        app.eventMgr.off(EventName.achieve_state_fresh, this.refreshRedDot, this);
    }

    // update (dt) {}
}

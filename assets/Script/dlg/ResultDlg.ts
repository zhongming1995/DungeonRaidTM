// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../app";
import BasePopup from "../core/gui/BasePopup";
import ResMgr from "../core/resLoad/ResMgr";
import Util from "../core/utils/Util";
import { SceneNameEnum } from "../Defines";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ResultDlg extends BasePopup {

    @property(cc.Node)
    skillCon: cc.Node = null;

    @property(cc.Node)
    unLockAchieves: cc.Node = null;
    @property(cc.Label)
    liveTimeLab: cc.Label = null;

    @property(cc.Label)
    goldLab: cc.Label = null;

    @property(cc.Label)
    lvlLab: cc.Label = null;

    @property(cc.Label)
    killLab: cc.Label = null;

    @property(cc.Sprite)
    roleImg: cc.Sprite = null;

    start() {
        super.start();
        app.justTrack("结算界面打开次数");
        zs.Native.TenjinTrackEvent("cv_50")
    }

    initUI() {

        let battleData = app.dataMgr.battleRoleData;
        app.dataMgr.roleProxy.addGold(Math.floor(battleData.gold));

        this.liveTimeLab.string = Util.secondFormat(battleData.liveTimer);
        this.goldLab.string = Math.floor(battleData.gold) + '';
        this.lvlLab.string = battleData.lvl + '';
        this.killLab.string = battleData.kill + '';
        this.roleImg.spriteFrame = ResMgr.ins.getRoleSp(battleData.rid);
        this.showSkills();
        app.dataMgr.achieve.roleLiveTime(Math.floor(app.dataMgr.battleRoleData.liveTimer / 60));
    }

    showSkills() {

        let skills = app.dataMgr.battleRoleData.skills;
        skills = skills.filter((e) => {
            return e != null;
        })

        let childs = this.skillCon.children;
        for (let i = 0; i < skills.length; i++) {
            let icon = childs[i];
            if (!icon) {
                icon = cc.instantiate(childs[0]);
                icon.parent = this.skillCon;
            }
            let itemId = skills[i].conf.skill_weapon;
            icon.getComponent(cc.Sprite).spriteFrame = ResMgr.ins.getItemSp(itemId);
        }
    }


    /**我要变强 */
    onStrengthBtn() {
        // app.sceneMgr.enterScene(SceneNameEnum.Home);
        zs.core.workflow.next();
    }

    clickShare() {
        app.dataMgr.roleProxy.addGold(300);
        // app.sceneMgr.enterScene(SceneNameEnum.Home);
    }

}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameLogic from "../../zsLibs/GameLogic";
import { app } from "../app";
import BasePopup from "../core/gui/BasePopup";
import ResMgr from "../core/resLoad/ResMgr";
import { EventName, SceneNameEnum } from "../Defines";
import AttrShowItem from "./AttrShowItem";
import SkillShowItem from "./SkillShowItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RoleDetailDlg extends BasePopup {

    @property(cc.Node)
    attContent: cc.Node = null;

    @property(cc.Node)
    skillContent: cc.Node = null;

    @property(cc.Node)
    musicBtn: cc.Node = null;

    @property(cc.Node)
    effctBtn: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        super.start();

        this.setMusicState();

        this.loadSkills();
        this.loadAttItems();


    }


    loadSkills() {
        let skills = app.dataMgr.battleRoleData.skills;
        let len = skills.length;
        let childs = this.skillContent.children;
        for (let i = 1; i < len; i++) {
            cc.instantiate(childs[0]).parent = this.skillContent;
        }
        let cmp: SkillShowItem;
        childs.forEach((c, idx) => {
            cmp = c.getComponent(SkillShowItem);
            cmp.setData(skills[idx], idx);
        })


    }

    loadAttItems() {
        let atts = app.confMgr.conf.attribute.getRoleShowAttr();

        let copyItem: cc.Node = null, childs = this.attContent.children;
        for (let i = 0; i < atts.length; i++) {
            copyItem = childs[i];
            if (!copyItem) {
                copyItem = cc.instantiate(childs[0])
                copyItem.parent = this.attContent;
            }
            let cmp: AttrShowItem = copyItem.getComponent(AttrShowItem);
            cmp.setData(atts[i]);
        }
    }


    onMusicBtn(e: cc.Event.EventTouch, idx: string) {
        let tp = parseInt(idx);
        let v: number = 1;
        if (tp == 0) {  //音乐
            v = app.audioMgr.getBgValue() > 0 ? 0 : 1;
            app.audioMgr.setBgValue(v);
        } else if (tp == 1) { //音效
            v = app.audioMgr.getEffectValue() > 0 ? 0 : 1;
            app.audioMgr.setEffectValue(v);
        }
        this.setMusicState();
    }

    setMusicState() {

        let musicOpen: boolean = app.audioMgr.getBgValue() > 0;
        let fpxOpen: boolean = app.audioMgr.getEffectValue() > 0;

        this.musicBtn.children[1].active = musicOpen;
        this.effctBtn.children[1].active = fpxOpen;

    }


    /**退出 */
    onExitBtn() {
        // app.sceneMgr.enterScene(SceneNameEnum.Home);
        GameLogic.GameToHome = true;
        app.dataMgr.achieve.roleLiveTime(Math.floor(app.dataMgr.battleRoleData.liveTimer / 60));
        zs.core.workflow.next();
        this.unscheduleAllCallbacks();
        //返回首页 弹出插屏
        zs.Native.ShowInsertAdByStartCd();
    }


    onClose() {
        app.eventMgr.emit(EventName.game_pause, false);
        this.unscheduleAllCallbacks();
        // zs.core.workflow.childNext();
    }
    protected onEnable(): void {
        super.onEnable();
        app.eventMgr.emit(EventName.game_pause, true);
        this.scheduleOnce(this.showInsert, 10);
        // zs.Native.ShowInsertAd();
    }

    showInsert() {
        console.log("暂停界面10秒，弹插屏")
        zs.Native.ShowInsertAdByStartCd();
    }

    protected onDisable(): void {
        this.unscheduleAllCallbacks();
        super.onDisable();
    }
}

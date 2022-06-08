// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import workflow from "../../zsLibs/template/workflow";
import { app } from "../app";
import BasePopup from "../core/gui/BasePopup";
import ResMgr from "../core/resLoad/ResMgr";
import ArrayUtil from "../core/utils/ArrayUtil";
import Util from "../core/utils/Util";
import { EventName } from "../Defines";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StartWeaponDlg extends BasePopup {

    @property(cc.Node)
    skillContent: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {} 
    lists: number[] = [200011, 200111, 200211, 200311, 200411, 200511, 200611, 200711];
    cur_union_id = 0;
    hasChoose: boolean = false;
    start() {
        super.start();
    }

    initUI() {

        ArrayUtil.fisherYatesShuffle(this.lists);
        let skills = app.dataMgr.battleRoleData.skills;
        if (skills[0]) this.cur_union_id = skills[0].conf.union_id;

        let showList = this.lists.concat(this.lists.slice());
        let childs = this.skillContent.children;
        for (let i = 0; i < showList.length; i++) {
            let copyItem = childs[i];
            if (!copyItem) {
                copyItem = cc.instantiate(childs[0]);
                copyItem.parent = this.skillContent;
            }
            let icon = copyItem.getChildByName('icon');
            let conf = app.confMgr.conf.skill.getConfById(showList[i])
            icon.getComponent(cc.Sprite).spriteFrame = ResMgr.ins.getItemSp(conf.skill_weapon);
        }
    }

    chooseWeapon() {
        this.hasChoose = true;
        let len = this.lists.length;
        let idx = 0;
        while (true) {
            idx = Util.randomNumber(0, len - 1);
            if (this.lists[idx] != this.cur_union_id) {
                break;
            }
        }

        let sid = this.lists[idx];
        let showIdx = len + idx;
        let child = this.skillContent.children[showIdx];

        let showFunc = () => {
            child.getChildByName('bg').active = true;
            this.scheduleOnce(() => {
                app.dataMgr.battleData.tryWeapon(1, sid);
                this.closeUi()
            }, 1)
        }

        let midPos = this.skillContent.children[1].getPosition();
        let offx = child.x - midPos.x;
        cc.tween(this.skillContent)
            .by(2, { x: -offx })
            .call(showFunc)
            .start();

    }

    onVideoGetBtn() {
        app.audioMgr.playEffect("button");
        if (this.hasChoose) {
            return;
        }
        app.justTrack("超武试用");
        zs.Native.TenjinTrackEvent("cv_5")
        zs.platform.async.playVideo().then(r => {
            if (r) {
                app.justTrack("超武试用成功");
                zs.Native.TenjinTrackEvent("cv_6")
                this.chooseWeapon();
            }
        }).catch(e => {
            zs.platform.sync.showToast("暂时没有视频资源");
        })
    }

    closeUi(): void {
        app.audioMgr.playEffect("buttonClose");
        super.closeUi();
        zs.core.workflow.state == workflow.GAME_PLAY && zs.core.workflow.childNext();
    }

    onEnable(): void {
        app.eventMgr.emit(EventName.game_pause, true);
    }
    onDisable(): void {
        app.eventMgr.emit(EventName.game_pause, false);
        app.gameMgr.waveMng.startWaves();
    }

    // update (dt) {}
}

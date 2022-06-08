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
export default class DoubleStartWeaponDlg extends BasePopup {

    @property(cc.Node)
    skillContents: cc.Node[] = [];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {} 
    lists: number[] = [200011, 200111, 200211, 200311, 200411, 200511, 200611, 200711];
    cur_union_ids = {};
    chooseMap = { 1: false, 2: false };
    aniMap = { 1: false, 2: false };

    start() {
        super.start();
    }

    initUI() {

        ArrayUtil.fisherYatesShuffle(this.lists);
        let showList = this.lists.concat(this.lists.slice());
        for (let i = 1; i <= 2; i++) {
            let player = app.dataMgr.battleData.getRoleData(i);
            if (player && player.skills[0]) {
                this.cur_union_ids[i] = player.skills[0].conf.union_id;
            }

            this.scheduleOnce(() => {
                let content = this.skillContents[i - 1];
                let childs = content.children;
                for (let i = 0; i < showList.length; i++) {
                    let copyItem = childs[i];
                    if (!copyItem) {
                        copyItem = cc.instantiate(childs[0]);
                        copyItem.parent = content;
                    }
                    let icon = copyItem.getChildByName('icon');
                    let conf = app.confMgr.conf.skill.getConfById(showList[i])
                    icon.getComponent(cc.Sprite).spriteFrame = ResMgr.ins.getItemSp(conf.skill_weapon);
                }
            }, i * 0.05)
        }

    }


    chooseWeapon(pid: number) {

        let len = this.lists.length;
        let idx = 0, cur_union_id = this.cur_union_ids[pid];
        while (true) {
            idx = Util.randomNumber(0, len - 1);
            if (this.lists[idx] != cur_union_id) {
                break;
            }
        }

        let sid = this.lists[idx];
        let showIdx = len + idx;
        let content = this.skillContents[pid - 1];
        let child = content.children[showIdx];

        let showFunc = () => {
            child.getChildByName('bg').active = true;
            this.scheduleOnce(() => {
                app.dataMgr.battleData.tryWeapon(pid, sid);
                this.aniMap[pid] = false;
                this.checkClose();
            }, 1)
        }
        this.aniMap[pid] = true;
        let midPos = content.children[1].getPosition();
        let offx = child.x - midPos.x;
        cc.tween(content)
            .by(2, { x: -offx })
            .call(showFunc)
            .start();

    }

    onVideoGetBtn(e: cc.Event.EventTouch, p) {
        app.audioMgr.playEffect("button");
        let idx = Number(p);


        app.justTrack("双生超武试用");
        zs.Native.TenjinTrackEvent("cv_38")
        zs.platform.async.playVideo().then(r => {
            if (r) {
                app.justTrack("双生超武试用成功");
                zs.Native.TenjinTrackEvent("cv_39")
                this.setChoose(idx);
                this.chooseWeapon(idx);
            }
        }).catch(e => {
            zs.platform.sync.showToast("暂时没有视频资源");
        })
    }

    /**取消 */
    onCancelBtn(e, p) {

        app.audioMgr.playEffect("buttonClose");
        let idx = Number(p);
        this.setChoose(idx);
        this.checkClose();
    }

    setChoose(idx: number) {

        if (this.chooseMap[idx]) {
            return;
        }
        this.chooseMap[idx] = true;
        let con = cc.find('con' + idx + '/bottom_btn', this.node)
        con && (con.active = false);

    }

    /**关闭界面 */
    checkClose() {
        let has = true;
        for (let k in this.chooseMap) {
            if (!this.chooseMap[k] || this.aniMap[k]) {
                has = false;
                break;
            }
        }
        if (has) {
            this.closeUi();
            zs.core.workflow.state == workflow.GAME_PLAY && zs.core.workflow.childNext();
        }
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

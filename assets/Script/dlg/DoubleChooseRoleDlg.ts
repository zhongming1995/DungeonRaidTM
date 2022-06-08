/*
* @ Author: yangcheng
* @ Data: 2022-04-06 11:07
*/

import GameLogic from "../../zsLibs/GameLogic";
import { app } from "../app";
import BasePopup from "../core/gui/BasePopup";
import ResMgr from "../core/resLoad/ResMgr";

const { ccclass, property } = cc._decorator

class roleState {

    ready = false;
    node: cc.Node = null;

    roleImg: cc.Sprite = null;
    equipImg: cc.Sprite = null
    nameLab: cc.Label = null
    lab_roleDesc: cc.Label = null;

    startBtn: cc.Node = null;
    videoBtn: cc.Node = null;
    lockBtn: cc.Node = null;

    left: cc.Node = null;
    right: cc.Node = null;

    private m_roleId = 1;

    get roleId() {
        return this.m_roleId;
    }
    set roleId(value) {
        let temp = value - this.m_roleId;
        let items = app.confMgr.conf.role.getConfArr();
        let item = app.confMgr.conf.role.getConfById(value);
        if (!item) {
            if (temp < 0) {
                value = items[items.length - 1].id;
            } else {
                value = items[0].id;
            }
        }
        this.m_roleId = value;
    }
    dispose() {
        this.m_roleId = null;
        this.node = null;
        this.roleImg = null;
        this.equipImg = null;
        this.nameLab = null;
        this.lab_roleDesc = null;
        this.startBtn = null;
        this.videoBtn = null;
        this.lockBtn = null;
        this.left = null;
        this.right = null;
    }
}

@ccclass
export default class DoubleChooseRoleDlg extends BasePopup {

    @property(cc.Node)
    finger1: cc.Node = null;

    @property(cc.Node)
    finger2: cc.Node = null;

    onLoad(): void { }

    private readyState = [new roleState(), new roleState()];

    start(): void {
        app.justTrack('双生选择角色界面');
        zs.Native.TenjinTrackEvent("cv_27")
        for (let i = 0; i < 2; i++) {
            this.readyState[i].node = this.node.getChildByName("p" + (i + 1))
            this.initItem(this.readyState[i].node, i);
        }

        //第一次进入，显示手指
        if (cc.sys.localStorage.getItem("第一次进入双生模式选择皮肤") == "true") {
            this.finger1.active = false;
            this.finger2.active = false;
        } else {
            this.finger1.active = true;
            this.finger2.active = true;
            cc.sys.localStorage.setItem("第一次进入双生模式选择皮肤", "true");
        }
    }

    initItem(node: cc.Node, id) {
        let click = cc.Node.EventType.TOUCH_START;
        let role = this.readyState[id];
        /**角色img */
        role.roleImg = node.getChildByName('roleImg').getComponent(cc.Sprite);
        /**装备img */
        role.equipImg = node.getChildByName('equipImg').getComponent(cc.Sprite);
        /**角色名字 */
        role.nameLab = node.getChildByName('nameLab').getComponent(cc.Label);
        /**人物描述 */
        role.lab_roleDesc = node.getChildByName('lab_roleDesc').getComponent(cc.Label);

        let lock = node.getChildByName('lock')
        lock.active = false;

        //几号玩家
        let chosen = node.getChildByName('chosen').getComponent(cc.Toggle);
        id == 0 ? chosen.check() : chosen.uncheck();
        let p = !chosen.isChecked ? chosen.node.getChildByName('P1') : chosen.node.getChildByName("P2")
        p.active = false;

        /**开始按钮 */
        role.startBtn = node.getChildByName('startBtn');
        /**试用按钮 */
        role.videoBtn = node.getChildByName('videoBtn');

        role.lockBtn = node.getChildByName('lockBtn');


        /**left 选择 */
        role.left = node.getChildByName('left');
        /**right 选择 */
        role.right = node.getChildByName('right');

        this.refresRoleUI(id);

        //点击事件
        role.left.on(click, () => { this.leftClick(id) }, this);
        role.right.on(click, () => { this.rightClick(id) }, this);
        role.startBtn.on(click, () => { this.startClick(id) }, this);
        role.videoBtn.on(click, () => { this.videofreeClicl(id) }, this);
    }

    refresRoleUI(id) {
        let role = this.readyState[id];
        //角色信息
        let data = app.confMgr.conf.role.getConfById(role.roleId);
        // console.error("items :: ", data);
        //赋值
        role.roleImg.spriteFrame = ResMgr.ins.getRoleSp(data.id);//id
        role.equipImg.spriteFrame = ResMgr.ins.getItemSp(data.strat_item);
        role.nameLab.string = data.role_name;
        role.lab_roleDesc.string = data.role_detail;

        let has = app.dataMgr.roleProxy.hasRole(role.roleId);
        // console.error(has);
        if (!role.ready) {
            if (has) {
                role.videoBtn.active = !has;
                role.startBtn.active = has;
            } else {
                role.videoBtn.active = !has;
                role.startBtn.active = has;
            }
            role.lockBtn.active = false;
        } else {
            role.videoBtn.active = false;
            role.startBtn.active = false;
            role.lockBtn.active = true;

            role.left.targetOff(this);
            role.right.targetOff(this);
            role.left.getComponent(cc.Button).interactable = false;
            role.right.getComponent(cc.Button).interactable = false;
        }

    }

    private leftClick(id) {
        // console.error("leftClick : ", id);
        this.readyState[id].roleId--;// -- 操作
        this.refresRoleUI(id);
    }

    private rightClick(id) {
        // console.error("rightClick : ", id);
        this.readyState[id].roleId++;// ++ 操作
        this.refresRoleUI(id);
    }

    private startClick(id) {
        //准备状态
        this.readyState[id].ready = true;
        this.refresRoleUI(id);

        this.gameStart();
    }

    private videofreeClicl(id) {
        app.justTrack("双生视频免费试用");
        zs.Native.TenjinTrackEvent("cv_28")
        zs.platform.async.playVideo().then(r => {
            if (r) {
                app.justTrack("双生视频免费试用成功");
                zs.Native.TenjinTrackEvent("cv_29")
                this.startClick(id);
            }
        }).catch(e => {
            zs.platform.sync.showToast('暂时没有视频资源');
        })
    }

    /**游戏开始 */
    gameStart() {
        //check
        let bool = false;
        this.readyState.forEach(role => {
            if (!role.ready) {
                return bool = true;
            }
        });
        if (bool) {
            //有人没点确定
            return;
        }
        app.dataMgr.enterBattle(this.readyState[0].roleId, this.readyState[1].roleId);
        //全部准备完毕 开始游戏
        zs.core.workflow.next();
    }

    onDestroy(): void {
        this.readyState.forEach((role) => {
            role && role.dispose();
        })
        this.readyState.splice(0, this.readyState.length);
        super.onDestroy();
    }

    closeUi(): void {
        super.closeUi();
        // zs.core.workflow.childNext();
        zs.core.workflow.childNext(!GameLogic.dontShowModeSelect ? "HOME" : "MODESELECT");
    }

}
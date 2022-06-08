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
import { ColorTypes, EventName, SceneNameEnum } from "../Defines";
import RoleChooseItem from "./RoleChooseItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChooseRoleDlg extends BasePopup {

    @property(cc.Node)
    itemContent: cc.Node = null;

    @property(cc.Node)
    itemPre: cc.Node = null;

    @property(cc.Sprite)
    curIcon: cc.Sprite = null;

    @property(cc.Sprite)
    curEquipIcon: cc.Sprite = null;

    @property(cc.Label)
    nameLab: cc.Label = null;

    @property(cc.Label)
    descLab: cc.Label = null;

    @property(cc.Label)
    conditionLab: cc.Label = null;

    @property(cc.Node)
    startBtn: cc.Node = null;

    @property(cc.Node)
    buyCon: cc.Node = null;

    @property(cc.Node)
    buyVideoBtn: cc.Node = null;

    @property(cc.Node)
    tryVideoBtn: cc.Node = null;

    curItem: RoleChooseItem = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() { }

    start() {
        super.start();
        this.addEvt(EventName.buy_role_fresh, this.freshUnLockRole, this)
        this.loadRoleItems();
    }

    loadRoleItems() {
        let rid = app.dataMgr.selectRid;
        rid = rid > 0 ? rid : 1;
        let cb = this.evtCallBack.bind(this);
        let copyItem: cc.Node = null, cmp: RoleChooseItem;

        let items = app.confMgr.conf.role.getConfArr();

        for (let i = 0; i < items.length; i++) {
            copyItem = cc.instantiate(this.itemPre);
            copyItem.active = true;
            copyItem.parent = this.itemContent;
            cmp = copyItem.getComponent(RoleChooseItem);
            if (cmp) {
                cmp.setData(items[i]);
                cmp.setCallBack(cb);
            }
            if (items[i].id == rid) {
                this.setItemShow(cmp);
            }
        }
    }

    evtCallBack(e: RoleChooseItem) {
        if (this.curItem == e) {
            return;
        }
        if (this.curItem) {
            this.curItem.setSelect(false);
        }
        this.setItemShow(e);
    }

    setItemShow(cur: RoleChooseItem) {
        this.buyVideoBtn.active = false;
        this.buyCon.active = false;

        this.curItem = cur;
        cur.setSelect(true);
        let data = cur.m_data;

        this.nameLab.string = data.role_name;
        this.descLab.string = data.role_detail;
        this.conditionLab.string = '';
        let roleConf = app.confMgr.conf.role.getConfById(data.id);
        let has = app.dataMgr.roleProxy.hasRole(data.id);
        this.curIcon.spriteFrame = ResMgr.ins.getRoleSp(roleConf.id);
        if (has) {
            this.curEquipIcon.spriteFrame = ResMgr.ins.getItemSp(roleConf.strat_item);
            this.nameLab.node.color = ColorTypes.ffffff
            this.descLab.node.color = ColorTypes.C1FFF4

            this.startBtn.active = true;
            this.buyCon.active = false;
            this.tryVideoBtn.active = false;
        } else {

            this.curEquipIcon.spriteFrame = null;
            this.nameLab.node.color = ColorTypes.a9a9a9
            this.descLab.node.color = ColorTypes.a9a9a9
            this.startBtn.active = false;


            let conditon = roleConf.unlock_condition;
            if (conditon > 0 && !app.dataMgr.achieve.isAchieveReach(conditon)) {
                let achieveConf = app.confMgr.conf.achievememt.getConfById(conditon);
                this.conditionLab.string = `[完成${achieveConf.achievement_name}成就即可解锁英雄]`;
                this.buyCon.active = false;
                this.tryVideoBtn.active = true;
            } else {
                //视频解锁
                if (roleConf.video_time > 0) {
                    this.buyVideoBtn.active = true;
                    this.tryVideoBtn.active = true;
                    //兼容线上 防止线上报错
                    if (!app.dataMgr.roleProxy.data.videotime) {
                        app.dataMgr.roleProxy.data.videotime = Object.create(null);
                    }
                    let videoTime = app.dataMgr.roleProxy.data.videotime[data.id] || 0;
                    this.conditionLab.string = `[观看${videoTime}/${roleConf.video_time}次视频即可解锁英雄]`;
                } else {
                    //金币解锁
                    this.buyCon.active = true;
                    this.tryVideoBtn.active = true;
                    let costLab = this.buyCon.getChildByName('costLab')
                    costLab && (costLab.getComponent(cc.Label).string = `${roleConf.lock_cost}`)
                }
            }
        }
    }

    freshUnLockRole() {
        if (!this.curItem) {
            return;
        }
        this.curItem.setState();
        this.setItemShow(this.curItem);
    }

    //开始游戏
    onStartBtn() {
        super.closeUi();
        let data = this.curItem.m_data;
        app.justTrack(`${data.role_name}使用次数`);
        zs.Native.TrackEvent("cv_1");
        app.dataMgr.enterBattle(data.id);
        // app.sceneMgr.enterScene(SceneNameEnum.DoubleGame) // yc 代码片段移至 GameLogic.ts
        zs.core.workflow.next();
    }

    onTryStart() {
        zs.platform.async.playVideo().then(r => {
            if (r) {
                super.closeUi();
                let data = this.curItem.m_data;
                app.justTrack(`${data.role_name}试用`);
                app.dataMgr.enterBattle(data.id);
                zs.core.workflow.next();
            } else {
                zs.platform.sync.showToast('观看完整视频获得奖励');
            }
        }).catch(e => {
            zs.platform.sync.showToast('暂时没有视频资源');
        })
    }

    //购买游戏
    onBuyBtn() {
        if (!this.curItem) {
            return;
        }
        let data = this.curItem.m_data
        app.dataMgr.roleProxy.buyRole(data.id);
    }

    onBuyVideoBtn() {
        if (!this.curItem) {
            return;
        }
        zs.platform.async.playVideo().then(
            r => {
                if (r) {
                    let data = this.curItem.m_data
                    app.dataMgr.roleProxy.buyVideoRole(data.id);
                }
            }
        ).catch(e => {
            zs.platform.sync.showToast("暂时没有视频资源");
        })
    }

    closeUi(): void {
        super.closeUi();
        zs.core.workflow.childNext(!GameLogic.dontShowModeSelect ? "HOME" : "MODESELECT");
    }

    // update (dt) {}
}

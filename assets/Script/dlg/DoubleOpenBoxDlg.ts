/*
* @ Author: yangcheng
* @ Data: 2022-04-06 11:07
*/

import { app } from "../app";
import BasePopup from "../core/gui/BasePopup";
import ResMgr from "../core/resLoad/ResMgr";
import Util from "../core/utils/Util";
import { EventName, SoundName, enum_item_ids } from "../Defines";
import { Skill } from "../logics/BattleRoleData";
import DropMgr from "../logics/DropMgr";

const { ccclass, property } = cc._decorator;

const STAR_SHOW = { 1: [1], 3: [1, 2, 4], 5: [1, 2, 3, 4, 5] }

@ccclass
export default class DoubleOpenBoxDlg extends BasePopup {

    boxAnim: cc.Animation[] = [];

    boxSke: dragonBones.ArmatureDisplay[] = [];

    mask: cc.Node[] = [];

    items: cc.Node[][] = [[], []];

    flashs: cc.Node[][] = [[], []];

    state1: cc.Node[] = [];

    state2: cc.Node = null;

    lblCoin: cc.Label[] = [];

    title_box: cc.Node[] = [];

    private _starLv: number[] = [0, 0];//星级
    private _timer: number[] = [0, 0];
    private _interval: number[] = [0, 0];
    private _isPlay: boolean[] = [false, false];
    // private _tmpNum: number[] = [0, 0];
    private _rewards: number[][] = [];

    private readyState = [0, 0];

    start(): void {
        super.start();
        app.justTrack('双生宝箱界面打开次数');
        zs.Native.TenjinTrackEvent("cv_30")
        let click = cc.Node.EventType.TOUCH_START;
        //获取所有的组件
        for (let i = 0; i < 2; i++) {
            let node = this.node.getChildByName(`BOX${i}`);
            this.boxAnim.push(node.getComponent(cc.Animation));
            this.boxSke.push(node.getChildByName('card').getChildByName('BOX_ske').getComponent(dragonBones.ArmatureDisplay));
            this.mask.push(node.getChildByName('Mask'));
            for (let j = 0; j < 5; j++) {
                this.items[i].push(node.getChildByName(`Item${j + 1}`));
                this.flashs[i].push(node.getChildByName(`flash${j + 1}`));
            }
            this.state1.push(node.getChildByName('state1'));
            this.lblCoin.push(node.getChildByName('coin_L').getChildByName('lblCoin').getComponent(cc.Label));
            this.title_box.push(node.getChildByName('title_box'));

            let btnOpen = this.state1[i].getChildByName('btnOpen');
            let btnVideoOpen = this.state1[i].getChildByName('btnVideoOpen');

            btnOpen.on(click, () => { this.clickOpen(i) }, this);
            btnVideoOpen.on(click, () => { this.clickVideoOpen(i) }, this);

        }
        this.state2 = this.node.getChildByName('state2');
        this.state2.getChildByName('btnBack').on(click, this.clickBack, this);
        //开始初始化ui
        this.initUIs();
    }

    initUIs() {
        //处理层级问题 宝箱层级 最高 盖住其余的几个 dlg 界面
        this.node.zIndex = 10;
        app.audioMgr.stopMusic();

        // let bg = this.boxAnim.node.children[0];
        // bg && bg.setContentSize(cc.view.getVisibleSize());

        for (let i = 0; i < 2; i++) {
            this.boxAnim[i].stop();
            this.boxSke[i].playAnimation('Idle', 0);
            let mask = this.mask[i];
            mask.children.forEach(element => {
                element.active = false;
            })
            let flashs = this.flashs[i];
            flashs.forEach(element => {
                element.active = false;
            })
            this.state1[i].active = true;
            this.lblCoin[i].node.parent.active = false;
            this.title_box[i].active = true;

            this._rewards[i] = [];
        }
        this.state2.active = false;
    }

    private play(i) {
        this.lblCoin[i].node.parent.active = true;
        this._isPlay[i] = true;
        this.state1[i].active = false;

        this.boxAnim[i].play();
        this.boxSke[i].playAnimation('Open', 1);

        let tmp = { 1: 0.2, 3: 0.1, 5: 0.05 };//滚动帧率
        this._interval[i] = tmp[this._starLv[i]];

        let coins = { 1: [50, 70], 3: [100, 200], 5: [200, 300] };
        let arr = coins[this._starLv[i]];
        let coin = Util.randomNumber(arr[0], arr[1]);

        let aniTime = 6;
        this._interval[i] = coin / (aniTime * 60);
        this.scheduleOnce(() => {
            this.flashs[i].forEach(element => {
                element.opacity = 255;
            });
            this.title_box[i].active = false;

            this.readyState[i] = 1;

            this._isPlay[i] = false;
            this.lblCoin[i].string = coin.toString();
            app.audioMgr.playEffect(SoundName.fpx_TreasureFound);

            let bool = true;
            this.readyState.forEach(element => {
                if (element == 0) {
                    bool = false;
                }
            });
            this.state2.active = bool;

        }, aniTime);

        this.createItem(i);
        this.setStarShow(i);
        this.playSound(i);
    }

    playSound(i) {
        let s = '';
        if (this._starLv[i] == 1) {
            s = SoundName.fpx_Treasure1;
        } else if (this._starLv[i] == 3) {
            s = SoundName.fpx_Treasure2;
        } else if (this._starLv[i] == 5) {
            s = SoundName.fpx_Treasure3;
        }
        app.audioMgr.playEffect(s);
    }

    private createItem(i) {
        let roleData = app.dataMgr.battleData.getRoleData(i + 1)
        let skills = roleData.skills;
        let buffs = roleData.buffers;
        let allSkills = skills.concat(buffs);

        // console.error('allSkills : ', allSkills);

        //超武
        let skillLvlMap: { [k: number]: { cur: number, max: number, rcnt: number, upitem: number } } = Object.create(null);  //武器当前等级 和最高等级
        allSkills.forEach(s => {
            let weaponId: number = s.conf.skill_weapon;
            let cur = s.conf.skill_level, max = app.confMgr.conf.skill.getSkillMaxLvl(weaponId);
            skillLvlMap[weaponId] = { cur: cur, max: max, rcnt: 0, upitem: s.conf.skill_upitem };
        })

        let list = [], superList = [];
        for (let k in skillLvlMap) {
            let sdata = skillLvlMap[k];
            if (sdata.cur == sdata.max) {  //满级
                if (sdata.upitem > 0) {
                    let needItem = app.confMgr.conf.compound.getCompoundItem(Number(k));
                    if (needItem > 0 && skillLvlMap[needItem]) {   //有升级buff  可升级超武
                        superList.push(sdata.upitem);
                    }
                }
            } else {
                for (let j = sdata.cur; j <= sdata.max; j++) {
                    list.push(sdata.upitem);
                }
            }
        }

        if (superList.length > 0) {
            if (superList.length > this._starLv[i]) { //随机超武
                for (let j = 0; j < superList.length; j++) {
                    this._rewards[i].push(superList[j]);
                }

            } else {
                for (let j = 0; j < superList.length; j++) {
                    this._rewards[i].push(superList[j]);
                }
            }
        }

        while (this._rewards[i].length < this._starLv[i]) {
            if (list.length > 0) {
                const idx = Util.randomNumber(0, list.length - 1);
                let arr = list.splice(idx, 1);
                this._rewards[i].push(arr[0]);

            } else {
                this._rewards[i].push(enum_item_ids.highmoney);
            }
        }
        console.log('skillLvlMap-----', skillLvlMap, list)
    }

    private setStarShow(i) {
        // console.error("setStarShow : ", i);
        let nums = STAR_SHOW[this._starLv[i]];
        let a_idx: number = 0;
        for (let j = 0; j < nums.length; j++) {
            const idx = nums[j] - 1;
            this.mask[i].children[idx].active = true;
            this.items[i][idx].active = true;
            this.flashs[i][idx].active = true;
            let sp = this.items[i][idx].getComponent(cc.Sprite);
            let itemId = this._rewards[i][a_idx];
            if (sp && itemId > 0) {
                sp.spriteFrame = ResMgr.ins.getItemSp(itemId);
            } else {

                sp.node.active = false;
                this.flashs[i][idx].active = false;
            }
            a_idx++;
        }
    }

    update(dt) {
        // if (!this._isPlay) return;
        // this._timer += this._interval;
        // this.lblCoin.string = this._timer.toFixed(2);
        // return
        // this._timer += dt;
        // if (this._timer >= this._interval) {
        //     this._timer = 0;
        //     this._tmpNum++;
        //     this.lblCoin.string = this._tmpNum.toString();
        // }
        for (let i = 0; i < this._isPlay.length; i++) {
            if (!this._isPlay[i]) {
                continue;
            }
            this._timer[i] += this._interval[i];
            this.lblCoin[i].string = this._timer[i].toFixed(2);
        }
    }

    clickOpen(i) {
        this._starLv[i] = 1;
        this.play(i);
    }

    clickVideoOpen(i) {
        app.justTrack('双生宝箱界面视频次数');
        zs.Native.TenjinTrackEvent("cv_31")
        //五星概率  =  20%基础几率 + 幸运值
        zs.platform.async.playVideo().then(r => {
            if (r) {
                app.justTrack('双生宝箱界面视频次数成功');
                this._starLv[i] = Math.random() > 0.2 ? 3 : 5;
                this.play(i);
            }
        }).catch(e => {
            zs.platform.sync.showToast("暂时没有视频资源")
        })

    }

    clickBack() {
        this.closeUi();
        app.eventMgr.emit(EventName.game_pause, false);
        // zs.core.workflow.childState == "BOX" && zs.core.workflow.childNext();
    }

    protected onEnable(): void {
        super.onEnable();
        app.eventMgr.emit(EventName.game_pause, true);
    }

    onClose() {
        app.audioMgr.playMusic(SoundName.bgm_game);
        this._rewards.forEach((item, idx) => {
            item.forEach(rId => {
                DropMgr.ins.meetDropItem(idx + 1, rId, false);
            })
            app.dataMgr.battleData.getRoleData(idx + 1).addGold(Number(this.lblCoin[idx].string));
        });
        // app.dataMgr.battleRoleData.addGold(Number(this.lblCoin.string));
    }
}

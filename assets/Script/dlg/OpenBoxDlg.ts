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
export default class OpenBoxDlg extends BasePopup {

    @property(cc.Animation) boxAnim: cc.Animation = null;

    @property(dragonBones.ArmatureDisplay) boxSke: dragonBones.ArmatureDisplay = null;

    @property(cc.Node) mask: cc.Node = null;

    @property([cc.Node]) items: cc.Node[] = [];

    @property([cc.Node]) flashs: cc.Node[] = [];

    @property(cc.Node) state1: cc.Node = null;

    @property(cc.Node) state2: cc.Node = null;

    @property(cc.Label) lblCoin: cc.Label = null;

    @property(cc.Node) title_box: cc.Node = null;

    private _starLv: number = 0;//星级
    private _timer: number = 0;
    private _interval: number = 0;
    private _isPlay: boolean = false;
    private _tmpNum: number = 0;

    private _rewards: number[] = null;

    initUI() {
        //处理层级问题 宝箱层级 最高 盖住其余的几个 dlg 界面
        this.node.zIndex = 10;
        app.audioMgr.stopMusic();

        let bg = this.boxAnim.node.children[0];
        bg && bg.setContentSize(cc.view.getVisibleSize());

        this.boxAnim.stop();
        this.boxSke.playAnimation('Idle', 0);
        this.mask.children.forEach(element => {
            element.active = false;
        });
        this.flashs.forEach(element => {
            element.active = false;
        });
        this.state1.active = true;
        this.state2.active = false;

        this.lblCoin.node.parent.active = false;
        this.title_box.active = true;

        this._rewards = [];

        app.justTrack('宝箱界面打开次数');
        zs.Native.TenjinTrackEvent("cv_46")
    }

    private play() {
        this.lblCoin.node.parent.active = true;
        this._isPlay = true;
        this.state1.active = false;

        this.boxAnim.play();
        this.boxSke.playAnimation('Open', 1);

        let tmp = { 1: 0.2, 3: 0.1, 5: 0.05 };//滚动帧率
        this._interval = tmp[this._starLv];

        let coins = { 1: [50, 70], 3: [100, 200], 5: [200, 300] };
        let arr = coins[this._starLv];
        let coin = Util.randomNumber(arr[0], arr[1]);

        let aniTime = 6;

        this._interval = coin / (aniTime * 60);
        // console.error(this._interval)
        this.scheduleOnce(() => {
            this.flashs.forEach(element => {
                element.opacity = 255;
            });
            this.title_box.active = false;
            this.state2.active = true;
            this._isPlay = false;
            this.lblCoin.string = coin.toString();
            app.audioMgr.playEffect(SoundName.fpx_TreasureFound);

        }, aniTime);


        this.createItem();
        this.setStarShow();

        this.playSound();
        // cc.tween(this.lblCoin).to(10,{string:})
    }

    playSound() {
        let s = '';
        if (this._starLv == 1) {
            s = SoundName.fpx_Treasure1;
        } else if (this._starLv == 3) {
            s = SoundName.fpx_Treasure2;
        } else if (this._starLv == 5) {
            s = SoundName.fpx_Treasure3;
        }
        app.audioMgr.playEffect(s);
    }

    private createItem() {
        let skills = app.dataMgr.battleRoleData.skills;
        let buffs = app.dataMgr.battleRoleData.buffers;
        let allSkills = skills.concat(buffs);

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
                for (let i = sdata.cur; i <= sdata.max; i++) {
                    list.push(sdata.upitem);
                }
            }
        }

        if (superList.length > 0) {
            if (superList.length > this._starLv) { //随机超武
                // let items = app.confMgr.conf.skillbox.getItemsByTp(99);

                for (let i = 0; i < superList.length; i++) {
                    this._rewards.push(superList[i]);
                }

            } else {
                for (let i = 0; i < superList.length; i++) {
                    this._rewards.push(superList[i]);
                }
            }
        }

        while (this._rewards.length < this._starLv) {

            if (list.length > 0) {

                const idx = Util.randomNumber(0, list.length - 1);
                let arr = list.splice(idx, 1);
                this._rewards.push(arr[0]);

            } else {

                this._rewards.push(enum_item_ids.highmoney);
            }

        }

        // console.log('skillLvlMap-----',skillLvlMap,list)

    }

    private setStarShow() {
        let nums = STAR_SHOW[this._starLv];
        let a_idx: number = 0;
        for (let i = 0; i < nums.length; i++) {
            const idx = nums[i] - 1;
            this.mask.children[idx].active = true;
            this.items[idx].active = true;
            this.flashs[idx].active = true;
            let sp = this.items[idx].getComponent(cc.Sprite);
            let itemId = this._rewards[a_idx];
            if (sp && itemId > 0) {
                sp.spriteFrame = ResMgr.ins.getItemSp(itemId);
            } else {

                sp.node.active = false;
                this.flashs[idx].active = false;
            }
            a_idx++;
        }
    }

    update(dt) {
        if (!this._isPlay) return;
        this._timer += this._interval;
        this.lblCoin.string = this._timer.toFixed(2);
        return
        this._timer += dt;
        if (this._timer >= this._interval) {
            this._timer = 0;
            this._tmpNum++;
            this.lblCoin.string = this._tmpNum.toString();
        }
    }

    clickOpen() {

        this._starLv = 1;
        this.play();
    }

    clickVideoOpen() {
        app.justTrack('宝箱界面视频次数');
        zs.Native.TenjinTrackEvent("cv_47")
        //五星概率  =  20%基础几率 + 幸运值
        zs.platform.async.playVideo().then(r => {
            if (r) {
                app.justTrack('宝箱界面视频次数成功');
                zs.Native.TenjinTrackEvent("cv_48")
                this._starLv = Math.random() > 0.2 ? 3 : 5;
                this.play();
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
        this._rewards.forEach(rId => {
            DropMgr.ins.meetDropItem(1, rId, false);
        });
        app.dataMgr.battleRoleData.addGold(Number(this.lblCoin.string));
    }
}

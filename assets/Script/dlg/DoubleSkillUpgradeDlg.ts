/*
* @ Author: yangcheng
* @ Data: 2022-04-06 11:07
*/

import { app } from "../app";
import ItemHelper from "../common/ItemHelper";
import BasePopup from "../core/gui/BasePopup";
import Util from "../core/utils/Util";
import { enum_item_ids, EventName, main_pro_key, max_buffskill_num, max_skill_num, PopupName } from "../Defines";
import { Skill } from "../logics/BattleRoleData";
import DropMgr from "../logics/DropMgr";
import DoubleUpgradeItem from "../ui/DoubleUpgradeItem";
import UpgradeItem from "../ui/UpgradeItem";
import DoubleSkillDescItem from "./DoubleSkillDescItem";
import SkillShowItem from "./SkillShowItem";

const { ccclass, property } = cc._decorator

@ccclass
export default class DoubleSkillUpgradeDlg extends BasePopup {

    /**选着技能预制体 */
    @property(cc.Prefab)
    upGradeItem: cc.Prefab = null;

    /**技能描述预制体 */
    @property(cc.Prefab)
    skillDescItem: cc.Prefab = null;

    /**属性节点 */
    @property(cc.Node)
    attContent: cc.Node = null;

    /** */
    @property(cc.Node)
    p1SkillCoin: cc.Node = null;
    /** */
    @property(cc.Node)
    p2SkillCoin: cc.Node = null;

    /**技能详情 */
    @property(cc.Node)
    upGuradeProperty: cc.Node = null;

    /**合成表 */
    @property(cc.Node)
    upGuradeComposedTabe: cc.Node = null;

    r_itemLen: number = 3;

    readyState = [0, 0]

    start() {
        app.justTrack('双生升级界面打开次数');
        zs.Native.TenjinTrackEvent("cv_33")
        super.start();

        let click = cc.Node.EventType.TOUCH_START;
        for (let i = 0; i < 2; i++) {
            let node = this.node.getChildByName(`P${i + 1}_boxbg`)
            let changBtn = node.getChildByName('changeBtn');
            let allBtn = node.getChildByName('allBtn');

            changBtn.on(click, () => { this.onChangeBtn(i) }, this);
            allBtn.on(click, () => { this.onAllBtn(i) }, this);

            this.loadSkills(i);

            this.commonFreshSkills(i);
        }
        this.loadAttItems();
    }

    /**加载技能图标 */
    loadSkills(i) {
        let node = i == 0 ? this.p1SkillCoin : this.p2SkillCoin;
        let skills = app.dataMgr.battleData.getRoleData(i + 1).skills;
        let len = skills.length;
        for (let j = 0; j < len; j++) {
            let item = node.children[j];
            if (!item) {
                item = cc.instantiate(node.children[0]);
                item.parent = node;
            }
            item.getComponent(SkillShowItem)?.setData(skills[j], i);
        }
    }

    /**加载属性 */
    loadAttItems() {
        //这里要区分玩家的属性来赋值
        let atts = app.confMgr.conf.attribute.getRoleShowAttr();
        let copyItem: cc.Node = null, childs = this.attContent.children;
        for (let i = 0; i < atts.length; i++) {
            copyItem = childs[i];
            if (!copyItem) {
                copyItem = cc.instantiate(this.skillDescItem)
                copyItem.parent = this.attContent;
            }
            let cmp: DoubleSkillDescItem = copyItem.getComponent(DoubleSkillDescItem);
            cmp.setData(atts[i], i);
        }
    }

    changToggleView(toggle: cc.Toggle) {
        let id = Number(toggle.node.name);
        if (id == 0) {
            this.upGuradeProperty.active = true;
            this.upGuradeComposedTabe.active = false;
        } else if (id == 1) {
            this.upGuradeProperty.active = false;
            this.upGuradeComposedTabe.active = true;
        }
    }

    /**普通刷新技能 */
    commonFreshSkills(i) {  // 0  1
        let btData = app.dataMgr.battleData.getRoleData(i + 1);

        let luck = btData.getAttrByIdx(main_pro_key.luck_all);
        this.r_itemLen = Math.random() < luck ? 4 : 3;

        this.loadRandomSkills(i);
    }

    /**加载随机技能 */
    loadRandomSkills(i) {
        let arr = this.getRandomItems(i);
        let content = this.node.getChildByName(`P${i + 1}_boxbg`).getChildByName('content');;
        let childs = content.children;
        for (let j = 0; j < arr.length; j++) {
            let item = childs[j];
            if (!item) {
                item = cc.instantiate(this.upGradeItem);
                item.parent = content;
            }
            item.active = true;
            let comp = item.getComponent(DoubleUpgradeItem);
            comp.setData(arr[j], i, zs.Handler.create(this, this.clickItem, [content, i]));
        }

        // for (let j = arr.length; j < childs.length; j++) {
        //     childs[j].active = false;
        // }
    }

    clickItem(node: cc.Node, i) {
        node.parent.active = false;
        //玩家已经选择技能
        this.readyState[i] = 1;
        let bool = false;
        this.readyState.forEach((value) => {
            if (value == 0) {
                bool = true;
                return;
            }
        })
        if (bool) {
            return;
        }
        //技能全部选择完成 开始游戏
        this.closeUi();

        console.log("doubleSkill界面clickItem")
    }

    /**获取随机物品 */
    private getRandomItems(i: number) {

        let len = this.r_itemLen;
        let arr = app.confMgr.conf.skillbox.getItemsByTp(1);

        let brData = app.dataMgr.battleData.getRoleData(i + 1);
        let skillFull: boolean = brData.skills.length == max_skill_num;
        let buffFull: boolean = brData.buffers.length == max_buffskill_num;

        let skillMap = Object.create(null);

        brData.skills.concat(brData.buffers).forEach(s => {
            skillMap[s.conf.skill_weapon] = s;
        })

        let filterArr = [];
        /**过滤可以随机的物品 */
        for (let i = 0; i < arr.length; i++) {

            let skill: Skill = null, item = arr[i];
            let maxLvl: number, isFull: boolean;

            let conf = app.confMgr.conf.item.getConfById(item.item_id);
            skill = skillMap[item.item_id];
            if (ItemHelper.isWeapon(conf.item_type)) {
                isFull = skillFull;
            } else if (ItemHelper.isShiPin(conf.item_type)) {
                isFull = buffFull;
            }

            if (skill) {
                maxLvl = app.confMgr.conf.skill.getSkillMaxLvl(skill.conf.skill_weapon);
                if (skill.conf.skill_level < maxLvl) {
                    filterArr.push({ id: item.item_id, skill: skill, random_weight: item.random_weight });
                }
            } else if (!isFull) {
                filterArr.push({ id: item.item_id, skill: skill, random_weight: item.random_weight });
            }
        }

        let weights = filterArr.map((e) => {
            return e.random_weight;
        })

        let findArr = [], findMap: { [k: number]: boolean } = Object.create(null);
        let idx: number, r_num = len;
        if (filterArr.length < r_num) {
            r_num = filterArr.length;
        };

        while (findArr.length < r_num) {
            idx = Util.weightRandomIdx(weights);
            if (findMap[idx]) {
                continue;
            }
            findArr.push(filterArr[idx]);
            findMap[idx] = true;
        }

        let f_len = findArr.length;
        if (f_len < len) {
            for (let j = f_len + 1; j <= len; j++) {
                let bid = Math.random() < 0.5 ? enum_item_ids.kaoji : enum_item_ids.highmoney;
                findArr.push({ id: bid, skill: null });
            }
        }
        // console.log('findArr-------',findArr)
        return findArr;
    }

    /**更换按钮 */
    onChangeBtn(i) {
        app.justTrack('双生升级换一次视频次数');
        zs.Native.TenjinTrackEvent("cv_34")
        zs.platform.async.playVideo().then(r => {
            if (r) {
                app.justTrack('双生升级换一次视频次数成功');
                zs.Native.TenjinTrackEvent("cv_35")
                this.r_itemLen = 4;
                this.loadRandomSkills(i);
            }
        }).catch(e => {
            zs.platform.sync.showToast("暂时没有视频资源");
        })
    }

    /**全都要 */
    onAllBtn(i) {
        app.justTrack('双生升级全都要视频次数');
        zs.Native.TenjinTrackEvent("cv_36")
        zs.platform.async.playVideo().then(r => {
            if (r) {
                app.justTrack('双生升级全都要视频次数成功');
                zs.Native.TenjinTrackEvent("cv_37")
                let node = this.node.getChildByName(`P${i + 1}_boxbg`).getChildByName('content')
                node.children.forEach(e => {
                    let cmp: UpgradeItem = e.getComponent(UpgradeItem);
                    cmp && DropMgr.ins.meetDropItem(i + 1, cmp.m_data.id, false);
                })
                this.clickItem(node, i);
            }
        }).catch(e => {
            zs.platform.sync.showToast("暂时没有视频资源");
        })
    }

    protected onEnable(): void {
        super.onEnable();
        app.eventMgr.emit(EventName.game_pause, true);
    }
    protected onDisable(): void {
        super.onDisable();
        app.eventMgr.emit(EventName.game_pause, false);

        // app.showInsertAd(()=>{
        //     app.eventMgr.emit(EventName.game_pause, true);
        // },()=>{
        //     app.eventMgr.emit(EventName.game_pause, false);
        // });
    }
}
import GameLogic from "../../zsLibs/GameLogic";
import { app } from "../app";
import ItemHelper from "../common/ItemHelper";
import BasePopup from "../core/gui/BasePopup";
import ResMgr from "../core/resLoad/ResMgr";
import Util from "../core/utils/Util";
import { main_pro_key, max_skill_num, max_buffskill_num, enum_item_ids, EventName, PopupName } from "../Defines";
import { Skill } from "../logics/BattleRoleData";
import DropMgr from "../logics/DropMgr";
import UpgradeItem from "../ui/UpgradeItem";
import AttrShowItem from "./AttrShowItem";
import SkillShowItem from "./SkillShowItem";

const { ccclass, property } = cc._decorator;

/**
 * 技能升级
 */

@ccclass
export default class SkillUpgradeDlg extends BasePopup {

    // @property(cc.Node) 
    // skillCon: cc.Node = null;

    // @property(cc.Node) 
    // attCon: cc.Node = null;

    // @property(cc.Node) 
    // composeCon: cc.Node = null;


    @property(cc.Prefab)
    prefabItem: cc.Prefab = null;

    @property(cc.Node)
    content: cc.Node = null;

    r_itemLen: number = 3;
    start() {
        super.start();

        // this.loadSkills();
        // this.loadAttItems();
        this.commonFreshSkills();
    }

    initUI() {
        // this.scheduleOnce(() =>{
        //     this.loadComposeItems();
        // },0.05)
        app.justTrack('升级界面打开次数');
        zs.Native.TenjinTrackEvent("cv_54")
    }

    // loadSkills(){

    //     let skills = app.dataMgr.battleRoleData.skills;
    //     let len = skills.length;
    //     let childs = this.skillCon.children;
    //     for(let i=1;i<len;i++){
    //         cc.instantiate(childs[0]).parent = this.skillCon;
    //     }
    //     let cmp:SkillShowItem;
    //     childs.forEach((c,idx)=>{
    //         cmp = c.getComponent(SkillShowItem);
    //         cmp.setData(skills[idx],idx);
    //     })

    // }

    // loadAttItems(){
    //     let atts = app.confMgr.conf.attribute.getRoleShowAttr();

    //     let copyItem:cc.Node = null,childs = this.attCon.children;
    //     for(let i=0;i<atts.length;i++){
    //         copyItem = childs[i];
    //         if(!copyItem){
    //             copyItem = cc.instantiate(childs[0])
    //             copyItem.parent = this.attCon;
    //         }
    //         let cmp:AttrShowItem = copyItem.getComponent(AttrShowItem);
    //         cmp.setData(atts[i]);
    //     }
    // }

    // loadComposeItems(){
    //     let arr = app.confMgr.conf.compound.getConfArr();
    //     let childs = this.composeCon.children;
    //     for(let i=0;i<arr.length;i++){
    //         let item = childs[i];
    //         if(!item){
    //             item = cc.instantiate(childs[0]);
    //             item.parent = this.composeCon;
    //         }
    //         let data = arr[i]
    //         item.getChildByName('icon1').getComponent(cc.Sprite).spriteFrame = ResMgr.ins.getItemSp(data.icon01);
    //         item.getChildByName('icon2').getComponent(cc.Sprite).spriteFrame = ResMgr.ins.getItemSp(data.icon02)
    //         item.getChildByName('icon3').getComponent(cc.Sprite).spriteFrame = ResMgr.ins.getItemSp(data.icon03)
    //     }
    // }

    /**普通刷新技能 */
    commonFreshSkills() {
        let luck = app.dataMgr.battleRoleData.getAttrByIdx(main_pro_key.luck_all);
        this.r_itemLen = Math.random() < luck ? 4 : 3;
        this.loadRandomSkills();
    }


    loadRandomSkills() {

        if (this.r_itemLen >= 4) {
            this.content.y = 230;
        } else {
            this.content.y = 150;
        }

        let arr = this.getRandomItems();

        let content = this.content;
        let childs = content.children;
        for (let i = 0; i < arr.length; i++) {
            let item = childs[i];
            if (!item) {
                item = cc.instantiate(this.prefabItem);
                item.parent = content;
            }
            item.active = true;
            let comp = item.getComponent(UpgradeItem);
            comp.setData(arr[i]);
        }

        for (let j = arr.length; j < childs.length; j++) {
            childs[j].active = false;
        }

    }

    /**获取随机物品 */
    getRandomItems() {

        let len = this.r_itemLen;
        let arr = app.confMgr.conf.skillbox.getItemsByTp(1);

        let brData = app.dataMgr.battleRoleData;
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
    onChangeBtn() {
        // let str = "换一批技能";
        // app.justTrack(str,str);
        app.justTrack('升级换一次视频次数');
        zs.Native.TenjinTrackEvent("cv_55")
        zs.platform.async.playVideo().then(r => {
            if (r) {
                app.justTrack('升级换一次视频次数成功');
                zs.Native.TenjinTrackEvent("cv_56")
                this.r_itemLen = 4;
                this.loadRandomSkills();
            }
        }).catch(e => {
            zs.platform.sync.showToast("暂时没有视频资源");
        })
    }

    /**全都要 */
    onAllBtn() {
        app.justTrack('升级全都要视频次数');
        zs.Native.TenjinTrackEvent("cv_57")
        zs.platform.async.playVideo().then(r => {
            if (r) {
                app.justTrack('升级全都要视频次数成功');
                zs.Native.TenjinTrackEvent("cv_58")
                this.content.children.forEach(e => {
                    let cmp: UpgradeItem = e.getComponent(UpgradeItem);
                    cmp && DropMgr.ins.meetDropItem(1, cmp.m_data.id, false)
                })

                app.layerMgr.close(PopupName.SkillUpgradeDlg);
                app.eventMgr.emit(EventName.game_pause, false);
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
        // app.showInsertAd(()=>{
        //     app.eventMgr.emit(EventName.game_pause, true);
        // },()=>{
        //     app.eventMgr.emit(EventName.game_pause, false);
        // });
    }

}

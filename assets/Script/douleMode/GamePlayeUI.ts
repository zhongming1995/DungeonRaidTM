// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../app";
import ResMgr from "../core/resLoad/ResMgr";
import { EventName } from "../Defines";
import BuffShowItem from "../dlg/BuffShowItem";
import SkillShowItem from "../dlg/SkillShowItem";
import BattleRoleData from "../logics/BattleRoleData";
import SuperSkillShow from "./SuperSkillShow";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlayeUI extends cc.Component {

    @property(cc.Sprite)
    headIcon: cc.Sprite = null;

    @property(cc.Node)
    skillCon: cc.Node = null;

    @property(cc.Node)
    buffCon: cc.Node = null;

    @property(SuperSkillShow)
    ultSkills: SuperSkillShow[] = [];

    @property(cc.Label)
    lblCoin: cc.Label = null;

    @property(cc.Label)
    lblKill: cc.Label = null;

    /** 试用超武*/
    @property(cc.Node)
    superItem: cc.Node = null;

    /** 超武时间*/
    weaponTm: number = 0;


    superList: number[] = [100044, 100049, 100045]  //大招列表
    nameArr = ['秒杀', '火', '冰']

    pid: number = 1;  // 对应玩家
    playerData: BattleRoleData = null;

    initPlayerData(pdata: BattleRoleData) {
        this.pid = pdata.pid;
        this.playerData = pdata;

        this.headIcon && (this.headIcon.spriteFrame = ResMgr.ins.getRoleSp(this.playerData.rid));
        this.updateCoin();
        this.updateKills();

        this.initSkillItems();
        this.initUltSkill();
    }

    onLoad(): void {

    }

    /** 金币*/
    updateCoin() {
        this.lblCoin.string = `${this.playerData.gold}`;
    }

    /** 击杀数*/
    updateKills() {
        this.lblKill.string = `${this.playerData.kill}`;
    }


    /**初始技能节点 */
    initSkillItems() {
        let skillPre: cc.Node = this.skillCon.children[0];
        let buffPre: cc.Node = this.buffCon.children[0];

        for (let i = 0; i < 6; i++) {
            let sNode: cc.Node = i > 0 ? cc.instantiate(skillPre) : skillPre;
            let bNode: cc.Node = i > 0 ? cc.instantiate(buffPre) : buffPre;
            if (i > 0) {
                this.skillCon.addChild(sNode);
                this.buffCon.addChild(bNode);
            }
        }

        this.freshSkill();
        this.freshBuffSkill();
    }

    /**更新技能 */
    freshSkill() {
        let skills = this.playerData.skills;
        this.skillCon.children.forEach((s, i) => {
            s.getComponent(SkillShowItem).setData(skills[i], i);
        })
    }

    /**更新buff技能 */
    freshBuffSkill() {
        let buffers = this.playerData.buffers;
        this.buffCon.children.forEach((s, i) => {
            s.getComponent(BuffShowItem).setData(buffers[i], i);
        })

    }

    /**初始化大招 */
    initUltSkill() {
        let cb: Function = this.evtCallBack.bind(this);
        this.ultSkills.forEach((skill, i) => {
            let sid = this.superList[i];
            skill.setData(this.playerData, this.playerData.ultSkill[sid]);
            skill.setCallBack(cb);
        })

    }


    /**刷新大招 */
    freshUltSkill(sid) {
        let idx = this.superList.indexOf(sid);
        if (idx > -1) {
            this.ultSkills[idx].setData(this.playerData, this.playerData.ultSkill[sid]);
        }
    }

    /**释放大招 */
    evtCallBack(e: SuperSkillShow, isvideo: boolean) {
        let sid = e.ultData.id;
        let idx = this.superList.indexOf(sid);

        // if(isvideo){
        //     app.justTrack(`RE技能视频-${this.nameArr[idx]}次数成功`)
        //     // app.eventMgr.emit(EventName.release_ult,sid);  
        // }else{
        // app.justTrack(`RE技能-${this.nameArr[idx]}次数`);
        app.justTrack("释放大招次数")
        zs.Native.TenjinTrackEvent("cv_13")
        // this.playerData.removeUltSkill(sid);  
        // }         
        this.playerData.removeUltSkill(sid, isvideo);
    }

    /**使用超武 */
    useSuperWeapon(pid: number) {
        if (!this.superItem) {
            return;
        }

        this.superItem.active = true;
        this.weaponTm = 200;

        let playerData = this.playerData || app.dataMgr.battleData.getRoleData(pid);
        let weaponId = playerData.trySuperSkill.conf.skill_weapon;
        let icon = this.superItem.getChildByName('icon');
        icon.getComponent(cc.Sprite).spriteFrame = ResMgr.ins.getItemSp(weaponId);
        this.superItem.getChildByName('timeLab').getComponent(cc.Label).string = this.weaponTm + 's';
    }

    //武器计时
    schudleTryWeapon() {
        if (!this.superItem || !this.superItem.active || this.weaponTm == 0) {
            return;
        }
        this.weaponTm--;
        this.superItem.getChildByName('timeLab').getComponent(cc.Label).string = this.weaponTm + 's';

        if (this.weaponTm <= 0) {
            this.superItem.active = false;
            app.dataMgr.battleData.tryWeaponEnd(this.pid);
        }
    }


    gameUpdate(dt) {
        this.ultSkills.forEach(e => {
            e.updateCd();
        })

    }

    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameLogic from "../../zsLibs/GameLogic";
import { app } from "../app";
import ResMgr from "../core/resLoad/ResMgr";
import { EventName, PopupName } from "../Defines";
import { Skill } from "../logics/BattleRoleData";
import DropMgr from "../logics/DropMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UpgradeItem extends cc.Component {

    @property(cc.Label)
    lblName: cc.Label = null;

    @property(cc.Label)
    lblDesc: cc.Label = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Label)
    lvlLab: cc.Label = null;

    @property(cc.Node)
    newNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    m_data: any = null;


    setData(data: { id: number, skill: Skill }) {
        this.m_data = data;
        let itemConf = app.confMgr.conf.item.getConfById(data.id);
        this.lblName.string = itemConf.item_name;
        this.icon.spriteFrame = ResMgr.ins.getItemSp(data.id);
        if (data.skill) {

            this.newNode.active = false;
            let c_conf = data.skill.conf;
            let conf = app.confMgr.conf.skill.getConfById(c_conf.skill_nextlevel) || c_conf;
            this.lvlLab.string = `等级：${conf.skill_level}`;
            this.lblDesc.string = conf.skill_detail;
        } else {
            this.newNode.active = true;
            this.lvlLab.string = '';
            this.lblDesc.string = itemConf.item_detail;
        }

    }


    onSelectBtn() {
        // let str = `升${app.dataMgr.battleRoleData.lvl}级,选择技能:${this.lblName.string}`;
        // app.justTrack(str, str);

        DropMgr.ins.meetDropItem(1, this.m_data.id, false);
        app.layerMgr.close(PopupName.SkillUpgradeDlg);
        app.eventMgr.emit(EventName.game_pause, false);

        console.log("技能选择按钮点击")
        zs.Native.ShowInsertAdByInterval();

    }
}

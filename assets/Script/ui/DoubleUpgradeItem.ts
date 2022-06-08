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
import UpgradeItem from "./UpgradeItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DoubleUpgradeItem extends UpgradeItem {

    handler: zs.Handler = null;
    id = 1;

    setData(data: { id: number, skill: Skill }, id?, call?: zs.Handler) {
        this.m_data = data;
        super.setData(data);
        this.id = id + 1;
        this.handler = call;
    }

    onSelectBtn() {
        DropMgr.ins.meetDropItem(this.id, this.m_data.id, false);
        this.handler && this.handler.run();
    }
}

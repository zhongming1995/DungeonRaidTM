import { EventName } from './../Defines';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../app";
import { JsonModule } from "../core/conf/ClientConfigMgr";
import ResMgr from "../core/resLoad/ResMgr";
import NodePoolMgr, { PoolName } from "../core/utils/NodePoolMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class StrenthItem extends cc.Component {


    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Label)
    nameLab: cc.Label = null;

    @property(cc.Node)
    selectImg: cc.Node = null;

    @property(cc.Label)
    numLab: cc.Label = null;

    @property(cc.Node)
    skillNode: cc.Node = null;

    @property(cc.Prefab)
    skillItem: cc.Prefab = null;

    @property(cc.Integer)
    skillItemWidth = 0;
    @property(cc.Integer)
    skillNodeWidth = 0;

    m_cb: Function = null;
    m_data: JsonModule.IStrengthJson;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        //技能升级后刷新
        app.eventMgr.on(EventName.skill_upgrade, this.refreshUpGradeRedDot, this);
        //获取金币后刷新
        app.eventMgr.on(EventName.gold_fresh, this.refreshUpGradeRedDot, this);
    }

    setData(data: JsonModule.IStrengthJson) {
        this.m_data = data;
        this.nameLab.string = data.skill_name;
        this.icon.spriteFrame = ResMgr.ins.getItemSp(data.skill_icon);
        this.setLvl();
        this.refreshUpGradeRedDot();
    }

    refreshUpGradeRedDot(){
        let num = app.dataMgr.roleProxy.getUpGradeRedDot(this.m_data);
        if (num > 0) {
            this.numLab.string = num + '';
            this.numLab.node.parent.active = true;
        } else {
            this.numLab.node.parent.active = false;
        }
    }

    setLvl() {
        let lvl = app.dataMgr.roleProxy.getSkillLvl(this.m_data.id);
        //技能最大等级 skillMaxLv
        let skillMaxLv = this.m_data.skill_maxlevel;
        let copyItem: cc.Node = null, display, skillWidth;
        let refreshWidth = (node) => {
            if (skillMaxLv > 5) {
                skillWidth = this.skillNodeWidth / skillMaxLv;
                node.width = skillWidth;
            } else {
                node.width = this.skillItemWidth;
            }
        }
        if (this.skillNode.childrenCount < skillMaxLv) {
            for (let i = 0; i < skillMaxLv; i++) {
                copyItem = NodePoolMgr.ins.getItem(PoolName.SkillLvItem);
                if (!copyItem) {
                    copyItem = cc.instantiate(this.skillItem);
                }

                refreshWidth(copyItem);

                display = copyItem.getChildByName("display");
                if (lvl > i) {
                    display.active = true;
                } else {
                    display.active = false;
                }
                this.skillNode.addChild(copyItem);
            }
        } else {
            for (let i = 0; i < this.skillNode.childrenCount; i++) {
                let display = this.skillNode.children[i].getChildByName("display");
                refreshWidth(this.skillNode.children[i]);
                if (lvl > i) {
                    display.active = true;
                } else {
                    display.active = false;
                }
            }
        }
    }

    setSelect(show: boolean) {
        this.selectImg.active = show;
    }

    setCallBack(cb: Function) {
        this.m_cb = cb;
    }


    onItemClk() {
        this.m_cb && this.m_cb(this);
    }

    // update (dt) {}
}

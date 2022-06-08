/*
* @ Author: yangcheng
* @ Data: 2022-04-06 11:07
*/

import { app } from "../app";
import ResMgr from "../core/resLoad/ResMgr";
import AttrShowItem from "./AttrShowItem";
import RoleDetailDlg from "./RoleDetailDlg";
import SkillShowItem from "./SkillShowItem";

const { ccclass, property } = cc._decorator

@ccclass
export default class DoubleRoleDetailDlg extends RoleDetailDlg {

    start() {

        this.setMusicState();
        for (let i = 0; i < 2; i++) {
            this.initItem(i);
        }
    }

    initItem(id) {
        //p1
        let node = this.node.getChildByName('p' + (id + 1));
        let head = node.getChildByName(`p${id + 1}_head`);
        let icon = head.getChildByName('icon').getComponent(cc.Sprite);
        let name = head.getChildByName('name').getComponent(cc.Label);

        let attContent = node.getChildByName('content_box').getChildByName('attContent');
        let skillCon = node.getChildByName('content_box_up').getChildByName('skillCon');
        this.loadAttItems(attContent, id);
        this.loadSkills(skillCon, id);

        let batData = app.dataMgr.battleData.getRoleData(id + 1);

        let roleData = app.confMgr.conf.role.getConfById(batData.rid);
        icon.spriteFrame = ResMgr.ins.getRoleSp(roleData.id);
        name.string = `[${roleData.role_name}]`;
    }

    loadSkills(node?, id?) {
        let skills = app.dataMgr.battleData.getRoleData(id + 1).skills;
        let len = skills.length;
        let childs = node.children;
        for (let i = 1; i < len; i++) {
            cc.instantiate(childs[0]).parent = node;
        }
        let cmp: SkillShowItem;
        childs.forEach((c, idx) => {
            cmp = c.getComponent(SkillShowItem);
            cmp.setData(skills[idx], idx);
        })
    }

    loadAttItems(node?, id?) {
        let atts = app.confMgr.conf.attribute.getRoleShowAttr();
        let copyItem: cc.Node = null;
        let childs = node.children;
        for (let i = 0; i < atts.length; i++) {
            copyItem = childs[i];
            if (!copyItem) {
                copyItem = cc.instantiate(childs[0])
                copyItem.parent = node;
            }
            let cmp: AttrShowItem = copyItem.getComponent(AttrShowItem);
            cmp.setData(atts[i], id + 1);
        }
    }

}
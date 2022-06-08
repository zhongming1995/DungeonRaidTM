/*
* @ Author: yangcheng
* @ Data: 2022-04-06 11:07
*/

import { app } from "../app";
import BasePopup from "../core/gui/BasePopup";
import ResMgr from "../core/resLoad/ResMgr";
import Util from "../core/utils/Util";

const { ccclass, property } = cc._decorator
@ccclass
export default class DoubleResultDlg extends BasePopup {

    onLoad(): void { }

    start(): void {
        for (let i = 0; i < 2; i++) {
            this.initItem(i);
        }
    }

    initItem(id): void {
        //获取组件
        let node = this.node.getChildByName('p' + (id + 1));
        /**金币 */
        let goldLab = node.getChildByName('goldLab').getComponent(cc.Label);
        /**持有技能 */
        let itemBox = node.getChildByName('itembox');
        let parent = itemBox.getChildByName('view').getChildByName('content');
        /**杀敌数量 */
        let killLab = node.getChildByName('killLab').getComponent(cc.Label);
        /**生存时间 */
        let livetimeLab = node.getChildByName('livetimeLab').getComponent(cc.Label);
        /**等级 */
        let lvlLab = node.getChildByName('lvlLab').getComponent(cc.Label);
        let head = this.node.getChildByName('p' + (id + 1) + '_head');
        /**人物头像 */
        let icon = head.getChildByName('icon').getComponent(cc.Sprite);
        /**人物名字 */
        let name = head.getChildByName('name').getComponent(cc.Label);

        let batData = app.dataMgr.battleData.getRoleData(id + 1);

        //临时凑合用着
        icon.spriteFrame = ResMgr.ins.getRoleSp(batData.rid);
        let roleData = app.confMgr.conf.role.getConfById(batData.rid);
        name.string = `[${roleData.role_name}]`;
        lvlLab.string = batData.lvl + '';
        livetimeLab.string = Util.secondFormat(batData.liveTimer);
        killLab.string = batData.kill + '';
        goldLab.string = Math.floor(batData.gold) + '';

        let skills = batData.skills;
        skills = skills.filter((e) => {
            return e != null;
        })
        let childs = parent.children;
        for (let i = 0; i < skills.length; i++) {
            let icon = childs[i];
            if (!icon) {
                icon = cc.instantiate(childs[0]);
                icon.parent = parent;
            }
            let itemId = skills[i].conf.skill_weapon;
            icon.getComponent(cc.Sprite).spriteFrame = ResMgr.ins.getItemSp(itemId);
        }
    }

    /**我要变强 */
    onStrengthBtn() {
        zs.core.workflow.next();
    }

}
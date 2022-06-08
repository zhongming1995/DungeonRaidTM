/*
* @ Author: yangcheng
* @ Data: 2022-03-30 15:26
*/

import { app } from "../app";
import AttrShowItem from "./AttrShowItem";
import SkillShowItem from "./SkillShowItem";

const {ccclass , property } = cc._decorator;

@ccclass
export default class SkillUpgradeProperty extends cc.Component{

    @property(cc.Node) 
    skillCon: cc.Node = null;

    @property(cc.Node) 
    attCon: cc.Node = null;

    protected onLoad(): void {
        this.loadSkills();
        this.loadAttItems();
    }

    loadSkills(){

        let skills = app.dataMgr.battleRoleData.skills;
        let len = skills.length;
        let childs = this.skillCon.children;
        for(let i=1;i<len;i++){
            cc.instantiate(childs[0]).parent = this.skillCon;
        }
        let cmp:SkillShowItem;
        childs.forEach((c,idx)=>{
            cmp = c.getComponent(SkillShowItem);
            cmp.setData(skills[idx],idx);
        })
        
    }

    loadAttItems(){
        let atts = app.confMgr.conf.attribute.getRoleShowAttr();

        let copyItem:cc.Node = null,childs = this.attCon.children;
        for(let i=0;i<atts.length;i++){
            copyItem = childs[i];
            if(!copyItem){
                copyItem = cc.instantiate(childs[0])
                copyItem.parent = this.attCon;
            }
            let cmp:AttrShowItem = copyItem.getComponent(AttrShowItem);
            cmp.setData(atts[i]);
        }
    }

}
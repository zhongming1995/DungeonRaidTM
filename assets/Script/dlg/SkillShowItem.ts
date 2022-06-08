// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ResMgr from "../core/resLoad/ResMgr";
import { Skill } from "../logics/BattleRoleData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillShowItem extends cc.Component {

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Label)
    lvlLab: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    m_idx:number = 0;
    start () {

    }

    setData(data:Skill,idx:number){
        this.m_idx = idx;
        if(data){
            this.icon.spriteFrame = ResMgr.ins.getItemSp(data.conf.skill_weapon);        
            this.lvlLab && (this.lvlLab.string ='Lv.' + data.conf.skill_level);
        }else{
            this.clear();
        }
    }

    clear(){
        this.icon.spriteFrame = null;
        this.lvlLab && (this.lvlLab.string = '');
    }

    // update (dt) {}
}

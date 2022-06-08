

import RoleSkill from "../skill/RoleSkill";
import SkillBasic from "./SkillBasic";

const {ccclass, property} = cc._decorator;

/**
 * 大蒜
 */

@ccclass
export default class Garlic extends SkillBasic {

    @property()
    isSuper:boolean = false;

    init(skill:RoleSkill,param) {
        super.init(skill,param);

        let atkScale = skill.skillData.getAtkRange();
        this.atkDistAdd =  this.atkDist * atkScale;
        this.node.scale = atkScale;

        this.durTimer =0;
        this.durationAdd = this.skill._cdTimer; //伤害一次 
    }

    gameUpdate(dt) {
        
        const pos = this.player.node.getPosition();
        pos.y += 13;
        this.node.setPosition(pos);

        this.durTimer += dt;
        if(this.durTimer >= this.durationAdd) {
            this.durTimer = 0;
            this.checkAtkTarget();//攻击一次
        }
    }

    checkAtkTarget(){
        this.atackTargets = [];
        super.checkAtkTarget();
    }

}

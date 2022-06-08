

import Util from "../../core/utils/Util";
import Enemy from "../Enemy";
import RoleSkill from "../skill/RoleSkill";
import SkillBasic from "./SkillBasic";

const {ccclass, property} = cc._decorator;

/**
 * 火球
 */
@ccclass
export default class FireBall extends SkillBasic {

    @property(cc.Node)
    rectNode:cc.Node = null;

    @property()
    isSuper:boolean = false;

    private _moveDir:cc.Vec2 = new cc.Vec2(0,0);

    private _starPos:cc.Vec2 = null;

    init(skill:RoleSkill,param) {

        super.init(skill,param);
        this.speedAdd = this.speed * skill.skillData.getAtkSpeed();
        this.isEnd = false;
        this._starPos = this.player.node.getPosition();

        
        this._starPos.y += Math.random() *30;
        let single = Math.floor(360/skill.launchNum);

        let angle =  Util.randomNumber(single * (this.m_idx-1),single * this.m_idx)
        this.node.angle = angle;

        this._moveDir = cc.v2(Math.cos(Math.PI * angle/180),Math.sin(Math.PI *angle/180))
        this.node.setPosition(this._starPos);
      
    }

    onEnable(){
        let ani = this.node.getComponent(cc.Animation);
        ani && ani.play();
    }

    gameUpdate(dt) {
        if(this.isEnd) return;
        this.freshFrameNum ++;

        let dist = this._starPos.sub(this.node.getPosition()).mag();
        if(dist >= this.atkDist) {
            this.isEnd = true;
           
        }else{  
                     
            this.move();
            if(this.freshFrameNum % 8 ==0){
                this.checkAtkTarget();
            }     
        }        
    }

    getCheckRect(){
        return this.rectNode.getBoundingBoxToWorld();
    }

    hitEnemy(e:Enemy){
        super.hitEnemy(e);
        this.isEnd = true;     
    }

    move() {
        const oldPos = cc.v2();
        this.node.getPosition(oldPos);
        const newPos = oldPos.add(this._moveDir.mul(this.speedAdd / 120));
        this.node.setPosition(newPos);
    }
}



import Enemy from "../Enemy";
import RoleSkill from "../skill/RoleSkill";
import SkillBasic from "./SkillBasic";

const {ccclass, property} = cc._decorator;

/**
 * 锤子
 */
@ccclass
export default class Hammer extends SkillBasic {

    @property(cc.Node)
    rectNode:cc.Node = null;

    @property()
    isSuper:boolean = false;

    private _moveDir:cc.Vec2 = new cc.Vec2(0,0);

    _g:number = -400;
    vx:number;
    vy:number;
    init(skill:RoleSkill,param) {

        super.init(skill,param);
        this.speedAdd = this.speed * skill.skillData.getAtkSpeed();
        this.isEnd = false;
        let playPos =  this.player.node.getPosition();
      
        let fx = this.player.moveDir.x;
        if(fx >=0) fx =1;
        else fx =-1;

        this.vx = fx * 80;
        this.vy = 250;
    
        this.node.setPosition(playPos);
      
    }

    onEnable(){
        this.attack();
    }

    attack(){
        let ani = this.node.getComponent(cc.Animation)
        ani && ani.play();
    }

    gameUpdate(dt) {
        if(this.isEnd) return;
        this.freshFrameNum ++;

        let ymin = this.player.node.y - 400;
        if(this.node.y < ymin) {
            this.isEnd = true;
           
        }else{ 

            this.move(dt);
            if(this.freshFrameNum % 6 ==0){
                this.checkAtkTarget();
            }     
        }        
    }

    getCheckRect(){
        return this.rectNode.getBoundingBoxToWorld();
    }

    hitEnemy(e:Enemy){
        super.hitEnemy(e);   
    }

    move(dt) {

        this.vy += dt * this._g;
        let x = this.node.x + this.vx*dt;
        let y = this.node.y + this.vy * dt;
        this.node.setPosition(x,y); 
    }

}

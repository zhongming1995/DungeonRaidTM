

import Enemy from "../Enemy";

import RoleSkill from "../skill/RoleSkill";
import SkillBasic from "./SkillBasic";

const {ccclass, property} = cc._decorator;

/**
 * 飞刀
 */
@ccclass
export default class FlyCutter extends SkillBasic {

    private _moveDir:cc.Vec2 = new cc.Vec2(0,0);

    private _starPos:cc.Vec2 = null;

    init(skill:RoleSkill,param) {

        super.init(skill,param);
        this.speedAdd = this.speed * skill.skillData.getAtkSpeed();
        
    }

    onEnable(){
        this.attack();
    }

    attack() {

        this._starPos = this.player.node.getPosition();

        let idx = this.m_idx % 3;

        this._starPos.y += 15 * idx;
        this.node.setPosition(this._starPos);
      
        this._moveDir = this.player.moveDir.clone();
        if(this._moveDir.x ==0)this._moveDir.x =1;
        this.lookAtObj();
       // console.log('FlyCutter-------',this.m_idx)
    }


    gameUpdate(dt) {
        if(this.isEnd) return;
        this.freshFrameNum ++;

        let dist = this._starPos.sub(this.node.getPosition()).mag();
        if(dist >= this.atkDist) {
            this.isEnd = true;
           
        }else{  

            this.move();
            if(this.freshFrameNum % 7 ==0){
                this.checkAtkTarget();
            }     
        }        
    }
    getCheckRect(){

        return this.node.getBoundingBoxToWorld();
    }

    checkHit(e:Enemy){
        let sub = e.node.getPosition().sub(this.node.getPosition())
        if(sub.mag() > e.node.width + this.node.width){
            return false;
        }
       // let rect1 = this.node.getBoundingBoxToWorld();
       // let rect2 = e.node.getBoundingBoxToWorld();
        let rect1 = this.node.getBoundingBox();
        let rect2 = e.node.getBoundingBox();
        return rect1.intersects(rect2)
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

    lookAtObj(pos?:cc.Vec2){

        var angle = cc.v2(this._moveDir).signAngle(cc.v2(1,0));  
        //将弧度转换为欧拉角
        var degree = angle / Math.PI * 180;
        //赋值给节点
        this.node.angle = -degree;

    }
}

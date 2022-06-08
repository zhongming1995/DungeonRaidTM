// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import Enemy from "../Enemy";
import RoleSkill from "../skill/RoleSkill";
import SkillBasic from "./SkillBasic";

const {ccclass, property} = cc._decorator;

/**
 * 流星
 */
@ccclass
export default class Wands extends SkillBasic {

    @property(cc.Node)
    rectNode:cc.Node = null;

    @property()
    isSuper:boolean = false;

    private _moveDir:cc.Vec2 = new cc.Vec2(0,0);
    
    private _starPos:cc.Vec2 = null;


    init(skill:RoleSkill,param) {
        super.init(skill,param);

        this.speedAdd = this.speed * skill.skillData.getAtkSpeed();
        this._starPos = this.player.node.getPosition();

        this._starPos.y += Math.random() *30;
        let target = this.m_param.target;

        if(target){
            this._moveDir = target.end.sub(this._starPos).normalize();
            this.lookAtObj();

        }else{

            let angle = 45 * this.m_idx;
            this.node.angle = -angle;
            this._moveDir = cc.v2(Math.cos(Math.PI * angle/180),Math.sin(Math.PI *angle/180))
        }
        this.node.setPosition(this._starPos);
        
    }


    gameUpdate(dt) {

        if(this.isEnd) return;
        this.freshFrameNum ++;
        let dist = this._starPos.sub(this.node.getPosition()).mag();
        if(dist >= this.atkDist) {
            this.isEnd = true;
        }else{

            this.move();
            if(this.freshFrameNum % 5 ==0){
                this.checkAtkTarget();
            }      
        }
    }

    getCheckRect(){
        return this.rectNode.getBoundingBoxToWorld();
    }


     /**是否命中 */
     checkHit(e:Enemy){
        let sub = e.node.getPosition().sub(this.node.getPosition())
        if(sub.mag() > e.node.width + 40){
            return false;
        }

        let rect1 = this.node.getBoundingBoxToWorld();
        let rect2 = e.node.getBoundingBoxToWorld();
        return rect1.intersects(rect2);
    }

    
    /**命中攻击敌人 */
    hitEnemy(enemy:Enemy){

        super.hitEnemy(enemy);
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

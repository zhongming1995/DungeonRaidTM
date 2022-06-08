

import Util from "../../core/utils/Util";
import Enemy from "../Enemy";
import RoleSkill from "../skill/RoleSkill";
import SickleSkill from "../skill/SickleSkill";
import SkillBasic from "./SkillBasic";

const {ccclass, property} = cc._decorator;

/**
 * 镰刀
 */
@ccclass
export default class Sickle extends SkillBasic {

    @property(cc.Node)
    rectNode:cc.Node = null;

    @property()
    isSuper:boolean = false;

    private _moveDir:cc.Vec2 = new cc.Vec2(0,0);

    private _starPos:cc.Vec2 = null;
    private _initAngle:number = 0;
    hasDivide:boolean = false;  //是否分裂

    init(skill:RoleSkill,param) {

        super.init(skill,param);

        this.hasDivide = false;
        this.speedAdd = this.speed * skill.skillData.getAtkSpeed();    
       

        let angle:number =0;
        if(this.m_param.isdivide){   //分裂时的位置
            let tAngle= this.m_param.angle;
            this._starPos = this.m_param.pos;
            angle =  this.m_idx==1?tAngle-30:tAngle+30; 
            this._moveDir = cc.v2(Math.cos(Math.PI * angle/180),Math.sin(Math.PI *angle/180));         
        }else{  

            let target = this.m_param.target;
            this._starPos = this.player.node.getPosition();
            if(target){

                this._moveDir = target.end.sub(this._starPos).normalize();
                this.lookAtObj();
                angle = this.node.angle;
            }else{
                let single = Math.floor(360/skill.launchNum);
                angle =  Util.randomNumber(single * (this.m_idx-1),single * this.m_idx) 
                this._moveDir = cc.v2(Math.cos(Math.PI * angle/180),Math.sin(Math.PI *angle/180))
            }      
        }  

        this._initAngle = angle;       
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
            if(this.freshFrameNum % 9 ==0){
                this.checkAtkTarget();
            }     
        }        
    }

    getCheckRect(){
        return this.rectNode.getBoundingBoxToWorld();
    }

    hitEnemy(e:Enemy){
        
        super.hitEnemy(e);
        if(!this.m_param.isdivide){  //分裂
            this.isEnd = true;
            if(!this.hasDivide){
                this.hasDivide = true;
                (this.skill as SickleSkill).divideEff(this.node.position,this._initAngle);
            }
        }             
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

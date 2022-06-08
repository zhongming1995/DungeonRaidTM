import { app } from "../../app";
import { main_pro_key, SoundName } from "../../Defines";
import Enemy from "../Enemy";
import RoleSkill from "../skill/RoleSkill";
import SkillBasic from "./SkillBasic";

const {ccclass, property} = cc._decorator;

/**
 * 鞭子
 * 作为组件类，找到释放点和目标
 */
@ccclass
export default class Bian extends SkillBasic {

    @property(cc.Node)
    rectNode:cc.Node = null;

    @property()
    isSuper:boolean = false;

    ani:cc.Animation = null;
    isCheck:boolean = false;

    init(skill:RoleSkill,param) {
        super.init(skill,param);
        this.isCheck = false;
        this.duration = 0.2;
        this.durTimer =0;

        let p = skill.skillData.getAtkRange();
        this.atkDist = this.atkDist * p;
        let f = this.m_idx%2 ==0? -1: 1;
        this.node.scaleX = this.player.dir * p *f;
        this.node.scaleY = this.player.dir > 0? 1: -1;
    
        const pos = this.player.node.getPosition();
 
        let y = Math.ceil(this.m_idx/2);
        pos.y += y * 20;
        this.node.setPosition(pos);
        
    }

    onEnable(){

        this.ani = this.node.getComponent(cc.Animation);  
        this.ani.play(); 
        app.audioMgr.playEffect(SoundName.fpx_sfx_sounds_impact15)    
    }

    /**帧事件检测攻击 */
    checkAtackEvt(){
        this.checkAtkTarget();
    }

    getCheckRect(){
        return this.rectNode.getBoundingBoxToWorld();
    }

    checkHit(e:Enemy){

        if(Math.abs(e.node.x - this.player.node.x) > (this.atkDist + 100)){
            return false;
        }
        let rect1 = this.node.children[0].getBoundingBoxToWorld();
        const rect2 = e.node.getBoundingBoxToWorld();
        return rect1.intersects(rect2);
    }

    gameUpdate(dt){

        
        if(this.isEnd) return;
        this.durTimer += dt;
        if(this.durTimer >= this.duration) {
            this.isEnd = true;
            
        }else{         
            if(!this.isCheck){
                this.isCheck = true;
               // this.checkAtkTarget();
            }        
        }
    }

}

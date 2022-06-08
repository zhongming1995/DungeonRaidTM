import { app } from "../../app";
import { SoundName } from "../../Defines";

import Player from "../role/Player";
import SkillBasic from "./SkillBasic";

const {ccclass, property} = cc._decorator;

/**
 * 大招全攻 - 随机角度喷火伤害 AY3
 */
@ccclass
export default class ThePitch extends SkillBasic {

    private _moveDir:cc.Vec2 = null;

    private _angle:number = 0;

    private _dir:number = 0;

    private _rtNd1:cc.Node = null;

    private _rtNd2:cc.Node = null;

    //外圈半径
    private _radius:number = 0;
    //内圈半径
    private _innerRadius:number = 0;

    private _collider:cc.Node = null;

    bigInit (player:Player) {
        super.bigInit(player);

        this._dir = 1;
     
        this.duration = 10;

        this.isEnd = false;

        this._rtNd1 = this.node.children[0];
        this._rtNd2 = this.node.children[1];
        this._collider = this._rtNd2.children[0];

        this._radius = 200;
        this._innerRadius = 0;
        app.audioMgr.playEffect(SoundName.fpx_fire);
        
    }

    gameUpdate (dt) {
        this.durTimer += dt;
        this.freshFrameNum ++;
        if(this.durTimer > this.duration) {
            this.isEnd = true;
            this.node.destroy();
            return;
        }

        let pos = this.player.node.getPosition();
        pos.y += 15;
        this.node.setPosition(pos);

        if(this._moveDir == this.player.moveDir) {
            let val = dt * 200 * this._dir;
            let lx = this._angle - 40;
            let rx = this._angle + 40;
            let tmp = this._rtNd1.angle;
            tmp += val;
            if (tmp < lx || tmp > rx) {
                this._dir = -this._dir;
                val = -val;
            }
            this._rtNd1.angle = this._rtNd2.angle += val;
        }else{
            this.lookAtObj();
        }
        this._moveDir = this.player.moveDir;

        if( this.freshFrameNum % 5 ==0){
            this.checkAtkTarget();
        }   
    }

    checkAtkTarget() {
      
        let rect = this._collider.getBoundingBoxToWorld();
        let finds = app.gameMgr.waveMng.quadTree.retrieve(rect);

        finds.forEach((e) => {  
            let enemy = e.collider; 
            if(!cc.isValid(enemy)){
                return;
            }         
            let rect2 = enemy.node.getBoundingBoxToWorld();
            if(rect.intersects(rect2)) {
                enemy.hurtPid = this.playerFlag;
                enemy.updateHp(-100, this.node);
            }
        });
    }

    lookAtObj(pos?:cc.Vec2){

        var angle = cc.v2(this.player.moveDir).signAngle(cc.v2(1,0));

        //将弧度转换为欧拉角
        var degree = angle / Math.PI * 180;
        this._rtNd1.angle = this._rtNd2.angle = this._angle = -degree;
    }

    isInSectorRange(pos:cc.Vec2) {
        const p1 = pos;
        const p2 = this.node.getPosition();

        const dist = cc.Vec2.distance(pos, this.node.getPosition())

        //是否在半径范围
        if(dist > this._innerRadius && dist < this._radius) {
            const rad:number = Math.atan2((p2.x - p1.x), (p2.y - p1.y)); //弧度  0.9272952180016122
            // console.log(`rad ==== ${rad}`)
            const angle:number = 180 / Math.PI * rad;
            // console.log(`angle     ${angle}`)
            const tmp = this._angle * 0.5;
            if(angle > -tmp && angle < tmp) {
                //在扇形区域
                return true;
            }
        }
        return false;
    }
}

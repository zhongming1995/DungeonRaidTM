import { app } from "../../app";
import { SoundName } from "../../Defines";
import Player from "../role/Player";
import SkillBasic from "./SkillBasic";

const {ccclass, property} = cc._decorator;

/**
 * 大招冰冻 - 所有怪物暂停，变蓝 AY2
 */
@ccclass
export default class Freeze extends SkillBasic {

    private _anim:cc.Animation = null;
    
    _waitTm:number = 1.5  ;    //释放前摇等待时间
    bigInit(player:Player) {
        super.bigInit(player);

        this.isEnd = false;
        this.duration = 10;

        this.node.setPosition(this.player.node.getPosition());

        this._anim = this.node.getComponent(cc.Animation);
        this._anim.play();

        
        app.audioMgr.playEffect(SoundName.fpx_clock)
        
    }

    gameUpdate(dt) {
        this.durTimer += dt;
        if(this.durTimer >= this._waitTm) {
            this.attack();
            if(this.durTimer >= this.duration) {
                app.dataMgr.battleData.isFreezeBuff = false;
                let enemys = app.gameMgr.waveMng.getEnemyList()
                enemys.forEach(enemy=>{
                    enemy.clearFreeze();
                })
                this.isEnd = true;
                this.node.destroy();
            }
        }
    }

    attack() {
        
        app.dataMgr.battleData.isFreezeBuff = true;
        let enemys = app.gameMgr.waveMng.getEnemyList()
        enemys.forEach(enemy=>{
            if(enemy.isDie){
                return;
            }
            enemy.hitFreeze();
        })
    }
}

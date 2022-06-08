import { app } from "../../app";
import { SoundName } from "../../Defines";

import Player from "../role/Player";
import SkillBasic from "./SkillBasic";

const {ccclass, property} = cc._decorator;

/**
 * 大招清屏 - 秒杀屏幕内所有怪物 AY1
 */
@ccclass
export default class SceneCLS extends SkillBasic {

    private _anim:cc.Animation = null;

    private _viewSize:cc.Size = null;

    bigInit(player:Player) {
        super.bigInit(player);

        this.isEnd = false;
       
        this.duration = 2;

        this.node.setPosition(this.player.node.getPosition());

        this._anim = this.node.getComponent(cc.Animation);
        this._anim.play();
        this._anim.on('finished', this.onAnimFinish.bind(this), this);

        this._viewSize = cc.view.getVisibleSize();
        app.audioMgr.playEffect(SoundName.fpx_killall)
        
    }

    gameUpdate(dt) {
        this.durTimer += dt;
        if(this.durTimer >= this.duration) {
            //伤害扩散
            let enemys = app.gameMgr.waveMng.checkEnemys;
            enemys.forEach(enemy=>{   
                       
                enemy.isUltDie = true;
                enemy.hurtPid = this.playerFlag;
                enemy.death();
               // enemy.updateHp(-enemy.hp, this.node);
            })

            this.isEnd = true;
            this.node.destroy();
        }
    }

    private onAnimFinish() {
        this._anim.off('finished', this.onAnimFinish.bind(this), this);
    }
}

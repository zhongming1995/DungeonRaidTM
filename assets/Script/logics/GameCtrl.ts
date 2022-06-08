import { app } from "../app";
import { JsonModule } from "../core/conf/ClientConfigMgr";
import ResLoader, { resLoader } from "../core/resLoad/ResLoader";
import Joystick from "../core/utils/Joystick";
import { BoundNameEnum, EventName, Item_type, PopupName, SoundName } from "../Defines";
import GameUI from "../ui/GameUI";
import { Skill } from "./BattleRoleData";
import Enemy from "./Enemy";
import FightHelper from "./FightHelper";
import CameraMng from "./mng/CameraMng";
import MapMng from "./mng/MapMng";
import SortMng from "./mng/SortMng";
import WaveMng from "./mng/WaveMng";
import Player from "./role/Player";

import PropItem from "./DropItem";
import GameLogic from "../../zsLibs/GameLogic";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameCtrl extends cc.Component {

    @property(MapMng) map: MapMng = null;

    @property(CameraMng) camera: CameraMng = null;

    @property(SortMng) sortMng: SortMng = null;

    @property(WaveMng) waveMng: WaveMng = null;

    @property(GameUI) gameUI: GameUI = null;

    @property(cc.Node)
    dropCon:cc.Node = null;

    @property(cc.Node)  /**特效节点 */
    effectCon:cc.Node = null;

    @property(Joystick)  /**摇杆 */
    leftJoyStick:Joystick = null;

    @property(Joystick)  /**摇杆 */
    rightJoyStick:Joystick = null;


    player: Player = null;  //玩家1
    player2: Player = null; //玩家2
    playerArr:Player[] =[];

    @property(cc.Label)
    zs_version:cc.Label = null;

    private _isInit:boolean = false;

    private _isPause:boolean = false;

    private _isOver:boolean = false;

    _curTime:number =0 ;  //当前游戏时间

    onLoad () {
        app.gameMgr = this;
        app.layerMgr.init();
        app.audioMgr.playMusic(SoundName.bgm_game);
        this.setCurTime(this._curTime);
        this.loadPlayer();
        this.schedule(this.scheduleTime,1);

        let gm = this.node.getChildByName("UI").getChildByName("GM");
        if(gm){
            gm.zIndex = 1000;
            gm.active = GameLogic.checkGm();
            gm.on(cc.Node.EventType.TOUCH_START,()=>{
                app.layerMgr.open(PopupName.GMDlg);
            },this)
        }
        this.zs_version.string = "v" + zs.configs.gameCfg.version;
     
    }


    loadPlayer () {
        let btData = app.dataMgr.battleData;
        let players = [btData.player1];
   
        if(btData.player2){
            players.push(btData.player2)
        }
        let len = players.length;
        let num:number =0,viewszie:cc.Size = cc.view.getVisibleSize();
        players.forEach((p,i) =>{
            let rCfg = app.confMgr.conf.role.getConfById(p.rid);

            resLoader.loadRes<cc.Prefab>(BoundNameEnum.subBattle,'role/'+ rCfg.model_id).then(prefab=>{
                num++;
                let node:cc.Node = cc.instantiate(prefab);
                if(i==0){
                    this.player = node.getComponent(Player);
                    this.player.initial(btData.player1);
                    this.playerArr.push(this.player);  

                    if(this.leftJoyStick){
                        this.leftJoyStick.handler = this.player;
                        this.leftJoyStick.setSize(viewszie.width/len);
                    }                          
                }else{

                    this.player2 = node.getComponent(Player);
                    this.player2.initial(btData.player2);
                    this.playerArr.push(this.player2);
                    if(this.rightJoyStick){
                        this.rightJoyStick.handler = this.player2;
                        this.rightJoyStick.setSize(viewszie.width/len);
                    }               
                }

                this.sortMng.node.addChild(node);
            
                if(num == len){
                    this.map.initial(this.player.node);
                    this.camera.initial(this.player.node);
                    this.waveMng.initial(this.player);
                    this.gameUI.initial(players);

                    this._isInit = true;
                }            
            })

        })

    }

    getPlayer(pid:number){
        if(this.player.btRoleData.pid == pid) return this.player;
        if(this.player2.btRoleData.pid == pid) return this.player2;
        return this.player;
    }

    onEnable() {

        app.eventMgr.on(EventName.game_pause, this.onGamePause, this);
        app.eventMgr.on(EventName.game_over, this.onGameOver, this);
        app.eventMgr.on(EventName.role_revive, this.onRoleRevive, this);
        app.eventMgr.on(EventName.enemy_death, this.onEnemyDeath, this);
        app.eventMgr.on(EventName.release_ult, this.onReleaseUlt, this);
        app.eventMgr.on(EventName.add_ult_skill, this.onAddUlt, this);
        app.eventMgr.on(EventName.update_skill, this.onUpdateSkill, this);
        app.eventMgr.on(EventName.update_buff, this.onUpdateBuff, this);
        app.eventMgr.on(EventName.remove_skill, this.removeSkill, this);

        app.eventMgr.on(EventName.trySuper_fresh, this.onUpdateTrySuper, this);
        
        
        app.eventMgr.on(EventName.update_state, this.updateState, this);
    }

    onDisable() {

        app.eventMgr.off(EventName.game_pause, this.onGamePause, this);
        app.eventMgr.off(EventName.game_over, this.onGameOver, this);
        app.eventMgr.off(EventName.role_revive, this.onRoleRevive, this);
        app.eventMgr.off(EventName.enemy_death, this.onEnemyDeath, this);
        app.eventMgr.off(EventName.release_ult, this.onReleaseUlt, this);
        app.eventMgr.off(EventName.add_ult_skill, this.onAddUlt, this);
        app.eventMgr.off(EventName.update_skill, this.onUpdateSkill, this);
        app.eventMgr.off(EventName.update_buff, this.onUpdateBuff, this);
        app.eventMgr.off(EventName.remove_skill, this.removeSkill, this);

        app.eventMgr.off(EventName.trySuper_fresh, this.onUpdateTrySuper, this);

        app.eventMgr.off(EventName.update_state, this.updateState, this);
        
    }
 
    update (dt) {
        //渲染、特效、动画 60fps，游戏、交互、物理 30fps，AI 10fps
        if(!this._isInit || this._isPause || this._isOver) return;
      
        this.camera.gameUpdate(dt);
        this.map.gameUpdate(dt);
        this.waveMng.gameUpdate(dt);
        this.sortMng.gameUpdate(dt);
        
       // this.player.gameUpdate(dt);
        this.playerArr.forEach(p =>{
            p.gameUpdate(dt);
        })
      
        this.gameUI.gameUpdate(dt);

        FightHelper.ins.update(dt);

        this.checkBoxArrows();
    }

    checkBoxArrows(){
        this.dropCon.children.forEach(node=>{
            const item = node.getComponent(PropItem);
            if(item && item.itemData && item.itemData.item_type == Item_type.goodBox){
                item.updateArrowsPos(this.camera.node);
            }
        })
    }

    updateState(item:JsonModule.IItemJson){
        // if(!this._isInit){ return }
        // this.gameUI.updateCoin();//刷新 金币 UI
        // this.gameUI.updateExpBar();//刷新经验进度条
        // this.player.updateHp();
        // if(item && item.fucntion_num){
        //     EffectMng.Instance.playHp(this.player.node,item.fucntion_num);
        // }
    }

    private onEnemyDeath(enemy:Enemy,pid:number) {
       
        let btData = app.dataMgr.battleData.getRoleData(pid);
        if(enemy.exp > 0) {
            btData.addExp(enemy.exp);
        }
        btData.addKillNum();
        this.waveMng.recycleEnemy(enemy);
    }

    /** 暂停*/
    private onGamePause(isPause) {
        this._isPause = isPause;
        //刷新一下金币吧
       // this.gameUI.updateCoin();
    }

    /** 复活*/
    private onRoleRevive(pid) {
        this._isOver = false;
        pid == 2 ? this.player2.revive() : this.player.revive();
    }

    private onGameOver(evtData:{pid:number}) {
        this._isOver = true;
        let btData = app.dataMgr.battleData.getRoleData(evtData.pid);
        btData && btData.checkRelive();
    }

    /**释放大招 */
    private onReleaseUlt(evtData:{pid:number,sId:number}){
        let pid = evtData.pid,sId = evtData.sId;

        let player:Player = this.getPlayer(pid);
        player && player.releaseUlt(sId);
        let ui = this.gameUI.getPlayerUI(pid);
        ui && ui.freshUltSkill(sId);
      
    }

    /**获得大招 */
    private onAddUlt(evtData:{pid:number,sId:number}){
        let pid = evtData.pid,sId = evtData.sId;
        let ui = this.gameUI.getPlayerUI(pid);
        ui && ui.freshUltSkill(sId);
    }

    /**技能更新 */
    private onUpdateSkill(evtData:{pid:number,skill:Skill,tp:number}) {

        let pid = evtData.pid;
        let player:Player = this.getPlayer(pid);
        player && player.freshSkill(evtData.skill,evtData.tp);

        let ui = this.gameUI.getPlayerUI(pid);
        ui && ui.freshSkill();

    }

    /**技能移除更新 */
    removeSkill(evtData:{pid:number,id:number}){
        let pid = evtData.pid;
        let player:Player = this.getPlayer(pid);
        player && player.removeSkill(evtData.id);

        let ui = this.gameUI.getPlayerUI(pid);
        ui && ui.freshSkill();
    }


    /**buff技能更新 */
    private onUpdateBuff(evtData:{pid:number,skill:Skill,tp:number}) {

        let pid = evtData.pid;
        let player:Player = this.getPlayer(pid);
        player && player.freshBuffSkill(evtData.skill,evtData.tp);

        let ui = this.gameUI.getPlayerUI(pid);
        ui && ui.freshBuffSkill();

    }
    /**超武试用 移除 */
    private onUpdateTrySuper(evtData:{pid:number,skill:Skill,tp:number}){
        let pid = evtData.pid;
        let player:Player = this.getPlayer(pid);
        player && player.setTrySuper(evtData.skill,evtData.tp);

        if(evtData.tp==1){
            let ui = this.gameUI.getPlayerUI(pid);
            ui && ui.useSuperWeapon(pid);
        }
    }

    
    scheduleTime(){  
        if(!this._isInit || this._isPause || this._isOver) return; 

        this._curTime ++;
        this.setCurTime(this._curTime);
        app.dataMgr.battleData.schudleTime();

        this.gameUI.playerUIs.forEach(ui =>{
            ui.schudleTryWeapon();
        })

       // this.gameUI.schudleTryWeapon();
    }

    /**设置当前时间 */
    setCurTime(tm:number){
        this._curTime = tm;
        if(this.player)app.dataMgr.battleData.player1.liveTimer =tm;
        if(this.player2)app.dataMgr.battleData.player2.liveTimer =tm;    
        this.gameUI.setTimeStr(tm);
    }

    onDestroy(){

        app.gameMgr = null;
        app.dataMgr.battleData.backAddGold();
    }
}
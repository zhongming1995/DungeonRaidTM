
import GameLogic from "../zsLibs/GameLogic";
import AudioManager from "./core/audio/AudioManager";
import { ClientConfigMgr } from "./core/conf/ClientConfigMgr";
import GameDataMgr from "./core/data/GameDataMgr";
import { EventManager } from "./core/event/EventManager";
import LayerManager from "./core/gui/LayerManager";
import SceneManager from "./core/gui/SceneManager";
import GameCtrl from "./logics/GameCtrl";

export class app {

    public static eventMgr: EventManager = null;
    public static audioMgr: AudioManager = null;
    public static layerMgr: LayerManager = null;
    public static confMgr: ClientConfigMgr = null;
    public static sceneMgr: SceneManager = null;
    public static dataMgr: GameDataMgr = null;

    public static gameMgr: GameCtrl = null;

    static init() {
        this.eventMgr = new EventManager();
        this.audioMgr = new AudioManager();
        this.confMgr = new ClientConfigMgr();
        this.layerMgr = new LayerManager();
        this.sceneMgr = new SceneManager();
        this.dataMgr = new GameDataMgr();

        this.audioMgr.init();
    }

    static justTrack(evt: string, label?: string, params?) {
        //td 上传
        // zs.td.justTrack(evt, label ? label : evt, params);
        evt = evt.trim();
        zs.Native.TrackEvent(evt);
    }


    static showInsertAd(a, b) {
        GameLogic.showGameInsertAd(a, b);
    }

}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */

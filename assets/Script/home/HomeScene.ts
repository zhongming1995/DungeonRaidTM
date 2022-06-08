// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UISuperLayout from "../../lib/UISuperLayout";
import GameLogic from "../../zsLibs/GameLogic";
import { app } from "../app";
import ResMgr from "../core/resLoad/ResMgr";
import { PopupName, SoundName } from "../Defines";
import HomeMainUI from "./HomeMainUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HomeScene extends cc.Component {

    @property(HomeMainUI)
    mainUi:HomeMainUI = null;

    @property(cc.Label)
    zs_version:cc.Label = null;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {   
        app.layerMgr.init();
        let gm = this.node.getChildByName("GM");
        if(gm){
            gm.active = GameLogic.checkGm();
        }

        this.zs_version.string = "v" + zs.configs.gameCfg.version;
    }

    start () {
        
        ResMgr.ins.preLoad();
    }
    // update (dt) {}

    openGm(){
        app.layerMgr.open(PopupName.GMDlg);
    }

}

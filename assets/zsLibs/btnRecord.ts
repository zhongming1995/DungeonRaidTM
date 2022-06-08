import { app } from "../Script/app";
import { EventName, PopupName } from "../Script/Defines";
import GameLogic from "./GameLogic";
import ProductKey from "./template/ProductKey";

const { ccclass, property } = cc._decorator;

@ccclass
export class btnRecord extends cc.Component {

    static inst:btnRecord;

    protected onLoad(): void {
        if(!window['tt']){
            this.node.active = false;
            return
        }

        this.node.active = !!ProductKey.zs_version;
        
        btnRecord.inst = this;
        this.node.on(cc.Node.EventType.TOUCH_START, this.click, this);
    }

    click() {
        // if(!window["tt"]){
        //     app.layerMgr.open(PopupName.GMDlg);
        //     app.eventMgr.emit(EventName.game_pause,true);
        //     return;
        // }
        // zs.core.workflow.childNext("SETTLE")
        // return;
        GameLogic.onRecordClick();
    }

    protected onDestroy(): void {
        btnRecord.inst = null;
    }
}
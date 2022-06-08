// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../../app";
import { PopupName, RoleState } from "../../Defines";
import GameCtrl from "../GameCtrl";
import RoleAnim from "./RoleAnim";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoleBasic extends cc.Component {

    protected _roleAnim:RoleAnim = new RoleAnim();
    get roleAnim(){
        return this._roleAnim;
    }

    protected _roleState:RoleState = RoleState.Idle;
    get roleState(){
        return this._roleState;
    }
    set roleState(val) {
        this._roleState = val;
        this._roleAnim.playAnim(this._roleState);
    }

    initial (gc:GameCtrl) {
        this.initAnim();
        this.initMove();
    }

    private initMove() {
        this._roleState = RoleState.Idle;
    }

    private initAnim() {
        let sk:cc.Node = this.node.getChildByName('spine');
        this._roleAnim.initial(sk);
    }

    attack() {

    }

    death() {
        app.layerMgr.open(PopupName.ResultDlg);
    }

    gameUpdate (dt) {
        
    }
}

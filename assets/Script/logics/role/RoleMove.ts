// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import { app } from "../../app";
import { SpeedType, instance } from "../../core/utils/Joystick";
import { GM, main_pro_key, player_deault_attr, RoleState } from "../../Defines";
import BattleRoleData from "../BattleRoleData";
import RoleAnim from "./RoleAnim";


const {ccclass, property} = cc._decorator;

@ccclass
export default class RoleMove extends cc.Component {
    @property({
        displayName: "Move Dir",
        tooltip: "移动方向",
    })
    moveDir = cc.v2(0, 1);

    @property({
        displayName: "Speed Type",
        tooltip: "速度级别",
    })
    _speedType: SpeedType = SpeedType.STOP;

    // from self
    @property({
        type: cc.Integer,
        displayName: "Move Speed",
        tooltip: "移动速度",
    })
    _moveSpeed = 0;

    // @property({
    //     type: cc.Integer,
    //     displayName: "Stop Speed",
    //     tooltip: "停止时速度",
    // })
    // stopSpeed = 0;

    // @property({
    //     type: cc.Integer,
    //     tooltip: "正常速度",
    // })
    // normalSpeed = 100;

    private _roleAnim:RoleAnim = new RoleAnim();
    get roleAnim(){
        return this._roleAnim;
    }

    private _roleState:RoleState = RoleState.Idle;
    get roleState(){
        return this._roleState;
    }
    set roleState(val) {
        this._roleState = val;
        this._roleAnim.playAnim(this._roleState);
    }

    private _dirNode:cc.Node = null;
    get dirNode(){
        return this._dirNode;
    }

    private _dir:number = 0;
    get dir(){
        return this._dir;
    }

    btRoleData:BattleRoleData = null;
    initScaleX:number =1;
    initial(btData:BattleRoleData) {
        this._dir = 1;
        this._roleState = RoleState.Idle;
        this.btRoleData = btData;

        this._dirNode = this.node.getChildByName('spine');
        this.initScaleX = this._dirNode.scaleX;
        this._roleAnim.initial(this._dirNode);
    }


    onEnable() {
        // instance.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        // instance.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        // instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.inputKeyBoardDown,this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.inputKeyBoardUp,this);
        // this.moveDir.set(cc.v2());
    }
    inputKeyBoardDown(key){
        this.disposeKeyMsg(key,true);
    }
    inputKeyBoardUp(key){
        this.disposeKeyMsg(key,false);
    }
    private disposeKeyMsg(key,isDown){
        switch (key.keyCode) {
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                    this.moveDir.y = isDown ? 1 : 0
                break;
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.moveDir.x =  isDown ? -1 : 0
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.moveDir.y = isDown? -1 : 0
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.moveDir.x = isDown ? 1 : 0
                break;
        }
        //朝向
        if(this.moveDir.x !== 0) {
            this._dir = this.moveDir.x > 0 ? 1:-1;
            this._dirNode.scaleX = this._dir*this.initScaleX;
        }
        //按下移动
        if(isDown){
            this._speedType = SpeedType.NORMAL;
            this.roleState = RoleState.Move;
        }
        if(this.moveDir.x == 0 && this.moveDir.y == 0){
            this._speedType = SpeedType.STOP;
            this.roleState = RoleState.Idle;
        }
    }

    onDisable() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.inputKeyBoardDown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.inputKeyBoardUp,this);
        // instance.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        // instance.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        // instance.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart() {}

    onTouchMove(event: cc.Event.EventTouch, data) {
        if(this._roleState == RoleState.Die) {
            this._speedType = SpeedType.STOP;
            return;
        }

        this._speedType = data.speedType;
        this.moveDir = data.moveDistance;
        if(this.moveDir.x !== 0) {
            this._dir = this.moveDir.x > 0 ? 1:-1;
            this._dirNode.scaleX = this._dir * this.initScaleX;
        }
        this.roleState = RoleState.Move;
    }

    onTouchEnd(event: cc.Event.EventTouch, data) {
        this._speedType = data.speedType;
        if(this._roleState == RoleState.Die) return;
        this.roleState = RoleState.Idle;
    }

    /**
     * 移动
     */
    move() {
        // this.node.angle = cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x)) - 90;
        const oldPos = cc.v2();
        this.node.getPosition(oldPos);
        const newPos = oldPos.add(this.moveDir.mul(this._moveSpeed / 120 * GM.playerMoveScale));

        if(!app.gameMgr.camera.isToOutView(this.node,newPos)){
            this.node.setPosition(newPos);
        }
       
    }

    gameUpdate(dt) {
        switch (this._speedType) {
            case SpeedType.STOP:
                this._moveSpeed = 0;
                break;
            case SpeedType.NORMAL:
                this._moveSpeed = this.btRoleData.getMoveSpeed();
                break;
            default:
                break;
        }
        if (this._speedType !== SpeedType.STOP) {
            this.move();
        }
    }
    
    protected onDestroy(): void {
    
    }
}

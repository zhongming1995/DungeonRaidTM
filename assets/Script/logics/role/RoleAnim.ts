import { RoleState } from "../../Defines";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoleAnim extends cc.Component {

    private _state:RoleState = RoleState.Idle;

    private _spine:sp.Skeleton;
    public get spine(){
        return this._spine;
    }

    initial (sk:cc.Node) {
        this._spine = sk.getComponent(sp.Skeleton);
    }

    playAnim(state:RoleState) {
        if(this._state == state) {
            return;
        }
        this._state = state;
        let isLoop = this._state == RoleState.Move;
        this._spine.setAnimation(0, this._state, isLoop);
    }
}
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../../app";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraMng extends cc.Component {
    @property
    moveSmooth: number = 0.1;

    zoomRatio:number = 1.8;
    viewSize:cc.Size;
    private _target:cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    initial (target:cc.Node) {
        this._target = target;
        let view = cc.view.getVisibleSize();
        this.viewSize = cc.size(view.width/this.zoomRatio,view.height/this.zoomRatio);
    }

    gameUpdate (dt) {

        let pos = cc.v3(),target = null;     
        if(cc.isValid(this._target) && this._target.active){
            pos = pos.add(this._target.position)
            target = this._target;
        }
        let player2 =app.gameMgr.player2; 
        if(cc.isValid(player2) && player2.node.active){
            pos = pos.add(player2.node.position);
            if(target){
                let h = target.y >= player2.node.y?target.height:player2.node.height;
                pos.y += h;
                pos = pos.mul(0.5);
            }           
        }

        this.node.position = this.node.position.lerp(pos, this.moveSmooth);
    }

    getViewRect(){
        return this.node.getBoundingBoxToWorld();
    }

    /**视野区域内 */
    isInView(cNode:cc.Node,checkPos?:cc.Vec2){
        checkPos = checkPos || cNode.getPosition();

        let view = this.viewSize;

        let c_x_max = this.node.x + view.width/2,c_x_min = this.node.x - view.width/2;
        let node_w = cNode.width;

        if(checkPos.x - node_w *cNode.anchorX > c_x_max){
            return false;
        }
        if(checkPos.x + node_w *(1-cNode.anchorX) < c_x_min){
            return false;
        }
  
        let c_y_max:number = this.node.y +  view.height/2,c_y_min = this.node.y -  view.height/2;
        let node_h = cNode.height;

        if(checkPos.y - node_h*cNode.anchorY > c_y_max){
            return false;
        }
        if(checkPos.y + node_h *(1-cNode.anchorY) < c_y_min){
            return false;
        }

        return true;
    }

    // 离开视野区域内
    isToOutView(cNode:cc.Node,checkPos?:cc.Vec2){
        checkPos = checkPos || cNode.getPosition();

        let view = this.viewSize;

        let c_x_max = this.node.x + view.width/2,c_x_min = this.node.x - view.width/2;
        let node_w = cNode.width;

        if(checkPos.x + node_w *(1-cNode.anchorX)> c_x_max){
            return true;
        }
        if(checkPos.x - node_w *cNode.anchorX < c_x_min){
            return true;
        }
  
        let c_y_max:number = this.node.y +  view.height/2,c_y_min = this.node.y -  view.height/2;
        let node_h = cNode.height;

        if(checkPos.y + node_h*(1-cNode.anchorY) > c_y_max){
            return true;
        }
        if(checkPos.y - node_h *cNode.anchorY < c_y_min){
            return true;
        }

        return false;
    }

}

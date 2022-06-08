const {ccclass, property} = cc._decorator;

const GRIDS = [
            [-1,1],[0,1],[1,1],
            [-1,0],[0,0,],[1,0],
            [-1,-1],[0,-1],[1,-1]];

@ccclass
export default class MapMng extends cc.Component {
    private _target:cc.Node = null;

    private _cNode:cc.Node = null;

    private _list: cc.Node[] = null;

    private _frameCount:number = 0;

    initial (target:cc.Node) {
        this._target = target;

        this._list = [];
        this._list = this.node.children;
        for (let i = 0; i < GRIDS.length - 1; i++) {
            const node = cc.instantiate(this._list[0]);
            this.node.addChild(node);
        }
    }

    gameUpdate (dt) {
        // 优化，间隔帧检测
        if (++this._frameCount % 10 === 0) {
            let index = -1;
            const leng = this._list.length;
            if(!this._cNode || (this._cNode && !this.isInView(this._cNode, this._target, true))) {
                //角色当前所在的区块
                for (let i = 0; i < leng; i++) {
                    const node = this._list[i];
                    if(this.isInView(node, this._target, true)) {
                        index = 4;
                        this._cNode = node;
                        node.setSiblingIndex(index);
                        break;
                    }
                }
            }
    
            if(index > -1) {
                console.log('=======update map pos========')
                for (let i = 0; i < leng; i++) {
                    if(i !== index) {
                        this.updatePosition(i);
                    }
                }
            }
        }
    }

    private isInView(node1:cc.Node, node2:cc.Node, isPoint:boolean = false) {
        const rect1 = node1.getBoundingBoxToWorld();
        const rect2 = node2.getBoundingBoxToWorld();
        if(isPoint) {
            return rect1.contains(cc.v2(rect2.x, rect2.y));
        }else{
            return rect1.intersects(rect2);
        }
    }

    private updatePosition(idx:number) {
        let node = this._list[idx];
        let arr = GRIDS[idx];
        let pos:cc.Vec2 = new cc.Vec2(0, 0);
        try {
            if(this._cNode) {
                pos.x = this._cNode.getPosition().x;
                pos.y = this._cNode.getPosition().y;
            }
            if(arr[0] !== 0) {
                pos.x += arr[0] * node.width;
            }
            if(arr[1] !== 0) {
                pos.y += arr[1] * node.height;
            }
            node.setPosition(pos);
        } catch (error) {
            console.log(error);
        }
    }
}
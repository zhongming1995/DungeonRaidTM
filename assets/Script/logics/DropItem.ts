import { app } from "../app";
import { JsonModule } from "../core/conf/ClientConfigMgr";
import { resLoader } from "../core/resLoad/ResLoader";
import ResMgr from "../core/resLoad/ResMgr";
import NodePoolMgr, { PoolName } from "../core/utils/NodePoolMgr";
import { BoundNameEnum, Item_type } from "../Defines";

const {ccclass, property} = cc._decorator;

/**
 * 掉落道具
 */
@ccclass
export default class DropItem extends cc.Component {

    @property(cc.Sprite)
    icon:cc.Sprite =null;

    liveTm:number = 0;
    private _flying:boolean = false;
    get flying() {
        return this._flying;
    }

    private _itemData:JsonModule.IItemJson;
    get itemData() {
        return this._itemData;
    }

    initial(id:number) {
        this._itemData = app.confMgr.conf.item.getConfById(id);
        this._flying = false;
        
        this.icon.spriteFrame = ResMgr.ins.getItemSp(this._itemData.item_icon);
        if(this.isSmall()){
            this.node.scale = 0.6;
        }    
        if(this._itemData && this._itemData.item_type == Item_type.goodBox && !this.arrowsItem){
            this.createArrows();
        }else{
            if(this._itemData && this._itemData.item_type == Item_type.goodBox)
                this.arrowsItem && (this.arrowsItem.active = true);
        }
    }

    private arrowsItem:cc.Node = null;
    createArrows(){
        if(!this._flying){
            let copyItem = NodePoolMgr.ins.getItem(PoolName.ArrowsItem);
            if(!copyItem){
                resLoader.loadRes<cc.Prefab>(BoundNameEnum.subBattle,PoolName.ArrowsItem).then((pre)=>{
                    this.arrowsItem = cc.instantiate(pre);
                    this.node.addChild(this.arrowsItem);
                })
            }else{
                this.arrowsItem = copyItem;
                this.arrowsItem && this.node.addChild(this.arrowsItem);
            }        
        }
    }

    updateArrowsPos(node:cc.Node){
        if(this.arrowsItem && !this.flying){
            let centerPos = node.convertToWorldSpaceAR(cc.v2());
            let nodePos = this.node.convertToWorldSpaceAR(cc.v2());
            let bool = app.gameMgr.camera.isInView(this.node);
            if(bool){
                nodePos = cc.v2();
                nodePos.y += 28;
                this.arrowsItem.angle = -90;
                this.arrowsItem.setPosition(nodePos);
                return;
            }
            let dir = cc.v2();
            cc.Vec2.subtract(dir, nodePos, centerPos);
            dir.normalizeSelf();

            let angle = cc.v2(dir.x,dir.y).signAngle(cc.v2(1,0));
            angle = angle * 180 / Math.PI;
            //角度
            this.arrowsItem.angle = -angle;

            let size = cc.winSize
            let h = size.height * 0.25;
            let w = size.width * 0.25;
            let dis = cc.Vec2.distance(nodePos,centerPos);
            let poin = cc.v2();

            let curr = this.node.convertToNodeSpaceAR(centerPos);
            cc.Vec2.add(poin,cc.v2(dir.x * dis , dir.y * dis) , curr);

            poin.x = cc.misc.clampf(poin.x,curr.x - w,curr.x + w);
            poin.y = cc.misc.clampf(poin.y,curr.y - h,curr.y + h);
            
            this.arrowsItem.setPosition(poin);
        }else{
            this.arrowsItem && (this.arrowsItem.active = false);
        }
    }

    

    fly(pos:cc.Vec2,cb?:Function) {
        this._flying = true;
        this.arrowsItem && (this.arrowsItem.active = false);
        cc.tween(this.node).to(0.2, {position: new cc.Vec3(pos.x, pos.y, 0)}).call(()=>{
            this.recycle();
            cb && cb(this._itemData);
        }).start();
    }

    /**需要缩小 */
    isSmall(){
        let item = this._itemData; 
        return item.item_type == Item_type.gold || 
            item.item_type ==Item_type.exp || 
            item.item_type==Item_type.hp               
    }
    /**是宝箱 */
    isGoodBox(){
        return this._itemData && this._itemData.item_type == Item_type.goodBox;
    }

    isExp(){
        return  this._itemData && this._itemData.item_type ==Item_type.exp;
    }

    recycle(){
        NodePoolMgr.ins.putItem(PoolName.DropItem,this.node);
    }


    unuse(){

        this.liveTm =0;
        this._flying = false;
        this.node.scale =1;
        this.icon.spriteFrame = null;
    }

    update(dt:number){

        this.liveTm +=dt;
        if(this.liveTm > 300){
            this.liveTm =0;
            if(this.isExp() && !this._flying){
                this.recycle();
            }       
        }
    }
}
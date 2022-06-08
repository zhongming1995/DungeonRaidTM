// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { resLoader } from "../resLoad/ResLoader";
import Pool from "../utils/Pool";
import AsyncQueue from "../utils/AsyncQueue";
import BasePopup from "./BasePopup";
import workflow from "../../../zsLibs/template/workflow";
import { BoundNameEnum, EventName, PopupName } from "../../Defines";
import NodePoolMgr, { PoolName } from "../utils/NodePoolMgr";

//节点层级
export enum LayerType {

    popup = 5,//弹窗
    alert =8, //系统弹窗层
    tips =10,  //tips 提示
    guide = 15, //引导层
}

enum UISTATE {
    none =0,  
    load =1, // 进入加载
    show =2, 
    hide =3,  
}

let asyncQueue = new AsyncQueue();
let pool = new Pool(6);


/**界面弹窗管理 */
export default class LayerManager {

    private _uiMap:{[k:string]:UiEntity} = Object.create(null); // 打开的弹窗
    private _layerMap:{[k:number]:cc.Node} = Object.create(null); //层级节点 
    
    init(){
        this._uiMap =  Object.create(null);
        this._layerMap =  Object.create(null);
        let Canvas = cc.find('Canvas'),viewSize = cc.view.getVisibleSize();
        let layers = [LayerType.popup,LayerType.alert,LayerType.tips,LayerType.guide];

        let node:cc.Node;
        layers.forEach((l) =>{
            node = new cc.Node(LayerType[l]);
            node.setContentSize(viewSize);
            Canvas.addChild(node,l);
            this._layerMap[l] = node;
        })
    }

    getLayer(l:LayerType){
        return this._layerMap[l];
    }

    removeLayer(l:LayerType){
        let layer = this._layerMap[l];
        if(!layer)return;
        layer.destroy();
        delete this._layerMap[l];
    }

    /**层级添加节点 */
    addLayerNode(l:LayerType,node:cc.Node){
        let layer = this._layerMap[l];
        if(!layer)return;
        layer.addChild(node);
    }
    /**
     * 打开弹窗
     * @param name  弹窗名
     * @param layer 层级
     * @param args  参数
     * @returns 
     */
    open(name:string,layer?:LayerType,...args){
        console.warn("open name ::  ",name);
        if(PopupName.SkillUpgradeDlg == name || PopupName.OpenBoxDlg == name || PopupName.DoubleOpenBoxDlg == name 
            || PopupName.DoubleSkillUpgradeDlg == name || PopupName.SkinUnlockDlg == name || PopupName.StartWeaponDlg == name || 
                PopupName.StartEnhanceDlg == name){
            if(this.len >= 1){
                this.gamePopQueue.push({name:name,layer:layer,args:args});
                return;
            }
        }else{
            if(this.isOpen(name)){ 
                console.log('is open------',name);
                return
            }
        }

        layer = layer || LayerType.popup;
        let entity = UiEntity.get(name,layer,args);

        asyncQueue.push(() =>{
            this._uiMap[name] = entity;
            this.addUiEntity(entity);
        })      
        !asyncQueue.invoking && asyncQueue.run();
        // this.runAsyncQueue();
    }

    private gamePopQueue = [];
    
    runAsyncQueue(){
        if(this.gamePopQueue.length > 0){
            let data = this.gamePopQueue.shift();
            this.open(data.name,data.layer,data.args);
        }
    }

    // runAsyncQueue(){
    //     if(this.len <= 0){
    //         asyncQueue.run();
    //     }
    // }
    clearAsyncQueue(){
        // asyncQueue.clear();
        this.gamePopQueue.splice(0,this.gamePopQueue.length);
    }

    /**添加弹窗 */
    private addUiEntity(entity:UiEntity){ 

        entity.setState(UISTATE.load);
        resLoader.loadRes<cc.Prefab>('dlg',entity.name).then((pre) =>{
            let resNode:cc.Node = cc.instantiate(pre);
            entity.prefab = pre;
            entity.preNode = resNode;
            let comp:BasePopup = resNode.getComponent(BasePopup);
            comp?.initData(entity.params);
            entity.setState(UISTATE.show);
            this.addLayerNode(entity.layer,resNode);

            asyncQueue.run();
            // this.runAsyncQueue();
        },() =>{
            this.close(entity.name);
            asyncQueue.run();
            // this.runAsyncQueue();
        })
    }

    get len(){
        return Object.keys(this._uiMap).length;
    }

    /**已经添加弹窗 */
    isOpen(name:string){
        let e:UiEntity = this._uiMap[name];
        return !!e;
    }

    close(name:string){

        let entity = this._uiMap[name];
        if(!entity){
            return;
        }
        entity.remove();
        delete this._uiMap[name];
        // this.runAsyncQueue();
        this.runAsyncQueue();
    }

    closeAll(){
        for(let k in this._uiMap){
            this.close(k);
        }
    }


    async showTip(str:string){
        let tipNode = NodePoolMgr.ins.getItem(PoolName.FloatTips);

        if(!tipNode){
            let pre = await resLoader.loadRes<cc.Prefab>(BoundNameEnum.subBattle,'FloatTips');
            tipNode = cc.instantiate(pre);
        }

        let lbl: cc.Label = tipNode.getChildByName("lblTips").getComponent(cc.Label);
        lbl.string = str;
        tipNode.y = 100;
        this.addLayerNode(LayerType.tips,tipNode);

        cc.tween(tipNode)
        .set({scaleY:0})
        .to(0.1,{scaleY:1})
        .delay(0.5)
        .by(1,{position:cc.v3(0,200,0)})
        .call(() =>{
            NodePoolMgr.ins.putItem(PoolName.FloatTips,tipNode);
        })
        .start();

    }

    // /**显示 */
    // show(name:string){
    //     let entity = this._uiMap[name];
    //     entity && entity.show();
    // }
    // /**隐藏 */
    // hide(name:string){
    //     let entity = this._uiMap[name];
    //     entity && entity.hide();
    // }

}
/**弹窗类 */
class UiEntity {

    name:string;  
    state:UISTATE;
    prefab:cc.Prefab;
    preNode:cc.Node;
    params:any[];
    layer:LayerType;
    constructor(){  
        this.reset();
    }
    reset(){      
        this.name = '';
        this.state = UISTATE.none;
        this.prefab = null;
        this.preNode = null;
        this.params = [];
        this.layer = LayerType.popup;
    }

    setState(s:UISTATE){
        this.state = s;
    }
    /**移除 */
    remove(){ 
        if(this.preNode) {
            let uiCmp:BasePopup = this.preNode.getComponent(BasePopup);
            uiCmp?.onClose();
            this.preNode.destroy();
        }       
        UiEntity.put(this);
    }
    /**隐藏 */
    hide(){
        if(this.state == UISTATE.show){
            this.preNode.active = false;
            this.setState(UISTATE.hide)
        }    
    }
    show(){
        if(this.state == UISTATE.hide){
            this.preNode.active = true;
            this.setState(UISTATE.show)
        }
    }

    static get(name:string,layer:LayerType,params:any){

        let e = pool.getItem() || new UiEntity();
        e.name = name;
        e.params =params;
        e.layer =layer;
        return e;
    }

    static put(e:UiEntity){
        e.reset();
        pool.putItem(e);
    }

}

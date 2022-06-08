// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
export interface IOwnItemData {   
    itemId:number //物品唯一id
    ID:number    //配置的物品id
    type:number  //物品类型
    num:number   //数量
}

type ItemObj  = {[k:number]:IOwnItemData}

import ProxyBase from "./ProxyBase";
export default class ItemProxy extends ProxyBase<ItemObj> {

    _gid:number = 1000;     
    initData(){
        
    }

    onInit(){
        let id:number;
        for(let k in this.data){
            id = Number(k);
            if(id >= this._gid){
                this._gid = id;
            }
        }    
    }





   

    // update (dt) {}
}

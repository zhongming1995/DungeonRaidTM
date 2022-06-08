// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import { IProxyModule } from "../../Defines";
import ProxyBase from "./ProxyBase";
export default class PictureProxy extends ProxyBase<IProxyModule.IPictureData> {

    initData(){
        
    }
   
    /**图鉴有了 */
    meetItem(id:number){

        if(this.hasMeet(id)){
            return;
        }
        this.data[id] = 1;
        this.autoKeep();
    }

    hasMeet(id:number){
        return true// this.data[id] > 0;
    }
   
    // update (dt) {}
}

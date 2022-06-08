// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BoundNameEnum } from "../../Defines";


export default class ResMgr {

    plistMap:{[k:string]:cc.SpriteAtlas} = Object.create(null);

    static _ins:ResMgr = null;
    static get ins(){
        if(!this._ins) this._ins = new ResMgr();
        return this._ins;
    }

    keepPlist(res:cc.SpriteAtlas){
        let name = res.name.slice(0,-6);
        this.plistMap[name] = res;
    }

    getItemSp(img:number | string){
        return  this.plistMap.item.getSpriteFrame(img + '');
    }

    getRoleSp(id:number){
        return  this.plistMap.common.getSpriteFrame('role' + id);
    }


    preLoad(){
        
        new Promise((resove,reject) =>{         
                let bd = cc.assetManager.getBundle(BoundNameEnum.dlg);
                bd.loadDir('',resove);        
            }) 
    }

}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { SceneNameEnum } from "../../Defines";
export default class SceneManager {

    isLoad:boolean = false; //正在加载
    m_tp:SceneNameEnum = SceneNameEnum.Load;
    enterScene(name:SceneNameEnum,cb?:Function){
        if(this.isLoad)return;
        this.isLoad = true;
        cc.director.loadScene(name,(err,scene:cc.Scene) =>{
            this.isLoad = false;
            if(err){
                cb && cb(null);
                console.log('err-------',err);
                return;
            }
            this.m_tp = name;     
            cb && cb(scene);
        })
    }




    // update (dt) {}
}

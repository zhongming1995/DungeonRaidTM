// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameLogic from "../../zsLibs/GameLogic";
import { app } from "../app";
import ResMgr from "../core/resLoad/ResMgr";
import NodePoolMgr from "../core/utils/NodePoolMgr";
import Util from "../core/utils/Util";
import { BoundNameEnum, SceneNameEnum } from "../Defines";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

    @property(cc.Sprite)
    barSp:cc.Sprite = null;

    @property(cc.Label)
    loadTxt:cc.Label = null;

    barWith:number = 400;
    _loadPro:number =0;
    _curPro:number = 0;
    // LIFE-CYCLE CALLBACKS:

    lab_tips:cc.Label = null;
     
    onLoad () {
        this.setLoadPro(0); 
        this.setBarPro(0); 
    }

    async start(){
        this.lab_tips = this.node.getChildByName("tips")?.getComponent(cc.Label);   
        await GameLogic.init();
        this.loadJson().then()
        .then(()=>{
            console.log('GameLogic.init------3')
            app.dataMgr.init();
            this.refreshTips();
            return this.loadBundles();
        })
        .then(()=>{
            console.log('GameLogic.init------4')
            return this.loadRes();
        })
        .then(() =>{          
            if(!GameLogic.firstInit){
                GameLogic.firstInit = true;
                zs.core.readyFinish()
            }
            return
            app.sceneMgr.enterScene(SceneNameEnum.Home,()=>{zs.core.readyFinish()});
        })
    }

    refreshTips(){
        let arr = app.confMgr.conf.tips.getWeightTips()
        if(this.lab_tips && arr.length >= 2 && arr[0]){
            this.lab_tips.string = arr[0] + "";
        }
        this.scheduleOnce(this.refreshTips.bind(this), arr[1] as number || 3);
    }

    protected onDisable(): void {
        this.unschedule(this.refreshTips.bind(this))
    }

    /**设置当前加载进度 */
    setLoadPro(v:number){
        this._loadPro =v;
    }

    setBarPro(v){
        if(v >1) v=1;
        let w = v*this.barWith;
        if(w >this.barSp.node.width ){
            this.barSp.node.width =w;
        } 
        this.loadTxt.string = Math.floor(v*100) + '%' 
    }

    /**加载bundle */
    loadBundles(){
        let bds = [BoundNameEnum.sound,BoundNameEnum.subBattle,BoundNameEnum.dlg];
        let num =0,len = bds.length;
        return new Promise((resove,reject) =>{       
            bds.forEach(b =>{
                cc.assetManager.loadBundle(b,()=>{

                    console.log('b-------------',b)
                    num++;
                    this.setLoadPro(0.8* num/len);
                    if(num ==len){
                        resove(null);
                    }
                })
            })
        })
    }

  
    /**加载配置*/
    loadJson(){
             
        return new Promise((resove,reject) =>{
            let path = 'json';
            try{ 
                path = path + (window["Language"].LanguageMgr.languageType ? '_en' : '');
            }catch(e){
                console.error(e);
                path = 'json';
            }
            cc.resources.loadDir(path,cc.JsonAsset,(err,res:cc.JsonAsset[])=>{
                res.forEach(r =>{
                    app.confMgr.parseConf(r);
                })
                resove(null);        
            })
        })
    }


    /**加载资源 */
    loadRes(){
        
        let p1 = new Promise((resove,reject) =>{        
            cc.resources.loadDir('plist',(err,res)=>{
                res.forEach(e =>{
                    if(e instanceof cc.SpriteAtlas){
                        ResMgr.ins.keepPlist(e);
                    }
                })
                resove(null);
            });
        })
        let p2 = new Promise((resove,reject) =>{
            // let bd = cc.assetManager.getBundle(BoundNameEnum.dlg);
            // bd.loadDir('',resove);    
            NodePoolMgr.ins.preLoadPre(resove)    
        }) 
        let ps =[p1,p2],num =0;
        return Promise.all(ps).then((a) =>{
            num++;
            this.setLoadPro(0.8 + num/ps.length);      
        });
    }

    update (dt) {
        if(this._curPro < this._loadPro){
            this._curPro +=dt * 5;
            this.setBarPro(this._curPro);
        }
    }
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../app";
import BasePopup from "../core/gui/BasePopup";
import PlatformMgr from "../PlatformMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShortCutDlg extends BasePopup {

    @property(cc.Label)
    btnLab:cc.Label = null;

    @property(cc.RichText)
    descLab:cc.RichText = null;

    isDeskEnter:boolean = false; //是否桌面进入
    hasDesk:boolean = false;  //有桌面
    m_tp:number =1;  //领取状态
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    
    initUI(){
        
        this.isDeskEnter = PlatformMgr.isTTShortcutEnter();
    
        PlatformMgr.checkShortcut((suc)=>{
            this.hasDesk = suc;
            this.setState();
        })
        

        let proConf = app.confMgr.conf.prop.json;
        this.descLab.string = 
        `<color=#EEEDFC>    将地下城大招版本添加到您的手机桌面，玩游戏不迷路。\n   首次添加领取： <color=#C98A2F>${proConf.addShortCutAward}金币</color>\n   每天从桌面图标进入游戏领取<color=#C98A2F>${proConf.shortCutDayAward}金币。</color>`
    }

    /**设置显示状态 */
    setState(){
        console.log('this.hasDesk ---------',this.hasDesk )
        if(this.hasDesk){
            this.btnLab.string = '领取';
            this.m_tp =1;

            if(app.dataMgr.sys.data.shortCutAward){
                this.btnLab.node.parent.active = false;
            }else{
                this.btnLab.node.parent.active = this.isDeskEnter;
            }

        }else{  

            this.btnLab.string = '添加到桌面';
            this.btnLab.node.parent.active = true;
            this.m_tp =2;
        }
    }


    /**添加到桌面 */
    onAddDeskBtn(){

        if(this.m_tp ==1) { //直接领取
            this.getAward();
            return;
        }
        app.justTrack("添加桌面次数");
        PlatformMgr.addShortCut((isSuc)=>{
            if(isSuc) {
                app.justTrack("添加桌面次数成功");
                this.getAward(true);
            }
        });
    }

    getAward(isAdd:boolean = false){  
        let proConf = app.confMgr.conf.prop.json;     
        let num = 0;
        if(isAdd){
            if(!app.dataMgr.sys.data.hasAddShortCut){
                num = proConf.addShortCutAward;
            }
        }else{
            num = proConf.shortCutDayAward;       
        }
        if(num >0 )app.dataMgr.sys.getShortCutAward(num); 
        this.closeUi();
    }

    // update (dt) {}
}

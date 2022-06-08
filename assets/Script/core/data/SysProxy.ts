import ProxyBase from "./ProxyBase";
import {IProxyModule } from "../../Defines";
import { app } from "../../app";
export default class SysProxy extends ProxyBase<IProxyModule.ISysData> {

 
    initData(){       
        
        this.data.shortCutAward =false;
        this.data.hasAddShortCut = false;
        this.data.loginTm =0;
        this.data.preLoginTm =0;
    }

    onInit(){    
        let tm = Date.now(); 
        this.data.preLoginTm = this.data.loginTm;
        this.data.loginTm = tm;

        if(!this.isSameDay()){
            this.data.shortCutAward =false;  //领取过奖励
        }
    }

    /**领取快捷奖励 */
    getShortCutAward(num:number){

        this.data.hasAddShortCut = true;  //是否添加过桌面
        this.data.shortCutAward =true;
        app.dataMgr.roleProxy.addGold(num,1); 
        this.autoKeep();
    }


    /**同一天内登录 */
    isSameDay(){
        if(this.data.loginTm ==0)return false; 

        let pre = new Date(this.data.preLoginTm),
        cur = new Date(this.data.loginTm);
        // console.log('当天日期 cur == ', cur.getMonth(), cur.getDate())
        return pre.getMonth() == cur.getMonth() && pre.getDate() == cur.getDate();
    }

    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../app";
import { JsonModule } from "../core/conf/ClientConfigMgr";
import ResMgr from "../core/resLoad/ResMgr";
import { ColorTypes } from "../Defines";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoleChooseItem extends cc.Component {

    @property(cc.Sprite)
    roleImg:cc.Sprite =null

    @property(cc.Sprite)
    equipImg:cc.Sprite =null

    @property(cc.Label)
    nameLab:cc.Label =null

    @property(cc.Node)
    lockImg:cc.Node = null;

    @property(cc.Node)
    selectImg:cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    m_cb:Function = null;
    m_data:JsonModule.IRoleJson;
    start () {

    }

    setData(data:JsonModule.IRoleJson){
        this.m_data =data;
        this.nameLab.string = data.role_name;
        
        this.roleImg.spriteFrame = ResMgr.ins.getRoleSp(data.id);
        this.equipImg.spriteFrame = ResMgr.ins.getItemSp(data.strat_item);
        
        this.setState();
    }

    setState(){
        let has = app.dataMgr.roleProxy.hasRole(this.m_data.id);
        if(has){
            this.nameLab.node.color = ColorTypes.ffffff;
            this.roleImg.node.color = ColorTypes.ffffff;
            this.lockImg.active = false;
        }else{

            this.nameLab.node.color = ColorTypes.a9a9a9;
            this.roleImg.node.color = ColorTypes.a9a9a9;
            let roleConf = app.confMgr.conf.role.getConfById(this.m_data.id);
            let conditon = roleConf.unlock_condition;
            if(conditon >0 && !app.dataMgr.achieve.isAchieveReach(conditon)){
                this.lockImg.active = true;
            }else{
                this.lockImg.active = false;
            }
        }
    }

    setCallBack(cb:Function){
        this.m_cb = cb;
    }

    setSelect(show:boolean){
        this.selectImg.active = show;
    }

    onClkItem(){
        this.m_cb && this.m_cb(this);
    }

    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { app } from "../../app";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BasePopup extends cc.Component {

    _evts: { tp: string, cb: Function, target: any }[] = [];
    uiData: any = null; //ui 数据
    uiConf = null;   //ui  配置

    initData(params) {
        this.uiData = params;
    }
    onLoad() {
        this.openAni();
    }

    protected onEnable(): void {
        
    }

    protected onDisable(): void {
        
    }

    openAni(call?) {
        this.node.scale = 0;
        cc.tween(this.node).to(.2, { scale: 1 }, cc.easeIn(1)).call(() => {
            call && call();
            let bg = this.node.getChildByName("bg");
            if(bg){
                let w = bg.getComponent(cc.Widget);
                w && w.updateAlignment();
            }
        }).start();
    }
    closeAni(call?) {
        // cc.tween(this.node).to(1,{scale:0},cc.easeIn(1)).call(()=>{
        //     call && call();
        // }).start();
    }

    start() {

        this.node.on(cc.Node.EventType.TOUCH_END, this.onClkPopup, this);
        this.initUI();
    }

    /**初始化 */
    initUI() {

    }
    /**点击弹窗 */
    onClkPopup() {

    }

    /**节点添加事件 */
    addEvt(evtType: string, cb: Function, target?: any) {
        if (!cb) return;
        let evtObj = Object.create(null);
        evtObj.tp = evtType;
        evtObj.cb = cb;
        evtObj.target = target;

        this._evts.push(evtObj);
        app.eventMgr.on(evtType, cb, target);
    }

    /**节点移除事件 */
    removeEvt(evtType: string, cb: Function, target?: any) {
        for (let i = 0; i < this._evts.length; i++) {
            let evt = this._evts[i];
            if (evt.tp == evtType && evt.cb == cb && evt.target == target) {
                this._evts.splice(i, 1);
                app.eventMgr.off(evtType, cb, target);
                break;
            }
        }
    }

    removeAllEvt() {
        this._evts.forEach(e => {
            app.eventMgr.off(e.tp, e.cb, e.target);
        })
    }

    /**关闭界面 */
    closeUi() {
        app.layerMgr.close(this.node.name);
    }

    /**关闭后处理 */
    onClose() {

    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onClkPopup, this);
        this.removeAllEvt();
    }

    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ItemHelper from "../common/ItemHelper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ModelItem extends cc.Component {

    @property(cc.Node)
    lockCon: cc.Node = null;


    @property(cc.Node)
    selectImg: cc.Node = null;

    mode: number;
    pdlg: any;
    // onLoad () {}

    start() {

    }

    setMode(mode: number, pdlg: any) {
        this.mode = mode;
        this.pdlg = pdlg;

        let lock = ItemHelper.isOpenMode(this.mode);
        this.setLock(!lock);
    }

    setLock(isLock: boolean) {
        this.lockCon.active = isLock;
    }

    setSelect(show: boolean) {
        this.selectImg.active = show;
    }

    onItemClk() {
        // if(this.lockCon.active){
        //     return;
        // }

        if (!ItemHelper.isOpenMode(this.mode)) {
            zs.platform.sync.showToast("敬请期待");
            return;
        }

        this.pdlg && this.pdlg.modeBackEvt(this);
    }

    // update (dt) {}
}

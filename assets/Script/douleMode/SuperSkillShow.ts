// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:

import { app } from "../app";
import BattleRoleData from "../logics/BattleRoleData";

//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
interface IUltData {
    id: number;
    cdTime: number;
    skNum: number;
    cdRefresh: number;
}
const { ccclass, property } = cc._decorator;
/**大招技能展示 */
@ccclass
export default class SuperSkillShow extends cc.Component {


    @property(cc.Sprite)
    cdMaskImg: cc.Sprite = null;

    @property(cc.Label)
    numLab: cc.Label = null;

    @property(cc.Node)
    videoImg: cc.Node = null;

    thatBtn: cc.Button = null;

    private playerData: BattleRoleData = null;
    private _ultData: IUltData = null;
    evtCb: Function = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.thatBtn = this.node.getComponent(cc.Button);
    }

    setData(playerData: BattleRoleData, data: IUltData) {
        this.playerData = playerData;
        this._ultData = data;
        this.numLab.string = data.skNum + '';
        // this.videoImg.active = data.skNum <= 0;
        this.changeState();
    }

    get ultData() {
        return this._ultData;
    }
    setCallBack(cb: Function) {
        this.evtCb = cb;
    }

    isCd() {
        return Date.now() - this._ultData.cdTime < (this.ultData.cdRefresh * 1000);
    }


    onItemClick() {
        if (this.isCd()) {
            return;
        }
        if (this._ultData.skNum <= 0) {
            zs.platform.async.playVideo().then(r => {
                if (r) {
                    var superList = [100044, 100049, 100045]
                    var nameArr = ['秒杀', '火', '冰'];
                    let idx = superList.indexOf(this._ultData.id);
                    // this.evtCb && this.evtCb(this, true);
                    // app.justTrack(`RE技能视频-${nameArr[idx]}次数成功`)
                    app.justTrack("释放大招次数")
                    zs.Native.TenjinTrackEvent("cv_13")
                    this.playerData.addUltSkill(this._ultData.id);
                }
            }).catch(e => {
                zs.platform.sync.showToast("暂时没有视频资源")
            })
            return;
        }

        this.evtCb && this.evtCb(this, false);
    }



    /**cd 更新 */
    updateCd() {
        let c = Date.now() - this._ultData.cdTime;
        let cdpercent = Math.max(1 - (c * 0.001) / this.ultData.cdRefresh, 0);
        this.cdMaskImg.fillRange = cdpercent;
        if (this.thatBtn) {
            if (cdpercent == 0) {
                this.thatBtn.interactable = true;
                this.videoImg.active = this._ultData.skNum <= 0;
            } else {
                this.thatBtn.interactable = false;
            }
        }
    }

    changeState() {
        // this.cdMaskImg.spriteFrame = null;
        //cc.Material.getBuiltinMaterial('builtin-2d-sprite')  cc.Material.getBuiltinMaterial('builtin-2d-gray-sprite')    
    }
}

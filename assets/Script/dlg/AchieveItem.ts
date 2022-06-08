// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { app } from "../app";
import { JsonModule } from "../core/conf/ClientConfigMgr";
import ResMgr from "../core/resLoad/ResMgr";
import { AchieveConditionType, AchieveState, EventName, Item_type } from "../Defines";
import DropMgr from "../logics/DropMgr";
const { ccclass, property } = cc._decorator;

/**富文本颜色 */
let RichTextColorType = {
    /**正在进行中的颜色 */
    fbbb10: '#fbbb10',
    /**没完成前右边字体的颜色 */
    bfbfbf: "#bfbfbf"
}
/**解锁装填的文本 */
let ColorType = {
    /**没解锁字体的颜色 */
    lock: cc.color(191, 191, 191),
    /**解锁的字体颜色 */
    unlock: cc.color(239, 182, 30)
}
@ccclass
export default class AchieveItem extends cc.Component {

    /**图标 */
    @property(cc.Sprite)
    icon: cc.Sprite = null;

    /**成就达成条件描述 */
    @property(cc.Label)
    lab_desc: cc.Label = null;

    /**红点 提示领取 标识 */
    @property(cc.Node)
    redDot: cc.Node = null;

    /**领取状态 */
    @property(cc.Label)
    lab_state: cc.Label = null;

    /**富文本 */
    @property(cc.RichText)
    lab_num: cc.RichText = null;

    /**任务状态 toggle */
    @property(cc.Toggle)
    tog_state: cc.Toggle = null;

    /**按钮领取状态 */
    @property(cc.Node)
    btn_getAward: cc.Node = null;

    /**背景状态 */
    @property(cc.Toggle)
    tog_bg: cc.Toggle = null;

    m_data: JsonModule.IAchievememtJson;

    /**富文本拼接描边 */
    outLine(str: string) {
        return `<outline color=#000000 width=2>${str}</outline>`
    }
    /**字体颜色拼接 */
    fontColor(str: string, color: string) {
        return `<color=${color}>${str}</color>`
    }
    /** */
    renderRichText(min, max) {
        return this.outLine(`${this.fontColor('[', RichTextColorType.bfbfbf)}${this.fontColor(`${min}`, min == 0 ? RichTextColorType.bfbfbf : RichTextColorType.fbbb10)}${this.fontColor(`/${max}]`, RichTextColorType.bfbfbf)}`)
    }

    protected onLoad(): void {
        app.eventMgr.on(EventName.achieve_state_fresh, this.refresItem, this);
    }

    protected onDisable(): void {
        app.eventMgr.off(EventName.achieve_state_fresh, this.refresItem, this);
    }

    refresItem(id) {
        if (this.m_data && this.m_data.id == id) {
            this.btn_getAward.active = false;
            this.tog_state.node.active = true;
            this.redDot.active = false;
            this.tog_state.check();
        }
    }

    setData(data: JsonModule.IAchievememtJson) {
        this.m_data = data;
        const achieve = app.dataMgr.achieve;
        //先隐藏红点
        this.redDot.active = false;
        //icon 赋值
        this.icon.spriteFrame = ResMgr.ins.getItemSp(this.m_data.icon);
        this.lab_desc.string = this.m_data.achievement_name;
        //任务状态
        let state = achieve.getAchieveState(data.id);
        let num = (AchieveConditionType.roleLive == data.condition) ? achieve.data.liveTime : (AchieveConditionType.roleLvl == data.condition) ? achieve.data.lvl : achieve.data.kill || 0
        //富文本 任务进度 显示
        this.lab_num.string = this.renderRichText(Math.max(Math.min(num, data.condition_num), 0), data.condition_num);
        //是否已经解锁
        if (state == AchieveState.run) {
            //没解锁
            this.lab_state.string = "解锁  ";
            this.btn_getAward.active = false;
            this.tog_state.node.active = true;
            this.tog_state.uncheck();
            this.tog_bg.uncheck();
        } else {
            this.tog_bg.check();
            //任务完成 操作
            let reach = state == AchieveState.reach;
            this.lab_state.string = reach ? "待领取  " + data.reward_detail : "已领取";
            if (reach) {//待领取状态
                this.btn_getAward.active = true;
                this.tog_state.node.active = false;
                this.redDot.active = true;
            } else {//已经领取了
                this.redDot.active = false;
                this.btn_getAward.active = false;
                this.tog_state.node.active = true;
                this.tog_state.check();
            }
        }
    }

    /**成就领取 */
    onGetBtn() {
        // app.justTrack('')
        console.error("完成成就-" + this.m_data.id);
        app.dataMgr.achieve.getAchieveAward(this.m_data.id);
    }


}

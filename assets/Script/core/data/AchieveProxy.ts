// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ProxyBase from "./ProxyBase";
import { AchieveConditionType, AchieveState, EventName, IProxyModule } from "../../Defines";
import { app } from "../../app";
export default class AchieveProxy extends ProxyBase<IProxyModule.IAchieveData> {

    initData() {
        this.data.kill = 0;
        this.data.liveTime = 0;
        this.data.lvl = 0;
        this.data.achives = Object.create(null);

    }

    /**
     * 
     * @param tp 根据类型刷新成就
     */
    freshAchieve(tp: number, val: number) {
        let isFresh = false;
        let arr = app.confMgr.conf.achievememt.getAchievesByTp(tp);
        arr.forEach(c => {
            if (this.getAchieveState(c.id) == AchieveState.run) {
                if (val >= c.condition_num) {
                    this.setAchieveState(c.id, AchieveState.reach);
                    isFresh = true;
                }
            }
        })
        if (isFresh) {
            this.autoKeep();
        }
    }

    /**击杀敌人数量 */
    killEnemy(num: number = 1) {
        //累计的
        this.data.kill += num;
        this.freshAchieve(AchieveConditionType.killNum, this.data.kill);
        this.autoKeep();
    }
    /**玩家生存时间 */
    roleLiveTime(num: number) {
        if(this.data.liveTime < 0){this.data.liveTime = 0;}
        if (num > this.data.liveTime) {
            this.data.liveTime = num;
            this.freshAchieve(AchieveConditionType.roleLive, this.data.liveTime);
            this.autoKeep();
        }
    }
    /**玩家战斗中等级 */
    roleLvl(num: number) {
        if(this.data.lvl < 0){this.data.lvl = 0;}
        if (num > this.data.lvl) {
            this.data.lvl = num;
            this.freshAchieve(AchieveConditionType.roleLvl, this.data.lvl);
            this.autoKeep();
        }
    }
    /**获得成就奖励 */
    getAchieveAward(id: number) {
        this.setAchieveState(id, AchieveState.award);
        app.eventMgr.emit(EventName.achieve_state_fresh, id);
        this.autoKeep();
    }

    /**
     * 
     * @param id 获取对应成就数据
     * @returns 
     */
    getAchieveState(id: number) {
        return this.data.achives[id] || AchieveState.run;
    }
    /**设置 成就 状态*/
    setAchieveState(id: number, state: AchieveState) {
        return this.data.achives[id] = state;
    }
    /**是否 达成 成就 */
    isAchieveReach(id: number) {
        return this.getAchieveState(id) == AchieveState.reach;
    }


    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ProxyBase from "./ProxyBase";
import { EventName, IProxyModule, SoundName } from "../../Defines";
import { app } from "../../app";
import ItemHelper from "../../common/ItemHelper";
export default class RoleProxy extends ProxyBase<IProxyModule.IRoleData> {

    initData() {

        this.data.exp = 0;
        this.data.lvl = 1;
        this.data.gold = 0;
        this.data.roles = Object.create(null);
        //观看视频的次数
        this.data.videotime = Object.create(null);

        let obj = this.data.skills = Object.create(null);
        let skills = app.confMgr.conf.strength.getConfArr();
        skills.forEach(s => {
            obj[s.id] = 0;
        })
        let roles = app.confMgr.conf.role.getConfArr();
        roles.forEach(e => {
            if (e.unlock_condition <= 0 && e.lock_cost <= 0 && e.video_time <= 0) {
                this.unLockRole(e.id);
            }
        })
    }

    onInit() {

    }

    addGold(gold: number, tip: number = -1) {
        this.data.gold += gold;
        app.eventMgr.emit(EventName.gold_fresh);
        this.autoKeep();

        if (tip > 0) {
            let str = gold > 0 ? `获得金币 +${gold}` : `消耗金币 ${gold}`;
            app.layerMgr.showTip(str);
        }
    }

    /**
     * 
     * @param cost 消耗金币
     */
    checkCostGold(cost: number, tip: number = 0) {
        if (this.data.gold >= cost) {
            this.addGold(-cost);
            return true;
        }
        return false;
    }


    hasRole(id: number) {
        return this.data.roles[id] > 0;
    }

    /**
     * 
     * @param id 解锁角色
     */
    unLockRole(id: number) {

        this.data.roles[id] = 1;
        app.eventMgr.emit(EventName.buy_role_fresh, id);
        this.autoKeep();
    }

    /**购买角色 */
    buyRole(id: number) {
        let roleConf = app.confMgr.conf.role.getConfById(id);
        let cost = roleConf.lock_cost;
        if (cost < 0) cost = 0;
        if (!this.checkCostGold(cost)) {
            ItemHelper.supplyGoldAlert('角色');
            return;
        }
        app.justTrack(`${roleConf.role_name}金币解锁成功`);
        zs.Native.TrackEvent("cv_2");
        this.unLockRole(id);
    }

    buyVideoRole(id: number) {
        let roleConf = app.confMgr.conf.role.getConfById(id);
        let videoTime = this.data.videotime[id] || 0;
        videoTime++;
        //解锁
        if (videoTime >= roleConf.video_time) {
            app.justTrack(`${roleConf.role_name}解锁次数成功`);
            zs.Native.TrackEvent("cv_3")
            this.unLockRole(id);
        } else {
            //没解锁加次数
            this.data.videotime[id] = videoTime;
            zs.Native.TenjinTrackEvent("cv_4")
            app.justTrack(`${roleConf.role_name}解锁次数`);
        }
        //保存一下数据
        this.autoKeep();
        app.eventMgr.emit(EventName.buy_role_fresh, id);
    }

    //-----------------

    getSkillLvl(id: number) {
        return this.data.skills[id];
    }

    /**技能升级 */
    skillUp(id: number, video: boolean = false) {
        let lvl = this.getSkillLvl(id);
        let cost = app.confMgr.conf.strength.getStrenthCost(id, lvl);
        if (!video) {
            if (!this.checkCostGold(cost)) {
                ItemHelper.supplyGoldAlert('强化');
                return;
            }
        }
        let data = app.confMgr.conf.strength.getConfById(id);
        this.data.skills[id] += 1;
        app.justTrack(`技能升级`)
        zs.Native.TenjinTrackEvent("cv_25")
        this.autoKeep();
        app.eventMgr.emit(EventName.skill_upgrade);
        app.audioMgr.playEffect(SoundName.fpx_sfx_pattern);
    }

    /**
     * 当前金币可升级技能数量
     * @param m_data 配置表-单个技能的数据
     * @returns 
     */
    getUpGradeRedDot(m_data) {
        //技能等级
        let currLvl = this.getSkillLvl(m_data.id);
        let maxLv = m_data.skill_maxlevel;
        //金币
        let tempGold = this.data.gold;
        //技能 id
        let id = m_data.id;
        let num = 0;
        let cost = 0;
        if (maxLv - currLvl > 0) {
            for (let i = currLvl; i < maxLv; i++) {
                cost = app.confMgr.conf.strength.getStrenthCost(id, i);
                // console.error(" 当前的金币 ", m_data.skill_name, tempGold, cost)
                tempGold -= cost;
                if (tempGold >= 0) {
                    // console.error("num ++ ", tempGold, cost, tempGold + cost)
                    num++;
                } else {
                    break;
                }
            }
        }
        return num;
    }


}


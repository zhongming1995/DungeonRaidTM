import GameLogic from "../../zsLibs/GameLogic";
import workflow from "../../zsLibs/template/workflow";
import { app } from "../app";
import ItemHelper from "../common/ItemHelper";
import BasePopup from "../core/gui/BasePopup";
import { BattleModeType, EventName, GM, PopupName } from "../Defines";

/*
* @ Author: yangcheng
* @ Data: 2022-03-24 13:01
*/
const { ccclass, property } = cc._decorator;

@ccclass
export default class GMDlg extends BasePopup {

    btn_Close: cc.Node;

    onLoad(): void {
        app.eventMgr.emit(EventName.game_pause, true);

        this.btn_Close = this.node.getChildByName("bg");
        // this.onClick(this.btn_Close, this.closeUi);
        let parent = this.node.getChildByName("btnParent")

        /**是否在游戏界面 */
        let isPlay = zs.core.workflow.state == workflow.GAME_PLAY;

        //自杀
        let die1 = parent.getChildByName("die1");
        die1.active = isPlay;
        this.onClick(die1, () => {
            this.closeUi();
            app.eventMgr.emit(EventName.player_click_die, 1);
        })

        let die2 = parent.getChildByName("die2");
        die2.active = isPlay;
        this.onClick(die2, () => {
            this.closeUi();
            app.eventMgr.emit(EventName.player_click_die, 2);
        })

        //宝箱
        let box = parent.getChildByName("box");
        box.active = isPlay;
        this.onClick(box, () => {
            this.closeUi();
            if (ItemHelper.isDoubleMode()) {
                app.layerMgr.open(PopupName.DoubleOpenBoxDlg);
            } else {
                app.layerMgr.open(PopupName.OpenBoxDlg);
            }
        });

        //升级
        let upLv = parent.getChildByName("upLv");
        upLv.active = isPlay;
        this.onClick(upLv, () => {
            this.closeUi();
            app.eventMgr.emit(EventName.game_pause, false);
            app.dataMgr.battleRoleData.addExp(app.dataMgr.battleData.maxExp);
        })

        //金币
        let goldlayout = parent.getChildByName("goldLayout");
        goldlayout.active = !isPlay;
        let gold = goldlayout.getChildByName("gold");
        let inp_gold: cc.EditBox = goldlayout.getChildByName("inp_gold").getComponent(cc.EditBox);
        this.onClick(gold, () => {
            // let n = Number(inp_gold.string);
            // if (n > 0) {
            app.dataMgr.roleProxy.addGold(1000);
            // }
        })

        //清理缓存
        let clearAll = parent.getChildByName("clearAll");
        clearAll.active = !isPlay;
        this.onClick(clearAll, () => {
            cc.sys.localStorage.clear();
            cc.game.restart();
            GameLogic.firstInit = false;
        })

        //创建怪物
        let createEnemyLayout = parent.getChildByName("createEnemyLayout");
        createEnemyLayout.active = false;
        let iput_enemy = createEnemyLayout.getChildByName("inp_enemy").getComponent(cc.EditBox);
        let inp_count = createEnemyLayout.getChildByName("inp_count").getComponent(cc.EditBox);
        let inp_type = createEnemyLayout.getChildByName("inp_type").getComponent(cc.EditBox);
        let inp_dropitem = createEnemyLayout.getChildByName("inp_dropitem").getComponent(cc.EditBox);
        let createEnemy = createEnemyLayout.getChildByName("createEnemy");
        this.onClick(createEnemy, () => {
            if (iput_enemy.string != null) {
                let str = "7000" + iput_enemy.string;
                let enemyId = Number(str);
                let count = Number(inp_count.string);
                let type = Number(inp_type.string);
                if (type > 20) {
                    type = Math.min(type, 21);
                }
                if (count >= 1) {
                    cc.systemEvent.emit(EventName.gm_create_enemy, enemyId, count, Math.max(type, 1));
                }
            }
        })

        let roleLayout = parent.getChildByName("roleLayout");
        roleLayout.active = false;
        let inp_playermove: cc.EditBox = roleLayout.getChildByName('inp_playermove').getComponent(cc.EditBox);
        let rolemove = roleLayout.getChildByName('rolemove')
        this.onClick(rolemove, () => {
            let n = Number(inp_playermove.string);
            if (n > 0) {
                GM.playerMoveScale = n;
            }
        })

        let enemyLayout = parent.getChildByName("enemyLayout");
        enemyLayout.active = false;
        let inp_emove = enemyLayout.getChildByName('inp_emove').getComponent(cc.EditBox);
        let enemymove = enemyLayout.getChildByName('enemymove')
        this.onClick(enemymove, () => {
            let n = Number(inp_emove.string);
            if (n > 0) {
                GM.enemyMoveScale = n;
            }
        })

        //---------------------怪物新的创建方式---------------------------
        let enemyParent = this.node.getChildByName('enemy');
        enemyParent.active = isPlay;

        // this.togglePlayer.toggleItems[GM.playerMoveScale - 1]?.check();
        // this.toggleEnemy.toggleItems[GM.enemyMoveScale - 1]?.check();
        this.toggleMode.toggleItems[1].node.active = false;
        this.toggleMode.toggleItems[2].node.active = false;

        `
        小蝙蝠：700009
        小骷髅：700013;700014;700015;700016;700017
        小BOSS:700028
        超级boss:700030
        围攻怪：700032
        火把：701000
        `

        let child = this.toggleType.node.children[0];
        child.name = '0';
        child.getChildByName("txt").getComponent(cc.Label).string = this.arr[0].name;
        for (let i = 1; i < this.arr.length; i++) {
            let to = cc.instantiate(child);
            to.name = i + '';
            to.getChildByName("txt").getComponent(cc.Label).string = this.arr[i].name;
            this.toggleType.node.addChild(to);
            to.active = true;
        }

        if (GM.playerInvincible) {
            this.playerInvincible.check();
        } else {
            this.playerInvincible.uncheck();
        }

        this.lab_playerSpeed.string = GM.playerMoveScale.toFixed(2);
        this.lab_enemySpeed.string = GM.enemyMoveScale.toFixed(2);
    }

    arr = [
        {
            name: "小蝙蝠",
            id: 700009
        },
        {
            name: "小骷髅",
            id: [700013, 700014, 700015, 700016, 700017]
        },
        {
            name: "小BOSS",
            id: 700028
        },
        {
            name: "超级boss",
            id: 700030
        },
        {
            name: "围攻怪",
            id: 700032
        },
        {
            name: "火把",
            id: 701000
        },
    ]

    enemyType = 0;
    enemyNum = 0;
    enemyMode = 0;

    enemyMoveSpeed = 1;
    playerMoveSpeed = 1;

    @property(cc.ToggleContainer)
    toggleType: cc.ToggleContainer = null;
    @property(cc.ToggleContainer)
    toggleMode: cc.ToggleContainer = null;
    @property(cc.ToggleContainer)
    toggleNum: cc.ToggleContainer = null;

    // @property(cc.ToggleContainer)
    // togglePlayer: cc.ToggleContainer = null;
    // @property(cc.ToggleContainer)
    // toggleEnemy: cc.ToggleContainer = null;

    @property(cc.Toggle)
    playerInvincible: cc.Toggle = null;

    @property(cc.Label)
    lab_playerSpeed: cc.Label = null;

    @property(cc.Label)
    lab_enemySpeed: cc.Label = null;

    onEnemyType(t: cc.Toggle) {
        this.enemyType = Number(t.node.name);
        console.warn("onEnemyType :: ", this.enemyType);
    }
    onEnemyCreateNum(t: cc.Toggle) {
        this.enemyNum = Number(t.node.name);
        console.warn("onEnemyCreateNum :: ", this.enemyNum);
        if (this.enemyNum >= 2) {
            this.toggleMode.toggleItems[1].node.active = true;
            this.toggleMode.toggleItems[2].node.active = true;
        } else {
            this.toggleMode.toggleItems[1].node.active = false;
            this.toggleMode.toggleItems[2].node.active = false;
        }
    }
    onEnemyCreateMode(t: cc.Toggle) {
        this.enemyMode = Number(t.node.name);
        console.warn("onEnemyCreateMode :: ", this.enemyMode);
    }

    onEnemyMove(e, type) {
        if (type == 1) {
            GM.enemyMoveScale *= 1.1;
        } else if (type == 2) {
            GM.enemyMoveScale /= 1.1;
        }
        console.warn("怪物倍速 :: ", GM.enemyMoveScale);
        this.lab_enemySpeed.string = GM.enemyMoveScale.toFixed(2);
    }

    onPlayerMove(e, type) {
        if (type == 1) {
            GM.playerMoveScale *= 1.1;
        } else if (type == 2) {
            GM.playerMoveScale /= 1.1;
        }
        console.warn("玩家倍速 :: ", GM.playerMoveScale);
        this.lab_playerSpeed.string = GM.playerMoveScale.toFixed(2);
    }

    onCreateEnemy() {
        console.warn(this.enemyType, this.enemyNum, this.enemyMode);
        let enemyId = this.enemyType, count = this.enemyNum * 10, type = this.enemyMode == 0 ? 1 : this.enemyMode == 1 ? 20 : 21;
        console.warn("enemyId:", enemyId, "count:", count, "type:", type);

        let data = this.arr[this.enemyType];
        if (typeof data.id == "number") {
            enemyId = data.id;
        } else if (Array.isArray(data.id)) {
            enemyId = data.id[Math.floor(Math.random() * data.id.length)];
        }
        cc.systemEvent.emit(EventName.gm_create_enemy, enemyId, count == 0 ? 1 : count, Math.max(type, 1));
    }

    @property(cc.EditBox)
    ipt_time: cc.EditBox = null;

    onConfirmTime() {
        let num = Number(this.ipt_time.string);
        if (num > 0) {
            app.gameMgr._curTime = (num * 60);
        }
    }

    onResetSpeed() {
        GM.playerMoveScale = GM.enemyMoveScale = 1;
    }

    checkBox(a: cc.Toggle) {
        console.warn("checkBox :: ", a.isChecked);
        GM.playerInvincible = a.isChecked
    }

    closeUi(): void {
        app.eventMgr.emit(EventName.game_pause, false);
        super.closeUi();
    }

    onClick(target: cc.Node, handler) {
        if (!target) {
            console.error("Gm target is null");
        }
        target && target.on(cc.Node.EventType.TOUCH_START, handler, this)
    }


}
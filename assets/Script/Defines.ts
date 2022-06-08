
/**bundle */
export enum BoundNameEnum {
    sound = 'sound',
    dlg = 'dlg',
    subBattle = 'subBattle',
}

export enum SceneNameEnum {
    Load = 'load',
    Home = 'home',
    Game = 'game',
    DoubleGame = 'gameDouble'
}

//弹窗
export enum PopupName {
    SupplyGoldDlg = 'SupplyGoldDlg',

    AchieveDlg = 'AchieveDlg',
    PictureDlg = 'PictureDlg',
    StrengthenDlg = 'StrengthenDlg',
    ChooseRoleDlg = 'ChooseRoleDlg',
    ModelSelectDlg = 'ModelSelectDlg',
    RoleDetailDlg = 'RoleDetailDlg',
    OutVideoDlg = "OutVideoDlg",

    /** 复活*/
    ReviveDlg = 'ReviveDlg',
    /** 结算*/
    ResultDlg = 'ResultDlg',
    /** 游戏中技能升级*/
    SkillUpgradeDlg = 'SkillUpgradeDlg',

    /** 游戏中解锁皮肤*/
    SkinUnlockDlg = 'SkinUnlockDlg',

    /** 开局超武*/
    StartWeaponDlg = 'StartWeaponDlg',

    OpenBoxDlg = 'OpenBoxDlg',

    /**Gm 界面 达人专供 或者测试用的 */
    GMDlg = "GMDlg",
    /**开局增强 */
    StartEnhanceDlg = "StartEnhanceDlg",
    /**结算 -- 嘲讽 -- */
    OverDlg = 'OverDlg',

    /**添加到桌面 */
    ShortCutDlg = 'ShortCutDlg',

    //双生界面 dlg
    /**双人选择角色界面 */
    DoubleChooseRoleDlg = 'DoubleChooseRoleDlg',
    /**双人宝箱 */
    DoubleOpenBoxDlg = 'DoubleOpenBoxDlg',
    /**双人结算 */
    DoubleResultDlg = 'DoubleResultDlg',
    /**双人暂停 */
    DoubleRoleDetailDlg = 'DoubleRoleDetailDlg',
    /**双人升级 */
    DoubleSkillUpgradeDlg = 'DoubleSkillUpgradeDlg',

    /**双人开局超武 */
    DoubleStartWeaponDlg = 'DoubleStartWeaponDlg',
}



export enum SoundName {
    bgm_game = 'bgm',

    fpx_home = 'BGM_Intro',  //进入首页
    fpx_button = 'button',  //点击按钮
    fpx_button_close = 'buttonClose',  //关闭界面

    fpx_sfx_coin_cluster5 = 'sfx_coin_cluster5', // 领取成就
    fpx_sfx_coin_double4 = 'sfx_coin_double4', //吃金币道具（除经验）
    fpx_sfx_damage_hit1 = 'sfx_damage_hit1', //怪物/主角受击
    fpx_sfx_pattern = 'sfx_pattern',// 技能升级
    fpx_sfx_sounds_impact15 = 'sfx_sounds_impact15',     //鞭子攻击1
    fpx_sfx_sounds_impact15_2 = 'sfx_sounds_impact15_2', // 鞭子攻击2
    fpx_sfx_sounds_impact9 = 'sfx_sounds_impact9',       //  死亡
    fpx_sfx_sounds_powerup2 = 'sfx_sounds_powerup2',     // 开局增强弹窗音效
    fpx_sfx_wpn_missilelaunch = 'sfx_wpn_missilelaunch', //领取成就
    fpx_Treasure1 = 'Treasure1', //  1星宝箱
    fpx_Treasure2 = 'Treasure1', //  3星宝箱
    fpx_Treasure3 = 'Treasure1', //  5星宝箱
    fpx_TreasureFound = 'TreasureFound',  //宝箱结束

    fpx_ding = 'ding',   // 拾取经验宝石
    fpx_fire = 'fire',  //大招喷火
    fpx_killall = 'killall', //五芒星 全屏击杀
    fpx_clock = 'clock',  //冻住大招
    fpx_relife = 'relife'  //复活
}

// evet-----------
export enum EventName {

    skill_upgrade = 'skill_upgrade',
    buy_role_fresh = 'buy_role_fresh',
    gold_fresh = 'gold_fresh',
    achieve_state_fresh = 'achieve_state_fresh',

    //战斗
    /** 游戏暂停*/
    game_pause = 'game_pause',
    //游戏结束
    game_over = 'game_over',
    /** 角色复活*/
    role_revive = 'role_revive',
    //怪物死亡
    enemy_death = 'enemy_death',
    //释放大招
    release_ult = 'release_ult',

    // 获得大招
    add_ult_skill = 'add_ult_skill',

    //更新skill
    update_skill = 'update_skill',
    //更新buff
    update_buff = 'upgrade_buff',

    // 移除技能
    remove_skill = 'remove_skill',
    /**超武添加或移除 */
    trySuper_fresh = 'trySuper_fresh',

    battle_fresh_exp = 'battle_fresh_exp', //经验
    battle_fresh_gold = 'battle_fresh_gold',//金币
    battle_fresh_killNum = 'battle_fresh_killNum', //击杀数


    update_state = 'update_state',

    player_click_die = 'player_click_die',

    gm_create_enemy = "gm_create_enemy",
    gm_set_game_time = 'gm_set_game_time',

}

export interface Ievent_param {
    id: number;
    param: any;
}


//数据类型
export module IProxyModule {
    export interface IRoleData {
        lvl: number;
        exp: number;
        gold: number;
        videotime: { [k: number]: number }
        roles: { [k: number]: number }  //解锁角色
        skills: { [k: number]: number } //强化技能等级
    }

    export interface IPictureData {
        [k: number]: number;
    }

    export interface IAchieveData {  //成就数据    
        kill: number;
        liveTime: number;
        lvl: number;
        achives: { [k: number]: number }
    }

    export interface ISysData {
        loginTm: number;
        preLoginTm: number;
        shortCutAward: boolean;
        hasAddShortCut: boolean;
    }
}

export enum main_pro_key {

    atk_all = 101,        /**攻击*/
    cd_all = 102,        /**冷却*/
    atkrange_all = 103,  /**攻击范围*/
    atkfly_all = 104,    /**攻速*/
    duration_all = 105,   /**持续时间*/
    attmulti_all = 106,   /**攻击段数*/
    damageup_all = 107,   /**伤害加深*/
    damagedown_all = 108, /**伤害减免*/
    weaponrate_all = 109, /**武器伤害比例*/
    killhpr_all = 110,    /**击杀回血 */
    hp_all = 150,         /**血量*/
    armor_all = 151,     /**护甲*/
    recover_all = 152,   /**恢复 每秒恢复血量*/
    speed_all = 153,      /**移速加成*/
    pickrange_all = 154,  /**拾取范围*/
    luck_all = 155,      /**幸运值*/
    exp_all = 156,        /**经验值*/
    exprate_all = 157,    /**经验加成比例*/
    gold_all = 158,       /**金币*/
    goldrate_all = 159,   /**金币加成比例*/
    relive_all = 160,      /**复活次数*/
    reliveblood_all = 161,  /**复活血量比例*/
    hpextra_all = 162  /**血量加成百分比*/

}

/**角色所有的属性 */
export interface main_pro_type {
    atk_all: number;
    cd_all: number;
    atkrange_all: number;
    atkfly_all: number;
    duration_all: number;
    attmulti_all: number;
    damageup_all: number;
    damagedown_all: number;
    weaponrate_all: number;
    hp_all: number;
    armor_all: number;
    recover_all: number;
    speed_all: number;
    pickrange_all: number;
    luck_all: number;
    exp_all: number;
    exprate_all: number;
    gold_all: number;
    goldrate_all: number;
    relive_all: number;
    reliveblood_all: number;
}

/**武器属性 */
export interface weapon_pro_type {

    atk_all: number;
    cd_all: number;
    atkrange_all: number;
    atkfly_all: number;
    duration_all: number;
    attmulti_all: number;
    damageup_all: number;
    damagedown_all: number;
    weaponrate_all: number;
    killhpr_all: number;

}


/**所有物品类型 */
export enum Item_type {
    gold = 1,  /**获得金币 */
    exp = 2, /**获得经验 */
    hp = 3, /**恢复血量 */
    main_weapon = 4, /**主武器 */
    super_weapon = 5, /**超武 */
    sub_weapon = 6, /**副武器 */
    shipin = 7,  /**饰品 */
    skill = 10,  /**获得主动大招技能 */
    goodBox = 11, /**宝箱道具 */
    collect = 12, /**磁铁道具 */
    luckGrass = 13 /**幸运草直接加幸运值 */
}


export enum AchieveState {
    run = 0,
    reach = 1,
    award = 2,
}

export enum AchieveConditionType {
    roleLvl = 3,
    roleLive = 2,
    killNum = 1
}

export let ColorTypes = {
    ffffff: cc.color(255, 255, 255),
    a9a9a9: cc.color(100, 100, 100),
    d53847: cc.color(100, 100, 100),
    C1FFF4: cc.color(193, 255, 244),

    float_red: cc.color(255, 18, 13),
    float_yellow: cc.color(255, 235, 57),
    float_orange: cc.color(255, 151, 28),
    float_green: cc.color(105, 255, 40),
}

export let float_num_conf = {

    1: { c: ColorTypes.ffffff, size: 14, ani: 'anim_numb_low' },  //白色
    2: { c: ColorTypes.float_yellow, size: 15, ani: 'anim_numb_medium' },   //黄色
    3: { c: ColorTypes.float_orange, size: 16, ani: 'anim_numb_high' },  //橙色
    4: { c: ColorTypes.float_red, size: 15, ani: 'anim_numb_super' },  //红色
    5: { c: ColorTypes.float_green, size: 16, ani: 'anim_numb_medium' }  //绿色
}


/**属性 k v 类型 */
export interface att_val_type {
    attName: string;
    val: number;
    own: number;
}

/**关卡模式类型 */
export enum BattleModeType {
    dazhao = 0,
    tangping = 1,
    douleLive = 2,
}

//role
export enum RoleState {
    Idle = 'daiji',
    Move = 'go',
    Die = 'siwang'
}

export enum EnemyAniType {
    sprite = 0,
    animation = 1,
    spine = 2
}

export enum AttackType {
    nearlyAtk,//近战
    farAtk,//远程
}

export let max_skill_num: number = 6;
export let max_buffskill_num: number = 6;


/**角色默认的属性值 */
export let player_deault_attr = {
    speed: 200,
    pickRange: 60,
    enemySpeed: 200

}
/**物品id */
export enum enum_item_ids {
    highmoney = 100039,  //高级钱袋
    kaoji = 100046,   //烤鸡

    medusha = 700036  //美杜莎id
}

export let GM = {
    playerMoveScale: 1,
    enemyMoveScale: 1,
    playerInvincible: false,
}



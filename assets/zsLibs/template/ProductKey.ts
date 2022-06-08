export default class ProductKey {
    static readonly zs_version = 1;
    static readonly zs_switch = 0;
    static readonly zs_skip_settle = 0;
    static readonly zs_start_game_video_switch = 1; // 开局看视频
    static readonly zs_banner_vertical_enable = 0;  //按钮上移开关 暂时没用上 用的zs_button_delay_time
    static readonly zs_jump_switch = 1;     // 导出总开关
    static readonly zs_full_screen1_jump = 0;
    static readonly zs_full_screen2_jump = 1;
    static readonly zs_finish_jump = 0;     // 结算页导出
    static readonly zs_history_list_jump = 1;   // 假退出 游戏页、结算页才有
    static readonly zs_auto_full_screen_jump_switch = 0;    // 开局弹全屏1、2界面
    static readonly zs_auto_jump_switch = 1;    // 全屏界面自动弹一个导出
    static readonly zs_friends_playing_switch = 0;  // 好友在玩 TODO 暂缓 需求还没过来
    static readonly zs_reminder_switch = 1;     // 温馨提示：微信假消息 点击取消后的 好友挑战
    static readonly zs_false_news_switch = 0;   // 微信假消息
    static readonly zs_slide_jump_switch = 1;   // 滑动触发跳转开关 
    static readonly zs_share_title = "这个是分享标题";
    static readonly zs_share_img = "这个是分享图片地址";
    static readonly zs_banner_adunit = "";
    static readonly zs_banner_adunit2 = "";
    static readonly zs_banner_adunit3 = "";
    static readonly zs_video_adunit = "";
    static readonly zs_full_screen_adunit = "";
    static readonly zs_gridAd_id = "";
    static readonly zs_click_award_num = 0;     // 游戏砸金蛋狂点次数（关卡模式中数字为关卡，无限模式中数字为次数，-1无限制，0无次数）
    static readonly zs_ready_click_num = 0;     // 通用砸金蛋狂点次数（关卡模式中数字为关卡，无限模式中数字为次数，-1无限制，0无次数）
    static readonly zs_click_award_since = 0;   // 狂点在新用户几次游戏后出现
    static readonly zs_button_delay_time = 0;   // 按钮延时开关（0为关，单位毫秒）
    static readonly zs_scene_value = "1005|1006|1011|1012|1013|1014|1017|1019|1020|1023|1024|1025|1030|1031|1032|1036|1042|1047|1048|1049|1053|1102|1129"; // 场景值屏蔽
    static readonly zs_revive_way = "";     //复活方式
    static readonly zs_revive_num = 0;      //复活次数
    static readonly zs_system = "";
    static readonly zs_city = "上海市|广州市|深圳市|成都市|北京市";
    static readonly zs_time = 0;
    static readonly zs_banner_banner_time = 1000;
    static readonly zs_full_screen_banner_time = 3;
    static readonly zs_banner_refresh_time = 30000;
    static readonly zs_game_start_jump_switch = 1;  // 首页导出位开关
    static readonly zs_native_btn_text = "点击查看";
    static readonly zs_jump_time = 2000;
    static readonly zs_full_screen_button_switch = 0;   //全屏界面误触开关
    static readonly zs_share_image = "";                //分享图片地址
    static readonly zs_full_screen_ad_enable = 0;       //插屏广告开启状态
    static readonly zs_banner_text_time = 0;            //广点通文字延时移动时间（单位：毫秒）
    static readonly zs_banner_move_time = 500;          //广点通文字上移动画时间长度（单位：毫秒）
    static readonly zs_banner_horizontal_enable = 0;    //广点通文字左右移动开关（0关，1开）
    static readonly zs_revive_type = 0;                 //游戏复活方式（0不复活，1狂点复活，2视频复活，3分享复活，4普通复活）
    static readonly zs_revive_click_num = 0;            //游戏狂点复活次数（-1不限制，0使用视频复活，N次后使用视频复活）
    static readonly zs_revive_video_num = 0;            //游戏视频复活次数（-1不限制，0使用分享复活，N次后使用分享复活，没视频了使用分享复活）
    static readonly zs_revive_share_num = 0;            //游戏分享复活次数（-1不限制，0使用普通复活，N次后使用普通复活）
    static readonly zs_continue_auto_share = 0;
    static readonly zs_full_screen_jump = 0;            //增加全屏导出位开关
    static readonly zs_revive_countdown = 10;           //复活倒计时
    static readonly zs_jump_style = 1;                  //结算页样式
    static readonly zs_native_adunit = "";              //原生广告NativeID
    static readonly zs_native_adunit2 = "";             //原生广告NativeID2
    static readonly zs_native_click_switch = 0;         //原生广告误触
    static readonly zs_native_limit = 0;                //下一关/重新开始原生广告（0关，1开）
    static readonly zs_button_delay_switch = 0;         //按钮延迟开关(0关，1开)
    static readonly zs_native_limit_10 = 1;             //广告拉取间隔10秒
    static readonly zs_more_reward_swich = 0;           //单选框开关（0关，1开）
    static readonly zs_native_delay = 0;                //原生广告延迟开关
    static readonly zs_full_screen_ad = 0;
    static readonly zs_best_videotape_time = 15000;     //最大录屏时长（毫秒）
    static readonly zs_hide_banner_switch = 0;          //头条banner白点开关（0关，1开）
    static readonly zs_share_topics = "";               //头条分享录屏话题
    static readonly zs_start_video_switch = 0;
    static readonly zs_native_gap_time = 0;             //游戏中自动谈视频间隔（s)
    static readonly test_touch_switch = 0;
    static readonly zs_game_banner_show_switch = 0;
    static readonly zs_game_share_video_switch = 0;       //游戏自动截止录屏弹确认框开关


    static readonly zs_the_fan_switch = 0;

    static readonly zs_hide_the_upgrade = 0;

    //体力上限
    static readonly zs_physical_limit = 9;
    //关卡视频体力获取数
    static readonly zs_get_the_power = 9;

    static readonly zs_in_game_video = 0;
    static readonly zs_game_treasure_chest_video = 0;

}
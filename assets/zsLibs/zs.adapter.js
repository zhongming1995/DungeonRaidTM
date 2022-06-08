console.log("init adapter");
if (typeof tt !== "undefined") {

    window.zs = window.zs || {};
    // window.zs.wx = window.zs.wx || {};

    window.platform = (function () {
        function platform() { };
        platform.loginCount = 0;
        platform.systemInfo = null;

        platform.init = function () {
            tt.showShareMenu({
                withShareTicket: true
            });
            platform.systemInfo = tt.getSystemInfoSync();
            console.log("头条平台初始化...");
        }
        platform.initAds = function () {
            zs.platform.sync.initBanner();
            zs.platform.sync.initVideo({ id: zs.product.get("zs_video_adunit") });
            zs.platform.sync.initInterstitialAd({ id: zs.product.get("zs_full_screen_adunit") });
        }

        platform.getLoginParams = function _async() {
            return new Promise((resolve, reject) => {
                tt.login({
                    force: false,
                    success: (result) => {
                        if (result.code || result.anonymousCode) {
                            resolve({
                                code: result.code,
                                anonymous_code: result.anonymousCode
                            });
                        }
                        else {
                            resolve({
                                uid: 1
                            });
                        }
                    },
                    fail: (result) => {
                        resolve({
                            uid: 1
                        });
                    },
                    complete: (result) => { }
                });
            });
        }

        platform.share = function (params) {
            var desc = (params && params.desc) ? params.desc : zs.product.get("zs_share_desc");
            var title = (params && params.title) ? params.title : zs.product.get("zs_share_title");
            var imgUrl = (params && params.imgUrl) ? params.imgUrl : zs.product.get("zs_share_image");
            var query = (params && params.query) ? params.query : ""
            if (title == null) {
                zs.log.warn('方法（ share ）缺少必要参数（ title ）', 'Platform');
                return;
            }
            if (imgUrl == null) {
                zs.log.warn('方法（ share ）缺少必要参数（ imgUrl ）', 'Platform');
                return;
            }
            // if (desc == null) {
            //     zs.log.warn('方法（ share ）缺少必要参数（ desc ）', 'Platform');
            //     return;
            // }
            // if (params.query == null) {
            //     zs.log.warn('方法（ share ）缺少必要参数（ query ）', 'Platform');
            //     return;
            // }
            tt.shareAppMessage({
                title: title,
                imageUrl: imgUrl,
                desc: desc,
                query: query,
                success(res) {
                    console.log('分享成功', JSON.stringify(res));
                    if (params && params.success) {
                        params.success();
                    }
                },
                fail(err) {
                    console.log('分享失败', JSON.stringify(err));
                    if (params && params.fail) {
                        params.fail();
                    }
                }
            });
        }

        platform.setDefaultShare = function (params) {
            if (params.title == null) {
                zs.log.warn('方法（ share ）缺少必要参数（ title ）', 'Platform');
                return;
            }
            if (params.imgUrl == null) {
                zs.log.warn('方法（ share ）缺少必要参数（ imgUrl ）', 'Platform');
                return;
            }
            var shareInfo = {
                title: params.title,
                imageUrl: params.imgUrl
            }
            tt.onShareAppMessage(() => shareInfo)
        }


        platform.loadSubpackage = function _async(params) {
            return new Promise((resolve, reject) => {
                if (params.pkgName == null) {
                    zs.log.warn('方法（ loadSubpackage ）缺少必要参数（ pkgName ）', 'Platform');
                    return reject();
                }
                if (tt.loadSubpackage) {
                    let loadTask = tt.loadSubpackage({
                        name: params.pkgName,
                        success: (result) => {
                            resolve(result);
                        },
                        fail: (result) => {
                            reject(result);
                        }
                    });
                    if (loadTask) {
                        if (params.progressHandler) {
                            loadTask.onProgressUpdate((result) => {
                                progressHandler.runWith(result.progress);
                            });
                        }
                    } else {
                        reject();
                    }
                } else {
                    reject();
                }
            });
        }

        platform.onVideoErrorHandler = function (error) {
            platform.videoAd = null;
            platform.videoErrorHandler && platform.videoErrorHandler(error);
        }

        platform.onVideoCloseHandler = function (result) {
            if ((result && result.isEnded) || result == undefined) {
                platform.videoCloseHandler && platform.videoCloseHandler(true);
            } else {
                platform.videoCloseHandler && platform.videoCloseHandler(false);
            }
        }

        platform.initVideo = function (params) {
            if (!window.tt || typeof window.tt.createRewardedVideoAd != 'function') {
                return;
            }
            if (params.id == null || params.id.length <= 0) {
                zs.log.warn('方法（ initVideo ）缺少必要参数（ id ）', 'Platform');
                platform.videoAd = null;
                return;
            }
            platform.videoId = params.id;
            platform.videoAd = tt.createRewardedVideoAd({ adUnitId: params.id });
            if (platform.videoAd) {
                platform.videoAd.onError(platform.onVideoErrorHandler);
                platform.videoAd.onClose(platform.onVideoCloseHandler);
            }
        }

        platform.playVideo = function _async() {
            console.log("zs.adapter.js playVideo")
            return new Promise((resolve, reject) => {
                if (platform.videoAd == null) { return reject(null); }
                platform.videoCloseHandler = (result) => {
                    if (!result) platform.showModel({
                        title: "未观看完视频",
                        content: "观看完视频才能获得奖励哦",
                        showCancel: true
                    }).then((sure) => {
                        if (sure) {
                            platform.playVideo().then((isEnd) => {
                                resolve(isEnd);
                            }).catch(() => {
                                reject();
                            })
                        }
                        else {
                            resolve(false);
                        }
                    }).catch(() => {
                        resolve(false);
                    })
                    else {
                        resolve(true);
                    }
                };
                platform.videoAd.show().catch((error) => {
                    platform.videoAd.load().then(() => {
                        platform.videoAd.show().catch(() => {
                            reject();
                        })
                    }).catch(() => {
                        reject();
                    })
                });
            })
        }

        platform.isVideoEnable = function () {
            return platform.videoAd != null;
        }


        platform.request = function _async(params) {
            if (params.url == null || params.url.length <= 0) {
                zs.log.warn('方法（ request ）缺少必要参数（ url ）', 'Platform');
                platform.bannerAd = null;
                return;
            }
            if (params.data == null) {
                zs.log.warn('方法（ request ）缺少必要参数（ data ）', 'Platform');
                return;
            }
            if (params.method == null) {
                zs.log.warn('方法（ request ）缺少必要参数（ method ）', 'Platform');
                return;
            }
            return new Promise((resolve, reject) => {
                tt.request({
                    url: url,
                    data: data,
                    header: { 'content-type': 'application/json' },
                    method: method,
                    dataType: null,
                    responseType: null,
                    success: (result) => {
                        resolve(result);
                    },
                    fail: () => {
                        reject();
                    },
                    complete: () => { }
                });
            });
        }

        platform.initBanner = function () {
            if (!window.tt || typeof window.tt.createBannerAd != 'function') {
                return;
            }
            platform.bannerId = zs.product.get("zs_banner_adunit");
            if (platform.bannerId.length <= 0 || platform.bannerId == null) {
                zs.log.warn('方法（ initBanner ）缺少必要参数（ id ）', 'Platform');
                platform.bannerAd = null;
                return;
            }
            platform.keepTime = 30;
            platform.bannerType = "normal";//默认banner类型
            let systemInfo = platform.systemInfo;
            let targetBannerAdWidth = 150;
            let targetBannerAdTop = systemInfo.windowHeight - (targetBannerAdWidth / 16) * 9;
            let targetBannerAdLeft = (systemInfo.windowWidth - targetBannerAdWidth) / 2;
            // console.log("init style:", targetBannerAdLeft, targetBannerAdTop, targetBannerAdWidth)
            platform.bannerAd = tt.createBannerAd({
                adUnitId: platform.bannerId,
                adIntervals: platform.keepTime,
                style: {
                    left: targetBannerAdLeft,
                    top: targetBannerAdTop,
                    width: targetBannerAdWidth
                }
            });
            if (platform.bannerAd == null) { return; }
            platform.bannerAd.onResize((size) => {
                console.log("banner resize:", size.width, size.height)
                platform.bannerStyle = size;
                if (platform.bannerAd) {
                    if (platform.bannerType == "pixel") {
                        var pixel = 1;
                        platform.bannerAd.style.top = window.screen.availHeight - pixel;
                        platform.bannerAd.style.left = pixel - platform.bannerStyle.width;
                    } else {
                        console.log("wxd onresize()准备修改banner style:", (platform.systemInfo.windowWidth - size.width) / 2, platform.systemInfo.windowHeight - size.height)
                        platform.bannerAd.style.top = platform.systemInfo.windowHeight - size.height;
                        platform.bannerAd.style.left = (platform.systemInfo.windowWidth - size.width) / 2;
                    }
                }
            });
            platform.bannerAd.onError((error) => {
                platform.bannerAd = null;
            });
        }

        platform.showBanner = function () {
            platform.bannerType = "normal";
            if (platform.bannerId == null) { return; }
            if (platform.bannerAd == null) {
                platform.initBanner();
            }
            if (platform.bannerAd) {
                if (platform.bannerStyle) {
                    console.log("wxd show()准备修改banner style:", (platform.systemInfo.windowWidth - platform.bannerStyle.width) / 2, platform.systemInfo.windowHeight - platform.bannerStyle.height)
                    platform.bannerAd.style.top = platform.systemInfo.windowHeight - platform.bannerStyle.height;
                    platform.bannerAd.style.left = (platform.systemInfo.windowWidth - platform.bannerStyle.width) / 2;
                }
                platform.bannerAd.show();
            }
        }

        /**显示单像素banner */
        platform.showOnePixelBanner = function () {
            platform.bannerType = "pixel";
            if (platform.bannerId == null) { return; }
            if (platform.bannerAd == null) {
                platform.initBanner();
            }
            if (platform.bannerAd) {
                if (platform.bannerStyle) {
                    var pexel = 1;
                    platform.bannerAd.style.top = window.screen.availHeight - pexel;
                    platform.bannerAd.style.left = pexel - platform.bannerStyle.width;;
                }
                platform.bannerAd.show();
            }
        }

        platform.hideBanner = function () {
            platform.bannerAd && platform.bannerAd.hide();
        }

        /**检测banner */
        platform.checkBanner = function (params) {
            platform.hideBanner();
            if (!params || !params.data || !params.data.banner) {
                return;
            }
            var config = params.data.banner;
            var switchShow = true;
            if (config.switch) {
                if (Array.isArray(config.switch)) {
                    for (let i = 0, n = config.switch.length; i < n; i++) {
                        if (!zs.product.get(config.switch[i])) {
                            switchShow = false;
                            break;
                        }
                    }
                } else if (!zs.product.get(config.switch)) {
                    switchShow = false;
                }
            }
            if (!switchShow) {
                return;
            }
            if (config.delay && zs.product.get("zs_banner_banner_time")) {
                platform.delayBanner = setTimeout(function () {
                    platform.showBanner();
                })
            } else {
                platform.showBanner();
            }
        }

        platform.initInterstitialAd = function (params) {
            if (!window.tt || typeof window.tt.createInterstitialAd != 'function') {
                return;
            }
            platform.insertId = params.id;
        }

        platform.showInterstitialAd = function _async() {
            return new Promise((resolve, reject) => {
                if (platform.insertId == null || platform.insertId.length <= 0) {
                    zs.log.warn('方法（ initInsert ）缺少必要参数（ id ）', 'Platform');
                    reject();
                    return;
                }
                platform.insertAd = tt.createInterstitialAd({ adUnitId: platform.insertId });
                if (platform.insertAd) {
                    platform.insertAd.onError((error) => {
                        reject(error);
                    });
                    platform.insertAd.onClose(() => {
                        resolve();
                    });
                    platform.insertAd.load().then(() => {
                        platform.insertAd.show();
                    });
                } else {
                    reject(error);
                }
            });
        }


        /**
         * 开始录屏
         * @param {*} params 
         */
        platform.recorderStart = function (params) {
            params.maxTime = params.maxTime || 17;
            if (typeof window.tt.getGameRecorderManager === 'function') {
                const recorder = tt.getGameRecorderManager();
                platform.bHighLightRecorder = false
                recorder.onStart(() => {
                    platform.recoding = true;
                    platform.recorderTime = Date.now();
                    platform.stopCallBack = null;
                });
                recorder.onStop((result) => {
                    console.log("停止录屏回调", JSON.stringify(result));
                    platform.recoding = false;
                    platform.videoPath = result.videoPath;
                    platform.recorderTime = Date.now() - platform.recorderTime;
                    if (platform.bHighLightRecorder) {
                        zs.log.debug("有高光录屏");
                        recorder.clipVideo({
                            path: result.videoPath,
                            success(res) {
                                zs.log.debug("剪辑最后视频成功");
                                platform.videoPath = res.videoPath;
                                platform.stopCallBack && platform.stopCallBack();
                            },
                            fail(e) {
                                zs.log.debug("剪辑视频失败");
                                platform.stopCallBack && platform.stopCallBack();
                            }
                        })
                    } else {
                        recorder.clipVideo({
                            path: result.videoPath,
                            timeRange: [17, 0], //剪辑最后15秒
                            success(res) {
                                console.log(`剪辑最后视频成功`)
                                platform.videoPath = res.videoPath;
                                platform.stopCallBack && platform.stopCallBack();
                            },
                            fail(e) {
                                console.error("剪辑视频失败")
                                platform.stopCallBack && platform.stopCallBack();
                            }
                        })
                    }
                });

                recorder.start({
                    duration: params.maxTime,
                });
            }
        }

        platform.recorderStop = function (params) {
            if (!window.tt || !platform.recoding) { return; }
            if (typeof window.tt.getGameRecorderManager === 'function') {
                platform.stopCallBack = (params && params.callback) ? params.callback : null;
                const recorder = tt.getGameRecorderManager();
                recorder.stop();
                console.log("开始停止录屏");
            }
        }

        platform.recorderPause = function () {
            if (!window.tt || !platform.recoding) { return; }
            if (typeof window.tt.getGameRecorderManager === 'function') {
                const recorder = tt.getGameRecorderManager();
                recorder.pause();
            }
        }
        platform.recorderResume = function () {
            if (!window.tt || !platform.recoding) { return; }
            if (typeof window.tt.getGameRecorderManager === 'function') {
                const recorder = tt.getGameRecorderManager();
                recorder.resume();
            }
        }


        /**裁剪高光时刻 */
        platform.recorderClip = function (params) {
            if (!window.tt || !platform.recoding) { return; }
            if (params.beforeTime == null) {
                zs.log.warn('方法（ recorderClip ）缺少必要参数（ beforeTime ）', 'Platform');
                return;
            }
            if (params.laterTime == null) {
                zs.log.warn('方法（ recorderClip ）缺少必要参数（ laterTime ）', 'Platform');
                return;
            }
            if (typeof window.tt.getGameRecorderManager === 'function') {
                const recorder = tt.getGameRecorderManager();
                platform.bHighLightRecorder = true;
                recorder.recordClip({
                    timeRange: [params.beforeTime, params.laterTime]
                })
            }
        }


        /**分享录屏 */
        platform.shareRecorderVideo = function _async() {
            return new Promise((resolve, reject) => {
                console.log("开始分享录屏", platform.videoPath);
                if (!window.tt || platform.videoPath == '') {
                    reject();
                    return;
                }
                var topic = zs.product.get("zs_share_topics");
                var topics = [];
                if (topic != "") {
                    topics = topic.split(",");
                }
                var queryData = `commandId=${zs.core.userId}&from=videoShare`;
                var desc = zs.product.get("zs_share_desc");
                var title = zs.product.get("zs_share_title");
                var imgUrl = zs.product.get("zs_share_image");
                let shareInfo = {
                    channel: 'video',
                    desc: desc,
                    title: title,
                    imageUrl: imgUrl,
                    query: queryData,
                    extra: {
                        videoPath: platform.videoPath,
                        videoTopics: topics, // 视频话题(只在抖音可用) （目前由 hashtag_list 代替），为保证兼容性，建议同时填写两个
                        hashtag_list: topics, // 视频话题(只在抖音可用)
                        withVideoId: true,
                        video_title: title, // 生成输入的默认文案
                    },
                    success(res) {
                        var videoId = res && res.videoId;
                        if (videoId) {
                            zs.log.debug('分享出去有视频id', videoId);
                        }
                        resolve();
                    },
                    fail(err) {
                        zs.log.debug('分享录屏失败', JSON.stringify(err));
                        reject();
                    }
                };
                zs.log.debug('分享录屏', shareInfo);
                tt.shareAppMessage(shareInfo);
            });
        }

        /**
         * 显示头条更多好玩
         * @returns 
         */
        platform.showMoreGamesModalSimple = function _async() {
            return new Promise((resolve, reject) => {
                if (!window.tt || typeof window.tt.showMoreGamesModal != 'function') {
                    reject();
                    return;
                }
                tt.offNavigateToMiniProgram(); //取消所有监听
                tt.offMoreGamesModalClose();
                // 监听弹窗关闭
                tt.onMoreGamesModalClose((res) => {
                    console.log("modal closed", res);
                });
                // 监听小游戏跳转
                tt.onNavigateToMiniProgram((res) => {
                    if (res) {
                        console.log("是否有跳转的小游戏", res);
                        if (res.errCode == 0) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }

                    }
                });
                // iOS 不支持，建议先检测再使用
                var navigateData = {};
                navigateData.appId = zs.core.appId;
                if (platform.systemInfo.platform !== "ios") {
                    // 打开互跳弹窗
                    tt.showMoreGamesModal({
                        appLaunchOptions: [
                            {
                                extraData: navigateData
                            }
                        ],
                        success(res) {
                            console.log("showMoreGamesModal success", res.errMsg);
                        },
                        fail(res) {
                            console.log("showMoreGamesModal fail", res.errMsg);
                        }
                    });
                }
            })
        }

        /**
         * 调起关注小程序的引导组件
         * @returns 
         */
        platform.showFavoriteGuide = function () {
            if (!window.tt || typeof window.tt.showFavoriteGuide != 'function') {
                return;
            }
            tt.showFavoriteGuide({
                type: "bar",
                content: "一键添加到我的小程序",
                position: "bottom",
            })
        }

        platform.showModel = function (params) {
            if (!window.tt || typeof window.tt.showModal != 'function') {
                return;
            }
            params = params || {};
            return new Promise((resolve, reject) => {
                tt.showModal({
                    title: params.title || "提示",
                    content: params.content || "内容",
                    confirmText: params.confirmText || "确定",
                    cancelText: params.cancelText || "取消",
                    showCancel: params.showCancel || false,
                    success(res) {
                        if (res.confirm) {
                            resolve(true);
                        } else if (res.cancel) {
                            resolve(false);
                        } else {
                            reject();
                        }
                    },
                    fail(res) {
                        reject();
                    },
                });
            });
        }

        platform.canShareRecorder = function () {
            return platform.recorderTime / 1000 >= 5;
        }

        platform.getRecorderTime = function () {
            if (!window.tt || !platform.recoding) { return 0; }
            if (platform.recorderTime > 0)
                return (Date.now() - platform.recorderTime) / 1000;
            return 0;
        }

        platform.statusBarHeight = function () {
            return platform.systemInfo ? platform.systemInfo.statusBarHeight : 0;
        }

        platform.screenWidth = function () {
            return platform.systemInfo ? platform.systemInfo.screenWidth : 1;
        }

        platform.screenHeight = function () {
            return platform.systemInfo ? platform.systemInfo.screenHeight : 1;
        }

        platform.vibrate = function (params) {
            if (params && params.isLong) {
                tt.vibrateLong({
                    fail: () => {
                        zs.log.debug("Vibrate Long failed");
                    }
                });
            } else {
                tt.vibrateShort({
                    fail: () => {
                        zs.log.debug("vibrate Short failed");
                    }
                });
            }
        }
        platform.isNetValid = function () {
            return true;
        }
        platform.addEventShow = function (params) {
            tt.onShow((result) => {
                params.showHandler && params.showHandler(result);
            });
        }
        platform.addEventHide = function (params) {
            tt.onHide((result) => {
                params.hideHandler && params.hideHandler(result);
            });
        }
        platform.showToast = function (msg) {
            tt.showToast({
                title: msg,
                duration: 2000
            });
        }
        return platform;
    })()

}

window.zs = window.zs || {};
window.zs.platform = window.zs.platform || {};
window.zs.platform.config = window.zs.platform.config || {};

(function (exports) {

    const platformMark = "tt_";
    const channel = "TT";
    const bannerWidth = 600;
    const bannerHeight = 200;

    exports.platformMark = platformMark;
    exports.channel = channel;
    exports.bannerWidth = bannerWidth;
    exports.bannerHeight = bannerHeight;

}(window.zs.platform.config = window.zs.platform.config || {}))

window.zs = window.zs || {};

(function (exports) {
    'use strict';

    class EggKnock {
        static init() {
            this.markGameNum();
            this.markAwardNum();
            this.markReadyNum();
        }
        static markGameNum(autoPlus) {
            let timestamp = zs.utils.getItem(EggKnock.key_game_num_time_stamp);
            if (timestamp == null || timestamp == "" || zs.utils.isToday(Number(timestamp)) == false) {
                zs.utils.setItem(EggKnock.key_game_num_time_stamp, Date.now().toString());
                zs.utils.setItem(EggKnock.key_game_num, "1");
            }
            EggKnock.day_game_num = zs.utils.getItem(EggKnock.key_game_num) || 1;
            if (autoPlus) {
                EggKnock.day_game_num = Number(EggKnock.day_game_num) + 1;
            } else {
                EggKnock.day_game_num = Number(EggKnock.day_game_num);
            }
            zs.utils.setItem(EggKnock.key_game_num, EggKnock.day_game_num.toString());
        }
        static markAwardNum(autoPlus) {
            let timestamp = zs.utils.getItem(EggKnock.key_award_num_time_stamp);
            if (timestamp == null || timestamp == "" || zs.utils.isToday(Number(timestamp)) == false) {
                zs.utils.setItem(EggKnock.key_award_num_time_stamp, Date.now().toString());
                zs.utils.setItem(EggKnock.key_award_num, "1");
            }
            EggKnock.open_award_num = zs.utils.getItem(EggKnock.key_award_num) || 1;
            if (autoPlus) {
                EggKnock.open_award_num = Number(EggKnock.open_award_num) + 1;
            } else {
                EggKnock.open_award_num = Number(EggKnock.open_award_num);
            }
            zs.utils.setItem(EggKnock.key_award_num, EggKnock.open_award_num.toString());
        }
        static markReadyNum(autoPlus) {
            let timestamp = zs.utils.getItem(EggKnock.key_ready_num_time_stamp);
            if (timestamp == null || timestamp == "" || zs.utils.isToday(Number(timestamp)) == false) {
                zs.utils.setItem(EggKnock.key_ready_num_time_stamp, Date.now().toString());
                zs.utils.setItem(EggKnock.key_ready_num, "1");
            }
            EggKnock.open_ready_num = zs.utils.getItem(EggKnock.key_ready_num) || 1;
            if (autoPlus) {
                EggKnock.open_ready_num = Number(EggKnock.open_ready_num) + 1;
            } else {
                EggKnock.open_ready_num = Number(EggKnock.open_ready_num);
            }
            zs.utils.setItem(EggKnock.key_ready_num, EggKnock.open_ready_num.toString());
        }
        static checkEggOpen(isCommon) {
            if (!EggKnock.switch) { return false; }
            let zs_click_award_since = zs.product.get("zs_click_award_since");
            if (zs_click_award_since && zs_click_award_since > 0) {
                if (!EggKnock.day_game_num || Number(EggKnock.day_game_num) < zs_click_award_since) {
                    return false;
                }
            }
            let numClick = isCommon ? zs.product.get("zs_ready_click_num") : zs.product.get("zs_click_award_num");
            if (!numClick || numClick.trim() == "") { return false; }
            numClick = JSON.parse(numClick);
            if (Array.isArray(numClick)) {
                if (numClick.length <= 0) { return false; }
                if (numClick.length == 0 && numClick[0] < 0) { return true; }
                let index = numClick.indexOf(EggKnock.day_game_num);
                if (index >= 0) { return true; }
            } else {
                numClick = parseInt(numClick);
                if (isNaN(numClick)) { return false; }
                if (numClick < 0) { return true; }
                if (numClick > (isCommon ? EggKnock.open_ready_num : EggKnock.open_award_num)) { return true; }
            }
            return false;
        }
    }
    EggKnock.switch = true;
    EggKnock.key_game_num = "day_game_num";
    EggKnock.key_award_num = "open_award_num";
    EggKnock.key_ready_num = "open_ready_num";
    EggKnock.key_award_num_time_stamp = "open_award_num_time_stamp";
    EggKnock.key_ready_num_time_stamp = "open_ready_num_time_stamp";
    EggKnock.key_game_num_time_stamp = "game_num_time_stamp";
    EggKnock.open_award_num = 0;
    EggKnock.open_ready_num = 0;
    EggKnock.day_game_num = 0;

    exports.EggKnock = EggKnock;
}(window.zs = window.zs || {}))
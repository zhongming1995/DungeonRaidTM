window.zs = window.zs || {};
(function (exports, cc) {
    'use strict';

    class Native {
        /**ios层代码的路径 */
        static classPath = "JSBridge";

        /**显示banner */
        static ShowBanner() {
            console.log("zhise_cocos_print:zs.Native.ShowBanner")
            try {
                jsb.reflection.callStaticMethod(this.classPath, 'ShowBanner');
            } catch (e) {
                console.log("ShowBanner");
            }
        }

        /**隐藏banner */
        static HideBanner() {
            console.log("zhise_cocos_print:zs.Native.HideBanner")
            try {
                jsb.reflection.callStaticMethod(this.classPath, 'HideBanner');
            } catch (e) {
                TrackEventTrackEvent
                console.log("HideBanner");
            }
        }

        //#region 视频
        static completedVideoHandler = null;
        static interuptVideoHandler = null;
        static errorVideoHandler = null;

        /**播放视频 */
        static PlayVideo(completedHandler, interuptHandler, errorHandler) {
            console.log("zhise_cocos_print:zs.Native.PlayVideo")
            this.completedVideoHandler = completedHandler;
            this.interuptVideoHandler = interuptHandler;
            this.errorVideoHandler = errorHandler;
            try {
                jsb.reflection.callStaticMethod(this.classPath, 'PlayVideo');
            } catch (e) {
                console.log("zhise_cocos_print:zs.Native 编辑器上默认播放视频成功");
                if (completedHandler) {
                    completedHandler();
                }
                //清空所有回调
                this.completedVideoHandler = this.interuptVideoHandler = this.errorVideoHandler = null;
            }
        }

        /**视频关闭回调 ,sdk会自动调用*/
        static onRewardedVideoAdClose(valid) {
            console.log("zhise_cocos_print:onAdClose," + valid);
            //这里做了个延时 处理 在游戏返回的一瞬间 字体会丢失
            setTimeout(() => {
                if (valid) {
                    this.completedVideoHandler && this.completedVideoHandler();
                } else {
                    this.errorVideoHandler && this.errorVideoHandler();
                }
                this.completedVideoHandler = this.interuptVideoHandler = this.errorVideoHandler = null;
            }, 100);
        }

        /**显示插屏 */
        static interstitialShowFunc = null;
        static interstitialCloseFunc = null;
        static ShowInsertAd() {
            console.log("zhise_laya_print:ShowInsertAd");
            try {
                jsb.reflection.callStaticMethod(this.classPath, 'ShowInterstitial');
            } catch (e) {
                this.log("ShowInterstitial");
            }
        }

        /**有启动时间限制显示插屏 */
        static ShowInsertAdByStartCd() {
            console.log("zhise_laya_print:ShowInsertAdByStartCd");
            try {
                jsb.reflection.callStaticMethod(this.classPath, 'ShowInsertAdByStartCd');
            } catch (e) {
                this.log("ShowInsertAdByStartCd");
            }
        }
        /**有cd时间限制显示插屏 */
        static ShowInsertAdByInterval() {
            console.log("zhise_laya_print:ShowInsertAdByInterval");
            try {
                jsb.reflection.callStaticMethod(this.classPath, 'ShowInsertAdByInterval');
            } catch (e) {
                this.log("ShowInsertAdByInterval");
            }
        }


        /**统计 */
        static TrackEvent(eventName) {
            console.log("zhise_cocos_print")
            try {
                jsb.reflection.callStaticMethod(this.classPath, 'TrackEvent:', eventName);
            } catch (e) {
                console.log("TrackEvent");
            }
        }

        /**tenjin统计 */
        static TenjinTrackEvent(eventName) {
            console.log("TenjinTrackEvent:" + eventName);
            try {
                jsb.reflection.callStaticMethod(this.classPath, 'TenjinTrackEvent:', eventName);
            } catch (e) {
                this.log("TenjinTrackEvent");
            }
        }

        static GetLanguage() {
            console.log("zhise_laya_print:zs.Native.GetLanguage")
            // try {
            //     jsb.reflection.callStaticMethod(this.classPath, 'GetLanguage', '()V');
            // } catch (e) {
            this.onGetLanguage("en");
            // }
        }
        static onGetLanguage(language) {
            console.log("zhise:language=" + language);
            if (language != "ft" && language != "en") {
                language = "en";
            }
            window["LanguageTranslation"]["LanguageMgr"].languageInit = false;
            window["LanguageTranslation"]["LanguageMgr"].init(language);
        }


        /**插屏展示回调 */
        static onInterstitialShow() {
            console.error("插屏展示");
            if (this.interstitialShowFunc) {
                this.interstitialShowFunc();
            }
        }
        /**插屏关闭回调 */
        static onInterstitialClose() {
            console.error("插屏关闭");
            if (this.interstitialCloseFunc) {
                this.interstitialCloseFunc();
            }
        }

        static setInterstitialShowCallBack(func) {
            this.interstitialShowFunc = func;
        }
        static setInterstitialCloseCallBack(func) {
            this.interstitialCloseFunc = func;
        }
        static clearInterstitialCallBack() {
            this.interstitialShowFunc = this.interstitialCloseFunc = null;
        }

        //#endregion
    }
    exports.Native = Native;

})(window.zs = window.zs || {}, cc);
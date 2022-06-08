declare module zs {
    /**
     * APP SDK 接口
     */
    class Native {
        /**
         * 接口初始化，必须在执行其他方法前调用
         */
        public static init();

        public static ShowBanner();

        public static HideBanner();

        public static PlayVideo(completedFunc?: Function, interupFunc?: Function, errFunc?: Function);

        public static ShowInsertAd();
        public static ShowInsertAdByStartCd();
        public static ShowInsertAdByInterval();

        public static TrackEvent(eventName: string);
        public static TenjinTrackEvent(eventName: string);

        public static GetLanguage();

        public static onGetLanguage(language);

        public static setInterstitialShowCallBack(func);

        public static setInterstitialCloseCallBack(func);

        static clearInterstitialCallBack();
    }
}
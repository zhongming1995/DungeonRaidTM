window.zs = window.zs || {};
window.zs.platform = window.zs.platform || {};

if (zs.platform.config == null) {
    window.zs.platform.config = {};

    (function (exports) {

        const platformMark = "tt_";
        const channel = "TT";
        const bannerWidth = 600;
        const bannerHeight = 200;

        exports.channel = channel;
        exports.platformMark = platformMark;
        exports.bannerWidth = bannerWidth;
        exports.bannerHeight = bannerHeight;

    }(window.zs.platform.config = {}))
}

window.zs.proxy = window.zs.proxy || {};

(function (exports) {
    'use strict';

    class Configs { }
    Configs.gameCfgPath = 'config/gameCfg';
    Configs.porductCfgPath = 'config/productCfg';
    Configs.uiCfgPath = "config/uiCfg";
    Configs.FGUI_AlignType_Top = fairygui.VertAlignType.Top;
    Configs.FGUI_AlignType_Middle = fairygui.VertAlignType.Middle;
    Configs.FGUI_AlignType_Bottom = fairygui.VertAlignType.Bottom;
    // cocos 版本的 valign 为 verticalAlign，从laya移植时注意在sdk中修改
    Configs.FGUI_AlignType_Left = fairygui.AlignType.Left;
    Configs.FGUI_AlignType_Center = fairygui.AlignType.Center;
    Configs.FGUI_AlignType_Right = fairygui.AlignType.Right;

    class LocalStorage {
        static getItem(key) {
            return cc.sys.localStorage.getItem(key);
        }

        static setItem(key, value) {
            cc.sys.localStorage.setItem(key, value);
        }
    }

    class Loader {
        static getRes(url) {
            let fguiPack = fairygui.UIPackage.getById(url);
            if (fguiPack) { return fguiPack; }
            let res = cc.resources.get(url);
            if (res instanceof cc.JsonAsset) {
                return res.json;
            }
            return res;
        }
        static loadScene(url, handler) {
            this.load(url, handler);
        }
        static loadScene3D(url, handler) {
            this.load(url, handler);
        }
        static loadSprite3D(url, handler) {
            this.load(url, handler);
        }
        static load(url, handler, ignoreCache) {
            let callback = (err, data) => {
                if (err) {
                    return handler.runWith(null);
                }
                if (data instanceof cc.JsonAsset) {
                    return handler.runWith(data.json);
                }
                return handler.runWith(data);
            };
            if (url.startsWith("http://")
                || url.startsWith("https://")
                || url.startsWith('/')) {
                cc.assetManager.loadRemote(url, callback);
            } else {
                cc.resources.load(url, callback);
            }
        }
    }

    class Tween {
        static to(target, props, duration, ease = null, complete = null, delay = 0) {
            return cc.tween(target).delay(delay / 1000).to(duration * 0.001, props).call(() => {
                complete && complete.run();
            }).start();
        }

        static clearAll(target) {
            cc.tween(target).stop();
        }
    }

    class NativeLoading extends cc.Component {
        constructor() {
            super();
        }
        static preload() {
            return Promise((resolve, reject) => { resolve(); })
        }
        static make() {
            return null;
        }
        init() { }
        updateProgress(value) { }
        run(progress) { }
    }

    class UIScene {
        static get list() {
            return null;
        }
        static init() { }
        static sync(object) { }
        static resetCamera() { }
        static resetLight() { }
        static add(sprite, position, rotationEuler) { }
        static cloneAdd(sprite, position, rotationEuler) { }
        static clear() { }
        static removeAt(index) { }
        static remove(sprite) { }
    }

    class Event {
        static FGUIEvent(thisArg, event) {
            return event.bind(thisArg);
        }
        static FGUIOnClick(obj, thisArg, event) {
            obj.onClick(event, thisArg);
        }
        static FGUIOffClick(obj, thisArg, event) {
            obj.offClick(event, thisArg);
        }
        static FGUIOn(obj, type, thisArg, event) {
            obj.on(type, event, thisArg);
        }
        static FGUIOff(obj, type, thisArg, event) {
            obj.off(type, event, thisArg);
        }
        static FGUIButtonTouchBegin(thisArg) {
            thisArg.on(fairygui.Event.TOUCH_BEGIN, thisArg.onTouchBegin_1, thisArg);
            thisArg.on(fairygui.Event.TOUCH_END, thisArg.onTouchEnd_1, thisArg);
        }
    }
    Event.MOUSE_DOWN = cc.Node.EventType.TOUCH_START;
    Event.MOUSE_MOVE = cc.Node.EventType.TOUCH_MOVE;
    Event.FGUI_CLICK_ITEM = fairygui.Event.CLICK_ITEM;
    Event.FGUI_DRAG_START = fairygui.Event.DRAG_START;
    Event.DRAG_END = fairygui.Event.DRAG_END;

    class Touch {
        static get touchX() {
            return fairygui.GRoot.inst.getTouchPosition().x;
        }
        static get touchY() {
            return fairygui.GRoot.inst.getTouchPosition().y;
        }
    }

    function init() {
    }

    function playSound(url) {
        Loader.load(url, zs.Handler.create(null, (res) => {
            if (res instanceof cc.AudioClip) {
                fairygui.GRoot.inst.playOneShotSound(res);
            }
        }));
    }

    function color(value) {
        let color = cc.color();
        color.fromHEX(value);
        return color;
    }

    function point(x, y) {
        return cc.v2(x, y)
    }

    const FGUITextField = fairygui.GTextField;

    function initFGUIRoot() {
        fairygui.GRoot.create();
        cc.game.addPersistRootNode(fairygui.GRoot.inst.node);
    }

    function loadFGUIPack(url) {
        return new Promise((resolve, reject) => {
            fairygui.UIPackage.loadPackage(url, (err, result) => {
                if (result) {
                    resolve(result);
                } else {
                    resolve(null);
                }
            })
        });
    }

    function setFGUIObjectXY(object, x, y) {
        object.setPosition(x, y);
    }

    function setFGUIExtension(url, type) {
        if (fairygui.UIObjectFactory.extensions[url] == null) {
            fairygui.UIObjectFactory.setExtension(url, type);
        }
    }

    function sortScene(entryInst) { }

    exports.Configs = Configs;
    exports.LocalStorage = LocalStorage;
    exports.Event = Event;
    exports.Touch = Touch;
    exports.Tween = Tween;
    exports.Loader = Loader;
    exports.NativeLoading = NativeLoading;
    exports.UIScene = UIScene;
    exports.init = init;
    exports.playSound = playSound;
    exports.color = color;
    exports.point = point;
    exports.FGUITextField = FGUITextField;
    exports.initFGUIRoot = initFGUIRoot;
    exports.setFGUIObjectXY = setFGUIObjectXY;
    exports.loadFGUIPack = loadFGUIPack;
    exports.setFGUIExtension = setFGUIExtension;
    exports.sortScene = sortScene;
}(window.zs.proxy = window.zs.proxy || {}));
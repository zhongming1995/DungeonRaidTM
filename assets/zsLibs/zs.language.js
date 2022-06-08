window.Language = window.Language || {};
(function (exports) {
    'use strict';
    class LanguageMgr {
        static async init(type) {
            type && (this.languageType = type);
            var url = "config/language";
            await zs.resource.nativeLoad(url).then(e => LanguageMgr.languageJSon = e)
        }
        static getStr(str) {
            if (!this.languageJSon) return str;
            //如果已判断未存在翻译直接返回
            if (this.strJson[str] === "null") {
                return str;
            }
            //如果不存在中文不进行翻译
            if (!new RegExp("[\\u4E00-\\u9FFF]+", "g").test(str)) {
                this.strJson[str] = "null";
                return str;
            }
            //提取字符串中的数字  将数字转化为 xx
            var reg = /[0-9][0-9]*/g;
            var numArr = str.match(reg);
            var newStr = str.replace(reg, "xx");
            //如果翻译表有对应字段直接返回对应字段下对应语言翻译
            if (this.languageJSon[newStr]) {
                //循环数字数组将{对应数字位置}或xx转回数字
                str = this.languageJSon[newStr][this.languageType];
                if (numArr && numArr.length > 0) {
                    for (let i = 0; i < numArr.length; i++) {
                        var reg = new RegExp("[{]" + i + "[}]");
                        if (reg.test(str))
                            str = str.replace(reg, numArr[i]);
                        else
                            str = str.replace("xx", numArr[i]);
                    }
                }
                return str;
            }
            //如果存在翻译结果直接返回翻译结果
            if (this.strJson[str]) {
                return this.strJson[str];
            }
            var haveStr = false;
            //遍历翻译表将匹配到的字符替换为对应语言
            for (var key in this.languageJSon) {
                if (newStr.indexOf(key) != -1) {
                    if (!haveStr) haveStr = str;
                    newStr = newStr.replace(key, this.languageJSon[key][this.languageType]);
                }
            }
            str = newStr;
            //循环数字数组将{对应数字位置}或xx转回数字
            if (numArr && numArr.length > 0) {
                for (let i = 0; i < numArr.length; i++) {
                    var reg = new RegExp("[{]" + i + "[}]");
                    if (reg.test(str))
                        str = str.replace(reg, numArr[i]);
                    else
                        str = str.replace("xx", numArr[i]);
                }
            }
            if (!haveStr) (console.log("不存在翻译", str), this.strJson[str] = "null");
            else (this.strJson[haveStr] = str);
            return str;
        }
        static getUrl(url) {
            if (url && url.indexOf("zh/") != -1) {
                url = url.replace("zh/", this.languageType + "/");
            }
            return url;
        }
    }
    LanguageMgr.strJson = {};
    LanguageMgr.languageType = "en";
    LanguageMgr.languageJSon = null;
    exports.LanguageMgr = LanguageMgr;
}(window.Language = window.Language || {}));
Object.defineProperty(cc.Label.prototype, 'string', {
    set(value) {
        var oldValue = this._string;
        this._string = "" + value;
        this.string !== oldValue && this.setVertsDirty();
        this._checkStringEmpty();
    },
    get() {
        Language && (this._string = Language.LanguageMgr.getStr(this._string));
        return this._string;
    }
});
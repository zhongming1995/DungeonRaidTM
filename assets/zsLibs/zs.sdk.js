window.TDCORE = function () {
    var appid = zs.td.appKey;
    var appName = zs.td.appName;
    var vn = zs.td.versionName || '';
    var vc = zs.td.versionName || '';
    var channel = zs.td.channel;
    var TDRequestUrl = 'https://h5.udrig.com/app/v1';
    if (!window.sessionStorage) {
        window.sessionStorage = {};
        sessionStorage.setItem = function (e, t) {
            sessionStorage[e] = t;
        };
        sessionStorage.getItem = function (e) {
            return sessionStorage[e];
        };
        sessionStorage.removeItem = function (e) {
            if (sessionStorage[e]) {
                delete sessionStorage[e];
            }
        };
    }
    sessionStorage.clear && sessionStorage.clear();
    ! function () {
        "use strict";
        var E = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
            c = function (c) {
                var d, l, r = 0,
                    s = c.document,
                    u = /^(?:text|application)\/javascript/i,
                    p = /^(?:text|application)\/xml/i,
                    f = "application/json",
                    g = "text/html",
                    m = /^\s*$/,
                    v = function e(t) {
                        var o = A({}, t || {});
                        for (d in e.settings) void 0 === o[d] && (o[d] = e.settings[d]);
                        (n = o).global && 0 == v.active++ && S(n), o.crossDomain || (o.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(o.url) && RegExp.$2 != c.location.host);
                        var i = o.dataType,
                            t = /=\?/.test(o.url);
                        if ("jsonp" == i || t) return t || (o.url = P(o.url, "callback=?")), e.JSONP(o);
                        o.url || (o.url = c.location.toString()), D(o);
                        var a, n = o.accepts[i],
                            t = {},
                            r = /^([\w-]+:)\/\//.test(o.url) ? RegExp.$1 : c.location.protocol,
                            s = e.settings.xhr();
                        o.crossDomain || (t["X-Requested-With"] = "XMLHttpRequest"), n && (-1 < (t.Accept = n).indexOf(",") && (n = n.split(",", 2)[0]), s.overrideMimeType && s.overrideMimeType(n)), (o.contentType || o.data && "GET" != o.type.toUpperCase()) && (t["Content-Type"] = o.contentType || "application/x-www-form-urlencoded"), o.headers = A(t, o.headers || {}), s.onreadystatechange = function () {
                            if (4 == s.readyState) {
                                clearTimeout(a);
                                var e, t = !1;
                                if (200 <= s.status && s.status < 300 || 304 == s.status || 0 == s.status && "file:" == r) {
                                    i = i || ((n = s.getResponseHeader("content-type")) && (n == g ? "html" : n == f ? "json" : u.test(n) ? "script" : p.test(n) && "xml") || "text"), e = s.responseText;
                                    try {
                                        "script" == i ? (0, eval)(e) : "xml" == i ? e = s.responseXML : "json" == i && (e = m.test(e) ? null : JSON.parse(e))
                                    } catch (e) {
                                        t = e
                                    }
                                    t ? h(t, "parsererror", s, o) : T(e, s, o)
                                } else h(null, "error", s, o)
                            }
                            var n
                        };
                        t = !("async" in o) || o.async;
                        for (l in s.open(o.type, o.url, t), o.headers) s.setRequestHeader(l, o.headers[l]);
                        return !1 === function (e, t) {
                            var n = t.context;
                            if (!1 === t.beforeSend.call(n, e, t) || !1 === S(t)) return !1;
                            S(t)
                        }(s, o) ? (s.abort(), !1) : (0 < o.timeout && (a = setTimeout(function () {
                            s.onreadystatechange = w, s.abort(), h(null, "timeout", s, o)
                        }, o.timeout)), s.send(o.data || null), s)
                    };

                function S(e) {
                    if (e.global) return !0
                }

                function T(e, t, n) {
                    var o = n.context,
                        i = "success";
                    n.success.call(o, e, i, t), S(n), y(i, t, n)
                }

                function h(e, t, n, o) {
                    var i = o.context;
                    o.error.call(i, n, t, e), S(o), y(t, n, o)
                }

                function y(e, t, n) {
                    var o = n.context;
                    n.complete.call(o, t, e), S(n), (n = n).global && !--v.active && S(n)
                }

                function w() { }

                function P(e, t) {
                    return (e + "&" + t).replace(/[&?]{1,2}/, "?")
                }

                function D(e) {
                    var t, n, o;
                    "object" === E(e.data) && (e.data = (t = e.data, (o = []).add = function (e, t) {
                        this.push(i(e) + "=" + i(t))
                    }, function e(t, n, o, i) {
                        var a = "array" == typeof n;
                        for (var r in n) {
                            var s = n[r];
                            i && (r = o ? i : i + "[" + (a ? "" : r) + "]"), !i && a ? t.add(s.name, s.value) : (o ? "array" == typeof s : "object" === (void 0 === s ? "undefined" : E(s))) ? e(t, s, o, r) : t.add(r, s)
                        }
                    }(o, t, n), o.join("&").replace("%20", "+"))), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = P(e.url, e.data))
                }
                v.active = 0, v.JSONP = function (t) {
                    if (!("type" in t)) return v(t);
                    var n, o = "jsonp" + ++r,
                        e = s.createElement("script"),
                        i = {
                            abort: function () {
                                o in c && (c[o] = w), y("abort", i, t)
                            }
                        },
                        a = s.getElementsByTagName("head")[0] || s.documentElement;
                    return t.error && (e.onerror = function () {
                        i.abort(), t.error()
                    }), c[o] = function (e) {
                        clearTimeout(n), delete c[o], T(e, i, t)
                    }, D(t), e.src = t.url.replace(/=\?/, "=" + o), a.insertBefore(e, a.firstChild), 0 < t.timeout && (n = setTimeout(function () {
                        i.abort(), y("timeout", i, t)
                    }, t.timeout)), i
                }, v.settings = {
                    type: "GET",
                    beforeSend: w,
                    success: w,
                    error: w,
                    complete: w,
                    context: null,
                    global: !0,
                    xhr: function () {
                        return new c.XMLHttpRequest
                    },
                    accepts: {
                        script: "text/javascript, application/javascript",
                        json: f,
                        xml: "application/xml, text/xml",
                        html: g,
                        text: "text/plain"
                    },
                    crossDomain: !1,
                    timeout: 0
                }, v.get = function (e, t) {
                    return v({
                        url: e,
                        success: t
                    })
                }, v.post = function (e, t, n, o) {
                    return "function" == typeof t && (o = o || n, n = t, t = null), v({
                        type: "POST",
                        url: e,
                        data: t,
                        success: n,
                        dataType: o
                    })
                }, v.getJSON = function (e, t) {
                    return v({
                        url: e,
                        success: t,
                        dataType: "json"
                    })
                };
                var i = encodeURIComponent;

                function A(t) {
                    return Array.prototype.slice.call(arguments, 1).forEach(function (e) {
                        for (d in e) void 0 !== e[d] && (t[d] = e[d])
                    }), t
                }
                return {
                    ajax: v
                }
            }(window),
            l = {
                deviceId: "",
                appkey: appid || "",
                appProfile: {
                    versionName: vn || "",
                    versionCode: vc || "",
                    initTime: "",
                    sdkVersion: "H5+APP+v1.0.5",
                    partner: ""
                },
                deviceProfile: {
                    pixel: "",
                    language: navigator.language,
                    timezone: (new Date).getTimezoneOffset() / 60 * -1
                },
                msgs: []
            },
            i = {
                type: 2,
                data: {
                    id: "",
                    start: 0,
                    duration: 0
                }
            },
            o = {},
            u = (new Date).getTime(),
            a = function (e, t, n) {
                e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n
            };

        function t(e, t, n) {
            if (void 0 === t) {
                var o = null;
                if (document.cookie && "" != document.cookie)
                    for (var i = document.cookie.split(";"), a = 0; a < i.length; a++) {
                        var r = i[a];
                        if (r.substring(0, e.length + 1) == e + "=") {
                            o = decodeURIComponent(r.substring(e.length + 1));
                            break
                        }
                    }
                return o
            }
            n = n || {}, null === t && (t = "", n.expires = -1);
            var s = "";
            n.expires && ("number" == typeof n.expires || n.expires.toUTCString) && ("number" == typeof n.expires ? (d = new Date).setTime(d.getTime() + 24 * n.expires * 60 * 60 * 1e3) : d = n.expires, s = "; expires=" + d.toUTCString());
            var c = n.path ? "; path=" + n.path : "",
                d = n.domain ? "; domain=" + n.domain : "",
                n = n.secure ? "; secure" : "";
            document.cookie = [e, "=", encodeURIComponent(t), s, c, d, n].join("")
        }
        o.localStorage = {
            add: function (e, t) {
                this.addLocalStorage(e, t), "sessionId" != e && this.addCookie(e, t)
            },
            get: function (e) {
                var t = this.getLocalStorage(e);
                return t || this._getCookie(e)
            },
            create: function () {
                t("__TD_LOCAL") || (this._addCookie(""), window.localStorage)
            },
            addCookie: function (e, t) {
                if (!window.localStorage) {
                    this.create();
                    var n = this.cookieList();
                    n[e] = t;
                    var o, i = [];
                    for (o in n) i.push(o + "=" + n[o]);
                    this._addCookie(i.join(";"))
                }
            },
            _setCookie: function () {
                this.cookieList();
                t("__TD_LOCAL", "", {
                    expires: 1095,
                    path: "/",
                    domain: location.hostname
                })
            },
            _addCookie: function (e) {
                t("__TD_LOCAL", e, {
                    expires: 1095,
                    path: "/",
                    domain: location.hostname
                })
            },
            _getCookie: function (e) {
                var t = this.cookieList();
                if (t && t[e]) return t[e]
            },
            delCookie: function (e) { },
            cookieList: function () {
                var e = t("__TD_LOCAL");
                return this.format(e)
            },
            addLocalStorage: function (e, t) {
                window.localStorage && ("sessionId" == e && window.sessionStorage ? sessionStorage.setItem("__TD_" + e, t) : localStorage.setItem("__TD_" + e, t))
            },
            delLocalStorage: function (e) {
                window.localStorage && localStorage.removeItem("__TD_" + e)
            },
            getLocalStorage: function (e) {
                if (window.localStorage) return "sessionId" == e && window.sessionStorage ? sessionStorage.getItem("__TD_" + e) : localStorage.getItem("__TD_" + e)
            },
            format: function (e) {
                var t = {};
                if (!e) return t;
                for (var n = e.split(";"), o = n.length, i = 0; i < o; i++) {
                    var a = n[i].split("=");
                    2 == a.length && (t[a[0]] = a[1])
                }
                return t
            }
        }, o.sessionStorage = {
            add: function (e, t) {
                window.sessionStorage && sessionStorage.setItem("__TD_" + e, t)
            },
            get: function (e) {
                return sessionStorage.getItem("__TD_" + e)
            },
            remove: function (e) {
                sessionStorage.removeItem("__TD_" + e)
            }
        };
        var d, r, s, p, n, f = !0,
            g = !1;

        function m() {
            this.url = TDRequestUrl, this.opts = {}, this.requestArray = new Array
        }
        m.prototype = {
            getAjax: function (o, i, a, r, s) {
                (function (e) {
                    var t, n;
                    0 < navigator.userAgent.indexOf("MSIE 9.0") ? "MSIE6.0" == (t = navigator.appVersion.split(";")[1].replace(/[ ]/g, "")) || "MSIE7.0" == t ? alert("no support IE6,IE7") : window.XDomainRequest && ((n = new XDomainRequest) ? (e.error && "function" == typeof e.error && (n.onerror = function () {
                        e.error()
                    }), e.timeout && "function" == typeof e.timeout && (n.ontimeout = function () {
                        e.timeout()
                    }), e.success && "function" == typeof e.success && (n.onload = function () {
                        e.dataType ? "json" == e.dataType.toLowerCase() && e.success(JSON.parse(n.responseText)) : e.success(n.responseText)
                    }), n.open(e.type, e.url), n.send(e.param)) : alert("Failed to create XDomainRequest")) : f ? (v.add("td-unique", "true"), f = !1, d = c.ajax({
                        type: o,
                        url: i,
                        data: JSON.stringify(a),
                        dataType: "text",
                        success: r,
                        error: s,
                        complete: function () {
                            f = !(d = void 0), g && (T.getAjax(), g = !1), v.delLocalStorage("td-unique")
                        }
                    })) : g = !0
                })({
                    url: this.url,
                    type: "POST",
                    param: JSON.stringify(a),
                    success: r
                })
            },
            set: function (e, t, n) {
                this.opts = e, this.send(t, n)
            },
            send: function (e, t) {
                this.getAjax("post", this.url, this.opts, e, t)
            }
        }, (r = window).TDBASE = r.TDBASE || {}, TDBASE.cacheName = "cacheList", TDBASE.unique = function (e) {
            e.sort();
            for (var t = [e[0]], n = 1; n < e.length; n++) e[n] !== t[t.length - 1] && t.push(e[n]);
            return t
        }, TDBASE.getArgs = function () {
            return {};
            // for (var e = new Object, t = r.location.search.substring(1).split("&"), n = 0; n < t.length; n++) {
            //   var o, i = t[n].indexOf("="); - 1 != i && (o = t[n].substring(0, i), i = t[n].substring(i + 1), i = decodeURIComponent(i), e[o] = i)
            // }
            // return e
        }, TDBASE.getCommon = function (e) {
            var t = v.get("appkey") ? v.get("appkey") : l.appkey,
                e = {
                    deviceId: l.deviceId,
                    appkey: t,
                    appProfile: l.appProfile,
                    deviceProfile: l.deviceProfile,
                    msgs: e.msg
                };
            return l.appContext && (e.appContext = l.appContext), e
        }, TDBASE.getCommonMsg = function (e, t, n, o, i, a) {
            return {
                type: 2,
                data: {
                    id: e,
                    start: t,
                    status: n,
                    duration: o || 0,
                    pages: a ? [a] : [],
                    events: i || []
                }
            }
        }, TDBASE.addSessionStart = function (e, t) {
            v.add("lastSession", JSON.stringify({
                id: i.data.id,
                start: i.data.start
            })), n = (n = v.get("td-hold-event")) && JSON.parse(n);
            var n = TDBASE.getCommonMsg(i.data.id, i.data.start, t, e, n);
            TDBASE.addMsg(n), v.delLocalStorage("td-hold-event");
        }, TDBASE.equal = function (e, t) {
            if ((void 0 === e ? "undefined" : E(e)) != (void 0 === t ? "undefined" : E(t))) return !1;
            if (E(e.length) != E(t.length)) return !1;
            var n = !0,
                o = [],
                i = [];
            for (a in e) "count" === a || "start" === a || o.push(a);
            for (a in t) "count" === a || "start" === a || i.push(a);
            if (o.length != i.length) return !1;
            for (var a = 0, r = i.length; a < r; a++) o.push(i[a]);
            for (var s = TDBASE.unique(o), a = 0, r = s.length; a < r; a++) {
                if (!(s[a] in e && s[a] in t)) return !1;
                if ("object" == E(e[s[a]]) && "object" == E(t[s[a]])) n = TDBASE.equal(e[s[a]], t[s[a]]);
                else if (e[s[a]] !== t[s[a]]) return !1
            }
            return n
        }, TDBASE.addGenre = function (e, t, n) {
            if (v.get("sessionMsg")) {
                n && n(e);
                var n = JSON.parse(v.get("sessionMsg")),
                    o = n.msg[n.msg.length - 1].data[t];
                if ("events" !== t) o.push(e), v.add("sessionMsg", JSON.stringify(n));
                else {
                    if (0 != o.length) {
                        for (var i = !1, a = 0; a < o.length; a++)
                            if (TDBASE.equal(o[a], e)) {
                                i = !0, o[a].count += 1, o[a].start = e.start;
                                break
                            } i || o.push(e)
                    } else o.push(e);
                    v.add("sessionMsg", JSON.stringify(n))
                }
            }
        }, TDBASE.lealSet = function (e) {
            v.add("leavetime", e), v.add("leaveSession", parseInt((e - S.get("SessionStart")) / 1e3))
        }, TDBASE.addMsg = function (e) {
            var t;
            v.get("sessionMsg") ? ((t = JSON.parse(v.get("sessionMsg"))).msg.push(e), v.add("sessionMsg", JSON.stringify(t))) : v.add("sessionMsg", JSON.stringify({
                msg: [e]
            }))
        }, (s = {
            autoTrack: !0,
            currentPage: null,
            pageStartTime: 0,
            ref: "",
            logoutCalled: !1,
            init: function () {
                for (var e = document.getElementsByTagName("script"), t = 0; t < e.length; t++) {
                    var n = e[t].getAttribute("td-autoTrack");
                    if ("false" === n || !1 === n) {
                        s.autoTrack = !1;
                        break
                    }
                }
                a(window, "pagehide", s.pageLogout), a(window, "beforeunload", s.pageLogout), window.TDAPP = window.TDAPP || {}, window.TDAPP.onPage = s.onPage, s.autoTrack && (s.currentPage = window.location.href, s.ref = document.referrer)
            },
            onPage: function (e) {
                s.pageLogout("force"), s.ref = s.currentPage, s.currentPage = e, s.pageStartTime = (new Date).getTime()
            },
            pageLogout: function (e) {
                if ("force" !== e) {
                    if (s.logoutCalled) return;
                    s.logoutCalled = !0
                }
                var t = null,
                    n = 0,
                    o = null;
                if (s.autoTrack) t = s.currentPage || window.location.href, n = s.pageStartTime || u, o = s.ref || document.referrer;
                else {
                    if (!s.currentPage) return;
                    t = s.currentPage, n = s.pageStartTime, o = s.ref || document.referrer
                }
                var i = (new Date).getTime();
                TDBASE.lealSet(i), TDBASE.addGenre({
                    name: t,
                    start: n,
                    duration: parseInt((i - n) / 1e3),
                    refer: o
                }, "pages"), "force" === e && T.getAjax()
            }
        }).init(), p = {
            init: function () {
                try {
                    var e = o.localStorage.get("profile");
                    e && (e = JSON.parse(e), e = p._transform(e), l.appContext = l.appContext || {}, l.appContext.account = e)
                } catch (e) {
                    console.error(e)
                }
            },
            _transform: function (e) {
                e = JSON.parse(JSON.stringify(e));
                return e.accountId = e.profileId, e.type = e.profileType, delete e.profileType, delete e.profileId, e
            },
            login: function (e) {
                p._event(e, "login")
            },
            register: function (e) {
                p._event(e, "register")
            },
            _event: function (e, t) {
                var n;
                e.profileId || /0{1}/.test(e.profileId) ? "number" != typeof e.profileType || e.profileType != e.profileType || e.profileType < -1 || 6 < e.profileType && e.profileType < 11 || 20 < e.profileType ? console.warn("请上传正确的profileType") : ((n = p._transform(e)).type = TDAPP.ProfileType[e.profileType] || "", e.profileType = n.type, l.appContext = l.appContext || {}, l.appContext.account = n, h.setProfile(n, t), o.localStorage.add("profile", JSON.stringify(e))) : console.warn("profileId为必填字段！")
            }
        }, window.TDAPP = window.TDAPP || {}, window.TDAPP.login = p.login, window.TDAPP.register = p.register, window.TDAPP.ProfileType = {
            0: "ANONYMOUS",
            1: "REGISTERED",
            2: "SINA_WEIBO",
            3: "QQ",
            4: "QQ_WEIBO",
            5: "ND91",
            6: "WEIXIN",
            11: "TYPE1",
            12: "TYPE2",
            13: "TYPE3",
            14: "TYPE4",
            15: "TYPE5",
            16: "TYPE6",
            17: "TYPE7",
            18: "TYPE8",
            19: "TYPE9",
            20: "TYPE10"
        }, p.init(), n = {
            isObject: function (e) {
                return e && "object" === (void 0 === e ? "undefined" : E(e))
            },
            isStrNotEmpty: function (e) {
                return e || /0{1}/.test(e)
            },
            isNumber: function (e) {
                return "number" == typeof e && e == e
            },
            isCurrencyTypeAvailabal: function (e) {
                return e && "string" == typeof e && 3 === e.length
            },
            _checkParam: function (e) {
                return n.isObject(e) ? n.isStrNotEmpty(e.orderId) ? n.isNumber(e.amount) ? !!n.isCurrencyTypeAvailabal(e.currencyType) || (console.warn("请输入正确的currencyType!"), !1) : (console.warn("请输入正确的amount!"), !1) : (console.warn("请输入正确的orderId!"), !1) : (console.warn("请输入正确的参数!"), !1)
            },
            onPlaceOrder: function (e) {
                n._checkParam(e) && (e = {
                    count: 1,
                    start: (new Date).getTime(),
                    domain: "iap",
                    id: "placeOrder",
                    params: e
                }, h._saveAndFetch(e))
            },
            onOrderPaySucc: function (e) {
                n._checkParam(e) && ((e = JSON.parse(JSON.stringify(e))).paymentType && n.isStrNotEmpty(e.paymentType) && (e.payType = e.paymentType), delete e.paymentType, e = {
                    count: 1,
                    start: (new Date).getTime(),
                    domain: "iap",
                    id: "pay",
                    params: e
                }, h._saveAndFetch(e))
            },
            onCancelOrder: function (e) {
                n._checkParam(e) && (e = {
                    count: 1,
                    start: (new Date).getTime(),
                    domain: "iap",
                    id: "cancelOrder",
                    params: e
                }, h._saveAndFetch(e))
            }
        }, window.TDAPP = window.TDAPP || {}, window.TDAPP.onPlaceOrder = n.onPlaceOrder, window.TDAPP.onOrderPaySucc = n.onOrderPaySucc, window.TDAPP.onCancelOrder = n.onCancelOrder;
        var v = o.localStorage,
            S = o.sessionStorage,
            T = {
                timedif: void 0,
                state: 1,
                deviceId: 0,
                sessionId: 0,
                local: [],
                sendInit: 0,
                set: function () {
                    try {
                        this.setDeviceId(), this.setSession(), this.setSessionTime(), this.setInitTime(), this.setPartner(), this.setResolution(), this.addlastSession(), this.getAjax(1)
                    } catch (e) {
                        console.log(e)
                    }
                },
                setDeviceId: function () {
                    var channelId = (channel ? channel.toUpperCase() : "ZS");
                    if (v.get("deviceId")) this.deviceId = v.get("deviceId") + "-" + channelId;
                    else {
                        this.sendInit = 1;
                        for (var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), t = [], n = e.length, o = 0; o < 16; o++) t[o] = e[0 | Math.random() * n];
                        this.deviceId = t.join(""), v.add("deviceId", this.deviceId), this.deviceId = this.deviceId + "-" + channelId;
                    }
                    l.deviceId = this.deviceId
                },
                setSession: function () {
                    var e, t;
                    if (S.get("sessionId") && v.get("appkey") == l.appkey ? t = S.get("sessionId") : (e = (new Date).getTime(), t = -1 < this.deviceId.indexOf("-") ? this.deviceId.split("-")[0] + e : this.deviceId + e, this.sendInit = 0 == this.sendInit ? 2 : this.sendInit, S.add("sessionId", t)), 0 < 32 - t.length)
                        for (var n = 0, o = 32 - t.length; n < o; n++) t += "0";
                    32 - t.length < 0 && (t = t.substring(0, 32)), i.data.id = this.sessionId = t
                },
                setSessionTime: function () {
                    var e = (new Date).getTime();
                    S.get("SessionStart") && v.get("appkey") == l.appkey ? e = S.get("SessionStart") : S.add("SessionStart", e), i.data.start = parseInt(e)
                },
                setInitTime: function () {
                    v.get("initTime") ? l.appProfile.initTime = parseInt(v.get("initTime")) : (l.appProfile.initTime = u, v.add("initTime", u))
                },
                setPartner: function () {
                    var e = S.get("td_channel"),
                        t = channel;
                    if (appName && appName != '') {
                        t += "-" + appName;
                    }
                    // t = TDBASE.getArgs().td_channelid;
                    e ? l.appProfile.partner = e : null != t && (S.add("td_channel", t), l.appProfile.partner = t)
                },
                setResolution: function () {
                    var e = [window.screen.width, window.screen.height];
                    window.devicePixelRatio && e.push(window.devicePixelRatio), l.deviceProfile.pixel = e.join("*")
                },
                addlastSession: function () {
                    var e = v.get("lastSession");
                    void 0 === e && (v.delLocalStorage("sessionMsg"), v.delLocalStorage("lastSession")), e ? (e = JSON.parse(e)).id != i.data.id && (e = TDBASE.getCommonMsg(e.id, e.start, 3, parseInt(v.get("leaveSession"))), TDBASE.addMsg(e), this.timedif = parseInt((i.data.start - v.get("leavetime")) / 1e3), v.get("appkey") && v.get("appkey") != l.appkey || (TDBASE.addSessionStart(this.timedif, 1), this.addAppInitEvent())) : (TDBASE.addSessionStart(0, 1), this.addAppInitEvent())
                },
                addAppInitEvent: function () {
                    var e;
                    0 != this.sendInit && (e = {
                        id: "init",
                        domain: "app",
                        start: u || (new Date).getTime(),
                        count: 1,
                        params: {
                            first: !0
                        }
                    }, 2 == this.sendInit && (e.params.first = !1), TDBASE.addGenre(e, "events"))
                },
                checkSession: function () {
                    var data = JSON.parse(v.get("sessionMsg"));
                    let eventExist = false;
                    for (let i = 0, n = data.msg.length; i < n; i++) {
                        if (data.msg[i].data.events.length > 0) {
                            eventExist = true;
                            break;
                        }
                    }
                    if (eventExist) {
                        setTimeout(function () {
                            T.getAjax()
                        }, 500)
                    }
                },
                getAjax: function (e) {
                    var t = this,
                        n = new m;
                    localStorage.getItem("__TD_sessionMsg") || TDBASE.addSessionStart(0, 2);
                    var o, i = JSON.parse(v.get("sessionMsg")),
                        a = TDBASE.getCommon(i),
                        r = localStorage.getItem("__TD_td-init-event");
                    !r || (o = a.msgs[a.msgs.length - 1]) && (i = o.data.events, o.data.events = i.concat(JSON.parse(r))), v.delLocalStorage("td-init-event");
                    for (var s = [], c = 0; c < a.msgs.length; c++) {
                        var d = a.msgs[c];
                        (2 !== d.data.status || d.data.pages && 0 !== d.data.pages.length || d.data.events && 0 !== d.data.events.length) && s.push(d)
                    }
                    0 !== s.length && (a.msgs = s, v.get("appkey") ? v.get("appkey") != l.appkey ? n.set(a, function (e) {
                        console.log("td reported!");
                        v.delLocalStorage("sessionMsg"), l.appProfile.initTime = u, v.add("initTime", u), TDBASE.addSessionStart(0, 1), t.addAppInitEvent(), t.getAjax()
                    }, function (e) {
                        console.log(e)
                    }) : n.set(a, function (e) {
                        console.log("td reported!");
                        v.delLocalStorage("sessionMsg"), TDBASE.addSessionStart(0, 2), T.checkSession()
                    }, function (e) {
                        console.log(e)
                    }) : n.set(a, function (e) {
                        console.log("td reported!");
                        v.delLocalStorage("sessionMsg"), TDBASE.addSessionStart(0, 2), T.checkSession()
                    }, function (e) {
                        console.log(e)
                    }), v.add("appkey", l.appkey))
                }
            };
        T.set();
        var h = {
            set: function (e, t, n, o) {
                console.log("td report:", e);
                var i;
                if (e || /0{1}/.test(e)) {
                    if (0 < arguments.length) try {
                        var a = {
                            count: 1,
                            start: (new Date).getTime()
                        };
                        if (null != e && (a.id = "string" != typeof e ? JSON.stringify(e) : e), a.label = null != t ? "string" != typeof t ? JSON.stringify(t) : t : "", null != n && ("object" != (void 0 === (i = n) ? "undefined" : E(i)) || "[object object]" != Object.prototype.toString.call(i).toLowerCase() || i.length || (a.params = n)), o && "smart" === o) a.type = "smart";
                        else if (void 0 !== o) {
                            if ("number" != typeof o || isNaN(o)) return void console.error("value只能为number");
                            a.value = o
                        }
                        h._saveAndFetch(a)
                    } catch (e) { }
                } else console.warn("event  Id为必填字段！")
            },
            setProfile: function (e, t) {
                e = {
                    count: 1,
                    start: (new Date).getTime(),
                    domain: "account",
                    id: t,
                    params: e
                };
                h._saveAndFetch(e)
            },
            _saveAndFetch: function (e) {
                d ? TDBASE.addGenre(e, "events", function (e) {
                    var t = v.get("td-hold-event"),
                        n = [];
                    if (n.push(e), t) {
                        t = JSON.parse(t);
                        for (var o = 0; o < t.length; o++)
                            if (TDBASE.equal(t[o], e)) {
                                t[o].count += 1, t[o].start = e.start;
                                break
                            } v.add("td-hold-event", JSON.stringify(t))
                    } else v.add("td-hold-event", JSON.stringify(n))
                }) : (TDBASE.addGenre(e, "events"), setTimeout(function () {
                    T.getAjax()
                }, 500))
            },
            unload: function () {
                try {
                    T.getAjax()
                } catch (e) { }
            }
        };
        window.TDAPP = window.TDAPP || {}, window.TDAPP.onEvent = h.set
    }();
}/*globals window, global, require*/

/**
 * CryptoJS core components.
 */
var CryptoJS = CryptoJS || (function (Math, undefined) {

    var crypto;

    /*
     * Cryptographically secure pseudorandom number generator
     *
     * As Math.random() is cryptographically not safe to use
     */
    var cryptoSecureRandomInt = function () {
        if (crypto) {
            // Use getRandomValues method (Browser)
            if (typeof crypto.getRandomValues === 'function') {
                try {
                    return crypto.getRandomValues(new Uint32Array(1))[0];
                } catch (err) { }
            }

            // Use randomBytes method (NodeJS)
            if (typeof crypto.randomBytes === 'function') {
                try {
                    return crypto.randomBytes(4).readInt32LE();
                } catch (err) { }
            }
        }

        throw new Error('Native crypto module could not be used to get secure random number.');
    };

    /*
     * Local polyfill of Object.create
 
     */
    var create = Object.create || (function () {
        function F() { }

        return function (obj) {
            var subtype;

            F.prototype = obj;

            subtype = new F();

            F.prototype = null;

            return subtype;
        };
    }())

    /**
     * CryptoJS namespace.
     */
    var C = {};

    /**
     * Library namespace.
     */
    var C_lib = C.lib = {};

    /**
     * Base object for prototypal inheritance.
     */
    var Base = C_lib.Base = (function () {


        return {
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function (overrides) {
                // Spawn
                var subtype = create(this);

                // Augment
                if (overrides) {
                    subtype.mixIn(overrides);
                }

                // Create default initializer
                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
                    subtype.init = function () {
                        subtype.$super.init.apply(this, arguments);
                    };
                }

                // Initializer's prototype is the subtype object
                subtype.init.prototype = subtype;

                // Reference supertype
                subtype.$super = this;

                return subtype;
            },

            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function () {
                var instance = this.extend();
                instance.init.apply(instance, arguments);

                return instance;
            },

            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function () {
            },

            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function (properties) {
                for (var propertyName in properties) {
                    if (properties.hasOwnProperty(propertyName)) {
                        this[propertyName] = properties[propertyName];
                    }
                }

                // IE won't copy toString using the loop above
                if (properties.hasOwnProperty('toString')) {
                    this.toString = properties.toString;
                }
            },

            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function () {
                return this.init.prototype.extend(this);
            }
        };
    }());

    /**
     * An array of 32-bit words.
     *
     * @property {Array} words The array of 32-bit words.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
    var WordArray = C_lib.WordArray = Base.extend({
        /**
         * Initializes a newly created word array.
         *
         * @param {Array} words (Optional) An array of 32-bit words.
         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
         *
         * @example
         *
         *     var wordArray = CryptoJS.lib.WordArray.create();
         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
         */
        init: function (words, sigBytes) {
            words = this.words = words || [];

            if (sigBytes != undefined) {
                this.sigBytes = sigBytes;
            } else {
                this.sigBytes = words.length * 4;
            }
        },

        /**
         * Converts this word array to a string.
         *
         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
         *
         * @return {string} The stringified word array.
         *
         * @example
         *
         *     var string = wordArray + '';
         *     var string = wordArray.toString();
         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
         */
        toString: function (encoder) {
            return (encoder || Hex).stringify(this);
        },

        /**
         * Concatenates a word array to this word array.
         *
         * @param {WordArray} wordArray The word array to append.
         *
         * @return {WordArray} This word array.
         *
         * @example
         *
         *     wordArray1.concat(wordArray2);
         */
        concat: function (wordArray) {
            // Shortcuts
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;

            // Clamp excess bits
            this.clamp();

            // Concat
            if (thisSigBytes % 4) {
                // Copy one byte at a time
                for (var i = 0; i < thatSigBytes; i++) {
                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
                }
            } else {
                // Copy one word at a time
                for (var i = 0; i < thatSigBytes; i += 4) {
                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
                }
            }
            this.sigBytes += thatSigBytes;

            // Chainable
            return this;
        },

        /**
         * Removes insignificant bits.
         *
         * @example
         *
         *     wordArray.clamp();
         */
        clamp: function () {
            // Shortcuts
            var words = this.words;
            var sigBytes = this.sigBytes;

            // Clamp
            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
            words.length = Math.ceil(sigBytes / 4);
        },

        /**
         * Creates a copy of this word array.
         *
         * @return {WordArray} The clone.
         *
         * @example
         *
         *     var clone = wordArray.clone();
         */
        clone: function () {
            var clone = Base.clone.call(this);
            clone.words = this.words.slice(0);

            return clone;
        },

        /**
         * Creates a word array filled with random bytes.
         *
         * @param {number} nBytes The number of random bytes to generate.
         *
         * @return {WordArray} The random word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.lib.WordArray.random(16);
         */
        random: function (nBytes) {
            var words = [];

            for (var i = 0; i < nBytes; i += 4) {
                words.push(cryptoSecureRandomInt());
            }

            return new WordArray.init(words, nBytes);
        }
    });

    /**
     * Encoder namespace.
     */
    var C_enc = C.enc = {};

    /**
     * Hex encoding strategy.
     */
    var Hex = C_enc.Hex = {
        /**
         * Converts a word array to a hex string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The hex string.
         *
         * @static
         *
         * @example
         *
         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
         */
        stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;

            // Convert
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 0x0f).toString(16));
            }

            return hexChars.join('');
        },

        /**
         * Converts a hex string to a word array.
         *
         * @param {string} hexStr The hex string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
         */
        parse: function (hexStr) {
            // Shortcut
            var hexStrLength = hexStr.length;

            // Convert
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
            }

            return new WordArray.init(words, hexStrLength / 2);
        }
    };

    /**
     * Latin1 encoding strategy.
     */
    var Latin1 = C_enc.Latin1 = {
        /**
         * Converts a word array to a Latin1 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The Latin1 string.
         *
         * @static
         *
         * @example
         *
         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
         */
        stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;

            // Convert
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                latin1Chars.push(String.fromCharCode(bite));
            }

            return latin1Chars.join('');
        },

        /**
         * Converts a Latin1 string to a word array.
         *
         * @param {string} latin1Str The Latin1 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
         */
        parse: function (latin1Str) {
            // Shortcut
            var latin1StrLength = latin1Str.length;

            // Convert
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
            }

            return new WordArray.init(words, latin1StrLength);
        }
    };

    /**
     * UTF-8 encoding strategy.
     */
    var Utf8 = C_enc.Utf8 = {
        /**
         * Converts a word array to a UTF-8 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The UTF-8 string.
         *
         * @static
         *
         * @example
         *
         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
         */
        stringify: function (wordArray) {
            try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
                throw new Error('Malformed UTF-8 data');
            }
        },

        /**
         * Converts a UTF-8 string to a word array.
         *
         * @param {string} utf8Str The UTF-8 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
         */
        parse: function (utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
        }
    };

    /**
     * Abstract buffered block algorithm template.
     *
     * The property blockSize must be implemented in a concrete subtype.
     *
     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
     */
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
        /**
         * Resets this block algorithm's data buffer to its initial state.
         *
         * @example
         *
         *     bufferedBlockAlgorithm.reset();
         */
        reset: function () {
            // Initial values
            this._data = new WordArray.init();
            this._nDataBytes = 0;
        },

        /**
         * Adds new data to this block algorithm's buffer.
         *
         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
         *
         * @example
         *
         *     bufferedBlockAlgorithm._append('data');
         *     bufferedBlockAlgorithm._append(wordArray);
         */
        _append: function (data) {
            // Convert string to WordArray, else assume WordArray already
            if (typeof data == 'string') {
                data = Utf8.parse(data);
            }

            // Append
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
        },

        /**
         * Processes available data blocks.
         *
         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
         *
         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
         *
         * @return {WordArray} The processed data.
         *
         * @example
         *
         *     var processedData = bufferedBlockAlgorithm._process();
         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
         */
        _process: function (doFlush) {
            var processedWords;

            // Shortcuts
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;

            // Count blocks ready
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
                // Round up to include partial blocks
                nBlocksReady = Math.ceil(nBlocksReady);
            } else {
                // Round down to include only full blocks,
                // less the number of blocks that must remain in the buffer
                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }

            // Count words ready
            var nWordsReady = nBlocksReady * blockSize;

            // Count bytes ready
            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

            // Process blocks
            if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                    // Perform concrete-algorithm logic
                    this._doProcessBlock(dataWords, offset);
                }

                // Remove processed words
                processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
            }

            // Return processed words
            return new WordArray.init(processedWords, nBytesReady);
        },

        /**
         * Creates a copy of this object.
         *
         * @return {Object} The clone.
         *
         * @example
         *
         *     var clone = bufferedBlockAlgorithm.clone();
         */
        clone: function () {
            var clone = Base.clone.call(this);
            clone._data = this._data.clone();

            return clone;
        },

        _minBufferSize: 0
    });

    /**
     * Abstract hasher template.
     *
     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
     */
    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
        /**
         * Configuration options.
         */
        cfg: Base.extend(),

        /**
         * Initializes a newly created hasher.
         *
         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
         *
         * @example
         *
         *     var hasher = CryptoJS.algo.SHA256.create();
         */
        init: function (cfg) {
            // Apply config defaults
            this.cfg = this.cfg.extend(cfg);

            // Set initial values
            this.reset();
        },

        /**
         * Resets this hasher to its initial state.
         *
         * @example
         *
         *     hasher.reset();
         */
        reset: function () {
            // Reset data buffer
            BufferedBlockAlgorithm.reset.call(this);

            // Perform concrete-hasher logic
            this._doReset();
        },

        /**
         * Updates this hasher with a message.
         *
         * @param {WordArray|string} messageUpdate The message to append.
         *
         * @return {Hasher} This hasher.
         *
         * @example
         *
         *     hasher.update('message');
         *     hasher.update(wordArray);
         */
        update: function (messageUpdate) {
            // Append
            this._append(messageUpdate);

            // Update the hash
            this._process();

            // Chainable
            return this;
        },

        /**
         * Finalizes the hash computation.
         * Note that the finalize operation is effectively a destructive, read-once operation.
         *
         * @param {WordArray|string} messageUpdate (Optional) A final message update.
         *
         * @return {WordArray} The hash.
         *
         * @example
         *
         *     var hash = hasher.finalize();
         *     var hash = hasher.finalize('message');
         *     var hash = hasher.finalize(wordArray);
         */
        finalize: function (messageUpdate) {
            // Final message update
            if (messageUpdate) {
                this._append(messageUpdate);
            }

            // Perform concrete-hasher logic
            var hash = this._doFinalize();

            return hash;
        },

        blockSize: 512 / 32,

        /**
         * Creates a shortcut function to a hasher's object interface.
         *
         * @param {Hasher} hasher The hasher to create a helper for.
         *
         * @return {Function} The shortcut function.
         *
         * @static
         *
         * @example
         *
         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
         */
        _createHelper: function (hasher) {
            return function (message, cfg) {
                return new hasher.init(cfg).finalize(message);
            };
        },

        /**
         * Creates a shortcut function to the HMAC's object interface.
         *
         * @param {Hasher} hasher The hasher to use in this HMAC helper.
         *
         * @return {Function} The shortcut function.
         *
         * @static
         *
         * @example
         *
         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
         */
        _createHmacHelper: function (hasher) {
            return function (message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
        }
    });

    /**
     * Algorithm namespace.
     */
    var C_algo = C.algo = {};

    return C;
}(Math));


(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * Base64 encoding strategy.
     */
    var Base64 = C_enc.Base64 = {
        /**
         * Converts a word array to a Base64 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The Base64 string.
         *
         * @static
         *
         * @example
         *
         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
         */
        stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;

            // Clamp excess bits
            wordArray.clamp();

            // Convert
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
                }
            }

            // Add padding
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                while (base64Chars.length % 4) {
                    base64Chars.push(paddingChar);
                }
            }

            return base64Chars.join('');
        },

        /**
         * Converts a Base64 string to a word array.
         *
         * @param {string} base64Str The Base64 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
         */
        parse: function (base64Str) {
            // Shortcuts
            var base64StrLength = base64Str.length;
            var map = this._map;
            var reverseMap = this._reverseMap;

            if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                    reverseMap[map.charCodeAt(j)] = j;
                }
            }

            // Ignore padding
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                    base64StrLength = paddingIndex;
                }
            }

            // Convert
            return parseLoop(base64Str, base64StrLength, reverseMap);

        },

        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    };

    function parseLoop(base64Str, base64StrLength, reverseMap) {
        var words = [];
        var nBytes = 0;
        for (var i = 0; i < base64StrLength; i++) {
            if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
                nBytes++;
            }
        }
        return WordArray.create(words, nBytes);
    }
}());


(function (Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Constants table
    var T = [];

    // Compute constants
    (function () {
        for (var i = 0; i < 64; i++) {
            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
        }
    }());

    /**
     * MD5 hash algorithm.
     */
    var MD5 = C_algo.MD5 = Hasher.extend({
        _doReset: function () {
            this._hash = new WordArray.init([
                0x67452301, 0xefcdab89,
                0x98badcfe, 0x10325476
            ]);
        },

        _doProcessBlock: function (M, offset) {
            // Swap endian
            for (var i = 0; i < 16; i++) {
                // Shortcuts
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];

                M[offset_i] = (
                    (((M_offset_i << 8) | (M_offset_i >>> 24)) & 0x00ff00ff) |
                    (((M_offset_i << 24) | (M_offset_i >>> 8)) & 0xff00ff00)
                );
            }

            // Shortcuts
            var H = this._hash.words;

            var M_offset_0 = M[offset + 0];
            var M_offset_1 = M[offset + 1];
            var M_offset_2 = M[offset + 2];
            var M_offset_3 = M[offset + 3];
            var M_offset_4 = M[offset + 4];
            var M_offset_5 = M[offset + 5];
            var M_offset_6 = M[offset + 6];
            var M_offset_7 = M[offset + 7];
            var M_offset_8 = M[offset + 8];
            var M_offset_9 = M[offset + 9];
            var M_offset_10 = M[offset + 10];
            var M_offset_11 = M[offset + 11];
            var M_offset_12 = M[offset + 12];
            var M_offset_13 = M[offset + 13];
            var M_offset_14 = M[offset + 14];
            var M_offset_15 = M[offset + 15];

            // Working varialbes
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];

            // Computation
            a = FF(a, b, c, d, M_offset_0, 7, T[0]);
            d = FF(d, a, b, c, M_offset_1, 12, T[1]);
            c = FF(c, d, a, b, M_offset_2, 17, T[2]);
            b = FF(b, c, d, a, M_offset_3, 22, T[3]);
            a = FF(a, b, c, d, M_offset_4, 7, T[4]);
            d = FF(d, a, b, c, M_offset_5, 12, T[5]);
            c = FF(c, d, a, b, M_offset_6, 17, T[6]);
            b = FF(b, c, d, a, M_offset_7, 22, T[7]);
            a = FF(a, b, c, d, M_offset_8, 7, T[8]);
            d = FF(d, a, b, c, M_offset_9, 12, T[9]);
            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
            a = FF(a, b, c, d, M_offset_12, 7, T[12]);
            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

            a = GG(a, b, c, d, M_offset_1, 5, T[16]);
            d = GG(d, a, b, c, M_offset_6, 9, T[17]);
            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
            b = GG(b, c, d, a, M_offset_0, 20, T[19]);
            a = GG(a, b, c, d, M_offset_5, 5, T[20]);
            d = GG(d, a, b, c, M_offset_10, 9, T[21]);
            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
            b = GG(b, c, d, a, M_offset_4, 20, T[23]);
            a = GG(a, b, c, d, M_offset_9, 5, T[24]);
            d = GG(d, a, b, c, M_offset_14, 9, T[25]);
            c = GG(c, d, a, b, M_offset_3, 14, T[26]);
            b = GG(b, c, d, a, M_offset_8, 20, T[27]);
            a = GG(a, b, c, d, M_offset_13, 5, T[28]);
            d = GG(d, a, b, c, M_offset_2, 9, T[29]);
            c = GG(c, d, a, b, M_offset_7, 14, T[30]);
            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

            a = HH(a, b, c, d, M_offset_5, 4, T[32]);
            d = HH(d, a, b, c, M_offset_8, 11, T[33]);
            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
            a = HH(a, b, c, d, M_offset_1, 4, T[36]);
            d = HH(d, a, b, c, M_offset_4, 11, T[37]);
            c = HH(c, d, a, b, M_offset_7, 16, T[38]);
            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
            a = HH(a, b, c, d, M_offset_13, 4, T[40]);
            d = HH(d, a, b, c, M_offset_0, 11, T[41]);
            c = HH(c, d, a, b, M_offset_3, 16, T[42]);
            b = HH(b, c, d, a, M_offset_6, 23, T[43]);
            a = HH(a, b, c, d, M_offset_9, 4, T[44]);
            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
            b = HH(b, c, d, a, M_offset_2, 23, T[47]);

            a = II(a, b, c, d, M_offset_0, 6, T[48]);
            d = II(d, a, b, c, M_offset_7, 10, T[49]);
            c = II(c, d, a, b, M_offset_14, 15, T[50]);
            b = II(b, c, d, a, M_offset_5, 21, T[51]);
            a = II(a, b, c, d, M_offset_12, 6, T[52]);
            d = II(d, a, b, c, M_offset_3, 10, T[53]);
            c = II(c, d, a, b, M_offset_10, 15, T[54]);
            b = II(b, c, d, a, M_offset_1, 21, T[55]);
            a = II(a, b, c, d, M_offset_8, 6, T[56]);
            d = II(d, a, b, c, M_offset_15, 10, T[57]);
            c = II(c, d, a, b, M_offset_6, 15, T[58]);
            b = II(b, c, d, a, M_offset_13, 21, T[59]);
            a = II(a, b, c, d, M_offset_4, 6, T[60]);
            d = II(d, a, b, c, M_offset_11, 10, T[61]);
            c = II(c, d, a, b, M_offset_2, 15, T[62]);
            b = II(b, c, d, a, M_offset_9, 21, T[63]);

            // Intermediate hash value
            H[0] = (H[0] + a) | 0;
            H[1] = (H[1] + b) | 0;
            H[2] = (H[2] + c) | 0;
            H[3] = (H[3] + d) | 0;
        },

        _doFinalize: function () {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            // Add padding
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
            var nBitsTotalL = nBitsTotal;
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
                (((nBitsTotalH << 8) | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8)) & 0xff00ff00)
            );
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
                (((nBitsTotalL << 8) | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8)) & 0xff00ff00)
            );

            data.sigBytes = (dataWords.length + 1) * 4;

            // Hash final blocks
            this._process();

            // Shortcuts
            var hash = this._hash;
            var H = hash.words;

            // Swap endian
            for (var i = 0; i < 4; i++) {
                // Shortcut
                var H_i = H[i];

                H[i] = (((H_i << 8) | (H_i >>> 24)) & 0x00ff00ff) |
                    (((H_i << 24) | (H_i >>> 8)) & 0xff00ff00);
            }

            // Return final computed hash
            return hash;
        },

        clone: function () {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();

            return clone;
        }
    });

    function FF(a, b, c, d, x, s, t) {
        var n = a + ((b & c) | (~b & d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    function GG(a, b, c, d, x, s, t) {
        var n = a + ((b & d) | (c & ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    function HH(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    function II(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.MD5('message');
     *     var hash = CryptoJS.MD5(wordArray);
     */
    C.MD5 = Hasher._createHelper(MD5);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacMD5(message, key);
     */
    C.HmacMD5 = Hasher._createHmacHelper(MD5);
}(Math));


(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Reusable object
    var W = [];

    /**
     * SHA-1 hash algorithm.
     */
    var SHA1 = C_algo.SHA1 = Hasher.extend({
        _doReset: function () {
            this._hash = new WordArray.init([
                0x67452301, 0xefcdab89,
                0x98badcfe, 0x10325476,
                0xc3d2e1f0
            ]);
        },

        _doProcessBlock: function (M, offset) {
            // Shortcut
            var H = this._hash.words;

            // Working variables
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];

            // Computation
            for (var i = 0; i < 80; i++) {
                if (i < 16) {
                    W[i] = M[offset + i] | 0;
                } else {
                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                    W[i] = (n << 1) | (n >>> 31);
                }

                var t = ((a << 5) | (a >>> 27)) + e + W[i];
                if (i < 20) {
                    t += ((b & c) | (~b & d)) + 0x5a827999;
                } else if (i < 40) {
                    t += (b ^ c ^ d) + 0x6ed9eba1;
                } else if (i < 60) {
                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
                } else /* if (i < 80) */ {
                    t += (b ^ c ^ d) - 0x359d3e2a;
                }

                e = d;
                d = c;
                c = (b << 30) | (b >>> 2);
                b = a;
                a = t;
            }

            // Intermediate hash value
            H[0] = (H[0] + a) | 0;
            H[1] = (H[1] + b) | 0;
            H[2] = (H[2] + c) | 0;
            H[3] = (H[3] + d) | 0;
            H[4] = (H[4] + e) | 0;
        },

        _doFinalize: function () {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            // Add padding
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;

            // Hash final blocks
            this._process();

            // Return final computed hash
            return this._hash;
        },

        clone: function () {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();

            return clone;
        }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA1('message');
     *     var hash = CryptoJS.SHA1(wordArray);
     */
    C.SHA1 = Hasher._createHelper(SHA1);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA1(message, key);
     */
    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
}());


(function (Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Initialization and round constants tables
    var H = [];
    var K = [];

    // Compute constants
    (function () {
        function isPrime(n) {
            var sqrtN = Math.sqrt(n);
            for (var factor = 2; factor <= sqrtN; factor++) {
                if (!(n % factor)) {
                    return false;
                }
            }

            return true;
        }

        function getFractionalBits(n) {
            return ((n - (n | 0)) * 0x100000000) | 0;
        }

        var n = 2;
        var nPrime = 0;
        while (nPrime < 64) {
            if (isPrime(n)) {
                if (nPrime < 8) {
                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
                }
                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

                nPrime++;
            }

            n++;
        }
    }());

    // Reusable object
    var W = [];

    /**
     * SHA-256 hash algorithm.
     */
    var SHA256 = C_algo.SHA256 = Hasher.extend({
        _doReset: function () {
            this._hash = new WordArray.init(H.slice(0));
        },

        _doProcessBlock: function (M, offset) {
            // Shortcut
            var H = this._hash.words;

            // Working variables
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            var f = H[5];
            var g = H[6];
            var h = H[7];

            // Computation
            for (var i = 0; i < 64; i++) {
                if (i < 16) {
                    W[i] = M[offset + i] | 0;
                } else {
                    var gamma0x = W[i - 15];
                    var gamma0 = ((gamma0x << 25) | (gamma0x >>> 7)) ^
                        ((gamma0x << 14) | (gamma0x >>> 18)) ^
                        (gamma0x >>> 3);

                    var gamma1x = W[i - 2];
                    var gamma1 = ((gamma1x << 15) | (gamma1x >>> 17)) ^
                        ((gamma1x << 13) | (gamma1x >>> 19)) ^
                        (gamma1x >>> 10);

                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                }

                var ch = (e & f) ^ (~e & g);
                var maj = (a & b) ^ (a & c) ^ (b & c);

                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7) | (e >>> 25));

                var t1 = h + sigma1 + ch + K[i] + W[i];
                var t2 = sigma0 + maj;

                h = g;
                g = f;
                f = e;
                e = (d + t1) | 0;
                d = c;
                c = b;
                b = a;
                a = (t1 + t2) | 0;
            }

            // Intermediate hash value
            H[0] = (H[0] + a) | 0;
            H[1] = (H[1] + b) | 0;
            H[2] = (H[2] + c) | 0;
            H[3] = (H[3] + d) | 0;
            H[4] = (H[4] + e) | 0;
            H[5] = (H[5] + f) | 0;
            H[6] = (H[6] + g) | 0;
            H[7] = (H[7] + h) | 0;
        },

        _doFinalize: function () {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            // Add padding
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;

            // Hash final blocks
            this._process();

            // Return final computed hash
            return this._hash;
        },

        clone: function () {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();

            return clone;
        }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA256('message');
     *     var hash = CryptoJS.SHA256(wordArray);
     */
    C.SHA256 = Hasher._createHelper(SHA256);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA256(message, key);
     */
    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
}(Math));


(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * UTF-16 BE encoding strategy.
     */
    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
        /**
         * Converts a word array to a UTF-16 BE string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The UTF-16 BE string.
         *
         * @static
         *
         * @example
         *
         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
         */
        stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;

            // Convert
            var utf16Chars = [];
            for (var i = 0; i < sigBytes; i += 2) {
                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
                utf16Chars.push(String.fromCharCode(codePoint));
            }

            return utf16Chars.join('');
        },

        /**
         * Converts a UTF-16 BE string to a word array.
         *
         * @param {string} utf16Str The UTF-16 BE string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
         */
        parse: function (utf16Str) {
            // Shortcut
            var utf16StrLength = utf16Str.length;

            // Convert
            var words = [];
            for (var i = 0; i < utf16StrLength; i++) {
                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
            }

            return WordArray.create(words, utf16StrLength * 2);
        }
    };

    /**
     * UTF-16 LE encoding strategy.
     */
    C_enc.Utf16LE = {
        /**
         * Converts a word array to a UTF-16 LE string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The UTF-16 LE string.
         *
         * @static
         *
         * @example
         *
         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
         */
        stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;

            // Convert
            var utf16Chars = [];
            for (var i = 0; i < sigBytes; i += 2) {
                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
                utf16Chars.push(String.fromCharCode(codePoint));
            }

            return utf16Chars.join('');
        },

        /**
         * Converts a UTF-16 LE string to a word array.
         *
         * @param {string} utf16Str The UTF-16 LE string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
         */
        parse: function (utf16Str) {
            // Shortcut
            var utf16StrLength = utf16Str.length;

            // Convert
            var words = [];
            for (var i = 0; i < utf16StrLength; i++) {
                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
            }

            return WordArray.create(words, utf16StrLength * 2);
        }
    };

    function swapEndian(word) {
        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
    }
}());


(function () {
    // Check if typed arrays are supported
    if (typeof ArrayBuffer != 'function') {
        return;
    }

    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;

    // Reference original init
    var superInit = WordArray.init;

    // Augment WordArray.init to handle typed arrays
    var subInit = WordArray.init = function (typedArray) {
        // Convert buffers to uint8
        if (typedArray instanceof ArrayBuffer) {
            typedArray = new Uint8Array(typedArray);
        }

        // Convert other array views to uint8
        if (
            typedArray instanceof Int8Array ||
            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
            typedArray instanceof Int16Array ||
            typedArray instanceof Uint16Array ||
            typedArray instanceof Int32Array ||
            typedArray instanceof Uint32Array ||
            typedArray instanceof Float32Array ||
            typedArray instanceof Float64Array
        ) {
            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
        }

        // Handle Uint8Array
        if (typedArray instanceof Uint8Array) {
            // Shortcut
            var typedArrayByteLength = typedArray.byteLength;

            // Extract bytes
            var words = [];
            for (var i = 0; i < typedArrayByteLength; i++) {
                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
            }

            // Initialize this word array
            superInit.call(this, words, typedArrayByteLength);
        } else {
            // Else call normal init
            superInit.apply(this, arguments);
        }
    };

    subInit.prototype = WordArray;
}());


/** @preserve
(c) 2012 by Cédric Mesnil. All rights reserved.
 
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 
    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function (Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Constants table
    var _zl = WordArray.create([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
        3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
        1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
        4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
    var _zr = WordArray.create([
        5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
        6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
        15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
        8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
        12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
    var _sl = WordArray.create([
        11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
        7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
        11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
        11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
        9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
    var _sr = WordArray.create([
        8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
        9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
        9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
        15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
        8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);

    var _hl = WordArray.create([0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
    var _hr = WordArray.create([0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

    /**
     * RIPEMD160 hash algorithm.
     */
    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
        _doReset: function () {
            this._hash = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
        },

        _doProcessBlock: function (M, offset) {

            // Swap endian
            for (var i = 0; i < 16; i++) {
                // Shortcuts
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];

                // Swap
                M[offset_i] = (
                    (((M_offset_i << 8) | (M_offset_i >>> 24)) & 0x00ff00ff) |
                    (((M_offset_i << 24) | (M_offset_i >>> 8)) & 0xff00ff00)
                );
            }
            // Shortcut
            var H = this._hash.words;
            var hl = _hl.words;
            var hr = _hr.words;
            var zl = _zl.words;
            var zr = _zr.words;
            var sl = _sl.words;
            var sr = _sr.words;

            // Working variables
            var al, bl, cl, dl, el;
            var ar, br, cr, dr, er;

            ar = al = H[0];
            br = bl = H[1];
            cr = cl = H[2];
            dr = dl = H[3];
            er = el = H[4];
            // Computation
            var t;
            for (var i = 0; i < 80; i += 1) {
                t = (al + M[offset + zl[i]]) | 0;
                if (i < 16) {
                    t += f1(bl, cl, dl) + hl[0];
                } else if (i < 32) {
                    t += f2(bl, cl, dl) + hl[1];
                } else if (i < 48) {
                    t += f3(bl, cl, dl) + hl[2];
                } else if (i < 64) {
                    t += f4(bl, cl, dl) + hl[3];
                } else {// if (i<80) {
                    t += f5(bl, cl, dl) + hl[4];
                }
                t = t | 0;
                t = rotl(t, sl[i]);
                t = (t + el) | 0;
                al = el;
                el = dl;
                dl = rotl(cl, 10);
                cl = bl;
                bl = t;

                t = (ar + M[offset + zr[i]]) | 0;
                if (i < 16) {
                    t += f5(br, cr, dr) + hr[0];
                } else if (i < 32) {
                    t += f4(br, cr, dr) + hr[1];
                } else if (i < 48) {
                    t += f3(br, cr, dr) + hr[2];
                } else if (i < 64) {
                    t += f2(br, cr, dr) + hr[3];
                } else {// if (i<80) {
                    t += f1(br, cr, dr) + hr[4];
                }
                t = t | 0;
                t = rotl(t, sr[i]);
                t = (t + er) | 0;
                ar = er;
                er = dr;
                dr = rotl(cr, 10);
                cr = br;
                br = t;
            }
            // Intermediate hash value
            t = (H[1] + cl + dr) | 0;
            H[1] = (H[2] + dl + er) | 0;
            H[2] = (H[3] + el + ar) | 0;
            H[3] = (H[4] + al + br) | 0;
            H[4] = (H[0] + bl + cr) | 0;
            H[0] = t;
        },

        _doFinalize: function () {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            // Add padding
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
                (((nBitsTotal << 8) | (nBitsTotal >>> 24)) & 0x00ff00ff) |
                (((nBitsTotal << 24) | (nBitsTotal >>> 8)) & 0xff00ff00)
            );
            data.sigBytes = (dataWords.length + 1) * 4;

            // Hash final blocks
            this._process();

            // Shortcuts
            var hash = this._hash;
            var H = hash.words;

            // Swap endian
            for (var i = 0; i < 5; i++) {
                // Shortcut
                var H_i = H[i];

                // Swap
                H[i] = (((H_i << 8) | (H_i >>> 24)) & 0x00ff00ff) |
                    (((H_i << 24) | (H_i >>> 8)) & 0xff00ff00);
            }

            // Return final computed hash
            return hash;
        },

        clone: function () {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();

            return clone;
        }
    });


    function f1(x, y, z) {
        return ((x) ^ (y) ^ (z));

    }

    function f2(x, y, z) {
        return (((x) & (y)) | ((~x) & (z)));
    }

    function f3(x, y, z) {
        return (((x) | (~(y))) ^ (z));
    }

    function f4(x, y, z) {
        return (((x) & (z)) | ((y) & (~(z))));
    }

    function f5(x, y, z) {
        return ((x) ^ ((y) | (~(z))));

    }

    function rotl(x, n) {
        return (x << n) | (x >>> (32 - n));
    }


    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.RIPEMD160('message');
     *     var hash = CryptoJS.RIPEMD160(wordArray);
     */
    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
     */
    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
}(Math));


(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var C_enc = C.enc;
    var Utf8 = C_enc.Utf8;
    var C_algo = C.algo;

    /**
     * HMAC algorithm.
     */
    var HMAC = C_algo.HMAC = Base.extend({
        /**
         * Initializes a newly created HMAC.
         *
         * @param {Hasher} hasher The hash algorithm to use.
         * @param {WordArray|string} key The secret key.
         *
         * @example
         *
         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
         */
        init: function (hasher, key) {
            // Init hasher
            hasher = this._hasher = new hasher.init();

            // Convert string to WordArray, else assume WordArray already
            if (typeof key == 'string') {
                key = Utf8.parse(key);
            }

            // Shortcuts
            var hasherBlockSize = hasher.blockSize;
            var hasherBlockSizeBytes = hasherBlockSize * 4;

            // Allow arbitrary length keys
            if (key.sigBytes > hasherBlockSizeBytes) {
                key = hasher.finalize(key);
            }

            // Clamp excess bits
            key.clamp();

            // Clone key for inner and outer pads
            var oKey = this._oKey = key.clone();
            var iKey = this._iKey = key.clone();

            // Shortcuts
            var oKeyWords = oKey.words;
            var iKeyWords = iKey.words;

            // XOR keys with pad constants
            for (var i = 0; i < hasherBlockSize; i++) {
                oKeyWords[i] ^= 0x5c5c5c5c;
                iKeyWords[i] ^= 0x36363636;
            }
            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

            // Set initial values
            this.reset();
        },

        /**
         * Resets this HMAC to its initial state.
         *
         * @example
         *
         *     hmacHasher.reset();
         */
        reset: function () {
            // Shortcut
            var hasher = this._hasher;

            // Reset
            hasher.reset();
            hasher.update(this._iKey);
        },

        /**
         * Updates this HMAC with a message.
         *
         * @param {WordArray|string} messageUpdate The message to append.
         *
         * @return {HMAC} This HMAC instance.
         *
         * @example
         *
         *     hmacHasher.update('message');
         *     hmacHasher.update(wordArray);
         */
        update: function (messageUpdate) {
            this._hasher.update(messageUpdate);

            // Chainable
            return this;
        },

        /**
         * Finalizes the HMAC computation.
         * Note that the finalize operation is effectively a destructive, read-once operation.
         *
         * @param {WordArray|string} messageUpdate (Optional) A final message update.
         *
         * @return {WordArray} The HMAC.
         *
         * @example
         *
         *     var hmac = hmacHasher.finalize();
         *     var hmac = hmacHasher.finalize('message');
         *     var hmac = hmacHasher.finalize(wordArray);
         */
        finalize: function (messageUpdate) {
            // Shortcut
            var hasher = this._hasher;

            // Compute HMAC
            var innerHash = hasher.finalize(messageUpdate);
            hasher.reset();
            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

            return hmac;
        }
    });
}());


(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var WordArray = C_lib.WordArray;
    var C_algo = C.algo;
    var SHA1 = C_algo.SHA1;
    var HMAC = C_algo.HMAC;

    /**
     * Password-Based Key Derivation Function 2 algorithm.
     */
    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
        /**
         * Configuration options.
         *
         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
         * @property {Hasher} hasher The hasher to use. Default: SHA1
         * @property {number} iterations The number of iterations to perform. Default: 1
         */
        cfg: Base.extend({
            keySize: 128 / 32,
            hasher: SHA1,
            iterations: 1
        }),

        /**
         * Initializes a newly created key derivation function.
         *
         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
         *
         * @example
         *
         *     var kdf = CryptoJS.algo.PBKDF2.create();
         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
         */
        init: function (cfg) {
            this.cfg = this.cfg.extend(cfg);
        },

        /**
         * Computes the Password-Based Key Derivation Function 2.
         *
         * @param {WordArray|string} password The password.
         * @param {WordArray|string} salt A salt.
         *
         * @return {WordArray} The derived key.
         *
         * @example
         *
         *     var key = kdf.compute(password, salt);
         */
        compute: function (password, salt) {
            // Shortcut
            var cfg = this.cfg;

            // Init HMAC
            var hmac = HMAC.create(cfg.hasher, password);

            // Initial values
            var derivedKey = WordArray.create();
            var blockIndex = WordArray.create([0x00000001]);

            // Shortcuts
            var derivedKeyWords = derivedKey.words;
            var blockIndexWords = blockIndex.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;

            // Generate key
            while (derivedKeyWords.length < keySize) {
                var block = hmac.update(salt).finalize(blockIndex);
                hmac.reset();

                // Shortcuts
                var blockWords = block.words;
                var blockWordsLength = blockWords.length;

                // Iterations
                var intermediate = block;
                for (var i = 1; i < iterations; i++) {
                    intermediate = hmac.finalize(intermediate);
                    hmac.reset();

                    // Shortcut
                    var intermediateWords = intermediate.words;

                    // XOR intermediate with block
                    for (var j = 0; j < blockWordsLength; j++) {
                        blockWords[j] ^= intermediateWords[j];
                    }
                }

                derivedKey.concat(block);
                blockIndexWords[0]++;
            }
            derivedKey.sigBytes = keySize * 4;

            return derivedKey;
        }
    });

    /**
     * Computes the Password-Based Key Derivation Function 2.
     *
     * @param {WordArray|string} password The password.
     * @param {WordArray|string} salt A salt.
     * @param {Object} cfg (Optional) The configuration options to use for this computation.
     *
     * @return {WordArray} The derived key.
     *
     * @static
     *
     * @example
     *
     *     var key = CryptoJS.PBKDF2(password, salt);
     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
     */
    C.PBKDF2 = function (password, salt, cfg) {
        return PBKDF2.create(cfg).compute(password, salt);
    };
}());


(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var WordArray = C_lib.WordArray;
    var C_algo = C.algo;
    var MD5 = C_algo.MD5;

    /**
     * This key derivation function is meant to conform with EVP_BytesToKey.
     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
     */
    var EvpKDF = C_algo.EvpKDF = Base.extend({
        /**
         * Configuration options.
         *
         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
         * @property {number} iterations The number of iterations to perform. Default: 1
         */
        cfg: Base.extend({
            keySize: 128 / 32,
            hasher: MD5,
            iterations: 1
        }),

        /**
         * Initializes a newly created key derivation function.
         *
         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
         *
         * @example
         *
         *     var kdf = CryptoJS.algo.EvpKDF.create();
         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
         */
        init: function (cfg) {
            this.cfg = this.cfg.extend(cfg);
        },

        /**
         * Derives a key from a password.
         *
         * @param {WordArray|string} password The password.
         * @param {WordArray|string} salt A salt.
         *
         * @return {WordArray} The derived key.
         *
         * @example
         *
         *     var key = kdf.compute(password, salt);
         */
        compute: function (password, salt) {
            var block;

            // Shortcut
            var cfg = this.cfg;

            // Init hasher
            var hasher = cfg.hasher.create();

            // Initial values
            var derivedKey = WordArray.create();

            // Shortcuts
            var derivedKeyWords = derivedKey.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;

            // Generate key
            while (derivedKeyWords.length < keySize) {
                if (block) {
                    hasher.update(block);
                }
                block = hasher.update(password).finalize(salt);
                hasher.reset();

                // Iterations
                for (var i = 1; i < iterations; i++) {
                    block = hasher.finalize(block);
                    hasher.reset();
                }

                derivedKey.concat(block);
            }
            derivedKey.sigBytes = keySize * 4;

            return derivedKey;
        }
    });

    /**
     * Derives a key from a password.
     *
     * @param {WordArray|string} password The password.
     * @param {WordArray|string} salt A salt.
     * @param {Object} cfg (Optional) The configuration options to use for this computation.
     *
     * @return {WordArray} The derived key.
     *
     * @static
     *
     * @example
     *
     *     var key = CryptoJS.EvpKDF(password, salt);
     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
     */
    C.EvpKDF = function (password, salt, cfg) {
        return EvpKDF.create(cfg).compute(password, salt);
    };
}());


(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_algo = C.algo;
    var SHA256 = C_algo.SHA256;

    /**
     * SHA-224 hash algorithm.
     */
    var SHA224 = C_algo.SHA224 = SHA256.extend({
        _doReset: function () {
            this._hash = new WordArray.init([
                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
            ]);
        },

        _doFinalize: function () {
            var hash = SHA256._doFinalize.call(this);

            hash.sigBytes -= 4;

            return hash;
        }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA224('message');
     *     var hash = CryptoJS.SHA224(wordArray);
     */
    C.SHA224 = SHA256._createHelper(SHA224);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA224(message, key);
     */
    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
}());


(function (undefined) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var X32WordArray = C_lib.WordArray;

    /**
     * x64 namespace.
     */
    var C_x64 = C.x64 = {};

    /**
     * A 64-bit word.
     */
    var X64Word = C_x64.Word = Base.extend({
        /**
         * Initializes a newly created 64-bit word.
         *
         * @param {number} high The high 32 bits.
         * @param {number} low The low 32 bits.
         *
         * @example
         *
         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
         */
        init: function (high, low) {
            this.high = high;
            this.low = low;
        }

        /**
         * Bitwise NOTs this word.
         *
         * @return {X64Word} A new x64-Word object after negating.
         *
         * @example
         *
         *     var negated = x64Word.not();
         */
        // not: function () {
        // var high = ~this.high;
        // var low = ~this.low;

        // return X64Word.create(high, low);
        // },

        /**
         * Bitwise ANDs this word with the passed word.
         *
         * @param {X64Word} word The x64-Word to AND with this word.
         *
         * @return {X64Word} A new x64-Word object after ANDing.
         *
         * @example
         *
         *     var anded = x64Word.and(anotherX64Word);
         */
        // and: function (word) {
        // var high = this.high & word.high;
        // var low = this.low & word.low;

        // return X64Word.create(high, low);
        // },

        /**
         * Bitwise ORs this word with the passed word.
         *
         * @param {X64Word} word The x64-Word to OR with this word.
         *
         * @return {X64Word} A new x64-Word object after ORing.
         *
         * @example
         *
         *     var ored = x64Word.or(anotherX64Word);
         */
        // or: function (word) {
        // var high = this.high | word.high;
        // var low = this.low | word.low;

        // return X64Word.create(high, low);
        // },

        /**
         * Bitwise XORs this word with the passed word.
         *
         * @param {X64Word} word The x64-Word to XOR with this word.
         *
         * @return {X64Word} A new x64-Word object after XORing.
         *
         * @example
         *
         *     var xored = x64Word.xor(anotherX64Word);
         */
        // xor: function (word) {
        // var high = this.high ^ word.high;
        // var low = this.low ^ word.low;

        // return X64Word.create(high, low);
        // },

        /**
         * Shifts this word n bits to the left.
         *
         * @param {number} n The number of bits to shift.
         *
         * @return {X64Word} A new x64-Word object after shifting.
         *
         * @example
         *
         *     var shifted = x64Word.shiftL(25);
         */
        // shiftL: function (n) {
        // if (n < 32) {
        // var high = (this.high << n) | (this.low >>> (32 - n));
        // var low = this.low << n;
        // } else {
        // var high = this.low << (n - 32);
        // var low = 0;
        // }

        // return X64Word.create(high, low);
        // },

        /**
         * Shifts this word n bits to the right.
         *
         * @param {number} n The number of bits to shift.
         *
         * @return {X64Word} A new x64-Word object after shifting.
         *
         * @example
         *
         *     var shifted = x64Word.shiftR(7);
         */
        // shiftR: function (n) {
        // if (n < 32) {
        // var low = (this.low >>> n) | (this.high << (32 - n));
        // var high = this.high >>> n;
        // } else {
        // var low = this.high >>> (n - 32);
        // var high = 0;
        // }

        // return X64Word.create(high, low);
        // },

        /**
         * Rotates this word n bits to the left.
         *
         * @param {number} n The number of bits to rotate.
         *
         * @return {X64Word} A new x64-Word object after rotating.
         *
         * @example
         *
         *     var rotated = x64Word.rotL(25);
         */
        // rotL: function (n) {
        // return this.shiftL(n).or(this.shiftR(64 - n));
        // },

        /**
         * Rotates this word n bits to the right.
         *
         * @param {number} n The number of bits to rotate.
         *
         * @return {X64Word} A new x64-Word object after rotating.
         *
         * @example
         *
         *     var rotated = x64Word.rotR(7);
         */
        // rotR: function (n) {
        // return this.shiftR(n).or(this.shiftL(64 - n));
        // },

        /**
         * Adds this word with the passed word.
         *
         * @param {X64Word} word The x64-Word to add with this word.
         *
         * @return {X64Word} A new x64-Word object after adding.
         *
         * @example
         *
         *     var added = x64Word.add(anotherX64Word);
         */
        // add: function (word) {
        // var low = (this.low + word.low) | 0;
        // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
        // var high = (this.high + word.high + carry) | 0;

        // return X64Word.create(high, low);
        // }
    });

    /**
     * An array of 64-bit words.
     *
     * @property {Array} words The array of CryptoJS.x64.Word objects.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
    var X64WordArray = C_x64.WordArray = Base.extend({
        /**
         * Initializes a newly created word array.
         *
         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
         *
         * @example
         *
         *     var wordArray = CryptoJS.x64.WordArray.create();
         *
         *     var wordArray = CryptoJS.x64.WordArray.create([
         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
         *     ]);
         *
         *     var wordArray = CryptoJS.x64.WordArray.create([
         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
         *     ], 10);
         */
        init: function (words, sigBytes) {
            words = this.words = words || [];

            if (sigBytes != undefined) {
                this.sigBytes = sigBytes;
            } else {
                this.sigBytes = words.length * 8;
            }
        },

        /**
         * Converts this 64-bit word array to a 32-bit word array.
         *
         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
         *
         * @example
         *
         *     var x32WordArray = x64WordArray.toX32();
         */
        toX32: function () {
            // Shortcuts
            var x64Words = this.words;
            var x64WordsLength = x64Words.length;

            // Convert
            var x32Words = [];
            for (var i = 0; i < x64WordsLength; i++) {
                var x64Word = x64Words[i];
                x32Words.push(x64Word.high);
                x32Words.push(x64Word.low);
            }

            return X32WordArray.create(x32Words, this.sigBytes);
        },

        /**
         * Creates a copy of this word array.
         *
         * @return {X64WordArray} The clone.
         *
         * @example
         *
         *     var clone = x64WordArray.clone();
         */
        clone: function () {
            var clone = Base.clone.call(this);

            // Clone "words" array
            var words = clone.words = this.words.slice(0);

            // Clone each X64Word object
            var wordsLength = words.length;
            for (var i = 0; i < wordsLength; i++) {
                words[i] = words[i].clone();
            }

            return clone;
        }
    });
}());


(function (Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var C_algo = C.algo;

    // Constants tables
    var RHO_OFFSETS = [];
    var PI_INDEXES = [];
    var ROUND_CONSTANTS = [];

    // Compute Constants
    (function () {
        // Compute rho offset constants
        var x = 1, y = 0;
        for (var t = 0; t < 24; t++) {
            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;

            var newX = y % 5;
            var newY = (2 * x + 3 * y) % 5;
            x = newX;
            y = newY;
        }

        // Compute pi index constants
        for (var x = 0; x < 5; x++) {
            for (var y = 0; y < 5; y++) {
                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
            }
        }

        // Compute round constants
        var LFSR = 0x01;
        for (var i = 0; i < 24; i++) {
            var roundConstantMsw = 0;
            var roundConstantLsw = 0;

            for (var j = 0; j < 7; j++) {
                if (LFSR & 0x01) {
                    var bitPosition = (1 << j) - 1;
                    if (bitPosition < 32) {
                        roundConstantLsw ^= 1 << bitPosition;
                    } else /* if (bitPosition >= 32) */ {
                        roundConstantMsw ^= 1 << (bitPosition - 32);
                    }
                }

                // Compute next LFSR
                if (LFSR & 0x80) {
                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
                    LFSR = (LFSR << 1) ^ 0x71;
                } else {
                    LFSR <<= 1;
                }
            }

            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
        }
    }());

    // Reusable objects for temporary values
    var T = [];
    (function () {
        for (var i = 0; i < 25; i++) {
            T[i] = X64Word.create();
        }
    }());

    /**
     * SHA-3 hash algorithm.
     */
    var SHA3 = C_algo.SHA3 = Hasher.extend({
        /**
         * Configuration options.
         *
         * @property {number} outputLength
         *   The desired number of bits in the output hash.
         *   Only values permitted are: 224, 256, 384, 512.
         *   Default: 512
         */
        cfg: Hasher.cfg.extend({
            outputLength: 512
        }),

        _doReset: function () {
            var state = this._state = []
            for (var i = 0; i < 25; i++) {
                state[i] = new X64Word.init();
            }

            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
        },

        _doProcessBlock: function (M, offset) {
            // Shortcuts
            var state = this._state;
            var nBlockSizeLanes = this.blockSize / 2;

            // Absorb
            for (var i = 0; i < nBlockSizeLanes; i++) {
                // Shortcuts
                var M2i = M[offset + 2 * i];
                var M2i1 = M[offset + 2 * i + 1];

                // Swap endian
                M2i = (
                    (((M2i << 8) | (M2i >>> 24)) & 0x00ff00ff) |
                    (((M2i << 24) | (M2i >>> 8)) & 0xff00ff00)
                );
                M2i1 = (
                    (((M2i1 << 8) | (M2i1 >>> 24)) & 0x00ff00ff) |
                    (((M2i1 << 24) | (M2i1 >>> 8)) & 0xff00ff00)
                );

                // Absorb message into state
                var lane = state[i];
                lane.high ^= M2i1;
                lane.low ^= M2i;
            }

            // Rounds
            for (var round = 0; round < 24; round++) {
                // Theta
                for (var x = 0; x < 5; x++) {
                    // Mix column lanes
                    var tMsw = 0, tLsw = 0;
                    for (var y = 0; y < 5; y++) {
                        var lane = state[x + 5 * y];
                        tMsw ^= lane.high;
                        tLsw ^= lane.low;
                    }

                    // Temporary values
                    var Tx = T[x];
                    Tx.high = tMsw;
                    Tx.low = tLsw;
                }
                for (var x = 0; x < 5; x++) {
                    // Shortcuts
                    var Tx4 = T[(x + 4) % 5];
                    var Tx1 = T[(x + 1) % 5];
                    var Tx1Msw = Tx1.high;
                    var Tx1Lsw = Tx1.low;

                    // Mix surrounding columns
                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
                    var tLsw = Tx4.low ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
                    for (var y = 0; y < 5; y++) {
                        var lane = state[x + 5 * y];
                        lane.high ^= tMsw;
                        lane.low ^= tLsw;
                    }
                }

                // Rho Pi
                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                    var tMsw;
                    var tLsw;

                    // Shortcuts
                    var lane = state[laneIndex];
                    var laneMsw = lane.high;
                    var laneLsw = lane.low;
                    var rhoOffset = RHO_OFFSETS[laneIndex];

                    // Rotate lanes
                    if (rhoOffset < 32) {
                        tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
                        tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
                    } else /* if (rhoOffset >= 32) */ {
                        tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
                        tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
                    }

                    // Transpose lanes
                    var TPiLane = T[PI_INDEXES[laneIndex]];
                    TPiLane.high = tMsw;
                    TPiLane.low = tLsw;
                }

                // Rho pi at x = y = 0
                var T0 = T[0];
                var state0 = state[0];
                T0.high = state0.high;
                T0.low = state0.low;

                // Chi
                for (var x = 0; x < 5; x++) {
                    for (var y = 0; y < 5; y++) {
                        // Shortcuts
                        var laneIndex = x + 5 * y;
                        var lane = state[laneIndex];
                        var TLane = T[laneIndex];
                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];

                        // Mix rows
                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
                        lane.low = TLane.low ^ (~Tx1Lane.low & Tx2Lane.low);
                    }
                }

                // Iota
                var lane = state[0];
                var roundConstant = ROUND_CONSTANTS[round];
                lane.high ^= roundConstant.high;
                lane.low ^= roundConstant.low;
            }
        },

        _doFinalize: function () {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            var blockSizeBits = this.blockSize * 32;

            // Add padding
            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
            data.sigBytes = dataWords.length * 4;

            // Hash final blocks
            this._process();

            // Shortcuts
            var state = this._state;
            var outputLengthBytes = this.cfg.outputLength / 8;
            var outputLengthLanes = outputLengthBytes / 8;

            // Squeeze
            var hashWords = [];
            for (var i = 0; i < outputLengthLanes; i++) {
                // Shortcuts
                var lane = state[i];
                var laneMsw = lane.high;
                var laneLsw = lane.low;

                // Swap endian
                laneMsw = (
                    (((laneMsw << 8) | (laneMsw >>> 24)) & 0x00ff00ff) |
                    (((laneMsw << 24) | (laneMsw >>> 8)) & 0xff00ff00)
                );
                laneLsw = (
                    (((laneLsw << 8) | (laneLsw >>> 24)) & 0x00ff00ff) |
                    (((laneLsw << 24) | (laneLsw >>> 8)) & 0xff00ff00)
                );

                // Squeeze state to retrieve hash
                hashWords.push(laneLsw);
                hashWords.push(laneMsw);
            }

            // Return final computed hash
            return new WordArray.init(hashWords, outputLengthBytes);
        },

        clone: function () {
            var clone = Hasher.clone.call(this);

            var state = clone._state = this._state.slice(0);
            for (var i = 0; i < 25; i++) {
                state[i] = state[i].clone();
            }

            return clone;
        }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA3('message');
     *     var hash = CryptoJS.SHA3(wordArray);
     */
    C.SHA3 = Hasher._createHelper(SHA3);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA3(message, key);
     */
    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
}(Math));


(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Hasher = C_lib.Hasher;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var X64WordArray = C_x64.WordArray;
    var C_algo = C.algo;

    function X64Word_create() {
        return X64Word.create.apply(X64Word, arguments);
    }

    // Constants
    var K = [
        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
    ];

    // Reusable objects
    var W = [];
    (function () {
        for (var i = 0; i < 80; i++) {
            W[i] = X64Word_create();
        }
    }());

    /**
     * SHA-512 hash algorithm.
     */
    var SHA512 = C_algo.SHA512 = Hasher.extend({
        _doReset: function () {
            this._hash = new X64WordArray.init([
                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
            ]);
        },

        _doProcessBlock: function (M, offset) {
            // Shortcuts
            var H = this._hash.words;

            var H0 = H[0];
            var H1 = H[1];
            var H2 = H[2];
            var H3 = H[3];
            var H4 = H[4];
            var H5 = H[5];
            var H6 = H[6];
            var H7 = H[7];

            var H0h = H0.high;
            var H0l = H0.low;
            var H1h = H1.high;
            var H1l = H1.low;
            var H2h = H2.high;
            var H2l = H2.low;
            var H3h = H3.high;
            var H3l = H3.low;
            var H4h = H4.high;
            var H4l = H4.low;
            var H5h = H5.high;
            var H5l = H5.low;
            var H6h = H6.high;
            var H6l = H6.low;
            var H7h = H7.high;
            var H7l = H7.low;

            // Working variables
            var ah = H0h;
            var al = H0l;
            var bh = H1h;
            var bl = H1l;
            var ch = H2h;
            var cl = H2l;
            var dh = H3h;
            var dl = H3l;
            var eh = H4h;
            var el = H4l;
            var fh = H5h;
            var fl = H5l;
            var gh = H6h;
            var gl = H6l;
            var hh = H7h;
            var hl = H7l;

            // Rounds
            for (var i = 0; i < 80; i++) {
                var Wil;
                var Wih;

                // Shortcut
                var Wi = W[i];

                // Extend message
                if (i < 16) {
                    Wih = Wi.high = M[offset + i * 2] | 0;
                    Wil = Wi.low = M[offset + i * 2 + 1] | 0;
                } else {
                    // Gamma0
                    var gamma0x = W[i - 15];
                    var gamma0xh = gamma0x.high;
                    var gamma0xl = gamma0x.low;
                    var gamma0h = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
                    var gamma0l = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

                    // Gamma1
                    var gamma1x = W[i - 2];
                    var gamma1xh = gamma1x.high;
                    var gamma1xl = gamma1x.low;
                    var gamma1h = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
                    var gamma1l = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
                    var Wi7 = W[i - 7];
                    var Wi7h = Wi7.high;
                    var Wi7l = Wi7.low;

                    var Wi16 = W[i - 16];
                    var Wi16h = Wi16.high;
                    var Wi16l = Wi16.low;

                    Wil = gamma0l + Wi7l;
                    Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
                    Wil = Wil + gamma1l;
                    Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
                    Wil = Wil + Wi16l;
                    Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

                    Wi.high = Wih;
                    Wi.low = Wil;
                }

                var chh = (eh & fh) ^ (~eh & gh);
                var chl = (el & fl) ^ (~el & gl);
                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

                var sigma0h = ((ah >>> 28) | (al << 4)) ^ ((ah << 30) | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
                var sigma0l = ((al >>> 28) | (ah << 4)) ^ ((al << 30) | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

                // t1 = h + sigma1 + ch + K[i] + W[i]
                var Ki = K[i];
                var Kih = Ki.high;
                var Kil = Ki.low;

                var t1l = hl + sigma1l;
                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
                var t1l = t1l + chl;
                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
                var t1l = t1l + Kil;
                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
                var t1l = t1l + Wil;
                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

                // t2 = sigma0 + maj
                var t2l = sigma0l + majl;
                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

                // Update working variables
                hh = gh;
                hl = gl;
                gh = fh;
                gl = fl;
                fh = eh;
                fl = el;
                el = (dl + t1l) | 0;
                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
                dh = ch;
                dl = cl;
                ch = bh;
                cl = bl;
                bh = ah;
                bl = al;
                al = (t1l + t2l) | 0;
                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
            }

            // Intermediate hash value
            H0l = H0.low = (H0l + al);
            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
            H1l = H1.low = (H1l + bl);
            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
            H2l = H2.low = (H2l + cl);
            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
            H3l = H3.low = (H3l + dl);
            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
            H4l = H4.low = (H4l + el);
            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
            H5l = H5.low = (H5l + fl);
            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
            H6l = H6.low = (H6l + gl);
            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
            H7l = H7.low = (H7l + hl);
            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
        },

        _doFinalize: function () {
            // Shortcuts
            var data = this._data;
            var dataWords = data.words;

            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;

            // Add padding
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;

            // Hash final blocks
            this._process();

            // Convert hash to 32-bit word array before returning
            var hash = this._hash.toX32();

            // Return final computed hash
            return hash;
        },

        clone: function () {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();

            return clone;
        },

        blockSize: 1024 / 32
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA512('message');
     *     var hash = CryptoJS.SHA512(wordArray);
     */
    C.SHA512 = Hasher._createHelper(SHA512);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA512(message, key);
     */
    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
}());


(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var X64WordArray = C_x64.WordArray;
    var C_algo = C.algo;
    var SHA512 = C_algo.SHA512;

    /**
     * SHA-384 hash algorithm.
     */
    var SHA384 = C_algo.SHA384 = SHA512.extend({
        _doReset: function () {
            this._hash = new X64WordArray.init([
                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
            ]);
        },

        _doFinalize: function () {
            var hash = SHA512._doFinalize.call(this);

            hash.sigBytes -= 16;

            return hash;
        }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA384('message');
     *     var hash = CryptoJS.SHA384(wordArray);
     */
    C.SHA384 = SHA512._createHelper(SHA384);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA384(message, key);
     */
    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
}());


/**
 * Cipher core components.
 */
CryptoJS.lib.Cipher || (function (undefined) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var WordArray = C_lib.WordArray;
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
    var C_enc = C.enc;
    var Utf8 = C_enc.Utf8;
    var Base64 = C_enc.Base64;
    var C_algo = C.algo;
    var EvpKDF = C_algo.EvpKDF;

    /**
     * Abstract base cipher template.
     *
     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
     */
    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
        /**
         * Configuration options.
         *
         * @property {WordArray} iv The IV to use for this operation.
         */
        cfg: Base.extend(),

        /**
         * Creates this cipher in encryption mode.
         *
         * @param {WordArray} key The key.
         * @param {Object} cfg (Optional) The configuration options to use for this operation.
         *
         * @return {Cipher} A cipher instance.
         *
         * @static
         *
         * @example
         *
         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
         */
        createEncryptor: function (key, cfg) {
            return this.create(this._ENC_XFORM_MODE, key, cfg);
        },

        /**
         * Creates this cipher in decryption mode.
         *
         * @param {WordArray} key The key.
         * @param {Object} cfg (Optional) The configuration options to use for this operation.
         *
         * @return {Cipher} A cipher instance.
         *
         * @static
         *
         * @example
         *
         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
         */
        createDecryptor: function (key, cfg) {
            return this.create(this._DEC_XFORM_MODE, key, cfg);
        },

        /**
         * Initializes a newly created cipher.
         *
         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
         * @param {WordArray} key The key.
         * @param {Object} cfg (Optional) The configuration options to use for this operation.
         *
         * @example
         *
         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
         */
        init: function (xformMode, key, cfg) {
            // Apply config defaults
            this.cfg = this.cfg.extend(cfg);

            // Store transform mode and key
            this._xformMode = xformMode;
            this._key = key;

            // Set initial values
            this.reset();
        },

        /**
         * Resets this cipher to its initial state.
         *
         * @example
         *
         *     cipher.reset();
         */
        reset: function () {
            // Reset data buffer
            BufferedBlockAlgorithm.reset.call(this);

            // Perform concrete-cipher logic
            this._doReset();
        },

        /**
         * Adds data to be encrypted or decrypted.
         *
         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
         *
         * @return {WordArray} The data after processing.
         *
         * @example
         *
         *     var encrypted = cipher.process('data');
         *     var encrypted = cipher.process(wordArray);
         */
        process: function (dataUpdate) {
            // Append
            this._append(dataUpdate);

            // Process available blocks
            return this._process();
        },

        /**
         * Finalizes the encryption or decryption process.
         * Note that the finalize operation is effectively a destructive, read-once operation.
         *
         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
         *
         * @return {WordArray} The data after final processing.
         *
         * @example
         *
         *     var encrypted = cipher.finalize();
         *     var encrypted = cipher.finalize('data');
         *     var encrypted = cipher.finalize(wordArray);
         */
        finalize: function (dataUpdate) {
            // Final data update
            if (dataUpdate) {
                this._append(dataUpdate);
            }

            // Perform concrete-cipher logic
            var finalProcessedData = this._doFinalize();

            return finalProcessedData;
        },

        keySize: 128 / 32,

        ivSize: 128 / 32,

        _ENC_XFORM_MODE: 1,

        _DEC_XFORM_MODE: 2,

        /**
         * Creates shortcut functions to a cipher's object interface.
         *
         * @param {Cipher} cipher The cipher to create a helper for.
         *
         * @return {Object} An object with encrypt and decrypt shortcut functions.
         *
         * @static
         *
         * @example
         *
         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
         */
        _createHelper: (function () {
            function selectCipherStrategy(key) {
                if (typeof key == 'string') {
                    return PasswordBasedCipher;
                } else {
                    return SerializableCipher;
                }
            }

            return function (cipher) {
                return {
                    encrypt: function (message, key, cfg) {
                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                    },

                    decrypt: function (ciphertext, key, cfg) {
                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                    }
                };
            };
        }())
    });

    /**
     * Abstract base stream cipher template.
     *
     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
     */
    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
        _doFinalize: function () {
            // Process partial blocks
            var finalProcessedBlocks = this._process(!!'flush');

            return finalProcessedBlocks;
        },

        blockSize: 1
    });

    /**
     * Mode namespace.
     */
    var C_mode = C.mode = {};

    /**
     * Abstract base block cipher mode template.
     */
    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
        /**
         * Creates this mode for encryption.
         *
         * @param {Cipher} cipher A block cipher instance.
         * @param {Array} iv The IV words.
         *
         * @static
         *
         * @example
         *
         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
         */
        createEncryptor: function (cipher, iv) {
            return this.Encryptor.create(cipher, iv);
        },

        /**
         * Creates this mode for decryption.
         *
         * @param {Cipher} cipher A block cipher instance.
         * @param {Array} iv The IV words.
         *
         * @static
         *
         * @example
         *
         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
         */
        createDecryptor: function (cipher, iv) {
            return this.Decryptor.create(cipher, iv);
        },

        /**
         * Initializes a newly created mode.
         *
         * @param {Cipher} cipher A block cipher instance.
         * @param {Array} iv The IV words.
         *
         * @example
         *
         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
         */
        init: function (cipher, iv) {
            this._cipher = cipher;
            this._iv = iv;
        }
    });

    /**
     * Cipher Block Chaining mode.
     */
    var CBC = C_mode.CBC = (function () {
        /**
         * Abstract base CBC mode.
         */
        var CBC = BlockCipherMode.extend();

        /**
         * CBC encryptor.
         */
        CBC.Encryptor = CBC.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function (words, offset) {
                // Shortcuts
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;

                // XOR and encrypt
                xorBlock.call(this, words, offset, blockSize);
                cipher.encryptBlock(words, offset);

                // Remember this block to use with next block
                this._prevBlock = words.slice(offset, offset + blockSize);
            }
        });

        /**
         * CBC decryptor.
         */
        CBC.Decryptor = CBC.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function (words, offset) {
                // Shortcuts
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;

                // Remember this block to use with next block
                var thisBlock = words.slice(offset, offset + blockSize);

                // Decrypt and XOR
                cipher.decryptBlock(words, offset);
                xorBlock.call(this, words, offset, blockSize);

                // This block becomes the previous block
                this._prevBlock = thisBlock;
            }
        });

        function xorBlock(words, offset, blockSize) {
            var block;

            // Shortcut
            var iv = this._iv;

            // Choose mixing block
            if (iv) {
                block = iv;

                // Remove IV for subsequent blocks
                this._iv = undefined;
            } else {
                block = this._prevBlock;
            }

            // XOR blocks
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= block[i];
            }
        }

        return CBC;
    }());

    /**
     * Padding namespace.
     */
    var C_pad = C.pad = {};

    /**
     * PKCS #5/7 padding strategy.
     */
    var Pkcs7 = C_pad.Pkcs7 = {
        /**
         * Pads data using the algorithm defined in PKCS #5/7.
         *
         * @param {WordArray} data The data to pad.
         * @param {number} blockSize The multiple that the data should be padded to.
         *
         * @static
         *
         * @example
         *
         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
         */
        pad: function (data, blockSize) {
            // Shortcut
            var blockSizeBytes = blockSize * 4;

            // Count padding bytes
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

            // Create padding word
            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

            // Create padding
            var paddingWords = [];
            for (var i = 0; i < nPaddingBytes; i += 4) {
                paddingWords.push(paddingWord);
            }
            var padding = WordArray.create(paddingWords, nPaddingBytes);

            // Add padding
            data.concat(padding);
        },

        /**
         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
         *
         * @param {WordArray} data The data to unpad.
         *
         * @static
         *
         * @example
         *
         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
         */
        unpad: function (data) {
            // Get number of padding bytes from last byte
            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

            // Remove padding
            data.sigBytes -= nPaddingBytes;
        }
    };

    /**
     * Abstract base block cipher template.
     *
     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
     */
    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
        /**
         * Configuration options.
         *
         * @property {Mode} mode The block mode to use. Default: CBC
         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
         */
        cfg: Cipher.cfg.extend({
            mode: CBC,
            padding: Pkcs7
        }),

        reset: function () {
            var modeCreator;

            // Reset cipher
            Cipher.reset.call(this);

            // Shortcuts
            var cfg = this.cfg;
            var iv = cfg.iv;
            var mode = cfg.mode;

            // Reset block mode
            if (this._xformMode == this._ENC_XFORM_MODE) {
                modeCreator = mode.createEncryptor;
            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
                modeCreator = mode.createDecryptor;
                // Keep at least one block in the buffer for unpadding
                this._minBufferSize = 1;
            }

            if (this._mode && this._mode.__creator == modeCreator) {
                this._mode.init(this, iv && iv.words);
            } else {
                this._mode = modeCreator.call(mode, this, iv && iv.words);
                this._mode.__creator = modeCreator;
            }
        },

        _doProcessBlock: function (words, offset) {
            this._mode.processBlock(words, offset);
        },

        _doFinalize: function () {
            var finalProcessedBlocks;

            // Shortcut
            var padding = this.cfg.padding;

            // Finalize
            if (this._xformMode == this._ENC_XFORM_MODE) {
                // Pad data
                padding.pad(this._data, this.blockSize);

                // Process final blocks
                finalProcessedBlocks = this._process(!!'flush');
            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
                // Process final blocks
                finalProcessedBlocks = this._process(!!'flush');

                // Unpad data
                padding.unpad(finalProcessedBlocks);
            }

            return finalProcessedBlocks;
        },

        blockSize: 128 / 32
    });

    /**
     * A collection of cipher parameters.
     *
     * @property {WordArray} ciphertext The raw ciphertext.
     * @property {WordArray} key The key to this ciphertext.
     * @property {WordArray} iv The IV used in the ciphering operation.
     * @property {WordArray} salt The salt used with a key derivation function.
     * @property {Cipher} algorithm The cipher algorithm.
     * @property {Mode} mode The block mode used in the ciphering operation.
     * @property {Padding} padding The padding scheme used in the ciphering operation.
     * @property {number} blockSize The block size of the cipher.
     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
     */
    var CipherParams = C_lib.CipherParams = Base.extend({
        /**
         * Initializes a newly created cipher params object.
         *
         * @param {Object} cipherParams An object with any of the possible cipher parameters.
         *
         * @example
         *
         *     var cipherParams = CryptoJS.lib.CipherParams.create({
         *         ciphertext: ciphertextWordArray,
         *         key: keyWordArray,
         *         iv: ivWordArray,
         *         salt: saltWordArray,
         *         algorithm: CryptoJS.algo.AES,
         *         mode: CryptoJS.mode.CBC,
         *         padding: CryptoJS.pad.PKCS7,
         *         blockSize: 4,
         *         formatter: CryptoJS.format.OpenSSL
         *     });
         */
        init: function (cipherParams) {
            this.mixIn(cipherParams);
        },

        /**
         * Converts this cipher params object to a string.
         *
         * @param {Format} formatter (Optional) The formatting strategy to use.
         *
         * @return {string} The stringified cipher params.
         *
         * @throws Error If neither the formatter nor the default formatter is set.
         *
         * @example
         *
         *     var string = cipherParams + '';
         *     var string = cipherParams.toString();
         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
         */
        toString: function (formatter) {
            return (formatter || this.formatter).stringify(this);
        }
    });

    /**
     * Format namespace.
     */
    var C_format = C.format = {};

    /**
     * OpenSSL formatting strategy.
     */
    var OpenSSLFormatter = C_format.OpenSSL = {
        /**
         * Converts a cipher params object to an OpenSSL-compatible string.
         *
         * @param {CipherParams} cipherParams The cipher params object.
         *
         * @return {string} The OpenSSL-compatible string.
         *
         * @static
         *
         * @example
         *
         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
         */
        stringify: function (cipherParams) {
            var wordArray;

            // Shortcuts
            var ciphertext = cipherParams.ciphertext;
            var salt = cipherParams.salt;

            // Format
            if (salt) {
                wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
            } else {
                wordArray = ciphertext;
            }

            return wordArray.toString(Base64);
        },

        /**
         * Converts an OpenSSL-compatible string to a cipher params object.
         *
         * @param {string} openSSLStr The OpenSSL-compatible string.
         *
         * @return {CipherParams} The cipher params object.
         *
         * @static
         *
         * @example
         *
         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
         */
        parse: function (openSSLStr) {
            var salt;

            // Parse base64
            var ciphertext = Base64.parse(openSSLStr);

            // Shortcut
            var ciphertextWords = ciphertext.words;

            // Test for salt
            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
                // Extract salt
                salt = WordArray.create(ciphertextWords.slice(2, 4));

                // Remove salt from ciphertext
                ciphertextWords.splice(0, 4);
                ciphertext.sigBytes -= 16;
            }

            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
        }
    };

    /**
     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
     */
    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
        /**
         * Configuration options.
         *
         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
         */
        cfg: Base.extend({
            format: OpenSSLFormatter
        }),

        /**
         * Encrypts a message.
         *
         * @param {Cipher} cipher The cipher algorithm to use.
         * @param {WordArray|string} message The message to encrypt.
         * @param {WordArray} key The key.
         * @param {Object} cfg (Optional) The configuration options to use for this operation.
         *
         * @return {CipherParams} A cipher params object.
         *
         * @static
         *
         * @example
         *
         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
         */
        encrypt: function (cipher, message, key, cfg) {
            // Apply config defaults
            cfg = this.cfg.extend(cfg);

            // Encrypt
            var encryptor = cipher.createEncryptor(key, cfg);
            var ciphertext = encryptor.finalize(message);

            // Shortcut
            var cipherCfg = encryptor.cfg;

            // Create and return serializable cipher params
            return CipherParams.create({
                ciphertext: ciphertext,
                key: key,
                iv: cipherCfg.iv,
                algorithm: cipher,
                mode: cipherCfg.mode,
                padding: cipherCfg.padding,
                blockSize: cipher.blockSize,
                formatter: cfg.format
            });
        },

        /**
         * Decrypts serialized ciphertext.
         *
         * @param {Cipher} cipher The cipher algorithm to use.
         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
         * @param {WordArray} key The key.
         * @param {Object} cfg (Optional) The configuration options to use for this operation.
         *
         * @return {WordArray} The plaintext.
         *
         * @static
         *
         * @example
         *
         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
         */
        decrypt: function (cipher, ciphertext, key, cfg) {
            // Apply config defaults
            cfg = this.cfg.extend(cfg);

            // Convert string to CipherParams
            ciphertext = this._parse(ciphertext, cfg.format);

            // Decrypt
            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

            return plaintext;
        },

        /**
         * Converts serialized ciphertext to CipherParams,
         * else assumed CipherParams already and returns ciphertext unchanged.
         *
         * @param {CipherParams|string} ciphertext The ciphertext.
         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
         *
         * @return {CipherParams} The unserialized ciphertext.
         *
         * @static
         *
         * @example
         *
         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
         */
        _parse: function (ciphertext, format) {
            if (typeof ciphertext == 'string') {
                return format.parse(ciphertext, this);
            } else {
                return ciphertext;
            }
        }
    });

    /**
     * Key derivation function namespace.
     */
    var C_kdf = C.kdf = {};

    /**
     * OpenSSL key derivation function.
     */
    var OpenSSLKdf = C_kdf.OpenSSL = {
        /**
         * Derives a key and IV from a password.
         *
         * @param {string} password The password to derive from.
         * @param {number} keySize The size in words of the key to generate.
         * @param {number} ivSize The size in words of the IV to generate.
         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
         *
         * @return {CipherParams} A cipher params object with the key, IV, and salt.
         *
         * @static
         *
         * @example
         *
         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
         */
        execute: function (password, keySize, ivSize, salt) {
            // Generate random salt
            if (!salt) {
                salt = WordArray.random(64 / 8);
            }

            // Derive key and IV
            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

            // Separate key and IV
            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
            key.sigBytes = keySize * 4;

            // Return params
            return CipherParams.create({ key: key, iv: iv, salt: salt });
        }
    };

    /**
     * A serializable cipher wrapper that derives the key from a password,
     * and returns ciphertext as a serializable cipher params object.
     */
    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
        /**
         * Configuration options.
         *
         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
         */
        cfg: SerializableCipher.cfg.extend({
            kdf: OpenSSLKdf
        }),

        /**
         * Encrypts a message using a password.
         *
         * @param {Cipher} cipher The cipher algorithm to use.
         * @param {WordArray|string} message The message to encrypt.
         * @param {string} password The password.
         * @param {Object} cfg (Optional) The configuration options to use for this operation.
         *
         * @return {CipherParams} A cipher params object.
         *
         * @static
         *
         * @example
         *
         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
         */
        encrypt: function (cipher, message, password, cfg) {
            // Apply config defaults
            cfg = this.cfg.extend(cfg);

            // Derive key and other params
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

            // Add IV to config
            cfg.iv = derivedParams.iv;

            // Encrypt
            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

            // Mix in derived params
            ciphertext.mixIn(derivedParams);

            return ciphertext;
        },

        /**
         * Decrypts serialized ciphertext using a password.
         *
         * @param {Cipher} cipher The cipher algorithm to use.
         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
         * @param {string} password The password.
         * @param {Object} cfg (Optional) The configuration options to use for this operation.
         *
         * @return {WordArray} The plaintext.
         *
         * @static
         *
         * @example
         *
         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
         */
        decrypt: function (cipher, ciphertext, password, cfg) {
            // Apply config defaults
            cfg = this.cfg.extend(cfg);

            // Convert string to CipherParams
            ciphertext = this._parse(ciphertext, cfg.format);

            // Derive key and other params
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

            // Add IV to config
            cfg.iv = derivedParams.iv;

            // Decrypt
            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

            return plaintext;
        }
    });
}());


/**
 * Cipher Feedback block mode.
 */
CryptoJS.mode.CFB = (function () {
    var CFB = CryptoJS.lib.BlockCipherMode.extend();

    CFB.Encryptor = CFB.extend({
        processBlock: function (words, offset) {
            // Shortcuts
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;

            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

            // Remember this block to use with next block
            this._prevBlock = words.slice(offset, offset + blockSize);
        }
    });

    CFB.Decryptor = CFB.extend({
        processBlock: function (words, offset) {
            // Shortcuts
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;

            // Remember this block to use with next block
            var thisBlock = words.slice(offset, offset + blockSize);

            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

            // This block becomes the previous block
            this._prevBlock = thisBlock;
        }
    });

    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
        var keystream;

        // Shortcut
        var iv = this._iv;

        // Generate keystream
        if (iv) {
            keystream = iv.slice(0);

            // Remove IV for subsequent blocks
            this._iv = undefined;
        } else {
            keystream = this._prevBlock;
        }
        cipher.encryptBlock(keystream, 0);

        // Encrypt
        for (var i = 0; i < blockSize; i++) {
            words[offset + i] ^= keystream[i];
        }
    }

    return CFB;
}());


/**
 * Electronic Codebook block mode.
 */
CryptoJS.mode.ECB = (function () {
    var ECB = CryptoJS.lib.BlockCipherMode.extend();

    ECB.Encryptor = ECB.extend({
        processBlock: function (words, offset) {
            this._cipher.encryptBlock(words, offset);
        }
    });

    ECB.Decryptor = ECB.extend({
        processBlock: function (words, offset) {
            this._cipher.decryptBlock(words, offset);
        }
    });

    return ECB;
}());


/**
 * ANSI X.923 padding strategy.
 */
CryptoJS.pad.AnsiX923 = {
    pad: function (data, blockSize) {
        // Shortcuts
        var dataSigBytes = data.sigBytes;
        var blockSizeBytes = blockSize * 4;

        // Count padding bytes
        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

        // Compute last byte position
        var lastBytePos = dataSigBytes + nPaddingBytes - 1;

        // Pad
        data.clamp();
        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
        data.sigBytes += nPaddingBytes;
    },

    unpad: function (data) {
        // Get number of padding bytes from last byte
        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

        // Remove padding
        data.sigBytes -= nPaddingBytes;
    }
};


/**
 * ISO 10126 padding strategy.
 */
CryptoJS.pad.Iso10126 = {
    pad: function (data, blockSize) {
        // Shortcut
        var blockSizeBytes = blockSize * 4;

        // Count padding bytes
        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

        // Pad
        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
            concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
    },

    unpad: function (data) {
        // Get number of padding bytes from last byte
        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

        // Remove padding
        data.sigBytes -= nPaddingBytes;
    }
};


/**
 * ISO/IEC 9797-1 Padding Method 2.
 */
CryptoJS.pad.Iso97971 = {
    pad: function (data, blockSize) {
        // Add 0x80 byte
        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

        // Zero pad the rest
        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
    },

    unpad: function (data) {
        // Remove zero padding
        CryptoJS.pad.ZeroPadding.unpad(data);

        // Remove one more byte -- the 0x80 byte
        data.sigBytes--;
    }
};


/**
 * Output Feedback block mode.
 */
CryptoJS.mode.OFB = (function () {
    var OFB = CryptoJS.lib.BlockCipherMode.extend();

    var Encryptor = OFB.Encryptor = OFB.extend({
        processBlock: function (words, offset) {
            // Shortcuts
            var cipher = this._cipher
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var keystream = this._keystream;

            // Generate keystream
            if (iv) {
                keystream = this._keystream = iv.slice(0);

                // Remove IV for subsequent blocks
                this._iv = undefined;
            }
            cipher.encryptBlock(keystream, 0);

            // Encrypt
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });

    OFB.Decryptor = Encryptor;

    return OFB;
}());


/**
 * A noop padding strategy.
 */
CryptoJS.pad.NoPadding = {
    pad: function () {
    },

    unpad: function () {
    }
};


(function (undefined) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var CipherParams = C_lib.CipherParams;
    var C_enc = C.enc;
    var Hex = C_enc.Hex;
    var C_format = C.format;

    var HexFormatter = C_format.Hex = {
        /**
         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
         *
         * @param {CipherParams} cipherParams The cipher params object.
         *
         * @return {string} The hexadecimally encoded string.
         *
         * @static
         *
         * @example
         *
         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
         */
        stringify: function (cipherParams) {
            return cipherParams.ciphertext.toString(Hex);
        },

        /**
         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
         *
         * @param {string} input The hexadecimally encoded string.
         *
         * @return {CipherParams} The cipher params object.
         *
         * @static
         *
         * @example
         *
         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
         */
        parse: function (input) {
            var ciphertext = Hex.parse(input);
            return CipherParams.create({ ciphertext: ciphertext });
        }
    };
}());


(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var BlockCipher = C_lib.BlockCipher;
    var C_algo = C.algo;

    // Lookup tables
    var SBOX = [];
    var INV_SBOX = [];
    var SUB_MIX_0 = [];
    var SUB_MIX_1 = [];
    var SUB_MIX_2 = [];
    var SUB_MIX_3 = [];
    var INV_SUB_MIX_0 = [];
    var INV_SUB_MIX_1 = [];
    var INV_SUB_MIX_2 = [];
    var INV_SUB_MIX_3 = [];

    // Compute lookup tables
    (function () {
        // Compute double table
        var d = [];
        for (var i = 0; i < 256; i++) {
            if (i < 128) {
                d[i] = i << 1;
            } else {
                d[i] = (i << 1) ^ 0x11b;
            }
        }

        // Walk GF(2^8)
        var x = 0;
        var xi = 0;
        for (var i = 0; i < 256; i++) {
            // Compute sbox
            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
            SBOX[x] = sx;
            INV_SBOX[sx] = x;

            // Compute multiplication
            var x2 = d[x];
            var x4 = d[x2];
            var x8 = d[x4];

            // Compute sub bytes, mix columns tables
            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
            SUB_MIX_2[x] = (t << 8) | (t >>> 24);
            SUB_MIX_3[x] = t;

            // Compute inv sub bytes, inv mix columns tables
            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
            INV_SUB_MIX_2[sx] = (t << 8) | (t >>> 24);
            INV_SUB_MIX_3[sx] = t;

            // Compute next counter
            if (!x) {
                x = xi = 1;
            } else {
                x = x2 ^ d[d[d[x8 ^ x2]]];
                xi ^= d[d[xi]];
            }
        }
    }());

    // Precomputed Rcon lookup
    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

    /**
     * AES block cipher algorithm.
     */
    var AES = C_algo.AES = BlockCipher.extend({
        _doReset: function () {
            var t;

            // Skip reset of nRounds has been set before and key did not change
            if (this._nRounds && this._keyPriorReset === this._key) {
                return;
            }

            // Shortcuts
            var key = this._keyPriorReset = this._key;
            var keyWords = key.words;
            var keySize = key.sigBytes / 4;

            // Compute number of rounds
            var nRounds = this._nRounds = keySize + 6;

            // Compute number of key schedule rows
            var ksRows = (nRounds + 1) * 4;

            // Compute key schedule
            var keySchedule = this._keySchedule = [];
            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
                if (ksRow < keySize) {
                    keySchedule[ksRow] = keyWords[ksRow];
                } else {
                    t = keySchedule[ksRow - 1];

                    if (!(ksRow % keySize)) {
                        // Rot word
                        t = (t << 8) | (t >>> 24);

                        // Sub word
                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

                        // Mix Rcon
                        t ^= RCON[(ksRow / keySize) | 0] << 24;
                    } else if (keySize > 6 && ksRow % keySize == 4) {
                        // Sub word
                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                    }

                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
                }
            }

            // Compute inv key schedule
            var invKeySchedule = this._invKeySchedule = [];
            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
                var ksRow = ksRows - invKsRow;

                if (invKsRow % 4) {
                    var t = keySchedule[ksRow];
                } else {
                    var t = keySchedule[ksRow - 4];
                }

                if (invKsRow < 4 || ksRow <= 4) {
                    invKeySchedule[invKsRow] = t;
                } else {
                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
                        INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
                }
            }
        },

        encryptBlock: function (M, offset) {
            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
        },

        decryptBlock: function (M, offset) {
            // Swap 2nd and 4th rows
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;

            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

            // Inv swap 2nd and 4th rows
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
        },

        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
            // Shortcut
            var nRounds = this._nRounds;

            // Get input, add round key
            var s0 = M[offset] ^ keySchedule[0];
            var s1 = M[offset + 1] ^ keySchedule[1];
            var s2 = M[offset + 2] ^ keySchedule[2];
            var s3 = M[offset + 3] ^ keySchedule[3];

            // Key schedule row counter
            var ksRow = 4;

            // Rounds
            for (var round = 1; round < nRounds; round++) {
                // Shift rows, sub bytes, mix columns, add round key
                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

                // Update state
                s0 = t0;
                s1 = t1;
                s2 = t2;
                s3 = t3;
            }

            // Shift rows, sub bytes, add round key
            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

            // Set output
            M[offset] = t0;
            M[offset + 1] = t1;
            M[offset + 2] = t2;
            M[offset + 3] = t3;
        },

        keySize: 256 / 32
    });

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
     */
    C.AES = BlockCipher._createHelper(AES);
}());


(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var BlockCipher = C_lib.BlockCipher;
    var C_algo = C.algo;

    // Permuted Choice 1 constants
    var PC1 = [
        57, 49, 41, 33, 25, 17, 9, 1,
        58, 50, 42, 34, 26, 18, 10, 2,
        59, 51, 43, 35, 27, 19, 11, 3,
        60, 52, 44, 36, 63, 55, 47, 39,
        31, 23, 15, 7, 62, 54, 46, 38,
        30, 22, 14, 6, 61, 53, 45, 37,
        29, 21, 13, 5, 28, 20, 12, 4
    ];

    // Permuted Choice 2 constants
    var PC2 = [
        14, 17, 11, 24, 1, 5,
        3, 28, 15, 6, 21, 10,
        23, 19, 12, 4, 26, 8,
        16, 7, 27, 20, 13, 2,
        41, 52, 31, 37, 47, 55,
        30, 40, 51, 45, 33, 48,
        44, 49, 39, 56, 34, 53,
        46, 42, 50, 36, 29, 32
    ];

    // Cumulative bit shift constants
    var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

    // SBOXes and round permutation constants
    var SBOX_P = [
        {
            0x0: 0x808200,
            0x10000000: 0x8000,
            0x20000000: 0x808002,
            0x30000000: 0x2,
            0x40000000: 0x200,
            0x50000000: 0x808202,
            0x60000000: 0x800202,
            0x70000000: 0x800000,
            0x80000000: 0x202,
            0x90000000: 0x800200,
            0xa0000000: 0x8200,
            0xb0000000: 0x808000,
            0xc0000000: 0x8002,
            0xd0000000: 0x800002,
            0xe0000000: 0x0,
            0xf0000000: 0x8202,
            0x8000000: 0x0,
            0x18000000: 0x808202,
            0x28000000: 0x8202,
            0x38000000: 0x8000,
            0x48000000: 0x808200,
            0x58000000: 0x200,
            0x68000000: 0x808002,
            0x78000000: 0x2,
            0x88000000: 0x800200,
            0x98000000: 0x8200,
            0xa8000000: 0x808000,
            0xb8000000: 0x800202,
            0xc8000000: 0x800002,
            0xd8000000: 0x8002,
            0xe8000000: 0x202,
            0xf8000000: 0x800000,
            0x1: 0x8000,
            0x10000001: 0x2,
            0x20000001: 0x808200,
            0x30000001: 0x800000,
            0x40000001: 0x808002,
            0x50000001: 0x8200,
            0x60000001: 0x200,
            0x70000001: 0x800202,
            0x80000001: 0x808202,
            0x90000001: 0x808000,
            0xa0000001: 0x800002,
            0xb0000001: 0x8202,
            0xc0000001: 0x202,
            0xd0000001: 0x800200,
            0xe0000001: 0x8002,
            0xf0000001: 0x0,
            0x8000001: 0x808202,
            0x18000001: 0x808000,
            0x28000001: 0x800000,
            0x38000001: 0x200,
            0x48000001: 0x8000,
            0x58000001: 0x800002,
            0x68000001: 0x2,
            0x78000001: 0x8202,
            0x88000001: 0x8002,
            0x98000001: 0x800202,
            0xa8000001: 0x202,
            0xb8000001: 0x808200,
            0xc8000001: 0x800200,
            0xd8000001: 0x0,
            0xe8000001: 0x8200,
            0xf8000001: 0x808002
        },
        {
            0x0: 0x40084010,
            0x1000000: 0x4000,
            0x2000000: 0x80000,
            0x3000000: 0x40080010,
            0x4000000: 0x40000010,
            0x5000000: 0x40084000,
            0x6000000: 0x40004000,
            0x7000000: 0x10,
            0x8000000: 0x84000,
            0x9000000: 0x40004010,
            0xa000000: 0x40000000,
            0xb000000: 0x84010,
            0xc000000: 0x80010,
            0xd000000: 0x0,
            0xe000000: 0x4010,
            0xf000000: 0x40080000,
            0x800000: 0x40004000,
            0x1800000: 0x84010,
            0x2800000: 0x10,
            0x3800000: 0x40004010,
            0x4800000: 0x40084010,
            0x5800000: 0x40000000,
            0x6800000: 0x80000,
            0x7800000: 0x40080010,
            0x8800000: 0x80010,
            0x9800000: 0x0,
            0xa800000: 0x4000,
            0xb800000: 0x40080000,
            0xc800000: 0x40000010,
            0xd800000: 0x84000,
            0xe800000: 0x40084000,
            0xf800000: 0x4010,
            0x10000000: 0x0,
            0x11000000: 0x40080010,
            0x12000000: 0x40004010,
            0x13000000: 0x40084000,
            0x14000000: 0x40080000,
            0x15000000: 0x10,
            0x16000000: 0x84010,
            0x17000000: 0x4000,
            0x18000000: 0x4010,
            0x19000000: 0x80000,
            0x1a000000: 0x80010,
            0x1b000000: 0x40000010,
            0x1c000000: 0x84000,
            0x1d000000: 0x40004000,
            0x1e000000: 0x40000000,
            0x1f000000: 0x40084010,
            0x10800000: 0x84010,
            0x11800000: 0x80000,
            0x12800000: 0x40080000,
            0x13800000: 0x4000,
            0x14800000: 0x40004000,
            0x15800000: 0x40084010,
            0x16800000: 0x10,
            0x17800000: 0x40000000,
            0x18800000: 0x40084000,
            0x19800000: 0x40000010,
            0x1a800000: 0x40004010,
            0x1b800000: 0x80010,
            0x1c800000: 0x0,
            0x1d800000: 0x4010,
            0x1e800000: 0x40080010,
            0x1f800000: 0x84000
        },
        {
            0x0: 0x104,
            0x100000: 0x0,
            0x200000: 0x4000100,
            0x300000: 0x10104,
            0x400000: 0x10004,
            0x500000: 0x4000004,
            0x600000: 0x4010104,
            0x700000: 0x4010000,
            0x800000: 0x4000000,
            0x900000: 0x4010100,
            0xa00000: 0x10100,
            0xb00000: 0x4010004,
            0xc00000: 0x4000104,
            0xd00000: 0x10000,
            0xe00000: 0x4,
            0xf00000: 0x100,
            0x80000: 0x4010100,
            0x180000: 0x4010004,
            0x280000: 0x0,
            0x380000: 0x4000100,
            0x480000: 0x4000004,
            0x580000: 0x10000,
            0x680000: 0x10004,
            0x780000: 0x104,
            0x880000: 0x4,
            0x980000: 0x100,
            0xa80000: 0x4010000,
            0xb80000: 0x10104,
            0xc80000: 0x10100,
            0xd80000: 0x4000104,
            0xe80000: 0x4010104,
            0xf80000: 0x4000000,
            0x1000000: 0x4010100,
            0x1100000: 0x10004,
            0x1200000: 0x10000,
            0x1300000: 0x4000100,
            0x1400000: 0x100,
            0x1500000: 0x4010104,
            0x1600000: 0x4000004,
            0x1700000: 0x0,
            0x1800000: 0x4000104,
            0x1900000: 0x4000000,
            0x1a00000: 0x4,
            0x1b00000: 0x10100,
            0x1c00000: 0x4010000,
            0x1d00000: 0x104,
            0x1e00000: 0x10104,
            0x1f00000: 0x4010004,
            0x1080000: 0x4000000,
            0x1180000: 0x104,
            0x1280000: 0x4010100,
            0x1380000: 0x0,
            0x1480000: 0x10004,
            0x1580000: 0x4000100,
            0x1680000: 0x100,
            0x1780000: 0x4010004,
            0x1880000: 0x10000,
            0x1980000: 0x4010104,
            0x1a80000: 0x10104,
            0x1b80000: 0x4000004,
            0x1c80000: 0x4000104,
            0x1d80000: 0x4010000,
            0x1e80000: 0x4,
            0x1f80000: 0x10100
        },
        {
            0x0: 0x80401000,
            0x10000: 0x80001040,
            0x20000: 0x401040,
            0x30000: 0x80400000,
            0x40000: 0x0,
            0x50000: 0x401000,
            0x60000: 0x80000040,
            0x70000: 0x400040,
            0x80000: 0x80000000,
            0x90000: 0x400000,
            0xa0000: 0x40,
            0xb0000: 0x80001000,
            0xc0000: 0x80400040,
            0xd0000: 0x1040,
            0xe0000: 0x1000,
            0xf0000: 0x80401040,
            0x8000: 0x80001040,
            0x18000: 0x40,
            0x28000: 0x80400040,
            0x38000: 0x80001000,
            0x48000: 0x401000,
            0x58000: 0x80401040,
            0x68000: 0x0,
            0x78000: 0x80400000,
            0x88000: 0x1000,
            0x98000: 0x80401000,
            0xa8000: 0x400000,
            0xb8000: 0x1040,
            0xc8000: 0x80000000,
            0xd8000: 0x400040,
            0xe8000: 0x401040,
            0xf8000: 0x80000040,
            0x100000: 0x400040,
            0x110000: 0x401000,
            0x120000: 0x80000040,
            0x130000: 0x0,
            0x140000: 0x1040,
            0x150000: 0x80400040,
            0x160000: 0x80401000,
            0x170000: 0x80001040,
            0x180000: 0x80401040,
            0x190000: 0x80000000,
            0x1a0000: 0x80400000,
            0x1b0000: 0x401040,
            0x1c0000: 0x80001000,
            0x1d0000: 0x400000,
            0x1e0000: 0x40,
            0x1f0000: 0x1000,
            0x108000: 0x80400000,
            0x118000: 0x80401040,
            0x128000: 0x0,
            0x138000: 0x401000,
            0x148000: 0x400040,
            0x158000: 0x80000000,
            0x168000: 0x80001040,
            0x178000: 0x40,
            0x188000: 0x80000040,
            0x198000: 0x1000,
            0x1a8000: 0x80001000,
            0x1b8000: 0x80400040,
            0x1c8000: 0x1040,
            0x1d8000: 0x80401000,
            0x1e8000: 0x400000,
            0x1f8000: 0x401040
        },
        {
            0x0: 0x80,
            0x1000: 0x1040000,
            0x2000: 0x40000,
            0x3000: 0x20000000,
            0x4000: 0x20040080,
            0x5000: 0x1000080,
            0x6000: 0x21000080,
            0x7000: 0x40080,
            0x8000: 0x1000000,
            0x9000: 0x20040000,
            0xa000: 0x20000080,
            0xb000: 0x21040080,
            0xc000: 0x21040000,
            0xd000: 0x0,
            0xe000: 0x1040080,
            0xf000: 0x21000000,
            0x800: 0x1040080,
            0x1800: 0x21000080,
            0x2800: 0x80,
            0x3800: 0x1040000,
            0x4800: 0x40000,
            0x5800: 0x20040080,
            0x6800: 0x21040000,
            0x7800: 0x20000000,
            0x8800: 0x20040000,
            0x9800: 0x0,
            0xa800: 0x21040080,
            0xb800: 0x1000080,
            0xc800: 0x20000080,
            0xd800: 0x21000000,
            0xe800: 0x1000000,
            0xf800: 0x40080,
            0x10000: 0x40000,
            0x11000: 0x80,
            0x12000: 0x20000000,
            0x13000: 0x21000080,
            0x14000: 0x1000080,
            0x15000: 0x21040000,
            0x16000: 0x20040080,
            0x17000: 0x1000000,
            0x18000: 0x21040080,
            0x19000: 0x21000000,
            0x1a000: 0x1040000,
            0x1b000: 0x20040000,
            0x1c000: 0x40080,
            0x1d000: 0x20000080,
            0x1e000: 0x0,
            0x1f000: 0x1040080,
            0x10800: 0x21000080,
            0x11800: 0x1000000,
            0x12800: 0x1040000,
            0x13800: 0x20040080,
            0x14800: 0x20000000,
            0x15800: 0x1040080,
            0x16800: 0x80,
            0x17800: 0x21040000,
            0x18800: 0x40080,
            0x19800: 0x21040080,
            0x1a800: 0x0,
            0x1b800: 0x21000000,
            0x1c800: 0x1000080,
            0x1d800: 0x40000,
            0x1e800: 0x20040000,
            0x1f800: 0x20000080
        },
        {
            0x0: 0x10000008,
            0x100: 0x2000,
            0x200: 0x10200000,
            0x300: 0x10202008,
            0x400: 0x10002000,
            0x500: 0x200000,
            0x600: 0x200008,
            0x700: 0x10000000,
            0x800: 0x0,
            0x900: 0x10002008,
            0xa00: 0x202000,
            0xb00: 0x8,
            0xc00: 0x10200008,
            0xd00: 0x202008,
            0xe00: 0x2008,
            0xf00: 0x10202000,
            0x80: 0x10200000,
            0x180: 0x10202008,
            0x280: 0x8,
            0x380: 0x200000,
            0x480: 0x202008,
            0x580: 0x10000008,
            0x680: 0x10002000,
            0x780: 0x2008,
            0x880: 0x200008,
            0x980: 0x2000,
            0xa80: 0x10002008,
            0xb80: 0x10200008,
            0xc80: 0x0,
            0xd80: 0x10202000,
            0xe80: 0x202000,
            0xf80: 0x10000000,
            0x1000: 0x10002000,
            0x1100: 0x10200008,
            0x1200: 0x10202008,
            0x1300: 0x2008,
            0x1400: 0x200000,
            0x1500: 0x10000000,
            0x1600: 0x10000008,
            0x1700: 0x202000,
            0x1800: 0x202008,
            0x1900: 0x0,
            0x1a00: 0x8,
            0x1b00: 0x10200000,
            0x1c00: 0x2000,
            0x1d00: 0x10002008,
            0x1e00: 0x10202000,
            0x1f00: 0x200008,
            0x1080: 0x8,
            0x1180: 0x202000,
            0x1280: 0x200000,
            0x1380: 0x10000008,
            0x1480: 0x10002000,
            0x1580: 0x2008,
            0x1680: 0x10202008,
            0x1780: 0x10200000,
            0x1880: 0x10202000,
            0x1980: 0x10200008,
            0x1a80: 0x2000,
            0x1b80: 0x202008,
            0x1c80: 0x200008,
            0x1d80: 0x0,
            0x1e80: 0x10000000,
            0x1f80: 0x10002008
        },
        {
            0x0: 0x100000,
            0x10: 0x2000401,
            0x20: 0x400,
            0x30: 0x100401,
            0x40: 0x2100401,
            0x50: 0x0,
            0x60: 0x1,
            0x70: 0x2100001,
            0x80: 0x2000400,
            0x90: 0x100001,
            0xa0: 0x2000001,
            0xb0: 0x2100400,
            0xc0: 0x2100000,
            0xd0: 0x401,
            0xe0: 0x100400,
            0xf0: 0x2000000,
            0x8: 0x2100001,
            0x18: 0x0,
            0x28: 0x2000401,
            0x38: 0x2100400,
            0x48: 0x100000,
            0x58: 0x2000001,
            0x68: 0x2000000,
            0x78: 0x401,
            0x88: 0x100401,
            0x98: 0x2000400,
            0xa8: 0x2100000,
            0xb8: 0x100001,
            0xc8: 0x400,
            0xd8: 0x2100401,
            0xe8: 0x1,
            0xf8: 0x100400,
            0x100: 0x2000000,
            0x110: 0x100000,
            0x120: 0x2000401,
            0x130: 0x2100001,
            0x140: 0x100001,
            0x150: 0x2000400,
            0x160: 0x2100400,
            0x170: 0x100401,
            0x180: 0x401,
            0x190: 0x2100401,
            0x1a0: 0x100400,
            0x1b0: 0x1,
            0x1c0: 0x0,
            0x1d0: 0x2100000,
            0x1e0: 0x2000001,
            0x1f0: 0x400,
            0x108: 0x100400,
            0x118: 0x2000401,
            0x128: 0x2100001,
            0x138: 0x1,
            0x148: 0x2000000,
            0x158: 0x100000,
            0x168: 0x401,
            0x178: 0x2100400,
            0x188: 0x2000001,
            0x198: 0x2100000,
            0x1a8: 0x0,
            0x1b8: 0x2100401,
            0x1c8: 0x100401,
            0x1d8: 0x400,
            0x1e8: 0x2000400,
            0x1f8: 0x100001
        },
        {
            0x0: 0x8000820,
            0x1: 0x20000,
            0x2: 0x8000000,
            0x3: 0x20,
            0x4: 0x20020,
            0x5: 0x8020820,
            0x6: 0x8020800,
            0x7: 0x800,
            0x8: 0x8020000,
            0x9: 0x8000800,
            0xa: 0x20800,
            0xb: 0x8020020,
            0xc: 0x820,
            0xd: 0x0,
            0xe: 0x8000020,
            0xf: 0x20820,
            0x80000000: 0x800,
            0x80000001: 0x8020820,
            0x80000002: 0x8000820,
            0x80000003: 0x8000000,
            0x80000004: 0x8020000,
            0x80000005: 0x20800,
            0x80000006: 0x20820,
            0x80000007: 0x20,
            0x80000008: 0x8000020,
            0x80000009: 0x820,
            0x8000000a: 0x20020,
            0x8000000b: 0x8020800,
            0x8000000c: 0x0,
            0x8000000d: 0x8020020,
            0x8000000e: 0x8000800,
            0x8000000f: 0x20000,
            0x10: 0x20820,
            0x11: 0x8020800,
            0x12: 0x20,
            0x13: 0x800,
            0x14: 0x8000800,
            0x15: 0x8000020,
            0x16: 0x8020020,
            0x17: 0x20000,
            0x18: 0x0,
            0x19: 0x20020,
            0x1a: 0x8020000,
            0x1b: 0x8000820,
            0x1c: 0x8020820,
            0x1d: 0x20800,
            0x1e: 0x820,
            0x1f: 0x8000000,
            0x80000010: 0x20000,
            0x80000011: 0x800,
            0x80000012: 0x8020020,
            0x80000013: 0x20820,
            0x80000014: 0x20,
            0x80000015: 0x8020000,
            0x80000016: 0x8000000,
            0x80000017: 0x8000820,
            0x80000018: 0x8020820,
            0x80000019: 0x8000020,
            0x8000001a: 0x8000800,
            0x8000001b: 0x0,
            0x8000001c: 0x20800,
            0x8000001d: 0x820,
            0x8000001e: 0x20020,
            0x8000001f: 0x8020800
        }
    ];

    // Masks that select the SBOX input
    var SBOX_MASK = [
        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
    ];

    /**
     * DES block cipher algorithm.
     */
    var DES = C_algo.DES = BlockCipher.extend({
        _doReset: function () {
            // Shortcuts
            var key = this._key;
            var keyWords = key.words;

            // Select 56 bits according to PC1
            var keyBits = [];
            for (var i = 0; i < 56; i++) {
                var keyBitPos = PC1[i] - 1;
                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
            }

            // Assemble 16 subkeys
            var subKeys = this._subKeys = [];
            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
                // Create subkey
                var subKey = subKeys[nSubKey] = [];

                // Shortcut
                var bitShift = BIT_SHIFTS[nSubKey];

                // Select 48 bits according to PC2
                for (var i = 0; i < 24; i++) {
                    // Select from the left 28 key bits
                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);

                    // Select from the right 28 key bits
                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
                }

                // Since each subkey is applied to an expanded 32-bit input,
                // the subkey can be broken into 8 values scaled to 32-bits,
                // which allows the key to be used without expansion
                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
                for (var i = 1; i < 7; i++) {
                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
                }
                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
            }

            // Compute inverse subkeys
            var invSubKeys = this._invSubKeys = [];
            for (var i = 0; i < 16; i++) {
                invSubKeys[i] = subKeys[15 - i];
            }
        },

        encryptBlock: function (M, offset) {
            this._doCryptBlock(M, offset, this._subKeys);
        },

        decryptBlock: function (M, offset) {
            this._doCryptBlock(M, offset, this._invSubKeys);
        },

        _doCryptBlock: function (M, offset, subKeys) {
            // Get input
            this._lBlock = M[offset];
            this._rBlock = M[offset + 1];

            // Initial permutation
            exchangeLR.call(this, 4, 0x0f0f0f0f);
            exchangeLR.call(this, 16, 0x0000ffff);
            exchangeRL.call(this, 2, 0x33333333);
            exchangeRL.call(this, 8, 0x00ff00ff);
            exchangeLR.call(this, 1, 0x55555555);

            // Rounds
            for (var round = 0; round < 16; round++) {
                // Shortcuts
                var subKey = subKeys[round];
                var lBlock = this._lBlock;
                var rBlock = this._rBlock;

                // Feistel function
                var f = 0;
                for (var i = 0; i < 8; i++) {
                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
                }
                this._lBlock = rBlock;
                this._rBlock = lBlock ^ f;
            }

            // Undo swap from last round
            var t = this._lBlock;
            this._lBlock = this._rBlock;
            this._rBlock = t;

            // Final permutation
            exchangeLR.call(this, 1, 0x55555555);
            exchangeRL.call(this, 8, 0x00ff00ff);
            exchangeRL.call(this, 2, 0x33333333);
            exchangeLR.call(this, 16, 0x0000ffff);
            exchangeLR.call(this, 4, 0x0f0f0f0f);

            // Set output
            M[offset] = this._lBlock;
            M[offset + 1] = this._rBlock;
        },

        keySize: 64 / 32,

        ivSize: 64 / 32,

        blockSize: 64 / 32
    });

    // Swap bits across the left and right words
    function exchangeLR(offset, mask) {
        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
        this._rBlock ^= t;
        this._lBlock ^= t << offset;
    }

    function exchangeRL(offset, mask) {
        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
        this._lBlock ^= t;
        this._rBlock ^= t << offset;
    }

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
     */
    C.DES = BlockCipher._createHelper(DES);

    /**
     * Triple-DES block cipher algorithm.
     */
    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
        _doReset: function () {
            // Shortcuts
            var key = this._key;
            var keyWords = key.words;
            // Make sure the key length is valid (64, 128 or >= 192 bit)
            if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
                throw new Error('Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.');
            }

            // Extend the key according to the keying options defined in 3DES standard
            var key1 = keyWords.slice(0, 2);
            var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
            var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);

            // Create DES instances
            this._des1 = DES.createEncryptor(WordArray.create(key1));
            this._des2 = DES.createEncryptor(WordArray.create(key2));
            this._des3 = DES.createEncryptor(WordArray.create(key3));
        },

        encryptBlock: function (M, offset) {
            this._des1.encryptBlock(M, offset);
            this._des2.decryptBlock(M, offset);
            this._des3.encryptBlock(M, offset);
        },

        decryptBlock: function (M, offset) {
            this._des3.decryptBlock(M, offset);
            this._des2.encryptBlock(M, offset);
            this._des1.decryptBlock(M, offset);
        },

        keySize: 192 / 32,

        ivSize: 64 / 32,

        blockSize: 64 / 32
    });

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
     */
    C.TripleDES = BlockCipher._createHelper(TripleDES);
}());


(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var StreamCipher = C_lib.StreamCipher;
    var C_algo = C.algo;

    /**
     * RC4 stream cipher algorithm.
     */
    var RC4 = C_algo.RC4 = StreamCipher.extend({
        _doReset: function () {
            // Shortcuts
            var key = this._key;
            var keyWords = key.words;
            var keySigBytes = key.sigBytes;

            // Init sbox
            var S = this._S = [];
            for (var i = 0; i < 256; i++) {
                S[i] = i;
            }

            // Key setup
            for (var i = 0, j = 0; i < 256; i++) {
                var keyByteIndex = i % keySigBytes;
                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;

                j = (j + S[i] + keyByte) % 256;

                // Swap
                var t = S[i];
                S[i] = S[j];
                S[j] = t;
            }

            // Counters
            this._i = this._j = 0;
        },

        _doProcessBlock: function (M, offset) {
            M[offset] ^= generateKeystreamWord.call(this);
        },

        keySize: 256 / 32,

        ivSize: 0
    });

    function generateKeystreamWord() {
        // Shortcuts
        var S = this._S;
        var i = this._i;
        var j = this._j;

        // Generate keystream word
        var keystreamWord = 0;
        for (var n = 0; n < 4; n++) {
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;

            // Swap
            var t = S[i];
            S[i] = S[j];
            S[j] = t;

            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
        }

        // Update counters
        this._i = i;
        this._j = j;

        return keystreamWord;
    }

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
     */
    C.RC4 = StreamCipher._createHelper(RC4);

    /**
     * Modified RC4 stream cipher algorithm.
     */
    var RC4Drop = C_algo.RC4Drop = RC4.extend({
        /**
         * Configuration options.
         *
         * @property {number} drop The number of keystream words to drop. Default 192
         */
        cfg: RC4.cfg.extend({
            drop: 192
        }),

        _doReset: function () {
            RC4._doReset.call(this);

            // Drop
            for (var i = this.cfg.drop; i > 0; i--) {
                generateKeystreamWord.call(this);
            }
        }
    });

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
     */
    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
}());


/** @preserve
 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
 * derived from CryptoJS.mode.CTR
 * Jan Hruby jhruby.web@gmail.com
 */
CryptoJS.mode.CTRGladman = (function () {
    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

    function incWord(word) {
        if (((word >> 24) & 0xff) === 0xff) { //overflow
            var b1 = (word >> 16) & 0xff;
            var b2 = (word >> 8) & 0xff;
            var b3 = word & 0xff;

            if (b1 === 0xff) // overflow b1
            {
                b1 = 0;
                if (b2 === 0xff) {
                    b2 = 0;
                    if (b3 === 0xff) {
                        b3 = 0;
                    }
                    else {
                        ++b3;
                    }
                }
                else {
                    ++b2;
                }
            }
            else {
                ++b1;
            }

            word = 0;
            word += (b1 << 16);
            word += (b2 << 8);
            word += b3;
        }
        else {
            word += (0x01 << 24);
        }
        return word;
    }

    function incCounter(counter) {
        if ((counter[0] = incWord(counter[0])) === 0) {
            // encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
            counter[1] = incWord(counter[1]);
        }
        return counter;
    }

    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
        processBlock: function (words, offset) {
            // Shortcuts
            var cipher = this._cipher
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;

            // Generate keystream
            if (iv) {
                counter = this._counter = iv.slice(0);

                // Remove IV for subsequent blocks
                this._iv = undefined;
            }

            incCounter(counter);

            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);

            // Encrypt
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });

    CTRGladman.Decryptor = Encryptor;

    return CTRGladman;
}());




(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var StreamCipher = C_lib.StreamCipher;
    var C_algo = C.algo;

    // Reusable objects
    var S = [];
    var C_ = [];
    var G = [];

    /**
     * Rabbit stream cipher algorithm
     */
    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
        _doReset: function () {
            // Shortcuts
            var K = this._key.words;
            var iv = this.cfg.iv;

            // Swap endian
            for (var i = 0; i < 4; i++) {
                K[i] = (((K[i] << 8) | (K[i] >>> 24)) & 0x00ff00ff) |
                    (((K[i] << 24) | (K[i] >>> 8)) & 0xff00ff00);
            }

            // Generate initial state values
            var X = this._X = [
                K[0], (K[3] << 16) | (K[2] >>> 16),
                K[1], (K[0] << 16) | (K[3] >>> 16),
                K[2], (K[1] << 16) | (K[0] >>> 16),
                K[3], (K[2] << 16) | (K[1] >>> 16)
            ];

            // Generate initial counter values
            var C = this._C = [
                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
            ];

            // Carry bit
            this._b = 0;

            // Iterate the system four times
            for (var i = 0; i < 4; i++) {
                nextState.call(this);
            }

            // Modify the counters
            for (var i = 0; i < 8; i++) {
                C[i] ^= X[(i + 4) & 7];
            }

            // IV setup
            if (iv) {
                // Shortcuts
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];

                // Generate four subvectors
                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
                var i3 = (i2 << 16) | (i0 & 0x0000ffff);

                // Modify counter values
                C[0] ^= i0;
                C[1] ^= i1;
                C[2] ^= i2;
                C[3] ^= i3;
                C[4] ^= i0;
                C[5] ^= i1;
                C[6] ^= i2;
                C[7] ^= i3;

                // Iterate the system four times
                for (var i = 0; i < 4; i++) {
                    nextState.call(this);
                }
            }
        },

        _doProcessBlock: function (M, offset) {
            // Shortcut
            var X = this._X;

            // Iterate the system
            nextState.call(this);

            // Generate four keystream words
            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

            for (var i = 0; i < 4; i++) {
                // Swap endian
                S[i] = (((S[i] << 8) | (S[i] >>> 24)) & 0x00ff00ff) |
                    (((S[i] << 24) | (S[i] >>> 8)) & 0xff00ff00);

                // Encrypt
                M[offset + i] ^= S[i];
            }
        },

        blockSize: 128 / 32,

        ivSize: 64 / 32
    });

    function nextState() {
        // Shortcuts
        var X = this._X;
        var C = this._C;

        // Save old counter values
        for (var i = 0; i < 8; i++) {
            C_[i] = C[i];
        }

        // Calculate new counter values
        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

        // Calculate the g-values
        for (var i = 0; i < 8; i++) {
            var gx = X[i] + C[i];

            // Construct high and low argument for squaring
            var ga = gx & 0xffff;
            var gb = gx >>> 16;

            // Calculate high and low result of squaring
            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

            // High XOR low
            G[i] = gh ^ gl;
        }

        // Calculate new state values
        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
        X[1] = (G[1] + ((G[0] << 8) | (G[0] >>> 24)) + G[7]) | 0;
        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
        X[3] = (G[3] + ((G[2] << 8) | (G[2] >>> 24)) + G[1]) | 0;
        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
        X[5] = (G[5] + ((G[4] << 8) | (G[4] >>> 24)) + G[3]) | 0;
        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
        X[7] = (G[7] + ((G[6] << 8) | (G[6] >>> 24)) + G[5]) | 0;
    }

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
     */
    C.Rabbit = StreamCipher._createHelper(Rabbit);
}());


/**
 * Counter block mode.
 */
CryptoJS.mode.CTR = (function () {
    var CTR = CryptoJS.lib.BlockCipherMode.extend();

    var Encryptor = CTR.Encryptor = CTR.extend({
        processBlock: function (words, offset) {
            // Shortcuts
            var cipher = this._cipher
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;

            // Generate keystream
            if (iv) {
                counter = this._counter = iv.slice(0);

                // Remove IV for subsequent blocks
                this._iv = undefined;
            }
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);

            // Increment counter
            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0

            // Encrypt
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });

    CTR.Decryptor = Encryptor;

    return CTR;
}());


(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var StreamCipher = C_lib.StreamCipher;
    var C_algo = C.algo;

    // Reusable objects
    var S = [];
    var C_ = [];
    var G = [];

    /**
     * Rabbit stream cipher algorithm.
     *
     * This is a legacy version that neglected to convert the key to little-endian.
     * This error doesn't affect the cipher's security,
     * but it does affect its compatibility with other implementations.
     */
    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
        _doReset: function () {
            // Shortcuts
            var K = this._key.words;
            var iv = this.cfg.iv;

            // Generate initial state values
            var X = this._X = [
                K[0], (K[3] << 16) | (K[2] >>> 16),
                K[1], (K[0] << 16) | (K[3] >>> 16),
                K[2], (K[1] << 16) | (K[0] >>> 16),
                K[3], (K[2] << 16) | (K[1] >>> 16)
            ];

            // Generate initial counter values
            var C = this._C = [
                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
            ];

            // Carry bit
            this._b = 0;

            // Iterate the system four times
            for (var i = 0; i < 4; i++) {
                nextState.call(this);
            }

            // Modify the counters
            for (var i = 0; i < 8; i++) {
                C[i] ^= X[(i + 4) & 7];
            }

            // IV setup
            if (iv) {
                // Shortcuts
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];

                // Generate four subvectors
                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
                var i3 = (i2 << 16) | (i0 & 0x0000ffff);

                // Modify counter values
                C[0] ^= i0;
                C[1] ^= i1;
                C[2] ^= i2;
                C[3] ^= i3;
                C[4] ^= i0;
                C[5] ^= i1;
                C[6] ^= i2;
                C[7] ^= i3;

                // Iterate the system four times
                for (var i = 0; i < 4; i++) {
                    nextState.call(this);
                }
            }
        },

        _doProcessBlock: function (M, offset) {
            // Shortcut
            var X = this._X;

            // Iterate the system
            nextState.call(this);

            // Generate four keystream words
            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

            for (var i = 0; i < 4; i++) {
                // Swap endian
                S[i] = (((S[i] << 8) | (S[i] >>> 24)) & 0x00ff00ff) |
                    (((S[i] << 24) | (S[i] >>> 8)) & 0xff00ff00);

                // Encrypt
                M[offset + i] ^= S[i];
            }
        },

        blockSize: 128 / 32,

        ivSize: 64 / 32
    });

    function nextState() {
        // Shortcuts
        var X = this._X;
        var C = this._C;

        // Save old counter values
        for (var i = 0; i < 8; i++) {
            C_[i] = C[i];
        }

        // Calculate new counter values
        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

        // Calculate the g-values
        for (var i = 0; i < 8; i++) {
            var gx = X[i] + C[i];

            // Construct high and low argument for squaring
            var ga = gx & 0xffff;
            var gb = gx >>> 16;

            // Calculate high and low result of squaring
            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

            // High XOR low
            G[i] = gh ^ gl;
        }

        // Calculate new state values
        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
        X[1] = (G[1] + ((G[0] << 8) | (G[0] >>> 24)) + G[7]) | 0;
        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
        X[3] = (G[3] + ((G[2] << 8) | (G[2] >>> 24)) + G[1]) | 0;
        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
        X[5] = (G[5] + ((G[4] << 8) | (G[4] >>> 24)) + G[3]) | 0;
        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
        X[7] = (G[7] + ((G[6] << 8) | (G[6] >>> 24)) + G[5]) | 0;
    }

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
     */
    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
}());


/**
 * Zero padding strategy.
 */
CryptoJS.pad.ZeroPadding = {
    pad: function (data, blockSize) {
        // Shortcut
        var blockSizeBytes = blockSize * 4;

        // Pad
        data.clamp();
        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
    },

    unpad: function (data) {
        // Shortcut
        var dataWords = data.words;

        // Unpad
        var i = data.sigBytes - 1;
        for (var i = data.sigBytes - 1; i >= 0; i--) {
            if (((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
                data.sigBytes = i + 1;
                break;
            }
        }
    }
};

window.CryptoJS = CryptoJS;

window.zs = window.zs || {};
window.zs.log = window.zs.log || {};
(function (exports) {
    'use strict';

    let Level;
    (function (Level) {
        Level[Level["DEBUG"] = 0] = "DEBUG";
        Level[Level["INFO"] = 1] = "INFO";
        Level[Level["WARN"] = 2] = "WARN";
        Level[Level["ERROR"] = 3] = "ERROR";
        Level[Level["FATAL"] = 4] = "FATAL";
    })(Level = Level || (Level = {}));

    class Configs { }
    Configs.logLevel = Level.INFO;
    Configs.logTime = true;
    Configs.logMilliseconds = false;
    Configs.fatalThrow = false;
    Configs.color_Debug = '#08f';
    Configs.color_Info = '#000';
    Configs.color_Warn = '#f80';
    Configs.color_Error = '#f00';
    Configs.color_Fatal = '#900';

    function log(msg, category, level, data) {
        if(window.tt){
            console.log(msg);
            return;
        }
        let output = '';
        if (level == null) {
            level = Level.INFO;
        }
        if (Configs.logLevel > level) {
            return;
        }
        let logColor = '#000';
        switch (level) {
            case Level.DEBUG:
                output = '[DEBUG] ';
                logColor = Configs.color_Debug;
                break;
            case Level.INFO:
                output = '[INFO] ';
                logColor = Configs.color_Info;
                break;
            case Level.WARN:
                output = '[WARN] ';
                logColor = Configs.color_Warn;
                break;
            case Level.ERROR:
                output = '[ERROR] ';
                logColor = Configs.color_Error;
                break;
            case Level.FATAL:
                output = '[FATAL] ';
                logColor = Configs.color_Fatal;
                break;
        }
        if (category && category.length > 0) {
            output += '<' + category + '> ';
        }
        output += msg;
        if (Configs.logTime) {
            let date = new Date();
            let time = '    ' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            if (Configs.logMilliseconds) {
                time = time + ':' + date.getMilliseconds();
            }
            output += time;
        }
        if (data) {
            console.log('%c ' + output, 'color:' + logColor, data);
        } else {
            console.log('%c ' + output, 'color:' + logColor);
        }
        if (level == Level.FATAL && Configs.fatalThrow) {
            throw new Error(output);
        }
    }
    function debug(msg, category, data) { log(msg, category, Level.DEBUG, data); }
    function info(msg, category, data) { log(msg, category, Level.INFO, data); }
    function warn(msg, category, data) { log(msg, category, Level.WARN, data); }
    function error(msg, category, data) { log(msg, category, Level.ERROR, data); }
    function fatal(msg, category, data) { log(msg, category, Level.FATAL, data); }

    exports.Level = Level;
    exports.Configs = Configs;
    exports.log = log;
    exports.debug = debug;
    exports.info = info;
    exports.warn = warn;
    exports.error = error;
    exports.fatal = fatal;
}(window.zs.log = window.zs.log || {})); window.zs = window.zs || {};

(function (exports) {
    'use strict';

    let ResourceType;
    (function (ResourceType) {
        ResourceType[ResourceType["Common"] = 0] = "Common";
        ResourceType[ResourceType["Scene"] = 1] = "Scene";
        ResourceType[ResourceType["Scene3D"] = 2] = "Scene3D";
        ResourceType[ResourceType["Sprite3D"] = 3] = "Sprite3D";
        ResourceType[ResourceType["FGUIPack"] = 4] = "FGUIPack";
    })(ResourceType = ResourceType || (ResourceType = {}));

    class resource {
        static init() {
            resource.loadedPacks = [];
            resource.preloadPacks = [];
            resource.subpacks = {};
            if (configs.gameCfg && configs.gameCfg.subpackages) {
                let subpacks = configs.gameCfg.subpackages;
                for (let key in configs.gameCfg.subpackages) {
                    if (key == null || key.length <= 0) { continue; }
                    let isPreload = false;
                    let pack = subpacks[key];
                    if (key[0] === '*') {
                        isPreload = true;
                        key = key.slice(1);
                        resource.preloadPacks.push(key);
                    }
                    resource.subpacks[key] = pack;
                }
            }
        }

        static async preload() {
            if (resource.preloadPacks == null || resource.preloadPacks.length <= 0) { return; }
            for (let i = 0, n = resource.preloadPacks.length; i < n; i++) {
                let key = resource.preloadPacks[i];
                await zs.platform.async.loadSubpackage({ pkgName: key })
                    .then(() => {
                        resource.loadedPacks.push(key);
                        zs.log.debug("预加载分包" + key + "成功!");
                    })
                    .catch(() => {
                        zs.log.warn("预加载分包" + key + "失败!");
                    });
            }
        }

        static check(url) {
            for (let key in resource.subpacks) {
                if (zs.utils.startwith(url, resource.subpacks[key])) {
                    return key;
                }
            }
            return null;
        }

        static isPackLoaded(key) {
            return this.loadedPacks.indexOf(key) >= 0;
        }

        static isLoading() {
            return resource.numLoading > 0;
        }

        static load(url, type) {
            return new zs.Coop((resolve, reject) => {
                if (!url) { return resolve(); }
                let packKey = resource.check(url);
                resource.numLoading++;
                if (packKey && !this.isPackLoaded(packKey)) {
                    zs.platform.async.loadSubpackage({ pkgName: packKey })
                        .then(() => {
                            resource.loadedPacks.push(packKey);
                            resource.nativeLoad(url, type).then((res) => {
                                resource.numLoading--;
                                resolve(res);
                            }).catch(e => e);
                        })
                        .catch(() => {
                            resource.nativeLoad(url, type).then((res) => {
                                resource.numLoading--;
                                resolve(res);
                            }).catch(e => e);
                        });
                } else {
                    resource.nativeLoad(url, type).then((res) => {
                        resource.numLoading--;
                        resolve(res);
                    }).catch(e => e);
                }
            });
        }

        static nativeLoad(url, type, ignoreCache) {
            return new zs.Coop((resolve, reject) => {
                let existResource = zs.proxy.Loader.getRes(url);
                if (existResource) {
                    resolve(existResource);
                } else {
                    switch (type) {
                        case ResourceType.Scene:
                            zs.proxy.Loader.loadScene(url, zs.Handler.create(null, (scene) => {
                                resolve(scene);
                            }));
                            break;
                        case ResourceType.Scene3D:
                            zs.proxy.Loader.loadScene3D(url, zs.Handler.create(null, (scene) => {
                                resolve(scene);
                            }));
                            break;
                        case ResourceType.Sprite3D:
                            zs.proxy.Loader.loadSprite3D(url, zs.Handler.create(null, (sprite) => {
                                resolve(sprite);
                            }));
                            break;
                        case ResourceType.FGUIPack:
                            zs.proxy.loadFGUIPack(url).then(resolve).catch(reject);
                            break;
                        default:
                            zs.proxy.Loader.load(url, zs.Handler.create(null, (res) => {
                                resolve(res);
                            }), ignoreCache);
                            break;
                    }
                }
            });
        }
        static destroyFGUIPackage(pack) {
            if (pack) {
                pack.dispose();
            }
        }
        static destroyFGUIPackageByName(name) {
            let pack = fairygui.UIPackage.getByName(name);
            this.destroyFGUIPackage(pack);
        }

    }
    resource.subpacks = {};
    resource.preloadPacks = [];
    resource.loadedPacks = [];
    resource.numLoading = 0;

    class configs {
        static async init() {
            configs.gameCfg = await zs.resource.load(configs.gameCfgPath).catch(e => e);
            configs.productCfg = await zs.resource.load(configs.porductCfgPath).catch(e => e);
            configs.uiCfg = await zs.resource.load(configs.uiCfgPath).catch(e => e);
            if (!configs.gameCfg.secret) {
                configs.gameCfg.secret = "7CaD3L23LlGnENd1";
            }
        }
        static async load(key, path, url, isAsync) {
            if (configs.list == null) {
                configs.list = {};
            }
            if (configs.list[key]) {
                return new zs.Coop((resolve, reject) => {
                    resolve(configs.list[key]);
                });
            }
            if (url == null || isAsync) {
                await zs.resource.load(path)
                    .then((result) => {
                        configs.list[key] = result;
                    })
                    .catch(() => {
                        zs.log.warn("本地无法正确加载配置表 " + key + " 路径为 " + path, "Configs");
                    });
            }
            if (url) {
                let urlSplit = url.split('>>', 2);
                let lenUrlSplit = urlSplit.length;
                if (lenUrlSplit > 0) {
                    let module = urlSplit.length > 1 ? urlSplit[0] : null;
                    let table = urlSplit.length > 1 ? urlSplit[1] : urlSplit[0];
                    if (isAsync) {
                        zs.network.config(false, module, table)
                            .then((result) => {
                                result && (configs.list[key] = result);
                            })
                            .catch(() => {
                                zs.log.warn("远程无法正确加载配置表 " + key + " 路径为 " + url, "Configs");
                            });
                    } else {
                        let result = await zs.network.config(false, module, table)
                            .catch(() => {
                                zs.log.warn("远程无法正确加载配置表 " + key + " 路径为 " + url, "Configs");
                            });
                        result && (configs.list[key] = result);
                    }
                }
            }
            return new zs.Coop((resolve, reject) => {
                resolve(configs.list[key]);
            });
        }
        static get(key) {
            if (configs.list == null || configs.list[key] == null) {
                return null;
            }
            return configs.list[key];
        }
    }
    configs.gameCfgPath = zs.proxy.Configs.gameCfgPath;
    configs.porductCfgPath = zs.proxy.Configs.porductCfgPath;
    configs.uiCfgPath = zs.proxy.Configs.uiCfgPath;
    class prefabs {
        static async load(key, path, url, isAsync) {
            if (configs.list == null) {
                configs.list = {};
            }
            if (configs.list[key]) {
                return new zs.Coop((resolve, reject) => {
                    resolve(configs.list[key]);
                });
            }
            if (url == null || isAsync) {
                let prefab = await zs.resource.load(path, zs.ResourceType.Sprite3D)
                    .catch(() => {
                        zs.log.warn("本地无法正确加载预制体 " + key + " 路径为 " + path, "Prefabs");
                    });
                configs.list[key] = prefab;
            }
            if (url) {
                // TODO 加入网络获取配置
            }
            return new zs.Coop((resolve, reject) => {
                resolve(configs.list[key]);
            });
        }
        static get(key) {
            if (configs.list == null || configs.list[key] == null) {
                return null;
            }
            return configs.list[key];
        }
    }

    exports.ResourceType = ResourceType;
    exports.resource = resource;
    exports.configs = configs;
    exports.prefabs = prefabs;
}(window.zs = window.zs || {})); window.zs = window.zs || {};

(function (exports) {
    'use strict';

    class Ease { }
    Ease.linearNone = "linearNone";
    Ease.linearIn = "linearIn";
    Ease.linearInOut = "linearInOut";
    Ease.linearOut = "linearOut";
    Ease.bounceIn = "bounceIn";
    Ease.bounceInOut = "bounceInOut";
    Ease.bounceOut = "bounceOut";
    Ease.backIn = "backIn";
    Ease.backInOut = "backInOut";
    Ease.backOut = "backOut";
    Ease.elasticIn = "elasticIn";
    Ease.elasticInOut = "elasticInOut";
    Ease.elasticOut = "elasticOut";
    Ease.strongIn = "strongIn";
    Ease.strongInOut = "strongInOut";
    Ease.strongOut = "strongOut";
    Ease.sineInOut = "sineInOut";
    Ease.sineIn = "sineIn";
    Ease.sineOut = "sineOut";
    Ease.quintIn = "quintIn";
    Ease.quintInOut = "quintInOut";
    Ease.quintOut = "quintOut";
    Ease.quartIn = "quartIn";
    Ease.quartInOut = "quartInOut";
    Ease.quartOut = "quartOut";
    Ease.cubicIn = "cubicIn";
    Ease.cubicInOut = "cubicInOut";
    Ease.cubicOut = "cubicOut";
    Ease.quadIn = "quadIn";
    Ease.quadInOut = "quadInOut";
    Ease.quadOut = "quadOut";
    Ease.expoIn = "expoIn";
    Ease.expoInOut = "expoInOut";
    Ease.expoOut = "expoOut";
    Ease.circIn = "circIn";
    Ease.circInOut = "circInOut";
    Ease.circOut = "circOut";

    function Coop(excutor, onFullfiled, onRejected) {
        let promise = new Promise(excutor);

        if (onFullfiled) {
            if (onRejected) {
                let isHandled = false;
                promise.then((result) => {
                    if (!isHandled) {
                        isHandled = true;
                        onFullfiled(result);
                    }
                }).catch((error) => {
                    console.error("coop error", error);
                    if (!isHandled) {
                        isHandled = true;
                        onRejected(error);
                    }
                });
            } else {
                promise.then(onFullfiled).catch((error) => {
                    console.error("promise rejected", error);
                });
            }
        } else if (onRejected) {
            promise.catch((error) => {
                console.error("coop error", error);
                onRejected(error);
            });
        } else {
            promise.catch((error) => {
                console.error("promise rejected", error);
            });
        }

        return promise;
    }

    class Handler {
        constructor(caller = null, method = null, args = null, once = false) {
            this.once = false;
            this._id = 0;
            this.setTo(caller, method, args, once);
        }
        setTo(caller, method, args, once = false) {
            this._id = Handler._gid++;
            this.caller = caller;
            this.method = method;
            this.args = args;
            this.once = once;
            return this;
        }
        run() {
            if (this.method == null)
                return null;
            var id = this._id;
            var result = this.method.apply(this.caller, this.args);
            this._id === id && this.once && this.recover();
            return result;
        }
        runWith(data) {
            if (this.method == null)
                return null;
            var id = this._id;
            if (data == null)
                var result = this.method.apply(this.caller, this.args);
            else if (!this.args && !data.unshift)
                result = this.method.call(this.caller, data);
            else if (this.args)
                result = this.method.apply(this.caller, this.args.concat(data));
            else
                result = this.method.apply(this.caller, data);
            this._id === id && this.once && this.recover();
            return result;
        }
        clear() {
            this.caller = null;
            this.method = null;
            this.args = null;
            return this;
        }
        recover() {
            if (this._id > 0) {
                this._id = 0;
                Handler._pool.push(this.clear());
            }
        }
        static create(caller, method, args = null, once = true) {
            if (Handler._pool.length)
                return Handler._pool.pop().setTo(caller, method, args, once);
            return new Handler(caller, method, args, once);
        }
    }
    Handler._pool = [];
    Handler._gid = 1;

    class Timer {
        static get inst() {
            if (!this._inst) {
                this._inst = new Timer();
            }
            return this._inst;
        }
        static getGID() {
            let gid = this._gid;
            this._gid++;
            return gid;
        }
        constructor(autoActive = true) {
            this.scale = 1;
            this.currTimer = Date.now();
            this.currFrame = 0;
            this._delta = 0;
            this._lastTimer = Date.now();
            this._map = [];
            this._handlers = [];
            this._temp = [];
            this._count = 0;
            autoActive && Timer.gTimer && Timer.gTimer.frameLoop(1, this, this._update);
        }
        get delta() {
            return this._delta;
        }
        _update() {
            if (this.scale <= 0) {
                this._lastTimer = Date.now();
                this._delta = 0;
                return;
            }
            var frame = this.currFrame = this.currFrame + this.scale;
            var now = Date.now();
            var awake = (now - this._lastTimer) > 30000;
            this._delta = (now - this._lastTimer) * this.scale;
            var timer = this.currTimer = this.currTimer + this._delta;
            this._lastTimer = now;
            var handlers = this._handlers;
            this._count = 0;
            for (var i = 0, n = handlers.length; i < n; i++) {
                var handler = handlers[i];
                if (handler.method !== null) {
                    var t = handler.userFrame ? frame : timer;
                    if (t >= handler.exeTime) {
                        if (handler.repeat) {
                            if (!handler.jumpFrame || awake) {
                                handler.exeTime += handler.delay;
                                handler.run(false);
                                if (t > handler.exeTime) {
                                    handler.exeTime += Math.ceil((t - handler.exeTime) / handler.delay) * handler.delay;
                                }
                            }
                            else {
                                while (t >= handler.exeTime) {
                                    handler.exeTime += handler.delay;
                                    handler.run(false);
                                }
                            }
                        }
                        else {
                            handler.run(true);
                        }
                    }
                }
                else {
                    this._count++;
                }
            }
            if (this._count > 30 || frame % 200 === 0)
                this._clearHandlers();
        }
        _clearHandlers() {
            var handlers = this._handlers;
            for (var i = 0, n = handlers.length; i < n; i++) {
                var handler = handlers[i];
                if (handler.method !== null)
                    this._temp.push(handler);
                else
                    this._recoverHandler(handler);
            }
            this._handlers = this._temp;
            handlers.length = 0;
            this._temp = handlers;
        }
        _recoverHandler(handler) {
            if (this._map[handler.key] == handler)
                this._map[handler.key] = null;
            handler.clear();
            Timer._pool.push(handler);
        }
        _create(useFrame, repeat, delay, caller, method, args, coverBefore) {
            if (!delay) {
                method.apply(caller, args);
                return null;
            }
            if (coverBefore) {
                var handler = this._getHandler(caller, method);
                if (handler) {
                    handler.repeat = repeat;
                    handler.userFrame = useFrame;
                    handler.delay = delay;
                    handler.caller = caller;
                    handler.method = method;
                    handler.args = args;
                    handler.exeTime = delay + (useFrame ? this.currFrame : this.currTimer + Date.now() - this._lastTimer);
                    return handler;
                }
            }
            handler = Timer._pool.length > 0 ? Timer._pool.pop() : new TimerHandler();
            handler.repeat = repeat;
            handler.userFrame = useFrame;
            handler.delay = delay;
            handler.caller = caller;
            handler.method = method;
            handler.args = args;
            handler.exeTime = delay + (useFrame ? this.currFrame : this.currTimer + Date.now() - this._lastTimer);
            this._indexHandler(handler);
            this._handlers.push(handler);
            return handler;
        }
        _indexHandler(handler) {
            var caller = handler.caller;
            var method = handler.method;
            var cid = caller ? caller.$_GID || (caller.$_GID = Timer.getGID()) : 0;
            var mid = method.$_TID || (method.$_TID = (Timer._mid++) * 100000);
            handler.key = cid + mid;
            this._map[handler.key] = handler;
        }
        once(delay, caller, method, args = null, coverBefore = true) {
            this._create(false, false, delay, caller, method, args, coverBefore);
        }
        loop(delay, caller, method, args = null, coverBefore = true, jumpFrame = false) {
            var handler = this._create(false, true, delay, caller, method, args, coverBefore);
            if (handler)
                handler.jumpFrame = jumpFrame;
        }
        frameOnce(delay, caller, method, args = null, coverBefore = true) {
            this._create(true, false, delay, caller, method, args, coverBefore);
        }
        frameLoop(delay, caller, method, args = null, coverBefore = true) {
            this._create(true, true, delay, caller, method, args, coverBefore);
        }
        toString() {
            return " handlers:" + this._handlers.length + " pool:" + Timer._pool.length;
        }
        clear(caller, method) {
            var handler = this._getHandler(caller, method);
            if (handler) {
                this._map[handler.key] = null;
                handler.key = 0;
                handler.clear();
            }
        }
        clearAll(caller) {
            if (!caller)
                return;
            for (var i = 0, n = this._handlers.length; i < n; i++) {
                var handler = this._handlers[i];
                if (handler.caller === caller) {
                    this._map[handler.key] = null;
                    handler.key = 0;
                    handler.clear();
                }
            }
        }
        _getHandler(caller, method) {
            var cid = caller ? caller.$_GID || (caller.$_GID = Timer.getGID()) : 0;
            var mid = method.$_TID || (method.$_TID = (Timer._mid++) * 100000);
            return this._map[cid + mid];
        }
        callLater(caller, method, args = null) {
            CallLater.I.callLater(caller, method, args);
        }
        runCallLater(caller, method) {
            CallLater.I.runCallLater(caller, method);
        }
        runTimer(caller, method) {
            var handler = this._getHandler(caller, method);
            if (handler && handler.method != null) {
                this._map[handler.key] = null;
                handler.run(true);
            }
        }
        pause() {
            this.scale = 0;
        }
        resume() {
            this.scale = 1;
        }
    }
    Timer.gTimer = null;
    Timer._pool = [];
    Timer._gid = 1;
    Timer._mid = 1;

    class TimerHandler {
        clear() {
            this.caller = null;
            this.method = null;
            this.args = null;
        }
        run(withClear) {
            var caller = this.caller;
            if (caller && caller.destroyed)
                return this.clear();
            var method = this.method;
            var args = this.args;
            withClear && this.clear();
            if (method == null)
                return;
            args ? method.apply(caller, args) : method.call(caller);
        }
    }

    class Tween {
        static to(target, props, duration, ease = null, complete = null, delay = 0) {
            return zs.proxy.Tween.to(target, props, duration, ease, complete, delay);
        }
        static clearAll(target) {
            zs.proxy.Tween.clearAll(target);
        }
    }

    class utils {
        static getOrAddComponent(node, type) {
            if (node == null) {
                return;
            }
            let component = node.getComponent(type);
            if (component == null) {
                component = node.addComponent(type);
            }
            return component;
        }
        static sleep(timeout) {
            return new Coop((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, timeout);
            });
        }
        static isToday(timestamp, isSecond) {
            let tsNow = Date.now();
            if (tsNow - timestamp > (isSecond ? 86400 : 86400000)) { return false; }
            let now = new Date(tsNow);
            let target = new Date(timestamp);
            if (now.getDate() != target.getDate()) {
                return false;
            } else {
                return true;
            }
        }
        static randInt(min, max) {
            return Math.random() * (max - min) + min << 0;
        }
        static srandInt(min, max) {
            return this.seedRandom() * (max - min) + min << 0;
        }
        static rand(min, max) {
            return Math.random() * (max - min) + min;
        }
        static srand(min, max) {
            return this.seedRandom() * (max - min) + min;
        }
        static seedRandom() {
            this.randSeed = (this.randSeed * 9301 + 49297) % 233280;
            return this.randSeed / 233280;
        }
        static setRandSeed(seed) {
            this.randSeed = seed;
            this.randSeed = (this.randSeed * 9301 + 49297) % 233280;
        }
        static pickNumbers(from, to, numPick) {
            if (numPick <= 0) { return []; }
            (from > to) && ([from, to] = [to, from]);

            let result = [];
            let picks = [];
            for (let i = from; i <= to; i++) { picks.push(i); }
            if (numPick >= picks.length) { numPick = picks.length; }

            for (let i = 0; i < numPick; i++) {
                let idx = this.randInt(0, picks.length);
                result.push(picks[idx]);
                picks.splice(idx, 1);
            }

            return result;
        }
        static spickNumbers(from, to, numPick, seed) {
            if (numPick <= 0) { return []; }
            (from > to) && ([from, to] = [to, from]);

            let result = [];
            let picks = [];
            for (let i = from; i <= to; i++) { picks.push(i); }
            if (numPick >= picks.length) { numPick = picks.length; }

            if (seed) { this.setRandSeed(seed); }
            for (let i = 0; i < numPick; i++) {
                let idx = this.srandInt(0, picks.length);
                result.push(picks[idx]);
                picks.splice(idx, 1);
            }

            return result;
        }
        static pickArray(array, numPick) {
            if (array == null || array.length <= 0 || numPick <= 0) { return []; }

            let result = [];
            let picks = array.concat();
            if (numPick >= picks.length) { numPick = picks.length; }

            for (let i = 0; i < numPick; i++) {
                let idx = this.randInt(0, picks.length);
                result.push(picks[idx]);
                picks.splice(idx, 1);
            }
            return result;
        }
        static spickArray(array, numPick, seed) {
            if (array == null || array.length <= 0 || numPick <= 0) { return []; }

            let result = [];
            let picks = array.concat();
            if (numPick >= picks.length) { numPick = picks.length; }

            if (seed) { this.setRandSeed(seed); }
            for (let i = 0; i < numPick; i++) {
                let idx = this.srandInt(0, picks.length);
                result.push(picks[idx]);
                picks.splice(idx, 1);
            }
            return result;
        }
        static isNumber(val) {
            let regPos = /^\d+(\.\d+)?$/; //非负浮点数
            let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
            if (regPos.test(val) || regNeg.test(val)) {
                return true;
            } else {
                return false;
            }
        }
        static startwith(str1, str2) {
            if (str1.length < str2.length) { return false; }

            return str1.slice(0, str2.length) == str2;
        }
        static randByte() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
        }
        static flatKVJson(jsonObj, numParse) {
            let result = {};
            if (!Array.isArray(jsonObj) || jsonObj.length <= 0) { return result; }
            for (let i = 0, n = jsonObj.length; i < n; i++) {
                let kv = jsonObj[i];
                if (kv.key && kv.value) {
                    let val = kv.value;
                    if (numParse && typeof kv.value !== 'number') {
                        let tryNum = parseFloat(kv.value);
                        if (!isNaN(tryNum)) {
                            val = kv.value;
                        }
                    }
                    result[kv.key] = val;
                }
            }
            return result;
        }
        static getItem(key) {
            return zs.proxy.LocalStorage.getItem(zs.core.appId + '.' + key);
        }
        static setItem(key, value) {
            zs.proxy.LocalStorage.setItem(zs.core.appId + '.' + key, value);
        }
        static arrayDeepCopy(arr) {
            if (!Array.isArray(arr) || arr.length <= 0) { return []; }
            let result = [];
            for (let i = 0, n = arr.length; i < n; i++) {
                let item = arr[i];
                if (typeof item === 'object') {
                    let copyItem = {};
                    for (let key in item) {
                        copyItem[key] = item[key];
                    }
                    result.push(copyItem);
                } else {
                    result.push(item);
                }
            }
            return result;
        }
        static getEventCode(event) {
            if (zs.network.loginCode == null || zs.core.userId == null) {
                return null;
            }
            return zs.configs.gameCfg.appId + "-" + zs.network.loginCode + "-" + zs.core.userId + "-" + event;
        }
    }
    utils.randSeed = 5;

    exports.Ease = Ease;
    exports.Coop = Coop;
    exports.Handler = Handler;
    exports.Timer = Timer;
    exports.Tween = Tween;
    exports.utils = utils;
}(window.zs = window.zs || {})); window.zs = window.zs || {};

(function (exports) {
    'use strict';
    class td {
        static init() {
            window.TDCORE && window.TDCORE();
        }
        // 内部调用接口，原则上不允许暴露使用
        static justTrack(evt, label, params) {
            if (!window.TDAPP) { return; }
            zs.log.debug("TD数据统计 " + evt + " : " + label, "Talking Data", params);
            TDAPP.onEvent(evt, label, params ? params : null);
        }
        static track(evtId, params) {
            if (!window.TDAPP) { return; }
            let evtIdSplit = evtId.split('_', 2);
            let config = zs.configs.gameCfg.tdConfig;
            let info = null;
            let evtLabel = evtId;
            if (evtIdSplit.length > 1) {
                info = config[evtIdSplit[0] + '_'];
                if (info) {
                    evtLabel = info + evtIdSplit[1];
                }
            } else {
                info = config[evtId];
                if (info) {
                    evtLabel = info;
                }
            }
            zs.log.debug("TD数据统计 " + evtId + " : " + evtLabel, "Talking Data", params);
            TDAPP.onEvent(evtLabel, evtLabel, params ? params : null);
        }
    }
    td.defaultKey = '17842E258BB240F798B4DC3ADECF1A38';
    td.appName = null;
    td.appKey = null;
    td.versionName = '';
    td.channel = '';
    td.startupKey = "startup";
    td.startupDesc = "1-启动游戏";
    td.gameStartKey = "gameStart";
    td.gameStartDesc = "2-开始游戏";
    td.descMap = {
        "PRODUCT_START": "3-产品启动",
        "PRODUCT_BEGIN": "4-产品开始",
        "GAME_HOME": "5-游戏首页",
        "PRODUCT_HOME_PLAY": "6-首页游玩",
        "GAME_PLAY": "7-游戏游玩",
        "PRODUCT_PLAY_END": "8-游玩结束",
        "GAME_END": "9-游戏结束",
        "PRODUCT_FINISH": "10-产品结束"
    }

    exports.td = td;
}(window.zs = window.zs || {})); window.zs = window.zs || {};

(function (exports) {
    'use strict';

    class product {

        static get keys() {
            if (this._keys == null) {
                this._keys = {};
            }
            return this._keys;
        }

        static cleanProductKey(value) {
            return value.replace(/\s/g, "").replace('（', '(').replace('）', ')');
        }

        static init(productDef) {
            this.scene = zs.utils.getItem(this.firstSceneCache);
            if (!this.scene) {
                this.scene = zs.platform.sync.getScene();
                if (this.scene) {
                    zs.utils.setItem(this.firstSceneCache, this.scene);
                }
            }
            if (productDef == null) { return; }
            this._defines = productDef;
            for (let key in productDef) {
                key = this.cleanProductKey(key);
                if (zs.configs.gameCfg.pure) {
                    this.keys[key] = null;
                    this._defines[key] = null;
                } else {
                    this.keys[key] = productDef[key];
                }
            }
        }
        static sync(switchs) {
            if (switchs == null || switchs.length <= 0 || zs.configs.gameCfg.pure) { return; }
            if (switchs["zs_country_white_list"]) {
                this.country = switchs["zs_country_white_list"];
            }
            for (let key in switchs) {
                this.registe(key, switchs[key]);
            }
            if (!zs.configs.gameCfg.debug) {
                let anySceneWork = false;
                let anyCityWork = false;
                let anyTimeWork = false;
                let sceneMask = this.sceneCheck(this.keys[product.switchScene]);
                let countryMask = this.countryCheck();

                let blockSwitchs = zs.product.get("zs_block_switchs");

                for (let key in this.keys) {

                    if (!this.keys[key]) { continue; }

                    let inBlockList = this.blockCheck(key, blockSwitchs);

                    if (!sceneMask && inBlockList) {
                        this.keys[key] = null;
                        if (this._defines) {
                            this._defines[key] = null;
                        }
                        anySceneWork = true;
                        continue;
                    }

                    if (!countryMask && inBlockList) {
                        this.keys[key] = null;
                        if (this._defines) {
                            this._defines[key] = null;
                        }
                        continue;
                    }

                    let sceneKey = key + '(' + this.sceneMark + ')';
                    let sceneInfo = this.keys[sceneKey];
                    if (this.scene && sceneInfo && sceneInfo.length > 0) {
                        let sceneValue = this.sceneCheck(sceneInfo);
                        if (!sceneValue) {
                            this.keys[key] = sceneValue;
                            if (this._defines) {
                                this._defines[key] = sceneValue;
                            }
                            anySceneWork = true;
                            continue;
                        }
                    }

                    let cityKey = key + '(' + this.cityMark + ')';
                    let cityInfo = this.keys[cityKey];
                    if (this.city && cityInfo && cityInfo.length > 0) {
                        let cityValue = this.cityCheck(cityInfo);
                        if (!cityValue) {
                            this.keys[key] = cityValue;
                            if (this._defines) {
                                this._defines[key] = cityValue;
                            }
                            anyCityWork = true;
                            continue;
                        }
                    }

                    let timeKey = key + '(' + this.timeMark + ')';
                    let timeInfo = this.keys[timeKey];
                    if (this.timestamp && timeInfo && timeInfo.length > 0) {
                        let timeInfoSplit = timeInfo.split(/[|｜]/);
                        let timeValue = 1;
                        if (timeInfoSplit.length > 1) {
                            for (let i = 0, n = timeInfoSplit.length; i < n; i++) {
                                if (!this.timeCheck(timeInfoSplit[i])) {
                                    timeValue = 0;
                                    break;
                                }
                            }
                        } else {
                            timeValue = this.timeCheck(timeInfo);
                        }
                        if (!timeValue) {
                            this.keys[key] = timeValue;
                            if (this._defines) {
                                this._defines[key] = timeValue;
                            }
                            anyTimeWork = true;
                        }
                    }
                }
                if (!countryMask) {
                    zs.network.dataEdit("is_shielded", "1").catch(e => e);
                }
                if (anySceneWork) {
                    console.log("场景值屏蔽生效", this.scene);
                    zs.td.justTrack("场景值屏蔽生效", "场景值屏蔽生效", { scene: this.scene });
                } else if (anyCityWork) {
                    console.log("地区屏蔽生效", this.city);
                    zs.td.justTrack("地区屏蔽生效", "地区屏蔽生效", { city: this.city });
                } else if (anyTimeWork) {
                    console.log("时间屏蔽生效", this.timestamp);
                    zs.td.justTrack("时间屏蔽生效", "时间屏蔽生效", { timestamp: this.timestamp });
                }
            } else {
                zs.network.dataEdit("is_shielded", "0").catch(e => e);
            }
            this.synced = true;
        }
        static blockCheck(key, list) {
            if (!key || !list || list === "") { return null; }
            if (list.replace(/\s/g, "").split(/[|｜]/).indexOf(key) < 0) { return null; }
            return 1;
        }
        static countryCheck() {
            if (zs.core.userInfo.is_shielded) {
                zs.td.justTrack("黑名单屏蔽生效", "黑名单屏蔽生效");
                return null;
            }
            if (!this.country || !this.countryWhiteList || this.countryWhiteList == "") { return 1; }
            if (this.countryWhiteList.replace(/\s/g, "").split(/[|｜]/).indexOf(this.country) < 0) {
                zs.td.justTrack("国家屏蔽生效", "国家屏蔽生效", { country: this.country });
                return null;
            }
            return 1;
        }
        static cityCheck(cities) {
            if (!this.city || !cities || cities === "") { return 1; }
            if (cities.replace(/\s/g, "").split(/[|｜]/).indexOf(this.city) < 0) { return 1; }
            return null;
        }
        static sceneCheck(sceneVal) {
            if (!this.scene || !sceneVal || sceneVal === "") { return 1; }
            if (sceneVal.replace(/\s/g, "").split(/[|｜]/).indexOf(this.scene) < 0) { return 1; }
            return null;
        }
        static timeCheck(times) {
            if (!this.timestamp || !times || times === "") { return 1; }
            let timeSplit = times.split('-');
            if (timeSplit.length < 2) { return 1; }

            let startTime = timeSplit[0].split(/[:：]/);
            let endTime = timeSplit[1].split(/[:：]/);

            let date = new Date(this.timestamp);
            let hour = date.getHours();
            let minute = date.getMinutes();

            if (startTime.length > 0) {
                let startHour = parseInt(startTime[0]);
                if (isNaN(startHour)) {
                    startHour = 0;
                }
                if (hour < startHour) { return 1; }
                if (hour == startHour && startTime.length > 1) {
                    let startMinute = parseInt(startTime[1]);
                    if (isNaN(startMinute)) {
                        startMinute = 0;
                    }
                    if (minute < startMinute) { return 1; }
                }
            }

            if (endTime.length > 0) {
                let endHour = parseInt(endTime[0]);
                if (isNaN(endHour)) {
                    endHour = 0;
                }
                if (hour > endHour) { return 1; }
                if (hour == endHour && endTime.length > 1) {
                    let endMinute = parseInt(endTime[1]);
                    if (isNaN(endMinute)) {
                        endMinute = 0;
                    }
                    if (minute > endMinute) { return 1; }
                }
            }

            return null;
        }
        static registe(key, define) {
            if (define == null) { return; }
            key = this.cleanProductKey(key);

            let def = this.keys[key];
            if (def == null || (typeof def === typeof define)) {
                this.keys[key] = define;
                if (this._defines) {
                    this._defines[key] = define;
                }
            } else if (typeof def === 'number' && typeof define === 'string') {
                let numVal = parseFloat(define);
                if (isNaN(numVal)) { numVal = 0; }
                this.keys[key] = numVal;
                if (this._defines) {
                    this._defines[key] = numVal;
                }
            } else {
                zs.log.warn('关键词类型不匹配，无法注册产品关键词：' + key, 'Product');
            }
        }
        static get(key) {
            key = this.cleanProductKey(key);
            let def = this.keys[key];
            if (typeof def === 'function') {
                return def.call(this);
            } else {
                if (def == null) {
                    zs.log.debug("产品开关 " + key + " 不存在");
                }
                return def;
            }
        }
    }
    product.synced = false;
    product.scene = null;
    product.city = null;
    product.country = null;
    product.timestamp = null;
    product.firstSceneCache = "first_enter_scene";
    product.switchScene = 'zs_scene_value';
    product.sceneMark = 'scene'
    product.cityMark = 'city';
    product.timeMark = 'time';
    product.countryWhiteList = "中国";

    exports.product = product;
}(window.zs = window.zs || {})); window.zs = window.zs || {};
window.zs.fgui = window.zs.fgui || {};

(function (exports) {
    'use strict';

    let AlignType;
    (function (AlignType) {
        AlignType[AlignType["Center"] = 0] = "Center";
        AlignType[AlignType["Top"] = 1] = "Top";
        AlignType[AlignType["Bottom"] = 2] = "Bottom";
        AlignType[AlignType["Left"] = 3] = "Left";
        AlignType[AlignType["Right"] = 4] = "Right";
        AlignType[AlignType["TopLeft"] = 5] = "TopLeft";
        AlignType[AlignType["BottomLeft"] = 6] = "BottomLeft";
        AlignType[AlignType["TopRight"] = 7] = "TopRight";
        AlignType[AlignType["BottomRight"] = 8] = "BottomRight";
    })(AlignType = AlignType || (AlignType = {}));

    let FitType;
    (function (FitType) {
        FitType[FitType["None"] = 0] = "None";
        FitType[FitType["Fit"] = 1] = "Fit";
        FitType[FitType["ScaleFit"] = 2] = "ScaleFit";
        FitType[FitType["Both"] = 3] = "Both";
    })(FitType = FitType || (FitType = {}));

    class configs {
        static get bases() {
            if (this._bases == null) {
                this._bases = {};
            }
            return this._bases;
        }
        static get items() {
            if (this._items == null) {
                this._items = {};
            }
            return this._items;
        }
        static registeBase(key, type) {
            this.bases[key] = type;
        }
        static unregisteBase(key) {
            if (this.bases[key]) {
                delete this.bases[key];
            }
        }
        static registeItem(key, type) {
            this.items[key] = type;
        }
        static unregisteItem(key) {
            if (this.items[key]) {
                delete this.items[key];
            }
        }
    }
    configs.onInit = null;
    configs.path_root = 'fgui';
    configs.pack_basic = 'zs_basic';

    function init() {
        fairygui.UIConfig.packageFileExtension = 'bin';
        fairygui.UIConfig.bringWindowToFrontOnClick = false;
        configs.onInit && configs.onInit.run();
        zs.proxy.initFGUIRoot();
    }
    function loadPack(url, fullpath) {
        if (!fullpath) {
            url = configs.path_root + '/' + url;
        }
        return zs.resource.load(url, zs.ResourceType.FGUIPack);
    }
    function loadPacks(packs, fullpath) {
        return new zs.Coop(async (resolve, reject) => {
            if (packs == null || packs.length <= 0) {
                return resolve(null);
            }
            let result = [];
            for (let i = 0, n = packs.length; i < n; i++) {
                result.push(await loadPack(packs[i], fullpath).catch(e => e));
            }
            resolve(result);
        });
    }
    class base {
        constructor(component) {
            this.disposed = false;
            this._view = component;
            component.baseCtrl = this;
            this._id = base.usedId;
            base.usedId++;
            this.init();
        }
        get view() {
            return this._view;
        }
        get id() {
            return this._id;
        }
        get window() {
            return this._window;
        }
        static make(type) {
            if (type && type.prototype instanceof fairygui.GComponent) {
                return type.createInstance();
            }
            return new fairygui.GComponent();
        }
        static type() {
            return fairygui.GComponent;
        }
        check(component) {
            return true;
        }
        dispose() {
            zs.Timer.inst.clearAll(this);
            zs.Tween.clearAll(this);
            this.disposed = true;
        }
        show() {
            this._view && (this._view.visible = true);
            return this;
        }
        hide() {
            this._view && (this._view.visible = false);
            return this;
        }
        init() { }
        apply() { return this; }
        applyConfig() { return this; }
    }
    base.usedId = 0;
    base.typeDefine = null;

    class baseGeneric extends base {
        get view() { return this._view; }
    }

    class window {
        get listByKeys() {
            if (this._listByKeys == null) {
                this._listByKeys = {};
            }
            return this._listByKeys;
        }
        get list() {
            if (this._list == null) {
                this._list = {};
            }
            return this._list;
        }
        static create(x, y, width, height) {
            if (x == null) {
                x = 0;
            }
            if (y == null) {
                y = 0;
            }
            if (width == null) {
                width = fairygui.GRoot.inst.width;
            }
            if (height == null) {
                height = fairygui.GRoot.inst.height;
            }
            let win = new window();
            win.window = new fairygui.Window();
            win.window.x = x;
            win.window.y = y;
            win.window.width = width;
            win.window.height = height;
            let panel = new fairygui.GComponent();
            win.window.contentPane = panel;
            panel.x = 0;
            panel.y = 0;
            panel.width = width;
            panel.height = height;
            return win;
        }
        attach(ctr, index, key) {
            this.lastBase = null;
            if (ctr == null || this.window == null) {
                return this;
            }
            let view = ctr.make(ctr.typeDefine || ctr.type());
            if (index != null && index != undefined) {
                this.window.contentPane.addChildAt(view, index);
            } else {
                this.window.contentPane.addChild(view);
            }
            if (view instanceof fairygui.GButton) {
                view.opaque = true;
            } else {
                view.opaque = false;
            }
            let newBase = new ctr(view);
            newBase._window = this;
            this.lastBase = newBase;
            if (key) {
                this.listByKeys[key] = newBase;
                newBase.baseKey = key;
            }
            this.list[newBase.id] = newBase;

            if (zs.configs.uiCfg && zs.configs.uiCfg.base && zs.configs.uiCfg.binder && zs.configs.uiCfg.binder[key]) {
                newBase.bindBases = [];
                let binder = zs.configs.uiCfg.binder[key];
                if (Array.isArray(binder)) {
                    for (let i = 0, n = binder.length; i < n; i++) {
                        if (typeof binder[i] !== 'string') { continue; }
                        let base = zs.configs.uiCfg.base[binder[i]];
                        if (!base) { continue; }
                        if (!zs.core.workflow && !zs.core.workflow.checkSwitch(base.switch, base.check)) {
                            continue;
                        }
                        newBase.bindBases.push(this.applyConfig(base).getBase());
                    }
                } else if (typeof binder === 'string') {
                    let base = zs.configs.uiCfg.base[binder];
                    if (base) {
                        if (zs.core.workflow && zs.core.workflow.checkSwitch(base.switch, base.check)) {
                            newBase.bindBases.push(this.applyConfig(base).getBase());
                        }
                    }
                }
            }

            this.setBase(newBase);

            return this;
        }
        detach(ctr) {
            if (ctr == null) { return this; }
            if (typeof ctr === 'number') {
                this.window.contentPane.removeChildAt(ctr, true);
            } else if (typeof ctr === 'string') {
                let baseCtr = this.listByKeys[ctr];
                if (baseCtr) {
                    baseCtr.dispose();
                    this.window.contentPane.removeChild(baseCtr.view, true);
                    this.list[baseCtr.id] && (delete this.list[ctr.id]);
                }
            } else {
                if (ctr.baseKey && this.listByKeys[ctr.baseKey]) {
                    delete this.listByKeys[ctr.baseKey];
                }
                if (ctr.bindBases && ctr.bindBases.length > 0) {
                    for (let i = 0; i < ctr.bindBases.length; i++) {
                        this.detach(ctr.bindBases[i]);
                    }
                }
                ctr.dispose();
                this.window.contentPane.removeChild(ctr.view, true);
                this.list[ctr.id] && (delete this.list[ctr.id]);
            }
            return this;
        }
        setBase(ctr, key) {
            if (ctr && ctr.view) {
                this.lastBase = ctr;
                key && (this.listByKeys[key] = ctr);
            } else {
                this.lastBase = null;
            }
            return this;
        }
        getBase() {
            return this.lastBase;
        }
        getBaseByKey(key) {
            let ctr = this.listByKeys[key];
            if (!ctr || ctr.disposed) { return null; }
            return ctr;
        }
        getBaseByType(type) {
            let result = [];
            for (let key in this.list) {
                let ctr = this.list[key];
                if (!ctr || ctr.disposed) {
                    delete this.list[key];
                    continue;
                }
                if (ctr instanceof type) {
                    result.push(ctr);
                }
            }
            return result;
        }
        clearBase() {
            this.lastBase = null;
            return this;
        }
        align(type, xOffset, yOffset) {
            if (this.lastBase) {
                let viewWidth = this.lastBase.view.width * this.lastBase.view.scaleX;
                let viewHeight = this.lastBase.view.height * this.lastBase.view.scaleY;
                let posX = 0;
                switch (type) {
                    case AlignType.Top:
                    case AlignType.Center:
                    case AlignType.Bottom:
                        posX = (this.window.contentPane.width - viewWidth) * 0.5;
                        break;
                    case AlignType.TopRight:
                    case AlignType.Right:
                    case AlignType.BottomRight:
                        posX = (this.window.contentPane.width - viewWidth);
                        break;
                }

                let posY = 0;
                switch (type) {
                    case AlignType.Left:
                    case AlignType.Center:
                    case AlignType.Right:
                        posY = (this.window.contentPane.height - viewHeight) * 0.5;
                        break;
                    case AlignType.BottomLeft:
                    case AlignType.Bottom:
                    case AlignType.BottomRight:
                        posY = (this.window.contentPane.height - viewHeight);
                        break;
                }

                if (this.lastBase.view.pivotAsAnchor) {
                    posX += viewWidth * this.lastBase.view.pivotX;
                    posY += viewHeight * this.lastBase.view.pivotY;
                }
                xOffset && (posX += xOffset);
                yOffset && (posY += yOffset);

                zs.proxy.setFGUIObjectXY(this.lastBase.view, posX, posY);
                switch (type) {
                    case AlignType.TopLeft:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Left_Left);
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Top_Top);
                        break;
                    case AlignType.Top:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Center_Center);
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Top_Top);
                        break;
                    case AlignType.TopRight:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Right_Right);
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Top_Top);
                        break;
                    case AlignType.Left:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Left_Left);
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Middle_Middle);
                        break;
                    case AlignType.Center:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Center_Center);
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Middle_Middle);
                        break;
                    case AlignType.Right:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Right_Right);
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Middle_Middle);
                        break;
                    case AlignType.BottomLeft:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Left_Left);
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Bottom_Bottom);
                        break;
                    case AlignType.Bottom:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Center_Center);
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Bottom_Bottom);
                        break;
                    case AlignType.BottomRight:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Right_Right);
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Bottom_Bottom);
                        break;
                }
            }
            return this;
        }
        setX(x) {
            if (this.lastBase) {
                this.lastBase.view.x = x;
            }
            return this;
        }
        setWindowX(x) {
            if (this.window) {
                this.window.x = x;
            }
            return this;
        }
        setY(y) {
            if (this.lastBase) {
                this.lastBase.view.y = y;
            }
            return this;
        }
        setWindowY(y) {
            if (this.window) {
                this.window.y = y;
            }
            return this;
        }
        setXY(x, y) {
            if (this.lastBase) {
                this.lastBase.view.x = x;
                this.lastBase.view.y = y;
            }
            return this;
        }
        setWindowXY(x, y) {
            if (this.window) {
                this.window.x = x;
                this.window.y = y;
            }
            return this;
        }
        setWidth(width) {
            if (this.lastBase) {
                this.lastBase.view.width = width;
            }
            return this;
        }
        setWindowWidth(width) {
            if (this.window) {
                this.window.width = width;
            }
            return this;
        }
        setHeight(height) {
            if (this.lastBase) {
                this.lastBase.view.height = height;
            }
            return this;
        }
        setWindowHeight(height) {
            if (this.window) {
                this.window.height = height;
            }
            return this;
        }
        scaleFitWindow(designWidth, designHeight) {
            if (this.window) {
                let designRatio = designHeight / designWidth;
                let curRatio = fairygui.GRoot.inst.width / fairygui.GRoot.inst.height;
                let scale = 1;
                if (designRatio >= curRatio) {
                    scale = fairygui.GRoot.inst.height / designHeight;
                } else {
                    scale = fairygui.GRoot.inst.width / designWidth;
                }
                this.window.setScale(scale, scale);
            }
            return this;
        }
        scaleFit(designWidth, designHeight) {
            if (this.lastBase) {
                let designRatio = designHeight / designWidth;
                let curRatio = this.window.contentPane.height / this.window.contentPane.width;
                let scale = 1;
                if (designRatio >= curRatio) {
                    scale = this.window.contentPane.height / designHeight;
                } else {
                    scale = this.window.contentPane.width / designWidth;
                }
                this.lastBase.view.setScale(scale, scale);
            }
            return this;
        }
        scaleWindow(x, y) {
            if (this.window) {
                this.window.setScale(x, y);
            }
            return this;
        }
        scale(x, y) {
            if (this.lastBase) {
                this.lastBase.view.setScale(x, y);
            }
            return this;
        }
        fitScale(x, y) {
            if (this.lastBase) {
                this.lastBase.view.setScale(this.lastBase.view.scaleX * x, this.lastBase.view.scaleY * y);
            }
            return this;
        }
        fit() {
            if (this.lastBase) {
                let posX = 0;
                let posY = 0;
                this.lastBase.view.width = (this.window.contentPane.width / this.lastBase.view.scaleX) * (1 / this.window.scaleX);
                this.lastBase.view.height = (this.window.contentPane.height / this.lastBase.view.scaleY) * (1 / this.window.scaleY);
                if (this.lastBase.view.pivotAsAnchor) {
                    posX += this.lastBase.view.width * this.lastBase.view.scaleX * this.lastBase.view.pivotX;
                    posY += this.lastBase.view.height * this.lastBase.view.scaleY * this.lastBase.view.pivotY;
                }
                this.lastBase.view.x = posX;
                this.lastBase.view.y = posY;
            }
            return this;
        }
        fitWidth(keepRatio) {
            if (this.lastBase) {
                let ratio = this.window.contentPane.width / this.lastBase.view.width;
                this.lastBase.view.width = this.window.contentPane.width * (1 / this.window.scaleX);
                this.lastBase.view.x = this.lastBase.view.pivotAsAnchor ? (this.lastBase.view.width * this.lastBase.view.pivotX) : 0;
                if (keepRatio) {
                    this.lastBase.view.height *= ratio * (1 / this.window.scaleY);
                    this.lastBase.view.y = this.lastBase.view.y + (this.lastBase.view.pivotAsAnchor ? (this.lastBase.view.height * this.lastBase.view.pivotY) : 0);
                }
            }
            return this;
        }
        fitHeight(keepRatio) {
            if (this.lastBase) {
                let ratio = this.window.contentPane.height / this.lastBase.view.height;
                this.lastBase.view.height = this.window.contentPane.height * (1 / this.window.scaleY);
                this.lastBase.view.y = this.lastBase.view.pivotAsAnchor ? (this.lastBase.view.height * this.lastBase.view.pivotY) : 0;
                if (keepRatio) {
                    this.lastBase.view.width *= ratio * (1 / this.window.scaleX);
                    this.lastBase.view.x = this.lastBase.view.x + (this.lastBase.view.pivotAsAnchor ? (this.lastBase.view.width * this.lastBase.view.pivotX) : 0);
                }
            }
            return this;
        }
        block(value) {
            if (this.lastBase) {
                this.lastBase.view.opaque = value;
            }
            return this;
        }
        autoFront(value) {
            if (this.window != null) {
                this.window.bringToFontOnClick = value;
            }
            return this;
        }
        front() {
            if (this.window != null) {
                let root = this.window.root || fairygui.GRoot.inst;
                let childIdx = root.getChildIndex(this.window);
                if (childIdx >= 0) {
                    root.setChildIndex(this.window, root.numChildren - 1);
                }
                this.checkMsgbox();
            }
            return this;
        }
        top() {
            if (this.lastBase) {
                let panel = this.window.contentPane;
                let childIndex = panel.getChildIndex(this.lastBase.view);
                if (childIndex >= 0) {
                    panel.setChildIndex(this.lastBase.view, panel.numChildren - 1);
                }
            }
            return this;
        }
        update(type, func, thisArg) {
            if (this.lastBase) {
                if (this.lastBase instanceof type && this.lastBase.view) {
                    func.call(thisArg, this.lastBase, this.window);
                } else {
                    zs.log.warn("UI类型不匹配，无法生成对应系统!", this.lastBase);
                }
            }
            return this;
        }
        show() {
            if (this.window != null) {
                this.window.show();
                this.checkMsgbox();
            }
            return this;
        }
        hide() {
            if (this.window != null) {
                this.window.hide();
            }
            return this;
        }
        clear() {
            if (this.window != null) {
                for (let index = this.window.contentPane.numChildren - 1; index >= 0; index--) {
                    const element = this.window.contentPane.getChildAt(index);
                    if (element && element.baseCtrl && element.baseCtrl.dispose) {
                        element.baseCtrl.dispose();
                    }
                }
                this.window.contentPane.removeChildren(0, -1, true);
            }
            return this;
        }
        applyConfig(config) {
            let type = configs.bases[config.type];
            if (type == null) { return this; }
            this.attach(type, null, config.key);
            if (config.window) {
                config.window.width != null && (this.setWidth(config.window.width));
                config.window.height != null && (this.setHeight(config.window.height));
                if (!config.window.ignoreautoscale && !config.window.ignore_auto_scale) {
                    if (zs.configs.gameCfg.autoScaleFit || config.window.scale_fit != null || config.window.scalefit != null) {
                        let scaleFit = config.window.scale_fit || config.window.scalefit;
                        if (scaleFit == null || !Array.isArray(scaleFit) || scaleFit.length <= 1) {
                            this.scaleFit(zs.configs.gameCfg.designWidth, zs.configs.gameCfg.designHeight);
                        } else {
                            this.scaleFit(scaleFit[0], scaleFit[1]);
                        }
                    }
                }
                if (config.window.fitscale || config.window.fit_scale) {
                    let fitScale = config.window.fit_scale || config.window.fitscale;
                    if (Array.isArray(fitScale) && fitScale.length > 1) {
                        this.fitScale(fitScale[0], fitScale[1]);
                    }
                }
                if (config.window.scale && Array.isArray(config.window.scale) && config.window.scale.length > 1) {
                    this.scale(config.window.scale[0], config.window.scale[1]);
                }
                (config.window.fit_width || config.window.fitwidth) && (this.fitWidth());
                (config.window.fit_height || config.window.fitheight) && (this.fitHeight());
                config.window.fit && (this.fit());
            }
            if (config.base) {
                this.update(type, (unit) => {
                    unit.applyConfig(config.base);
                });
            } else {
                this.update(type, (unit) => {
                    unit.apply();
                });
            }
            if (config.window) {
                if (config.window.align) {
                    switch (config.window.align) {
                        case "center":
                            this.align(AlignType.Center, config.window.alignoffset_x || config.window.alignoffsetx || 0, config.window.alignoffset_y || config.window.alignoffsety || 0);
                            break;
                        case "top":
                            this.align(AlignType.Top, config.window.alignoffset_x || config.window.alignoffsetx || 0, config.window.alignoffset_y || config.window.alignoffsety || 0);
                            break;
                        case "bottom":
                            this.align(AlignType.Bottom, config.window.alignoffset_x || config.window.alignoffsetx || 0, config.window.alignoffset_y || config.window.alignoffsety || 0);
                            break;
                        case "left":
                            this.align(AlignType.Left, config.window.alignoffset_x || config.window.alignoffsetx || 0, config.window.alignoffset_y || config.window.alignoffsety || 0);
                            break;
                        case "right":
                            this.align(AlignType.Right, config.window.alignoffset_x || config.window.alignoffsetx || 0, config.window.alignoffset_y || config.window.alignoffsety || 0);
                            break;
                        case "topleft":
                            this.align(AlignType.TopLeft, config.window.alignoffset_x || config.window.alignoffsetx || 0, config.window.alignoffset_y || config.window.alignoffsety || 0);
                            break;
                        case "bottomleft":
                            this.align(AlignType.BottomLeft, config.window.alignoffset_x || config.window.alignoffsetx || 0, config.window.alignoffset_y || config.window.alignoffsety || 0);
                            break;
                        case "topright":
                            this.align(AlignType.TopRight, config.window.alignoffset_x || config.window.alignoffsetx || 0, config.window.alignoffset_y || config.window.alignoffsety || 0);
                            break;
                        case "bottomright":
                            this.align(AlignType.BottomRight, config.window.alignoffset_x || config.window.alignoffsetx || 0, config.window.alignoffset_y || config.window.alignoffsety || 0);
                            break;
                    }
                }
                config.window.x != null && (this.setX(config.window.x));
                config.window.y != null && (this.setY(config.window.y));
                config.window.block != null && (this.block(config.window.block));
                (config.window.auto_front != null || config.window.autofront != null) && (this.autoFront(config.window.auto_front || config.window.autofront));
                config.window.front && (this.front());
                config.window.top && (this.top());
            }

            return this;
        }
        dispose() {
            if (this.window != null) {
                for (let index = this.window.contentPane.numChildren - 1; index >= 0; index--) {
                    const element = this.window.contentPane.getChildAt(index);
                    if (element && element.baseCtrl && element.baseCtrl.dispose) {
                        element.baseCtrl.dispose();
                        element.dispose();
                    }
                }
                this.window.dispose();
            }
        }
        isShowing() {
            if (this.window != null) {
                return this.window.isShowing;
            }
            return false;
        }
        checkMsgbox() {
            if (msgbox._windowInst && msgbox._windowInst.isShowing()) {
                let msgboxWindow = msgbox._windowInst.window;
                let root = msgboxWindow.root || fairygui.GRoot.inst;
                let childIdx = root.getChildIndex(msgboxWindow);
                if (childIdx >= 0) {
                    root.setChildIndex(msgboxWindow, root.numChildren - 1);
                }
            }
            if (msgtext.inst && msgtext.inst.view.visible) {
                let msgtextWindow = msgtext._windowInst.window;
                let root = msgtextWindow.root || fairygui.GRoot.inst;
                let childIdx = root.getChildIndex(msgtextWindow);
                if (childIdx >= 0) {
                    root.setChildIndex(msgtextWindow, root.numChildren - 1);
                }
            }
        }
    }

    class manager {
        static get list() {
            if (this._list == null) {
                this._list = {};
            }
            return this._list;
        }

        static get(key, autoCreate) {
            let panel = this.defaultPanel;
            if (key != null && key.trim().length > 0) {
                key = key.trim();
                panel = this.list[key];
            }

            if (panel == null && autoCreate) {
                panel = window.create();
                if (key != null && key.trim().length > 0) {
                    this.list[key] = panel;
                } else {
                    this.defaultPanel = panel;
                }
            }

            return panel;
        }

        static open(type, key, fit) {
            let panel = this.defaultPanel;

            if (key != null && key.trim().length > 0) {
                key = key.trim();
                panel = this.list[key];
            }

            if (panel != null) {
                panel.dispose();
            }

            panel = window.create();

            if (type) {
                panel.attach(type);
                if (fit == null || fit == undefined) { fit = FitType.Both; }
                switch (fit) {
                    case FitType.Fit:
                        panel.fit();
                        break;
                    case FitType.ScaleFit:
                        panel.scaleFit(zs.configs.gameCfg.designWidth, zs.configs.gameCfg.designHeight);
                        break;
                    case FitType.Both:
                        panel.scaleFit(zs.configs.gameCfg.designWidth, zs.configs.gameCfg.designHeight).fit();
                        break;
                }
            }

            panel.show();

            if (key != null && key.trim().length > 0) {
                this.list[key] = panel;
            } else {
                this.defaultPanel = panel;
            }

            return panel;
        }

        static show(autoCreate, type, key, fit) {
            let panel = this.defaultPanel;
            if (key != null && key.trim().length > 0) {
                key = key.trim();
                panel = this.list[key];
            }

            if (panel != null) {
                if (type) {
                    let base = panel.getBaseByType(type);
                    if (base && base.length > 0) {
                        panel.setBase(base[0]);
                    } else {
                        panel.attach(type);
                        if (fit == null || fit == undefined) { fit = FitType.Both; }
                        switch (fit) {
                            case FitType.Fit:
                                panel.fit();
                                break;
                            case FitType.ScaleFit:
                                panel.scaleFit(zs.configs.gameCfg.designWidth, zs.configs.gameCfg.designHeight);
                                break;
                            case FitType.Both:
                                panel.scaleFit(zs.configs.gameCfg.designWidth, zs.configs.gameCfg.designHeight).fit();
                                break;
                        }
                    }
                }
            } else if (autoCreate) {
                return this.open(type, key, fit);
            }

            return panel.show();
        }

        static hide(key) {
            let panel = this.defaultPanel;
            if (key != null && key.trim().length > 0) {
                key = key.trim();
                panel = this.list[key];
            }

            if (panel != null) { panel.hide(); }
            return panel;
        }
    }
    manager.defaultPanel = null;

    class msgbox extends base {
        static get msgList() {
            if (this._msgList == null) {
                this._msgList = [];
            }
            return this._msgList;
        }
        static get windowInst() {
            if (this._windowInst == null) {
                this._windowInst = window.create()
                    .attach(msgbox)
                    .scaleFit(zs.configs.gameCfg.designWidth, zs.configs.gameCfg.designHeight)
                    .block(true);
            }
            return this._windowInst;
        }
        static show(params) {
            if (msgbox.windowInst.isShowing()) {
                msgbox.msgList.push(params);
            } else {
                msgbox.windowInst
                    .update(msgbox, (unit) => {
                        unit.setTitle(params.title)
                            .setContent(params.content)
                            .setConfirmText(params.confirmText)
                            .setCancelText(params.cancelText)
                            .setConfirmHandler(params.confirmHandler)
                            .setCancelHandler(params.cancelHandler)
                            .switchCancel(params.hideCancel)
                            .apply();
                    })
                    .align(AlignType.Center)
                    .show()
                    .front();
            }
        }
        static hide() {
            msgbox.windowInst.hide();
            if (msgbox.msgList.length > 0) {
                msgbox.show(msgbox.msgList.pop());
            }
        }
        static clear() {
            msgbox._msgList = [];
        }
        constructor(component) {
            super(component);
            zs.proxy.Event.FGUIOnClick(component.btn_confirm, this, this.onConfirmClick);
            zs.proxy.Event.FGUIOnClick(component.btn_cancel, this, this.onCancelClick);
        }
        static make() {
            let view = zs.ui.FGUI_msgbox.createInstance();
            return view;
        }
        static type() {
            return zs.ui.FGUI_msgbox;
        }
        check(component) {
            if (component instanceof zs.ui.FGUI_msgbox) {
                return true;
            }
            return false;
        }
        setTitle(title) {
            if (title) {
                this.view.title.text = title;
            } else {
                this.view.title.text = "提示";
            }
            return this;
        }
        setContent(content) {
            if (content) {
                this.view.content.text = content;
            } else {
                this.view.content.text = "";
            }
            return this;
        }
        setConfirmText(value) {
            if (value) {
                this.view.btn_confirm.title = value;
            } else {
                this.view.btn_confirm.title = "确定";
            }
            return this;
        }
        setCancelText(value) {
            if (value) {
                this.view.btn_cancel.title = value;
            } else {
                this.view.btn_cancel.title = "取消";
            }
            return this;
        }
        switchCancel(isHide) {
            return isHide ? this.hideCancel() : this.showCancel();
        }
        showCancel() {
            this.view.state.selectedIndex = 1;
            return this;
        }
        hideCancel() {
            this.view.state.selectedIndex = 0;
            return this;
        }
        setConfirmHandler(handler) {
            this.confirmHandler = handler;
            return this;
        }
        setCancelHandler(handler) {
            this.cancelHandler = handler;
            return this;
        }
        onConfirmClick() {
            this.confirmHandler && this.confirmHandler.run();
            msgbox.hide();
        }
        onCancelClick() {
            this.cancelHandler && this.cancelHandler.run();
            msgbox.hide();
        }
    }

    class msgtext extends base {
        constructor(component) {
            super(component);
            component.text = "";
            component.color = zs.proxy.color("#ff0000");
            component.fontSize = 30;
            component.bold = true;
            component.singleLine = true;
            component.autoSize = true;
        }
        static get windowInst() {
            if (this._windowInst == null) {
                this._windowInst = window.create();
            }
            return this._windowInst;
        }
        static make() {
            return new zs.proxy.FGUITextField();
        }
        get text() {
            return this.view.text;
        }
        setText(text) {
            this.view.text = text;
        }
        static show(text) {
            if (this.inst == null) {
                this.inst = this.windowInst
                    .attach(msgtext)
                    .align(zs.fgui.AlignType.BottomLeft)
                    .show()
                    .front()
                    .getBase();
            }
            if (this.inst) {
                this.inst.view.visible = true;
                this.inst.setText(text);
            }
        }
        static hide() {
            if (this.inst) {
                this.inst.view.visible = false;
            }
        }
    }

    exports.AlignType = AlignType;
    exports.FitType = FitType;
    exports.configs = configs;
    exports.init = init;
    exports.loadPack = loadPack;
    exports.loadPacks = loadPacks;
    exports.base = base;
    exports.baseGeneric = baseGeneric;
    exports.window = window;
    exports.manager = manager;
    exports.msgbox = msgbox;
    exports.msgtext = msgtext;
}(window.zs.fgui = window.zs.fgui || {})); window.zs = window.zs || {};

(function (exports) {
    'use strict';

    class fsm {
        get list() {
            if (this._list == null) {
                this._list = {};
            }
            return this._list;
        }
        init(state, auto) {
            this.current = state || this.defaultState;
            this.target = null;
            if (this.current) {
                this.onChanged && this.onChanged.runWith(this.current);
                if (auto || this.defaultAuto) { this.runNext(); }
            }
        }
        getState(from, to) {
            if (this.list[from] == null) { return null; }
            return this.list[from][to];
        }
        registe(from, to, priority, auto, thisObj, transition, condition, canBreak) {
            if (this.list[from] == null) {
                this.list[from] = {};
            }
            if (auto) {
                for (let state in this.list[from]) {
                    this.list[from][state].auto = null;
                }
            }
            if (thisObj == null) {
                thisObj = this;
            }
            if (!transition) {
                transition = (complete) => { complete.run(); }
            }
            this.list[from][to] = {
                priority: priority || 0,
                thisObj: thisObj,
                transition: transition,
                condition: condition,
                auto: auto,
                canBreak: canBreak
            };
            return this;
        }
        setDefault(state, auto) {
            this.defaultState = state;
            this.defaultAuto = auto;
            return this;
        }
        unregiste(from, to) {
            if (this.list[from] != null) {
                if (this.list[from][to] != null) {
                    delete this.list[from][to];
                }
            }
            return this;
        }
        runTransition(target) {
            if (this.current == null || this.current.length <= 0) {
                return false;
            }
            let fsm = this.list[this.current];
            if (fsm == null) {
                return false;
            }
            if (this.target != null) {
                if (fsm != null) {
                    let targetTransition = fsm[this.target];
                    if (targetTransition != null) {
                        if (!targetTransition.canBreak) {
                            return false;
                        }
                    }
                }
            }
            let transition = fsm[target];
            if (transition == null) {
                return false;
            }
            if (transition.thisObj == null) {
                return false;
            }
            let condition = transition.condition ? transition.condition.call(transition.thisObj) : true;
            if (!condition) {
                return false;
            }
            this.target = target;
            zs.log.debug('runTransition: ' + this.current + ' - ' + this.target);
            this.onBeforeChange && this.onBeforeChange.runWith([this.target, this.current]);
            transition.transition.call(transition.thisObj, zs.Handler.create(this, this.onTransitionComplete));
            return true;
        }
        runNext() {
            if (this.current == null || this.current.length <= 0) {
                return null;
            }
            let fsm = this.list[this.current];
            if (fsm == null) { return null; }
            if (this.target != null) {
                if (fsm != null) {
                    let targetTransition = fsm[this.target];
                    if (targetTransition != null) {
                        if (!targetTransition.canBreak) {
                            return null;
                        }
                    }
                }
            }

            let keys = [];
            let transitions = [];
            for (let key in fsm) {
                let transition = fsm[key];
                let isInserted = false;
                for (let i = 0, n = transitions.length; i < n; i++) {
                    if (transition.priority > transitions[i].priority) {
                        keys.splice(i, 0, key);
                        transitions.splice(i, 0, transition);
                        isInserted = true;
                        break;
                    }
                }
                if (!isInserted) {
                    keys.push(key);
                    transitions.push(transition);
                }
            }

            for (let i = 0, n = keys.length; i < n; i++) {
                let transition = transitions[i];
                if (transition.thisObj == null) { continue; }
                let condition = transition.condition ? transition.condition.call(transition.thisObj) : true;
                if (!condition) { continue; }
                this.target = keys[i];
                zs.log.debug('runNext: ' + this.current + ' - ' + this.target);
                this.onBeforeChange && this.onBeforeChange.runWith([this.target, this.current]);
                transition.transition.call(transition.thisObj, zs.Handler.create(this, this.onTransitionComplete));
                return keys[i];
            }

            return null;

        }
        onTransitionComplete() {
            this.current = this.target;
            this.target = null;
            let fsm = this.list[this.current];
            if (fsm != null) {
                for (let state in fsm) {
                    let transition = fsm[state];
                    if (transition.auto) {
                        this.runTransition(state);
                        break;
                    }
                }
            }
            this.onChanged && this.onChanged.runWith(this.current);
        }
    }

    exports.fsm = fsm;
}(window.zs = window.zs || {})); window.zs = window.zs || {};
window.zs.platform = window.zs.platform || {};

(function (exports) {
    'use strict';

    const proxy = window["platform"];
    const syncList = ['setFrameRate', 'share', 'userInfoHide', 'userInfoShow', 'userInfoDestroy', 'initVideo', 'isVideoEnable',
        'initInsert', 'loadInsert', 'hasBanner', 'nextBanner', 'createBanner', 'initBanner', 'checkBanner', 'clearDelayBanner', 'showBanner',
        'updateBanner', 'hideBanner', 'recorderStart', 'recorderStop', 'recorderPause',
        'recorderResume', 'recorderCreate', 'recorderHide', 'canShareRecorder', 'getRecorderTime', 'statusBarHeight',
        'screenWidth', 'screenHeight', 'vibrate', 'isNetValid', 'addEventShow', 'addEventHide', 'recorderClip',
        'recorderShare', 'showFavoriteGuide', 'setDefaultShare', 'updateReviveTypeInfo', 'setNativeLastShowTime',
        'initNativeAd', 'sendReqAdShowReport', 'sendReqAdClickReport', 'reportNativeAdClick', 'initGamePortalAd', 'showToast',
        'getLaunchOptions', 'getScene', 'showInsertAd', 'initBannerId', 'showOnePixelBanner', 'showShareMenu',
        'openShare', 'getReadSetting', 'playSound', 'initAppBox', 'showAppBox', 'checkBlockAd', 'showBlockAd',
        'hideBlockAd', 'destroyInsertAd', 'pauseSound', 'getAdPos', 'showCustomAd', 'hideCustomAd', 'hideGamePortalAd'];
    const asyncList = ['login', 'getLoginParams', 'playVideo', 'setCloudStorage', 'getCloudStorage',
        'userInfoCreate', 'navigateToOther', 'loadSubpackage', 'getUserInfo',
        'openAwemeUserProfile', 'checkFollowAwemeState', 'loadNativeAd', 'isBeforeGameAccount', 'getAdReporteStatus',
        'showGamePortalAd', 'hasDesktopIcon', 'createDesktopIcon', 'getNetworkType', 'shareRecorderVideo', 'showMoreGamesModalSimple', 'showInterstitialAd'];

    function init() {
        if (proxy) { proxy.init(); }
        for (let key in proxy) {
            let func = proxy[key];
            if (func != null && typeof func === 'function') {
                if (asyncList.indexOf(key) >= 0) {
                    async[key] = proxy[key];
                } else {
                    sync[key] = proxy[key];
                }
            }
        }
        for (let i = 0, n = syncList.length; i < n; i++) {
            let key = syncList[i];
            if (sync[key] == null) {
                switch (key) {
                    case 'updateBanner':
                        sync[key] = function (params) {
                            zs.core.workflow.showPreviewBanner(params);
                            return null;
                        }
                        break;
                    case 'showBanner':
                        sync[key] = function (params) {
                            zs.core.workflow.showPreviewBanner(params);
                            return null;
                        }
                        break;
                    case 'checkBanner':
                        sync[key] = function (params) {
                            zs.core.workflow.hidePreviewBanner();
                            if (!params || !params.data || !params.data.banner) {
                                return null;
                            }
                            let config = params.data.banner;
                            let switchShow = true;
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
                            if (!switchShow || (!config.delay && !config.auto && !config.checkInit)) {
                                return null;
                            }
                            let isWait = config.delay || config.auto == false;
                            zs.core.workflow.showPreviewBanner({ pos: config.pos, size: config.size, isWait: isWait, checkInit: config.checkInit });
                            if (config.delay) {
                                if (zs.product.get("zs_banner_banner_time")) {
                                    zs.platform.delayBanner = setTimeout(function () {
                                        zs.core.workflow.showPreviewBanner({ pos: config.pos, size: config.size });
                                    }, zs.product.get("zs_banner_banner_time"));
                                } else {
                                    zs.core.workflow.showPreviewBanner({ pos: config.pos, size: config.size });
                                }
                            }
                            return null;
                        }
                        break;
                    case "hideBanner":
                        sync[key] = function () {
                            zs.core.workflow.hidePreviewBanner();
                            // zs.platform.delayBanner && clearTimeout(zs.platform.delayBanner);
                            // zs.platform.delayBanner = null;
                            return null;
                        }
                        break;
                    default:
                        sync[key] = function () {
                            zs.log.debug("Sync方法 " + key + " 在当前平台不存在", 'Platform');
                            return null;
                        }
                        break;
                }
            }
        }
        for (let i = 0, n = asyncList.length; i < n; i++) {
            let key = asyncList[i];
            if (async[key] == null) {
                switch (key) {
                    case "playVideo":
                        async[key] = function _async() {
                            return new zs.Coop((resolve, reject) => {
                                zs.log.debug("Async方法 " + key + " 在当前平台不存在", 'Platform');
                                resolve(true);
                            });
                        }
                        break;
                    default:
                        async[key] = function _async() {
                            return new zs.Coop((resolve, reject) => {
                                zs.log.debug("Async方法 " + key + " 在当前平台不存在", 'Platform');
                                reject();
                            });
                        }
                        break;
                }
            }
        }
    }

    function initAds(params) { proxy && (proxy.initAds(params)); }
    class async { }
    class sync { }

    exports.init = init;
    exports.initAds = initAds;
    exports.proxy = proxy;
    exports.async = async;
    exports.sync = sync;
}(window.zs.platform = window.zs.platform || {})); window.zs = window.zs || {};
window.zs.ui = window.zs.ui || {};

(function (exports) {
    'use strict';

    function bind(pack, itemName, type) {
        if (pack == null) {
            zs.log.warn("资源包为空，无法绑定模板 " + itemName);
            return;
        }
        let item = pack.getItemByName(itemName);
        if (item == null) {
            zs.log.warn("指定资源包（" + pack.name + "）中不存在" + itemName + "组件，无法绑定指定模板");
            return;
        }
        let url = "ui://" + pack.id + item.id;
        zs.proxy.setFGUIExtension(url, type);
    }

    function readURL(pack, itemName) {
        if (pack == null) { return null; }
        let item = pack.getItemByName(itemName);
        if (item == null) { return null; }
        return "ui://" + pack.id + item.id;
    }

    class FGUI_item extends fairygui.GComponent {
        constructor() {
            super(...arguments);
            this.picture = null;
            this.desc = null;
            this.title = null;
            this.data = null;
        }

        static createInstance() {
            return null;
        }
    }
    FGUI_item.URL = null;

    class FGUI_list extends fairygui.GComponent {
        static bind(pack) {
            zs.ui.bind(pack, this.itemName, FGUI_list);
            this.pack = pack;
        }
        static createInstance() {
            return (fairygui.UIPackage.createObject(this.pack.name, this.itemName));
        }
        onConstruct() {
            this.background = (this.getChild("background"));
            this.list = (this.getChild("list"));
        }
    }
    FGUI_list.itemName = "list";

    class FGUI_msgbox extends fairygui.GComponent {
        static bind(pack) {
            zs.ui.bind(pack, this.itemName, FGUI_msgbox);
            this.pack = pack;
        }
        static createInstance() {
            return (fairygui.UIPackage.createObject(this.pack.name, this.itemName));
        }
        onConstruct() {
            this.state = this.getController("state");
            this.title = this.getChild("title");
            this.content = this.getChild("content");
            this.btn_confirm = this.getChild("btn_confirm");
            this.btn_cancel = this.getChild("btn_cancel");
        }
    }
    FGUI_msgbox.itemName = "msgbox";

    class FGUI_Loading extends fairygui.GComponent {
        static createInstance() {
            let panel = new fairygui.GComponent();
            panel.width = fairygui.GRoot.inst.width;
            panel.height = fairygui.GRoot.inst.height;

            let graphBack = new fairygui.GGraph();
            graphBack.drawRect(0, zs.proxy.color('#000000'), zs.proxy.color('#000000'));
            panel.addChild(graphBack);
            graphBack.x = -panel.width * 0.25;
            graphBack.y = -panel.height * 0.25;
            graphBack.width = panel.width * 2;
            graphBack.height = panel.height * 2;

            let valueTxt = new zs.proxy.FGUITextField();
            valueTxt.pivotX = 0.5;
            valueTxt.pivotY = 0.5;
            valueTxt.x = panel.width * 0.5;
            valueTxt.y = panel.height * 0.5;
            valueTxt.addRelation(panel, fairygui.RelationType.Center_Center);
            valueTxt.addRelation(panel, fairygui.RelationType.Middle_Middle);
            valueTxt.fontSize = 100;
            valueTxt.text = '';
            valueTxt.color = zs.proxy.color('#FFFFFF');

            panel.loadingValue = panel.addChild(valueTxt);
            return panel;
        }
    }
    FGUI_Loading.itemName = "loading";

    class EggKnock extends zs.fgui.base {
        static checkEggOpen(isCommon) {
            if (zs.EggKnock) {
                return zs.EggKnock.checkEggOpen(isCommon);
            }
            return false;
        }
        get btnKnock() {
            return null;
        }
        constructor(component) {
            super(component);
            this.clickPercent = 0.14;
            this.rollbackPercent = 0.01;
            this.rollbackInterval = 20;
            this.bannerTime = 3000;
            this.bannerRange = [0.3, 0.7];
            this.awardDelay = [1000, 1000];
            this.closeDelay = [1000, 1040];
            this.btnSrcOffset = 0;
            this.btnDstOffset = 370;
            this.btnOffsetDelay = 800;
            this.btnOffsetTime = 500;
            this.btnIgnoreOffset = false;
        }
        dispose() {
            zs.Timer.inst.clearAll(this);
            zs.Tween.clearAll(this.btnKnock);
            zs.core.removeAppShow(zs.Handler.create(this, this.onAppShow));
            zs.core.removeAppHide(zs.Handler.create(this, this.onAppHide));
            this.btnKnock && this.btnKnock.offClick && zs.proxy.Event.FGUIOffClick(this.btnKnock, this, this.onClick);
            this.onDispose();
            super.dispose();
        }
        onAppShow() {
            if (!this.isOpenAd) { return; }
            if (!zs.product.get("zs_ready_click_two")) { //by wxd 当狂点再来一次开启时，点击banner之后回来不直接执行onFinish();关闭时流程不变
                this.onFinish();
            }
        }
        onAppHide() {
            if (!this.isOpenAd) { return; }
            this.isOpenAd = true;
        }
        apply() {
            this.progress = 0;
            this.rollbackNext = 0;
            this.isOpenAd = false;
            this.isGetAward = false;
            this.bannerPoint = zs.utils.randInt(this.bannerRange[0] * 100, this.bannerRange[1] * 100) * 0.01;
            zs.core.addAppShow(zs.Handler.create(this, this.onAppShow, null, false));
            zs.core.addAppHide(zs.Handler.create(this, this.onAppHide, null, false));
            this.btnKnock && this.btnKnock.onClick && zs.proxy.Event.FGUIOnClick(this.btnKnock, this, this.onClick);
            this.btnKnock && this.btnKnock.y && (this.btnKnock.y += this.btnSrcOffset);
            zs.Timer.inst.loop(1, this, this.tick);
            this.updateProgress(this.progress);
            zs.EggKnock && zs.EggKnock.markReadyNum(true);
            return this;
        }
        applyConfig(config) {
            if (config) {
                config.clickpercent != null && (this.clickPercent = config.clickpercent);
                config.click_percent != null && (this.clickPercent = config.click_percent);
                config.rollbackpercent != null && (this.rollbackPercent = config.rollbackpercent);
                config.rollback_percent != null && (this.rollbackPercent = config.rollback_percent);
                config.rollbackinterval != null && (this.rollbackInterval = config.rollbackinterval);
                config.rollback_interval != null && (this.rollbackInterval = config.rollback_interval);
                config.bannerrange != null && Array.isArray(config.bannerrange) && config.bannerrange.length >= 2 && (this.bannerRange = config.bannerrange);
                config.banner_range != null && Array.isArray(config.banner_range) && config.banner_range.length >= 2 && (this.bannerRange = config.banner_range);
                config.awarddelay != null && Array.isArray(config.awarddelay) && config.awarddelay.length >= 2 && (this.awardDelay = config.awarddelay);
                config.award_delay != null && Array.isArray(config.award_delay) && config.award_delay.length >= 2 && (this.awardDelay = config.award_delay);
                config.closedelay != null && Array.isArray(config.closedelay) && config.closedelay.length >= 2 && (this.closeDelay = config.closedelay);
                config.close_delay != null && Array.isArray(config.close_delay) && config.close_delay.length >= 2 && (this.closeDelay = config.close_delay);
                config.btnsrcoffset != null && (this.btnSrcOffset = config.btnsrcoffset);
                config.btn_src_offset != null && (this.btnSrcOffset = config.btn_src_offset);
                config.btndstoffset != null && (this.btnDstOffset = config.btndstoffset);
                config.btn_dst_offset != null && (this.btnDstOffset = config.btn_dst_offset);
                config.btnoffsetdelay != null && (this.btnOffsetDelay = config.btnoffsetdelay);
                config.btn_offset_delay != null && (this.btnOffsetDelay = config.btn_offset_delay);
                config.btnoffsettime != null && (this.btnOffsetTime = config.btnoffsettime);
                config.btn_offset_time != null && (this.btnOffsetTime = config.btn_offset_time);
                config.btnignoreoffset != null && (this.btnIgnoreOffset = config.btnignoreoffset);
                config.btn_ignore_offset != null && (this.btnIgnoreOffset = config.btn_ignore_offset);
                config.awardevent && (this.awardEvent = config.awardevent);
                config.award_event && (this.awardEvent = config.award_event);
                config.closeevent && (this.closeEvent = config.closeevent);
                config.close_event && (this.closeEvent = config.close_event);
            }
            return this.apply();
        }
        tick() {
            let delta = zs.Timer.inst.delta;
            if (this.isOpenAd && this.bannerTime > 0.0 && this.bannerCount > 0.0) {
                this.bannerCount -= delta;
                if (this.bannerCount <= 0) {
                    zs.platform.sync.hideBanner();
                    this.onFinish();
                }
            }
            if (this.bannerTime <= 0.0 && this.btnOffsetCount && this.btnOffsetCount > 0) {
                this.btnOffsetCount -= delta;
                if (this.btnOffsetCount <= 0) {
                    if (this.btnKnock && this.btnKnock.y && !this.btnIgnoreOffset) {
                        zs.Tween.to(this.btnKnock, { y: this.btnKnock.y - this.btnDstOffset }, this.btnOffsetTime);
                    }
                    this.btnOffsetCount = null;
                }
            }
            if (!this.isGetAward) {
                if (this.rollbackNext <= 0) {
                    this.progress -= this.rollbackPercent;
                    this.rollbackNext = this.rollbackInterval;
                } else {
                    this.rollbackNext -= delta;
                }
                if (this.clicked) {
                    this.onBannerCheck();
                    this.progress += this.clickPercent;
                    this.handleClick(this.progress);
                }
                this.clicked = false;
                this.progress = Math.min(1, Math.max(0, this.progress));
                this.updateProgress(this.progress);
                this.progress >= 0.999999 && this.onFinish();
            } else {
                if (this.awardCount != null && this.awardCount > 0) {
                    this.awardCount -= delta;
                    if (this.awardCount <= 0) {
                        this.awardEvent && zs.core.workflow.runEventConfig(this.awardEvent);
                        this.awardHandler && this.awardHandler.run();
                        this.awardCount = null;
                    }
                }
                if (this.closeCount != null && this.closeCount > 0) {
                    this.closeCount -= delta;
                    if (this.closeCount <= 0) {
                        this.awardCount && this.awardHandler && this.awardHandler.run();
                        this.awardCount = null;
                        this.closeEvent && zs.core.workflow.runEventConfig(this.closeEvent);
                        this.closeHandler && this.closeHandler.run();
                        this.closeCount = null;
                    }
                }
            }
        }
        onClick() { this.clicked = true; }
        onHandleClick(progress) { }
        handleClick(progress) {
            if (progress >= this.bannerPoint && !this.isOpenAd) {
                this.isOpenAd = true;
                this.bannerCount = this.bannerTime;
                zs.platform.sync.showBanner();
                this.startButtonOffset();
            }
        }
        startButtonOffset() {
            this.btnOffsetCount = this.btnOffsetDelay;
        }
        updateProgress(value) { }
        setEventHandler(evtAward, evtClose) {
            this.awardHandler = evtAward;
            this.closeHandler = evtClose;
            return this;
        }
        onFinish() {
            if (this.isGetAward) { return; }
            this.onGetAward();
            zs.Tween.clearAll(this.btnKnock);
            this.isGetAward = true;
            this.awardCount = zs.utils.randInt(this.awardDelay[0], this.awardDelay[1]);
            this.closeCount = zs.utils.randInt(this.closeDelay[0], this.closeDelay[1]);
        }
        onBannerCheck() { }
        onGetAward() {
            zs.EggKnock && zs.EggKnock.markAwardNum(true);
        }
        onDispose() { }
    }
    EggKnock.inited = false;

    class Loading extends zs.fgui.base {
        constructor() {
            super(...arguments);
            this.progressTime = 1 / 100;
            this.progressCount = 0;
            this.current = 0;
            this.progress = 0;
        }
        static preload() {
            return Promise((resolve, reject) => { resolve(); });
        }
        init() {
            this.updateProgress(0);
        }
        updateProgress(value) {
            if (this.view) {
                this.view.loadingValue.text = value + '%';
            }
        }
        run(progress) {
            this.progress = progress;
            if (this.current < this.progress) {
                this.progressCount += zs.Timer.inst.delta * 0.001;
                let delta = Math.round(this.progressCount / this.progressTime);
                this.progressCount -= delta * this.progressTime;
                if (this.current + delta >= this.progress) {
                    this.current = this.progress;
                } else {
                    this.current = this.current + delta;
                }
                this.updateProgress(this.current);
            } else if (this.progress >= 100) {
                return true;
            }

            return false
        }
    }
    Loading.typeDefine = FGUI_Loading;

    class UIScene extends zs.proxy.UIScene { }

    exports.bind = bind;
    exports.readURL = readURL;
    exports.FGUI_item = FGUI_item;
    exports.FGUI_list = FGUI_list;
    exports.FGUI_msgbox = FGUI_msgbox;
    exports.FGUI_Loading = FGUI_Loading;
    exports.EggKnock = EggKnock;
    exports.Loading = Loading;
    exports.UIScene = UIScene;
}(window.zs.ui = window.zs.ui || {})); window.zs = window.zs || {};
window.zs.exporter = window.zs.exporter || {};

(function (exports) {
    'use strict';

    let AlignType = zs.fgui.AlignType;
    let AdaptType;
    (function (AdaptType) {
        AdaptType[AdaptType["None"] = 0] = "None";
        AdaptType[AdaptType["Horizontal"] = 1] = "Horizontal";
        AdaptType[AdaptType["Vertical"] = 2] = "Vertical";
    })(AdaptType = AdaptType || (AdaptType = {}));

    class utils {
        static get cache() {
            if (this._cache == null) {
                this._cache = {};
            }
            return this._cache;
        }
        static get bases() {
            if (this._bases == null) {
                this._bases = {};
            }
            return this._bases;
        }
        static isSameDay(checkTime) {
            return new Date(checkTime).toDateString() === new Date().toDateString();;
        }
        static getStorageSync(key) {
            return this.cache[key];
        }
        static setStorageSync(key, value) {
            this.cache[key] = value;
        }
        static getCache(key, expire) {
            if (!expire) {
                return this.getStorageSync(key);
            } else {
                let lastCacheTime = this.getStorageSync(key + "_time");
                if (lastCacheTime == null || Date.now() - Number(lastCacheTime) < expire) {
                    return this.getStorageSync(key);
                } else {
                    return null;
                }
            }
        }
        static setCache(key, value) {
            this.setStorageSync(key, value);
            this.setStorageSync(key + "_time", Date.now());
        }
        static getCacheNewDay(key, checkNewDay) {
            if (!checkNewDay) {
                return this.getStorageSync(key);
            } else {
                let lastCacheTime = this.getStorageSync(key + "_time");
                if (lastCacheTime == null || !this.isSameDay(lastCacheTime)) {
                    return this.getStorageSync(key);
                } else {
                    return null;
                }
            }
        }
        static getDistance(x1, x2, y1, y2) {
            return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
        }
        static checkScroll(x, y, distance) {
            return this.getDistance(x, zs.proxy.Touch.touchX, y, zs.proxy.Touch.touchY) > distance;
        }
        static async navigateToMiniProgram(appInfo, icon) {
            let targetMini = appInfo ? appInfo.info : null;
            let group_id = null;
            let img_id = null;
            let img_index = appInfo ? appInfo.img_index : null;
            if (targetMini) {
                let unlinkAd = this.getCacheNewDay("unlinkAd") || {};
                if (unlinkAd[targetMini.appid]) {
                    zs.log.debug("广告位今日点击过", "Exporter");
                    let allAdList = await dataMgr.load().catch(e => e);
                    let filterArr = allAdList.filter(element => unlinkAd[element.info.appid] ? false : true)
                    if (filterArr && filterArr.length > 0) {
                        let idx = Math.floor(Math.random() * filterArr.length);
                        if (targetMini.imgs) {
                            for (let i = 0, n = targetMini.imgs.length; i < n; i++) {
                                if (targetMini.imgs[i].icon == icon) {
                                    let img = targetMini.imgs[i];
                                    group_id = img.group_id;
                                    img_id = img.img_id;
                                    break;
                                }
                            }
                        }
                        targetMini = filterArr[idx].info;
                        zs.log.debug("新的导出", "Exporter", targetMini);
                    } else {
                        targetMini = null;
                    }
                }
                if (!targetMini) {
                    // 清空今日导出数据
                    targetMini = appInfo.info;
                    this.setCache("unlinkAd", {});
                }
            }
            return new zs.Coop((resolve, reject) => {
                if (targetMini) {
                    targetMini.img_index = img_index;
                    utils.navigateCount++;
                    utils.readyExport = {
                        target: targetMini,
                        icon: icon,
                        group: group_id,
                        img: img_id
                    };
                    let event_id = zs.utils.getEventCode('export-' + utils.navigateCount + "-" + targetMini.app_id);
                    utils.behaviorExport = {
                        event_id: event_id,
                        app_id: targetMini.app_id
                    };
                    targetMini.extraData = { event_id: event_id };
                    zs.td.justTrack("导出跳转", "导出跳转");
                    zs.platform.async.navigateToOther({ appInfo: targetMini })
                        .then(() => {
                            let unlinkAd = utils.getCacheNewDay("unlinkAd") || {};
                            unlinkAd[targetMini.appid] = true;
                            utils.setCache("unlinkAd", unlinkAd);
                            if (utils.readyExport) {
                                dataMgr.collectExport(targetMini, icon, group_id, img_id);
                                utils.readyExport = null;
                            }
                            resolve(null);
                        }).catch(() => {
                            utils.behaviorExport = null;
                            utils.readyExport = null;
                            utils.navigateErrorHandler && utils.navigateErrorHandler.run();
                            reject(null);
                        });
                } else {
                    zs.log.warn("跳转信息丢失，无法完成跳转！", "Exporter");
                    reject(null);
                }
            })
        }
        static addBase(key, type) {
            this.bases[key] = type;
        }
        static removeBase(key) {
            if (this.bases[key]) {
                delete this.bases[key];
            }
        }
    }
    utils.navigateErrorHandler = null;
    utils.navigateCount = 0;
    utils.readyExport = null;
    utils.record = [];

    class dataMgr {
        static get cache() {
            if (this._cache == null) {
                this._cache = {};
            }
            return this._cache;
        }

        static setCache(key, data, expire) {
            this.cache[key] = {
                data: data,
                timestamp: Date.now(),
                expire: expire || this.expireTime
            }
        }

        static getCache(key) {
            let cache = this.cache[key];
            if (cache != null && Date.now() - cache.timestamp < cache.expire) {
                return cache.data;
            }
            return null;
        }

        static getUUID() {
            let uuid = zs.utils.getItem('ads_uuid');
            if (!uuid || uuid.trim().length <= 0) {
                let result = "";
                for (let i = 0; i < 8; i++) {
                    result += zs.utils.randByte();
                }
                zs.utils.setItem('ads_uuid', result);
                uuid = result;
            }
            return uuid;
        }

        static collectSource() {
            if (zs.configs.gameCfg.newAds) {
                this.collectSourceNew();
            } else {
                this.collectSourceOld();
            }
        }

        static collectSourceNew() {
            let url = dataMgr.NEWURL + "/" + zs.network.version + "/ad/source";
            let sysInfo = zs.platform.sync.getLaunchOptions();
            if (!sysInfo || !sysInfo.referrerInfo || !sysInfo.referrerInfo.appId) { return; }
            let params = {
                from_app_id: sysInfo.referrerInfo.appId,
                to_app_id: zs.core.appId,
                scene: zs.platform.sync.getScene(),
                gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                open_id: this.getUUID(),
                zhise: (sysInfo && sysInfo.query && sysInfo.query.zhise) ? sysInfo.query.zhise : "",
                event_id: (sysInfo.referrerInfo.extraData && sysInfo.referrerInfo.extraData.event_id) ? sysInfo.referrerInfo.extraData.event_id : ""
            };
            zs.td.justTrack("来路统计", "来路统计");
            zs.network.nativeRequest(url, params, 'POST', false, false, true)
                .then((res) => {
                    console.log("collect source success!", res);
                }).catch((res) => {
                    zs.td.justTrack("来路统计失败", "来路统计失败");
                    console.log("collect source failed!", res);
                });
            // zs.network.log("来路:" + JSON.stringify(params));
        }

        static collectSourceOld() {
            let url = dataMgr.URL + "/api/app_jump/in";
            let sysInfo = zs.platform.sync.getLaunchOptions();
            let event_id = "";
            sysInfo && sysInfo.referrerInfo && sysInfo.referrerInfo.extraData && sysInfo.referrerInfo.extraData.event_id && (event_id = sysInfo.referrerInfo.extraData.event_id);
            let params = {
                ak: zs.core.appId,
                uu: this.getUUID(),
                wsr: sysInfo,
                rq_c: 0,
                eid: event_id
            }
            zs.td.justTrack("来路统计", "来路统计");
            zs.network.nativeRequest(url, params, 'POST', false, false, true)
                .then((res) => {
                    console.log("collect source success!", res);
                }).catch((res) => {
                    zs.td.justTrack("来路统计失败", "来路统计失败");
                    console.log("collect source failed!", res);
                });
            // zs.network.log("来路:" + JSON.stringify(params));
        }

        static collectExport(info, icon, group_id, img_id) {
            if (zs.configs.gameCfg.newAds) {
                this.collectExportNew(info, icon, group_id, img_id);
            } else {
                this.collectExportOld(info);
            }
        }

        static collectExportNew(info, icon, group_id, img_id) {
            if (zs.platform.config.platformMark != 'wx_' || typeof wx === 'undefined') { return; }
            let url = dataMgr.NEWURL + "/" + zs.network.version + "/ad/jump";
            let imgInfo = null;
            if (group_id != null && img_id != null) {
                imgInfo = {};
                imgInfo.group_id = group_id;
                imgInfo.img_id = img_id;
            } else if (icon) {
                for (let i = 0, n = info.imgs.length; i < n; i++) {
                    if (info.imgs[i].icon == icon) {
                        imgInfo = info.imgs[i];
                        break;
                    }
                }
            }
            let signParams = {
                user_id: zs.core.userId,
                from_app_id: zs.core.appId,
                to_app_id: info.app_id,
                position: info.position_type,
                group_id: imgInfo != null ? imgInfo.group_id : 0,
                img_id: imgInfo != null ? imgInfo.img_id : 0,
                event_id: zs.utils.getEventCode('export-' + zs.exporter.utils.navigateCount + "-" + info.app_id),
                record: ""
            };
            zs.td.justTrack("跳转统计", "跳转统计");
            zs.network.nativeRequest(url, signParams, 'POST', false)
                .then((res) => {
                    if (!res || !res.status || res.status != 1) {
                        zs.td.justTrack("跳转统计失败", "跳转统计失败");
                    }
                    console.log("collect export success!", res);
                }).catch((res) => {
                    zs.td.justTrack("跳转统计失败", "跳转统计失败");
                    console.log("collect export failed!", res);
                });
            // zs.network.log("跳转:" + JSON.stringify(signParams));
        }

        static collectExportOld(info) {
            if (zs.platform.config.platformMark != 'wx_' || typeof wx === 'undefined') { return; }
            let url = dataMgr.URL + "/api/appad_new/collect";
            let curTime = Math.round(new Date().getTime() / 1000).toString();
            let sysInfo = zs.platform.sync.getLaunchOptions();
            let signParams = {
                user_id: zs.core.userId,
                from_id: zs.core.appId,
                to_id: info.app_id,
                timestamp: curTime,
                scene: zs.product.scene,
                zhise: (sysInfo && sysInfo.query && sysInfo.query.zhise) ? sysInfo.query.zhise : "",
                event_id: zs.utils.getEventCode('export-' + zs.exporter.utils.navigateCount + "-" + info.app_id),
            };
            zs.td.justTrack("跳转统计", "跳转统计");
            zs.network.nativeRequest(url, signParams, 'POST', true, false, true)
                .then((res) => {
                    if (!res || !res.status || res.status != 1) {
                        zs.td.justTrack("跳转统计失败", "跳转统计失败");
                    }
                    console.log("collect export success!", res);
                }).catch((res) => {
                    zs.td.justTrack("跳转统计失败", "跳转统计失败");
                    console.log("collect export failed!", res);
                });
        }

        static loadNew() {
            let url = dataMgr.NEWURL + "/" + zs.network.version + "/ad/list";
            // let url = dataMgr.NEWURL + "/v1/ad/list";
            let data = { appid: zs.configs.gameCfg.appId };
            return new zs.Coop((resolve, reject) => {
                let cache = dataMgr.getCache(dataMgr.exportCacheNew);
                if (cache) {
                    return resolve(cache);
                }
                if (dataMgr.cacheSetting) {
                    if (dataMgr.requestList == null) {
                        dataMgr.requestList = [];
                    }
                    dataMgr.requestList.push((data) => {
                        resolve(data);
                    });
                    return;
                }
                dataMgr.cacheSetting = true;
                zs.td.justTrack("拉取广告数据", "拉取广告数据");
                zs.network.nativeRequest(url, data, 'POST', true, false)
                    .then((result) => {
                        let data = [];
                        for (let key in result) {
                            let value = result[key];
                            if (value == null || !Array.isArray(value) || value.length <= 0) { continue; }
                            for (let i = 0, n = value.length; i < n; i++) {
                                let ad = {};
                                let info = value[i];
                                info.position_type = info.position;
                                info.app_title = info.name;
                                info.appid = info.app_id;
                                ad.info = info;
                                if (ad.info.imgs && ad.info.imgs.length > 0) {
                                    ad.img_index = zs.utils.randInt(0, ad.info.imgs.length);
                                    ad.getIcon = (index) => {
                                        index = index || 0;
                                        return ad.info.imgs[index % ad.info.imgs.length].icon;
                                    }
                                }
                                data.push(ad);
                            };
                        }
                        dataMgr.setCache(dataMgr.exportCacheNew, data);
                        zs.log.debug("load success: ", "Exporter", data);
                        if (dataMgr.requestList && dataMgr.requestList.length > 0) {
                            for (let i = 0, n = dataMgr.requestList.length; i < n; i++) {
                                dataMgr.requestList[i].call(this, data);
                            }
                        }
                        dataMgr.requestList = null;
                        dataMgr.cacheSetting = false;
                        if (data == null || data.length <= 0) {
                            zs.td.justTrack("拉取广告数据失败", "拉取广告数据失败");
                        } else {
                            zs.td.justTrack("拉取广告数据成功", "拉取广告数据成功");
                        }
                        resolve(data);
                    }).catch((result) => {
                        let data = [];
                        if (dataMgr.requestList && dataMgr.requestList.length > 0) {
                            for (let i = 0, n = dataMgr.requestList.length; i < n; i++) {
                                dataMgr.requestList[i].call(this, data);
                            }
                        }
                        dataMgr.requestList = null;
                        dataMgr.cacheSetting = false;
                        zs.td.justTrack("拉取广告数据失败", "拉取广告数据失败");
                        resolve(data);
                    })
            });
        }

        static loadOld() {
            let url = dataMgr.URL + "/api/appad_new/index";
            let currentTime = Math.round(new Date().getTime() / 1000).toString();
            let data = {
                appid: zs.configs.gameCfg.appId,
                timestamp: currentTime
            }
            return new zs.Coop((resolve, reject) => {
                let cache = dataMgr.getCache(dataMgr.exportCache);
                if (cache) {
                    return resolve(cache);
                }
                if (dataMgr.cacheSetting) {
                    if (dataMgr.requestList == null) {
                        dataMgr.requestList = [];
                    }
                    dataMgr.requestList.push((data) => {
                        resolve(data);
                    });
                    return;
                }
                dataMgr.cacheSetting = true;
                zs.td.justTrack("拉取广告数据", "拉取广告数据");
                zs.network.nativeRequest(url, data, 'POST', true, false, true)
                    .then((result) => {
                        let data = [];
                        for (let key in result) {
                            let value = result[key];
                            if (value == null || !Array.isArray(value)) { continue; }
                            for (let i = 0, n = value.length; i < n; i++) {
                                let ad = {};
                                let info = value[i];
                                ad.info = info;
                                let skip = false;
                                for (let i = 0, n = data.length; i < n; i++) {
                                    let curInfo = data[i];
                                    if (curInfo.info.appid == info.appid) {
                                        if (!curInfo.info.imgs) {
                                            curInfo.info.imgs = [];
                                            curInfo.info.imgs.push(curInfo.info.app_icon);
                                        }
                                        curInfo.info.imgs.push(info.app_icon);
                                        curInfo.img_index = zs.utils.randInt(0, curInfo.info.imgs.length);
                                        skip = true;
                                        break;
                                    }
                                }
                                if (skip) { continue; }
                                ad.getIcon = (index) => {
                                    if (!ad.info.imgs) { return ad.info.app_icon; }
                                    index = index || 0;
                                    return ad.info.imgs[index % ad.info.imgs.length];
                                }
                                data.push(ad);
                            };
                        }
                        dataMgr.setCache(dataMgr.exportCache, data);
                        zs.log.debug("load success: ", "Exporter", data);
                        if (dataMgr.requestList && dataMgr.requestList.length > 0) {
                            for (let i = 0, n = dataMgr.requestList.length; i < n; i++) {
                                dataMgr.requestList[i].call(this, data);
                            }
                        }
                        dataMgr.requestList = null;
                        dataMgr.cacheSetting = false;
                        if (data == null || data.length <= 0) {
                            zs.td.justTrack("拉取广告数据失败", "拉取广告数据失败");
                        }
                        resolve(data);
                    })
                    .catch((error) => {
                        let data = [];
                        if (dataMgr.requestList && dataMgr.requestList.length > 0) {
                            for (let i = 0, n = dataMgr.requestList.length; i < n; i++) {
                                dataMgr.requestList[i].call(this, data);
                            }
                        }
                        dataMgr.requestList = null;
                        dataMgr.cacheSetting = false;
                        zs.td.justTrack("拉取广告数据失败", "拉取广告数据失败");
                        resolve(data);
                    });
            });
        }

        static load() {
            if (zs.configs.gameCfg.newAds) {
                return this.loadNew();
            } else {
                return this.loadOld();
            }
        }
    }
    dataMgr.URL = "https://zsad.zxmn2018.com";
    dataMgr.NEWURL = "https://gamesapi.zxmn2018.com";

    dataMgr.expireTime = 600000;
    dataMgr.exportCache = 'ExpCache';
    dataMgr.exportCacheNew = 'ExpCacheNew';

    class list extends zs.fgui.base {
        constructor(component) {
            super(component);
            this._cellWidth = 0;
            this._cellHeight = 0;
            this._effectWidth = 0;
            this._effectHeight = 0;
            this._itemType = null;
            this._datas = [];
            this._maxItems = 0;
            this._adaptScale = false;
            this._keepRatio = AdaptType.None;
            this._autoScrollSpeed = 0;
            this._autoScrollForward = true;
            this._isAutoScrolling = false;
            this._dragRecoverTime = 0;
            this._dragStopCount = 0;
            this._readyDrag = false;
            this._clickHandler = null;
            this._transition = null;
            this._bScrollExport = false;
            if (component && component instanceof zs.ui.FGUI_list) {
                component.list.itemProvider = zs.proxy.Event.FGUIEvent(this, this.onItemProvider);
                component.list.itemRenderer = zs.proxy.Event.FGUIEvent(this, this.onItemRenderer);
                zs.proxy.Event.FGUIOn(component.list, zs.proxy.Event.FGUI_CLICK_ITEM, this, this.onClickItem);
                zs.proxy.Event.FGUIOn(component.list, zs.proxy.Event.MOUSE_DOWN, this, this.onDragStateBegin);
                zs.proxy.Event.FGUIOn(component.list, zs.proxy.Event.MOUSE_MOVE, this, this.onDragStateChanged);
            }
        }
        static make() {
            let view = zs.ui.FGUI_list.createInstance();
            return view;
        }
        static type() {
            return zs.ui.FGUI_list;
        }
        dispose() {
            super.dispose();
            this.startOffsetDelayHandler && clearTimeout(this.startOffsetDelayHandler);
            zs.Tween.clearAll(this.view);
            if (this.shakeTime > 0) {
                this.stopShake();
            }
        }
        check(component) {
            if (component instanceof zs.ui.FGUI_list) {
                return true;
            }
            return false;
        }

        setHorizontalList(type, height, max, autoApply) {
            this.setItem(type)
                .setLayout(fairygui.ListLayoutType.FlowVertical)
                .setAlign(AlignType.Center)
                .setAdaptScale(true)
                .setKeepRatio(AdaptType.Vertical)
                .setScrollType(fairygui.ScrollType.Horizontal)
                .setColumnGap(25)
                .setGridHeight(height)
                .snapWidth()
                .setAutoScrollSpeed(50)
                .setDragRecoverTime(3)
                .loop()
                .setScrollExport()
                .setMaxItems(max);
            dataMgr.load().then((result) => {
                if (this.disposed) return;
                this.setDatas(result)
                    .apply();
            }).catch(e => e);
            if (autoApply) {
                return this.apply();
            }
            return this;
        }
        setVerticalList(type, width, max, autoApply) {
            this.setItem(type)
                .setLayout(fairygui.ListLayoutType.FlowHorizontal)
                .setAlign(AlignType.Center)
                .setAdaptScale(true)
                .setKeepRatio(AdaptType.Horizontal)
                .setScrollType(fairygui.ScrollType.Vertical)
                .setLineGap(25)
                .setGridWidth(width)
                .snapHeight()
                .setAutoScrollSpeed(50)
                .setDragRecoverTime(3)
                .loop()
                .setMaxItems(max);
            dataMgr.load().then((result) => {
                if (this.disposed) return;
                this.setDatas(result)
                    .apply();
            }).catch(e => e);
            if (autoApply) {
                return this.apply();
            }
            return this;
        }
        setSideList(type, width, max, autoApply) {
            this.setItem(type)
                .setLayout(fairygui.ListLayoutType.FlowHorizontal)
                .setAlign(AlignType.Center)
                .setAdaptScale(true)
                .setKeepRatio(AdaptType.Horizontal)
                .setCellWidth(width * 0.7)
                .setScrollType(fairygui.ScrollType.Vertical)
                .setLineGap(25)
                .setGridWidth(width)
                .setListFit(true)
                .bounce(false)
                .setMaxItems(max);
            dataMgr.load().then((result) => {
                if (this.disposed) return;
                result && result.sort((a, b) => {
                    return a < b ? -1 : 1
                })
                this.setDatas(result)
                    .apply();
            }).catch(e => e);
            if (autoApply) {
                return this.apply();
            }
            return this;
        }
        setHorizontalGrid(type, width, height, lineLimit, max, autoApply) {
            this.setItem(type)
                .setLayout(fairygui.ListLayoutType.FlowHorizontal)
                .setAlign(AlignType.Center)
                .setAdaptScale(true)
                .setKeepRatio(AdaptType.Horizontal)
                .setCellWidth((width - 30 * lineLimit) / lineLimit)
                .setScrollType(fairygui.ScrollType.Both)
                .setLineGap(30)
                .setLineCount(lineLimit)
                .setColumnGap(30)
                .setGridSize(width, height)
                .bounce(false)
                .setMaxItems(max);
            dataMgr.load().then((result) => {
                if (this.disposed) return;
                this.setDatas(result)
                    .apply();
            }).catch(e => e);
            if (autoApply) {
                return this.apply();
            }
            return this;
        }
        setVerticalGrid(type, width, height, columnLimit, max, autoApply) {
            this.setItem(type)
                .setLayout(fairygui.ListLayoutType.FlowHorizontal)
                .setAlign(AlignType.Center)
                .setAdaptScale(true)
                .setKeepRatio(AdaptType.Vertical)
                .setCellHeight((height - 30 * columnLimit) / columnLimit)
                .setScrollType(fairygui.ScrollType.Both)
                .setLineGap(30)
                .setLineCount(columnLimit)
                .setColumnGap(30)
                .setGridSize(width, height)
                .bounce(false)
                .setMaxItems(max);
            dataMgr.load().then((result) => {
                if (this.disposed) return;
                this.setDatas(result)
                    .apply();
            }).catch(e => e);
            if (autoApply) {
                return this.apply();
            }
            return this;
        }
        get adaptScale() {
            return this._adaptScale;
        }
        setAdaptScale(value) {
            this._adaptScale = value;
            return this;
        }
        get listFit() {
            return this._listFit;
        }
        setListFit(value) {
            this._listFit = value;
            return this;
        }
        get keepRatio() {
            return this._keepRatio;
        }
        setKeepRatio(value) {
            this._keepRatio = value;
            return this;
        }
        get align() {
            let listView = this.view;
            let result = AlignType.Center;
            if (listView && listView.list) {
                let horizontal = listView.list.align;
                let vertical = listView.list.verticalAlign;
                switch (horizontal) {
                    case list.AlignMiddle:
                        switch (vertical) {
                            case list.AlignBottom:
                                result = AlignType.Bottom;
                                break;
                            case list.AlignCenter:
                                result = AlignType.Center;
                                break;
                            default:
                                result = AlignType.Top;
                                break;
                        }
                        break;
                    case list.AlignRight:
                        switch (vertical) {
                            case list.AlignBottom:
                                result = AlignType.BottomRight;
                                break;
                            case list.AlignCenter:
                                result = AlignType.Right;
                                break;
                            default:
                                result = AlignType.TopRight;
                                break;
                        }
                        break;
                    default:
                        switch (vertical) {
                            case list.AlignBottom:
                                result = AlignType.BottomLeft;
                                break;
                            case list.AlignCenter:
                                result = AlignType.Left;
                                break;
                            default:
                                result = AlignType.TopLeft;
                                break;
                        }
                        break;
                }
            }
            return result;
        }
        setAlign(type) {
            let listView = this.view;
            if (listView && listView.list) {
                switch (type) {
                    case AlignType.Center:
                        listView.list.align = list.AlignCenter;
                        listView.list.verticalAlign = list.AlignMiddle;
                        break;
                    case AlignType.Top:
                        listView.list.align = list.AlignCenter;
                        listView.list.verticalAlign = list.AlignTop;
                        break;
                    case AlignType.Bottom:
                        listView.list.align = list.AlignCenter;
                        listView.list.verticalAlign = list.AlignBottom;
                        break;
                    case AlignType.Left:
                        listView.list.align = list.AlignLeft;
                        listView.list.verticalAlign = list.AlignMiddle;
                        break;
                    case AlignType.Right:
                        listView.list.align = list.AlignRight;
                        listView.list.verticalAlign = list.AlignMiddle;
                        break;
                    case AlignType.TopLeft:
                        listView.list.align = list.AlignLeft;
                        listView.list.verticalAlign = list.AlignTop;
                        break;
                    case AlignType.BottomLeft:
                        listView.list.align = list.AlignLeft;
                        listView.list.verticalAlign = list.AlignBottom;
                        break;
                    case AlignType.TopRight:
                        listView.list.align = list.AlignRight;
                        listView.list.verticalAlign = list.AlignTop;
                        break;
                    case AlignType.BottomRight:
                        listView.list.align = list.AlignRight;
                        listView.list.verticalAlign = list.AlignBottom;
                        break;
                }
            }
            return this;
        }
        get lineCount() {
            let listView = this.view;
            if (listView && listView.list) {
                return listView.list.lineCount;
            }
            return 0;
        }
        setLineCount(count) {
            let listView = this.view;
            listView && listView.list && (listView.list.lineCount = count);
            return this;
        }
        get lineGap() {
            let listView = this.view;
            if (listView && listView.list) {
                return listView.list.lineGap;
            }
            return 0;
        }
        setLineGap(gap) {
            let listView = this.view;
            listView && listView.list && (listView.list.lineGap = gap);
            return this;
        }
        get columnCount() {
            let listView = this.view;
            if (listView && listView.list) {
                return listView.list.columnCount;
            }
            return 0;
        }
        setColumnCount(count) {
            let listView = this.view;
            listView && listView.list && (listView.list.columnCount = count);
            return this;
        }
        get columnGap() {
            let listView = this.view;
            if (listView && listView.list) {
                return listView.list.columnGap;
            }
            return 0;
        }
        setColumnGap(gap) {
            let listView = this.view;
            listView && listView.list && (listView.list.columnGap = gap);
            return this;
        }
        get layout() {
            let listView = this.view;
            return listView ? listView.list.layout : fairygui.ListLayoutType.FlowHorizontal;
        }
        setLayout(type) {
            let listView = this.view;
            listView && listView.list && (listView.list.layout = type);
            return this;
        }
        get cellWidth() {
            return this._cellWidth;
        }
        setCellWidth(width) {
            this._cellWidth = width;
            return this;
        }
        get cellHeight() {
            return this._cellHeight;
        }
        setCellHeight(height) {
            this._cellHeight = height;
            return this;
        }
        setCellSize(width, height) {
            this._cellWidth = width;
            this._cellHeight = height;
            return this;
        }
        get x() {
            return this.view ? this.view.x : 0;
        }
        setX(x) {
            this.view && (this.view.x = x);
            return this;
        }
        get y() {
            return this.view ? this.view.y : 0;
        }
        setY(y) {
            this.view && (this.view.y = y);
            return this;
        }
        setXY(x, y) {
            if (this.view) {
                this.view.x = x;
                this.view.y = y;
            }
            return this;
        }
        get scaleX() {
            return this.view ? this.view.scaleX : 1;
        }
        setScaleX(x) {
            this.view && (this.view.scaleX = x);
            return this;
        }
        get scaleY() {
            return this.view ? this.view.scaleY : 1;
        }
        setScaleY(y) {
            this.view && (this.view.scaleY = y);
            return this;
        }
        setScaleXY(x, y) {
            if (this.view) {
                this.view.scaleX = x;
                this.view.scaleY = y;
            }
            return this;
        }
        get gridWidth() {
            return this.view ? this.view.width : 0;
        }
        setGridWidth(width) {
            this.view && (this.view.width = width);
            return this;
        }
        snapWidth() {
            this.view && (this.view.width = fairygui.GRoot.inst.width * (1 / this.view.scaleX));
            return this;
        }
        get gridHeight() {
            return this.view ? this.view.height : 0;
        }
        setGridHeight(height) {
            this.view && (this.view.height = height);
            return this;
        }
        snapHeight() {
            this.view && (this.view.height = fairygui.GRoot.inst.height * (1 / this.view.scaleY));
            return this;
        }
        setGridSize(width, height) {
            if (this.view) {
                this.view.width = width;
                this.view.height = height;
            }
            return this;
        }
        get marginLeft() {
            if (this.view && this.view instanceof zs.ui.FGUI_list) {
                return this.view.list.margin.left;
            }
            return 0;
        }
        setMarginLeft(left) {
            let listView = this.view;
            listView && listView.list && (listView.list.margin.left = left);
            return this;
        }
        get marginRight() {
            if (this.view && this.view instanceof zs.ui.FGUI_list) {
                return this.view.list.margin.right;
            }
            return 0;
        }
        setMarginRight(right) {
            let listView = this.view;
            listView && listView.list && (listView.list.margin.right = right);
            return this;
        }
        get marginTop() {
            if (this.view && this.view instanceof zs.ui.FGUI_list) {
                return this.view.list.margin.top;
            }
            return 0;
        }
        setMarginTop(top) {
            let listView = this.view;
            listView && listView.list && (listView.list.margin.top = top);
            return this;
        }
        get marginBottom() {
            if (this.view && this.view instanceof zs.ui.FGUI_list) {
                return this.view.list.margin.bottom;
            }
            return 0;
        }
        setMarginBottom(bottom) {
            let listView = this.view;
            listView && listView.list && (listView.list.margin.bottom = bottom);
            return this;
        }
        get margin() {
            if (this.view && this.view instanceof zs.ui.FGUI_list) {
                return this.view.list.margin;
            }
            return null;
        }
        setMargin(left, right, top, bottom) {
            let listView = this.view;
            if (listView && listView.list) {
                listView.list.margin.left = left;
                listView.list.margin.right = right;
                listView.list.margin.top = top;
                listView.list.margin.bottom = bottom;
            }
            return this;
        }
        get background() {
            if (this.view && this.view instanceof zs.ui.FGUI_list) {
                return this.view.background.url;
            }
            return null;
        }
        setBackground(url) {
            let listView = this.view;
            if (listView && listView.background) {
                if (Array.isArray(url) && url.length > 1) {
                    zs.fgui.loadPack(url[0]).then((res) => {
                        listView.background.url = zs.ui.readURL(res, url[1]);
                    }).catch(e => e);
                } else {
                    listView.background.url = url;
                }
            }
            return this;
        }
        get backgroundAlpha() {
            if (this.view && this.view instanceof zs.ui.FGUI_list) {
                return this.view.background.alpha;
            }
            return 0;
        }
        setBackgroundAlpha(value) {
            this.view && this.view.background && (this.view.background.alpha = value);
            return this;
        }
        get item() {
            return this._itemType;
        }
        setItem(type) {
            this._itemType = type;
            let listView = this.view;
            if (listView && listView.list) {
                listView.list.defaultItem = this._itemType.URL;
            }
            return this;
        }
        get datas() {
            return this._datas;
        }
        setDatas(datas) {
            this._datas = zs.utils.arrayDeepCopy(datas);
            this._datas.sort((a, b) => Math.random() > 0.5 ? -1 : 1)
            return this;
        }
        get maxItems() {
            return this._maxItems;
        }
        setMaxItems(value) {
            this._maxItems = value;
            return this;
        }
        get scrollType() {
            let listView = this.view;
            if (listView && listView.list) {
                return listView.list.scrollPane["_scrollType"];
            }
            return fairygui.ScrollType.Both;
        }
        setScrollType(type) {
            let listView = this.view;
            if (listView && listView.list) {
                listView.list.scrollPane["_scrollType"] = type;
            }
            return this;
        }
        get autoScrollSpeed() {
            return this._autoScrollSpeed;
        }
        setAutoScrollSpeed(value) {
            this._autoScrollSpeed = value;
            return this;
        }
        get dragRecoverTime() {
            return this._dragRecoverTime;
        }
        setDragRecoverTime(value) {
            this._dragRecoverTime = value;
            return this;
        }
        get transition() {
            return this._transition;
        }
        setTransition(transition) {
            this._transition = transition;
            return this;
        }
        get startOffsetX() {
            return this._startoffsetx;
        }
        setStartOffsetX(value) {
            this._startoffsetx = value;
            return this;
        }
        get startOffsetY() {
            return this._startoffsety;
        }
        setStartOffsetY(value) {
            this._startoffsety = value;
            return this;
        }
        get startOffsetTime() {
            return this._startoffsettime;
        }
        setStartOffsetTime(value) {
            this._startoffsettime = value;
        }
        get startOffsetDelay() {
            return this._startoffsetdelay;
        }
        setStartOffsetDelay(value) {
            this._startoffsetdelay = value;
        }
        get startFadeDelay() {
            return this._startfadedelay;
        }
        setStartFadeDelay(value) {
            this._startfadedelay = value;
        }
        get startFadeTime() {
            return this._startfadetime;
        }
        setStartFadeTime(value) {
            this._startfadetime = value;
        }
        setDataHandler(handler) {
            if (handler) {
                handler.once = false;
                this._itemRendererHandler = handler;
            }
            return this;
        }
        setClickHandler(handler) {
            this._clickHandler = handler;
            return this;
        }
        setScrollExport() {
            this._bScrollExport = true;
            return this;
        }
        fit() {
            let listView = this.view;
            if (listView && listView.list) {
                listView.list.resizeToFit();
                let width = listView.list.width;
                let height = listView.list.height;
                listView.width = width;
                listView.height = height;
                listView.list.width = width;
                listView.list.height = height;
            }
            return this;
        }
        loop() {
            let listView = this.view;
            if (listView && listView.list && this._itemType) {
                if (listView.list.layout == fairygui.ListLayoutType.FlowHorizontal) {
                    listView.list.layout = fairygui.ListLayoutType.SingleColumn;
                } else if (listView.list.layout == fairygui.ListLayoutType.FlowVertical) {
                    listView.list.layout = fairygui.ListLayoutType.SingleRow;
                }
                listView.list.setVirtualAndLoop();
            }
            if (!this._itemType) {
                zs.log.warn("请先使用SetItem设置列表组件，再执行loop", "Exporter");
            }
            return this;
        }
        virtual() {
            let listView = this.view;
            if (listView && listView.list && this._itemType) {
                listView.list.setVirtual();
            }
            if (!this._itemType) {
                zs.log.warn("请先使用SetItem设置列表组件，再执行virtual", "Exporter");
            }
            return this;
        }
        bounce(value) {
            let listView = this.view;
            if (listView && listView.list) {
                listView.list.scrollPane.bouncebackEffect = value;
            }
            return this;
        }
        setShakeTime(value) {
            this.shakeTime = value;
            return this;
        }
        apply() {
            let listView = this.view;
            if (listView && listView.list && !this.disposed) {
                listView.list.handleSizeChanged();
                let margin = this.margin;
                this._effectWidth = this.gridWidth - margin.left - margin.right;
                this._effectHeight = this.gridHeight - margin.top - margin.bottom;
                if (this._effectWidth <= 0 || this._effectHeight <= 0) {
                    listView.list.numItems = 0;
                } else {
                    if (this.maxItems > 0) {
                        listView.list.numItems = this._datas ? Math.min(this._datas.length, this._maxItems) : 0;
                    } else {
                        listView.list.numItems = this._datas ? this._datas.length : 0;
                    }
                }
                if (this._listFit) {
                    listView.list.resizeToFit(listView.list.numItems);
                }
                if (this._autoScrollSpeed != 0) {
                    zs.Timer.inst.clear(this, this.onAutoScroll);
                    zs.Timer.inst.frameLoop(1, this, this.onAutoScroll);
                    this._isAutoScrolling = true;
                }
                if (this._bScrollExport) {
                    zs.proxy.Event.FGUIOff(listView.list, zs.proxy.Event.FGUI_DRAG_START, this, this.scrollStart);
                    zs.proxy.Event.FGUIOff(listView.list, zs.proxy.Event.FGUI_DRAG_END, this, this.scrollJumpExport);
                    zs.proxy.Event.FGUIOn(listView.list, zs.proxy.Event.FGUI_DRAG_START, this, this.scrollStart);
                    zs.proxy.Event.FGUIOn(listView.list, zs.proxy.Event.FGUI_DRAG_END, this, this.scrollJumpExport);
                }
                if (this.shakeTime && this.shakeTime > 0) {
                    zs.Timer.inst.once(this.shakeTime, this, this.refreshItem)
                }
            }

            if ((this._startoffsetx != null || this._startoffsety != null) && this.startOffsetDelayHandler == null) {
                this.startOffsetDelayHandler = setTimeout(() => {
                    let targetX = this.view.x + (this._startoffsetx || 0);
                    let targetY = this.view.y + (this._startoffsety || 0);
                    zs.Tween.to(this.view, { x: targetX, y: targetY }, this._startoffsettime || 500, null, null, this._startoffsetdelay || 0);
                }, 1);
            }
            if (this._startfadedelay != null || this._startfadetime != null) {
                this.view.alpha = 0;
                zs.Tween.to(this.view, { alpha: 1 }, this._startfadetime || 500, null, null, this._startfadedelay || 0);
                this._startfadedelay = null;
                this._startfadetime = null;
            }
            return this;
        }
        applyConfig(config) {
            if (config) {
                config.scalex != null && (this.setScaleX(config.scalex));
                config.scale_x != null && (this.setScaleX(config.scale_x));
                config.scaley != null && (this.setScaleY(config.scaley));
                config.scale_y != null && (this.setScaleY(config.scale_y));
                let item = zs.fgui.configs.items[config.item];
                if (config.mode && item != null) {
                    switch (config.mode) {
                        case "hlist":
                            if (config.height != null) {
                                this.setHorizontalList(item, config.height, config.max || 0, false);
                                item == null;
                            }
                            break;
                        case "vlist":
                            if (config.width != null) {
                                this.setVerticalList(item, config.width, config.max || 0, false);
                                item == null;
                            }
                            break;
                        case "hgrid":
                            if (config.width != null && config.height != null && (config.linelimit != null || config.line_limit != null)) {
                                this.setHorizontalGrid(item, config.width, config.height, config.line_limit != null ? config.line_limit : config.linelimit, config.max || 0, false);
                                item == null;
                            }
                            break;
                        case "vgrid":
                            if (config.width != null && config.height != null && (config.columnlimit != null || config.column_limit != null)) {
                                this.setVerticalGrid(item, config.width, config.height, config.column_limit != null ? config.column_limit : config.columnlimit, config.max || 0, false);
                                item == null;
                            }
                            break;
                        case "side":
                            if (config.width != null) {
                                this.setSideList(item, config.width, config.max || 0, false);
                                item == null;
                            }
                            break;
                    }
                }
                config.adaptscale != null && (this.setAdaptScale(config.adaptscale));
                config.adapt_scale != null && (this.setAdaptScale(config.adapt_scale));
                config.listfit != null && (this.setListFit(config.listfit));
                config.list_fit != null && (this.setListFit(config.list_fit));
                let keepRatio = config.keep_ratio || config.keepratio;
                if (keepRatio) {
                    switch (keepRatio) {
                        case "horizontal":
                            this.setKeepRatio(zs.AdaptType.Horizontal);
                            break;
                        case "vertical":
                            this.setKeepRatio(zs.AdaptType.Vertical);
                            break;
                        default:
                            this.setKeepRatio(zs.AdaptType.None);
                            break;
                    }
                }
                if (config.align) {
                    switch (config.align) {
                        case "center":
                            this.setAlign(zs.AlignType.Center);
                            break;
                        case "top":
                            this.setAlign(zs.AlignType.Top);
                            break;
                        case "bottom":
                            this.setAlign(zs.AlignType.Bottom);
                            break;
                        case "left":
                            this.setAlign(zs.AlignType.Left);
                            break;
                        case "right":
                            this.setAlign(zs.AlignType.Right);
                            break;
                        case "topleft":
                            this.setAlign(zs.AlignType.TopLeft);
                            break;
                        case "bottomleft":
                            this.setAlign(zs.AlignType.BottomLeft);
                            break;
                        case "topright":
                            this.setAlign(zs.AlignType.TopRight);
                            break;
                        case "bottomright":
                            this.setAlign(zs.AlignType.BottomRight);
                            break;
                    }
                }
                config.linecount != null && (this.setLineCount(config.linecount));
                config.line_count != null && (this.setLineCount(config.line_count));
                config.linegap != null && (this.setLineGap(config.linegap));
                config.line_gap != null && (this.setLineGap(config.line_gap));
                config.columncount != null && (this.setColumnCount(config.columncount));
                config.column_count != null && (this.setColumnCount(config.column_count));
                config.columngap != null && (this.setColumnGap(config.columngap));
                config.column_gap != null && (this.setColumnGap(config.column_gap));
                if (config.layout) {
                    switch (config.layout) {
                        case "singlecolumn":
                        case "single_column":
                        case "column":
                            this.setLayout(fairygui.ListLayoutType.SingleColumn);
                            break;
                        case "singlerow":
                        case "single_row":
                        case "row":
                            this.setLayout(fairygui.ListLayoutType.SingleRow);
                            break;
                        case "flowhorizontal":
                        case "flow_horizontal":
                        case "horizontal":
                            this.setLayout(fairygui.ListLayoutType.FlowHorizontal);
                            break;
                        case "flowvertical":
                        case "flow_vertical":
                        case "vertical":
                            this.setLayout(fairygui.ListLayoutType.FlowVertical);
                            break;
                        case "pagination":
                        case "page":
                            this.setLayout(fairygui.ListLayoutType.Pagniation);
                            break;
                    }
                }
                config.cellwidth != null && (this.setCellWidth(config.cellwidth));
                config.cell_width != null && (this.setCellWidth(config.cell_width));
                config.cellheight != null && (this.setCellHeight(config.cellheight));
                config.cell_height != null && (this.setCellHeight(config.cell_height));
                config.x != null && (this.setX(x));
                config.y != null && (this.setY(y));
                config.gridwidth != null && (this.setGridWidth(config.gridWidth));
                config.grid_width != null && (this.setGridWidth(config.grid_width));
                config.gridheight != null && (this.setGridHeight(config.gridHeight));
                config.grid_height != null && (this.setGridHeight(config.grid_height));
                (config.snap_width || config.snapwidth) && (this.snapWidth());
                (config.snap_height || config.snapheight) && (this.snapheight());
                config.marginleft != null && (this.setMarginLeft(config.marginleft));
                config.margin_left != null && (this.setMarginLeft(config.margin_left));
                config.marginright != null && (this.setMarginRight(config.marginright));
                config.margin_right != null && (this.setMarginRight(config.margin_right));
                config.margintop != null && (this.setMarginTop(config.margintop));
                config.margin_top != null && (this.setMarginTop(config.margin_top));
                config.marginbottom != null && (this.setMarginBottom(config.marginbottom));
                config.margin_bottom != null && (this.setMarginBottom(config.margin_bottom));
                config.background && (this.setBackground(config.background));
                config.backgroundalpha != null && (this.setBackgroundAlpha(config.backgroundalpha));
                config.background_alpha != null && (this.setBackgroundAlpha(config.background_alpha));
                item && (this.setItem(item));
                config.max && (this.setMaxItems(config.max));
                let scrollType = config.scroll_type || config.scrolltype;
                if (scrollType) {
                    switch (scrollType) {
                        case "horizontal":
                            this.setScrollType(fairygui.ScrollType.Horizontal);
                            break;
                        case "vertical":
                            this.setScrollType(fairygui.ScrollType.Vertical);
                            break;
                        case "both":
                            this.setScrollType(fairygui.ScrollType.Both);
                            break;

                    }
                }
                config.autoscrollspeed != null && (this.setAutoScrollSpeed(config.autoscrollspeed));
                config.auto_scroll_speed != null && (this.setAutoScrollSpeed(config.auto_scroll_speed));
                config.dragrecovertime != null && (this.setDragRecoverTime(config.dragrecovertime));
                config.drag_recover_time != null && (this.setDragRecoverTime(config.drag_recover_time));
                config.transition && (this.setTransition(config.transition));
                config.fit && (this.fit());
                config.loop && (this.loop());
                config.virtual && (this.virtual());
                config.bounce != null && (this.bounce(config.bounce));
                config.shaketime != null && (this.setShakeTime(config.shaketime));
                config.shake_time != null && (this.setShakeTime(config.shake_time));
                config.startoffsetx != null && (this.setStartOffsetX(config.startoffsetx));
                config.start_offset_x != null && (this.setStartOffsetX(config.start_offset_x));
                config.startoffsety != null && (this.setStartOffsetY(config.startoffsety));
                config.start_offset_y != null && (this.setStartOffsetY(config.start_offset_y));
                config.startoffsettime != null && (this.setStartOffsetTime(config.startoffsettime));
                config.start_offset_time != null && (this.setStartOffsetTime(config.start_offset_time));
                config.startoffsetdelay != null && (this.setStartOffsetDelay(config.startoffsetdelay));
                config.start_offset_delay != null && (this.setStartOffsetDelay(config.start_offset_delay));
                config.startfadedelay != null && (this.setStartFadeDelay(config.startfadedelay));
                config.start_fade_delay != null && (this.setStartFadeDelay(config.start_fade_delay));
                config.startfadetime != null && (this.setStartFadeTime(config.startfadetime));
                config.start_fade_time != null && (this.setStartFadeTime(config.start_fade_time));
            }
            return this.apply();
        }
        startShake() {
            for (let index = 0; index < this.view.list.numChildren; index++) {
                let item = this.view.list.getChildAt(index);
                this.shakeNode(item);
            }

            zs.Timer.inst.once(this.shakeTime, this, () => {
                this.refreshItem();
            })
        }
        stopShake() {
            for (let index = 0; index < this.view.list.numChildren; index++) {
                let item = this.view.list.getChildAt(index);
                zs.Tween.clearAll(item)
            }
        }
        refreshItem() {
            this._datas.sort((a, b) => Math.random() > 0.5 ? -1 : 1);
            if (this.maxItems > 0) {
                this.view.list.numItems = this._datas ? Math.min(this._datas.length, this._maxItems) : 0;
            } else {
                this.view.list.numItems = this._datas ? this._datas.length : 0;
            }
            if (this.view.list._virtual)
                this.view.list.refreshVirtualList();
            this.startShake()
        }
        shakeNode(node, index = 0) {
            var dt = 100;
            var rotation = 10
            index++;
            switch (index) {
                case 0:
                    node.rotation = 0;
                    zs.Tween.to(node, { rotation: rotation / 2 }, dt / 2, null, zs.Handler.create(this, this.shakeNode, [node, index]))
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    zs.Tween.to(node, { rotation: rotation * (index % 2 == 0 ? 1 : -1) }, dt, null, zs.Handler.create(this, this.shakeNode, [node, index]))
                    break
                case 6:
                    zs.Tween.to(node, { rotation: 0 }, dt / 2)
                    break
            }
        }
        onDragStateBegin() {
            this._readyDrag = true;
        }
        onDragStateChanged() {
            if (this._readyDrag && this._dragRecoverTime > 0) {
                this._isAutoScrolling = false;
                this._dragStopCount = 0;
            }
            if (this._readyDrag) {
                this._readyDrag = false;
            }
        }
        onItemProvider() {
            return this._itemType.URL;
        }
        onItemRenderer(index, item) {
            if (index < 0 || index >= this._datas.length) {
                item.picture.icon = '';
                item.title.text = '';
                item.desc && (item.desc = '');
                item.data = null;
                return;
            }
            let data = this._datas[index];
            if (this._cellWidth > 0 || (this._adaptScale && item.width > this._effectWidth)) {
                let realWidth = this._adaptScale ? this._effectWidth : item.width;
                if (this._cellWidth > 0) {
                    realWidth = Math.min(realWidth, this._cellWidth);
                }
                item.width = realWidth;
            }
            if (this._cellHeight > 0 || (this._adaptScale && item.height > this._effectHeight)) {
                let realHeight = this._adaptScale ? this._effectHeight : item.height;
                if (this._cellHeight > 0) {
                    realHeight = Math.min(realHeight, this._cellHeight);
                }
                item.height = realHeight;
            }
            if (this.keepRatio == AdaptType.Horizontal) {
                item.height = item.width * (item.initHeight / item.initWidth);
            } else if (this.keepRatio == AdaptType.Vertical) {
                item.width = item.height * (item.initWidth / item.initHeight);
            }
            if (this._transition && this._transition.length >= 0) {
                let transition = item.getTransition(this._transition);
                if (transition) { transition.play(); }
            }
            if (this._itemRendererHandler) {
                this._itemRendererHandler.runWith([item, data]);
            } else {
                item.picture && item.picture.icon && (item.picture.icon = data.getIcon(data.img_index));
                if (data.info.app_title && item.title) {
                    item.title.text = data.info.app_title;
                } else if (item.title) {
                    item.title.text = "";
                }
                if (data.info.app_desc && item.desc) {
                    item.desc.text = data.info.app_desc;
                } else if (item.desc) {
                    item.desc.text = "";
                }
                item.desc && (item.desc.text = "");
            }
            item.data = data;
        }
        onAutoScroll() {
            let listView = this.view;
            if (listView && listView.list) {
                if (this._isAutoScrolling && this.scrollType != fairygui.ScrollType.Both) {
                    let scrollDis = this._autoScrollSpeed * zs.Timer.inst.delta * 0.001 * (this._autoScrollForward ? 1 : -1);
                    let scrollPane = listView.list.scrollPane;
                    if (this.scrollType == fairygui.ScrollType.Horizontal) {
                        scrollPane.setPosX(scrollDis + listView.list.scrollPane.posX);
                        if (scrollPane.percX >= 1) {
                            this._autoScrollForward = false;
                        }
                        else if (scrollPane.percX <= 0) {
                            this._autoScrollForward = true;
                        }
                    }
                    else {
                        scrollPane.setPosY(scrollDis + listView.list.scrollPane.posY);
                        if (scrollPane.percY >= 1) {
                            this._autoScrollForward = false;
                        }
                        else if (scrollPane.percY <= 0) {
                            this._autoScrollForward = true;
                        }
                    }
                }
                else if (this.scrollType != fairygui.ScrollType.Both) {
                    this._dragStopCount += zs.Timer.inst.delta * 0.001;
                    if (this._dragStopCount > this._dragRecoverTime) {
                        this._dragStopCount = 0;
                        this._isAutoScrolling = true;
                    }
                }
            }
        }
        refreshSingleItem(index) {
            var oldData = this._datas[index];
            if (oldData.img_index != null) {
                oldData.img_index++;
            } else {
                var newIdx = Math.floor(Math.random() * this._datas.length);
                if (this._datas.length > 1 && newIdx == index) {
                    // 防止自己换自己
                    return this.refreshSingleItem(index);
                }
                var newData = this._datas[newIdx];
                if (newData) {
                    this._datas[index] = newData;
                    this._datas[newIdx] = oldData;
                }
            }
            this.apply();
            if (this.view.list._virtual) {
                this.view.list.refreshVirtualList();
            }
        }
        onClickItem(item) {
            if (this._clickHandler) {
                this._clickHandler.runWith(item);
            } else {
                zs.td.justTrack("列表点击导出跳转", "列表点击导出跳转");
                utils.navigateToMiniProgram(item.data, item.picture.icon).then(() => {
                    // 刷新该icon
                    let index = this._datas.indexOf(item.data)
                    this.refreshSingleItem(index)
                }).catch(e => e);
            }
        }
        scrollStart() {
            this.touchX = zs.proxy.Touch.touchX;
            this.touchY = zs.proxy.Touch.touchY;
        }
        scrollJumpExport() {
            if (utils.checkScroll(this.touchX, this.touchY, list.checkScrollDistance)) {
                var bScrollJump = zs.product.get("zs_slide_jump_switch");
                if (bScrollJump) {
                    this.randomJumpExport();
                }
            }
        }
        randomJumpExport() {
            if (!this._datas || this._datas.length <= 0) { return; }
            let data = this._datas[Math.floor(Math.random() * this._datas.length)];
            zs.td.justTrack("列表随机导出跳转", "列表随机导出跳转");
            utils.navigateToMiniProgram(data);
        }
    }
    list.checkScrollDistance = 30;
    list.AlignTop = zs.proxy.Configs.FGUI_AlignType_Top;
    list.AlignBottom = zs.proxy.Configs.FGUI_AlignType_Bottom;
    list.AlignMiddle = zs.proxy.Configs.FGUI_AlignType_Middle;
    list.AlignLeft = zs.proxy.Configs.FGUI_AlignType_Left;
    list.AlignRight = zs.proxy.Configs.FGUI_AlignType_Right;
    list.AlignCenter = zs.proxy.Configs.FGUI_AlignType_Center;
    list.transitionShakeLeft = 'shakeLeft';
    list.transitionShakeRight = 'shakeRight';

    class loader extends zs.fgui.base {
        constructor(component) {
            super(component);
            component.width = zs.configs.gameCfg.designWidth;
            component.height = zs.configs.gameCfg.designHeight;
            component.alpha = 1;
            component.x = 0;
            component.y = 0;
            component.autoSize = false;
            component.fill = fairygui.LoaderFillType.ScaleFree;
        }
        static make() {
            return new fairygui.GLoader();
        }
        get url() {
            return this.view.url;
        }
        setURL(value) {
            if (Array.isArray(value) && value.length > 1) {
                zs.fgui.loadPack(value[0]).then((res) => {
                    this.view.url = zs.ui.readURL(res, value[1]);
                }).catch(e => e);
            } else {
                this.view.url = value;
            }
            return this;
        }
        get alpha() {
            return this.view.alpha;
        }
        setAlpha(value) {
            this.view.alpha = value;
            return this;
        }
        get width() {
            return this.view.width;
        }
        setWidth(value) {
            this.view.width = value;
            return this;
        }
        get height() {
            return this.view.height;
        }
        setHeight(value) {
            this.view.height = value;
            return this;
        }
        get x() {
            return this.view.x;
        }
        setX(value) {
            this.view.x = value;
            return this;
        }
        get y() {
            return this.view.y;
        }
        setY(value) {
            this.view.y = value;
            return this;
        }
        get fill() {
            let type = "free";
            switch (this.view.fill) {
                case fairygui.LoaderFillType.None:
                    type = "none";
                    break;
                case fairygui.LoaderFillType.Scale:
                    type = "scale";
                    break;
                case fairygui.LoaderFillType.ScaleMatchHeight:
                    type = "height";
                    break;
                case fairygui.LoaderFillType.ScaleMatchWidth:
                    type = "width";
                    break;
                case fairygui.LoaderFillType.ScaleFree:
                    type = "free";
                    break;
                case fairygui.LoaderFillType.ScaleNoBorder:
                    type = "noborder";
                    break;
            }
            return type;
        }
        setFill(value) {
            let type = fairygui.LoaderFillType.ScaleFree;
            switch (value) {
                case "scale":
                    type = fairygui.LoaderFillType.Scale;
                    break;
                case "height":
                    type = fairygui.LoaderFillType.ScaleMatchHeight;
                    break;
                case "width":
                    type = fairygui.LoaderFillType.ScaleMatchWidth;
                    break;
                case "free":
                    type = fairygui.LoaderFillType.ScaleFree;
                    break;
                case "noborder":
                    type = fairygui.LoaderFillType.ScaleNoBorder;
                    break;
                case "none":
                    type = fairygui.LoaderFillType.None;
                    break;
            }
            this.view.fill = type;
            return this;
        }
        applyConfig(config) {
            if (config) {
                config.alpha != null && (this.setAlpha(config.alpha));
                config.url && (this.setURL(config.url));
                config.width != null && (this.setWidth(config.width));
                config.height != null && (this.setHeight(config.height));
                config.x != null && (this.setX(config.x));
                config.y != null && (this.setY(config.y));
                config.fill && (this.setFill(config.fill));
            }
            return this;
        }
    }

    class background extends zs.fgui.base {
        constructor(component) {
            super(component);
            component.width = zs.configs.gameCfg.designWidth;
            component.height = zs.configs.gameCfg.designHeight;
            component.alpha = 0.5;
            component.x = 0;
            component.y = 0;
            component.drawRect(0, zs.proxy.color('#000000'), zs.proxy.color('#000000'));
        }
        static make() {
            return new fairygui.GGraph();
        }
        get color() {
            return this.view.color;
        }
        setColor(value) {
            this.view.color = zs.proxy.color(value);
            return this;
        }
        get alpha() {
            return this.view.alpha;
        }
        setAlpha(value) {
            this.view.alpha = value;
            return this;
        }
        applyConfig(config) {
            if (config) {
                config.color && (this.setColor(config.color));
                config.alpha != null && (this.setAlpha(config.alpha));
            }
            return this;
        }
    }

    class banner extends zs.fgui.base {
        constructor(component) {
            super(component);
            component.width = zs.platform.config.bannerWidth ? zs.platform.config.bannerWidth : 600;
            component.height = zs.platform.config.bannerHeight ? zs.platform.config.bannerHeight : 200;
            component.drawRect(0, zs.proxy.color('#888888'), zs.proxy.color('#888888'));
        }
        static make() {
            return new fairygui.GGraph();
        }
        get width() {
            return this.view.width;
        }
        setWidth(width) {
            this.view.width = width;
        }
        get height() {
            return this.view.height;
        }
        setHeight(height) {
            this.view.height = height;
        }
    }
    class button extends zs.fgui.base {
        static make() {
            return new fairygui.GButton();
        }
        constructor(component) {
            super(component);
            component.width = 300;
            component.height = 80;
            component._downEffect = 2;
            component._downEffectValue = 0.9;
            zs.proxy.Event.FGUIButtonTouchBegin(component);
            component.setPivot(0.5, 0.5, true);
            zs.proxy.Event.FGUIOnClick(component, this, this.onClicked);
            let icon = new fairygui.GLoader();
            icon.x = 0;
            icon.y = 0;
            icon.width = component.width;
            icon.height = component.height;
            icon.addRelation(component, fairygui.RelationType.Width);
            icon.addRelation(component, fairygui.RelationType.Height);
            icon.alpha = 1;
            icon.autoSize = false;
            icon.fill = fairygui.LoaderFillType.ScaleFree;
            component.addChild(icon);
            this.icon = icon;
            this.setURL([zs.fgui.configs.pack_basic, "msg_background"]);
            let title = new fairygui.GTextField();
            title.autoSize = fairygui.AutoSizeType.None;
            title.x = 0;
            title.y = 0;
            title.width = component.width;
            title.height = component.height;
            title.addRelation(component, fairygui.RelationType.Width);
            title.addRelation(component, fairygui.RelationType.Height);
            title.singleLine = true;
            title.fontSize = 36;
            title.align = zs.proxy.Configs.FGUI_AlignType_Center;
            title.verticalAlign = zs.proxy.Configs.FGUI_AlignType_Middle;
            title.color = zs.proxy.color("#000000");
            title.text = "";
            component.addChild(title);
            this.title = title;
        }
        dispose() {
            zs.Tween.clearAll(this.view);
            this.fakeDelayHandler && clearTimeout(this.fakeDelayHandler);
            this.clickDelayHandler && clearTimeout(this.clickDelayHandler);
            this.offsetDelayHandler && clearTimeout(this.offsetDelayHandler);
            super.dispose();
        }
        get url() { return this.icon ? this.icon.url : null; }
        setURL(value) {
            if (this.icon) {
                if (Array.isArray(value) && value.length > 1) {
                    zs.fgui.loadPack(value[0]).then((res) => {
                        zs.ui.readURL(res, value[1]);
                        this.icon.url = zs.ui.readURL(res, value[1]);
                    }).catch(e => e);
                } else {
                    this.icon.url = value;
                }
            }
            return this;
        }
        get alpha() { return this.icon ? this.icon.alpha : null; }
        setAlpha(value) {
            this.icon && (this.icon.alpha = value);
            return this;
        }
        get width() { return this.view.width; }
        setWidth(value) {
            this.view.width = value;
            return this;
        }
        get height() { return this.view.height; }
        setHeight(value) {
            this.view.height = value;
            return this;
        }
        get font() { return this.title ? this.title.font : null; }
        setFont(value) {
            this.title && (this.title.font = value);
            return this;
        }
        get fontsize() { return this.title ? this.title.fontSize : 0; }
        setFontSize(value) {
            this.title && (this.title.fontSize = value);
            return this;
        }
        get text() { return this.title ? this.title.text : null; }
        setText(value) {
            this.title && (this.title.text = value);
            return this;
        }
        get fontcolor() { return this.title ? this.title.color : null; }
        setFontColor(value) {
            this.title && (this.title.color = zs.proxy.color(value));
            return this;
        }
        get switch() { return this._switch }
        setSwitch(config, check) {
            if (zs.core.workflow) {
                this._switch = zs.core.workflow.checkSwitch(config, check);
            } else {
                this._switch = false;
            }
            return this;
        }
        get fill() {
            if (!this.icon) { return null; }
            let type = "free";
            switch (this.icon.fill) {
                case fairygui.LoaderFillType.None:
                    type = "none";
                    break;
                case fairygui.LoaderFillType.Scale:
                    type = "scale";
                    break;
                case fairygui.LoaderFillType.ScaleMatchHeight:
                    type = "height";
                    break;
                case fairygui.LoaderFillType.ScaleMatchWidth:
                    type = "width";
                    break;
                case fairygui.LoaderFillType.ScaleFree:
                    type = "free";
                    break;
                case fairygui.LoaderFillType.ScaleNoBorder:
                    type = "noborder";
                    break;
            }
            return type;
        }
        setFill(value) {
            if (!this.icon) { return; }
            let type = fairygui.LoaderFillType.ScaleFree;
            switch (value) {
                case "scale":
                    type = fairygui.LoaderFillType.Scale;
                    break;
                case "height":
                    type = fairygui.LoaderFillType.ScaleMatchHeight;
                    break;
                case "width":
                    type = fairygui.LoaderFillType.ScaleMatchWidth;
                    break;
                case "free":
                    type = fairygui.LoaderFillType.ScaleFree;
                    break;
                case "noborder":
                    type = fairygui.LoaderFillType.ScaleNoBorder;
                    break;
                case "none":
                    type = fairygui.LoaderFillType.None;
                    break;
            }
            this.icon.fill = type;
            return this;
        }
        setAutoFade(value) {
            this.autofade = value;
            this.isFading = false;
            return this;
        }
        setAutoFadeTime(value) {
            this.autofadetime = value;
            return this;
        }
        setAutoOffset(value) {
            this.autooffset = value;
            return this;
        }
        setOffsetX(value) {
            this.offsetx = value;
            return this;
        }
        setOffsetY(value) {
            this.offsety = value;
            return this;
        }
        setOffsetTime(value) {
            this.offsettime = value;
            return this;
        }
        setClickIgnore(value) {
            this.clickignore = value;
            return this;
        }
        setClickAlways(value) {
            this.clickalways = value;
            return this;
        }
        setFakeDelay(value) {
            this.fakedelay = value;
            return this;
        }
        setFakeEvent(value) {
            this.fakeevent = value;
            return this;
        }
        setEvent(value) {
            this.event = value;
            return this;
        }
        onClicked() {
            if (this.autooffset != null || this.autofade != null || this.ignoreClick) { return; }
            this.ignoreClick = true;
            let fakeSwitch = false;
            this.switch && zs.core.workflow && (fakeSwitch = zs.core.workflow.checkSwitch(this.switch));
            if (fakeSwitch && (this.offsetx || this.offsety)) {
                let targetX = this.view.x + (this.offsetx || 0) * this.view.scaleX;
                let targetY = this.view.y + (this.offsety || 0) * this.view.scaleY;
                zs.Tween.to(this.view, { x: targetX, y: targetY }, this.offsettime || 0, null, zs.Handler.create(this, () => {
                    this.ignoreClick = false;
                }), Number(zs.product.get("zs_button_delay_time")));
                this.offsetx = null;
                this.offsety = null;
                this.onFakeClicked();
            } else if (fakeSwitch && this.clickignore) {
                this.clickDelayHandler = setTimeout(() => {
                    this.ignoreClick = false;
                }, Number(zs.product.get("zs_button_delay_time")));
                this.clickignore = null;
                this.onFakeClicked();
            } else {
                if (this.clickalways) {
                    this.ignoreClick = false;
                }
                this.event && zs.core.workflow && zs.core.workflow.runEventConfig(this.event);
            }
        }
        onFakeClicked() {
            if (this.fakeevent) {
                let delay = zs.core.workflow ? zs.core.workflow.readConfigReturn(this.fakedelay) : null;
                if (!delay || typeof delay !== 'number' || delay <= 0) {
                    zs.core.workflow.runEventConfig(this.fakeevent);
                } else {
                    this.readyEvent = this.fakeevent;
                    this.fakeDelayHandler = setTimeout(() => {
                        zs.core.workflow.runEventConfig(this.readyEvent);
                        this.readyEvent = null;
                    }, delay);
                }
                this.fakeevent = null;
            }
        }
        autoOffset() {
            let fakeSwitch = false;
            this.switch && zs.core.workflow && (fakeSwitch = zs.core.workflow.checkSwitch(this.switch));
            if (fakeSwitch && this.autooffset != null && (this.offsetx != null || this.offsety != null)) {
                let delay = zs.core.workflow ? zs.core.workflow.readConfigReturn(this.autooffset) : null;
                if (!delay || typeof delay !== 'number' || delay <= 0) { delay = 0; }
                let targetX = this.view.x + (this.offsetx || 0) * this.view.scaleX;
                let targetY = this.view.y + (this.offsety || 0) * this.view.scaleY;
                zs.Tween.to(this.view, { x: targetX, y: targetY }, this.offsettime || 0, null, zs.Handler.create(this, () => {
                    this.autooffset = null;
                }), delay);
                this.clickignore = null;
                this.offsetx = null;
                this.offsety = null;
            } else {
                this.autooffset = null;
                this.view.x += (this.offsetx || 0) * this.view.scaleX;
                this.view.y += (this.offsety || 0) * this.view.scaleY;
            }
        }
        autoFade() {
            if (this.autofade != null) {
                let delay = zs.core.workflow ? zs.core.workflow.readConfigReturn(this.autofade) : null;
                if (!delay || typeof delay !== 'number' || delay <= 0) { delay = 0; }
                zs.Tween.to(this.view, { alpha: 1 }, this.autofadetime || 0, null, zs.Handler.create(this, () => {
                    this.ignoreClick = false;
                    this.autofade = null;
                }), delay);
            }
        }
        apply() {
            if (this.autooffset != null && this.offsetDelayHandler == null) {
                this.offsetDelayHandler = setTimeout(() => { this.autoOffset(); }, 1);
            }
            if (this.autofade != null && !this.isFading) {
                this.view.alpha = 0;
                this.ignoreClick = true;
                this.autoFade();
                this.isFading = true;
            }
            return this;
        }
        applyConfig(config) {
            if (config) {
                config.url && (this.setURL(config.url));
                config.fill && (this.setFill(config.fill));
                config.alpha != null && (this.setAlpha(config.alpha));
                config.width != null && (this.setWidth(config.width));
                config.height != null && (this.setHeight(config.height));
                config.font && (this.setFont(config.font));
                config.fontsize != null && (this.setFontSize(config.fontsize));
                config.font_size != null && (this.setFontSize(config.font_size));
                config.fontcolor && (this.setFontColor(config.fontcolor));
                config.font_color && (this.setFontColor(config.font_color));
                config.text && (this.setText(config.text));
                config.autofade != null && (this.setAutoFade(config.autofade));
                config.auto_fade != null && (this.setAutoFade(config.auto_fade));
                config.autofadetime != null && (this.setAutoFadeTime(config.autofadetime));
                config.auto_fade_time != null && (this.setAutoFadeTime(config.auto_fade_time));
                config.autooffset != null && (this.setAutoOffset(config.autooffset));
                config.auto_offset != null && (this.setAutoOffset(config.auto_offset));
                config.offsetx != null && (this.setOffsetX(config.offsetx));
                config.offset_x != null && (this.setOffsetX(config.offset_x));
                config.offsety != null && (this.setOffsetY(config.offsety));
                config.offset_y != null && (this.setOffsetY(config.offset_y));
                config.offsettime != null && (this.setOffsetTime(config.offsettime));
                config.offset_time != null && (this.setOffsetTime(config.offset_time));
                config.clickignore && (this.setClickIgnore(config.clickignore));
                config.click_ignore && (this.setClickIgnore(config.click_ignore));
                config.clickalways && (this.setClickAlways(config.clickalways));
                config.click_always && (this.setClickAlways(config.click_always));
                config.fakedelay != null && (this.setFakeDelay(config.fakedelay));
                config.fake_delay != null && (this.setFakeDelay(config.fake_delay));
                config.fakeevent && (this.setFakeEvent(config.fakeevent));
                config.fake_event && (this.setFakeEvent(config.fake_event));
                config.event && (this.setEvent(config.event));
                (config.switch || config.check) && this.setSwitch(config.switch, config.check);
            }
            return this.apply();
        }
    }
    class full extends zs.fgui.base {
        constructor(component) {
            super(component);
            full.gid++;
            this.fullId = full.gid;
            this.record = [];
        }

        dispose() {
            super.dispose();
            zs.network.behavior(zs.utils.getEventCode("full-" + this.fullId), 3, JSON.stringify(this.record));
            this.record = [];
        }

        setMistaken() { return this; }
        setClickContinue(handler) {
            this._clickContinue = handler;
            return this;
        }
        onClickContinue() {
            this._clickContinue && this._clickContinue.run();
        }
        enterJumpExport() {
            // 进入跳出
            var bAutoJump = zs.product.get("zs_auto_jump_switch");
            if (bAutoJump) {
                this.randomJumpExport();
            }
            return this;
        }
        scrollJumpExport() {
            // 滑动跳出
            if (utils.checkScroll(this.touchX, this.touchY, full.checkScrollDistance)) {
                var bScrollJump = zs.product.get("zs_slide_jump_switch");
                if (bScrollJump) {
                    this.randomJumpExport();
                }
            }
        }
        randomJumpExport() { }
        apply() { return this; }
    }
    full.gid = 0;
    full.checkScrollDistance = 30;

    exports.utils = utils;
    exports.dataMgr = dataMgr;
    exports.list = list;
    exports.loader = loader;
    exports.background = background;
    exports.banner = banner;
    exports.button = button;
    exports.full = full;
    exports.AlignType = AlignType;
    exports.AdaptType = AdaptType;
}(window.zs.exporter = window.zs.exporter || {})); window.zs = window.zs || {};

(function (exports) {
    'use strict';

    let NetworkMode;
    (function (NetworkMode) {
        NetworkMode[NetworkMode["Local"] = 0] = "Local";
        NetworkMode[NetworkMode["Async"] = 1] = "Async";
        NetworkMode[NetworkMode["Sync"] = 2] = "Sync";
    })(NetworkMode = NetworkMode || (NetworkMode = {}));

    class MD5 {
        static rotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }

        static addUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            if (lX4 | lY4) {
                if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        static F(x, y, z) {
            return (x & y) | ((~x) & z);
        }

        static G(x, y, z) {
            return (x & z) | (y & (~z));
        }

        static H(x, y, z) {
            return (x ^ y ^ z);
        }

        static I(x, y, z) {
            return (y ^ (x | (~z)));
        }

        static FF(a, b, c, d, x, s, ac) {
            a = this.addUnsigned(a, this.addUnsigned(this.addUnsigned(this.F(b, c, d), x), ac));
            return this.addUnsigned(this.rotateLeft(a, s), b);
        }

        static GG(a, b, c, d, x, s, ac) {
            a = this.addUnsigned(a, this.addUnsigned(this.addUnsigned(this.G(b, c, d), x), ac));
            return this.addUnsigned(this.rotateLeft(a, s), b);
        }

        static HH(a, b, c, d, x, s, ac) {
            a = this.addUnsigned(a, this.addUnsigned(this.addUnsigned(this.H(b, c, d), x), ac));
            return this.addUnsigned(this.rotateLeft(a, s), b);
        }

        static II(a, b, c, d, x, s, ac) {
            a = this.addUnsigned(a, this.addUnsigned(this.addUnsigned(this.I(b, c, d), x), ac));
            return this.addUnsigned(this.rotateLeft(a, s), b);
        }

        static convertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWordsTempOne = lMessageLength + 8;
            var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
            var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        }

        static wordToHex(lValue) {
            var WordToHexValue = "",
                WordToHexValueTemp = "",
                lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValueTemp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
            }
            return WordToHexValue;
        }

        static uTF8Encode(string) {
            string = string.replace(/\x0d\x0a/g, "\x0a");
            var output = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    output += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    output += String.fromCharCode((c >> 6) | 192);
                    output += String.fromCharCode((c & 63) | 128);
                } else {
                    output += String.fromCharCode((c >> 12) | 224);
                    output += String.fromCharCode(((c >> 6) & 63) | 128);
                    output += String.fromCharCode((c & 63) | 128);
                }
            }
            return output;
        }

        static md5(string) {
            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11 = 7,
                S12 = 12,
                S13 = 17,
                S14 = 22;
            var S21 = 5,
                S22 = 9,
                S23 = 14,
                S24 = 20;
            var S31 = 4,
                S32 = 11,
                S33 = 16,
                S34 = 23;
            var S41 = 6,
                S42 = 10,
                S43 = 15,
                S44 = 21;
            string = this.uTF8Encode(string);
            x = this.convertToWordArray(string);
            a = 0x67452301;
            b = 0xEFCDAB89;
            c = 0x98BADCFE;
            d = 0x10325476;
            for (k = 0; k < x.length; k += 16) {
                AA = a;
                BB = b;
                CC = c;
                DD = d;
                a = this.FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                d = this.FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                c = this.FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                b = this.FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                a = this.FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                d = this.FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                c = this.FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                b = this.FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                a = this.FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                d = this.FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                c = this.FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                b = this.FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                a = this.FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                d = this.FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                c = this.FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                b = this.FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                a = this.GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                d = this.GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                c = this.GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                b = this.GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                a = this.GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                d = this.GG(d, a, b, c, x[k + 10], S22, 0x2441453);
                c = this.GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                b = this.GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                a = this.GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                d = this.GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                c = this.GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                b = this.GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                a = this.GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                d = this.GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                c = this.GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                b = this.GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                a = this.HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                d = this.HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                c = this.HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                b = this.HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                a = this.HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                d = this.HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                c = this.HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                b = this.HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                a = this.HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                d = this.HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                c = this.HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                b = this.HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
                a = this.HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                d = this.HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                c = this.HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                b = this.HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                a = this.II(a, b, c, d, x[k + 0], S41, 0xF4292244);
                d = this.II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                c = this.II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                b = this.II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                a = this.II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                d = this.II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                c = this.II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                b = this.II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                a = this.II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                d = this.II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                c = this.II(c, d, a, b, x[k + 6], S43, 0xA3014314);
                b = this.II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                a = this.II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                d = this.II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                c = this.II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                b = this.II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                a = this.addUnsigned(a, AA);
                b = this.addUnsigned(b, BB);
                c = this.addUnsigned(c, CC);
                d = this.addUnsigned(d, DD);
            }
            var tempValue = this.wordToHex(a) + this.wordToHex(b) + this.wordToHex(c) + this.wordToHex(d);
            return tempValue.toLowerCase();
        }

        static buildSign(params, isSecret) {
            isSecret = isSecret || true;
            var sortedKeys = Object.keys(params).sort();
            var signParam = '';
            for (var i = 0; i < sortedKeys.length; i++) {
                signParam += sortedKeys[i] + ":" + params[sortedKeys[i]];
            }
            if (isSecret) {
                signParam += zs.configs.gameCfg.secret;
            }
            var md5sign = this.md5(signParam);

            md5sign = md5sign.toLowerCase();

            return md5sign;
        }
    }

    class network {

        /**
         * 加密
         * @param {*} word 对密码加密的秘钥
         * @returns 加密的密文
         */
        static encrypt(word) {
            let key = CryptoJS.enc.Utf8.parse(network.authorizationSecret);
            let data = CryptoJS.enc.Utf8.parse(word);
            let encrypted = CryptoJS.AES.encrypt(data, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
        }

        /**
         * 解密
         * @param {*} word 需要解密的密文
         * @returns 解密的明文
         */
        static decrypt(word) {
            let key = CryptoJS.enc.Utf8.parse(network.authorizationSecret);
            let decrypt = CryptoJS.AES.decrypt(word, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return CryptoJS.enc.Utf8.stringify(decrypt).toString();
        }


        static async init() {
            let gameCfg = zs.configs.gameCfg;
            network.defaultData = gameCfg.network;
            let loginInfo = {
                user_id: 1,
                user_type: 1,
                update_time: Date.now(),
                is_new: 0,
                is_shielded: 0
            }
            return loginInfo;
            if (!gameCfg.skipRemote) {
                let webSetting = await zs.resource.nativeLoad(gameCfg.remoteWebSettingURL || network.remoteWebSettingURL, null, true).catch(e => e);
                if (webSetting) {
                    webSetting.webDomains && (network.listDomain = webSetting.webDomains);
                    if (webSetting.webApis) {
                        webSetting.webApis.ping && (network.mapWebApi.ping = webSetting.webApis.ping);
                        webSetting.webApis.login && (network.mapWebApi.login = webSetting.webApis.login);
                        webSetting.webApis.config && (network.mapWebApi.config = webSetting.webApis.config);
                        webSetting.webApis.update && (network.mapWebApi.update = webSetting.webApis.update);
                        webSetting.webApis.download && (network.mapWebApi.download = webSetting.webApis.download);
                    }
                    webSetting.exportDomainOld && (zs.exporter.dataMgr.URL = webSetting.exportDomainOld);
                    webSetting.exportDomainNew && (zs.exporter.dataMgr.NEWURL = webSetting.exportDomainNew);
                }

                zs.log.debug("remote webSetting", "Network", webSetting);
            }

            await network.ping().catch(e => e);

            //获取授权
            if (network.version == "v2") {
                await network.authorization().catch(e => e);
            }

            // let loginInfo = {
            //     user_id: 1,
            //     user_type: 1,
            //     update_time: Date.now(),
            //     is_new: 0,
            //     is_shielded: 0
            // };
            if (network.domainIdx >= 0) {
                if (zs.platform.proxy) {
                    let result = await zs.platform.async.getLoginParams().catch(e => e);
                    if (result) {
                        zs.td.justTrack("后台登录", "后台登录");
                        await network.login(result)
                            .then((result) => {
                                if (result.user_id) {
                                    loginInfo = result;
                                    network.ready = true;
                                    zs.log.debug("登陆成功：", "Network", result);
                                } else {
                                    zs.td.justTrack("后台登录失败", "后台登录失败");
                                }
                            }).catch((error) => {
                                zs.td.justTrack("后台登录失败", "后台登录失败");
                            });
                    }
                } else {
                    await network.login({ uid: "1" }).then((result) => {
                        if (result.user_id) {
                            loginInfo = result;
                            network.ready = true;
                            zs.log.debug("登陆成功：", "Network", result);
                        }
                    }).catch(e => e);
                    network.ready = true;
                }
            }

            loginInfo.is_new && zs.SaveData.save();

            network.loginCode = "";
            for (let i = 0; i < 3; i++) {
                network.loginCode += zs.utils.randByte();
            }

            return loginInfo;
        }
        static getUrl(route) {
            if (network.domainIdx < 0 || network.domainIdx >= network.listDomain.length) {
                return null;
            }
            if (network.mapWebApi[route] == null) {
                zs.log.error('非法网络接口： ' + route, "Network");
                return null;
            }
            return network.listDomain[network.domainIdx] + '/' + network.version + '/' + network.mapWebApi[route];
        }
        static obj2arg(obj) {
            var args = []
            for (var k in obj)
                args.push(k + "=" + obj[k])
            return args.join("&"); // 返回对象  
        }
        static async post(url, params, timeout, skipEncrypt, repost) {
            if (repost == null) { repost = 3; }
            if (zs.platform.proxy && zs.platform.async.request) {
                let header = {
                    'content-type': 'application/json' // 默认值
                };
                if (network.version == "v2" && network.authorizationToken != "") {
                    header = {
                        'content-type': 'application/json', // 默认值
                        'authorization': network.authorizationToken
                    };
                    if (!skipEncrypt) {
                        var str = JSON.stringify(params);
                        var _data = network.encrypt(str);
                        params._data = _data;
                    }
                }
                return new zs.Coop((resolve, reject) => {
                    zs.log.debug("通讯请求：" + url, "Network", params);
                    zs.td.justTrack("通讯请求", "通讯请求");
                    zs.platform.async.request({
                        url: url,
                        data: JSON.stringify(params),
                        timeout: timeout,
                        header: header,
                        method: "POST",
                    }).then((result) => {
                        zs.log.debug("请求成功：" + url, "Network", result);
                        return resolve(result.data.data);
                    }).catch((error) => {
                        if (repost > 0) {
                            zs.log.error('请求重试：' + url, "Network", error);
                            return this.post(url, params, timeout, skipEncrypt, --repost).then(resolve).catch(reject);
                        } else {
                            zs.td.justTrack("通讯请求失败", "通讯请求失败");
                            zs.log.error('请求失败：' + url, "Network", error);
                            return reject(error);
                        }
                    })
                });
            } else {
                return new zs.Coop((resolve, reject) => {
                    var xhr = new XMLHttpRequest();
                    let isTimeout = false;
                    let isHandled = false;
                    xhr.timeout = timeout ? timeout : 10000;
                    zs.utils.sleep(xhr.timeout)
                        .then(() => {
                            if (!isHandled) {
                                isTimeout = true;
                                if (repost > 0) {
                                    zs.log.error('重复请求：' + url);
                                    return this.post(url, params, timeout, skipEncrypt, --repost).then(resolve).catch(reject);
                                } else {
                                    zs.log.error('请求超时：' + url);
                                    return reject();
                                }
                            }
                        }).catch(e => e);
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState == 4 && !isTimeout) {
                            isHandled = true;
                            var response = xhr.responseText;
                            if (xhr.status >= 200 && xhr.status < 400) {
                                var result = {};
                                try {
                                    result = JSON.parse(response);
                                    if (network.version == "v2") {
                                        if (result.code == 10004) {
                                            // TODO 授权码过期
                                        }
                                    }
                                } catch (e) {
                                    zs.log.error('请求解析失败： ', e);
                                    return reject(e);
                                }
                                zs.log.debug("请求成功：" + url, "Network", response);
                                return resolve(result.data);
                            } else {
                                if (repost > 0) {
                                    zs.log.error('重复请求：' + url, response);
                                    return this.post(url, params, timeout, skipEncrypt, --repost).then(resolve).catch(reject);
                                } else {
                                    zs.log.error('请求失败：' + url, response);
                                    return reject(response);
                                }
                            }
                        }
                    };
                    xhr.ontimeout = (event) => {
                        if (!isHandled && !isTimeout) {
                            isHandled = true;
                            isTimeout = true;
                            if (repost > 0) {
                                zs.log.error('重复请求：' + url, event);
                                return this.post(url, params, timeout, skipEncrypt, --repost).then(resolve).catch(reject);
                            } else {
                                zs.log.error('请求超时： ' + url, event);
                                return reject(event);
                            }
                        }
                    };
                    xhr.open('POST', url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    if (network.version == "v2" && network.authorizationToken != "") {
                        xhr.setRequestHeader("authorization", network.authorizationToken);
                        if (!skipEncrypt) {
                            var str = JSON.stringify(params);
                            var _data = network.encrypt(str);
                            params._data = _data;
                        }
                    }
                    xhr.send(JSON.stringify(params));
                    zs.log.debug("通讯请求：" + url, "Network", params);
                });
            }
        }

        static get(url, params, timeout, reget) {
            if (reget == null) { reget = 3; }
            if (zs.platform.proxy && zs.platform.async.request) {
                return new zs.Coop((resolve, reject) => {
                    zs.log.debug("通讯请求：" + url, "Network", params);
                    zs.td.justTrack("通讯请求", "通讯请求");
                    zs.platform.async.request({
                        url: url,
                        data: JSON.stringify(params),
                        timeout: timeout,
                        method: "GET",
                    }).then((result) => {
                        zs.log.debug("请求成功：" + url, "Network", result);
                        return resolve(result.data.data);
                    }).catch((error) => {
                        if (reget > 0) {
                            zs.log.error('请求重试：' + url, "Network", error);
                            return this.get(url, params, timeout, --reget).then(resolve).catch(reject);
                        } else {
                            zs.td.justTrack("通讯请求失败", "通讯请求失败");
                            zs.log.error('请求失败：' + url, "Network", error);
                            return reject(error);
                        }
                    })
                });
            } else {
                return new zs.Coop((resolve, reject) => {
                    var xhr = new XMLHttpRequest();
                    let isTimeout = false;
                    let isHandled = false;
                    xhr.timeout = timeout ? timeout : 10000;
                    zs.utils.sleep(xhr.timeout)
                        .then(() => {
                            if (!isHandled) {
                                isTimeout = true;
                                if (reget > 0) {
                                    zs.log.error('重复请求：' + url);
                                    return this.get(url, params, timeout, --reget).then(resolve).catch(reject);
                                } else {
                                    zs.log.error('请求超时：' + url);
                                    return reject();
                                }
                            }
                        }).catch(e => e);
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState == 4 && !isTimeout) {
                            isHandled = true;
                            var response = xhr.responseText;
                            if (xhr.status >= 200 && xhr.status < 400) {
                                var result = {};
                                try {
                                    result = JSON.parse(response);
                                } catch (e) {
                                    zs.log.error('请求解析失败： ', e);
                                    return reject(e);
                                }
                                zs.log.debug("请求成功：" + url, "Network", response);
                                return resolve(result.data);
                            } else {
                                if (reget > 0) {
                                    zs.log.error('重复请求：' + url, response);
                                    return this.get(url, params, timeout, --reget).then(resolve).catch(reject);
                                } else {
                                    zs.log.error('请求失败：' + url, response);
                                    return reject(response);
                                }
                            }
                        }
                    };
                    xhr.ontimeout = (event) => {
                        if (!isHandled && !isTimeout) {
                            isHandled = true;
                            isTimeout = true;
                            if (reget > 0) {
                                zs.log.error('重复请求：' + url, event);
                                return this.get(url, params, timeout, --reget).then(resolve).catch(reject);
                            } else {
                                zs.log.error('请求超时： ' + url, event);
                                return reject(event);
                            }
                        }
                    };
                    xhr.open('GET', url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    let reqData = JSON.stringify(params);
                    xhr.send(reqData);
                    zs.log.debug("通讯请求：" + url, "Network", reqData);
                });
            }
        }
        static nativeRequest(url, data, method, needSign, ignoreSecret, skipEncryption) {
            let currentTime = Math.round(new Date().getTime() / 1000).toString();
            data = Object.assign(data, {
                timestamp: currentTime
            })
            if (needSign) {
                let sign = MD5.buildSign(data, !ignoreSecret);
                data = Object.assign(data, {
                    sign: sign
                });
            }
            return new zs.Coop((resolve, reject) => {
                if (network.version == "v2" && network.authorizationToken != "") {
                    if (!skipEncryption) {
                        var str = JSON.stringify(data);
                        var _data = network.encrypt(str);
                        data._data = _data;
                    }
                }
                this.post(url, data, 3000, true)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error);
                    })
            });
        }
        static request(route, params, mode) {
            return new zs.Coop((resolve, reject) => {
                let localData = null;
                let fullURL = network.getUrl(route);
                let defaultData = null;
                if (zs.configs.gameCfg.local) {
                    mode = NetworkMode.Local;
                }
                if (fullURL && (mode == null || mode == NetworkMode.Sync)) {
                    return network.post(fullURL, params)
                        .then((rep) => {
                            let key = null;
                            switch (route) {
                                case 'config':
                                    if (params && params.type === 'module') {
                                        if (params.module) {
                                            key = params.module ? params.module : 'base_module';
                                            if (params.table) {
                                                key += '>>' + params.table;
                                            }
                                        } else if (params.table) {
                                            key = params.table;
                                        }
                                    } else if (params && params.type === 'switch') {
                                        key = 'switch';
                                    }
                                    break;
                                case 'download':
                                    key = params.key;
                                    break;
                                case "auth":
                                    network.authorizationToken = rep.token;
                                    network.authorizationSecret = rep.secret;
                                    break;
                            }
                            if (rep == null || rep == "" || (typeof rep == "Array" && rep.length == 0)) {
                                rep = network.getLocalData(route, key);
                            } else {
                                network.setLocalData(route, rep, key);
                            }
                            resolve(rep);
                        })
                        .catch((rep) => {
                            reject(rep);
                        });
                } else if (fullURL == null || mode === NetworkMode.Local || mode === NetworkMode.Async) {
                    switch (route) {
                        case 'login':
                            localData = network.getLocalData(route);
                            break;
                        case 'config':
                            let key = null;
                            if (params && params.type === 'module') {
                                if (params.module) {
                                    key = params.module ? params.module : 'base_module';
                                    if (params.table) {
                                        key += '>>' + params.table;
                                    }
                                } else if (params.table) {
                                    key = params.table;
                                }
                            } else { params && params.type === 'switch' } {
                                key = 'switch';
                            }
                            localData = network.getLocalData(route, key);
                            break;
                        case 'download':
                            if (params && params.key) {
                                localData = network.getLocalData(route, params.key);
                            }
                            break;
                        case 'update':
                            if (params && params.key && params.data) {
                                network.setLocalData('download', params.data, params.key);
                            }
                            localData = true;
                            break;
                    }
                    if (localData == null) {
                        zs.log.fatal("本地网络缓存及默认值不存在: " + route, "Network");
                    }
                    defaultData = localData;
                    if (fullURL == null || mode === NetworkMode.Local) {
                        zs.log.debug(route + " 通讯返回本地数据", "Network");
                        return resolve(defaultData);
                    }
                }
                network.post(fullURL, params)
                    .then((rep) => {
                        let key = null;
                        switch (route) {
                            case 'config':
                                if (params && params.type === 'module') {
                                    key = params.module ? params.module : 'base_module';
                                    if (params.table) {
                                        key += '_' + params.table;
                                    }
                                }
                                break;
                            case 'download':
                                key = params.key;
                                break;
                        }
                        if (rep != null && rep != "") {
                            network.setLocalData(route, rep, key);
                        }
                    }).catch(e => e);
                return resolve(defaultData);
            });
        }
        static getLocalData(route, key) {
            let storageKey = route;
            if (key) {
                storageKey += '>>' + key;
            }
            let localData = zs.utils.getItem('network_' + storageKey);
            if (localData) {
                return JSON.parse(localData);
            }
            let defaultData = network.defaultData[storageKey];
            return defaultData;
        }
        static setLocalData(route, data, key) {
            if (data == null || data == undefined) {
                return;
            }
            let storageKey = route;
            if (key) {
                storageKey += '>>' + key;
            }
            let strData = JSON.stringify(data);
            if (strData) {
                zs.utils.setItem('network_' + storageKey, strData);
            }
        }
        static async ping() {
            network.domainIdx = -1;
            for (let i = 0; i < network.listDomain.length; i++) {
                let url = network.listDomain[i] + '/' + network.version + '/' + network.mapWebApi.ping;
                let params = {};
                await network.get(url, params, 1000)
                    .then((res) => {
                        network.domainIdx = i;
                        zs.product.city = res.city;
                        zs.product.country = res.country;
                        zs.product.timestamp = res.timestamp * 1000;
                    })
                    .catch((res) => {
                        zs.log.warn("域名 " + url + " 无法正常通讯", "Network");
                    });
                if (network.domainIdx >= 0) {
                    break;
                }
                await zs.utils.sleep(1000);
            }
        }

        //获取加密授权
        static async authorization() {
            let params = {};
            params.gid = window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId;
            return network.request('auth', params);
        }

        // --- request ---
        // gid 游戏标识（必填）
        // uid 用户ID（测试用，默认填1）
        // code 登录code，微信、手Q、OPPO、VIVO必填，头条非必填
        // is_old VIVO专用，区分新旧版本，0新1旧，默认为0
        // anonymous_code 头条登录字段
        // user_type 用户类型，默认为1
        // --- response ---
        // user_id 用户ID
        // user_type 用户类型
        // update_time 登录时间
        // is_new 是否为新玩家
        static async login(params, mode) {
            if (params == null) {
                params = {};
            }
            params.gid = window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId;
            zs.log.debug("登录参数：", "Network", params);
            return network.request('login', params, mode);
        }
        // --- request ---
        // gid 游戏标识（必填）
        // type 配置类型（switch 运营开关 module 模块配置）（必填）
        // module 模块名称（base_module 默认模块）
        // table 配置表名
        static async config(isSwitch, module, table, mode) {
            if (!network.ready) await network.init();
            let params = {
                gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                type: isSwitch ? 'switch' : 'module',
                v: zs.configs.gameCfg.version
            };
            if (!isSwitch) {
                params.module = module ? module : 'base_module';
                if (table) {
                    params.table = table;
                }
            }

            return network.request('config', params, mode);
        }

        static async jsonConfig(table, mode) {
            if (!network.ready) await network.init();
            let params = {
                gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                type: "json",
                v: zs.configs.gameCfg.version
            };
            params.module = 'base_module';
            table && (params.table = table);

            return network.request('config', params, mode);
        }

        // --- request ---
        // gid 游戏标识（必填）
        // uid 用户ID（必填）
        // key 关键词
        // data 数据
        static async update(key, data, mode) {
            if (!network.ready) await network.init();
            let params = {
                gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                uid: zs.core.userId,
                key: key,
                data: data
            };
            return network.request('update', params, mode);
        }
        // --- request ---
        // gid 游戏标识（必填）
        // uid 用户ID（必填）
        // key 关键词
        static async download(key, mode) {
            if (!network.ready) await network.init();
            let params = {
                gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                uid: zs.core.userId,
                key: key
            };
            return network.request('download', params, mode);
        }

        // /**
        //  *日志上报
        //  * @param {*} log 上报的日志
        //  * @param {*} mode 
        //  * @returns 
        //  */
        // static log(log, mode) {
        //     let params = {
        //         app_id: window.zs.platform.config.platformMark + zs.configs.gameCfg.appId,
        //         user_id: zs.core.userId,
        //         log: log
        //     };
        //     // return network.request('log', params, mode);
        // }

        /**
             * 更新指定字段数据
             * @param {*} key 键
             * @param {*} val 值
             * @param {*} mode 通讯模式
             * @returns 
             */
        static dataEdit(key, val, mode) {
            let params = {
                gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                uid: zs.core.userId,
                key: key,
                val: val
            };
            return network.request('edit', params, mode);
        }

        /**
         * 获取指定字段数据
         * @param {*} key 键
         * @param {*} mode 通讯模式
         * @returns 
         */
        static dataGet(key, mode) {
            let params = {
                gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                uid: zs.core.userId,
                key: key
            };
            return network.request('get', params, mode);
        }

        /**
         * 视频统计上报
         * @param {*} id 唯一识别号
         * @param {*} key 视频ID
         * @param {*} type 视频类型(1 播放 | 2 点击 | 3 完播)
         * @param {*} mode 通讯模式
         */
        static video(id, key, type, mode) {
            let videoName = zs.configs.gameCfg.video ? zs.configs.gameCfg.video[key] : null;
            if (videoName == null) {
                key = "default";
                videoName = "默认视频";
            }
            let params = {
                gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                uid: zs.core.userId,
                uvid: id,
                video_id: key,
                video_name: videoName,
                video_type: type,
                version: zs.configs.gameCfg.version,
                scene: zs.platform.sync.getScene(),
                timestamp: new Date().getTime()
            };
            return network.request("video", params, mode);
        }

        static behavior(id, type, record, mode) {
            let params = {
                event_id: id,
                type: type,
                record: record
            };
            return network.request('behavior', params, mode);
        }

        // /**
        //  * 游戏事件上报
        //  * @param {*} group 事件分组[0其他|1视频]
        //  * @param {*} event 事件id
        //  * @param {*} name 事件名称
        //  * @param {*} params 参数（约定参数会写入，非约定的会过滤掉）
        //  * @returns 
        //  */
        // static report(group, event, name, params, mode) {
        //     let data = {
        //         gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
        //         app_id: window.zs.platform.config.platformMark + zs.configs.gameCfg.appId,
        //         platform_id: network.platformId[zs.platform.config.platformMark],
        //         uid: zs.core.userId,
        //         open_id: zs.exporter.dataMgr.getUUID(),
        //         group: group,
        //         event: event,
        //         name: name,
        //         version: zs.configs.gameCfg.version,
        //         params: params,
        //         timestamp: Math.round(new Date().getTime() / 1000).toString()
        //     }
        //     return network.request('report', data, mode);
        // }
    }
    network.ready = false;
    network.version = 'v2';
    network.domainIdx = -1;
    network.city = null;
    network.timestamp = null;
    network.defaultData = {};
    network.remoteWebSettingURL = "https://changshazhise01-1254961065.cos.ap-guangzhou.myqcloud.com/zhise/new_framework/web.json";

    //授权code
    network.authorizationToken = "";
    //授权key
    network.authorizationSecret = "";

    network.listDomain = [
        "https://gamesapi.zxmn2018.com",
        "https://gamesapi.qwpo2018.com",
        "https://gamesapi.zaml2018.com"
    ];
    network.mapWebApi = {
        // "ping": "game/ping",
        "auth": "game/auth",
        "ping": "game/clientInfo",
        "login": "game/login",
        "config": "game/config",
        "update": "game/update",
        "download": "game/download",
        "report": "game/report",
        "log": "game/log",
        "behavior": "ad/behavior",
        "edit": "game/edit",
        "get": "game/get",
        "video": "game/video"
        // "log":"game/log",
        // "report":"game/report"
    };

    network.platformId = {
        "wx_": 1,
        "oppo_": 2,
        "vivo_": 3,
        "qq_": 4,
        "tt_": 5,
        "app_": 6,
        "ks_": 7,
        "hw_": 8,
    };

    exports.NetworkMode = NetworkMode;
    exports.MD5 = MD5;
    exports.network = network;
}(window.zs = window.zs || {})); window.zs = window.zs || {};

(function (exports) {
    'use strict';

    function showMsgBox(params) {
        zs.fgui.msgbox.show(params);
    }

    function hideMsgBox(isClear) {
        if (isClear) { zs.fgui.msgbox.clear(); }
        zs.fgui.msgbox.hide();
    }

    class SaveData {
        static save() {
            let head = {};
            let data = {};
            if (!this.data) {
                zs.log.warn("无存档数据！", "SaveData");
                return;
            }
            for (let key in this.data) {
                let value = this.data[key];
                data[key] = value;
            }
            if (this.info) {
                for (let key in this.info) {
                    let value = this.info[key];
                    if (typeof value === 'string') {
                        head[key] = value;
                    }
                }
            }
            let params = {
                head: head,
                data: data
            }
            zs.network.dataEdit("game_data", JSON.stringify(params));
        }

        static clear() {
            zs.network.dataEdit("game_data", "");
        }

        static async load() {
            let result = await zs.network.dataGet("game_data");
            if (result) {
                for (let key in result) {
                    console.log(key + " : " + result[key]);
                    this.data[key] = result[key];
                }
            }
            return this.data;
        }
    }
    SaveData.info = null;
    SaveData.data = null;
    class workflow {
        get exportWindow() {
            if (this._exportWindow == null) {
                this._exportWindow = zs.fgui.window
                    .create()
                    .show();
            }
            return this._exportWindow;
        }
        get bannerWindow() {
            if (this._bannerWindow == null) {
                this._bannerWindow = zs.fgui.window
                    .create()
                    .show();
            }
            return this._bannerWindow;
        }
        get fsmList() {
            if (this._fsmList == null) {
                this._fsmList = {};
            }
            return this._fsmList;
        }
        get state() {
            if (this.fsm) {
                return this.fsm.current;
            }
            return null;
        }
        get childState() {
            if (this.fsm && this.fsmList[this.fsm.current]) {
                return this.fsmList[this.fsm.current].current;
            }

            return null;
        }
        get eventList() {
            if (this._eventList == null) {
                this._eventList = {};
            }
            return this._eventList;
        }
        constructor() {
            this.switchExporter = "zs_jump_switch";
            this.exporterPack = null;
        }
        registe() {
            this.fsm = new zs.fsm()
                .registe(zs.workflow.PRODUCT_START, zs.workflow.PRODUCT_BEGIN)
                .registe(zs.workflow.PRODUCT_BEGIN, zs.workflow.GAME_HOME)
                .registe(zs.workflow.GAME_HOME, zs.workflow.PRODUCT_HOME_PLAY)
                .registe(zs.workflow.PRODUCT_HOME_PLAY, zs.workflow.GAME_PLAY)
                .registe(zs.workflow.GAME_PLAY, zs.workflow.PRODUCT_PLAY_END)
                .registe(zs.workflow.PRODUCT_PLAY_END, zs.workflow.GAME_END)
                .registe(zs.workflow.GAME_END, zs.workflow.PRODUCT_FINISH)
                .registe(zs.workflow.PRODUCT_FINISH, zs.workflow.PRODUCT_BEGIN)
                .setDefault(zs.workflow.PRODUCT_START);
            this.registeEvent(workflow.eventNext, this, (target) => { this.next(target); });
            this.registeEvent(workflow.eventChildNext, this, (target) => { this.childNext(target); });
            this.registeEvent(workflow.eventCreateBase, this, (target) => { this.createBase(target); });
            this.registeEvent(workflow.eventCloseBase, this, (target) => { this.exportWindow.detach(target) });
        }
        start() {
            if (this.fsm) {
                this.fsm.onBeforeChange = zs.Handler.create(this, this.onBeforeChange, null, false);
                this.fsm.onChanged = zs.Handler.create(this, this.onChanged, null, false);
            }
            zs.fgui.configs.registeBase(workflow.exporterList, zs.exporter.list);
            zs.fgui.configs.registeBase(workflow.exporterCard, zs.exporter.card);
            zs.fgui.configs.registeBase(workflow.exporterBackground, zs.exporter.background);
            zs.fgui.configs.registeBase(workflow.exporterLoader, zs.exporter.loader);
            zs.fgui.configs.registeBase(workflow.exporterButton, zs.exporter.button);
            core.addAppShow(zs.Handler.create(this, zs.platform.sync.clearDelayBanner, null, false));
            this.fsm.init();
        }
        setFSM(key, fsm) {
            this.fsmList[key.trim()] = fsm;
        }
        registeEvent(key, caller, func, ...args) {
            this.eventList[key.trim()] = {
                caller: caller,
                func: func,
                args: args
            }
        }
        applyEvent(key, args) {
            let event = this.eventList[key.trim()];
            event && event.func && event.func.apply(event.caller, (args && args.length > 0) ? args : event.args);
        }
        applyEventReturn(key, args) {
            let event = this.eventList[key.trim()];
            if (event && event.func) {
                return event.func.apply(event.caller, (args && args.length > 0) ? args : event.args);
            }
            return null;
        }
        callEvent(key, ...args) {
            this.applyEvent(key, args);
        }
        callEventReturn(key, ...args) {
            return this.applyEventReturn(key, args);
        }
        readConfigReturn(config) {
            if (config == null || config == undefined) { return null; }
            let result = null;
            let configType = typeof config;
            if (configType === 'number' || configType === 'boolean' || Array.isArray(config)) {
                result = config;
            } else if (configType === 'object') {
                for (let evt in config) {
                    let args = config[evt];
                    if (args != null && args != undefined && !Array.isArray(args)) {
                        args = [args];
                    }
                    result = this.applyEventReturn(evt, args);
                    break;
                }
            } else if (configType === 'string') {
                result = this.applyEventReturn(config);
            }
            return result;
        }
        runEventConfig(event) {
            if (event == null || event == undefined) { return; }
            let eventType = typeof event;
            if (eventType === 'string') {
                this.callEvent(event);
            } else if (Array.isArray(event)) {
                for (let i = 0, n = event.length; i < n; i++) {
                    this.runEventConfig(event[i]);
                }
            } else if (eventType == 'object') {
                for (let evt in event) {
                    let args = event[evt];
                    if (!Array.isArray(args) && args != null && args != undefined) {
                        args = [args];
                    }
                    this.applyEvent(evt, args);
                }
            }
        }
        registeChildFSM() {
            let config = zs.configs.productCfg;
            for (let key in config) {
                key = key.trim();
                if (this.fsmList[key]) { continue; }
                let states = config[key].states;
                if (!states || states.length <= 0) { continue; }
                let defaultState = null;
                let lastState = null;
                let fsm = new zs.fsm();
                for (let i = 0, n = states.length; i < n; i++) {
                    let state = states[i];
                    if (state == null || typeof state !== 'string') { continue; }
                    state = state.trim();
                    if (state.length <= 0) { continue; }
                    if (!defaultState) {
                        defaultState = state;
                        lastState = state;
                        continue;
                    }
                    fsm.registe(lastState, state);
                    lastState = state;
                }
                if (defaultState) {
                    fsm.setDefault(defaultState);
                    let substates = config[key].substates;
                    if (substates && Array.isArray(substates)) {
                        for (let i = 0, n = substates.length; i < n; i++) {
                            let list = substates[i];
                            if (list == null || !Array.isArray(list) || list.length <= 1) { continue; }
                            let lastState = null;
                            for (let j = 0, m = list.length; j < m; j++) {
                                let state = list[j];
                                if (state == null || typeof state !== 'string') { continue; }
                                state = state.trim();
                                if (state.length <= 0 || fsm.getState(lastState, state)) { continue; }
                                lastState && fsm.registe(lastState, state, fsm.list[lastState] != null ? -1 : 0);
                                lastState = state;
                            }
                        }
                    }
                    this.fsmList[key] = fsm;
                }
            }
        }
        on(key, handler, isBefore, priority) {
            if (key == null || key.trim().length <= 0 || handler == null) { return; }
            key = key.trim();
            handler.once = false;
            priority = priority || 0;
            handler.priority = priority;
            let insertIdx = -1;
            let listener = null;
            if (isBefore) {
                if (this.preListeners == null) {
                    this.preListeners = {};
                }
                if (this.preListeners[key] == null) {
                    this.preListeners[key] = [];
                }
                listener = this.preListeners[key];
            } else {
                if (this.listeners == null) {
                    this.listeners = {};
                }
                if (this.listeners[key] == null) {
                    this.listeners[key] = [];
                }
                listener = this.listeners[key];
            }
            if (listener) {
                for (let i = 0, n = listener.length; i < n; i++) {
                    if (listener[i]._id == handler._id) { return; }
                    let p = listener[i].priority || 0;
                    if (insertIdx < 0 && priority > p) {
                        insertIdx = i;
                        break;
                    }
                }
                if (insertIdx < 0) {
                    listener.push(handler);
                } else {
                    listener.splice(insertIdx, 0, handler);
                }
            }
        }
        onLater(key, handler, isBefore, priority) {
            if (key == null || key.trim().length <= 0 || handler == null) { return; }
            key = key.trim();
            handler.once = false;
            priority = priority || 0;
            handler.priority = priority;
            let insertIdx = -1;
            let listener = null;
            if (isBefore) {
                if (this.laterPreListeners == null) {
                    this.laterPreListeners = {};
                }
                if (this.laterPreListeners[key] == null) {
                    this.laterPreListeners[key] = [];
                }
                listener = this.laterPreListeners[key];
            } else {
                if (this.laterListeners == null) {
                    this.laterListeners = {};
                }
                if (this.laterListeners[key] == null) {
                    this.laterListeners[key] = [];
                }
                listener = this.laterListeners[key];
            }
            if (listener) {
                for (let i = 0, n = listener.length; i < n; i++) {
                    if (listener[i]._id == handler._id) { return; }
                    let p = listener[i].priority || 0;
                    if (insertIdx < 0 && priority > p) {
                        insertIdx = i;
                        break;
                    }
                }
                if (insertIdx < 0) {
                    listener.push(handler);
                } else {
                    listener.splice(insertIdx, 0, handler);
                }
            }
        }
        once(key, handler, isBefore, priority) {
            this.on(key, handler, isBefore, priority);
            if (handler) { handler.once = true; }
        }
        onceLater(key, handler, isBefore, priority) {
            this.onLater(key, handler, isBefore, priority);
            if (handler) { handler.once = true; }
        }
        off(key, handler, isBefore) {
            if (key == null || key.trim().length <= 0 || handler == null) { return; }
            key = key.trim();
            if (isBefore) {
                if (this.preListeners == null) { return; }
                if (this.preListeners[key] == null) { return; }
                let listener = this.preListeners[key];
                for (let i = 0, n = listener.length; i < n; i++) {
                    if (listener[i]._id == handler._id) {
                        listener.splice(i, 1);
                        return;
                    }
                }
            } else {
                if (this.listeners == null) { return; }
                if (this.listeners[key] == null) { return; }
                let listener = this.listeners[key];
                for (let i = 0, n = listener.length; i < n; i++) {
                    if (listener[i]._id == handler._id) {
                        listener.splice(i, 1);
                        return;
                    }
                }
            }
        }
        offLater(key, handler, isBefore) {
            if (key == null || key.trim().length <= 0 || handler == null) { return; }
            key = key.trim();
            if (isBefore) {
                if (this.laterPreListeners == null) { return; }
                if (this.laterPreListeners[key] == null) { return; }
                let listener = this.laterPreListeners[key];
                for (let i = 0, n = listener.length; i < n; i++) {
                    if (listener[i]._id == handler._id) {
                        listener.splice(i, 1);
                        return;
                    }
                }
            } else {
                if (this.laterListeners == null) { return; }
                if (this.laterListeners[key] == null) { return; }
                let listener = this.laterListeners[key];
                for (let i = 0, n = listener.length; i < n; i++) {
                    if (listener[i]._id == handler._id) {
                        listener.splice(i, 1);
                        return;
                    }
                }
            }
        }
        offAll(key, isBefore) {
            if (key == null || key.trim().length <= 0) { return; }
            key = key.trim();
            if (isBefore) {
                if (this.preListeners == null) { return; }
                if (this.preListeners[key] == null) { return; }
                delete this.preListeners[key];
            } else {
                if (this.listeners == null) { return; }
                if (this.listeners[key] == null) { return; }
                delete this.listeners[key];
            }
        }
        offAllLater(key, isBefore) {
            if (key == null || key.trim().length <= 0) { return; }
            key = key.trim();
            if (isBefore) {
                if (this.laterPreListeners == null) { return; }
                if (this.laterPreListeners[key] == null) { return; }
                delete this.laterPreListeners[key];
            } else {
                if (this.laterListeners == null) { return; }
                if (this.laterListeners[key] == null) { return; }
                delete this.laterListeners[key];
            }
        }
        offAllCaller(caller, key, isBefore) {
            if (caller == null) { return; }
            if (key == null || key.trim().length <= 0) {
                if (isBefore) {
                    for (let k in this.preListeners) {
                        let listener = this.preListeners[k];
                        for (let i = 0, n = listener.length; i < n; i++) {
                            if (listener[i].caller == caller) {
                                listener.splice(i, 1);
                                i--;
                                n--;
                            }
                        }
                    }
                } else {
                    for (let k in this.listeners) {
                        let listener = this.listeners[k];
                        for (let i = 0, n = listener.length; i < n; i++) {
                            if (listener[i].caller == caller) {
                                listener.splice(i, 1);
                                i--;
                                n--;
                            }
                        }
                    }
                }
            } else {
                key = key.trim();
                if (isBefore) {
                    let listener = this.preListeners[key];
                    if (listener) {
                        for (let i = 0, n = listener.length; i < n; i++) {
                            if (listener[i].caller == caller) {
                                listener.splice(i, 1);
                                i--;
                                n--;
                            }
                        }
                    }
                } else {
                    let listener = this.listeners[key];
                    if (listener) {
                        for (let i = 0, n = listener.length; i < n; i++) {
                            if (listener[i].caller == caller) {
                                listener.splice(i, 1);
                                i--;
                                n--;
                            }
                        }
                    }
                }
            }
        }
        offAllCallerLater(caller, key, isBefore) {
            if (caller == null) { return; }
            if (key == null || key.trim().length <= 0) {
                if (isBefore) {
                    for (let k in this.laterPreListeners) {
                        let listener = this.laterPreListeners[k];
                        for (let i = 0, n = listener.length; i < n; i++) {
                            if (listener[i].caller == caller) {
                                listener.splice(i, 1);
                                i--;
                                n--;
                            }
                        }
                    }
                } else {
                    for (let k in this.laterListeners) {
                        let listener = this.laterListeners[k];
                        for (let i = 0, n = listener.length; i < n; i++) {
                            if (listener[i].caller == caller) {
                                listener.splice(i, 1);
                                i--;
                                n--;
                            }
                        }
                    }
                }
            } else {
                key = key.trim();
                if (isBefore) {
                    let listener = this.laterPreListeners[key];
                    if (listener) {
                        for (let i = 0, n = listener.length; i < n; i++) {
                            if (listener[i].caller == caller) {
                                listener.splice(i, 1);
                                i--;
                                n--;
                            }
                        }
                    }
                } else {
                    let listener = this.laterListeners[key];
                    if (listener) {
                        for (let i = 0, n = listener.length; i < n; i++) {
                            if (listener[i].caller == caller) {
                                listener.splice(i, 1);
                                i--;
                                n--;
                            }
                        }
                    }
                }
            }
        }
        clear(isBefore) {
            if (isBefore) {
                this.preListeners = null;
            } else {
                this.listeners = null;
            }
        }
        clearLater(isBefore) {
            if (isBefore) {
                this.laterPreListeners = null;
            } else {
                this.laterListeners = null;
            }
        }
        next(target) {
            this.wantNext = 1;
            this.nextTarget = target;
            this.step();
        }
        childNext(target) {
            if (this.wantNext) { return; }
            this.wantNext = 2;
            this.nextTarget = target;
            this.step();
        }
        step() {
            if (this.lockStep) { return; }
            let target = this.nextTarget;
            let nextCmd = this.wantNext;
            this.wantNext = 0;
            this.nextTarget = null;
            switch (nextCmd) {
                case 1:
                    if (this.fsm != null) {
                        let lastState = this.fsm.current;
                        if (target) {
                            if (!this.fsm.runTransition(target)) {
                                zs.log.error("无法执行从 " + lastState + " 到 " + target + " 的工作流，请检查是否完整注册流程!", "Core");
                            }
                        } else {
                            if (!this.fsm.runNext()) {
                                zs.log.error("无法执行 " + lastState + " 的后续工作流，请检查是否完整注册流程!", "Core");
                            }
                        }
                    }
                    break;
                case 2:
                    if (this.fsm != null) {
                        let childFSM = this.fsmList[this.fsm.current];
                        let isRunNext = false;
                        if (childFSM && ((target && !childFSM.runTransition(target)) || (!target && !childFSM.runNext()))) {
                            this.onChildFSMBeforeChanged(null, childFSM.current);
                            isRunNext = true;
                        }
                        if (!childFSM || isRunNext) {
                            let lastState = this.fsm.current;
                            if (!this.fsm.runNext()) {
                                zs.log.error("无法执行 " + lastState + " 的后续工作流，请检查是否完整注册流程!", "Core");
                            }
                        }
                    }
                    break;
            }
        }
        onBeforeChange(target, current) {
            if (!zs.product.synced) {
                zs.network.config(true).catch(e => e).then((sw) => {
                    if (sw == null || sw.length <= 0) {
                        zs.td.justTrack("请求配置数据失败", "请求配置数据失败");
                    } else {
                        zs.td.justTrack("请求配置数据成功", "请求配置数据成功");
                        zs.product.sync(sw);
                        zs.fgui.msgtext.hide();
                    }
                })
            }
            if (zs.platform.config.platformMark == "wx_") {
                zs.exporter.dataMgr.load();
            }
            this.lockStep = true;
            target == workflow.GAME_END && SaveData.save();
            if (this.preListeners != null && this.preListeners[target] != null) {
                let list = this.preListeners[target];
                for (let i = 0, n = list.length; i < n; i++) {
                    let once = list[i].once;
                    list[i].run();
                    if (once) {
                        list.splice(i, 1);
                        i--;
                        n--;
                    }
                }
            }
            this.checkExitEvent(current);
            this.exportWindow.clear();
            // banner销毁
            zs.platform.sync.hideBanner();
            zs.platform.sync.clearDelayBanner();
            if (this.laterPreListeners != null && this.laterPreListeners[target] != null) {
                let list = this.laterPreListeners[target];
                for (let i = 0, n = list.length; i < n; i++) {
                    let once = list[i].once;
                    list[i].run();
                    if (once) {
                        list.splice(i, 1);
                        i--;
                        n--;
                    }
                }
            }
            this.lockStep = false;
            this.step();
        }
        checkSwitch(config, check) {
            let isPassed = true;
            if (config) {
                if (typeof config === 'boolean') {
                    isPassed = config;
                } else if (Array.isArray(config)) {
                    for (let i = 0, n = config.length; i < n; i++) {
                        let sw = config[i];
                        if (!sw || sw.length <= 0) { continue; }
                        if (sw[0] == '!' || sw[0] == '！') {
                            if (sw.length > 1) {
                                sw = sw.slice(1, sw.length);
                                if (zs.product.get(sw)) {
                                    isPassed = false;
                                    break;
                                }
                            } else {
                                isPassed = false;
                                break;
                            }
                        } else if (!zs.product.get(sw)) {
                            isPassed = false;
                            break;
                        }
                    }
                } else if (typeof typeof config === 'string') {
                    let sw = config;
                    if (sw && sw.length > 0) {
                        if (sw[0] == '!' || sw[0] == '！') {
                            if (sw.length > 1) {
                                sw = sw.slice(1, sw.length);
                                if (zs.product.get(sw)) { isPassed = false; }
                            } else {
                                isPassed = false;
                            }
                        } else if (!zs.product.get(sw)) {
                            isPassed = false;
                        }
                    }
                }
            }
            if (!isPassed) { return false; }
            if (check) {
                isPassed = this.readConfigReturn(check);
            }
            return isPassed;
        }
        onChanged(current) {
            this.lockStep = true;
            let curFsmDesc = zs.td.descMap[current];
            if (curFsmDesc == null) {
                curFsmDesc = current;
            }
            zs.td.justTrack(curFsmDesc, curFsmDesc);
            let productData = zs.configs.productCfg[current];
            let isSkip = false;
            if (productData && (productData.switch || productData.check)) {
                isSkip = !this.checkSwitch(productData.switch, productData.check);
            }
            let childFSM = this.fsmList[current];
            if (isSkip) {
                this.next();
            } else {
                if (this.listeners != null && this.listeners[current] != null) {
                    let list = this.listeners[current];
                    for (let i = 0, n = list.length; i < n; i++) {
                        let once = list[i].once;
                        list[i].run();
                        if (once) {
                            list.splice(i, 1);
                            i--;
                            n--;
                        }
                    }
                }
                this.checkEvent(current);
                if (childFSM) {
                    childFSM.onBeforeChange = zs.Handler.create(this, this.onChildFSMBeforeChanged, null, false);
                    childFSM.onChanged = zs.Handler.create(this, this.onChildFSMChanged, null, false);
                    childFSM.init();
                    let productData = zs.configs.productCfg[current];
                    if (productData) {
                        zs.log.info(current + " 状态存在子状态机，无法自动创建应用运营配置，请使用子状态进行配置!", "Workflow", childFSM.list);
                    }
                } else {
                    this.checkBase(current);
                    zs.product.get(this.switchExporter) && this.checkExporter(current);
                    this.checkBanner(current);
                }
                this.checkLaterEvent(current);
                if (this.laterListeners != null && this.laterListeners[current] != null) {
                    let list = this.laterListeners[current];
                    for (let i = 0, n = list.length; i < n; i++) {
                        let once = list[i].once;
                        list[i].run();
                        if (once) {
                            list.splice(i, 1);
                            i--;
                            n--;
                        }
                    }
                }
            }
            this.lockStep = false;
            this.step();
        }
        onChildFSMBeforeChanged(target, current) {
            if (this.fsm == null) { return; }
            this.lockStep = true;
            let childKey = this.fsm.current + '.' + target;
            if (this.preListeners != null && this.preListeners[childKey] != null) {
                let list = this.preListeners[childKey];
                for (let i = 0, n = list.length; i < n; i++) {
                    let once = list[i].once;
                    list[i].run();
                    if (once) {
                        list.splice(i, 1);
                        i--;
                        n--;
                    }
                }
            }
            this.checkExitEvent(this.fsm.current + '.' + current);
            this.exportWindow.clear();
            // banner销毁
            zs.platform.sync.hideBanner();
            zs.platform.sync.clearDelayBanner();
            if (this.laterPreListeners != null && this.laterPreListeners[childKey] != null) {
                let list = this.laterPreListeners[childKey];
                for (let i = 0, n = list.length; i < n; i++) {
                    let once = list[i].once;
                    list[i].run();
                    if (once) {
                        list.splice(i, 1);
                        i--;
                        n--;
                    }
                }
            }
            this.lockStep = false;
            this.step();
        }
        onChildFSMChanged(current) {
            if (this.fsm == null) { return; }
            this.lockStep = true;
            let childKey = this.fsm.current + '.' + current;
            let curFsmDesc = zs.td.descMap[this.fsm.current];
            if (curFsmDesc == null) {
                curFsmDesc = this.fsm.current;
            }
            curFsmDesc = curFsmDesc + "." + current;
            zs.td.justTrack(curFsmDesc, curFsmDesc);
            let productData = zs.configs.productCfg[childKey];
            let isSkip = false;
            if (productData && (productData.switch || productData.check)) {
                isSkip = !this.checkSwitch(productData.switch, productData.check);
            }
            if (isSkip) {
                this.childNext();
            } else {
                if (this.listeners != null && this.listeners[childKey] != null) {
                    let list = this.listeners[childKey];
                    for (let i = 0, n = list.length; i < n; i++) {
                        let once = list[i].once;
                        list[i].run();
                        if (once) {
                            list.splice(i, 1);
                            i--;
                            n--;
                        }
                    }
                }
                this.checkEvent(childKey);
                this.checkBase(childKey);
                zs.product.get(this.switchExporter) && this.checkExporter(childKey);
                this.checkBanner(childKey);
                this.checkLaterEvent(childKey);
                if (this.laterListeners != null && this.laterListeners[childKey] != null) {
                    let list = this.laterListeners[childKey];
                    for (let i = 0, n = list.length; i < n; i++) {
                        let once = list[i].once;
                        list[i].run();
                        if (once) {
                            list.splice(i, 1);
                            i--;
                            n--;
                        }
                    }
                }
            }
            this.lockStep = false;
            this.step();
        }
        checkEvent(current) {
            let data = zs.configs.productCfg[current];
            if (data && data.event) {
                this.runEventConfig(data.event);
            }
        }
        checkLaterEvent(current) {
            let data = zs.configs.productCfg[current];
            if (data && data.laterevent) {
                this.runEventConfig(data.laterevent);
            }
        }
        checkExitEvent(current) {
            let data = zs.configs.productCfg[current];
            if (data && data.exitevent) {
                this.runEventConfig(data.exitevent);
            }
        }
        showPreviewBanner(params) {
            let pos = params ? params.pos : null;
            let size = params ? params.size : null;
            let checkInit = params ? params.checkInit : null;
            let isWait = params && params.isWait != null ? params.isWait : null;
            let xOffset = (pos && pos.right) ? pos.right : null;
            let yOffset = (pos && pos.bottom) ? pos.bottom : null;
            pos && pos.left && (xOffset = -pos.left);
            pos && pos.top && (yOffset = -pos.top);
            if (params && params.empty) {
                size = {
                    width: zs.configs.gameCfg.debug ? 10 : 1,
                    height: zs.configs.gameCfg.debug ? 10 : 1
                };
            } else if (size == null) {
                size = {
                    width: zs.platform.config.bannerWidth || 600,
                    height: zs.platform.config.bannerHeight || 200
                }
            }
            if (checkInit) {
                if (!this.banner) {
                    this.bannerWindow.attach(zs.exporter.banner)
                        .update(zs.exporter.banner, (unit) => {
                            this.banner = unit;
                            if (size) {
                                size.width && (unit.setWidth(size.width));
                                size.height && (unit.setHeight(size.height));
                            }
                            this.banner.view.visible = !isWait;
                        }, this);
                    if (params && params.empty) {
                        this.bannerWindow.align(zs.fgui.AlignType.TopLeft);
                    } else {
                        this.bannerWindow.align(zs.fgui.AlignType.Bottom, xOffset, yOffset)
                    }
                    this.bannerWindow.show().front();
                }
            } else if (this.banner) {
                if (size) {
                    size.width && (this.banner.setWidth(size.width));
                    size.height && (this.banner.setHeight(size.height));
                }
                this.bannerWindow.setBase(this.banner);
                if (params && params.empty) {
                    this.bannerWindow.align(zs.fgui.AlignType.TopLeft);
                } else {
                    this.bannerWindow.align(zs.fgui.AlignType.Bottom, xOffset, yOffset)
                }
                this.bannerWindow.show().front();
                this.banner.view.visible = true;
            }
        }
        hidePreviewBanner() {
            if (this.banner) {
                this.bannerWindow.detach(this.banner);
                this.banner = null;
            }
        }
        checkBanner(current) {
            let data = zs.configs.productCfg[current];
            let skipEmpty = zs.product.get("zs_skip_empty_banner") || zs.platform.config.platformMark != "wx_";
            if (data && data.banner) {
                if (this.bannerIgnoreList && this.bannerIgnoreList.indexOf(current) >= 0) {
                    zs.log.info("状态 " + current + " 在横幅广告忽略列表中，无法自动生成，请自主管理横幅广告展示或将该状态移出忽略列表", "Workflow");
                    !skipEmpty && zs.platform.sync.updateBanner({ empty: true, checkInit: true });
                    return;
                }
                if ((data.banner.switch || data.banner.check) && !this.checkSwitch(data.banner.switch, data.banner.check)) {
                    !skipEmpty && zs.platform.sync.updateBanner({ empty: true, checkInit: true });
                    return;
                }
                zs.platform.sync.checkBanner({ data: data });
            } else {
                !skipEmpty && zs.platform.sync.updateBanner({ empty: true, checkInit: true });
            }
        }
        checkExporter(current) {
            let data = zs.configs.productCfg[current];
            if (this.exporterIgnoreList && this.exporterIgnoreList.indexOf(current) >= 0) {
                if (data && data.exporter && data.exporter.length > 0) {
                    zs.log.info("状态 " + current + " 在导出忽略列表中，无法自动生成，请自主管理导出展示或将该状态移出忽略列表", "Workflow");
                }
                return;
            }
            if (data && data.exporter) {
                let exporter = data.exporter;
                if (Array.isArray(exporter) && exporter.length > 0) {
                    for (let i = 0, n = data.exporter.length; i < n; i++) {
                        let config = data.exporter[i];
                        if (!config) { continue; }
                        if ((config.switch || config.check) && !this.checkSwitch(config.switch, config.check)) { continue; }
                        this.exportWindow.applyConfig(config).front();
                    }
                } else if (typeof exporter === 'object') {
                    if ((!exporter.switch && !exporter.check) || this.checkSwitch(exporter.switch, exporter.check)) {
                        this.exportWindow.applyConfig(exporter).front();
                    }
                }
            }
        }
        checkBase(current) {
            let data = zs.configs.productCfg[current];
            if (data && data.base) {
                let base = data.base;
                if (Array.isArray(base) && base.length > 0) {
                    for (let i = 0, n = data.base.length; i < n; i++) {
                        let config = data.base[i];
                        if (!config) { continue; }
                        if ((config.switch || config.check) && !this.checkSwitch(config.switch, config.check)) { continue; }
                        this.exportWindow.applyConfig(config).front();
                    }
                } else if (typeof base === 'object') {
                    if ((!base.switch && !base.check) || this.checkSwitch(base.switch, base.check)) {
                        this.exportWindow.applyConfig(base).front();
                    }
                }
            }
        }
        createBase(key) {
            let base = zs.configs.uiCfg.base[key];
            if (!base) { return null; }
            if (!this.checkSwitch(base.switch, base.check)) {
                return null;
            }
            return this.exportWindow.applyConfig(base).front().getBase();
        }
    }
    workflow.exporterList = "export_list";
    workflow.exporterCard = "export_card";
    workflow.exporterBackground = "export_background";
    workflow.exporterLoader = "export_loader";
    workflow.exporterButton = "export_button";

    workflow.eventNext = "event_next";
    workflow.eventChildNext = "event_childnext";
    workflow.eventCreateBase = "event_createbase";
    workflow.eventCloseBase = "event_closebase";

    workflow.PRODUCT_START = "PRODUCT_START";
    workflow.PRODUCT_BEGIN = "PRODUCT_BEGIN";
    workflow.GAME_HOME = "GAME_HOME";
    workflow.PRODUCT_HOME_PLAY = "PRODUCT_HOME_PLAY";
    workflow.GAME_PLAY = "GAME_PLAY";
    workflow.PRODUCT_PLAY_END = "PRODUCT_PLAY_END";
    workflow.GAME_END = "GAME_END";
    workflow.PRODUCT_FINISH = "PRODUCT_FINISH";
    class core {
        static registeBase(key, base) {
            zs.fgui.configs.registeBase(key, base);
        }
        static unregisteBase(key) {
            zs.fgui.configs.unregisteBase(key);
        }
        static registeItem(key, item) {
            zs.fgui.configs.registeItem(key, item);
        }
        static unregisteItem(key) {
            zs.fgui.configs.unregisteItem(key);
        }
        static async init(productDef, savedata) {
            SaveData.data = savedata || {};
            zs.proxy.init();
            zs.Timer.gTimer = new zs.Timer();
            window.requestAnimationFrame(timerLoop);
            function timerLoop(stamp) {
                zs.Timer.gTimer._update();
                zs.Timer.inst._update();
                window.requestAnimationFrame(timerLoop);
            }
            zs.platform.init();
            zs.platform.sync.addEventShow({
                showHandler: (result) => {
                    core.onAppShow(result);
                }
            });
            zs.platform.sync.addEventHide({
                hideHandler: (result) => {
                    core.onAppHide(result);
                }
            });
            await zs.configs.init().catch(e => e);
            if (zs.configs.gameCfg.debug) {
                zs.log.Configs.logLevel = zs.log.Level.DEBUG;
            }
            zs.platform.proxy && zs.platform.config.platformMark == 'wx_'
                && typeof wx !== 'undefined' && zs.exporter.dataMgr.collectSource();
            if (!this.tdKey || this.tdKey == zs.td.defaultKey) {
                zs.td.appKey = zs.td.defaultKey;
                zs.td.appName = zs.configs.gameCfg.appName;
            } else {
                zs.td.appKey = this.tdKey;
            }
            zs.td.channel = zs.platform.proxy ? zs.platform.config.channel : "TEST";
            zs.configs.gameCfg.tdVersion && (zs.td.versionName = zs.configs.gameCfg.tdVersion);
            zs.td.init();
            zs.td.justTrack(zs.td.startupDesc, zs.td.startupDesc);
            zs.resource.init();
            this.onConfigInit && this.onConfigInit.run();
            zs.product.init(productDef);
            this._readyStart = false;
            zs.fgui.init();
            let entry = this.entry ? this.entry : zs.base.entry;
            if (this.loadingPage) {
                await this.loadingPage.preload().catch(e => e);
                this.entryInst = entry.init(this.loadingPage, this, this.ready);
            } else if (this.nativeLoadingPage) {
                await this.nativeLoadingPage.preload().catch(e => e);
                this.entryInst = entry.init(this.nativeLoadingPage, this, this.ready);
            } else {
                this.entryInst = null;
                await this.ready();
            }
        }
        static get appName() {
            return zs.configs.gameCfg ? zs.configs.gameCfg.appName : null;
        }
        static get appId() {
            return zs.configs.gameCfg ? zs.configs.gameCfg.appId : null;
        }
        static get tdKey() {
            return zs.configs.gameCfg ? zs.configs.gameCfg.tdKey : null;
        }
        // static get aldKey() {
        //     return zs.configs.gameCfg ? zs.configs.gameCfg.aldKey : null;
        // }
        static get readyStart() {
            if (!this.entryInst) { return this._readyStart; }
            return this.entryInst && this.entryInst.progress >= 100 && this._readyStart;
        }
        static async ready() {
            zs.log.debug("web 设置", 'Core');
            core.userInfo = await zs.network.init().catch(e => e);
            core.userId = core.userInfo.user_id;
            if (zs.platform.config.platformMark == "wx_") {
                await zs.exporter.dataMgr.load();
            }
            this.progress = 10;
            zs.log.debug("运营设置", 'Core');
            zs.td.justTrack("请求配置数据", "请求配置数据");
            let switchs = await zs.network.config(true).catch(e => e);
            if (switchs == null || switchs.length <= 0) {
                zs.td.justTrack("请求配置数据失败", "请求配置数据失败");
            } else {
                zs.td.justTrack("请求配置数据成功", "请求配置数据成功");
            }
            zs.product.sync(switchs);
            let syncProduct = zs.product.get("zs_sync_product");
            if (syncProduct && syncProduct != "0") {
                let cfg = await zs.network.jsonConfig("productCfg,uiCfg").catch(e => e);
                cfg && cfg.productCfg && (zs.configs.productCfg = cfg.productCfg);
                cfg && cfg.uiCfg && (zs.configs.uiCfg = cfg.uiCfg);
            }
            this.progress = 20;
            zs.log.debug("初始化广告与导出组件", 'Core');
            let basicExportPack = await zs.fgui.loadPack(zs.fgui.configs.pack_basic).catch(e => e);
            zs.ui.FGUI_msgbox.bind(basicExportPack);
            zs.ui.FGUI_list.bind(basicExportPack);
            this.progress = 30;
            zs.log.debug("加载必要分包", 'Core');
            await zs.resource.preload().catch(e => e);
            this.progress = 40;
            zs.log.debug("加载 main", 'Core');
            let packs = await zs.fgui.loadPacks(zs.configs.gameCfg.fguiPacks, true).catch(e => e);
            this.onFGUIBind && this.onFGUIBind.run();
            this.progress = 50;
            zs.log.debug("初始化数据统计", 'Core');
            await SaveData.load();
            if (zs.EggKnock) {
                zs.EggKnock.init();
                zs.core.onWorkflow(zs.workflow.PRODUCT_PLAY_END, zs.Handler.create(this, () => {
                    zs.EggKnock.markGameNum(true);
                }), true);
            }
            this.progress = 60;
            zs.log.debug("加载基础配置", 'Core');
            if (zs.configs.gameCfg && zs.configs.gameCfg.resources && zs.configs.gameCfg.resources.configs) {
                let cfgs = zs.configs.gameCfg.resources.configs;
                for (let key in cfgs) {
                    let cfg = cfgs[key];
                    if (cfg) {
                        if (Array.isArray(cfg)) {
                            cfg.length > 0 && cfg[0] != null && cfg[0].trim().length > 0 && (await zs.configs.load(key, cfg[0], cfg.length > 1 ? cfg[1] : null, cfg.length > 2 ? cfg[2] : true).catch(e => e));
                        } else if (typeof cfg === 'string') {
                            await zs.configs.load(key, cfg, null, true).catch(e => e);
                        }
                    }
                }
            }
            this.progress = 70;
            if (zs.configs.gameCfg && zs.configs.gameCfg.resources && zs.configs.gameCfg.resources.prefabs) {
                let cfgs = zs.configs.gameCfg.resources.prefabs;
                for (let key in cfgs) {
                    let cfg = cfgs[key];
                    if (cfg) {
                        if (Array.isArray(cfg)) {
                            cfg.length > 0 && cfg[0] != null && cfg[0].trim().length > 0 && (await zs.prefabs.load(key, cfg[0], cfg.length > 1 ? cfg[1] : null, cfg.length > 2 ? cfg[2] : true).catch(e => e));
                        } else if (typeof cfg === 'string') {
                            await zs.prefabs.load(key, cfg, null, true).catch(e => e);
                        }
                    }
                }
            }
            this.progress = 80;
            zs.log.debug("广告组件初始化", 'Core');
            let adGroup = core.userId % zs.configs.gameCfg.adsGroup * 2;
            zs.platform.initAds({ num: zs.configs.gameCfg.adsNum, idx: adGroup });
            this.progress = 85;

            zs.log.debug("业务流程拼装", 'Core');
            this.progress = 95;
            if (this.workflow == null) {
                this.workflow = new zs.workflow();
            }
            if (this.workflow.exporterPack) {
                if (Array.isArray(this.workflow.exporterPack)) {
                    await zs.fgui.loadPacks(this.workflow.exporterPack).catch(e => e);
                } else {
                    await zs.fgui.loadPack(this.workflow.exporterPack).catch(e => e);
                }
            }
            this.workflow.registe();
            this.workflow.registeChildFSM();

            if (this.workListeners) {
                for (let i = 0, n = this.workListeners.length; i < n; i++) {
                    let workListener = this.workListeners[i];
                    if (workListener.handler.once) {
                        if (workListener.later) {
                            this.workflow.onceLater(workListener.key, workListener.handler, workListener.isBefore);
                        } else {
                            this.workflow.once(workListener.key, workListener.handler, workListener.isBefore);
                        }
                    } else {
                        if (workListener.later) {
                            this.workflow.onLater(workListener.key, workListener.handler, workListener.isBefore);
                        } else {
                            this.workflow.on(workListener.key, workListener.handler, workListener.isBefore);
                        }
                    }
                }
                this.workListeners = null;
            }

            this.checkGameCfg(switchs);

            if (this.onPrepare) {
                this.onPrepare.run();
            } else {
                this.readyFinish();
            }
        }
        static readyFinish() {
            this.checkPanelSort();
            zs.Timer.inst.frameLoop(1, this, this.step);
            this.progress = 100;
            this._readyStart = true;
            if (!this.loadingPage && !this.nativeLoadingPage) {
                this.start();
            }
        }
        static step() {
            this.checkPanelSort();
        }
        static start() {
            zs.log.debug("启动业务", 'Core');
            if (this.readyStart) {
                this.workflow.start();
                this.onStart && this.onStart.run();
                zs.td.justTrack(zs.td.gameStartKey, zs.td.gameStartDesc, { uid: core.userId });
            }
        }
        static onWorkflow(key, handler, isBefore, priority) {
            if (key == null || key.length <= 0 || handler == null) { return; }
            if (this.workListeners == null) {
                this.workListeners = [];
            }
            if (this.workflow) {
                this.workflow.on(key, handler, isBefore, priority);
            } else {
                handler.once = false;
                this.workListeners.push({
                    key: key,
                    handler: handler,
                    priority: priority,
                    isBefore: isBefore
                });
            }
        }
        static onWorkflowLater(key, handler, isBefore, priority) {
            if (key == null || key.length <= 0 || handler == null) { return; }
            if (this.workListeners == null) {
                this.workListeners = [];
            }
            if (this.workflow) {
                this.workflow.onLater(key, handler, isBefore, priority);
            } else {
                handler.once = false;
                this.workListeners.push({
                    key: key,
                    handler: handler,
                    priority: priority,
                    isBefore: isBefore,
                    later: true
                });
            }
        }
        static onceWorkflow(key, handler, isBefore, priority) {
            if (key == null || key.length <= 0 || handler == null) { return; }
            if (this.workListeners == null) {
                this.workListeners = [];
            }
            if (this.workflow) {
                this.workflow.once(key, handler, isBefore, priority);
            } else {
                handler.once = true;
                this.workListeners.push({
                    key: key,
                    handler: handler,
                    priority: priority,
                    isBefore: isBefore
                });
            }
        }
        static onceWorkflowLater(key, handler, isBefore, priority) {
            if (key == null || key.length <= 0 || handler == null) { return; }
            if (this.workListeners == null) {
                this.workListeners = [];
            }
            if (this.workflow) {
                this.workflow.onceLater(key, handler, isBefore, priority);
            } else {
                handler.once = true;
                this.workListeners.push({
                    key: key,
                    handler: handler,
                    priority: priority,
                    isBefore: isBefore,
                    later: true
                });
            }
        }
        static onAppShow(result) {
            if (this.appShowListeners == null || this.appShowListeners.length <= 0) { return; }
            for (let i = 0, n = this.appShowListeners.length; i < n; i++) {
                let listener = this.appShowListeners[i];
                listener && (listener.runWith(result));
                if (!listener || listener.once) {
                    this.appShowListeners.splice(i, 1);
                    i--;
                    n--;
                }
            }
        }
        static onAppHide(result) {
            if (this.appHideListeners == null || this.appHideListeners.length <= 0) { return; }
            for (let i = 0, n = this.appHideListeners.length; i < n; i++) {
                let listener = this.appHideListeners[i];
                listener && (listener.runWith(result));
                if (!listener || listener.once) {
                    this.appHideListeners.splice(i, 1);
                    i--;
                    n--;
                }
            }
        }
        static addAppShow(handler) {
            if (handler == null) { return; }
            if (this.appShowListeners == null) {
                this.appShowListeners = [];
            }
            this.appShowListeners.push(handler);
        }
        static removeAppShow(handler) {
            if (handler == null || this.appShowListeners == null || this.appShowListeners.length <= 0) { return; }
            let caller = handler.caller;
            let method = handler.method;
            let onceOnly = handler.once;
            for (let i = 0, n = this.appShowListeners.length; i < n; i++) {
                let listener = this.appShowListeners[i];
                if (listener && (!caller || listener.caller === caller) && (method == null || listener.method === method) && (!onceOnly || listener.once)) {
                    this.appShowListeners.splice(i, 1);
                    i--;
                    n--;
                    listener.recover();
                }
            }
        }
        static addAppHide(handler) {
            if (handler == null) { return; }
            if (this.appHideListeners == null) {
                this.appHideListeners = [];
            }
            this.appHideListeners.push(handler);
        }
        static removeAppHide(handler) {
            if (handler == null || this.appHideListeners == null || this.appHideListeners.length <= 0) { return; }
            let caller = handler.caller;
            let method = handler.method;
            let onceOnly = handler.once;
            for (let i = 0, n = this.appHideListeners.length; i < n; i++) {
                let listener = this.appHideListeners[i];
                if (listener && (!caller || listener.caller === caller) && (method == null || listener.method === method) && (!onceOnly || listener.once)) {
                    this.appHideListeners.splice(i, 1);
                    i--;
                    n--;
                    listener.recover();
                }
            }
        }
        static checkPanelSort() {
            zs.proxy.sortScene(this.entryInst);
        }
        static checkGameCfg(switchs) {
            if(!zs.configs.gameCfg.debug){ return }
            let gamecfg = zs.configs.gameCfg;
            if (gamecfg.gameId == null || gamecfg.gameId.trim().length <= 0) {
                return zs.fgui.msgtext.show("未填写gameId");
            }
            if (gamecfg.appId == null || gamecfg.appId.trim().length <= 0) {
                return zs.fgui.msgtext.show("未填写appId");
            }
            if (core.userId == 1 && zs.platform.proxy) {
                return zs.fgui.msgtext.show("用户登录失败");
            }
            if (gamecfg.version == null || gamecfg.version.trim().length <= 0) {
                return zs.fgui.msgtext.show("未填写版本号version");
            } else if (switchs == null || switchs.length < 0) {
                return zs.fgui.msgtext.show("配置数据同步失败");
            }
            if (gamecfg.pure && zs.platform.proxy) {
                return zs.fgui.msgtext.show("当前处于纯净模式");
            }
            if (gamecfg.debug && zs.platform.proxy) {
                return zs.fgui.msgtext.show("当前处于测试模式");
            }
        }
    }
    core.userInfo = null;
    core.userId = null;
    core.entry = null;
    core.onConfigInit = null;
    core.onFGUIBind = null;
    core.onPrepare = null;
    core.onStart = null;
    core.overrideWorkflow = null;
    core.workflow = null;
    core.loadingPage = null;
    core.nativeLoadingPage = null;

    exports.showMsgBox = showMsgBox;
    exports.hideMsgBox = hideMsgBox;
    exports.SaveData = SaveData;
    exports.workflow = workflow;
    exports.core = core;
}(window.zs = window.zs || {})); window.zs = window.zs || {};
window.zs.base = window.zs.base || {};

(function (exports) {
    'use strict';

    class entry {
        constructor(type, thisArg, event) {
            this.thisArg = thisArg;
            if (type.prototype instanceof zs.proxy.NativeLoading) {
                this.loading = type.make();
                this.loading.init();
                event.call(thisArg);
                zs.Timer.inst.frameLoop(1, this, this.onProgress);
            } else {
                this.window = zs.fgui.window.create()
                    .attach(type)
                    .fit()
                    .update(type, (unit) => {
                        this.loading = unit;
                        event.call(thisArg);
                        zs.Timer.inst.frameLoop(1, this, this.onProgress);
                    })
                    .show();
            }
        }
        onProgress() {
            if ((!this.loading || this.loading.run(this.thisArg.progress || 0)) && this.thisArg.readyStart) {
                this.thisArg.start();
                zs.Timer.inst.clear(this, this.onProgress);
                if (this.loading && this.loading instanceof zs.proxy.NativeLoading) {
                    let owner = this.loading.owner;
                    owner.removeSelf();
                    this.loading.destroy();
                    owner.destroy();
                }
                this.window && this.window.dispose();
            }
        }
        get progress() {
            if (this.loading == null) { return 0; }
            return this.loading.current;
        }
        static init(type, thisArg, event) {
            return new entry(type, thisArg, event);
        }
    }

    exports.entry = entry;

}(window.zs.base = window.zs.base || {}));
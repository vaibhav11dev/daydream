/*!
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
! function(t) {
    t.fn.appear = function(e, n) {
        var i = t.extend({
            data: void 0,
            one: !0,
            accX: 0,
            accY: 0
        }, n);
        return this.each(function() {
            var n = t(this);
            if (n.appeared = !1, !e) return void n.trigger("appear", i.data);
            var o = t(window),
                a = function() {
                    if (!n.is(":visible")) return void(n.appeared = !1);
                    var t = o.scrollLeft(),
                        e = o.scrollTop(),
                        a = n.offset(),
                        r = a.left,
                        s = a.top,
                        l = i.accX,
                        u = i.accY,
                        c = n.height(),
                        d = o.height(),
                        p = n.width(),
                        m = o.width();
                    s + c + u >= e && e + d + u >= s && r + p + l >= t && t + m + l >= r ? n.appeared || n.trigger("appear", i.data) : n.appeared = !1
                },
                r = function() {
                    if (n.appeared = !0, i.one) {
                        o.unbind("scroll", a);
                        var r = t.inArray(a, t.fn.appear.checks);
                        r >= 0 && t.fn.appear.checks.splice(r, 1)
                    }
                    e.apply(this, arguments)
                };
            i.one ? n.one("appear", i.data, r) : n.bind("appear", i.data, r), o.scroll(a), t.fn.appear.checks.push(a), a()
        })
    }, t.extend(t.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var e = t.fn.appear.checks.length;
            if (e > 0)
                for (; e--;) t.fn.appear.checks[e]()
        },
        run: function() {
            t.fn.appear.timeout && clearTimeout(t.fn.appear.timeout), t.fn.appear.timeout = setTimeout(t.fn.appear.checkAll, 20)
        }
    }), t.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(e, n) {
        var i = t.fn[n];
        i && (t.fn[n] = function() {
            var e = i.apply(this, arguments);
            return t.fn.appear.run(), e
        })
    })
}(jQuery),
function(t) {
    t.fn.countTo = function(e) {
        e = t.extend({}, t.fn.countTo.defaults, e || {});
        var n = Math.ceil(e.speed / e.refreshInterval),
            i = (e.to - e.from) / n;
        return t(this).each(function() {
            function o() {
                s += i, r++, t(a).html(s.toFixed(e.decimals)), "function" == typeof e.onUpdate && e.onUpdate.call(a, s), r >= n && (clearInterval(l), s = e.to, "function" == typeof e.onComplete && e.onComplete.call(a, s))
            }
            var a = this,
                r = 0,
                s = e.from,
                l = setInterval(o, e.refreshInterval)
        })
    }, t.fn.countTo.defaults = {
        from: 0,
        to: 100,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        onUpdate: null,
        onComplete: null
    }
}(jQuery),
function(t, e) {
    function n(t) {
        return "object" == typeof t
    }

    function i(t) {
        return "string" == typeof t
    }

    function o(t) {
        return "number" == typeof t
    }

    function a(t) {
        return t === e
    }

    function r() {
        $ = google.maps, D || (D = {
            verbose: !1,
            queryLimit: {
                attempt: 5,
                delay: 250,
                random: 250
            },
            classes: function() {
                var e = {};
                return t.each("Map Marker InfoWindow Circle Rectangle OverlayView StreetViewPanorama KmlLayer TrafficLayer BicyclingLayer GroundOverlay StyledMapType ImageMapType".split(" "), function(t, n) {
                    e[n] = $[n]
                }), e
            }(),
            map: {
                mapTypeId: $.MapTypeId.ROADMAP,
                center: [46.578498, 2.457275],
                zoom: 2
            },
            overlay: {
                pane: "floatPane",
                content: "",
                offset: {
                    x: 0,
                    y: 0
                }
            },
            geoloc: {
                getCurrentPosition: {
                    maximumAge: 6e4,
                    timeout: 5e3
                }
            }
        })
    }

    function s(t, e) {
        return a(t) ? "gmap3_" + (e ? W + 1 : ++W) : t
    }

    function l(t) {
        var e, n = $.version.split(".");
        for (t = t.split("."), e = 0; e < n.length; e++) n[e] = parseInt(n[e], 10);
        for (e = 0; e < t.length; e++) {
            if (t[e] = parseInt(t[e], 10), !n.hasOwnProperty(e)) return !1;
            if (n[e] < t[e]) return !1
        }
        return !0
    }

    function u(e, n, i, o, a) {
        function r(n, o) {
            n && t.each(n, function(t, n) {
                var r = e,
                    s = n;
                q(n) && (r = n[0], s = n[1]), o(i, t, function(t) {
                    s.apply(r, [a || i, t, l])
                })
            })
        }
        var s = n.td || {},
            l = {
                id: o,
                data: s.data,
                tag: s.tag
            };
        r(s.events, $.event.addListener), r(s.onces, $.event.addListenerOnce)
    }

    function c(t) {
        var e, n = [];
        for (e in t) t.hasOwnProperty(e) && n.push(e);
        return n
    }

    function d(t, e) {
        var n, i = arguments;
        for (n = 2; n < i.length; n++)
            if (e in i[n] && i[n].hasOwnProperty(e)) return void(t[e] = i[n][e])
    }

    function p(e, n) {
        var i, o, a = ["data", "tag", "id", "events", "onces"],
            r = {};
        if (e.td)
            for (i in e.td) e.td.hasOwnProperty(i) && "options" !== i && "values" !== i && (r[i] = e.td[i]);
        for (o = 0; o < a.length; o++) d(r, a[o], n, e.td);
        return r.options = t.extend({}, e.opts || {}, n.options || {}), r
    }

    function m() {
        if (D.verbose) {
            var t, e = [];
            if (window.console && B(console.error)) {
                for (t = 0; t < arguments.length; t++) e.push(arguments[t]);
                console.error.apply(console, e)
            } else {
                for (e = "", t = 0; t < arguments.length; t++) e += arguments[t].toString() + " ";
                alert(e)
            }
        }
    }

    function f(t) {
        return (o(t) || i(t)) && "" !== t && !isNaN(t)
    }

    function h(t) {
        var e, i = [];
        if (!a(t))
            if (n(t))
                if (o(t.length)) i = t;
                else
                    for (e in t) i.push(t[e]);
        else i.push(t);
        return i
    }

    function v(e) {
        return e ? B(e) ? e : (e = h(e), function(i) {
            var o;
            if (a(i)) return !1;
            if (n(i)) {
                for (o = 0; o < i.length; o++)
                    if (t.inArray(i[o], e) >= 0) return !0;
                return !1
            }
            return t.inArray(i, e) >= 0
        }) : void 0
    }

    function g(t, e, n) {
        var o = e ? t : null;
        return !t || i(t) ? o : t.latLng ? g(t.latLng) : t instanceof $.LatLng ? t : f(t.lat) ? new $.LatLng(t.lat, t.lng) : !n && q(t) && f(t[0]) && f(t[1]) ? new $.LatLng(t[0], t[1]) : o
    }

    function y(t) {
        var e, n;
        return !t || t instanceof $.LatLngBounds ? t || null : (q(t) ? 2 === t.length ? (e = g(t[0]), n = g(t[1])) : 4 === t.length && (e = g([t[0], t[1]]), n = g([t[2], t[3]])) : "ne" in t && "sw" in t ? (e = g(t.ne), n = g(t.sw)) : "n" in t && "e" in t && "s" in t && "w" in t && (e = g([t.n, t.e]), n = g([t.s, t.w])), e && n ? new $.LatLngBounds(n, e) : null)
    }

    function w(t, e, n, o, a) {
        var r = n ? g(o.td, !1, !0) : !1,
            s = r ? {
                latLng: r
            } : o.td.address ? i(o.td.address) ? {
                address: o.td.address
            } : o.td.address : !1,
            l = s ? R.get(s) : !1,
            u = this;
        s ? (a = a || 0, l ? (o.latLng = l.results[0].geometry.location, o.results = l.results, o.status = l.status, e.apply(t, [o])) : (s.location && (s.location = g(s.location)), s.bounds && (s.bounds = y(s.bounds)), C().geocode(s, function(i, r) {
            r === $.GeocoderStatus.OK ? (R.store(s, {
                results: i,
                status: r
            }), o.latLng = i[0].geometry.location, o.results = i, o.status = r, e.apply(t, [o])) : r === $.GeocoderStatus.OVER_QUERY_LIMIT && a < D.queryLimit.attempt ? setTimeout(function() {
                w.apply(u, [t, e, n, o, a + 1])
            }, D.queryLimit.delay + Math.floor(Math.random() * D.queryLimit.random)) : (m("geocode failed", r, s), o.latLng = o.results = !1, o.status = r, e.apply(t, [o]))
        }))) : (o.latLng = g(o.td, !1, !0), e.apply(t, [o]))
    }

    function b(e, n, i, o) {
        function a() {
            do s++; while (s < e.length && !("address" in e[s]));
            return s >= e.length ? void i.apply(n, [o]) : void w(r, function(n) {
                delete n.td, t.extend(e[s], n), a.apply(r, [])
            }, !0, {
                td: e[s]
            })
        }
        var r = this,
            s = -1;
        a()
    }

    function x(t, e, n) {
        var i = !1;
        navigator && navigator.geolocation ? navigator.geolocation.getCurrentPosition(function(o) {
            i || (i = !0, n.latLng = new $.LatLng(o.coords.latitude, o.coords.longitude), e.apply(t, [n]))
        }, function() {
            i || (i = !0, n.latLng = !1, e.apply(t, [n]))
        }, n.opts.getCurrentPosition) : (n.latLng = !1, e.apply(t, [n]))
    }

    function I(t) {
        var e, i = !1;
        if (n(t) && t.hasOwnProperty("get")) {
            for (e in t)
                if ("get" !== e) return !1;
            i = !t.get.hasOwnProperty("callback")
        }
        return i
    }

    function C() {
        return H.geocoder || (H.geocoder = new $.Geocoder), H.geocoder
    }

    function S() {
        var t = [];
        this.get = function(e) {
            if (t.length) {
                var i, o, a, r, s, l = c(e);
                for (i = 0; i < t.length; i++) {
                    for (r = t[i], s = l.length === r.keys.length, o = 0; o < l.length && s; o++) a = l[o], s = a in r.request, s && (s = n(e[a]) && "equals" in e[a] && B(e[a]) ? e[a].equals(r.request[a]) : e[a] === r.request[a]);
                    if (s) return r.results
                }
            }
        }, this.store = function(e, n) {
            t.push({
                request: e,
                keys: c(e),
                results: n
            })
        }
    }

    function T() {
        var t = [],
            e = this;
        e.empty = function() {
            return !t.length
        }, e.add = function(e) {
            t.push(e)
        }, e.get = function() {
            return t.length ? t[0] : !1
        }, e.ack = function() {
            t.shift()
        }
    }

    function k() {
        function e(t) {
            return {
                id: t.id,
                name: t.name,
                object: t.obj,
                tag: t.tag,
                data: t.data
            }
        }

        function n(t) {
            B(t.setMap) && t.setMap(null), B(t.remove) && t.remove(), B(t.free) && t.free(), t = null
        }
        var i = {},
            o = {},
            r = this;
        r.add = function(t, e, n, a) {
            var l = t.td || {},
                u = s(l.id);
            return i[e] || (i[e] = []), u in o && r.clearById(u), o[u] = {
                obj: n,
                sub: a,
                name: e,
                id: u,
                tag: l.tag,
                data: l.data
            }, i[e].push(u), u
        }, r.getById = function(t, n, i) {
            var a = !1;
            return t in o && (a = n ? o[t].sub : i ? e(o[t]) : o[t].obj), a
        }, r.get = function(t, n, a, r) {
            var s, l, u = v(a);
            if (!i[t] || !i[t].length) return null;
            for (s = i[t].length; s;)
                if (s--, l = i[t][n ? s : i[t].length - s - 1], l && o[l]) {
                    if (u && !u(o[l].tag)) continue;
                    return r ? e(o[l]) : o[l].obj
                }
            return null
        }, r.all = function(t, n, r) {
            var s = [],
                l = v(n),
                u = function(t) {
                    var n, a;
                    for (n = 0; n < i[t].length; n++)
                        if (a = i[t][n], a && o[a]) {
                            if (l && !l(o[a].tag)) continue;
                            s.push(r ? e(o[a]) : o[a].obj)
                        }
                };
            if (t in i) u(t);
            else if (a(t))
                for (t in i) u(t);
            return s
        }, r.rm = function(t, e, n) {
            var a, s;
            if (!i[t]) return !1;
            if (e)
                if (n)
                    for (a = i[t].length - 1; a >= 0 && (s = i[t][a], !e(o[s].tag)); a--);
                else
                    for (a = 0; a < i[t].length && (s = i[t][a], !e(o[s].tag)); a++);
            else a = n ? i[t].length - 1 : 0;
            return a in i[t] ? r.clearById(i[t][a], a) : !1
        }, r.clearById = function(t, e) {
            if (t in o) {
                var r, s = o[t].name;
                for (r = 0; a(e) && r < i[s].length; r++) t === i[s][r] && (e = r);
                return n(o[t].obj), o[t].sub && n(o[t].sub), delete o[t], i[s].splice(e, 1), !0
            }
            return !1
        }, r.objGetById = function(t) {
            var e, n;
            if (i.clusterer)
                for (n in i.clusterer)
                    if ((e = o[i.clusterer[n]].obj.getById(t)) !== !1) return e;
            return !1
        }, r.objClearById = function(t) {
            var e;
            if (i.clusterer)
                for (e in i.clusterer)
                    if (o[i.clusterer[e]].obj.clearById(t)) return !0;
            return null
        }, r.clear = function(t, e, n, o) {
            var a, s, l, u = v(o);
            if (t && t.length) t = h(t);
            else {
                t = [];
                for (a in i) t.push(a)
            }
            for (s = 0; s < t.length; s++)
                if (l = t[s], e) r.rm(l, u, !0);
                else if (n) r.rm(l, u, !1);
            else
                for (; r.rm(l, u, !1););
        }, r.objClear = function(e, n, a, r) {
            var s;
            if (i.clusterer && (t.inArray("marker", e) >= 0 || !e.length))
                for (s in i.clusterer) o[i.clusterer[s]].obj.clear(n, a, r)
        }
    }

    function L(e, n, o) {
        function a(t) {
            var e = {};
            return e[t] = {}, e
        }

        function r() {
            var t;
            for (t in o)
                if (o.hasOwnProperty(t) && !l.hasOwnProperty(t)) return t
        }
        var s, l = {},
            u = this,
            c = {
                latLng: {
                    map: !1,
                    marker: !1,
                    infowindow: !1,
                    circle: !1,
                    overlay: !1,
                    getlatlng: !1,
                    getmaxzoom: !1,
                    getelevation: !1,
                    streetviewpanorama: !1,
                    getaddress: !0
                },
                geoloc: {
                    getgeoloc: !0
                }
            };
        i(o) && (o = a(o)), u.run = function() {
            for (var i, a; i = r();) {
                if (B(e[i])) return s = i, a = t.extend(!0, {}, D[i] || {}, o[i].options || {}), void(i in c.latLng ? o[i].values ? b(o[i].values, e, e[i], {
                    td: o[i],
                    opts: a,
                    session: l
                }) : w(e, e[i], c.latLng[i], {
                    td: o[i],
                    opts: a,
                    session: l
                }) : i in c.geoloc ? x(e, e[i], {
                    td: o[i],
                    opts: a,
                    session: l
                }) : e[i].apply(e, [{
                    td: o[i],
                    opts: a,
                    session: l
                }]));
                l[i] = null
            }
            n.apply(e, [o, l])
        }, u.ack = function(t) {
            l[s] = t, u.run.apply(u, [])
        }
    }

    function E() {
        return H.ds || (H.ds = new $.DirectionsService), H.ds
    }

    function M() {
        return H.dms || (H.dms = new $.DistanceMatrixService), H.dms
    }

    function P() {
        return H.mzs || (H.mzs = new $.MaxZoomService), H.mzs
    }

    function _() {
        return H.es || (H.es = new $.ElevationService), H.es
    }

    function A(t, e) {
        function n() {
            var t = this;
            return t.onAdd = function() {}, t.onRemove = function() {}, t.draw = function() {}, D.classes.OverlayView.apply(t, [])
        }
        n.prototype = D.classes.OverlayView.prototype;
        var i = new n;
        return i.setMap(t), i
    }

    function z(e, i, o) {
        function a(t) {
            z[t] || (delete O[t].options.map, z[t] = new D.classes.Marker(O[t].options), u(e, {
                td: O[t]
            }, z[t], O[t].id))
        }

        function r() {
            return (y = j.getProjection()) ? (T = !0, E.push($.event.addListener(i, "zoom_changed", m)), E.push($.event.addListener(i, "bounds_changed", m)), void h()) : void setTimeout(function() {
                r.apply(L, [])
            }, 25)
        }

        function l(t) {
            n(M[t]) ? (B(M[t].obj.setMap) && M[t].obj.setMap(null), B(M[t].obj.remove) && M[t].obj.remove(), B(M[t].shadow.remove) && M[t].obj.remove(), B(M[t].shadow.setMap) && M[t].shadow.setMap(null), delete M[t].obj, delete M[t].shadow) : z[t] && z[t].setMap(null), delete M[t]
        }

        function c() {
            var t, e, n, i, o, a, r, s, l = Math.cos,
                u = Math.sin,
                c = arguments;
            return c[0] instanceof $.LatLng ? (t = c[0].lat(), n = c[0].lng(), c[1] instanceof $.LatLng ? (e = c[1].lat(), i = c[1].lng()) : (e = c[1], i = c[2])) : (t = c[0], n = c[1], c[2] instanceof $.LatLng ? (e = c[2].lat(), i = c[2].lng()) : (e = c[2], i = c[3])), o = Math.PI * t / 180, a = Math.PI * n / 180, r = Math.PI * e / 180, s = Math.PI * i / 180, 6371e3 * Math.acos(Math.min(l(o) * l(r) * l(a) * l(s) + l(o) * u(a) * l(r) * u(s) + u(o) * u(r), 1))
        }

        function d() {
            var t = c(i.getCenter(), i.getBounds().getNorthEast()),
                e = new $.Circle({
                    center: i.getCenter(),
                    radius: 1.25 * t
                });
            return e.getBounds()
        }

        function p() {
            var t, e = {};
            for (t in M) e[t] = !0;
            return e
        }

        function m() {
            clearTimeout(g), g = setTimeout(h, 25)
        }

        function f(t) {
            var e = y.fromLatLngToDivPixel(t),
                n = y.fromDivPixelToLatLng(new $.Point(e.x + o.radius, e.y - o.radius)),
                i = y.fromDivPixelToLatLng(new $.Point(e.x - o.radius, e.y + o.radius));
            return new $.LatLngBounds(i, n)
        }

        function h() {
            if (!I && !S && T) {
                var e, n, a, r, s, u, c, m, h, v, g, y = !1,
                    x = [],
                    L = {},
                    E = i.getZoom(),
                    P = "maxZoom" in o && E > o.maxZoom,
                    _ = p();
                for (C = !1, E > 3 && (s = d(), y = s.getSouthWest().lng() < s.getNorthEast().lng()), e = 0; e < O.length; e++) !O[e] || y && !s.contains(O[e].options.position) || w && !w(N[e]) || x.push(e);
                for (;;) {
                    for (e = 0; L[e] && e < x.length;) e++;
                    if (e === x.length) break;
                    if (r = [], k && !P) {
                        g = 10;
                        do
                            for (m = r, r = [], g--, c = m.length ? s.getCenter() : O[x[e]].options.position, s = f(c), n = e; n < x.length; n++) L[n] || s.contains(O[x[n]].options.position) && r.push(n); while (m.length < r.length && r.length > 1 && g)
                    } else
                        for (n = e; n < x.length; n++)
                            if (!L[n]) {
                                r.push(n);
                                break
                            } for (u = {
                            indexes: [],
                            ref: []
                        }, h = v = 0, a = 0; a < r.length; a++) L[r[a]] = !0, u.indexes.push(x[r[a]]), u.ref.push(x[r[a]]), h += O[x[r[a]]].options.position.lat(), v += O[x[r[a]]].options.position.lng();
                    h /= r.length, v /= r.length, u.latLng = new $.LatLng(h, v), u.ref = u.ref.join("-"), u.ref in _ ? delete _[u.ref] : (1 === r.length && (M[u.ref] = !0), b(u))
                }
                t.each(_, function(t) {
                    l(t)
                }), S = !1
            }
        }
        var g, y, w, b, x, I = !1,
            C = !1,
            S = !1,
            T = !1,
            k = !0,
            L = this,
            E = [],
            M = {},
            P = {},
            _ = {},
            z = [],
            O = [],
            N = [],
            j = A(i, o.radius);
        r(), L.getById = function(t) {
            return t in P ? (a(P[t]), z[P[t]]) : !1
        }, L.rm = function(t) {
            var e = P[t];
            z[e] && z[e].setMap(null), delete z[e], z[e] = !1, delete O[e], O[e] = !1, delete N[e], N[e] = !1, delete P[t], delete _[e], C = !0
        }, L.clearById = function(t) {
            return t in P ? (L.rm(t), !0) : void 0
        }, L.clear = function(t, e, n) {
            var i, o, a, r, s, l = [],
                u = v(n);
            for (t ? (i = O.length - 1, o = -1, a = -1) : (i = 0, o = O.length, a = 1), r = i; r !== o && (!O[r] || u && !u(O[r].tag) || (l.push(_[r]), !e && !t)); r += a);
            for (s = 0; s < l.length; s++) L.rm(l[s])
        }, L.add = function(t, e) {
            t.id = s(t.id), L.clearById(t.id), P[t.id] = z.length, _[z.length] = t.id, z.push(null), O.push(t), N.push(e), C = !0
        }, L.addMarker = function(t, n) {
            n = n || {}, n.id = s(n.id), L.clearById(n.id), n.options || (n.options = {}), n.options.position = t.getPosition(), u(e, {
                td: n
            }, t, n.id), P[n.id] = z.length, _[z.length] = n.id, z.push(t), O.push(n), N.push(n.data || {}), C = !0
        }, L.td = function(t) {
            return O[t]
        }, L.value = function(t) {
            return N[t]
        }, L.marker = function(t) {
            return t in z ? (a(t), z[t]) : !1
        }, L.markerIsSet = function(t) {
            return Boolean(z[t])
        }, L.setMarker = function(t, e) {
            z[t] = e
        }, L.store = function(t, e, n) {
            M[t.ref] = {
                obj: e,
                shadow: n
            }
        }, L.free = function() {
            var e;
            for (e = 0; e < E.length; e++) $.event.removeListener(E[e]);
            E = [], t.each(M, function(t) {
                l(t)
            }), M = {}, t.each(O, function(t) {
                O[t] = null
            }), O = [], t.each(z, function(t) {
                z[t] && (z[t].setMap(null), delete z[t])
            }), z = [], t.each(N, function(t) {
                delete N[t]
            }), N = [], P = {}, _ = {}
        }, L.filter = function(t) {
            w = t, h()
        }, L.enable = function(t) {
            k !== t && (k = t, h())
        }, L.display = function(t) {
            b = t
        }, L.error = function(t) {
            x = t
        }, L.beginUpdate = function() {
            I = !0
        }, L.endUpdate = function() {
            I = !1, C && h()
        }, L.autofit = function(t) {
            var e;
            for (e = 0; e < O.length; e++) O[e] && t.extend(O[e].options.position)
        }
    }

    function O(t, e) {
        var n = this;
        n.id = function() {
            return t
        }, n.filter = function(t) {
            e.filter(t)
        }, n.enable = function() {
            e.enable(!0)
        }, n.disable = function() {
            e.enable(!1)
        }, n.add = function(t, n, i) {
            i || e.beginUpdate(), e.addMarker(t, n), i || e.endUpdate()
        }, n.getById = function(t) {
            return e.getById(t)
        }, n.clearById = function(t, n) {
            var i;
            return n || e.beginUpdate(), i = e.clearById(t), n || e.endUpdate(), i
        }, n.clear = function(t, n, i, o) {
            o || e.beginUpdate(), e.clear(t, n, i), o || e.endUpdate()
        }
    }

    function N(e, n, i, o) {
        var a = this,
            r = [];
        D.classes.OverlayView.call(a), a.setMap(e), a.onAdd = function() {
            var e = a.getPanes();
            n.pane in e && t(e[n.pane]).append(o), t.each("dblclick click mouseover mousemove mouseout mouseup mousedown".split(" "), function(e, n) {
                r.push($.event.addDomListener(o[0], n, function(e) {
                    t.Event(e).stopPropagation(), $.event.trigger(a, n, [e]), a.draw()
                }))
            }), r.push($.event.addDomListener(o[0], "contextmenu", function(e) {
                t.Event(e).stopPropagation(), $.event.trigger(a, "rightclick", [e]), a.draw()
            }))
        }, a.getPosition = function() {
            return i
        }, a.setPosition = function(t) {
            i = t, a.draw()
        }, a.draw = function() {
            var t = a.getProjection().fromLatLngToDivPixel(i);
            o.css("left", t.x + n.offset.x + "px").css("top", t.y + n.offset.y + "px")
        }, a.onRemove = function() {
            var t;
            for (t = 0; t < r.length; t++) $.event.removeListener(r[t]);
            o.remove()
        }, a.hide = function() {
            o.hide()
        }, a.show = function() {
            o.show()
        }, a.toggle = function() {
            o && (o.is(":visible") ? a.show() : a.hide())
        }, a.toggleDOM = function() {
            a.setMap(a.getMap() ? null : e)
        }, a.getDOMElement = function() {
            return o[0]
        }
    }

    function j(o) {
        function r() {
            !x && (x = C.get()) && x.run()
        }

        function c() {
            x = null, C.ack(), r.call(I)
        }

        function d(t) {
            var e, n = t.td.callback;
            n && (e = Array.prototype.slice.call(arguments, 1), B(n) ? n.apply(o, e) : q(n) && B(n[1]) && n[1].apply(n[0], e))
        }

        function f(t, e, n) {
            n && u(o, t, e, n), d(t, e), x.ack(e)
        }

        function v(e, n) {
            n = n || {};
            var i = n.td && n.td.options ? n.td.options : 0;
            A ? i && (i.center && (i.center = g(i.center)), A.setOptions(i)) : (i = n.opts || t.extend(!0, {}, D.map, i || {}), i.center = e || g(i.center), A = new D.classes.Map(o.get(0), i))
        }

        function w(n) {
            var i, a, r = new z(o, A, n),
                s = {},
                l = {},
                c = [],
                d = /^[0-9]+$/;
            for (a in n) d.test(a) ? (c.push(1 * a), l[a] = n[a], l[a].width = l[a].width || 0, l[a].height = l[a].height || 0) : s[a] = n[a];
            return c.sort(function(t, e) {
                return t > e
            }), i = s.calculator ? function(e) {
                var n = [];
                return t.each(e, function(t, e) {
                    n.push(r.value(e))
                }), s.calculator.apply(o, [n])
            } : function(t) {
                return t.length
            }, r.error(function() {
                m.apply(I, arguments)
            }), r.display(function(a) {
                var d, p, m, f, h, v, y = i(a.indexes);
                if (n.force || y > 1)
                    for (d = 0; d < c.length; d++) c[d] <= y && (p = l[c[d]]);
                p ? (h = p.offset || [-p.width / 2, -p.height / 2], m = t.extend({}, s), m.options = t.extend({
                    pane: "overlayLayer",
                    content: p.content ? p.content.replace("CLUSTER_COUNT", y) : "",
                    offset: {
                        x: ("x" in h ? h.x : h[0]) || 0,
                        y: ("y" in h ? h.y : h[1]) || 0
                    }
                }, s.options || {}), f = I.overlay({
                    td: m,
                    opts: m.options,
                    latLng: g(a)
                }, !0), m.options.pane = "floatShadow", m.options.content = t(document.createElement("div")).width(p.width + "px").height(p.height + "px").css({
                    cursor: "pointer"
                }), v = I.overlay({
                    td: m,
                    opts: m.options,
                    latLng: g(a)
                }, !0), s.data = {
                    latLng: g(a),
                    markers: []
                }, t.each(a.indexes, function(t, e) {
                    s.data.markers.push(r.value(e)), r.markerIsSet(e) && r.marker(e).setMap(null)
                }), u(o, {
                    td: s
                }, v, e, {
                    main: f,
                    shadow: v
                }), r.store(a, f, v)) : t.each(a.indexes, function(t, e) {
                    r.marker(e).setMap(A)
                })
            }), r
        }

        function b(e, n, i) {
            var a = [],
                r = "values" in e.td;
            return r || (e.td.values = [{
                options: e.opts
            }]), e.td.values.length ? (v(), t.each(e.td.values, function(t, r) {
                var s, l, c, d, m = p(e, r);
                if (m.options[i])
                    if (m.options[i][0][0] && q(m.options[i][0][0]))
                        for (l = 0; l < m.options[i].length; l++)
                            for (c = 0; c < m.options[i][l].length; c++) m.options[i][l][c] = g(m.options[i][l][c]);
                    else
                        for (l = 0; l < m.options[i].length; l++) m.options[i][l] = g(m.options[i][l]);
                m.options.map = A, d = new $[n](m.options), a.push(d), s = S.add({
                    td: m
                }, n.toLowerCase(), d), u(o, {
                    td: m
                }, d, s)
            }), void f(e, r ? a : a[0])) : void f(e, !1)
        }
        var x, I = this,
            C = new T,
            S = new k,
            A = null;
        I._plan = function(t) {
            var e;
            for (e = 0; e < t.length; e++) C.add(new L(I, c, t[e]));
            r()
        }, I.map = function(t) {
            v(t.latLng, t), u(o, t, A), f(t, A)
        }, I.destroy = function(t) {
            S.clear(), o.empty(), A && (A = null), f(t, !0)
        }, I.overlay = function(e, n) {
            var i = [],
                a = "values" in e.td;
            return a || (e.td.values = [{
                latLng: e.latLng,
                options: e.opts
            }]), e.td.values.length ? (N.__initialised || (N.prototype = new D.classes.OverlayView, N.__initialised = !0), t.each(e.td.values, function(a, r) {
                var s, l, c = p(e, r),
                    d = t(document.createElement("div")).css({
                        border: "none",
                        borderWidth: 0,
                        position: "absolute"
                    });
                d.append(c.options.content), l = new N(A, c.options, g(c) || g(r), d), i.push(l), d = null, n || (s = S.add(e, "overlay", l), u(o, {
                    td: c
                }, l, s))
            }), n ? i[0] : void f(e, a ? i : i[0])) : void f(e, !1)
        }, I.marker = function(e) {
            var n, i, a, r = "values" in e.td,
                l = !A;
            return r || (e.opts.position = e.latLng || g(e.opts.position), e.td.values = [{
                options: e.opts
            }]), e.td.values.length ? (l && v(), e.td.cluster && !A.getBounds() ? void $.event.addListenerOnce(A, "bounds_changed", function() {
                I.marker.apply(I, [e])
            }) : void(e.td.cluster ? (e.td.cluster instanceof O ? (i = e.td.cluster, a = S.getById(i.id(), !0)) : (a = w(e.td.cluster), i = new O(s(e.td.id, !0), a), S.add(e, "clusterer", i, a)), a.beginUpdate(), t.each(e.td.values, function(t, n) {
                var i = p(e, n);
                i.options.position = g(i.options.position ? i.options.position : n), i.options.position && (i.options.map = A, l && (A.setCenter(i.options.position), l = !1), a.add(i, n))
            }), a.endUpdate(), f(e, i)) : (n = [], t.each(e.td.values, function(t, i) {
                var a, r, s = p(e, i);
                s.options.position = g(s.options.position ? s.options.position : i), s.options.position && (s.options.map = A, l && (A.setCenter(s.options.position), l = !1), r = new D.classes.Marker(s.options), n.push(r), a = S.add({
                    td: s
                }, "marker", r), u(o, {
                    td: s
                }, r, a))
            }), f(e, r ? n : n[0])))) : void f(e, !1)
        }, I.getroute = function(t) {
            t.opts.origin = g(t.opts.origin, !0), t.opts.destination = g(t.opts.destination, !0), E().route(t.opts, function(e, n) {
                d(t, n === $.DirectionsStatus.OK ? e : !1, n), x.ack()
            })
        }, I.getdistance = function(t) {
            var e;
            for (t.opts.origins = h(t.opts.origins), e = 0; e < t.opts.origins.length; e++) t.opts.origins[e] = g(t.opts.origins[e], !0);
            for (t.opts.destinations = h(t.opts.destinations), e = 0; e < t.opts.destinations.length; e++) t.opts.destinations[e] = g(t.opts.destinations[e], !0);
            M().getDistanceMatrix(t.opts, function(e, n) {
                d(t, n === $.DistanceMatrixStatus.OK ? e : !1, n), x.ack()
            })
        }, I.infowindow = function(n) {
            var i = [],
                r = "values" in n.td;
            r || (n.latLng && (n.opts.position = n.latLng), n.td.values = [{
                options: n.opts
            }]), t.each(n.td.values, function(t, s) {
                var l, c, d = p(n, s);
                d.options.position = g(d.options.position ? d.options.position : s.latLng), A || v(d.options.position), c = new D.classes.InfoWindow(d.options), c && (a(d.open) || d.open) && (r ? c.open(A, d.anchor || e) : c.open(A, d.anchor || (n.latLng ? e : n.session.marker ? n.session.marker : e))), i.push(c), l = S.add({
                    td: d
                }, "infowindow", c), u(o, {
                    td: d
                }, c, l)
            }), f(n, r ? i : i[0])
        }, I.circle = function(e) {
            var n = [],
                i = "values" in e.td;
            return i || (e.opts.center = e.latLng || g(e.opts.center), e.td.values = [{
                options: e.opts
            }]), e.td.values.length ? (t.each(e.td.values, function(t, i) {
                var a, r, s = p(e, i);
                s.options.center = g(s.options.center ? s.options.center : i), A || v(s.options.center), s.options.map = A, r = new D.classes.Circle(s.options), n.push(r), a = S.add({
                    td: s
                }, "circle", r), u(o, {
                    td: s
                }, r, a)
            }), void f(e, i ? n : n[0])) : void f(e, !1)
        }, I.getaddress = function(t) {
            d(t, t.results, t.status), x.ack()
        }, I.getlatlng = function(t) {
            d(t, t.results, t.status), x.ack()
        }, I.getmaxzoom = function(t) {
            P().getMaxZoomAtLatLng(t.latLng, function(e) {
                d(t, e.status === $.MaxZoomStatus.OK ? e.zoom : !1, status), x.ack()
            })
        }, I.getelevation = function(t) {
            var e, n = [],
                i = function(e, n) {
                    d(t, n === $.ElevationStatus.OK ? e : !1, n), x.ack()
                };
            if (t.latLng) n.push(t.latLng);
            else
                for (n = h(t.td.locations || []), e = 0; e < n.length; e++) n[e] = g(n[e]);
            if (n.length) _().getElevationForLocations({
                locations: n
            }, i);
            else {
                if (t.td.path && t.td.path.length)
                    for (e = 0; e < t.td.path.length; e++) n.push(g(t.td.path[e]));
                n.length ? _().getElevationAlongPath({
                    path: n,
                    samples: t.td.samples
                }, i) : x.ack()
            }
        }, I.defaults = function(e) {
            t.each(e.td, function(e, i) {
                n(D[e]) ? D[e] = t.extend({}, D[e], i) : D[e] = i
            }), x.ack(!0)
        }, I.rectangle = function(e) {
            var n = [],
                i = "values" in e.td;
            return i || (e.td.values = [{
                options: e.opts
            }]), e.td.values.length ? (t.each(e.td.values, function(t, i) {
                var a, r, s = p(e, i);
                s.options.bounds = y(s.options.bounds ? s.options.bounds : i), A || v(s.options.bounds.getCenter()), s.options.map = A, r = new D.classes.Rectangle(s.options), n.push(r), a = S.add({
                    td: s
                }, "rectangle", r), u(o, {
                    td: s
                }, r, a)
            }), void f(e, i ? n : n[0])) : void f(e, !1)
        }, I.polyline = function(t) {
            b(t, "Polyline", "path")
        }, I.polygon = function(t) {
            b(t, "Polygon", "paths")
        }, I.trafficlayer = function(t) {
            v();
            var e = S.get("trafficlayer");
            e || (e = new D.classes.TrafficLayer, e.setMap(A), S.add(t, "trafficlayer", e)), f(t, e)
        }, I.bicyclinglayer = function(t) {
            v();
            var e = S.get("bicyclinglayer");
            e || (e = new D.classes.BicyclingLayer, e.setMap(A), S.add(t, "bicyclinglayer", e)), f(t, e)
        }, I.groundoverlay = function(t) {
            t.opts.bounds = y(t.opts.bounds), t.opts.bounds && v(t.opts.bounds.getCenter());
            var e, n = new D.classes.GroundOverlay(t.opts.url, t.opts.bounds, t.opts.opts);
            n.setMap(A), e = S.add(t, "groundoverlay", n), f(t, n, e)
        }, I.streetviewpanorama = function(e) {
            e.opts.opts || (e.opts.opts = {}), e.latLng ? e.opts.opts.position = e.latLng : e.opts.opts.position && (e.opts.opts.position = g(e.opts.opts.position)), e.td.divId ? e.opts.container = document.getElementById(e.td.divId) : e.opts.container && (e.opts.container = t(e.opts.container).get(0));
            var n, i = new D.classes.StreetViewPanorama(e.opts.container, e.opts.opts);
            i && A.setStreetView(i), n = S.add(e, "streetviewpanorama", i), f(e, i, n)
        }, I.kmllayer = function(e) {
            var n = [],
                i = "values" in e.td;
            return i || (e.td.values = [{
                options: e.opts
            }]), e.td.values.length ? (t.each(e.td.values, function(t, i) {
                var a, r, s, c = p(e, i);
                A || v(), s = c.options, c.options.opts && (s = c.options.opts, c.options.url && (s.url = c.options.url)), s.map = A, r = l("3.10") ? new D.classes.KmlLayer(s) : new D.classes.KmlLayer(s.url, s), n.push(r), a = S.add({
                    td: c
                }, "kmllayer", r), u(o, {
                    td: c
                }, r, a)
            }), void f(e, i ? n : n[0])) : void f(e, !1)
        }, I.panel = function(e) {
            v();
            var n, i, r = 0,
                s = 0,
                l = t(document.createElement("div"));
            l.css({
                position: "absolute",
                zIndex: 1e3,
                visibility: "hidden"
            }), e.opts.content && (i = t(e.opts.content), l.append(i), o.first().prepend(l), a(e.opts.left) ? a(e.opts.right) ? e.opts.center && (r = (o.width() - i.width()) / 2) : r = o.width() - i.width() - e.opts.right : r = e.opts.left, a(e.opts.top) ? a(e.opts.bottom) ? e.opts.middle && (s = (o.height() - i.height()) / 2) : s = o.height() - i.height() - e.opts.bottom : s = e.opts.top, l.css({
                top: s,
                left: r,
                visibility: "visible"
            })), n = S.add(e, "panel", l), f(e, l, n), l = null
        }, I.directionsrenderer = function(e) {
            e.opts.map = A;
            var n, i = new $.DirectionsRenderer(e.opts);
            e.td.divId ? i.setPanel(document.getElementById(e.td.divId)) : e.td.container && i.setPanel(t(e.td.container).get(0)), n = S.add(e, "directionsrenderer", i), f(e, i, n)
        }, I.getgeoloc = function(t) {
            f(t, t.latLng)
        }, I.styledmaptype = function(t) {
            v();
            var e = new D.classes.StyledMapType(t.td.styles, t.opts);
            A.mapTypes.set(t.td.id, e), f(t, e)
        }, I.imagemaptype = function(t) {
            v();
            var e = new D.classes.ImageMapType(t.opts);
            A.mapTypes.set(t.td.id, e), f(t, e)
        }, I.autofit = function(e) {
            var n = new $.LatLngBounds;
            t.each(S.all(), function(t, e) {
                e.getPosition ? n.extend(e.getPosition()) : e.getBounds ? (n.extend(e.getBounds().getNorthEast()), n.extend(e.getBounds().getSouthWest())) : e.getPaths ? e.getPaths().forEach(function(t) {
                    t.forEach(function(t) {
                        n.extend(t)
                    })
                }) : e.getPath ? e.getPath().forEach(function(t) {
                    n.extend(t)
                }) : e.getCenter ? n.extend(e.getCenter()) : "function" == typeof O && e instanceof O && (e = S.getById(e.id(), !0), e && e.autofit(n))
            }), n.isEmpty() || A.getBounds() && A.getBounds().equals(n) || ("maxZoom" in e.td && $.event.addListenerOnce(A, "bounds_changed", function() {
                this.getZoom() > e.td.maxZoom && this.setZoom(e.td.maxZoom)
            }), A.fitBounds(n)), f(e, !0)
        }, I.clear = function(e) {
            if (i(e.td)) {
                if (S.clearById(e.td) || S.objClearById(e.td)) return void f(e, !0);
                e.td = {
                    name: e.td
                }
            }
            e.td.id ? t.each(h(e.td.id), function(t, e) {
                S.clearById(e) || S.objClearById(e)
            }) : (S.clear(h(e.td.name), e.td.last, e.td.first, e.td.tag), S.objClear(h(e.td.name), e.td.last, e.td.first, e.td.tag)), f(e, !0)
        }, I.get = function(n, o, a) {
            var r, s, l = o ? n : n.td;
            return o || (a = l.full), i(l) ? (s = S.getById(l, !1, a) || S.objGetById(l), s === !1 && (r = l, l = {})) : r = l.name, "map" === r && (s = A), s || (s = [], l.id ? (t.each(h(l.id), function(t, e) {
                s.push(S.getById(e, !1, a) || S.objGetById(e))
            }), q(l.id) || (s = s[0])) : (t.each(r ? h(r) : [e], function(e, n) {
                var i;
                l.first ? (i = S.get(n, !1, l.tag, a), i && s.push(i)) : l.all ? t.each(S.all(n, l.tag, a), function(t, e) {
                    s.push(e)
                }) : (i = S.get(n, !0, l.tag, a), i && s.push(i))
            }), l.all || q(r) || (s = s[0]))), s = q(s) || !l.all ? s : [s], o ? s : void f(n, s)
        }, I.exec = function(e) {
            t.each(h(e.td.func), function(n, i) {
                t.each(I.get(e.td, !0, e.td.hasOwnProperty("full") ? e.td.full : !0), function(t, e) {
                    i.call(o, e)
                })
            }), f(e, !0)
        }, I.trigger = function(e) {
            if (i(e.td)) $.event.trigger(A, e.td);
            else {
                var n = [A, e.td.eventName];
                e.td.var_args && t.each(e.td.var_args, function(t, e) {
                    n.push(e)
                }), $.event.trigger.apply($.event, n)
            }
            d(e), x.ack()
        }
    }
    var D, $, W = 0,
        B = t.isFunction,
        q = t.isArray,
        H = {},
        R = new S;
    t.fn.gmap3 = function() {
        var e, n = [],
            i = !0,
            o = [];
        for (r(), e = 0; e < arguments.length; e++) arguments[e] && n.push(arguments[e]);
        return n.length || n.push("map"), t.each(this, function() {
            var e = t(this),
                a = e.data("gmap3");
            i = !1, a || (a = new j(e), e.data("gmap3", a)), 1 !== n.length || "get" !== n[0] && !I(n[0]) ? a._plan(n) : "get" === n[0] ? o.push(a.get("map", !0)) : o.push(a.get(n[0].get, !0, n[0].get.full))
        }), o.length ? 1 === o.length ? o[0] : o : this
    }
}(jQuery),
/*!
 * EventEmitter v4.1.0 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */
function(t) {
    "use strict";

    function e() {}

    function n(t, e) {
        if (o) return e.indexOf(t);
        for (var n = e.length; n--;)
            if (e[n] === t) return n;
        return -1
    }
    var i = e.prototype,
        o = !!Array.prototype.indexOf;
    i._getEvents = function() {
        return this._events || (this._events = {})
    }, i.getListeners = function(t) {
        var e, n, i = this._getEvents();
        if ("object" == typeof t) {
            e = {};
            for (n in i) i.hasOwnProperty(n) && t.test(n) && (e[n] = i[n])
        } else e = i[t] || (i[t] = []);
        return e
    }, i.getListenersAsObject = function(t) {
        var e, n = this.getListeners(t);
        return n instanceof Array && (e = {}, e[t] = n), e || n
    }, i.addListener = function(t, e) {
        var i, o = this.getListenersAsObject(t);
        for (i in o) o.hasOwnProperty(i) && -1 === n(e, o[i]) && o[i].push(e);
        return this
    }, i.on = i.addListener, i.defineEvent = function(t) {
        return this.getListeners(t), this
    }, i.defineEvents = function(t) {
        for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
        return this
    }, i.removeListener = function(t, e) {
        var i, o, a = this.getListenersAsObject(t);
        for (o in a) a.hasOwnProperty(o) && (i = n(e, a[o]), -1 !== i && a[o].splice(i, 1));
        return this
    }, i.off = i.removeListener, i.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, i.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, i.manipulateListeners = function(t, e, n) {
        var i, o, a = t ? this.removeListener : this.addListener,
            r = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (i = n.length; i--;) a.call(this, e, n[i]);
        else
            for (i in e) e.hasOwnProperty(i) && (o = e[i]) && ("function" == typeof o ? a.call(this, i, o) : r.call(this, i, o));
        return this
    }, i.removeEvent = function(t) {
        var e, n = typeof t,
            i = this._getEvents();
        if ("string" === n) delete i[t];
        else if ("object" === n)
            for (e in i) i.hasOwnProperty(e) && t.test(e) && delete i[e];
        else delete this._events;
        return this
    }, i.emitEvent = function(t, e) {
        var n, i, o, a = this.getListenersAsObject(t);
        for (i in a)
            if (a.hasOwnProperty(i))
                for (n = a[i].length; n--;) o = e ? a[i][n].apply(null, e) : a[i][n](), o === !0 && this.removeListener(t, a[i][n]);
        return this
    }, i.trigger = i.emitEvent, i.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, "function" == typeof define && define.amd ? define(function() {
        return e
    }) : t.EventEmitter = e
}(this),
/*!
 * eventie v1.0.3
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */
function(t) {
    "use strict";
    var e = document.documentElement,
        n = function() {};
    e.addEventListener ? n = function(t, e, n) {
        t.addEventListener(e, n, !1)
    } : e.attachEvent && (n = function(e, n, i) {
        e[n + i] = i.handleEvent ? function() {
            var e = t.event;
            e.target = e.target || e.srcElement, i.handleEvent.call(i, e)
        } : function() {
            var n = t.event;
            n.target = n.target || n.srcElement, i.call(e, n)
        }, e.attachEvent("on" + n, e[n + i])
    });
    var i = function() {};
    e.removeEventListener ? i = function(t, e, n) {
        t.removeEventListener(e, n, !1)
    } : e.detachEvent && (i = function(t, e, n) {
        t.detachEvent("on" + e, t[e + n]);
        try {
            delete t[e + n]
        } catch (i) {
            t[e + n] = void 0
        }
    });
    var o = {
        bind: n,
        unbind: i
    };
    "function" == typeof define && define.amd ? define(o) : t.eventie = o
}(this),
/*!
 * imagesLoaded v3.0.2
 * JavaScript is all like "You images are done yet or what?"
 */
function(t) {
    "use strict";

    function e(t, e) {
        for (var n in e) t[n] = e[n];
        return t
    }

    function n(t) {
        return "[object Array]" === l.call(t)
    }

    function i(t) {
        var e = [];
        if (n(t)) e = t;
        else if ("number" == typeof t.length)
            for (var i = 0, o = t.length; o > i; i++) e.push(t[i]);
        else e.push(t);
        return e
    }

    function o(t, n) {
        function o(t, n, r) {
            if (!(this instanceof o)) return new o(t, n);
            "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = i(t), this.options = e({}, this.options), "function" == typeof n ? r = n : e(this.options, n), r && this.on("always", r), this.getImages(), a && (this.jqDeferred = new a.Deferred);
            var s = this;
            setTimeout(function() {
                s.check()
            })
        }

        function l(t) {
            this.img = t
        }
        o.prototype = new t, o.prototype.options = {}, o.prototype.getImages = function() {
            this.images = [];
            for (var t = 0, e = this.elements.length; e > t; t++) {
                var n = this.elements[t];
                "IMG" === n.nodeName && this.addImage(n);
                for (var i = n.querySelectorAll("img"), o = 0, a = i.length; a > o; o++) {
                    var r = i[o];
                    this.addImage(r)
                }
            }
        }, o.prototype.addImage = function(t) {
            var e = new l(t);
            this.images.push(e)
        }, o.prototype.check = function() {
            function t(t, o) {
                return e.options.debug && s && r.log("confirm", t, o), e.progress(t), n++, n === i && e.complete(), !0
            }
            var e = this,
                n = 0,
                i = this.images.length;
            if (this.hasAnyBroken = !1, !i) return void this.complete();
            for (var o = 0; i > o; o++) {
                var a = this.images[o];
                a.on("confirm", t), a.check()
            }
        }, o.prototype.progress = function(t) {
            this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emit("progress", this, t), this.jqDeferred && this.jqDeferred.notify(this, t)
        }, o.prototype.complete = function() {
            var t = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emit(t, this), this.emit("always", this), this.jqDeferred) {
                var e = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[e](this)
            }
        }, a && (a.fn.imagesLoaded = function(t, e) {
            var n = new o(this, t, e);
            return n.jqDeferred.promise(a(this))
        });
        var u = {};
        return l.prototype = new t, l.prototype.check = function() {
            var t = u[this.img.src];
            if (t) return void this.useCached(t);
            if (u[this.img.src] = this, this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
            var e = this.proxyImage = new Image;
            n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.img.src
        }, l.prototype.useCached = function(t) {
            if (t.isConfirmed) this.confirm(t.isLoaded, "cached was confirmed");
            else {
                var e = this;
                t.on("confirm", function(t) {
                    return e.confirm(t.isLoaded, "cache emitted confirmed"), !0
                })
            }
        }, l.prototype.confirm = function(t, e) {
            this.isConfirmed = !0, this.isLoaded = t, this.emit("confirm", this, e)
        }, l.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, l.prototype.onload = function() {
            this.confirm(!0, "onload"), this.unbindProxyEvents()
        }, l.prototype.onerror = function() {
            this.confirm(!1, "onerror"), this.unbindProxyEvents()
        }, l.prototype.unbindProxyEvents = function() {
            n.unbind(this.proxyImage, "load", this), n.unbind(this.proxyImage, "error", this)
        }, o
    }
    var a = t.jQuery,
        r = t.console,
        s = "undefined" != typeof r,
        l = Object.prototype.toString;
    "function" == typeof define && define.amd ? define(["eventEmitter", "eventie"], o) : t.imagesLoaded = o(t.EventEmitter, t.eventie)
}(window),
/*!
 * Bridget makes jQuery widgets
 * v1.1.0
 * MIT license
 */
function(t) {
    function e() {}

    function n(t) {
        function n(e) {
            e.prototype.option || (e.prototype.option = function(e) {
                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
            })
        }

        function o(e, n) {
            t.fn[e] = function(o) {
                if ("string" == typeof o) {
                    for (var r = i.call(arguments, 1), s = 0, l = this.length; l > s; s++) {
                        var u = this[s],
                            c = t.data(u, e);
                        if (c)
                            if (t.isFunction(c[o]) && "_" !== o.charAt(0)) {
                                var d = c[o].apply(c, r);
                                if (void 0 !== d) return d
                            } else a("no such method '" + o + "' for " + e + " instance");
                        else a("cannot call methods on " + e + " prior to initialization; attempted to call '" + o + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var i = t.data(this, e);
                    i ? (i.option(o), i._init()) : (i = new n(this, o), t.data(this, e, i))
                })
            }
        }
        if (t) {
            var a = "undefined" == typeof console ? e : function(t) {
                console.error(t)
            };
            return t.bridget = function(t, e) {
                n(e), o(t, e)
            }, t.bridget
        }
    }
    var i = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], n) : n("object" == typeof exports ? require("jquery") : t.jQuery)
}(window),
/*!
 * eventie v1.0.5
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 * MIT license
 */
function(t) {
    function e(e) {
        var n = t.event;
        return n.target = n.target || n.srcElement || e, n
    }
    var n = document.documentElement,
        i = function() {};
    n.addEventListener ? i = function(t, e, n) {
        t.addEventListener(e, n, !1)
    } : n.attachEvent && (i = function(t, n, i) {
        t[n + i] = i.handleEvent ? function() {
            var n = e(t);
            i.handleEvent.call(i, n)
        } : function() {
            var n = e(t);
            i.call(t, n)
        }, t.attachEvent("on" + n, t[n + i])
    });
    var o = function() {};
    n.removeEventListener ? o = function(t, e, n) {
        t.removeEventListener(e, n, !1)
    } : n.detachEvent && (o = function(t, e, n) {
        t.detachEvent("on" + e, t[e + n]);
        try {
            delete t[e + n]
        } catch (i) {
            t[e + n] = void 0
        }
    });
    var a = {
        bind: i,
        unbind: o
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", a) : "object" == typeof exports ? module.exports = a : t.eventie = a
}(this),
/*!
 * docReady v1.0.4
 * Cross browser DOMContentLoaded event emitter
 * MIT license
 */
function(t) {
    function e(t) {
        "function" == typeof t && (e.isReady ? t() : r.push(t))
    }

    function n(t) {
        var n = "readystatechange" === t.type && "complete" !== a.readyState;
        e.isReady || n || i()
    }

    function i() {
        e.isReady = !0;
        for (var t = 0, n = r.length; n > t; t++) {
            var i = r[t];
            i()
        }
    }

    function o(o) {
        return "complete" === a.readyState ? i() : (o.bind(a, "DOMContentLoaded", n), o.bind(a, "readystatechange", n), o.bind(t, "load", n)), e
    }
    var a = t.document,
        r = [];
    e.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], o) : "object" == typeof exports ? module.exports = o(require("eventie")) : t.docReady = o(t.eventie)
}(window),
/*!
 * EventEmitter v4.2.9 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */
function() {
    function t() {}

    function e(t, e) {
        for (var n = t.length; n--;)
            if (t[n].listener === e) return n;
        return -1
    }

    function n(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    var i = t.prototype,
        o = this,
        a = o.EventEmitter;
    i.getListeners = function(t) {
        var e, n, i = this._getEvents();
        if (t instanceof RegExp) {
            e = {};
            for (n in i) i.hasOwnProperty(n) && t.test(n) && (e[n] = i[n])
        } else e = i[t] || (i[t] = []);
        return e
    }, i.flattenListeners = function(t) {
        var e, n = [];
        for (e = 0; e < t.length; e += 1) n.push(t[e].listener);
        return n
    }, i.getListenersAsObject = function(t) {
        var e, n = this.getListeners(t);
        return n instanceof Array && (e = {}, e[t] = n), e || n
    }, i.addListener = function(t, n) {
        var i, o = this.getListenersAsObject(t),
            a = "object" == typeof n;
        for (i in o) o.hasOwnProperty(i) && -1 === e(o[i], n) && o[i].push(a ? n : {
            listener: n,
            once: !1
        });
        return this
    }, i.on = n("addListener"), i.addOnceListener = function(t, e) {
        return this.addListener(t, {
            listener: e,
            once: !0
        })
    }, i.once = n("addOnceListener"), i.defineEvent = function(t) {
        return this.getListeners(t), this
    }, i.defineEvents = function(t) {
        for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
        return this
    }, i.removeListener = function(t, n) {
        var i, o, a = this.getListenersAsObject(t);
        for (o in a) a.hasOwnProperty(o) && (i = e(a[o], n), -1 !== i && a[o].splice(i, 1));
        return this
    }, i.off = n("removeListener"), i.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, i.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, i.manipulateListeners = function(t, e, n) {
        var i, o, a = t ? this.removeListener : this.addListener,
            r = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (i = n.length; i--;) a.call(this, e, n[i]);
        else
            for (i in e) e.hasOwnProperty(i) && (o = e[i]) && ("function" == typeof o ? a.call(this, i, o) : r.call(this, i, o));
        return this
    }, i.removeEvent = function(t) {
        var e, n = typeof t,
            i = this._getEvents();
        if ("string" === n) delete i[t];
        else if (t instanceof RegExp)
            for (e in i) i.hasOwnProperty(e) && t.test(e) && delete i[e];
        else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(t, e) {
        var n, i, o, a, r = this.getListenersAsObject(t);
        for (o in r)
            if (r.hasOwnProperty(o))
                for (i = r[o].length; i--;) n = r[o][i], n.once === !0 && this.removeListener(t, n.listener), a = n.listener.apply(this, e || []), a === this._getOnceReturnValue() && this.removeListener(t, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, i.setOnceReturnValue = function(t) {
        return this._onceReturnValue = t, this
    }, i._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, i._getEvents = function() {
        return this._events || (this._events = {})
    }, t.noConflict = function() {
        return o.EventEmitter = a, t
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : o.EventEmitter = t
}.call(this),
    /*!
     * getStyleProperty v1.0.4
     * original by kangax
     * http://perfectionkills.com/feature-testing-css-properties/
     * MIT license
     */
    function(t) {
        function e(t) {
            if (t) {
                if ("string" == typeof i[t]) return t;
                t = t.charAt(0).toUpperCase() + t.slice(1);
                for (var e, o = 0, a = n.length; a > o; o++)
                    if (e = n[o] + t, "string" == typeof i[e]) return e
            }
        }
        var n = "Webkit Moz ms Ms O".split(" "),
            i = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
            return e
        }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
    }(window),
    /*!
     * getSize v1.2.2
     * measure size of elements
     * MIT license
     */
    function(t, e) {
        function n(t) {
            var e = parseFloat(t),
                n = -1 === t.indexOf("%") && !isNaN(e);
            return n && e
        }

        function i() {}

        function o() {
            for (var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, e = 0, n = s.length; n > e; e++) {
                var i = s[e];
                t[i] = 0
            }
            return t
        }

        function a(e) {
            function i() {
                if (!p) {
                    p = !0;
                    var i = t.getComputedStyle;
                    if (u = function() {
                            var t = i ? function(t) {
                                return i(t, null)
                            } : function(t) {
                                return t.currentStyle
                            };
                            return function(e) {
                                var n = t(e);
                                return n || r("Style returned " + n + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), n
                            }
                        }(), c = e("boxSizing")) {
                        var o = document.createElement("div");
                        o.style.width = "200px", o.style.padding = "1px 2px 3px 4px", o.style.borderStyle = "solid", o.style.borderWidth = "1px 2px 3px 4px", o.style[c] = "border-box";
                        var a = document.body || document.documentElement;
                        a.appendChild(o);
                        var s = u(o);
                        d = 200 === n(s.width), a.removeChild(o)
                    }
                }
            }

            function a(t) {
                if (i(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                    var e = u(t);
                    if ("none" === e.display) return o();
                    var a = {};
                    a.width = t.offsetWidth, a.height = t.offsetHeight;
                    for (var r = a.isBorderBox = !(!c || !e[c] || "border-box" !== e[c]), p = 0, m = s.length; m > p; p++) {
                        var f = s[p],
                            h = e[f];
                        h = l(t, h);
                        var v = parseFloat(h);
                        a[f] = isNaN(v) ? 0 : v
                    }
                    var g = a.paddingLeft + a.paddingRight,
                        y = a.paddingTop + a.paddingBottom,
                        w = a.marginLeft + a.marginRight,
                        b = a.marginTop + a.marginBottom,
                        x = a.borderLeftWidth + a.borderRightWidth,
                        I = a.borderTopWidth + a.borderBottomWidth,
                        C = r && d,
                        S = n(e.width);
                    S !== !1 && (a.width = S + (C ? 0 : g + x));
                    var T = n(e.height);
                    return T !== !1 && (a.height = T + (C ? 0 : y + I)), a.innerWidth = a.width - (g + x), a.innerHeight = a.height - (y + I), a.outerWidth = a.width + w, a.outerHeight = a.height + b, a
                }
            }

            function l(e, n) {
                if (t.getComputedStyle || -1 === n.indexOf("%")) return n;
                var i = e.style,
                    o = i.left,
                    a = e.runtimeStyle,
                    r = a && a.left;
                return r && (a.left = e.currentStyle.left), i.left = n, n = i.pixelLeft, i.left = o, r && (a.left = r), n
            }
            var u, c, d, p = !1;
            return a
        }
        var r = "undefined" == typeof console ? i : function(t) {
                console.error(t)
            },
            s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], a) : "object" == typeof exports ? module.exports = a(require("desandro-get-style-property")) : t.getSize = a(t.getStyleProperty)
    }(window),
    /*!
     * FitVids 1.1
     *
     * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
     * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
     * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
     *
     */
    function(t) {
        "use strict";
        t.fn.fitVids = function(e) {
            var n = {
                customSelector: null,
                ignore: null
            };
            if (!document.getElementById("fit-vids-style")) {
                var i = document.head || document.getElementsByTagName("head")[0],
                    o = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                    a = document.createElement("div");
                a.innerHTML = '<p>x</p><style id="fit-vids-style">' + o + "</style>", i.appendChild(a.childNodes[1])
            }
            return e && t.extend(n, e), this.each(function() {
                var e = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
                n.customSelector && e.push(n.customSelector);
                var i = ".fitvidsignore";
                n.ignore && (i = i + ", " + n.ignore);
                var o = t(this).find(e.join(","));
                o = o.not("object object"), o = o.not(i), o.each(function() {
                    var e = t(this);
                    if (!(e.parents(i).length > 0 || "embed" === this.tagName.toLowerCase() && e.parent("object").length || e.parent(".fluid-width-video-wrapper").length)) {
                        e.css("height") || e.css("width") || !isNaN(e.attr("height")) && !isNaN(e.attr("width")) || (e.attr("height", 9), e.attr("width", 16));
                        var n = "object" === this.tagName.toLowerCase() || e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)) ? parseInt(e.attr("height"), 10) : e.height(),
                            o = isNaN(parseInt(e.attr("width"), 10)) ? e.width() : parseInt(e.attr("width"), 10),
                            a = n / o;
                        if (!e.attr("id")) {
                            var r = "fitvid" + Math.floor(999999 * Math.random());
                            e.attr("id", r)
                        }
                        e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * a + "%"), e.removeAttr("height").removeAttr("width")
                    }
                })
            })
        }
    }(window.jQuery || window.Zepto),
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
    }(function(t) {
        var e, n, i, o, a, r, s = "Close",
            l = "BeforeClose",
            u = "AfterClose",
            c = "BeforeAppend",
            d = "MarkupParse",
            p = "Open",
            m = "Change",
            f = "mfp",
            h = "." + f,
            v = "mfp-ready",
            g = "mfp-removing",
            y = "mfp-prevent-close",
            w = function() {},
            b = !!window.jQuery,
            x = t(window),
            I = function(t, n) {
                e.ev.on(f + t + h, n)
            },
            C = function(e, n, i, o) {
                var a = document.createElement("div");
                return a.className = "mfp-" + e, i && (a.innerHTML = i), o ? n && n.appendChild(a) : (a = t(a), n && a.appendTo(n)), a
            },
            S = function(n, i) {
                e.ev.triggerHandler(f + n, i), e.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), e.st.callbacks[n] && e.st.callbacks[n].apply(e, t.isArray(i) ? i : [i]))
            },
            T = function(n) {
                return n === r && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), r = n), e.currTemplate.closeBtn
            },
            k = function() {
                t.magnificPopup.instance || (e = new w, e.init(), t.magnificPopup.instance = e)
            },
            L = function() {
                var t = document.createElement("p").style,
                    e = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== t.transition) return !0;
                for (; e.length;)
                    if (e.pop() + "Transition" in t) return !0;
                return !1
            };
        w.prototype = {
            constructor: w,
            init: function() {
                var n = navigator.appVersion;
                e.isLowIE = e.isIE8 = document.all && !document.addEventListener, e.isAndroid = /android/gi.test(n), e.isIOS = /iphone|ipad|ipod/gi.test(n), e.supportsTransition = L(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), i = t(document), e.popupsCache = {}
            },
            open: function(n) {
                var o;
                if (n.isObj === !1) {
                    e.items = n.items.toArray(), e.index = 0;
                    var r, s = n.items;
                    for (o = 0; o < s.length; o++)
                        if (r = s[o], r.parsed && (r = r.el[0]), r === n.el[0]) {
                            e.index = o;
                            break
                        }
                } else e.items = t.isArray(n.items) ? n.items : [n.items], e.index = n.index || 0;
                if (e.isOpen) return void e.updateItemHTML();
                e.types = [], a = "", n.mainEl && n.mainEl.length ? e.ev = n.mainEl.eq(0) : e.ev = i, n.key ? (e.popupsCache[n.key] || (e.popupsCache[n.key] = {}), e.currTemplate = e.popupsCache[n.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, n), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = C("bg").on("click" + h, function() {
                    e.close()
                }), e.wrap = C("wrap").attr("tabindex", -1).on("click" + h, function(t) {
                    e._checkIfClose(t.target) && e.close()
                }), e.container = C("container", e.wrap)), e.contentContainer = C("content"), e.st.preloader && (e.preloader = C("preloader", e.container, e.st.tLoading));
                var l = t.magnificPopup.modules;
                for (o = 0; o < l.length; o++) {
                    var u = l[o];
                    u = u.charAt(0).toUpperCase() + u.slice(1), e["init" + u].call(e)
                }
                S("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (I(d, function(t, e, n, i) {
                    n.close_replaceWith = T(i.type)
                }), a += " mfp-close-btn-in") : e.wrap.append(T())), e.st.alignTop && (a += " mfp-align-top"), e.fixedContentPos ? e.wrap.css({
                    overflow: e.st.overflowY,
                    overflowX: "hidden",
                    overflowY: e.st.overflowY
                }) : e.wrap.css({
                    top: x.scrollTop(),
                    position: "absolute"
                }), (e.st.fixedBgPos === !1 || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                    height: i.height(),
                    position: "absolute"
                }), e.st.enableEscapeKey && i.on("keyup" + h, function(t) {
                    27 === t.keyCode && e.close()
                }), x.on("resize" + h, function() {
                    e.updateSize()
                }), e.st.closeOnContentClick || (a += " mfp-auto-cursor"), a && e.wrap.addClass(a);
                var c = e.wH = x.height(),
                    m = {};
                if (e.fixedContentPos && e._hasScrollBar(c)) {
                    var f = e._getScrollbarSize();
                    f && (m.marginRight = f)
                }
                e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : m.overflow = "hidden");
                var g = e.st.mainClass;
                return e.isIE7 && (g += " mfp-ie7"), g && e._addClassToMFP(g), e.updateItemHTML(), S("BuildControls"), t("html").css(m), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function() {
                    e.content ? (e._addClassToMFP(v), e._setFocus()) : e.bgOverlay.addClass(v), i.on("focusin" + h, e._onFocusIn)
                }, 16), e.isOpen = !0, e.updateSize(c), S(p), n
            },
            close: function() {
                e.isOpen && (S(l), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(g), setTimeout(function() {
                    e._close()
                }, e.st.removalDelay)) : e._close())
            },
            _close: function() {
                S(s);
                var n = g + " " + v + " ";
                if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (n += e.st.mainClass + " "), e._removeClassFromMFP(n), e.fixedContentPos) {
                    var o = {
                        marginRight: ""
                    };
                    e.isIE7 ? t("body, html").css("overflow", "") : o.overflow = "", t("html").css(o)
                }
                i.off("keyup" + h + " focusin" + h), e.ev.off(h), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && e.currTemplate[e.currItem.type] !== !0 || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, S(u)
            },
            updateSize: function(t) {
                if (e.isIOS) {
                    var n = document.documentElement.clientWidth / window.innerWidth,
                        i = window.innerHeight * n;
                    e.wrap.css("height", i), e.wH = i
                } else e.wH = t || x.height();
                e.fixedContentPos || e.wrap.css("height", e.wH), S("Resize")
            },
            updateItemHTML: function() {
                var n = e.items[e.index];
                e.contentContainer.detach(), e.content && e.content.detach(), n.parsed || (n = e.parseEl(e.index));
                var i = n.type;
                if (S("BeforeChange", [e.currItem ? e.currItem.type : "", i]), e.currItem = n, !e.currTemplate[i]) {
                    var a = e.st[i] ? e.st[i].markup : !1;
                    S("FirstMarkupParse", a), a ? e.currTemplate[i] = t(a) : e.currTemplate[i] = !0
                }
                o && o !== n.type && e.container.removeClass("mfp-" + o + "-holder");
                var r = e["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, e.currTemplate[i]);
                e.appendContent(r, i), n.preloaded = !0, S(m, n), o = n.type, e.container.prepend(e.contentContainer), S("AfterChange")
            },
            appendContent: function(t, n) {
                e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && e.currTemplate[n] === !0 ? e.content.find(".mfp-close").length || e.content.append(T()) : e.content = t : e.content = "", S(c), e.container.addClass("mfp-" + n + "-holder"), e.contentContainer.append(e.content)
            },
            parseEl: function(n) {
                var i, o = e.items[n];
                if (o.tagName ? o = {
                        el: t(o)
                    } : (i = o.type, o = {
                        data: o,
                        src: o.src
                    }), o.el) {
                    for (var a = e.types, r = 0; r < a.length; r++)
                        if (o.el.hasClass("mfp-" + a[r])) {
                            i = a[r];
                            break
                        }
                    o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
                }
                return o.type = i || e.st.type || "inline", o.index = n, o.parsed = !0, e.items[n] = o, S("ElementParse", o), e.items[n]
            },
            addGroup: function(t, n) {
                var i = function(i) {
                    i.mfpEl = this, e._openClick(i, t, n)
                };
                n || (n = {});
                var o = "click.magnificPopup";
                n.mainEl = t, n.items ? (n.isObj = !0, t.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? t.off(o).on(o, n.delegate, i) : (n.items = t, t.off(o).on(o, i)))
            },
            _openClick: function(n, i, o) {
                var a = void 0 !== o.midClick ? o.midClick : t.magnificPopup.defaults.midClick;
                if (a || !(2 === n.which || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey)) {
                    var r = void 0 !== o.disableOn ? o.disableOn : t.magnificPopup.defaults.disableOn;
                    if (r)
                        if (t.isFunction(r)) {
                            if (!r.call(e)) return !0
                        } else if (x.width() < r) return !0;
                    n.type && (n.preventDefault(), e.isOpen && n.stopPropagation()), o.el = t(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), e.open(o)
                }
            },
            updateStatus: function(t, i) {
                if (e.preloader) {
                    n !== t && e.container.removeClass("mfp-s-" + n), i || "loading" !== t || (i = e.st.tLoading);
                    var o = {
                        status: t,
                        text: i
                    };
                    S("UpdateStatus", o), t = o.status, i = o.text, e.preloader.html(i), e.preloader.find("a").on("click", function(t) {
                        t.stopImmediatePropagation()
                    }), e.container.addClass("mfp-s-" + t), n = t
                }
            },
            _checkIfClose: function(n) {
                if (!t(n).hasClass(y)) {
                    var i = e.st.closeOnContentClick,
                        o = e.st.closeOnBgClick;
                    if (i && o) return !0;
                    if (!e.content || t(n).hasClass("mfp-close") || e.preloader && n === e.preloader[0]) return !0;
                    if (n === e.content[0] || t.contains(e.content[0], n)) {
                        if (i) return !0
                    } else if (o && t.contains(document, n)) return !0;
                    return !1
                }
            },
            _addClassToMFP: function(t) {
                e.bgOverlay.addClass(t), e.wrap.addClass(t)
            },
            _removeClassFromMFP: function(t) {
                this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
            },
            _hasScrollBar: function(t) {
                return (e.isIE7 ? i.height() : document.body.scrollHeight) > (t || x.height())
            },
            _setFocus: function() {
                (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
            },
            _onFocusIn: function(n) {
                return n.target === e.wrap[0] || t.contains(e.wrap[0], n.target) ? void 0 : (e._setFocus(), !1)
            },
            _parseMarkup: function(e, n, i) {
                var o;
                i.data && (n = t.extend(i.data, n)), S(d, [e, n, i]), t.each(n, function(n, i) {
                    if (void 0 === i || i === !1) return !0;
                    if (o = n.split("_"), o.length > 1) {
                        var a = e.find(h + "-" + o[0]);
                        if (a.length > 0) {
                            var r = o[1];
                            "replaceWith" === r ? a[0] !== i[0] && a.replaceWith(i) : "img" === r ? a.is("img") ? a.attr("src", i) : a.replaceWith(t("<img>").attr("src", i).attr("class", a.attr("class"))) : a.attr(o[1], i)
                        }
                    } else e.find(h + "-" + n).html(i)
                })
            },
            _getScrollbarSize: function() {
                if (void 0 === e.scrollbarSize) {
                    var t = document.createElement("div");
                    t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
                }
                return e.scrollbarSize
            }
        }, t.magnificPopup = {
            instance: null,
            proto: w.prototype,
            modules: [],
            open: function(e, n) {
                return k(), e = e ? t.extend(!0, {}, e) : {}, e.isObj = !0, e.index = n || 0, this.instance.open(e)
            },
            close: function() {
                return t.magnificPopup.instance && t.magnificPopup.instance.close()
            },
            registerModule: function(e, n) {
                n.options && (t.magnificPopup.defaults[e] = n.options), t.extend(this.proto, n.proto), this.modules.push(e)
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading...",
                autoFocusLast: !0
            }
        }, t.fn.magnificPopup = function(n) {
            k();
            var i = t(this);
            if ("string" == typeof n)
                if ("open" === n) {
                    var o, a = b ? i.data("magnificPopup") : i[0].magnificPopup,
                        r = parseInt(arguments[1], 10) || 0;
                    a.items ? o = a.items[r] : (o = i, a.delegate && (o = o.find(a.delegate)), o = o.eq(r)), e._openClick({
                        mfpEl: o
                    }, i, a)
                } else e.isOpen && e[n].apply(e, Array.prototype.slice.call(arguments, 1));
            else n = t.extend(!0, {}, n), b ? i.data("magnificPopup", n) : i[0].magnificPopup = n, e.addGroup(i, n);
            return i
        };
        var E, M, P, _ = "inline",
            A = function() {
                P && (M.after(P.addClass(E)).detach(), P = null)
            };
        t.magnificPopup.registerModule(_, {
            options: {
                hiddenClass: "hide",
                markup: "",
                tNotFound: "Content not found"
            },
            proto: {
                initInline: function() {
                    e.types.push(_), I(s + "." + _, function() {
                        A()
                    })
                },
                getInline: function(n, i) {
                    if (A(), n.src) {
                        var o = e.st.inline,
                            a = t(n.src);
                        if (a.length) {
                            var r = a[0].parentNode;
                            r && r.tagName && (M || (E = o.hiddenClass, M = C(E), E = "mfp-" + E), P = a.after(M).detach().removeClass(E)), e.updateStatus("ready")
                        } else e.updateStatus("error", o.tNotFound), a = t("<div>");
                        return n.inlineElement = a, a
                    }
                    return e.updateStatus("ready"), e._parseMarkup(i, {}, n), i
                }
            }
        });
        var z, O = "ajax",
            N = function() {
                z && t(document.body).removeClass(z)
            },
            j = function() {
                N(), e.req && e.req.abort()
            };
        t.magnificPopup.registerModule(O, {
            options: {
                settings: null,
                cursor: "mfp-ajax-cur",
                tError: '<a href="%url%">The content</a> could not be loaded.'
            },
            proto: {
                initAjax: function() {
                    e.types.push(O), z = e.st.ajax.cursor, I(s + "." + O, j), I("BeforeChange." + O, j)
                },
                getAjax: function(n) {
                    z && t(document.body).addClass(z), e.updateStatus("loading");
                    var i = t.extend({
                        url: n.src,
                        success: function(i, o, a) {
                            var r = {
                                data: i,
                                xhr: a
                            };
                            S("ParseAjax", r), e.appendContent(t(r.data), O), n.finished = !0, N(), e._setFocus(), setTimeout(function() {
                                e.wrap.addClass(v)
                            }, 16), e.updateStatus("ready"), S("AjaxContentAdded")
                        },
                        error: function() {
                            N(), n.finished = n.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", n.src))
                        }
                    }, e.st.ajax.settings);
                    return e.req = t.ajax(i), ""
                }
            }
        });
        var D, $ = function(n) {
            if (n.data && void 0 !== n.data.title) return n.data.title;
            var i = e.st.image.titleSrc;
            if (i) {
                if (t.isFunction(i)) return i.call(e, n);
                if (n.el) return n.el.attr(i) || ""
            }
            return ""
        };
        t.magnificPopup.registerModule("image", {
            options: {
                markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                cursor: "mfp-zoom-out-cur",
                titleSrc: "title",
                verticalFit: !0,
                tError: '<a href="%url%">The image</a> could not be loaded.'
            },
            proto: {
                initImage: function() {
                    var n = e.st.image,
                        i = ".image";
                    e.types.push("image"), I(p + i, function() {
                        "image" === e.currItem.type && n.cursor && t(document.body).addClass(n.cursor)
                    }), I(s + i, function() {
                        n.cursor && t(document.body).removeClass(n.cursor), x.off("resize" + h)
                    }), I("Resize" + i, e.resizeImage), e.isLowIE && I("AfterChange", e.resizeImage)
                },
                resizeImage: function() {
                    var t = e.currItem;
                    if (t && t.img && e.st.image.verticalFit) {
                        var n = 0;
                        e.isLowIE && (n = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - n)
                    }
                },
                _onImageHasSize: function(t) {
                    t.img && (t.hasSize = !0, D && clearInterval(D), t.isCheckingImgSize = !1, S("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
                },
                findImageSize: function(t) {
                    var n = 0,
                        i = t.img[0],
                        o = function(a) {
                            D && clearInterval(D), D = setInterval(function() {
                                return i.naturalWidth > 0 ? void e._onImageHasSize(t) : (n > 200 && clearInterval(D), n++, void(3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500)))
                            }, a)
                        };
                    o(1)
                },
                getImage: function(n, i) {
                    var o = 0,
                        a = function() {
                            n && (n.img[0].complete ? (n.img.off(".mfploader"), n === e.currItem && (e._onImageHasSize(n), e.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, S("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(a, 100) : r()))
                        },
                        r = function() {
                            n && (n.img.off(".mfploader"), n === e.currItem && (e._onImageHasSize(n), e.updateStatus("error", s.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
                        },
                        s = e.st.image,
                        l = i.find(".mfp-img");
                    if (l.length) {
                        var u = document.createElement("img");
                        u.className = "mfp-img", n.el && n.el.find("img").length && (u.alt = n.el.find("img").attr("alt")), n.img = t(u).on("load.mfploader", a).on("error.mfploader", r), u.src = n.src, l.is("img") && (n.img = n.img.clone()), u = n.img[0], u.naturalWidth > 0 ? n.hasSize = !0 : u.width || (n.hasSize = !1)
                    }
                    return e._parseMarkup(i, {
                        title: $(n),
                        img_replaceWith: n.img
                    }, n), e.resizeImage(), n.hasSize ? (D && clearInterval(D), n.loadError ? (i.addClass("mfp-loading"), e.updateStatus("error", s.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), e.updateStatus("ready")), i) : (e.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), e.findImageSize(n)), i)
                }
            }
        });
        var W, B = function() {
            return void 0 === W && (W = void 0 !== document.createElement("p").style.MozTransform), W
        };
        t.magnificPopup.registerModule("zoom", {
            options: {
                enabled: !1,
                easing: "ease-in-out",
                duration: 300,
                opener: function(t) {
                    return t.is("img") ? t : t.find("img")
                }
            },
            proto: {
                initZoom: function() {
                    var t, n = e.st.zoom,
                        i = ".zoom";
                    if (n.enabled && e.supportsTransition) {
                        var o, a, r = n.duration,
                            u = function(t) {
                                var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                    i = "all " + n.duration / 1e3 + "s " + n.easing,
                                    o = {
                                        position: "fixed",
                                        zIndex: 9999,
                                        left: 0,
                                        top: 0,
                                        "-webkit-backface-visibility": "hidden"
                                    },
                                    a = "transition";
                                return o["-webkit-" + a] = o["-moz-" + a] = o["-o-" + a] = o[a] = i, e.css(o), e
                            },
                            c = function() {
                                e.content.css("visibility", "visible")
                            };
                        I("BuildControls" + i, function() {
                            if (e._allowZoom()) {
                                if (clearTimeout(o), e.content.css("visibility", "hidden"), t = e._getItemToZoom(), !t) return void c();
                                a = u(t), a.css(e._getOffset()), e.wrap.append(a), o = setTimeout(function() {
                                    a.css(e._getOffset(!0)), o = setTimeout(function() {
                                        c(), setTimeout(function() {
                                            a.remove(), t = a = null, S("ZoomAnimationEnded")
                                        }, 16)
                                    }, r)
                                }, 16)
                            }
                        }), I(l + i, function() {
                            if (e._allowZoom()) {
                                if (clearTimeout(o), e.st.removalDelay = r, !t) {
                                    if (t = e._getItemToZoom(), !t) return;
                                    a = u(t)
                                }
                                a.css(e._getOffset(!0)), e.wrap.append(a), e.content.css("visibility", "hidden"), setTimeout(function() {
                                    a.css(e._getOffset())
                                }, 16)
                            }
                        }), I(s + i, function() {
                            e._allowZoom() && (c(), a && a.remove(), t = null)
                        })
                    }
                },
                _allowZoom: function() {
                    return "image" === e.currItem.type
                },
                _getItemToZoom: function() {
                    return e.currItem.hasSize ? e.currItem.img : !1
                },
                _getOffset: function(n) {
                    var i;
                    i = n ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem);
                    var o = i.offset(),
                        a = parseInt(i.css("padding-top"), 10),
                        r = parseInt(i.css("padding-bottom"), 10);
                    o.top -= t(window).scrollTop() - a;
                    var s = {
                        width: i.width(),
                        height: (b ? i.innerHeight() : i[0].offsetHeight) - r - a
                    };
                    return B() ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left, s.top = o.top), s
                }
            }
        });
        var q = "iframe",
            H = "//about:blank",
            R = function(t) {
                if (e.currTemplate[q]) {
                    var n = e.currTemplate[q].find("iframe");
                    n.length && (t || (n[0].src = H), e.isIE8 && n.css("display", t ? "block" : "none"))
                }
            };
        t.magnificPopup.registerModule(q, {
            options: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: "iframe_src",
                patterns: {
                    youtube: {
                        index: "youtube.com",
                        id: "v=",
                        src: "//www.youtube.com/embed/%id%?autoplay=1"
                    },
                    vimeo: {
                        index: "vimeo.com/",
                        id: "/",
                        src: "//player.vimeo.com/video/%id%?autoplay=1"
                    },
                    gmaps: {
                        index: "//maps.google.",
                        src: "%id%&output=embed"
                    }
                }
            },
            proto: {
                initIframe: function() {
                    e.types.push(q), I("BeforeChange", function(t, e, n) {
                        e !== n && (e === q ? R() : n === q && R(!0))
                    }), I(s + "." + q, function() {
                        R()
                    })
                },
                getIframe: function(n, i) {
                    var o = n.src,
                        a = e.st.iframe;
                    t.each(a.patterns, function() {
                        return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0
                    });
                    var r = {};
                    return a.srcAction && (r[a.srcAction] = o), e._parseMarkup(i, r, n), e.updateStatus("ready"), i
                }
            }
        });
        var F = function(t) {
                var n = e.items.length;
                return t > n - 1 ? t - n : 0 > t ? n + t : t
            },
            V = function(t, e, n) {
                return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, n)
            };
        t.magnificPopup.registerModule("gallery", {
            options: {
                enabled: !1,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: "Previous (Left arrow key)",
                tNext: "Next (Right arrow key)",
                tCounter: "%curr% of %total%"
            },
            proto: {
                initGallery: function() {
                    var n = e.st.gallery,
                        o = ".mfp-gallery";
                    return e.direction = !0, n && n.enabled ? (a += " mfp-gallery", I(p + o, function() {
                        n.navigateByImgClick && e.wrap.on("click" + o, ".mfp-img", function() {
                            return e.items.length > 1 ? (e.next(), !1) : void 0
                        }), i.on("keydown" + o, function(t) {
                            37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
                        })
                    }), I("UpdateStatus" + o, function(t, n) {
                        n.text && (n.text = V(n.text, e.currItem.index, e.items.length))
                    }), I(d + o, function(t, i, o, a) {
                        var r = e.items.length;
                        o.counter = r > 1 ? V(n.tCounter, a.index, r) : ""
                    }), I("BuildControls" + o, function() {
                        if (e.items.length > 1 && n.arrows && !e.arrowLeft) {
                            var i = n.arrowMarkup,
                                o = e.arrowLeft = t(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(y),
                                a = e.arrowRight = t(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(y);
                            o.click(function() {
                                e.prev()
                            }), a.click(function() {
                                e.next()
                            }), e.container.append(o.add(a))
                        }
                    }), I(m + o, function() {
                        e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function() {
                            e.preloadNearbyImages(), e._preloadTimeout = null
                        }, 16)
                    }), void I(s + o, function() {
                        i.off(o), e.wrap.off("click" + o), e.arrowRight = e.arrowLeft = null
                    })) : !1
                },
                next: function() {
                    e.direction = !0, e.index = F(e.index + 1), e.updateItemHTML()
                },
                prev: function() {
                    e.direction = !1, e.index = F(e.index - 1), e.updateItemHTML()
                },
                goTo: function(t) {
                    e.direction = t >= e.index, e.index = t, e.updateItemHTML()
                },
                preloadNearbyImages: function() {
                    var t, n = e.st.gallery.preload,
                        i = Math.min(n[0], e.items.length),
                        o = Math.min(n[1], e.items.length);
                    for (t = 1; t <= (e.direction ? o : i); t++) e._preloadItem(e.index + t);
                    for (t = 1; t <= (e.direction ? i : o); t++) e._preloadItem(e.index - t)
                },
                _preloadItem: function(n) {
                    if (n = F(n), !e.items[n].preloaded) {
                        var i = e.items[n];
                        i.parsed || (i = e.parseEl(n)), S("LazyLoad", i), "image" === i.type && (i.img = t('<img class="mfp-img" />').on("load.mfploader", function() {
                            i.hasSize = !0
                        }).on("error.mfploader", function() {
                            i.hasSize = !0, i.loadError = !0, S("LazyLoadError", i)
                        }).attr("src", i.src)), i.preloaded = !0
                    }
                }
            }
        });
        var U = "retina";
        t.magnificPopup.registerModule(U, {
            options: {
                replaceSrc: function(t) {
                    return t.src.replace(/\.\w+$/, function(t) {
                        return "@2x" + t
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var t = e.st.retina,
                            n = t.ratio;
                        n = isNaN(n) ? n() : n, n > 1 && (I("ImageHasSize." + U, function(t, e) {
                            e.img.css({
                                "max-width": e.img[0].naturalWidth / n,
                                width: "100%"
                            })
                        }), I("ElementParse." + U, function(e, i) {
                            i.src = t.replaceSrc(i, n)
                        }))
                    }
                }
            }
        }), k()
    }),
    /*!
    	Zoom 1.7.15
    	license: MIT
    	http://www.jacklmoore.com/zoom
    */
    function(t) {
        var e = {
            url: !1,
            callback: !1,
            target: !1,
            duration: 120,
            on: "mouseover",
            touch: !0,
            onZoomIn: !1,
            onZoomOut: !1,
            magnify: 1
        };
        t.zoom = function(e, n, i, o) {
            var a, r, s, l, u, c, d, p = t(e),
                m = p.css("position"),
                f = t(n);
            return p.css("position", /(absolute|fixed)/.test(m) ? m : "relative"), p.css("overflow", "hidden"), i.style.width = i.style.height = "", t(i).addClass("zoomImg").css({
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0,
                width: i.width * o,
                height: i.height * o,
                border: "none",
                maxWidth: "none",
                maxHeight: "none"
            }).appendTo(e), {
                init: function() {
                    r = p.outerWidth(), a = p.outerHeight(), n === p[0] ? (l = r, s = a) : (l = f.outerWidth(), s = f.outerHeight()), u = (i.width - r) / l, c = (i.height - a) / s, d = f.offset()
                },
                move: function(t) {
                    var e = t.pageX - d.left,
                        n = t.pageY - d.top;
                    n = Math.max(Math.min(n, s), 0), e = Math.max(Math.min(e, l), 0), i.style.left = e * -u + "px", i.style.top = n * -c + "px"
                }
            }
        }, t.fn.zoom = function(n) {
            return this.each(function() {
                var i, o = t.extend({}, e, n || {}),
                    a = o.target || this,
                    r = this,
                    s = t(r),
                    l = t(a),
                    u = document.createElement("img"),
                    c = t(u),
                    d = "mousemove.zoom",
                    p = !1,
                    m = !1;
                (o.url || (i = s.find("img"), i[0] && (o.url = i.data("src") || i.attr("src")), o.url)) && (! function() {
                    var t = l.css("position"),
                        e = l.css("overflow");
                    s.one("zoom.destroy", function() {
                        s.off(".zoom"), l.css("position", t), l.css("overflow", e), c.remove()
                    })
                }(), u.onload = function() {
                    function e(e) {
                        i.init(), i.move(e), c.stop().fadeTo(t.support.opacity ? o.duration : 0, 1, t.isFunction(o.onZoomIn) ? o.onZoomIn.call(u) : !1)
                    }

                    function n() {
                        c.stop().fadeTo(o.duration, 0, t.isFunction(o.onZoomOut) ? o.onZoomOut.call(u) : !1)
                    }
                    var i = t.zoom(a, r, u, o.magnify);
                    "grab" === o.on ? s.on("mousedown.zoom", function(o) {
                        1 === o.which && (t(document).one("mouseup.zoom", function() {
                            n(), t(document).off(d, i.move)
                        }), e(o), t(document).on(d, i.move), o.preventDefault())
                    }) : "click" === o.on ? s.on("click.zoom", function(o) {
                        return p ? void 0 : (p = !0, e(o), t(document).on(d, i.move), t(document).one("click.zoom", function() {
                            n(), p = !1, t(document).off(d, i.move)
                        }), !1)
                    }) : "toggle" === o.on ? s.on("click.zoom", function(t) {
                        p ? n() : e(t), p = !p
                    }) : "mouseover" === o.on && (i.init(), s.on("mouseenter.zoom", e).on("mouseleave.zoom", n).on(d, i.move)), o.touch && s.on("touchstart.zoom", function(t) {
                        t.preventDefault(), m ? (m = !1, n()) : (m = !0, e(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0]))
                    }).on("touchmove.zoom", function(t) {
                        t.preventDefault(), i.move(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0])
                    }).on("touchend.zoom", function(t) {
                        t.preventDefault(), m && (m = !1, n())
                    }), t.isFunction(o.callback) && o.callback.call(u)
                }, u.src = o.url)
            })
        }, t.fn.zoom.defaults = e
    }(window.jQuery),
    function(t) {
        var e = !0;
        t.flexslider = function(n, i) {
            var o = t(n);
            o.vars = t.extend({}, t.flexslider.defaults, i);
            var a, r = o.vars.namespace,
                s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
                l = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && o.vars.touch,
                u = "click touchend MSPointerUp keyup",
                c = "",
                d = "vertical" === o.vars.direction,
                p = o.vars.reverse,
                m = o.vars.itemWidth > 0,
                f = "fade" === o.vars.animation,
                h = "" !== o.vars.asNavFor,
                v = {};
            t.data(n, "flexslider", o), v = {
                init: function() {
                    o.animating = !1, o.currentSlide = parseInt(o.vars.startAt ? o.vars.startAt : 0, 10), isNaN(o.currentSlide) && (o.currentSlide = 0), o.animatingTo = o.currentSlide, o.atEnd = 0 === o.currentSlide || o.currentSlide === o.last, o.containerSelector = o.vars.selector.substr(0, o.vars.selector.search(" ")), o.slides = t(o.vars.selector, o), o.container = t(o.containerSelector, o), o.count = o.slides.length, o.syncExists = t(o.vars.sync).length > 0, "slide" === o.vars.animation && (o.vars.animation = "swing"), o.prop = d ? "top" : "marginLeft", o.args = {}, o.manualPause = !1, o.stopped = !1, o.started = !1, o.startTimeout = null, o.transitions = !o.vars.video && !f && o.vars.useCSS && function() {
                        var t = document.createElement("div"),
                            e = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                        for (var n in e)
                            if (void 0 !== t.style[e[n]]) return o.pfx = e[n].replace("Perspective", "").toLowerCase(), o.prop = "-" + o.pfx + "-transform", !0;
                        return !1
                    }(), o.ensureAnimationEnd = "", "" !== o.vars.controlsContainer && (o.controlsContainer = t(o.vars.controlsContainer).length > 0 && t(o.vars.controlsContainer)), "" !== o.vars.manualControls && (o.manualControls = t(o.vars.manualControls).length > 0 && t(o.vars.manualControls)), "" !== o.vars.customDirectionNav && (o.customDirectionNav = 2 === t(o.vars.customDirectionNav).length && t(o.vars.customDirectionNav)), o.vars.randomize && (o.slides.sort(function() {
                        return Math.round(Math.random()) - .5
                    }), o.container.empty().append(o.slides)), o.doMath(), o.setup("init"), o.vars.controlNav && v.controlNav.setup(), o.vars.directionNav && v.directionNav.setup(), o.vars.keyboard && (1 === t(o.containerSelector).length || o.vars.multipleKeyboard) && t(document).bind("keyup", function(t) {
                        var e = t.keyCode;
                        if (!o.animating && (39 === e || 37 === e)) {
                            var n = 39 === e ? o.getTarget("next") : 37 === e ? o.getTarget("prev") : !1;
                            o.flexAnimate(n, o.vars.pauseOnAction)
                        }
                    }), o.vars.mousewheel && o.bind("mousewheel", function(t, e, n, i) {
                        t.preventDefault();
                        var a = 0 > e ? o.getTarget("next") : o.getTarget("prev");
                        o.flexAnimate(a, o.vars.pauseOnAction)
                    }), o.vars.pausePlay && v.pausePlay.setup(), o.vars.slideshow && o.vars.pauseInvisible && v.pauseInvisible.init(), o.vars.slideshow && (o.vars.pauseOnHover && o.hover(function() {
                        o.manualPlay || o.manualPause || o.pause()
                    }, function() {
                        o.manualPause || o.manualPlay || o.stopped || o.play()
                    }), o.vars.pauseInvisible && v.pauseInvisible.isHidden() || (o.vars.initDelay > 0 ? o.startTimeout = setTimeout(o.play, o.vars.initDelay) : o.play())), h && v.asNav.setup(), l && o.vars.touch && v.touch(), (!f || f && o.vars.smoothHeight) && t(window).bind("resize orientationchange focus", v.resize), o.find("img").attr("draggable", "false"), setTimeout(function() {
                        o.vars.start(o)
                    }, 200)
                },
                asNav: {
                    setup: function() {
                        o.asNav = !0, o.animatingTo = Math.floor(o.currentSlide / o.move), o.currentItem = o.currentSlide, o.slides.removeClass(r + "active-slide").eq(o.currentItem).addClass(r + "active-slide"), s ? (n._slider = o, o.slides.each(function() {
                            var e = this;
                            e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function(t) {
                                t.preventDefault(), t.currentTarget._gesture && t.currentTarget._gesture.addPointer(t.pointerId)
                            }, !1), e.addEventListener("MSGestureTap", function(e) {
                                e.preventDefault();
                                var n = t(this),
                                    i = n.index();
                                t(o.vars.asNavFor).data("flexslider").animating || n.hasClass("active") || (o.direction = o.currentItem < i ? "next" : "prev", o.flexAnimate(i, o.vars.pauseOnAction, !1, !0, !0))
                            })
                        })) : o.slides.on(u, function(e) {
                            e.preventDefault();
                            var n = t(this),
                                i = n.index(),
                                a = n.offset().left - t(o).scrollLeft();
                            0 >= a && n.hasClass(r + "active-slide") ? o.flexAnimate(o.getTarget("prev"), !0) : t(o.vars.asNavFor).data("flexslider").animating || n.hasClass(r + "active-slide") || (o.direction = o.currentItem < i ? "next" : "prev", o.flexAnimate(i, o.vars.pauseOnAction, !1, !0, !0))
                        })
                    }
                },
                controlNav: {
                    setup: function() {
                        o.manualControls ? v.controlNav.setupManual() : v.controlNav.setupPaging()
                    },
                    setupPaging: function() {
                        var e, n, i = "thumbnails" === o.vars.controlNav ? "control-thumbs" : "control-paging",
                            a = 1;
                        if (o.controlNavScaffold = t('<ol class="' + r + "control-nav " + r + i + '"></ol>'), o.pagingCount > 1)
                            for (var s = 0; s < o.pagingCount; s++) {
                                if (n = o.slides.eq(s), void 0 === n.attr("data-thumb-alt") && n.attr("data-thumb-alt", ""), altText = "" !== n.attr("data-thumb-alt") ? altText = ' alt="' + n.attr("data-thumb-alt") + '"' : "", e = "thumbnails" === o.vars.controlNav ? '<img src="' + n.attr("data-thumb") + '"' + altText + "/>" : '<a href="#">' + a + "</a>", "thumbnails" === o.vars.controlNav && !0 === o.vars.thumbCaptions) {
                                    var l = n.attr("data-thumbcaption");
                                    "" !== l && void 0 !== l && (e += '<span class="' + r + 'caption">' + l + "</span>")
                                }
                                o.controlNavScaffold.append("<li>" + e + "</li>"), a++
                            }
                        o.controlsContainer ? t(o.controlsContainer).append(o.controlNavScaffold) : o.append(o.controlNavScaffold), v.controlNav.set(), v.controlNav.active(), o.controlNavScaffold.delegate("a, img", u, function(e) {
                            if (e.preventDefault(), "" === c || c === e.type) {
                                var n = t(this),
                                    i = o.controlNav.index(n);
                                n.hasClass(r + "active") || (o.direction = i > o.currentSlide ? "next" : "prev", o.flexAnimate(i, o.vars.pauseOnAction))
                            }
                            "" === c && (c = e.type), v.setToClearWatchedEvent()
                        })
                    },
                    setupManual: function() {
                        o.controlNav = o.manualControls, v.controlNav.active(), o.controlNav.bind(u, function(e) {
                            if (e.preventDefault(), "" === c || c === e.type) {
                                var n = t(this),
                                    i = o.controlNav.index(n);
                                n.hasClass(r + "active") || (i > o.currentSlide ? o.direction = "next" : o.direction = "prev", o.flexAnimate(i, o.vars.pauseOnAction))
                            }
                            "" === c && (c = e.type), v.setToClearWatchedEvent()
                        })
                    },
                    set: function() {
                        var e = "thumbnails" === o.vars.controlNav ? "img" : "a";
                        o.controlNav = t("." + r + "control-nav li " + e, o.controlsContainer ? o.controlsContainer : o)
                    },
                    active: function() {
                        o.controlNav.removeClass(r + "active").eq(o.animatingTo).addClass(r + "active")
                    },
                    update: function(e, n) {
                        o.pagingCount > 1 && "add" === e ? o.controlNavScaffold.append(t('<li><a href="#">' + o.count + "</a></li>")) : 1 === o.pagingCount ? o.controlNavScaffold.find("li").remove() : o.controlNav.eq(n).closest("li").remove(), v.controlNav.set(), o.pagingCount > 1 && o.pagingCount !== o.controlNav.length ? o.update(n, e) : v.controlNav.active()
                    }
                },
                directionNav: {
                    setup: function() {
                        var e = t('<ul class="' + r + 'direction-nav"><li class="' + r + 'nav-prev"><a class="' + r + 'prev" href="#">' + o.vars.prevText + '</a></li><li class="' + r + 'nav-next"><a class="' + r + 'next" href="#">' + o.vars.nextText + "</a></li></ul>");
                        o.customDirectionNav ? o.directionNav = o.customDirectionNav : o.controlsContainer ? (t(o.controlsContainer).append(e), o.directionNav = t("." + r + "direction-nav li a", o.controlsContainer)) : (o.append(e), o.directionNav = t("." + r + "direction-nav li a", o)), v.directionNav.update(), o.directionNav.bind(u, function(e) {
                            e.preventDefault();
                            var n;
                            "" !== c && c !== e.type || (n = t(this).hasClass(r + "next") ? o.getTarget("next") : o.getTarget("prev"), o.flexAnimate(n, o.vars.pauseOnAction)), "" === c && (c = e.type), v.setToClearWatchedEvent()
                        })
                    },
                    update: function() {
                        var t = r + "disabled";
                        1 === o.pagingCount ? o.directionNav.addClass(t).attr("tabindex", "-1") : o.vars.animationLoop ? o.directionNav.removeClass(t).removeAttr("tabindex") : 0 === o.animatingTo ? o.directionNav.removeClass(t).filter("." + r + "prev").addClass(t).attr("tabindex", "-1") : o.animatingTo === o.last ? o.directionNav.removeClass(t).filter("." + r + "next").addClass(t).attr("tabindex", "-1") : o.directionNav.removeClass(t).removeAttr("tabindex")
                    }
                },
                pausePlay: {
                    setup: function() {
                        var e = t('<div class="' + r + 'pauseplay"><a href="#"></a></div>');
                        o.controlsContainer ? (o.controlsContainer.append(e), o.pausePlay = t("." + r + "pauseplay a", o.controlsContainer)) : (o.append(e), o.pausePlay = t("." + r + "pauseplay a", o)), v.pausePlay.update(o.vars.slideshow ? r + "pause" : r + "play"), o.pausePlay.bind(u, function(e) {
                            e.preventDefault(), "" !== c && c !== e.type || (t(this).hasClass(r + "pause") ? (o.manualPause = !0, o.manualPlay = !1, o.pause()) : (o.manualPause = !1, o.manualPlay = !0, o.play())), "" === c && (c = e.type), v.setToClearWatchedEvent()
                        })
                    },
                    update: function(t) {
                        "play" === t ? o.pausePlay.removeClass(r + "pause").addClass(r + "play").html(o.vars.playText) : o.pausePlay.removeClass(r + "play").addClass(r + "pause").html(o.vars.pauseText)
                    }
                },
                touch: function() {
                    function t(t) {
                        t.stopPropagation(), o.animating ? t.preventDefault() : (o.pause(), n._gesture.addPointer(t.pointerId), I = 0, u = d ? o.h : o.w, h = Number(new Date), l = m && p && o.animatingTo === o.last ? 0 : m && p ? o.limit - (o.itemW + o.vars.itemMargin) * o.move * o.animatingTo : m && o.currentSlide === o.last ? o.limit : m ? (o.itemW + o.vars.itemMargin) * o.move * o.currentSlide : p ? (o.last - o.currentSlide + o.cloneOffset) * u : (o.currentSlide + o.cloneOffset) * u)
                    }

                    function e(t) {
                        t.stopPropagation();
                        var e = t.target._slider;
                        if (e) {
                            var i = -t.translationX,
                                o = -t.translationY;
                            return I += d ? o : i, c = I, w = d ? Math.abs(I) < Math.abs(-i) : Math.abs(I) < Math.abs(-o), t.detail === t.MSGESTURE_FLAG_INERTIA ? void setImmediate(function() {
                                n._gesture.stop()
                            }) : void((!w || Number(new Date) - h > 500) && (t.preventDefault(), !f && e.transitions && (e.vars.animationLoop || (c = I / (0 === e.currentSlide && 0 > I || e.currentSlide === e.last && I > 0 ? Math.abs(I) / u + 2 : 1)), e.setProps(l + c, "setTouch"))))
                        }
                    }

                    function i(t) {
                        t.stopPropagation();
                        var e = t.target._slider;
                        if (e) {
                            if (e.animatingTo === e.currentSlide && !w && null !== c) {
                                var n = p ? -c : c,
                                    i = n > 0 ? e.getTarget("next") : e.getTarget("prev");
                                e.canAdvance(i) && (Number(new Date) - h < 550 && Math.abs(n) > 50 || Math.abs(n) > u / 2) ? e.flexAnimate(i, e.vars.pauseOnAction) : f || e.flexAnimate(e.currentSlide, e.vars.pauseOnAction, !0)
                            }
                            a = null, r = null, c = null, l = null, I = 0
                        }
                    }
                    var a, r, l, u, c, h, v, g, y, w = !1,
                        b = 0,
                        x = 0,
                        I = 0;
                    s ? (n.style.msTouchAction = "none", n._gesture = new MSGesture, n._gesture.target = n, n.addEventListener("MSPointerDown", t, !1), n._slider = o, n.addEventListener("MSGestureChange", e, !1), n.addEventListener("MSGestureEnd", i, !1)) : (v = function(t) {
                        o.animating ? t.preventDefault() : (window.navigator.msPointerEnabled || 1 === t.touches.length) && (o.pause(), u = d ? o.h : o.w, h = Number(new Date), b = t.touches[0].pageX, x = t.touches[0].pageY, l = m && p && o.animatingTo === o.last ? 0 : m && p ? o.limit - (o.itemW + o.vars.itemMargin) * o.move * o.animatingTo : m && o.currentSlide === o.last ? o.limit : m ? (o.itemW + o.vars.itemMargin) * o.move * o.currentSlide : p ? (o.last - o.currentSlide + o.cloneOffset) * u : (o.currentSlide + o.cloneOffset) * u, a = d ? x : b, r = d ? b : x, n.addEventListener("touchmove", g, !1), n.addEventListener("touchend", y, !1))
                    }, g = function(t) {
                        b = t.touches[0].pageX, x = t.touches[0].pageY, c = d ? a - x : a - b, w = d ? Math.abs(c) < Math.abs(b - r) : Math.abs(c) < Math.abs(x - r);
                        var e = 500;
                        (!w || Number(new Date) - h > e) && (t.preventDefault(), !f && o.transitions && (o.vars.animationLoop || (c /= 0 === o.currentSlide && 0 > c || o.currentSlide === o.last && c > 0 ? Math.abs(c) / u + 2 : 1), o.setProps(l + c, "setTouch")))
                    }, y = function(t) {
                        if (n.removeEventListener("touchmove", g, !1), o.animatingTo === o.currentSlide && !w && null !== c) {
                            var e = p ? -c : c,
                                i = e > 0 ? o.getTarget("next") : o.getTarget("prev");
                            o.canAdvance(i) && (Number(new Date) - h < 550 && Math.abs(e) > 50 || Math.abs(e) > u / 2) ? o.flexAnimate(i, o.vars.pauseOnAction) : f || o.flexAnimate(o.currentSlide, o.vars.pauseOnAction, !0)
                        }
                        n.removeEventListener("touchend", y, !1), a = null, r = null, c = null, l = null
                    }, n.addEventListener("touchstart", v, !1))
                },
                resize: function() {
                    !o.animating && o.is(":visible") && (m || o.doMath(), f ? v.smoothHeight() : m ? (o.slides.width(o.computedW), o.update(o.pagingCount), o.setProps()) : d ? (o.viewport.height(o.h), o.setProps(o.h, "setTotal")) : (o.vars.smoothHeight && v.smoothHeight(), o.newSlides.width(o.computedW), o.setProps(o.computedW, "setTotal")))
                },
                smoothHeight: function(t) {
                    if (!d || f) {
                        var e = f ? o : o.viewport;
                        t ? e.animate({
                            height: o.slides.eq(o.animatingTo).height()
                        }, t) : e.height(o.slides.eq(o.animatingTo).height())
                    }
                },
                sync: function(e) {
                    var n = t(o.vars.sync).data("flexslider"),
                        i = o.animatingTo;
                    switch (e) {
                        case "animate":
                            n.flexAnimate(i, o.vars.pauseOnAction, !1, !0);
                            break;
                        case "play":
                            n.playing || n.asNav || n.play();
                            break;
                        case "pause":
                            n.pause()
                    }
                },
                uniqueID: function(e) {
                    return e.filter("[id]").add(e.find("[id]")).each(function() {
                        var e = t(this);
                        e.attr("id", e.attr("id") + "_clone")
                    }), e
                },
                pauseInvisible: {
                    visProp: null,
                    init: function() {
                        var t = v.pauseInvisible.getHiddenProp();
                        if (t) {
                            var e = t.replace(/[H|h]idden/, "") + "visibilitychange";
                            document.addEventListener(e, function() {
                                v.pauseInvisible.isHidden() ? o.startTimeout ? clearTimeout(o.startTimeout) : o.pause() : o.started ? o.play() : o.vars.initDelay > 0 ? setTimeout(o.play, o.vars.initDelay) : o.play()
                            })
                        }
                    },
                    isHidden: function() {
                        var t = v.pauseInvisible.getHiddenProp();
                        return t ? document[t] : !1
                    },
                    getHiddenProp: function() {
                        var t = ["webkit", "moz", "ms", "o"];
                        if ("hidden" in document) return "hidden";
                        for (var e = 0; e < t.length; e++)
                            if (t[e] + "Hidden" in document) return t[e] + "Hidden";
                        return null
                    }
                },
                setToClearWatchedEvent: function() {
                    clearTimeout(a), a = setTimeout(function() {
                        c = ""
                    }, 3e3)
                }
            }, o.flexAnimate = function(e, n, i, a, s) {
                if (o.vars.animationLoop || e === o.currentSlide || (o.direction = e > o.currentSlide ? "next" : "prev"), h && 1 === o.pagingCount && (o.direction = o.currentItem < e ? "next" : "prev"), !o.animating && (o.canAdvance(e, s) || i) && o.is(":visible")) {
                    if (h && a) {
                        var u = t(o.vars.asNavFor).data("flexslider");
                        if (o.atEnd = 0 === e || e === o.count - 1, u.flexAnimate(e, !0, !1, !0, s), o.direction = o.currentItem < e ? "next" : "prev", u.direction = o.direction, Math.ceil((e + 1) / o.visible) - 1 === o.currentSlide || 0 === e) return o.currentItem = e, o.slides.removeClass(r + "active-slide").eq(e).addClass(r + "active-slide"), !1;
                        o.currentItem = e, o.slides.removeClass(r + "active-slide").eq(e).addClass(r + "active-slide"), e = Math.floor(e / o.visible)
                    }
                    if (o.animating = !0, o.animatingTo = e, n && o.pause(), o.vars.before(o), o.syncExists && !s && v.sync("animate"), o.vars.controlNav && v.controlNav.active(), m || o.slides.removeClass(r + "active-slide").eq(e).addClass(r + "active-slide"), o.atEnd = 0 === e || e === o.last, o.vars.directionNav && v.directionNav.update(), e === o.last && (o.vars.end(o), o.vars.animationLoop || o.pause()), f) l ? (o.slides.eq(o.currentSlide).css({
                        opacity: 0,
                        zIndex: 1
                    }), o.slides.eq(e).css({
                        opacity: 1,
                        zIndex: 2
                    }), o.wrapup(w)) : (o.slides.eq(o.currentSlide).css({
                        zIndex: 1
                    }).animate({
                        opacity: 0
                    }, o.vars.animationSpeed, o.vars.easing), o.slides.eq(e).css({
                        zIndex: 2
                    }).animate({
                        opacity: 1
                    }, o.vars.animationSpeed, o.vars.easing, o.wrapup));
                    else {
                        var c, g, y, w = d ? o.slides.filter(":first").height() : o.computedW;
                        m ? (c = o.vars.itemMargin, y = (o.itemW + c) * o.move * o.animatingTo, g = y > o.limit && 1 !== o.visible ? o.limit : y) : g = 0 === o.currentSlide && e === o.count - 1 && o.vars.animationLoop && "next" !== o.direction ? p ? (o.count + o.cloneOffset) * w : 0 : o.currentSlide === o.last && 0 === e && o.vars.animationLoop && "prev" !== o.direction ? p ? 0 : (o.count + 1) * w : p ? (o.count - 1 - e + o.cloneOffset) * w : (e + o.cloneOffset) * w, o.setProps(g, "", o.vars.animationSpeed), o.transitions ? (o.vars.animationLoop && o.atEnd || (o.animating = !1, o.currentSlide = o.animatingTo), o.container.unbind("webkitTransitionEnd transitionend"), o.container.bind("webkitTransitionEnd transitionend", function() {
                            clearTimeout(o.ensureAnimationEnd), o.wrapup(w)
                        }), clearTimeout(o.ensureAnimationEnd), o.ensureAnimationEnd = setTimeout(function() {
                            o.wrapup(w)
                        }, o.vars.animationSpeed + 100)) : o.container.animate(o.args, o.vars.animationSpeed, o.vars.easing, function() {
                            o.wrapup(w)
                        })
                    }
                    o.vars.smoothHeight && v.smoothHeight(o.vars.animationSpeed)
                }
            }, o.wrapup = function(t) {
                f || m || (0 === o.currentSlide && o.animatingTo === o.last && o.vars.animationLoop ? o.setProps(t, "jumpEnd") : o.currentSlide === o.last && 0 === o.animatingTo && o.vars.animationLoop && o.setProps(t, "jumpStart")), o.animating = !1, o.currentSlide = o.animatingTo, o.vars.after(o)
            }, o.animateSlides = function() {
                !o.animating && e && o.flexAnimate(o.getTarget("next"))
            }, o.pause = function() {
                clearInterval(o.animatedSlides), o.animatedSlides = null, o.playing = !1, o.vars.pausePlay && v.pausePlay.update("play"), o.syncExists && v.sync("pause")
            }, o.play = function() {
                o.playing && clearInterval(o.animatedSlides), o.animatedSlides = o.animatedSlides || setInterval(o.animateSlides, o.vars.slideshowSpeed), o.started = o.playing = !0, o.vars.pausePlay && v.pausePlay.update("pause"), o.syncExists && v.sync("play")
            }, o.stop = function() {
                o.pause(), o.stopped = !0
            }, o.canAdvance = function(t, e) {
                var n = h ? o.pagingCount - 1 : o.last;
                return e ? !0 : h && o.currentItem === o.count - 1 && 0 === t && "prev" === o.direction ? !0 : h && 0 === o.currentItem && t === o.pagingCount - 1 && "next" !== o.direction ? !1 : t !== o.currentSlide || h ? o.vars.animationLoop ? !0 : o.atEnd && 0 === o.currentSlide && t === n && "next" !== o.direction ? !1 : !o.atEnd || o.currentSlide !== n || 0 !== t || "next" !== o.direction : !1
            }, o.getTarget = function(t) {
                return o.direction = t, "next" === t ? o.currentSlide === o.last ? 0 : o.currentSlide + 1 : 0 === o.currentSlide ? o.last : o.currentSlide - 1
            }, o.setProps = function(t, e, n) {
                var i = function() {
                    var n = t ? t : (o.itemW + o.vars.itemMargin) * o.move * o.animatingTo,
                        i = function() {
                            if (m) return "setTouch" === e ? t : p && o.animatingTo === o.last ? 0 : p ? o.limit - (o.itemW + o.vars.itemMargin) * o.move * o.animatingTo : o.animatingTo === o.last ? o.limit : n;
                            switch (e) {
                                case "setTotal":
                                    return p ? (o.count - 1 - o.currentSlide + o.cloneOffset) * t : (o.currentSlide + o.cloneOffset) * t;
                                case "setTouch":
                                    return p ? t : t;
                                case "jumpEnd":
                                    return p ? t : o.count * t;
                                case "jumpStart":
                                    return p ? o.count * t : t;
                                default:
                                    return t
                            }
                        }();
                    return -1 * i + "px"
                }();
                o.transitions && (i = d ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", n = void 0 !== n ? n / 1e3 + "s" : "0s", o.container.css("-" + o.pfx + "-transition-duration", n), o.container.css("transition-duration", n)), o.args[o.prop] = i, (o.transitions || void 0 === n) && o.container.css(o.args), o.container.css("transform", i)
            }, o.setup = function(e) {
                if (f) o.slides.css({
                    width: "100%",
                    "float": "left",
                    marginRight: "-100%",
                    position: "relative"
                }), "init" === e && (l ? o.slides.css({
                    opacity: 0,
                    display: "block",
                    webkitTransition: "opacity " + o.vars.animationSpeed / 1e3 + "s ease",
                    zIndex: 1
                }).eq(o.currentSlide).css({
                    opacity: 1,
                    zIndex: 2
                }) : 0 == o.vars.fadeFirstSlide ? o.slides.css({
                    opacity: 0,
                    display: "block",
                    zIndex: 1
                }).eq(o.currentSlide).css({
                    zIndex: 2
                }).css({
                    opacity: 1
                }) : o.slides.css({
                    opacity: 0,
                    display: "block",
                    zIndex: 1
                }).eq(o.currentSlide).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, o.vars.animationSpeed, o.vars.easing)), o.vars.smoothHeight && v.smoothHeight();
                else {
                    var n, i;
                    "init" === e && (o.viewport = t('<div class="' + r + 'viewport"></div>').css({
                        overflow: "hidden",
                        position: "relative"
                    }).appendTo(o).append(o.container), o.cloneCount = 0, o.cloneOffset = 0, p && (i = t.makeArray(o.slides).reverse(), o.slides = t(i), o.container.empty().append(o.slides))), o.vars.animationLoop && !m && (o.cloneCount = 2, o.cloneOffset = 1, "init" !== e && o.container.find(".clone").remove(), o.container.append(v.uniqueID(o.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(v.uniqueID(o.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), o.newSlides = t(o.vars.selector, o), n = p ? o.count - 1 - o.currentSlide + o.cloneOffset : o.currentSlide + o.cloneOffset, d && !m ? (o.container.height(200 * (o.count + o.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                        o.newSlides.css({
                            display: "block"
                        }), o.doMath(), o.viewport.height(o.h), o.setProps(n * o.h, "init")
                    }, "init" === e ? 100 : 0)) : (o.container.width(200 * (o.count + o.cloneCount) + "%"), o.setProps(n * o.computedW, "init"), setTimeout(function() {
                        o.doMath(), o.newSlides.css({
                            width: o.computedW,
                            marginRight: o.computedM,
                            "float": "left",
                            display: "block"
                        }), o.vars.smoothHeight && v.smoothHeight()
                    }, "init" === e ? 100 : 0))
                }
                m || o.slides.removeClass(r + "active-slide").eq(o.currentSlide).addClass(r + "active-slide"), o.vars.init(o)
            }, o.doMath = function() {
                var t = o.slides.first(),
                    e = o.vars.itemMargin,
                    n = o.vars.minItems,
                    i = o.vars.maxItems;
                o.w = void 0 === o.viewport ? o.width() : o.viewport.width(), o.h = t.height(), o.boxPadding = t.outerWidth() - t.width(), m ? (o.itemT = o.vars.itemWidth + e, o.itemM = e, o.minW = n ? n * o.itemT : o.w, o.maxW = i ? i * o.itemT - e : o.w, o.itemW = o.minW > o.w ? (o.w - e * (n - 1)) / n : o.maxW < o.w ? (o.w - e * (i - 1)) / i : o.vars.itemWidth > o.w ? o.w : o.vars.itemWidth, o.visible = Math.floor(o.w / o.itemW), o.move = o.vars.move > 0 && o.vars.move < o.visible ? o.vars.move : o.visible, o.pagingCount = Math.ceil((o.count - o.visible) / o.move + 1), o.last = o.pagingCount - 1, o.limit = 1 === o.pagingCount ? 0 : o.vars.itemWidth > o.w ? o.itemW * (o.count - 1) + e * (o.count - 1) : (o.itemW + e) * o.count - o.w - e) : (o.itemW = o.w, o.itemM = e, o.pagingCount = o.count, o.last = o.count - 1), o.computedW = o.itemW - o.boxPadding, o.computedM = o.itemM
            }, o.update = function(t, e) {
                o.doMath(), m || (t < o.currentSlide ? o.currentSlide += 1 : t <= o.currentSlide && 0 !== t && (o.currentSlide -= 1), o.animatingTo = o.currentSlide), o.vars.controlNav && !o.manualControls && ("add" === e && !m || o.pagingCount > o.controlNav.length ? v.controlNav.update("add") : ("remove" === e && !m || o.pagingCount < o.controlNav.length) && (m && o.currentSlide > o.last && (o.currentSlide -= 1, o.animatingTo -= 1), v.controlNav.update("remove", o.last))), o.vars.directionNav && v.directionNav.update()
            }, o.addSlide = function(e, n) {
                var i = t(e);
                o.count += 1, o.last = o.count - 1, d && p ? void 0 !== n ? o.slides.eq(o.count - n).after(i) : o.container.prepend(i) : void 0 !== n ? o.slides.eq(n).before(i) : o.container.append(i), o.update(n, "add"), o.slides = t(o.vars.selector + ":not(.clone)", o), o.setup(), o.vars.added(o)
            }, o.removeSlide = function(e) {
                var n = isNaN(e) ? o.slides.index(t(e)) : e;
                o.count -= 1, o.last = o.count - 1, isNaN(e) ? t(e, o.slides).remove() : d && p ? o.slides.eq(o.last).remove() : o.slides.eq(e).remove(), o.doMath(), o.update(n, "remove"), o.slides = t(o.vars.selector + ":not(.clone)", o), o.setup(), o.vars.removed(o)
            }, v.init()
        }, t(window).blur(function(t) {
            e = !1
        }).focus(function(t) {
            e = !0
        }), t.flexslider.defaults = {
            namespace: "flex-",
            selector: ".slides > li",
            animation: "fade",
            easing: "swing",
            direction: "horizontal",
            reverse: !1,
            animationLoop: !0,
            smoothHeight: !1,
            startAt: 0,
            slideshow: !0,
            slideshowSpeed: 7e3,
            animationSpeed: 600,
            initDelay: 0,
            randomize: !1,
            fadeFirstSlide: !0,
            thumbCaptions: !1,
            pauseOnAction: !0,
            pauseOnHover: !1,
            pauseInvisible: !0,
            useCSS: !0,
            touch: !0,
            video: !1,
            controlNav: !0,
            directionNav: !0,
            prevText: "Previous",
            nextText: "Next",
            keyboard: !0,
            multipleKeyboard: !1,
            mousewheel: !1,
            pausePlay: !1,
            pauseText: "Pause",
            playText: "Play",
            controlsContainer: "",
            manualControls: "",
            customDirectionNav: "",
            sync: "",
            asNavFor: "",
            itemWidth: 0,
            itemMargin: 0,
            minItems: 1,
            maxItems: 0,
            move: 0,
            allowOneSlide: !0,
            start: function() {},
            before: function() {},
            after: function() {},
            end: function() {},
            added: function() {},
            removed: function() {},
            init: function() {}
        }, t.fn.flexslider = function(e) {
            if (void 0 === e && (e = {}), "object" == typeof e) return this.each(function() {
                var n = t(this),
                    i = e.selector ? e.selector : ".slides > li",
                    o = n.find(i);
                1 === o.length && e.allowOneSlide === !0 || 0 === o.length ? (o.fadeIn(400), e.start && e.start(n)) : void 0 === n.data("flexslider") && new t.flexslider(this, e)
            });
            var n = t(this).data("flexslider");
            switch (e) {
                case "play":
                    n.play();
                    break;
                case "pause":
                    n.pause();
                    break;
                case "stop":
                    n.stop();
                    break;
                case "next":
                    n.flexAnimate(n.getTarget("next"), !0);
                    break;
                case "prev":
                case "previous":
                    n.flexAnimate(n.getTarget("prev"), !0);
                    break;
                default:
                    "number" == typeof e && n.flexAnimate(e, !0)
            }
        }
    }(jQuery),
    /*
     *  jQuery OwlCarousel v1.3.3
     *
     *  Copyright (c) 2013 Bartosz Wojciechowski
     *  http://www.owlgraphic.com/owlcarousel/
     *
     *  Licensed under MIT
     *
     */
    "function" != typeof Object.create && (Object.create = function(t) {
        function e() {}
        return e.prototype = t, new e
    }),
    function(t, e, n) {
        var i = {
            init: function(e, n) {
                var i = this;
                i.$elem = t(n), i.options = t.extend({}, t.fn.owlCarousel.options, i.$elem.data(), e), i.userOptions = e, i.loadContent()
            },
            loadContent: function() {
                function e(t) {
                    var e, n = "";
                    if ("function" == typeof i.options.jsonSuccess) i.options.jsonSuccess.apply(this, [t]);
                    else {
                        for (e in t.owl) t.owl.hasOwnProperty(e) && (n += t.owl[e].item);
                        i.$elem.html(n)
                    }
                    i.logIn()
                }
                var n, i = this;
                "function" == typeof i.options.beforeInit && i.options.beforeInit.apply(this, [i.$elem]), "string" == typeof i.options.jsonPath ? (n = i.options.jsonPath, t.getJSON(n, e)) : i.logIn()
            },
            logIn: function() {
                var t = this;
                t.$elem.data("owl-originalStyles", t.$elem.attr("style")), t.$elem.data("owl-originalClasses", t.$elem.attr("class")), t.$elem.css({
                    opacity: 0
                }), t.orignalItems = t.options.items, t.checkBrowser(), t.wrapperWidth = 0, t.checkVisible = null, t.setVars()
            },
            setVars: function() {
                var t = this;
                return 0 === t.$elem.children().length ? !1 : (t.baseClass(), t.eventTypes(), t.$userItems = t.$elem.children(), t.itemsAmount = t.$userItems.length, t.wrapItems(), t.$owlItems = t.$elem.find(".owl-item"), t.$owlWrapper = t.$elem.find(".owl-wrapper"), t.playDirection = "next", t.prevItem = 0, t.prevArr = [0], t.currentItem = 0, t.customEvents(), void t.onStartup())
            },
            onStartup: function() {
                var t = this;
                t.updateItems(), t.calculateAll(), t.buildControls(), t.updateControls(), t.response(), t.moveEvents(), t.stopOnHover(), t.owlStatus(), t.options.transitionStyle !== !1 && t.transitionTypes(t.options.transitionStyle), t.options.autoPlay === !0 && (t.options.autoPlay = 5e3), t.play(), t.$elem.find(".owl-wrapper").css("display", "block"), t.$elem.is(":visible") ? t.$elem.css("opacity", 1) : t.watchVisibility(), t.onstartup = !1, t.eachMoveUpdate(), "function" == typeof t.options.afterInit && t.options.afterInit.apply(this, [t.$elem])
            },
            eachMoveUpdate: function() {
                var t = this;
                t.options.lazyLoad === !0 && t.lazyLoad(), t.options.autoHeight === !0 && t.autoHeight(), t.onVisibleItems(), "function" == typeof t.options.afterAction && t.options.afterAction.apply(this, [t.$elem])
            },
            updateVars: function() {
                var t = this;
                "function" == typeof t.options.beforeUpdate && t.options.beforeUpdate.apply(this, [t.$elem]), t.watchVisibility(), t.updateItems(), t.calculateAll(), t.updatePosition(), t.updateControls(), t.eachMoveUpdate(), "function" == typeof t.options.afterUpdate && t.options.afterUpdate.apply(this, [t.$elem])
            },
            reload: function() {
                var t = this;
                e.setTimeout(function() {
                    t.updateVars()
                }, 0)
            },
            watchVisibility: function() {
                var t = this;
                return t.$elem.is(":visible") !== !1 ? !1 : (t.$elem.css({
                    opacity: 0
                }), e.clearInterval(t.autoPlayInterval), e.clearInterval(t.checkVisible), void(t.checkVisible = e.setInterval(function() {
                    t.$elem.is(":visible") && (t.reload(), t.$elem.animate({
                        opacity: 1
                    }, 200), e.clearInterval(t.checkVisible))
                }, 500)))
            },
            wrapItems: function() {
                var t = this;
                t.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), t.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), t.wrapperOuter = t.$elem.find(".owl-wrapper-outer"), t.$elem.css("display", "block")
            },
            baseClass: function() {
                var t = this,
                    e = t.$elem.hasClass(t.options.baseClass),
                    n = t.$elem.hasClass(t.options.theme);
                e || t.$elem.addClass(t.options.baseClass), n || t.$elem.addClass(t.options.theme)
            },
            updateItems: function() {
                var e, n, i = this;
                if (i.options.responsive === !1) return !1;
                if (i.options.singleItem === !0) return i.options.items = i.orignalItems = 1, i.options.itemsCustom = !1, i.options.itemsDesktop = !1, i.options.itemsDesktopSmall = !1, i.options.itemsTablet = !1, i.options.itemsTabletSmall = !1, i.options.itemsMobile = !1, !1;
                if (e = t(i.options.responsiveBaseWidth).width(), e > (i.options.itemsDesktop[0] || i.orignalItems) && (i.options.items = i.orignalItems), i.options.itemsCustom !== !1)
                    for (i.options.itemsCustom.sort(function(t, e) {
                            return t[0] - e[0]
                        }), n = 0; n < i.options.itemsCustom.length; n += 1) i.options.itemsCustom[n][0] <= e && (i.options.items = i.options.itemsCustom[n][1]);
                else e <= i.options.itemsDesktop[0] && i.options.itemsDesktop !== !1 && (i.options.items = i.options.itemsDesktop[1]), e <= i.options.itemsDesktopSmall[0] && i.options.itemsDesktopSmall !== !1 && (i.options.items = i.options.itemsDesktopSmall[1]), e <= i.options.itemsTablet[0] && i.options.itemsTablet !== !1 && (i.options.items = i.options.itemsTablet[1]), e <= i.options.itemsTabletSmall[0] && i.options.itemsTabletSmall !== !1 && (i.options.items = i.options.itemsTabletSmall[1]), e <= i.options.itemsMobile[0] && i.options.itemsMobile !== !1 && (i.options.items = i.options.itemsMobile[1]);
                i.options.items > i.itemsAmount && i.options.itemsScaleUp === !0 && (i.options.items = i.itemsAmount)
            },
            response: function() {
                var n, i, o = this;
                return o.options.responsive !== !0 ? !1 : (i = t(e).width(), o.resizer = function() {
                    t(e).width() !== i && (o.options.autoPlay !== !1 && e.clearInterval(o.autoPlayInterval), e.clearTimeout(n), n = e.setTimeout(function() {
                        i = t(e).width(), o.updateVars()
                    }, o.options.responsiveRefreshRate))
                }, void t(e).resize(o.resizer))
            },
            updatePosition: function() {
                var t = this;
                t.jumpTo(t.currentItem), t.options.autoPlay !== !1 && t.checkAp()
            },
            appendItemsSizes: function() {
                var e = this,
                    n = 0,
                    i = e.itemsAmount - e.options.items;
                e.$owlItems.each(function(o) {
                    var a = t(this);
                    a.css({
                        width: e.itemWidth
                    }).data("owl-item", Number(o)), o % e.options.items !== 0 && o !== i || o > i || (n += 1), a.data("owl-roundPages", n)
                })
            },
            appendWrapperSizes: function() {
                var t = this,
                    e = t.$owlItems.length * t.itemWidth;
                t.$owlWrapper.css({
                    width: 2 * e,
                    left: 0
                }), t.appendItemsSizes()
            },
            calculateAll: function() {
                var t = this;
                t.calculateWidth(), t.appendWrapperSizes(), t.loops(), t.max()
            },
            calculateWidth: function() {
                var t = this;
                t.itemWidth = Math.round(t.$elem.width() / t.options.items)
            },
            max: function() {
                var t = this,
                    e = -1 * (t.itemsAmount * t.itemWidth - t.options.items * t.itemWidth);
                return t.options.items > t.itemsAmount ? (t.maximumItem = 0, e = 0, t.maximumPixels = 0) : (t.maximumItem = t.itemsAmount - t.options.items, t.maximumPixels = e), e
            },
            min: function() {
                return 0
            },
            loops: function() {
                var e, n, i, o = this,
                    a = 0,
                    r = 0;
                for (o.positionsInArray = [0], o.pagesInArray = [], e = 0; e < o.itemsAmount; e += 1) r += o.itemWidth, o.positionsInArray.push(-r), o.options.scrollPerPage === !0 && (n = t(o.$owlItems[e]), i = n.data("owl-roundPages"), i !== a && (o.pagesInArray[a] = o.positionsInArray[e], a = i))
            },
            buildControls: function() {
                var e = this;
                e.options.navigation !== !0 && e.options.pagination !== !0 || (e.owlControls = t('<div class="owl-controls"/>').toggleClass("clickable", !e.browser.isTouch).appendTo(e.$elem)), e.options.pagination === !0 && e.buildPagination(), e.options.navigation === !0 && e.buildButtons()
            },
            buildButtons: function() {
                var e = this,
                    n = t('<div class="owl-buttons"/>');
                e.owlControls.append(n), e.buttonPrev = t("<div/>", {
                    "class": "owl-prev",
                    html: e.options.navigationText[0] || ""
                }), e.buttonNext = t("<div/>", {
                    "class": "owl-next",
                    html: e.options.navigationText[1] || ""
                }), n.append(e.buttonPrev).append(e.buttonNext), n.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(t) {
                    t.preventDefault()
                }), n.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(n) {
                    n.preventDefault(), t(this).hasClass("owl-next") ? e.next() : e.prev()
                })
            },
            buildPagination: function() {
                var e = this;
                e.paginationWrapper = t('<div class="owl-pagination"/>'), e.owlControls.append(e.paginationWrapper), e.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(n) {
                    n.preventDefault(), Number(t(this).data("owl-page")) !== e.currentItem && e.goTo(Number(t(this).data("owl-page")), !0)
                })
            },
            updatePagination: function() {
                var e, n, i, o, a, r, s = this;
                if (s.options.pagination === !1) return !1;
                for (s.paginationWrapper.html(""), e = 0, n = s.itemsAmount - s.itemsAmount % s.options.items, o = 0; o < s.itemsAmount; o += 1) o % s.options.items === 0 && (e += 1, n === o && (i = s.itemsAmount - s.options.items), a = t("<div/>", {
                    "class": "owl-page"
                }), r = t("<span></span>", {
                    text: s.options.paginationNumbers === !0 ? e : "",
                    "class": s.options.paginationNumbers === !0 ? "owl-numbers" : ""
                }), a.append(r), a.data("owl-page", n === o ? i : o), a.data("owl-roundPages", e), s.paginationWrapper.append(a));
                s.checkPagination()
            },
            checkPagination: function() {
                var e = this;
                return e.options.pagination === !1 ? !1 : void e.paginationWrapper.find(".owl-page").each(function() {
                    t(this).data("owl-roundPages") === t(e.$owlItems[e.currentItem]).data("owl-roundPages") && (e.paginationWrapper.find(".owl-page").removeClass("active"), t(this).addClass("active"))
                })
            },
            checkNavigation: function() {
                var t = this;
                return t.options.navigation === !1 ? !1 : void(t.options.rewindNav === !1 && (0 === t.currentItem && 0 === t.maximumItem ? (t.buttonPrev.addClass("disabled"), t.buttonNext.addClass("disabled")) : 0 === t.currentItem && 0 !== t.maximumItem ? (t.buttonPrev.addClass("disabled"), t.buttonNext.removeClass("disabled")) : t.currentItem === t.maximumItem ? (t.buttonPrev.removeClass("disabled"), t.buttonNext.addClass("disabled")) : 0 !== t.currentItem && t.currentItem !== t.maximumItem && (t.buttonPrev.removeClass("disabled"), t.buttonNext.removeClass("disabled"))))
            },
            updateControls: function() {
                var t = this;
                t.updatePagination(), t.checkNavigation(), t.owlControls && (t.options.items >= t.itemsAmount ? t.owlControls.hide() : t.owlControls.show())
            },
            destroyControls: function() {
                var t = this;
                t.owlControls && t.owlControls.remove()
            },
            next: function(t) {
                var e = this;
                if (e.isTransition) return !1;
                if (e.currentItem += e.options.scrollPerPage === !0 ? e.options.items : 1, e.currentItem > e.maximumItem + (e.options.scrollPerPage === !0 ? e.options.items - 1 : 0)) {
                    if (e.options.rewindNav !== !0) return e.currentItem = e.maximumItem, !1;
                    e.currentItem = 0, t = "rewind"
                }
                e.goTo(e.currentItem, t)
            },
            prev: function(t) {
                var e = this;
                if (e.isTransition) return !1;
                if (e.options.scrollPerPage === !0 && e.currentItem > 0 && e.currentItem < e.options.items ? e.currentItem = 0 : e.currentItem -= e.options.scrollPerPage === !0 ? e.options.items : 1, e.currentItem < 0) {
                    if (e.options.rewindNav !== !0) return e.currentItem = 0, !1;
                    e.currentItem = e.maximumItem, t = "rewind"
                }
                e.goTo(e.currentItem, t)
            },
            goTo: function(t, n, i) {
                var o, a = this;
                return a.isTransition ? !1 : ("function" == typeof a.options.beforeMove && a.options.beforeMove.apply(this, [a.$elem]), t >= a.maximumItem ? t = a.maximumItem : 0 >= t && (t = 0), a.currentItem = a.owl.currentItem = t, a.options.transitionStyle !== !1 && "drag" !== i && 1 === a.options.items && a.browser.support3d === !0 ? (a.swapSpeed(0), a.browser.support3d === !0 ? a.transition3d(a.positionsInArray[t]) : a.css2slide(a.positionsInArray[t], 1), a.afterGo(), a.singleItemTransition(), !1) : (o = a.positionsInArray[t], a.browser.support3d === !0 ? (a.isCss3Finish = !1, n === !0 ? (a.swapSpeed("paginationSpeed"), e.setTimeout(function() {
                    a.isCss3Finish = !0
                }, a.options.paginationSpeed)) : "rewind" === n ? (a.swapSpeed(a.options.rewindSpeed), e.setTimeout(function() {
                    a.isCss3Finish = !0
                }, a.options.rewindSpeed)) : (a.swapSpeed("slideSpeed"), e.setTimeout(function() {
                    a.isCss3Finish = !0
                }, a.options.slideSpeed)), a.transition3d(o)) : n === !0 ? a.css2slide(o, a.options.paginationSpeed) : "rewind" === n ? a.css2slide(o, a.options.rewindSpeed) : a.css2slide(o, a.options.slideSpeed), void a.afterGo()))
            },
            jumpTo: function(t) {
                var e = this;
                "function" == typeof e.options.beforeMove && e.options.beforeMove.apply(this, [e.$elem]), t >= e.maximumItem || -1 === t ? t = e.maximumItem : 0 >= t && (t = 0), e.swapSpeed(0), e.browser.support3d === !0 ? e.transition3d(e.positionsInArray[t]) : e.css2slide(e.positionsInArray[t], 1), e.currentItem = e.owl.currentItem = t, e.afterGo()
            },
            afterGo: function() {
                var t = this;
                t.prevArr.push(t.currentItem), t.prevItem = t.owl.prevItem = t.prevArr[t.prevArr.length - 2], t.prevArr.shift(0), t.prevItem !== t.currentItem && (t.checkPagination(), t.checkNavigation(), t.eachMoveUpdate(), t.options.autoPlay !== !1 && t.checkAp()), "function" == typeof t.options.afterMove && t.prevItem !== t.currentItem && t.options.afterMove.apply(this, [t.$elem])
            },
            stop: function() {
                var t = this;
                t.apStatus = "stop", e.clearInterval(t.autoPlayInterval)
            },
            checkAp: function() {
                var t = this;
                "stop" !== t.apStatus && t.play()
            },
            play: function() {
                var t = this;
                return t.apStatus = "play", t.options.autoPlay === !1 ? !1 : (e.clearInterval(t.autoPlayInterval), void(t.autoPlayInterval = e.setInterval(function() {
                    t.next(!0)
                }, t.options.autoPlay)))
            },
            swapSpeed: function(t) {
                var e = this;
                "slideSpeed" === t ? e.$owlWrapper.css(e.addCssSpeed(e.options.slideSpeed)) : "paginationSpeed" === t ? e.$owlWrapper.css(e.addCssSpeed(e.options.paginationSpeed)) : "string" != typeof t && e.$owlWrapper.css(e.addCssSpeed(t))
            },
            addCssSpeed: function(t) {
                return {
                    "-webkit-transition": "all " + t + "ms ease",
                    "-moz-transition": "all " + t + "ms ease",
                    "-o-transition": "all " + t + "ms ease",
                    transition: "all " + t + "ms ease"
                }
            },
            removeTransition: function() {
                return {
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-o-transition": "",
                    transition: ""
                }
            },
            doTranslate: function(t) {
                return {
                    "-webkit-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-moz-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-o-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-ms-transform": "translate3d(" + t + "px, 0px, 0px)",
                    transform: "translate3d(" + t + "px, 0px,0px)"
                }
            },
            transition3d: function(t) {
                var e = this;
                e.$owlWrapper.css(e.doTranslate(t))
            },
            css2move: function(t) {
                var e = this;
                e.$owlWrapper.css({
                    left: t
                })
            },
            css2slide: function(t, e) {
                var n = this;
                n.isCssFinish = !1, n.$owlWrapper.stop(!0, !0).animate({
                    left: t
                }, {
                    duration: e || n.options.slideSpeed,
                    complete: function() {
                        n.isCssFinish = !0
                    }
                })
            },
            checkBrowser: function() {
                var t, i, o, a, r = this,
                    s = "translate3d(0px, 0px, 0px)",
                    l = n.createElement("div");
                l.style.cssText = "  -moz-transform:" + s + "; -ms-transform:" + s + "; -o-transform:" + s + "; -webkit-transform:" + s + "; transform:" + s, t = /translate3d\(0px, 0px, 0px\)/g, i = l.style.cssText.match(t), o = null !== i && 1 === i.length, a = "ontouchstart" in e || e.navigator.msMaxTouchPoints, r.browser = {
                    support3d: o,
                    isTouch: a
                }
            },
            moveEvents: function() {
                var t = this;
                t.options.mouseDrag === !1 && t.options.touchDrag === !1 || (t.gestures(), t.disabledEvents())
            },
            eventTypes: function() {
                var t = this,
                    e = ["s", "e", "x"];
                t.ev_types = {}, t.options.mouseDrag === !0 && t.options.touchDrag === !0 ? e = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : t.options.mouseDrag === !1 && t.options.touchDrag === !0 ? e = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : t.options.mouseDrag === !0 && t.options.touchDrag === !1 && (e = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), t.ev_types.start = e[0], t.ev_types.move = e[1], t.ev_types.end = e[2]
            },
            disabledEvents: function() {
                var e = this;
                e.$elem.on("dragstart.owl", function(t) {
                    t.preventDefault()
                }), e.$elem.on("mousedown.disableTextSelect", function(e) {
                    return t(e.target).is("input, textarea, select, option")
                })
            },
            gestures: function() {
                function i(t) {
                    if (void 0 !== t.touches) return {
                        x: t.touches[0].pageX,
                        y: t.touches[0].pageY
                    };
                    if (void 0 === t.touches) {
                        if (void 0 !== t.pageX) return {
                            x: t.pageX,
                            y: t.pageY
                        };
                        if (void 0 === t.pageX) return {
                            x: t.clientX,
                            y: t.clientY
                        }
                    }
                }

                function o(e) {
                    "on" === e ? (t(n).on(l.ev_types.move, r), t(n).on(l.ev_types.end, s)) : "off" === e && (t(n).off(l.ev_types.move), t(n).off(l.ev_types.end))
                }

                function a(n) {
                    var a, r = n.originalEvent || n || e.event;
                    if (3 === r.which) return !1;
                    if (!(l.itemsAmount <= l.options.items)) {
                        if (l.isCssFinish === !1 && !l.options.dragBeforeAnimFinish) return !1;
                        if (l.isCss3Finish === !1 && !l.options.dragBeforeAnimFinish) return !1;
                        l.options.autoPlay !== !1 && e.clearInterval(l.autoPlayInterval), l.browser.isTouch === !0 || l.$owlWrapper.hasClass("grabbing") || l.$owlWrapper.addClass("grabbing"), l.newPosX = 0, l.newRelativeX = 0, t(this).css(l.removeTransition()), a = t(this).position(), u.relativePos = a.left, u.offsetX = i(r).x - a.left, u.offsetY = i(r).y - a.top, o("on"), u.sliding = !1, u.targetElement = r.target || r.srcElement
                    }
                }

                function r(o) {
                    var a, r, s = o.originalEvent || o || e.event;
                    l.newPosX = i(s).x - u.offsetX, l.newPosY = i(s).y - u.offsetY, l.newRelativeX = l.newPosX - u.relativePos, "function" == typeof l.options.startDragging && u.dragging !== !0 && 0 !== l.newRelativeX && (u.dragging = !0, l.options.startDragging.apply(l, [l.$elem])), (l.newRelativeX > 8 || l.newRelativeX < -8) && l.browser.isTouch === !0 && (void 0 !== s.preventDefault ? s.preventDefault() : s.returnValue = !1, u.sliding = !0), (l.newPosY > 10 || l.newPosY < -10) && u.sliding === !1 && t(n).off("touchmove.owl"), a = function() {
                        return l.newRelativeX / 5
                    }, r = function() {
                        return l.maximumPixels + l.newRelativeX / 5
                    }, l.newPosX = Math.max(Math.min(l.newPosX, a()), r()), l.browser.support3d === !0 ? l.transition3d(l.newPosX) : l.css2move(l.newPosX)
                }

                function s(n) {
                    var i, a, r, s = n.originalEvent || n || e.event;
                    s.target = s.target || s.srcElement, u.dragging = !1, l.browser.isTouch !== !0 && l.$owlWrapper.removeClass("grabbing"), l.newRelativeX < 0 ? l.dragDirection = l.owl.dragDirection = "left" : l.dragDirection = l.owl.dragDirection = "right", 0 !== l.newRelativeX && (i = l.getNewPosition(), l.goTo(i, !1, "drag"), u.targetElement === s.target && l.browser.isTouch !== !0 && (t(s.target).on("click.disable", function(e) {
                        e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), t(e.target).off("click.disable")
                    }), a = t._data(s.target, "events").click, r = a.pop(), a.splice(0, 0, r))), o("off")
                }
                var l = this,
                    u = {
                        offsetX: 0,
                        offsetY: 0,
                        baseElWidth: 0,
                        relativePos: 0,
                        position: null,
                        minSwipe: null,
                        maxSwipe: null,
                        sliding: null,
                        dargging: null,
                        targetElement: null
                    };
                l.isCssFinish = !0, l.$elem.on(l.ev_types.start, ".owl-wrapper", a)
            },
            getNewPosition: function() {
                var t = this,
                    e = t.closestItem();
                return e > t.maximumItem ? (t.currentItem = t.maximumItem, e = t.maximumItem) : t.newPosX >= 0 && (e = 0, t.currentItem = 0), e
            },
            closestItem: function() {
                var e = this,
                    n = e.options.scrollPerPage === !0 ? e.pagesInArray : e.positionsInArray,
                    i = e.newPosX,
                    o = null;
                return t.each(n, function(a, r) {
                    i - e.itemWidth / 20 > n[a + 1] && i - e.itemWidth / 20 < r && "left" === e.moveDirection() ? (o = r, e.options.scrollPerPage === !0 ? e.currentItem = t.inArray(o, e.positionsInArray) : e.currentItem = a) : i + e.itemWidth / 20 < r && i + e.itemWidth / 20 > (n[a + 1] || n[a] - e.itemWidth) && "right" === e.moveDirection() && (e.options.scrollPerPage === !0 ? (o = n[a + 1] || n[n.length - 1], e.currentItem = t.inArray(o, e.positionsInArray)) : (o = n[a + 1], e.currentItem = a + 1))
                }), e.currentItem
            },
            moveDirection: function() {
                var t, e = this;
                return e.newRelativeX < 0 ? (t = "right", e.playDirection = "next") : (t = "left", e.playDirection = "prev"), t
            },
            customEvents: function() {
                var t = this;
                t.$elem.on("owl.next", function() {
                    t.next()
                }), t.$elem.on("owl.prev", function() {
                    t.prev()
                }), t.$elem.on("owl.play", function(e, n) {
                    t.options.autoPlay = n, t.play(), t.hoverStatus = "play"
                }), t.$elem.on("owl.stop", function() {
                    t.stop(), t.hoverStatus = "stop"
                }), t.$elem.on("owl.goTo", function(e, n) {
                    t.goTo(n)
                }), t.$elem.on("owl.jumpTo", function(e, n) {
                    t.jumpTo(n)
                })
            },
            stopOnHover: function() {
                var t = this;
                t.options.stopOnHover === !0 && t.browser.isTouch !== !0 && t.options.autoPlay !== !1 && (t.$elem.on("mouseover", function() {
                    t.stop()
                }), t.$elem.on("mouseout", function() {
                    "stop" !== t.hoverStatus && t.play()
                }))
            },
            lazyLoad: function() {
                var e, n, i, o, a, r = this;
                if (r.options.lazyLoad === !1) return !1;
                for (e = 0; e < r.itemsAmount; e += 1) n = t(r.$owlItems[e]), "loaded" !== n.data("owl-loaded") && (i = n.data("owl-item"), o = n.find(".lazyOwl"), "string" == typeof o.data("src") ? (void 0 === n.data("owl-loaded") && (o.hide(), n.addClass("loading").data("owl-loaded", "checked")), a = r.options.lazyFollow === !0 ? i >= r.currentItem : !0, a && i < r.currentItem + r.options.items && o.length && r.lazyPreload(n, o)) : n.data("owl-loaded", "loaded"))
            },
            lazyPreload: function(t, n) {
                function i() {
                    t.data("owl-loaded", "loaded").removeClass("loading"), n.removeAttr("data-src"), "fade" === r.options.lazyEffect ? n.fadeIn(400) : n.show(), "function" == typeof r.options.afterLazyLoad && r.options.afterLazyLoad.apply(this, [r.$elem])
                }

                function o() {
                    s += 1, r.completeImg(n.get(0)) || a === !0 ? i() : 100 >= s ? e.setTimeout(o, 100) : i()
                }
                var a, r = this,
                    s = 0;
                "DIV" === n.prop("tagName") ? (n.css("background-image", "url(" + n.data("src") + ")"), a = !0) : n[0].src = n.data("src"), o()
            },
            autoHeight: function() {
                function n() {
                    var n = t(a.$owlItems[a.currentItem]).height();
                    a.wrapperOuter.css("height", n + "px"), a.wrapperOuter.hasClass("autoHeight") || e.setTimeout(function() {
                        a.wrapperOuter.addClass("autoHeight")
                    }, 0)
                }

                function i() {
                    o += 1, a.completeImg(r.get(0)) ? n() : 100 >= o ? e.setTimeout(i, 100) : a.wrapperOuter.css("height", "")
                }
                var o, a = this,
                    r = t(a.$owlItems[a.currentItem]).find("img");
                void 0 !== r.get(0) ? (o = 0, i()) : n()
            },
            completeImg: function(t) {
                var e;
                return t.complete ? (e = typeof t.naturalWidth, "undefined" === e || 0 !== t.naturalWidth) : !1
            },
            onVisibleItems: function() {
                var e, n = this;
                for (n.options.addClassActive === !0 && n.$owlItems.removeClass("active"), n.visibleItems = [], e = n.currentItem; e < n.currentItem + n.options.items; e += 1) n.visibleItems.push(e), n.options.addClassActive === !0 && t(n.$owlItems[e]).addClass("active");
                n.owl.visibleItems = n.visibleItems
            },
            transitionTypes: function(t) {
                var e = this;
                e.outClass = "owl-" + t + "-out", e.inClass = "owl-" + t + "-in"
            },
            singleItemTransition: function() {
                function t(t) {
                    return {
                        position: "relative",
                        left: t + "px"
                    }
                }
                var e = this,
                    n = e.outClass,
                    i = e.inClass,
                    o = e.$owlItems.eq(e.currentItem),
                    a = e.$owlItems.eq(e.prevItem),
                    r = Math.abs(e.positionsInArray[e.currentItem]) + e.positionsInArray[e.prevItem],
                    s = Math.abs(e.positionsInArray[e.currentItem]) + e.itemWidth / 2,
                    l = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
                e.isTransition = !0, e.$owlWrapper.addClass("owl-origin").css({
                    "-webkit-transform-origin": s + "px",
                    "-moz-perspective-origin": s + "px",
                    "perspective-origin": s + "px"
                }), a.css(t(r, 10)).addClass(n).on(l, function() {
                    e.endPrev = !0, a.off(l), e.clearTransStyle(a, n)
                }), o.addClass(i).on(l, function() {
                    e.endCurrent = !0, o.off(l), e.clearTransStyle(o, i)
                })
            },
            clearTransStyle: function(t, e) {
                var n = this;
                t.css({
                    position: "",
                    left: ""
                }).removeClass(e), n.endPrev && n.endCurrent && (n.$owlWrapper.removeClass("owl-origin"), n.endPrev = !1, n.endCurrent = !1, n.isTransition = !1)
            },
            owlStatus: function() {
                var t = this;
                t.owl = {
                    userOptions: t.userOptions,
                    baseElement: t.$elem,
                    userItems: t.$userItems,
                    owlItems: t.$owlItems,
                    currentItem: t.currentItem,
                    prevItem: t.prevItem,
                    visibleItems: t.visibleItems,
                    isTouch: t.browser.isTouch,
                    browser: t.browser,
                    dragDirection: t.dragDirection
                }
            },
            clearEvents: function() {
                var i = this;
                i.$elem.off(".owl owl mousedown.disableTextSelect"), t(n).off(".owl owl"), t(e).off("resize", i.resizer)
            },
            unWrap: function() {
                var t = this;
                0 !== t.$elem.children().length && (t.$owlWrapper.unwrap(), t.$userItems.unwrap().unwrap(), t.owlControls && t.owlControls.remove()), t.clearEvents(), t.$elem.attr("style", t.$elem.data("owl-originalStyles") || "").attr("class", t.$elem.data("owl-originalClasses"))
            },
            destroy: function() {
                var t = this;
                t.stop(), e.clearInterval(t.checkVisible), t.unWrap(), t.$elem.removeData()
            },
            reinit: function(e) {
                var n = this,
                    i = t.extend({}, n.userOptions, e);
                n.unWrap(), n.init(i, n.$elem)
            },
            addItem: function(t, e) {
                var n, i = this;
                return t ? 0 === i.$elem.children().length ? (i.$elem.append(t), i.setVars(), !1) : (i.unWrap(), n = void 0 === e || -1 === e ? -1 : e, n >= i.$userItems.length || -1 === n ? i.$userItems.eq(-1).after(t) : i.$userItems.eq(n).before(t), void i.setVars()) : !1
            },
            removeItem: function(t) {
                var e, n = this;
                return 0 === n.$elem.children().length ? !1 : (e = void 0 === t || -1 === t ? -1 : t, n.unWrap(), n.$userItems.eq(e).remove(), void n.setVars())
            }
        };
        t.fn.owlCarousel = function(e) {
            return this.each(function() {
                if (t(this).data("owl-init") === !0) return !1;
                t(this).data("owl-init", !0);
                var n = Object.create(i);
                n.init(e, this), t.data(this, "owlCarousel", n)
            })
        }, t.fn.owlCarousel.options = {
            items: 5,
            itemsCustom: !1,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: !1,
            itemsMobile: [479, 1],
            singleItem: !1,
            itemsScaleUp: !1,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1e3,
            autoPlay: !1,
            stopOnHover: !1,
            navigation: !1,
            navigationText: ["prev", "next"],
            rewindNav: !0,
            scrollPerPage: !1,
            pagination: !0,
            paginationNumbers: !1,
            responsive: !0,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: e,
            baseClass: "owl-carousel",
            theme: "owl-theme",
            lazyLoad: !1,
            lazyFollow: !0,
            lazyEffect: "fade",
            autoHeight: !1,
            jsonPath: !1,
            jsonSuccess: !1,
            dragBeforeAnimFinish: !0,
            mouseDrag: !0,
            touchDrag: !0,
            addClassActive: !1,
            transitionStyle: !1,
            beforeUpdate: !1,
            afterUpdate: !1,
            beforeInit: !1,
            afterInit: !1,
            beforeMove: !1,
            afterMove: !1,
            afterAction: !1,
            startDragging: !1,
            afterLazyLoad: !1
        }
    }(jQuery, window, document),
    /*!
     *    WOW plugin
     *    Version: 1.1.2
     */
    function() {
        var t, e, n = function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        };
        t = function() {
            function t() {}
            return t.prototype.extend = function(t, e) {
                var n, i;
                for (n in t) i = t[n], null != i && (e[n] = i);
                return e
            }, t.prototype.isMobile = function(t) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
            }, t
        }(), e = this.WeakMap || (e = function() {
            function t() {
                this.keys = [], this.values = []
            }
            return t.prototype.get = function(t) {
                var e, n, i, o, a;
                for (a = this.keys, e = i = 0, o = a.length; o > i; e = ++i)
                    if (n = a[e], n === t) return this.values[e]
            }, t.prototype.set = function(t, e) {
                var n, i, o, a, r;
                for (r = this.keys, n = o = 0, a = r.length; a > o; n = ++o)
                    if (i = r[n], i === t) return void(this.values[n] = e);
                return this.keys.push(t), this.values.push(e)
            }, t
        }()), this.WOW = function() {
            function i(t) {
                null == t && (t = {}), this.scrollCallback = n(this.scrollCallback, this), this.scrollHandler = n(this.scrollHandler, this), this.start = n(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), this.animationNameCache = new e
            }
            return i.prototype.defaults = {
                boxClass: "wow",
                animateClass: "animated",
                offset: 0,
                mobile: !0
            }, i.prototype.init = function() {
                var t;
                return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : document.addEventListener("DOMContentLoaded", this.start)
            }, i.prototype.start = function() {
                var t, e, n, i;
                if (this.boxes = this.element.getElementsByClassName(this.config.boxClass), this.boxes.length) {
                    if (this.disabled()) return this.resetStyle();
                    for (i = this.boxes, e = 0, n = i.length; n > e; e++) t = i[e], this.applyStyle(t, !0);
                    return window.addEventListener("scroll", this.scrollHandler, !1), window.addEventListener("resize", this.scrollHandler, !1), this.interval = setInterval(this.scrollCallback, 50)
                }
            }, i.prototype.stop = function() {
                return window.removeEventListener("scroll", this.scrollHandler, !1), window.removeEventListener("resize", this.scrollHandler, !1), null != this.interval ? clearInterval(this.interval) : void 0
            }, i.prototype.show = function(t) {
                return this.applyStyle(t), t.className = "" + t.className + " " + this.config.animateClass
            }, i.prototype.applyStyle = function(t, e) {
                var n, i, o;
                return i = t.getAttribute("data-wow-duration"), n = t.getAttribute("data-wow-delay"), o = t.getAttribute("data-wow-iteration"), this.animate(function(a) {
                    return function() {
                        return a.customStyle(t, e, i, n, o)
                    }
                }(this))
            }, i.prototype.animate = function() {
                return "requestAnimationFrame" in window ? function(t) {
                    return window.requestAnimationFrame(t)
                } : function(t) {
                    return t()
                }
            }(), i.prototype.resetStyle = function() {
                var t, e, n, i, o;
                for (i = this.boxes, o = [], e = 0, n = i.length; n > e; e++) t = i[e], o.push(t.setAttribute("style", "visibility: visible;"));
                return o
            }, i.prototype.customStyle = function(t, e, n, i, o) {
                return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", n && this.vendorSet(t.style, {
                    animationDuration: n
                }), i && this.vendorSet(t.style, {
                    animationDelay: i
                }), o && this.vendorSet(t.style, {
                    animationIterationCount: o
                }), this.vendorSet(t.style, {
                    animationName: e ? "none" : this.cachedAnimationName(t)
                }), t
            }, i.prototype.vendors = ["moz", "webkit"], i.prototype.vendorSet = function(t, e) {
                var n, i, o, a;
                a = [];
                for (n in e) i = e[n], t["" + n] = i, a.push(function() {
                    var e, a, r, s;
                    for (r = this.vendors, s = [], e = 0, a = r.length; a > e; e++) o = r[e], s.push(t["" + o + n.charAt(0).toUpperCase() + n.substr(1)] = i);
                    return s
                }.call(this));
                return a
            }, i.prototype.vendorCSS = function(t, e) {
                var n, i, o, a, r, s;
                for (i = window.getComputedStyle(t), n = i.getPropertyCSSValue(e), s = this.vendors, a = 0, r = s.length; r > a; a++) o = s[a], n = n || i.getPropertyCSSValue("-" + o + "-" + e);
                return n
            }, i.prototype.animationName = function(t) {
                var e;
                try {
                    e = this.vendorCSS(t, "animation-name").cssText
                } catch (n) {
                    e = window.getComputedStyle(t).getPropertyValue("animation-name")
                }
                return "none" === e ? "" : e
            }, i.prototype.cacheAnimationName = function(t) {
                return this.animationNameCache.set(t, this.animationName(t))
            }, i.prototype.cachedAnimationName = function(t) {
                return this.animationNameCache.get(t)
            }, i.prototype.scrollHandler = function() {
                return this.scrolled = !0
            }, i.prototype.scrollCallback = function() {
                var t;
                return this.scrolled && (this.scrolled = !1, this.boxes = function() {
                    var e, n, i, o;
                    for (i = this.boxes, o = [], e = 0, n = i.length; n > e; e++) t = i[e], t && (this.isVisible(t) ? this.show(t) : o.push(t));
                    return o
                }.call(this), !this.boxes.length) ? this.stop() : void 0
            }, i.prototype.offsetTop = function(t) {
                for (var e; void 0 === t.offsetTop;) t = t.parentNode;
                for (e = t.offsetTop; t = t.offsetParent;) e += t.offsetTop;
                return e
            }, i.prototype.isVisible = function(t) {
                var e, n, i, o, a;
                return n = t.getAttribute("data-wow-offset") || this.config.offset, a = window.pageYOffset, o = a + this.element.clientHeight - n, i = this.offsetTop(t), e = i + t.clientHeight, o >= i && e >= a
            }, i.prototype.util = function() {
                return this._util || (this._util = new t)
            }, i.prototype.disabled = function() {
                return !this.config.mobile && this.util().isMobile(navigator.userAgent)
            }, i
        }()
    }.call(this),
    function(t, e) {
        "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : e()
    }(this, function() {
        function t(t) {
            if (null === h) {
                for (var e = t.length, n = 0, i = document.getElementById(a), o = "<ul>"; e > n;) o += "<li>" + t[n] + "</li>", n++;
                o += "</ul>", i.innerHTML = o
            } else h(t)
        }

        function e(t) {
            return t.replace(/<b[^>]*>(.*?)<\/b>/gi, function(t, e) {
                return e
            }).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, "")
        }

        function n(t) {
            for (var e = t.getElementsByTagName("a"), n = e.length - 1; n >= 0; n--) e[n].setAttribute("target", "_blank")
        }

        function i(t, e) {
            for (var n = [], i = new RegExp("(^| )" + e + "( |$)"), o = t.getElementsByTagName("*"), a = 0, r = o.length; r > a; a++) i.test(o[a].className) && n.push(o[a]);
            return n
        }

        function o(t) {
            if (void 0 !== t && t.innerHTML.indexOf("data-srcset") >= 0) {
                var e = t.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];
                return decodeURIComponent(e).split('"')[1]
            }
        }
        var a = "",
            r = 20,
            s = !0,
            l = [],
            u = !1,
            c = !0,
            d = !0,
            p = null,
            m = !0,
            f = !0,
            h = null,
            v = !0,
            g = !1,
            y = !0,
            w = "en",
            b = !0,
            x = !1,
            I = null,
            C = {
                fetch: function(t) {
                    if (void 0 === t.maxTweets && (t.maxTweets = 20), void 0 === t.enableLinks && (t.enableLinks = !0), void 0 === t.showUser && (t.showUser = !0), void 0 === t.showTime && (t.showTime = !0), void 0 === t.dateFunction && (t.dateFunction = "default"), void 0 === t.showRetweet && (t.showRetweet = !0), void 0 === t.customCallback && (t.customCallback = null), void 0 === t.showInteraction && (t.showInteraction = !0), void 0 === t.showImages && (t.showImages = !1), void 0 === t.linksInNewWindow && (t.linksInNewWindow = !0), void 0 === t.showPermalinks && (t.showPermalinks = !0), void 0 === t.dataOnly && (t.dataOnly = !1), u) l.push(t);
                    else {
                        u = !0, a = t.domId, r = t.maxTweets, s = t.enableLinks, d = t.showUser, c = t.showTime, f = t.showRetweet, p = t.dateFunction, h = t.customCallback, v = t.showInteraction, g = t.showImages, y = t.linksInNewWindow, b = t.showPermalinks, x = t.dataOnly;
                        var e = document.getElementsByTagName("head")[0];
                        null !== I && e.removeChild(I), I = document.createElement("script"), I.type = "text/javascript", void 0 !== t.list ? I.src = "https://syndication.twitter.com/timeline/list?callback=__twttrf.callback&dnt=false&list_slug=" + t.list.listSlug + "&screen_name=" + t.list.screenName + "&suppress_response_codes=true&lang=" + (t.lang || w) + "&rnd=" + Math.random() : void 0 !== t.profile ? I.src = "https://syndication.twitter.com/timeline/profile?callback=__twttrf.callback&dnt=false&screen_name=" + t.profile.screenName + "&suppress_response_codes=true&lang=" + (t.lang || w) + "&rnd=" + Math.random() : void 0 !== t.likes ? I.src = "https://syndication.twitter.com/timeline/likes?callback=__twttrf.callback&dnt=false&screen_name=" + t.likes.screenName + "&suppress_response_codes=true&lang=" + (t.lang || w) + "&rnd=" + Math.random() : I.src = "https://cdn.syndication.twimg.com/widgets/timelines/" + t.id + "?&lang=" + (t.lang || w) + "&callback=__twttrf.callback&suppress_response_codes=true&rnd=" + Math.random(), e.appendChild(I)
                    }
                },
                callback: function(a) {
                    function h(t) {
                        var e = t.getElementsByTagName("img")[0];
                        return e.src = e.getAttribute("data-src-2x"), t
                    }
                    if (void 0 === a || void 0 === a.body) return u = !1, void(l.length > 0 && (C.fetch(l[0]), l.splice(0, 1)));
                    a.body = a.body.replace(/(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g, ""), g || (a.body = a.body.replace(/(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g, "")), d || (a.body = a.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g, ""));
                    var w = document.createElement("div");
                    w.innerHTML = a.body, "undefined" == typeof w.getElementsByClassName && (m = !1);
                    var I = [],
                        S = [],
                        T = [],
                        k = [],
                        L = [],
                        E = [],
                        M = [],
                        P = 0;
                    if (m)
                        for (var _ = w.getElementsByClassName("timeline-Tweet"); P < _.length;) _[P].getElementsByClassName("timeline-Tweet-retweetCredit").length > 0 ? L.push(!0) : L.push(!1), (!L[P] || L[P] && f) && (I.push(_[P].getElementsByClassName("timeline-Tweet-text")[0]), E.push(_[P].getAttribute("data-tweet-id")), d && S.push(h(_[P].getElementsByClassName("timeline-Tweet-author")[0])), T.push(_[P].getElementsByClassName("dt-updated")[0]), M.push(_[P].getElementsByClassName("timeline-Tweet-timestamp")[0]), void 0 !== _[P].getElementsByClassName("timeline-Tweet-media")[0] ? k.push(_[P].getElementsByClassName("timeline-Tweet-media")[0]) : k.push(void 0)), P++;
                    else
                        for (var _ = i(w, "timeline-Tweet"); P < _.length;) i(_[P], "timeline-Tweet-retweetCredit").length > 0 ? L.push(!0) : L.push(!1), (!L[P] || L[P] && f) && (I.push(i(_[P], "timeline-Tweet-text")[0]), E.push(_[P].getAttribute("data-tweet-id")), d && S.push(h(i(_[P], "timeline-Tweet-author")[0])), T.push(i(_[P], "dt-updated")[0]), M.push(i(_[P], "timeline-Tweet-timestamp")[0]), void 0 !== i(_[P], "timeline-Tweet-media")[0] ? k.push(i(_[P], "timeline-Tweet-media")[0]) : k.push(void 0)), P++;
                    I.length > r && (I.splice(r, I.length - r), S.splice(r, S.length - r), T.splice(r, T.length - r), L.splice(r, L.length - r), k.splice(r, k.length - r), M.splice(r, M.length - r));
                    var A = [],
                        P = I.length,
                        z = 0;
                    if (x)
                        for (; P > z;) A.push({
                            tweet: I[z].innerHTML,
                            author: S[z] ? S[z].innerHTML : "Unknown Author",
                            time: T[z].textContent,
                            timestamp: T[z].getAttribute("datetime").replace("+0000", "Z").replace(/([\+\-])(\d\d)(\d\d)/, "$1$2:$3"),
                            image: o(k[z]),
                            rt: L[z],
                            tid: E[z],
                            permalinkURL: void 0 === M[z] ? "" : M[z].href
                        }), z++;
                    else
                        for (; P > z;) {
                            if ("string" != typeof p) {
                                var O = T[z].getAttribute("datetime"),
                                    N = new Date(T[z].getAttribute("datetime").replace(/-/g, "/").replace("T", " ").split("+")[0]),
                                    j = p(N, O);
                                if (T[z].setAttribute("aria-label", j), I[z].textContent)
                                    if (m) T[z].textContent = j;
                                    else {
                                        var D = document.createElement("p"),
                                            $ = document.createTextNode(j);
                                        D.appendChild($), D.setAttribute("aria-label", j), T[z] = D
                                    } else T[z].textContent = j
                            }
                            var W = "";
                            s ? (y && (n(I[z]), d && n(S[z])), d && (W += '<div class="user">' + e(S[z].innerHTML) + "</div>"), W += '<p class="tweet">' + e(I[z].innerHTML) + "</p>", c && (W += b ? '<p class="timePosted"><a href="' + M[z] + '">' + T[z].getAttribute("aria-label") + "</a></p>" : '<p class="timePosted">' + T[z].getAttribute("aria-label") + "</p>")) : I[z].textContent ? (d && (W += '<p class="user">' + S[z].textContent + "</p>"), W += '<p class="tweet">' + I[z].textContent + "</p>", c && (W += '<p class="timePosted">' + T[z].textContent + "</p>")) : (d && (W += '<p class="user">' + S[z].textContent + "</p>"), W += '<p class="tweet">' + I[z].textContent + "</p>", c && (W += '<p class="timePosted">' + T[z].textContent + "</p>")), v && (W += '<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to=' + E[z] + '" class="twitter_reply_icon"' + (y ? ' target="_blank">' : ">") + 'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' + E[z] + '" class="twitter_retweet_icon"' + (y ? ' target="_blank">' : ">") + 'Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id=' + E[z] + '" class="twitter_fav_icon"' + (y ? ' target="_blank">' : ">") + "Favorite</a></p>"), g && void 0 !== k[z] && void 0 !== o(k[z]) && (W += '<div class="media"><img src="' + o(k[z]) + '" alt="Image from tweet" /></div>'), g ? A.push(W) : !g && I[z].textContent.length && A.push(W), z++
                        }
                    t(A), u = !1, l.length > 0 && (C.fetch(l[0]), l.splice(0, 1))
                }
            };
        return window.__twttrf = C, window.twitterFetcher = C, C
    }),
    // Licensed under the terms of the MIT license.
    function() {
        function t() {
            var t = !1;
            t && u("keydown", o), y.keyboardSupport && !t && l("keydown", o)
        }

        function e() {
            if (document.body) {
                var e = document.body,
                    n = document.documentElement,
                    i = window.innerHeight,
                    o = e.scrollHeight;
                if (C = document.compatMode.indexOf("CSS") >= 0 ? n : e, v = e, t(), I = !0, top != self) b = !0;
                else if (o > i && (e.offsetHeight <= i || n.offsetHeight <= i) && (n.style.height = "auto", C.offsetHeight <= i)) {
                    var a = document.createElement("div");
                    a.style.clear = "both", e.appendChild(a)
                }
                y.fixedBackground || w || (e.style.backgroundAttachment = "scroll", n.style.backgroundAttachment = "scroll")
            }
        }

        function n(t, e, n, i) {
            if (i || (i = 1e3), d(e, n), 1 != y.accelerationMax) {
                var o = +new Date,
                    a = o - E;
                if (a < y.accelerationDelta) {
                    var r = (1 + 30 / a) / 2;
                    r > 1 && (r = Math.min(r, y.accelerationMax), e *= r, n *= r)
                }
                E = +new Date
            }
            if (k.push({
                    x: e,
                    y: n,
                    lastX: 0 > e ? .99 : -.99,
                    lastY: 0 > n ? .99 : -.99,
                    start: +new Date
                }), !L) {
                var s = t === document.body,
                    l = function(o) {
                        for (var a = +new Date, r = 0, u = 0, c = 0; c < k.length; c++) {
                            var d = k[c],
                                p = a - d.start,
                                m = p >= y.animationTime,
                                f = m ? 1 : p / y.animationTime;
                            y.pulseAlgorithm && (f = h(f));
                            var v = d.x * f - d.lastX >> 0,
                                g = d.y * f - d.lastY >> 0;
                            r += v, u += g, d.lastX += v, d.lastY += g, m && (k.splice(c, 1), c--)
                        }
                        s ? window.scrollBy(r, u) : (r && (t.scrollLeft += r), u && (t.scrollTop += u)), e || n || (k = []), k.length ? A(l, t, i / y.frameRate + 1) : L = !1
                    };
                A(l, t, 0), L = !0
            }
        }

        function i(t) {
            I || e();
            var i = t.target,
                o = s(i);
            if (!o || t.defaultPrevented || c(v, "embed") || c(i, "embed") && /\.pdf/i.test(i.src)) return !0;
            var a = t.wheelDeltaX || 0,
                r = t.wheelDeltaY || 0;
            return a || r || (r = t.wheelDelta || 0), !y.touchpadSupport && p(r) ? !0 : (Math.abs(a) > 1.2 && (a *= y.stepSize / 120), Math.abs(r) > 1.2 && (r *= y.stepSize / 120), n(o, -a, -r), void t.preventDefault())
        }

        function o(t) {
            var e = t.target,
                i = t.ctrlKey || t.altKey || t.metaKey || t.shiftKey && t.keyCode !== T.spacebar;
            if (/input|textarea|select|embed/i.test(e.nodeName) || e.isContentEditable || t.defaultPrevented || i) return !0;
            if (c(e, "button") && t.keyCode === T.spacebar) return !0;
            var o, a = 0,
                r = 0,
                l = s(v),
                u = l.clientHeight;
            switch (l == document.body && (u = window.innerHeight), t.keyCode) {
                case T.up:
                    r = -y.arrowScroll;
                    break;
                case T.down:
                    r = y.arrowScroll;
                    break;
                case T.spacebar:
                    o = t.shiftKey ? 1 : -1, r = -o * u * .9;
                    break;
                case T.pageup:
                    r = .9 * -u;
                    break;
                case T.pagedown:
                    r = .9 * u;
                    break;
                case T.home:
                    r = -l.scrollTop;
                    break;
                case T.end:
                    var d = l.scrollHeight - l.scrollTop - u;
                    r = d > 0 ? d + 10 : 0;
                    break;
                case T.left:
                    a = -y.arrowScroll;
                    break;
                case T.right:
                    a = y.arrowScroll;
                    break;
                default:
                    return !0
            }
            n(l, a, r), t.preventDefault()
        }

        function a(t) {
            v = t.target
        }

        function r(t, e) {
            for (var n = t.length; n--;) M[_(t[n])] = e;
            return e
        }

        function s(t) {
            var e = [],
                n = C.scrollHeight;
            do {
                var i = M[_(t)];
                if (i) return r(e, i);
                if (e.push(t), n === t.scrollHeight) {
                    if (!b || C.clientHeight + 10 < n) return r(e, document.body)
                } else if (t.clientHeight + 10 < t.scrollHeight && (overflow = getComputedStyle(t, "").getPropertyValue("overflow-y"), "scroll" === overflow || "auto" === overflow)) return r(e, t)
            } while (t = t.parentNode)
        }

        function l(t, e, n) {
            window.addEventListener(t, e, n || !1)
        }

        function u(t, e, n) {
            window.removeEventListener(t, e, n || !1)
        }

        function c(t, e) {
            return (t.nodeName || "").toLowerCase() === e.toLowerCase()
        }

        function d(t, e) {
            t = t > 0 ? 1 : -1, e = e > 0 ? 1 : -1, x.x === t && x.y === e || (x.x = t, x.y = e, k = [], E = 0)
        }

        function p(t) {
            if (t) {
                t = Math.abs(t), S.push(t), S.shift(), clearTimeout(P);
                var e = S[0] == S[1] && S[1] == S[2],
                    n = m(S[0], 120) && m(S[1], 120) && m(S[2], 120);
                return !(e || n)
            }
        }

        function m(t, e) {
            return Math.floor(t / e) == t / e
        }

        function f(t) {
            var e, n, i;
            return t *= y.pulseScale, 1 > t ? e = t - (1 - Math.exp(-t)) : (n = Math.exp(-1), t -= 1, i = 1 - Math.exp(-t), e = n + i * (1 - n)), e * y.pulseNormalize
        }

        function h(t) {
            return t >= 1 ? 1 : 0 >= t ? 0 : (1 == y.pulseNormalize && (y.pulseNormalize /= f(1)), f(t))
        }
        var v, g = {
                frameRate: 150,
                animationTime: 500,
                stepSize: 150,
                pulseAlgorithm: !0,
                pulseScale: 6,
                pulseNormalize: 1,
                accelerationDelta: 20,
                accelerationMax: 1,
                keyboardSupport: !0,
                arrowScroll: 50,
                touchpadSupport: !0,
                fixedBackground: !0,
                excluded: ""
            },
            y = g,
            w = !1,
            b = !1,
            x = {
                x: 0,
                y: 0
            },
            I = !1,
            C = document.documentElement,
            S = [120, 120, 120],
            T = {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                spacebar: 32,
                pageup: 33,
                pagedown: 34,
                end: 35,
                home: 36
            },
            y = g,
            k = [],
            L = !1,
            E = +new Date,
            M = {};
        setInterval(function() {
            M = {}
        }, 1e4);
        var P, _ = function() {
                var t = 0;
                return function(e) {
                    return e.uniqueID || (e.uniqueID = t++)
                }
            }(),
            A = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(t, e, n) {
                    window.setTimeout(t, n || 1e3 / 60)
                }
            }(),
            z = /chrome/i.test(window.navigator.userAgent),
            O = "onmousewheel" in document;
        O && z && (l("mousedown", a), l("mousewheel", i), l("load", e))
    }(),
    /**
    @license Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
     */
    function() {
        var t, e;
        t = this.jQuery || window.jQuery, e = t(window), t.fn.stick_in_parent = function(n) {
            var i, o, a, r, s, l, u, c, d, p, m, f;
            for (null == n && (n = {}), f = n.sticky_class, l = n.inner_scrolling, m = n.recalc_every, p = n.parent, d = n.offset_top, c = n.spacer, a = n.bottoming, null == d && (d = 0), null == p && (p = void 0), null == l && (l = !0), null == f && (f = "is_stuck"), i = t(document), null == a && (a = !0), r = function(n, o, r, s, u, h, v, g) {
                    var y, w, b, x, I, C, S, T, k, L, E, M;
                    if (!n.data("sticky_kit")) {
                        if (n.data("sticky_kit", !0), I = i.height(), S = n.parent(), null != p && (S = S.closest(p)), !S.length) throw "failed to find stick parent";
                        if (b = !1, y = !1, E = null != c ? c && n.closest(c) : t("<div />"), E && E.css("position", n.css("position")), T = function() {
                                var t, e, a;
                                if (!g) return I = i.height(), t = parseInt(S.css("border-top-width"), 10), e = parseInt(S.css("padding-top"), 10), o = parseInt(S.css("padding-bottom"), 10), r = S.offset().top + t + e, s = S.height(), b && (b = !1, y = !1, null == c && (n.insertAfter(E), E.detach()), n.css({
                                    position: "",
                                    top: "",
                                    width: "",
                                    bottom: ""
                                }).removeClass(f), a = !0), u = n.offset().top - (parseInt(n.css("margin-top"), 10) || 0) - d, h = n.outerHeight(!0), v = n.css("float"), E && E.css({
                                    width: n.outerWidth(!0),
                                    height: h,
                                    display: n.css("display"),
                                    "vertical-align": n.css("vertical-align"),
                                    "float": v
                                }), a ? M() : void 0
                            }, T(), h !== s) return x = void 0, C = d, L = m, M = function() {
                            var t, p, w, k, M, P;
                            if (!g) return w = !1, null != L && (L -= 1, 0 >= L && (L = m, T(), w = !0)), w || i.height() === I || (T(), w = !0), k = e.scrollTop(), null != x && (p = k - x), x = k, b ? (a && (M = k + h + C > s + r, y && !M && (y = !1, n.css({
                                position: "fixed",
                                bottom: "",
                                top: C
                            }).trigger("sticky_kit:unbottom"))), u > k && (b = !1, C = d, null == c && ("left" !== v && "right" !== v || n.insertAfter(E), E.detach()), t = {
                                position: "",
                                width: "",
                                top: ""
                            }, n.css(t).removeClass(f).trigger("sticky_kit:unstick")), l && (P = e.height(), h + d > P && (y || (C -= p, C = Math.max(P - h, C), C = Math.min(d, C), b && n.css({
                                top: C + "px"
                            }))))) : k > u && (b = !0, t = {
                                position: "fixed",
                                top: C
                            }, t.width = "border-box" === n.css("box-sizing") ? n.outerWidth() + "px" : n.width() + "px", n.css(t).addClass(f), null == c && (n.after(E), "left" !== v && "right" !== v || E.append(n)), n.trigger("sticky_kit:stick")), b && a && (null == M && (M = k + h + C > s + r), !y && M) ? (y = !0, "static" === S.css("position") && S.css({
                                position: "relative"
                            }), n.css({
                                position: "absolute",
                                bottom: o,
                                top: "auto"
                            }).trigger("sticky_kit:bottom")) : void 0
                        }, k = function() {
                            return T(), M()
                        }, w = function() {
                            return g = !0, e.off("touchmove", M), e.off("scroll", M), e.off("resize", k), t(document.body).off("sticky_kit:recalc", k), n.off("sticky_kit:detach", w), n.removeData("sticky_kit"), n.css({
                                position: "",
                                bottom: "",
                                top: "",
                                width: ""
                            }), S.position("position", ""), b ? (null == c && ("left" !== v && "right" !== v || n.insertAfter(E), E.remove()), n.removeClass(f)) : void 0
                        }, e.on("touchmove", M), e.on("scroll", M), e.on("resize", k), t(document.body).on("sticky_kit:recalc", k), n.on("sticky_kit:detach", w), setTimeout(M, 0)
                    }
                }, s = 0, u = this.length; u > s; s++) o = this[s], r(t(o));
            return this
        }
    }.call(this),
    /**
     * Single Page Nav Plugin
     * Copyright (c) 2014 Chris Wojcik <hello@chriswojcik.net>
     * Dual licensed under MIT and GPL.
     * @author Chris Wojcik
     * @version 1.2.0
     */
    "function" != typeof Object.create && (Object.create = function(t) {
        function e() {}
        return e.prototype = t, new e
    }),
    function(t, e, n, i) {
        "use strict";
        var o = {
            init: function(n, i) {
                this.options = t.extend({}, t.fn.singlePageNav.defaults, n), this.container = i, this.$container = t(i), this.$links = this.$container.find("a"), "" !== this.options.filter && (this.$links = this.$links.filter(this.options.filter)), this.$window = t(e), this.$htmlbody = t("html, body"), this.$links.on("click.singlePageNav", t.proxy(this.handleClick, this)), this.didScroll = !1, this.checkPosition(), this.setTimer()
            },
            handleClick: function(e) {
                var n = this,
                    i = e.currentTarget,
                    o = t(i.hash);
                e.preventDefault(), o.length && (n.clearTimer(), "function" == typeof n.options.beforeStart && n.options.beforeStart(), n.setActiveLink(i.hash), n.scrollTo(o, function() {
                    n.options.updateHash && history.pushState && history.pushState(null, null, i.hash), n.setTimer(), "function" == typeof n.options.onComplete && n.options.onComplete()
                }))
            },
            scrollTo: function(t, e) {
                var n = this,
                    i = n.getCoords(t).top,
                    o = !1;
                n.$htmlbody.stop().animate({
                    scrollTop: i
                }, {
                    duration: n.options.speed,
                    easing: n.options.easing,
                    complete: function() {
                        "function" != typeof e || o || e(), o = !0
                    }
                })
            },
            setTimer: function() {
                var t = this;
                t.$window.on("scroll.singlePageNav", function() {
                    t.didScroll = !0
                }), t.timer = setInterval(function() {
                    t.didScroll && (t.didScroll = !1, t.checkPosition())
                }, 250)
            },
            clearTimer: function() {
                clearInterval(this.timer), this.$window.off("scroll.singlePageNav"), this.didScroll = !1
            },
            checkPosition: function() {
                var t = this.$window.scrollTop(),
                    e = this.getCurrentSection(t);
                null !== e && this.setActiveLink(e)
            },
            getCoords: function(t) {
                return {
                    top: Math.round(t.offset().top) - this.options.offset
                }
            },
            setActiveLink: function(t) {
                var e = this.$container.find("a[href$='" + t + "']");
                e.hasClass(this.options.currentClass) || (this.$links.removeClass(this.options.currentClass), e.addClass(this.options.currentClass))
            },
            getCurrentSection: function(e) {
                var n, i, o, a;
                for (n = 0; n < this.$links.length; n++) i = this.$links[n].hash, t(i).length && (o = this.getCoords(t(i)), e >= o.top - this.options.threshold && (a = i));
                return a || (0 === this.$links.length ? null : this.$links[0].hash)
            }
        };
        t.fn.singlePageNav = function(t) {
            return this.each(function() {
                var e = Object.create(o);
                e.init(t, this)
            })
        }, t.fn.singlePageNav.defaults = {
            offset: 0,
            threshold: 120,
            speed: 400,
            currentClass: "current",
            easing: "swing",
            updateHash: !1,
            filter: "",
            onComplete: !1,
            beforeStart: !1
        }
    }(jQuery, window, document),
    /**!
    /*!
     * Name    : Just Another Parallax [Jarallax]
     * Version : 1.10.2
     * Author  : nK <https://nkdev.info>
     * GitHub  : https://github.com/nk-o/jarallax
     */
    ! function(e) {
        var t = {};

        function o(n) {
            if (t[n]) return t[n].exports;
            var i = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(i.exports, i, i.exports, o), i.l = !0, i.exports
        }
        o.m = e, o.c = t, o.d = function(e, t, n) {
            o.o(e, t) || Object.defineProperty(e, t, {
                configurable: !1,
                enumerable: !0,
                get: n
            })
        }, o.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return o.d(t, "a", t), t
        }, o.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, o.p = "", o(o.s = 11)
    }([function(e, t, o) {
        "use strict";
        (function(t) {
            var o;
            o = "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {}, e.exports = o
        }).call(t, o(2))
    }, function(e, t, o) {
        "use strict";
        e.exports = new Promise(function(e) {
            "interactive" === document.readyState || "complete" === document.readyState ? e() : document.addEventListener("DOMContentLoaded", function() {
                e()
            }, {
                capture: !0,
                once: !0,
                passive: !0
            })
        })
    }, function(e, t, o) {
        "use strict";
        var n, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        n = function() {
            return this
        }();
        try {
            n = n || Function("return this")() || (0, eval)("this")
        } catch (e) {
            "object" === ("undefined" == typeof window ? "undefined" : i(window)) && (n = window)
        }
        e.exports = n
    }, , , , , , , , , function(e, t, o) {
        e.exports = o(12)
    }, function(e, t, o) {
        "use strict";
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            i = l(o(1)),
            a = o(0),
            r = l(o(13));

        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var s = a.window.jarallax;
        if (a.window.jarallax = r.default, a.window.jarallax.noConflict = function() {
                return a.window.jarallax = s, this
            }, void 0 !== a.jQuery) {
            var c = function() {
                var e = arguments || [];
                Array.prototype.unshift.call(e, this);
                var t = r.default.apply(a.window, e);
                return "object" !== (void 0 === t ? "undefined" : n(t)) ? t : this
            };
            c.constructor = r.default.constructor;
            var u = a.jQuery.fn.jarallax;
            a.jQuery.fn.jarallax = c, a.jQuery.fn.jarallax.noConflict = function() {
                return a.jQuery.fn.jarallax = u, this
            }
        }
        i.default.then(function() {
            (0, r.default)(document.querySelectorAll("[data-jarallax]"))
        })
    }, function(e, t, o) {
        "use strict";
        (function(e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                    return function(e, t) {
                        if (Array.isArray(e)) return e;
                        if (Symbol.iterator in Object(e)) return function(e, t) {
                            var o = [],
                                n = !0,
                                i = !1,
                                a = void 0;
                            try {
                                for (var r, l = e[Symbol.iterator](); !(n = (r = l.next()).done) && (o.push(r.value), !t || o.length !== t); n = !0);
                            } catch (e) {
                                i = !0, a = e
                            } finally {
                                try {
                                    !n && l.return && l.return()
                                } finally {
                                    if (i) throw a
                                }
                            }
                            return o
                        }(e, t);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                }(),
                i = function() {
                    function e(e, t) {
                        for (var o = 0; o < t.length; o++) {
                            var n = t[o];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                        }
                    }
                    return function(t, o, n) {
                        return o && e(t.prototype, o), n && e(t, n), t
                    }
                }(),
                a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                r = c(o(1)),
                l = c(o(14)),
                s = o(0);

            function c(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            var u = function() {
                    for (var e = "transform WebkitTransform MozTransform".split(" "), t = document.createElement("div"), o = 0; o < e.length; o++)
                        if (t && void 0 !== t.style[e[o]]) return e[o];
                    return !1
                }(),
                d = void 0,
                p = void 0,
                m = void 0,
                f = !1,
                y = !1;

            function g(e) {
                d = s.window.innerWidth || document.documentElement.clientWidth, p = s.window.innerHeight || document.documentElement.clientHeight, "object" !== (void 0 === e ? "undefined" : a(e)) || "load" !== e.type && "dom-loaded" !== e.type || (f = !0)
            }
            g(), s.window.addEventListener("resize", g), s.window.addEventListener("orientationchange", g), s.window.addEventListener("load", g), r.default.then(function() {
                g({
                    type: "dom-loaded"
                })
            });
            var b = [],
                v = !1;

            function h() {
                if (b.length) {
                    m = void 0 !== s.window.pageYOffset ? s.window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                    var e = f || !v || v.width !== d || v.height !== p,
                        t = y || e || !v || v.y !== m;
                    f = !1, y = !1, (e || t) && (b.forEach(function(o) {
                        e && o.onResize(), t && o.onScroll()
                    }), v = {
                        width: d,
                        height: p,
                        y: m
                    }), (0, l.default)(h)
                }
            }
            var x = !!e.ResizeObserver && new e.ResizeObserver(function(e) {
                    e && e.length && (0, l.default)(function() {
                        e.forEach(function(e) {
                            e.target && e.target.jarallax && (f || e.target.jarallax.onResize(), y = !0)
                        })
                    })
                }),
                w = 0,
                $ = function() {
                    function e(t, o) {
                        ! function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, e);
                        var i = this;
                        i.instanceID = w++, i.$item = t, i.defaults = {
                            type: "scroll",
                            speed: .5,
                            imgSrc: null,
                            imgElement: ".jarallax-img",
                            imgSize: "cover",
                            imgPosition: "50% 50%",
                            imgRepeat: "no-repeat",
                            keepImg: !1,
                            elementInViewport: null,
                            zIndex: -100,
                            disableParallax: !1,
                            disableVideo: !1,
                            automaticResize: !0,
                            videoSrc: null,
                            videoStartTime: 0,
                            videoEndTime: 0,
                            videoVolume: 0,
                            videoPlayOnlyVisible: !0,
                            onScroll: null,
                            onInit: null,
                            onDestroy: null,
                            onCoverImage: null
                        };
                        var r = i.$item.getAttribute("data-jarallax"),
                            l = JSON.parse(r || "{}");
                        r && console.warn("Detected usage of deprecated data-jarallax JSON options, you should use pure data-attribute options. See info here - https://github.com/nk-o/jarallax/issues/53");
                        var s = i.$item.dataset || {},
                            c = {};
                        if (Object.keys(s).forEach(function(e) {
                                var t = e.substr(0, 1).toLowerCase() + e.substr(1);
                                t && void 0 !== i.defaults[t] && (c[t] = s[e])
                            }), i.options = i.extend({}, i.defaults, l, c, o), i.pureOptions = i.extend({}, i.options), Object.keys(i.options).forEach(function(e) {
                                "true" === i.options[e] ? i.options[e] = !0 : "false" === i.options[e] && (i.options[e] = !1)
                            }), i.options.speed = Math.min(2, Math.max(-1, parseFloat(i.options.speed))), (i.options.noAndroid || i.options.noIos) && (console.warn("Detected usage of deprecated noAndroid or noIos options, you should use disableParallax option. See info here - https://github.com/nk-o/jarallax/#disable-on-mobile-devices"), i.options.disableParallax || (i.options.noIos && i.options.noAndroid ? i.options.disableParallax = /iPad|iPhone|iPod|Android/ : i.options.noIos ? i.options.disableParallax = /iPad|iPhone|iPod/ : i.options.noAndroid && (i.options.disableParallax = /Android/))), "string" == typeof i.options.disableParallax && (i.options.disableParallax = new RegExp(i.options.disableParallax)), i.options.disableParallax instanceof RegExp) {
                            var u = i.options.disableParallax;
                            i.options.disableParallax = function() {
                                return u.test(navigator.userAgent)
                            }
                        }
                        if ("function" != typeof i.options.disableParallax && (i.options.disableParallax = function() {
                                return !1
                            }), "string" == typeof i.options.disableVideo && (i.options.disableVideo = new RegExp(i.options.disableVideo)), i.options.disableVideo instanceof RegExp) {
                            var d = i.options.disableVideo;
                            i.options.disableVideo = function() {
                                return d.test(navigator.userAgent)
                            }
                        }
                        "function" != typeof i.options.disableVideo && (i.options.disableVideo = function() {
                            return !1
                        });
                        var p = i.options.elementInViewport;
                        p && "object" === (void 0 === p ? "undefined" : a(p)) && void 0 !== p.length && (p = n(p, 1)[0]);
                        p instanceof Element || (p = null), i.options.elementInViewport = p, i.image = {
                            src: i.options.imgSrc || null,
                            $container: null,
                            useImgTag: !1,
                            position: /iPad|iPhone|iPod|Android/.test(navigator.userAgent) ? "absolute" : "fixed"
                        }, i.initImg() && i.canInitParallax() && i.init()
                    }
                    return i(e, [{
                        key: "css",
                        value: function(e, t) {
                            return "string" == typeof t ? s.window.getComputedStyle(e).getPropertyValue(t) : (t.transform && u && (t[u] = t.transform), Object.keys(t).forEach(function(o) {
                                e.style[o] = t[o]
                            }), e)
                        }
                    }, {
                        key: "extend",
                        value: function(e) {
                            var t = arguments;
                            return e = e || {}, Object.keys(arguments).forEach(function(o) {
                                t[o] && Object.keys(t[o]).forEach(function(n) {
                                    e[n] = t[o][n]
                                })
                            }), e
                        }
                    }, {
                        key: "getWindowData",
                        value: function() {
                            return {
                                width: d,
                                height: p,
                                y: m
                            }
                        }
                    }, {
                        key: "initImg",
                        value: function() {
                            var e = this,
                                t = e.options.imgElement;
                            return t && "string" == typeof t && (t = e.$item.querySelector(t)), t instanceof Element || (t = null), t && (e.options.keepImg ? e.image.$item = t.cloneNode(!0) : (e.image.$item = t, e.image.$itemParent = t.parentNode), e.image.useImgTag = !0), !!e.image.$item || (null === e.image.src && (e.image.src = e.css(e.$item, "background-image").replace(/^url\(['"]?/g, "").replace(/['"]?\)$/g, "")), !(!e.image.src || "none" === e.image.src))
                        }
                    }, {
                        key: "canInitParallax",
                        value: function() {
                            return u && !this.options.disableParallax()
                        }
                    }, {
                        key: "init",
                        value: function() {
                            var e = this,
                                t = {
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    overflow: "hidden",
                                    pointerEvents: "none"
                                },
                                o = {};
                            if (!e.options.keepImg) {
                                var n = e.$item.getAttribute("style");
                                if (n && e.$item.setAttribute("data-jarallax-original-styles", n), e.image.useImgTag) {
                                    var i = e.image.$item.getAttribute("style");
                                    i && e.image.$item.setAttribute("data-jarallax-original-styles", i)
                                }
                            }
                            if ("static" === e.css(e.$item, "position") && e.css(e.$item, {
                                    position: "relative"
                                }), "auto" === e.css(e.$item, "z-index") && e.css(e.$item, {
                                    zIndex: 0
                                }), e.image.$container = document.createElement("div"), e.css(e.image.$container, t), e.css(e.image.$container, {
                                    "z-index": e.options.zIndex
                                }), e.image.$container.setAttribute("id", "jarallax-container-" + e.instanceID), e.$item.appendChild(e.image.$container), e.image.useImgTag ? o = e.extend({
                                    "object-fit": e.options.imgSize,
                                    "object-position": e.options.imgPosition,
                                    "font-family": "object-fit: " + e.options.imgSize + "; object-position: " + e.options.imgPosition + ";",
                                    "max-width": "none"
                                }, t, o) : (e.image.$item = document.createElement("div"), e.image.src && (o = e.extend({
                                    "background-position": e.options.imgPosition,
                                    "background-size": e.options.imgSize,
                                    "background-repeat": e.options.imgRepeat,
                                    "background-image": 'url("' + e.image.src + '")'
                                }, t, o))), "opacity" !== e.options.type && "scale" !== e.options.type && "scale-opacity" !== e.options.type && 1 !== e.options.speed || (e.image.position = "absolute"), "fixed" === e.image.position)
                                for (var a = 0, r = e.$item; null !== r && r !== document && 0 === a;) {
                                    var l = e.css(r, "-webkit-transform") || e.css(r, "-moz-transform") || e.css(r, "transform");
                                    l && "none" !== l && (a = 1, e.image.position = "absolute"), r = r.parentNode
                                }
                            o.position = e.image.position, e.css(e.image.$item, o), e.image.$container.appendChild(e.image.$item), e.coverImage(), e.clipContainer(), e.onScroll(!0), e.options.automaticResize && x && x.observe(e.$item), e.options.onInit && e.options.onInit.call(e), "none" !== e.css(e.$item, "background-image") && e.css(e.$item, {
                                "background-image": "none"
                            }), e.addToParallaxList()
                        }
                    }, {
                        key: "addToParallaxList",
                        value: function() {
                            b.push(this), 1 === b.length && h()
                        }
                    }, {
                        key: "removeFromParallaxList",
                        value: function() {
                            var e = this;
                            b.forEach(function(t, o) {
                                t.instanceID === e.instanceID && b.splice(o, 1)
                            })
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            var e = this;
                            e.removeFromParallaxList();
                            var t = e.$item.getAttribute("data-jarallax-original-styles");
                            if (e.$item.removeAttribute("data-jarallax-original-styles"), t ? e.$item.setAttribute("style", t) : e.$item.removeAttribute("style"), e.image.useImgTag) {
                                var o = e.image.$item.getAttribute("data-jarallax-original-styles");
                                e.image.$item.removeAttribute("data-jarallax-original-styles"), o ? e.image.$item.setAttribute("style", t) : e.image.$item.removeAttribute("style"), e.image.$itemParent && e.image.$itemParent.appendChild(e.image.$item)
                            }
                            e.$clipStyles && e.$clipStyles.parentNode.removeChild(e.$clipStyles), e.image.$container && e.image.$container.parentNode.removeChild(e.image.$container), e.options.onDestroy && e.options.onDestroy.call(e), delete e.$item.jarallax
                        }
                    }, {
                        key: "clipContainer",
                        value: function() {
                            if ("fixed" === this.image.position) {
                                var e = this,
                                    t = e.image.$container.getBoundingClientRect(),
                                    o = t.width,
                                    n = t.height;
                                if (!e.$clipStyles) e.$clipStyles = document.createElement("style"), e.$clipStyles.setAttribute("type", "text/css"), e.$clipStyles.setAttribute("id", "jarallax-clip-" + e.instanceID), (document.head || document.getElementsByTagName("head")[0]).appendChild(e.$clipStyles);
                                var i = "#jarallax-container-" + e.instanceID + " {\n           clip: rect(0 " + o + "px " + n + "px 0);\n           clip: rect(0, " + o + "px, " + n + "px, 0);\n        }";
                                e.$clipStyles.styleSheet ? e.$clipStyles.styleSheet.cssText = i : e.$clipStyles.innerHTML = i
                            }
                        }
                    }, {
                        key: "coverImage",
                        value: function() {
                            var e = this,
                                t = e.image.$container.getBoundingClientRect(),
                                o = t.height,
                                n = e.options.speed,
                                i = "scroll" === e.options.type || "scroll-opacity" === e.options.type,
                                a = 0,
                                r = o,
                                l = 0;
                            return i && (a = n < 0 ? n * Math.max(o, p) : n * (o + p), n > 1 ? r = Math.abs(a - p) : n < 0 ? r = a / n + Math.abs(a) : r += Math.abs(p - o) * (1 - n), a /= 2), e.parallaxScrollDistance = a, l = i ? (p - r) / 2 : (o - r) / 2, e.css(e.image.$item, {
                                height: r + "px",
                                marginTop: l + "px",
                                left: "fixed" === e.image.position ? t.left + "px" : "0",
                                width: t.width + "px"
                            }), e.options.onCoverImage && e.options.onCoverImage.call(e), {
                                image: {
                                    height: r,
                                    marginTop: l
                                },
                                container: t
                            }
                        }
                    }, {
                        key: "isVisible",
                        value: function() {
                            return this.isElementInViewport || !1
                        }
                    }, {
                        key: "onScroll",
                        value: function(e) {
                            var t = this,
                                o = t.$item.getBoundingClientRect(),
                                n = o.top,
                                i = o.height,
                                a = {},
                                r = o;
                            if (t.options.elementInViewport && (r = t.options.elementInViewport.getBoundingClientRect()), t.isElementInViewport = r.bottom >= 0 && r.right >= 0 && r.top <= p && r.left <= d, e || t.isElementInViewport) {
                                var l = Math.max(0, n),
                                    s = Math.max(0, i + n),
                                    c = Math.max(0, -n),
                                    u = Math.max(0, n + i - p),
                                    m = Math.max(0, i - (n + i - p)),
                                    f = Math.max(0, -n + p - i),
                                    y = 1 - 2 * (p - n) / (p + i),
                                    g = 1;
                                if (i < p ? g = 1 - (c || u) / i : s <= p ? g = s / p : m <= p && (g = m / p), "opacity" !== t.options.type && "scale-opacity" !== t.options.type && "scroll-opacity" !== t.options.type || (a.transform = "translate3d(0,0,0)", a.opacity = g), "scale" === t.options.type || "scale-opacity" === t.options.type) {
                                    var b = 1;
                                    t.options.speed < 0 ? b -= t.options.speed * g : b += t.options.speed * (1 - g), a.transform = "scale(" + b + ") translate3d(0,0,0)"
                                }
                                if ("scroll" === t.options.type || "scroll-opacity" === t.options.type) {
                                    var v = t.parallaxScrollDistance * y;
                                    "absolute" === t.image.position && (v -= n), a.transform = "translate3d(0," + v + "px,0)"
                                }
                                t.css(t.image.$item, a), t.options.onScroll && t.options.onScroll.call(t, {
                                    section: o,
                                    beforeTop: l,
                                    beforeTopEnd: s,
                                    afterTop: c,
                                    beforeBottom: u,
                                    beforeBottomEnd: m,
                                    afterBottom: f,
                                    visiblePercent: g,
                                    fromViewportCenter: y
                                })
                            }
                        }
                    }, {
                        key: "onResize",
                        value: function() {
                            this.coverImage(), this.clipContainer()
                        }
                    }]), e
                }(),
                j = function(e) {
                    ("object" === ("undefined" == typeof HTMLElement ? "undefined" : a(HTMLElement)) ? e instanceof HTMLElement : e && "object" === (void 0 === e ? "undefined" : a(e)) && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName) && (e = [e]);
                    for (var t = arguments[1], o = Array.prototype.slice.call(arguments, 2), n = e.length, i = 0, r = void 0; i < n; i++)
                        if ("object" === (void 0 === t ? "undefined" : a(t)) || void 0 === t ? e[i].jarallax || (e[i].jarallax = new $(e[i], t)) : e[i].jarallax && (r = e[i].jarallax[t].apply(e[i].jarallax, o)), void 0 !== r) return r;
                    return e
                };
            j.constructor = $, t.default = j
        }).call(t, o(2))
    }, function(e, t, o) {
        "use strict";
        var n = o(0),
            i = n.requestAnimationFrame || n.webkitRequestAnimationFrame || n.mozRequestAnimationFrame || function(e) {
                var t = +new Date,
                    o = Math.max(0, 16 - (t - a)),
                    n = setTimeout(e, o);
                return a = t, n
            },
            a = +new Date;
        var r = n.cancelAnimationFrame || n.webkitCancelAnimationFrame || n.mozCancelAnimationFrame || clearTimeout;
        Function.prototype.bind && (i = i.bind(n), r = r.bind(n)), (e.exports = i).cancel = r
    }]);
/*!
 * Name    : Video Background Extension for Jarallax
 * Version : 1.0.1
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */
! function(e) {
    var t = {};

    function o(i) {
        if (t[i]) return t[i].exports;
        var n = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(n.exports, n, n.exports, o), n.l = !0, n.exports
    }
    o.m = e, o.c = t, o.d = function(e, t, i) {
        o.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: i
        })
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return o.d(t, "a", t), t
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, o.p = "", o(o.s = 7)
}([function(e, t, o) {
    "use strict";
    (function(t) {
        var o;
        o = "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {}, e.exports = o
    }).call(t, o(2))
}, function(e, t, o) {
    "use strict";
    e.exports = new Promise(function(e) {
        "interactive" === document.readyState || "complete" === document.readyState ? e() : document.addEventListener("DOMContentLoaded", function() {
            e()
        }, {
            capture: !0,
            once: !0,
            passive: !0
        })
    })
}, function(e, t, o) {
    "use strict";
    var i, n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    i = function() {
        return this
    }();
    try {
        i = i || Function("return this")() || (0, eval)("this")
    } catch (e) {
        "object" === ("undefined" == typeof window ? "undefined" : n(window)) && (i = window)
    }
    e.exports = i
}, function(e, t, o) {
    "use strict";
    e.exports = o(9)
}, , , , function(e, t, o) {
    e.exports = o(8)
}, function(e, t, o) {
    "use strict";
    var i = l(o(3)),
        n = l(o(0)),
        a = l(o(1)),
        r = l(o(10));

    function l(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    n.default.VideoWorker = n.default.VideoWorker || i.default, (0, r.default)(), a.default.then(function() {
        "undefined" != typeof jarallax && jarallax(document.querySelectorAll("[data-jarallax-video]"))
    })
}, function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        n = function() {
            function e(e, t) {
                for (var o = 0; o < t.length; o++) {
                    var i = t[o];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, o, i) {
                return o && e(t.prototype, o), i && e(t, i), t
            }
        }();

    function a() {
        this._done = [], this._fail = []
    }
    a.prototype = {
        execute: function(e, t) {
            var o = e.length;
            for (t = Array.prototype.slice.call(t); o--;) e[o].apply(null, t)
        },
        resolve: function() {
            this.execute(this._done, arguments)
        },
        reject: function() {
            this.execute(this._fail, arguments)
        },
        done: function(e) {
            this._done.push(e)
        },
        fail: function(e) {
            this._fail.push(e)
        }
    };
    var r = 0,
        l = 0,
        p = 0,
        u = 0,
        s = 0,
        d = new a,
        y = new a,
        v = function() {
            function e(t, o) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var i = this;
                i.url = t, i.options_default = {
                    autoplay: !1,
                    loop: !1,
                    mute: !1,
                    volume: 100,
                    showContols: !0,
                    startTime: 0,
                    endTime: 0
                }, i.options = i.extend({}, i.options_default, o), i.videoID = i.parseURL(t), i.videoID && (i.ID = r++, i.loadAPI(), i.init())
            }
            return n(e, [{
                key: "extend",
                value: function(e) {
                    var t = arguments;
                    return e = e || {}, Object.keys(arguments).forEach(function(o) {
                        t[o] && Object.keys(t[o]).forEach(function(i) {
                            e[i] = t[o][i]
                        })
                    }), e
                }
            }, {
                key: "parseURL",
                value: function(e) {
                    var t, o, i, n, a = !(!(t = e.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)) || 11 !== t[1].length) && t[1],
                        r = !(!(o = e.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/)) || !o[3]) && o[3],
                        l = (i = {}, n = 0, e.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/).forEach(function(e) {
                            var t = e.match(/^(mp4|webm|ogv|ogg)\:(.*)/);
                            t && t[1] && t[2] && (i["ogv" === t[1] ? "ogg" : t[1]] = t[2], n = 1)
                        }), !!n && i);
                    return a ? (this.type = "youtube", a) : r ? (this.type = "vimeo", r) : !!l && (this.type = "local", l)
                }
            }, {
                key: "isValid",
                value: function() {
                    return !!this.videoID
                }
            }, {
                key: "on",
                value: function(e, t) {
                    this.userEventsList = this.userEventsList || [], (this.userEventsList[e] || (this.userEventsList[e] = [])).push(t)
                }
            }, {
                key: "off",
                value: function(e, t) {
                    var o = this;
                    this.userEventsList && this.userEventsList[e] && (t ? this.userEventsList[e].forEach(function(i, n) {
                        i === t && (o.userEventsList[e][n] = !1)
                    }) : delete this.userEventsList[e])
                }
            }, {
                key: "fire",
                value: function(e) {
                    var t = this,
                        o = [].slice.call(arguments, 1);
                    this.userEventsList && void 0 !== this.userEventsList[e] && this.userEventsList[e].forEach(function(e) {
                        e && e.apply(t, o)
                    })
                }
            }, {
                key: "play",
                value: function(e) {
                    var t = this;
                    t.player && ("youtube" === t.type && t.player.playVideo && (void 0 !== e && t.player.seekTo(e || 0), YT.PlayerState.PLAYING !== t.player.getPlayerState() && t.player.playVideo()), "vimeo" === t.type && (void 0 !== e && t.player.setCurrentTime(e), t.player.getPaused().then(function(e) {
                        e && t.player.play()
                    })), "local" === t.type && (void 0 !== e && (t.player.currentTime = e), t.player.paused && t.player.play()))
                }
            }, {
                key: "pause",
                value: function() {
                    var e = this;
                    e.player && ("youtube" === e.type && e.player.pauseVideo && YT.PlayerState.PLAYING === e.player.getPlayerState() && e.player.pauseVideo(), "vimeo" === e.type && e.player.getPaused().then(function(t) {
                        t || e.player.pause()
                    }), "local" === e.type && (e.player.paused || e.player.pause()))
                }
            }, {
                key: "mute",
                value: function() {
                    var e = this;
                    e.player && ("youtube" === e.type && e.player.mute && e.player.mute(), "vimeo" === e.type && e.player.setVolume && e.player.setVolume(0), "local" === e.type && (e.$video.muted = !0))
                }
            }, {
                key: "unmute",
                value: function() {
                    var e = this;
                    e.player && ("youtube" === e.type && e.player.mute && e.player.unMute(), "vimeo" === e.type && e.player.setVolume && e.player.setVolume(e.options.volume), "local" === e.type && (e.$video.muted = !1))
                }
            }, {
                key: "setVolume",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = this;
                    t.player && e && ("youtube" === t.type && t.player.setVolume && t.player.setVolume(e), "vimeo" === t.type && t.player.setVolume && t.player.setVolume(e), "local" === t.type && (t.$video.volume = e / 100))
                }
            }, {
                key: "getVolume",
                value: function(e) {
                    var t = this;
                    t.player ? ("youtube" === t.type && t.player.getVolume && e(t.player.getVolume()), "vimeo" === t.type && t.player.getVolume && t.player.getVolume().then(function(t) {
                        e(t)
                    }), "local" === t.type && e(100 * t.$video.volume)) : e(!1)
                }
            }, {
                key: "getMuted",
                value: function(e) {
                    var t = this;
                    t.player ? ("youtube" === t.type && t.player.isMuted && e(t.player.isMuted()), "vimeo" === t.type && t.player.getVolume && t.player.getVolume().then(function(t) {
                        e(!!t)
                    }), "local" === t.type && e(t.$video.muted)) : e(null)
                }
            }, {
                key: "getImageURL",
                value: function(e) {
                    var t = this;
                    if (t.videoImage) e(t.videoImage);
                    else {
                        if ("youtube" === t.type) {
                            var o = ["maxresdefault", "sddefault", "hqdefault", "0"],
                                i = 0,
                                n = new Image;
                            n.onload = function() {
                                120 !== (this.naturalWidth || this.width) || i === o.length - 1 ? (t.videoImage = "https://img.youtube.com/vi/" + t.videoID + "/" + o[i] + ".jpg", e(t.videoImage)) : (i++, this.src = "https://img.youtube.com/vi/" + t.videoID + "/" + o[i] + ".jpg")
                            }, n.src = "https://img.youtube.com/vi/" + t.videoID + "/" + o[i] + ".jpg"
                        }
                        if ("vimeo" === t.type) {
                            var a = new XMLHttpRequest;
                            a.open("GET", "https://vimeo.com/api/v2/video/" + t.videoID + ".json", !0), a.onreadystatechange = function() {
                                if (4 === this.readyState && this.status >= 200 && this.status < 400) {
                                    var o = JSON.parse(this.responseText);
                                    t.videoImage = o[0].thumbnail_large, e(t.videoImage)
                                }
                            }, a.send(), a = null
                        }
                    }
                }
            }, {
                key: "getIframe",
                value: function(e) {
                    this.getVideo(e)
                }
            }, {
                key: "getVideo",
                value: function(e) {
                    var t = this;
                    t.$video ? e(t.$video) : t.onAPIready(function() {
                        var o = void 0;
                        if (t.$video || ((o = document.createElement("div")).style.display = "none"), "youtube" === t.type) {
                            t.playerOptions = {}, t.playerOptions.videoId = t.videoID, t.playerOptions.playerVars = {
                                autohide: 1,
                                rel: 0,
                                autoplay: 0,
                                playsinline: 1
                            }, t.options.showContols || (t.playerOptions.playerVars.iv_load_policy = 3, t.playerOptions.playerVars.modestbranding = 1, t.playerOptions.playerVars.controls = 0, t.playerOptions.playerVars.showinfo = 0, t.playerOptions.playerVars.disablekb = 1);
                            var i = void 0,
                                n = void 0;
                            t.playerOptions.events = {
                                onReady: function(e) {
                                    t.options.mute ? e.target.mute() : t.options.volume && e.target.setVolume(t.options.volume), t.options.autoplay && t.play(t.options.startTime), t.fire("ready", e), setInterval(function() {
                                        t.getVolume(function(o) {
                                            t.options.volume !== o && (t.options.volume = o, t.fire("volumechange", e))
                                        })
                                    }, 150)
                                },
                                onStateChange: function(e) {
                                    t.options.loop && e.data === YT.PlayerState.ENDED && t.play(t.options.startTime), i || e.data !== YT.PlayerState.PLAYING || (i = 1, t.fire("started", e)), e.data === YT.PlayerState.PLAYING && t.fire("play", e), e.data === YT.PlayerState.PAUSED && t.fire("pause", e), e.data === YT.PlayerState.ENDED && t.fire("ended", e), e.data === YT.PlayerState.PLAYING ? n = setInterval(function() {
                                        t.fire("timeupdate", e), t.options.endTime && t.player.getCurrentTime() >= t.options.endTime && (t.options.loop ? t.play(t.options.startTime) : t.pause())
                                    }, 150) : clearInterval(n)
                                }
                            };
                            var a = !t.$video;
                            if (a) {
                                var r = document.createElement("div");
                                r.setAttribute("id", t.playerID), o.appendChild(r), document.body.appendChild(o)
                            }
                            t.player = t.player || new window.YT.Player(t.playerID, t.playerOptions), a && (t.$video = document.getElementById(t.playerID), t.videoWidth = parseInt(t.$video.getAttribute("width"), 10) || 1280, t.videoHeight = parseInt(t.$video.getAttribute("height"), 10) || 720)
                        }
                        if ("vimeo" === t.type) {
                            t.playerOptions = "", t.playerOptions += "player_id=" + t.playerID, t.playerOptions += "&autopause=0", t.playerOptions += "&transparent=0", t.options.showContols || (t.playerOptions += "&badge=0&byline=0&portrait=0&title=0"), t.playerOptions += "&autoplay=" + (t.options.autoplay ? "1" : "0"), t.playerOptions += "&loop=" + (t.options.loop ? 1 : 0), t.$video || (t.$video = document.createElement("iframe"), t.$video.setAttribute("id", t.playerID), t.$video.setAttribute("src", "https://player.vimeo.com/video/" + t.videoID + "?" + t.playerOptions), t.$video.setAttribute("frameborder", "0"), o.appendChild(t.$video), document.body.appendChild(o)), t.player = t.player || new Vimeo.Player(t.$video), t.player.getVideoWidth().then(function(e) {
                                t.videoWidth = e || 1280
                            }), t.player.getVideoHeight().then(function(e) {
                                t.videoHeight = e || 720
                            }), t.options.startTime && t.options.autoplay && t.player.setCurrentTime(t.options.startTime), t.options.mute ? t.player.setVolume(0) : t.options.volume && t.player.setVolume(t.options.volume);
                            var l = void 0;
                            t.player.on("timeupdate", function(e) {
                                l || (t.fire("started", e), l = 1), t.fire("timeupdate", e), t.options.endTime && t.options.endTime && e.seconds >= t.options.endTime && (t.options.loop ? t.play(t.options.startTime) : t.pause())
                            }), t.player.on("play", function(e) {
                                t.fire("play", e), t.options.startTime && 0 === e.seconds && t.play(t.options.startTime)
                            }), t.player.on("pause", function(e) {
                                t.fire("pause", e)
                            }), t.player.on("ended", function(e) {
                                t.fire("ended", e)
                            }), t.player.on("loaded", function(e) {
                                t.fire("ready", e)
                            }), t.player.on("volumechange", function(e) {
                                t.fire("volumechange", e)
                            })
                        }
                        if ("local" === t.type) {
                            t.$video || (t.$video = document.createElement("video"), t.options.mute ? t.$video.muted = !0 : t.$video.volume && (t.$video.volume = t.options.volume / 100), t.options.loop && (t.$video.loop = !0), t.$video.setAttribute("playsinline", ""), t.$video.setAttribute("webkit-playsinline", ""), t.$video.setAttribute("id", t.playerID), o.appendChild(t.$video), document.body.appendChild(o), Object.keys(t.videoID).forEach(function(e) {
                                var o, i, n, a;
                                o = t.$video, i = t.videoID[e], n = "video/" + e, (a = document.createElement("source")).src = i, a.type = n, o.appendChild(a)
                            })), t.player = t.player || t.$video;
                            var p = void 0;
                            t.player.addEventListener("playing", function(e) {
                                p || t.fire("started", e), p = 1
                            }), t.player.addEventListener("timeupdate", function(e) {
                                t.fire("timeupdate", e), t.options.endTime && t.options.endTime && this.currentTime >= t.options.endTime && (t.options.loop ? t.play(t.options.startTime) : t.pause())
                            }), t.player.addEventListener("play", function(e) {
                                t.fire("play", e)
                            }), t.player.addEventListener("pause", function(e) {
                                t.fire("pause", e)
                            }), t.player.addEventListener("ended", function(e) {
                                t.fire("ended", e)
                            }), t.player.addEventListener("loadedmetadata", function() {
                                t.videoWidth = this.videoWidth || 1280, t.videoHeight = this.videoHeight || 720, t.fire("ready"), t.options.autoplay && t.play(t.options.startTime)
                            }), t.player.addEventListener("volumechange", function(e) {
                                t.getVolume(function(e) {
                                    t.options.volume = e
                                }), t.fire("volumechange", e)
                            })
                        }
                        e(t.$video)
                    })
                }
            }, {
                key: "init",
                value: function() {
                    this.playerID = "VideoWorker-" + this.ID
                }
            }, {
                key: "loadAPI",
                value: function() {
                    if (!l || !p) {
                        var e = "";
                        if ("youtube" !== this.type || l || (l = 1, e = "https://www.youtube.com/iframe_api"), "vimeo" !== this.type || p || (p = 1, e = "https://player.vimeo.com/api/player.js"), e) {
                            var t = document.createElement("script"),
                                o = document.getElementsByTagName("head")[0];
                            t.src = e, o.appendChild(t), o = null, t = null
                        }
                    }
                }
            }, {
                key: "onAPIready",
                value: function(e) {
                    if ("youtube" === this.type && ("undefined" != typeof YT && 0 !== YT.loaded || u ? "object" === ("undefined" == typeof YT ? "undefined" : i(YT)) && 1 === YT.loaded ? e() : d.done(function() {
                            e()
                        }) : (u = 1, window.onYouTubeIframeAPIReady = function() {
                            window.onYouTubeIframeAPIReady = null, d.resolve("done"), e()
                        })), "vimeo" === this.type)
                        if ("undefined" != typeof Vimeo || s) "undefined" != typeof Vimeo ? e() : y.done(function() {
                            e()
                        });
                        else {
                            s = 1;
                            var t = setInterval(function() {
                                "undefined" != typeof Vimeo && (clearInterval(t), y.resolve("done"), e())
                            }, 20)
                        }
                        "local" === this.type && e()
                }
            }]), e
        }();
    t.default = v
}, function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n.default.jarallax;
        if (void 0 === e) return;
        var t = e.constructor,
            o = t.prototype.init;
        t.prototype.init = function() {
            var e = this;
            o.apply(e), e.video && !e.options.disableVideo() && e.video.getVideo(function(t) {
                var o = t.parentNode;
                e.css(t, {
                    position: e.image.position,
                    top: "0px",
                    left: "0px",
                    right: "0px",
                    bottom: "0px",
                    width: "100%",
                    height: "100%",
                    maxWidth: "none",
                    maxHeight: "none",
                    margin: 0,
                    zIndex: -1
                }), e.$video = t, e.image.$container.appendChild(t), o.parentNode.removeChild(o)
            })
        };
        var a = t.prototype.coverImage;
        t.prototype.coverImage = function() {
            var e = this,
                t = a.apply(e),
                o = !!e.image.$item && e.image.$item.nodeName;
            if (t && e.video && o && ("IFRAME" === o || "VIDEO" === o)) {
                var i = t.image.height,
                    n = i * e.image.width / e.image.height,
                    r = (t.container.width - n) / 2,
                    l = t.image.marginTop;
                t.container.width > n && (n = t.container.width, i = n * e.image.height / e.image.width, r = 0, l += (t.image.height - i) / 2), "IFRAME" === o && (i += 400, l -= 200), e.css(e.$video, {
                    width: n + "px",
                    marginLeft: r + "px",
                    height: i + "px",
                    marginTop: l + "px"
                })
            }
            return t
        };
        var r = t.prototype.initImg;
        t.prototype.initImg = function() {
            var e = this,
                t = r.apply(e);
            return e.options.videoSrc || (e.options.videoSrc = e.$item.getAttribute("data-jarallax-video") || null), e.options.videoSrc ? (e.defaultInitImgResult = t, !0) : t
        };
        var l = t.prototype.canInitParallax;
        t.prototype.canInitParallax = function() {
            var e = this,
                t = l.apply(e);
            if (!e.options.videoSrc) return t;
            var o = new i.default(e.options.videoSrc, {
                autoplay: !0,
                loop: !0,
                showContols: !1,
                startTime: e.options.videoStartTime || 0,
                endTime: e.options.videoEndTime || 0,
                mute: e.options.videoVolume ? 0 : 1,
                volume: e.options.videoVolume || 0
            });
            if (o.isValid())
                if (t) {
                    if (o.on("ready", function() {
                            if (e.options.videoPlayOnlyVisible) {
                                var t = e.onScroll;
                                e.onScroll = function() {
                                    t.apply(e), e.isVisible() ? o.play() : o.pause()
                                }
                            } else o.play()
                        }), o.on("started", function() {
                            e.image.$default_item = e.image.$item, e.image.$item = e.$video, e.image.width = e.video.videoWidth || 1280, e.image.height = e.video.videoHeight || 720, e.options.imgWidth = e.image.width, e.options.imgHeight = e.image.height, e.coverImage(), e.clipContainer(), e.onScroll(), e.image.$default_item && (e.image.$default_item.style.display = "none")
                        }), e.video = o, !e.defaultInitImgResult) return "local" !== o.type ? (o.getImageURL(function(t) {
                        e.image.src = t, e.init()
                    }), !1) : (e.image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", !0)
                } else e.defaultInitImgResult || o.getImageURL(function(t) {
                    var o = e.$item.getAttribute("style");
                    o && e.$item.setAttribute("data-jarallax-original-styles", o), e.css(e.$item, {
                        "background-image": 'url("' + t + '")',
                        "background-position": "center",
                        "background-size": "cover"
                    })
                });
            return t
        };
        var p = t.prototype.destroy;
        t.prototype.destroy = function() {
            var e = this;
            e.image.$default_item && (e.image.$item = e.image.$default_item, delete e.image.$default_item), p.apply(e)
        }
    };
    var i = a(o(3)),
        n = a(o(0));

    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
}]);
/*!
 * Name    : Elements Extension for Jarallax
 * Version : 1.0.0
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */
! function(t) {
    var e = {};

    function o(n) {
        if (e[n]) return e[n].exports;
        var r = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(r.exports, r, r.exports, o), r.l = !0, r.exports
    }
    o.m = t, o.c = e, o.d = function(t, e, n) {
        o.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    }, o.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return o.d(e, "a", e), e
    }, o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, o.p = "", o(o.s = 4)
}([function(t, e, o) {
    "use strict";
    (function(e) {
        var o;
        o = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {}, t.exports = o
    }).call(e, o(2))
}, function(t, e, o) {
    "use strict";
    t.exports = new Promise(function(t) {
        "interactive" === document.readyState || "complete" === document.readyState ? t() : document.addEventListener("DOMContentLoaded", function() {
            t()
        }, {
            capture: !0,
            once: !0,
            passive: !0
        })
    })
}, function(t, e, o) {
    "use strict";
    var n, r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    n = function() {
        return this
    }();
    try {
        n = n || Function("return this")() || (0, eval)("this")
    } catch (t) {
        "object" === ("undefined" == typeof window ? "undefined" : r(window)) && (n = window)
    }
    t.exports = n
}, , function(t, e, o) {
    t.exports = o(5)
}, function(t, e, o) {
    "use strict";
    var n = r(o(1));

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(0, r(o(6)).default)(), n.default.then(function() {
        "undefined" != typeof jarallax && jarallax(document.querySelectorAll("[data-jarallax-element]"))
    })
}, function(t, e, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i.default.jarallax;
        if (void 0 === t) return;
        var e = t.constructor;
        ["initImg", "canInitParallax", "init", "destroy", "clipContainer", "coverImage", "isVisible", "onScroll", "onResize"].forEach(function(t) {
            var o = e.prototype[t];
            e.prototype[t] = function() {
                var e = this,
                    n = arguments || [];
                if ("initImg" === t && null !== e.$item.getAttribute("data-jarallax-element") && (e.options.type = "element", e.pureOptions.speed = e.$item.getAttribute("data-jarallax-element") || e.pureOptions.speed), "element" !== e.options.type) return o.apply(e, n);
                switch (e.pureOptions.threshold = e.$item.getAttribute("data-threshold") || "", t) {
                    case "init":
                        var r = e.pureOptions.speed.split(" ");
                        e.options.speed = e.pureOptions.speed || 0, e.options.speedY = r[0] ? parseFloat(r[0]) : 0, e.options.speedX = r[1] ? parseFloat(r[1]) : 0;
                        var i = e.pureOptions.threshold.split(" ");
                        e.options.thresholdY = i[0] ? parseFloat(i[0]) : null, e.options.thresholdX = i[1] ? parseFloat(i[1]) : null, e.onResize(), e.onScroll(), e.addToParallaxList();
                        break;
                    case "onResize":
                        var a = e.css(e.$item, "transform");
                        e.css(e.$item, {
                            transform: ""
                        });
                        var s = e.$item.getBoundingClientRect();
                        e.itemData = {
                            width: s.width,
                            height: s.height,
                            y: s.top + e.getWindowData().y,
                            x: s.left
                        }, e.css(e.$item, {
                            transform: a
                        });
                        break;
                    case "onScroll":
                        var l = e.getWindowData(),
                            u = (l.y + l.height / 2 - e.itemData.y - e.itemData.height / 2) / (l.height / 2),
                            p = u * e.options.speedY,
                            c = u * e.options.speedX,
                            d = p,
                            f = c;
                        null !== e.options.thresholdY && p > e.options.thresholdY && (d = 0), null !== e.options.thresholdX && c > e.options.thresholdX && (f = 0), e.css(e.$item, {
                            transform: "translate3d(" + f + "px," + d + "px,0)"
                        });
                        break;
                    case "initImg":
                    case "isVisible":
                    case "clipContainer":
                    case "coverImage":
                        return !0
                }
                return o.apply(e, n)
            }
        })
    };
    var n, r = o(0),
        i = (n = r) && n.__esModule ? n : {
            default: n
        }
}]);
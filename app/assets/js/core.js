window.Class = function(b, type) {
    var scope = this || window;
    var c = b.toString();
    var name = c.match(/function ([^\(]+)/)[1];
    type = (type || "").toLowerCase();
    b.prototype.__call = function() {
        if (this.events) {
            this.events.scope(this)
        }
    };
    if (!type) {
        scope[name] = b
    } else if (type == "static") {
        scope[name] = new b()
    } else if (type == "singleton") {
        scope[name] = (function() {
            var g = new Object();
            var f;
            g.instance = function() {
                if (!f) {
                    f = new b()
                }
                return f
            };
            return g
        })()
    }
};

window.Inherit = function(f, name, c) {
    if (typeof c === "undefined") {
        c = f
    }
    var type = new name(c);
    var b = {};
    for (var e in type) {
        f[e] = type[e];
        b[e] = type[e]
    }
    if (f.__call) {
        f.__call()
    }
    Render.nextFrame(function() {
        for (e in type) {
            if ((f[e] && b[e]) && f[e] !== b[e]) {
                f["_" + e] = b[e]
            }
        }
        type = b = null
    })
};

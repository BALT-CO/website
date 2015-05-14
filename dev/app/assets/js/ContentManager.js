
var ContentManager = {
    AUTOMATICALLY_TRACK_GOOGLE_ANALYTICS: !0,
    SHOW_TRACES: !1,
    USE_HISTORY_API: !1
};
ContentManager.DEFAULT_URL = document.location.protocol + "://" + window.location.host;
ContentManager.DEFAULT_SUBFOLDER = "";
ContentManager._activeTemplates = [];
ContentManager._templateRegister = [];
ContentManager._templateGroups = [];
ContentManager._newPath = "";
ContentManager._blocked = !1;
ContentManager._defaultPath = "home";
ContentManager._xml = null;
ContentManager._prevTemplateObj = null;
ContentManager._passedVariables = null;
ContentManager.init = function(a, c) {
    ContentManager.trace("init();");
    "Explorer" == BrowserDetect.BROWSER_NAME && 9 >= BrowserDetect.BROWSER_VERSION && (ContentManager.USE_HISTORY_API = !1);
    ContentManager._xml = a;
    c && (ContentManager._defaultPath = c, ContentManager.trace(ContentManager._defaultPath, "_defaultPath"));
    1 == ContentManager.USE_HISTORY_API ? window.addEventListener("popstate", ContentManager.onHashChange) : window.addEventListener("hashchange", ContentManager.onHashChange);
    "Explorer" == BrowserDetect.BROWSER_NAME &&
        7 >= BrowserDetect.BROWSER_VERSION && ContentManager.autoCheck();
    ContentManager.onHashChange()
};
ContentManager.sortArray = function(a, c) {
    var d = a.slice();
    if (!c.length) return d.sort();
    var h = Array.prototype.slice.call(c);
    return d.sort(function(a, c) {
        for (var d = h.slice(), k = d.shift(); a[k] == c[k] && d.length;) k = d.shift();
        return a[k] == c[k] ? 0 : a[k] > c[k] ? 1 : -1
    })
};
ContentManager.path = function(a) {
    "object" == typeof a && (a = ContentManager.composeFullPathFromXML(a));
    ContentManager.trace("path();");
    ContentManager.trace(a, "newPath");
    1 == ContentManager.USE_HISTORY_API ? (a = "/" + ContentManager.DEFAULT_SUBFOLDER + a, history.pushState(a, a, a), ContentManager.onHashChange()) : window.location.hash = "/" + a
};
ContentManager.nextTemplate = function(a) {
    ContentManager.trace("nextTemplate();");
    ContentManager._passedVariables = a;
    ContentManager._blocked = !1;
    ContentManager.onHashChange()
};
ContentManager.addTemplate = function(a, c) {
    ContentManager._templateRegister.push({
        templateName: a,
        JSClass: c
    })
};
ContentManager.addTransitionGroup = function(a, c) {
    ContentManager._templateGroups.push({
        name: a,
        group: c
    })
};
ContentManager.getTransitionGroup = function(a, c) {
    for (var d = null, h = ContentManager._templateGroups.length, l = null, e = null, n = null, d = 0; d < h; d += 1)
        if (l = ContentManager._templateGroups[d], e = l.group, -1 != e.indexOf(a) && -1 != e.indexOf(c)) {
            n = l.name;
            break
        }
    return n
};
ContentManager.composeFullPathFromXML = function(a) {
    var c = a.getAttribute("data-path"),
        d = [];
    c && d.unshift(c);
    a = a.parentNode;
    for (var h = 0; c && !((c = a.getAttribute("data-path")) && d.unshift(c), a = a.parentNode, h += 1, 10 < h););
    return d.join("/")
};
ContentManager.getTransitionIndex = function(a) {};
ContentManager.isContentSupported = function(a) {
    a = ContentManager.findContent(ContentManager.extractPath(a).split("/"));
    var c = !1;
    a && (templateName = a.getAttribute("data-template")) && ContentManager.findTemplateFromName(templateName) && (c = !0);
    return c
};
ContentManager.updateMetaTags = function() {
    var a = ContentManager._newPath.split("/");
    "" == a[0] && (a[0] = "home");
    if (selectedPageData = Assets.DATA_URL.pages[a[0]]) {
        if (selectedPageData.subpages && 1 < a.length)
            for (var c = 1; c < a.length; c++) "" != a[c] && (selectedPageData = selectedPageData.subpages[a[c]]);
        selectedPageData || (selectedPageData = Assets.DATA_URL.defaults);
        document.head.querySelector("title").innerHTML = selectedPageData.meta.title;
        document.head.querySelector('[name="description"]').setAttribute("content", selectedPageData.meta.description);
        document.head.querySelector('[property="og:title"]').setAttribute("content", selectedPageData.meta.title);
        document.head.querySelector('[property="og:description"]').setAttribute("content", selectedPageData.meta.description);
        document.head.querySelector('[property="og:image"]').setAttribute("content", selectedPageData.meta.image);
        document.head.querySelector('[property="og:url"]').setAttribute("content", Assets.DATA_URL.defaults.baseUrl + selectedPageData.url)
    }
};
ContentManager.onHashChange = function() {
    ContentManager.trace("-----------------------------");
    if (0 == ContentManager._blocked) {
        
        var a = "";
        
        null != history && (a = window.location.href, a = a.substring(ContentManager.DEFAULT_URL.length + ContentManager.DEFAULT_SUBFOLDER.length, a.length));
        
        0 == ContentManager.USE_HISTORY_API && (a = window.location.hash);
        
        ContentManager._newPath = ContentManager.extractPath(a);
        
        var a = ContentManager._newPath.split("/"),
            c, d = [],
            h, l, e;

        ContentManager.updateMetaTags();
        "" == a[0] && (a[0] = ContentManager._defaultPath);
        for (ContentManager.trace(a, "pathArr"); 0 < a.length;) {
            if (c = ContentManager.findContent(a))
                if (h = c.getAttribute("data-template")) l = ContentManager.findTemplateLevelFromName(h), !1 === l && (l = a.length - 1), e = c.getAttribute("data-path"), ContentManager.trace("new candidate"), ContentManager.trace(e, "templatePath"), ContentManager.trace(h, "templateName"), ContentManager.trace(l, "templateLevel"), d.push({
                    xml: c,
                    path: e,
                    templateName: h,
                    level: l
                });
            a.pop()
        }
        d = ContentManager.sortArray(d, ["level"]);
        c = 0;
        h = d.length;
        var n;
        l = "none";
        a = ContentManager._activeTemplates;
        ContentManager.trace(d.length, "candidates.length");
        for (c = 0; c < h; c += 1) {
            n = d[c];
            e = n.level;
            if (null == a[e]) l = "push";
            else if (a[e].path != n.path || -1 == a[e].fullPath.indexOf(ContentManager.composeFullPathFromXML(n.xml))) l = "pop";
            if ("none" != l) break
        }
        "none" == l && d.length < a.length && n && (l = "pop");
        ContentManager.trace(l, "type");
        
        "none" != l && (ContentManager._blocked = !0, "pop" == l ? (a = a.pop(), d = a.templateData, ContentManager._passedVariables && (d.setPassedVariables(ContentManager._passedVariables),
            ContentManager._passedVariables = null), c = new TemplateData, c.setTemplateName(n.templateName), c.setLevel(n.level), c.setTemplatePath(n.path), d.setNextTemplateData(c), ContentManager._prevTemplateObj = a, a.template.templateOut()) : "push" == l && (ContentManager.trace("push candidate"), ContentManager.trace(n.path, "candidate.path"), ContentManager.trace(n.templateName, "candidate.templateName"), ContentManager.trace(n.level, "candidate.level"), (h = ContentManager.findTemplateFromName(n.templateName)) ? (d = new TemplateData,
            d.setXML(n.xml), d.setLevel(n.level), d.setTemplatePath(n.path), d.setTemplateName(n.templateName), c = ContentManager.composeFullPathFromXML(n.xml), d.setTemplateFullPath(c), ContentManager._prevTemplateObj && (d.setPrevTemplateData(ContentManager._prevTemplateObj.templateData), ContentManager._prevTemplateObj = null), ContentManager._passedVariables && (d.setPassedVariables(ContentManager._passedVariables), ContentManager._passedVariables = null), h = new h(d), 1 == ContentManager.AUTOMATICALLY_TRACK_GOOGLE_ANALYTICS &&
            (l = ContentManager.composeFullPathFromXML(n.xml), _gaq.push(["_trackPageview", l])), n = {
                template: h,
                path: n.path,
                templateName: n.templateName,
                fullPath: c,
                xml: n.xml,
                templateData: d
            }, ContentManager._prevTemplateObj = n, a.push(n), h.templateIn()) : (ContentManager._blocked = !1, trace("ContentManger.js unable to find template"))))
    }
};
ContentManager.findContent = function(a) {
    for (var c = ContentManager.cloneArray(a), d = c[0], h = ContentManager._xml, l = "", e, n, k, m = !1, u, v = 0, z = 0; d;) {
        u = h.children;
        k = u.length;
        for (n = 0; n < k; n += 1)
            if (e = u[n], l = e.getAttribute("data-path"), l == d) {
                c.shift();
                d = c[0];
                h = e;
                m = !0;
                z += 1;
                break
            }
        if (!m || !d || 10 < v) d = null;
        v += 1
    }
    z != a.length && (h = null);
    return h
};
ContentManager.extractPath = function(a) {
    a = a.split("#");
    a = a[a.length - 1].split("/");
    var c = [],
        d = a.length,
        h, l;
    for (h = 0; h < d; h += 1) l = a[h], null !== l && "" !== l && c.push(l);
    return c.join("/")
};
ContentManager.findTemplateFromName = function(a) {
    var c, d = ContentManager._templateRegister,
        h = d.length,
        l, e;
    for (c = 0; c < h; c += 1)
        if (l = d[c], l.templateName == a) {
            e = l.JSClass;
            break
        }
    return e
};
ContentManager.findTemplateLevelFromName = function(a) {
    var c = !1;
    (a = a.match(/\d+/)) && (c = a);
    return c
};
ContentManager.autoCheck = function() {
    function a() {
        var d = window.location.hash;
        d != c && (c = d, ContentManager.onHashChange());
        setTimeout(a, 200)
    }
    ContentManager.trace("autoCheck();");
    var c = window.location.hash;
    setTimeout(a, 200)
};
ContentManager.cloneArray = function(a) {
    var c, d = a.length,
        h = [];
    for (c = 0; c < d; c += 1) h.push(a[c]);
    return h
};
ContentManager.trace = function(a, c) {
    ContentManager.SHOW_TRACES && (c || (c = ""), trace(a, "ContentManager.js " + c))
};

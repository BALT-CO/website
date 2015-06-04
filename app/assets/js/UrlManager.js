
Class(function PushState(useHash) {
	var b = this;
	if (typeof useHash !== "boolean") {
		useHash = window.location.href.strpos("local") || window.location.href.charAt(0) == "1"
	}
	this.locked = false;
	this.dispatcher = new StateDispatcher(useHash);
	this.getState = function() {
		return this.dispatcher.getState()
	};
	this.setState = function(c) {
		this.dispatcher.setState(c)
	};
	this.setTitle = function(c) {
		this.dispatcher.setTitle(c)
	};
	this.lock = function() {
		this.locked = true;
		this.dispatcher.lock()
	};
	this.unlock = function() {
		this.locked = false;
		this.dispatcher.unlock()
	};
	this.setPathRoot = function(c) {
		this.dispatcher.setPathRoot(c)
	}
});

Class(function StateDispatcher(useHash) {
	Inherit(this, Events);
	var scope = this;
	var i, a;
	var d = "/";
	this.locked = false;
	(function() {
		b();
		i = c();
		a = i
	})();

	function b() {
		if (!Device.system.pushstate || useHash) {
			if (Device.detect(["msie 7", "msie 8", "firefox/3", "safari/4"])) {
				setInterval(function() {
					var j = c();
					if (j != a) {
						h(j)
					}
				}, 300)
			} else {
				window.addEventListener("hashchange", function() {
					h(c())
				}, false)
			}
		} else {
			window.onpopstate = history.onpushstate = e
		}
	}

	function c() {
		if (!Device.system.pushstate || useHash) {
			var hash = window.location.hash;
			hash = hash.slice(3);
			return String(hash)
		} else {
			var path = location.pathname.toString();
			path = d != "/" ? path.split(d)[1] : path.slice(1);
			path = path || "";
			return path
		}
	}

	function e() {
		var j = location.pathname;
		if (!scope.locked && j != a) {
			j = d != "/" ? j.split(d)[1] : j.slice(1);
			j = j || "";
			a = j;
			scope.events.fire(HydraEvents.UPDATE, {
				value: j,
				split: j.split("/")
			})
		} else {
			if (j != a) {
				if (a) {
					window.history.pushState(null, null, d + j)
				}
			}
		}
	}

	function h(j) {
		if (!scope.locked && j != a) {
			a = j;
			scope.events.fire(HydraEvents.UPDATE, {
				value: j,
				split: j.split("/")
			})
		} else {
			if (j != a) {
				if (a) {
					window.location.hash = "!/" + a
				}
			}
		}
	}
	this.getState = function() {
		return c()
	};
	this.setPathRoot = function(j) {
		if (j.charAt(0) == "/") {
			d = j
		} else {
			d = "/" + j
		}
	};
	this.setState = function(j) {
		if (!Device.system.pushstate || useHash) {
			if (j != a) {
				window.location.hash = "!/" + j;
				a = j
			}
		} else {
			if (j != a) {
				window.history.pushState(null, null, d + j);
				a = j
			}
		}
	};
	this.setTitle = function(j) {
		document.title = j
	};
	this.lock = function() {
		this.locked = true
	};
	this.unlock = function() {
		this.locked = false
	};
	this.forceHash = function() {
		useHash = true
	}
});
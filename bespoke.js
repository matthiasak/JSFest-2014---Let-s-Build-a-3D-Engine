/*! Bespoke.js v0.3.0 © 2013 Mark Dalgleish, Licensed MIT */ ! function(a, b) {
    var c = function(a, b) {
        var c = a.blur ? a : document.querySelector(a),
            g = [].slice.call(c.children, 0),
            h = g[0],
            i = {}, k = function(a, b) {
                g[a] && (p("deactivate", q(h, b)), h = g[a], g.map(l), p("activate", q(h, b)), e(h, "active"), f(h, "inactive"))
            }, l = function(a, b) {
                var c = b - g.indexOf(h),
                    d = c > 0 ? "after" : "before";
                ["before(-\\d+)?", "after(-\\d+)?", "active", "inactive"].map(f.bind(0, a)), a != h && ["inactive", d, d + "-" + Math.abs(c)].map(e.bind(0, a))
            }, m = function(a, b) {
                p("slide", q(g[a], b)) && k(a, b)
            }, n = function(a, b) {
                var c = g.indexOf(h) + a;
                p(a > 0 ? "next" : "prev", q(h, b)) && k(c, b)
            }, o = function(a, b) {
                return (i[a] || (i[a] = [])).push(b),
                function() {
                    i[a] = i[a].filter(function(a) {
                        return a != b
                    })
                }
            }, p = function(a, b) {
                return (i[a] || []).reduce(function(a, c) {
                    return a && c(b) !== !1
                }, !0)
            }, q = function(a, b) {
                return b = b || {}, b.index = g.indexOf(a), b.slide = a, b
            }, r = {
                on: o,
                fire: p,
                slide: m,
                next: n.bind(0, 1),
                prev: n.bind(0, -1),
                parent: c,
                slides: g
            };
        e(c, "parent"), g.map(function(a) {
            e(a, "slide")
        });
        for (var s in b) j[s](r, b[s]);
        return k(0), d.push(r), r
    }, d = [],
        e = function(b, c) {
            b.classList.add(a + "-" + c)
        }, f = function(b, c) {
            b.className = b.className.replace(RegExp(a + "-" + c + "(\\s|$)", "g"), " ").trim()
        }, g = function(a) {
            return function(b) {
                d.map(function(c) {
                    c[a](b)
                })
            }
        }, h = function(a) {
            return {
                from: function(b, d) {
                    return (d = d || {})[a] = !0, c(b, d)
                }
            }
        }, i = function(a) {
            return function(b) {
                var c, d;
                document.addEventListener("keydown", function(c) {
                    (34 == c.which || 32 == c.which || "X" == a && 39 == c.which || "Y" == a && 40 == c.which) && b.next(), (33 == c.which || "X" == a && 37 == c.which || "Y" == a && 38 == c.which) && b.prev()
                }), b.parent.addEventListener("touchstart", function(b) {
                    1 == b.touches.length && (c = b.touches[0]["page" + a], d = 0)
                }), b.parent.addEventListener("touchmove", function(b) {
                    1 == b.touches.length && (b.preventDefault(), d = b.touches[0]["page" + a] - c)
                }), b.parent.addEventListener("touchend", function() {
                    Math.abs(d) > 50 && (d > 0 ? b.prev() : b.next())
                })
            }
        }, j = {
            horizontal: i("X"),
            vertical: i("Y")
        };
    b[a] = {
        from: c,
        slide: g("slide"),
        next: g("next"),
        prev: g("prev"),
        horizontal: h("horizontal"),
        vertical: h("vertical"),
        plugins: j
    }
}("bespoke", this);

bespoke.plugins.state = function(deck) {
    deck.on('activate', function(e) {
        var state = e.slide.getAttribute('data-bespoke-state');
        if (state !== undefined) {
            deck.parent.className = state;
        }
    });
};

(function(bespoke) {

    bespoke.plugins.hash = function(deck) {
        var activeIndex,

            parseHash = function() {
                var hash = window.location.hash.slice(1),
                    slideNumberOrName = parseInt(hash, 10);

                if (hash) {
                    if (slideNumberOrName) {
                        activateSlide(slideNumberOrName - 1);
                    } else {
                        deck.slides.forEach(function(slide, i) {
                            slide.getAttribute('data-bespoke-hash') === hash && activateSlide(i);
                        });
                    }
                }
            },

            activateSlide = function(index) {
                if (index !== activeIndex) {
                    deck.slide(index);
                }
            };

        setTimeout(function() {
            parseHash();

            deck.on('activate', function(e) {
                var slideName = e.slide.getAttribute('data-bespoke-hash');
                window.location.hash = slideName || e.index + 1;
                activeIndex = e.index;
            });

            window.addEventListener('hashchange', parseHash);
        }, 0);
    };

}(bespoke));

(function() {
    'use strict';

    bespoke.horizontal.from('article', {
        state: true,
        hash: true
    });

    var i, image, j, matches, rules, sheet;

    if (document.styleSheets) {
        for (i = 0; i < document.styleSheets.length; ++i) {
            sheet = document.styleSheets[i];
            if (sheet.rules) {
                for (j = 0; j < sheet.rules.length; ++j) {
                    rules = sheet.rules[j];
                    if (rules.style && rules.style.backgroundImage) {
                        matches = rules.style.backgroundImage.match(/url\((.*)\)/);
                        if (matches) {
                            image = new Image();
                            image.src = matches[1];
                        }
                    }
                }
            }
        }
    }

})();

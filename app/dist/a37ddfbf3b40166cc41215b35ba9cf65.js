// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var elStart = document.querySelector('#start'),
    elPokemon = document.querySelector('#pokemon');

var sections = {

    start: function start() {
        elStart.classList.remove('no-display');
        elPokemon.classList.add('no-display');
    },

    pokemon: function pokemon() {
        elPokemon.classList.remove('no-display');
        elStart.classList.add('no-display');
    }
};

exports.default = sections;
},{}],4:[function(require,module,exports) {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * routie - a tiny hash router
 * v0.3.2
 * http://projects.jga.me/routie
 * copyright Greg Allen 2016
 * MIT License
*/
var Routie = function Routie(w, isModule) {

  var routes = [];
  var map = {};
  var reference = "routie";
  var oldReference = w[reference];

  var Route = function Route(path, name) {
    this.name = name;
    this.path = path;
    this.keys = [];
    this.fns = [];
    this.params = {};
    this.regex = pathToRegexp(this.path, this.keys, false, false);
  };

  Route.prototype.addHandler = function (fn) {
    this.fns.push(fn);
  };

  Route.prototype.removeHandler = function (fn) {
    for (var i = 0, c = this.fns.length; i < c; i++) {
      var f = this.fns[i];
      if (fn == f) {
        this.fns.splice(i, 1);
        return;
      }
    }
  };

  Route.prototype.run = function (params) {
    for (var i = 0, c = this.fns.length; i < c; i++) {
      this.fns[i].apply(this, params);
    }
  };

  Route.prototype.match = function (path, params) {
    var m = this.regex.exec(path);

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = this.keys[i - 1];

      var val = 'string' == typeof m[i] ? decodeURIComponent(m[i]) : m[i];

      if (key) {
        this.params[key.name] = val;
      }
      params.push(val);
    }

    return true;
  };

  Route.prototype.toURL = function (params) {
    var path = this.path;
    for (var param in params) {
      path = path.replace('/:' + param, '/' + params[param]);
    }
    path = path.replace(/\/:.*\?/g, '/').replace(/\?/g, '');
    if (path.indexOf(':') != -1) {
      throw new Error('missing parameters for url: ' + path);
    }
    return path;
  };

  var pathToRegexp = function pathToRegexp(path, keys, sensitive, strict) {
    if (path instanceof RegExp) return path;
    if (path instanceof Array) path = '(' + path.join('|') + ')';
    path = path.concat(strict ? '' : '/?').replace(/\/\(/g, '(?:/').replace(/\+/g, '__plus__').replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function (_, slash, format, key, capture, optional) {
      keys.push({ name: key, optional: !!optional });
      slash = slash || '';
      return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || format && '([^/.]+?)' || '([^/]+?)') + ')' + (optional || '');
    }).replace(/([\/.])/g, '\\$1').replace(/__plus__/g, '(.+)').replace(/\*/g, '(.*)');
    return new RegExp('^' + path + '$', sensitive ? '' : 'i');
  };

  var addHandler = function addHandler(path, fn) {
    var s = path.split(' ');
    var name = s.length == 2 ? s[0] : null;
    path = s.length == 2 ? s[1] : s[0];

    if (!map[path]) {
      map[path] = new Route(path, name);
      routes.push(map[path]);
    }
    map[path].addHandler(fn);
  };

  var routie = function routie(path, fn) {
    if (typeof fn == 'function') {
      addHandler(path, fn);
      routie.reload();
    } else if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) == 'object') {
      for (var p in path) {
        addHandler(p, path[p]);
      }
      routie.reload();
    } else if (typeof fn === 'undefined') {
      routie.navigate(path);
    }
  };

  routie.lookup = function (name, obj) {
    for (var i = 0, c = routes.length; i < c; i++) {
      var route = routes[i];
      if (route.name == name) {
        return route.toURL(obj);
      }
    }
  };

  routie.remove = function (path, fn) {
    var route = map[path];
    if (!route) return;
    route.removeHandler(fn);
  };

  routie.removeAll = function () {
    map = {};
    routes = [];
  };

  routie.navigate = function (path, options) {
    options = options || {};
    var silent = options.silent || false;

    if (silent) {
      removeListener();
    }
    setTimeout(function () {
      window.location.hash = path;

      if (silent) {
        setTimeout(function () {
          addListener();
        }, 1);
      }
    }, 1);
  };

  routie.noConflict = function () {
    w[reference] = oldReference;
    return routie;
  };

  var getHash = function getHash() {
    return window.location.hash.substring(1);
  };

  var checkRoute = function checkRoute(hash, route) {
    var params = [];
    if (route.match(hash, params)) {
      route.run(params);
      return true;
    }
    return false;
  };

  var hashChanged = routie.reload = function () {
    var hash = getHash();
    for (var i = 0, c = routes.length; i < c; i++) {
      var route = routes[i];
      if (checkRoute(hash, route)) {
        return;
      }
    }
  };

  var addListener = function addListener() {
    if (w.addEventListener) {
      w.addEventListener('hashchange', hashChanged, false);
    } else {
      w.attachEvent('onhashchange', hashChanged);
    }
  };

  var removeListener = function removeListener() {
    if (w.removeEventListener) {
      w.removeEventListener('hashchange', hashChanged);
    } else {
      w.detachEvent('onhashchange', hashChanged);
    }
  };
  addListener();

  if (isModule) {
    return routie;
  } else {
    w[reference] = routie;
  }
};

if (typeof module == 'undefined') {
  Routie(window);
} else {
  module.exports = Routie(window, true);
}
},{}],14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var order = {
    pokemon: function pokemon(_pokemon) {

        var pokemonButton = document.querySelector('.button'),
            listPokemon = document.querySelectorAll('.pokemon');

        pokemonButton.addEventListener('click', function () {

            var inputPokemon = document.querySelector('.input').value,
                filteredPokemon = _pokemon.filter(function (x, i) {
                return x.name.startsWith(inputPokemon) == false;
            });

            filteredPokemon.forEach(function (el) {

                var currPokemon = document.querySelector('[href="' + el.name + '"]');
                currPokemon.parentNode.classList.add('gone');
            });
        });
    },

    makeList: function makeList(pokemon) {

        pokemon.forEach(function (i) {
            var obj = i;
            var pokemonListItem = document.createElement('li'),
                elPokemonLink = document.createElement('a'),
                name = document.createTextNode(obj.name),
                elPokemonList = document.querySelector('.pokemon-list');

            pokemonListItem.appendChild(elPokemonLink);
            elPokemonLink.setAttribute('href', '#pokemon/' + obj.name);
            elPokemonLink.appendChild(name);
            elPokemonList.appendChild(pokemonListItem);
            pokemonListItem.className = 'pokemon';
        });
    }
};
exports.default = order;
},{}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sections = require('./sections');

var _sections2 = _interopRequireDefault(_sections);

var _routie = require('./routie');

var _routie2 = _interopRequireDefault(_routie);

var _order = require('./order');

var _order2 = _interopRequireDefault(_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = document.querySelector('.template'),
    data = {},
    newData = {},
    elPokemonList = document.querySelector('.pokemon-list');
var obj = {},
    newObj = {}; // JS declared de variables boven aan de scope

var api = { // object met .call, .orderPokemon, .makeList en .openPokemonInfo method,

    call: function call() {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://www.pokeapi.co/api/v2/pokemon/?limit=151', true);

        request.onload = function () {

            if (request.status >= 200 && request.status < 400) {

                this.data = JSON.parse(request.responseText);
                var pokemon = this.data.results;
                _order2.default.makeList(pokemon);
                _order2.default.pokemon(pokemon);

                // closure is een functie in een functie waar de parent functie nog steeds bij de child functie kan

                var loading = document.querySelector('.loading');
                loading.style.display = "none";
            }
        };
        request.onerror = function () {
            var loading = document.querySelector('.error');
            loading.style.display = "block"; // callback voor als er wat fout gaat
        };

        request.timeout = function () {
            var loading = document.querySelector('.error');
            loading.style.display = "block";
        };

        request.send();
    },

    openPokemonInfo: function openPokemonInfo(obj) {
        var newRequest = new XMLHttpRequest();
        newRequest.open('GET', 'https://www.pokeapi.co/api/v2/pokemon/' + obj, true);

        newRequest.onload = function () {

            if (newRequest.status >= 200 && newRequest.status < 400) {

                this.newData = JSON.parse(newRequest.responseText);

                var pokemonImages = this.newData.sprites,
                    pokemonInfo = this.newData,
                    pokeInfo = {
                    name: pokemonInfo.name,
                    height: 'Height: ' + pokemonInfo.height / 10 + ' meter',
                    weight: 'Weight: ' + pokemonInfo.weight / 10 + ' kilogram',
                    statsHP: 'HP: ' + pokemonInfo.stats[5].base_stat,
                    statsDef: 'Defense: ' + pokemonInfo.stats[3].base_stat,
                    statsAtt: 'Attack: ' + pokemonInfo.stats[4].base_stat,
                    statsSpeed: 'Speed: ' + pokemonInfo.stats[0].base_stat,
                    statsSpDef: 'Special Defense: ' + pokemonInfo.stats[1].base_stat,
                    statsSpAtt: 'Special Attack: ' + pokemonInfo.stats[2].base_stat
                },
                    sprites = {
                    front_default: {
                        src: function src() {
                            return '' + pokemonInfo.sprites.front_default;
                        }
                    },
                    back_default: {
                        src: function src() {
                            return '' + pokemonInfo.sprites.back_default;
                        }
                    },
                    front_shiny: {
                        src: function src() {
                            return '' + pokemonInfo.sprites.front_shiny;
                        }
                    },
                    back_shiny: {
                        src: function src() {
                            return '' + pokemonInfo.sprites.back_shiny;
                        }
                    }
                };

                if (pokemonInfo.types.length > 1) {
                    document.querySelector('.type1').innerHTML = "Type: " + pokemonInfo.types[0].type.name + " & ";
                    document.querySelector('.type2').innerHTML = pokemonInfo.types[1].type.name;
                } else {
                    document.querySelector('.type1').innerHTML = "Type: " + pokemonInfo.types[0].type.name;
                    document.querySelector('.type2').innerHTML = "";
                }

                setTimeout(function () {
                    template.classList.add('showPokemon');
                }, 1);

                Transparency.render(template, pokeInfo, sprites);
            }
        };

        newRequest.onerror = function () {
            var loading = document.querySelector('.error');
            loading.style.display = "none";
        };

        newRequest.timeout = function () {
            var loading = document.querySelector('.error');
            loading.style.display = "none";
        };

        newRequest.send();
    }
};

exports.default = api;
},{"./sections":13,"./routie":4,"./order":14}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sections = require('./sections');

var _sections2 = _interopRequireDefault(_sections);

var _routie = require('./routie');

var _routie2 = _interopRequireDefault(_routie);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = {
    init: function init() {
        (0, _routie2.default)({

            'start': function start() {
                _sections2.default.start();
            },

            'pokemon': function pokemon() {
                _sections2.default.pokemon();
            },

            'pokemon/:id': function pokemonId(obj) {
                _api2.default.openPokemonInfo(obj);
            }
        });
    }
};

exports.default = routes;
},{"./sections":13,"./routie":4,"./api":9}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = {
    init: function init() {
        _api2.default.call();
        _routes2.default.init();
        // call api.call and routes.init
    }
};

exports.default = app;
},{"./api":9,"./routes":10}],5:[function(require,module,exports) {
'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'strict mode'; // doet een aantal semantische dingetjes, zoals het veranderen van silent errors in throw errors en andere dingetjes

	var template = document.querySelector('.template');

	var cross = document.querySelector('.template a'),
	    pokemonLink = document.querySelector('.pokemonlink');

	pokemonLink.addEventListener('click', function () {
		template.classList.remove('showPokemon');
	});
	cross.addEventListener('click', function () {
		template.classList.remove('showPokemon');
	});
	// Start Application
	_app2.default.init();
})();
},{"./app":7}],23:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '57625' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[23,5])
//# sourceMappingURL=/dist/a37ddfbf3b40166cc41215b35ba9cf65.map
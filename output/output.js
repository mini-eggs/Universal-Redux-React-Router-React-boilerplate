var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// @flow
define("server/base/base", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = "\n  <!DOCTYPE html>\n  <html lang=\"en\">\n    <head>\n      <meta charset=\"utf-8\">\n      <meta content=\"initial-scale=1,maximum-scale=1,user-scalable=no,width=device-width\" name=\"viewport\">\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n      <title>Boilerplate</title>\n      <link href=\"/styles/bundle.css\" rel=\"stylesheet\" />\n    </head>\n    <body>\n      <div id=\"root\">{{HTML}}</div>\n      <script>\n        window.__PRELOADED_STATE__ = {{STATE}}\n      </script>\n      <script defer src=\"/scripts/bundle.js\"></script>\n    </body>\n  </html>\n";
});
define("shared/components/placeholder", ["require", "exports", "react"], function (require, exports, react_1) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function (props) {
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement("h1", null, "Placeholder page 1"),
            react_1["default"].createElement("div", null,
                "Message from initial store: > \"",
                props.data,
                "\"")));
    };
});
define("shared/containers/placeholder", ["require", "exports", "react-redux", "shared/components/placeholder"], function (require, exports, react_redux_1, placeholder_1) {
    "use strict";
    exports.__esModule = true;
    var getProps = function (state) {
        return {
            data: state.InitialReducer.data
        };
    };
    exports["default"] = react_redux_1.connect(getProps)(placeholder_1["default"]);
});
define("shared/components/placeholder2", ["require", "exports", "react"], function (require, exports, react_2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function (props) {
        return (react_2["default"].createElement("div", null,
            react_2["default"].createElement("h1", null, "Placeholder page 2")));
    };
});
define("shared/containers/placeholder2", ["require", "exports", "react-redux", "shared/components/placeholder2"], function (require, exports, react_redux_2, placeholder2_1) {
    "use strict";
    exports.__esModule = true;
    var getProps = function (state) {
        return {};
    };
    exports["default"] = react_redux_2.connect(getProps)(placeholder2_1["default"]);
});
define("shared/containers/container", ["require", "exports", "react", "react-router"], function (require, exports, react_3, react_router_1) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function (props) {
        return (react_3["default"].createElement("div", null,
            react_3["default"].createElement("header", null,
                react_3["default"].createElement(react_router_1.Link, { to: "/" }, "Go to placeholder page 1"),
                react_3["default"].createElement("br", null),
                react_3["default"].createElement(react_router_1.Link, { to: "/placeholder2" }, "Go to placeholder page 2"),
                react_3["default"].createElement("br", null),
                react_3["default"].createElement("br", null)),
            props.children));
    };
});
define("shared/routes/routes", ["require", "exports", "react", "react-router", "shared/containers/placeholder", "shared/containers/placeholder2", "shared/containers/container"], function (require, exports, react_4, react_router_2, placeholder_2, placeholder2_2, container_1) {
    "use strict";
    exports.__esModule = true;
    exports.routes = (react_4["default"].createElement(react_router_2.Router, { history: react_router_2.browserHistory },
        react_4["default"].createElement(react_router_2.Route, { path: "/", component: container_1["default"] },
            react_4["default"].createElement(react_router_2.IndexRoute, { component: placeholder_2["default"] }),
            react_4["default"].createElement(react_router_2.Route, { path: "/placeholder2", component: placeholder2_2["default"] })),
        react_4["default"].createElement(react_router_2.Route, { path: "*" },
            react_4["default"].createElement(react_router_2.IndexRedirect, { to: "/" }))));
    exports["default"] = function (props) {
        return exports.routes;
    };
});
define("shared/actions/actions", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.INITIAL_STORE_DATA = 'INITIAL_STORE_DATA';
    // only to be used on server
    exports.setInitialStoreData = function (state, props) {
        if (typeof process === 'undefined') {
            throw new Error('This function is to only be called on the server.');
        }
        return state.dispatch({
            type: exports.INITIAL_STORE_DATA,
            payload: props
        });
    };
    exports.EXAMPLE_ACTION = 'EXAMPLE_ACTION';
    exports.exampleAction = function (props) { return function (dispatch) {
        dispatch({
            type: exports.EXAMPLE_ACTION,
            payload: props
        });
    }; };
});
define("shared/reducers/initial", ["require", "exports", "shared/actions/actions"], function (require, exports, actions_1) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function (state, action) {
        if (state === void 0) { state = {}; }
        switch (action.type) {
            case actions_1.INITIAL_STORE_DATA:
                return Object.assign({}, state, action.payload);
            default:
                return state;
        }
    };
});
define("shared/reducers/reducers", ["require", "exports", "redux", "shared/reducers/initial"], function (require, exports, redux_1, initial_1) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = redux_1.combineReducers({
        InitialReducer: initial_1["default"]
    });
});
define("shared/store/store", ["require", "exports", "redux", "shared/reducers/reducers"], function (require, exports, redux_2, reducers_1) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function (preloadedState) {
        return redux_2.createStore(reducers_1["default"], preloadedState);
    };
});
// @flow
define("server/data/initialStoreData", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function () {
        return new Promise(function (resolve, reject) {
            resolve({ data: 'This is some async startup data we absolutely need' });
        });
    };
});
define("server/router", ["require", "exports", "react", "react-dom/server", "react-router", "react-redux", "server/base/base", "shared/routes/routes", "shared/store/store", "server/data/initialStoreData", "shared/actions/actions"], function (require, exports, react_5, server_1, react_router_3, react_redux_3, base_1, routes_1, store_1, initialStoreData_1, actions_2) {
    "use strict";
    var _this = this;
    exports.__esModule = true;
    var getTemplate = function (html, state) {
        return base_1["default"].replace('{{HTML}}', html)
            .replace('{{STATE}}', JSON.stringify(state).replace(/</g, '\\x3c'));
    };
    var getMarkup = function (req, res, store) {
        return new Promise(function (resolve, reject) {
            react_router_3.match({ routes: routes_1.routes, location: req.url }, function (err, redirect, props) {
                if (err) {
                    reject();
                }
                else if (redirect) {
                    res.redirect(302, redirect.pathname + redirect.search);
                }
                else if (props) {
                    resolve(server_1.renderToString(react_5["default"].createElement(react_redux_3.Provider, { store: store },
                        react_5["default"].createElement(react_router_3.RouterContext, __assign({}, props)))));
                }
                else {
                    reject();
                }
            });
        });
    };
    var errorHandler = function (req, res, err) {
        console.log(err);
        res.send('Error');
    };
    exports["default"] = function (app) {
        app.get('*', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var store, data, html, finalState, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        store = store_1["default"]({});
                        return [4 /*yield*/, initialStoreData_1["default"]()];
                    case 1:
                        data = _a.sent();
                        actions_2.setInitialStoreData(store, data);
                        return [4 /*yield*/, getMarkup(req, res, store)];
                    case 2:
                        html = _a.sent();
                        finalState = store.getState();
                        res.send(getTemplate(html, finalState));
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        errorHandler(req, res, err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
});
define("server/entry", ["require", "exports", "http", "path", "express", "portfinder", "server/router"], function (require, exports, Http, Path, Express, portfinder_1, Router) {
    "use strict";
    exports.__esModule = true;
    if (process.env.PORT) {
        process.env.NODE_ENV = 'production';
    }
    var app = Express();
    var server = Http.createServer(app);
    app.use('/scripts', Express.static(Path.join(__dirname, '..', '..', 'dist', 'client', 'scripts')));
    app.use('/styles', Express.static(Path.join(__dirname, '..', '..', 'dist', 'client', 'styles')));
    Router(app);
    if (process.env.PORT) {
        server.listen(process.env.PORT);
    }
    else {
        var serverHasStarted = function (port) {
            console.log("==> \uD83C\uDF0E  Listening on port " + port + ". Open up http://localhost:" + port + "/ in your browser.");
        };
        var serverHasNotStarted = function (err) {
            console.log('Something went wrong while trying to start the server. Error below:');
            console.log(err);
        };
        var startServer = function (port) {
            return new Promise(function (resolve, reject) {
                server.listen(port, function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(port);
                    }
                });
            });
        };
        portfinder_1.getPortPromise()
            .then(startServer)
            .then(serverHasStarted)["catch"](serverHasNotStarted);
    }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPServer = void 0;
var tslib_1 = require("tslib");
var express = require("express");
var HTTP = require("http");
var HTTPS = require("https");
var Path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");
var formidableMiddleware = require("express-formidable");
var cookieParser = require("cookie-parser");
var core_1 = require("@gorila/core");
var HTTPServer = (function () {
    function HTTPServer(rootDir) {
        this.rootDir = rootDir;
        this.app = express();
        this.ports = { http: 0, https: 0 };
        this.HTTPControllersDeclarations = [];
        this.HTTPControllersInstances = [];
    }
    HTTPServer.prototype.init = function () {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        this.loaderConfig = require(Path.normalize(this.rootDir + "/config")).default;
                        this.useLogger = (_b = (_a = this.loaderConfig.getConfig('GorilaHttp')) === null || _a === void 0 ? void 0 : _a.dev) === null || _b === void 0 ? void 0 : _b.logger;
                        core_1.Log('Iniciando http server ...', this.useLogger);
                        if (!fs.existsSync(Path.normalize(this.rootDir + "/libraries/index.js"))) return [3, 2];
                        return [4, this.loadLibraries()];
                    case 1:
                        _c.sent();
                        return [3, 4];
                    case 2: return [4, this.runHTTPServer()];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [3, 6];
                    case 5:
                        error_1 = _c.sent();
                        console.error(error_1);
                        return [3, 6];
                    case 6: return [2];
                }
            });
        });
    };
    HTTPServer.prototype.loadLibraries = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        core_1.Log('Cargando librerias ...', this.useLogger);
                        this.libraryManager = new core_1.LibraryManager(this.loaderConfig, require(Path.normalize(this.rootDir + "/libraries")).default);
                        return [4, this.libraryManager.build()];
                    case 1:
                        _a.sent();
                        core_1.Log('Librarias cargadas!', this.useLogger);
                        return [4, this.runHTTPServer()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    HTTPServer.prototype.runHTTPServer = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a, _b, _c, _d, _e;
            var dirControllers = Path.normalize(_this.rootDir + "/Controllers/http.js");
            if (fs.existsSync("" + dirControllers)) {
                core_1.Log("Instanciando Express ...", _this.useLogger);
                _this.httpServer = new HTTP.Server(_this.app);
                var profileConfig = _this.loaderConfig.getConfig('GorilaHttp');
                profileConfig.formidableEvents = (profileConfig === null || profileConfig === void 0 ? void 0 : profileConfig.formidableEvents) || [];
                profileConfig.formidableOptions = (profileConfig === null || profileConfig === void 0 ? void 0 : profileConfig.formidableOptions) || {};
                _this.isHttps = (profileConfig.https !== undefined);
                if (_this.isHttps) {
                    var _f = profileConfig.https, key = _f.key, cert = _f.cert;
                    _this.httpsServer = HTTPS.createServer(tslib_1.__assign(tslib_1.__assign({}, profileConfig.https), { key: key, cert: cert }), _this.app);
                }
                if ((_a = profileConfig === null || profileConfig === void 0 ? void 0 : profileConfig.dev) === null || _a === void 0 ? void 0 : _a.showExternalIp) {
                    var interfaces = require("os").networkInterfaces();
                    if ((_b = profileConfig === null || profileConfig === void 0 ? void 0 : profileConfig.dev) === null || _b === void 0 ? void 0 : _b.interfaceNetwork) {
                        var inter = interfaces[profileConfig.dev.interfaceNetwork];
                        if (inter) {
                            _this.externalIp = inter.find(function (item) {
                                return item.family == 'IPv4';
                            }).address;
                        }
                        else {
                            console.error("\nLa interf\u00E1z de red \"" + profileConfig.dev.interfaceNetwork + "\" no existe!.\nSe pueden usar las isguientes interfaces:\n" + Object.keys(interfaces).join(', '));
                        }
                    }
                    else {
                        console.error("\nNo se defini\u00F3 una interfaz de red.\nSe pueden usar las isguientes interfaces:\n" + Object.keys(interfaces).join(', '));
                    }
                }
                if ((_c = profileConfig === null || profileConfig === void 0 ? void 0 : profileConfig.events) === null || _c === void 0 ? void 0 : _c.beforeConfig) {
                    _this.app = profileConfig.events.beforeConfig(_this.app);
                }
                if (profileConfig === null || profileConfig === void 0 ? void 0 : profileConfig.pathsPublic) {
                    profileConfig.pathsPublic.forEach(function (path) {
                        var dirPublic = Path.normalize(_this.rootDir + "/" + path.dir);
                        _this.app.use(path.route, express.static(dirPublic));
                    });
                }
                if (profileConfig === null || profileConfig === void 0 ? void 0 : profileConfig.ports) {
                    _this.ports.http = (process.env.PORT ? parseInt(process.env.PORT) : profileConfig.ports.http || 5000);
                }
                else {
                    _this.ports.http = (process.env.PORT ? parseInt(process.env.PORT) : 5000);
                }
                if (_this.isHttps) {
                    _this.ports.https = process.env.PORT ? parseInt(process.env.PORT) : profileConfig.ports ? (profileConfig.ports.https || 5001) : 5001;
                }
                _this.app.use(bodyParser.json());
                _this.app.use(bodyParser.urlencoded({ extended: false }));
                _this.app.use(cookieParser());
                _this.app.use(formidableMiddleware(profileConfig.formidableOptions, profileConfig.formidableEvents));
                if ((_d = profileConfig === null || profileConfig === void 0 ? void 0 : profileConfig.events) === null || _d === void 0 ? void 0 : _d.afterConfig) {
                    _this.app = profileConfig.events.afterConfig(_this.app);
                }
                core_1.Log('Express instanciado!', _this.useLogger);
                core_1.Log('Cargando controladores HTTP ...', _this.useLogger);
                _this.HTTPControllersDeclarations = require("" + dirControllers).default;
                for (var _i = 0, _g = _this.HTTPControllersDeclarations; _i < _g.length; _i++) {
                    var controller = _g[_i];
                    _this.HTTPControllersInstances.push(new controller(_this.app, _this.useLogger, _this.libraryManager));
                }
                core_1.Log('Controladores cargados!', _this.useLogger);
                if ((_e = profileConfig === null || profileConfig === void 0 ? void 0 : profileConfig.events) === null || _e === void 0 ? void 0 : _e.beforeStarting) {
                    profileConfig.events.beforeStarting(_this.app);
                }
                _this.httpServer.listen(_this.ports.http, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        if (this.isHttps) {
                            this.httpsServer.listen(this.ports.https, function () {
                                resolve();
                            });
                        }
                        else {
                            resolve();
                        }
                        return [2];
                    });
                }); });
            }
            else {
                reject('No se encontraron controladores HTTP.');
            }
        });
    };
    return HTTPServer;
}());
exports.HTTPServer = HTTPServer;
//# sourceMappingURL=server.js.map
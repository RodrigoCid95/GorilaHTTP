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
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var pathConfig, error_1;
            var _a, _b, _c, _d, _e;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        pathConfig = Path.normalize(this.rootDir + "/config/index.js");
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 10, , 11]);
                        if (!fs.existsSync(pathConfig)) return [3, 8];
                        this.loaderConfig = require(pathConfig).default;
                        if (!(((_c = (_b = (_a = this.loaderConfig) === null || _a === void 0 ? void 0 : _a['__proto__']) === null || _b === void 0 ? void 0 : _b['constructor']) === null || _c === void 0 ? void 0 : _c.name) === 'LoaderConfig')) return [3, 6];
                        this.useLogger = (_e = (_d = this.loaderConfig.getConfig('GorilaHttp')) === null || _d === void 0 ? void 0 : _d.dev) === null || _e === void 0 ? void 0 : _e.logger;
                        core_1.Log('Iniciando http server ...', this.useLogger);
                        if (!fs.existsSync(Path.normalize(this.rootDir + "/libraries/index.js"))) return [3, 3];
                        return [4, this.loadLibraries()];
                    case 2:
                        _f.sent();
                        resolve();
                        return [3, 5];
                    case 3: return [4, this.runHTTPServer()];
                    case 4:
                        _f.sent();
                        resolve();
                        _f.label = 5;
                    case 5: return [3, 7];
                    case 6: throw new Error("En el m\u00F3dulo exportado en " + pathConfig + " no se encuentra una instacia v\u00E1lida de configuraci\u00F3n,");
                    case 7: return [3, 9];
                    case 8: throw new Error("No se encontro el módulo de configuración, asegurate haberlo declarado.");
                    case 9: return [3, 11];
                    case 10:
                        error_1 = _f.sent();
                        reject(error_1);
                        return [3, 11];
                    case 11: return [2];
                }
            });
        }); });
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
                var profileConfig = _this.loaderConfig.getConfig('GorilaHttp') || {};
                _this.httpServer = profileConfig.http ? HTTP.createServer(profileConfig.http, _this.app) : HTTP.createServer(_this.app);
                _this.isHttps = (profileConfig.https !== undefined);
                if (_this.isHttps) {
                    _this.httpsServer = profileConfig.https ? HTTPS.createServer(profileConfig.https, _this.app) : HTTPS.createServer(_this.app);
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
                if ((_d = profileConfig === null || profileConfig === void 0 ? void 0 : profileConfig.events) === null || _d === void 0 ? void 0 : _d.afterConfig) {
                    _this.app = profileConfig.events.afterConfig(_this.app);
                }
                core_1.Log('Express instanciado!', _this.useLogger);
                core_1.Log('Cargando controladores HTTP ...', _this.useLogger);
                _this.HTTPControllersDeclarations = require("" + dirControllers).default;
                for (var _i = 0, _f = _this.HTTPControllersDeclarations; _i < _f.length; _i++) {
                    var controller = _f[_i];
                    _this.HTTPControllersInstances.push(new controller(_this.useLogger, _this.libraryManager));
                }
                for (var _g = 0, _h = _this.HTTPControllersInstances; _g < _h.length; _g++) {
                    var controller = _h[_g];
                    if (controller['prefix']) {
                        var firsteChart = controller['prefix'][0];
                        var lastChart = controller['prefix'][(controller['prefix'].length - 1)];
                        if (lastChart === '/') {
                            controller['prefix'].pop();
                        }
                        if (firsteChart !== '/') {
                            controller['prefix'] = '/' + controller['prefix'];
                        }
                        _this.app.use(controller['prefix'], controller['router']);
                    }
                    else {
                        _this.app.use(controller['router']);
                    }
                    delete controller['router'];
                }
                if (_this.HTTPControllersInstances.length === 0) {
                    throw new Error("No se encontraron controladores HTTP.");
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
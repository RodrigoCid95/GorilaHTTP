/// <reference types="node" />
import https from 'https';
import http from 'http';
import express from 'express';
export interface ProfileGorilaHttp {
    https?: https.ServerOptions;
    http?: http.ServerOptions;
    events?: {
        beforeConfig?: (app: express.Express) => any;
        afterConfig?: (app: express.Express) => any;
        beforeStarting?: (app: express.Express) => any;
        onExitProccess?: () => void;
    };
    pathsPublic?: PathPublic[];
    dev?: Dev;
    ports?: Ports;
}
export interface HTTPRequest extends express.Request {
    fields: {
        [x: string]: any;
    };
    files: {
        [x: string]: any;
    };
}
export declare type HTTPResponse = express.Response;
export interface Ports {
    http: number;
    https?: number;
}
export interface Dev {
    showExternalIp: boolean;
    interfaceNetwork: string;
    logger: boolean;
}
export interface PathPublic {
    route: string;
    dir: string;
}

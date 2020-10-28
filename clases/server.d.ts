/// <reference types="node" />
import * as HTTP from 'http';
import * as HTTPS from 'https';
import { LibraryManager, LoaderConfig } from '@gorila/core';
import { Ports } from '..';
export declare class HTTPServer {
    private rootDir;
    app: import("express-serve-static-core").Express;
    useLogger: boolean;
    libraryManager: LibraryManager;
    isHttps: boolean;
    externalIp: string;
    ports: Ports;
    httpServer: HTTP.Server;
    httpsServer: HTTPS.Server;
    loaderConfig: LoaderConfig;
    private HTTPControllersDeclarations;
    private HTTPControllersInstances;
    constructor(rootDir: string);
    init(): Promise<void>;
    private loadLibraries;
    private runHTTPServer;
}

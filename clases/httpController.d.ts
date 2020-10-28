import express from 'express';
import { LibraryManager } from '@gorila/core';
export declare class HTTPController {
    express: express.Express;
    useLogger: boolean;
    private libraryManager;
    private routes;
    private models;
    constructor(express: express.Express, useLogger: boolean, libraryManager: LibraryManager);
    log(content: string, useLogger?: boolean): void;
}

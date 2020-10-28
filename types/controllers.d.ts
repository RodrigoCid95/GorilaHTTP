import { HTTPController } from '../clases/httpController';
import express from 'express';
import { LibraryManager } from '@gorila/core';
export interface HTTPConstructable<T> {
    new (express: express.Express, useLogger: boolean, lm: LibraryManager): T;
}
export declare type HTTPControllers = HTTPConstructable<HTTPController>[];

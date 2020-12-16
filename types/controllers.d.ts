import { HTTPController } from '../clases/httpController';
import { LibraryManager } from '@gorila/core';
export interface HTTPConstructable<T> {
    new (useLogger: boolean, lm: LibraryManager): T;
}
export declare type HTTPControllers = HTTPConstructable<HTTPController>[];

/// <reference types="node" />
import https from 'https';
import { Part, Fields, Files } from 'formidable';
import http from 'http';
import express from 'express';
export interface ProfileGorilaHttp {
    https?: https.ServerOptions;
    events?: {
        beforeConfig?: (app: express.Express) => any;
        afterConfig?: (app: express.Express) => any;
        beforeStarting?: (app: express.Express) => any;
        onExitProccess?: () => void;
    };
    pathsPublic?: PathPublic[];
    dev?: Dev;
    ports?: Ports;
    formidableOptions?: FormidableOptions;
    formidableEvents?: FormidableEvents;
}
export declare type FormidableEvents = Array<FormidableEventProgress | FormidableEventField | FormidableEventFileBegin | FormidableEventFile | FormidableEventError | FormidableEventAborted | FormidableEventEnd>;
export interface HTTPRequest extends express.Request {
    fields: {
        [x: string]: any;
    };
    files: {
        [x: string]: any;
    };
}
export declare type HTTPResponse = express.Response;
export interface FormidableEventProgress {
    event: 'progress';
    action: (bytesReceived: any, bytesExpected: any) => void;
}
export interface FormidableEventField {
    event: 'field';
    action: (name: any, value: any) => void;
}
export interface FormidableEventFileBegin {
    event: 'fileBegin';
    action: (name: any, file: any) => void;
}
export interface FormidableEventFile {
    event: 'file';
    action: (name: any, file: any) => void;
}
export interface FormidableEventError {
    event: 'error';
    action: (err: any) => void;
}
export interface FormidableEventAborted {
    event: 'aborted';
    action: () => void;
}
export interface FormidableEventEnd {
    event: 'end';
    action: () => void;
}
export interface FormidableOptions {
    encoding?: string;
    uploadDir?: string;
    keepExtensions?: boolean;
    maxFileSize?: number;
    maxFieldsSize?: number;
    maxFields?: number;
    hash?: string | boolean;
    multiples?: boolean;
    type?: string;
    bytesReceived?: number;
    bytesExpected?: number;
    onPart?: (part: Part) => void;
    handlePart?: (part: Part) => void;
    parse?: (req: http.IncomingMessage, callback?: (err: any, fields: Fields, files: Files) => any) => void;
}
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

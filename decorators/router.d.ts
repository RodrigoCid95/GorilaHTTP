interface options {
    path: string;
    middlewares: string[];
}
export declare function Get(path: string | options): (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
export declare function Post(path: string | options): (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
export declare function Prefix(prefix: string): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        prefix: string;
    };
} & T;
export {};

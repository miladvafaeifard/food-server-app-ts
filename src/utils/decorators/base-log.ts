﻿import {BaseLogger} from "./../loggers";

export function BaseLog(logger: BaseLogger) {
    console.log('called');
    return (target: object, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            const returnValue = originalMethod.apply(this, args);

            logger.log(`Called '${methodName}'\n` +
                `Arguments: ${JSON.stringify(args)}\n` +
                `Return value: ${JSON.stringify(returnValue)}`);
        };

        return descriptor;
    };
}

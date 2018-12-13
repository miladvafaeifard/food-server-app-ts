import {Database} from "./../../utils";

export class MockDatabase<T> implements Database<T> {
    private readonly items: { [key: string]: T; } = {};
    private currentKey = 0;

    constructor(private readonly primaryKeyPropertyName: keyof T) {
    }

    list(): Promise<T[]> {
        return Promise.resolve(Object.keys(this.items).map(key => this.items[key]));
    }

    insertUpdate(item: T): Promise<T> {
        const key = this.getKeyFromItem(item);
        this.items[key] = item;

        // there is currently no way to restrict a "keyof" to only be from properties of a certain type
        // so we need to assert this as any
        item[this.primaryKeyPropertyName] = key as any;

        return Promise.resolve(item);
    }

    remove(primaryKey: string): Promise<number> {
        if (this.items[primaryKey] == null)
            return Promise.resolve(0);

        delete this.items[primaryKey];

        return Promise.resolve(1);
    }

    private getKeyFromItem(item: T) {
        const keyValue = item[this.primaryKeyPropertyName];
        if (keyValue == null)
            return (++this.currentKey).toString();
        if (typeof keyValue !== "string")
            throw new Error(`Property used for primary key must be a string.`);
        return keyValue;
    }
}

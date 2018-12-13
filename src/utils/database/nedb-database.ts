import * as path from "path";
import * as Datastore from "nedb";
import * as fs from "fs";
import {ObjectUtils} from "./../object-utils";
import {Database} from "./database";

export class NedbDatabase<T> implements Database<T> {
    private constructor(private readonly db: Datastore, private readonly primaryKeyPropertyName: keyof T) {
    }

    static async getInstanceForFile<T>(options: { dir: string, fileName: string, primaryKeyPropertyName: keyof T }) {
        const db = new Datastore({ filename: path.join(options.dir, options.fileName + ".db") });
        return await this.loadDatabase(db, options.primaryKeyPropertyName);
    }

    static async getInstanceInMemory<T>(options: { primaryKeyPropertyName: keyof T }) {
        const db = new Datastore();
        return await this.loadDatabase(db, options.primaryKeyPropertyName);
    }

    list() {
        return new Promise<T[]>((resolve, reject) => {
            this.db.find<T>({}, (err, items) => {
                items.forEach(item => {
                    this.fillItemWithExternalPrimaryKey(item);
                });

                err ? reject(err) : resolve(items);
            });
        });
    }

    insertUpdate(item: T) {
        return new Promise<T>((resolve, reject) => {
            const query = this.getItemQuery(item);
            const clonedItem = ObjectUtils.deepClone(item);
            this.fillItemWithInternalPrimaryKey(clonedItem);

            this.db.update(query, clonedItem, { multi: false, upsert: true }, (err, numReplaced, upsertedItem: T) => {
                if (err) {
                    reject(err);
                    return;
                }

                const result = upsertedItem == null ? clonedItem : upsertedItem;
                this.fillItemWithExternalPrimaryKey(result);
                resolve(result);
            });
        });
    }

    remove(primaryKey: string): Promise<number> {
        const query = this.getPrimaryKeyQuery(primaryKey);

        return new Promise<number>((resolve, reject) => {
            this.db.remove(query, (err, numberRemoved) => {
                err ? reject(err) : resolve(numberRemoved);
            });
        });
    }

    private fillItemWithExternalPrimaryKey(dbItem: T) {
        // it's easier to use the any type here. It's constrained to within this method and its exposure is limited
        const item: any = dbItem;
        // nedb puts the primary key on the object as _id
        if (item != null && this.primaryKeyPropertyName != null && item._id != null) {
            item[this.primaryKeyPropertyName] = item._id;
            delete item._id;
        }
    }

    private fillItemWithInternalPrimaryKey(dbItem: T) {
        const item: any = dbItem;
        if (item != null && this.primaryKeyPropertyName != null && item[this.primaryKeyPropertyName] != null) {
            item._id = dbItem[this.primaryKeyPropertyName];
            delete item[this.primaryKeyPropertyName];
        }
    }

    private getItemQuery(item: T) {
        return { _id: item[this.primaryKeyPropertyName] };
    }

    private getPrimaryKeyQuery(primaryKey: string) {
        return { _id: primaryKey };
    }

    private static loadDatabase<T>(db: Datastore, primaryKeyPropertyName: keyof T) {
        return new Promise<NedbDatabase<T>>((resolve, reject) => {
            db.loadDatabase(err => {
                if (err)
                    reject(err);
                else
                    resolve(new NedbDatabase<T>(db, primaryKeyPropertyName));
            });
        });
    }
}

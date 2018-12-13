export interface Database<T> {
    list(): Promise<T[]>;
    insertUpdate(item: T): Promise<T>;
    remove(primaryKey: string): Promise<number>;
}

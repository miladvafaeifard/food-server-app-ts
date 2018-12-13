import {Database} from "./../utils";
import {Order} from "./../models";

export class OrderStorage {
    constructor(private readonly orderDB: Database<Order>) {
    }

    list() {
        return this.orderDB.list();
    }

    insertUpdate(order: Order) {
        return this.orderDB.insertUpdate(order);
    }

    remove(orderID: string) {
        return this.orderDB.remove(orderID);
    }
}

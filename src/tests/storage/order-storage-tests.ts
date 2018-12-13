import * as assert from "assert";
import {Order} from "./../../models";
import {OrderStorage} from "./../../storage";
import {ObjectUtils} from "./../../utils";
import {getMockOrder, MockDatabase} from "./../mocks";

function getStorage() {
    return new OrderStorage(new MockDatabase("orderID"));
}

describe("OrderStorage", () => {
    describe("#insertUpdate()", () => {
        it("should set the primary key after inserting into the database", async () => {
            const insertItem = getMockOrder();
            const orderStorage = await getStorage();
            assert.equal(insertItem.orderID, null);
            await orderStorage.insertUpdate(insertItem);
            assert.notEqual(insertItem.orderID, null);
        });

        it("should insert then update the value in the database", async () => {
            const insertItem = getMockOrder();
            const orderStorage = await getStorage();
            await orderStorage.insertUpdate(insertItem);
            const updateItem = ObjectUtils.deepClone(insertItem);
            await orderStorage.insertUpdate(updateItem);
            assert.equal(updateItem.orderID, insertItem.orderID);
        });
    });

    describe("#list()", () => {
        it("should list items inserted", async () => {
            const insertItem = getMockOrder();
            const orderStorage = await getStorage();
            await orderStorage.insertUpdate(insertItem);
            const orders = await orderStorage.list();
            assert.equal(orders.length, 1);
        });
    });

    describe("#remove()", () => {
        it("should remove the inserted item", async () => {
            const insertItem = getMockOrder();
            const orderStorage = await getStorage();
            await orderStorage.insertUpdate(insertItem);
            await orderStorage.remove(insertItem.orderID!);
            const orders = await orderStorage.list();
            assert.equal(orders.length, 0);
        });
    });
});

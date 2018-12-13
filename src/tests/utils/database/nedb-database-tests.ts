import * as assert from "assert";
import {NedbDatabase} from "./../../../utils";

describe("NedbDatabase", () => {
    interface MockObject {
        id?: string;
        prop: string;
    }

    function getInstance() {
        return NedbDatabase.getInstanceInMemory<MockObject>({
            primaryKeyPropertyName: "id"
        });
    }

    function getMockObject(propValue: string): MockObject {
        return {
            prop: propValue
        };
    }

    describe("#insertUpdate()", () => {
        it("should insert when first calling", async () => {
            const db = await getInstance();
            const val = "val";
            const mockObject = await db.insertUpdate(getMockObject(val));
            assert.notEqual(mockObject.id, null);
            assert.equal(mockObject.prop, val);
        });

        it("should update after inserting", async () => {
            const db = await getInstance();
            const val = "val";
            const insertedObject = await db.insertUpdate(getMockObject(val));
            const newVal = "newVal";
            insertedObject.prop = newVal;
            const updatedObject = await db.insertUpdate(insertedObject);
            assert.equal(updatedObject.id, insertedObject.id);
            assert.equal(updatedObject.prop, newVal);
        });
    });

    describe("#list()", () => {
        it("should return the items from the database", async () => {
            const db = await getInstance();
            const val = "val";
            const insertedObject = await db.insertUpdate(getMockObject(val));
            const selectedObjects = await db.list();
            assert.equal(selectedObjects[0].id, insertedObject.id);
            assert.equal(selectedObjects[0].prop, val);
        });
    });

    describe("#remove()", () => {
        it("should remove an item from the database", async () => {
            const db = await getInstance();
            const val = "val";
            const insertedObject = await db.insertUpdate(getMockObject(val));
            await db.remove(insertedObject.id!);
            const selectedObjects = await db.list();
            assert.equal(selectedObjects.length, 0);
        });
    });
});

import * as assert from "assert";
import {FoodItem} from "./../../models";
import {FoodItemStorage} from "./../../storage";
import {ObjectUtils} from "./../../utils";
import {getMockFoodItem, MockDatabase} from "./../mocks";

function getStorage() {
    return new FoodItemStorage(new MockDatabase("foodItemID"));
}

describe("FoodItemStorage", () => {
    describe("#insertUpdate()", () => {
        it("should set the primary key after inserting into the database", async () => {
            const insertItem = getMockFoodItem();
            const foodItemStorage = await getStorage();
            assert.equal(insertItem.foodItemID, null);
            await foodItemStorage.insertUpdate(insertItem);
            assert.notEqual(insertItem.foodItemID, null);
        });

        it("should insert then update the value in the database", async () => {
            const insertItem = getMockFoodItem();
            const foodItemStorage = await getStorage();
            await foodItemStorage.insertUpdate(insertItem);
            const updateItem = ObjectUtils.deepClone(insertItem);
            await foodItemStorage.insertUpdate(updateItem);
            assert.equal(updateItem.foodItemID, insertItem.foodItemID);
        });
    });

    describe("#list()", () => {
        it("should list items inserted", async () => {
            const insertItem = getMockFoodItem();
            const foodItemStorage = await getStorage();
            await foodItemStorage.insertUpdate(insertItem);
            const foodItems = await foodItemStorage.list();
            assert.equal(foodItems.length, 1);
        });
    });

    describe("#remove()", () => {
        it("should remove the inserted item", async () => {
            const insertItem = getMockFoodItem();
            const foodItemStorage = await getStorage();
            await foodItemStorage.insertUpdate(insertItem);
            await foodItemStorage.remove(insertItem.foodItemID!);
            const foodItems = await foodItemStorage.list();
            assert.equal(foodItems.length, 0);
        });
    });
});

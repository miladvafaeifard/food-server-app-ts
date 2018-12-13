import * as assert from "assert";
import * as request from "supertest";
import app from "./../../app";
import {FoodItem} from "./../../models";
import {getMockFoodItem} from "./../mocks";

describe("app food-items", () => {
    async function insertTest() {
        return new Promise<FoodItem>((resolve, reject) => {
            request(app)
                .post("/food-items")
                .send(getMockFoodItem())
                .expect(200)
                .end((err: any, res: request.Response) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const foodItem = res.body as FoodItem;
                    assert.notEqual(foodItem.foodItemID, null);
                    resolve(foodItem);
                });
        });
    }

    describe("GET /list" , () => {
        it("should successfully request the list method", done => {
            insertTest().then(foodItem => {
                request(app)
                    .get(`/food-items/list`)
                    .expect(200, done);
            });
        });
    });

    describe("POST /" , () => {
        it("should insert the food item", async () => {
            const foodItem = await insertTest();
            assert.notEqual(foodItem, null);
        });
    });

    describe("POST /remove" , () => {
        it("should successfully requre the remove method", done => {
            insertTest().then(foodItem => {
                request(app)
                    .post(`/food-items/remove`)
                    .send({ foodItemID: foodItem.foodItemID })
                    .expect(200, done);
            });
        });
    });
});

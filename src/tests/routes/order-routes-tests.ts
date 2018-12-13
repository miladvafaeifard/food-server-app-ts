import * as assert from "assert";
import * as request from "supertest";
import app from "./../../app";
import {Order} from "./../../models";
import {getMockOrder} from "./../mocks";

describe("app orders", () => {
    function insertTest() {
        return new Promise<Order>((resolve, reject) => {
            request(app)
                .post("/orders")
                .send(getMockOrder())
                .expect(200)
                .end((err: any, res: request.Response) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const order = res.body as Order;
                    assert.notEqual(order.orderID, null);
                    resolve(order);
                });
        });
    }

    describe("GET /list" , () => {
        it("should successfully request the list method", done => {
            insertTest().then(order => {
                request(app)
                    .get(`/orders/list`)
                    .expect(200, done);
            });
        });
    });

    describe("POST /" , () => {
        it("should insert the order", async () => {
            const order = await insertTest();
            assert.notEqual(order, null);
        });
    });

    describe("POST /remove" , () => {
        it("should successfully request the remove method", done => {
            insertTest().then(order => {
                request(app)
                    .post(`/orders/remove`)
                    .send({ orderID: order.orderID })
                    .expect(200, done);
            });
        });
    });
});

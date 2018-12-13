import {MainFactory} from "./../main-factory";
import {Order} from "./../models";
import {Use, Get, Post, Routes} from "server-bridge";

@Use("/orders")
export class OrderRoutes extends Routes {
    @Get("/list")
    async list() {
        const orderStorage = await MainFactory.instance.createOrderStorage();
        return await orderStorage.list();
    }

    @Post("/remove")
    async remove(opts: { orderID: string }) {
        const orderStorage = await MainFactory.instance.createOrderStorage();
        return await orderStorage.remove(opts.orderID);
    }

    @Post("/")
    async set(order: Order) {
        const orderStorage = await MainFactory.instance.createOrderStorage();
        return await orderStorage.insertUpdate(order);
    }
}

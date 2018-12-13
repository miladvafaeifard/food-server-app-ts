import {Order, OrderPriority, OrderStatus} from "./../../models";

export function getMockOrder(): Order {
    return {
        orderID: undefined,
        name: "Mr. Frank",
        city: "Toronto",
        receivedDate: new Date(),
        address1: "178 Victoria Street",
        address2: "",
        foodItems: [],
        priority: OrderPriority.Low,
        status: OrderStatus.Enroute
    };
}

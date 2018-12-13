import {FoodItem, FoodItemStatus} from "./../../models";

export function getMockFoodItem(): FoodItem {
    return {
        foodItemID: undefined,
        name: "Pizza",
        price: 12.78,
        status: FoodItemStatus.Active
    };
}

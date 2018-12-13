import {MainFactory} from "./../main-factory";
import {FoodItem} from "./../models";
import {Use, Get, Post, Routes} from "server-bridge";

@Use("/food-items")
export class FoodItemRoutes extends Routes {
    @Get("/list")
    async list() {
        const foodItemStorage = await MainFactory.instance.createFoodItemStorage();
        return await foodItemStorage.list();
    }

    @Post("/remove")
    async remove(opts: { foodItemID: string }) {
        const foodItemStorage = await MainFactory.instance.createFoodItemStorage();
        return await foodItemStorage.remove(opts.foodItemID);
    }

    @Post("/")
    async set(foodItem: FoodItem) {
        const foodItemStorage = await MainFactory.instance.createFoodItemStorage();
        return await foodItemStorage.insertUpdate(foodItem);
    }
}

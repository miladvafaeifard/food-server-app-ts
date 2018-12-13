import defaultConfig, {ConfigStructure} from "./config/config";
import {FoodItemStorage, OrderStorage} from "./storage";
import {FoodItem, Order} from "./models";
import {BaseLogger, ConsoleLogger, FileLogger, DefaultFileSystemHost, NedbDatabase} from "./utils";

export class MainFactory {
    private static cachedInstance: MainFactory;
    private consoleLogger!: ConsoleLogger;
    private fileLogger!: FileLogger;

    private constructor(private readonly config: ConfigStructure) {
    }

    static get instance() {
        return MainFactory.cachedInstance || (MainFactory.cachedInstance = new MainFactory(defaultConfig));
    }

    async createFoodItemStorage() {
        const foodItemDB = await NedbDatabase.getInstanceForFile<FoodItem>({
            dir: this.config.storage.dirPath,
            fileName: this.config.storage.foodItemsFileName,
            primaryKeyPropertyName: "foodItemID"
        });
        return new FoodItemStorage(foodItemDB);
    }

    async createOrderStorage() {
        const orderDB = await NedbDatabase.getInstanceForFile<Order>({
            dir: this.config.storage.dirPath,
            fileName: this.config.storage.ordersFileName,
            primaryKeyPropertyName: "orderID"
        });
        return new OrderStorage(orderDB);
    }

    getLogger(): BaseLogger {
        return this.getConsoleLogger();
    }

    getConsoleLogger() {
        return this.consoleLogger || (this.consoleLogger = new ConsoleLogger());
    }

    getFileLogger() {
        return this.fileLogger || (this.fileLogger = new FileLogger(new DefaultFileSystemHost(), this.config.log.fileName));
    }
}

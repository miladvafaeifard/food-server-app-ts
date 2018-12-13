import * as path from "path";
import {ConfigStructure} from "./structure/config-structure";

const currentDir = path.resolve(__dirname);

const defaultConfig: ConfigStructure = {
    log: {
        fileName: path.join(currentDir, "../log/log.txt")
    },
    server: {
        dirPath: "/",
        port: process.env.PORT == null ? 8082 : parseInt(process.env.PORT!, 10)
    },
    storage: {
        dirPath: path.join(currentDir, "../storage/data"),
        foodItemsFileName: "food-items",
        ordersFileName: "orders"
    }
};

export default defaultConfig;

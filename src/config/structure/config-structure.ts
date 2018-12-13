export interface ConfigStructure {
    server: {
        dirPath: string;
        port: number;
    };
    storage: {
        dirPath: string;
        foodItemsFileName: string;
        ordersFileName: string;
    };
    log: {
        fileName: string;
    };
}

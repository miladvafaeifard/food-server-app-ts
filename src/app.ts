// polyfills
import "./utils/polyfills";

// imports
import * as express from "express";
import * as bodyParser from "body-parser";
import config from "./config/config";
import {initializeRoutes} from "server-bridge-express";
import {MainFactory} from "./main-factory";

// routes
import {FoodItemRoutes} from "./routes/food-item-routes";
import {OrderRoutes} from "./routes/order-routes";

// express setup
const app = express();
const router = express.Router();
const logger = MainFactory.instance.getLogger();

app.use(bodyParser.json());

const allowAnyDomain: express.RequestHandler = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};

const logRequests: express.RequestHandler = (req, res, next) => {
    logger.logRequest(req);
    next();
};

app.use(allowAnyDomain);
app.use(logRequests);

initializeRoutes(router, [FoodItemRoutes, OrderRoutes]);
app.use(config.server.dirPath, router);

const server = app.listen(config.server.port, () => {
    logger.log(`Running on port ${server.address().port}`);
});

export default app;

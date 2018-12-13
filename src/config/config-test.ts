import config from "./config-default";
import * as path from "path";
import {ObjectUtils} from "./../utils/object-utils";
import {ConfigStructure} from "./structure/config-structure";

const currentDir = path.resolve(__dirname);
const testConfig = ObjectUtils.deepClone(config);

// test specific changes to configuration
testConfig.storage.dirPath = path.join(currentDir, "../storage/data-tests");

export default testConfig;

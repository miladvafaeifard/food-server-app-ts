import * as path from "path";

const currentDir = path.resolve(__dirname);

const CONFIG = {
    STORAGE: {
        DIR: path.join(currentDir, "temp")
    }
};

export default CONFIG;

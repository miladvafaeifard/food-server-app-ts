import * as rimraf from "rimraf";
import "./../utils/polyfills";
import CONFIG from "./test-config";

before(done => {
    // cleanup
    rimraf(CONFIG.STORAGE.DIR, done);
});

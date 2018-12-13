// Example showing a test file for a definition file
import * as rimraf from "rimraf";

rimraf("C:\\Temp", (error: Error) => { console.log(error); });
rimraf.sync("C:\\Temp");

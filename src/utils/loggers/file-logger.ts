import * as os from "os";
import {FileSystemHost} from "./../file-system";
import {BaseLogger} from "./base-logger";

export class FileLogger extends BaseLogger {
    constructor(private readonly fileSystem: FileSystemHost, private readonly filePath: string) {
        super();
    }

    log(message: string) {
        return this.fileSystem.appendFile(this.filePath, message + os.EOL);
    }
}

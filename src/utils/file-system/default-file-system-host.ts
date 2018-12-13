import * as fs from "fs";
import {FileSystemHost} from "./file-system-host";

export class DefaultFileSystemHost implements FileSystemHost {
    appendFile(filePath: string, text: string) {
        return new Promise<void>((resolve, reject) => {
            fs.appendFile(filePath, text, err => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
}

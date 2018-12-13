import {FileSystemHost} from "./../../utils";

export class MockFileSystemHost implements FileSystemHost {
    private readonly writtenFiles: { [filePath: string]: string; } = {};

    appendFile(filePath: string, text: string) {
        this.writtenFiles[filePath] = (this.writtenFiles[filePath] || "") + text;
        return Promise.resolve<void>();
    }

    getFileText(filePath: string) {
        return this.writtenFiles[filePath] || "";
    }
}

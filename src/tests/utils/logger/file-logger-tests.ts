import * as assert from "assert";
import * as os from "os";
import {FileLogger} from "./../../../utils";
import {MockFileSystemHost} from "./../../mocks";

describe("FileLogger", () => {
    describe("#log()", () => {
        const fileSystemHost = new MockFileSystemHost();
        function fileDoesContainText(filePath: string, expectedText: string) {
            assert.equal(fileSystemHost.getFileText(filePath), expectedText);
        }

        it("should log the message to a file", async () => {
            const testLogFile1 = "test-log-file1.txt";
            const message = "My test message.";

            await new FileLogger(fileSystemHost, testLogFile1).log(message);
            fileDoesContainText(testLogFile1, message + os.EOL);
        });

        it("should append message to a file when adding another message", async () => {
            const testLogFile2 = "test-log-file2.txt";
            const message = "My test message.";
            const fileLogger = new FileLogger(fileSystemHost, testLogFile2);

            fileLogger.log(message);
            await fileLogger.log(message);
            fileDoesContainText(testLogFile2, message + os.EOL + message + os.EOL);
        });
    });
});

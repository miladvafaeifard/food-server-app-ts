import * as assert from "assert";
import {MockLogger} from "./../../mocks";
import {BaseLog} from "./../../../utils";

describe("BaseLog", () => {
    it("should log the method name, arguments, and return value", () => {
        const mockLogger = new MockLogger();
        class TestClass {
            @BaseLog(mockLogger)
            testMethod(str: string) {
                return "test";
            }
        }

        new TestClass().testMethod("s");

        assert.equal(mockLogger.getLastLoggedMessage(),
            `Called 'testMethod'\n` +
            `Arguments: ["s"]\n` +
            `Return value: "test"`);
    });
});

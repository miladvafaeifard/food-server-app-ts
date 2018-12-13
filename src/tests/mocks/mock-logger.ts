import {BaseLogger} from "../../utils";

export class MockLogger extends BaseLogger {
    private lastLog!: string;

    log(message: string) {
        this.lastLog = message;
    }

    getLastLoggedMessage() {
        return this.lastLog;
    }
}

export class ObjectUtils {
    private constructor() {
    }

    static deepClone<T>(obj: T) {
        return JSON.parse(JSON.stringify(obj)) as T;
    }
}

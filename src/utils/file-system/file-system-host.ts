export interface FileSystemHost {
    appendFile(filePath: string, text: string): Promise<void>;
}

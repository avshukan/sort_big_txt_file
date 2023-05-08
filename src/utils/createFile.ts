import { existsSync } from "fs";
import fileConfig from "../types/types"
import fileGenerator from "./fileGenerator"

const createFile = async (inputConfig: fileConfig): Promise<void> => {
    const { filename } = inputConfig;

    console.log(`File ${filename} generation started`)

    console.time(`File ${filename}`)

    if (existsSync(filename)) {
        console.log(`File ${filename} already exists`)
    } else {
        await fileGenerator(inputConfig)
    }

    console.log(`File ${filename} generation completed`)

    console.timeEnd(`File ${filename}`)
}

export default createFile;

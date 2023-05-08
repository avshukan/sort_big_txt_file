import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import lineGenerator from './lineGenerator';
import fileConfig from '../types/types';

function fileGenerator(config: fileConfig): Promise<void> {
    const {
        filename,
        minLineLength = 1,
        maxLineLength = minLineLength,
        minLinesCounter = 1,
        maxLinesCounter = minLinesCounter,
        minFileSize = 1,
        maxFileSize = minFileSize,
    } = config;

    const getLine = () => lineGenerator(minLineLength, maxLineLength);

    const writeStream = createWriteStream(filename);

    let linesCounter = 0;
    let fileSize = 0;

    function* pipeFunction() {
        while (linesCounter < maxLinesCounter
            && fileSize < maxFileSize
            && (linesCounter < minLinesCounter || fileSize < minFileSize)
        ) {
            const line = getLine() + '\n';
            linesCounter += 1;
            fileSize += line.length;
            yield line;
        }
    }

    const pipe = pipeline(pipeFunction, writeStream)
        .then(() => console.log(`Pipeline for ${filename} succeeded. Lines: ${linesCounter}. Size: ${fileSize}.`))
        .catch((err) => console.error(`Pipeline for ${filename} failed`, err))

    return pipe;
}

export default fileGenerator;

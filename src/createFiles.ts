import createFile from "./utils/createFile";
import configsData from '../files.config.json';
import fileConfig from "./types/types";

const configs: fileConfig[] = <fileConfig[]>configsData;

(async () => {
    for (const config of configs) {
        await createFile(config);
    }
})();

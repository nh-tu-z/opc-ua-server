import dotenv from 'dotenv';
import { IEnv, IEnvConfig } from '../interfaces/env';

// by default, the .env file is located in the same level of package.json
dotenv.config();

const getEnvVariables = (): IEnv => ({
    MQTT_PROTOCOL: process.env.MQTT_PROTOCOL
});

const getEnvConfig = (env: IEnv): IEnvConfig => {
    for (const [key, value] of Object.entries(env)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in .env.`);
        }
    }
    return env as IEnvConfig;
};

const env = getEnvVariables();

export const envConfig = getEnvConfig(env);
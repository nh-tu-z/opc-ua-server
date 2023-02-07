import { InitialToken } from '../interfaces/types/mqtt-msg-payload';

export function initialToken(token: string): string {
    let payload: InitialToken = {
        token
    };
    return JSON.stringify(payload);
}
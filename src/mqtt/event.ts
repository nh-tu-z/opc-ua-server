import { MqttClient } from 'mqtt';
import { green, red } from '../utils/log';
import { root } from '../constants/topic-pattern';
import { initialToken } from './payload-builder';
import { ConnectionMessagePayload } from '../interfaces/types/mqtt-msg-payload';

const baseServerTopic = `${root.server}/1`;
// token to receive data, TODO - should persist into db
let  receivedToken = '';

export const setupEventHandlers = (client: MqttClient): MqttClient => {
    const mqttProtocol = client.options.protocol;
    client.on('connect', () => {
      green(`connect successfully`, `[mqtt]`);

      client.subscribe([`${baseServerTopic}/#`], () => {
        console.log(`${mqttProtocol}: Subscribe to topic '${baseServerTopic}'`)
      });
    });

    client.on('reconnect', (error: string) => {
        console.log(`Reconnecting(${mqttProtocol}):`, error)
    });
      
    client.on('error', (error) => {
        console.log(`Cannot connect(${mqttProtocol}):`, error)
    });
      
    client.on('message', (topic, payload, packet) => {
        console.log('Received Message:', topic, payload.toString());
        if (topic === `${baseServerTopic}/connection`)
        {
          console.log(payload.toString());
          let json: ConnectionMessagePayload = JSON.parse(payload.toString());
          receivedToken = 'mqttjs_' + Math.random().toString(16).slice(3);
          client.publish(`${root.client}/${json.clientId}`, initialToken(receivedToken), { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error);
            }
          });
        }
        else if (topic === `${baseServerTopic}/${receivedToken}`)
        {
          console.log(payload.toString());

          // clone a new process and save data
        }
    });
    return client;
}
import { MqttClient } from 'mqtt';
import { green, red } from '../utils/log';

const topic = '/nodejs/mqtt';

export const setupEventHandlers = (client: MqttClient): MqttClient => {
    const mqttProtocol = client.options.protocol;
    client.on('connect', () => {
      green(`connect successfully`, `[mqtt]`);

      console.log(client);
      client.subscribe([topic], () => {
        console.log(`${mqttProtocol}: Subscribe to topic '${topic}'`)
      });
      client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
        if (error) {
          console.error(error);
        }
      });
    });

    client.on('reconnect', (error: string) => {
        console.log(`Reconnecting(${mqttProtocol}):`, error)
    });
      
    client.on('error', (error) => {
        console.log(`Cannot connect(${mqttProtocol}):`, error)
    });
      
    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
    });
    return client;
}
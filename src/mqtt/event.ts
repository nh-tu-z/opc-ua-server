import { MqttClient } from 'mqtt';
import { green, red } from '../utils/log';

const connectionGatewayTopic = 'connection-gateway/01';

export const setupEventHandlers = (client: MqttClient): MqttClient => {
    const mqttProtocol = client.options.protocol;
    client.on('connect', () => {
      green(`connect successfully`, `[mqtt]`);

      client.subscribe([connectionGatewayTopic], () => {
        console.log(`${mqttProtocol}: Subscribe to topic '${connectionGatewayTopic}'`)
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
        if (topic === connectionGatewayTopic)
        {
          console.log(payload.toString());
          let json = JSON.parse(payload.toString());
          client.publish(`connection-setup/${json.clientId}`, 'connection set up successfully', { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error);
            }
        });
        }
    });
    return client;
}
import * as mqtt from 'mqtt';
import { mqttOptions, mqttProtocols } from '../config/mqtt-config';
import { green, red } from '../utils/log';

// TODO - paste there to test
// env
(async function() {
    await import("dotenv/config")
  
    console.log(process.env)
})()

const host = '127.0.0.1';
const port = '8883';

export function connect(): void {
    console.log('tuhngo - mqtt connect')
    // default is mqtt, unencrypted tcp connection
    let connectUrl = `mqtt://${host}:${port}`;
    let mqttProtocol = process.env.MQTT_PROTOCOL as string;
    console.log('tuhngo - mqtt connect string', `${mqttProtocol}`)

    if (mqttProtocol && mqttProtocols.indexOf(mqttProtocol) === -1) {
        red(`protocol must one of mqtt, mqtts, ws, wss.`, `[mqtt]`);
    }
    else if (mqttProtocol === 'mqtts') {
        // mqtts， encrypted tcp connection
        connectUrl = `mqtts://${host}:8883`;
        //mqttOptions['ca'] = fs.readFileSync('./broker.emqx.io-ca.crt')
    }
    else if (mqttProtocol === 'ws') {
        console.log('tuhngo - ws protocol')
        // ws, unencrypted WebSocket connection
        const mountPath = '/mqtt'; // mount path, connect emqx via WebSocket
        connectUrl = `ws://${host}:8083${mountPath}`;
    }
    else if (mqttProtocol === 'wss') {
        // wss, encrypted WebSocket connection
        const mountPath = '/mqtt' // mount path, connect emqx via WebSocket
        connectUrl = `wss://${host}:8084${mountPath}`
        //mqttOptions['ca'] = fs.readFileSync('./broker.emqx.io-ca.crt')
    }
    else {}

    const topic = '/nodejs/mqtt'

    const client = mqtt.connect(connectUrl, mqttOptions);

    client.on('connect', () => {
        console.log(`${mqttProtocol}: Connected`);
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
};
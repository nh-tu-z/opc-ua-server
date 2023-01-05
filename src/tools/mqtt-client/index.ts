import * as figlet from 'figlet';
import { Command } from 'commander';

const program = new Command();

console.log(figlet.textSync("MQTT Client"));

program
    .version('1.0.0')
    .description('MQTT Client tool for mocking device')
    .option('-p, --protocol <type>', 'connect protocol: mqtt, mqtts, ws, wss. default is mqtt', 'mqtt')
    .parse(process.argv)

const options = program.opts();
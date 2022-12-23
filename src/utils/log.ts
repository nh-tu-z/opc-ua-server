import fs from 'fs'
import chalk from 'chalk'

const logToFile = (msg: string, instance: string) => {
    let date = new Date()
    fs.appendFile('log.txt', `${date.toISOString().slice(0, 19)}: ${instance} - ${msg} \r\n`, (err) => {
        if (err) return console.log(err)
    })
}

interface LoggerInterface {
    green(msg:String): void
    yellow(msg:String): void
    red(msg:String): void
}

class Logger implements LoggerInterface {

    constructor () {

    };

    green(msg : string, instance: string = 'LOG'): void {
        logToFile(msg, instance)
        console.log(` ${instance}: `, chalk.green(msg))
    };

    yellow (msg : string, instance: string = 'LOG'): void {
        logToFile(msg, instance)
        console.log(` ${instance}: `, chalk.yellow(msg))
    };

    red (msg : string, instance: string = 'LOG'): void {
        logToFile(msg, instance)
        console.log(` ${instance}: `, chalk.red(msg))
    };
}

export const logger = new Logger();
export const green = logger.green;
export const yellow = logger.yellow;
export const red = logger.red;
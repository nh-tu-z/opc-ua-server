import fs from 'fs'
import chalk from 'chalk'

const logToFile = (msg: string) => {
    let date = new Date()
    fs.appendFile('log.txt', `${date.toISOString().slice(0, 19)}: ${msg} \r\n`, (err) => {
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

    green(msg:string): void {
        logToFile(msg)
        console.log(' LOG: ', chalk.green(msg))
    };

    yellow (msg:string): void {
        logToFile(msg)
        console.log(' LOG: ', chalk.yellow(msg))
    };

    red (msg:string): void {
        logToFile(msg)
        console.log(' LOG: ', chalk.red(msg))
    };

    greenBright (msg:string) : void {
        logToFile(msg)
        console.log(' LOG: ', chalk.greenBright(msg))
    };
}

export const logger = new Logger();
export const green = logger.green;
export const yellow = logger.yellow;
export const red = logger.red;
export const greenBright = logger.greenBright;
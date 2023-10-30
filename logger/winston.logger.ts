import { createLogger, format, transports } from "winston";

const customFormat = format.combine(
    format.colorize(
        {
            message: true,
            colors: {
                info: "cyan",
                warn: "yellow",
                error: "red"
            }
        }
    ), 
    (format.printf(({timestamp, level, stack, context, message}) => {
        return `${timestamp} - [${level.toUpperCase().padEnd(7)}] - ${message}  -- (stack/context: ${stack || context})`
    }))
)

const options = {
    file: {
        filename: 'error.log',
        level: 'error'
    },
    console: {
        level: 'silly',
        handleExceptions: true
    }
}

const developmentLogger = {
    format: format.combine(
        format.errors({stack: true}),
        format.timestamp(),
        customFormat
    ),
    transports: [new transports.Console(options.console)]
}

const productionLogger = {
    format: format.combine(
        format.errors({stack: true}),
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File(options.file),
        new transports.File({
            filename: 'combine.log',
            level: 'info'
        })
    ]
}

const instanceLogger = (process.env.NODE_ENV === 'production') ? productionLogger : developmentLogger

export const instance = createLogger(instanceLogger)

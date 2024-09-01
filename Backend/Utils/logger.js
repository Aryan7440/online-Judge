const pino = require('pino')

global.logger = pino({
    transport: {
        target: "pino-pretty",
        options: {
            levelFirst: true,
            translateTime: true,
            colorize: true,
        },
    },
    translateTime: true,
})
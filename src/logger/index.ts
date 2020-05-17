import winston from 'winston'

const Logger: winston.Logger = winston.createLogger({

  level: 'info',
  format: winston.format.combine(

    winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
    winston.format.json()

  ),
  transports: [

    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' })

  ]

})

if(process.env.NODE_ENV !== 'production')
  Logger.add(new winston.transports.Console({ format: winston.format.simple() }))

export default Logger

import path from "path";
import winston, { createLogger, format } from "winston";
import split from "split";
import "winston-daily-rotate-file";
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${level}: ${timestamp}: ${message}`;
});

const transport = {
    app: new winston.transports.DailyRotateFile({
        filename: path.join(__dirname, "../../logs/app-%DATE%.log"),
        datePattern: "YYYY-MM-DD HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
        level: "debug"
    }),
    error: new winston.transports.DailyRotateFile({
        filename: path.join(__dirname, "../../logs/error-%DATE%.log"),
        datePattern: "YYYY-MM-DD HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
        level: "error"
    }),
    exceptions: new winston.transports.DailyRotateFile({
        filename: path.join(__dirname, "../../logs/exceptions-%DATE%.log"),
        datePattern: "YYYY-MM-DD HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
        handleExceptions: true
    }),
    console: new winston.transports.Console({ level: "debug" })
};

const logger = createLogger({
    format: combine(
        format((info) => {
            info.level = info.level.toUpperCase();
            return info;
        })(),
        timestamp(),
        myFormat
    ),
    transports: [transport.app, transport.console, transport.error, transport.exceptions]
});

const stream = split().on("data", function (line) {
    logger.debug(line);
});

export { logger, stream };

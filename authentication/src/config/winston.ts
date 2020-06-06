import path from "path";
import winston, { createLogger, format } from "winston";
import split from "split";
import "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf((data) => {
    return `[${data.level}]: ${data.timestamp}: ${data.message}`;
});

const errorFormat = printf((data) => {
    return `[${data.level}]: ${data.timestamp} - ${data.message} ${data.stack || ""}`;
});

const consoleFormat = printf((data) => {
    return `[${data.level}]: ${data.timestamp} : ${data.message} ${data.stack || ""} `;
});

const transports = {
    app: new winston.transports.DailyRotateFile({
        filename: path.join(__dirname, "../../logs/app-%DATE%.log"),
        datePattern: "YYYY-MM-DD HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
        level: "debug",
        format: logFormat
    }),
    error: new winston.transports.DailyRotateFile({
        filename: path.join(__dirname, "../../logs/error-%DATE%.log"),
        datePattern: "YYYY-MM-DD HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
        level: "error",
        format: errorFormat
    }),
    exceptions: new winston.transports.DailyRotateFile({
        filename: path.join(__dirname, "../../logs/exceptions-%DATE%.log"),
        datePattern: "YYYY-MM-DD HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
        format: errorFormat
    }),
    console: new winston.transports.Console({
        level: "debug",
        format: consoleFormat
    })
};

const logger = createLogger({
    format: combine(
        format.errors({ stack: true }),
        format((info) => {
            return {
                ...info,
                level: info.level.toUpperCase()
            };
        })(),
        colorize(),
        timestamp()
    ),
    transports: [transports.console, transports.app, transports.error],
    exceptionHandlers: [
        new winston.transports.DailyRotateFile({
            filename: path.join(__dirname, "../../logs/exceptions-%DATE%.log"),
            datePattern: "YYYY-MM-DD HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d"
        })
    ]
    // Logging rejectionHandlers is not working at the moment: see:https://github.com/winstonjs/winston/issues/1801
    // rejectionHandlers: [
    //     new winston.transports.DailyRotateFile({
    //         filename: path.join(__dirname, "../../logs/exceptions-%DATE%.log"),
    //         datePattern: "YYYY-MM-DD HH",
    //         zippedArchive: true,
    //         maxSize: "20m",
    //         maxFiles: "14d"
    //     })
    // ]
});

const stream = split().on("data", (line) => {
    logger.debug(line);
});

export { logger, stream };

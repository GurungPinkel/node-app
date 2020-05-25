import { Sequelize } from "sequelize";
import { logger } from "./winston";

if (
    !process.env.MYSQL_DATABASE ||
    !process.env.MYSQL_USERNAME ||
    !process.env.MYSQL_PASSWORD ||
    !process.env.MYSQL_HOST ||
    !process.env.MYSQL_PORT ||
    !process.env.MYSQL_MAX_POOL ||
    !process.env.MYSQL_MIN_POOL ||
    !process.env.MYSQL_AQUIRE ||
    !process.env.MYSQL_IDLE
) {
    throw new Error(
        `Ooops.. MySQL configuration missing! Check your environment variables for ${process.env.NODE_ENV}`
    );
}
const sequelize =
    process.env.NODE_ENV === "test"
        ? new Sequelize("sqlite::memory:", { logging: false })
        : new Sequelize(
              process.env.MYSQL_DATABASE,
              process.env.MYSQL_USERNAME,
              process.env.MYSQL_PASSWORD,
              {
                  host: process.env.MYSQL_HOST,
                  dialect: "mysql",
                  port: parseInt(process.env.MYSQL_PORT, 10),
                  pool: {
                      max: parseInt(process.env.MYSQL_MAX_POOL, 10), // Maximum number of connection in pool
                      min: parseInt(process.env.MYSQL_MIN_POOL, 10), // Minimum number of connection in pool
                      acquire: parseInt(process.env.MYSQL_AQUIRE, 10), // The maximum time, in milliseconds, that pool will try to get connection before throwing error
                      idle: parseInt(process.env.MYSQL_IDLE, 10) // The maximum time, in milliseconds, that a connection can be idle before being released.
                  },
                  define: {
                      freezeTableName: true,
                      timestamps: false
                  },
                  logging: (msg) => logger.info(msg),
                  benchmark: true
              }
          );

export { sequelize };

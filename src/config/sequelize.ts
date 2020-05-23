import { Sequelize } from "sequelize";
import { logger } from "./winston";

const sequelize = new Sequelize("authentication", "root", "mypass123", {
    host: "localhost",
    dialect: "mysql",
    port: 32772,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        freezeTableName: true,
        timestamps: false
    },
    logging: (msg) => logger.debug(msg)
});

export { sequelize };

import dotenv from "dotenv";
dotenv.config();
import { logger } from "./config/winston";
import { sequelize } from "./config/sequelize";
import app from "./app";

const { APP_PORT, MONGO_URI } = process.env;

if (!MONGO_URI) {
    logger.error("MongoDB configuration missing");
    throw new Error("MongoDB configuration missing");
}
const start = async () => {
    sequelize
        .authenticate()
        .then(() => {
            logger.debug("Successfully connected to mySQL");
            app.listen(APP_PORT, () => {
                logger.debug(`Auth is listening on port ${APP_PORT}!!`);
            });
        })
        .catch((err: Error) => {
            logger.error(err);
            throw err;
        });
};

start();

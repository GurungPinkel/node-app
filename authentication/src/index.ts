import app from "./app";
import { logger } from "./config/winston";
import { sequelize } from "./config/sequelize";

const { APP_PORT } = process.env;
const start = () => {
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

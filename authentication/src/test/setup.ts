import "../config/env";
import { sequelize } from "../config/sequelize";
import { logger } from "../config/winston";

// Disable the logger
logger.silent = true;
beforeAll(async () => {
    await sequelize
        .authenticate()
        .then(async () => {
            await sequelize.sync();
        })
        .catch((err: Error) => {
            throw err;
        });
});
afterEach(async () => {
    await sequelize.query("DELETE FROM USERS");
});
afterAll(async () => {
    await sequelize.close();
});

import "../config/env";
import { sequelize } from "../config/sequelize";
import { logger } from "../config/winston";
// Disable the logger
logger.silent = true;
beforeAll(async () => {
    sequelize
        .authenticate()
        .then(() => {
            // console.log("Connected to Database!");
        })
        .catch((err: Error) => {
            throw err;
        });
});
afterEach(async () => {
    await sequelize.query("Delete from USERS where ID>0");
});
afterAll(async () => {
    await sequelize.close();
});

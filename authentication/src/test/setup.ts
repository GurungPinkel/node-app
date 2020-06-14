import "../config/env";
import fetch from "jest-fetch-mock";
import { sequelize } from "../config/sequelize";
import { logger } from "../config/winston";

jest.setMock("node-fetch", fetch);

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

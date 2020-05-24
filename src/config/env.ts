import fs from "fs";
import dotenv from "dotenv";

let opts = null;
if (process.env.NODE_ENV === "development") {
    if (fs.existsSync(".env-local")) {
        opts = {
            path: ".env-local"
        };
    }
} else if (process.env.NODE_ENV === "test") {
    if (fs.existsSync(".env-test")) {
        opts = {
            path: ".env-test"
        };
    }
}
// Using dotenv only in development and testing environment

if (opts !== null) {
    dotenv.config(opts);
}

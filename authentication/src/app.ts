import express, { Request, Response, NextFunction } from "express";
import cookieSession from "cookie-session";
import bodyParser, { json } from "body-parser";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import "./config/env";
import { NotFoundError, ErrorHandler, CustomError } from "@pinkelgrg/app-common";
import { logger, stream } from "./config/winston";

import { SignUpRouter } from "./routes/user/sign-up";
import { SignInRouter, FacebookSignInRouter } from "./routes/user/sign-in";
import { SignOutRouter } from "./routes/user/sign-out";

const app = express();

app.use(helmet());
app.set("trust proxy", true);
app.use(compression());

app.use(
    morgan(
        ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time[digits]ms :req[Content-Type]',
        { stream }
    )
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test"
    })
);

app.use(SignUpRouter);
app.use(SignInRouter);
app.use(SignOutRouter);
app.use(FacebookSignInRouter);

app.all("*", () => {
    throw new NotFoundError("404: Not Found");
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!(err instanceof CustomError)) {
        logger.error(err);
    }
    ErrorHandler(err, res);
});
//
export default app;

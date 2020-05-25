import { Response } from "express";
import { CustomError } from "../errors/custom-error";

const ErrorHandler = (err: Error, res: Response) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    return res.status(500).send({
        errors: [
            {
                message: "Ooops!! Something went wrong."
            }
        ]
    });
};

export { ErrorHandler };

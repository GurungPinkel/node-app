import express from "express";

const router = express.Router();

const TestRouter = router.get("/api/test", async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        next("No name provided");
    }

    res.send({ name });
});

export default TestRouter;

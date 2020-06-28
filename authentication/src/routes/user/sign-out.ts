import express from "express";

const router = express.Router();

const SignOutRouter = router.post("/api/user/signout", (req, res) => {
    req.session = null;
    res.status(200).send({});
});

export { SignOutRouter };

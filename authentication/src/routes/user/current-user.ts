import express from "express";
import { CurrentUser } from "@pinkelgrg/app-common";

const router = express.Router();

const CurrentUserRouter = router.get("/api/user/currentuser", CurrentUser, (req, res) => {
    return res.send({ currentUser: req.currentUser || null });
});

export { CurrentUserRouter };

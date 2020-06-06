import express from "express";
import { CurrentUser } from "@pinkelgrg/app-common";
const router = express.Router();

const currentUserRouter = router.get(
    "/api/users/currentuser",
    currentUser,
    (req, res) => {
        return res.send({ currentUser: req.currentUser || null });
    }
);

export { currentUserRouter };

import { Router } from "express";

import registerController from "./controllers/register.controller.js";
import loginController from "./controllers/login.controller.js";
import verifyController from "./controllers/verify.controller.js";
import getMe from "./controllers/get-me.controller.js";
import changeBlockStatus from "./controllers/block-status.controller.js";
import deleteUser from "./controllers/delete.controller.js";

import { authMiddleware } from "./middlewares.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/verify", authMiddleware, verifyController);
router.get("/me", authMiddleware, getMe);
router.put("/me/block_status", authMiddleware, changeBlockStatus);
router.delete("/users/:userId", deleteUser);

export default router;

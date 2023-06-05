import { Router } from "express";

import registerController from "./controllers/register.controller.js";
import loginController from "./controllers/login.controller.js";
import verifyController from "./controllers/verify.controller.js";
import getMe from "./controllers/get-me.controller.js";

import { authMiddleware } from "./middlewares.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/verify", authMiddleware, verifyController);
router.get("/me", authMiddleware, getMe);

export default router;

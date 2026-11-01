import { Router } from "express";
import { RegisterUser, loginUser, getuser } from "../controllers/user.controller.js";
import authmiddleware from "../middlewares/auth.middleware.js";
import { shorturl, redirecting } from "../controllers/url.controller.js";

const router = Router();

router.post("/register", RegisterUser);
router.post("/login", loginUser);
router.get("/profile", authmiddleware, getuser);



export default router;
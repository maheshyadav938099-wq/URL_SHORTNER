import { Router } from "express";
import { shorturl, redirecting } from "../controllers/url.controller.js";

const router = Router();

router.post("/shorturl", shorturl);
router.get("/:shortId", redirecting);

export default router;
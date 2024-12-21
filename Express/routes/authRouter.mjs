import express from "express";
import authController from "./../controllers/authController.mjs"; // Default import

const router = express.Router();

router.route("/signup").post(authController.signup);

export default router;

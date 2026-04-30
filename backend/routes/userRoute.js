import express from "express"
import { loginController, logoutController, registerController, updateController, userProfileController, verifyEmail } from "../controllers/userController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { upstashRateLimit } from "../middlewares/upstashRateLimit.js";
import { loginLimiter, registerLimiter } from "../middlewares/rateLimiter.js";
import { upload } from "../middlewares/uploadmiddleware.js";


const router = express.Router();


router.post("/register", upstashRateLimit(registerLimiter), registerController);

router.post("/login", upstashRateLimit(loginLimiter), loginController);

router.get("/verify-email/:token", verifyEmail);

router.get("/logout", logoutController)

router.put(
  "/profile/update",
  requireSignIn,
  // upload.fields([
  //   { name: "profilePhoto", maxCount: 1 },
  //   { name: "resume", maxCount: 1 },
  // ]),
  updateController
);

router.get("/profile",requireSignIn, userProfileController)

router.get("/user-auth",requireSignIn,((req,res) => {
    res.status(200).send({ok:true})
}))

router.get("/admin-auth",requireSignIn,isAdmin,((req,res) => {
    res.status(200).send({ok:true})
}))


export default router;
import express from "express"
import { loginController, logoutController, registerController, updateController, userProfileController } from "../controllers/userController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadmiddleware.js";


const router = express.Router();


router.post("/register", upload.single("photo"), registerController);

router.post("/login", loginController)

router.get("/logout", logoutController)

router.put(
  "/profile/update",
  requireSignIn,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
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
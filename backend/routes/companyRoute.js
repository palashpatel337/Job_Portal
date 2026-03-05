import express from "express"
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { getCompanyController, getSingleCompanyController, registerCompanyController, updateCompanyController } from "../controllers/companyController.js";
import { upload } from "../middlewares/uploadmiddleware.js";

const router = express.Router();

router.post("/register-company",requireSignIn,upload.single("logo"), registerCompanyController)

router.put("/update-company/:companyId",requireSignIn, updateCompanyController)

router.get("/get-company",requireSignIn, getCompanyController)

router.get("/get-company/:companyId",requireSignIn, getSingleCompanyController)


export default router;
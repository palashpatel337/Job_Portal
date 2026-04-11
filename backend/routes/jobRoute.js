import express from "express"
import { getAdminJobController, getAllJobController, getJobByIdController, getSavedJobsController, postJobController, saveJobController, unsaveJobController } from "../controllers/jobController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/post",requireSignIn,isAdmin,postJobController)

router.get("/get",getAllJobController);

router.get("/get/admin",requireSignIn,isAdmin,getAdminJobController)

router.get("/get/:id",requireSignIn,getJobByIdController)

router.post("/save/:jobid",requireSignIn,saveJobController)

router.delete("/unsave/:jobid",requireSignIn,unsaveJobController)

router.get("/saved", requireSignIn, getSavedJobsController);

export default router;
import { getSavedJobsController, saveJobController, unsaveJobController } from "../controllers/saveJobController";

const router = express.Router()

router.post("/save/:jobid",requireSignIn,saveJobController)

router.delete("/unsave/:jobid",requireSignIn,unsaveJobController)

router.get("/saved", requireSignIn, getSavedJobsController);

export default router;
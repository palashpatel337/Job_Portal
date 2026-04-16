import { getSavedJobsController, saveJobController, unsaveJobController } from "../controllers/saveJobController";

const router = express.Router()

router.post("/save/:id",requireSignIn,saveJobController)

router.delete("/unsave/:id",requireSignIn,unsaveJobController)

router.get("/saved", requireSignIn, getSavedJobsController);

export default router;
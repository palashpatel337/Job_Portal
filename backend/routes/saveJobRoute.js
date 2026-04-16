import { getSavedJobsController, saveJobsController, unsaveJobController } from "../controllers/saveJobController.js";

const router = express.Router()

router.post("/save/:id",requireSignIn,saveJobsController)

router.delete("/unsave/:id",requireSignIn,unsaveJobController)

router.get("/saved", requireSignIn, getSavedJobsController);

export default router;
import express from 'express'
import { appliedJobs, applyJob, getApplicants, updateStaus } from '../controllers/applicationController.js'
import { requireSignIn } from '../middlewares/authMiddleware.js'
import { upstashRateLimit } from '../middlewares/upstashRateLimit.js'
import { applyLimiter } from '../middlewares/rateLimiter.js'

const router = express.Router()

router.post("/apply/:jobId", requireSignIn, upstashRateLimit(applyLimiter), applyJob)

router.get("/get",requireSignIn,appliedJobs)

router.get("/:jobId/applicants",requireSignIn,getApplicants)

router.put("/status/:applicationId/update",requireSignIn,updateStaus)

export default router;
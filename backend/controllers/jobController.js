import Job from "../models/jobModel.js";
import { redis } from "../config/redis.js";

export const postJobController = async (req, res) => {
  try {
    console.log(req.body);

    const {
      title,
      description,
      location,
      requirements,
      jobType,
      salary,
      position,
      experienceLevel,
      companyId,
    } = req.body;
    const userId = req.user;

    if (
      !title ||
      !description ||
      !location ||
      !requirements ||
      !jobType ||
      !salary ||
      !position ||
      !experienceLevel ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      location,
      requirements,
      jobType,
      salary,
      position,
      experienceLevel,
      companyId,
      createdBy: userId,
    });

    // Clear cache
    await redis.del("jobs:all");

    return res.status(200).json({
      message: "New job successfully posted",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something is missing",
      success: false,
    });
  }
};

export const getAllJobController = async (req, res) => {
  try {
    const cacheKey = "jobs:all";

    // 1) Check cache first
    const cachedJobs = await redis.get(cacheKey);

    if (cachedJobs) {
      return res.json({
        success: true,
        fromCache: true,
        jobs: cachedJobs,
      });
    }

    // 2) Fetch from DB
    const jobs = await Job.find({})
      .populate("companyId")
      .sort({ createdAt: -1 });

    // 3) Save in cache for 60 seconds
    await redis.set(cacheKey, jobs, { ex: 60 });

    res.json({
      success: true,
      fromCache: false,
      jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
    });
  }
};

export const getJobByIdController = async (req, res) => {
  try {
    const jobId = req.params.id;
    const cacheKey = `job:${jobId}`;

    const cachedJob = await redis.get(cacheKey);

    if (cachedJob) {
      return res.json({
        success: true,
        fromCache: true,
        job: cachedJob,
      });
    }

    const job = await Job.findById(jobId).populate({path: "companyId"})
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
          select: "_id fullname email profile"
        }
      });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await redis.set(cacheKey, job, { ex: 120 });

    res.json({
      success: true,
      fromCache: false,
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching job",
    });
  }
};

export const getAdminJobController = async (req, res) => {
  const adminId = req.user._id;
  console.log("Admin ID:", adminId);


  const jobs = await Job.find({ createdBy: adminId }).populate("companyId").populate('applications');
  if (jobs.length === 0) {
  return res.status(200).json({
    message: "No jobs found",
    jobs: [],
    success: true,
  });
}
  return res.status(200).json({
    message: "Jobs successfully fetched",
    jobs,
    success: true,
  });
};




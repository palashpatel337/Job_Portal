import Job from "../models/jobModel.js";

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
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("companyId")
      .populate("createdBy")
      if (!jobs) {
      return res.status(404).json({
        message: "No results",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Jobs successfully fetched",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobByIdController = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "No results",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Job successfully fetched",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobController = async (req, res) => {
  const adminId = req.user._id;
  console.log("Admin ID:", adminId);


  const jobs = await Job.find({ createdBy: adminId }).populate("companyId").populate('applications');
  if (jobs.length == 0) {
    return res.status(404).json({
      message: "No results",
      success: false,
    });
  }
  return res.status(200).json({
    message: "Jobs successfully fetched",
    jobs,
    success: true,
  });
};

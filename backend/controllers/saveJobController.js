import SaveJob from "../models/saveJobModel";
import Job from "../models/jobModel";

export const saveJobController = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    } 
    
    let savedJob = await SaveJob.findOne({ job: jobId });
    if (!savedJob) {
      savedJob = new SaveJob({ job: jobId, savedBy: [userId] });
    } else {
      if (savedJob.savedBy.includes(userId)) {
        return res.status(400).json({
          success: false,
          message: "Job already saved",
        });
      }
      savedJob.savedBy.push(userId);
    }
    await savedJob.save();
    return res.status(200).json({
      success: true,
      message: "Job saved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({   
    success: false,
    message: "Error saving job",
  });
  }
};

export const unsaveJobController = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ 
        success: false,
        message: "Job not found",
      });
    } 
    
    const savedJob = await SaveJob.findOne({ job: jobId });
    if (!savedJob || !savedJob.savedBy.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "Job not saved",
      });
    }
    savedJob.savedBy = savedJob.savedBy.filter((id) => id.toString() !== userId.toString());
    await savedJob.save();
    return res.status(200).json({     
      success: true,
      message: "Job unsaved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error unsaving job",
    });
  }
};


export const getSavedJobsController = async (req, res) => {
  try {
    const userId = req.user;

    const jobs = await SaveJob.find({ savedBy: userId }).populate({ path: "job", populate: { path: "companyId" }    });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching saved jobs",
    });
  }
};
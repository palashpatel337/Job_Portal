import { populate } from "dotenv";
import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";

export const applyJob = async (req,res) => {
    try {
        const userId = req.user
        const jobId = req.params.jobId
        console.log(jobId);
        console.log(userId);
        
        
        if(!jobId){
            return res.status(401).json({
                message: "Something went wrong with jobid",
                success: false
            })
        }
        const existingApplication = await Application.findOne({job: jobId, applicant: userId})

        if(existingApplication){
            return res.status(401).json({
                message: "You have already applied for the job",
                success: false
            })
        }

        const job = await Job.findById(jobId)
        if(!job){
            return res.status(401).json({
                message: "Job not found",
                success: false
            })

        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.applications.push(newApplication._id)
        await job.save()

        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
            return res.status(401).json({
                message: "Something went wrong",
                success: false
            })

    }
}

export const appliedJobs = async (req,res) => {
    try {
        const userId = req.user._id;
console.log("REQ.USER 👉", req.user);

        const application = await Application.find({applicant:userId}).sort({createdAt: -1}).populate({
            path: "job",
            options: {createdAt: -1},
            populate: {
                path: "companyId",
                options: {createdAt: -1},
            }
        })
        if(application.length == 0){
            return res.status(401).json({
                message: "Application not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Application fetched successfully",
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.jobId

        
        const job = await Job.findById(jobId).sort({createdAt: -1}).populate({
            path: "applications",
            options: {createdAt: -1},
            populate: {
                path: "applicant",
                options: {createdAt: -1},
            }
        })
        if(!job){
            return res.status(401).json({
                message: "No Applications",
                success: false
            })
        }
        return res.status(201).json({
            message: "Applicants fetched successfully",
            job,
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Something went wrong",
            success: false
        })

    }
}

export const updateStaus = async (req,res) => {
    try {
        
        const {status} = req.body
        const applicationId = req.params.applicationId;
        if(!applicationId){
            return res.status(401).json({
                message: "Application not found",
                success: false
            })
        }
        
        const application = await Application.findById(applicationId)
        if(!application){
            return res.status(401).json({
                message: "Application not found",
                success: false
            })
        }
        
        application.status = status.toLowerCase()
        await application.save()
        
        return res.status(201).json({
            message: "Status updated successfully",
            application,
            success: true
        })
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Something went wrong",
            success: false
        })

    }

}
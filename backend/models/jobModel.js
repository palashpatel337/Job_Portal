import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    applications:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
            // required: true
        }
    ]
},{timestamps: true})

export default mongoose.model('Job',jobSchema)
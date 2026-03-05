import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    website: {
        type: String,
        unique: true
    },
    logo: {
        type: String,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true})

export default mongoose.model('Company',companySchema)
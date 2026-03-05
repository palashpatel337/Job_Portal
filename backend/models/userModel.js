import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
phone: {
  type: String,      // better than Number
  unique: true,
  sparse: true,
  trim: true,
}
    ,
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student','recruiter'],
        required: true
    },
    profile: {
        bio:{type: String},
        skills: {type: Array},
        resume: {type: String},
        resumeOriginalName: {type: String},
        company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
        profilePhoto: {type: String, default: ''}
    }
},{timestamps: true})

export default mongoose.model('User',userSchema) ;
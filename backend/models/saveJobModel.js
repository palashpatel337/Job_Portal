import mongoose from "mongoose";

const saveJobSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    savedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const SaveJob = mongoose.model('SaveJob', saveJobSchema);
export default SaveJob;
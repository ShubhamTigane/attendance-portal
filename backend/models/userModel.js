import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: true
    },
    checkIns: [{
        type: Date,
        unique: true, 
        sparse: true 
    }],
    checkOuts: [{
        type: Date,
        unique: true, 
        sparse: true 
    }],
}, { timestamps: true });

export default mongoose.model('users', userSchema);

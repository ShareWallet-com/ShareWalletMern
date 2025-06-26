import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    mobileNumber: {type: String, required: true, unique: true},
    dateofBirth: {type: String, required: true},
    verifyotp: {type: String, default:''},
    verifyotpExpireAt:{type:Number, default:0},
    isVerified: {type: Boolean, default: false},
    resetOtp: {type: String, default:''},
    resetOtpExpireAt: {type: Number, default: 0},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
});

const userModel = mongoose.models.user ||  mongoose.model("User", userSchema);

export default userModel;
import mongoose from "mongoose";
const userscheme = new mongoose.Schema({name: {type:String ,required: true}, email: {type:String ,required: true,unique:true}, password: {type:String ,required: true},verifyotp: {type:String ,default:" "},verifyotpexpire: {type:Number,default:0},isverified: {type:Boolean ,default:false}, resetotp: { type: String, default: "" },resetotpexp:{type:Number,default:0}});
const User = mongoose.models.User || mongoose.model("User", userscheme);
export default User;


import mongoose from "mongoose";


const AttendanceSchema = new mongoose.Schema({

meetingId:{
    type:String,
    required:true
},


userId:{
    type:String,
    required:true
},


name:{
    type:String,
    required:true
},


joinTime:{
    type:Date,
    default:Date.now
},


leaveTime:{
    type:Date,
    default:null
},


duration:{
    type:String,
    default:"Running"
},


status:{
    type:String,
    default:"joined"
}


},
{
timestamps:true
});


export default mongoose.models.Attendance ||
mongoose.model("Attendance", AttendanceSchema);
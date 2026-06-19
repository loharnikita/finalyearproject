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
    type:Date
},


duration:{
    type:String
}


},
{
timestamps:true
});



export default mongoose.models.Attendance ||
mongoose.model("Attendance", AttendanceSchema);
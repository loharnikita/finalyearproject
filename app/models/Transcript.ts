import mongoose from "mongoose";


const TranscriptSchema =
new mongoose.Schema({

meetingId:{
type:String,
required:true
},


text:{
type:String,
required:true
},


createdAt:{
type:Date,
default:Date.now
}


});


export default mongoose.models.Transcript ||
mongoose.model(
"Transcript",
TranscriptSchema
);
import mongoose from "mongoose";


const NoteSchema = new mongoose.Schema({

  meetingId: {

    type:String,

    required:true

  },


  userId: {

    type:String,

    required:true

  },


  content: {

    type:String,

    required:true

  }


},
{
  timestamps:true
});


export default mongoose.models.Note ||
mongoose.model("Note", NoteSchema);
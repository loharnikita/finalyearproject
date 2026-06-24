import { NextResponse } from "next/server";
import Transcript from "@/app/models/Transcript";
import { connectDB } from "@/lib/db";


export async function POST(req:Request){


try{


await connectDB();



const {
meetingId,
text
}=await req.json();



const transcript =
await Transcript.create({

meetingId,
text

});



return NextResponse.json({

success:true,

transcript

});


}

catch(error){


console.log(error);


return NextResponse.json({

success:false

});


}



}
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Attendance from "@/models/Attendance";



export async function GET(){


try{


await connectDB();



const attendance =
await Attendance.find({});



return NextResponse.json(
attendance,
{
status:200
}
);



}
catch(error){


console.log("Attendance GET error:",error);



return NextResponse.json(

{
message:"Failed to fetch attendance"
},

{
status:500
}

);


}


}
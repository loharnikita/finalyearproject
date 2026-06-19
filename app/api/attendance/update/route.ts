import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";


export async function PUT(req: Request){

try{

await connectDB();


const body = await req.json();



const updated =
await Attendance.findByIdAndUpdate(

body.id,

{

leaveTime:new Date(),

duration:body.duration

},

{
new:true
}

);



return NextResponse.json(updated);


}
catch(error){

console.log(error);


return NextResponse.json(

{
error:"Update failed"
},

{
status:500
}

);


}

}
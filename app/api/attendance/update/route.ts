import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Attendance from "@/models/Attendance";


export async function PUT(req:Request){


try{


await connectDB();


const {id}=await req.json();



const attendance =
await Attendance.findById(id);



if(!attendance){

return NextResponse.json(
{
error:"Not found"
},
{
status:404
}
);

}




const leaveTime =
new Date();



const diff =
Math.floor(

(
leaveTime.getTime()
-
attendance.joinTime.getTime()

)
/60000

);



const updated =
await Attendance.findByIdAndUpdate(

id,

{

leaveTime:leaveTime,

duration:`${diff} min`

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
error:"failed"
},
{
status:500
}
);


}



}
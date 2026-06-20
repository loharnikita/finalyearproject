import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";


export async function GET(){

try{


await connectDB();


const data = await Attendance.find({})
.sort({
createdAt:-1
});



return NextResponse.json(data);



}
catch(error){


console.log(error);


return NextResponse.json(
{
error:"Analytics fetch failed"
},
{
status:500
}
);


}

}
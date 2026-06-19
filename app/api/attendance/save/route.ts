import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Attendance from "@/models/Attendance";


export async function POST(req:Request){

try{


await connectDB();


const body = await req.json();


const attendance =
await Attendance.create(body);


return NextResponse.json(
attendance
);


}
catch(error){


console.log(error);


return NextResponse.json(
{
error:"Failed"
},
{
status:500
}
);


}

}
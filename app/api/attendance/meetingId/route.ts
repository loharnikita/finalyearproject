import {NextResponse} from "next/server";
import {connectDB} from "@/lib/db";
import Attendance from "@/models/Attendance";


export async function GET(
req:Request,
{params}:{
params:{meetingId:string}
}

){


await connectDB();


const data =
await Attendance.find({
meetingId:params.meetingId
});



return NextResponse.json(data);


}
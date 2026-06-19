import {NextResponse} from "next/server";
import {connectDB} from "@/lib/db";
import Attendance from "@/models/Attendance";


export async function GET(){

try{


await connectDB();


const data = await Attendance.find({});


return NextResponse.json(data);



}
catch(error){


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
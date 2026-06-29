import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";


export async function GET(
  req: Request,
  {
    params,
  }: {
    params?: {
      meetingId?: string;
    };
  }
) {


  try {


    await connectDB();



    const meetingId = params?.meetingId;



    if (!meetingId) {


      return NextResponse.json(
        {
          error: "Meeting ID missing"
        },
        {
          status: 400
        }
      );


    }



    const data = await Attendance.find({
      meetingId: meetingId
    });



    return NextResponse.json(data);



  } catch(error) {


    console.log(
      "Attendance API Error:",
      error
    );


    return NextResponse.json(
      {
        error:"Failed to fetch attendance"
      },
      {
        status:500
      }
    );


  }


}
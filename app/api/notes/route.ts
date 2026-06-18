import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Note from "@/models/Note";


export async function POST(req: Request) {

  try {

    await connectDB();

    const body = await req.json();

    const savedNote = await Note.create(body);

    return NextResponse.json(savedNote);


  } catch(error){

    console.log(error);

    return NextResponse.json(
      {
        message:"Failed to save note"
      },
      {
        status:500
      }
    );

  }

}



export async function GET(){

  try{

    await connectDB();


    const notes = await Note.find()
    .sort({
      createdAt:-1
    });



    return NextResponse.json(notes);



  }catch(error){


    console.log(error);


    return NextResponse.json(
      {
        message:"Failed to get notes"
      },
      {
        status:500
      }
    );


  }

}
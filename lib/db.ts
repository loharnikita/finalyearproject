import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;



if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in .env");
}



let cached = (global as any).mongoose;



if (!cached) {


  cached = (global as any).mongoose = {

    conn: null,

    promise: null,

  };


}




export async function connectDB() {


  if (cached.conn) {

    return cached.conn;

  }




  if (!cached.promise) {



    cached.promise = mongoose.connect(
      MONGODB_URI
    );



  }




  try {



    cached.conn = await cached.promise;



    console.log("MongoDB Connected Successfully");



  } catch(error) {



    cached.promise = null;


    console.log("MongoDB Connection Error:", error);


    throw error;



  }




  return cached.conn;



}
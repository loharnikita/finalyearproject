import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";


export async function POST(req: Request) {


try {


const {userId} = await req.json();



if(!userId){

return NextResponse.json(
{
error:"User id missing"
},
{
status:400
}
);

}




const serverClient =
StreamChat.getInstance(

process.env.NEXT_PUBLIC_STREAM_API_KEY!,

process.env.STREAM_SECRET_KEY!

);





const token =
serverClient.createToken(

userId,

Math.floor(Date.now()/1000)+3600

);






return NextResponse.json({

token

});



}
catch(error){


console.log(
"Token error:",
error
);



return NextResponse.json(

{
error:"Failed to create token"
},

{
status:500
}

);


}


}
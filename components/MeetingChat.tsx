"use client";

import { useEffect, useState } from "react";

import {
  Chat,
  Channel,
  MessageList,
  useMessageContext,
} from "stream-chat-react";

import { StreamChat } from "stream-chat";


const apiKey =
process.env.NEXT_PUBLIC_STREAM_API_KEY!;



const CustomMessage =()=>{


const {message}=useMessageContext();


return(

<div className="mb-4">


<p className="text-xs text-gray-400">

{message.user?.name || "User"}

</p>



<div
className="
bg-blue-600
text-white
px-4
py-2
rounded-xl
max-w-[90%]
break-words
"
>

{message.text}


</div>



<p className="text-xs text-gray-400">

{
new Date(
message.created_at || ""
)
.toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})
}

</p>


</div>


)

}





const MeetingChat =({

meetingId,
userId,
name

}:any)=>{



const [client,setClient]=
useState<StreamChat|null>(null);


const [channel,setChannel]=
useState<any>(null);



const [text,setText]=
useState("");







useEffect(()=>{


let chat:StreamChat;



const connect=async()=>{


try{


const res =
await fetch(
"/api/chat-token",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

userId

})


}

);



const {token}=await res.json();





chat =
StreamChat.getInstance(apiKey);





await chat.connectUser(

{

id:userId,

name:name || "Guest"

},

token

);






// IMPORTANT PART

const room =
chat.channel(

"messaging",

meetingId,

{



members:[userId]

}

);






await room.watch();




// listen realtime

room.on(

"message.new",

(event)=>{

console.log(
"NEW MESSAGE",
event.message
);

}

);





setClient(chat);

setChannel(room);




}

catch(err){

console.log(
"CHAT ERROR",
err
);


}


};




connect();





return()=>{


if(chat){

chat.disconnectUser();

}



}


},[
meetingId,
userId,
name
]);









const sendMessage=async()=>{


if(!text.trim())
return;


if(!channel)
return;



await channel.sendMessage({

text

});



setText("");



};








if(!client || !channel)
return null;





return(


<div

className="
fixed
right-5
top-20
w-[360px]
h-[600px]
bg-[#111827]
rounded-xl
border
border-gray-700
flex
flex-col
overflow-hidden
z-50
"

>


<Chat client={client}>


<Channel channel={channel}>



<div

className="
h-14
bg-blue-600
flex
items-center
justify-between
px-4
text-white
font-semibold
"

>

<span>
💬 Meeting Chat
</span>


<span className="text-green-300">
● Live
</span>


</div>







<div

className="
flex-1
overflow-y-auto
min-h-0
p-4
bg-[#0f172a]
"

>


<MessageList

Message={CustomMessage}

/>


</div>








<div

className="
p-3
border-t
border-gray-700
flex
gap-2
"

>


<input

value={text}

onChange={(e)=>
setText(e.target.value)
}

placeholder="Type message..."

className="
flex-1
rounded-xl
px-3
py-2
text-black
"


onKeyDown={(e)=>{

if(e.key==="Enter")
sendMessage();

}}


/>





<button

onClick={sendMessage}

className="
bg-blue-600
text-white
px-5
rounded-xl
"

>

Send

</button>




</div>



</Channel>


</Chat>


</div>


);


};


export default MeetingChat;
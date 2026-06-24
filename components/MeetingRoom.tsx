'use client';

import { useRef, useState, useEffect } from "react";

import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
} from "@stream-io/video-react-sdk";


import { useRouter, useSearchParams } from "next/navigation";

import { Users, LayoutList } from "lucide-react";
import MeetingChat from "./MeetingChat";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import MeetingTranscript from "./MeetingTranscript";

import Loader from "./Loader";
import MeetingNotes from "./MeetingNotes";
import EndCallButton from "./EndCallButton";

import { cn } from "@/lib/utils";
import CopyInvite from "./CopyInvite";


type CallLayoutType =
  | "grid"
  | "speaker-left"
  | "speaker-right";



const MeetingRoom = () => {


const router = useRouter();

const searchParams = useSearchParams();


const isPersonalRoom =
!!searchParams.get("personal");


const call = useCall();


if(!call) return null;


const attendanceId = useRef<string | null>(
null
);

const attendanceLoaded =
useRef(false);

const joinTime = useRef<Date | null>(null);

const attendanceSaved = useRef(false);



const [layout,setLayout] =
useState<CallLayoutType>("speaker-left");



const [showParticipants,setShowParticipants] =
useState(false);

const [showChat,setShowChat]=useState(false);



const {useCallCallingState} =
useCallStateHooks();



const callingState =
useCallCallingState();





const layouts:CallLayoutType[]=[

"grid",
"speaker-left",
"speaker-right"

];






// SAVE JOIN ATTENDANCE

useEffect(()=>{


if(!call) return;



const saveJoin = async()=>{


const participant =
call.state.localParticipant;



if(!participant) return;


if(attendanceLoaded.current)
return;

attendanceLoaded.current=true;
const res = await fetch(
"/api/attendance/save",
{


method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

meetingId:call.id,

userId:participant.userId,

name:
participant.name || "Guest",


joinTime:new Date()

})

}

);



const data =
await res.json();



attendanceId.current =
data._id;



joinTime.current =
new Date();



};




if(
callingState === CallingState.JOINED &&
!attendanceId.current
)

{

saveJoin();

}



},[call,callingState]);









// END MEETING

const handleLeave = async()=>{


try{


if(attendanceId.current){


await fetch(

"/api/attendance/update",

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

id:attendanceId.current

})

}


);


console.log("Attendance Updated");


}





await call.leave();



router.push("/");



}

catch(error){

console.log(
"Leave error",
error
);


}


};
// AUTO UPDATE ATTENDANCE WHEN USER CLOSES TAB / LEAVES

// AUTO UPDATE WHEN USER CLOSES TAB

useEffect(()=>{


const updateAttendance = ()=>{


if(attendanceId.current){


navigator.sendBeacon(

"/api/attendance/update",

JSON.stringify({

id: attendanceId.current

})

);


}


};



window.addEventListener(
"beforeunload",
updateAttendance
);



return()=>{


window.removeEventListener(
"beforeunload",
updateAttendance
);


};



},[]);







if(
callingState !== CallingState.JOINED
)

return <Loader />;







const CallLayout = ()=>{


switch(layout){


case "grid":

return <PaginatedGridLayout/>;




case "speaker-right":

return(

<SpeakerLayout

participantsBarPosition="left"

/>

);



default:

return(

<SpeakerLayout

participantsBarPosition="right"

/>

);


}



};









return(



<section className="relative h-screen w-full overflow-hidden pt-4 text-white">



<div className="relative flex size-full items-center justify-center">



<div className="flex size-full max-w-[1000px] items-center">


<CallLayout/>


</div>





<div

className={cn(

"h-[calc(100vh-86px)] hidden ml-2",

{

"show-block":showParticipants

}

)}

>


<CallParticipantsList

onClose={()=>setShowParticipants(false)}

/>



</div>



</div>









<div className="fixed bottom-0 flex w-full items-center justify-center gap-5">





<MeetingNotes/>

<button

onClick={()=>setShowChat(!showChat)}

className="rounded-xl  px-4 py-2"

>

💬 Chat

</button>

<MeetingTranscript

meetingId={call.id}

/>



{/* KEEP STREAM CONTROLS ONLY */}

<CallControls />

<CopyInvite/>






<DropdownMenu>



<DropdownMenuTrigger

className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2"

>


<LayoutList size={20}/>


</DropdownMenuTrigger>






<DropdownMenuContent className="bg-dark-1 text-white">



{

layouts.map((item)=>(



<div key={item}>


<DropdownMenuItem

onClick={()=>setLayout(item)}

>

{item}


</DropdownMenuItem>



<DropdownMenuSeparator/>


</div>



))

}



</DropdownMenuContent>




</DropdownMenu>







<CallStatsButton/>








<button

onClick={()=>setShowParticipants(!showParticipants)}

>


<div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2">


<Users size={20}/>


</div>


</button>







{
!isPersonalRoom &&

<EndCallButton handleLeave={handleLeave}/>

}





</div>


{
showChat &&

<div
className="
fixed
right-5
top-10
bottom-20
z-50
"
>

{
call.state.localParticipant &&

<MeetingChat

meetingId={call.id}

userId={
call.state.localParticipant.userId
}

name={
call.state.localParticipant.name || "Guest"
}

/>

}

</div>

}


</section>



);


};



export default MeetingRoom;
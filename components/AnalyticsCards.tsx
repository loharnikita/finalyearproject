'use client';

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";


const AnalyticsCards = () => {


const call = useCall();

const { useParticipants } = useCallStateHooks();

const participants = useParticipants();



if(!call) return null;



const host =
call.state.createdBy?.name ||
call.state.createdBy?.id ||
"Unknown";



const totalParticipants =
participants.length;



const status =
call.state.endedAt
?
"Completed"
:
"Live";



const startTime =
call.state.startsAt
?
new Date(call.state.startsAt).toLocaleTimeString()
:
"Not started";



const endTime =
call.state.endedAt
?
new Date(call.state.endedAt).toLocaleTimeString()
:
"-";





let duration="Live";



if(call.state.startsAt && call.state.endedAt){


const diff =
new Date(call.state.endedAt).getTime()
-
new Date(call.state.startsAt).getTime();



const minutes =
Math.floor(diff / 60000);



duration =
`${minutes} min`;


}





const data=[


{
title:"Host",
value:host,
icon:"👤"
},


{
title:"Meeting Status",
value:status,
icon:"✅"
},


{
title:"Meeting Duration",
value:duration,
icon:"⏱"
},


{
title:"Participants",
value:totalParticipants,
icon:"👥"
},


{
title:"Average Attendance",
value:
`${totalParticipants ? 100 : 0}%`,
icon:"📊"
},


{
title:"Peak Participants",
value:totalParticipants,
icon:"🔥"
},


{
title:"Meeting Started",
value:startTime,
icon:"🟢"
},


{
title:"Meeting Ended",
value:endTime,
icon:"🔴"
}



];





return (


<div className="grid gap-6 md:grid-cols-4">



{
data.map((item)=>(


<div

key={item.title}

className="rounded-2xl bg-dark-2 p-6 shadow"

>


<div className="flex items-center gap-3">


<span className="text-3xl">

{item.icon}

</span>



<p className="text-gray-400">

{item.title}

</p>


</div>




<h2 className="mt-5 text-2xl font-bold">

{item.value}

</h2>



</div>


))

}



</div>


)


}


export default AnalyticsCards;
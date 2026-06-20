'use client';

import { useEffect, useState } from "react";


interface Attendance{

_id:string;
name:string;
joinTime:string;
leaveTime:string;
duration:string;

}



const AnalyticsCards = () => {



const [attendance,setAttendance] =
useState<Attendance[]>([]);



useEffect(()=>{


const loadAnalytics = async()=>{


const res =
await fetch("/api/attendance");


const data =
await res.json();


setAttendance(data);


};



loadAnalytics();



},[]);







const totalParticipants =
attendance.length;





const completedMeetings =
attendance.filter(
(item)=>item.leaveTime
).length;





const calculateDuration =()=>{


if(attendance.length===0)

return "0 min";



let total = 0;



attendance.forEach((item)=>{


if(item.leaveTime){


const start =
new Date(item.joinTime).getTime();


const end =
new Date(item.leaveTime).getTime();



total += end-start;


}



});



const minutes =
Math.floor(total/60000);



return `${minutes} min`;



};







const averageAttendance =
totalParticipants
?
"100%"
:
"0%";








const data=[



{
title:"Total Participants",
value:totalParticipants,
icon:"👥"
},




{
title:"Completed Sessions",
value:completedMeetings,
icon:"✅"
},




{
title:"Meeting Duration",
value:calculateDuration(),
icon:"⏱"
},




{
title:"Average Attendance",
value:averageAttendance,
icon:"📊"
},




{
title:"Peak Participants",
value:totalParticipants,
icon:"🔥"
},





{
title:"Status",
value:
completedMeetings
?
"Completed"
:
"Running",
icon:"🟢"
}





];







return(



<div className="grid gap-6 md:grid-cols-4">



{

data.map((item)=>(



<div

key={item.title}

className="rounded-2xl bg-dark-2 p-6 shadow"



>



<div className="flex gap-3 items-center">



<span className="text-3xl">

{item.icon}

</span>



<p className="text-gray-400">

{item.title}

</p>



</div>






<h2 className="mt-5 text-3xl font-bold text-white">


{item.value}


</h2>




</div>



))


}



</div>


)



}



export default AnalyticsCards;
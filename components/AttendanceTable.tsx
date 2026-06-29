'use client';

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
export const dynamic = "force-dynamic";

const AttendanceTable = () => {


const [users,setUsers] = useState<any[]>([]);



const {useLocalParticipant} =
useCallStateHooks();


const localParticipant =
useLocalParticipant();

const call = useCall();


const isHost =
localParticipant?.userId ===
call?.state.createdBy?.id;



useEffect(()=>{

const getAttendance = async()=>{

try{

const res = await fetch(
"/api/attendance",
{
cache:"no-store"
}
);


const data = await res.json();


setUsers(data);


}
catch(error){

console.log(
"Attendance fetch error",
error
);

}


};


if(isHost){

getAttendance();


const interval =
setInterval(
getAttendance,
5000
);


return()=>clearInterval(interval);


}


},[isHost]);





if(!isHost){

return(

<div className="flex h-screen items-center justify-center text-white text-2xl font-bold">

Only host can view attendance report

</div>

)

}






const formatTime = (time:string)=>{


if(!time) return "Still Joined";


return new Date(time)
.toLocaleTimeString(
[],
{
hour:"2-digit",
minute:"2-digit",
second:"2-digit"
}
);


};





const exportPDF =()=>{


const doc = new jsPDF();



doc.text(
"MeetVerse Attendance Report",
14,
20
);



autoTable(doc,{


startY:30,


head:[

[
"Name",
"Join Time",
"Leave Time",
"Duration"
]

],



body:

users.map((user)=>(

[

user.name,

formatTime(user.joinTime),

formatTime(user.leaveTime),

user.duration || "Running"

]


))


});



doc.save(
"Attendance_Report.pdf"
);



};






return (


<div className="p-8 text-white">



<h1 className="text-4xl font-bold mb-8">



</h1>





<div className="rounded-2xl bg-dark-2 overflow-hidden shadow-xl">



<table className="w-full">



<thead className="bg-[#1f2937]">


<tr>


<th className="p-5 text-left">

Name

</th>


<th className="p-5">

Join Time

</th>


<th className="p-5">

Leave Time

</th>


<th className="p-5">

Duration

</th>


</tr>


</thead>





<tbody>


{

users.map((user)=>(


<tr

key={user._id}

className="border-t border-gray-700 hover:bg-gray-800"

>



<td className="p-5 font-semibold">

{user.name}

</td>





<td className="p-5 text-center">

{formatTime(user.joinTime)}

</td>





<td className="p-5 text-center">


{

user.leaveTime

?

formatTime(user.leaveTime)

:

<span className="text-yellow-400">

Still Joined

</span>

}


</td>





<td className="p-5 text-center">


<span className="px-4 py-2 rounded-full bg-green-600">

{

user.duration ||

"Running"

}

</span>


</td>





</tr>


))


}


</tbody>


</table>


</div>






<button

onClick={exportPDF}

className="
mt-8
bg-green-600
px-6
py-3
rounded-xl
font-semibold
"


>

📄 Export PDF


</button>





</div>


);


};


export default AttendanceTable;
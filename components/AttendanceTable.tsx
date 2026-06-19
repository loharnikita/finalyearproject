'use client';

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const AttendanceTable = () => {


const [users,setUsers] = useState<any[]>([]);



useEffect(()=>{


const getAttendance = async()=>{


const res = await fetch("/api/attendance");


const data = await res.json();


if(Array.isArray(data)){

setUsers(data);

}


};



getAttendance();



},[]);







const exportPDF = () => {


const doc = new jsPDF();



doc.text(
"MeetVerse - Attendance Report",
14,
20
);



autoTable(doc,{

startY:30,


head:[

[
"Participant",
"Join Time",
"Leave Time",
"Duration"
]

],



body:

users.map((user)=>(


[

user.name,


new Date(user.joinTime)
.toLocaleTimeString(),


user.leaveTime

?

new Date(user.leaveTime)
.toLocaleTimeString()

:

"Still Joined",



user.duration || "-"


]


))


});



doc.save(
"MeetVerse_Attendance_Report.pdf"
);



};






return (


<div className="space-y-8">





<div className="grid gap-6 md:grid-cols-4">





<div className="rounded-2xl bg-dark-2 p-6">

<p className="text-gray-400">
Total Participants
</p>


<h2 className="text-4xl font-bold">

{users.length}

</h2>


</div>






<div className="rounded-2xl bg-dark-2 p-6">

<p className="text-gray-400">
Present
</p>


<h2 className="text-4xl font-bold">

{
users.filter(
(u)=>!u.leaveTime
).length
}

</h2>


</div>







<div className="rounded-2xl bg-dark-2 p-6">

<p className="text-gray-400">
Left Early
</p>


<h2 className="text-4xl font-bold">

{
users.filter(
(u)=>u.leaveTime
).length
}

</h2>


</div>







<div className="rounded-2xl bg-dark-2 p-6">

<p className="text-gray-400">
Meeting Duration
</p>


<h2 className="text-4xl font-bold">

Calculated

</h2>


</div>






</div>








<div className="overflow-hidden rounded-2xl bg-dark-2">


<table className="w-full">


<thead className="bg-gray-800">


<tr>


<th className="p-5 text-left">
Participant
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

className="border-t border-gray-700"

>


<td className="p-5 font-semibold">

{user.name}

</td>




<td className="p-5 text-center">

{

new Date(user.joinTime)
.toLocaleTimeString()

}

</td>





<td className="p-5 text-center">


{

user.leaveTime

?

new Date(user.leaveTime)
.toLocaleTimeString()

:

"Still Joined"


}


</td>





<td className="p-5 text-center">


<span className="rounded-full bg-blue-600 px-4 py-1">


{

user.duration || "Running"

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

className="rounded-lg bg-green-600 px-6 py-3 font-semibold"

>

📄 Export PDF

</button>





</div>


)

}



export default AttendanceTable;
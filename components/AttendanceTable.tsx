'use client';

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const AttendanceTable = () => {


const [users,setUsers] = useState<any[]>([]);



useEffect(()=>{


const getAttendance = async()=>{


const res = await fetch(
"/api/attendance"
);


const data = await res.json();


setUsers(data);



};



getAttendance();


},[]);






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

className="border-t border-gray-700 hover:bg-gray-800 transition"

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


<span

className={

`
px-4 py-2 rounded-full text-sm font-semibold

${user.duration

?

"bg-green-600"

:

"bg-blue-600"

}

`

}

>


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
hover:bg-green-700
transition
"

>


📄 Export PDF


</button>





</div>


);


};



export default AttendanceTable;
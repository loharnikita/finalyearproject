"use client";

import {useEffect,useState} from "react";


const MeetingAnalytics =()=>{


const [attendance,setAttendance]=useState<any[]>([]);



useEffect(()=>{


const getData=async()=>{


const res =
await fetch("/api/analytics");


const data =
await res.json();


setAttendance(data);


};


getData();


},[]);




return(

<div className="text-white">


<h1 className="text-3xl font-bold">
Meeting Analytics
</h1>



<div className="mt-8">


{
attendance.map((user)=>(


<div
key={user._id}
className="border-b p-5"
>


<h2>
{user.name}
</h2>


<p>
Join:
{new Date(user.joinTime).toLocaleTimeString()}
</p>


<p>
Leave:

{
user.leaveTime ?

new Date(user.leaveTime)
.toLocaleTimeString()

:

"Still Joined"

}

</p>



<p>

Duration:

{
user.duration || "Running"

}

</p>



</div>


))

}


</div>



</div>


)


}


export default MeetingAnalytics;
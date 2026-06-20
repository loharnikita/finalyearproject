"use client";

import {useEffect,useState} from "react";

import {
  Users,
  Video,
  Clock,
  Activity,
  Brain,
  TrendingUp,
  BarChart3,
  Target,
  Zap
} from "lucide-react";


type Attendance={

_id:string;

name:string;

meetingId:string;

joinTime:string;

leaveTime?:string;

duration?:string;

}



const MeetingAnalytics=()=>{


const [data,setData]=useState<Attendance[]>([]);



useEffect(()=>{


const getData=async()=>{


const res =
await fetch("/api/analytics");


const result =
await res.json();


setData(result);


};


getData();


},[]);







const totalMeetings =
new Set(
data.map(x=>x.meetingId)
).size;




const participants =
new Set(
data.map(x=>x.name)
).size;




const completed =
data.filter(
x=>x.leaveTime
).length;





const engagement =
Math.min(
100,
participants*10 + completed*5
);





return(


<div className="min-h-screen bg-[#020617] p-10 text-white">



<h1 className="text-4xl font-bold flex items-center gap-3">

<Brain size={40}/>

MeetVerse AI Analytics

</h1>


<p className="text-gray-400 mt-2">

Smart insights from your online meetings

</p>





{/* TOP CARDS */}


<div className="grid md:grid-cols-4 gap-6 mt-10">


<AnalyticsCard
icon={<Video/>}
title="Total Meetings"
value={totalMeetings}
gradient="from-blue-500 to-cyan-500"
/>



<AnalyticsCard
icon={<Users/>}
title="Participants"
value={participants}
gradient="from-purple-500 to-pink-500"
/>




<AnalyticsCard
icon={<Clock/>}
title="Completed"
value={completed}
gradient="from-green-500 to-emerald-500"
/>



<AnalyticsCard
icon={<Activity/>}
title="Engagement"
value={`${engagement}%`}
gradient="from-orange-500 to-red-500"
/>



</div>







{/* AI INSIGHT */}



<div className="mt-10 rounded-3xl bg-gradient-to-r from-indigo-900 to-purple-900 p-8">


<div className="flex items-center gap-3">

<Brain size={30}/>

<h2 className="text-2xl font-bold">

AI Meeting Insight

</h2>

</div>




<p className="mt-5 text-lg text-gray-200">

Your meetings show good collaboration.

MeetVerse AI detects active participation and recommends focused meetings for better productivity.

</p>


</div>








<div className="grid md:grid-cols-2 gap-8 mt-10">





{/* HEALTH SCORE */}


<div className="rounded-3xl bg-[#111827] p-8">


<h2 className="text-xl font-bold">

Meeting Health Score

</h2>




<div className="flex justify-center mt-8">


<div className="h-44 w-44 rounded-full border-8 border-green-500 flex items-center justify-center">


<h1 className="text-5xl font-bold">

{engagement}

</h1>


</div>


</div>




<p className="text-center mt-5 text-green-400">

Excellent Meeting Performance

</p>


</div>








{/* ACTIVITY */}


<div className="rounded-3xl bg-[#111827] p-8">


<h2 className="text-xl font-bold flex gap-2">

<TrendingUp/>

Meeting Activity

</h2>




<div className="flex items-end gap-5 h-52 mt-6">


{
data.slice(0,6).map((x,i)=>(


<div key={x._id}

className="flex flex-col items-center">


<div

className="w-10 bg-blue-500 rounded-xl"

style={{

height:`${60+i*20}px`

}}


/>


<span>

M{i+1}

</span>


</div>


))

}



</div>


</div>



</div>









{/* NEW FEATURES */}






<div className="grid md:grid-cols-2 gap-8 mt-10">







{/* RADAR */}


<div className="rounded-3xl bg-[#111827] p-8">


<h2 className="text-2xl font-bold flex gap-2">

<Target/>

Meeting Performance Radar

</h2>




<div className="mt-8 space-y-5">


<Progress

title="Participation"

value={participants*20}

/>



<Progress

title="Attendance Quality"

value={completed*20}

/>



<Progress

title="Meeting Efficiency"

value={engagement}

/>



<Progress

title="Collaboration"

value={80}

/>



</div>


</div>









{/* SMART STATISTICS */}



<div className="rounded-3xl bg-[#111827] p-8">


<h2 className="text-2xl font-bold flex gap-2">

<BarChart3/>

Smart Meeting Statistics

</h2>




<div className="grid grid-cols-2 gap-5 mt-8">



<Stat

title="Average Attendance"

value={`${participants}`}

/>



<Stat

title="Total Sessions"

value={`${totalMeetings}`}

/>



<Stat

title="Productivity Score"

value={`${engagement}%`}

/>



<Stat

title="AI Rating"

value="A+"

/>



</div>


</div>





</div>






</div>


)

}





const Progress=({

title,

value

}:any)=>(


<div>


<div className="flex justify-between mb-2">

<span>{title}</span>

<span>{value}%</span>


</div>



<div className="h-3 bg-gray-700 rounded-full">


<div

className="h-3 bg-green-500 rounded-full"

style={{

width:`${Math.min(value,100)}%`

}}


/>


</div>



</div>


)







const Stat=({

title,

value

}:any)=>(


<div className="bg-black rounded-2xl p-5">


<p className="text-gray-400">

{title}

</p>


<h2 className="text-3xl font-bold mt-2">

{value}

</h2>


</div>


)








const AnalyticsCard=({

icon,

title,

value,

gradient


}:any)=>{


return(


<div

className={`rounded-3xl p-6 bg-gradient-to-br ${gradient}`}

>


<div className="flex justify-between">


<div>

<p className="text-white/70">

{title}

</p>


<h1 className="text-5xl font-bold mt-3">

{value}

</h1>


</div>


{icon}


</div>


</div>


)


}



export default MeetingAnalytics;
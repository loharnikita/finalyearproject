'use client';

import { useEffect,useState } from "react";


export default function PreviousNotes(){


const [notes,setNotes]=useState<any[]>([]);



useEffect(()=>{


const getNotes=async()=>{


const res=await fetch("/api/notes");


const data=await res.json();


setNotes(data);


}


getNotes();



},[]);



return (

<div className="min-h-screen bg-black p-8 text-white">


<h1 className="text-4xl font-bold">

Previous Meeting Notes

</h1>



<div className="mt-8 space-y-4">


{
notes.map((item)=>(


<div

key={item._id}

className="rounded-xl bg-gray-900 p-5"


>


<p className="text-sm text-gray-400">

Meeting ID:
{item.meetingId}

</p>



<p className="mt-3">

{item.content}

</p>



<p className="mt-3 text-sm">

{new Date(item.createdAt)
.toLocaleString()}

</p>


</div>


))

}


</div>



</div>


)

}
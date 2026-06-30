'use client';


import {useEffect,useState} from "react";
import { Download } from "lucide-react";
import jsPDF from "jspdf";


export default function NotesPage(){


const [notes,setNotes]=useState<any[]>([]);



useEffect(()=>{


fetch("/api/notes")

.then(res=>res.json())

.then(data=>setNotes(data));


},[]);





const download=(text:string)=>{


const pdf = new jsPDF();



pdf.setFontSize(18);


pdf.text(
"MeetVerse Meeting Notes",
20,
20
);



pdf.setFontSize(12);


const lines = pdf.splitTextToSize(
text,
170
);



pdf.text(
lines,
20,
40
);



pdf.save(
"Meeting_Notes.pdf"
);



};






return(


<div className="min-h-screen bg-[#0f172a] p-8 text-white">



<h1 className="text-4xl font-bold mb-8">

Previous Meeting Notes 📝

</h1>





<div className="grid md:grid-cols-2 gap-6">



{


notes.map((item)=>(



<div

key={item._id}

className="rounded-2xl bg-[#1e293b] p-6 shadow-xl"


>



<p className="text-blue-400 mb-3">

Meeting ID

</p>



<p className="text-sm mb-5">

{item.meetingId}

</p>




<div className="bg-black/30 rounded-xl p-4">


{item.content}


</div>





<div className="flex justify-between mt-5">


<p className="text-gray-400">

{new Date(item.createdAt)
.toLocaleString()}

</p>



<button

onClick={()=>download(item.content)}

className="flex gap-2 bg-green-600 px-4 py-2 rounded-xl"

>

<Download size={18}/>

PDF

</button>



</div>



</div>



))


}



</div>



</div>


)

}
'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useCall } from '@stream-io/video-react-sdk';
import { X, Download, Save } from 'lucide-react';
import jsPDF from "jspdf";


const MeetingNotes = () => {


const [open,setOpen] = useState(false);

const [note,setNote] = useState("");

const {user}=useUser();

const call=useCall();



const saveNotes = async()=>{


if(!user || !call){

alert("Meeting not found");
return;

}



await fetch("/api/notes",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

meetingId:call.id,

userId:user.id,

content:note

})


});


alert("Notes saved");

setNote("");

};





const downloadNotes = () => {


const pdf = new jsPDF();


pdf.setFontSize(18);


pdf.text(
"MeetVerse Meeting Notes",
20,
20
);



pdf.setFontSize(12);


const lines = pdf.splitTextToSize(
note,
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

<>


<button

onClick={()=>setOpen(true)}

className="rounded-xl px-5 py-3 flex gap-2"

>

📝 Notes

</button>





{

open &&

(

<div className="fixed right-5 top-20 z-50 w-[420px] rounded-2xl bg-[#111827] p-5 shadow-2xl text-white">



<div className="flex justify-between items-center">


<h2 className="text-xl font-bold">

Meeting Notes

</h2>



<button

onClick={()=>setOpen(false)}

>

<X/>

</button>


</div>





<textarea


value={note}


onChange={(e)=>setNote(e.target.value)}


placeholder="Write important points, decisions, tasks..."


className="mt-5 h-64 w-full rounded-xl p-4 text-black"


/>





<div className="flex gap-3 mt-4">


<button

onClick={saveNotes}

className="flex items-center gap-2 bg-green-600 px-5 py-2 rounded-xl"

>

<Save size={18}/>

Save

</button>





<button

onClick={downloadNotes}

className="flex items-center gap-2 bg-purple-600 px-5 py-2 rounded-xl"

>


<Download size={18}/>

Download

</button>



</div>



</div>


)

}



</>

)

}



export default MeetingNotes;
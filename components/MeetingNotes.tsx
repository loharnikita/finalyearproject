'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useCall } from '@stream-io/video-react-sdk';


const MeetingNotes = () => {

  const [open,setOpen] = useState(false);

  const [note,setNote] = useState('');

  const {user} = useUser();

  const call = useCall();



  const saveNotes = async()=>{


    if(!user || !call){

      alert("User or meeting not found");

      return;

    }



    try{


      const response = await fetch("/api/notes",{

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



      if(response.ok){

        alert("Notes saved successfully");

        setNote("");

      }



    }catch(error){

      console.log(error);

      alert("Error saving notes");

    }


  }



return (

<>

<button

onClick={()=>setOpen(!open)}

className="rounded-xl bg-blue-600 px-4 py-2"

>

📝 Notes

</button>



{

open && (

<div className="fixed right-5 top-20 z-50 w-96 rounded-xl bg-black p-5 text-white">


<h2 className="text-xl font-bold mb-3">

Meeting Notes

</h2>



<textarea

className="h-60 w-full rounded-lg p-3 text-black"

placeholder="Write meeting notes..."

value={note}

onChange={(e)=>setNote(e.target.value)}

/>



<button

onClick={saveNotes}

className="mt-3 rounded bg-green-600 px-4 py-2"

>

Save

</button>



</div>


)

}


</>

)

}


export default MeetingNotes;
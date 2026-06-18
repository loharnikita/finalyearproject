'use client';

import { useEffect, useState } from 'react';


export default function NotesPage() {


  const [savedNotes,setSavedNotes] = useState<any[]>([]);



  useEffect(()=>{


    const getNotes = async()=>{


      try{


        const response = await fetch("/api/notes");


        const data = await response.json();


        setSavedNotes(data);



      }catch(error){

        console.log(error);

      }


    };


    getNotes();


  },[]);




  return (

    <div className="min-h-screen p-8 text-white">


      <h1 className="mb-6 text-4xl font-bold">

        Previous Meeting Notes

      </h1>




      <div className="space-y-4">


      {
        savedNotes.map((item)=>(


          <div

          key={item._id}

          className="rounded-lg border p-5"


          >


          <p className="text-sm text-gray-400">

          Meeting ID:
          {item.meetingId}

          </p>



          <p className="mt-3 text-xl">

          {item.content}

          </p>



          <p className="mt-3 text-sm text-gray-400">

          Created:
          {new Date(item.createdAt)
          .toLocaleString()}

          </p>



          </div>


        ))
      }


      </div>


    </div>

  );

}
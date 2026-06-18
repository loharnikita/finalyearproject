'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";


const MeetingInsights = () => {

  const [open, setOpen] = useState(false);
  const router = useRouter();


  return (

    <div className="w-full">


      <button

        onClick={() => setOpen(!open)}

        className="flex w-full items-center justify-between rounded-lg  p-4 text-white"

      >

        <span >
          📊 Meeting Insights
        </span>


        <span>
          {open ? "▲" : "▼"}
        </span>


      </button>



      {
        open && (

          <div className="mt-2 space-y-2">


            <button

              onClick={() => router.push("/attendance")}

              className="w-full rounded-lg bg-gray-800 p-3 text-left text-white"

            >

              👥 Attendance Report

            </button>



            <button

              onClick={() => router.push("/analytics")}

              className="w-full rounded-lg bg-gray-800 p-3 text-left text-white"

            >

              📈 Meeting Analytics

            </button>


          </div>

        )
      }



    </div>

  );


};


export default MeetingInsights;
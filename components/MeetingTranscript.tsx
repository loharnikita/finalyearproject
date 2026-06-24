"use client";


import {useState} from "react";

import {Mic} from "lucide-react";


const MeetingTranscript =({

meetingId

}:any)=>{


const [recording,setRecording]=useState(false);





const startRecording=()=>{


const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;




if(!SpeechRecognition){

alert(
"Speech recognition not supported"
);

return;

}





const recognition =
new SpeechRecognition();



recognition.continuous=true;

recognition.interimResults=false;

recognition.lang="en-US";




recognition.onresult=async(event:any)=>{


const text =
event.results[
event.results.length-1
][0].transcript;



console.log(
"Transcript:",
text
);




// SAVE TO DATABASE

await fetch(
"/api/transcript/save",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

meetingId,

text

})


}

);




// GENERATE SUMMARY


const res =
await fetch(

"/api/summary/generate",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

transcript:text

})


}

);



const data =
await res.json();



localStorage.setItem(

"meetingSummary",

data.summary

);



window.location.href =
"/meeting-summary";




};





recognition.start();


setRecording(true);


};





return(


<button


onClick={startRecording}


className={`

flex

items-center

gap-2

px-5

py-2

rounded-xl

text-white


${

recording

?

"bg-red-600"

:

"bg-blue-600"

}

`}


>


<Mic size={20}/>


{

recording

?

"Recording..."

:

"Transcript"

}



</button>



)


}



export default MeetingTranscript;
"use client";

import {useRef,useState} from "react";
import {useRouter} from "next/navigation";


const TranscriptRecorder = ({
meetingId
}:{
meetingId:string
})=>{


const recognitionRef = useRef<any>(null);

const [recording,setRecording]=useState(false);

const router = useRouter();




const startRecording=async()=>{


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
"text:",
text
);




// SAVE TRANSCRIPT

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



const result =
await res.json();




localStorage.setItem(

"meetingSummary",

result.summary

);



router.push(
"/meeting-summary"
);



};





recognition.start();



recognitionRef.current =
recognition;



setRecording(true);


};





return(


<button

onClick={startRecording}

className={`
px-5
py-3
rounded-xl
text-white
font-semibold

${

recording

?

"bg-red-600"

:

"bg-blue-600"

}

`}

>


{

recording

?

"🔴 Recording..."

:

"🎤 Transcript"

}



</button>


)


}



export default TranscriptRecorder;
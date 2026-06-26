"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const TranscriptRecorder = ({
  meetingId
}:{
  meetingId:string
}) => {


const recognitionRef = useRef<any>(null);

const [recording,setRecording] = useState(false);

const [text,setText] = useState("");

const router = useRouter();



const startRecording = () => {


const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;


if(!SpeechRecognition){

alert("Speech recognition not supported");
return;

}



const recognition = new SpeechRecognition();


recognition.continuous = true;

recognition.interimResults = true;

recognition.lang = "en-US";





recognition.onresult = (event:any)=>{


let transcript = "";


for(
let i=event.resultIndex;
i<event.results.length;
i++
){

transcript +=
event.results[i][0].transcript;

}



console.log(
"Live Transcript:",
transcript
);



setText(prev =>
prev + " " + transcript
);



};



recognition.start();


recognitionRef.current = recognition;


setRecording(true);


};






const stopRecording = async()=>{


if(recognitionRef.current){

recognitionRef.current.stop();

}



setRecording(false);



console.log(
"SAVING FINAL TEXT:",
text
);




if(!text){

alert("No transcript found");

return;

}





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



const data =
await res.json();



localStorage.setItem(
"meetingSummary",
data.summary
);



router.push(
"/meeting-summary"
);



};







return(


<button

onClick={
recording
?
stopRecording
:
startRecording
}


className={`
flex
items-center
gap-2
px-5
py-2
rounded-xl
text-white
font-semibold

${
recording
?
"bg-red-600"
:
"bg-[#19232d]"
}

`}

>


🎤


{

recording

?

"Stop Recording"

:

"Transcript"

}


</button>



)


}



export default TranscriptRecorder;
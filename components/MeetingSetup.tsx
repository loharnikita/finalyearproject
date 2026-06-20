'use client';

import { useEffect, useState } from 'react';

import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import Alert from './Alert';
import { Button } from './ui/button';



const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {



const { useCallEndedAt, useCallStartsAt } =
useCallStateHooks();



const callStartsAt = useCallStartsAt();

const callEndedAt = useCallEndedAt();



const callTimeNotArrived =
callStartsAt &&
new Date(callStartsAt) > new Date();



const callHasEnded =
!!callEndedAt;



const call = useCall();



if(!call){

throw new Error(
'useStreamCall must be used within StreamCall'
);

}




const [isMicCamToggled,setIsMicCamToggled]
=
useState(false);



const [username,setUsername]
=
useState("");



const [joining,setJoining]
=
useState(false);





useEffect(()=>{


if(isMicCamToggled){


call.camera.disable();

call.microphone.disable();


}else{


call.camera.enable();

call.microphone.enable();


}



},[
isMicCamToggled,
call.camera,
call.microphone
]);







if(callTimeNotArrived)

return(

<Alert

title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt?.toLocaleString()}`}

/>

);







if(callHasEnded)

return(

<Alert

title="The call has been ended by the host"

iconUrl="/icons/call-ended.svg"

/>

);







return(


<div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">



<h1 className="text-center text-2xl font-bold">

Setup

</h1>




<VideoPreview />





<input


type="text"


placeholder="Enter your name"


value={username}


onChange={(e)=>
setUsername(e.target.value)
}


className="w-72 rounded-lg p-3 text-black"

/>







<div className="flex h-16 items-center justify-center gap-3">



<label className="flex items-center justify-center gap-2 font-medium">


<input


type="checkbox"


checked={isMicCamToggled}


onChange={(e)=>
setIsMicCamToggled(e.target.checked)
}


/>


Join with mic and camera off


</label>



<DeviceSettings />



</div>







<Button

disabled={joining}

className="rounded-md bg-green-500 px-4 py-2.5"

onClick={async()=>{


if(joining) return;


setJoining(true);


try{


await call.join();


setIsSetupComplete(true);


}

catch(error){


console.log(
"Join error:",
error
);


}

finally{


setJoining(false);


}



}}

>


{
joining
?
"Joining..."
:
"Join meeting"
}


</Button>






</div>


);


};


export default MeetingSetup;
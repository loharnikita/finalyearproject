'use client';


import { useCall } from "@stream-io/video-react-sdk";

import { Button } from "./ui/button";



const EndCallButton = ({
handleLeave
}:{

handleLeave:()=>void;

})=>{



const call = useCall();



const endMeeting = async()=>{


try{


await handleLeave();



}

catch(error){

console.log(error);

}



};



return(


<Button

onClick={endMeeting}

className="bg-red-500"

>


End call for everyone


</Button>


);



};



export default EndCallButton;
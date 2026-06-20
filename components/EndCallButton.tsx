'use client';

import { useCall } from '@stream-io/video-react-sdk';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';


const EndCallButton = ({
  onLeave
}:{
  onLeave:()=>Promise<void>
})=>{


const call = useCall();

const router = useRouter();



const endCall = async()=>{


try{


// update attendance first
await onLeave();


// end stream meeting
await call?.endCall();


// go home
router.push("/");


}
catch(error){

console.log("End call error:",error);

}


};




return(

<Button

onClick={endCall}

className="bg-red-500"

>

End call for everyone

</Button>


);


};


export default EndCallButton;
"use client";

import { Copy } from "lucide-react";


const CopyInvite =()=>{


const copyLink=()=>{


navigator.clipboard.writeText(
window.location.href
);


alert("Meeting link copied");


};


return(

<button

onClick={copyLink}

className="
flex gap-2
rounded-xl

px-4
py-2
"

>

<Copy size={18}/>

Copy Invite Link

</button>


)

}


export default CopyInvite;
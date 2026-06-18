const AnalyticsCards = () => {


const analytics = [

{
title:"Host",
value:"John Smith"
},

{
title:"Meeting Status",
value:"Completed"
},

{
title:"Meeting Duration",
value:"46 min"
},

{
title:"Participants",
value:"18"
},

{
title:"Average Attendance",
value:"92%"
},

{
title:"Peak Participants",
value:"16"
},

{
title:"Meeting Started",
value:"10:00 AM"
},

{
title:"Meeting Ended",
value:"10:46 AM"
}


];



return (


<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">


{

analytics.map((item)=>(


<div

key={item.title}

className="rounded-xl bg-gray-900 p-6"

>


<p className="text-gray-400">

{item.title}

</p>



<h2 className="mt-3 text-2xl font-bold">

{item.value}

</h2>



</div>


))


}


</div>


);


};


export default AnalyticsCards;
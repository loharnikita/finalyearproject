const AttendanceTable =()=>{


const users=[

{
name:"Rahul",
join:"10:00 AM",
leave:"10:45 AM",
duration:"45 min"
},

{
name:"Priya",
join:"10:05 AM",
leave:"10:45 AM",
duration:"40 min"
},

{
name:"Amit",
join:"10:10 AM",
leave:"10:30 AM",
duration:"20 min"
}

];



return(

<div>


<div className="grid gap-5 md:grid-cols-4">


<div className="rounded-xl bg-gray-900 p-5">
Total Participants
<h2 className="text-3xl font-bold">
15
</h2>
</div>


<div className="rounded-xl bg-gray-900 p-5">
Present
<h2 className="text-3xl font-bold">
13
</h2>
</div>



<div className="rounded-xl bg-gray-900 p-5">
Left Early
<h2 className="text-3xl font-bold">
2
</h2>
</div>



<div className="rounded-xl bg-gray-900 p-5">
Duration
<h2 className="text-3xl font-bold">
45 min
</h2>
</div>



</div>



<table className="mt-10 w-full">


<thead>

<tr>

<th>Name</th>
<th>Join</th>
<th>Leave</th>
<th>Duration</th>


</tr>

</thead>



<tbody>


{
users.map((u)=>(


<tr key={u.name}>


<td>{u.name}</td>

<td>{u.join}</td>

<td>{u.leave}</td>

<td>{u.duration}</td>


</tr>


))

}



</tbody>


</table>


</div>


)


}


export default AttendanceTable;
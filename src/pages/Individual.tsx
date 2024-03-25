import { Input } from "@/components/ui/input";
import { RecordCard } from "./Records";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {format, parseISO } from "date-fns";


interface User {
  image: string;
  name: string;
  email: string;
  gender: string;
  DOB: string;
  issues: string;
}

interface Record {
  name: string;
  appointment: string;
  issue: string;
  doctor_name: string;
  attachment: string;
  _id: string;
}

const Individual = () => {  

  const location = useLocation();
  const [user, SetUser] = useState<User | null>(null);
  const [issues, setIssues] = useState([]);
  const [records, setRecords] = useState<Record[]>([]);
  
  useEffect(()=>{

    const fetchUser = async () => {
      const parts= location.pathname.split("/");
      const _id = parts[parts.length - 1];
      console.log(_id);

      const userData  = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getRelativeuser/${_id}`,{
        headers :{
          'Authorization': localStorage.getItem("token"),
        },
        withCredentials:true,
      });
      console.log(userData.data);

      const userRecords = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/record/getRelativeRecords/${_id}`,{
        headers :{
          'Authorization': localStorage.getItem("token"),
        },
        withCredentials:true,
      });
      console.log(userData.data);
      console.log(userRecords.data);
      SetUser(userData.data);
      setIssues(userData.data.issues);
      setRecords(userRecords.data);
    }

    fetchUser()
  },[])

 
  return (
    <div className="px-4 py-4 " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Relative Profile
        </h1>
      </div>
      <div className="pt-16 px-4 flex flex-row gap-4">
        <div>
          <img src={user?.image } className="w-48 h-48 rounded-full" />
        </div>
        <div className="font-semibold flex flex-col">
             <div className="flex flex-row gap-10">
                  <label>
                    User Name:
                    <Input disabled className="my-2 w-64" value={user?.name} />
                  </label>
                  <label>
                    User Email:
                    <Input disabled  className="my-2 w-64" value={user?.email}/>
                  </label>
                  <label>
                    User Gender:
                    <Input disabled  className="my-2 w-64" value={user?.gender}/>
                  </label>     
             </div>
             <div className="flex flex-row gap-10">
                  <label>
                    User DOB:
                    <Input disabled className="my-2 w-64" value={user?.DOB}/>
                  </label>
                  <label>
                    User Issues:
                    <Input disabled  className="my-2 w-96" value={user?.issues} />
                  </label>
             </div>
        </div>
      </div>
      {issues.map((issue, index) => (
        <div className="mt-10" key={index}>
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight first:mt-0">
            {issue}
          </h2>
          <div style={{display: 'flex', overflowX: 'auto'}}>
            {records.filter(record => record.issue === issue).map((record, index) => (
              <div key={index} className="flex flex-row gap-3 overflow-auto">
                <RecordCard key={index} 
                  recordName={record.name}
                  recordAppointment={format(parseISO(record.appointment), 'dd MMMM yyyy')}
                  recordIssues={record.issue} 
                  recordDoctor={record.doctor_name} 
                  recordAttachment={record.attachment}
                  recordId = {record._id}
                  />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Individual;
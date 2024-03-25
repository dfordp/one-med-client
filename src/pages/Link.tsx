import { format, parseISO } from 'date-fns';
import { useEffect, useState } from "react";
import { RecordCard } from './Records';
import axios from 'axios';


interface Record {
  name: string;
  appointment: string;
  issue: string;
  doctor_name: string;
  attachment: string;
  _id: string;
  createdAt: string;
}

interface Link {
  name: string;
  // add other properties of your link objects here
}


const ILink = () => {

  const [records, SetRecords] = useState<Record[]>([]);
  const [link, setLink] = useState<Link | null>(null);


  useEffect(()=>{

    const fetchUser = async () => {
      const parts= location.pathname.split("/");
      const _id = parts[parts.length - 1];
      console.log(_id);

      const linkData = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/link/getLinkDetails/${_id}`,{
        headers :{
          'Authorization': localStorage.getItem("token"),
        },
        withCredentials:true,
      });
      console.log(linkData.data);
      setLink(linkData.data)

      const userRecords = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/record/getUserRecords/${linkData.data.user_id}`,{
        headers :{
          'Authorization': localStorage.getItem("token"),
        },
        withCredentials:true,
      });

      const relventrecords = userRecords.data.filter((record: Record) => record.issue === linkData.data.relatedIssue);

      console.log(relventrecords);
      
      SetRecords(relventrecords)




    }

    fetchUser()
  },[])


  // const records = [
  //   { name: 'Record 1', date: new Date('2022-01-01') },
  //   { name: 'Record 2', date: new Date('2022-02-01') },
  //   { name: 'Record 3', date: new Date('2022-02-01') },
  //   { name: 'Record 4', date: new Date('2022-03-01') },
  //   { name: 'Record 5', date: new Date('2022-03-01') },
  //   { name: 'Record 6', date: new Date('2022-04-01') },
  //   { name: 'Record 7', date: new Date('2022-04-01') },
  //   { name: 'Record 8', date: new Date('2022-05-01') },
  //   { name: 'Record 9', date: new Date('2022-05-01') },
  //   { name: 'Record 10', date: new Date('2022-06-01') },
  // ];


  const sortedRecords = records.sort((a: Record, b: Record) => parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime());
  
  const recordsByDate = sortedRecords.reduce((acc: { [key: string]: Record[] }, record: Record) => {
    const dateKey = format(parseISO(record.createdAt), 'dd MMMM yyyy');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(record);
    return acc;
  }, {});
  

  return (
    <div className="px-4 py-4 " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="flex flex-row justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Link : {link?.name}
        </h1> 
      </div>
      {Object.entries(recordsByDate).map(([date, records]: [string, Record[]]) => (
        <div key={date}>
          <div className="mt-6 mx-6 font-bold">
            {date}
          </div>
          <div className="mt-6 mx-8 grid grid-cols-3 gap-6 overflow-y-auto" style={{ maxHeight: '400px' }}>
            {records.map((record: Record, index: number) => (
             <RecordCard key={index} 
             recordName={record.name}
             recordAppointment={format(parseISO(record.appointment), 'dd MMMM yyyy')}
             recordIssues={record.issue} 
             recordDoctor={record.doctor_name} 
             recordAttachment={record.attachment}
             recordId = {record._id}
             />
           ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ILink;
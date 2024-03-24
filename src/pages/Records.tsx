import { parseISO, format } from 'date-fns';
import { useState, useEffect } from "react";
import { FaCaretDown, FaEye } from "react-icons/fa";
import { MdOutlineFileDownload, MdDelete } from "react-icons/md";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Authenticated } from "../atom"
import axios from 'axios';

export const Card = ({ recordName, recordAttachment , recordIssues ,recordAppointment,recordDoctor}) => {
  return (
    <div className="bg-gray-300 w-72 h-40 rounded-md">
      <div className="bg-gray-100 h-20 rounded-t">
        <iframe src={recordAttachment} className='w-full h-full overflow-none'></iframe>
      </div>
      <div className="bg-gray-300 h-20 flex flex-col justify-between px-1 ">
        <div className="font-semibold text-xl">
          {recordName}
        </div>
        <div className="flex flex-row justify-end mb-1 mr-1 gap-2">
          <Dialog>
            <DialogTrigger><FaEye size={25} opacity={0.75} /></DialogTrigger>
            <DialogContent className='h-[70vh] overflow-auto'>
              <DialogHeader>
                <DialogTitle>
                  <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
                    Record details
                  </h1>
                </DialogTitle>
                <div className='flex flex-col gap-2 font-semibold'>
                  <label>
                    Record Name
                    <Input disabled className="my-4 w-64 outline-2" value={recordName} />
                  </label>
                  <label>
                    Related Issues
                    <Input disabled className="my-4 w-64 outline-2" value={recordIssues} />
                  </label>
                  <label>
                    Date of Creation
                    <Input disabled className="my-4 w-64 outline-2" value={recordAppointment}/>
                  </label>
                  <label>
                    Doctor Name
                    <Input disabled className="my-4 w-64 outline-2" value={recordDoctor} />
                  </label>
                  <label>
                    Record Attachment
                    {/* <Carousel className='w-64'>
                      <CarouselContent className='w-64 h-64 flex flex-row justify-center'>
                        <CarouselItem>Record 1</CarouselItem>
                        <CarouselItem>Record 2</CarouselItem>
                        <CarouselItem>Record 3</CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel> */}
                    <div className='my-2 mx-2'>
                      <iframe src={recordAttachment} className='w-full h-full overflow-none'></iframe>
                      <a href={recordAttachment} target="_blank" rel="noopener noreferrer">Open Document</a>
                    </div>
                  </label>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <MdOutlineFileDownload size={25} opacity={0.75} />
          <MdDelete size={25} opacity={0.75} />
        </div>
      </div>
    </div>
  )
};

const Records = () => {
  const [recordName, setRecordName] = useState("");
  const [relatedIssue, setRelatedIssue] = useState("");
  const [dateOfCreation, setDateOfCreation] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [files, setFiles] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState("All Records");
  // const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const [isAuthenticated, setisAuthenticated] = useRecoilState(Authenticated);

  const [issues , setIssues] = useState([]);
  const [records , setRecords] = useState([]);
   
  // const issues = ['Issue 1', 'Issue 2', 'Issue 3'];
  // const records = [
  //   { name: 'Record 1', date: '2024-01-01T00:00:00.000Z', issue: issues[0] },
  // ];

  useEffect(
    () => {
      const check = localStorage.getItem("token");

      if (check) {
        setisAuthenticated(true);
      }
      else {
        navigate('/auth');
      }
    }
    , [navigate,setisAuthenticated])

    useEffect(() => {
      const fetchData = async () => {
        const _id = localStorage.getItem("_id");


        try {

          const user = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getUser/${_id}`, {
            headers: {
              'Authorization': localStorage.getItem("token"),
            },
            withCredentials: true
          });

          const records = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/record/getUserRecords/${_id}`, {
            headers: {
              'Authorization': localStorage.getItem("token"),
            },
            withCredentials: true
          });
          console.log(user.data);

          setIssues(user.data.issues);
          
          console.log(records.data); 

          setRecords(records.data);

        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, []);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files[0]);
  };



  const filteredRecords = selectedIssue !== "All Records"
  ? records.filter(record => record.issue === selectedIssue)
  : records;

  // Sort and group the filtered records by date

    
  const sortedRecords = filteredRecords.sort((a, b) => parseISO(b.appointment).getTime() - parseISO(a.appointment).getTime());
  
  const recordsByDate = sortedRecords.reduce((acc, record) => {
    const dateKey = format(parseISO(record.appointment), 'dd MMMM yyyy');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(record);
    return acc;
  }, {});
  

  const handleSubmit = async (event: React.FormEvent) => {


    event.preventDefault();
    const token = localStorage.getItem("token")
    const data = {
      user_id : localStorage.getItem("_id"),
      attachment : files,
      issue : relatedIssue,
      appointment : dateOfCreation,
      doctor_name : doctorName,
      recordName : recordName
    }

    console.log(data);
    console.log(token);
      // import.meta.env.VITE_BACKEND_URL}/api/record/createRecord
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/record/createRecord`, data, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      console.log(res);

      setRecordName("");
      setRelatedIssue("");
      setDateOfCreation("");
      setDoctorName("");
      setFiles(null);
  }  

  return (
    <div className="px-4 py-4 " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="flex flex-row justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Records
        </h1>
        <div className="my-2 gap-2 flex flex-row">
          <div className="bg-black text-white px-4 rounded-md">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-row items-center gap-3 py-2"><FaCaretDown /> <div>{selectedIssue || "All Records"}</div></DropdownMenuTrigger>
              <DropdownMenuContent>
                {issues.map((issue, index) => (
                  <DropdownMenuItem key={index} onSelect={() => setSelectedIssue(issue)}>
                    {issue}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onSelect={() => setSelectedIssue(null)}>All Records</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <Dialog>
              <DialogTrigger>
                <Button>
                  + Create Record
                </Button>
              </DialogTrigger>
              <DialogContent className="font-semibold">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold">Create Record</DialogTitle>
                </DialogHeader>

                <label>
                  Record Name:
                  <Input value={recordName} onChange={e => setRecordName(e.target.value)} />
                </label>

                <label>
                  Related Issue:
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row items-center gap-3 py-2"><FaCaretDown /> <div>{relatedIssue || "Select Issue"}</div></DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {issues.map((issue, index) => (
                        <DropdownMenuItem key={index} onSelect={() => setRelatedIssue(issue)}>
                          {issue}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </label>

                <label>
                  Date of Creation:
                  <Input type="date" value={dateOfCreation} onChange={e => setDateOfCreation(e.target.value)} />
                </label>

                <label>
                  Doctor Name:
                  <Input className="my-2" value={doctorName} onChange={e => setDoctorName(e.target.value)} />
                </label>

                <label>
                  Attachments:
                  <Input type="file" className='w-full my-2' onChange={handleFileChange} />
                </label>

                <Button onClick={handleSubmit}>
                  Submit
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      {Object.entries(recordsByDate).map(([date, records]) => (
        <div key={date}>
          <div className="mt-6 mx-6 font-bold">
            {date}
          </div>
          <div className="mt-6 mx-8 grid grid-cols-3 gap-6 overflow-y-auto" style={{ maxHeight: '400px' }}>
            {records.map((record, index) => (
              <Card key={index} 
              recordName={record.name}
              recordAppointment={record.appointment}
              recordIssues={record.issue} 
              recordDoctor={record.doctor_name} 
              recordAttachment={record.attachment}/>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

//{ recordName, recordAttachment , recordIssues ,recordAppointment,recordDoctor}
export default Records;
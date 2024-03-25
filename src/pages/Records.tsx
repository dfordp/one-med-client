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

export const RecordCard = ({ recordName, recordAttachment , recordIssues ,recordAppointment,recordDoctor , recordId}) => {

  const handleDownload = async () => {
    const response = await fetch(recordAttachment);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
  
    // Extract the file extension from the URL
    const fileExtension = recordAttachment.split('.').pop();
  
    // Use the file extension when setting the 'download' attribute
    link.setAttribute('download', `file.${fileExtension}`);
  
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDelete = async(id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/record/deleteRecord/${id}`, {
        headers: {
          'Authorization': localStorage.getItem("token"),
        },
        withCredentials: true
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }  
};

  return (
    <div className="bg-gray-300 w-72 h-40 rounded-md">
      <div className="bg-gray-100 h-20 rounded-t">
        <img src={recordAttachment} className='w-full h-full overflow-allow'></img>
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
                      {/* <a href={recordAttachment} target="_blank" rel="noopener noreferrer">Open Document</a> */}
                    </div>
                  </label>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <MdOutlineFileDownload size={25} opacity={0.75} onClick={handleDownload} />
          <Dialog>
            <DialogTrigger><MdDelete size={25} opacity={0.75}/></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete this record?
                </DialogTitle>
              </DialogHeader>
              <Button onClick={()=>handleDelete(recordId)}>Yes, delete</Button>
            </DialogContent>
          </Dialog>
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
  const [newIssue, setNewIssue] = useState("");
  const navigate = useNavigate();
  const [isAuthenticated, setisAuthenticated] = useRecoilState(Authenticated);

  const [issues , setIssues] = useState([]);
  const [records , setRecords] = useState([]);
   

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

  const handleAddIssue = async () => {

    const newIssues = [...issues,newIssue];
    console.log(newIssues)

    const id = localStorage.getItem("_id");

    const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/user/updateUser/${id}`, {issues : newIssues}  , {
      headers: {
        'Authorization': localStorage.getItem("token"),
      },
      withCredentials: true
    });

    console.log(res.data);
  };
  

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
                <DropdownMenu>
                <Dialog>
                    <DialogTrigger>+Add Issue</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Add a new issue
                        </DialogTitle>
                      </DialogHeader>
                      <Input type="text" value={newIssue} onChange={(e) => setNewIssue(e.target.value)} />
                      <Button onClick={handleAddIssue}>Submit</Button>
                    </DialogContent>
                  </Dialog>
                </DropdownMenu>
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

export default Records;
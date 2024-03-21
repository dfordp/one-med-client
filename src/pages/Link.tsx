import { format } from 'date-fns';
import { useState } from "react";
import { FaCaretDown,FaEye  } from "react-icons/fa";
import { MdOutlineFileDownload , MdDelete } from "react-icons/md";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { InputFile } from "@/components/ui/inputform";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export const Card = ({ recordName }) => {

  return(
    <div className="bg-gray-300 w-72 h-40 rounded-md">
    <div className="bg-gray-100 h-20 rounded-t">
      Card Component
    </div>
    <div className="bg-gray-300 h-20 flex flex-col justify-between px-1 "> 
      <div className="font-semibold text-xl">
        {recordName}
      </div>
      <div className="flex flex-row justify-end mb-1 mr-1 gap-2"> 
      <Dialog>
      <DialogTrigger><FaEye size={25} opacity={0.75}/></DialogTrigger>
      <DialogContent className='h-[70vh] overflow-auto'>
        <DialogHeader>
          <DialogTitle>
            <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
              Record details
            </h1>
          </DialogTitle>
          <div className='flex flex-col gap-2 font-semibold'>
                <label>
                  User Name
                  <Input disabled className="my-4 w-64 outline-2" />
                </label>
                <label>
                  Related Issues
                  <Input disabled className="my-4 w-64 outline-2" />
                </label>
                <label>
                  Date of Creation
                  <Input disabled className="my-4 w-64 outline-2" />
                </label>
                <label>
                  Doctor Name
                  <Input disabled className="my-4 w-64 outline-2" />
                </label>
                <label>
                  Record Attachments
                  <Carousel className='w-64'>
                    <CarouselContent className='w-64 h-64 flex flex-row justify-center'>
                      <CarouselItem>Record 1</CarouselItem>
                      <CarouselItem>Record 2</CarouselItem>
                      <CarouselItem>Record 3</CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </label>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
        <MdOutlineFileDownload size={25} opacity={0.75}/>
        <MdDelete size={25} opacity={0.75}/>
      </div>
    </div>
  </div>
  )
 
};

const ILink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recordName, setRecordName] = useState("");
  const [relatedIssue, setRelatedIssue] = useState("");
  const [dateOfCreation, setDateOfCreation] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const issues = ['Issue 1', 'Issue 2', 'Issue 3'];
  const records = [
    { name: 'Record 1', date: new Date('2022-01-01') },
    { name: 'Record 2', date: new Date('2022-02-01') },
    { name: 'Record 3', date: new Date('2022-02-01') },
    { name: 'Record 4', date: new Date('2022-03-01') },
    { name: 'Record 5', date: new Date('2022-03-01') },
    { name: 'Record 6', date: new Date('2022-04-01') },
    { name: 'Record 7', date: new Date('2022-04-01') },
    { name: 'Record 8', date: new Date('2022-05-01') },
    { name: 'Record 9', date: new Date('2022-05-01') },
    { name: 'Record 10', date: new Date('2022-06-01') },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  // Sort records by date in descending order
  const sortedRecords = records.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Group records by date
  const recordsByDate = sortedRecords.reduce((acc, record) => {
    const dateKey = format(record.date, 'dd MMMM yyyy');
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
          Link : 123
        </h1> 
      </div>
      {Object.entries(recordsByDate).map(([date, records]) => (
        <div key={date}>
          <div className="mt-6 mx-6 font-bold">
            {date}
          </div>
          <div className="mt-6 mx-8 grid grid-cols-3 gap-6 overflow-y-auto" style={{ maxHeight: '400px' }}>
            {records.map((record, index) => (
              <Card key={index} recordName={record.name} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ILink;
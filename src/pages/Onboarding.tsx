import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import {InputDisabled} from "@/components/ui/inputdisabled"
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {

  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(null);
  const [issues, setIssues] = useState([]);
  const [issueInput, setIssueInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDateChange = (event) => {
    setDob(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAddIssue = () => {
    setIssues([...issues, issueInput]);
    setIssueInput('');
  };

  const handleRemoveIssue = (index) => {
    setIssues(issues.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (event) => { 

    try{
      event.preventDefault();
      console.log({
        email,
        name,
        gender,
        dob,
        issues,
        selectedFile
      });
      const data = {
        email,
        name,
        gender,
        dob,
        issues,
        selectedFile
      }
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const token = res.data.token;
      const _id = res.data.newUser._id;
      localStorage.setItem("token",token);
      localStorage.setItem("_id",_id); 
      window.location.reload();
    }
    catch(e){
      console.log(e);   
    }
    
  };
  
  return (
    <div className="bg-gray-200 w-screen h-screen">
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center min-h-screen">
          <div className="bg-white w-full h-11/12 rounded-md px-5 my-3 mx-auto">
              <h1 className="scroll-m-20 text-2xl font-bold tracking-tight flex flex-row justify-start my-5 mx-1">
                  Onboarding
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div className="font-semibold">
                  Email
                  <InputDisabled value={email} className="my-2"/>
                </div>
                <div className="font-semibold">
                  Name
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder='John Doe' className="my-2"/>
                </div>
                <div className="font-semibold flex flex-col">
                  Gender
                  <div className='w-full h-10 ring-2 ring-gray-100 rounded-md flex flex-row items-center px-2 my-2'>
                  <DropdownMenu>
                  <DropdownMenuTrigger className='outline-none'>{gender || 'Select Gender'}</DropdownMenuTrigger>
                  <DropdownMenuContent className='w-96 flex flex-col justify-center'>
                    <DropdownMenuItem onSelect={() => setGender('Male')}>Male</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setGender('Female')}>Female</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setGender('Other')}>Other</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="font-semibold flex flex-col">
                  Date of Birth
                  <Input type="date" onChange={handleDateChange} className='w-full my-2' />
                </div>
                <div className="font-semibold flex flex-col">
                  Image
                  <Input type="file" className='w-full my-2' onChange={handleFileChange} />
                </div>
                <div className="font-semibold flex flex-col">
                  <div>Issues</div>
                  <div className="flex flex-row">
                    <Input 
                      type="text" 
                      value={issueInput} 
                      onChange={(e) => setIssueInput(e.target.value)} 
                      className='w-full my-2' 
                    />
                    <button onClick={handleAddIssue}>
                      <FaPlus />
                    </button>
                  </div>
                  <div className="flex flex-wrap">
                    {issues.map((issue, index) => (
                      <div key={index} className="flex flex-row m-1 p-1 border rounded gap-2">
                        <div>{issue}</div>
                        <button onClick={() => handleRemoveIssue(index)}>x</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-center my-8'>
                <Button onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding;
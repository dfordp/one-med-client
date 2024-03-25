import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoLinkOutline } from 'react-icons/io5';

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
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Link {
  _id: string;
  name: string;
  relatedIssue: string;
  // add other properties of your link objects here
}

const LinkCard = ({ _id, name, relatedIssue }: Link) => {

  const navigate = useNavigate();

  const onPressed = () => {
    if(window !== undefined) {
        window.navigator.clipboard.writeText(`http://localhost:5173/link/${_id}`);
    }
};

    return(
      <div onClick={()=>{navigate(`/link/${_id}`)}} className="w-72 h-20 rounded-md">
        <div className="bg-gray-50 rounded-md h-20 flex flex-col justify-between px-1 "> 
          <div className="font-semibold text-xl">
            {name}
          </div>
          <div className="flex flex-row justify-between mb-1 mx-1 gap-2"> 
            <div className="font-medium text-xs text-black opacity-75">
              {relatedIssue}
            </div>
            <IoLinkOutline size={25} onClick={(e) => { e.stopPropagation(); onPressed(); }}/>
          </div>
        </div>
      </div>
    );
};

const Links = () => {
  const [linkName, setLinkName] = useState("");
  const [relatedIssue, setRelatedIssue] = useState("");
  const [issues,setIssues] = useState([]);
  const [links,setLinks] = useState([]);
  //@ts-ignore
  const [user,setUser] = useState({});


  useEffect(()=>{

    const addPic = async() => {

      const _id = localStorage.getItem("_id")
      const userData = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getUser/${_id}`,{
        headers :{
          'Authorization': localStorage.getItem("token"),
        },
        withCredentials:true,
      });
      console.log(userData.data);

      const links = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/link/getLink/${_id}`,{
        headers :{
          'Authorization': localStorage.getItem("token"),
        },
        withCredentials:true,
      })

      console.log(links.data)
      
      setLinks(links.data)
      setUser(userData.data)
      setIssues(userData.data.issues)
    }

    addPic()
  } 
    ,[])

    const handleSelectIssue = (issue: string) => {
      setRelatedIssue(issue);
    };


  // const links = [
  //   { name: 'Link 1', url: 'http://example.com/1', date: new Date('2022-01-01') , issues: "Issue 1" },
  //   { name: 'Link 2', url: 'http://example.com/2', date: new Date('2022-02-01') , issues: "Issue 2"},
  //   // Add more links as needed
  // ];


  const handleSubmit = async() => {
    const data = {
      user_id : localStorage.getItem("_id"),
      linkName :linkName,
      relatedIssue: relatedIssue,
    }

    console.log(data);

    const link = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/link/createLink` , data , {
        headers :{
          'Authorization': localStorage.getItem("token"),
        },
        withCredentials:true,
    });

    console.log(link.data);
    
  }

  return (
    <div className="px-4 py-4 " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="flex flex-row justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Links
        </h1>
        <div className="my-2 gap-2 flex flex-row">
          <div>

            <Dialog>
              <DialogTrigger>
                  <Button>
                  + Create Link
                </Button>
              </DialogTrigger>
              <DialogContent className="font-semibold">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold">Create Link</DialogTitle>
                </DialogHeader>

                <label>
                  Link Name:
                  <Input value={linkName} onChange={e => setLinkName(e.target.value)} />
                </label>

                <label>
                  Related Issue:
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row items-center gap-3 py-2">
                      <FaCaretDown/> 
                      <div>
                        <Input value={relatedIssue} className='w-full'/>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {issues.map((issue, index) => (
                        <DropdownMenuItem key={index} onSelect={() => handleSelectIssue(issue)}>
                          {issue}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </label>

{/* 
                <label>
                  Date of Experiration:
                  <Input type="date" value={dateOfExperation} onChange={e => setDateOfExperation(e.target.value)} />
                </label> */}

                <Button onClick={handleSubmit}>
                  Create
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      <div className="mt-6 mx-8 grid grid-cols-3 gap-6 overflow-y-auto" style={{ maxHeight: '400px' }}>
        {links.map((link: Link, index: number) => (
          <LinkCard key={index} _id={link._id} name={link.name} relatedIssue={link.relatedIssue} />
          ))}
      </div>
    </div>
  )
}

export default Links;
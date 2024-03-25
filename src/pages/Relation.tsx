import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
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
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from "axios";



const RelationCard = ({ to_id , relativeName, relationType }) => {

  const navigate = useNavigate();
  
  return(
    <div onClick={(e)=>{navigate(`/relation/${to_id}`)}} className="w-72 h-20 rounded-md">
    <div className="flex flex-col justify-between px-1 py-1 bg-gray-100 h-20 rounded-t">
      <div className="font-semibold text-xl">
        {relativeName}
      </div>
      <div className="font-semibold text-sm my-1">
        ({relationType})
      </div>
    </div>
  </div>
  );
};

const Relations = () => {
  const [relationName, setRelationName] = useState("");
  const [relationType, setRelationType] = useState("");
  const [relationEmail, setRelationEmail] = useState("");
  const [fromRelations, setFromRelations] = useState([]);
  const [toRelations, setToRelations] = useState([]);


  useEffect(()=>{

    const _id = localStorage.getItem("_id");
    const token = localStorage.getItem("token");

    const fetchRelatives= async () => {
      const torelation = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/relation/getRelationTo/${_id}`,{
        headers: {
          'Authorization': token,
        },
        withCredentials: true
      });

      const unApprovedRelations = torelation.data.filter(relation => relation.appovedByToUser === "pending");

      setToRelations(unApprovedRelations);
      
      const fromrelation = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/relation/getRelationfrom/${_id}`,{
        headers: {
          'Authorization': token,
        },
        withCredentials: true
      });
      const approvedRelations = fromrelation.data.filter(relation => relation.appovedByToUser === "accepted");

      setFromRelations(approvedRelations);
    }

    fetchRelatives();

  },[]);

  
  const handleSubmit = async () =>{

    const to_user = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/api/user/getUserByEmail/${relationEmail}`, {
      headers: {
        'Authorization': localStorage.getItem("token"),
      },
      withCredentials: true
    })
    

    const to_user_id = to_user.data._id;

    const data = {
      from_id : localStorage.getItem("_id"),
      to_id : to_user_id,
      relationType : relationType,
      relativeName : relationName
    }
    console.log(data);
    

    const relation = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/relation/createRelation`,data ,{
      headers: {
        'Authorization': localStorage.getItem("token"),
      },
      withCredentials: true
    })

    console.log(relation);
    
    setRelationEmail("");
    setRelationType("");
    setRelationName("");  
  }


  const handleApprove = async (relation) => {
   console.log("approval triggered",relation._id);
  
   const data = { "appovedByToUser" : "accepted"}

   const apporval = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/relation/updateRelation/${relation._id}`,data,{
      headers: {
        'Authorization': localStorage.getItem("token"),
      },
      withCredentials: true
    })
    console.log(apporval.data);
    
};
  
  const handleReject = async (relation) => {
    console.log("rejection triggered",relation._id);
  
    const data = { "appovedByToUser" : "rejected"}
 
    const rejection = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/relation/updateRelation/${relation._id}`,data,{
       headers: {
         'Authorization': localStorage.getItem("token"),
       },
       withCredentials: true
     })
     console.log(rejection.data);
  };

  return (
    <div className="px-4 py-4 " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="flex flex-row justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Relation
        </h1>
        <div className="my-2 gap-2 flex flex-row">
          <div className="bg-black text-white px-4 rounded-md">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row items-center gap-3 py-2"><FaCaretDown/> <div>Requests</div></DropdownMenuTrigger>
            <DropdownMenuContent>
            {toRelations.map((relation, index) => (
            <DropdownMenuItem key={index}>
              <div className='flex flex-row gap-2'>
                <div>
                  {relation.relativeName} ({relation.relation})
                </div>
                <div className='flex flex-row gap-3'>
                  <Button onClick={() => handleApprove(relation)}>
                    <IoMdCheckmark/>
                  </Button>
                  <Button onClick={() => handleReject(relation)}>
                    <MdOutlineCancel/>
                  </Button>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          <div>

            <Dialog>
              <DialogTrigger>
                  <Button>
                  + Create Relation
                </Button>
              </DialogTrigger>
              <DialogContent className="font-semibold">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold">Create Relation</DialogTitle>
                </DialogHeader>

                <label>
                  Relative Name:
                  <Input value={relationName} onChange={e => setRelationName(e.target.value)} />
                </label>

                <label>
                  Relation Type:
                  <Input value={relationType} onChange={e => setRelationType(e.target.value)} />
                </label>

                <label>
                  Relative Email:
                  <Input value={relationEmail} onChange={e => setRelationEmail(e.target.value)} />
                </label>

                <Button onClick={handleSubmit}>
                  Submit
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="mt-6 mx-8 grid grid-cols-3 gap-3 overflow-y-auto" style={{ maxHeight: '400px' }}>
        {fromRelations.map((relation, index) => (
          <RelationCard key={index} to_id={relation.to_id} relativeName={relation.relativeName} relationType={relation.relation} />
        ))}
      </div>
    </div>
  )
}

export default Relations;
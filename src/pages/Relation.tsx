import { format } from 'date-fns';
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { MdOutlineFileDownload , MdDelete } from "react-icons/md";
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



const Card = ({ relativeName, relationType }) => {

  const navigate = useNavigate();
  
  return(
    <div onClick={(e)=>{navigate('/relation/${id}')}} className="w-72 h-20 rounded-md">
    <div className="flex flex-row gap-3 px-1 py-1 bg-gray-100 h-20 rounded-t">
      <div className="font-semibold text-xl">
        {relativeName}
      </div>
      <div className="font-semibold text-xl">
        ({relationType})
      </div>
    </div>
  </div>
  );
};

const Relations = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [relationName, setRelationName] = useState("");
  const [relationType, setRelationType] = useState("");
  const [relationEmail, setRelationEmail] = useState("");

  const relations = [
    { name: 'Relation 1', type: 'Type 1', date: new Date('2022-01-01') },
    { name: 'Relation 2', type: 'Type 2', date: new Date('2022-02-01') },
    // Add more relations as needed
  ];

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
              <DropdownMenuItem>
                <div className='flex flex-row gap-2'>
                  <div>
                   Relative Name (Relation)
                  </div>
                  <div className='flex flex-row gap-3'>
                    <Button>
                      <IoMdCheckmark/>
                    </Button>
                    <Button>
                      <MdOutlineCancel/>
                    </Button>
                  </div>
                </div>
              </DropdownMenuItem>
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

                <Button onClick={() => setIsOpen(false)}>
                  Submit
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="mt-6 mx-8 grid grid-cols-3 gap-3 overflow-y-auto" style={{ maxHeight: '400px' }}>
        {relations.map((relation, index) => (
          <Card key={index} relativeName={relation.name} relationType={relation.type} />
        ))}
      </div>
    </div>
  )
}

export default Relations;
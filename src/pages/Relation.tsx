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

const Card = ({ relationName, relationType }) => (
  <div className="bg-gray-300 w-72 h-40 rounded-md">
    <div className="bg-gray-100 h-20 rounded-t">
      <div className="font-semibold text-xl">
        {relationName}
      </div>
    </div>
    <div className="bg-gray-300 h-20 flex flex-col justify-between px-1 "> 
      <div className="font-semibold text-xl">
        {relationType}
      </div>
      <div className="flex flex-row justify-end mb-1 mr-1 gap-2"> 
        <MdOutlineFileDownload size={25}/>
        <MdDelete size={25}/>
      </div>
    </div>
  </div>
);

const Relations = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [relationName, setRelationName] = useState("");
  const [relationType, setRelationType] = useState("");
  const [dateOfCreation, setDateOfCreation] = useState("");

  const relations = [
    { name: 'Relation 1', type: 'Type 1', date: new Date('2022-01-01') },
    { name: 'Relation 2', type: 'Type 2', date: new Date('2022-02-01') },
    // Add more relations as needed
  ];

  // Sort relations by date in descending order
  const sortedRelations = relations.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Group relations by date
  const relationsByDate = sortedRelations.reduce((acc, relation) => {
    const dateKey = format(relation.date, 'dd MMMM yyyy');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(relation);
    return acc;
  }, {});

  return (
    <div className="px-4 py-4 " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="flex flex-row justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Relations
        </h1>
        <div className="my-2 gap-2 flex flex-row">
          <div className="bg-black text-white px-4 rounded-md">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row items-center gap-3 py-2"><FaCaretDown/> <div>All Relations</div></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Relations</DropdownMenuItem>
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
                  Relation Name:
                  <Input value={relationName} onChange={e => setRelationName(e.target.value)} />
                </label>

                <label>
                  Relation Type:
                  <Input value={relationType} onChange={e => setRelationType(e.target.value)} />
                </label>

                <label>
                  Date of Creation:
                  <Input type="date" value={dateOfCreation} onChange={e => setDateOfCreation(e.target.value)} />
                </label>

                <Button onClick={() => setIsOpen(false)}>
                  Submit
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      {Object.entries(relationsByDate).map(([date, relations]) => (
        <div key={date}>
          <div className="mt-6 mx-6 font-bold">
            {date}
          </div>
          <div className="mt-6 mx-8 grid grid-cols-3 gap-6 overflow-y-auto" style={{ maxHeight: '400px' }}>
            {relations.map((relation, index) => (
              <Card key={index} relationName={relation.name} relationType={relation.type} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Relations;
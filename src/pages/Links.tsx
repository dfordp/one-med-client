import { format } from 'date-fns';
import { useState } from "react";
import { FaCaretDown,FaTimes } from "react-icons/fa";
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

const LinkCard = ({ linkName,linkIssues, linkUrl }) => {

  const navigate = useNavigate();

  return(
    <div onClick={(e)=>{navigate(`/link/${123}`)}} className="w-72 h-20 rounded-md">
    <div className="bg-gray-50 rounded-md h-20 flex flex-col justify-between px-1 "> 
      <div className="font-semibold text-xl">
        {linkName}
      </div>
      <div className="flex flex-row justify-between mb-1 mx-1 gap-2"> 
        <div className="font-medium text-xs text-black opacity-75">
          {linkIssues}
        </div>
        <IoLinkOutline size={25}/>
      </div>
    </div>
  </div>
  );
};

const Links = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [dateOfCreation, setDateOfCreation] = useState("");
  const [relatedIssues, setRelatedIssues] = useState([]);
  const issues = ['Issue 1', 'Issue 2', 'Issue 3', 'Issue 4']; // replace with your issues

  const handleSelectIssue = (issue) => {
    if (!relatedIssues.includes(issue)) {
      setRelatedIssues([...relatedIssues, issue]);
    } else {
      setRelatedIssues(relatedIssues.filter(i => i !== issue));
    }
  };

  const handleRemoveIssue = (issue) => {
    setRelatedIssues(relatedIssues.filter(i => i !== issue));
  };

  const links = [
    { name: 'Link 1', url: 'http://example.com/1', date: new Date('2022-01-01') , issues: "Issue 1" },
    { name: 'Link 2', url: 'http://example.com/2', date: new Date('2022-02-01') , issues: "Issue 2"},
    // Add more links as needed
  ];

  // Sort links by date in descending order
  const sortedLinks = links.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Group links by date
  const linksByDate = sortedLinks.reduce((acc, link) => {
    const dateKey = format(link.date, 'dd MMMM yyyy');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(link);
    return acc;
  }, {});

  return (
    <div className="px-4 py-4 " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="flex flex-row justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Links
        </h1>
        <div className="my-2 gap-2 flex flex-row">
          <div className="bg-black text-white px-4 rounded-md">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row items-center gap-3 py-2"><FaCaretDown/> <div>All Links</div></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Links</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
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
                      <div>{relatedIssues.length > 0 ? relatedIssues.join(', ') : "Select Issue"}</div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {issues.map((issue, index) => (
                        <DropdownMenuItem key={index} onSelect={() => handleSelectIssue(issue)}>
                          {issue}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div>
                    {relatedIssues.map((issue, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {issue}
                        <button onClick={() => handleRemoveIssue(issue)}>
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                </label>


                <label>
                  Date of Experiration:
                  <Input type="date" value={dateOfCreation} onChange={e => setDateOfCreation(e.target.value)} />
                </label>

                <Button onClick={() => setIsOpen(false)}>
                  Create
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      {Object.entries(linksByDate).map(([date, links]) => (
        <div key={date}>
          <div className="mt-6 mx-6 font-bold">
            {date}
          </div>
          <div className="mt-6 mx-8 grid grid-cols-3 gap-6 overflow-y-auto" style={{ maxHeight: '400px' }}>
            {links.map((link, index) => (
              <LinkCard key={index} linkName={link.name} linkIssues={link.issues} linkUrl={link.url} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Links;
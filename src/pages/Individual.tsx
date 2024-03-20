import { Input } from "@/components/ui/input";
import { Card } from "./Records";

const Individual = () => {

  const issues = [
    { 
      name: 'Issue 1', 
      records: [
        { name: 'Record 1', date: new Date('2022-01-01') },
        { name: 'Record 2', date: new Date('2022-02-01') },
      ]
    },
    { 
      name: 'Issue 2', 
      records: [
        { name: 'Record 3', date: new Date('2022-02-01') },
        { name: 'Record 4', date: new Date('2022-03-01') },
      ]
    },
    { 
      name: 'Issue 3', 
      records: [
        { name: 'Record 5', date: new Date('2022-03-01') },
        { name: 'Record 6', date: new Date('2022-04-01') },
      ]
    },
  ];
 
  return (
    <div className="px-4 py-4 " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Relative Profile
        </h1>
      </div>
      <div className="pt-16 px-4 flex flex-row gap-4">
        <div className="bg-gray-100 w-48 h-48 rounded-full">
          Profile Photo
        </div>
        <div className="font-semibold flex flex-col">
             <div className="flex flex-row gap-10">
                  <label>
                    User Name:
                    <Input disabled className="my-2 w-64" />
                  </label>
                  <label>
                    User Email:
                    <Input disabled  className="my-2 w-64" />
                  </label>
                  <label>
                    User Gender:
                    <Input disabled  className="my-2 w-64" />
                  </label>
             </div>
             <div className="flex flex-row gap-10">
                  <label>
                    User DOB:
                    <Input disabled className="my-2 w-64" />
                  </label>
                  <label>
                    User Issues:
                    <Input disabled  className="my-2 w-64" />
                  </label>
             </div>
        </div>
      </div>
      {issues.map((issue, index) => (
        <div className="mt-10" key={index}>
          <h2 className="scroll-m-20 text-2xl font-bold tracking-tight first:mt-0">
            {issue.name}
          </h2>
          <div className="mt-6 mx-8 grid grid-cols-3 gap-6 overflow-y-auto" style={{ maxHeight: '400px' }}>
              {issue.records.map((record, index) => (
                <Card key={index} recordName={record.name} />
              ))}
            </div>
        </div>
      ))}
    </div>
  )
}

export default Individual;
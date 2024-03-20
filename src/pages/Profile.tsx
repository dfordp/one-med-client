import { Input } from "@/components/ui/input";

const Profile = () => {
 
  return (
    <div className="px-4 py-4 " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Profile
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
    </div>
  )
}

export default Profile

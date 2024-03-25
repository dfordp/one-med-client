import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";


const Profile = () => {

  const [user,SetUser] = useState({});

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
      
      SetUser(userData.data)
    }

    addPic()
  } 
    ,[])

 
  return (
    <div className="px-4 py-4 " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Profile
        </h1>
      </div>
      <div className="pt-16 px-4 flex flex-row gap-4">
        <div>
          <img src={user.image} className="w-48 h-48 rounded-full"/>
        </div>
        <div className="font-semibold flex flex-col">
             <div className="flex flex-row gap-10">
                  <label>
                    User Name:
                    <Input disabled className="my-2 w-64" value={user.name} />
                  </label>
                  <label>
                    User Email:
                    <Input disabled  className="my-2 w-64" value={user.email}/>
                  </label>
                  <label>
                    User Gender:
                    <Input disabled  className="my-2 w-64" value={user.gender}/>
                  </label>
             </div>
             <div className="flex flex-row gap-10">
                  <label>
                    User DOB:
                    <Input disabled className="my-2 w-64" value={user.DOB}/>
                  </label>
                  <label>
                    User Issues:
                    <Input disabled  className="my-2 w-96" value={user.issues} />
                  </label>
             </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

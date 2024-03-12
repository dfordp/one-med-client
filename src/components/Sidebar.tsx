import { Link } from 'react-router-dom';
import { FaRegFileAlt, FaLink, FaSitemap } from 'react-icons/fa';
import { MdOutlinePerson } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
  const menuItems = [
    { name: 'Records', icon: <FaRegFileAlt size={24}/>, route: '/records' },
    { name: 'Links', icon: <FaLink size={24}/>, route: '/links' },
    { name: 'Relation', icon: <FaSitemap size={24}/>, route: '/relation' },
    { name: 'Profile', icon: <MdOutlinePerson size={26}/>, route: '/profile' },
  ];

  return (
    <div className="w-40 h-screen bg-white py-6 shadow-md flex flex-col justify-between">
      <div className="scroll-m-20 text-2xl font-bold tracking-tight flex flex-row justify-center my-1">
        OneMed
      </div>
      <div>
        {menuItems.map((item, index) => (
          <Link key={index} to={item.route} className="flex items-center gap-4 my-8 ml-8 font-semibold">
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-row justify-center items-center gap-2 font-semibold">
        <div>
         <CiLogout />
        </div>
        <div>
          Log Out
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
import { IoFileTrayFullOutline , IoLinkOutline, IoPeopleOutline,IoPersonOutline , IoLogOutOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  
  const menuItems = [
    { name: 'Records', icon: IoFileTrayFullOutline, path: '/records' },
    { name: 'Links', icon: IoLinkOutline , path: '/links' },
    { name: 'Relation', icon: IoPeopleOutline , path: '/relation' },
    { name: 'Profile', icon: IoPersonOutline , path: '/profile' },
    { name:'Logout' , icon : IoLogOutOutline ,path : '/logout'}
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    window.location.reload();
  }

  return (
    <div className='shadow-lg h-screen bg-white'>
     <div className='flex flex-row justify-center pt-3  font-bold'>
        OneMed
      </div>
      <div className="pt-6 px-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            item.name !== 'Logout' ? (
              <Link key={item.name} to={item.path} className="flex flex-col items-center my-6 text-sm font-semibold text-gray-500 hover:text-gray-700">
                <a><IconComponent className="my-1" size={26}/></a>
                <h2>{item.name}</h2>
              </Link>
            ) : (
              <div key={item.name} className="flex flex-col items-center my-6 text-sm font-semibold text-gray-500 hover:text-gray-700" onClick={handleLogout}>
                <a><IconComponent className="my-1" size={26}/></a>
                <h2>{item.name}</h2>
              </div>
            )
          );
        })}
      </div>
    </div>
  )
}

export default Sidebar;
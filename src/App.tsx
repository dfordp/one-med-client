import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Records from "./pages/Records";
import Links from "./pages/Links";
import Relation from "./pages/Relation";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

const Navigate = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
      </Routes>
      {isAuthenticated && (
        <div className="flex flex-row bg-gray-200 w-screen h-screen">
          <div className="z-10">
            <Sidebar/>
          </div>
          <div className="flex flex-col">
            <TopBar/>
            <Routes>
              <Route path='/records' element={<Records/>}/>
              <Route path='/links' element={<Links/>} />
              <Route path='/relation' element={<Relation/>}/>
              <Route path='/profile' element={<Profile/>}/>
            </Routes> 
          </div>
        </div>
      )}
      {!isAuthenticated && (
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path='/onboarding' element={<Onboarding/>}/>
        </Routes>
      )}
    </div>
  )
}



const App = () => {
  return(
    <Router>
      <Navigate/>
    </Router>
  );
}

export default App

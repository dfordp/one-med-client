import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Records from "./pages/Records";
import Links from "./pages/Links";
import Relation from "./pages/Relation";
import Profile from "./pages/Profile";

const Navigate = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {isAuthenticated && (
        <div>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/records' element={<Records/>}/>
            <Route path='/links' element={<Links/>} />
            <Route path='/relation' element={<Relation/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Routes> 
        </div>
      )}
      {!isAuthenticated && (
        <Routes>
            <Route path="/auth" element={<Auth />} />
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

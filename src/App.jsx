import { useState } from 'react';
import Navbar from './assets/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import Home from './assets/pages/Home';
import Services from './assets/pages/Services';
import Profile from './assets/pages/Profile';
import SignUp from './assets/pages/SignUp';
import SignIn from './assets/pages/SignIn';





function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navbar />
        <Routes> {/* Routes a v6-ban */}
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;

      
        
        
    
  


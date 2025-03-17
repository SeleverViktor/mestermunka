import { useState } from 'react';
import Navbar from './assets/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // A Switch helyett Routes-ot használunk v6-ban
import './App.css';
import Home from './assets/pages/Home';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navbar />
        <Routes> {/* Routes a v6-ban */}
          <Route path="/" exact Component=
          {Home}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

      
        
        
    
  


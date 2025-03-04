import { useState } from 'react';
import Navbar from './assets/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // A Switch helyett Routes-ot használunk v6-ban
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navbar />
        <Routes> {/* Routes a v6-ban */}
          <Route path="/" element={<h1>Welcome to Home Page</h1>} /> {/* Az element prop az új v6-ban */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

      
        
        
    
  


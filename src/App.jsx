import { useState } from 'react';
import Navbar from './assets/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // A Switch helyett Routes-ot használunk v6-ban
import './App.css';
import Home from './assets/pages/Home';
import Services from './assets/pages/Services';
import Products from './assets/pages/Products';
import SignUp from './assets/pages/SignUp';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navbar />
        <Routes> {/* Routes a v6-ban */}
          <Route path='/' exact component={Home}/>
          <Route path ='/services' component={Services}/>
          <Route path ='/products' component={Products}/>
          <Route path ='/sign-up' component={SignUp}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

      
        
        
    
  


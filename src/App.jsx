import { useState } from 'react'
import Navbar from './assets/Navbar';
import {BrowserRouter as Router,Swich,Route} from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>


      <Navbar    />
     < Swich>
      <Route path='/' exact/>
     </Swich>
    </Router>
    </>
    
      
        
        
    
  );
}

export default App

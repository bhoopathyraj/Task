import { BrowserRouter as Router, Route,Routes, Navigate , } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Login from './Component/Login';
import CrudApp from './Component/HandleCurd';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
   
    <div className="App">
      <Router>
      <Routes>
       <Route path="/" 
         element=
          {isLoggedIn ? <Navigate to="/crud" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/crud" Component={CrudApp} />
        </Routes>   
        </Router>   </div>
     
   
  );
}

export default App;

import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  const storedUserdata = JSON.parse(window.localStorage.getItem('userdata'));
  const [isLoggedIn, setIsLoggedIn] = useState(
    storedUserdata?.isLoggedIn || false
  );

  const [username, setUsername] = useState(storedUserdata?.username || "");
  const [token, setToken] = useState(storedUserdata?.token || "");
  const [email, setEmail] = useState(storedUserdata?.email || "");

  let userdata = {
    isLoggedIn: isLoggedIn,
    username: username,
    token: token,
    email: email
  };

  let setUserdata ={ 
    setIsLoggedIn: setIsLoggedIn,
    setUsername: setUsername,
    setToken: setToken,
    setEmail: setEmail
  };

  useEffect(() => {
    window.localStorage.setItem('userdata', JSON.stringify(userdata));
  }, [isLoggedIn, username, token, email]);

  return (
    <Router>
      <Navbar userdata = {userdata}/>
      <Routes>
        {/* <Route path = "/" element ={<Navbar />} /> */}
        <Route path = "/signup" element ={<SignUp />} />
        <Route path = "/signin" element ={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App;
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    window.localStorage.setItem('userdata', JSON.stringify(userdata));
  }, [isLoggedIn, username, token, email]);

  function handleTrueFalse() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path = "/" element ={<Navbar />} /> */}
      </Routes>
    </Router>
  )
}

export default App;
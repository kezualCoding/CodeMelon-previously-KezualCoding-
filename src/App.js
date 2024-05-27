import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { set } from 'firebase/database';
import { ToastContainer } from 'react-toastify';

function App() {
  const storedUserdata = JSON.parse(window.localStorage.getItem('userdata'));
  const [isLoggedIn, setIsLoggedIn] = useState(
    storedUserdata?.isLoggedIn || false
  );
  const [token, setToken] = useState(storedUserdata?.token || "");

  let userdata = {
    isLoggedIn: isLoggedIn,
    token: token
  };

  let setUserdata ={ 
    setIsLoggedIn: setIsLoggedIn,
    setToken: setToken
  };

  useEffect(() => {
    window.localStorage.setItem('userdata', JSON.stringify(userdata));
  }, [isLoggedIn, token]);

  return (
    <Router>
      <Navbar userdata = {userdata}/>
      <Routes>
        {/* <Route path = "/" element ={<Navbar />} /> */}
        <Route path = "/signup" element ={<SignUp />} />
        <Route path = "/signin" element ={<SignIn  setUserdata = {setUserdata}/>} />
      </Routes>
      <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />  
    </Router>
  )
}

export default App;
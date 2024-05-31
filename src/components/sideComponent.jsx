import React, { useState } from 'react';
import Styles from '../assets/sideComponent.module.css';
import defaultProfile from '../assets/images/defaultProfile.png';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function SideComponent(props) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    console.log(auth.currentUser);

    const chooseImage = () => {
        if (auth.currentUser && auth.currentUser.photoURL) {
            return auth.currentUser.photoURL;
        } else {
            return defaultProfile;
        }
    };

    const handleProfile = () => {
        navigate(`/profile/${auth.currentUser.uid}`);
    };

    const LogOut = () => {
        auth.signOut();
        props.setUserdata.setIsLoggedIn(false);
        props.setUserdata.setToken("");
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/signin');
    };

    if (props.userdata.isLoggedIn) {
        return (
            <div className={Styles.sideComponent}>
                <p onClick={LogOut} style={{ color: "white" }}>log out</p>
                <p className={Styles.profileTextDark} style={{ opacity: isHovered ? "1" : "0" }}>Profile</p>
                <button className={`${Styles.navbarButtonsDark}`} style={{ opacity: isHovered ? 0 : 1, visibility: isHovered ? 'hidden' : 'visible' }}>STUDY</button>
                <button className={Styles.navbarButtonsDark} style={{ opacity: isHovered ? 0 : 1, visibility: isHovered ? 'hidden' : 'visible' }}>GAMES</button>
                <button className={Styles.navbarButtonsDark} style={{ opacity: isHovered ? 0 : 1, visibility: isHovered ? 'hidden' : 'visible' }}>PLAYGROUND</button>
                <img 
                    src={chooseImage()} 
                    alt="profile" 
                    className={Styles.profile} 
                    onMouseEnter={() => setIsHovered(true)} 
                    onMouseLeave={() => setIsHovered(false)} 
                    onClick={handleProfile} 
                />
            </div>
        );
    } else {
        return (
            <div className={Styles.sideComponent}>
                <button className={Styles.loginDark} onClick={handleLogin}>
                    Log In
                </button>
            </div>
        );
    }
}

export default SideComponent;

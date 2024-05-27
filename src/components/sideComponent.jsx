import React, { useState } from 'react';
import Styles from '../assets/sideComponent.module.css';
import defaultProfile from '../assets/images/defaultProfile.png';

function SideComponent(props) {
    const [isHovered, setIsHovered] = useState(false);

    if(props.userdata.isLoggedIn){
        return (
            <div className={Styles.sideComponent}>
                <p className={Styles.profileTextDark} style={{opacity : isHovered ? "1" : "0"}}>Profile</p>
                <button className={`${Styles.navbarButtonsDark}`} style={{opacity: isHovered ? 0 : 1, visibility: isHovered ? 'hidden' : 'visible'}}>STUDY</button>
                <button className={Styles.navbarButtonsDark} style={{opacity: isHovered ? 0 : 1, visibility: isHovered ? 'hidden' : 'visible'}}>GAMES</button>
                <button className={Styles.navbarButtonsDark} style={{opacity: isHovered ? 0 : 1, visibility: isHovered ? 'hidden' : 'visible'}}>PLAYGROUND</button>
                <img src={defaultProfile} alt="profile" className={Styles.profile} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} />
            </div>
        );
    }else{
        return(
            <div className={Styles.sideComponent}>
                <button className={Styles.loginDark}>
                    Log In
                </button>
            </div>
        )
    }
}

export default SideComponent;
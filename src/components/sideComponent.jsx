import React, { useState } from 'react';
import Styles from '../assets/sideComponent.module.css';
import defaultProfile from '../assets/images/defaultProfile.png';

function SideComponent(props) {
    const [isHovered, setIsHovered] = useState(false);

    if(props.userdata.isLoggedIn){
        return (
            <div className={Styles.sideComponent}>
                <p className={Styles.profileText} style={{transform : isHovered ? "translateX(200px)" : "translateX(1000px)", color : isHovered ? "silver" : "black"}}>Profile</p>
                <button className={`${Styles.study} ${Styles.btn200}`} style={{opacity: isHovered ? 0 : 1, visibility: isHovered ? 'hidden' : 'visible'}}>STUDY</button>
                <button className={Styles.games} style={{opacity: isHovered ? 0 : 1, visibility: isHovered ? 'hidden' : 'visible'}}>GAMES</button>
                <button className={Styles.playground} style={{opacity: isHovered ? 0 : 1, visibility: isHovered ? 'hidden' : 'visible'}}>PLAYGROUND</button>
                <img src={defaultProfile} alt="profile" className={Styles.profile} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} />
            </div>
        );
    }
}

export default SideComponent;
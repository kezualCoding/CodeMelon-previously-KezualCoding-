import React, { useState } from 'react';
import notFoundImage from '../assets/images/404notFound.png';
import Styles from '../assets/NotFoundBrokenUrlPage.module.css';
import SpaceShip from '../assets/images/trail-removebg-preview.png';

const NotFoundBrokenUrlPage = () => {
    const [clicked , setClicked] = useState(false);
    const handleHome = () => {
        setClicked(true);
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }
  return (
    <div className={Styles.body}>
      <div className={Styles.text}>
        <p style={{fontSize: "50px"}} className={`${clicked ? Styles.textBlur : ''}`}>404 Not Found</p>
        <p style={{fontSize: "30px"}} className={`${clicked ? Styles.textBlur : ''}`}>Looks Like The Page You Are Finding Is Lost In Space</p>
        <p style={{fontSize: "30px"}} className={`${clicked ? Styles.textBlur : ''}`}>While Our Team Is Trying To Find The Page</p>
        <p style={{fontSize: "30px"}} className={`${clicked ? Styles.textBlur : ''}`}>We Should Guide You To Earth</p>
        <p style={{fontSize: "30px"}} className={`${clicked ? Styles.textBlur : ''}`}>Click Rocket To Come Back To Earth !!!! Explorer</p>
        <img src={SpaceShip} alt="SpaceShip" className={`${Styles.spaceShip} ${clicked ? Styles.spaceShipActive : Styles.SpaceShip}`} onClick={handleHome}/>
        <p className={`${clicked ? Styles.again : Styles.againBefore}`} style ={{"transition": "all 2s ease"}}>We Will Meet Again</p>
      </div>  
      <div>
      <img src={notFoundImage} alt="404 Not Found" className={Styles.image} onClick={handleHome}/>
      </div>
    </div>
  )
}

export default NotFoundBrokenUrlPage

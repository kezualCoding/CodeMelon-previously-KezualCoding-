import React, { useState } from 'react';
import Styles from '../assets/networkLost.module.css';
import { Detector } from "react-detect-offline";
import wallpaper from '../assets/images/tumblr_inline_o29dtaXWxz1rtb73a_1280.jpg';
// import wallpaper from '../assets/images/Screenshot 2024-05-30 at 12.51.44 AM.png';
import { CiWifiOff } from "react-icons/ci";
function CheckConnection(props) {
  const [clicked , setClicked] = useState(false);
  const handleHome = () => {
      setClicked(true);
      setTimeout(() => {
          window.location.href = '/';
      }, 2000);
  }
  return (
    <>
      <Detector
        render = {( {online} ) => (
          online ? props.children:
          <div className={Styles.body}>
            <img src={wallpaper} className={Styles.image}/>
            <h1 className={Styles.heading}>No Internet</h1>
            <p className={Styles.try}>Try:</p>
            <ul className={Styles.methods}>
              <li>Checking the network cables, modem and router</li>
              <li>Reconnecting to Wi-Fi</li>
            </ul>
            <p className={Styles.error}>ERR_INTERNET_DISCONNECTED</p>
            {/* <img src = {wifi} className={Styles.wifi} alt="wifi-symbol"/> */}
          </div>
        )}
      />
    </>
  )
}

export default CheckConnection;
import React from 'react';
import Styles from '../assets/networkLostLight.module.css';
import styles from '../assets/networkLostDark.module.css';
import { Detector } from "react-detect-offline";
import wallpaper from '../assets/images/LightConnectionLost.png'; 
import wallpaperDark from '../assets/images/DarkConnectionLost.png';
function CheckConnection(props) {
  if(props.theme === 'dark'){
    return (
      <>
        <Detector
          render = {( {online} ) => (
            online ? props.children:
            <div className={styles.body}>
              <div className={styles.imageContainer}>
                <img src={wallpaperDark} className={styles.image} alt = "network-lost-wallpaper"/>
              </div>
              <div className={styles.text}>
                <h1 className={styles.heading}>No Internet</h1>
                <p className={styles.try}>Try:</p>
                <ul className={styles.methods}>
                  <li>Checking the network cables, modem and router</li>
                  <li>Reconnecting to Wi-Fi</li>
                </ul>
                <p className={styles.error}>ERR_INTERNET_DISCONNECTED</p>
              </div>
            </div>
          )}
        />
      </>
    )
  }
  else{
    return (
      <>
        <Detector
          render = {( {online} ) => (
            online ? props.children:
            <div className={Styles.body}>
              <div className={Styles.imageContainer}>
                <img src={wallpaper} className={Styles.image} alt = "network-lost-wallpaper"/>
              </div>
              <div className={Styles.text}>
                <h1 className={Styles.heading}>No Internet</h1>
                <p className={Styles.try}>Try:</p>
                <ul className={Styles.methods}>
                  <li>Checking the network cables, modem and router</li>
                  <li>Reconnecting to Wi-Fi</li>
                </ul>
                <p className={Styles.error}>ERR_INTERNET_DISCONNECTED</p>
              </div>
            </div>
          )}
        />
      </>
    )
  }
}

export default CheckConnection;

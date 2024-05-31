import React, { useState, useEffect } from 'react';
import Styles from '../assets/LoadingPage.module.css';

const LoadingText = () => {
    const [text, setText] = useState("");
    const loading = "LOADING";
    const speed = 500; // Adjust speed as needed

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setText(loading.slice(0, index + 1));
            index++;
            if (index >= loading.length) {
                index = 0;
            }
        }, speed);

        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);

    return (
        <div className={Styles.loadingPageDark}>
            <p className={Styles.loadingDark}>{text}</p>;
        </div>
    )
    
};

export default LoadingText;
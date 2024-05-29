import { signInWithEmailAndPassword } from 'firebase/auth';
import Styles from '../assets/SignUp.module.css'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SignIn(props){
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [showPage ,setShowPage] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowPage(true);
        }, 1);
    }, []);



    const goToSignUp = () => {
        setShowPage(false);
        setTimeout(() => {
            navigate('/signup');
        }, 800);
    }

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handlesignIn = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.elements[1].value;
        const password = form.elements[2].value;
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            props.setUserdata.setIsLoggedIn(true);
            props.setUserdata.setToken(user.user.uid);
            
            navigate('/');
        } catch(e) {
            console.log(e.message);
        }
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.imageContainer1}></div>
            <div className = {`${Styles.signIn} ${showPage ? Styles.signInStart : ""}`} >
                <form onSubmit={handlesignIn} className={Styles.signInForm}>
                    <h1 className={Styles.heading1}>Sign In</h1>
                    <div className={Styles.inputBlock1}>
                        <input type="email" placeholder="Email" className={Styles.input} required />
                        <MdEmail className={Styles.icon}/>
                    </div>
                    <div className={Styles.inputBlock1}>
                        <input type="password" placeholder="Password" className={Styles.input} required />
                        <FaLock className={Styles.icon}/>
                    </div>
                    <button type="submit" className={Styles.submitBtn1}>Sign Up</button>
                </form>
                <button onClick={signInWithGoogle} className={Styles.googleSignIn1}>Sign In with Google <FaGoogle className={Styles.googleIcon}/></button>
                <p className={Styles.noAcc}>Don't have an account? <span onClick = {goToSignUp} style={{"color": "#fff", "cursor": "pointer"}}>Sign Up</span></p>
            </div>
        </div>
    )


}

export default SignIn;
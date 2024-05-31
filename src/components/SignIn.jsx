import { signInWithEmailAndPassword } from 'firebase/auth';
import Styles from '../assets/SignUp.module.css'
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';

function removeSpace(str){
    return str.replace(/\s/g, '').toLowerCase();
}

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
            await setDoc(doc(db, 'users', removeSpace(user.displayName)), {
                uid : user.uid,
                email: user.email,
                profile_url: user.photoURL,
                bio: '',
                followers: [],
                following: [],
                points: 0,
                accounts: {hackerrank:'', codeforces:'', codechef:'', leetcode:''},
                verified: true,
            });
            props.setUserdata.setIsLoggedIn(true);
            props.setUserdata.setToken(user.uid);
            navigate('/');

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
            await signInWithEmailAndPassword(auth, email, password);
            props.setUserdata.setIsLoggedIn(true);
            props.setUserdata.setToken(auth.currentUser.uid);
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
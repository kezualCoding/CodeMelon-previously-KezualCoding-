import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import Styles from '../assets/SignUp.module.css'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { FaGoogle, FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useEffect, useState } from 'react';
import boy from '../assets/images/WhatsApp Image 2024-05-30 at 15.47.42.jpeg';


function removeSpace(str){
    return str.replace(/\s/g, '');
}
function SignUp(props){
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [showPage ,setShowPage] = useState(false);

    useEffect(() => {  
        setTimeout(() => {
            setShowPage(true);
        }, 1);
    }, [])

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

    const goToSignIn = () => {
        setShowPage(false);
        setTimeout(() => {
            navigate('/signin');
        }, 800);
    }

    const handlesignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.elements[0].value;
        const email = form.elements[1].value;
        const password = form.elements[2].value;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                username: username,
                email: email,
                profile_url: '',
                bio: '',
                followers: [],
                following: [],
                points: 0,
                accounts: {hackerrank:'', codeforces:'', codechef:'', leetcode:''},
                verified: false,
            });
            navigate('/signin')
        } catch(e) {
            console.log(e.message);
        }
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.imageContainer}></div>
            <div className = {`${Styles.signUp} ${showPage ? Styles.signUpStart : ""}`} >
                <form onSubmit={handlesignUp} className={Styles.signUpForm}>
                    <h1 className={Styles.heading}>Sign Up</h1>
                    <div className={Styles.inputBlock}>
                        <input type="text" placeholder="Username" className={Styles.input} required />
                        <FaUser  className={Styles.icon}/>
                    </div>
                    <br />
                    <div className={Styles.inputBlock}>
                        <input type="email" placeholder="Email" className={Styles.input} required />
                        <MdEmail className={Styles.icon}/>
                    </div>
                    <br />
                    <div className={Styles.inputBlock}>
                        <input type="password" placeholder="Password" className={Styles.input} required />
                        <FaLock className={Styles.icon}/>
                    </div>
                    <br />
                    <button type="submit" className={Styles.submitBtn}>Sign Up</button>
                </form>
                <p className={Styles.alreadyAcc}>Already have an account? <span onClick = {goToSignIn} style={{"color": "#fff", "cursor": "pointer"}}>Sign In</span></p>
                <button onClick={signInWithGoogle} className={Styles.googleSignIn}>Sign In with Google <FaGoogle className={Styles.googleIcon}/></button>
            </div>
        </div>
    )

}

export default SignUp;
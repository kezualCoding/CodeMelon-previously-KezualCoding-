import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import Styles from '../assets/SignUp.module.css'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 




function SignUp(){
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

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
            <div className={Styles.signUp}>
                <form onSubmit={handlesignUp} className={Styles.signUpForm}>
                    <h1>Sign Up</h1>
                    <input type="text" placeholder="Username" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Sign Up</button>
                </form>
                <button onClick={signInWithGoogle} className={Styles.googleSignIn}>Sign In with Google</button>
            </div>
        </div>
    )

}

export default SignUp;
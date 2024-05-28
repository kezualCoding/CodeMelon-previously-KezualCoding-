import { signInWithEmailAndPassword } from 'firebase/auth';
import Styles from '../assets/SignUp.module.css'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


function SignIn(props){
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
            <div className={Styles.signIn}>
                <form onSubmit={handlesignIn} className={Styles.signInForm}>
                    <h1>Sign Up</h1>
                    <input type = 'text' placeholder = 'Username' required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Sign Up</button>
                </form>
                <button onClick={signInWithGoogle} className={Styles.googleSignIn}>Sign In with Google</button>
            </div>
        </div>
    )


}

export default SignIn;
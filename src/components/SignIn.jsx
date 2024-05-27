import { signInWithEmailAndPassword } from 'firebase/auth';
import Styles from '../assets/SignUp.module.css'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
function SignIn(props){
    const navigate = useNavigate();
    const handlesignIn = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.elements[0].value;
        const password = form.elements[1].value;
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
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )


}

export default SignIn;
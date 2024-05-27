import { createUserWithEmailAndPassword } from 'firebase/auth';
import Styles from '../assets/SignUp.module.css'
import { auth } from '../firebase';
function SignUp(){

    const handlesignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.elements[0].value;
        const password = form.elements[1].value;
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log(user);
        } catch(e) {
            console.log(e.message);
        }
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.signUp}>
                <form onSubmit={handlesignUp} className={Styles.signUpForm}>
                    <h1>Sign Up</h1>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )

}

export default SignUp;
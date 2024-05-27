import Styles from '../assets/Navbar.module.css';

function Navbar(){
    return (
        <div className={Styles.navbarDark}>
            <div className={Styles.logoDark}>Kezual Coding</div>
            <div className={Styles.logIn}></div>
        </div>
    )

}

export default Navbar;


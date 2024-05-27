import Styles from '../assets/Navbar.module.css';
import SideComponent from './sideComponent';
function Navbar(props){
    return (
        <div className={Styles.navbarDark}>
            <div className={Styles.logoDark}>Kezual Coding</div>
            <SideComponent {...props}/>
        </div>
    )

}

export default Navbar;


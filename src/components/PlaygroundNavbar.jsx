import Coin from '../assets/images/xp-coin.webp';
import { IoMdArrowBack } from "react-icons/io";
import styles from '../assets/PlaygroundNavbar.module.css';

export default function PlaygroundNavbar()
{
  return (
    <div className={styles.navbar}>
      <div className={styles.part1}>
        <IoMdArrowBack className={styles.backArrow}/>
        <p className={styles.questionName}>Back &nbsp; | &nbsp; Question Name</p>
      </div>
      <div className={styles.part2}>
        <button className={styles.pointsBtn}>Total Points <img src = {Coin} alt = "xp coin" className={styles.coinImage}/> Number</button>
          <button className={styles.runBtn}>&#9658; Run</button>
          <button className={styles.submitBtn}>Submit</button>
      </div>
    </div>
  )
}
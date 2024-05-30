import styles from '../assets/Playground.module.css';
import questionLogo from '../assets/images/questionLogo.png';
import valueLogo from '../assets/images/valueLogo.png';
import refresh from '../assets/images/refresh.jpeg';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import PlaygroundNavbar from './PlaygroundNavbar';
export default function Playground()
{
  const [language, setLanguage] = useState('python');
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  }
  return (
    <>
      <PlaygroundNavbar />
      <div className={styles.playGround}>
      <div className={styles.questionArea}>
        <div className={styles.sideBar}>
          <img src = {questionLogo} alt = "ques-logo" className={styles.logo}/>
          <img src = {valueLogo} alt = "submitValue-logo" className={styles.logo}/>
        </div>
        <div className={styles.question}>
          <p className={styles.q}>QUESTION</p>
          <p className={styles.qName}>QUESTION NAME</p>
          <div className={styles.levelDiv}>
            <button className={styles.levelBtn}>Level of ques</button>
            <p style={{"color": "grey","marginLeft" : "15px", "marginRight" : "15px"}}>&#x2022;</p>
            <p className={styles.points}>10 / 10</p>
          </div>
        </div>
      </div>
      <div className={styles.solutionArea}>
        <div className={styles.monacoEditor}>
            <div className={styles.solutionAreaPart1}>
              <select name="language-selection"  value={language} onChange={handleLanguageChange} className={styles.langSelect}>
                <option value="python">Python (3.11.4)</option>
                <option value="c++">C++ (GCC 9.2.0)</option>
                <option value="javascript">JavaScript (Node.js 18.15.0)</option>
                <option value="java">Java (OpenJDK 13.0.1)</option>
              </select>
              <img src = {refresh} alt = "reset code" className={styles.refreshBtn}/>
            </div>
            <div className={styles.solutionAreaPart2}>
              <Editor height = "60vh" width = "100%" language={language} theme = "vs-dark"/>
            </div>
        </div>
        <div className={styles.resultArea}>
          <div className={styles.resultHeadings}>
            <p className={styles.closeBtn}>&#x2304;</p>
            <p className={styles.jn}>INPUT</p>
            <p className={styles.jn}>|</p>
            <p className={styles.jn}>OUTPUT</p>
            <p className={styles.jn}>|</p>
            <p className={styles.jn}>ERROR</p>
            <p className={styles.jn}>|</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    </>
  )
}
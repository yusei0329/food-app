import React, { useState, useEffect, useContext, useRef } from 'react'
import { Store } from '../../../store';
import '../Styles/Header.css'

const Header = () => {
  const { globalState } = useContext(Store);
  const [scoreNum, setScoreNum] = useState('');

  useEffect(() => {
    if (globalState.score !== undefined && globalState.score !== null) {
    setScoreNum(globalState.score);
    }
  }, [globalState.score])

  return (
      <div className='score-text'>
        <h1>{scoreNum ? scoreNum + "%" : <span>score</span>}</h1>
      </div>
  )
}

export default Header

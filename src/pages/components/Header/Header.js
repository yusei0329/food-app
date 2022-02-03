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
    <div className='header'>
      <div className='score-text'>
        <h1>{scoreNum ? scoreNum + "%" : <span>0%</span>}</h1>
      </div>
    </div>
  )
}

export default Header

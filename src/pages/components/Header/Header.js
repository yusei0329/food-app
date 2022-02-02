import React, { useState, useEffect, useContext, useRef } from 'react'
import { Store } from '../../../store';
import '../Styles/Header.css'

const Header = () => {
  const { globalState } = useContext(Store);

  // useEffect(() => {
  //   console.log(`グローバルが変更されました${globalState.score}`)

  // }, [globalState.score])

  return (
      <div className='score-text'>
        <h1>{globalState.score ? globalState.score + "%" : <span>score</span>}</h1>
      </div>
  )
}

export default Header

import React, { useState, useEffect, useContext, useRef } from 'react'
import { Store } from '../../../store';

const Header = () => {
  const { globalState, setGlobalState } = useContext(Store);

  return (
      <div>
        <h1>{globalState.score ? globalState.score + "%" : <span>score</span>}</h1>
      </div>
  )
}

export default Header

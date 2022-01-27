import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
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

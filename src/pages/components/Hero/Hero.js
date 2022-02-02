import React, { useState, useEffect, useContext, useRef } from 'react'
import axios from 'axios';
import { Store } from '../../../store';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import "../Styles/Hero.css"

const Hero = () => {
  const { globalState, setGlobalState } = useContext(Store);
  const [term, setTerm] = useState('');
  //const [display, setDisplay] = useState(false);
  const ref = useRef(true);

  const setDisplay = async () => {
    setGlobalState( {type:'SET_LOADING', payload: true} )
    await axios.get(`https://script.google.com/macros/s/AKfycbzO6IMoPPbtBLb_AnRwgB1OheJyF5XwgNyj28NZdyjg76q4AzX0/exec/exec?name=${term}`).then((res) => {
      const foods = res.data;
      setGlobalState( {type:'SET_LOADING', payload: false} )
      setGlobalState({ type: 'SET_FOODS', payload: Object.entries(foods) })
      //setFoodData(Object.entries(foods));
      //console.log(foodNum)
    })
  }

  // useEffect(() => {
  //   console.log("globalstate.post = ")
  //   console.log(globalState.post)
  // },[globalState.post])

  return (
    <>
      <div className='input-wrap'>
        <div className='input-text'>
          <TextField
            id="outlined-basic"
            label="食品名を入力"
            variant="outlined"
            onChange={e => setTerm(e.target.value)}
            value={term} />
        </div>
        <div className='input-button'>
          <Button
            variant="outlined"
            size="medium"
            onClick={setDisplay}>
            {/* <FontAwesomeIcon icon={faCoffee} /> */}
            検索
          </Button>
        </div>

      </div>
      <div className='title-wrap'>
        <h1>{globalState.post ? globalState.post["食品名"] : "本日食べた食材を検索しよう"}</h1>
        <h2>{globalState.post ? Math.floor(Number(globalState.post["エネルギー（kcal）"])) + "kcal" : ""}</h2>
      </div>
    </>
  )
};

export default Hero;

import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Store } from '../../../store';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Hero = () => {
  const { globalState, setGlobalState } = useContext(Store);
  const [term, setTerm] = useState('');
  const [display, setDisplay] = useState(false);
  const ref = useRef(true);

  useEffect(async () => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    await axios.get(`https://script.google.com/macros/s/AKfycbzO6IMoPPbtBLb_AnRwgB1OheJyF5XwgNyj28NZdyjg76q4AzX0/exec/exec?name=${term}`).then((res) => {
      const foods = res.data;
      setGlobalState({ type: 'SET_FOODS', payload: Object.entries(foods) })
      //setFoodData(Object.entries(foods));
      //console.log(foodNum)
    })
  }, [display])


  return (
    <>
      <div>
        <TextField
          id="outlined-basic"
          label="検索"
          variant="outlined"
          onChange={e => setTerm(e.target.value)}
          value={term} />
        <Button onClick={() => setDisplay(!display)}>
          {/* <FontAwesomeIcon icon={faCoffee} /> */}
          検索
        </Button>
      </div>
      <div>
        <h1>{globalState.post ? globalState.post["食品名"] : "no data"}</h1>
        <h3>{globalState.post ? Math.floor(globalState.post["エネルギー（kcal）"]) + "kcal" : "no data"}</h3>
      </div>
    </>
  )
};

export default Hero;

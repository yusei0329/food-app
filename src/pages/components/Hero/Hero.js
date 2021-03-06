import React, { useState, useEffect, useContext, useRef } from 'react'
import axios from 'axios';
import { Store } from '../../../store';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Skeleton from '@mui/material/Skeleton';
import { IconContext } from 'react-icons'
import { AiOutlineCloseSquare } from 'react-icons/ai';
import "../Styles/Hero.css"

let titleText;

const Hero = () => {
  const { globalState, setGlobalState } = useContext(Store);
  const [term, setTerm] = useState('');
  const [amount, setAmount] = useState('');
  const [open, setOpen] = useState(false);
  const [foodTitle, setFoodtitle] = useState({});

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const onlyNumbers = n => {
    return n.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 65248)).replace(/\D/g, '');
  }

  const setDisplay = async () => {
    if (term !== "" && amount !== "") {
      setOpen(false);
      setFoodtitle({});
      setGlobalState({ type: 'SET_LOADING', payload: true });
      await axios.get(`https://script.google.com/macros/s/AKfycbzO6IMoPPbtBLb_AnRwgB1OheJyF5XwgNyj28NZdyjg76q4AzX0/exec/exec?name=${term}`).then((res) => {
        const foods = res.data;
        setGlobalState({ type: 'SET_LOADING', payload: false });
        setGlobalState({ type: 'SET_FOODS', payload: Object.entries(foods) });
        console.log(amount)
        setGlobalState({ type: 'SET_WEIGHT', payload: amount });
        //setFoodData(Object.entries(foods));
        //console.log(foodNum)
      })
    } else {
      setOpen(true);
    }
  }

  const action = (
    <>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconContext.Provider value={{ color: '#ccc', size: '30px' }}>
        <AiOutlineCloseSquare onClick={handleClose} />
      </IconContext.Provider>
    </>
  );

  useEffect(() => {
    //console.log(foodTitle)
    if (globalState.post !== undefined && globalState.post !== null) {
      if (Object.keys(globalState.post).length !== 0) {
        setFoodtitle({
          name: globalState.post["食品名"],
          num: globalState.post["エネルギー（kcal）"]
        })
      }
    }
  }, [globalState.post])



  if (globalState.isLoading) {
    titleText = (
      <div className='title-wrap'>
        <Skeleton variant="text" animation="wave" width={450} height={70} />
      </div>
    );

  } else {
    titleText = (
      <div className='title-wrap'>
        <h1>{Object.keys(foodTitle).length !== 0 ? foodTitle.name : "本日食べた食材を検索しよう"}</h1>
        <h2>{Object.keys(foodTitle).length !== 0 ? Math.floor(Number(foodTitle.num)) + "kcal" : ""}</h2>
      </div>
    );
  }

  return (
    <>
      <div className='input-wrap'>
        <div className='input-text-mane'>
          <TextField
            id="outlined-basic"
            label="食品名を入力"
            variant="outlined"
            onChange={e => setTerm(e.target.value)}
            value={term} />
        </div>
        <div className='input-text-num'>
          <TextField
            id="outlined-basic"
            label="グラム数を入力"
            variant="outlined"
            onChange={e => setAmount(onlyNumbers(e.target.value))}
            value={amount} />
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
      {
        titleText
      }
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="食品名とグラム数を入力してください"
        action={action}
      />
    </>
  )
};

export default Hero;

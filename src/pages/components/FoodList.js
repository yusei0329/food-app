import React, { useState, useEffect, useContext } from 'react';
import { Store } from '../../store/index'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Snackbar from '@mui/material/Snackbar';
import { IconContext } from 'react-icons';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import './Styles/FoodList.css'

const APP_KEY = 'scoreData';
let total = 0;
let NOW_DATE = new Date();

const FoodList = () => {
  const { globalState, setGlobalState } = useContext(Store);
  const [viewData, setViewData] = useState([]);
  const [alert, setAlert] = useState(false);
  const [messages, setMessages] = useState('');

  useEffect(() => {
    if (Object.keys(viewData).length !== 0) {
      viewData.map((score) => (
        total += Number(score.kcal)
      ))
      total = (total / 2500) * 100;
      const ratio = Math.floor(total);
      setGlobalState({ type: 'SET_SCORE', payload: ratio })
      //console.log(globalState.score)
    } else {
      setGlobalState({ type: 'SET_SCORE', payload: 0 })
    }

  }, [viewData])

  const setDatas = () => {
    // localStorage.removeItem(APP_KEY)
    if (globalState.post !== undefined && globalState.post !== null) {
      if (Object.keys(globalState.post).length !== 0) {
        setAlert(false);
        setViewData([...viewData, { name: globalState.post["食品名"], kcal: Math.floor(globalState.post["エネルギー（kcal）"]), isDone: false }])
      } else {
        setMessages('追加する食品を選択してください');
        setAlert(true);
      }
    } else {
      setMessages('追加する食品を選択してください');
      setAlert(true);
    }
  }

  const handleCeckBox = (e, i) => {
    setViewData(
      viewData.map((data, _i) => (_i === i ? { ...data, isDone: e.target.checked } : data))
    );
    //console.log(viewData);
  }

  const handleClearData = () => {
    let result = viewData.every(function (val) {
      return val.isDone === false;
    });
    //console.log(result)
    if (result !== true) {
      setAlert(false);
      const newData = viewData.filter((data) => !data.isDone);
      setViewData(newData);
    } else {
      setMessages('削除する食品を選択してください');
      setAlert(true);
    }

  }

  const scoreKeep = () => {
    //console.log(globalState.score)
    if (Object.keys(viewData).length !== 0) {
      setAlert(false);
      //localStorage.removeItem(APP_KEY);
      const appState = localStorage.getItem(APP_KEY);
      let year = NOW_DATE.getFullYear();
      let month = NOW_DATE.getMonth() + 1;
      let day = NOW_DATE.getDate();
      const scores = [
        {
          days: `${year}年${month}月${day}日`,
          points: globalState.score
        }
      ]
      //console.log(appState)
      if (appState === "undefined" || appState === undefined || appState === null) {
        console.log("und")
        localStorage.setItem(APP_KEY, JSON.stringify(scores, undefined, 1));
        //console.log(JSON.parse(localStorage.getItem(APP_KEY)))
        setGlobalState({ type: 'SET_LOCAL', payload: JSON.parse(localStorage.getItem(APP_KEY)) });
      } else {
        const localData = JSON.parse(localStorage.getItem(APP_KEY));
        localData.push(
          {
            days: `${year}年${month}月${day}日`,
            points: globalState.score
          }
        );
        localStorage.setItem(APP_KEY, JSON.stringify(localData, undefined, 1))
        setGlobalState({ type: 'SET_LOCAL', payload: JSON.parse(localStorage.getItem(APP_KEY)) });
        //console.log(globalState.events)
      }
    } else {
      setMessages('データを入力してください');
      setAlert(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(false);
  };

  const action = (
    <>
      <IconContext.Provider value={{ color: '#ccc', size: '30px' }}>
        <AiOutlineCloseSquare onClick={handleClose} />
      </IconContext.Provider>
    </>
  );

  return (
    <>
      <div className='food-wrap'>
        <div className='food-button'>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={setDatas}>追加</Button>
            <Button onClick={handleClearData}>削除</Button>
            <Button onClick={scoreKeep}>今日のデータを記録</Button>
            <Button onClick={() => setGlobalState({ type: 'SET_LOCAL', payload: JSON.parse(localStorage.getItem(APP_KEY)) })} >過去のデータを見る</Button>
            <Button onClick={() => setGlobalState({ type: 'SET_LOCAL', payload: [] })}>閉じる</Button>
          </ButtonGroup>
        </div>
        <div className='food-list-wrap'>
          <List
            sx={{
              width: '100%',
              minWidth: 500,
              maxWidth: 500,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 250,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            {
              viewData.length !== 0 ? viewData.map((view, index) => (
                <ListItemButton key={`food-${index}`}>
                  <Checkbox
                    onChange={(e) => handleCeckBox(e, index)}
                    checked={view.isDone}
                  />
                  {`${view.name} - ${view.kcal}kcal`}
                </ListItemButton>
              )) : <span></span>
            }
          </List>
        </div>
      </div>
      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={handleClose}
        message={messages}
        action={action}
      />
    </>
  );
};

export default FoodList;

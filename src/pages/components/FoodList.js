import React, { useState, useEffect, useContext } from 'react';
import { Store } from '../../store/index'
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Style from './Styles/FoodList.css'

const FoodList = () => {
  const { globalState, setGlobalState } = useContext(Store);
  const [viewData, setViewData] = useState([]);
  const [scoreData, setScoreData] = useState(0);
  let total = 0;

  useEffect(() => {
    viewData.map((score) => (
      total += Number(score.kcal)
    ))
    total = (total / 2000) * 100;
    setScoreData(Math.floor(total));
    const ratio = Math.floor(total);
    setGlobalState({ type: 'SET_SCORE', payload: ratio })
    console.log(globalState.score)
  }, [viewData])

  const handleCeckBox = (e, i) => {
    setViewData(
      viewData.map((data, _i) => (_i === i ? { ...data, isDone: e.target.checked } : data))
    );
    console.log(viewData);
  }

  const handleClearData = () => {
    const newData = viewData.filter((data) => !data.isDone);
    setViewData(newData);
  }

  const scoreKeep = () => {
    let scores = [];
    if (JSON.parse(localStorage.getItem('scoreData')) !== null) {
      scores = JSON.parse(localStorage.getItem('scoreData'));
      scores.push(globalState.score);
      localStorage.setItem('scoreData', JSON.stringify(scores));
      console.log(scores);
    } else {
      scores.unshift(globalState.score);
      localStorage.setItem('scoreData', JSON.stringify(scores));
      console.log(scores);
    }
  }

  const scoreView = () => {
    if (JSON.parse(localStorage.getItem('scoreData')) !== null) {
      console.log(JSON.parse(localStorage.getItem('scoreData')))
    }else{
      console.log("no data")
    }
  }

  return (
    <>
      <div className={Style.wrap}>
        <div className={Style.button_group}>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={() => setViewData([...viewData, { name: globalState.post["食品名"], kcal: Math.floor(globalState.post["エネルギー（kcal）"]), isDone: false }])}>追加</Button>
            <Button onClick={handleClearData}>削除</Button>
            <Button onClick={scoreKeep}>今日のデータを記録</Button>
            <Button onClick={scoreView}>過去のデータを見る</Button>
          </ButtonGroup>
        </div>

        <List
          sx={{
            width: '100%',
            minWidth: 500,
            maxWidth: 1000,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 250,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          {
            viewData ? viewData.map((view, index) => (
              <ListItemButton key={`food-${index}`}>
                <Checkbox
                  onChange={(e) => handleCeckBox(e, index)}
                  checked={view.isDone}
                />
                {view.name} - {view.kcal}kcal
              </ListItemButton>
            )) : <span>no data</span>
          }
        </List>
      </div>
    </>
  );
};

export default FoodList;

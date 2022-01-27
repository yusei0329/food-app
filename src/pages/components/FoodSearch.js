import React, { useState, useEffect, useContext, useRef } from 'react';
import { Store } from '../../store/index'
import axios from 'axios';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Style from './Styles/FoodSearch .css';

const FoodSearch = () => {
  const weight = "100";
  const { globalState, setGlobalState } = useContext(Store);
  const [foodNum, setFoodNum] = useState('');
  const [term, setTerm] = useState('name');
  const [display, setDisplay] = useState(false);
  const [foodData, setFoodData] = useState([]);
  const ref = useRef(true);

  useEffect(async () => {
    await axios.get(`https://script.google.com/macros/s/AKfycbx7WZ-wdIBLqVnCxPwzedIdjhC3CMjhAcV0MufN2gJd-xsO3xw/exec?num=${foodNum}&weight=${weight}`).then((res) => {
      console.log(res.data)
      setGlobalState({ type: "SET_KCAL", payload: res.data })
      // console.log(globalState.post);
    })
  }, [foodNum])

  useEffect(async () => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    await axios.get(`https://script.google.com/macros/s/AKfycbzO6IMoPPbtBLb_AnRwgB1OheJyF5XwgNyj28NZdyjg76q4AzX0/exec/exec?name=${term}`).then((res) => {
      const foods = res.data;
      setFoodData(Object.entries(foods));
      //console.log(foodNum)
    })
  }, [display])


  return (
    <>
      <div className={Style.search}>
        <input
          type="text"
          placeholder="検索"
          onChange={e => setTerm(e.target.value)}
          value={term} />
        <Button onClick={() => setDisplay(!display)}>
          {/* <FontAwesomeIcon icon={faCoffee} /> */}
          検索
        </Button>
      </div>

      <div>
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
          <ul>
            {
              // //foodData[0]
              foodData ? foodData.map((food, index) => (
                <ListItem key={`food-${index}`}>
                  <ListItemButton>
                    <ListItemText onClick={() => setFoodNum(food[1].split(',')[0])}>{food[1].split(',')[1]}</ListItemText>
                  </ListItemButton>
                </ListItem>
              )) : <span>no data</span>
            }
          </ul>
        </List>

        {/* Loadingが終わったら記事のタイトルを表示 */}
        <h1>{globalState.post["食品名"]}</h1>
        <h3>{Math.floor(globalState.post["エネルギー（kcal）"])} kcal</h3>
      </div>
    </>
  );
};

export default FoodSearch;

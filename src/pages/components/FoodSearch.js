import React, { useState, useEffect, useContext, useRef } from 'react';
import { Store } from '../../store/index'
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Styles/FoodSearch.css'

const FoodSearch = () => {
  const weight = "100";
  const { globalState, setGlobalState } = useContext(Store);
  const [foodNum, setFoodNum] = useState('');

  useEffect(async () => {
    await axios.get(`https://script.google.com/macros/s/AKfycbx7WZ-wdIBLqVnCxPwzedIdjhC3CMjhAcV0MufN2gJd-xsO3xw/exec?num=${foodNum}&weight=${weight}`).then((res) => {
      console.log(res.data)
      setGlobalState({ type: "SET_KCAL", payload: res.data })

      // console.log(globalState.post);
    })
  }, [foodNum])

  if (globalState.Loading) {
    return (
      <div className='loading-wrap'>
        <div className='circul'>
        <CircularProgress />
        </div>
      </div>
    )
  } else {
    return (
      <>
        <div className='list-items'>
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
            <ul>
              {
                // //foodData[0]
                globalState.foods ? globalState.foods.map((food, index) => (
                  <ListItem key={`food-${index}`}>
                    <ListItemButton>
                      <ListItemText onClick={() => setFoodNum(food[1].split(',')[0])}>{food[1].split(',')[1]}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                )) : <span></span>
              }
            </ul>
          </List>
        </div>
      </>
    );
  }
};

export default FoodSearch;

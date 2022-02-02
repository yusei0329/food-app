import React, { useState, useEffect, useContext } from 'react';
import { Store } from '../../../store';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import '../Styles/View.css'

const View = () => {
  const { globalState } = useContext(Store);

  return (
    <div className='view-wrap'>
      <h3>過去のデータ</h3>
      <List
        sx={{
          width: '100%',
          minWidth: 500,
          maxWidth: 1000,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 200,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        <ul>
          {
            // //foodData[0]
            globalState.events ? globalState.events.map((event, index) => (
              <ListItem key={`food-${index}`}>
                <ListItemButton>
                  <ListItemText>{`${event.days}, Score ${event.points}%`}</ListItemText>
                </ListItemButton>
              </ListItem>
            )) : <span>過去のデータが表示されます</span>
          }
        </ul>
      </List>
    </div>
  );
};

export default View;

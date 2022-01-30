import React, { useState, useEffect, useContext } from 'react';
import { Store } from '../../../store';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

const View = () => {
  const { globalState } = useContext(Store);

  return (
    <>
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
            globalState.events ? globalState.events.map((event, index) => (
              <ListItem key={`food-${index}`}>
                <ListItemButton>
                  <ListItemText>{`${event.days}, Score ${event.points}%`}</ListItemText>
                </ListItemButton>
              </ListItem>
            )) : <span></span>
          }
        </ul>
      </List>
    </>
  );
};

export default View;

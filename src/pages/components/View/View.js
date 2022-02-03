import React, { useState, useEffect, useContext } from 'react';
import { Store } from '../../../store';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import '../Styles/View.css'

const View = () => {
  const { globalState } = useContext(Store);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    if(globalState.events !== undefined && globalState.events !== null){
      setEventData(globalState.events.reverse());
    }
  },[ globalState.events ])

  return (
    <div className='view-wrap'>
      <h2>過去のデータ</h2>
      <div className='view-list'> 
        <List
          sx={{
            width: '100%',
            minWidth: 350,
            maxWidth: 500,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 170,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          <ul>
            {
              // //foodData[0]
              eventData.length !== 0 ? eventData.map((event, index) => (
                <ListItem key={`food-${index}`}>
                  <ListItemButton>
                    <ListItemText>{`${event.days}, Score ${event.points}%`}</ListItemText>
                  </ListItemButton>
                </ListItem>
              )) : <span className='view-span'>過去のデータが表示されます</span>
            }
          </ul>
        </List>
      </div>
    </div>
  );
};

export default View;

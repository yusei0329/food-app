import React, { useState, useContext } from 'react';
import { Store } from '../store/index'
import { Link, Location, useLocation } from 'react-router-dom';
import LocationChange from './components/LocationChange/LocationChange';

const Watch = () => {
  const [localData, setLocalData] = useState([]);
  const { globalState, setGlobalState } = useContext(Store);
  const APP_KET = 'scoreData';
  //localstorageに追加

  LocationChange((location) => {
    console.log(location.pathname)
    //setGlobalState({ type:'SET_LOCAL', payload: scores });
    localStorage.setItem(APP_KET, JSON.stringify(globalState.events));
    console.log(localStorage.getItem(APP_KET));
  })

  const handleCheck = () => {
    console.log(globalState.events);
    console.log(localStorage.getItem(APP_KET))
  }

  return (
    <>
      <Link to='/'>
        <button>戻る</button>
      </Link>
      <button onClick={handleCheck}>情報を見る</button>
      <button onClick={localStorage.removeItem(APP_KET)}>データ削除</button>

    </>
  );
};

export default Watch;

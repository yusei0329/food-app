import React from 'react';
import { Link } from 'react-router-dom';

const Watch = () => {


  return (
    <>
    <Link to = '/'>
    <button onClick={ console.log( localStorage.getItem('scoreData')) }>情報を見る</button>
    </Link>
    <button onClick={ localStorage.removeItem('scoreData') }>データ削除</button>
    
    </>
  );
};

export default Watch;

import React, { useState, useEffect, useContext } from 'react';
import { Store } from '../../store/index'

const FoodList = () => {
  const { globalState, setGlobalState } = useContext(Store);
  const [viewData, setViewData] = useState([]);
  const [scoreData, setScoreData] = useState(0);
  let total = 0;

  useEffect( () => {
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
      viewData.map((data, _i) => (_i === i ? {...data, isDone : e.target.checked} : data))
    );
    console.log(viewData);
  }

  const handleClearData = () => {
    const newData = viewData.filter((data) => !data.isDone);
    setViewData(newData);
  }

  return(
    <>
      <div>
        <button onClick={() => setViewData([...viewData,  { name: globalState.post["食品名"], kcal: globalState.post["エネルギー（kcal）"], isDone: false }])}>追加</button>
        <button onClick={ handleClearData }>削除</button>
        <button>今日のデータを記録</button>
        <ul>
          {
          viewData ? viewData.map((view, index) => (
            <li key={`food-${index}`}>
              {view.name} - {view.kcal}kcal
              <input 
                onChange={(e) => handleCeckBox(e, index)}
                type="checkbox"
                checked={view.isDone}
              />
            </li>
          )) : <span>no data</span>
          }
        </ul>
      </div>
    </>
  );
};

export default FoodList;

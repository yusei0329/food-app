import React, { useState, useEffect, useContext, useRef } from 'react';
import { Store } from '../../store/index'
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

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
      <div>
        <input
          type="text"
          placeholder="検索"
          onChange={e => setTerm(e.target.value)}
          value={term} />
        <button type="submit" onClick={() => setDisplay(!display)}>
          {/* <FontAwesomeIcon icon={faCoffee} /> */}
          検索
        </button>
      </div>

      <div>
        <ul>
          {
            // //foodData[0]
            foodData ? foodData.map((food, index) => (
              <li key={`food-${index}`}>
                <button type='submit' onClick={() => setFoodNum(food[1].split(',')[0])}>{food[1].split(',')[1]}</button>
              </li>
            )) : <span>no data</span>
          }
        </ul>

        {/* Loadingが終わったら記事のタイトルを表示 */}
        <h1>{globalState.post["食品名"]}</h1>
        <h3>{globalState.post["エネルギー（kcal）"]} kcal</h3>
      </div>
    </>
  );
};

export default FoodSearch;

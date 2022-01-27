import React, { createContext, useReducer } from 'react'

const initialState = {
  isLoading: true,
  isError: '',
  post: {},
  score: 0,
  todayData: {}
}

const reduer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        isLoading: true,
        post: {},
        isError: ''
      }
    //データの取得に成功した場合
    //成功なので、isErrorは''
    //postにはactionで渡されるpayloadを代入
    case 'SET_KCAL':
      return {
        post: action.payload
      }
    //データの取得に失敗した場合
    //成功なので、isErrorにエラーメッセージを設定
    case 'FETCH_ERROR':
      return {
        isLoading: false,
        post: {},
        isError: '読み込みに失敗しました'
      }
    
    case 'SET_SCORE':
      return {
        ...state,
        score: action.payload
      }

    case 'SET_DATA':
      return {
        ...state,
        todayData: action.payload
      }


    //defaultではそのまま渡ってきたstateを返しておく
    default:
      return state
  }
}

export const Store = createContext({
  globalState: initialState,
  setGlobalState: () => null
})

export  const StoreProvider = ({children}) => {
  const [globalState, setGlobalState] = useReducer(reduer, initialState)
  return (
    <div>
      <Store.Provider value={{ globalState, setGlobalState }}>{ children }</Store.Provider>
    </div>
  )
}

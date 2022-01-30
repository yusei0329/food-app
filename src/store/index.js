import React, { createContext, useReducer } from 'react'

const initialState = {
  isLoading: true,
  isError: '',
  post: {},
  score: 0,
  events: [],
  foods: [],
  loading: false
}

const reduer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        isLoading: true,
        post: {},
        isError: ''
      }

    case 'SET_KCAL':
      return {
        post: action.payload
      }

    case 'SET_FOODS':
      return {
        ...state,
        foods: action.payload
      }

    case 'SET_SCORE':
      return {
        ...state,
        score: action.payload
      }

    case 'SET_LOCAL':
      return {
        ...state,
        events: action.payload
      }

    case 'SET_LOAD' :
      return {
        loading: action.payload
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

import React, { createContext, useReducer } from 'react'
import axios from 'axios'
const AppReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (action.payload != null) {
        if (state.keranjang != null) {
          return {
            keranjang: [
              action.payload,
              ...state.keranjang.filter((k) => {
                return k != null && k.product.id != action.payload.product.id
              }),
            ],
          }
        } else {
          return {
            keranjang: [action.payload],
          }
        }
      }

      return {
        keranjang: [action.payload, ...state.keranjang],
      }
    case 'REMOVE_ITEM':
      return {
        keranjang: state.keranjang.filter(
          (item) => item.product.id !== action.payload.product.id
        ),
      }
    case 'SET_KERANJANG':
      return {
        keranjang: action.payload,
      }
    default:
      return state
  }
}

const initialState = {
  keranjang: null,
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  // Actions for changing state

  function addItemToList(item) {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    })
  }
  function removeItemFromList(item) {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: item,
    })
  }

  function setKeranjang(data) {
    dispatch({
      type: 'SET_KERANJANG',
      payload: data,
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        keranjang: state.keranjang,
        addItemToList,
        removeItemFromList,
        setKeranjang,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

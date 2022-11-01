import React, { useReducer } from 'react'
import A from './A'

interface CountContextType {
  countState: {
    count: number
  }
  countDispatch: (action: { type: string; value?: number }) => void
}

export const countContext = React.createContext({} as CountContextType)

const initialState = {
  count: 0,
}
const reducer = (
  currentState: {
    count: number
  },
  action: {
    type: string
    value?: number
  },
) => {
  switch (action.type) {
    case 'increment':
      return {
        count: currentState.count + 1,
      }
    case 'decrement':
      return {
        count: currentState.count - 1,
      }
    case 'incrementValue':
      return {
        count: currentState.count + action.value!,
      }
    case 'decrementValue':
      return {
        count: currentState.count - action.value!,
      }
    case 'reset':
      return initialState
    default:
      return currentState
  }
}

export default function UseRC() {
  const [countState, dispath] = useReducer(reducer, initialState)
  return (
    <countContext.Provider value={{ countState, countDispatch: dispath }}>
      {countState.count}
      <hr />
      <A />
    </countContext.Provider>
  )
}

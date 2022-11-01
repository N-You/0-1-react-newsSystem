import React, { useContext } from 'react'
import B from './B'
import { countContext } from './useRC'

export default function A() {
  const CountContext = useContext(countContext)
  return (
    <div style={{ backgroundColor: 'skyblue' }}>
      {CountContext.countState.count}
      <button
        onClick={() => {
          CountContext.countDispatch({ type: 'increment' })
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          CountContext.countDispatch({ type: 'decrement' })
        }}
      >
        -1
      </button>
      <B />
    </div>
  )
}

import React, { useContext } from 'react'
import C from './C'
import { countContext } from './useRC'

export default function B() {
  const CountContext = useContext(countContext)
  return (
    <div style={{ backgroundColor: 'yellow' }}>
      <button
        onClick={() => {
          CountContext.countDispatch({ type: 'incrementValue', value: 5 })
        }}
      >
        +n
      </button>
      <button
        onClick={() => {
          CountContext.countDispatch({ type: 'decrementValue', value: 2 })
        }}
      >
        -n
      </button>
      <C />
    </div>
  )
}

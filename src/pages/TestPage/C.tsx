import React, { useContext } from 'react'
import { countContext } from './useRC'

export default function C() {
  const CountContext = useContext(countContext)
  return (
    <div style={{ backgroundColor: 'red' }}>
      <button
        onClick={() => {
          CountContext.countDispatch({ type: 'reset' })
        }}
      >
        reset
      </button>
    </div>
  )
}

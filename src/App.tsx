import React, { useEffect } from 'react'
import './App.sass'
import Child from './Child'
function App() {
  useEffect(() => {}, [])

  return (
    <div className='box'>
      123
      <ul>
        <li>11111</li>
        <li>22222</li>
        <li>33333</li>
      </ul>
      <Child />
    </div>
  )
}

export default App

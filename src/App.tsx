import React, { useEffect } from 'react'
import './App.sass'
import axios from 'axios'
import Child from './Child'

function App() {
  useEffect(() => {
    axios
      .get('https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E9%83%BD%E6%B1%9F%E5%A0%B0&ci=576&channelId=4')
      .then((res) => {
        console.log(res.data)
      })
  }, [])

  return (
    <div className='box'>
      123
      <ul>
        <li>11111</li>
        <li>22222</li>0<li>33333</li>
      </ul>
      <Child />
    </div>
  )
}

export default App

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'

// const Root = document.getElementById("root")
// Root.textContent = "Hello world"
let arr = Array.from([1,2,3,4])
console.log(arr);

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)
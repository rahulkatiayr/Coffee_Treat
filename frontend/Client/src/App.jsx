import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CoffeeForme from './CoffeeForm'
import { BrowserRouter, Routes, Route ,Router } from "react-router-dom";

import Successfull from './successfull';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <BrowserRouter>
      <Routes>

       <Route path='/' element={<CoffeeForme/>}/>
      <Route path='/success' element={<Successfull/>}/>

     </Routes>
      
      </BrowserRouter>
      

    </>
  )
}

export default App

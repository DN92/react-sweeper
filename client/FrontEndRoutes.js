import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './components/Home'

const FrontEndRoutes = () => {
  return (
    <div className='main-container'>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    </div>
  )
}

export default FrontEndRoutes

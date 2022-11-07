import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Search from './components/Search'
import Register from './components/Register'
import Login from './components/Login'

const Paths = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route
          exact
          path='/'
          element={<Home />}
          />
          <Route
          exact
          path='/search'
          element={<Search />}
          />
          <Route
          exact
          path='/login'
          element={<Login />}
          />
          <Route
          exact
          path='/register'
          element={<Register />}
          />
        </Routes>
      </>
    </Router>
  )
}

export default Paths
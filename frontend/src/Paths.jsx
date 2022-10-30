import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Search from './components/Search'

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
        </Routes>
      </>
    </Router>
  )
}

export default Paths
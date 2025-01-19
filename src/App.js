import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import CommonRoutes from './routes/commonRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
const App = () => {
  return (
    <BrowserRouter>
      <CommonRoutes />
    </BrowserRouter>
  )
}

export default App
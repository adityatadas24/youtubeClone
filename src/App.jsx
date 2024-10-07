import React from 'react'
import Dashboard from './Pages/Dashboard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Dashboard/>
    </div>
  )
}

export default App


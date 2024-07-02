import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Component/Navbar/Navbar'

function App() {


  return (
    <>
    <Navbar/>
    <Outlet></Outlet>
      <h2>Hello World</h2>
      <button>
        <a href='/login'>Login</a>
      </button>
      <button>
        <a href='/signup'>Signup</a>
      </button>
    </>
  )
}

export default App

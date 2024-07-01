import { Outlet } from 'react-router-dom'
import './App.css'

function App() {


  return (
    <>
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

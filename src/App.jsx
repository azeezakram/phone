import { Link, Outlet } from 'react-router-dom'
import './App.css'
import AddContact from './pages/CreateContact'
import Navbar from './components/Navbar'



function App() {

  return (
    <>
      <Navbar/>
      <Navbar></Navbar>
      <h1>Hello world</h1>
      <Outlet/>

    </>
  )
}

export default App

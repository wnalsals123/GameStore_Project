import './App.css';
import Header from '../header/Header';
import SideBar from '../side/SideBar';
import GameFlex from './content/GameFlex';
import GameList from '../json/GameList.json'
import { useEffect, useState } from "react"
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation()
  const [cart, setCart] = useState(0)
  const [sideIsOpen, setSideIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(()=>{
    localStorage.setItem("GameList", JSON.stringify(GameList))
  }, [])

  useEffect(()=>{
    location.pathname === '/' && (document.body.style.overflow = 'auto')
  }, [location])
  
  return (
    <div className='relactive'>
      <div className='sticky top-0 z-40 w-full shadow-xl shadow-neutral-900'>
        <Header cart={cart} sideIsOpen={sideIsOpen} setSideIsOpen={setSideIsOpen} isLogin={isLogin}></Header>
        <SideBar sideIsOpen={sideIsOpen} isLogin={isLogin} setIsLogin={setIsLogin}></SideBar>
      </div>
      <GameFlex cart={cart} setCart={setCart}></GameFlex>
      <Outlet context={{cart, setCart, setIsLogin}}></Outlet>
    </div>
  );
}

export default App;
import './App.css';
import Header from './header/Header';
import SideBar from './side/SideBar';
import GameFlex from './main/GameFlex';
import PopDown from './modal/PopDown';
import GameList from './json/GameList.json'
import { useEffect, useState } from "react"
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation()
  const [cart, setCart] = useState(0)
  const [sideIsOpen, setSideIsOpen] = useState(false)
  const [isAddCart, setIsAddCart] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [category, setCategory] = useState('home')

  useEffect(() => {
    const isUserCart = localStorage.getItem("UserCart") !== null

    localStorage.setItem("GameList", JSON.stringify(GameList))
    if (isUserCart) setCart(JSON.parse(localStorage.getItem("UserCart")).length)
  }, [])

  useEffect(() => {
    location.pathname === '/' && (document.body.style.overflow = 'auto')
  }, [location])

  return (
    <div className='relactive'>
      <div className='sticky top-0 z-40 w-full shadow-xl shadow-neutral-900'>
        <Header cart={cart} sideIsOpen={sideIsOpen} setSideIsOpen={setSideIsOpen} isLogin={isLogin} setCategory={setCategory}></Header>
        <SideBar sideIsOpen={sideIsOpen} isLogin={isLogin} setIsLogin={setIsLogin} setCategory={setCategory}></SideBar>
      </div>
      <GameFlex setCart={setCart} setIsAddCart={setIsAddCart} category={category}></GameFlex>
      <Outlet context={{ setCart, setIsLogin, setIsAddCart }}></Outlet>
      <PopDown isAddCart={isAddCart} setIsAddCart={setIsAddCart}></PopDown>
    </div>
  );
}

export default App;
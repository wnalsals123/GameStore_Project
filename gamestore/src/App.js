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
  const version = '1.3'
  const [cart, setCart] = useState(0)
  const [sideIsOpen, setSideIsOpen] = useState(false)
  const [isAddCart, setIsAddCart] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [category, setCategory] = useState('home')
  const [loading, setLoading] = useState('block')

  useEffect(() => {
    const getVersion = localStorage.getItem('version')
    let isError = false

    if(getVersion === null || getVersion !== version) {
      localStorage.removeItem('version')
      localStorage.removeItem('GameList')
      localStorage.removeItem('UserCart')
      isError = true
    }

    localStorage.setItem('version', version)
    localStorage.setItem("GameList", JSON.stringify(GameList))
    
    const isUserCart = localStorage.getItem("UserCart") !== null

    if(isUserCart) setCart(JSON.parse(localStorage.getItem("UserCart")).length)
    if(isError) alert('데이터 오류로 페이지를 초기화했습니다.')
  }, [])

  useEffect(() => {
    location.pathname === '/' && (document.body.style.overflow = 'auto')
  }, [location])

  return (
    <div className='relactive'>
      <div className='sticky top-0 z-40 w-full shadow-xl shadow-neutral-900'>
        <Header cart={cart} sideIsOpen={sideIsOpen} setSideIsOpen={setSideIsOpen} isLogin={isLogin} category={category} setCategory={setCategory} setLoading={setLoading}></Header>
        <SideBar sideIsOpen={sideIsOpen} isLogin={isLogin} setIsLogin={setIsLogin}></SideBar>
      </div>
      <GameFlex setCart={setCart} setIsAddCart={setIsAddCart} category={category} setCategory={setCategory} loading={loading} setLoading={setLoading}></GameFlex>
      <Outlet context={{ setCart, setIsLogin, setIsAddCart }}></Outlet>
      <PopDown isAddCart={isAddCart} setIsAddCart={setIsAddCart}></PopDown>
    </div>
  );
}

export default App;
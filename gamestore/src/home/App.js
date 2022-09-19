import Header from './header/Header';
import SideBar from './side/SideBar';
import GameFlex from './main/GameFlex';
import PopDown from '../function/PopDown'
import GameList from '../json/GameList.json'
import UserData from '../json/UserData.json'
import { useEffect, useState } from "react"
import { Outlet, useLocation } from 'react-router-dom';
import { getCookie } from '../function/Cookie';

function App() {
  const location = useLocation()
  const version = '2.4'
  const [cart, setCart] = useState(0)
  const [sideIsOpen, setSideIsOpen] = useState(false)
  const [isAddCart, setIsAddCart] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [category, setCategory] = useState('home')
  const [loading, setLoading] = useState('block')

  useEffect(() => {
    // 데이터 유효성 검사
    const getVersion = localStorage.getItem('version')
    if(getVersion !== null && getVersion !== version) {
      localStorage.clear()
      alert('데이터 오류로 초기화합니다!')
    }
    if(getVersion === null) {
      localStorage.setItem('version', version)
      localStorage.setItem("GameList", JSON.stringify(GameList))
      localStorage.setItem("UserData", JSON.stringify(UserData))
    }

    // 로그인 쿠키 확인
    const loginSession = !!getCookie("LoginSession")
    if(loginSession) setIsLogin(true)
    
    // 장바구니 확인
    const isUserCart = localStorage.getItem("UserCart") !== null
    if(isUserCart) setCart(JSON.parse(localStorage.getItem("UserCart")).length)
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
      <GameFlex setCart={setCart} setIsAddCart={setIsAddCart} isLogin={isLogin} setIsLogin={setIsLogin} category={category} setCategory={setCategory} loading={loading} setLoading={setLoading} GameList={GameList}></GameFlex>
      <Outlet context={{ setCart, setIsAddCart, isLogin, setIsLogin }}></Outlet>
      <PopDown isAddCart={isAddCart} setIsAddCart={setIsAddCart}></PopDown>
    </div>
  );
}

export default App;
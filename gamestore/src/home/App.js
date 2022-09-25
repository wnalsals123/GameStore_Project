import Header from './header/Header';
import SideBar from './side/SideBar';
import GameFlex from './main/GameFlex';
import PopDown from '../function/PopDown'
import GameList from '../json/GameList.json'
import UserData from '../json/UserData.json'
import { useEffect, useState } from "react"
import { Outlet, useLocation } from 'react-router-dom';
import { getCookie, removeCookie } from '../function/Cookie';

function App() {
  const location = useLocation()
  const version = '1.0'
  const [gameData, setGameData] = useState(GameList)
  const [cart, setCart] = useState(0)
  const [sideIsOpen, setSideIsOpen] = useState(false)
  const [isAddCart, setIsAddCart] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [category, setCategory] = useState('home')
  const [loading, setLoading] = useState('block')

  /* 사이트 연결 설정 */
  useEffect(() => {
    // 버전 불러오기
    const getVersion = localStorage.getItem('version')

    // 캐시 초기화
    const cacheReset = () => {
      localStorage.clear()
      sessionStorage.clear()
      removeCookie('LoginSession')
    }

    // 브라우저 첫 페이지 확인
    sessionStorage.setItem('FirstPage', true)

    // 첫 접속 시 데이터 설정
    if (getVersion === null) {
      cacheReset()
      localStorage.setItem('version', version)
      localStorage.setItem("GameList", JSON.stringify(GameList))
      localStorage.setItem("UserData", JSON.stringify(UserData))
      return
    }

    // 버전 다를 시 데이터 초기화
    if (getVersion !== version) {
      alert('데이터 오류로 초기화합니다!')
      cacheReset()
      localStorage.clear()
      localStorage.setItem('version', version)
      localStorage.setItem("GameList", JSON.stringify(GameList))
      localStorage.setItem("UserData", JSON.stringify(UserData))
      setGameData(GameList)
      return
    }

    // 게임 데이터 불러오기
    const gameList = JSON.parse(localStorage.getItem("GameList"))
    setGameData(gameList)

    // 로그인 쿠키 확인
    const loginSession = !!getCookie("LoginSession")
    if (loginSession) setIsLogin(true)

    // 장바구니 확인
    const isUserCart = localStorage.getItem("UserCart") !== null
    if (isUserCart) setCart(JSON.parse(localStorage.getItem("UserCart")).length)
  }, [])

  /* 스크롤바 초기화 */
  useEffect(() => {
    location.pathname === '/' && (document.body.style.overflow = 'auto')
  }, [location])

  return (
    <div className='relactive'>
      <div className='sticky top-0 z-40 w-full shadow-xl shadow-neutral-900'>
        <Header cart={cart} sideIsOpen={sideIsOpen} setSideIsOpen={setSideIsOpen} isLogin={isLogin} category={category} setCategory={setCategory} setLoading={setLoading}></Header>
        <SideBar sideIsOpen={sideIsOpen} isLogin={isLogin} setIsLogin={setIsLogin}></SideBar>
      </div>
      <GameFlex setCart={setCart} setIsAddCart={setIsAddCart} isLogin={isLogin} setIsLogin={setIsLogin} category={category} setCategory={setCategory} loading={loading} setLoading={setLoading} gameData={gameData}></GameFlex>
      <Outlet context={{ setCart, setIsAddCart, isLogin, setIsLogin }}></Outlet>
      <PopDown isAddCart={isAddCart} setIsAddCart={setIsAddCart}></PopDown>
    </div>
  );
}

export default App;
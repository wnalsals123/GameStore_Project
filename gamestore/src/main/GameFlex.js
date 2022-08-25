import SideBarContent from '../side/SideBarContent'
import Banner from './Banner'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GameFlex = (props) => {
  const { setCart, setIsAddCart, category } = props
  const [gameData, setGameData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    setGameData(JSON.parse(localStorage.getItem("GameList")))
  }, [category])

  const addCart = (selectedItem) => {
    const isUserCart = localStorage.getItem("UserCart") !== null

    if (isUserCart) {
      const userCart = JSON.parse(localStorage.getItem("UserCart"))
      const alreadyCart = userCart.filter((item) => (item.게임명 === selectedItem.게임명)).length > 0

      if (alreadyCart) {
        alert("이미 장바구니에 있습니다!")
        return
      }

      const temp = userCart.concat(selectedItem)

      localStorage.setItem("UserCart", JSON.stringify(temp))
      setCart(temp.length)
      setIsAddCart(true)
    } else {
      const temp = []
      localStorage.setItem("UserCart", JSON.stringify(temp.concat(selectedItem)))

      setCart(1)
      setIsAddCart(true)
    }
  }

  const toDetail = (item) => {
    document.body.style.overflow = 'hidden'
    navigate(`/games/${item.게임명}`);
  }

  const GameFlexBox = () => {
    const filterGameData = category === 'home' ? gameData : category === 'sales' ? gameData.filter((item) => (item.할인 !== false)) : category === 'new' ? gameData.filter((item) => (item.신작 === true)) : gameData

    return (
      filterGameData.map((item) => (
        <div key={item.게임명} className='group relative inline-block leading-snug w-[calc(50%-1.5rem)] h-60 mx-3 my-5 p-0 sm:h-80 lg:mx-6 lg:my-8 lg:w-[calc(33.3%-3rem)] xl:w-[calc(25%-3rem)] cursor-pointer 2xl:h-96' tabIndex={0}>
          <div className='relative w-full h-full'>
            <img className='object-cover w-full h-full border-2 shadow-md border-neutral-100 rounded-xl shadow-neutral-100' src={item.이미지} alt='game-logo'></img>
            <span className='absolute px-2 rounded-md bottom-2 left-2 bg-neutral-500 bg-opacity-70'>{item.게임명}</span>
            <div className='absolute top-2 left-2'>
              {item.가격 === 0 && <span className='block px-2 bg-red-500 rounded-md bg-opacity-70'>무료 플레이</span>}
              {item.할인 !== false && <span className='block px-2 rounded-md bg-sky-500 bg-opacity-70 sm:hidden'>{((item.할인) * 100).toFixed() + "%↓"}</span>}
              {item.신작 && <span className='block px-2 rounded-md bg-violet-500 bg-opacity-70 sm:hidden'>NEW</span>}
              <span className='block px-2 bg-red-500 rounded-md bg-opacity-70' style={{ textDecoration: item.할인 !== false && "line-through", display: item.가격 === 0 && "none" }}>{(item.가격).toLocaleString() + "원"}</span>
              {item.할인 !== false && <span className='block px-2 bg-red-500 rounded-md bg-opacity-70'>{(item.가격 * (1 - item.할인)).toLocaleString() + "원"}</span>}
            </div>
            <div className='absolute hidden sm:block top-2 right-2'>
              {item.할인 !== false && <span className='block px-2 rounded-md bg-sky-500 bg-opacity-70'>{((item.할인) * 100).toFixed() + "%↓"}</span>}
              {item.신작 && <span className='block px-2 rounded-md bg-violet-500 bg-opacity-70'>NEW</span>}
            </div>
          </div>
          <div className='absolute top-0 left-0 flex-col items-center justify-center hidden w-full h-full group-focus:flex rounded-xl bg-neutral-100 bg-opacity-70'>
            <button className='px-5 py-2 mb-10 bg-sky-500 rounded-xl' onMouseDown={() => { toDetail(item) }}>상세보기</button>
            <button className='px-5 py-2 bg-sky-500 rounded-xl' onMouseDown={() => { addCart(item) }}>장바구니</button>
          </div>
        </div>
      ))
    )
  }

  return (
    <div className='flex justify-center'>
      <div className='hidden fixed z-20 left-[calc(50%-58rem)] border-r-[1px] border-neutral-500 3xl:block'>
        <SideBarContent></SideBarContent>
      </div>
      <div className='w-full text-white max-w-screen-2xl 3xl:ml-80'>
        <Banner></Banner>
        <div className='mx-3 mt-5 text-2xl sm:text-3xl lg:mx-6'>
          {category === 'home' && <span>상점 홈</span>}
          {category === 'sales' && <span>#특별 할인</span>}
          {category === 'new' && <span>#신작</span>}
        </div>
        <div className='relative z-10 flex flex-wrap text-sm text-center sm:text-base lg:text-lg'>
          <GameFlexBox></GameFlexBox>
        </div>
      </div>
    </div>
  )
}

export default React.memo(GameFlex);
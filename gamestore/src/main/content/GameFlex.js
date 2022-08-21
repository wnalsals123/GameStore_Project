import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GameFlex = (props) => {
  const { setCart } = props
  const [gameData, setGameData] = useState([])
  const [userCart, setUserCart] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const isUserCart = JSON.parse(localStorage.getItem("UserCart")) !== null

    setGameData(JSON.parse(localStorage.getItem("GameList")))
    if(isUserCart) setUserCart(JSON.parse(localStorage.getItem("UserCart")))
  }, [])

  const gameClickEvent = (name, mode) => {
    const id = 'gl-' + name
    const elemet = document.getElementById(id)
    
    mode && elemet.style.display !== 'flex' ? elemet.style.display = 'flex' : elemet.style.display = 'none'
  }

  const toDetail = (item) => {
    document.body.style.overflow = 'hidden'
    navigate(`/games/${item.게임명}`);
  }

  const addCart = (item) => {
    const temp = userCart.concat(item)

    setCart(temp.length)
    setUserCart(temp)
    localStorage.setItem("UserCart", JSON.stringify(temp))
  }

  const GameFlexBox = () => {
    return (
      gameData.map((item) => (
        <div key={item.게임명} className='relative inline-block leading-snug w-[calc(50%-1.5rem)] h-60 mx-3 my-5 p-0 sm:h-80 lg:mx-6 lg:my-8 lg:w-[calc(33.3%-3rem)] xl:w-[calc(25%-3rem)] 2xl:h-96' tabIndex={0} onClick={() => { gameClickEvent(item.게임명, true) }} onBlur={() => { gameClickEvent(item.게임명, false) }}>
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
          <div className='absolute top-0 left-0 flex-col items-center justify-center hidden w-full h-full rounded-xl bg-neutral-100 bg-opacity-70' id={'gl-' + item.게임명}>
            <button className='px-5 py-2 mb-10 bg-sky-500 rounded-xl' onMouseDown={() => { toDetail(item) }}>상세보기</button>
            <button className='px-5 py-2 bg-sky-500 rounded-xl' onMouseDown={() => { addCart(item) }}>장바구니</button>
          </div>
        </div>
      ))
    )
  }

  return (
    <div className='relative flex flex-wrap mx-auto text-sm text-center text-white max-w-screen-2xl sm:text-base lg:text-lg'>
      <GameFlexBox></GameFlexBox>
    </div>
  )
}

export default GameFlex;
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GameList from '../json/GameList.json'

const GameFlex = (props) => {
  const { cart, setCart } = props
  const [gameData, setGameData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    setGameData(GameList)
  }, [])

  const gameClickEvent = (name, mode) => {
    const id = 'gl-' + name
    const elemet = document.getElementById(id)
    mode && elemet.style.display !== 'flex' ? elemet.style.display = 'flex' : elemet.style.display = 'none'
  }

  const toDetail = (gameid) => {
    document.body.style.overflow = 'hidden'
    navigate("/games/" + gameid);
  }

  const gameFlexBox = () => {
    return (
      gameData.map((item) => (
        <div key={item.게임명} className='relative inline-block leading-snug w-[calc(50%-1.5rem)] h-60 mx-3 my-5 p-0 sm:h-80 lg:mx-6 lg:my-8 lg:w-[calc(33.3%-3rem)] xl:w-[calc(25%-3rem)] 2xl:h-96' tabIndex={0} onMouseDown={() => { gameClickEvent(item.게임명, true) }} onBlur={() => { gameClickEvent(item.게임명, false) }}>
          <div className='relative w-full h-full'>
            <img className='border-2 border-neutral-100 rounded-xl shadow-md shadow-neutral-100 object-cover w-full h-full' src={item.이미지} alt='game-logo'></img>
            <span className='absolute bottom-2 left-2 bg-neutral-500 bg-opacity-70 rounded-md px-2'>{item.게임명}</span>
            <div className='absolute top-2 left-2'>
              {item.가격 === 0 && <span className='block bg-red-500 bg-opacity-70 rounded-md px-2'>무료 플레이</span>}
              {item.할인 !== false && <span className='block bg-sky-500 bg-opacity-70 rounded-md px-2 sm:hidden'>{((item.할인) * 100).toFixed() + "% OFF"}</span>}
              {item.신작 && <span className='block bg-violet-500 bg-opacity-70 rounded-md px-2 sm:hidden'>NEW</span>}
              <span className='block bg-red-500 bg-opacity-70 rounded-md px-2' style={{ textDecoration: item.할인 !== false && "line-through", display: item.가격 === 0 && "none" }}>{(item.가격).toLocaleString() + "원"}</span>
              {item.할인 !== false && <span className='block bg-red-500 bg-opacity-70 rounded-md px-2'>{(item.가격 * (1 - item.할인)).toLocaleString() + "원"}</span>}
            </div>
            <div className='hidden sm:block absolute top-2 right-2'>
              {item.할인 !== false && <span className='block bg-sky-500 bg-opacity-70 rounded-md px-2'>{((item.할인) * 100).toFixed() + "% OFF"}</span>}
              {item.신작 && <span className='block bg-violet-500 bg-opacity-70 rounded-md px-2'>NEW</span>}
            </div>
          </div>
          <div className='hidden flex-col justify-center items-center absolute top-0 left-0 rounded-xl bg-neutral-100 bg-opacity-70 w-full h-full' id={'gl-' + item.게임명}>
            <button className='mb-10 px-5 py-2 bg-sky-500 rounded-xl' onMouseDown={() => { toDetail(item.게임명) }}>상세보기</button>
            <button className='px-5 py-2 bg-sky-500 rounded-xl' onMouseDown={() => { setCart(cart + 1) }}>장바구니</button>
          </div>
        </div>
      ))
    )
  }

  return (
    <div className='relative flex max-w-screen-2xl mx-auto flex-wrap text-white text-center text-sm sm:text-base lg:text-lg'>
      {gameFlexBox()}
    </div>
  )
}

export default GameFlex;
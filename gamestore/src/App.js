import './App.css';
import { useEffect, useState } from "react"
import GameList from "./JSON/GameList"

function App() {
  const [gl, setGl] = useState([])
  useEffect(() => {
    setGl(GameList)
  }, [])

  const GL = (props) => {
    let key = 0
    return (
      gl.map((item) => (
        <div key={key++} className='group relative inline-block leading-snug w-[calc(50%-1.5rem)] h-60 mx-3 my-5 p-0 sm:h-80 lg:mx-6 lg:my-8 lg:w-[calc(33.3%-3rem)] xl:w-[calc(25%-3rem)] 2xl:h-96'>
          <div className='relative w-full h-full'>
            <img className='border-2 border-neutral-300 rounded-xl shadow-md shadow-neutral-100 object-cover w-full h-full' src={item.이미지} alt='game-logo'></img>
            <span className='absolute bottom-2 left-2 bg-neutral-400 bg-opacity-80 rounded-md px-2'>{item.게임명}</span>
            <div className='absolute top-2 left-2'>
              {item.가격 === 0 && <span className='block bg-red-400 bg-opacity-80 rounded-md px-2'>무료 플레이</span>}
              {item.할인 !== false && <span className='block bg-sky-400 bg-opacity-80 rounded-md px-2 sm:hidden'>{((item.할인) * 100).toFixed() + "% OFF"}</span>}
              <span className='block bg-red-400 bg-opacity-80 rounded-md px-2' style={{ textDecoration: item.할인 !== false && "line-through", display: item.가격 === 0 && "none" }}>{(item.가격).toLocaleString() + "원"}</span>
              {item.할인 !== false && <span className='block bg-red-400 bg-opacity-80 rounded-md px-2'>{(item.가격 * (1 - item.할인)).toLocaleString() + "원"}</span>}
            </div>
            <div className='hidden sm:block absolute top-2 right-2'>
              {item.할인 !== false && <span className='block bg-sky-400 bg-opacity-80 rounded-md px-2'>{((item.할인) * 100).toFixed() + "% OFF"}</span>}
            </div>
          </div>
          <div className='hidden flex-col justify-center items-center absolute top-0 left-0 rounded-xl bg-neutral-300 bg-opacity-80 w-full h-full group-hover:flex'>
            <button className='mb-10 px-5 py-2 bg-sky-700 rounded-xl' onClick={()=>{props.setCart(props.cart + 1)}}>장바구니</button>
            <button className='px-5 py-2 bg-sky-700 rounded-xl'>상세보기</button>
          </div>
        </div>
      ))
    )
  }

  const [cart, setCart] = useState(0)

  return (
    <div>
      <div className="bg-neutral-300 px-5 py-2 md:py-4 md:mb-10">
        <nav className="relative max-w-screen-2xl mx-auto">
          <img className="w-11 inline-block md:w-12" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
          <span className="pl-5 text-2xl align-middle md:text-3xl">Game Store</span>
          <div className="hidden md:inline-block ml-10 ">
            <a className="ml-5 text-lg" href="#!sale">특별 할인</a>
            <a className="ml-5 text-lg" href="#!new">신작</a>
            <a className="ml-5 text-lg" href="#!community">커뮤니티</a>
          </div>
          <div className="absolute top-1 right-0">
            <a className="relative ml-6" href="#!cart">
              <img className="w-9 inline-block md:w-10" src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="cart"></img>
              {cart !== 0 && <span className='absolute -top-4 -right-1 bg-sky-700 text-white rounded-full px-1 text-sm leading-snug'>{cart}</span>}
            </a>
            <a className="ml-6" href="#!user"><img className="w-9 inline-block md:w-10" src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="user"></img></a>
          </div>
        </nav>
      </div>

      <div className='relative flex max-w-screen-2xl mx-auto flex-wrap text-white text-center text-sm sm:text-base lg:text-lg'>
        <GL cart={cart} setCart={setCart}></GL>
      </div>
    </div>
  );
}

export default App;
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const Cart = () => {
  const { setCart } = useOutletContext()
  const navigate = useNavigate()
  const [userCart, setUserCart] = useState([])

  useEffect(() => {
    const isUserCart = JSON.parse(localStorage.getItem("UserCart")) !== null

    if (isUserCart) setUserCart(JSON.parse(localStorage.getItem("UserCart")))
  }, [])

  const toBack = () => {
    document.body.style.overflow = 'auto'
    navigate(-1);
  }

  const deleteCart = (gameID) => {
    const temp = userCart.filter((item) => (item.gameID !== gameID))
    setCart(temp.length)
    setUserCart(temp)
    localStorage.setItem("UserCart", JSON.stringify(temp))
  }

  const CartList = () => {
    return (
      userCart.map((item, Index) => (
        <div key={Index} className="flex mb-5">
          <div className="w-[200px] h-[200px] basis-[200px] shrink-0"><img className="object-cover w-full h-full rounded-lg" src={item.이미지} alt="game-logo"></img></div>
          <span className='flex-1 px-2'>{item.게임명}</span>
          {item.가격 === 0 && <span className='flex-1 px-2'>무료 플레이</span>}
          <span className={`${item.가격 === 0 && "hidden"} flex-1 px-2 ${item.할인 !== false && 'line-through'}`}>{(item.가격).toLocaleString() + "원"}</span>
          {item.할인 !== false && <span className='flex-1 px-2'>{(item.가격 * (1 - item.할인)).toLocaleString() + "원"}</span>}
          <span className="flex-1 px-2">수량: 1</span>
          <button className="w-6 h-6 bg-no-repeat bg-cover sm:w-7 sm:h-7 bg-close-btn" onClick={()=>{deleteCart(item.gameID)}}></button>
        </div>
      ))
    )
  }

  return (
    <div className='fixed top-0 left-0 z-50 w-full h-full'>
      <div className='flex items-center justify-center w-full h-full bg-neutral-500 bg-opacity-70'>
        <div className='relative max-w-screen-lg max-h-[calc(100%-5rem)] w-[calc(100%-5rem)]  bg-neutral-900 rounded-xl overflow-y-auto scrollbar-hide'>

          <div className='relative w-full p-2 sm:p-5 text-md sm:text-2xl'>

            <div className="sticky top-0 flex justify-between p-5 mb-5 rounded-lg itmes-center bg-neutral-100">
              <span>장바구니</span>
              <button className="w-6 h-6 bg-no-repeat bg-cover sm:w-7 sm:h-7 bg-close-btn" onClick={toBack}></button>
            </div>

            <div className="min-h-[500px] p-5 mb-5 rounded-lg bg-neutral-500">
              <CartList></CartList>
            </div>

            <div className="sticky bottom-0 p-5 rounded-lg bg-neutral-100">
              <div>
                <span className="px-2">할인전총가격</span>
                <span className="px-2">할인후총가격</span>
                <span className="px-2">총수량</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;
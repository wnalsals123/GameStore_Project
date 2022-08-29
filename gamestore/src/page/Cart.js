import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const Cart = () => {
  const { setCart } = useOutletContext()
  const navigate = useNavigate()
  const [userCart, setUserCart] = useState([])

  useEffect(() => {
    const isUserCart = localStorage.getItem("UserCart") !== null

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
      userCart.map((item, index) => (
        <div key={index} className="flex justify-center p-2 mb-2 text-white border-2 rounded-lg sm:mb-5 bg-neutral-900 border-neutral-100">
          <div className="flex-grow basis-1/2 sm:basis-2/5 h-[10rem]"><img className="object-cover w-full h-full rounded-lg" src={item.이미지} alt="game-logo"></img></div>
          <div className="flex-grow ml-2 basis-1/2 sm:basis-3/5 sm:ml-5">
            <div className="flex flex-col justify-between h-full">

              <div className="flex justify-between">
                <span>{item.게임명}</span>
                <button onClick={() => { deleteCart(item.gameID) }}>&times;</button>
              </div>

              <div className="flex flex-col flex-wrap justify-between sm:flex-row">
                <div className="flex flex-col sm:flex-row">
                  <span className={`${item.가격 === 0 && "hidden"} ${item.할인 !== 0 && 'line-through'}`}>{(item.가격).toLocaleString() + "원"}</span>
                  {item.할인 !== 0 && <span>{(item.가격 * (1 - item.할인)).toLocaleString() + "원"}</span>}
                  {item.가격 === 0 && <span>무료 플레이</span>}
                </div>
                {item.할인 !== 0 && <span>{((item.할인) * 100).toFixed() + "%↓"}</span>}
              </div>

            </div>
          </div>
        </div>
      ))
    )
  }

  const getTotal = () => {
    let total = 0

    for(let i = 0; i < userCart.length; i++) {
      if(!userCart[i].할인) {
        total += userCart[i].가격
      } else {
        total += userCart[i].가격 * (1 - userCart[i].할인)
      }
    }

    return total.toLocaleString() + "원"
  }

  return (
    <div className='fixed top-0 left-0 z-40 w-full h-full'>
      <div className='flex items-center justify-center w-full h-full bg-neutral-500 bg-opacity-70'>
        <div className='relative max-w-screen-lg max-h-[calc(100%-5rem)] w-screen sm:w-[calc(100%-5rem)] bg-neutral-900 rounded-xl overflow-y-auto scrollbar-hide'>

          <div className='relative w-full h-full p-2 text-base sm:p-5 sm:text-xl md:text-2xl'>

            <div className="sticky top-0 flex justify-between p-2 mb-2 rounded-lg sm:p-5 sm:mb-5 itmes-center bg-neutral-100">
              <span>장바구니</span>
              <div className="flex items-center"><button className="w-5 h-5 bg-no-repeat bg-cover sm:w-7 sm:h-7 bg-close-btn" onClick={toBack}></button></div>
            </div>

            <div className="min-h-[31.25rem] mb-2 sm:mb-5">
              <CartList></CartList>
              <div className="text-center">
                {userCart.length === 0 && <span className="block w-full px-2 text-white rounded-lg bg-neutral-500">장바구니가 비었습니다!</span>}
              </div>
            </div>

            <div className="sticky bottom-0 p-2 bg-opacity-50 rounded-lg sm:p-5 bg-neutral-100">
              <div className="flex flex-wrap items-center justify-between">
                <span className="p-2 rounded-lg bg-neutral-100">{`총 결제금액: ${getTotal()}`}</span>
                <button className="p-2 text-white rounded-lg bg-sky-500">구매하기</button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;
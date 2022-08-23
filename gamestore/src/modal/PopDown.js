import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const PopDown = (props) => {
  const { isAddCart, setIsAddCart } = props
  const navigate = useNavigate()

  useEffect(() => {
    let timer = null

    timer = setTimeout(() => { setIsAddCart(false) }, 3000)

    return () => { clearTimeout(timer) }
  }, [isAddCart, setIsAddCart])

  const toCart = () => {
    document.body.style.overflow = 'hidden'
    navigate("/cart")
  }

  const CartView = () => {
    return (
      <div className="flex items-center justify-center pt-20">

        <div className="flex flex-wrap items-center justify-center p-2 text-xl border-2 rounded-md sm:text-2xl border-neutral-500 bg-neutral-100">
          <span className="rounded-lg bg-neutral-100">장바구니에 담았습니다</span>
          <div className="flex text-white bg-opacity-70">
            <button className="px-2 ml-2 rounded-md bg-sky-500" onClick={toCart}>보기</button>
          </div>
        </div>

      </div>
    )
  }

  return (
    <div className={`fixed top-0 left-0 w-full z-50 ${isAddCart ? 'animate-popDown' : 'animate-none'}`}>
      {isAddCart && <CartView></CartView>}
    </div>
  )
}

export default PopDown;
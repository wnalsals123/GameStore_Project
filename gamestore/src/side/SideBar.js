import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SideBar = (props) => {
  const { sideIsOpen } = props
  const [sideBarAni, setSideBarAni] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let timer = null

    if (sideIsOpen) {
      setSideBarAni(true)
    } else {
      timer = setTimeout(() => { setSideBarAni(false) }, 400)
    }

    return () => { clearTimeout(timer) }
  }, [sideIsOpen])

  const toLogin = () => {
    document.body.style.overflow = 'hidden'
    navigate("/login")
  }

  const toCart = () => {
    document.body.style.overflow = 'hidden'
    navigate("/cart")
  }

  const toMyPage = () => {
    document.body.style.overflow = 'hidden'
    navigate("/mypage")
  }

  return (
    <div className="relative">
      <div className={`absolute top-0 left-0 ${sideIsOpen ? 'animate-sideBarIn 4xl:animate-none' : 'animate-sideBarOut 4xl:animate-none'}`}>
        <div className={`${sideBarAni ? 'block' : 'hidden 4xl:block'} w-screen sm:w-80 h-screen bg-neutral-900 text-white shadow-xl shadow-sky-500`}>
          <ul className="flex flex-col text-3xl text-center">

            <li className="m-2 rounded-lg bg-neutral-500">
              <button onClick={() => { toLogin() }}>
                <div className="flex items-center p-2">
                  <div className="p-2 rounded-full bg-neutral-100"><img className="w-8" src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="user"></img></div>
                  <div >
                    <span className="block">로그인이 필요합니다</span>
                  </div>
                </div>
              </button>
            </li>

            <li className="m-2 rounded-lg bg-neutral-500">
              <button onClick={() => { toMyPage() }}>
                <div className="flex items-center p-2">
                  <div className="p-2 rounded-full bg-neutral-100"><img className="w-8" src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="user"></img></div>
                  <div >
                    <span className="block">user-name</span>
                    <span className="block">회원등급</span>
                    <span className="block">레벨</span>
                  </div>
                </div>
              </button>
            </li>

            <li className="m-2 rounded-lg bg-sky-500">
              <button onClick={() => { toCart() }}>
                <div className="flex items-center p-2">
                  <div className="p-2 rounded-full bg-neutral-100"><img className="w-8" src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="cart"></img></div>
                  <div >
                    <span className="block">장바구니</span>
                  </div>
                </div>
              </button>
            </li>

            <li>특별 할인</li>
            <li>신작</li>
            <li>커뮤니티</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar;
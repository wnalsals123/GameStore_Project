import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SideBar = (props) => {
  const { sideIsOpen, isLogin, setIsLogin } = props
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

  const toLogout = () => {
    const message = "정말로 로그아웃하시겠습니까?"

    if (window.confirm(message)) {
      setIsLogin(false)
    } else {
      console.log("취소")
    }
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
          <ul className="flex flex-col text-xl">

            <li className={`${isLogin ? 'hidden' : 'block'} m-5 mb-0 rounded-lg bg-neutral-500`}>
              <button className="w-full" onClick={() => { toLogin() }}>
                <div className="relative flex items-center justify-center p-2 sm:justify-start">
                  <div className="p-2 rounded-full sm:relative bg-neutral-100"><img className="w-7" src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="user"></img></div>
                  <span className="flex-1 block pl-2">로그인이 필요합니다</span>
                </div>
              </button>
            </li>

            <li className={`${isLogin ? 'block' : 'hidden'} m-5 mb-0 rounded-lg bg-neutral-500`}>
              <button className="w-full" onClick={() => { toMyPage() }}>
                <div className="flex items-center justify-center p-2">
                  <div className="p-2 rounded-full bg-neutral-100"><img className="w-7" src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="user"></img></div>
                  <span className="flex-1 block pl-2">user-name</span>
                </div>
                <span className="block">회원등급</span>
                <span className="block">레벨</span>
              </button>
            </li>

            <li className="m-5 mb-0 rounded-lg bg-sky-500">
              <button className="w-full" onClick={() => { toCart() }}>
                <div className="flex items-center justify-center p-2 sm:justify-start">
                  <div className="p-2 rounded-full bg-neutral-100"><img className="w-7" src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="cart"></img></div>
                  <span className="flex-1 block pl-2">장바구니</span>
                </div>
              </button>
            </li>

            <div className="m-5 mb-0">
              <li className="mb-2">특별 할인</li>
              <li className="mb-2">신작</li>
              <li className="mb-2">커뮤니티</li>
              <button className={`${isLogin ? 'block' : 'hidden'}`} onClick={toLogout}><li className="mb-2">로그아웃</li></button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar;
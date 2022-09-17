import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { removeCookie } from "../../function/Cookie"

const SideBarContent = (props) => {
  const { isLogin, setIsLogin } = props

  const [user, setUser] = useState({
    username: '',
    password: '',
    passwordOk: '',
    email: '',
    nickname: '',
    exp: 0,
    point: 0,
    구매: [],
    리뷰: [],
    쿠폰: [],
  })

  /* 유저 데이터 불러오기 */
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("UserData"))
    const loginInfo = localStorage.getItem("LoginInfo")
    let temp = null

    // 오류 시 로그인 세션 끊기
    if (userData !== null || loginInfo !== null) {
      temp = userData.filter(item => item.username === loginInfo)
    }
    else {
      alert("오류가 발생했습니다!\n페이지를 새로고침하세요!")
      removeCookie("LoginSession")
      return
    }

    // 성공 시 유저 데이터 상태 업데이트
    if(temp.length === 0) {
      setUser({
        username: '',
        password: '',
        passwordOk: '',
        email: '',
        nickname: '',
        exp: 0,
        point: 0,
        구매: [],
        리뷰: [],
        쿠폰: [],
      })
    }else{
      setUser(temp[0])  
    }
  }, [isLogin])

  const userGrade = (exp) => {
    if (exp < 1000) return "브론즈"
    else if (exp < 3000) return "실버"
    else if (exp < 6000) return "골드"
    else if (exp < 10000) return "플래티넘"
    else return "다이아"
  }

  const navigate = useNavigate()

  const toLogin = () => {
    document.body.style.overflow = 'hidden'
    navigate("/login")
  }

  const toSignUp = () => {
    document.body.style.overflow = 'hidden'
    navigate("/signup")
  }


  const toLogout = () => {
    const message = "정말로 로그아웃하시겠습니까?"

    if (window.confirm(message)) {
      localStorage.removeItem("LoginInfo")
      removeCookie("LoginSession")
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
    <div className={`w-screen sm:w-80 h-screen bg-neutral-900 text-white`}>
      <div className="flex flex-col p-5 text-xl 3xl:pl-0 3xl:pt-6">

        <div className={`${isLogin ? 'hidden' : 'block'} mb-5 rounded-lg bg-neutral-500`}>
          <button className="w-full" onClick={() => { toLogin() }}>
            <div className="relative flex items-center p-2">
              <div className="p-2 rounded-full sm:relative bg-neutral-100"><img className="w-7" src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="user"></img></div>
              <span className="flex-1 block pl-2">로그인</span>
            </div>
          </button>
        </div>

        <div className={`${isLogin ? 'block' : 'hidden'} mb-5 rounded-lg bg-neutral-500`}>
          <button className="w-full" onClick={() => { toMyPage() }}>
            <div className="flex items-center justify-center p-2">
              <div className="p-2 rounded-full bg-neutral-100"><img className="w-7" src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="user"></img></div>
              <div className="flex flex-col flex-grow">
                <span>{user.username}</span>
                <div className="flex flex-wrap justify-center">
                  <span>{`회원등급 | ${userGrade(user.exp)}`}</span>
                  <span>{`(${user.exp}exp)`}</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className={`${isLogin ? 'hidden' : 'block'} mb-5 rounded-lg bg-orange-500`}>
          <button className="w-full" onClick={() => { toSignUp() }}>
            <div className="relative flex items-center p-2">
              <div className="p-2 rounded-full sm:relative bg-neutral-100"><img className="w-7" src="https://cdn-icons-png.flaticon.com/512/684/684831.png" alt="user"></img></div>
              <span className="flex-1 block pl-2">회원가입</span>
            </div>
          </button>
        </div>

        <div className="mb-5 rounded-lg bg-sky-500">
          <button className="w-full" onClick={() => { toCart() }}>
            <div className="flex items-center p-2">
              <div className="p-2 rounded-full bg-neutral-100"><img className="w-7" src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="cart"></img></div>
              <span className="flex-1 block pl-2">장바구니</span>
            </div>
          </button>
        </div>

        <button className={`${isLogin ? 'block' : 'hidden'}`} onClick={toLogout}><li className="mb-2">로그아웃</li></button>
      </div>
    </div>
  )
}

export default SideBarContent;
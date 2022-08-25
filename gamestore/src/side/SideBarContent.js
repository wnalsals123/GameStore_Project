import { useNavigate } from "react-router-dom"

const SideBarContent = (props) => {
  const { isLogin, setIsLogin, setCategory } = props

  const navigate = useNavigate()

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

  const toCategory = (category) => {
    setCategory(category)
  }

  return (
    <div className={`w-screen sm:w-80 h-screen bg-neutral-900 text-white`}>
      <ul className="flex flex-col p-5 text-xl 3xl:pl-0 3xl:pt-6">

        <li className={`${isLogin ? 'hidden' : 'block'} mb-5 rounded-lg bg-neutral-500`}>
          <button className="w-full" onClick={() => { toLogin() }}>
            <div className="relative flex items-center justify-center p-2 sm:justify-start">
              <div className="p-2 rounded-full sm:relative bg-neutral-100"><img className="w-7" src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="user"></img></div>
              <span className="flex-1 block pl-2">로그인이 필요합니다</span>
            </div>
          </button>
        </li>

        <li className={`${isLogin ? 'block' : 'hidden'} mb-5 rounded-lg bg-neutral-500`}>
          <button className="w-full" onClick={() => { toMyPage() }}>
            <div className="flex items-center justify-center p-2">
              <div className="p-2 rounded-full bg-neutral-100"><img className="w-7" src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="user"></img></div>
              <span className="flex-1 block pl-2">user-name</span>
            </div>
            <span className="block">회원등급</span>
            <span className="block">레벨</span>
          </button>
        </li>

        <li className="mb-5 rounded-lg bg-sky-500">
          <button className="w-full" onClick={() => { toCart() }}>
            <div className="flex items-center justify-center p-2 sm:justify-start">
              <div className="p-2 rounded-full bg-neutral-100"><img className="w-7" src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="cart"></img></div>
              <span className="flex-1 block pl-2">장바구니</span>
            </div>
          </button>
        </li>

        <div className="mb-5 md:hidden">
          <button className="block mb-2" onClick={() => { toCategory('home') }}>홈</button>
          <button className="block mb-2" onClick={() => { toCategory('sales') }}>특별 할인</button>
          <button className="block mb-2" onClick={() => { toCategory('new') }}>신작</button>
          <a className="block" href="/community">커뮤니티</a>
        </div>

        <div className='p-2 rounded-lg bg-neutral-500'>
          <span>필터</span>
          <ul>
            <li>항목명</li>
            <li>항목명</li>
            <li>항목명</li>
            <li>항목명</li>
            <li>항목명</li>
            <li>항목명</li>
            <li>항목명</li>
            <li>항목명</li>
            <li>항목명</li>
            <li>항목명</li>
          </ul>
        </div>

        <button className={`${isLogin ? 'block' : 'hidden'}`} onClick={toLogout}><li className="mb-2">로그아웃</li></button>
      </ul>
    </div>
  )
}

export default SideBarContent;
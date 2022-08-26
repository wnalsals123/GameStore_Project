import { useNavigate } from "react-router-dom"

const SideBarContent = (props) => {
  const { isLogin, setIsLogin, category, setCategory, setLoading } = props

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

  const toCategory = (currentCategory) => {
    if(category === currentCategory) return

    setCategory(currentCategory)
    setLoading('block')
  }

  const buttonFilter = 'flex items-center border-2 rounded-md mb-1 bg-neutral-500 px-2'
  const checkboxFilter = 'mr-2 rounded-sm'

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

        <div className='p-2 rounded-lg bg-neutral-100'>
          <span className="block px-2 mb-2 rounded-md bg-sky-500">장르</span>
          <div className="flex flex-col flex-wrap">
            <button className={buttonFilter}><input className={checkboxFilter} type='checkbox' id="오픈월드"></input><span>오픈월드</span></button>
            <button className={buttonFilter}><input className={checkboxFilter} type='checkbox' id="멀티플레이"></input><span>멀티플레이</span></button>
            <button className={buttonFilter}><input className={checkboxFilter} type='checkbox' id="협동"></input><span>협동</span></button>
            <button className={buttonFilter}><input className={checkboxFilter} type='checkbox' id="액션"></input><span>액션</span></button>
            <button className={buttonFilter}><input className={checkboxFilter} type='checkbox' id="공포"></input><span>공포</span></button>
            <button className={buttonFilter}><input className={checkboxFilter} type='checkbox' id="좀비"></input><span>좀비</span></button>
            <button className={buttonFilter}><input className={checkboxFilter} type='checkbox' id="어드벤처"></input><span>어드벤처</span></button>
            <button className={buttonFilter}><input className={checkboxFilter} type='checkbox' id="스포츠"></input><span>스포츠</span></button>
            <button className={buttonFilter}><input className={checkboxFilter} type='checkbox' id="MMORPG"></input><span>MMORPG</span></button>
            <button className={buttonFilter}><input className={checkboxFilter} type='checkbox' id="FPS"></input><span>FPS</span></button>
          </div>
        </div>

        <button className={`${isLogin ? 'block' : 'hidden'}`} onClick={toLogout}><li className="mb-2">로그아웃</li></button>
      </ul>
    </div>
  )
}

export default SideBarContent;
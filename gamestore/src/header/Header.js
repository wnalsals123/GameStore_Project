import { useNavigate } from "react-router-dom";

function Header(props) {
  const { cart, sideIsOpen, setSideIsOpen, isLogin, category, setCategory, setLoading } = props
  const navigate = useNavigate()

  const toCart = () => {
    document.body.style.overflow = 'hidden'
    navigate("/cart")
  }

  const toMyPage = () => {
    document.body.style.overflow = 'hidden'
    isLogin ? navigate("/mypage") : navigate("/login")
  }

  const toCategory = (currentCategory) => {
    if(category === currentCategory) return

    setCategory(currentCategory)
    setLoading('block')
  }

  return (
    <div className="px-2 py-2 bg-neutral-100 md:px-5 md:py-4">

      <div className="relative mx-auto max-w-screen-2xl 3xl:max-w-[116rem]">

        <button className="absolute inline-block mr-5 align-middle bg-no-repeat bg-cover 3xl:hidden top-2 left-2 2xl:left-0 w-7 md:w-8 h-7 md:h-8 bg-menu-btn" onClick={()=>{setSideIsOpen(!sideIsOpen)}}></button>

        <div className="inline-block w-full ml-0 text-center sm:w-fit sm:text-left sm:ml-16 3xl:ml-0">
          <a className='inline-flex items-center align-middle' href='/'>
            <img className="block w-11 md:w-12" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
            <span className="block pl-4 !leading-none text-2xl md:text-3xl">Game Store</span>
          </a>
        </div>

        <nav className="hidden ml-10 text-xl align-middle md:inline-block">
          <button className="ml-0" onClick={() => {toCategory('home')}}>홈</button>
          <button className="ml-5" onClick={() => {toCategory('sales')}}>특별 할인</button>
          <button className="ml-5" onClick={() => {toCategory('new')}}>신작</button>
          <a className="ml-5" href="/community">커뮤니티</a>
        </nav>

        <div className="absolute right-0 hidden sm:block top-1">
          <button className="relative ml-6" onClick={() => { toCart() }}>
            <img className="inline-block w-9 md:w-10" src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="cart"></img>
            {cart !== 0 && <span className='absolute h-4 px-1 text-sm leading-none text-white rounded-full -top-2 -right-1 bg-sky-500'>{cart}</span>}
          </button>
          <button className="ml-6" onClick={() => { toMyPage() }}>
            <img className="inline-block w-9 md:w-10" src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="user"></img>
          </button>
        </div>

      </div>

    </div>
  );
}

export default Header;
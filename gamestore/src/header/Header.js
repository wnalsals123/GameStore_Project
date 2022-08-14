import { useEffect, useState } from "react";

function Header(props) {
  const { cart } = props
  const [isOpen, setIsOpen] = useState(false)
  const [sideBarAni, setSideBarAni] = useState(false)

  useEffect(() => {
    let timer = null

    if (isOpen) {
      setSideBarAni(true)
    } else {
      timer = setTimeout(() => {setSideBarAni(false)}, 400)
    }

    return () => {clearTimeout(timer)}
  }, [isOpen])

  const SideBar = () => {
    return (
      <div className={`absolute top-full left-0 ${isOpen ? 'animate-sideBarIn 4xl:animate-none' : 'animate-sideBarOut 4xl:animate-none'}`}>
        <div className={`${sideBarAni ? 'block' : 'hidden 4xl:block'} w-screen sm:w-80 h-screen bg-neutral-900 text-white shadow-xl shadow-sky-500`}>
          <ul className="flex flex-col text-3xl text-center">
            <li>내정보</li>
            <li>장바구니</li>
            <li>특별 할인</li>
            <li>신작</li>
            <li>커뮤니티</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className='sticky top-0 w-full z-40 shadow-xl shadow-neutral-900'>
      <div className="bg-neutral-100 px-2 md:px-5 py-2 md:py-4">

        <nav className="relative max-w-screen-2xl mx-auto">
          <button className="inline-block 4xl:hidden align-middle absolute top-2 left-2 2xl:left-0 w-7 md:w-8 h-7 md:h-8 mr-5 bg-menu-btn bg-cover bg-no-repeat" onClick={() => { setIsOpen(!isOpen) }}></button>

          <div className="inline-block w-full sm:w-fit text-center sm:text-left ml-0 sm:ml-16 4xl:ml-0">
            <a className='inline-flex align-middle items-center' href='/'>
              <img className="block w-11 md:w-12" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
              <span className="block pl-4 !leading-none text-2xl md:text-3xl">Game Store</span>
            </a>
          </div>

          <div className="hidden md:inline-block ml-10 text-xl align-middle">
            <a className="ml-5" href="#!sale">특별 할인</a>
            <a className="ml-5" href="#!new">신작</a>
            <a className="ml-5" href="#!community">커뮤니티</a>
          </div>

          <div className="hidden sm:block absolute top-1 right-0">
            <a className="relative ml-6" href="#!cart">
              <img className="w-9 inline-block md:w-10" src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="cart"></img>
              {cart !== 0 && <span className='absolute h-4 -top-2 -right-1 px-1 bg-sky-500 rounded-full text-sm text-white leading-none'>{cart}</span>}
            </a>
            <a className="ml-6" href="#!user"><img className="w-9 inline-block md:w-10" src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="user"></img></a>
          </div>

        </nav>

        <SideBar></SideBar>
      </div>
    </div>
  );
}

export default Header;
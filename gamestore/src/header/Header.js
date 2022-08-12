function Header(props) {
  const { cart } = props

  return (
    <div className='sticky top-0 w-full z-40'>
      <div className="bg-neutral-100 px-5 py-2 md:py-4">
        <nav className="relative max-w-screen-2xl mx-auto">
          <a className='inline-flex align-middle items-center' href='/'>
            <img className="inline-block w-11 md:w-12" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
            <span className="inline-block h-9 pl-4 text-2xl md:text-3xl md:h-10">Game Store</span>
          </a>
          <div className="hidden md:inline-block ml-10 text-xl align-middle">
            <a className="ml-5" href="#!sale">특별 할인</a>
            <a className="ml-5" href="#!new">신작</a>
            <a className="ml-5" href="#!community">커뮤니티</a>
          </div>
          <div className="absolute top-1 right-0">
            <a className="relative ml-6" href="#!cart">
              <img className="w-9 inline-block md:w-10" src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="cart"></img>
              {cart !== 0 && <span className='absolute h-4 -top-2 -right-1 px-1 bg-sky-500 rounded-full text-sm text-white leading-none'>{cart}</span>}
            </a>
            <a className="ml-6" href="#!user"><img className="w-9 inline-block md:w-10" src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="user"></img></a>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
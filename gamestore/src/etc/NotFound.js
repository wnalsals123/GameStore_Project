const NotFound = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen text-white">
      <div className="flex flex-wrap justify-center items-center w-fit bg-red-500 rounded-xl p-5 m-auto">
        <a className='flex items-center self-center m-2' href='/'>
          <img className="block w-9 sm:w-12" style={{filter: 'invert(100%) sepia(3%) saturate(0%) hue-rotate(294deg) brightness(105%) contrast(100%)'}} src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
          <span className="block h-fit pl-4 leading-none text-xl sm:text-3xl">Game Store</span>
        </a>
        <span className="block h-fit m-2 leading-none text-xl sm:text-3xl">잘못된 접근입니다!</span>
      </div>
    </div>
  )
}

export default NotFound;
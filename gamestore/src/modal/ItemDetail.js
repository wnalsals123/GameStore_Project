const ItemDetail = (props) => {
  const { cart, setCart, setModalOpen } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className='fixed top-0 left-0 w-full h-full z-50'>
      <div className='flex justify-center items-center w-full h-full bg-neutral-500 bg-opacity-70'>
        <div className='relative max-w-screen-lg w-[calc(100%-5rem)] h-[calc(100%-5rem)] bg-neutral-900 rounded-xl'>

          <div className='relative w-full h-full sm:p-5 overflow-auto scrollbar-hide'>

            <div className='sticky top-0 mb-5 p-2 sm:p-5 bg-neutral-100 rounded-lg'>
              <span className='block w-fit text-xl sm:text-3xl px-2'>Grand Theft Auto V</span>
              <button className="absolute top-3 sm:top-6 right-3 sm:right-6 w-5 h-5 bg-close-btn bg-no-repeat bg-cover sm:w-7 sm:h-7" onClick={() => { setModalOpen(false); document.body.style.overflow = 'auto'; }}></button>
            </div>

            <iframe className='w-full aspect-video rounded-lg shadow-lg' src="https://www.youtube-nocookie.com/embed/ISd3g9UZHtU" title="YouTube video player" frameBorder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>

            <div className='text-white text-3xl p-10'>완벽한 자유도</div>
            <div className='text-white text-3xl p-10'>아주 재밌음</div>
            <div className='text-white text-3xl p-10'>아직도 후속작 안냄</div>
            <div className='text-white text-3xl p-10'>일해라</div>
            <div className='text-white text-3xl p-10'>락스타 게임즈</div>
            <div className='text-white text-3xl p-10'>10년이 넘었다</div>

            <div className='sticky bottom-0 flex justify-evenly text-center text-xl sm:text-3xl md-text-2xl text-white'>
              <span className='block w-full sm:w-1/4 h-fit py-2 sm:py-5 bg-red-500 rounded-xl'>25,000원</span>
              <button className='w-full sm:w-1/4 h-fit py-2 sm:py-5 bg-sky-500 rounded-xl' onMouseDown={() => { setCart(cart + 1) }}>장바구니</button>
              <button className='w-full sm:w-1/4 h-fit py-2 sm:py-5 bg-sky-500 rounded-xl'>구매하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
const Cart = () => {

  return (
    <div className='fixed top-0 left-0 z-50 w-full h-full'>
      <div className='flex items-center justify-center w-full h-full bg-neutral-500 bg-opacity-70'>
        <div className='relative max-w-screen-lg w-[calc(100%-5rem)] h-[calc(100%-5rem)] bg-neutral-900 rounded-xl'>

          <div className='relative w-full h-full p-2 overflow-auto sm:p-5 scrollbar-hide text-md sm:text-2xl '>
          
            카트

          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;
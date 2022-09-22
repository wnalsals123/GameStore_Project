/* 페이지네이션 */
const GameFlexPagination = (props) => {
  const { totalPage, currentPage, setCurrentPage, onMoveToElement } = props

  const pageDown = () => {
    if(currentPage - 1 < 1) {
      alert("첫 페이지입니다!")
      return
    } 
    onMoveToElement()
    setCurrentPage(currentPage - 1)
  }

  const pageUp = () => {
    if(currentPage + 1 > totalPage) {
      alert("마지막 페이지입니다!")
      return
    } 
    onMoveToElement()
    setCurrentPage(currentPage + 1)
  }

  return (
    <div className='flex justify-center'>
      <div className='inline-flex items-center -space-x-px'>
        <button className="block px-3 py-2 ml-0 leading-tight text-black border border-gray-300 rounded-l-lg bg-neutral-100 hover:bg-neutral-300 hover:text-neutral-700" onClick={pageDown}>
          <span className="sr-only">Previous</span>
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
        </button>

        <button className="block px-3 py-2 leading-tight text-white border border-gray-300 bg-sky-500">{currentPage}</button>

        <button className="block px-3 py-2 leading-tight text-black border border-gray-300 rounded-r-lg bg-neutral-100 hover:bg-neutral-300 hover:text-neutral-700" onClick={pageUp}>
          <span className="sr-only">Next</span>
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
        </button>
      </div>
    </div>
  )
}

export default GameFlexPagination;
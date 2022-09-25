import GameFlexBanner from './GameFlexBanner'
import GameFlexHeader from './GameFlexHeader'
import GameFlexBox from './GameFlexBox'
import GameFlexPagination from './GameFlexPagination'
import GameFlexFooter from './GameFlexFooter'
import SideBarContent from '../side/SideBarContent'
import SearchResult from '../../function/SearchResult'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useMoveScrool from '../../function/MoveScrool'

const GameFlex = (props) => {
  const { setCart, setIsAddCart, isLogin, setIsLogin, category, loading, setLoading, setCategory, gameData } = props
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword')
  const gameTag = ["오픈월드", "멀티플레이", "협동", "액션", "공포", "좀비", "어드벤처", "스포츠", "리듬", "인디", "MMORPG", "FPS"]
  const [sortState, setsortState] = useState('sortAbc')
  const [isFilter, setIsFilter] = useState(false)
  const [totalPage, setTotalPage] = useState(100)
  const [currentPage, setCurrentPage] = useState(1)
  const [scroolRef, onMoveToElement] = useMoveScrool()

  /* 게임 데이터 로딩 애니메이션 */
  useEffect(() => {
    let timer = null
    timer = setTimeout(() => { setLoading('hidden') }, 590);

    return () => { clearTimeout(timer) }
  }, [category, setLoading])

  /* 장바구니에 추가*/
  const addCart = (selectedItem) => {
    const isUserCart = localStorage.getItem("UserCart") !== null

    if (isUserCart) {
      const userCart = JSON.parse(localStorage.getItem("UserCart"))
      const alreadyCart = userCart.filter((item) => (item.게임명 === selectedItem.게임명)).length > 0

      if (alreadyCart) {
        alert("이미 장바구니에 있습니다!")
        return
      }

      const temp = userCart.concat(selectedItem)

      localStorage.setItem("UserCart", JSON.stringify(temp))
      setCart(temp.length)
      setIsAddCart(true)
    } else {
      const temp = []
      localStorage.setItem("UserCart", JSON.stringify(temp.concat(selectedItem)))

      setCart(1)
      setIsAddCart(true)
    }
  }

  return (
    <div className='relative flex justify-center pb-5'>
      <div className='hidden'>
        {gameTag.map((item, index) => <input key={index} id={item} type='checkbox'></input>)}
      </div>

      <div className='hidden fixed left-[calc(50%-58rem)] border-r-[1px] border-neutral-500 3xl:block'>
        <SideBarContent isLogin={isLogin} setIsLogin={setIsLogin}></SideBarContent>
      </div>

      {keyword === null &&
        <div className='relative w-full text-white max-w-screen-2xl 3xl:ml-80'>
          <GameFlexBanner></GameFlexBanner>
          <GameFlexHeader category={category} setCategory={setCategory} setLoading={setLoading} setsortState={setsortState} isFilter={isFilter} setIsFilter={setIsFilter} scroolRef={scroolRef}></GameFlexHeader>
          <GameFlexBox category={category} gameData={gameData} loading={loading} addCart={addCart} isFilter={isFilter} sortState={sortState} setTotalPage={setTotalPage} currentPage={currentPage} setCurrentPage={setCurrentPage}></GameFlexBox>
          <GameFlexPagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} onMoveToElement={onMoveToElement}></GameFlexPagination>
          <GameFlexFooter></GameFlexFooter>
        </div>
      }

      {keyword !== null && <SearchResult gameData={gameData} keyword={keyword} addCart={addCart}></SearchResult>}
    </div>
  )
}

export default React.memo(GameFlex);

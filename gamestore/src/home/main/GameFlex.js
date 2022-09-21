import Banner from './Banner'
import SideBarContent from '../side/SideBarContent'
import Dropdown from '../../function/DropDown'
import SearchResult from '../../function/SearchResult'
import GameFilter from '../../function/GameFilter'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const GameFlex = (props) => {
  const { setCart, setIsAddCart, isLogin, setIsLogin, category, loading, setLoading, setCategory, GameList, gameData } = props
  const navigate = useNavigate();
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword')
  const gameTag = ['오픈월드', '멀티플레이', '협동', '액션', '공포', '좀비', '어드벤처', '스포츠', 'MMORPG', 'FPS']
  const [sortName, setSortName] = useState('이름 순')
  const [sortState, setsortState] = useState('sortAbc')
  const [isTagListOn, setIsTagListOn] = useState(false)
  const [isFilter, setIsFilter] = useState(false)

  /* 게임 데이터 로딩 애니메이션 */
  useEffect(() => {
    let timer = null

    timer = setTimeout(() => { setLoading('hidden') }, 590);

    return () => { clearTimeout(timer) }
  }, [category, setLoading])

  /* 장바구니에 추가 함수 */
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

  /* 카테고리, 정렬 컴포넌트 */
  const FlexHeader = () => {
    const buttonFilter = 'flex items-center p-2 !leading-none w-full'

    // 해당 게임 카테고리 설정
    const toCategory = (currentCategory) => {
      if (category === currentCategory) return

      setCategory(currentCategory)
      setLoading('block')
    }

    // 게임 정렬 설정
    const filterSort = (sortName, sortState) => {
      setSortName(sortName)
      setsortState(sortState)
    }

    // 필터 적용 시 활성화
    const Tag = () => {
      const tagStyle = 'bg-neutral-500 rounded-lg px-3 ml-3'

      return (
        <div className='flex flex-wrap mt-2 text-base sm:text-lg md:text-xl lg:text-2xl'>
          <span>적용된 필터 :</span>
          {isFilter.map((item, index) => (<span key={index} className={`${tagStyle}`}>{item}</span>))}
        </div>
      )
    }

    const TagList = () => {
      return (
        <div className={`${isTagListOn ? 'block' : 'hidden'} absolute top-0 -right-3 sm:right-0 z-40 3xl:block 3xl:fixed 3xl:top-[initial] 3xl:bottom-[1.25rem] 3xl:right-[calc(50%+39.2rem)]`}>
          <GameFilter setIsFilter={setIsFilter} setIsTagListOn={setIsTagListOn}></GameFilter>
        </div>
      )
    }

    const [categoryVis, setCategoryVis] = useState(false)
    const [sortVis, setSortVis] = useState(false)

    return (
      <div className='relative flex flex-col mx-3 mt-5 lg:mx-6'>
        <div className='relative z-10 flex justify-between text-2xl sm:text-3xl'>

          <div className='relative flex items-center justify-between cursor-pointer' onClick={() => { setCategoryVis(!categoryVis) }} onBlur={() => { setCategoryVis(false) }} tabIndex={0}>
            {category === 'home' && <span>상점 홈</span>}
            {category === 'sales' && <span>#특별 할인</span>}
            {category === 'new' && <span>#신작</span>}
            <svg className='flex items-center ml-2 md:hidden' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.363 6.363a1.239 1.239 0 000 1.752l8.76 8.761a1.239 1.239 0 001.753 0l8.761-8.76a1.239 1.239 0 10-1.752-1.753L12 14.248 4.115 6.363a1.239 1.239 0 00-1.752 0z" fill="currentColor"></path></svg>
            <div className="absolute left-0 flex-col flex-wrap w-full rounded-md text-xl top-full bg-neutral-900 min-w-[7rem]">
              <Dropdown visble={categoryVis}>
                <button className={buttonFilter} onMouseDown={() => { toCategory('home') }}><span>상점 홈</span></button>
                <button className={buttonFilter} onMouseDown={() => { toCategory('sales') }}><span>#특별 할인</span></button>
                <button className={buttonFilter} onMouseDown={() => { toCategory('new') }}><span>#신작</span></button>
              </Dropdown>
            </div>
          </div>

          <div className='flex'>
            <div className='w-[6.8rem] text-sm text-black border-2 rounded-md sm:w-[7.5rem] md:w-[8rem] sm:text-base md:text-lg bg-neutral-100 h-fit border-neutral-500'>
              <div className='relative flex items-center justify-between px-2 py-1 !leading-none w-full cursor-pointer' onClick={() => { setSortVis(!sortVis) }} onBlur={() => { setSortVis(false) }} tabIndex={0}>
                <span>{sortName}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.363 6.363a1.239 1.239 0 000 1.752l8.76 8.761a1.239 1.239 0 001.753 0l8.761-8.76a1.239 1.239 0 10-1.752-1.753L12 14.248 4.115 6.363a1.239 1.239 0 00-1.752 0z" fill="currentColor"></path></svg>
                <div className="absolute left-0 flex-col flex-wrap w-full border-2 rounded-md top-full bg-neutral-100 border-neutral-500">
                  <Dropdown visble={sortVis}>
                    <button className={buttonFilter} onMouseDown={() => { filterSort('이름 순', 'sortAbc') }}><span>이름 순</span></button>
                    <button className={buttonFilter} onMouseDown={() => { filterSort('최신 순', 'sortNew') }}><span>최신 순</span></button>
                    <button className={buttonFilter} onMouseDown={() => { filterSort('할인 높은 순', 'sortSale') }}><span>할인 높은 순</span></button>
                    <button className={buttonFilter} onMouseDown={() => { filterSort('가격 낮은 순', 'sortChip') }}><span>가격 낮은 순</span></button>
                  </Dropdown>
                </div>
              </div>
            </div>

            <button className='px-2 py-1 text-sm rounded-md bg-sky-500 sm:text-base md:text-lg h-fit !leading-none border-2 border-sky-500 ml-2 3xl:hidden' onClick={() => { setIsTagListOn(true) }}>필터</button>
          </div>

        </div>

        {isFilter && <Tag></Tag>}
        <TagList></TagList>
      </div>
    )
  }

  /* 게임 데이터에 카테고리, 정렬, 필터 적용 컴포넌트 */
  const GameFlexBox = () => {
    let filterGameData = category === 'home' ? gameData : category === 'sales' ? gameData.filter((item) => (item.할인 !== 0)) : category === 'new' ? gameData.filter((item) => (item.신작 === true)) : gameData

    // 게임 데이터 불러오기 실패 시 로컬 데이터 가져오기
    if (filterGameData === null) {
      filterGameData = GameList
    }

    if (sortState === 'sortAbc') {
      filterGameData = filterGameData.sort((a, b) => a.게임명.toLowerCase() < b.게임명.toLowerCase() ? -1 : 1);
    } else if (sortState === 'sortNew') {
      filterGameData = filterGameData.sort((a, b) => a.출시일 > b.출시일 ? -1 : 1);
    } else if (sortState === 'sortSale') {
      filterGameData = filterGameData.sort((a, b) => a.할인 > b.할인 ? -1 : 1);
    } else if (sortState === 'sortChip') {
      filterGameData = filterGameData.sort((a, b) => (a.할인 === 0 ? a.가격 : (a.가격 * (1 - a.할인))) < (b.할인 === 0 ? b.가격 : (b.가격 * (1 - b.할인))) ? -1 : 1);
    } else {
      console.log('sorterror!')
    }

    let filterTag = []

    if (isFilter) {
      filterTag = gameTag.filter(item => document.getElementById(item).checked)
      for (let i = 0; i < filterTag.length; i++) {
        filterGameData = filterGameData.filter(item => item.태그[filterTag[i]])
      }
    }

    // 상세보기 이동 함수
    const toDetail = (item) => {
      document.body.style.overflow = 'hidden'
      navigate(`/games/${item.게임명}`);
    }

    return (
      <div className='relative flex flex-wrap text-sm text-center sm:text-base lg:text-lg'>
        {filterGameData.length === 0 && <div className='mx-3 mt-5 text-2xl lg:mx-6 sm:text-3xl'><span>적용된 필터에 해당하는 게임이 없습니다.</span></div>}
        {filterGameData.map((item) => (
          <div key={item.게임명} className='group relative inline-block leading-snug w-[calc(50%-1.5rem)] h-60 mx-3 my-5 p-0 sm:h-80 lg:mx-6 lg:my-8 lg:w-[calc(33.3%-3rem)] xl:w-[calc(25%-3rem)] cursor-pointer 2xl:h-96' tabIndex={0}>
            <div className='relative w-full h-full'>
              <img className='object-cover w-full h-full border-2 shadow-md border-neutral-100 rounded-xl shadow-neutral-100' src={item.이미지} alt='game-logo'></img>
              <span className='absolute px-2 rounded-md bottom-2 left-2 bg-neutral-500 bg-opacity-70'>{item.게임명}</span>
              <div className='absolute top-2 left-2'>
                {item.가격 === 0 && <span className='block px-2 bg-red-500 rounded-md bg-opacity-70'>무료 플레이</span>}
                {item.할인 !== 0 && <span className='block px-2 rounded-md bg-sky-500 bg-opacity-70 sm:hidden'>{((item.할인) * 100).toFixed() + "%↓"}</span>}
                {item.신작 && <span className='block px-2 rounded-md bg-violet-500 bg-opacity-70 sm:hidden'>NEW</span>}
                <span className='block px-2 bg-red-500 rounded-md bg-opacity-70' style={{ textDecoration: item.할인 !== 0 && "line-through", display: item.가격 === 0 && "none" }}>{(item.가격).toLocaleString() + "원"}</span>
                {item.할인 !== 0 && <span className='block px-2 bg-red-500 rounded-md bg-opacity-70'>{(item.가격 * (1 - item.할인)).toLocaleString() + "원"}</span>}
              </div>
              <div className='absolute hidden sm:block top-2 right-2'>
                {item.할인 !== 0 && <span className='block px-2 rounded-md bg-sky-500 bg-opacity-70'>{((item.할인) * 100).toFixed() + "%↓"}</span>}
                {item.신작 && <span className='block px-2 rounded-md bg-violet-500 bg-opacity-70'>NEW</span>}
              </div>
            </div>
            <div className='absolute top-0 left-0 flex-col items-center justify-center hidden w-full h-full group-focus:flex rounded-xl bg-neutral-100 bg-opacity-70'>
              <button className='px-5 py-2 mb-10 bg-sky-500 rounded-xl' onMouseDown={() => { toDetail(item) }}>상세보기</button>
              <button className='px-5 py-2 bg-sky-500 rounded-xl' onMouseDown={() => { addCart(item) }}>장바구니</button>
            </div>
            <div className={`${loading} absolute top-0 left-0 flex items-center justify-center w-full h-full rounded-lg bg-neutral-900 animate-loadingGame`}>
              <svg className="w-1/2 text-white h-1/2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        ))}
      </div>
    )
  }

  /* 페이지네이션 */
  const Page = () => {
    return (
      <div className='flex justify-center'>
        <div className='inline-flex items-center -space-x-px'>
          <button className="block px-3 py-2 ml-0 leading-tight text-black border border-gray-300 rounded-l-lg bg-neutral-100 hover:bg-neutral-300 hover:text-neutral-700">
            <span className="sr-only">Previous</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          </button>

          <button className="block px-3 py-2 leading-tight text-white border border-gray-300 bg-sky-500">1</button>

          <button className="block px-3 py-2 leading-tight text-black border border-gray-300 rounded-r-lg bg-neutral-100 hover:bg-neutral-300 hover:text-neutral-700">
            <span className="sr-only">Next</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
          </button>
        </div>
      </div>
    )
  }

  const FlexFooter = () => {
    return (
      <div className="flex justify-between pt-[3rem] xsm:pt-[10rem] text-white mx-3 lg:mx-6 text-sm xsm:text-base sm:text-xl">
        <div className="flex items-center">
          <img className="w-8 sm:w-10 filter-white" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
          <span className="pl-2 !leading-none sm:pl-4">Game Store</span>
        </div>
        <div>
          <div className="flex items-center h-full"><span>Made by JMJ</span></div>
        </div>
      </div>
    )
  }

  /* 메인 렌더링 */
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
          <Banner></Banner>
          <FlexHeader></FlexHeader>
          <GameFlexBox></GameFlexBox>
          <Page></Page>
          <FlexFooter></FlexFooter>
        </div>
      }

      {keyword !== null && <SearchResult gameData={gameData} keyword={keyword} addCart={addCart}></SearchResult>}
    </div>
  )
}

export default React.memo(GameFlex);
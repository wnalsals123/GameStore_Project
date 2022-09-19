import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

const ItemDetail = () => {
  const { setCart, setIsAddCart, isLogin } = useOutletContext();
  const { gameid } = useParams();
  const navigate = useNavigate();
  const [write, setWrite] = useState(false)

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

  let temp = {
    게임명: null,
    유통사: null,
    설명: null,
    이미지: null,
    동영상: null,
    가격: null,
    할인: null,
    신작: null,
    출시일: null,
    태그: null,
    리뷰: null,
  }

  const [item, setItem] = useState(temp)
  const redirection = useRef(useNavigate())

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const GameData = JSON.parse(localStorage.getItem("GameList"))
    const game = GameData.filter((item) => (item.게임명 === gameid))

    setTimeout(() => {
      if (game.length !== 0) setItem(game[0])
      else {
        setTimeout(() => {
          redirection.current('/games/NotFound')
        }, 500);
      }
    }, 500);
  }, [gameid])

  const toBack = () => {
    document.body.style.overflow = 'auto'
    navigate('/');
  }

  const gamePrice = () => {
    if (item.가격 === 0) {
      return "무료 플레이"
    } else if (item.할인 !== 0) {
      return (item.가격 * (1 - item.할인)).toLocaleString() + "원"
    } else {
      return (item.가격).toLocaleString() + "원"
    }
  }

  const GameHeader = () => {
    if (item.게임명 === null) {
      return (
        <div className='sticky top-0 z-50 p-2 mb-2 text-center rounded-lg sm:mb-5 sm:p-5 bg-neutral-100 animate-pulse'>
          <span className='block text-xl sm:text-3xl animate-spin'>↻</span>
          <div className="absolute top-0 right-0 flex items-center h-full p-2 sm:p-5">
            <button className="w-5 h-5 bg-no-repeat bg-cover bg-close-btn sm:w-7 sm:h-7" onClick={toBack}></button>
          </div>
        </div>
      )
    } else {
      return (
        <div className='sticky top-0 z-50 p-2 mb-2 rounded-lg sm:mb-5 sm:p-5 bg-neutral-100'>
          <span className='block text-xl sm:text-3xl'>{item.게임명}</span>
          <div className="absolute top-0 right-0 flex items-center h-full p-2 sm:p-5">
            <button className="w-5 h-5 bg-no-repeat bg-cover bg-close-btn sm:w-7 sm:h-7" onClick={toBack}></button>
          </div>
        </div>
      )
    }
  }

  const GameImg = () => {
    if (item.게임명 === null) {
      return (
        <div className="relative mb-2 sm:mb-5 animate-pulse">
          <div className="flex items-center justify-center h-48 bg-opacity-50 rounded-lg bg-neutral-100"><img className='object-cover w-20 h-20 filter-white animate-spin' src={"https://cdn-icons-png.flaticon.com/512/66/66165.png"} alt='game-logo'></img></div>
          <div className="absolute text-white top-2 right-2">
            {<span className="hidden px-2 rounded-lg sm:inline-block bg-violet-500"><span className="block animate-spin">↻</span></span>}
            {<span className="hidden px-2 ml-2 rounded-lg sm:inline-block bg-sky-500"><span className="block animate-spin">↻</span></span>}
          </div>
        </div>
      )
    } else {
      return (
        <div className="relative mb-2 sm:mb-5">
          <img className='object-cover w-full rounded-lg' src={item.이미지} alt='game-logo'></img>
          <div className="absolute text-white top-2 right-2">
            {item.신작 && <span className="hidden px-2 rounded-lg sm:inline-block bg-violet-500">NEW</span>}
            {item.할인 !== 0 && <span className="hidden px-2 ml-2 rounded-lg sm:inline-block bg-sky-500">{((item.할인) * 100).toFixed() + "%OFF"}</span>}
          </div>
        </div>
      )
    }
  }

  const GameYoutube = () => {
    if (item.게임명 === null) {
      return (
        <div className="flex items-center justify-center h-48 bg-opacity-50 rounded-lg bg-neutral-100 animate-pulse"><img className='object-cover w-20 filter-white animate-spin' src={"https://cdn-icons-png.flaticon.com/512/66/66165.png"} alt='game-logo'></img></div>
      )
    } else {
      return (
        <iframe className='w-full rounded-lg shadow-lg aspect-video' src={item.게임명 === null ? "https://cdn-icons-png.flaticon.com/512/66/66165.png" : item.동영상} title="YouTube video player" frameBorder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      )
    }
  }

  const Tag = () => {
    const tagStyle = 'bg-neutral-500 rounded-lg px-3 mr-2 sm:mr-5 mb-2 sm:mb-5'
    if (item.게임명 === null) {
      return (
        <div className="flex flex-wrap animate-pulse">
          {<span className={`!bg-violet-500 ${tagStyle}`}><span className="block animate-spin">↻</span></span>}
          {<span className={`!bg-sky-500 ${tagStyle}`}><span className="block animate-spin">↻</span></span>}
          {<span className={`!bg-red-500 ${tagStyle}`}><span className="block animate-spin">↻</span></span>}
        </div>
      )
    } else {
      return (
        <div className="flex flex-wrap">
          {item.신작 && <span className={`!bg-violet-500 ${tagStyle}`}>NEW</span>}
          {item.할인 !== 0 && <span className={`!bg-sky-500 ${tagStyle}`}>{((item.할인) * 100).toFixed() + "%OFF"}</span>}
          {item.가격 === 0 && <span className={`!bg-red-500 ${tagStyle}`}>무료 플레이</span>}

          {item.태그.오픈월드 && <span className={`${tagStyle}`}>오픈월드</span>}
          {item.태그.멀티플레이 && <span className={`${tagStyle}`}>멀티플레이</span>}
          {item.태그.협동 && <span className={`${tagStyle}`}>협동</span>}
          {item.태그.액션 && <span className={`${tagStyle}`}>액션</span>}
          {item.태그.공포 && <span className={`${tagStyle}`}>공포</span>}
          {item.태그.좀비 && <span className={`${tagStyle}`}>좀비</span>}
          {item.태그.어드벤처 && <span className={`${tagStyle}`}>어드벤처</span>}
          {item.태그.스포츠 && <span className={`${tagStyle}`}>스포츠</span>}
          {item.태그.리듬 && <span className={`${tagStyle}`}>리듬</span>}
          {item.태그.인디 && <span className={`${tagStyle}`}>인디</span>}
          {item.태그.MMORPG && <span className={`${tagStyle}`}>MMORPG</span>}
          {item.태그.FPS && <span className={`${tagStyle}`}>FPS</span>}
        </div>
      )
    }
  }

  const GameInfo = () => {
    const infoStyle = 'border-b-[1px] border-neutral-100 mb-2'
    if (item.게임명 === null) {
      return (
        <div className="flex flex-col p-2 mb-2 text-center rounded-lg bg-neutral-100 sm:mb-5 sm:p-5 animate-pulse">
          <span className="p-2 mb-2 bg-orange-500 rounded-lg"><span className="block animate-spin">↻</span></span>
          <div className="flex flex-col p-2 rounded-lg bg-neutral-500">
            <span className="block animate-spin">↻</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col p-2 mb-2 rounded-lg bg-neutral-100 sm:mb-5 sm:p-5">
          <span className="p-2 mb-2 bg-orange-500 rounded-lg">게임 정보</span>
          <div className="flex flex-col p-2 rounded-lg bg-neutral-500">
            <span className={`${infoStyle}`}>게임명 : {item.게임명}</span>
            <span className={`${infoStyle}`}>유통사 : {item.유통사}</span>
            <span className={`${infoStyle}`}>출시일 : {String(item.출시일).replace(/(\d{4})(\d{2})(\d{2})/g, '$1년 $2월 $3일')}</span>
          </div>
          <span className="p-2 text-black">{item.설명}</span>
        </div>
      )
    }
  }

  const GameComment = () => {
    const writeReivew = () => {
      if (isLogin) {
        setWrite(true)
      } else {
        const message = "로그인이 후 가능합니다.\n로그인 하시겠습니까?"

        if (window.confirm(message)) {
          navigate('/login')
        } else {
          console.log("취소")
        }
      }
    }

    const submitReview = () => {
      const reviewContents = document.getElementById("review").value

      if (reviewContents.length < 10) {
        alert("내용은 최소 10자 이상입니다!")
        return
      }
      
      const gameData = JSON.parse(localStorage.getItem("GameList"))
      const userData = JSON.parse(localStorage.getItem("UserData"))
      const loginInfo = localStorage.getItem("LoginInfo")
      const user = userData.filter(item => item.username === loginInfo)[0]

      const getDate = () => {
        let today = new Date()
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
      }

      const gameNewReivew = {
        username: user.username,
        좋아요: 0,
        리뷰내용: reviewContents,
        작성일: getDate()
      }

      const userNewReivew =  {
        게임명: item.게임명,
        좋아요: 0,
        리뷰내용: reviewContents,
        이미지: item.이미지
      }

      let gameUpdate = null

      gameUpdate = {
        ...item,
        리뷰: item.리뷰.concat(gameNewReivew)
      }

      let userUpdate = null

      userUpdate = {
        ...user,
        리뷰: user.리뷰.concat(userNewReivew)
      }

      for (let i = 0; i < gameData.length; i++) {
        if (gameData[i].게임명 === item.게임명) {
          let temp = gameData
          temp[i] = gameUpdate
          localStorage.setItem("GameList", JSON.stringify(temp))
          break
        }
      }

      for (let i = 0; i < userData.length; i++) {
        if (userData[i].username === loginInfo) {
          let temp = userData
          temp[i] = userUpdate
          localStorage.setItem("UserData", JSON.stringify(temp))
          break
        }
      }

      setItem(gameUpdate)
    }

    if (item.게임명 === null) {
      return (
        <div className="flex flex-col p-2 mb-2 text-center rounded-lg bg-neutral-100 sm:mb-5 sm:p-5 animate-pulse">
          <span className="p-2 mb-2 rounded-lg bg-sky-500"><span className="block animate-spin">↻</span></span>
          <span className="p-2 mb-2 rounded-lg bg-neutral-900"><span className="block animate-spin">↻</span></span>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col p-2 mb-2 rounded-lg bg-neutral-100 sm:mb-5 sm:p-5">

          <div className="flex items-center justify-between p-2 rounded-lg bg-sky-500">
            <span>유저 리뷰</span>
            <button className="px-1 text-sm text-black rounded-md xsm:text-lg bg-neutral-100" onClick={writeReivew}>+등록</button>
          </div>

          {write &&
            <div className="relative flex flex-col p-2 mt-2 rounded-lg bg-neutral-900">
              <textarea className="p-2 overflow-hidden text-base outline-none resize-none bg-neutral-900 sm:text-base md:text-lg lg:text-xl xl:text-2xl" placeholder="내용입력(최소 10자)" id="review"></textarea>
              <div className="flex justify-end mt-2 xsm:text-base sm:text-xl">
                <button className="px-1 mr-2 rounded-md bg-neutral-500" onClick={submitReview}>제출</button>
                <button className="px-1 rounded-md bg-neutral-500" onClick={() => { setWrite(false) }}>취소</button>
              </div>
            </div>
          }

          {item.리뷰.length === 0 ?
            <div className="flex flex-col p-2 mt-2 rounded-lg bg-neutral-900">
              <span>등록된 리뷰가 없습니다.</span>
            </div>
            :
            item.리뷰.map((item, index) => (
              <div className="flex flex-col p-2 mt-2 rounded-lg bg-neutral-900" key={index}>
                <div className="flex items-center mb-2">
                  <span className="px-1 rounded-md bg-neutral-500">{item.username}</span>
                  <button className="px-1 ml-2 rounded-md bg-neutral-500">{`👍 ${(item.좋아요).toLocaleString()}`}</button>
                </div>
                <span className="mb-2">{item.리뷰내용}</span>
                <span className="text-sm xsm:text-base">{item.작성일}</span>
              </div>
            ))
          }

        </div>
      )
    }
  }

  const GamePriceBox = () => {
    if (item.게임명 === null) {
      return (
        <div className='sticky bottom-0 left-0 flex justify-between w-full p-2 text-sm text-center text-white bg-opacity-50 rounded-lg bg-neutral-100 sm:p-5 sm:text-2xl animate-pulse'>
          <div className="w-[50%] py-1 bg-red-500 sm:py-5 rounded-xl"><span className="block animate-spin">↻</span></div>
          <button className='w-[40%] py-1 sm:py-5 bg-sky-500 rounded-xl'><span className="block animate-spin">↻</span></button>
        </div>
      )
    } else {
      return (
        <div className='sticky bottom-0 left-0 flex justify-between w-full p-2 text-sm text-center text-white bg-opacity-50 rounded-lg bg-neutral-100 sm:p-5 sm:text-2xl'>
          <div className="w-[50%] py-1 bg-red-500 sm:py-5 rounded-xl">
            {item.할인 !== 0 && <span className="block line-through sm:inline-block">{(item.가격).toLocaleString() + "원"}</span>}
            <span>{gamePrice()}</span>
          </div>
          <button className='w-[40%] py-1 sm:py-5 bg-sky-500 rounded-xl' onClick={() => { addCart(item) }}>장바구니</button>
        </div>
      )
    }
  }

  return (
    <div className='fixed top-0 left-0 z-50 w-full h-full'>
      <div className='flex items-center justify-center w-full h-full bg-neutral-500 bg-opacity-70'>
        {/* 상세보기 시작 */}
        <div className='relative max-w-screen-lg max-h-[calc(100%-5rem)] w-[calc(100%-5rem)] h-fit bg-neutral-900 rounded-xl overflow-y-auto scrollbar-hide'>
          <div className='relative w-full h-full p-2 text-base sm:p-5 sm:text-2xl'>

            <GameHeader></GameHeader>

            <div className="flex mb-2 sm:mb-5">
              <div className="block w-full">
                <GameImg></GameImg>
                {GameYoutube()}
              </div>
            </div>

            <div className="mb-2 leading-normal text-white sm:mb-5">
              <Tag></Tag>
              <GameInfo></GameInfo>
              <GameComment></GameComment>
            </div>

            <GamePriceBox></GamePriceBox>

          </div>
        </div>
        {/* 상세보기 끝 */}
      </div>
    </div>
  );
}

export default ItemDetail;
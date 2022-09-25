import SpanTextHighlight from "../function/SpanTextHighlight";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeCookie } from "../function/Cookie";
import CouponList from "../json/CouponList.json"

/* 마이페이지 */
const MyPage = () => {
  const { isLogin } = useOutletContext()
  const navigate = useNavigate()
  const [myList, setMyList] = useState('profile')
  const [user, setUser] = useState({
    username: '',
    password: '',
    passwordOk: '',
    email: '',
    nickname: '',
    exp: 0,
    point: 0,
    구매: [],
    리뷰: [],
    쿠폰: [],
  })

  /* 유저 데이터 불러오기 */
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("UserData"))
    const loginInfo = localStorage.getItem("LoginInfo")
    let temp = null

    // 오류 시 로그인 세션 끊기
    if (userData !== null || loginInfo !== null) temp = userData.filter(item => item.username === loginInfo)
    else {
      alert("오류가 발생했습니다!\n페이지를 새로고침하세요!")
      removeCookie("LoginSession")
      return
    }

    // 성공 시 유저 데이터 상태 업데이트
    setUser(temp[0])
  }, [])

  const toBack = () => {
    document.body.style.overflow = 'auto'
    JSON.parse(sessionStorage.getItem('FirstPage')) ? navigate('/') : navigate(-1);
  }

  /* 프로필 탭 */
  const Profile = () => {
    /* 유저 등급 */
    const userGrade = (exp) => {
      if (exp < 1000) return "브론즈"
      else if (exp < 3000) return "실버"
      else if (exp < 6000) return "골드"
      else if (exp < 10000) return "플래티넘"
      else return "다이아"
    }

    /* 유저 다음 등급 */
    const nextGrade = (exp) => {
      if (exp < 1000) return `1000exp`
      else if (exp < 3000) return `3000exp`
      else if (exp < 6000) return `6000exp`
      else if (exp < 10000) return `10000exp`
      else return "최고등급"
    }

    /* 다음 등급 이름 */
    const nextGradeName = (exp) => {
      if (exp < 1000) return `실버`
      else if (exp < 3000) return `골드`
      else if (exp < 6000) return `플래티넘`
      else if (exp < 10000) return `다이아`
      else return "최고등급"
    }

    /* 등급 별 할인율 */
    const gradeDiscount = (exp) => {
      if (exp < 1000) return `1%`
      else if (exp < 3000) return `2%`
      else if (exp < 6000) return `3%`
      else if (exp < 10000) return `4%`
      else return "5%"
    }

    return (
      <div className="overflow-y-auto scrollbar-hide xsm:w-[calc(100%-12rem)] p-2 sm:p-5 !ml-0 rounded-lg bg-neutral-900 flex-grow">
        <div className="flex justify-center py-1 mb-5 rounded-md bg-sky-500">
          <span>내 정보</span>
        </div>
        <div className="flex flex-col">

          <span className="pb-2 text-base sm:text-xl">기본정보</span>
          <div className="flex flex-col p-2 mb-20 border-2 rounded-lg border-neutral-100">
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">아이디</span>
              <span>{user.username}</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">이메일</span>
              <span>{user.email}</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">닉네임</span>
              <div className="flex items-center justify-between flex-grow">
                <span>{user.nickname}</span>
                <button className="px-2 py-1 text-sm rounded-lg sm:text-base bg-sky-500 !leading-none">변경</button>
              </div>
            </div>
          </div>

          <span className="pb-2 text-base sm:text-xl">등급 및 혜택</span>
          <div className="flex flex-col p-2 mb-20 border-2 rounded-lg border-neutral-100">
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">회원등급</span>
              <span>{userGrade(user.exp)}</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">내 경험치</span>
              <span>{`${user.exp}exp`}</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">다음 등급</span>
              <span>{`${user.exp} / ${nextGrade(user.exp)}`}</span>
              <SpanTextHighlight className={'ml-2 text-[0.6rem] xsm:text-sm sm:text-base'} str={`*달성 시 "${nextGradeName(user.exp)}"로 상승`} highlightText={nextGradeName(user.exp)} highlightColor={'text-sky-500'}></SpanTextHighlight>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <div className="flex flex-col xsm:flex-row">
                <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">포인트</span>
                <span>{`${user.point}p`}</span>
              </div>
              <SpanTextHighlight className={'ml-2 text-[0.6rem] xsm:text-sm sm:text-base'} str={`*구매 금액의 "${gradeDiscount(user.exp)}" 적립`} highlightText={gradeDiscount(user.exp)} highlightColor={'text-sky-500'}></SpanTextHighlight>
            </div>

            <div>

            </div>
          </div>

          <span className="pb-2 text-base sm:text-xl">회원 등급표</span>
          <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">브론즈</span>
              <SpanTextHighlight str={`구매 금액의 "1%" 적립`} highlightText={'1%'} highlightColor={'text-sky-500'}></SpanTextHighlight>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">실버</span>
              <SpanTextHighlight str={`1000exp 달성 시 구매`} highlightText={'1000exp'} highlightColor={'text-sky-500'}></SpanTextHighlight>
              <SpanTextHighlight str={`금액의 "2%" 적립`} highlightText={'2%'} highlightColor={'text-sky-500'}></SpanTextHighlight>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">골드</span>
              <SpanTextHighlight str={`3000exp 달성 시 구매`} highlightText={'3000exp'} highlightColor={'text-sky-500'}></SpanTextHighlight>
              <SpanTextHighlight str={`금액의 "3%" 적립`} highlightText={'3%'} highlightColor={'text-sky-500'}></SpanTextHighlight>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">플래티넘</span>
              <SpanTextHighlight str={`6000exp 달성 시 구매`} highlightText={'6000exp'} highlightColor={'text-sky-500'}></SpanTextHighlight>
              <SpanTextHighlight str={`금액의 "4%" 적립`} highlightText={'4%'} highlightColor={'text-sky-500'}></SpanTextHighlight>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">다이아</span>
              <SpanTextHighlight str={`10000exp 달성 시 구매`} highlightText={'10000exp'} highlightColor={'text-sky-500'}></SpanTextHighlight>
              <SpanTextHighlight str={`금액의 "5%" 적립`} highlightText={'5%'} highlightColor={'text-sky-500'}></SpanTextHighlight>
            </div>

            <div>

            </div>
          </div>

        </div>
      </div>
    )
  }

  /* 구매 내역 탭 */
  const Purchase = () => {
    return (
      <div className="overflow-y-auto scrollbar-hide xsm:w-[calc(100%-12rem)] p-2 sm:p-5 !ml-0 rounded-lg bg-neutral-900 flex-grow">

        <div className="flex justify-center py-1 mb-5 rounded-md bg-sky-500">
          <span>구매 내역</span>
        </div>

        {(user.구매).length === 0 ?
          <div className="flex flex-col">
            <span className="py-2">구매내역이 없습니다.</span>
            <hr className="border-t-2"></hr>
          </div>
          :
          (user.구매).map((item, index) => (
            <div className="flex flex-col" key={index}>
              <span className="pb-2 text-base sm:text-xl">{`주문번호: ${item.주문번호}`}</span>
              <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">상품명</span>
                  <span>{item.상품명}</span>
                </div>
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">결제수단</span>
                  <span>{item.결제수단}</span>
                </div>
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">결제금액</span>
                  <span>{`${(item.결제금액).toLocaleString()}원`}</span>
                </div>
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">주문일자</span>
                  <span>{item.주문일자}</span>
                </div>
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">결제상태</span>
                  <span>{item.결제상태}</span>
                </div>
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">비고</span>
                  <button className="w-[5rem] px-2 py-1 text-sm rounded-lg sm:text-base bg-sky-500 !leading-none mr-2">키 확인</button>
                  <span>{item.key}</span>
                </div>
              </div>
              <hr className="my-5 border-t-[1px] border-neutral-500"></hr>
            </div>
          ))
        }

      </div>
    )
  }

  /* 리뷰 관리 탭 */
  const Review = () => {
    const gameData = JSON.parse(localStorage.getItem("GameList"))

    /* 사용자 리뷰 데이터 불러오기 */
    const getReviewData = () => {
      let reviewList = []
      for(let i = 0; i < user.리뷰.length; i++) {
        const selectGame = gameData.filter(item => item.게임명 === user.리뷰[i].게임명)[0]
        const selectReview = selectGame.리뷰.filter(item => item.commentId === user.리뷰[i].commentId)[0]
        const reviewDetail = {
          게임명: selectGame.게임명,
          이미지: selectGame.이미지,
          좋아요: selectReview.좋아요,
          리뷰내용: selectReview.리뷰내용,
          작성일: selectReview.작성일,
        }
        reviewList = reviewList.concat(reviewDetail)
      }
      return reviewList
    }
    const reviewData = user.리뷰.length === 0 ? [] : getReviewData()

    /* 좋아요 많은 리뷰 */
    const getPopularReview = () => {
      const temp = reviewData.filter(() => true)
      temp.sort((a, b) => a.좋아요 > b.좋아요 ? -1 : 1);
      return temp[0]
    }
    const popularReview = user.리뷰.length === 0 ? [] : getPopularReview()

    /* 리뷰 등급 */
    const reviewGrade = (reviews) => {
      const reviewCount = reviews.length
      if (reviewCount < 2) return "초보자"
      else if (reviewCount < 5) return "게이머"
      else if (reviewCount < 10) return "리뷰어"
      else if (reviewCount < 20) return "평론가"
      else return "고인물"
    }

    /* 총 리뷰 수 */
    const totalReview = (reviews) => {
      return reviews.length
    }

    /* 총 좋아요 수 */
    const totalLike = (reviews) => {
      let total = 0
      for (let i = 0; i < reviews.length; i++) {
        total = total + reviews[i].좋아요
      }
      return total
    }

    /* 게임 상세 페이지로 이동 */
    const toDetail = (page) => {
      navigate(`/games/${page}`);
    }

    return (
      <div className="overflow-y-auto scrollbar-hide xsm:w-[calc(100%-12rem)] p-2 sm:p-5 !ml-0 rounded-lg bg-neutral-900 flex-grow">

        <div className="flex justify-center py-1 mb-5 rounded-md bg-sky-500">
          <span>리뷰 관리</span>
        </div>

        <div className="flex flex-col">
          <span className="pb-2 text-base sm:text-xl">나의 리뷰</span>
          <div className="flex flex-col p-2 mb-20 border-2 rounded-lg border-neutral-100">
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
              <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">등급</span>
              <span>{reviewGrade(reviewData)}</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
              <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">총 리뷰 수</span>
              <span>{`${totalReview(reviewData).toLocaleString()}개`}</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
              <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">받은 좋아요 수</span>
              <span>{`👍${totalLike(reviewData).toLocaleString()}`}</span>
            </div>
          </div>
        </div>

        {(user.리뷰).length !== 0 &&
          <div className="flex flex-col">
            <span className="pb-2 text-base sm:text-xl">가장 인기있는 리뷰</span>
            <div className="flex flex-col p-2 mb-20 border-2 rounded-lg border-neutral-100">
              <div className="flex flex-col xsm:flex-row">
                <button className="xsm:w-[6rem] sm:w-[9rem] xsm:mr-4 flex-shrink-0 flex-grow xsm:flex-grow-0" onClick={() => { toDetail(popularReview.게임명) }}><img className="object-cover w-full h-full rounded-md" src={popularReview.이미지} alt="game-logo"></img></button>

                <div className="flex flex-col flex-grow">
                  <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                    <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">게임명</span>
                    <span>{popularReview.게임명}</span>
                  </div>
                  <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                    <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">좋아요 수</span>
                    <span>{`👍${popularReview.좋아요.toLocaleString()}`}</span>
                  </div>
                  <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                    <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">리뷰 내용</span>
                    <span>{popularReview.리뷰내용}</span>
                  </div>
                  <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                    <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">작성일</span>
                    <span>{popularReview.작성일}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        <div className="flex flex-col">
          <span className="pb-2 text-base sm:text-xl">리뷰 목록</span>

          {(user.리뷰).length === 0 ?
            <div className="flex flex-col">
              <span className="py-2">작성하신 리뷰가 없습니다</span>
              <hr className="border-t-2"></hr>
            </div>
            :
            (reviewData).map((item, index) => (
              <div className="flex flex-col" key={index}>
                <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
                  <div className="flex flex-col xsm:flex-row">
                    <button className="xsm:w-[6rem] sm:w-[9rem] xsm:mr-4 flex-shrink-0 flex-grow xsm:flex-grow-0" onClick={() => { toDetail(item.게임명) }}><img className="object-cover w-full h-full rounded-md" src={item.이미지} alt="game-logo"></img></button>

                    <div className="flex flex-col flex-grow">
                      <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                        <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">게임명</span>
                        <span>{item.게임명}</span>
                      </div>
                      <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                        <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">좋아요 수</span>
                        <span>{`👍${(item.좋아요).toLocaleString()}`}</span>
                      </div>
                      <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                        <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">리뷰 내용</span>
                        <span>{item.리뷰내용}</span>
                      </div>
                      <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                        <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">작성일</span>
                        <span>{item.작성일}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-5 border-t-[1px] border-neutral-500"></hr>
              </div>
            ))
          }
        </div>

      </div>
    )
  }

  /* 쿠폰함 탭 */
  const Coupon = () => {
    /* 유저 쿠폰 불러오기 */
    const userCoupon = (userCouponHistory) => {
      let result = []
      for (let i = 0; i < userCouponHistory.length; i++) {
        let temp = CouponList.filter(item => item.쿠폰명 === (userCouponHistory[i]).쿠폰명 && (userCouponHistory[i]).사용 === false)
        result = result.concat(temp)
      }
      return result
    }

    /* 쿠폰 등록하기 */
    const couponConfirmation = () => {
      // 쿠폰 유효성 검사
      const couponValue = document.getElementById("coupon").value
      const invalidCoupon = CouponList.filter(item => item.쿠폰명 === couponValue).length === 0
      if (invalidCoupon) {
        alert("유효하지 않은 쿠폰입니다!")
        return
      }

      // 이미 등록한 쿠폰 검사
      const alreadyUse = (user.쿠폰).filter(item => item.쿠폰명 === couponValue).length !== 0
      if (alreadyUse) {
        alert("이미 등록한 쿠폰입니다!")
        return
      }

      // 유저 쿠폰 업데이트
      const addCoupon = { 쿠폰명: couponValue, 사용: false }
      const updateUser = {
        username: user.username,
        password: user.password,
        passwordOk: user.passwordOk,
        email: user.email,
        nickname: user.nickname,
        exp: user.exp,
        point: user.point,
        구매: user.구매,
        리뷰: user.리뷰,
        쿠폰: [...user.쿠폰, addCoupon],
      }
      setUser(updateUser)

      // 유저 데이터 업데이트
      const userData = JSON.parse(localStorage.getItem("UserData"))
      const loginInfo = localStorage.getItem("LoginInfo")
      for (let i = 0; i < userData.length; i++) {
        if (userData[i].username === loginInfo) {
          let temp = userData
          temp[i] = updateUser
          console.log(temp)
          localStorage.setItem("UserData", JSON.stringify(temp))
          break
        }
      }
      alert("쿠폰을 등록했습니다!")
    }

    // 엔터키 리스너
    const enterListen = (e) => {
      if(e.key === 'Enter') couponConfirmation()
    }

    return (
      <div className="overflow-y-auto scrollbar-hide xsm:w-[calc(100%-12rem)] p-2 sm:p-5 !ml-0 rounded-lg bg-neutral-900 flex-grow">

        <div className="flex justify-center py-1 mb-5 rounded-md bg-sky-500">
          <span>쿠폰함</span>
        </div>

        <div className="flex flex-col">
          <span className="pb-2 text-base sm:text-xl">쿠폰 등록</span>
          <div className="flex flex-col p-2 mb-20 border-2 rounded-lg border-neutral-100">
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap xsm:flex-row">
              <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">쿠폰 번호</span>
              <div className="flex flex-wrap flex-grow">
                <input className="flex-grow w-[7rem] px-2 mr-2 text-black rounded-md" id="coupon" onKeyUp={enterListen}></input>
                <button className="px-2 py-1 text-sm rounded-lg sm:text-base bg-sky-500 !leading-none" onClick={couponConfirmation}>등록</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="pb-2 text-base sm:text-xl">나의 쿠폰</span>


          {userCoupon(user.쿠폰).length === 0 ?
            <div className="flex flex-col">
              <span className="py-2">등록된 쿠폰이 없습니다.</span>
              <hr className="border-t-2"></hr>
            </div>
            :
            userCoupon(user.쿠폰).map((item, index) => (
              <div className="flex flex-col" key={index}>
                <div className="flex flex-col p-2 mb-2 border-2 rounded-lg border-neutral-100">
                  <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                    <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">쿠폰명</span>
                    <span>{item.쿠폰명}</span>
                  </div>
                  <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                    <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">헤택</span>
                    <span>{item.혜택}</span>
                  </div>
                  <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                    <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">만료일</span>
                    <span>{item.만료일}</span>
                  </div>
                </div>
                <hr className="my-5 border-t-[1px] border-neutral-500"></hr>
              </div>
            ))
          }
        </div>

      </div>
    )
  }

  const MyPageWrap = () => {
    return (
      <div className='fixed top-0 left-0 z-40 w-full h-full'>
        <div className='flex items-center justify-center w-full h-full bg-neutral-500 bg-opacity-70'>
          <div className='relative max-w-screen-lg h-[calc(100%-5rem)] w-screen sm:w-[calc(100%-5rem)] bg-neutral-900 rounded-xl'>
            <div className='relative flex flex-col w-full h-full p-2 text-sm sm:p-5 xsm:text-base lg:text-xl'>

              <div className="flex justify-between p-2 mb-2 text-lg rounded-lg sm:p-5 sm:mb-5 itmes-center bg-neutral-100 sm:text-2xl">
                <span>마이페이지</span>
                <div className="flex items-center"><button className="w-5 h-5 bg-no-repeat bg-cover sm:w-7 sm:h-7 bg-close-btn" onClick={toBack}></button></div>
              </div>

              <div className="relative flex items-center justify-start mb-2 text-white xsm:mb-5">
                <div className="flex items-center">
                  <img className="w-10 md:w-12 filter-white" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
                  <span className="pl-4 leading-none">Game Store</span>
                </div>
              </div>

              <div className="flex flex-col flex-grow overflow-y-auto text-white border-2 rounded-lg xsm:flex-row border-neutral-100">
                <ul className="flex border-b-2 xsm:flex-col xsm:overflow-y-auto xsm:w-[6.5rem] sm:w-[8rem] md:w-[10rem] lg:w-[12rem] bg-neutral-900 xsm:border-b-0 xsm:border-r-2 border-neutral-100 p-2 [&_li]:my-3 [&_li]:px-2 [&_li]:text-center [&_li]:xsm:text-left [&_li]:basis-1/4 [&_li]:xsm:basis-0 [&_hr]:border-t-2 bg-transparent">
                  <li className={`rounded-md ${myList === 'profile' && 'bg-neutral-500'}`}><button onClick={() => { setMyList('profile') }}>내 정보</button></li>
                  <hr></hr>
                  <li className={`rounded-md ${myList === 'purchase' && 'bg-neutral-500'}`}><button onClick={() => { setMyList('purchase') }}>구매 내역</button></li>
                  <hr></hr>
                  <li className={`rounded-md ${myList === 'review' && 'bg-neutral-500'}`}><button onClick={() => { setMyList('review') }}>리뷰 관리</button></li>
                  <hr></hr>
                  <li className={`rounded-md ${myList === 'coupon' && 'bg-neutral-500'}`}><button onClick={() => { setMyList('coupon') }}>쿠폰함</button></li>
                  <hr></hr>
                </ul>

                {myList === 'profile' && <Profile></Profile>}
                {myList === 'purchase' && <Purchase></Purchase>}
                {myList === 'review' && <Review></Review>}
                {myList === 'coupon' && <Coupon></Coupon>}
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {isLogin ? <MyPageWrap /> : <Navigate to="/"></Navigate>}
    </>
  )
}

export default MyPage;
import SpanTextHighlight from "../function/SpanTextHighlight";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

const MyPage = () => {
  const { isLogin } = useOutletContext()
  const navigate = useNavigate()
  const [myList, setMyList] = useState('profile')
  const [user, setUser] = useState({
    username : null,
    password : null,
    passwordOk : null,
    email : null,
    nickname : null,
    exp : 0,
    point : 0,
  })

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("UserData"))
    const loginInfo = localStorage.getItem("LoginInfo")
    let temp = null

    if(userData !== null || loginInfo !== null) temp = userData.filter(item => item.username === loginInfo)
    if(temp === null) alert("오류가 발생했습니다!")
    else setUser(temp[0])
  }, [])

  const toBack = () => {
    document.body.style.overflow = 'auto'
    navigate('/');
  }

  const Profile = () => {
    const userGrade = (exp) => {
      if(exp < 1000)  return "브론즈"
      else if(exp < 3000) return "실버"
      else if(exp < 6000) return "골드"
      else if(exp < 10000) return "플래티넘"
      else return "다이아"
    }

    const nextGrade = (exp) => {
      if(exp < 1000)  return `1000exp`
      else if(exp < 3000) return `3000exp`
      else if(exp < 6000) return `6000exp`
      else if(exp < 10000) return `10000exp`
      else return "최고등급"
    }

    const nextGradeName = (exp) => {
      if(exp < 1000)  return `실버`
      else if(exp < 3000) return `골드`
      else if(exp < 6000) return `플래티넘`
      else if(exp < 10000) return `다이아`
      else return "최고등급"
    }

    const gradeDiscount = (exp) => {
      if(exp < 1000)  return `1%`
      else if(exp < 3000) return `2%`
      else if(exp < 6000) return `3%`
      else if(exp < 10000) return `4%`
      else return "5%"
    }

    return (
      <div className="overflow-y-auto scrollbar-hide w-[calc(100%-12rem)] p-2 sm:p-5 !ml-0 rounded-lg bg-neutral-900 flex-grow">
        <div className="flex justify-center mb-2">
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
          <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
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

        </div>
      </div>
    )
  }

  const Purchase = () => {
    return (
      <div className="overflow-y-auto scrollbar-hide w-[calc(100%-12rem)] p-2 sm:p-5 !ml-0 rounded-lg bg-neutral-900 flex-grow">

        <div className="flex justify-center mb-2">
          <span>구매 내역</span>
        </div>

        <div className="flex flex-col">
          <span className="pb-2 text-base sm:text-xl">주문번호: 2020020200000001</span>
          <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">상품명</span>
              <span>GTA5</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">결제수단</span>
              <span>카드결제</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">결제금액</span>
              <span>10,000원</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">주문일자</span>
              <span>2020-02-02 12:00:00</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">결제상태</span>
              <span>결제완료</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">비고</span>
              <button className="w-[5rem] px-2 py-1 text-sm rounded-lg sm:text-base bg-sky-500 !leading-none">키 확인</button>
            </div>
          </div>
          <hr className="my-10 border-t-2"></hr>
        </div>

        <div className="flex flex-col">
          <span className="pb-2 text-base sm:text-xl">주문번호: 2020020200000001</span>
          <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">상품명</span>
              <span>GTA5</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">결제수단</span>
              <span>카드결제</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">결제금액</span>
              <span>10,000원</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">주문일자</span>
              <span>2020-02-02 12:00:00</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">결제상태</span>
              <span>결제완료</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">비고</span>
              <button className="w-[5rem] px-2 py-1 text-sm rounded-lg sm:text-base bg-sky-500 !leading-none">키 확인</button>
            </div>
          </div>
          <hr className="my-10 border-t-2"></hr>
        </div>

        <div className="flex flex-col">
          <span className="pb-2 text-base sm:text-xl">주문번호: 2020020200000001</span>
          <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">상품명</span>
              <span>GTA5</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">결제수단</span>
              <span>카드결제</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">결제금액</span>
              <span>10,000원</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">주문일자</span>
              <span>2020-02-02 12:00:00</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">결제상태</span>
              <span>결제완료</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">비고</span>
              <button className="w-[5rem] px-2 py-1 text-sm rounded-lg sm:text-base bg-sky-500 !leading-none">키 확인</button>
            </div>
          </div>
          <hr className="my-10 border-t-2"></hr>
        </div>

      </div>
    )
  }

  const Review = () => {
    return (
      <div className="overflow-y-auto scrollbar-hide w-[calc(100%-12rem)] p-2 sm:p-5 !ml-0 rounded-lg bg-neutral-900 flex-grow">

        <div className="flex justify-center mb-2">
          <span>리뷰 관리</span>
        </div>

        <div className="flex flex-col">
          <span className="pb-2 text-base sm:text-xl">나의 리뷰</span>
          <div className="flex flex-col p-2 mb-20 border-2 rounded-lg border-neutral-100">
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
              <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">등급</span>
              <span>초보자</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
              <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">총 좋아요 수</span>
              <span>0</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
              <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">다음 등급까지</span>
              <span>0</span>
              <SpanTextHighlight className={'ml-2 text-[0.6rem] xsm:text-sm sm:text-base'} str={`달성 시 "중급자"로 상승`} highlightText={'중급자'} highlightColor={'text-sky-500'}></SpanTextHighlight>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="pb-2 text-base sm:text-xl">가장 인기있는 리뷰</span>
          <div className="flex flex-col p-2 mb-20 border-2 rounded-lg border-neutral-100">
            <div className="flex flex-col xsm:flex-row">
              <div className="xsm:w-[6rem] sm:w-[9rem] xsm:mr-4 flex-shrink-0 flex-grow xsm:flex-grow-0"><img className="object-cover w-full h-full rounded-md" src='https://post-phinf.pstatic.net/MjAxOTEyMDlfMTE2/MDAxNTc1ODU1MjI2MDk5.FRFPU4hRmTSm4dbU9P7AwyRkhBY0cu2ZHHDGzDOL9Y4g.A62Be94UyxxatbHgcllJkfbMofNCbqTZQED94tr_d4cg.JPEG/1.jpg?type=w1200' alt="game-logo"></img></div>

              <div className="flex flex-col flex-grow">
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">게임명</span>
                  <span>GTA5</span>
                </div>
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">좋아요 수</span>
                  <span>000</span>
                </div>
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">리뷰 내용</span>
                  <span>아주 재밌다!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="pb-2 text-base sm:text-xl">리뷰 목록</span>

          <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
            <div className="flex flex-col xsm:flex-row">
              <div className="xsm:w-[6rem] sm:w-[9rem] xsm:mr-4 flex-shrink-0 flex-grow xsm:flex-grow-0"><img className="object-cover w-full h-full rounded-md" src='https://post-phinf.pstatic.net/MjAxOTEyMDlfMTE2/MDAxNTc1ODU1MjI2MDk5.FRFPU4hRmTSm4dbU9P7AwyRkhBY0cu2ZHHDGzDOL9Y4g.A62Be94UyxxatbHgcllJkfbMofNCbqTZQED94tr_d4cg.JPEG/1.jpg?type=w1200' alt="game-logo"></img></div>

              <div className="flex flex-col flex-grow">
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">게임명</span>
                  <span>GTA5</span>
                </div>
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">좋아요 수</span>
                  <span>000</span>
                </div>
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">리뷰 내용</span>
                  <span>아주 재밌다!</span>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-10 border-t-2"></hr>

          <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
            <div className="flex flex-col xsm:flex-row">
              <div className="xsm:w-[6rem] sm:w-[9rem] xsm:mr-4 flex-shrink-0 flex-grow xsm:flex-grow-0"><img className="object-cover w-full h-full rounded-md" src='https://post-phinf.pstatic.net/MjAxOTEyMDlfMTE2/MDAxNTc1ODU1MjI2MDk5.FRFPU4hRmTSm4dbU9P7AwyRkhBY0cu2ZHHDGzDOL9Y4g.A62Be94UyxxatbHgcllJkfbMofNCbqTZQED94tr_d4cg.JPEG/1.jpg?type=w1200' alt="game-logo"></img></div>

              <div className="flex flex-col flex-grow">
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">게임명</span>
                  <span>GTA5</span>
                </div>
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">좋아요 수</span>
                  <span>000</span>
                </div>
                <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
                  <span className="w-[6rem] sm:w-[6rem] lg:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">리뷰 내용</span>
                  <span>아주 재밌다!</span>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-10 border-t-2"></hr>

        </div>

      </div>
    )
  }

  const Coupon = () => {
    return (
      <div className="overflow-y-auto scrollbar-hide w-[calc(100%-12rem)] p-2 sm:p-5 !ml-0 rounded-lg bg-neutral-900 flex-grow">

        <div className="flex justify-center mb-2">
          <span>쿠폰함</span>
        </div>

        <div className="flex flex-col">
          <span className="pb-2 text-base sm:text-xl">쿠폰 등록</span>
          <div className="flex flex-col p-2 mb-20 border-2 rounded-lg border-neutral-100">
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap xsm:flex-row">
              <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">쿠폰 번호</span>
              <div className="flex flex-wrap flex-grow">
                <input className="flex-grow w-[7rem] px-2 mr-2 text-black rounded-md"></input>
                <button className="px-2 py-1 text-sm rounded-lg sm:text-base bg-sky-500 !leading-none">등록</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="pb-2 text-base sm:text-xl">나의 쿠폰</span>

          <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">쿠폰명</span>
              <span>웰컴 쿠폰</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">헤택</span>
              <span>구매 금액의 5% 할인</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">만료일</span>
              <span>2022-02-02</span>
            </div>
          </div>
          <hr className="my-10 border-t-2"></hr>

          <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">쿠폰명</span>
              <span>머시기 쿠폰</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">헤택</span>
              <span>구매 금액의 5% 할인</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap flex-col xsm:flex-row">
              <span className="w-[7rem] sm:w-[10rem] bg-neutral-500 rounded-md px-2 mr-2">만료일</span>
              <span>2022-02-02</span>
            </div>
          </div>
          <hr className="my-10 border-t-2"></hr>

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

              <div className="relative flex items-center justify-start mb-5 text-white">
                <div className="flex items-center">
                  <img className="w-10 md:w-12 filter-white" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
                  <span className="pl-4 leading-none">Game Store</span>
                </div>
              </div>

              <div className="flex flex-grow overflow-y-auto text-white border-2 rounded-lg border-neutral-100">
                <ul className="overflow-y-auto w-[6.5rem] sm:w-[8rem] md:w-[10rem] lg:w-[12rem] bg-neutral-900 border-r-2 border-neutral-100 p-2 [&_li]:my-3 [&_li]:px-2 [&_hr]:border-t-2 bg-transparent">
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
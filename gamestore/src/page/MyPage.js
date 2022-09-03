import SpanTextHighlight from "../function/SpanTextHighlight";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MyPage = () => {
  const navigate = useNavigate()
  const [myList, setMyList] = useState('profile')

  const toBack = () => {
    document.body.style.overflow = 'auto'
    navigate(-1);
  }

  const Profile = () => {
    return (
      <div className="w-[calc(100%-12rem)] p-2 sm:p-5 !ml-0 rounded-lg bg-neutral-900">
        <div className="flex justify-center">
          <span>내 정보</span>
        </div>
        <div className="flex flex-col">

          <span className="py-2 text-xl">기본정보</span>
          <div className="flex flex-col p-2 mb-10 border-2 rounded-lg border-neutral-100">
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">아이디</span>
              <span>wnalsals123</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">이메일</span>
              <span>wnalsals12@naver.com</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">닉네임</span>
              <div className="flex items-center justify-between flex-grow">
                <span>줌인중</span>
                <button className="px-2 py-1 text-sm rounded-lg sm:text-base bg-sky-500 !leading-none">변경</button>
              </div>
            </div>
          </div>

          <span className="py-2 text-xl">등급 및 혜택</span>
          <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">회원등급</span>
              <span>브론즈</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">다음 등급</span>
              <span>27/100 000exp</span>
            </div>
            <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
              <div className="flex">
                <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">포인트</span>
                <span>000p</span>
              </div>
              <SpanTextHighlight className={'ml-2 text-sm sm:text-base'} str={`"브론즈"혜택 구매 금액의 1%가 적립됩니다`} highlightText={'브론즈'} highlightColor={'text-sky-500'}></SpanTextHighlight>
            </div>
          </div>

        </div>
      </div>
    )
  }

  const Purchase = () => {
    return(
      <div className="w-[calc(100%-12rem)] p-2 sm:p-5 !ml-0 rounded-lg bg-neutral-900">
      <div className="flex justify-center">
        <span>구매 내역</span>
      </div>
      <div className="flex flex-col">

        <span className="py-2 text-xl">기본정보</span>
        <div className="flex flex-col p-2 mb-10 border-2 rounded-lg border-neutral-100">
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">아이디</span>
            <span>wnalsals123</span>
          </div>
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">이메일</span>
            <span>wnalsals12@naver.com</span>
          </div>
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">닉네임</span>
            <div className="flex items-center justify-between flex-grow">
              <span>줌인중</span>
              <button className="px-2 py-1 text-sm rounded-lg sm:text-base bg-sky-500 !leading-none">변경</button>
            </div>
          </div>
        </div>

        <span className="py-2 text-xl">등급 및 혜택</span>
        <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">회원등급</span>
            <span>브론즈</span>
          </div>
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">다음 등급</span>
            <span>27/100 000exp</span>
          </div>
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <div className="flex">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">포인트</span>
              <span>000p</span>
            </div>
            <SpanTextHighlight className={'ml-2 text-sm sm:text-base'} str={`"브론즈"혜택 구매 금액의 1%가 적립됩니다`} highlightText={'브론즈'} highlightColor={'text-sky-500'}></SpanTextHighlight>
          </div>
        </div>

      </div>
    </div>
    )
  }

  const Review = () => {
    return(
      <div className="w-[calc(100%-12rem)] p-2 sm:p-5 !ml-0 rounded-lg bg-neutral-900">
      <div className="flex justify-center">
        <span>리뷰 관리</span>
      </div>
      <div className="flex flex-col">

        <span className="py-2 text-xl">기본정보</span>
        <div className="flex flex-col p-2 mb-10 border-2 rounded-lg border-neutral-100">
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">아이디</span>
            <span>wnalsals123</span>
          </div>
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">이메일</span>
            <span>wnalsals12@naver.com</span>
          </div>
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">닉네임</span>
            <div className="flex items-center justify-between flex-grow">
              <span>줌인중</span>
              <button className="px-2 py-1 text-sm rounded-lg sm:text-base bg-sky-500 !leading-none">변경</button>
            </div>
          </div>
        </div>

        <span className="py-2 text-xl">등급 및 혜택</span>
        <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">회원등급</span>
            <span>브론즈</span>
          </div>
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">다음 등급</span>
            <span>27/100 000exp</span>
          </div>
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <div className="flex">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">포인트</span>
              <span>000p</span>
            </div>
            <SpanTextHighlight className={'ml-2 text-sm sm:text-base'} str={`"브론즈"혜택 구매 금액의 1%가 적립됩니다`} highlightText={'브론즈'} highlightColor={'text-sky-500'}></SpanTextHighlight>
          </div>
        </div>

      </div>
    </div>
    )
  }

  const Coupon = () => {
    return(
      <div className="w-[calc(100%-12rem)] p-2 sm:p-5 !ml-0 rounded-lg bg-neutral-900">
      <div className="flex justify-center">
        <span>쿠폰함</span>
      </div>
      <div className="flex flex-col">

        <span className="py-2 text-xl">기본정보</span>
        <div className="flex flex-col p-2 mb-10 border-2 rounded-lg border-neutral-100">
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">아이디</span>
            <span>wnalsals123</span>
          </div>
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">이메일</span>
            <span>wnalsals12@naver.com</span>
          </div>
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">닉네임</span>
            <div className="flex items-center justify-between flex-grow">
              <span>줌인중</span>
              <button className="px-2 py-1 text-sm rounded-lg sm:text-base bg-sky-500 !leading-none">변경</button>
            </div>
          </div>
        </div>

        <span className="py-2 text-xl">등급 및 혜택</span>
        <div className="flex flex-col p-2 border-2 rounded-lg border-neutral-100">
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">회원등급</span>
            <span>브론즈</span>
          </div>
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">다음 등급</span>
            <span>27/100 000exp</span>
          </div>
          <div className="flex my-2 border-b-[1px] pb-2 flex-wrap">
            <div className="flex">
              <span className="w-[5rem] sm:w-[8rem] bg-neutral-500 rounded-md px-2 mr-2">포인트</span>
              <span>000p</span>
            </div>
            <SpanTextHighlight className={'ml-2 text-sm sm:text-base'} str={`"브론즈"혜택 구매 금액의 1%가 적립됩니다`} highlightText={'브론즈'} highlightColor={'text-sky-500'}></SpanTextHighlight>
          </div>
        </div>

      </div>
    </div>
    )
  }

  return (
    <div className='fixed top-0 left-0 z-40 w-full h-full'>
      <div className='flex items-center justify-center w-full h-full bg-neutral-500 bg-opacity-70'>
        <div className='relative max-w-screen-lg h-[calc(100%-5rem)] w-screen sm:w-[calc(100%-5rem)] bg-neutral-900 rounded-xl overflow-y-auto scrollbar-hide'>
          <div className='relative flex flex-col w-full h-full p-2 text-base h- sm:p-5 sm:text-lg md:text-xl lg:text-2xl'>

            <div className="flex justify-between p-2 mb-2 rounded-lg sm:p-5 sm:mb-5 itmes-center bg-neutral-100">
              <span>마이페이지</span>
              <div className="flex items-center"><button className="w-5 h-5 bg-no-repeat bg-cover sm:w-7 sm:h-7 bg-close-btn" onClick={toBack}></button></div>
            </div>

            <div className="relative flex items-center justify-start mb-5 text-white">
              <div className="flex items-center">
                <img className="w-10 md:w-12 filter-white" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
                <span className="pl-4 leading-none">Game Store</span>
              </div>
            </div>

            <div className="flex flex-grow text-white border-2 rounded-lg border-neutral-100">
              <ul className="w-[12rem] bg-neutral-900 border-r-2 border-neutral-100 p-2 sm:p-5 [&_li]:my-3 [&_li]:px-2 [&_hr]:border-t-2 bg-transparent">
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
  );
}

export default MyPage;
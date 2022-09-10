import CouponList from "../json/CouponList.json"
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { loginInfo, paymentItem, totalAmount } = location.state
  const userData = JSON.parse(localStorage.getItem("UserData"))
  const temp = userData.filter(item => item.username === loginInfo)
  const user = temp[0]

  const toBack = () => {
    document.body.style.overflow = 'auto'
    navigate('/');
  }

  /* 유저 쿠폰 불러오기 */
  const userCoupon = (userCouponHistory) => {
    let result = []
    for (let i = 0; i < userCouponHistory.length; i++) {
      let temp = CouponList.filter(item => item.쿠폰명 === (userCouponHistory[i]).쿠폰명 && (userCouponHistory[i]).사용 === false)
      result = result.concat(temp)
    }
    return result
  }

  const PaymentItemList = () => {
    return (
      paymentItem.map((item, index) => (
        <div className="flex justify-between text-sm text-white border-[1px] border-t-0 md:text-base lg:text-xl" key={index}>
          <div className="basis-[20%] shrink-0 border-r-[1px] h-[5rem] xsm:h-[6rem] sm:h-[7rem] lg:h-[8rem] p-1"><img className="object-cover w-full h-full" src={item.이미지} alt="game-logo"></img></div>
          <div className="flex justify-center items-center basis-[30%] shrink-0 border-r-[1px]"><span>{item.게임명}</span></div>
          <div className="flex justify-end items-center basis-[25%] shrink-0 border-r-[1px]"><span className="pr-1">{(item.가격).toLocaleString() + "원"}</span></div>
          <div className="flex justify-end items-center basis-[25%] shrink-0"><span className="pr-1">{(item.가격 * (1 - item.할인)).toLocaleString() + "원"}</span></div>
          {item.가격 === 0 && <div className="flex justify-end items-center basis-[45%] shrink-0"><span className="pr-1">무료 플레이</span></div>}
        </div>
      ))
    )
  }

  return (
    <div className='fixed top-0 left-0 z-40 w-full h-full'>
      <div className='flex items-center justify-center w-full h-full bg-neutral-500 bg-opacity-70'>
        <div className='relative max-w-screen-lg max-h-[calc(100%-5rem)] w-screen sm:w-[calc(100%-5rem)] bg-neutral-900 rounded-xl overflow-y-auto scrollbar-hide'>

          <div className='relative w-full h-full p-2 text-base sm:p-5 sm:text-xl md:text-2xl'>

            <div className="sticky top-0 flex justify-between p-2 mb-2 rounded-lg sm:p-5 sm:mb-5 itmes-center bg-neutral-100">
              <span>주문결제</span>
              <div className="flex items-center"><button className="w-5 h-5 bg-no-repeat bg-cover sm:w-7 sm:h-7 bg-close-btn" onClick={toBack}></button></div>
            </div>

            <div className="min-h-[31.25rem] mb-2 sm:mb-5">
              <div className="flex flex-col mb-10">
                <span className="pb-2 text-white">결제목록</span>
                <div className="flex justify-between text-center text-white border-[1px] bg-neutral-500 text-base md:text-xl">
                  <span className="basis-[20%] shrink-0 border-r-[1px]">이미지</span>
                  <span className="basis-[30%] shrink-0 border-r-[1px]">게임명</span>
                  <span className="basis-[25%] shrink-0 border-r-[1px]">가격</span>
                  <span className="basis-[25%] shrink-0">합계</span>
                </div>
                <PaymentItemList></PaymentItemList>
                <div className="flex justify-end"><span className="px-1 text-base text-white md:text-xl">{`총 합계: ${totalAmount.toLocaleString()}원`}</span></div>
              </div>
              
              <div className="flex flex-col mb-10">
                <span className="pb-2 text-white">쿠폰 할인</span>      
                <div className="flex justify-center text-white border-[1px] bg-neutral-500 text-base md:text-xl">
                  <span>사용가능한 쿠폰</span>
                </div>
                {userCoupon(user.쿠폰).length === 0 ?
                  <span className="text-base text-white md:text-xl">사용가능한 쿠폰이 없습니다.</span>
                  :
                  userCoupon(user.쿠폰).map((item, index) => (
                    <div className="flex text-white border-[1px] border-t-0 text-base md:text-xl items-center" key={index}>
                      <span className="px-2">{item.혜택}</span>
                      <button className="w-3 h-3 md:w-4 md:h-4 mr-2 bg-white border-[2px] md:border-[3px] border-white rounded-full outline outline-1 outline-neutral-500 outline-offset-2"></button>
                      <button className="w-3 h-3 md:w-4 md:h-4 mr-2 bg-neutral-900 border-[2px] md:border-[3px] border-white rounded-full outline outline-1 outline-neutral-500 outline-offset-2"></button>
                    </div>
                  ))
                }
              </div>

              <div className="flex flex-col mb-10">
                <div className="flex items-center pb-2">
                  <span className="mr-2 text-white">포인트 할인</span>
                  <span className="px-2 text-sm text-white rounded-md md:text-base bg-neutral-500">{`내 포인트: ${user.point}P`}</span>
                </div>
                <div className="flex justify-between text-center text-white border-[1px] bg-neutral-500 text-base md:text-xl">
                  <input className="basis-[33.33%] border-r-[1px] w-10 px-2 bg-neutral-900 placeholder:text-white placeholder:text-opacity-50 placeholder:text-sm" placeholder="사용할 포인트"></input>
                  <button className="basis-[33.33%] border-r-[1px]">적용</button>
                  <button className="basis-[33.33%] border-r-[1px]">취소</button>
                </div>
              </div>
              
              <div className="flex flex-col mb-10">
                <span className="pb-2 text-white">결제 수단</span>
                <div className="flex justify-between text-center text-white border-[1px] bg-neutral-500 text-base md:text-xl">
                  <span className="basis-[33.33%] border-r-[1px]">신용카드</span>
                  <span className="basis-[33.33%] border-r-[1px]">간편결제</span>
                  <span className="basis-[33.33%] border-r-[1px]">휴대폰</span>
                </div>
              </div>

            </div>

            <div className="sticky bottom-0 p-2 bg-opacity-50 rounded-lg sm:p-5 bg-neutral-100">
              <div className="flex flex-wrap items-center justify-between">
                <span className="p-2 rounded-lg bg-neutral-100">{`최종 결제금액: ${totalAmount.toLocaleString()}원`}</span>
                <button className="p-2 text-white rounded-lg bg-sky-500" onClick={() => (alert("결제완료"))}>결제확인</button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Payment;
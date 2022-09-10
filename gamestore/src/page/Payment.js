import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {


  const location = useLocation()
  const navigate = useNavigate()
  const { user, paymentItem, totalAmount } = location.state

  const toBack = () => {
    document.body.style.overflow = 'auto'
    navigate('/');
  }

  const PaymentItemList = () => {
    return (
      paymentItem.map((item, index) => (
        <div className="flex justify-between text-sm text-white border-[1px] border-t-0 xsm:text-sm md:text-base lg:text-xl" key={index}>
          <div className="basis-[20%] shrink-0 border-r-[1px] h-[5rem] xsm:h-[6rem] sm:h-[7rem] lg:h-[8rem]"><img className="object-cover w-full h-full" src={item.이미지}></img></div>
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
              <span className="text-white">결제목록</span>
              <div className="mb-10">
                <div className="flex justify-between text-center text-white border-[1px] rounded-t-md bg-neutral-500 text-base md:text-xl">
                  <span className="basis-[20%] shrink-0 border-r-[1px]">이미지</span>
                  <span className="basis-[30%] shrink-0 border-r-[1px]">게임명</span>
                  <span className="basis-[25%] shrink-0 border-r-[1px]">가격</span>
                  <span className="basis-[25%] shrink-0">합계</span>
                </div>
                <PaymentItemList></PaymentItemList>
              </div>

              <span className="text-white">쿠폰 할인</span>
              <div className="mb-10">
                <div className="flex justify-between text-center text-white border-[1px] rounded-md bg-neutral-500 text-base md:text-xl">
                  <span className="basis-[50%] border-r-[1px]">사용가능한 쿠폰</span>
                  <button className="basis-[25%] border-r-[1px]">적용</button>
                  <button className="basis-[25%] border-r-[1px]">취소</button>
                </div>
              </div>

              <span className="text-white">포인트 할인</span>
              <div className="mb-10">
                <div className="flex justify-between text-center text-white border-[1px] rounded-md bg-neutral-500 text-base md:text-xl">
                  <span className="basis-[25%] border-r-[1px]">보유 포인트: 123123</span>
                  <input className="basis-[25%] border-r-[1px] w-10" placeholder="포인트 입력"></input>
                  <button className="basis-[25%] border-r-[1px]">적용</button>
                  <button className="basis-[25%] border-r-[1px]">취소</button>
                </div>
              </div>

              <span className="text-white">결제 수단</span>
              <div className="mb-10">
                <div className="flex justify-between text-center text-white border-[1px] rounded-md bg-neutral-500 text-base md:text-xl">
                  <span className="basis-[33.33%] border-r-[1px]">신용카드</span>
                  <span className="basis-[33.33%] border-r-[1px]">간편결제</span>
                  <span className="basis-[33.33%] border-r-[1px]">휴대폰</span>
                </div>
              </div>

            </div>

            <div className="sticky bottom-0 p-2 bg-opacity-50 rounded-lg sm:p-5 bg-neutral-100">
              <div className="flex flex-wrap items-center justify-between">
                <span className="p-2 rounded-lg bg-neutral-100">{`최종 결제금액: ${totalAmount}`}</span>
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
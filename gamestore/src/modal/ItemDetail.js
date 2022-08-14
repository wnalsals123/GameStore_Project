import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ItemDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let temp = {
    게임명 : "null",
    유통사 : "null",
    설명 : "null",
    이미지 : "null",
    동영상 : "null",
    가격 : 0,
    할인 : false,
    신작 : false,
    출시일 : "null",
    태그 : {오픈월드 : false, 멀티플레이 : false, 협동 : false, 액션 : false, 공포 : false, 좀비 : false, 어드벤처 : false, 스포츠 : false, 리듬 : false, 인디 : false, MMORPG : false, FPS : false}
  }

  const item = location.state === null ? temp : location.state.item

  useEffect(()=>{
    document.body.style.overflow = 'hidden'
  }, [])

  const toHome = () => {
    document.body.style.overflow = 'auto'
    navigate("/");
  }

  return (
    <div className='absolute top-0 left-0 w-full h-full z-50'>
      {item.게임명 === 'null' && <Navigate to="/games/NotFound" replace={true}/>}
      <div className='flex justify-center items-center w-full h-full bg-neutral-500 bg-opacity-70'>
        <div className='relative max-w-screen-lg w-[calc(100%-5rem)] h-[calc(100%-5rem)] bg-neutral-900 rounded-xl'>

          <div className='relative w-full h-full sm:p-5 overflow-auto scrollbar-hide'>

            <div className='sticky top-0 mb-5 p-2 sm:p-5 bg-neutral-100 rounded-lg'>
              <span className='block w-fit text-xl sm:text-3xl px-2'>{item.게임명}</span>
              <button className="absolute top-3 sm:top-6 right-3 sm:right-6 w-5 h-5 bg-close-btn bg-no-repeat bg-cover sm:w-7 sm:h-7" onClick={toHome}></button>
            </div>

            <iframe className='w-full aspect-video rounded-lg shadow-lg mb-5' src={item.동영상} title="YouTube video player" frameBorder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>

            <div className="min-h-full text-white">
              <span>{item.유통사}</span>
              <span>{item.출시일}</span>
            </div>

            <div className='sticky bottom-0 flex justify-evenly text-center text-xl sm:text-3xl md-text-2xl text-white pt-5'>
              {item.가격 === 0 && <span className='block w-full sm:w-1/4 h-fit py-2 sm:py-5 bg-red-500 rounded-xl'>무료 플레이</span>}
              <span className='block w-full sm:w-1/4 h-fit py-2 sm:py-5 bg-red-500 rounded-xl' style={{ textDecoration: item.할인 !== false && "line-through", display: item.가격 === 0 && "none" }}>{(item.가격).toLocaleString() + "원"}</span>
              {item.할인 !== false && <span className='block w-full sm:w-1/4 h-fit py-2 sm:py-5 bg-red-500 rounded-xl'>{(item.가격 * (1 - item.할인)).toLocaleString() + "원"}</span>}
              <button className='w-full sm:w-1/4 h-fit py-2 sm:py-5 bg-sky-500 rounded-xl'>장바구니</button>
              <button className='w-full sm:w-1/4 h-fit py-2 sm:py-5 bg-sky-500 rounded-xl'>구매하기</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
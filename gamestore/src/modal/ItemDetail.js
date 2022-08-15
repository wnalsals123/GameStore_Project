import { useEffect } from "react";
import { Navigate, useLocation, useNavigate, useOutletContext } from "react-router-dom";

const ItemDetail = () => {
  const [cart, setCart] = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();

  let temp = {
    게임명: "null",
    유통사: "null",
    설명: "null",
    이미지: "null",
    동영상: "null",
    가격: 0,
    할인: false,
    신작: false,
    출시일: "null",
    태그: { 오픈월드: false, 멀티플레이: false, 협동: false, 액션: false, 공포: false, 좀비: false, 어드벤처: false, 스포츠: false, 리듬: false, 인디: false, MMORPG: false, FPS: false }
  }

  const item = location.state === null ? temp : location.state.item

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  const toHome = () => {
    document.body.style.overflow = 'auto'
    navigate("/");
  }

  const Tag = () => {
    const tagStyle = 'bg-neutral-500 rounded-lg px-3 mr-2 sm:mr-5 mb-2 sm:mb-5'
    return (
      <div className="flex flex-wrap">
        {item.신작 && <span className={`!bg-violet-500 ${tagStyle}`}>NEW</span>}
        {item.할인 !== false && <span className={`!bg-sky-500 ${tagStyle}`}>{((item.할인) * 100).toFixed() + "%OFF"}</span>}
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

  const GameInfo = () => {
    const infoStyle = 'border-b-[1px] border-neutral-100 mb-2'
    return (
      <div className="flex flex-col bg-neutral-100 rounded-lg mb-2 sm:mb-5 p-2 sm:p-5">
        <span className="bg-orange-500 rounded-lg p-2 mb-2">게임정보</span>
        <div className="flex flex-col bg-neutral-500 rounded-lg p-2">
          <span className={`${infoStyle}`}>게임명 : {item.게임명}</span>
          <span className={`${infoStyle}`}>유통사 : {item.유통사}</span>
          <span className={`${infoStyle}`}>출시일 : {item.출시일}</span>
        </div>
      </div>
    )
  }

  const GameEx = () => {
    return (
      <div className="flex flex-col bg-neutral-100 rounded-lg mb-2 sm:mb-5 p-2 sm:p-5">
        <span className="rounded-lg p-2 text-black">{item.설명}</span>
      </div>
    )
  }

  const gamePrice = () => {
    if(item.가격 === 0) {
      return "무료 플레이"
    } else if(item.할인 !== false) {
      return (item.가격 * (1 - item.할인)).toLocaleString() + "원"
    } else {
      return (item.가격).toLocaleString() + "원"
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full z-50'>
      {item.게임명 === 'null' && <Navigate to="/games/NotFound" replace={true} />}
      <div className='flex justify-center items-center w-full h-full bg-neutral-500 bg-opacity-70'>
        <div className='relative max-w-screen-lg w-[calc(100%-5rem)] h-[calc(100%-5rem)] bg-neutral-900 rounded-xl'>

          <div className='relative w-full h-full p-2 sm:p-5 overflow-auto scrollbar-hide text-md sm:text-2xl'>

            <div className='sticky top-0 mb-2 sm:mb-5 p-2 sm:p-5 bg-neutral-100 rounded-lg'>
              <span className='block text-xl sm:text-3xl'>{item.게임명}</span>
              <div className="flex items-center h-full absolute top-0 right-0 p-2 sm:p-5">
                <button className="w-5 h-5 bg-close-btn bg-no-repeat bg-cover sm:w-7 sm:h-7" onClick={toHome}></button>
              </div>
            </div>

            <div className="flex mb-2 sm:mb-5">
              <div className="block w-full">
                <div className="mb-2 sm:mb-5"><img className='w-full rounded-lg object-cover' src={item.이미지} alt='game-logo'></img></div>
                <iframe className='w-full aspect-video rounded-lg shadow-lg' src={item.동영상} title="YouTube video player" frameBorder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
              </div>
            </div>

            <div className="leading-normal text-white mb-2 sm:mb-5">
              <Tag></Tag>
              <GameInfo></GameInfo>
              <GameEx></GameEx>
            </div>

            <div className='sticky bottom-0 left-0 flex justify-between w-full bg-neutral-100 p-2 sm:p-5 rounded-lg bg-opacity-50 text-center text-white text-sm sm:text-2xl'>
              <div className="w-5/12 py-1 sm:py-5 bg-red-500 rounded-xl">
                {item.할인 !== false &&<span className="block sm:inline-block line-through">{(item.가격).toLocaleString() + "원"}</span>}
                <span>{gamePrice()}</span>
              </div>
              <button className='w-3/12 py-1 sm:py-5 bg-sky-500 rounded-xl' onMouseDown={() => { setCart(cart + 1) }}>장바구니</button>
              <button className='w-3/12 py-1 sm:py-5 bg-sky-500 rounded-xl'>구매하기</button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
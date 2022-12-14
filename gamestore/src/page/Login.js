import { useEffect } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { setCookie } from "../function/Cookie";

/* 로그인 페이지 */
const Login = () => {
  const navigate = useNavigate()
  const { isLogin, setIsLogin } = useOutletContext()
  const userData = JSON.parse(localStorage.getItem('UserData'))

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  /* 뒤로가기 */
  const toBack = () => {
    document.body.style.overflow = 'auto'
    JSON.parse(sessionStorage.getItem('FirstPage')) ? navigate('/') : navigate(-1);
  }

  /* 회원가입으로 이동 */
  const toSignUp = () => {
    document.body.style.overflow = 'auto'
    navigate("/signup");
  }

  /* 로그인 요청 */
  const toLogin = () => {
    const id = document.getElementById('id').value
    const password = document.getElementById('password').value
    const userInfo = userData.filter((user) => (user.username === id))

    if (id === '' || password === '') {
      alert("잘못된 입력입니다!")
      return
    }

    if (userData === null) {
      alert("회원가입이 필요합니다!")
      return
    }

    if (userInfo.length === 0) {
      alert("가입된 회원이 아니거나 비밀번호 오류입니다!")
      return
    }

    const isPassWordOk = password === userInfo[0].password

    if (isPassWordOk) {
      localStorage.setItem("LoginInfo", id)
      setCookie('LoginSession', true, 0)
      setIsLogin(true)
      navigate(-1)
    } else {
      alert("가입된 회원이 아니거나 비밀번호 오류입니다!")
    }
  }

  /* 로그인 엔터키 리스너 */
  const enterLogin = (e) => {
    if (e.key === 'Enter') toLogin()
  }

  return (
    <>
      {isLogin ? <Navigate to="/"></Navigate> :
        <div className='fixed top-0 left-0 z-50 w-full h-full'>
          <div className='flex items-center justify-center w-full h-full bg-neutral-500 bg-opacity-70'>
            <div className='relative w-[calc(100%-2rem)] max-w-screen-sm border-2 bg-neutral-900 rounded-xl border-neutral-100'>

              <div className="flex flex-col text-base text-white sm:text-2xl">

                <div className="relative flex items-center justify-between m-5 mb-0">
                  <div className="flex items-center">
                    <img className="w-10 md:w-12 filter-white" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
                    <span className="pl-4 leading-none">Game Store</span>
                  </div>
                  <button className="w-6 h-6 bg-no-repeat bg-cover sm:w-7 sm:h-7 bg-close-btn filter-white" onClick={toBack}></button>
                </div>

                <input className="p-3 m-5 mb-0 text-black rounded-md" onKeyUp={enterLogin} placeholder="아이디" id='id' autoComplete="off"></input>
                <input className="p-3 m-5 mb-0 text-base text-black rounded-md sm:text-2xl" onKeyUp={enterLogin} type="password" placeholder="비밀번호" id='password' autoComplete="off"></input>
                <button className="p-2 m-5 mb-0 rounded-md bg-sky-500" onClick={toLogin}>로그인</button>
                <button className="p-2 m-5 bg-red-500 rounded-md" onClick={toSignUp}>회원가입</button>

              </div>

            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Login;
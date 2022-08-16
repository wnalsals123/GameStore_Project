import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])


  const toHome = () => {
    document.body.style.overflow = 'auto'
    navigate("/");
  }

  return (
    <div className='fixed top-0 left-0 z-50 w-full h-full'>
      <div className='flex items-center justify-center w-full h-full bg-neutral-500 bg-opacity-70'>
        <div className='relative w-screen border-2 sm:max-w-lg bg-neutral-900 rounded-xl border-neutral-100'>

          <div className="flex flex-col text-xl text-white sm:text-3xl ">

            <div className="relative flex items-center justify-between m-5 mb-0">
              <div className="flex items-center">
                <img className="w-10 md:w-12 filter-white" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
                <span className="pl-4 leading-none">Game Store</span>
              </div>
              <button className="w-6 h-6 bg-no-repeat bg-cover sm:w-7 sm:h-7 bg-close-btn filter-white" onClick={toHome}></button>
            </div>
            <input className="p-3 m-5 mb-0 text-black rounded-md" placeholder="아이디"></input>
            <input className="p-3 m-5 mb-0 text-black rounded-md" placeholder="비밀번호"></input>
            <button className="p-2 m-5 mb-0 rounded-md bg-sky-500">로그인</button>
            <button className="p-2 m-5 bg-red-500 rounded-md">회원가입</button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
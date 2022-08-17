import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  const toBack = () => {
    document.body.style.overflow = 'auto'
    navigate(-1);
  }
  // 입력값 확인 state
  const [inputValue, setInputValue] = useState({
    username: '',
    password: '',
    passwordOk: '',
    email: '',
    nickname: '',
  });

  const { username, password, passwordOk, email, nickname } = inputValue;

  // 아이디  전체 4자 이상일것. 소문자와 숫자 
  const isVaildUsername = username.length >= 4 && username.search(/[^a-z0-9]/g) === -1
  // 비밀번호 특수문자 검사를 위한 정규식표현.
  const specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/g);
  // 비밀번호 특수문자 1자 이상, 전체 8자 이상일것.
  const isValidPassword = password.length >= 8 && specialLetter > -1;
  // 비밀번호 동일여부
  const isSamePassword = passwordOk === password;
  // 이메일 '@', '.' 이 둘다 포함될것.
  const isValidEmail = email.includes('@') && email.includes('.');
  // 닉네임 한글 영문 숫자
  const isValidNickname = nickname.length >= 2 && nickname.search(/[^a-zA-Zㄱ-ㅎ가-힣0-9]/g) === -1

  // 입력값 onChange
  const handleInput = (e) => {
    let { name, value } = e.target;
    const noBlank = value.replace(/\s/gi, "");
    const maxLength = name === 'email' ? 30 : 15

    let result;
    result = "";

    for (let i = 0; i < noBlank.length && i < maxLength; i++) {
      result += noBlank[i];
    }

    e.target.value = result

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const summitForm = () => {
    console.log(username, password, passwordOk, email, nickname)
    console.log(isVaildUsername, isValidPassword, isSamePassword, isValidEmail, isValidNickname)
  }

  return (
    <div className='fixed top-0 left-0 z-50 w-full h-full'>
      <div className='flex items-center justify-center w-full h-full bg-neutral-500 bg-opacity-70'>
        <div className='relative max-w-screen-lg w-full sm:w-[calc(100%-5rem)] h-full sm:h-[calc(100%-5rem)] border-2 rounded-xl border-neutral-100 bg-neutral-900'>

          <div className="w-full h-full p-2 sm:p-5">
            <div className="relative flex flex-col w-full h-full text-xl text-white sm:text-3xl">

              <div className="relative flex items-center justify-center mb-5">
                <div className="flex items-center">
                  <img className="w-10 md:w-12 filter-white" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
                  <span className="pl-4 leading-none">회원가입</span>
                </div>

                <button className="absolute top-0 right-0 w-auto h-full bg-no-repeat bg-cover sm:w-7 sm:h-7 bg-close-btn filter-white" onClick={toBack}></button>
              </div>

              <div className="flex mb-5">
                <div className="relative flex items-center basis-3/4">
                  <input className="w-full h-full px-5 text-black rounded-md" placeholder="아이디" name="username" onChange={handleInput}></input>
                  <div className="absolute top-0 right-0 flex items-center h-full p-2"><span className="z-50 p-2 text-base leading-none text-white rounded-lg bg-neutral-500">잘못된 값을 입력하셨습니다!</span></div>
                </div>
                <span className="ml-5 basis-1/4">4~15자리 소문자와 숫자 조합</span>
              </div>
              <div className="flex mb-5">
                <input className="px-5 text-black rounded-md basis-3/4" placeholder="비밀번호" name="password" onChange={handleInput}></input>
                <span className="ml-5 basis-1/4">8~15자리 특수문자 포함, 영문자와 숫자 조합</span>
              </div>
              <div className="flex mb-5">
                <input className="px-5 text-black rounded-md basis-3/4" placeholder="비밀번호 확인" name="passwordOk" onChange={handleInput}></input>
                <span className="ml-5 basis-1/4">비밀번호 다시입력</span>
              </div>
              <div className="flex mb-5">
                <input className="px-5 text-black rounded-md basis-3/4" placeholder="이메일" name="email" onChange={handleInput}></input>
                <span className="ml-5 basis-1/4">이메일 입력</span>
              </div>
              <div className="flex mb-5">
                <input className="px-5 text-black rounded-md basis-3/4" placeholder="별명" name="nickname" onChange={handleInput}></input>
                <span className="ml-5 basis-1/4">2자~15자리 특수문자 제외, 영문자, 한글, 숫자</span>
              </div>
              <textarea className="p-5 text-black rounded-md" placeholder="자기소개"></textarea>

              <div className="flex">
                <button onClick={summitForm}>회원가입</button>
              </div>

              <div className="absolute bottom-0 left-0 flex items-center">
                <img className="w-8 sm:w-12 filter-white" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
                <span className="pl-2 text-lg leading-none sm:text-2xl sm:pl-4">Game Store</span>
              </div>
              <div className="absolute bottom-0 right-0 flex items-center">
                <span className="text-sm sm:text-base">JU MINJONG</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignUp;
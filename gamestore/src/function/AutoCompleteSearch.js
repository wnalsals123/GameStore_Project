import { useEffect, useState } from "react";

function korPattern(ch) {
  const offset = 44032; /* '가'의 코드 */
  // 한국어 음절
  if (/[가-힣]/.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset;
    // 종성이 있으면 문자 그대로를 찾는다.
    if (chCode % 28 > 0) {
      return ch;
    }
    const begin = Math.floor(chCode / 28) * 28 + offset;
    const end = begin + 27;
    return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }
  // 한글 자음
  if (/[ㄱ-ㅎ]/.test(ch)) {
    const con2syl = {
      'ㄱ': '가'.charCodeAt(0),
      'ㄲ': '까'.charCodeAt(0),
      'ㄴ': '나'.charCodeAt(0),
      'ㄷ': '다'.charCodeAt(0),
      'ㄸ': '따'.charCodeAt(0),
      'ㄹ': '라'.charCodeAt(0),
      'ㅁ': '마'.charCodeAt(0),
      'ㅂ': '바'.charCodeAt(0),
      'ㅃ': '빠'.charCodeAt(0),
      'ㅅ': '사'.charCodeAt(0),
    };
    const begin = con2syl[ch] || ( ( ch.charCodeAt(0) - 12613 /* 'ㅅ'의 코드 */ ) * 588 + con2syl['ㅅ'] );
    const end = begin + 587;
    return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }
  // 그 외엔 그대로 내보냄
  return (ch);
}

function createFuzzyMatcher(input) {
  const pattern = input.split('').map(korPattern).join('.*?');
  return new RegExp(pattern);
}

const AutoCompleteSearch = () => {
  const [inputValue, setInputValue] = useState('')
  const [isHaveInputValue, setIsHaveInputValue] = useState(false)
  const [dropDownList, setDropDownList] = useState([])
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)

  const showDropDownList = () => {
    if (inputValue === '') {
      setIsHaveInputValue(false)
      setDropDownList([])
    } else {
      const gameList = JSON.parse(localStorage.getItem('GameList'))
      let wholeTextArray = []
      
      for(let i = 0; i < gameList.length; i++){
        wholeTextArray = wholeTextArray.concat(gameList[i].게임명)
      }

      const regex = createFuzzyMatcher(inputValue.toLowerCase());
      const choosenTextList = wholeTextArray.filter(item => regex.test(item.toLowerCase()))
      
      setDropDownList(choosenTextList)
    }
  }

  const changeInputValue = event => {
    setInputValue(event.target.value)
    event.target.value !== "" ? setIsHaveInputValue(true) : setIsHaveInputValue(false)
  }

  const clickDropDownItem = clickedItem => {
    setInputValue(clickedItem)
    setIsHaveInputValue(false)
  }

  const handleDropDownKey = event => {
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (
        event.key === 'ArrowDown' &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1)
      }

      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1)
      if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex])
        setDropDownItemIndex(-1)
      }
    }
  }

  const blurAuto = () => {
    setIsHaveInputValue(false)
  }

  useEffect(showDropDownList, [inputValue])

  const Result = () => {
    return (
      <ul className="absolute top-[85%] -left-[2px] w-[16rem] bg-white border-2 border-neutral-900 rounded-b-lg border-t-0 py-2">
        {dropDownList.map((dropDownItem, dropDownIndex) => (
          <li key={dropDownIndex} onMouseDown={() => clickDropDownItem(dropDownItem)} className={`!leading-none pl-[2.575rem] py-2 hover:bg-neutral-200`}>
            {dropDownItem}
          </li>))}
      </ul>
    )
  }

  return (
    <div className="relative flex items-center w-full h-full bg-white border-2 rounded-lg border-neutral-900">
      <div className="w-[10%] mx-2 z-10"><img className="object-cover w-full h-full" src="https://cdn-icons-png.flaticon.com/512/622/622669.png" alt="search-img"></img></div>
      <input className="h-[90%] w-[80%] focus:outline-none z-10" placeholder="게임 검색" value={inputValue} onChange={changeInputValue} onKeyUp={handleDropDownKey} onFocus={changeInputValue} onBlur={blurAuto}></input>
      {isHaveInputValue && <Result></Result>}
    </div>
  )
}

export default AutoCompleteSearch;
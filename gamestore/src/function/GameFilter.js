const GameFilter = (props) => {
  const { setIsFilter } = props
  const buttonFilter = 'flex items-center border-2 rounded-md mb-1 bg-neutral-500 px-2'
  const checkboxFilter = 'scale-110 mr-2 rounded-sm cursor-pointer !border-2 !border-neutral-100 !bg-neutral-500 !ring-offset-0 !ring-0 !outline-0'
  const gameTag = ['오픈월드', '멀티플레이', '협동', '액션', '공포', '좀비', '어드벤처', '스포츠', 'MMORPG', 'FPS']

  const checkboxClick = (id) => {
    const checkbox = document.getElementById(id)
    checkbox.checked = !checkbox.checked
  }

  const confirm = () => {
    setIsFilter(true)
    console.log('필터 적용!')
  }

  const reset = () => {
    for(let i=0; i<gameTag.length; i++){
      const checkbox = document.getElementById(gameTag[i])
      checkbox.checked = false
    }
    setIsFilter(false)
  }

  return (
    <div>
      <span className="block px-2 mb-3 rounded-md bg-sky-500">게임 필터</span>
      <div className="flex flex-col">
        <button className={buttonFilter} onClick={() => { checkboxClick('오픈월드') }}><input className={checkboxFilter} onClick={() => { checkboxClick('오픈월드') }} type='checkbox' id="오픈월드"></input><span>오픈월드</span></button>
        <button className={buttonFilter} onClick={() => { checkboxClick('멀티플레이') }}><input className={checkboxFilter} onClick={() => { checkboxClick('멀티플레이') }} type='checkbox' id="멀티플레이"></input><span>멀티플레이</span></button>
        <button className={buttonFilter} onClick={() => { checkboxClick('협동') }}><input className={checkboxFilter} onClick={() => { checkboxClick('협동') }} type='checkbox' id="협동"></input><span>협동</span></button>
        <button className={buttonFilter} onClick={() => { checkboxClick('액션') }}><input className={checkboxFilter} onClick={() => { checkboxClick('액션') }} type='checkbox' id="액션"></input><span>액션</span></button>
        <button className={buttonFilter} onClick={() => { checkboxClick('공포') }}><input className={checkboxFilter} onClick={() => { checkboxClick('공포') }} type='checkbox' id="공포"></input><span>공포</span></button>
        <button className={buttonFilter} onClick={() => { checkboxClick('좀비') }}><input className={checkboxFilter} onClick={() => { checkboxClick('좀비') }} type='checkbox' id="좀비"></input><span>좀비</span></button>
        <button className={buttonFilter} onClick={() => { checkboxClick('어드벤처') }}><input className={checkboxFilter} onClick={() => { checkboxClick('어드벤처') }} type='checkbox' id="어드벤처"></input><span>어드벤처</span></button>
        <button className={buttonFilter} onClick={() => { checkboxClick('스포츠') }}><input className={checkboxFilter} onClick={() => { checkboxClick('스포츠') }} type='checkbox' id="스포츠"></input><span>스포츠</span></button>
        <button className={buttonFilter} onClick={() => { checkboxClick('MMORPG') }}><input className={checkboxFilter} onClick={() => { checkboxClick('MMORPG') }} type='checkbox' id="MMORPG"></input><span>MMORPG</span></button>
        <button className={buttonFilter} onClick={() => { checkboxClick('FPS') }}><input className={checkboxFilter} onClick={() => { checkboxClick('FPS') }} type='checkbox' id="FPS"></input><span>FPS</span></button>
        <div className="flex">
          <button className="flex-1 m-2 mb-0 rounded-md bg-sky-500" onClick={confirm}>적용</button>
          <button className="flex-1 m-2 mb-0 bg-red-500 rounded-md" onClick={reset}>해제</button>
        </div>
      </div>
    </div>
  )
}

export default GameFilter
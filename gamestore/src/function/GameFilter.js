const GameFilter = (props) => {
  const { setIsFilter } = props
  const buttonFilter = 'flex items-center border-2 rounded-md mb-1 bg-neutral-500 px-2 py-1'
  const checkboxFilter = 'scale-110 mr-2 rounded-sm cursor-pointer !border-2 !border-neutral-100 !bg-neutral-500 !ring-offset-0 !ring-0 !outline-0'
  const gameTag = ['오픈월드', '멀티플레이', '협동', '액션', '공포', '좀비', '어드벤처', '스포츠', 'MMORPG', 'FPS']

  const checkboxClick = (id) => {
    setIsFilter(false)
    const checkbox = document.getElementById(id)
    checkbox.checked = !checkbox.checked
  }

  const confirm = () => {
    setIsFilter(true)
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
      <span className="block px-2 py-1 mb-3 rounded-md bg-sky-500">게임 필터</span>
      <div className="flex flex-col">
        {gameTag.map((item, index) => <button key={index} className={buttonFilter} onClick={() => { checkboxClick(item) }}><input className={checkboxFilter} onClick={() => { checkboxClick(item) }} type='checkbox' id={item}></input><span>{item}</span></button>)}
        <div className="flex">
          <button className="flex-1 py-1 m-2 mb-0 rounded-md bg-sky-500" onClick={confirm}>적용</button>
          <button className="flex-1 py-1 m-2 mb-0 bg-red-500 rounded-md" onClick={reset}>해제</button>
        </div>
      </div>
    </div>
  )
}

export default GameFilter
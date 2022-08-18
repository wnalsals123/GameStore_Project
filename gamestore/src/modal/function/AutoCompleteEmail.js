import { useEffect, useRef, useState } from "react"

const AutoCompleteEmail = (props) => {
  const { textValue, setTextValue } = props

  const [inputValue, setInputValue] = useState('')
  const [isHaveInputValue, setIsHaveInputValue] = useState(false)
  const [dropList, setDropList] = useState([])
  let resultTextArray = useRef([])

  useEffect(() => {
    setInputValue(textValue)
  }, [textValue])

  useEffect(() => {
    const mailList = ['naver.com', 'gmail.com', 'daum.net', 'nate.com', 'hanmail.net']

    if (inputValue.search(/@/g) === -1) {
      resultTextArray.current = []
      setIsHaveInputValue(false)
      return
    }

    if (inputValue.search(/@/g) > -1 && resultTextArray.current.length === 0) {
      resultTextArray.current = mailList.map(textItem => inputValue + textItem)
      setDropList(resultTextArray.current)
      setIsHaveInputValue(true)
    } else {
      const choosenTextList = resultTextArray.current.filter(textItem => textItem.includes(inputValue))
      setDropList(choosenTextList)
      setIsHaveInputValue(true)
    }
  }, [inputValue])

  const clickDropDownItem = clickedItem => {
    setInputValue(clickedItem)
    setIsHaveInputValue(false)
  }

  const DropDown = () => {
    return (
      dropList.map((dropDownItem, dropDownIndex) => (
        <li className="px-2 py-2 list-none cursor-pointer sm:px-5 hover:text-sky-500" key={dropDownIndex} onClick={() => clickDropDownItem(dropDownItem)}>{dropDownItem}</li>
      ))
    )
  }

  return (
    <div className={`${isHaveInputValue ? 'block' : 'hidden'} absolute left-0 z-50 w-full max-h-40 overflow-auto text-black bg-white border-2 rounded-lg border-neutral-500 top-full`}>
      {isHaveInputValue && <DropDown></DropDown>}
    </div>
  )
}

export default AutoCompleteEmail;
import { useEffect, useRef, useState } from "react"

const AutoCompleteEmail = (props) => {
  const { tempEmail, inputValue, setInputValue, isVaild, setIsVaild, isDuplicate, setIsDuplicate, userData, emailRef } = props

  const [isHaveInputValue, setIsHaveInputValue] = useState(false)
  const [dropList, setDropList] = useState([])
  let resultTextArray = useRef([])

  useEffect(() => {
    const mailList = ['naver.com', 'gmail.com', 'daum.net', 'nate.com', 'hanmail.net']

    if (tempEmail.search(/@/g) === -1) {
      resultTextArray.current = []
      setIsHaveInputValue(false)
      return
    }

    if (tempEmail.search(/@/g) > -1 && resultTextArray.current.length === 0) {
      resultTextArray.current = mailList.map(textItem => tempEmail + textItem)
      setDropList(resultTextArray.current)
      setIsHaveInputValue(true)
    } else {
      const choosenTextList = resultTextArray.current.filter(textItem => textItem.includes(tempEmail))
      setDropList(choosenTextList)
      setIsHaveInputValue(true)
    }
  }, [tempEmail])

  const clickDropDownItem = clickedItem => {
    emailRef.current.value = clickedItem
    setInputValue({ ...inputValue, email: clickedItem })
    setIsVaild({ ...isVaild, V_email: true })
    userData.filter((index) => (index.email === clickedItem)).length === 0 ? setIsDuplicate({ ...isDuplicate, D_email: false }) : setIsDuplicate({ ...isDuplicate, D_email: true })
    setIsHaveInputValue(false)
  }

  const DropDown = () => {
    return (
      dropList.map((dropDownItem, dropDownIndex) => (
        <button className="w-full px-2 py-2 text-left list-none cursor-pointer sm:px-5 hover:text-sky-500" key={dropDownIndex} onClick={() => clickDropDownItem(dropDownItem)}>{dropDownItem}</button>
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
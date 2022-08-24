import SideBarContent from "./SideBarContent"
import { useEffect, useState } from "react"

const SideBar = (props) => {
  const { sideIsOpen, isLogin, setIsLogin } = props
  const [sideBarAni, setSideBarAni] = useState(false)

  useEffect(() => {
    let timer = null

    if (sideIsOpen) {
      setSideBarAni(true)
    } else {
      timer = setTimeout(() => { setSideBarAni(false) }, 395)
    }

    return () => { clearTimeout(timer) }
  }, [sideIsOpen])

  return (
    <div className="relative 3xl:hidden">
      <div className={`absolute top-0 left-0 shadow-xl shadow-sky-500 ${sideIsOpen && sideBarAni && 'animate-sideBarIn'} ${!sideIsOpen && 'animate-sideBarOut'}`}>
        {sideBarAni && <SideBarContent isLogin={isLogin} setIsLogin={setIsLogin}></SideBarContent>}
      </div>
    </div>
  )
}

export default SideBar;
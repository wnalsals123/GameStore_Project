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
      timer = setTimeout(() => { setSideBarAni(false) }, 390)
    }

    return () => { clearTimeout(timer) }
  }, [sideIsOpen])

  return (
    <div className="relative md:hidden">
      <div className={`absolute top-0 shadow-xl shadow-sky-500 ${sideIsOpen && sideBarAni && 'animate-sideBarIn -left-[100vw] sm:-left-80'} ${!sideIsOpen && 'animate-sideBarOut left-0'}`}>
        {sideBarAni && <SideBarContent isLogin={isLogin} setIsLogin={setIsLogin}></SideBarContent>}
      </div>
    </div>
  )
}

export default SideBar;
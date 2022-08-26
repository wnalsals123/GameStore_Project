import SideBarContent from "./SideBarContent"
import { useEffect, useState } from "react"

const SideBar = (props) => {
  const { sideIsOpen, isLogin, setIsLogin, category, setCategory, setLoading } = props
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
    <div className="relative 3xl:hidden">
      <div className={`absolute top-0 shadow-xl shadow-sky-500 ${sideIsOpen && sideBarAni && 'animate-sideBarIn -left-[100vw] sm:-left-80'} ${!sideIsOpen && 'animate-sideBarOut left-0'}`}>
        {sideBarAni && <SideBarContent isLogin={isLogin} setIsLogin={setIsLogin} category={category} setCategory={setCategory} setLoading={setLoading}></SideBarContent>}
      </div>
    </div>
  )
}

export default SideBar;
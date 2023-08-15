import { useContext } from "react"
import { appContext } from "../Contexts"


function DarkModeSwitch() {
    const { darkMode, setDarkMode } = useContext(appContext)

    const toggleMode = () => {
        if (darkMode) document.documentElement.classList.remove('dark')
        else document.documentElement.classList.add('dark')
        setDarkMode(!darkMode)
    }
    

  return (
    <button onClick={() => toggleMode()} className='fixed overflow-hidden grid right-5 grid-cols-1 grid-rows-1 top-5 material-symbols-rounded p-3 bg-zinc-100 dark:bg-white/10 rounded-full z-50'>
      <span style={{transform: `translateY(${darkMode ? '150%' : '0'}) rotate(${darkMode ? 180 : 0}deg)`, opacity: darkMode ? 0 : 1 }} className="material-symbols-rounded row-start-1 col-start-1 duration-500">light_mode</span>
      <span style={{transform: `translateY(${darkMode ? '0%' : '-150%'}) rotate(${darkMode ? 0 : -180}deg)`, opacity: darkMode ? 1 : 0 }} className="material-symbols-rounded row-start-1 col-start-1 duration-500">dark_mode</span>
    </button>
  )
}

export default DarkModeSwitch
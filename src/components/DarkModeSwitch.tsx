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
    <button onClick={() => toggleMode()} className='fixed right-5 top-5 material-symbols-rounded p-3 bg-zinc-100 dark:bg-white/10 rounded-full z-50'>{darkMode ? 'light_mode' : 'dark_mode'}</button>
  )
}

export default DarkModeSwitch
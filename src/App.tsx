import { Outlet } from "react-router-dom";
import "./App.css";
import Icon from "./assets/Icon";
import { appContext, audioContext } from "./Contexts";
import { Suspense, lazy, useState } from "react";
import OverlayState from "./Enums";
import GestureInstructions from "./components/GestureInstructions";
import AudioControls from "./components/AudioControls";
import DarkModeSwitch from "./components/DarkModeSwitch";

const OverlayContainer = lazy(() => import("./components/overlays/OverlayContainer"));

function App() {
  const [overlay, setOverlay] = useState<OverlayState>(OverlayState.null);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);


  return (
    <>
      <div className="absolute left-5 top-5 z-20 text-center tracking-widest flex flex-col font-mono gap-1 uppercase">
        <Icon />
        Code
      </div>
      {overlay === OverlayState.null && <GestureInstructions />}
      <audioContext.Provider
        value={{isPlaying, setIsPlaying }}
      >
        <AudioControls />
        <appContext.Provider value={{ overlay, setOverlay, darkMode, setDarkMode }}>
          <DarkModeSwitch />
          <Suspense fallback={null}>{overlay !== OverlayState.null && <OverlayContainer />}</Suspense>
          <Outlet />
        </appContext.Provider>
      </audioContext.Provider>
    </>
  );
}

export default App;

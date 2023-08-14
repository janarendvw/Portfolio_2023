import { Outlet } from "react-router-dom";
import "./App.css";
import Icon from "./assets/Icon";
import { appContext, audioContext } from "./Contexts";
import { useState } from "react";
import OverlayState from "./Enums";
import OverlayContainer from "./components/overlays/OverlayContainer";
import GestureInstructions from "./components/GestureInstructions";
import AudioControls from "./components/AudioControls";
import DarkModeSwitch from "./components/DarkModeSwitch";

function App() {
  const [overlay, setOverlay] = useState<OverlayState>(OverlayState.null);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <>
      <div className="absolute left-5 top-5 z-20 text-center tracking-widest flex flex-col font-mono gap-1 uppercase">
        <Icon />
        Code
      </div>
      {overlay === OverlayState.null && <GestureInstructions />}
      <audioContext.Provider
        value={{ audio, setAudio, isPlaying, setIsPlaying }}
      >
        {audio && <AudioControls />}
        <appContext.Provider value={{ overlay, setOverlay, darkMode, setDarkMode }}>
          <DarkModeSwitch />
          {overlay !== OverlayState.null && <OverlayContainer />}
          <Outlet />
        </appContext.Provider>
      </audioContext.Provider>
    </>
  );
}

export default App;

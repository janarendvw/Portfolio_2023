import { Outlet } from "react-router-dom";
import "./App.css";
import Icon from "./assets/Icon";
import { appContext, audioContext } from "./Contexts";
import { useState } from "react";
import OverlayState from "./Enums";
import OverlayContainer from "./components/overlays/OverlayContainer";
import GestureInstructions from "./components/GestureInstructions";
import AudioControls from "./components/AudioControls";

function App() {
  const [overlay, setOverlay] = useState<OverlayState>(OverlayState.null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <>
      <div className="w-16 h-16 absolute left-5 top-5 z-20">
        <Icon />
      </div>
      {overlay === OverlayState.null && <GestureInstructions />}
      <audioContext.Provider
        value={{ audio, setAudio, isPlaying, setIsPlaying }}
      >
        {audio && <AudioControls />}
        <appContext.Provider value={{ overlay, setOverlay }}>
          {overlay !== OverlayState.null && <OverlayContainer />}
          <Outlet />
        </appContext.Provider>
      </audioContext.Provider>
    </>
  );
}

export default App;

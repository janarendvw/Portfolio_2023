import { Outlet } from "react-router-dom";
import "./App.css";
import Icon from "./assets/Icon";
import { appContext } from "./Contexts";
import { useState } from "react";
import OverlayState from "./Enums";
import OverlayContainer from "./components/overlays/OverlayContainer";
import GestureInstructions from "./components/GestureInstructions";

function App() {
  const [overlay, setOverlay] = useState<OverlayState>(OverlayState.null);

  return (
    <>
    <div className="w-16 h-16 absolute left-5 top-5 z-20">
      <Icon />
    </div>
   {overlay === OverlayState.null && <GestureInstructions />}
    <appContext.Provider value={{overlay, setOverlay}}>
          {overlay !== OverlayState.null && (
            <OverlayContainer />
          )}
          <Outlet />
    </appContext.Provider>
    </>
  );
}

export default App;

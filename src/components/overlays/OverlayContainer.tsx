import Artwork from "./Artwork";
import Skills from "./Skills";
import Projects from "./Projects";
import { useContext } from "react";
import { appContext } from "../../Contexts";
import OverlayState from "../../Enums";
import Music from "./Music";

function OverlayContainer() {
  const usedAppContext = useContext(appContext);

  return (
    <>
      <div
        className={`min-h-screen w-full absolute flex flex-col bg-zinc-900 justify-between z-40 items-center backdrop-blur-md`}
      >
        <div className="">
          {usedAppContext.overlay === OverlayState.Artwork && <Artwork />}
          {usedAppContext.overlay === OverlayState.Skills && <Skills />}
          {usedAppContext.overlay === OverlayState.Projects && <Projects />}
          {usedAppContext.overlay === OverlayState.Music && <Music />}
        </div>
      </div>

      <button
        onClick={() => {
          usedAppContext.setOverlay(OverlayState.null);
        }}
        className="border border-white/20 hover:bg-white hover:text-black bg-zinc-700 duration-200 flex items-center justify-center p-5 rounded-full fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
      >
        <span className="material-symbols-rounded">undo</span>
      </button>
    </>
  );
}

export default OverlayContainer;

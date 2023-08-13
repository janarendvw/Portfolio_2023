import Artwork from "./Artwork";
import Skills from "./Skills";
import Projects from "./Projects";
import { useContext} from "react";
import { appContext } from "../../Contexts";
import OverlayState from "../../Enums";

function OverlayContainer() {
  const usedAppContext = useContext(appContext)

  return (
    <div
      className={`h-screen w-screen bg-zinc-900  flex flex-col justify-center z-50 left-0 items-center ease-in-out p-12 gap-12 backdrop-blur-md`}
    >
      {usedAppContext.overlay === OverlayState.Artwork && <Artwork />}
      {usedAppContext.overlay === OverlayState.Skills && <Skills />}
      {usedAppContext.overlay === OverlayState.Projects && <Projects />}

      <button
              onClick={() => {
                usedAppContext.setOverlay(OverlayState.null);
              }}
              className="border border-white/20 hover:bg-white/30 duration-200 flex items-center justify-center p-5 rounded-full absolute bottom-10"
            >
              <span className="material-symbols-rounded">undo</span>
            </button>

    </div>
  );
}

export default OverlayContainer;

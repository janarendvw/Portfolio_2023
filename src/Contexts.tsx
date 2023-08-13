import { createContext } from "react";
import OverlayState from "./Enums";

type AppContext = {
    overlay: OverlayState;
    setOverlay: (overlay: OverlayState) => void;
}

export const appContext = createContext<AppContext>({overlay: OverlayState.null, setOverlay: () => {}});
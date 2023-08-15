import { createContext } from "react";
import OverlayState from "./Enums";

type AppContext = {
    overlay: OverlayState;
    setOverlay: (overlay: OverlayState) => void;
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

type AudioContext = {
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
}

export const appContext = createContext<AppContext>({overlay: OverlayState.null, setOverlay: () => {}, darkMode: false, setDarkMode: () => {}});
export const audioContext = createContext<AudioContext>({isPlaying: false, setIsPlaying: () => {}});
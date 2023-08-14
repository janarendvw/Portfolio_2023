import { createContext } from "react";
import OverlayState from "./Enums";

type AppContext = {
    overlay: OverlayState;
    setOverlay: (overlay: OverlayState) => void;
}

type AudioContext = {
    audio: HTMLAudioElement | null;
    setAudio: (audio: HTMLAudioElement) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
}

export const appContext = createContext<AppContext>({overlay: OverlayState.null, setOverlay: () => {}});
export const audioContext = createContext<AudioContext>({audio: new Audio(), setAudio: () => {}, isPlaying: false, setIsPlaying: () => {}});
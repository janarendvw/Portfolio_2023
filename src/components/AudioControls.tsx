import { useContext, useEffect, useRef } from "react"
import { audioContext } from "../Contexts"

function AudioControls() {
  const usedAudioContext = useContext(audioContext)
  const audioElementRef = useRef<HTMLAudioElement>(null)
  const audioSource = "sweeping forest.mp3"

  useEffect(() => {
    if (usedAudioContext.isPlaying) {
      audioElementRef.current?.play()
    } else {
      audioElementRef.current?.pause()
    }
  }, [usedAudioContext.isPlaying])

  return (
    <div className="absolute z-50 right-5 bottom-5"><audio ref={audioElementRef} src={audioSource} /></div>
  )
}

export default AudioControls
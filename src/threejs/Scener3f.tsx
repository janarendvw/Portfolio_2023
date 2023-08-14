import {
  Center,
  Html,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { appContext, audioContext } from "../Contexts";
import OverlayState from "../Enums";
import { useFrame } from "@react-three/fiber";

type POIProps = {
  label: OverlayState;
  position: [number, number, number];
};

function Scener3f() {
  const usedAppContext = useContext(appContext);
  const usedAudioContext = useContext(audioContext);
  const pcScreenTextureRef = useRef<THREE.Texture>();
  const recordInnerTextureRef = useRef<THREE.Texture>();
  const pcScreenRef = useRef();

  const audio = new Audio("sweeping forest.mp3");
  audio.loop = true;
  audio.volume = 0.5;

  const playAudio = (audio: HTMLAudioElement) => {
    if (usedAudioContext.isPlaying === true) {
      usedAudioContext.setIsPlaying(false);
    } else {
      usedAudioContext.setAudio(audio);
      usedAudioContext.setIsPlaying(true);
    }
  };

  const { nodes } = useGLTF("/models/scene2.glb") as unknown as {
    nodes: { [key: string]: THREE.Mesh };
  };

  useEffect(() => {
    console.log(usedAppContext.overlay);
  }, [usedAppContext.overlay]);

  const darkTexture = useTexture("/models/Baked2.jpg");
  const lightTexture = useTexture("/models/BakedLight.jpg");
  
  darkTexture.flipY = false;
  darkTexture.minFilter = THREE.LinearFilter;
  darkTexture.colorSpace = THREE.SRGBColorSpace;



  lightTexture.flipY = false;
  lightTexture.minFilter = THREE.LinearFilter;
  lightTexture.colorSpace = THREE.SRGBColorSpace;

  pcScreenTextureRef.current = useTexture("/pc_screen_1.png");
  pcScreenTextureRef.current.minFilter = THREE.NearestMipmapLinearFilter;
  pcScreenTextureRef.current.repeat.set(13, 20);
  pcScreenTextureRef.current.offset.x = -0.55;
  pcScreenTextureRef.current.wrapT = THREE.RepeatWrapping;

  recordInnerTextureRef.current = useTexture("/models/test.png");
  recordInnerTextureRef.current.minFilter = THREE.LinearFilter;
  recordInnerTextureRef.current.repeat.set(1, 1);

  useFrame(() => {
    pcScreenTextureRef.current &&
      (pcScreenTextureRef.current.offset.y += 0.0005);
    
    recordInnerTextureRef.current && (recordInnerTextureRef.current.rotation += 0.0005)
  });

  const Poi = ({ label, position }: POIProps) => {
    const [hovered, setHovered] = useState(false);
    return (
      <Html
        zIndexRange={[1, 10]}
        distanceFactor={8}
        center
        position={position}
      >
        {label === OverlayState.Music ? (
          <button
            onClick={() => {
              playAudio(audio);
            }}
            className="material-symbols-rounded bg-black/50 text-white w-6 h-6 backdrop-blur-md hover:opacity-100 text-sm rounded-full duration-300"
          >
            {usedAudioContext.isPlaying ? "pause" : "play_arrow"}
          </button>
        ) : (
          <div
            onMouseOver={() => {
              setHovered(true);
            }}
            onMouseOut={() => {
              setHovered(false);
            }}
          >
            <div
              onMouseDown={() => {
                usedAppContext.setOverlay(label);
              }}
              className="p-2 hover:border-white/50 bg-black/50 duration-500 hover:-translate-y-1  backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer"
            >
              {!hovered ? (
                <div className="w-1 h-1 rounded-full bg-white"></div>
              ) : (
                <span className="px-2 text-sm tracking-wide text-white">{label}</span>
              )}
            </div>
          </div>
        )}
      </Html>
    );
  };

  return (
    <>
      <OrbitControls
      enabled={true}
        makeDefault
        maxAzimuthAngle={Math.PI * 0.5}
        minAzimuthAngle={Math.PI * 0}
        maxPolarAngle={Math.PI * 0.5}
      />
      <PerspectiveCamera makeDefault position={[5,1,5]}/>

      <Center>
        <mesh geometry={nodes.Baked.geometry}>
          <meshBasicMaterial map={usedAppContext.darkMode ? darkTexture : lightTexture} />
        </mesh>
        <mesh geometry={nodes.CubeLight.geometry} position={nodes.CubeLight.position}>
          <meshBasicMaterial color={0xffffff} />
        </mesh>
        <mesh
          geometry={nodes.TripodLight.geometry}
          position={nodes.TripodLight.position}
        >
          <meshBasicMaterial color={0xffffff} />
        </mesh>
        <mesh ref={pcScreenRef.current} geometry={nodes.Screen.geometry} position={nodes.Screen.position}>
          <meshBasicMaterial map={pcScreenTextureRef.current} />
        </mesh>
        <mesh geometry={nodes.RecordInner.geometry} position={nodes.RecordInner.position}>
          <meshBasicMaterial map={ recordInnerTextureRef.current} />
        </mesh>
        <Poi label={OverlayState.Projects} position={[1.27, 1, -0.7]} />
        <Poi label={OverlayState.Music} position={[3, 0.7, -0.08]} />
        <Poi label={OverlayState.Artwork} position={[-1.2, 1.5, 0.37]} />
        <Poi label={OverlayState.Skills} position={[-0.7, 1.2, 2.2]} />
      </Center>
    </>
  );
}

export default Scener3f;

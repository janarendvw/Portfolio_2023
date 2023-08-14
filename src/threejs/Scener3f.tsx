import { Perf } from "r3f-perf";
import {
  Center,
  Html,
  OrbitControls,
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

  const audio = new Audio("snowstalgia.mp3");
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

  const { nodes } = useGLTF("/models/scene.glb") as unknown as {
    nodes: { [key: string]: THREE.Mesh };
  };
  useEffect(() => {
    console.log(usedAppContext.overlay);
  }, [usedAppContext.overlay]);

  const bakedTexture = useTexture("/models/Baked2.jpg");
  bakedTexture.flipY = false;
  bakedTexture.minFilter = THREE.LinearFilter;

  pcScreenTextureRef.current = useTexture("/pc_screen_1.png");
  pcScreenTextureRef.current.minFilter = THREE.NearestMipmapLinearFilter;
  pcScreenTextureRef.current.repeat.set(13, 20);
  pcScreenTextureRef.current.offset.x = -0.55;
  pcScreenTextureRef.current.wrapT = THREE.RepeatWrapping;

  useFrame(() => {
    pcScreenTextureRef.current &&
      (pcScreenTextureRef.current.offset.y += 0.0005);
  });

  const Poi = ({ label, position }: POIProps) => {
    const [hovered, setHovered] = useState(false);
    return (
      <Html
        zIndexRange={[1, 10]}
        distanceFactor={8}
        occlude
        center
        position={position}
      >
        {label === OverlayState.Music ? (
          <button
            onClick={() => {
              playAudio(audio);
            }}
            className="material-symbols-rounded bg-black/50 w-6 h-6 backdrop-blur-md hover:opacity-100 text-sm rounded-full duration-300"
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
                <span className="px-2 text-sm tracking-wide">{label}</span>
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
        makeDefault
        enablePan={false}
        maxAzimuthAngle={Math.PI * 0.5}
        minAzimuthAngle={Math.PI * 0}
        maxPolarAngle={Math.PI * 0.5}
      />

      <Center>
        <mesh geometry={nodes.Baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh geometry={nodes.CubeLight.geometry} position={[-1.53, 0.6, -1]}>
          <meshBasicMaterial color={0xffffff} />
        </mesh>
        <mesh
          geometry={nodes.TripodLight.geometry}
          position={[2.03, 0.55, -0.7]}
        >
          <meshBasicMaterial color={0xffffff} />
        </mesh>
        <mesh geometry={nodes.Screen.geometry} position={[0.335, 0.38, -0.77]}>
          <meshBasicMaterial map={pcScreenTextureRef.current} />
        </mesh>
        <Poi label={OverlayState.Projects} position={[0.31, 0.4, -0.5]} />
        <Poi label={OverlayState.Music} position={[2.07, -0.17, 0.12]} />
        <Poi label={OverlayState.Artwork} position={[-2, 0.5, 0.55]} />
        <Poi label={OverlayState.Skills} position={[-1.7, 0.5, 2.5]} />
      </Center>
    </>
  );
}

export default Scener3f;

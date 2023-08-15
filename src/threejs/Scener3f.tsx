import {
  Center,
  Html,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import {useContext, useRef, useState } from "react";
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
  const pcScreenRef = useRef();

  const playAudio = () => {
    if (usedAudioContext.isPlaying === true) {
      usedAudioContext.setIsPlaying(false);
    } else {
      usedAudioContext.setIsPlaying(true);
    }
  };

  const { nodes } = useGLTF("/models/scene-draco.glb") as unknown as {
    nodes: { [key: string]: THREE.Mesh };
  };

  const darkTexture = useTexture("/models/Baked2.jpg");
  const lightTexture = useTexture("/models/BakedLight.jpg");
  pcScreenTextureRef.current = useTexture("/pc_screen_1.png");

  const textureInit = (darkTexture:THREE.Texture, lightTexture:THREE.Texture, pcScreenTextureRef:THREE.Texture) => {
    darkTexture.flipY = false;
    darkTexture.minFilter = THREE.LinearFilter;
    darkTexture.colorSpace = THREE.SRGBColorSpace;
    lightTexture.flipY = false;
    lightTexture.minFilter = THREE.LinearFilter;
    lightTexture.colorSpace = THREE.SRGBColorSpace;
    pcScreenTextureRef.minFilter = THREE.NearestMipmapLinearFilter;
    pcScreenTextureRef.repeat.set(13, 20);
    pcScreenTextureRef.offset.x = -0.55;
    pcScreenTextureRef.wrapT = THREE.RepeatWrapping;
  }
  textureInit(darkTexture, lightTexture, pcScreenTextureRef.current);

  useFrame(() => {
    pcScreenTextureRef.current &&
      (pcScreenTextureRef.current.offset.y += 0.002);
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
              playAudio();
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
          geometry={nodes.TripoLight.geometry}
          position={nodes.TripoLight.position}
        >
          <meshBasicMaterial color={0xffffff} />
        </mesh>
        <mesh ref={pcScreenRef.current} geometry={nodes.Screen.geometry} position={nodes.Screen.position}>
          <meshBasicMaterial map={pcScreenTextureRef.current} />
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

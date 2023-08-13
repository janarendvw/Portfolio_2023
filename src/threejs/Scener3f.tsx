import { Perf } from "r3f-perf";
import {
  Center,
  Html,
  OrbitControls,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useContext, useEffect, useState } from "react";
import * as THREE from "three";
import { appContext } from "../Contexts";
import OverlayState from "../Enums";

type POIProps = {
  label: OverlayState;
  position: [number, number, number];
};

function Scener3f() {
  const usedAppContext = useContext(appContext)

  const { nodes } = useGLTF("/models/scene.glb") as unknown as {
    nodes: { [key: string]: THREE.Mesh };
  };
  useEffect(() => {
console.log(usedAppContext.overlay)
  }, [usedAppContext.overlay])

  const bakedTexture = useTexture("/models/Baked2.jpg");
  bakedTexture.flipY = false;
  bakedTexture.minFilter = THREE.LinearFilter;

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
            className="p-2 hover:border-white/50 bg-white/10 duration-500 hover:-translate-y-1  backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer"
          >
            {!hovered ? (
              <div className="w-1 h-1 rounded-full bg-white"></div>
            ) : (
              <span className="px-2 text-sm tracking-wide">{label}</span>
            )}
          </div>
        </div>
      </Html>
    );
  };

  return (
    <>
      <OrbitControls makeDefault />
      <Perf />

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
        <Poi label={OverlayState.Projects} position={[0.31, 0.4, -0.5]} />
        <Poi label={OverlayState.Music} position={[2.1, 0, 0.1]} />
        <Poi label={OverlayState.Artwork} position={[-2, 0.5, 0.55]} />
        <Poi label={OverlayState.Skills} position={[-1.7, 0.5, 2.5]} />
      </Center>
    </>
  );
}

export default Scener3f;

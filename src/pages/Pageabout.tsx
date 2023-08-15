import { Html, useProgress } from "@react-three/drei";
import Scener3f from "../threejs/Scener3f";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

function Pageabout() {
  function Loader() {
    const loaded  = useProgress((state) => (state.loaded));
    const loadingBar = document.getElementById("loadingBar");
    if (loadingBar) {loadingBar.style.transform = `scaleX(${(loaded / 7)})`}
    return (
      <Html center>
        {(loaded / 7 * 100).toFixed(0) + "%"}
        <div className="h-1 w-[66vw] bg-white/10 rounded">
          <div
          style={{transition: "transform 1s ease-in-out"}}
          id="loadingBar"
            className="h-full scale-x-0 bg-white rounded origin-left"
          ></div>
        </div>
      </Html>
    );
  }
  return (
    <div className="w-screen h-screen fixed">
      <Canvas gl={{ antialias: true }}>
        <Suspense fallback={<Loader />}>
          <Scener3f />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Pageabout;

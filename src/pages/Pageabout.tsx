import Scener3f from "../threejs/Scener3f";
import { Canvas } from "@react-three/fiber";

function Pageabout() {
  return (
    <div className="w-screen h-screen fixed">
      <Canvas gl={{ antialias: true }}>
        <Scener3f />
       
      </Canvas>
    </div>
  );
}

export default Pageabout;

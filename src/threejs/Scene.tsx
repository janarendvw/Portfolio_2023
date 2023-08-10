import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Skillbar from "../components/Skillbar";
import gsap from "gsap";

type Props = {};
type Point = {
  position: THREE.Vector3;
  element: HTMLElement;
};

function scene({}: Props) {
  const overlays = ["none", "projects", "artwork", "spotify", "skills"];
  const [overlay, setOverlay] = useState(overlays[0]);
  const skills = [
    {
      name: "React",
      level: 90,
    },
    {
      name: "Typescript",
      level: 70,
    },
    {
      name: "Javascript",
      level: 90,
    },
    {
      name: "Node.js",
      level: 80,
    },
    {
      name: "Three.js",
      level: 70,
    },
    {
      name: "Tailwind CSS",
      level: 80,
    },
  ];

  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const artworkTextureRef = useRef<THREE.Texture | null>(null);
  const textureLoaderRef = useRef<THREE.TextureLoader | null>(null);


  let canvas;
  let points: Point[] = [];
  // let camera: THREE.PerspectiveCamera;
  // let controls: OrbitControls;

  useEffect(() => {
    textureLoaderRef.current = new THREE.TextureLoader();
    artworkTextureRef.current = textureLoaderRef.current.load("/creativity-poster.jpg");
 

    canvas = document.getElementById("scene") as HTMLCanvasElement;
    points = [
      {
        position: new THREE.Vector3(-1, 1.5, 2.2),
        element: document.querySelector(".point-skills") as HTMLElement,
      },
      {
        position: new THREE.Vector3(1.2, 1.2, -0.7),
        element: document.querySelector(".point-projects") as HTMLElement,
      },
      {
        position: new THREE.Vector3(-1.3, 1.5, 0.4),
        element: document.querySelector(".point-artwork") as HTMLElement,
      },
      {
        position: new THREE.Vector3(3, 0.7, 0),
        element: document.querySelector(".point-spotify") as HTMLElement,
      },
    ];

    //load model

    const loader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const bakedTexture = textureLoader.load("/models/Baked.jpg");
    bakedTexture.flipY = false;
    bakedTexture.colorSpace = THREE.SRGBColorSpace;
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

    //render init

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    cameraRef.current = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    controlsRef.current = new OrbitControls(cameraRef.current, renderer.domElement);
    controlsRef.current.enableDamping = false;
    controlsRef.current.enablePan = false;
    controlsRef.current.minDistance = 1;
    controlsRef.current.maxDistance = 8;
    controlsRef.current.target.set(1, 0, 1);

    const scene = new THREE.Scene();

    let model: THREE.Group | undefined = undefined;

    loader.load(
      "/models/scene.glb",
      (gltf) => {
        model = gltf.scene;
        model.traverse((o: any) => {
          o.material = bakedMaterial;
          console.log(o)
        });
        model.scale.set(1, 1, 1);
        scene.add(model);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
    cameraRef.current.position.set(4, 2, 4);

    //animation

    const animate = function () {
      if(controlsRef.current) {
      controlsRef.current.update();
      }
      for (const point of points) {
        const screenPosition = point.position.clone();
        screenPosition.project(cameraRef.current as THREE.Camera);
        const translateX = screenPosition.x * window.innerWidth * 0.5;
        const translateY = -screenPosition.y * window.innerHeight * 0.5;
        point.element.style.transform = `translate(${translateX}px,${translateY}px)`;
      }

      renderer.render(scene, cameraRef.current as THREE.Camera);

      requestAnimationFrame(animate);
    };

    animate();

    // transitionTo('artwork');

    return () => {
      renderer.dispose();
      if (model) {
        scene.remove(model);
        model.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            o.geometry.dispose();
            o.material.dispose();
          }
        });
      }
    };
  }, []);


  const transitionTo = (overlay: string) => {
    setOverlay(overlay);
    if (overlay === "none" && cameraRef.current && controlsRef.current) {
      gsap.to(cameraRef.current.position, {
        duration: 1,
        x: 4,
        y: 2,
        z: 4,
      });
      gsap.to(controlsRef.current.target, {
        duration: 1,
        x: 0,
        y: 0,
        z: 0,
      });
    } else if (overlay === "projects" && cameraRef.current && controlsRef.current) {
      gsap.to(cameraRef.current.position, {
        duration: 3,
        x: 1.2,
        y: 0.9,
        z: 0.5,
        ease: "power3.out",
      });

      gsap.to(controlsRef.current.target, {
        duration: 3,
        x: 1.2,
        y: 0.8,
        z: -0.7,
        ease: "power3.out",
      });
    } else if (overlay === "artwork" && cameraRef.current && controlsRef.current) {
      gsap.to(cameraRef.current.position, {
        duration: 3,
        x: -1.5,
        y: 1.3,
        z: 0.35,
        ease: "power3.out",
      });
      gsap.to(controlsRef.current.target, {
        duration: 3,
        x: -1.6,
        y: 1.35,
        z: 0.35,
        ease: "power3.out",
      });
    } else if (overlay === "spotify" && cameraRef.current && controlsRef.current) {
      gsap.to(cameraRef.current.position, {
        duration: 3,
        x: 3.5,
        y: 0.7,
        z: -0.1,
      });

      gsap.to(controlsRef.current.target, {
        duration: 3,
        x: 3,
        y: 0.5,
        z: -0.1,
        ease: "power3.out",
      });
    } else if (overlay === "skills" && cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 2, 6);
    }
  };

  return (
    <>
      <canvas id="scene" className="w-screen h-screen fixed"></canvas>
      <div
      style={{ display: overlay !== "skills" ? "flex" : "none" }}
        onMouseDown={() => {
          setOverlay(overlays[4]);
        }}
        className="point-skills w-4 h-4 bg-white/30 border border-white/20 text-white absolute top-1/2 left-1/2 rounded-full flex justify-center items-center cursor-pointer group"
      >
        <div className="point-skills-inner w-1 h-1 bg-white rounded-full"></div>
      </div>

      {overlay === "skills" && (
        <div
          id="skills"
          className={`h-screen w-full max-w-lg absolute flex flex-col justify-between z-10 left-0 duration-300 ease-in-out p-12`}
        >
          <h1 className="text-5xl text-white mb-8">Skills</h1>
          <div>
            {skills.map((skill) => (
              <Skillbar skillName={skill.name} skillLevel={skill.level} />
            ))}
          </div>
          <button
            onClick={() => {
              setOverlay(overlays[0]);
            }}
            className="bg-white/10 p-4 flex justify-center items-center"
          >
            back
          </button>
        </div>
      )}

      
        <div
        style={{ display: overlay !== "projects" ? "flex" : "none"}}
          onMouseDown={() => {
            transitionTo("projects");
          }}
          className="point-projects w-4 h-4 bg-white/30 border border-white/20 text-white absolute top-1/2 left-1/2 rounded-full flex justify-center items-center cursor-pointer group"
        >
          <div className="point-skills-inner w-1 h-1 bg-white rounded-full"></div>
        </div>

      {overlay === "projects" && (
        <div className=" text-white absolute rounded-full flex justify-center items-center">
          test
        </div>
      )}

  
        <div
        style={{ display: overlay !== "artwork" ? "flex" : "none"}}
          onMouseDown={() => {
            transitionTo("artwork");
          }}
          className="point-artwork w-4 h-4 bg-white/30 border border-white/20 text-white absolute top-1/2 left-1/2 rounded-full flex justify-center items-center cursor-pointer group"
        >
          <div className="point-skills-inner w-1 h-1 bg-white rounded-full"></div>
        </div>

      {overlay === "artwork" && (
        <div className="point-artwork text-white absolute backdrop-blur-md left-1/2 top-1/2 p-4 border gap-4 border-white/10 -translate-x-1/2 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold">Artwork</h1>
          All my graphic design work is on Instagram
          <a
            href="https://www.instagram.com/deltadesign.nl/"
            target="_blank"
            className="text-blue-500"
          >
            @deltadesign.nl
          </a>
        </div>
      )}

        <div
        style={{ display: overlay !== "spotify" ? "flex" : "none"}}
          onMouseDown={() => {
            transitionTo("spotify");
          }}
          className="point-spotify w-4 h-4 bg-white/30 border border-white/20 text-white absolute top-1/2 left-1/2 rounded-full flex justify-center items-center cursor-pointer group"
        >
          <div className="point-skills-inner w-1 h-1 bg-white rounded-full"></div>
        </div>
 
        <div style={{ display: overlay === "spotify" ? "flex" : "none"}} className="point-spotify text-white absolute backdrop-blur-md left-1/2 bottom-1/4 p-4 border gap-4 border-white/10 -translate-x-1/2 flex justify-center items-center">

          <audio controls>
            <source src="snowstalgia.mp3" type="audio/mp3"/>
          </audio>
        </div>
   


     

      {overlay !== 'none' && (
        <button
          onClick={() => {
            transitionTo('none');
          }}
          className="bg-white/10 p-4 flex justify-center items-center absolute top-4 left-4"
        >
          back
        </button>
      )}
    </>
  );
}

export default scene;

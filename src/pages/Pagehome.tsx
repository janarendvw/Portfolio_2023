import React from "react";
import HomeBackground from "../threejs/HomeBackground";
import swapText from '../scripts/swapText.ts'
type Props = {};

function Pagehome({}: Props) {
    React.useEffect(() => {
        swapText()
    }, [])
  return (
    <>
    <HomeBackground />
    <div className="hero w-screen h-screen flex justify-center items-center flex-wrap m-auto">
      <h1 className="text-7xl font-medium">
        <span className="bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Limitless
        </span>{" "}
      <span className="swap-text"></span>
      </h1>
    </div>
    </>
  );
}

export default Pagehome;

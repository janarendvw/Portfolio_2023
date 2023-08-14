import { useEffect, useState } from "react";

type Props = {
  skillName: string;
  skillLevel: number;
};

function Skillbar({ skillLevel, skillName }: Props) {
  const [level, setLevel] = useState<number>(0);

  useEffect(() => {
    setLevel(skillLevel);
  }, [skillLevel]);

  const properties = {
    totalWidth: "100%",
  };
  return (
    <>
      {skillLevel < 90 ? (
        <div className="py-2 w-screen max-w-sm bg-zinc-800 px-4 rounded">
          <h2 className="text-white text-sm font-semibold tracking-wide">
            {skillName}
          </h2>
          <div
            className={`bg-white/10 rounded-sm w-[${properties.totalWidth}] h-2 my-2`}
          >
            <div
              className="bg-gradient-to-l from-white/80 to-white/30  h-full duration-1000 delay-500 ease-in-out rounded-sm"
              style={{ width: level + "%" }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="relative w-screen max-w-sm bg-zinc-800 overflow-clip rounded">
              <div style={{opacity: level + '%'}} className="absolute w-full h-full bg-400 bg-center bg-gradient-to-l from-red-500/40 to-purple-400/20 duration-1000 delay-1000" />

          <div className="px-4 py-2">
            <div className="flex justify-between">
              <h2 className="text-purple-400 text-sm font-semibold tracking-wide">
                {skillName}
              </h2>
              <p className="text-sm text-red-300">Expert</p>
            </div>
            <div
              className={`bg-white/10 rounded-sm w-[${properties.totalWidth}] h-2 my-2`}
            >
              <div
                className="bg-gradient-to-r from-purple-500 to-red-500 h-full duration-1000 delay-500 ease-in-out rounded-sm"
                style={{ width: level + "%" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Skillbar;

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
        <div className="py-2 w-screen max-w-sm bg-zinc-800 px-4 rounded-md">
          <h2 className="text-white text-sm font-semibold tracking-wide">{skillName}</h2>
          <div
            className={`bg-white/10 rounded-md w-[${properties.totalWidth}] h-2 my-2`}
          >
            <div
              className="bg-gradient-to-l from-purple-400 to-purple-700  h-full duration-1000 delay-500 ease-in-out rounded-md"
              style={{ width: level + "%" }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="py-2 w-screen max-w-sm bg-gradient-to-r from-purple-600 to-red-400 px-4 rounded-md shadow-red-300">
          <h2 className="text-white text-sm font-semibold tracking-wide">{skillName}</h2>
          <div
            className={`bg-zinc-900/20 rounded-md w-[${properties.totalWidth}] h-2 my-2`}
          >
            <div
              className="bg-white h-full duration-1000 delay-500 ease-in-out rounded-md"
              style={{ width: level + "%" }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Skillbar;

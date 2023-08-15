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

  return (
    <>
      {skillLevel < 90 ? (
        <div className="py-2 w-screen max-w-sm bg-gray-100 dark:bg-zinc-800 px-4 rounded">
          <h2 className="text-sm font-semibold tracking-wide">
            {skillName}
          </h2>
          <div
            className='bg-white/10 rounded-sm h-2 my-2'
          >
            <div
              className="origin-left scale-x-0 bg-gradient-to-l from-blue-400 to-blue-500 h-full duration-1000 ease-in-out rounded-sm"
              style={{ transform: `scaleX(${level / 100})` }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="relative w-screen max-w-sm bg-gradient-to-bl bg-400 from-blue-500 to-purple-600 bg-center overflow-clip rounded">
             

          <div className="px-4 py-2">
            <div className="flex justify-between">
              <h2 className="text-white text-sm font-semibold tracking-wide">
                {skillName}
              </h2>
              <p className="text-sm text-white">Expert</p>
            </div>
            <div
              className='bg-white/10 rounded-sm h-2 my-2'
            >
              
              <div
                className="origin-left scale-x-0 bg-white h-full duration-1000 ease-in-out rounded-sm"
                style={{ transform: `scaleX(${level / 100})` }}
              ></div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Skillbar;

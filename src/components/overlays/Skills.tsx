import { useRef } from "react";
import Skillbar from "../Skillbar";

type Skill = {
  name: string;
  level: number;
};
function Skills() {

  const skillsRef = useRef<Skill[]>([
    {
      name: "React",
      level: 90,
    },
    {
      name: "Typescript",
      level: 45,
    },
    {
      name: "Javascript",
      level: 90,
    },
    {
      name: "Node.js",
      level: 60,
    },
    {
      name: "Three.js",
      level: 70,
    },
    {
      name: "Tailwind CSS",
      level: 80,
    },
    {
      name: "HTML5",
      level: 90,
    },
    {
      name: "Figma",
      level: 80,
    },
    {
      name: "Blender",
      level: 60,
    },
    {
      name: "C#",
      level: 40,
    },
    {
      name: "Python",
      level: 90,
    }
  ]);

  return (
    <div className="flex flex-col items-center gap-12 my-24">
      <h1 className="text-5xl font-semibold">Skills</h1>
      <p className="opacity-80 max-w-lg text-center">
        This is a collection of in my opinion my most valueable knowledge and
        experience concerning web development techniques
      </p>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {skillsRef.current.sort((a, b) => b.level - a.level).map((skill) => (
          <Skillbar skillName={skill.name} skillLevel={skill.level} />
        ))}
      </div>
    </div>
  );
}

export default Skills;

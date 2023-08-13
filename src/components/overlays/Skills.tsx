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
  ]);

  return (
    <>
      <h1 className="text-5xl text-white">Skills</h1>
      <p className="opacity-80 max-w-lg text-center">
        This is a collection of in my opinion my most valueable knowledge and
        experience concerning web development techniques
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {skillsRef.current.sort((a, b) => b.level - a.level).map((skill) => (
          <Skillbar skillName={skill.name} skillLevel={skill.level} />
        ))}
      </div>
    </>
  );
}

export default Skills;

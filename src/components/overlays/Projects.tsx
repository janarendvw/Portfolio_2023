import { useEffect, useState } from "react";
import ProjectViewCompact from "./projectiews/ProjectViewCompact";
import ProjectViewFull from "./projectiews/ProjectViewFull";

function Projects() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
 const [gridCols, setGridCols] = useState<number>(4);

  useEffect(() => {

    if (window.innerWidth < 768) {
      setGridCols(1);
    } else if (window.innerWidth < 1024) {
      setGridCols(2);
    } else if (window.innerWidth < 1600){
      setGridCols(3);
    } else {
      setGridCols(4)
      }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setGridCols(1);
      } else if (window.innerWidth < 1024) {
        setGridCols(2);
      } else if (window.innerWidth < 1400){
        setGridCols(3);
      } else {
      setGridCols(4)
      }
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  const projects = [
    {
      title: "Fyndr Wiki Landing Page",
      tech: ["vue", "tailwindcss", "typescript", "Nuxt3"],
      description:
        "By combining a wide range of sources into one platform, students can learn faster and better. Fynd R makes it even easier by providing various information structures, including roadmaps with diagrams and playlists curated by users.",
      image: "/project_images/fyndr-wiki.png",
      link: "https://fyndr.wiki",
    },
    {
      title: "Fyndr Databank Design",
      tech: ["vue", "tailwindcss", "typescript", "Nuxt3", "Figma"],
      description:
        "It was my task to create and implement a robust and complete design system for the Fyndr Databank. The databank is a platform where students can find all kinds of information about their study. The databank is a platform where students can find all kinds of information about their study.",
      image: "/project_images/fyndr.png",
      link: "https://openict.fyndr.wiki",
    },
    {
      title: "MTG Orders Dashboard",
      tech: ["React", "Bootstrap5", "Laravel", "MariaDB"],
      description:
        "A dashboard for the MTG Orders platform. This dashboard is used by the administrators of the platform to manage the orders and users.",
      image: "/project_images/mtg.jpg",
    },
    {
      title: 'Shure EMEA Landing Pages',
      tech: ["HTML", "CSS", "Bootstrap4"],
      description:
        "A series of landing pages for Shure EMEA. These landing pages are used to promote the products of Shure EMEA.",
      image: "/project_images/shure.png",
    }
  ];

  const placeholderProjects = gridCols - (projects.length % gridCols);

  return (
    <div className="flex flex-col items-center gap-12 py-24 px-12">
      <h1 className="text-5xl font-semibold">Projects</h1>
      <div className="flex justify-end gap-2 w-full">
        <button
          onClick={() => setViewMode("grid")}
          className={`rounded px-3 justify-center text-sm tracking-wide border border-blue-800/20 ${
            viewMode === "grid" ? "bg-blue-800/50" : "bg-blue-800/5"
          } hover:bg-blue-600/50 duration-100 text-blue-400 flex w-fit items-center gap-2 ${
            viewMode === "grid" ? "bg-blue-600/50" : ""
          }`}
        >
          <span className="material-symbols-rounded">grid_view</span>Compact
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`rounded px-3 justify-center text-sm tracking-wide border border-blue-800/20 ${
            viewMode !== "grid" ? "bg-blue-800/50" : "bg-blue-800/5"
          } hover:bg-blue-600/50 duration-100 text-blue-400 flex w-fit items-center gap-2 ${
            viewMode === "list" ? "bg-blue-600/50" : ""
          }`}
        >
          <span className="material-symbols-rounded">fullscreen</span>Expanded
        </button>
      </div>
      {viewMode === "grid" ? (
        <div
          style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
          className={`grid gap-10`}
        >
          {projects.map((project) => (
            <ProjectViewCompact project={project} />
          ))}
          {placeholderProjects > 0 &&
            [...Array(placeholderProjects)].map(() => {
              return (
                <div className="h-full w-full bg-zinc-700/20 rounded-md"></div>
              );
            })}
        </div>
      ) : (
        <div className="flex flex-col gap-[20vh] py-12">
          {projects.map((project) => (
            <ProjectViewFull project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;

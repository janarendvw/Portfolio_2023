

function Projects() {
 
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
    }
  ];

  const gridCols = 4;
  const placeholderProjects = gridCols - (projects.length % gridCols);


  return (
    <div className={`grid grid-cols-${gridCols} px-24 gap-10`}>
      {projects.map((project) => {
        return (
          <div className="flex flex-col w-full justify-center rounded-lg overflow-clip bg-zinc-800 m-auto">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-56 object-cover object-center"
            />
            <div className="project-info px-4 pb-4 pt-2 flex flex-col gap-4">
              <div className="project-info-head flex-col gap-1 flex">
                <h1 className="text-lg font-semibold text-white">
                  {project.title}
                </h1>
                <div className="flex gap-2">
                  {project.tech &&
                    project.tech.map((tech) => {
                      return (
                        <span className="text-xs bg-white/10 px-1 text-white opacity-50 hover:opacity-100 capitalize">
                          {tech}
                        </span>
                      );
                    })}
                </div>
              </div>
              <p className="opacity-80 text-sm min-h-15 max-h-15 text-ellipsis overflow-hidden line-clamp-3">
                {project.description}
              </p>

              <a
                href={project.link}
                target="_blank"
                className="rounded px-3 justify-center text-sm tracking-wide border border-blue-800/20 bg-blue-800/5 text-blue-400 flex w-fit items-center gap-2"
              >
                <span className="material-symbols-rounded">link</span>Link
              </a>
            </div>
          </div>
        );
      })}
      {placeholderProjects > 0 &&
        [...Array(placeholderProjects)].map(() => {
          return <div className="h-full w-full bg-zinc-700/20 rounded-md"></div>;
        })}
    </div>
  );
}

export default Projects;

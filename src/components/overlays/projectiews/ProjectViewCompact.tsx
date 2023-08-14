
type Project = {
    title: string;
    tech: string[];
    description: string;
    image: string;
    link?: string;
}

function ProjectViewCompact({project}: {project: Project}) {
  return (
    <div className="flex flex-col w-full h-full justify-center rounded-lg overflow-clip bg-zinc-800 m-auto">
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-1/2 object-cover object-center"
    />
    <div className="project-info h-1/2 px-4 pb-4 pt-2 flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-4">
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
        <p className="opacity-80 text-sm text-ellipsis overflow-clip line-clamp-2">
          {project.description}
        </p>
      </div>

     {project.link && <a
        href={project.link}
        target="_blank"
        className="rounded px-3 justify-center text-sm tracking-wide border border-blue-800/20 bg-blue-800/5 hover:bg-blue-600/50 duration-100 text-blue-400 flex w-fit items-center gap-2"
      >
        <span className="material-symbols-rounded">link</span>Link
      </a>}
    </div>
  </div>
  )
}

export default ProjectViewCompact
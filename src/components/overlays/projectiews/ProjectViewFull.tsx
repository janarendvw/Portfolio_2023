
type Project = {
    title: string;
    tech: string[];
    description: string;
    image: string;
    link?: string;
}

function ProjectViewFull({project}: {project: Project}) {
  return (
    <div className="flex even:flex-row-reverse gap-24 w-full">
    <div className="project-info flex-1 flex flex-col gap-8 w-full">
      <div className="project-info-head flex-col gap-1 flex bg-gray-100 dark:bg-zinc-800 py-2 px-4 rounded">
        <h1 className="text-lg font-semibold">
          {project.title}
        </h1>
        <div className="flex gap-2">
          {project.tech &&
            project.tech.map((tech, index) => {
              return (
                <span key={`tech-${index}`} className="text-xs bg-gray-200  dark:bg-zinc-700 px-1 opacity-50 hover:opacity-100 capitalize">
                  {tech}
                </span>
              );
            })}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <img
        src={project.image}
        alt={project.title}
        className="w-full md:w-1/2 object-cover object-center rounded shadow"
            />
        <div className="flex flex-col gap-8">
          <p className="opacity-80 text-sm max-w-lg">
            {project.description}
          </p>
          
               {project.link && <a
            href={project.link}
            target="_blank"
            className="rounded px-3 justify-center text-sm tracking-wide border border-blue-800/20 bg-blue-800/5 hover:bg-blue-600/50 duration-100 text-blue-400 flex w-fit items-center gap-2"
          >
            <span className="material-symbols-rounded">link</span>Link
          </a>}
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProjectViewFull
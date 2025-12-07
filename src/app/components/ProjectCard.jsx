import React from "react";
import { ExternalLink } from "lucide-react";

const ProjectCard = ({ project }) => {
  return (
    <div className="flex gap-12">
      <div className="w-[50%] h-full overflow-hidden rounded-xl flex flex-col justify-center items-center gap-5 border-2 border-gray-300 p-3">
        <div className="group w-full h-64 [perspective:1000px] overflow-hidden rounded-xl">
          <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-xl">
            {/* Front side (Image) */}
            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Back side (Tech Stack) */}
            <div className="absolute inset-0 w-full h-full bg-black text-white flex flex-col gap-5 px-5 items-center justify-center text-xl font-semibold rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <h4>Tech Stack Used</h4>
              <div>
                <ul className="list-none grid grid-cols-3 gap-2">
                  {project.techStack.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          data-no-cursor="true"
          className="w-full flex justify-between items-center"
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            data-no-cursor="true"
            className="text-2xl font-semibold cursor-pointer hover:bg-white flex items-center gap-2 hover:text-black hover:px-5 hover:py-2 hover:rounded-lg transition-all duration-700"
          >
            <span data-no-cursor="true">{project.title}</span>{" "}
            <span
              data-no-cursor="true"
              className="font-light flex items-center gap-3"
            >
              - {project.category} <ExternalLink />
            </span>
          </a>
        </div>
      </div>
      <p className="w-[50%] text-xl h-full py-3">{project.description}</p>
    </div>
  );
};

export default ProjectCard;
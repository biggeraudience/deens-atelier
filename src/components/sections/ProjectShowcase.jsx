import React from 'react';
import ProjectCard from '../projects/ProjectCard'; // This will be your animated project component
import { projectsData } from '../../data/projects'; // Import project data

const ProjectShowcase = () => {
  return (
    <section className="project-showcase section">
      <h2 className="section__title">Featured Works: Where Vision Takes Form</h2>
      <div className="project-showcase__grid container">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcase;

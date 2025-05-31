
// src/pages/Home.jsx
import React from 'react';
import { projectsData } from '../data/projects'; // Assuming you have a projectsData array
import ProjectSection from '../components/sections/ProjectSection'; // New component for single project display
import '../assets/styles/pages/_home.scss'; // New SCSS for home page

const Home = () => {
  return (
    <main className="home-page">
      {/* Map through your projects data to render each project section */}
      {projectsData.map((project, index) => (
        <ProjectSection
          key={project.id || index} // Use a unique ID if available, otherwise index
          project={project}
          projectNumber={index + 1}
        />
      ))}
    </main>
  );
};

export default Home;
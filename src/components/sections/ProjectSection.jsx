// src/components/sections/ProjectSection.jsx

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';
import '../../assets/styles/components/_project-section.scss';
import { projectsData } from '../../data/projects'; // projectsData is still needed for tech specs logic, but not for next project preview

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = ({ project, projectNumber }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const horizontalLineRef = useRef(null);
  const verticalLineRef = useRef(null);
  const numberingRef = useRef(null);
  const captionRef = useRef(null);
  const introBodyRef = useRef(null);
  const introImageGridRef = useRef(null);
  const imageGridRefs = useRef([]);     // IMAGES
  const projectDetailsRef = useRef([]); // DETAILS TEXT
  const techSpecsRef = useRef([]);      // TECH SPECS TEXT
  const processRef = useRef(null);
  const summaryRef = useRef(null);
  const bigImageContainerRef = useRef(null);

  // All overlay-related refs and useEffect logic have been removed.

  // Helper to pick each project’s 12 images (unchanged)
  const getImageUrl = (idx) => {
    const imageUrls = [
      project.imageUrl1, project.imageUrl2, project.imageUrl3, project.imageUrl4,
      project.imageUrl5, project.imageUrl6, project.imageUrl7, project.imageUrl8,
      project.imageUrl9, project.imageUrl10, project.imageUrl11, project.imageUrl12,
    ];
    return imageUrls[idx] || `https://placehold.co/600x400?text=Image+${projectNumber}-${idx + 1}`;
  };

  // Dynamically build tech specs (unchanged)
  const getTechSpecs = (curProj) => {
    if (curProj.id === 'al-sawam-mosque') {
      return [
        { label: 'Land Size', value: curProj.landSize || 'N/A' },
        { label: 'Developed Portion', value: curProj.developedPortion || 'N/A' },
        { label: 'Main Prayer Hall Capacity', value: curProj.mainPrayerHallCapacity || 'N/A' },
        { label: 'Female Prayer Area Capacity', value: curProj.femalePrayerAreaCapacity || 'N/A' },
        { label: 'Minaret Height', value: curProj.minaretHeight || 'N/A' },
        { label: 'Roof Type', value: curProj.roofType || 'N/A' },
        { label: 'Ablution Facilities', value: curProj.ablutionFacilities || 'Dedicated zones' },
        { label: 'Community Facilities', value: curProj.communityFacilities || 'Library, classrooms, event hall' },
      ];
    } else {
      return [
        { label: 'Land Size', value: curProj.landSize || '1000m²' },
        { label: 'Developed Portion', value: curProj.developedPortion || '350m²' },
        { label: 'Bedrooms', value: curProj.numRooms || '5' },
        { label: 'Bathrooms', value: curProj.numBaths || '6' },
        { label: 'Living Rooms', value: curProj.numLivingRooms || '2 large' },
        { label: 'Roof Type', value: curProj.roofType || 'Gable (Asphalt Shingles)' },
        { label: 'Parking', value: curProj.parking || '2-car garage' },
        { label: 'Security', value: curProj.security || 'Smart Home System' },
        { label: 'Energy', value: curProj.energy || 'Solar-ready' },
      ];
    }
  };
  const techSpecs = getTechSpecs(project);

  return (
    <section className="project-section" ref={sectionRef}>
      {/* ================================================================= */}
      {/* SECTION 1: Intro Text (static, non-animated) */}
      <div className="project-section__intro">
        <div className="project-section__header-block">
          <div className="project-section__vertical-line"   ref={verticalLineRef}></div>
          <span className="project-section__numbering"      ref={numberingRef}>
            {projectNumber.toString().padStart(2, '0')}
          </span>
          <h2 className="project-section__title"            ref={titleRef}>
            {project.title}
          </h2>
          <div className="project-section__horizontal-line" ref={horizontalLineRef}></div>
        </div>
        <p className="project-section__caption" ref={captionRef}>
          {project.caption}
        </p>
        <p className="project-section__body-intro" ref={introBodyRef}>
          {project.bodyIntro}
        </p>
      </div>

      {/* ================================================================= */}
      {/* SECTION 1: Intro Image Grid (static) */}
      <div
        className="project-section__image-grid project-section__image-grid--intro"
        ref={introImageGridRef}
      >
        {[0, 1, 2, 3].map((idx) => (
          <img
            key={idx}
            src={getImageUrl(idx)}
            alt={`${project.title} image ${idx + 1}`}
            ref={(el) => { if (el) imageGridRefs.current[idx] = el; }}
            className="project-section__grid-image"
          />
        ))}
      </div>

      {/* ================================================================= */}
      {/* SECTION 2: Details & Tech Specs (static) */}
      <div className="project-section__details">
        <div className="project-section__details-block">
          <h3
            className="project-section__details-title"
            ref={(el) => { if (el) projectDetailsRef.current[0] = el; }}
          >
            Project Details
          </h3>
          <p ref={(el) => { if (el) projectDetailsRef.current[1] = el; }}>Client: {project.client || 'N/A'}</p>
          <p ref={(el) => { if (el) projectDetailsRef.current[2] = el; }}>Status: {project.status || 'N/A'}</p>
          <p ref={(el) => { if (el) projectDetailsRef.current[3] = el; }}>Location: {project.location || 'N/A'}</p>
        </div>

        <div className="project-section__tech-specs">
          <h3>Technical Details</h3>
          <div className="project-section__tech-specs-grid">
            {techSpecs.map((spec, idx) => (
              <div
                key={idx}
                className="tech-spec-item"
                ref={(el) => { if (el) techSpecsRef.current[idx] = el; }}
              >
                <strong>{spec.label}:</strong> {spec.value}
              </div>
            ))}
          </div>
        </div>

        <div className="project-section__process" ref={processRef}>
          <h3>Building Process</h3>
          <p>
            {project.processDetails ||
              'Detailed process text about the stages of building, from design to completion.'}
          </p>
        </div>

        <div className="project-section__image-grid project-section__image-grid--details">
          {[4, 5, 6, 7].map((idx) => (
            <img
              key={idx}
              src={getImageUrl(idx)}
              alt={`${project.title} image ${idx + 1}`}
              ref={(el) => { if (el) imageGridRefs.current[idx] = el; }}
              className="project-section__grid-image"
            />
          ))}
        </div>
      </div>

      {/* ================================================================= */}
      {/* SECTION 3: Summary & Big Images (static) */}
      <div className="project-section__summary">
        <h3 className="project-section__summary-title" ref={summaryRef}>
          Project Summary
        </h3>
        <p>
          {project.summaryContent ||
            'Comprehensive summary of the project, highlighting key features, architectural vision, and how it addresses client needs.'}
        </p>

        <div className="project-section__big-image-container" ref={bigImageContainerRef}>
          {[8, 9, 10, 11].map((idx) => (
            <img
              key={idx}
              src={getImageUrl(idx)}
              alt={`${project.title} image ${idx + 1}`}
              ref={(el) => { if (el) imageGridRefs.current[idx] = el; }}
              className="project-section__big-image"
            />
          ))}
        </div>
      </div>

      {/* The "Next Project" overlay block has been completely removed. */}

      {/* End of <section> */}
    </section>
  );
};

ProjectSection.propTypes = {
  project: PropTypes.object.isRequired,
  projectNumber: PropTypes.number.isRequired,
};

export default ProjectSection;
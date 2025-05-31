// src/components/sections/ProjectSection.jsx

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';
import '../../assets/styles/components/_project-section.scss';
import { projectsData } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = ({ project, projectNumber }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null); // Keep if used for current project title
  const horizontalLineRef = useRef(null); // Keep if used for current project
  const verticalLineRef = useRef(null); // Keep if used for current project
  const numberingRef = useRef(null); // Keep if used for current project
  const captionRef = useRef(null); // Keep if used for current project
  const introBodyRef = useRef(null); // Keep if used for current project
  const introImageGridRef = useRef(null); // Keep if used for current project
  const imageGridRefs = useRef([]);
  const projectDetailsRef = useRef([]);
  const techSpecsRef = useRef([]);
  const processRef = useRef(null);
  const summaryRef = useRef(null);
  const bigImageContainerRef = useRef(null);
  const nextProjectOverlayRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reset refs (though the specific ones for content are now within JSX)
    imageGridRefs.current = [];
    projectDetailsRef.current = [];
    techSpecsRef.current = [];

    // Hide the overlay by default (position it below)
    gsap.set(nextProjectOverlayRef.current, { autoAlpha: 0, y: '100%' });

    // Create a ScrollTrigger timeline that brings the overlay up only when
    // the bottom of this section scrolls into view (animate y: 100% → y: 0).
    const overlayTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'bottom bottom', // when this section’s bottom hits viewport bottom
        end: 'bottom top',      // to when this section’s bottom hits viewport top
        scrub: 1,
        // markers: true, // (uncomment if you want to debug)
      },
    });

    // Animate the overlay into view
    if (nextProjectOverlayRef.current) {
      overlayTl.to(nextProjectOverlayRef.current, {
        autoAlpha: 1,
        y: 0,
        ease: 'power2.out',
        duration: 1,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
      overlayTl.kill();
    };
  }, [project, projectNumber, projectsData.length]); // Added projectsData.length as a dependency for the overlay logic

  // Helper to get images (unchanged)
  const getImageUrl = (idx) => {
    const imageUrls = [
      project.imageUrl1, project.imageUrl2, project.imageUrl3, project.imageUrl4,
      project.imageUrl5, project.imageUrl6, project.imageUrl7, project.imageUrl8,
      project.imageUrl9, project.imageUrl10, project.imageUrl11, project.imageUrl12,
    ];
    return imageUrls[idx] || `https://placehold.co/600x400?text=Image+${projectNumber}-${idx + 1}`;
  };

  // Dynamically build tech specs
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

  // Determine next project (array is 0-based, but projectNumber is 1-based)
  const nextIndex = projectNumber;                    // For projectNumber=1, nextIndex=1 (second item in 0-based array)
  const hasNext = nextIndex < projectsData.length;    // only true if a “next” exists
  const nextProjectData = hasNext ? projectsData[nextIndex] : null;

  return (
    <section className="project-section" ref={sectionRef}>
      {/* ===== SECTION 1: Intro Text ===== */}
      <div className="project-section__intro">
        <div className="project-section__header-block">
          <div className="project-section__vertical-line" ref={verticalLineRef}></div>
          <span className="project-section__numbering" ref={numberingRef}>
            {projectNumber.toString().padStart(2, '0')}
          </span>
          <h2 className="project-section__title" ref={titleRef}>{project.title}</h2>
          <div className="project-section__horizontal-line" ref={horizontalLineRef}></div>
        </div>
        <p className="project-section__caption" ref={captionRef}>{project.caption}</p>
        <p className="project-section__body-intro" ref={introBodyRef}>{project.bodyIntro}</p>
      </div>

      {/* ===== SECTION 1: Intro Image Grid ===== */}
      <div className="project-section__image-grid project-section__image-grid--intro" ref={introImageGridRef}>
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

      {/* ===== SECTION 2: Details & Tech Specs ===== */}
      <div className="project-section__details">
        <div className="project-section__details-block">
          <h3 className="project-section__details-title" ref={(el) => { if (el) projectDetailsRef.current[0] = el; }}>Project Details</h3>
          <p ref={(el) => { if (el) projectDetailsRef.current[1] = el; }}>Client: {project.client || 'N/A'}</p>
          <p ref={(el) => { if (el) projectDetailsRef.current[2] = el; }}>Status: {project.status || 'N/A'}</p>
          <p ref={(el) => { if (el) projectDetailsRef.current[3] = el; }}>Location: {project.location || 'N/A'}</p>
        </div>

        <div className="project-section__tech-specs">
          <h3>Technical Details</h3>
          <div className="project-section__tech-specs-grid">
            {techSpecs.map((spec, idx) => (
              <div key={idx} className="tech-spec-item" ref={(el) => { if (el) techSpecsRef.current[idx] = el; }}>
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

      {/* ===== SECTION 3: Summary & Big Images ===== */}
      <div className="project-section__summary">
        <h3 className="project-section__summary-title" ref={summaryRef}>Project Summary</h3>
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

      {/* ===== NEXT PROJECT OVERLAY ===== */}
      {hasNext && nextProjectData && (
        <div
          className="project-section__next-project-overlay"
          ref={nextProjectOverlayRef}
        >
          <div className="project-section__header-block project-section__header-block--overlay">
            <div className="project-section__vertical-line"></div>
            <span className="project-section__numbering">
              {(projectNumber + 1).toString().padStart(2, '0')}
            </span>
            <h2 className="project-section__title">
              {nextProjectData.title}
            </h2>
            <div className="project-section__horizontal-line"></div>
          </div>
          <p className="project-section__caption">
            {nextProjectData.caption}
          </p>
        </div>
      )}
    </section>
  );
};

ProjectSection.propTypes = {
  project: PropTypes.object.isRequired,
  projectNumber: PropTypes.number.isRequired,
};

export default ProjectSection;
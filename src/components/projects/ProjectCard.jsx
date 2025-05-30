import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Modal from '../global/Modal'; // For image expansion
import Tooltip from '../global/Tooltip'; // For contextual micro-animations

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project }) => {
  const projectRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [phase, setPhase] = useState(1); // 1: Overview, 2: Specs, 3: Process
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

  // Example for phase content (you'll define this dynamically from project.data)
  const phaseContent = {
    1: {
      image: project.imageUrl1,
      headline: project.headline1,
      body: project.body1,
    },
    2: {
      image: project.imageUrl2, // Blueprint/Specs
      headline: project.headline2,
      body: project.body2,
    },
    3: {
      image: project.imageUrl3, // Final Work/Process
      headline: project.headline3,
      body: project.body3,
    },
  };

  useEffect(() => {
    // GSAP ScrollTrigger for phase transitions
    const projectElement = projectRef.current;
    if (!projectElement) return;

    ScrollTrigger.create({
      trigger: projectElement,
      start: "top center", // When top of element hits center of viewport
      end: "bottom center", // When bottom of element leaves center of viewport
      onEnter: () => setPhase(1),
      onUpdate: (self) => {
        // Adjust phase based on scroll progress within the trigger zone
        if (self.progress > 0.3 && self.progress < 0.6) {
          setPhase(2);
        } else if (self.progress >= 0.6) {
          setPhase(3);
        } else {
          setPhase(1);
        }
      },
      // markers: true, // For debugging scroll triggers
    });

    // Animate image and content changes based on phase
    gsap.to(imageRef.current, {
      opacity: 1, // Start visible
      ease: 'power2.out',
      duration: 0.8,
    });

    gsap.to(contentRef.current, {
      opacity: 1, // Start visible
      ease: 'power2.out',
      duration: 0.8,
    });

    // You'll add more complex GSAP timelines here for the deconstruct/reconstruct effects
    // For example, animating specific SVG overlays or image clips.

  }, [project]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Example for contextual micro-animation on hover
  const handleImageMouseMove = (e) => {
    // Simple example: Show tooltip when mouse is over image
    // In a real scenario, you'd identify specific coordinates/regions
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x > rect.width * 0.3 && x < rect.width * 0.7 && y > rect.height * 0.3 && y < rect.height * 0.7) {
      setTooltip({ visible: true, content: 'Facade material: Travertine', x: e.clientX, y: e.clientY });
    } else {
      setTooltip({ visible: false, content: '', x: 0, y: 0 });
    }
  };

  const handleImageMouseLeave = () => {
    setTooltip({ visible: false, content: '', x: 0, y: 0 });
  };


  return (
    <article className="project-item project-block" ref={projectRef}>
      <img
        src={phaseContent[phase].image}
        alt={project.title}
        className="project-image"
        ref={imageRef}
        onClick={handleImageClick}
        onMouseMove={handleImageMouseMove}
        onMouseLeave={handleImageMouseLeave}
      />
      <div className="project-content" ref={contentRef}>
        <h3 className="project-content__headline">{phaseContent[phase].headline}</h3>
        <p className="project-content__body">{phaseContent[phase].body}</p>
        {phase === 3 && (
          <button className="btn btn--primary">Explore Full Project Case Study</button>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <img src={phaseContent[phase].image} alt={project.title} />
      </Modal>

      <Tooltip
        visible={tooltip.visible}
        content={tooltip.content}
        x={tooltip.x}
        y={tooltip.y}
      />
    </article>
  );
};

export default ProjectCard;

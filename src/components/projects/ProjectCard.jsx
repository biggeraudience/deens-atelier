import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Modal from '../global/Modal'; 
import Tooltip from '../global/Tooltip'; 

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project }) => {
  const projectRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [phase, setPhase] = useState(1); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });


  const phaseContent = {
    1: {
      image: project.imageUrl1,
      headline: project.headline1,
      body: project.body1,
    },
    2: {
      image: project.imageUrl2, 
      headline: project.headline2,
      body: project.body2,
    },
    3: {
      image: project.imageUrl3, 
      headline: project.headline3,
      body: project.body3,
    },
  };

  useEffect(() => {
   
    const projectElement = projectRef.current;
    if (!projectElement) return;

    ScrollTrigger.create({
      trigger: projectElement,
      start: "top center", 
      end: "bottom center", 
      onEnter: () => setPhase(1),
      onUpdate: (self) => {
       
        if (self.progress > 0.3 && self.progress < 0.6) {
          setPhase(2);
        } else if (self.progress >= 0.6) {
          setPhase(3);
        } else {
          setPhase(1);
        }
      },
     
    });

  
    gsap.to(imageRef.current, {
      opacity: 1,
      ease: 'power2.out',
      duration: 0.8,
    });

    gsap.to(contentRef.current, {
      opacity: 1, 
      ease: 'power2.out',
      duration: 0.8,
    });

  

  }, [project]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleImageMouseMove = (e) => {
 
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

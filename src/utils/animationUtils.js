import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const registerGSAPPlugins = () => {
  gsap.registerPlugin(ScrollTrigger);
};

// You can add other global animation utility functions here

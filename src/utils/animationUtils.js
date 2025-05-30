import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const registerGSAPPlugins = () => {
  gsap.registerPlugin(ScrollTrigger);
};



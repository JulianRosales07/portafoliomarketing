import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const contextRef = useRef<gsap.Context>();

  useEffect(() => {
    contextRef.current = gsap.context(() => {});
    return () => contextRef.current?.revert();
  }, []);

  return contextRef.current;
};

export const animateOnScroll = (
  selector: string,
  animation: gsap.TweenVars,
  trigger?: string
) => {
  gsap.fromTo(
    selector,
    { opacity: 0, y: 50, ...animation.from },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      ...animation.to,
      scrollTrigger: {
        trigger: trigger || selector,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

export const staggerAnimation = (
  selector: string,
  stagger: number = 0.2,
  animation?: gsap.TweenVars
) => {
  gsap.fromTo(
    selector,
    { opacity: 0, y: 30, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: stagger,
      ...animation,
      scrollTrigger: {
        trigger: selector,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    }
  );
};
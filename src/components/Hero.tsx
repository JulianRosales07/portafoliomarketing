import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Calendar, User, Star, Award, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo2 from '../assets/images/logo4.png';
import logo3 from '../assets/images/logo3.png';

gsap.registerPlugin(ScrollTrigger);

const images = [logo2, logo3, 'https://via.placeholder.com/384'];

const AnimatedText: React.FC = () => {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.textContent?.trim().split(/\s+/);
      if (textRef.current && words) {
        textRef.current.innerHTML = words
          .map(word => `<span class="word inline-block opacity-0">${word}</span>`)
          .join(' ');

        const wordElements = textRef.current.querySelectorAll('.word');

        gsap.fromTo(
          wordElements,
          { opacity: 0, color: 'rgb(107, 114, 128)' },
          {
            opacity: 1,
            color: 'rgb(19, 43, 60)',
            duration: 0.3,
            stagger: 0.15,
            ease: 'power2.in',
            delay: 2,
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <p
      ref={textRef}
      className="text-base sm:text-lg text-[rgb(19,43,60)]/90 leading-relaxed font-medium"
    >
      Gracias por escribir... y estar interesado en mi trabajo como experto en marketing digital, especializado en E-commerce y Estrategia Digital.
    </p>
  );
};

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<boolean[]>(new Array(images.length).fill(false));
  const [isPaused, setIsPaused] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(badgeRef.current, 
        { opacity: 0, scale: 0.5, y: -30, rotation: -10 },
        { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 0.8, ease: 'back.out(2)' }
      );

      tl.fromTo(titleRef.current?.children || [], 
        { opacity: 0, x: -100, rotationX: 90, scale: 0.8 },
        { opacity: 1, x: 0, rotationX: 0, scale: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }, '-=0.4'
      );

      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }, '-=0.6'
      );

      tl.fromTo(statsRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.5'
      );

      tl.fromTo(messageRef.current,
        { opacity: 0, scale: 0.8, y: 30, rotationY: 15 },
        { opacity: 1, scale: 1, y: 0, rotationY: 0, duration: 1, ease: 'power2.out' }, '-=0.4'
      );

      tl.fromTo(buttonsRef.current?.children || [],
        { opacity: 0, y: 40, scale: 0.8, rotationX: 45 },
        { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.4'
      );

      tl.fromTo(imageRef.current,
        { opacity: 0, x: 100, rotationY: 25, scale: 0.8 },
        { opacity: 1, x: 0, rotationY: 0, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=1'
      );

      tl.fromTo(decorativeRef.current?.children || [],
        { opacity: 0, scale: 0, rotation: 180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(2)' }, '-=0.8'
      );

      const heroTransitionTl = gsap.timeline({
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: false,
        },
      });

      heroTransitionTl
        .to(heroContentRef.current, { duration: 1, scale: 1.2, opacity: 0.8 })
        .to(badgeRef.current, { opacity: 0 }, '<')
        .to(statsRef.current, { opacity: 0 }, '<')
        .to(buttonsRef.current, { opacity: 0 }, '<')
        .to(messageRef.current, { opacity: 0, y: -50, scale: 0.9 }, '<')
        .to(imageRef.current, { scale: 0.8, opacity: 0.3, rotationY: 15 }, 0.15)
        .to(heroContentRef.current, { opacity: 0, duration: 0.3, y: -100 }, 0.6)
        .to(heroOverlayRef.current, { opacity: 1, duration: 0.2 }, 0.8);

      const buttons = buttonsRef.current?.querySelectorAll('a');
      buttons?.forEach((button) => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, { scale: 1.08, y: -3, boxShadow: '0 10px 25px rgba(19, 43, 60, 0.2)', duration: 0.3, ease: 'power2.out' });
        });
        button.addEventListener('mouseleave', () => {
          gsap.to(button, { scale: 1, y: 0, boxShadow: '0 0px 0px rgba(19, 43, 60, 0)', duration: 0.3, ease: 'power2.out' });
        });
      });

      gsap.to(imageRef.current, {
        y: -15,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to(decorativeRef.current?.children || [], {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
        stagger: 5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    images.forEach((src, index) => {
      const img = new window.Image();
      img.src = src;
      img.onerror = () => {
        setImageError((prev) => {
          const newErrors = [...prev];
          newErrors[index] = true;
          return newErrors;
        });
      };
    });
  }, []);

  useEffect(() => {
    if (isPaused || images.length === 0) return;
    const interval = setInterval(() => {
      let nextIndex = (currentImageIndex + 1) % images.length;
      let attempts = 0;
      while (imageError[nextIndex] && attempts < images.length) {
        nextIndex = (nextIndex + 1) % images.length;
        attempts++;
      }
      setCurrentImageIndex(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, isPaused, imageError, currentImageIndex]);

  const goToPrevious = () => {
    let prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    let attempts = 0;
    while (imageError[prevIndex] && attempts < images.length) {
      prevIndex = (prevIndex - 1 + images.length) % images.length;
      attempts++;
    }
    setCurrentImageIndex(prevIndex);
  };

  const goToNext = () => {
    let nextIndex = (currentImageIndex + 1) % images.length;
    let attempts = 0;
    while (imageError[nextIndex] && attempts < images.length) {
      nextIndex = (nextIndex + 1) % images.length;
      attempts++;
    }
    setCurrentImageIndex(nextIndex);
  };

  const allImagesFailed = imageError.every((error) => error);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50/30 to-white pt-16 pb-8 relative overflow-hidden"
      aria-label="Hero section for Jhon Jiménez portfolio"
    >
      <div
        ref={heroOverlayRef}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white opacity-0 pointer-events-none z-10"
      ></div>

      <div ref={decorativeRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[rgb(19,43,60)]/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[rgb(19,43,60)]/3 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[rgb(19,43,60)]/4 rounded-full blur-lg"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={heroContentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">


            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[rgb(19,43,60)] mb-4 leading-tight"
            >
              <span className="block text-[rgb(19,43,60)]/90 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                JHON JIMÉNEZ
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-[rgb(19,43,60)]/70 mt-1">
                PMM
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl lg:text-3xl text-[rgb(19,43,60)]/70 mb-6 font-light"
            >
              Marketing Estratégico Digital
            </p>

            <div ref={statsRef} className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[rgb(19,43,60)]/10">
                <Star size={16} className="text-yellow-500" />
                <span className="text-[rgb(19,43,60)] font-semibold text-sm">+50 Proyectos</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[rgb(19,43,60)]/10">
                <Award size={16} className="text-[rgb(19,43,60)]" />
                <span className="text-[rgb(19,43,60)] font-semibold text-sm">7 Países</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[rgb(19,43,60)]/10">
                <Target size={16} className="text-green-600" />
                <span className="text-[rgb(19,43,60)] font-semibold text-sm">ROI +500%</span>
              </div>
            </div>

            <div
              ref={messageRef}
              className=" backdrop-blur-sm rounded-2xl p-5 sm:p-6 mb-6"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[rgb(19,43,60)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-[rgb(19,43,60)]" />
                </div>
                <div>
                  <AnimatedText />
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="w-6 h-0.5 bg-[rgb(19,43,60)] rounded-full"></div>
                    <span className="text-[rgb(19,43,60)]/60 text-sm font-medium">Jhon Jiménez</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4"
            >
              <a
                href="#servicios"
                className="group inline-flex items-center space-x-3 bg-[rgb(19,43,60)] text-white px-8 py-4 rounded-full hover:bg-[rgb(19,43,60)]/90 transition-all duration-300 shadow-lg w-full sm:w-auto justify-center font-semibold text-lg"
              >
                <span>Conoce mis servicios</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contacto"
                className="group inline-flex items-center space-x-3 bg-white border-2 border-[rgb(19,43,60)] text-[rgb(19,43,60)] px-8 py-4 rounded-full hover:bg-[rgb(19,43,60)] hover:text-white transition-all duration-300 shadow-lg w-full sm:w-auto justify-center font-semibold text-lg"
              >
                <span>Contáctame</span>
              </a>
              <a
                href="#planes"
                className="group inline-flex items-center space-x-3 bg-[rgb(19,43,60)] text-white px-8 py-4 rounded-full hover:bg-[rgb(19,43,60)]/90 transition-all duration-300 shadow-lg w-full sm:w-auto justify-center font-semibold text-lg"
              >
                <span>Planes</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0">
            <div
              ref={imageRef}
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[26rem] xl:h-[26rem] rounded-[2.5rem] overflow-hidden border-0 bg-white/40 backdrop-blur-md"
              style={{
                boxShadow: '0 0 0 8px rgba(255,255,255,0.5) inset',
                border: '2px solid rgba(19,43,60,0.07)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 z-10 pointer-events-none"></div>
              <AnimatePresence>
                {!imageError[currentImageIndex] && !allImagesFailed ? (
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`Jhon Jiménez - Marketing Estratégico Digital - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover object-center bg-white/60 transition-transform duration-500 group-hover:scale-105"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    onError={() => {
                      setImageError((prev) => {
                        const newErrors = [...prev];
                        newErrors[currentImageIndex] = true;
                        return newErrors;
                      });
                    }}
                  />
                ) : (
                  <motion.div
                    role="img"
                    aria-label="Placeholder for Jhon Jiménez portrait"
                    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center p-6">
                      <div className="w-20 h-20 bg-[rgb(19,43,60)]/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <User size={40} className="text-[rgb(19,43,60)]" />
                      </div>
                      <h3 className="text-lg font-bold text-[rgb(19,43,60)] mb-2">Jhon Jiménez</h3>
                      <p className="text-[rgb(19,43,60)]/70 font-medium text-sm">Marketing Digital Expert</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-20">
                  <button
                    onClick={goToPrevious}
                    aria-label="Previous image"
                    className="bg-white/80 backdrop-blur-sm text-[rgb(19,43,60)] p-2 rounded-full hover:bg-white transition-all duration-300 shadow-sm"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div className="flex space-x-1">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Go to image ${index + 1}`}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          currentImageIndex === index ? 'bg-[rgb(19,43,60)] scale-125' : 'bg-white/50 hover:bg-white/80'
                        }`}
                      ></button>
                    ))}
                  </div>
                  <button
                    onClick={goToNext}
                    aria-label="Next image"
                    className="bg-white/80 backdrop-blur-sm text-[rgb(19,43,60)] p-2 rounded-full hover:bg-white transition-all duration-300 shadow-sm"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-[rgb(19,43,60)]/10">
                <Star size={20} className="text-yellow-500" />
              </div>
              <div className="absolute -bottom-3 -left-3 w-14 h-14 bg-[rgb(19,43,60)] rounded-full shadow-lg flex items-center justify-center">
                <Award size={18} className="text-white" />
              </div>
              <div className="absolute top-1/2 -left-4 w-10 h-10 bg-green-500 rounded-full shadow-lg flex items-center justify-center">
                <Target size={14} className="text-white" />
              </div>
              <div className="absolute inset-0 rounded-3xl border-2 border-[rgb(19,43,60)]/10 pointer-events-none"></div>
              <div className="absolute top-3 left-3 bg-white/30 backdrop-blur-lg rounded-full px-2.5 py-1 shadow-md border border-white/50 z-20">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-[rgb(19,43,60)] text-xs font-semibold">anxagencia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
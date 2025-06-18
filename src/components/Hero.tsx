import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, Calendar, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import logo2 from "../assets/images/logo4.png";
import logo3 from "../assets/images/logo3.png";

const images = [logo2, logo3, "https://via.placeholder.com/384"];

const Hero: React.FC = () => {
  // Slideshow states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<boolean[]>(
    new Array(images.length).fill(false)
  );
  const [isPaused, setIsPaused] = useState(false);

  // GSAP refs
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
      );

      tl.fromTo(
        titleRef.current?.children || [],
        { opacity: 0, x: -50, rotationX: 90 },
        {
          opacity: 1,
          x: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.3"
      );

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      tl.fromTo(
        messageRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2"
      );

      tl.fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: 50, rotationY: 15 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );

      // Hover animación para los botones
      const buttons = buttonsRef.current?.querySelectorAll("a");
      buttons?.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        });
        button.addEventListener("mouseleave", () => {
          gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });

      // Floating image
      gsap.to(imageRef.current, {
        y: -10,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Slideshow logic (igual que antes)
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
      className="min-h-screen flex items-center justify-center bg-white pt-16"
      aria-label="Hero section for Jhon Jiménez portfolio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left">
            <div
              ref={badgeRef}
              className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full mb-8"
            >
              <Calendar size={16} className="text-brand-primary" />
              <span className="text-brand-primary font-semibold">2025</span>
            </div>

            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-primary mb-4"
            >
              <span className="block">PORTAFOLIO</span>
              <span className="block text-brand-primary-light">
                JOHN JIMÉNEZ
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal">
                PMM
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl text-brand-primary-lighter mb-8 font-light"
            >
              Marketing Estratégico Digital
            </p>

            <div
              ref={messageRef}
              className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-8"
            >
              <p className="text-lg text-brand-primary-light leading-relaxed">
                "Gracias por escribir... y estar interesado en mi trabajo como
                experto en marketing digital, especializado en E-commerce y
                Estrategia Digital."
              </p>
            </div>

            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <a
                href="#servicios"
                className="inline-flex items-center space-x-2 bg-[rgb(19,43,60)] text-white px-8 py-4 rounded-full hover:bg-[rgb(19,43,60)]/90 transition-all duration-300 transform hover:scale-105"
              >
                <span className="font-medium">Conoce mis servicios</span>
                <ArrowRight size={20} />
              </a>
              <a
                href="#contacto"
                aria-label="Contáctame con Jhon Jiménez"
                className="inline-flex items-center space-x-2 border-2 border-brand-primary text-brand-primary px-8 py-4 rounded-full hover:bg-brand-primary hover:text-white transition-all duration-300"
              >
                <span className="font-medium">Contáctame</span>
              </a>
              <a
                href="#planes"
                aria-label="Contáctame con Jhon Jiménez"
                className="inline-flex items-center space-x-2 bg-[rgb(19,43,60)] text-white px-8 py-4 rounded-full hover:bg-[rgb(19,43,60)]/90 transition-all duration-300 transform hover:scale-105"
              >
                <span className="font-medium">Planes</span>
              </a>
            </div>
          </div>

          {/* Right Column - Image Slideshow */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative w-full max-w-[20rem] sm:max-w-[24rem] lg:max-w-[28rem] aspect-square rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(19,43,60,0.15)] bg-gradient-to-br from-gray-50 to-gray-100"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10"></div>

              <AnimatePresence>
                {!imageError[currentImageIndex] && !allImagesFailed ? (
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`Jhon Jiménez - Marketing Estratégico Digital - Image ${
                      currentImageIndex + 1
                    }`}
                    className="w-full h-full object-cover object-center bg-white transition-transform duration-500 group-hover:scale-105"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
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
                    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center p-6">
                      <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <User size={40} className="text-brand-primary" />
                      </div>
                      <p className="text-brand-primary font-semibold text-lg">
                        Jhon Jiménez
                      </p>
                      <p className="text-brand-primary-lighter text-sm mt-1">
                        PMM - Marketing Digital
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Controls */}
              {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-20">
                  <button
                    onClick={goToPrevious}
                    aria-label="Previous image"
                    className="bg-white/80 backdrop-blur-sm text-brand-primary p-2.5 rounded-full hover:bg-white transition-all duration-300 shadow-sm"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  {/* Progress Dots */}
                  <div className="flex space-x-1.5">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Go to image ${index + 1}`}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentImageIndex === index
                            ? "bg-brand-primary scale-125"
                            : "bg-white/50 hover:bg-white/80"
                        }`}
                      ></button>
                    ))}
                  </div>
                  <button
                    onClick={goToNext}
                    aria-label="Next image"
                    className="bg-white/80 backdrop-blur-sm text-brand-primary p-2.5 rounded-full hover:bg-white transition-all duration-300 shadow-sm"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-5 -right-5 w-24 h-24 bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 rounded-full"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-5 -left-5 w-20 h-20 bg-gradient-to-br from-brand-primary/15 to-brand-primary/5 rounded-full"
                animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-white/30 backdrop-blur-lg rounded-full px-3 py-1.5 shadow-md border border-white/50 z-20">
                <div className="flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-brand-primary text-xs font-semibold">
                    anxagencia
                  </span>
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

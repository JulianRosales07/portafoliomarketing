import React, { useEffect, useRef } from 'react';
import { TrendingUp, Users, Target } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundVideo from '../assets/video/fondo.mp4';

gsap.registerPlugin(ScrollTrigger);

const Introduction: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sectionContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animación del texto principal
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animación de las tarjetas con stagger
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 40, rotationX: 15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animación de transición al scroll
      const sectionTransitionTl = gsap.timeline({
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: 1,
        },
      });

      sectionTransitionTl
        .to(sectionContentRef.current, {
          duration: 1,
          scale: 0.95,
          opacity: 0.7,
          y: -50,
        })
        .to(titleRef.current, {
          opacity: 0,
          y: -100,
          scale: 0.8,
        }, '<')
        .to(cardsRef.current, {
          opacity: 0,
          y: 50,
          stagger: 0.1,
        }, '<')
        .to(sectionContentRef.current, {
          opacity: 0,
          duration: 0.3,
        }, 0.7);

      // Animaciones de hover para las tarjetas
      const cards = cardsRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              y: -5,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      >
        <source src={BackgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgb(19,43,60)]/20 z-10 pointer-events-none"></div> {/* Menos opacidad */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionContentRef} className="max-w-4xl mx-auto text-center relative z-10">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl font-bold text-white mb-8"
          >
            Transformación Digital Estratégica
          </h2>

          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm">
            <p
              ref={textRef}
              className="text-lg sm:text-xl text-[rgb(19,43,60)]/80 leading-relaxed mb-8"
            >
              "Ahora, eres parte de quienes le apuestan a la transformación digital, como una herramienta 
              de crecimiento, buscando ser referentes en resultados (ventas), dando a conocer tu empresa 
              a través de nuevas experiencias para cada uno de tus clientes o usuarios, garantizando 
              calidad y resultados."
            </p>

            <div
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[rgb(19,43,60)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-[rgb(19,43,60)]/80" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-[rgb(19,43,60)]/80 mb-2">
                  Crecimiento
                </h3>
                <p className="text-[rgb(19,43,60)]/70">
                  Estrategias enfocadas en resultados medibles
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[rgb(19,43,60)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-[rgb(19,43,60)]/80" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-[rgb(19,43,60)]/80 mb-2">
                  Experiencias
                </h3>
                <p className="text-[rgb(19,43,60)]/70">
                  Nuevas formas de conectar con tus clientes
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[rgb(19,43,60)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-[rgb(19,43,60)]/80" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-[rgb(19,43,60)]/80 mb-2">
                  Resultados
                </h3>
                <p className="text-[rgb(19,43,60)]/70">
                  Garantía de calidad en cada proyecto
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
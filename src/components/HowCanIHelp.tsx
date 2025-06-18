import React, { useEffect, useRef } from 'react';
import { Target, Users, Settings, Repeat } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowCanIHelp: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline para la sección
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Animación del título
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      );

      // Animación del subtítulo
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4"
      );

      // Animación de las tarjetas con efecto de cascada
      tl.fromTo(cardsRef.current?.children || [],
        { opacity: 0, y: 40, x: -20, rotationX: 15 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          rotationX: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out"
        }, "-=0.2"
      );

      // Animación del CTA
      tl.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=0.3"
      );

      // Animaciones de hover para las tarjetas
      const cards = cardsRef.current?.children;
      if (cards) {
        Array.from(cards).forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
              scale: 1.03, 
              y: -5,
              rotationY: 2,
              duration: 0.3, 
              ease: "power2.out" 
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
              scale: 1, 
              y: 0,
              rotationY: 0,
              duration: 0.3, 
              ease: "power2.out" 
            });
          });
        });
      }

      // Animación de hover para el CTA
      const ctaButton = ctaRef.current?.querySelector('a');
      if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
          gsap.to(ctaButton, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        });
        ctaButton.addEventListener('mouseleave', () => {
          gsap.to(ctaButton, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const helpItems = [
    {
      title: "Plan estratégico y comercial",
      icon: <Target size={24} />,
      description: "Desarrollo de estrategias integrales alineadas con tus objetivos de negocio"
    },
    {
      title: "Segmentación de públicos alineados",
      icon: <Users size={24} />,
      description: "Identificación y análisis profundo de tus audiencias objetivo"
    },
    {
      title: "Infraestructura digital adaptada a tus necesidades",
      icon: <Settings size={24} />,
      description: "Construcción de ecosistemas digitales personalizados y escalables"
    },
    {
      title: "Modelo de adquisición de clientes constante",
      icon: <Repeat size={24} />,
      description: "Sistemas automatizados para la captación continua de leads cualificados"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-[rgb(19,43,60)] mb-8">
            ¿Cómo te puedo ayudar?
          </h2>
          <p ref={subtitleRef} className="text-xl text-[rgb(19,43,60)]/70 max-w-3xl mx-auto">
            Mi enfoque está en crear soluciones digitales que generen resultados tangibles para tu negocio
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {helpItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[rgb(19,43,60)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="text-[rgb(19,43,60)]">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[rgb(19,43,60)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[rgb(19,43,60)]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="text-center mt-12">
          <a
            href="#contacto"
            className="inline-flex items-center space-x-2 bg-[rgb(19,43,60)] text-white px-8 py-4 rounded-full hover:bg-[rgb(19,43,60)]/90 transition-all duration-300"
          >
            <span className="font-medium">Conversemos sobre tu proyecto</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowCanIHelp;
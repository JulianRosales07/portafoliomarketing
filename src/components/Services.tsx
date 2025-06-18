import React, { useEffect, useRef } from 'react';
import { Zap, ShoppingCart, Users, ArrowUp, DollarSign, TrendingDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const benefitsTitleRef = useRef<HTMLHeadingElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título principal
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de las tarjetas de servicios
      gsap.fromTo(servicesRef.current?.children || [],
        { opacity: 0, y: 60, rotationY: 15 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación del título de beneficios
      gsap.fromTo(benefitsTitleRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: benefitsTitleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de los beneficios
      gsap.fromTo(benefitsRef.current?.children || [],
        { opacity: 0, x: -30, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animaciones de hover para servicios
      const serviceCards = servicesRef.current?.children;
      if (serviceCards) {
        Array.from(serviceCards).forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
              scale: 1.05, 
              y: -10,
              rotationY: -5,
              duration: 0.4, 
              ease: "power2.out" 
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
              scale: 1, 
              y: 0,
              rotationY: 0,
              duration: 0.4, 
              ease: "power2.out" 
            });
          });
        });
      }

      // Animaciones de hover para beneficios
      const benefitItems = benefitsRef.current?.children;
      if (benefitItems) {
        Array.from(benefitItems).forEach(item => {
          item.addEventListener('mouseenter', () => {
            gsap.to(item, { 
              x: 10,
              duration: 0.3, 
              ease: "power2.out" 
            });
          });
          item.addEventListener('mouseleave', () => {
            gsap.to(item, { 
              x: 0,
              duration: 0.3, 
              ease: "power2.out" 
            });
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Marketing Estratégico",
      icon: <Zap size={32} />,
      description: "Estrategias digitales personalizadas para impulsar tu marca"
    },
    {
      title: "E-commerce",
      icon: <ShoppingCart size={32} />,
      description: "Soluciones completas para potenciar tu tienda online"
    },
    {
      title: "Consultorías",
      icon: <Users size={32} />,
      description: "Asesoramiento experto para optimizar tus procesos digitales"
    }
  ];

  const benefits = [
    {
      title: "Posiciona y genera experiencias digitales",
      icon: <ArrowUp size={24} />,
      description: "Construye una presencia digital sólida y memorable"
    },
    {
      title: "Incrementa tus leads y ventas",
      icon: <DollarSign size={24} />,
      description: "Estrategias enfocadas en conversión y ROI"
    },
    {
      title: "Convierte más, mejora tus ventas y disminuye tus costos",
      icon: <TrendingDown size={24} />,
      description: "Optimización inteligente de recursos y procesos"
    }
  ];

  return (
    <section ref={sectionRef} id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Section */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-[rgb(19,43,60)] mb-8">
            Servicios Especializados
          </h2>
          
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[rgb(19,43,60)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-[rgb(19,43,60)]">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[rgb(19,43,60)] mb-4">
                  {service.title}
                </h3>
                <p className="text-[rgb(19,43,60)]/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 rounded-2xl p-8 sm:p-12">
          <h3 ref={benefitsTitleRef} className="text-2xl sm:text-3xl font-bold text-[rgb(19,43,60)] text-center mb-10">
            Beneficios Destacados
          </h3>
          
          <div ref={benefitsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[rgb(19,43,60)] rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[rgb(19,43,60)] mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-[rgb(19,43,60)]/70">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
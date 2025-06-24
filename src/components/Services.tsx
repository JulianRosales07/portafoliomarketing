import React, { useEffect, useRef } from 'react';
import { Zap, ShoppingCart, Users, ArrowUp, DollarSign, TrendingDown, Target, Brain, Lightbulb } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const benefitsTitleRef = useRef<HTMLHeadingElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const sectionContentRef = useRef<HTMLDivElement>(null);

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
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de las tarjetas de servicios
      gsap.fromTo(servicesRef.current?.children || [],
        { opacity: 0, y: 60, rotationY: 10 },
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
            start: "top 85%",
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

      // Animación de transición al scroll (ajustada para mejor visibilidad)
      const servicesTransitionTl = gsap.timeline({
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%", // Inicia más arriba para mantener visibilidad
          end: "bottom -20%", // Extiende el final para suavizar
          scrub: 0.5, // Suaviza la transición
        },
      });

      servicesTransitionTl
        .to(sectionContentRef.current, { 
          duration: 1, 
          scale: 0.98, // Escala menos agresiva
          opacity: 0.85, // Mantiene más opacidad
          y: -30 // Movimiento vertical más suave
        })
        .to(titleRef.current, { 
          opacity: 0.7, // No desaparece completamente
          y: -50, // Menos desplazamiento
          scale: 0.9
        }, "<")
        .to(servicesRef.current, { 
          opacity: 0.8, // Mantiene visibilidad
          y: 40, // Menos desplazamiento
          stagger: 0.1
        }, "<")
        .to(benefitsRef.current, { 
          opacity: 0.8, // Mantiene visibilidad
          x: -40, // Menos desplazamiento
          stagger: 0.1
        }, "<");

      // Animaciones de hover para servicios
      const serviceCards = servicesRef.current?.children;
      if (serviceCards) {
        Array.from(serviceCards).forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
              scale: 1.03, 
              y: -8,
              boxShadow: "0 10px 20px rgba(19, 43, 60, 0.1)",
              duration: 0.3, 
              ease: "power2.out" 
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
              scale: 1, 
              y: 0,
              boxShadow: "0 0px 0px rgba(19, 43, 60, 0)",
              duration: 0.3, 
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
              x: 8,
              boxShadow: "0 10px 20px rgba(19, 43, 60, 0.1)",
              duration: 0.3, 
              ease: "power2.out" 
            });
          });
          item.addEventListener('mouseleave', () => {
            gsap.to(item, { 
              x: 0,
              boxShadow: "0 0px 0px rgba(19, 43, 60, 0)",
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
      icon: <Brain size={32} />,
      description: "Estrategias digitales personalizadas para impulsar tu marca",
      features: ["Análisis de mercado", "Estrategia de contenido", "Posicionamiento de marca", "Growth hacking"],
      color: "from-white to-[rgb(19,43,60)]/10", // Fondo blanco con leve azul
      iconBg: "bg-[rgb(19,43,60)]/10",
      iconColor: "text-[rgb(19,43,60)]/80"
    },
    {
      title: "E-commerce",
      icon: <ShoppingCart size={32} />,
      description: "Soluciones completas para potenciar tu tienda online",
      features: ["Optimización de conversión", "UX/UI para ventas", "Automatización", "Analytics avanzado"],
      color: "from-white to-[rgb(19,43,60)]/10",
      iconBg: "bg-[rgb(19,43,60)]/10",
      iconColor: "text-[rgb(19,43,60)]/80"
    },
    {
      title: "Consultorías",
      icon: <Users size={32} />,
      description: "Asesoramiento experto para optimizar tus procesos digitales",
      features: ["Auditoría digital", "Transformación digital", "Capacitación", "Mentoring estratégico"],
      color: "from-white to-[rgb(19,43,60)]/10",
      iconBg: "bg-[rgb(19,43,60)]/10",
      iconColor: "text-[rgb(19,43,60)]/80"
    }
  ];

  const benefits = [
    {
      title: "Posiciona y genera experiencias digitales",
      icon: <Target size={24} />,
      description: "Construye una presencia digital sólida y memorable que conecte con tu audiencia objetivo",
      metrics: "+300% engagement promedio"
    },
    {
      title: "Incrementa tus leads y ventas",
      icon: <DollarSign size={24} />,
      description: "Estrategias enfocadas en conversión y ROI que transforman visitantes en clientes",
      metrics: "+500% ROI promedio"
    },
    {
      title: "Convierte más, mejora tus ventas y disminuye tus costos",
      icon: <TrendingDown size={24} />,
      description: "Optimización inteligente de recursos y procesos para maximizar resultados",
      metrics: "-40% costos de adquisición"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div ref={sectionContentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[rgb(19,43,60)]/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[rgb(19,43,60)]/3 rounded-full blur-2xl"></div>
        </div>

        {/* Services Section */}
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(19,43,60)] mb-8"
          >
            Servicios Especializados
          </h2>
          
          <div ref={servicesRef} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${service.color} rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-[rgb(19,43,60)]/10`}
                role="region"
                aria-label={`Servicio: ${service.title}`}
              >
                <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <div className={service.iconColor}>
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[rgb(19,43,60)]/80 mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-[rgb(19,43,60)]/70 leading-relaxed mb-6 text-center">
                  {service.description}
                </p>
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-[rgb(19,43,60)]/80 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-[rgb(19,43,60)]/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-3xl p-10 sm:p-16 shadow-sm border border-gray-100">
          <h3
            ref={benefitsTitleRef}
            className="text-2xl sm:text-3xl font-bold text-[rgb(19,43,60)] text-center mb-12"
          >
            Beneficios Destacados
          </h3>
          
          <div ref={benefitsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center"
                role="region"
                aria-label={`Beneficio: ${benefit.title}`}
              >
                <div className="w-16 h-16 bg-[rgb(19,43,60)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-[rgb(19,43,60)] mb-4">
                  {benefit.title}
                </h4>
                <p className="text-[rgb(19,43,60)]/70 mb-4 leading-relaxed">
                  {benefit.description}
                </p>
                <div className="inline-flex items-center bg-[rgb(19,43,60)]/5 rounded-full px-4 py-2">
                  <Lightbulb size={16} className="text-[rgb(19,43,60)] mr-2" aria-hidden="true" />
                  <span className="text-[rgb(19,43,60)] font-medium text-sm">
                    {benefit.metrics}
                  </span>
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
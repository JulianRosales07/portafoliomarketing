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
      icon: <Brain size={32} />,
      description: "Estrategias digitales personalizadas para impulsar tu marca",
      features: ["Análisis de mercado", "Estrategia de contenido", "Posicionamiento de marca", "Growth hacking"],
      color: "from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "E-commerce",
      icon: <ShoppingCart size={32} />,
      description: "Soluciones completas para potenciar tu tienda online",
      features: ["Optimización de conversión", "UX/UI para ventas", "Automatización", "Analytics avanzado"],
      color: "from-green-50 to-emerald-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Consultorías",
      icon: <Users size={32} />,
      description: "Asesoramiento experto para optimizar tus procesos digitales",
      features: ["Auditoría digital", "Transformación digital", "Capacitación", "Mentoring estratégico"],
      color: "from-purple-50 to-violet-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
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
    <section ref={sectionRef} id="servicios" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Section */}
        <div className="text-center mb-20">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-[rgb(19,43,60)] mb-8">
            Servicios Especializados
          </h2>
          
          <div ref={servicesRef} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${service.color} rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-white/50`}
              >
                <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <div className={service.iconColor}>
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[rgb(19,43,60)] mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-[rgb(19,43,60)]/70 leading-relaxed mb-6 text-center">
                  {service.description}
                </p>
                
                {/* Features List */}
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-[rgb(19,43,60)] rounded-full mr-3 flex-shrink-0"></div>
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
          <h3 ref={benefitsTitleRef} className="text-2xl sm:text-3xl font-bold text-[rgb(19,43,60)] text-center mb-12">
            Beneficios Destacados
          </h3>
          
          <div ref={benefitsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
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
                  <Lightbulb size={16} className="text-[rgb(19,43,60)] mr-2" />
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
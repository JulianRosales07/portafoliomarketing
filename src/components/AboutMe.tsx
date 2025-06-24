import React, { useEffect, useRef, useState } from 'react';
import { 
  User, 
  Brain, 
  Target, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Award, 
  BookOpen,
  Zap,
  Heart,
  Globe,
  CheckCircle
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import john from '../assets/images/logo3.png';

gsap.registerPlugin(ScrollTrigger);

const AboutMe: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const animatedTextRef = useRef<HTMLParagraphElement>(null);
  const sectionContentRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

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

      // Animación de color del texto principal
      if (animatedTextRef.current) {
        gsap.fromTo(animatedTextRef.current,
          { color: "rgba(19, 43, 60, 0.4)", opacity: 0.7 },
          {
            color: "rgba(19, 43, 60, 0.9)",
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: animatedTextRef.current,
              start: "top 75%",
              end: "bottom 25%",
              scrub: 0.5,
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }

      // Animación de la introducción
      gsap.fromTo(introRef.current,
        { opacity: 0, y: 40, rotationX: 10 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de habilidades
      gsap.fromTo(skillsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de valores
      gsap.fromTo(valuesRef.current?.children || [],
        { opacity: 0, x: -30, rotationY: 10 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de experiencia
      gsap.fromTo(experienceRef.current?.children || [],
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de filosofía
      gsap.fromTo(philosophyRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de transición al scroll (ajustada para mejor visibilidad)
      const aboutTransitionTl = gsap.timeline({
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%", // Inicia más arriba para mantener visibilidad
          end: "bottom -20%", // Extiende el final para suavizar
          scrub: 0.5, // Reducido para transiciones más suaves
        },
      });

      aboutTransitionTl
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
        .to(skillsRef.current, { 
          opacity: 0.8, // Mantiene visibilidad
          y: 40, // Menos desplazamiento
          stagger: 0.1
        }, "<")
        .to(valuesRef.current, { 
          opacity: 0.8, // Mantiene visibilidad
          x: -40, // Menos desplazamiento
          stagger: 0.1
        }, "<")
        .to(experienceRef.current, { 
          opacity: 0.8, // Mantiene visibilidad
          scale: 0.95
        }, "<")
        .to(philosophyRef.current, { 
          opacity: 0.8, // Mantiene visibilidad
          scale: 0.95,
          y: 20
        }, "<");

      // Animaciones de hover
      const skillCards = skillsRef.current?.children;
      if (skillCards) {
        Array.from(skillCards).forEach(card => {
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

      const valueCards = valuesRef.current?.children;
      if (valueCards) {
        Array.from(valueCards).forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
              x: 8,
              boxShadow: "0 10px 20px rgba(19, 43, 60, 0.1)",
              duration: 0.3, 
              ease: "power2.out" 
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
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

  const skills = [
    {
      category: "Estrategia Digital",
      icon: <Brain size={24} />,
      items: ["Marketing Strategy", "Digital Transformation", "Growth Hacking", "Data Analytics"]
    },
    {
      category: "E-commerce",
      icon: <TrendingUp size={24} />,
      items: [ "Conversion Optimization", "UX/UI Strategy"]
    },
    {
      category: "Publicidad Digital",
      icon: <Target size={24} />,
      items: ["Meta Ads", "Google Ads", "LinkedIn Ads", "TikTok Ads"]
    },
    {
      category: "Herramientas",
      icon: <Zap size={24} />,
      items: ["Google Analytics", "Facebook Business", "HubSpot"]
    }
  ];

  const values = [
    {
      title: "Orientación a Resultados",
      description: "Estrategias diseñadas para generar ROI medible y crecimiento sostenible.",
      icon: <Award size={20} />
    },
    {
      title: "Innovación Constante",
      description: "Explorando nuevas tendencias y tecnologías para mantener ventaja competitiva.",
      icon: <Lightbulb size={20} />
    },
    {
      title: "Colaboración Estratégica",
      description: "Trabajo en equipo con clientes para soluciones personalizadas y efectivas.",
      icon: <Users size={20} />
    },
    {
      title: "Aprendizaje Continuo",
      description: "Actualización constante en tendencias de marketing digital.",
      icon: <BookOpen size={20} />
    }
  ];

  const experience = [
    {
      metric: "+6 años",
      description: "Experiencia en Marketing Digital",
      icon: <User size={24} />
    },
    {
      metric: "+50",
      description: "Proyectos Exitosos",
      icon: <CheckCircle size={24} />
    },
    {
      metric: "7 países",
      description: "Presencia Internacional",
      icon: <Globe size={24} />
    },
    {
      metric: "+500% ROI",
      description: "Promedio en Campañas",
      icon: <TrendingUp size={24} />
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="sobre-mi"
      className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
      aria-labelledby="about-me-heading"
    >
      <div ref={sectionContentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[rgb(19,43,60)]/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[rgb(19,43,60)]/3 rounded-full blur-2xl"></div>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            id="about-me-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[rgb(19,43,60)] mb-8 tracking-tight"
          >
            Sobre Mí
          </h2>
        </div>

        {/* Introduction */}
        <div ref={introRef} className="max-w-4xl mx-auto mb-24">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[rgb(19,43,60)]/10 transition-all duration-300 group-hover:to-[rgb(19,43,60)]/20"></div>
              {!imageError ? (
                <img
                  src={john}
                  alt="John Jiménez, Product Marketing Manager"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-105"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[rgb(19,43,60)]/10">
                  <User size={48} className="text-[rgb(19,43,60)]" aria-hidden="true" />
                </div>
              )}
              <div className="absolute inset-0 rounded-2xl border-2 border-[rgb(19,43,60)]/10 transition-all duration-300 group-hover:border-[rgb(19,43,60)]/20 group-hover:shadow-[0_0_12px_rgba(19,43,60,0.15)]"></div>
              <div className="absolute top-3 right-3 bg-[rgb(19,43,60)]/80 rounded-full px-3 py-1 text-xs font-semibold text-white transition-all duration-300 group-hover:bg-[rgb(19,43,60)] group-hover:scale-105">
                PMM
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-[rgb(19,43,60)] mb-4">
                John Jiménez - Product Marketing Manager
              </h3>
              <p
                ref={animatedTextRef}
                className="text-lg leading-relaxed text-[rgb(19,43,60)]/90 mb-6 text-balance text-justify"
              >
                Soy Mercadólogo con más de 6 años de experiencia en marketing y publicidad digital e innovación. He desarrollado productos y servicios a nivel nacional e internacional en sectores como moda, medicina estética, inmobiliario, gastronómico y hospitalidad. Mi enfoque en transformación digital, análisis de datos, paid media y comunicaciones ha impulsado el crecimiento, la sostenibilidad y la expansión de empresas en el mediano plazo.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-24">
          <h3 className="text-2xl sm:text-3xl font-bold text-[rgb(19,43,60)] text-center mb-12">
            Áreas de Especialización
          </h3>
          <div
            ref={skillsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                role="region"
                aria-label={`Habilidad: ${skill.category}`}
              >
                <div className="w-12 h-12 bg-[rgb(19,43,60)]/10 rounded-full flex items-center justify-center mb-4">
                  <div className="text-[rgb(19,43,60)]">{skill.icon}</div>
                </div>
                <h4 className="text-lg font-semibold text-[rgb(19,43,60)] mb-3">
                  {skill.category}
                </h4>
                <ul className="space-y-2">
                  {skill.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-[rgb(19,43,60)]/70 text-sm flex items-center"
                    >
                      <div className="w-1.5 h-1.5 bg-[rgb(19,43,60)] rounded-full mr-2"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Metrics */}
        <div className="mb-24">
          <h3 className="text-2xl sm:text-3xl font-bold text-[rgb(19,43,60)] text-center mb-12">
            Logros Profesionales
          </h3>
          <div
            ref={experienceRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {experience.map((item, index) => (
              <div
                key={index}
                className="text-center bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden group"
                role="region"
                aria-label={`Logro: ${item.description}`}
              >
                <div className="absolute inset-0 bg-[rgb(19,43,60)]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="w-14 h-14 bg-[rgb(19,43,60)]/10 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <div className="text-[rgb(19,43,60)]">{item.icon}</div>
                </div>
                <div className="text-2xl font-bold text-[rgb(19,43,60)] mb-2 relative z-10">
                  {item.metric}
                </div>
                <p className="text-[rgb(19,43,60)]/70 text-sm relative z-10">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h3 className="text-2xl sm:text-3xl font-bold text-[rgb(19,43,60)] text-center mb-12">
            Mis Valores Profesionales
          </h3>
          <div
            ref={valuesRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {values.map((value, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm transition-all duration-300"
                role="region"
                aria-label={`Valor: ${value.title}`}
              >
                <div className="w-10 h-10 bg-[rgb(19,43,60)] rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="text-white">{value.icon}</div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[rgb(19,43,60)] mb-2">
                    {value.title}
                  </h4>
                  <p className="text-[rgb(19,43,60)]/70 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div
          ref={philosophyRef}
          className="bg-[rgb(19,43,60)] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          role="region"
          aria-label="Filosofía de trabajo"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(19,43,60)] to-[rgb(44,62,80)]/80 opacity-20"></div>
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={28} className="text-white" aria-hidden="true" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Mi Filosofía de Trabajo
            </h3>
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              "El marketing digital exitoso va más allá de métricas; se trata de forjar conexiones auténticas entre marcas y personas. Cada proyecto es una oportunidad para narrar historias que inspiren, generen valor y construyan relaciones duraderas."
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-0.5 bg-white/40 rounded-full"></div>
              <span className="text-white/80 font-medium">
                John Jiménez, PMM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
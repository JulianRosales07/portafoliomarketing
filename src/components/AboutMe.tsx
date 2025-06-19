import React, { useEffect, useRef } from 'react';
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

      // Animación de la introducción
      gsap.fromTo(introRef.current,
        { opacity: 0, y: 40, rotationX: 15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de habilidades
      gsap.fromTo(skillsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de valores
      gsap.fromTo(valuesRef.current?.children || [],
        { opacity: 0, x: -40, rotationY: 15 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.15,
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
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
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
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animaciones de hover para habilidades
      const skillCards = skillsRef.current?.children;
      if (skillCards) {
        Array.from(skillCards).forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
              scale: 1.05, 
              y: -5,
              duration: 0.3, 
              ease: "power2.out" 
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
              scale: 1, 
              y: 0,
              duration: 0.3, 
              ease: "power2.out" 
            });
          });
        });
      }

      // Animaciones de hover para valores
      const valueCards = valuesRef.current?.children;
      if (valueCards) {
        Array.from(valueCards).forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
              x: 5,
              duration: 0.3, 
              ease: "power2.out" 
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
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

  const skills = [
    {
      category: "Estrategia Digital",
      icon: <Brain size={24} />,
      items: ["Marketing Strategy", "Digital Transformation", "Growth Hacking", "Data Analytics"]
    },
    {
      category: "E-commerce",
      icon: <TrendingUp size={24} />,
      items: ["Shopify", "WooCommerce", "Conversion Optimization", "UX/UI Strategy"]
    },
    {
      category: "Publicidad Digital",
      icon: <Target size={24} />,
      items: ["Meta Ads", "Google Ads", "LinkedIn Ads", "TikTok Ads"]
    },
    {
      category: "Herramientas",
      icon: <Zap size={24} />,
      items: ["Google Analytics", "Facebook Business", "Klaviyo", "HubSpot"]
    }
  ];

  const values = [
    {
      title: "Orientación a Resultados",
      description: "Cada estrategia está diseñada para generar ROI medible y crecimiento sostenible.",
      icon: <Award size={20} />
    },
    {
      title: "Innovación Constante",
      description: "Siempre explorando nuevas tendencias y tecnologías para mantener ventaja competitiva.",
      icon: <Lightbulb size={20} />
    },
    {
      title: "Colaboración Estratégica",
      description: "Trabajo en equipo con clientes para crear soluciones personalizadas y efectivas.",
      icon: <Users size={20} />
    },
    {
      title: "Aprendizaje Continuo",
      description: "Actualización constante en las últimas tendencias del marketing digital.",
      icon: <BookOpen size={20} />
    }
  ];

  const experience = [
    {
      metric: "+5 años",
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
    <section ref={sectionRef} id="sobre-mi" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl font-extrabold text-[rgb(19,43,60)] mb-8 tracking-tight">
            Sobre Mí
          </h2>
        </div>

        {/* Introduction */}
        <div ref={introRef} className="max-w-4xl mx-auto mb-24">
          <div className="bg-white rounded-3xl p-10 sm:p-14 shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                <img 
                  src={john} 
                  alt="Jhon Jiménez" 
                  className="w-full h-full object-cover rounded-full border-4 border-[rgb(19,43,60)]/10"
                />

              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-[rgb(19,43,60)] mb-4">
                  John Jiménez - Product Marketing Manager
                </h3>
                <p className="text-lg text-[rgb(19,43,60)]/80 leading-relaxed mb-6 text-balance">
                Soy Mercadólogo con más de 6 años de experiencia en marketing y publicidad digital e innovación, he desarrollado productos y servicios a nivel nacional e internacional en sectores como: moda en textiles y accesorios, medicina estética y de belleza, inmobiliario, gastronómico y hospitalidad. Además he participado en la formulación y ejecución de proyectos de fortalecimiento empresarial desde la transformación digital, análisis de datos, paid media y comunicaciones, aportando así, a procesos de crecimiento, sostenibilidad y expansión en el mediano plazo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-[rgb(19,43,60)] text-center mb-12">
            Áreas de Especialización
          </h3>
          
          <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[rgb(19,43,60)]/10 rounded-2xl flex items-center justify-center mb-5">
                  <div className="text-[rgb(19,43,60)]">
                    {skill.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-[rgb(19,43,60)] mb-4">
                  {skill.category}
                </h4>
                <ul className="space-y-3">
                  {skill.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-[rgb(19,43,60)]/70 text-sm flex items-center">
                      <div className="w-2 h-2 bg-[rgb(19,43,60)] rounded-full mr-3"></div>
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
          <div ref={experienceRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {experience.map((item, index) => (
              <div
                key={index}
                className="text-center bg-white rounded-3xl p-8 shadow-sm"
              >
                <div className="w-16 h-16 bg-[rgb(19,43,60)]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <div className="text-[rgb(19,43,60)]">
                    {item.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-[rgb(19,43,60)] mb-3">
                  {item.metric}
                </div>
                <p className="text-[rgb(19,43,60)]/70 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-[rgb(19,43,60)] text-center mb-12">
            Mis Valores Profesionales
          </h3>
          
          <div ref={valuesRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex items-start space-x-5 bg-white rounded-3xl p-8 shadow-sm"
              >
                <div className="w-12 h-12 bg-[rgb(19,43,60)] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <div className="text-white">
                    {value.icon}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[rgb(19,43,60)] mb-3">
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
        <div ref={philosophyRef} className="bg-[rgb(19,43,60)] rounded-3xl p-10 sm:p-14 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Mi Filosofía de Trabajo
            </h3>
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              "Creo firmemente que el marketing digital exitoso no se trata solo de números y métricas, 
              sino de crear conexiones auténticas entre las marcas y las personas. Cada proyecto es una 
              oportunidad de contar una historia que resuene, genere valor y construya relaciones duraderas."
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-0.5 bg-white/40 rounded-full"></div>
              <span className="text-white/80 font-medium">Jhon Jiménez, PMM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
import React, { useEffect, useRef } from 'react';
import { TrendingUp, DollarSign, Target, Shirt, Sparkles, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Results: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const campaignsRef = useRef<HTMLDivElement>(null);
  const categoriesTitleRef = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título y subtítulo
      gsap.fromTo([titleRef.current, subtitleRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de las campañas destacadas
      gsap.fromTo(campaignsRef.current?.children || [],
        { opacity: 0, y: 60, rotationX: 15, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: campaignsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación del título de categorías
      gsap.fromTo(categoriesTitleRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: categoriesTitleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animación de las categorías de servicios
      gsap.fromTo(categoriesRef.current?.children || [],
        { opacity: 0, y: 40, x: -30 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animaciones de hover para campañas
      const campaignCards = campaignsRef.current?.children;
      if (campaignCards) {
        Array.from(campaignCards).forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
              scale: 1.02, 
              y: -10,
              rotationY: 2,
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

      // Animaciones de hover para categorías
      const categoryCards = categoriesRef.current?.children;
      if (categoryCards) {
        Array.from(categoryCards).forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
              scale: 1.03, 
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

      // Animación de contadores (números)
      const animateCounters = () => {
        const counters = document.querySelectorAll('.counter-number');
        counters.forEach(counter => {
          const target = counter.textContent?.replace(/[^0-9]/g, '') || '0';
          const targetNumber = parseInt(target);
          
          gsap.fromTo(counter, 
            { textContent: 0 },
            {
              textContent: targetNumber,
              duration: 2,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: counter,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      };

      animateCounters();

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredCampaigns = [
    {
      title: "Sector Moda y Accesorios",
      platform: "Meta Ads",
      investment: "$1.404.207",
      sales: "$14.732.345",
      roi: "948%",
      icon: <Shirt size={24} />,
      metrics: {
        reach: "28.056",
        conversions: "242",
        ctr: "2.55%"
      }
    },
    {
      title: "Sector Moda y Accesorios",
      platform: "Google Ads",
      investment: "$1.915.000",
      sales: "$13.141.250",
      roi: "586%",
      icon: <Target size={24} />,
      metrics: {
        reach: "1.8M+",
        conversions: "12,234",
        ctr: "2.8%"
      }
    }
  ];

  const serviceCategories = [
    {
      title: "E-commerce & Retail",
      icon: <Shirt size={32} />,
      description: "Estrategias especializadas para tiendas online y retail",
      sectors: [
        { name: "Moda y Accesorios", projects: "15+" },
        { name: "Calzado", projects: "8+" },
        { name: "Ropa Interior", projects: "5+" }
      ],
      color: "from-blue-50 to-indigo-50"
    },
    {
      title: "Belleza & Cuidado Personal",
      icon: <Sparkles size={32} />,
      description: "Campañas digitales para marcas de belleza y wellness",
      sectors: [
        { name: "Cosméticos", projects: "12+" },
        { name: "Cuidado de la Piel", projects: "7+" },
        { name: "Productos Naturales", projects: "4+" }
      ],
      color: "from-pink-50 to-rose-50"
    },
    {
      title: "Tecnología & Servicios",
      icon: <Zap size={32} />,
      description: "Soluciones digitales para empresas tech y servicios B2B",
      sectors: [
        { name: "Software & Apps", projects: "10+" },
        { name: "Consultoría", projects: "6+" },
        { name: "Servicios Digitales", projects: "8+" }
      ],
      color: "from-green-50 to-emerald-50"
    }
  ];

  const calculateROI = (investment: string, sales: string) => {
    const inv = parseInt(investment.replace(/[$.,]/g, ''));
    const sal = parseInt(sales.replace(/[$.,]/g, ''));
    return Math.round(((sal - inv) / inv) * 100);
  };

  return (
    <section ref={sectionRef} id="resultados" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-[rgb(19,43,60)] mb-8">
            Resultados que Hablan por Sí Solos
          </h2>
          <p ref={subtitleRef} className="text-xl text-[rgb(19,43,60)]/70 max-w-3xl mx-auto">
            Casos de éxito reales con métricas comprobadas y ROI excepcional
          </p>
        </div>

        {/* Featured Campaign Results */}
        <div ref={campaignsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {featuredCampaigns.map((campaign, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[rgb(19,43,60)]/10 rounded-full flex items-center justify-center mr-4">
                    <div className="text-[rgb(19,43,60)]">
                      {campaign.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[rgb(19,43,60)]">
                      {campaign.title}
                    </h3>
                    <p className="text-[rgb(19,43,60)]/60 text-sm">
                      {campaign.platform}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="counter-number text-2xl font-bold text-green-600">
                    +{calculateROI(campaign.investment, campaign.sales)}%
                  </div>
                  <div className="text-xs text-[rgb(19,43,60)]/60">ROI</div>
                </div>
              </div>

              {/* Main Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp size={16} className="text-[rgb(19,43,60)] mr-2" />
                    <span className="text-xs text-[rgb(19,43,60)]/70">Inversión</span>
                  </div>
                  <div className="text-lg font-bold text-[rgb(19,43,60)]">
                    {campaign.investment}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign size={16} className="text-[rgb(19,43,60)] mr-2" />
                    <span className="text-xs text-[rgb(19,43,60)]/70">Ventas</span>
                  </div>
                  <div className="text-lg font-bold text-[rgb(19,43,60)]">
                    {campaign.sales}
                  </div>
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-[rgb(19,43,60)]/5 rounded-lg">
                  <div className="counter-number text-sm font-bold text-[rgb(19,43,60)]">
                    {campaign.metrics.reach}
                  </div>
                  <div className="text-xs text-[rgb(19,43,60)]/60">Alcance</div>
                </div>
                <div className="text-center p-3 bg-[rgb(19,43,60)]/5 rounded-lg">
                  <div className="counter-number text-sm font-bold text-[rgb(19,43,60)]">
                    {campaign.metrics.conversions}
                  </div>
                  <div className="text-xs text-[rgb(19,43,60)]/60">Conversiones</div>
                </div>
                <div className="text-center p-3 bg-[rgb(19,43,60)]/5 rounded-lg">
                  <div className="text-sm font-bold text-[rgb(19,43,60)]">
                    {campaign.metrics.ctr}
                  </div>
                  <div className="text-xs text-[rgb(19,43,60)]/60">CTR</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Categories */}
        <div className="mb-16">
          <h3 ref={categoriesTitleRef} className="text-2xl font-bold text-[rgb(19,43,60)] text-center mb-12">
            Sectores de Especialización
          </h3>
          
          <div ref={categoriesRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${category.color} rounded-3xl p-8 hover:shadow-lg transition-all duration-300`}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <div className="text-[rgb(19,43,60)]">
                      {category.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-[rgb(19,43,60)] mb-2">
                    {category.title}
                  </h4>
                  <p className="text-[rgb(19,43,60)]/70 text-sm">
                    {category.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {category.sectors.map((sector, sectorIndex) => (
                    <div
                      key={sectorIndex}
                      className="flex items-center justify-between bg-white/70 rounded-lg p-3"
                    >
                      <span className="text-[rgb(19,43,60)] font-medium text-sm">
                        {sector.name}
                      </span>
                      <span className="counter-number text-[rgb(19,43,60)]/60 text-xs font-semibold">
                        {sector.projects}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
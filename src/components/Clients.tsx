import React, { useEffect, useRef } from "react";
import { Globe, MapPin, Building2, Sparkles, ShoppingBag } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import IverusLogo from "../assets/images/iverus.png";
import NavegantesLogo from "../assets/images/navegantes.png";
import LAGirlLogo from "../assets/images/l.a.png";
import BeTrepLogo from "../assets/images/betrep.png";
import ExcitedLogo from "../assets/images/excited.png";
import MarioHernandezLogo from "../assets/images/mh.png";
import PerfekLogo from "../assets/images/p.png";
import LexiusLogo from "../assets/images/lexius.png";
import FallbackLogo from "../assets/images/FallbackLogo.png";

gsap.registerPlugin(ScrollTrigger);

const Clients: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const countriesRef = useRef<HTMLDivElement>(null);
  const clientSectionsRef = useRef<HTMLDivElement>(null);
  const finalMessageRef = useRef<HTMLDivElement>(null);
  const sectionContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título y subtítulo
      gsap.fromTo(
        [titleRef.current, subtitleRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animación de los países
      gsap.fromTo(
        countriesRef.current?.querySelectorAll(".country-card") || [],
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: countriesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animación de las secciones de clientes
      const clientSections = clientSectionsRef.current?.children;
      if (clientSections) {
        Array.from(clientSections).forEach((section, index) => {
          gsap.fromTo(
            section,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50, rotationY: 10 },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Animación de las tarjetas de clientes
          const clientCards = section.querySelectorAll(".client-card");
          gsap.fromTo(
            clientCards,
            { opacity: 0, y: 30, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      // Animación del mensaje final
      gsap.fromTo(
        finalMessageRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: finalMessageRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animación de transición al scroll
      const clientsTransitionTl = gsap.timeline({
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          end: "bottom -20%",
          scrub: 0.5,
        },
      });

      clientsTransitionTl
        .to(sectionContentRef.current, {
          duration: 1,
          scale: 0.98,
          opacity: 0.85,
          y: -30,
        })
        .to(titleRef.current, {
          opacity: 0.7,
          y: -50,
          scale: 0.9,
        }, "<")
        .to(countriesRef.current, {
          opacity: 0.8,
          y: 40,
          stagger: 0.1,
        }, "<")
        .to(clientSectionsRef.current, {
          opacity: 0.8,
          x: -40,
          stagger: 0.1,
        }, "<")
        .to(finalMessageRef.current, {
          opacity: 0.8,
          scale: 0.95,
          y: 20,
        }, "<");

      // Hover países
      const countryCards = countriesRef.current?.querySelectorAll(".country-card");
      countryCards?.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -5,
            boxShadow: "0 10px 20px rgba(19, 43, 60, 0.1)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            boxShadow: "0 0px 0px rgba(19, 43, 60, 0)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Hover clientes
      const clientCards = document.querySelectorAll(".client-card");
      clientCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.03,
            y: -8,
            boxShadow: "0 10px 20px rgba(19, 43, 60, 0.1)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            boxShadow: "0 0px 0px rgba(19, 43, 60, 0)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const countries = [
    { name: "Colombia", code: "CO", flag: "🇨🇴" },
    { name: "México", code: "MX", flag: "🇲🇽" },
    { name: "Estados Unidos", code: "US", flag: "🇺🇸" },
    { name: "Panamá", code: "PA", flag: "🇵🇦" },
    { name: "Chile", code: "CL", flag: "🇨🇱" },
    { name: "Brasil", code: "BR", flag: "🇧🇷" },
    { name: "España", code: "ES", flag: "🇪🇸" },
  ];

  const clientsByCountry = [
    {
      country: "Estados Unidos",
      flag: "🇺🇸",
      clients: [
        {
          name: "IVERUS",
          industry: "Consultoría Tecnológica",
          logo: IverusLogo,
          icon: <Building2 size={24} />,
        },
        {
          name: "Los Navegantes Agencia",
          industry: "Marketing Digital",
          logo: NavegantesLogo,
          icon: <Globe size={24} />,
        },
        {
          name: "L.A. Girl Cosmetics",
          industry: "Cosméticos",
          logo: LAGirlLogo,
          icon: <Sparkles size={24} />,
        },
      ],
    },
    {
      country: "México",
      flag: "🇲🇽",
      clients: [
        {
          name: "BeTrep",
          industry: "Tecnología",
          logo: BeTrepLogo,
          icon: <Building2 size={24} />,
        },
        {
          name: "EXCITED",
          industry: "Innovación Digital",
          logo: ExcitedLogo,
          icon: <Globe size={24} />,
        },
      ],
    },
    {
      country: "Colombia",
      flag: "🇨🇴",
      clients: [
        {
          name: "Mario Hernández",
          industry: "Moda y Accesorios",
          logo: MarioHernandezLogo,
          icon: <ShoppingBag size={24} />,
        },
        {
          name: "Perfek",
          industry: "Belleza y Cuidado",
          logo: PerfekLogo,
          icon: <Sparkles size={24} />,
        },
        {
          name: "Lexius Digital Media",
          industry: "Medios Digitales",
          logo: LexiusLogo,
          icon: <Globe size={24} />,
        },
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
      aria-labelledby="clients-heading"
    >
      <div ref={sectionContentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[rgb(19,43,60)]/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[rgb(19,43,60)]/3 rounded-full blur-2xl"></div>
        </div>

        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            id="clients-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(19,43,60)] mb-8"
          >
            Presencia Internacional
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl text-[rgb(19,43,60)]/70 max-w-3xl mx-auto"
          >
            Trabajando con empresas líderes en diferentes países y sectores, construyendo experiencias digitales excepcionales
          </p>
        </div>

        {/* Countries Grid */}
        <div
          ref={countriesRef}
          className="bg-white rounded-3xl p-10 sm:p-16 mb-20 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-center mb-12">
            <div className="w-16 h-16 bg-[rgb(19,43,60)]/10 rounded-2xl flex items-center justify-center mr-4">
              <Globe size={32} className="text-[rgb(19,43,60)]" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[rgb(19,43,60)]">
                Países con Presencia
              </h3>
              <p className="text-[rgb(19,43,60)]/60 text-sm">
                Expandiendo fronteras digitales
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
            {countries.map((country, index) => (
              <div
                key={index}
                className="country-card bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
                role="region"
                aria-label={`País: ${country.name}`}
              >
                <div className="text-3xl mb-3">{country.flag}</div>
                <h4 className="font-semibold text-[rgb(19,43,60)] text-sm">
                  {country.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Clients by Country */}
        <div ref={clientSectionsRef} className="space-y-16">
          {clientsByCountry.map((countryData, countryIndex) => (
            <div
              key={countryIndex}
              className="bg-white rounded-3xl p-10 sm:p-12 shadow-sm border border-gray-100"
              role="region"
              aria-label={`Clientes en ${countryData.country}`}
            >
              <div className="flex items-center justify-center mb-12">
                <div className="text-4xl mr-4">{countryData.flag}</div>
                <div>
                  <h3 className="text-2xl font-semibold text-[rgb(19,43,60)]">
                    {countryData.country}
                  </h3>
                  <p className="text-[rgb(19,43,60)]/60 text-sm">
                    Clientes destacados
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {countryData.clients.map((client, clientIndex) => (
                  <div
                    key={clientIndex}
                    className="client-card bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
                    role="region"
                    aria-label={`Cliente: ${client.name}`}
                  >
                    <div className="relative w-full h-32 bg-gradient-to-br from-[rgb(19,43,60)]/5 to-[rgb(19,43,60)]/10 rounded-xl mb-6 overflow-hidden">
                      <img
                        src={client.logo || FallbackLogo}
                        alt={`${client.name} logo`}
                        className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                        onError={(e) => {
                          e.currentTarget.src = FallbackLogo;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      <div className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        <div className="text-[rgb(19,43,60)]">
                          {client.icon}
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <h4 className="text-lg font-bold text-[rgb(19,43,60)] mb-2">
                        {client.name}
                      </h4>
                      <p className="text-[rgb(19,43,60)]/70 text-sm mb-4">
                        {client.industry}
                      </p>
                      <div className="w-12 h-0.5 bg-[rgb(19,43,60)]/20 rounded-full mx-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Clients Note */}
        <div ref={finalMessageRef} className="text-center mt-16">
          <div
            className="bg-gradient-to-r from-[rgb(19,43,60)] to-[rgb(44,62,80)]/90 rounded-3xl p-10 text-white relative overflow-hidden"
            role="region"
            aria-label="Mensaje final"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe size={32} className="text-white" aria-hidden="true" />
              </div>
              <h4 className="text-2xl font-semibold mb-4">
                Y muchos más clientes satisfechos
              </h4>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Cada proyecto es una oportunidad de crear experiencias digitales excepcionales que trascienden fronteras y conectan marcas con audiencias globales
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
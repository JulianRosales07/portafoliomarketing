import React, { useEffect, useRef } from "react";
import { Globe, MapPin } from "lucide-react";
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Título y subtítulo
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
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Países
      gsap.fromTo(
        countriesRef.current?.querySelectorAll(".country-card") || [],
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: countriesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Secciones de clientes
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

          // Tarjetas de clientes dentro de cada sección
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

      // Mensaje final
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

      // Hover países
      const countryCards = countriesRef.current?.querySelectorAll(".country-card");
      countryCards?.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.05, y: -5, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
        });
      });

      // Hover clientes
      const clientCards = document.querySelectorAll(".client-card");
      clientCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.03, y: -8, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const countries = [
    { name: "Colombia", code: "CO" },
    { name: "México", code: "MX" },
    { name: "Estados Unidos", code: "US" },
    { name: "Panamá", code: "PA" },
    { name: "Chile", code: "CL" },
    { name: "Brasil", code: "BR" },
    { name: "España", code: "ES" },
  ];

  const clientsByCountry = [
    {
      country: "Estados Unidos",
      clients: [
        {
          name: "IVERUS",
          industry: "Consultoría Tecnológica",
          logo: IverusLogo,
        },
        {
          name: "Los Navegantes Agencia",
          industry: "Marketing Digital",
          logo: NavegantesLogo,
        },
        {
          name: "L.A. Girl Cosmetics",
          industry: "Cosméticos",
          logo: LAGirlLogo,
        },
      ],
    },
    {
      country: "México",
      clients: [
        { name: "BeTrep", industry: "Tecnología", logo: BeTrepLogo },
        { name: "EXCITED", industry: "Innovación Digital", logo: ExcitedLogo },
      ],
    },
    {
      country: "Colombia",
      clients: [
        {
          name: "Mario Hernández",
          industry: "Moda y Accesorios",
          logo: MarioHernandezLogo,
        },
        { name: "Perfek", industry: "Belleza y Cuidado", logo: PerfekLogo },
        {
          name: "Lexius Digital Media",
          industry: "Medios Digitales",
          logo: LexiusLogo,
        },
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl font-bold text-[rgb(19,43,60)] mb-8"
          >
            Presencia Internacional
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl text-[rgb(19,43,60)]/70 max-w-3xl mx-auto"
          >
            Trabajando con empresas líderes en diferentes países y sectores
          </p>
        </div>

        {/* Countries Grid */}
        <div
          ref={countriesRef}
          className="bg-gray-50 rounded-2xl p-8 sm:p-12 mb-16"
        >
          <div className="flex items-center justify-center mb-8">
            <Globe size={32} className="text-[rgb(19,43,60)] mr-3" />
            <h3 className="text-2xl font-semibold text-[rgb(19,43,60)]">
              Países con Presencia
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <div
                key={index}
                className="country-card bg-white rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 transform"
              >
                <div className="w-12 h-12 bg-[rgb(19,43,60)]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin size={20} className="text-[rgb(19,43,60)]" />
                </div>
                <h4 className="font-semibold text-[rgb(19,43,60)]">
                  {country.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Clients by Country */}
        <div ref={clientSectionsRef} className="space-y-12">
          {clientsByCountry.map((countryData, countryIndex) => (
            <div
              key={countryIndex}
              className="bg-gray-50 rounded-2xl p-8 sm:p-10"
            >
              <div className="flex items-center justify-center mb-8">
                <MapPin size={24} className="text-[rgb(19,43,60)] mr-3" />
                <h3 className="text-2xl font-semibold text-[rgb(19,43,60)]">
                  {countryData.country}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {countryData.clients.map((client, clientIndex) => (
                  <div
                    key={clientIndex}
                    className="client-card bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform"
                  >
                    <img
                      src={client.logo || FallbackLogo}
                      alt={`${client.name} logo`}
                      className="w-full h-24 object-contain rounded-lg mb-4"
                      onError={(e) => {
                        e.currentTarget.src = FallbackLogo;
                      }}
                    />

                    <div className="text-center">
                      <h4 className="text-lg font-bold text-[rgb(19,43,60)] mb-2">
                        {client.name}
                      </h4>
                      <p className="text-[rgb(19,43,60)]/70 text-sm">
                        {client.industry}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Clients Note */}
        <div ref={finalMessageRef} className="text-center mt-12">
          <div className="bg-[rgb(19,43,60)] rounded-2xl p-8 text-white">
            <h4 className="text-xl font-semibold mb-4">
              Y muchos más clientes satisfechos
            </h4>
            <p className="text-white/80">
              Cada proyecto es una oportunidad de crear experiencias digitales
              excepcionales
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;

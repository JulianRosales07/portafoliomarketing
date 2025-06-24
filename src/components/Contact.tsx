import React, { useEffect, useRef } from 'react';
import { Phone, Globe, Linkedin, Mail, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contactCardsRef = useRef<HTMLDivElement>(null);
  const sectionContentRef = useRef<HTMLDivElement>(null);

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

      // Animación de las tarjetas de contacto
      gsap.fromTo(contactCardsRef.current?.children || [],
        { opacity: 0, y: 60, rotationY: 15 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactCardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // ANIMACIÓN DE TRANSICIÓN AL SCROLL - Similar al ejemplo
      const contactTransitionTl = gsap.timeline({
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom top",
          scrub: 1,
        },
      });

      contactTransitionTl
        .to(sectionContentRef.current, { 
          duration: 1, 
          scale: 0.9,
          opacity: 0.3,
          y: -150
        })
        .to(titleRef.current, { 
          opacity: 0,
          y: -200,
          scale: 0.6
        }, "<")
        .to(contactCardsRef.current, { 
          opacity: 0,
          y: 120,
          stagger: 0.1,
          rotationY: -20
        }, "<")
        .to(sectionContentRef.current, {
          opacity: 0,
          duration: 0.3,
        }, 0.8);

      // Animaciones de hover para las tarjetas
      const contactCards = contactCardsRef.current?.children;
      if (contactCards) {
        Array.from(contactCards).forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
              scale: 1.02, 
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

      // Animaciones para elementos internos de las tarjetas
      const contactItems = document.querySelectorAll('.contact-item');
      contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, { 
            x: 5,
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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      country: "Colombia",
      phone: "(+57) 3107368317",
      icon: <Phone size={20} />
    },
    {
      country: "México",
      phone: "(+52) 5543777280",
      icon: <Phone size={20} />
    }
  ];

  const digitalContacts = [
    {
      label: "Sitio Web",
      value: "www.johnjimenez.com.co",
      icon: <Globe size={20} />,
      link: "https://www.johnjimenez.com.co"
    },
    {
      label: "LinkedIn",
      value: "John Jiménez",
      icon: <Linkedin size={20} />,
      link: "https://linkedin.com/in/johnjimenez"
    }
  ];

  return (
    <section ref={sectionRef} id="contacto" className="py-20 bg-gray-50 relative overflow-hidden">
      <div ref={sectionContentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-[rgb(19,43,60)] mb-8">
            Conversemos sobre tu Proyecto
          </h2>
          <p ref={subtitleRef} className="text-xl text-[rgb(19,43,60)]/70 max-w-3xl mx-auto">
            Estoy disponible para ayudarte a transformar tu negocio. Contacta conmigo a través de cualquiera de estos canales.
          </p>
        </div>

        <div ref={contactCardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Phone Contacts */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-[rgb(19,43,60)] mb-8 text-center">
              Contacto Telefónico
            </h3>
            
            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className="contact-item flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[rgb(19,43,60)]/10 rounded-full flex items-center justify-center">
                    <div className="text-[rgb(19,43,60)]">
                      {contact.icon}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin size={16} className="text-[rgb(19,43,60)]/70" />
                      <span className="text-[rgb(19,43,60)]/70 text-sm">
                        {contact.country}
                      </span>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-xl font-semibold text-[rgb(19,43,60)] hover:text-[rgb(19,43,60)]/80 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Digital Contacts */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-[rgb(19,43,60)] mb-8 text-center">
              Contacto Digital
            </h3>
            
            <div className="space-y-6">
              {digitalContacts.map((contact, index) => (
                <div
                  key={index}
                  className="contact-item flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[rgb(19,43,60)]/10 rounded-full flex items-center justify-center">
                    <div className="text-[rgb(19,43,60)]">
                      {contact.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-[rgb(19,43,60)]/70 text-sm mb-1">
                      {contact.label}
                    </div>
                    <a
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-semibold text-[rgb(19,43,60)] hover:text-[rgb(19,43,60)]/80 transition-colors"
                    >
                      {contact.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form CTA */}
            <div className="mt-8 p-6 bg-[rgb(19,43,60)] rounded-xl text-center">
              <h4 className="text-white font-semibold mb-2">
                ¿Prefieres escribir?
              </h4>
              <p className="text-white/80 text-sm mb-4">
                Envíame un mensaje y te responderé en menos de 24 horas
              </p>
              <a
                href="mailto:contacto@johnjimenez.com.co"
                className="inline-flex items-center space-x-2 bg-white text-[rgb(19,43,60)] px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                <Mail size={16} />
                <span className="font-medium">Enviar Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
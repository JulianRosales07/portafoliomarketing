
import { Heart, ArrowUp } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del footer completo
      gsap.fromTo(contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

 return (
    <footer ref={footerRef} className="bg-[rgb(19,43,60)] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">JOHN JIMÉNEZ - PMM</h3>
            <p className="text-white/80">Marketing Estratégico Digital</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <a
              href="#sobre-mi"
              className="text-white/80 hover:text-white transition-colors"
            >
              Sobre Mí
            </a>
            <a
              href="#servicios"
              className="text-white/80 hover:text-white transition-colors"
            >
              Servicios
            </a>
            <a
              href="#resultados"
              className="text-white/80 hover:text-white transition-colors"
            >
              Resultados
            </a>
            <a
              href="#planes"
              className="text-white/80 hover:text-white transition-colors"
            >
              Planes
            </a>
            <a
              href="#contacto"
              className="text-white/80 hover:text-white transition-colors"
            >
              Contacto
            </a>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                <span className="text-white/80">Hecho con</span>
                <Heart size={16} className="text-red-400 fill-current" />
                <span className="text-white/80">para impulsar tu negocio</span>
              </div>
              
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all duration-300"
              >
                <ArrowUp size={16} />
                <span>Volver arriba</span>
              </button>
            </div>
            
            <div className="mt-6 text-center text-white/60 text-sm">
              <p>&copy; 2025 John Jiménez. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
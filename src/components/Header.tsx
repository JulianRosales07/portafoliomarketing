import React, { useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación inicial del header
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // Animación del logo
      gsap.fromTo(logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.5 }
      );

      // Animación de la navegación
      gsap.fromTo(navRef.current?.children || [],
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.7 }
      );

    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(mobileMenuRef.current.children,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out", delay: 0.1 }
        );
      } else {
        gsap.to(mobileMenuRef.current,
          { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" }
        );
      }
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Sobre Mí', href: '#sobre-mi' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Resultados', href: '#resultados' },
    { label: 'Planes', href: '#planes' },
    { label: 'Contacto', href: '#contacto' }
  ];

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="#hero" ref={logoRef} className="text-xl font-bold text-[rgb(19,43,60)] hover:opacity-80 transition-opacity duration-200">
              JOHN JIMÉNEZ
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden md:block">
            <div className="flex space-x-8">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-[rgb(19,43,60)] hover:text-[rgb(19,43,60)]/80 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[rgb(19,43,60)] hover:text-[rgb(19,43,60)]/80 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden overflow-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-[rgb(19,43,60)] hover:text-[rgb(19,43,60)]/80 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
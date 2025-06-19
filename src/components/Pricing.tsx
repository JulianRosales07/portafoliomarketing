import React, { useEffect, useRef, useState } from 'react';
import { Check, FileText, Search, Settings, GitBranch, Calendar, BarChart, Star, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PlanDetails {
  name: string;
  price: string;
  platforms: string;
  advertising: string;
  channelManagement: string;
  mediaPlan: string;
  reports: string;
  description: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
}

const Pricing: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesTitleRef = useRef<HTMLHeadingElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  const disclaimerRef = useRef<HTMLParagraphElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  const plansData: PlanDetails[] = [
    {
      name: 'Básico',
      price: '$1.249.900',
      platforms: '1 Plataforma de Pauta o Cuenta Digital (CD)',
      advertising: 'Según presupuesto',
      channelManagement: '1 Cuenta Digital',
      mediaPlan: '1 Plan de Medios al mes',
      reports: '1 informe semanal',
      description: 'Ideal para empresas que inician su transformación digital',
    },
    {
      name: 'Premium',
      price: '$2.349.900',
      platforms: '2 plataformas de pauta (Google Ads + Meta) + email',
      advertising: 'Según presupuesto',
      channelManagement: '2 Cuentas Digitales + email',
      mediaPlan: '1 Plan de Medios al mes',
      reports: '1 informe semanal',
      description: 'Para empresas que buscan optimizar sus estrategias',
    },
    {
      name: 'Platinum',
      price: '$3.349.900',
      platforms: '3 plataformas (Meta + Google Ads + TikTok) + email',
      advertising: 'Según presupuesto',
      channelManagement: '3 Cuentas Digitales + email',
      mediaPlan: '1 Plan de Medios al mes',
      reports: '2 informes semanales',
      description: 'Solución integral para empresas en crecimiento',
    },
    {
      name: 'Advanced',
      price: '$5.249.900',
      platforms: 'Todas las plataformas que requiera',
      advertising: 'Según presupuesto',
      channelManagement: 'Máximo 6 Cuentas Digitales',
      mediaPlan: '1 Plan de Medios al mes',
      reports: '2 informes semanales',
      description: 'El plan más completo para empresas establecidas',
    },
  ];

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
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animación del título de servicios incluidos
      gsap.fromTo(servicesTitleRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: servicesTitleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animación de los servicios incluidos
      gsap.fromTo(servicesRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animación de los planes de precios
      gsap.fromTo(plansRef.current?.children || [],
        { opacity: 0, y: 50, rotationX: 15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: plansRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animación del disclaimer
      gsap.fromTo(disclaimerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: disclaimerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animación del modal
      if (modalRef.current) {
        gsap.fromTo(modalRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
            paused: true,
            onStart: () => setIsModalOpen(true),
          }
        );
      }

      // Animaciones de hover para servicios
      const serviceItems = servicesRef.current?.children;
      if (serviceItems) {
        Array.from(serviceItems).forEach(item => {
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              scale: 1.05,
              y: -3,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        });
      }

      // Animaciones de hover para planes
      const planCards = plansRef.current?.children;
      if (planCards) {
        Array.from(planCards).forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.03,
              y: -8,
              rotationY: 2,
              duration: 0.4,
              ease: 'power2.out',
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              rotationY: 0,
              duration: 0.4,
              ease: 'power2.out',
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const includedServices = [
    { name: 'Brief inicial', icon: <FileText size={16} /> },
    { name: 'Estudio de referentes (benchmarking)', icon: <Search size={16} /> },
    { name: 'Configuración de perfiles', icon: <Settings size={16} /> },
    { name: 'Flujo de aprobación', icon: <GitBranch size={16} /> },
    { name: 'Control de cambios', icon: <Settings size={16} /> },
    { name: 'Publicación y calendarización', icon: <Calendar size={16} /> },
    { name: 'Informes semanales', icon: <BarChart size={16} /> },
  ];

  const plans = [
    {
      name: 'Básico',
      price: '$1.249.900',
      description: 'Ideal para empresas que inician su transformación digital',
      popular: false,
    },
    {
      name: 'Premium',
      price: '$2.349.900',
      description: 'Para empresas que buscan optimizar sus estrategias',
      popular: true,
    },
    {
      name: 'Platinum',
      price: '$3.349.900',
      description: 'Solución integral para empresas en crecimiento',
      popular: false,
    },
    {
      name: 'Advanced',
      price: '$5.249.900',
      description: 'El plan más completo para empresas establecidas',
      popular: false,
    },
  ];

  const openModal = (planName: string) => {
    const plan = plansData.find(p => p.name === planName);
    if (plan) {
      setSelectedPlan(plan);
      setShowForm(false);
      setFormSubmitted(false);
      setFormData({ fullName: '', email: '', phone: '', preferredDate: '', preferredTime: '' });
      setFormErrors({});
      setIsModalOpen(true);
      gsap.to(modalRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => setIsModalOpen(false),
    });
  };

  const handleConfirmSelection = () => {
    setShowForm(true);
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    if (!formData.fullName.trim()) errors.fullName = 'El nombre es requerido';
    if (!formData.email.trim()) {
      errors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El correo no es válido';
    }
    if (!formData.phone.trim()) errors.phone = 'El teléfono es requerido';
    if (!formData.preferredDate) errors.preferredDate = 'La fecha es requerida';
    if (!formData.preferredTime) errors.preferredTime = 'La hora es requerida';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Appointment Scheduled:', {
        plan: selectedPlan?.name,
        ...formData,
      });
      setFormSubmitted(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section ref={sectionRef} id="planes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-[rgb(19,43,60)] mb-8">
            Planes de Trabajo
          </h2>
          <p ref={subtitleRef} className="text-xl text-[rgb(19,43,60)]/70 max-w-3xl mx-auto">
            Todos los planes incluyen servicios esenciales para garantizar el éxito de tu proyecto
          </p>
        </div>

        {/* Included Services */}
        <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 mb-12">
          <h3 ref={servicesTitleRef} className="text-2xl font-semibold text-[rgb(19,43,60)] text-center mb-8">
            Servicios Incluidos en Todos los Planes
          </h3>
          <div ref={servicesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {includedServices.map((service, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white p-4 rounded-xl"
              >
                <div className="w-8 h-8 bg-[rgb(19,43,60)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="text-[rgb(19,43,60)]">{service.icon}</div>
                </div>
                <span className="text-[rgb(19,43,60)] font-medium text-sm">{service.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div ref={plansRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-[rgb(19,43,60)] transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[rgb(19,43,60)] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star size={14} />
                    <span>Más Popular</span>
                  </div>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-bold text-[rgb(19,43,60)] mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-[rgb(19,43,60)] mb-4">{plan.price}</div>
                <p className="text-[rgb(19,43,60)]/70 text-sm mb-6">{plan.description}</p>
                <button
                  onClick={() => openModal(plan.name)}
                  className={`w-full py-3 px-4 rounded-full font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-[rgb(19,43,60)] text-white hover:bg-[rgb(19,43,60)]/90'
                      : 'border-2 border-[rgb(19,43,60)] text-[rgb(19,43,60)] hover:bg-[rgb(19,43,60)] hover:text-white'
                  }`}
                >
                  Seleccionar Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p ref={disclaimerRef} className="text-[rgb(19,43,60)]/70 text-sm">
            * Los precios no incluyen IVA ni valor de pauta publicitaria
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-[rgb(19,43,60)] hover:text-[rgb(19,43,60)]/70"
            >
              <X size={24} />
            </button>
            {!showForm && !formSubmitted && (
              <>
                <h3 className="text-2xl font-bold text-[rgb(19,43,60)] mb-4">{selectedPlan.name}</h3>
                <p className="text-[rgb(19,43,60)]/70 text-sm mb-4">{selectedPlan.description}</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check size={16} className="text-[rgb(19,43,60)] mr-2 mt-1 flex-shrink-0" />
                    <span className="text-[rgb(19,43,60)] text-sm">
                      <strong>Plataformas:</strong> {selectedPlan.platforms}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-[rgb(19,43,60)] mr-2 mt-1 flex-shrink-0" />
                    <span className="text-[rgb(19,43,60)] text-sm">
                      <strong>Pauta Publicitaria:</strong> {selectedPlan.advertising}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-[rgb(19,43,60)] mr-2 mt-1 flex-shrink-0" />
                    <span className="text-[rgb(19,43,60)] text-sm">
                      <strong>Administración de Canales:</strong> {selectedPlan.channelManagement}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-[rgb(19,43,60)] mr-2 mt-1 flex-shrink-0" />
                    <span className="text-[rgb(19,43,60)] text-sm">
                      <strong>Propuesta de Plan de Medios:</strong> {selectedPlan.mediaPlan}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-[rgb(19,43,60)] mr-2 mt-1 flex-shrink-0" />
                    <span className="text-[rgb(19,43,60)] text-sm">
                      <strong>Informes:</strong> {selectedPlan.reports}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-[rgb(19,43,60)] mr-2 mt-1 flex-shrink-0" />
                    <span className="text-[rgb(19,43,60)] text-sm">
                      <strong>Fee Mensual:</strong> {selectedPlan.price}
                    </span>
                  </li>
                </ul>
                <button
                  onClick={handleConfirmSelection}
                  className="w-full py-3 px-4 rounded-full bg-[rgb(19,43,60)] text-white font-medium hover:bg-[rgb(19,43,60)]/90"
                >
                  Confirmar Selección
                </button>
              </>
            )}
            {showForm && !formSubmitted && (
              <>
                <h3 className="text-2xl font-bold text-[rgb(19,43,60)] mb-4">
                  Agendar Cita para {selectedPlan.name}
                </h3>
                <p className="text-[rgb(19,43,60)]/70 text-sm mb-6">
                  Complete el formulario para programar una cita con nuestro equipo.
                </p>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[rgb(19,43,60)] mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(19,43,60)]"
                      placeholder="Ingrese su nombre"
                    />
                    {formErrors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[rgb(19,43,60)] mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(19,43,60)]"
                      placeholder="Ingrese su correo"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[rgb(19,43,60)] mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(19,43,60)]"
                      placeholder="Ingrese su teléfono"
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[rgb(19,43,60)] mb-1">
                      Fecha Preferida
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(19,43,60)]"
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {formErrors.preferredDate && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.preferredDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[rgb(19,43,60)] mb-1">
                      Hora Preferida
                    </label>
                    <input
                      type="time"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(19,43,60)]"
                    />
                    {formErrors.preferredTime && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.preferredTime}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-full bg-[rgb(19,43,60)] text-white font-medium hover:bg-[rgb(19,43,60)]/90"
                  >
                    Agendar Cita
                  </button>
                </form>
              </>
            )}
            {formSubmitted && (
              <>
                <h3 className="text-2xl font-bold text-[rgb(19,43,60)] mb-4">
                  ¡Cita Agendada!
                </h3>
                <p className="text-[rgb(19,43,60)]/70 text-sm mb-6">
                  Gracias por seleccionar el plan {selectedPlan.name}. Nos pondremos en contacto
                  pronto para confirmar su cita.
                </p>
                <button
                  onClick={closeModal}
                  className="w-full py-3 px-4 rounded-full bg-[rgb(19,43,60)] text-white font-medium hover:bg-[rgb(19,43,60)]/90"
                >
                  Cerrar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
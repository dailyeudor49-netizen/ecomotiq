'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { validateForm } from '@/app/utils/formValidation';
import {
  Truck,
  ShieldCheck,
  Phone,
  Banknote,
  Check,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Zap,
  Clock,
  ThumbsUp,
  ChefHat,
  X,
  Package,
  CheckCircle,
  Lock,
  ShoppingCart,
  MapPin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// --- GOOGLE ADS TRACKING ---
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    tmfp?: string;
  }
}

// --- NETWORK TRACKING CONFIG ---
const NETWORK_CONFIG = {
  apiUrl: 'https://offers.italiadrop.com/forms/api/',
  uid: '019bfb2f-317f-7e20-a4a8-44c22cb7bd03',
  key: '05fddd0847c3627b81e1d6',
  offer: '2218',
  lp: '2257',
};

// --- TYPES ---

interface Review {
  id: number;
  name: string;
  age: number;
  location: string;
  stars: number;
  text: string;
}

interface FeatureBox {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

// --- COMPONENTS ---

// 1. Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  pulse?: boolean;
  subtext?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  pulse = false,
  subtext,
  className = '',
  icon,
  ...props
}) => {
  const baseStyles = "font-bold rounded-lg transition-transform active:scale-95 inline-flex flex-col items-center justify-center text-center shadow-lg border-b-4";
  
  const variants = {
    primary: "bg-green-600 hover:bg-green-500 text-white border-green-800",
    secondary: "bg-yellow-400 hover:bg-yellow-300 text-gray-900 border-yellow-600",
    danger: "bg-red-600 hover:bg-red-500 text-white border-red-800",
  };

  const sizes = {
    md: "py-3 px-6 text-lg",
    lg: "py-4 px-8 text-xl",
    xl: "py-6 px-8 text-2xl uppercase tracking-wide",
  };

  const pulseClass = pulse ? "animate-pulse" : "";
  const widthClass = fullWidth ? "w-full" : "w-full md:w-auto";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${pulseClass} ${widthClass} ${className}`}
      {...props}
    >
      <span className="flex items-center gap-2 justify-center">
        {icon}
        {children}
      </span>
      {subtext && (
        <span className="block text-xs sm:text-sm font-medium opacity-90 mt-1 tracking-wide text-white/90">
          {subtext}
        </span>
      )}
    </button>
  );
};

// 2. Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col relative animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-sm text-gray-600 leading-relaxed space-y-4">
          {content}
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. StickyHeader Component
const StickyHeader: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-red-700 text-white text-xs sm:text-sm font-bold shadow-md">
      <div className="max-w-6xl mx-auto px-2 py-2 flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-center">
        <div className="flex items-center gap-1">
          <Truck size={14} /> ENVÍO 24/48H
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1 text-yellow-300">
          <Banknote size={14} /> PAGO CONTRA REEMBOLSO
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} /> GARANTÍA 2 AÑOS
        </div>
        <div className="hidden md:inline">|</div>
        <div className="hidden md:flex items-center gap-1">
          <Phone size={14} /> ASISTENCIA ESPAÑOLA
        </div>
      </div>
    </div>
  );
};

// 4. Hero Component
const carouselImages = [
  "/images/quickchef img/1.png",
  "/images/quickchef img/2.png",
  "/images/quickchef img/3.png",
  "/images/quickchef img/4.png",
  "/images/quickchef img/5.png",
];

const benefits = [
  <span key="1"><strong className="text-red-700">NOVEDAD EXCLUSIVA:</strong> Dosificación Automática de ingredientes (lo hace todo solo)</span>,
  <span key="2"><strong className="text-gray-900">45 Funciones en 1:</strong> el robot más completo del mercado</span>,
  <span key="3">Pantalla táctil <strong className="text-gray-900">7" SoftScreen</strong> grande y clara → te guía paso a paso</span>,
  <span key="4">App con <strong className="text-gray-900">1000+ recetas</strong> → elige y sigue como un tutorial</span>,
  <span key="5">Función <strong className="text-gray-900">"¿Qué tengo en la nevera?"</strong> → ahorras en la compra</span>,
  <span key="6"><strong className="text-gray-900">Báscula integrada</strong> precisa al gramo → adiós a las dosis "a ojo"</span>,
  <span key="7">Jarra <strong className="text-gray-900">Cerámica Antiadherente</strong> → nada se pega, se limpia en un momento</span>,
  <span key="8">Cocción hasta <strong className="text-gray-900">180°C</strong> + Sofrito real</span>,
  <span key="9">Sistema <strong className="text-gray-900">OneClick</strong> → cambias accesorios sin desmontar nada</span>,
];

const Hero: React.FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <section className="bg-white pt-6 pb-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          <span className="text-red-600 block mb-2 text-xl md:text-2xl uppercase tracking-wide">¿Estás cansado de perder tiempo en la cocina?</span>
          Descubre el Primer Robot que <span className="bg-yellow-200 px-2">Añade los Ingredientes Solo.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
          Olvídate de ollas y estrés. Pon todo en el dispensador, elige la receta en la pantalla y <strong className="text-gray-900">él cocina por ti mientras tú descansas.</strong>
          <br className="my-2"/>
          <strong className="text-green-700 bg-green-50 px-3 py-1 rounded inline-block mt-2 border border-green-200 shadow-sm">✅ Resultado perfecto (aunque no sepas cocinar)</strong>
        </p>

        <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-100 max-w-xl mx-auto group bg-gray-100">
           <div className="relative aspect-square w-full">
             <img 
               src={carouselImages[currentSlide]} 
               alt={`Robot da cucina slide ${currentSlide + 1}`} 
               className="w-full h-full object-cover transition-all duration-300"
             />
             
             <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4 pointer-events-none">
                <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="bg-white/80 p-2 rounded-full shadow hover:bg-white pointer-events-auto text-gray-800 transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="bg-white/80 p-2 rounded-full shadow hover:bg-white pointer-events-auto text-gray-800 transition-colors">
                  <ChevronRight size={24} />
                </button>
             </div>

           </div>
        </div>

        {/* Miniature sotto il carosello */}
        <div className="flex justify-center gap-2 md:gap-3 max-w-xl mx-auto mb-8">
          {carouselImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-200 ${idx === currentSlide ? 'ring-3 ring-red-600 scale-105 shadow-lg' : 'ring-2 ring-gray-200 opacity-70 hover:opacity-100 hover:ring-gray-400'}`}
            >
              <img
                src={img}
                alt={`Miniatura ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        <div className="bg-yellow-50/60 rounded-xl p-6 md:p-8 mb-8 text-left max-w-2xl mx-auto border-2 border-yellow-200 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center leading-tight">
              🟡 El robot que te hace cocinar como un Chef <br className="hidden sm:block"/>sin ensuciar nada
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3 text-lg">
                  <div className="bg-green-100 p-1 rounded-full shrink-0 mt-0.5">
                    <Check className="text-green-700" strokeWidth={3} size={20} />
                  </div>
                  <span className="text-gray-800 leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>
        </div>

        <div className="bg-white border-4 border-red-600 p-6 rounded-xl max-w-2xl mx-auto mb-8 relative shadow-xl transform transition-transform hover:scale-[1.01]">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full text-sm md:text-base font-bold uppercase tracking-wider shadow-md whitespace-nowrap animate-pulse border-2 border-white">
            Oferta Limitada
          </div>

          <div className="flex flex-col items-center justify-center mb-6 mt-6">
             <div className="bg-yellow-400 text-gray-900 font-black text-3xl md:text-4xl px-8 py-3 rounded-lg mb-4 shadow-md">
               -50%
             </div>
             <div className="flex items-center gap-3">
               <span className="text-gray-400 line-through text-2xl decoration-2">€178</span>
               <span className="text-5xl md:text-6xl font-black text-red-600 tracking-tighter">€89</span>
             </div>
             <p className="text-green-700 font-bold mt-2">¡Ahorras €89!</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100 text-left space-y-4">
             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0">
                 <Truck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Envío Rápido</p>
                 <p className="text-sm text-gray-500 mt-1">Entrega asegurada en 24/48 horas</p>
               </div>
             </div>

             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 shrink-0">
                 <Banknote size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Pagas Solo a la Entrega</p>
                 <p className="text-sm text-gray-500 mt-1">Sin anticipo, efectivo al mensajero</p>
               </div>
             </div>

             <div className="flex items-center gap-3">
               <div className="bg-blue-100 p-2 rounded-full text-blue-700 shrink-0">
                 <ShieldCheck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Garantía España 2 Años</p>
                 <p className="text-sm text-gray-500 mt-1">Asistencia técnica incluida</p>
               </div>
             </div>
          </div>

          <Button onClick={scrollToForm} fullWidth pulse size="xl" subtext="🔒 No se requiere tarjeta de crédito">
            PEDIR AHORA CON DESCUENTO
          </Button>
        </div>
        
        <div className="flex justify-center animate-bounce text-gray-400 mt-4">
            <ArrowDown size={32} />
        </div>
      </div>
    </section>
  );
};

// 5. SocialProof Component
const SocialProof: React.FC = () => {
  return (
    <section className="bg-gray-100 py-8 border-y border-gray-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-1 text-yellow-400 mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} fill="currentColor" size={24} />
          ))}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          4,8/5 basado en mas de 3.000 resenas
        </h3>
        <p className="text-lg text-gray-600 italic mb-6">
          "Por fin cocino bien sin volverme loco."
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ThumbsUp className="text-blue-600" />
            <span className="font-bold text-gray-700">Facil</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Clock className="text-green-600" />
            <span className="font-bold text-gray-700">Rapido</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Zap className="text-yellow-500" />
            <span className="font-bold text-gray-700">Antiadherente</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ChefHat className="text-red-500" />
            <span className="font-bold text-gray-700">Recetas Guiadas</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// 6. ProblemAgitation Component
const ProblemAgitation: React.FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-red-700 mb-6 text-center">
            🔴 Si te reconoces en estas situaciones... <br/>este robot te cambia la vida.
          </h2>

          <ul className="space-y-5 mb-8">
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Abres la nevera y <strong className="text-red-700">nunca sabes que cocinar.</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Las recetas te salen <strong className="text-red-700">"mas o menos"</strong> y se te quitan las ganas.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800"><strong>Ensucias mil ollas</strong> y pasas horas limpiando.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Acabas <strong>pidiendo comida basura</strong> y gastando demasiado.</span>
            </li>
          </ul>

          <div className="text-center bg-white p-6 rounded-lg border border-gray-100 shadow-md">
            <p className="text-xl font-bold text-green-700 mb-6 leading-tight">
              ✅ Desde hoy cocinas en automatico platos sanos,<br/> incluso <span className="underline decoration-green-500 decoration-4">sin experiencia.</span>
            </p>
            <Button onClick={scrollToForm} variant="primary" size="lg" className="mx-auto">
              SI, LO QUIERO - PAGO A LA ENTREGA
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// 7. HowItWorks Component
const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          ¿Como funciona?
        </h2>
        <p className="text-lg text-gray-600 mb-8">✅ Es mas facil que un microondas. <strong className="text-gray-900">Lo hace todo solo:</strong></p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">1</div>
            <h3 className="font-bold text-xl mb-2">Carga el Dispensador</h3>
            <p className="text-gray-600">Introduce los ingredientes en los <strong className="text-gray-900">6 compartimentos</strong>. No necesitas pesarlos antes, la bascula se encarga.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">2</div>
            <h3 className="font-bold text-xl mb-2">Elige la Receta</h3>
            <p className="text-gray-600">Selecciona desde la <strong className="text-gray-900">Pantalla tactil 7"</strong> o desde la App entre 1000+ platos guiados.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">3</div>
            <h3 className="font-bold text-xl mb-2">Pulsa START y Vete</h3>
            <p className="text-gray-600">El dosifica los ingredientes <strong className="text-gray-900">en el momento justo</strong>, cocina y mezcla. ¡Te avisa cuando esta listo!</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-900 p-5 rounded-lg inline-block text-base md:text-lg shadow-sm">
          💡 <span className="font-bold">TECNOLOGIA QUICKSENSE™:</span> El unico robot que anade los ingredientes solo mientras cocina. <br/>
          <span className="text-sm text-blue-700">¡No tienes que quedarte ahi mirandolo!</span>
        </div>
      </div>
    </section>
  );
};

// 8. FeaturesGrid Component
const features: FeatureBox[] = [
  {
    id: 1,
    title: "Nunca te equivocas",
    description: "Sigue la pantalla y el robot dosifica todo. Resultado garantizado al 100%.",
    imageUrl: "/images/quickchef img/Non sbagli mai.png"
  },
  {
    id: 2,
    title: "Lo hace todo solo",
    description: "Gracias al DISPENSADOR automatico, no tienes que anadir ingredientes durante la coccion.",
    imageUrl: "/images/quickchef img/DISPENSER AUTOMATICO.png"
  },
  {
    id: 3,
    title: "Funcion Vacia-Nevera",
    description: "Escribe lo que tienes en la nevera en la App y el te crea la receta perfecta. Cero desperdicio.",
    imageUrl: "/images/quickchef img/Funzione Svota-Frigo.png"
  },
  {
    id: 4,
    title: "Ceramica Antiadherente",
    description: "Jarra Unique revestida en ceramica: nunca se pega y se limpia con un pano.",
    imageUrl: "/images/quickchef img/Ceramica Antiaderente.png"
  },
  {
    id: 5,
    title: "45 Funciones en 1",
    description: "Tritura, amasa, cocina al vapor, fermenta, coccion lenta, yogur... sustituye 10 electrodomesticos.",
    imageUrl: "/images/quickchef img/45 Funzioni in 1.png"
  },
  {
    id: 6,
    title: "Resultados de Chef",
    description: "Cremas aterciopeladas, masas de pizza perfectas, salsas espesas. Todo en automatico.",
    imageUrl: "/images/quickchef img/Risultati da Chef.png"
  }
];

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          ✅ Por que todos lo estan eligiendo:
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.id} className="border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white flex flex-col h-full">
              <div className="aspect-square bg-gray-200 relative overflow-hidden group">
                <img 
                  src={feature.imageUrl} 
                  alt={feature.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
                />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="font-extrabold text-xl mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {feature.description.split(/([A-Z\s]{4,})/).map((part, i) => 
                    part.match(/[A-Z\s]{4,}/) ? <strong key={i} className="text-gray-800">{part}</strong> : part
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 9. ComparisonTable Component
const ComparisonTable: React.FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          🔥 Comparacion rapida (sin rodeos)
        </h2>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="p-4 text-gray-600 font-bold text-sm md:text-base w-1/3 uppercase tracking-wider">Caracteristica</th>
                <th className="p-4 bg-green-50 text-green-800 font-extrabold text-center border-l border-r border-green-200 w-1/3 text-sm md:text-xl shadow-inner">
                  ✅ QuickChef
                </th>
                <th className="p-4 text-gray-400 font-medium text-center text-sm md:text-base w-1/3">
                  ❌ Otros Robots
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                [<span key="1">Dispensador Automatico <br/><span className="text-xs font-normal text-gray-500">(Anade ingredientes solo)</span></span>, true, "Ausente (Lo haces tu)"],
                [<span key="2">Funciones Totales</span>, "45 (El mas completo)", "Aproximadamente 12-20"],
                [<span key="3">Pantalla Tactil</span>, "7\" SoftScreen", "Pequena o Ausente"],
                [<span key="4">App + Vacia-Nevera</span>, "Si (1000+ Recetas)", "Pocas recetas"],
                [<span key="5">Material Jarra</span>, "Ceramica Antiadherente", "Acero (Se pega)"],
                [<span key="6">Capacidad</span>, "3,3L (Familia)", "2,2L (Pequena)"],
                [<span key="7">Limpieza</span>, "Autolimpieza + Lavavajillas", "Tediosa a mano"],
              ].map(([feature, isUs, them], idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3 md:p-4 font-bold text-gray-800 text-sm md:text-base align-middle">{feature}</td>
                  <td className="p-3 md:p-4 bg-green-50 border-l border-r border-green-100 text-center align-middle">
                    {isUs === true ? <Check className="inline-block text-green-600" size={28} strokeWidth={4} /> : <span className="font-extrabold text-green-700 text-lg">{isUs}</span>}
                  </td>
                  <td className="p-3 md:p-4 text-center text-gray-500 text-sm md:text-base align-middle">
                    {them}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={scrollToForm} variant="primary" size="lg">
            PIDELO AHORA - PAGAS A LA ENTREGA
          </Button>
        </div>
      </div>
    </section>
  );
};

// 10. WhatsIncluded Component
const WhatsIncluded: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-blue-50/80">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 relative">
             <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-full shadow-lg z-10 transform rotate-12">
               KIT COMPLETO
             </div>
             <div className="aspect-square w-full rounded-xl shadow-2xl border-4 border-white overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 bg-white">
                <img
                  src="/images/quickchef img/1.png"
                  alt="Contenido del paquete QuickChef"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="text-blue-600" size={32} /> Que encuentras en el paquete:
            </h2>
            <ul className="space-y-4">
              {[
                <span key="1">Robot <strong>QuickChef 45 Funciones</strong></span>,
                <span key="2">Jarra <strong>Ceramica Antiadherente (3,3L)</strong></span>,
                <span key="3"><strong className="text-blue-700">Dispensador Automatico</strong> QuickSense™</span>,
                <span key="4">Accesorio <strong>Pala Saute</strong> (para risottos/salsas)</span>,
                <span key="5">Vaporera XL de 2 niveles</span>,
                <span key="6">Kit de Corte: Cuchillas, Mariposa, Cuchara</span>,
                <span key="7"><strong className="text-green-700">BONUS:</strong> App Premium con 1000+ Recetas</span>,
                <span key="8"><strong className="text-gray-900">Garantia Espana 2 Anos</strong></span>
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-lg text-gray-800 border-b border-blue-100 pb-2 last:border-0">
                  <CheckCircle className="text-green-500 shrink-0 mt-1" size={22} fill="currentColor" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-2">
                  <div className="bg-green-100 p-3 rounded-full text-green-700 shrink-0">
                      <Truck size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Envio</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Rapido 24/48h</p>
                  </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-gray-100">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-700 shrink-0">
                      <Banknote size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Pago</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">A la Entrega</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 11. Reviews Component
const reviewsList: Review[] = [
  { id: 1, name: "Carmen", age: 57, location: "Madrid", stars: 5, text: "Nunca he sido buena en la cocina... con este me sale todo bien. La pantalla te dice que hacer, comodisimo." },
  { id: 2, name: "Antonio", age: 63, location: "Barcelona", stars: 5, text: "Cocinar se estaba volviendo pesado. Ahora pongo todo y el lo hace. La limpieza es mucho mas sencilla." },
  { id: 3, name: "Laura", age: 41, location: "Valencia", stars: 5, text: "Yo trabajo y no tengo tiempo. Este me salva por las noches. Incluso las masas y las salsas quedan perfectas." },
  { id: 4, name: "Miguel", age: 52, location: "Sevilla", stars: 5, text: "La bascula integrada es genial, por fin no me equivoco con las cantidades... antes tiraba la mitad de las recetas." },
  { id: 5, name: "Ana", age: 60, location: "Bilbao", stars: 5, text: "La jarra no se pega, eso es lo que me convencio. Antes tenia que raspar siempre." },
  { id: 6, name: "Sofia", age: 35, location: "Malaga", stars: 5, text: "La app con recetas es muy util... y lo del 'que tengo en la nevera' es genial, ya no desperdicio nada." }
];

const Reviews: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          ⭐ Resenas reales de clientes
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div key={review.id} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}, {review.age} anos</h4>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <MapPin size={12} className="mr-1" /> {review.location}
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic">"{review.text}"</p>
              <div className="mt-4 flex items-center gap-2 text-green-700 text-xs font-bold uppercase">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Compra Verificada
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 12. OrderForm Component
const OrderForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    fullAddress: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pageLoadTime = useRef(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm({
      name: formData.firstName,
      phone: formData.phone,
      address: formData.fullAddress,
      countryCode: 'ES',
      productKey: 'quickchef_es',
      pageLoadTime: pageLoadTime.current,
    });
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setIsSubmitting(true);

    // Save Enhanced Conversions data to sessionStorage
    sessionStorage.setItem('ec_name', formData.firstName);
    sessionStorage.setItem('ec_phone', formData.phone);
    sessionStorage.setItem('ec_address', formData.fullAddress);
    sessionStorage.setItem('ec_value', '89'); // Price in EUR

    // Generate order code
    const orderCode = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('orderCode', orderCode);

    // Clear any previous conversion tracking
    sessionStorage.removeItem('conversionTracked');
    sessionStorage.removeItem('skipConversion');

    // Get UTM params from URL
    const urlParams = new URLSearchParams(window.location.search);

    // Send data to network API
    try {
      const apiFormData = new FormData();
      apiFormData.append('uid', NETWORK_CONFIG.uid);
      apiFormData.append('key', NETWORK_CONFIG.key);
      apiFormData.append('offer', NETWORK_CONFIG.offer);
      apiFormData.append('lp', NETWORK_CONFIG.lp);
      apiFormData.append('name', formData.firstName);
      apiFormData.append('tel', formData.phone);
      apiFormData.append('street-address', formData.fullAddress);
      // Add fingerprint if available
      if (typeof window !== 'undefined' && window.tmfp) {
        apiFormData.append('tmfp', window.tmfp);
      }
      // Add UTM params if present
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'subid', 'subid2', 'subid3', 'subid4', 'pubid'].forEach(param => {
        const value = urlParams.get(param);
        if (value) apiFormData.append(param, value);
      });

      const response = await fetch(NETWORK_CONFIG.apiUrl, {
        method: 'POST',
        body: apiFormData,
      });

      const responseText = await response.text();
      console.log('✅ Network API response (ES):', responseText);

      // Check for DOUBLE response - skip Google Ads conversion
      if (responseText.toUpperCase().includes('DOUBLE')) {
        sessionStorage.setItem('skipConversion', 'true');
        console.log('⚠️ DOUBLE detected - will skip Google Ads conversion');
      }
    } catch (error) {
      console.error('❌ Network API error (ES):', error);
    }

    // Redirect to thank you page (use window.location for proper sessionStorage handling)
    window.location.href = '/ty-es';
  };

  if (isSubmitting) {
    return (
      <div id="order-form" className="py-12 px-4 bg-green-50 text-center rounded-xl border-4 border-green-500 max-w-2xl mx-auto my-8 scroll-mt-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-4">Procesando pedido...</h2>
      </div>
    );
  }

  return (
    <section id="order-form" className="py-12 px-4 bg-red-50 border-t-4 border-red-600 scroll-mt-20">
      {/* Network Click Pixel */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://offers.italiadrop.com/forms/click?uid=${NETWORK_CONFIG.uid}&offer=${NETWORK_CONFIG.offer}&lp=${NETWORK_CONFIG.lp}`}
        width="1"
        height="1"
        alt=""
        style={{ position: 'absolute', visibility: 'hidden' }}
      />
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-red-600 p-6 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12"></div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 uppercase relative z-10">
            Formulario de Pedido
          </h2>
          <p className="font-medium opacity-90 relative z-10">Completa para recibir la oferta 50% descuento</p>
        </div>

        <div className="p-5 md:p-8">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-gray-500 line-through text-sm">Precio de Lista: €178</p>
              <p className="text-red-600 font-bold text-2xl">Total: €89</p>
              <p className="text-green-600 font-semibold text-sm">¡Ahorras €89!</p>
            </div>
            <div className="text-right flex flex-col gap-2">
              <span className="bg-red-600 text-white text-sm font-black px-3 py-1 rounded-lg shadow">-50%</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">ENVIO RAPIDO</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Nombre y Apellidos *</label>
              <input
                type="text"
                name="firstName"
                required
                autoComplete="name"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Ej: Juan Garcia"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Telefono (Movil) *</label>
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Ej: 612 345 678"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <ShieldCheck size={12}/> Importante para la confirmacion del envio
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Direccion Completa (Calle, Numero, Ciudad, Codigo Postal) *</label>
              <textarea
                name="fullAddress"
                required
                autoComplete="street-address"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg h-32"
                placeholder="Ej: Calle Gran Via 10, 28013 Madrid"
                value={formData.fullAddress}
                onChange={handleChange}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-4 cursor-pointer hover:bg-gray-100 transition-colors">
               <label className="flex items-start gap-3 cursor-pointer pointer-events-none">
                 <input type="radio" checked readOnly className="w-5 h-5 text-green-600 mt-1" />
                 <div>
                   <span className="block font-bold text-gray-800">Pago Contra Reembolso (Efectivo)</span>
                   <span className="block text-xs text-gray-500">Pagas directamente al mensajero cuando llega el paquete. Sin riesgo.</span>
                 </div>
               </label>
            </div>

            <Button type="submit" fullWidth pulse variant="primary" className="mt-6 shadow-xl text-xl">
              CONFIRMAR PEDIDO
            </Button>

            <div className="flex justify-center items-center gap-4 text-xs text-gray-400 mt-4">
              <span className="flex items-center gap-1"><Lock size={12}/> SSL Seguro 256-bit</span>
              <span className="flex items-center gap-1"><Truck size={12}/> Envio Rapido</span>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

// 13. Faq Component
const faqs: FaqItem[] = [
  { question: "¿Puedo pagar a la entrega?", answer: "Si, por supuesto. Pagas en efectivo directamente al mensajero cuando te entrega el paquete. No se requiere pago anticipado." },
  { question: "¿Cuanto tarda en llegar?", answer: "Enviamos con mensajeria express en 24/48 horas laborables a toda Espana." },
  { question: "¿Hay que saber cocinar?", answer: "¡No! El robot te guia paso a paso a traves de la pantalla tactil y la App. Esta pensado precisamente para quien no tiene tiempo o ganas de cocinar pero quiere comer bien." },
  { question: "¿Se limpia facilmente?", answer: "Si, tiene funcion de autolimpieza y la jarra tiene un revestimiento ceramico antiadherente que se lava con un pano." },
  { question: "¿Que puedo cocinar?", answer: "Practicamente todo: risottos, pasta, cremas, coccion al vapor (pescado/verduras), masas para pizza y pan, postres, yogur y mucho mas." },
  { question: "¿Y si no me convence?", answer: "Tienes garantia de 2 anos. Ademas, ofrecemos atencion al cliente espanola dedicada para cualquier duda o problema." }
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          Preguntas Frecuentes
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-bold text-gray-800 text-lg">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
              </button>
              
              {openIndex === index && (
                <div className="p-4 bg-white text-gray-600 border-t border-gray-200 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 14. Brand Banner Component
const BrandBanner: React.FC = () => {
  return (
    <div className="bg-slate-800 py-6 px-4 text-center border-t border-slate-700">
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-300 text-sm md:text-base">
          <span className="font-bold text-white">QuickChef®</span> es una marca registrada vendida exclusivamente por{' '}
          <Link href="/" className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2">
            Ecomotiq
          </Link>
          {' '}- Tu socio tech wholesale de confianza
        </p>
      </div>
    </div>
  );
};

// 15. Footer Component
const Footer: React.FC = () => {
  return (
    <>
      <BrandBanner />
      <footer className="w-full text-gray-300 bg-slate-900">
        <div className="py-2 text-center bg-slate-700">
          <a href="#" className="text-white hover:underline">Torna su</a>
        </div>
        <div className="max-w-[1500px] mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">La Nostra Azienda</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/chi-siamo" className="hover:text-white">Chi Siamo</Link></li>
                <li><Link href="/assistenza" className="hover:text-white">Contattaci</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legale</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/termini-e-condizioni" className="hover:text-white">Termini e Condizioni</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/cookie-policy" className="hover:text-white">Cookie Policy</Link></li>
                <li><Link href="/politiche-spedizione" className="hover:text-white">Politica di Spedizione</Link></li>
                <li><Link href="/politiche-reso" className="hover:text-white">Politica di Reso</Link></li>
                <li><Link href="/garanzia" className="hover:text-white">Garanzia</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Pagamento</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/pagamento-alla-consegna" className="hover:text-white">Metodi di Pagamento</Link></li>
                <li><Link href="/pagamento-alla-consegna" className="hover:text-white font-bold text-blue-400">Paga alla Consegna</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Assistenza</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/assistenza" className="hover:text-white">Dov&apos;è il Mio Ordine</Link></li>
                <li><Link href="/politiche-spedizione" className="hover:text-white">Spedizioni</Link></li>
                <li><Link href="/politiche-reso" className="hover:text-white">Resi e Sostituzioni</Link></li>
                <li><Link href="/assistenza" className="hover:text-white">Contatta il Supporto</Link></li>
                <li><Link href="/assistenza" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 py-6">
          <div className="max-w-[1500px] mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/commise logo.png"
                alt="Ecommise"
                width={300}
                height={150}
                className="h-20 w-auto"
              />
            </div>
            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Ecommise SAS - P.IVA FR 84 529 317 648</p>
          </div>
        </div>
      </footer>
    </>
  );
};

// 15. StickyMobileCTA Component
const StickyMobileCTA: React.FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.1)] z-50 md:hidden animate-slide-up pb-safe">
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 line-through">€299</span>
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">-50%</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-red-600">€149,90</span>
          </div>
        </div>

        <div className="flex-grow">
          <Button onClick={scrollToForm} fullWidth size="md" className="shadow-none py-3 text-lg" icon={<ShoppingCart size={18} />}>
            ORDINA -50%
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function Home() {
  // Google Ads Pageview Tracking + Fingerprint script
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load Google Ads script
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17218323030';
      document.head.appendChild(gtagScript);

      gtagScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { window.dataLayer!.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', 'AW-17218323030');
        console.log('✅ Google Ads PageView tracked (ES - QuickChef)');
      };

      // Load fingerprint script for network tracking
      const fpScript = document.createElement('script');
      fpScript.src = 'https://offers.italiadrop.com/forms/tmfp/';
      fpScript.crossOrigin = 'anonymous';
      fpScript.defer = true;
      document.head.appendChild(fpScript);
      console.log('✅ Network fingerprint script loaded (ES)');
    }
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 pb-20 md:pb-0">
      <StickyHeader />
      <Hero scrollToForm={scrollToForm} />
      <SocialProof />
      <ProblemAgitation scrollToForm={scrollToForm} />
      <HowItWorks />
      <FeaturesGrid />
      <ComparisonTable scrollToForm={scrollToForm} />
      <WhatsIncluded />
      <Reviews />
      <OrderForm />
      <Faq />
      <BrandBanner />
      <StickyMobileCTA scrollToForm={scrollToForm} />
    </main>
  );
}

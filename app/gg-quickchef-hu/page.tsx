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
  offer: '2886',
  lp: '2925',
};

// --- TYPES ---

interface Review {
  id: number;
  name: string;
  age: number;
  location: string;
  stars: number;
  text: string;
  imageUrl?: string;
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
            Bezaras
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
          <Truck size={14} /> SZALLITAS 24/48 ORA
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1 text-yellow-300">
          <Banknote size={14} /> FIZETES ATVETKOR
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} /> 2 EV GARANCIA
        </div>
        <div className="hidden md:inline">|</div>
        <div className="hidden md:flex items-center gap-1">
          <Phone size={14} /> MAGYAR UGYFELSZOLGALAT
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
  <span key="1"><strong className="text-red-700">EXKLUZIV UJDONSAG:</strong> Automatikus hozzavalo-adagolas (mindent egyedul csinal)</span>,
  <span key="2"><strong className="text-gray-900">45 Funkcio 1-ben:</strong> a legteljesebb robot a piacon</span>,
  <span key="3">Erintokepernyo <strong className="text-gray-900">7&quot; SoftScreen</strong> nagy es jol lathato - lepesrol lepesre vezet</span>,
  <span key="4">Alkalmazas <strong className="text-gray-900">1000+ recepttel</strong> - valassz es kovesd mint egy oktatoanyagot</span>,
  <span key="5">Funkcio <strong className="text-gray-900">&quot;Mi van a hutomben?&quot;</strong> - sporolsz a bevasarlason</span>,
  <span key="6"><strong className="text-gray-900">Beepitett merleg</strong> gramm pontos - vege a &quot;szemre&quot; adagolasnak</span>,
  <span key="7">Edeny <strong className="text-gray-900">keramia tapadasmentes</strong> - semmi nem eg oda, konnyedén tisztithato</span>,
  <span key="8">Fozes <strong className="text-gray-900">180°C-ig</strong> + valodi piritas</span>,
  <span key="9">Rendszer <strong className="text-gray-900">OneClick</strong> - tartozekcsere szetszereles nelkul</span>,
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
          <span className="text-red-600 block mb-2 text-xl md:text-2xl uppercase tracking-wide">Eleged van az idovesztesbol a konyhaban?</span>
          Fedezd fel az Elso Robotot ami <span className="bg-yellow-200 px-2">Maga Adja Hozza a Hozzavalokat.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
          Felejtsd el a fazekakat es a stresszt. Tedd be mindent az adagoloba, valassz receptet a kepernyorol es <strong className="text-gray-900">o foz helyetted mig te pihensz.</strong>
          <br className="my-2"/>
          <strong className="text-green-700 bg-green-50 px-3 py-1 rounded inline-block mt-2 border border-green-200 shadow-sm">✅ Tokeletes eredmeny (meg ha nem is tudsz fozni)</strong>
        </p>

        <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-100 max-w-xl mx-auto group bg-gray-100">
           <div className="relative aspect-square w-full">
             <img
               src={carouselImages[currentSlide]}
               alt={`Konyhai robot dia ${currentSlide + 1}`}
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

        {/* Miniaturas bajo el carrusel */}
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
              🟡 A robot amivel Sefkent fozhetsz <br className="hidden sm:block"/>piszkos edenyek nelkul
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
            Korlatozott Ajanlat
          </div>

          <div className="flex flex-col items-center justify-center mb-6 mt-6">
             <div className="bg-yellow-400 text-gray-900 font-black text-3xl md:text-4xl px-8 py-3 rounded-lg mb-4 shadow-md">
               -50%
             </div>
             <div className="flex items-center gap-3">
               <span className="text-gray-400 line-through text-2xl decoration-2">79 246 Ft</span>
               <span className="text-5xl md:text-6xl font-black text-red-600 tracking-tighter">39 623<span className="text-3xl"> Ft</span></span>
             </div>
             <p className="text-green-700 font-bold mt-2">Megtakarítasz 39 623 Ft-ot!</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100 text-left space-y-4">
             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0">
                 <Truck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Gyors Szallitas</p>
                 <p className="text-sm text-gray-500 mt-1">Garantalt kiszallitas 24/48 oran belul</p>
               </div>
             </div>

             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 shrink-0">
                 <Banknote size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Fizetes Atvetkor</p>
                 <p className="text-sm text-gray-500 mt-1">Nincs eloleg, keszpenz a futarnak</p>
               </div>
             </div>

             <div className="flex items-center gap-3">
               <div className="bg-blue-100 p-2 rounded-full text-blue-700 shrink-0">
                 <ShieldCheck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">2 Ev Garancia</p>
                 <p className="text-sm text-gray-500 mt-1">Technikai tamogatas az arban</p>
               </div>
             </div>
          </div>

          <Button onClick={scrollToForm} fullWidth pulse size="xl" subtext="🔒 Hitelkartya nem szukseges">
            RENDELD MEG MOST KEDVEZMENYESEN
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
          4,8/5 tobb mint 3000 ertekeles alapjan
        </h3>
        <p className="text-lg text-gray-600 italic mb-6">
          &quot;Vegre jol fozok orultseg nelkul.&quot;
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ThumbsUp className="text-blue-600" />
            <span className="font-bold text-gray-700">Egyszeru</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Clock className="text-green-600" />
            <span className="font-bold text-gray-700">Gyors</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Zap className="text-yellow-500" />
            <span className="font-bold text-gray-700">Tapadasmentes</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ChefHat className="text-red-500" />
            <span className="font-bold text-gray-700">Vezetett Receptek</span>
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
            🔴 Ha felismered ezeket a helyzeteket... <br/>ez a robot megvaltoztatja az eleted.
          </h2>

          <ul className="space-y-5 mb-8">
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Kinyitod a hutot es <strong className="text-red-700">nem tudod mit fozz.</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">A receptek <strong className="text-red-700">&quot;kozepes&quot;</strong> eredmennyel jarnak es elmegy a kedved.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800"><strong>Ezer fazekat piszkitasz ossze</strong> es orakig mosogatsz.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Vegul <strong>kajas etelt rendelsz</strong> es tul sokat koltesz.</span>
            </li>
          </ul>

          <div className="text-center bg-white p-6 rounded-lg border border-gray-100 shadow-md">
            <p className="text-xl font-bold text-green-700 mb-6 leading-tight">
              ✅ Matol automatikusan egeszseges eteleket fozhetsz,<br/> meg <span className="underline decoration-green-500 decoration-4">tapasztalat nelkul is.</span>
            </p>
            <Button onClick={scrollToForm} variant="primary" size="lg" className="mx-auto">
              IGEN, KEREM - FIZETEK ATVETKOR
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
          Hogyan mukodik?
        </h2>
        <p className="text-lg text-gray-600 mb-8">✅ Egyszerubb mint a mikro. <strong className="text-gray-900">Mindent egyedul csinal:</strong></p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">1</div>
            <h3 className="font-bold text-xl mb-2">Toltsd Meg az Adagolot</h3>
            <p className="text-gray-600">Tedd a hozzavalokat a <strong className="text-gray-900">6 rekeszbe</strong>. Nem kell elore lemerni, a merleg megteszi.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">2</div>
            <h3 className="font-bold text-xl mb-2">Valassz Receptet</h3>
            <p className="text-gray-600">Valassz a <strong className="text-gray-900">7&quot; kepernyorol</strong> vagy az alkalmazasbol 1000+ vezetett etel kozul.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">3</div>
            <h3 className="font-bold text-xl mb-2">Nyomj START-ot es Menj El</h3>
            <p className="text-gray-600">O adagolja a hozzavalokat <strong className="text-gray-900">a megfelelo pillanatban</strong>, foz es kever. Szol amikor kesz!</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-900 p-5 rounded-lg inline-block text-base md:text-lg shadow-sm">
          💡 <span className="font-bold">QUICKSENSE™ TECHNOLOGIA:</span> Az egyetlen robot ami maga adja hozza a hozzavalokat fozes kozben. <br/>
          <span className="text-sm text-blue-700">Nem kell mellette allnod!</span>
        </div>
      </div>
    </section>
  );
};

// 8. FeaturesGrid Component
const features: FeatureBox[] = [
  {
    id: 1,
    title: "Sosem hibazol",
    description: "Kovesd a kepernyot es a robot mindent kimer. 100%-os garantalt eredmeny.",
    imageUrl: "/images/quickchef img/Non sbagli mai.png"
  },
  {
    id: 2,
    title: "Mindent egyedul csinal",
    description: "Az automatikus ADAGOLO-nak koszonhetoen nem kell hozzavalokat adnod fozes kozben.",
    imageUrl: "/images/quickchef img/DISPENSER AUTOMATICO.png"
  },
  {
    id: 3,
    title: "Huto-Urites Funkcio",
    description: "Ird be az alkalmazasba mi van a hutodben es o megalkotja a tokeletes receptet. Nulla pazarlas.",
    imageUrl: "/images/quickchef img/Funzione Svota-Frigo.png"
  },
  {
    id: 4,
    title: "Tapadasmentes Keramia",
    description: "Unique edeny keramia bevonattal: semmi nem tapad es egy mozdulattal tisztithato.",
    imageUrl: "/images/quickchef img/Ceramica Antiaderente.png"
  },
  {
    id: 5,
    title: "45 Funkcio 1-ben",
    description: "Daralas, gyuras, parolás, erjesztes, slow cooking, joghurt... 10 keszuleket helyettesit.",
    imageUrl: "/images/quickchef img/45 Funzioni in 1.png"
  },
  {
    id: 6,
    title: "Sefi Eredmenyek",
    description: "Barsonvos kremek, tokeletes pizza tesztak, sus szoszok. Minden automatikusan.",
    imageUrl: "/images/quickchef img/Risultati da Chef.png"
  }
];

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          ✅ Miert valasztja mindenki:
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
                <p className="text-gray-600 leading-relaxed text-base">{feature.description}</p>
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
          🔥 Gyors osszehasonlitas (kertelés nelkul)
        </h2>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="p-4 text-gray-600 font-bold text-sm md:text-base w-1/3 uppercase tracking-wider">Jellemzo</th>
                <th className="p-4 bg-green-50 text-green-800 font-extrabold text-center border-l border-r border-green-200 w-1/3 text-sm md:text-xl shadow-inner">
                  ✅ QuickChef
                </th>
                <th className="p-4 text-gray-400 font-medium text-center text-sm md:text-base w-1/3">
                  ❌ Mas Robotok
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                [<span key="1">Automatikus Adagolo <br/><span className="text-xs font-normal text-gray-500">(Maga adja hozza a hozzavalokat)</span></span>, true, "Nincs (Neked kell)"],
                [<span key="2">Funkciok Szama</span>, "45 (Legteljesebb)", "Kb. 12-20"],
                [<span key="3">Erintokepernyo</span>, "7\" SoftScreen", "Kicsi vagy Nincs"],
                [<span key="4">App + Huto-Urites</span>, "Igen (1000+ Recept)", "Keves recept"],
                [<span key="5">Edeny Anyaga</span>, "Tapadasmentes Keramia", "Acel (Tapad)"],
                [<span key="6">Urutartalom</span>, "3,3L (Csaladi)", "2,2L (Kicsi)"],
                [<span key="7">Tisztitas</span>, "Ontisztitas + Mosogatogep", "Kezi mosogatas"],
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
            RENDELD MEG MOST - FIZESS ATVETKOR
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
               TELJES KESZLET
             </div>
             <div className="aspect-square w-full rounded-xl shadow-2xl border-4 border-white overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 bg-white">
                <img
                  src="/images/quickchef img/1.png"
                  alt="QuickChef csomag tartalma"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="text-blue-600" size={32} /> Mit talalsz a csomagban:
            </h2>
            <ul className="space-y-4">
              {[
                <span key="1">Robot <strong>QuickChef 45 Funkcio</strong></span>,
                <span key="2">Edeny <strong>Tapadasmentes Keramia (3,3L)</strong></span>,
                <span key="3"><strong className="text-blue-700">Automatikus Adagolo</strong> QuickSense™</span>,
                <span key="4">Tartozek <strong>Saute Lapát</strong> (rizotto/szoszok)</span>,
                <span key="5">XL Parolo 2 szintes</span>,
                <span key="6">Vagokeszlet: Pengek, Pillango, Kanal</span>,
                <span key="7"><strong className="text-green-700">BONUS:</strong> Prémium App 1000+ Recepttel</span>,
                <span key="8"><strong className="text-gray-900">2 Ev Garancia</strong></span>
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
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Szallitas</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Gyors 24/48h</p>
                  </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-gray-100">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-700 shrink-0">
                      <Banknote size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Fizetes</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Atvetkor</p>
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
  { id: 1, name: "Maria", age: 57, location: "Budapest", stars: 5, text: "Sosem voltam jo a konyhaban... ezzel minden sikerul. A kepernyo megmondja mit kell tenni, szuper kenyelmes.", imageUrl: "/images/quickchef img/recensione 1.jpg" },
  { id: 2, name: "Istvan", age: 63, location: "Debrecen", stars: 5, text: "A fozes fárasztó lett. Most beteszek mindent es o csinalja. A tisztitas sokkal egyszerubb.", imageUrl: "/images/quickchef img/recensione 2.jpg" },
  { id: 3, name: "Eva", age: 41, location: "Szeged", stars: 5, text: "Dolgozom es nincs időm. Ez menti meg az esteimet. Meg a tesztak es szoszok is tokeletesek.", imageUrl: "/images/quickchef img/recensione 3.jpg" },
  { id: 4, name: "Peter", age: 52, location: "Pecs", stars: 5, text: "A beepitett merleg szuper, vegre nem tevesztem el az adagokat... korabban a receptek fele a kukaban vegezle." },
  { id: 5, name: "Anna", age: 60, location: "Gyor", stars: 5, text: "Az edeny nem tapad, ez gyozott meg. Korabban allandoan kaparnom kellett." },
  { id: 6, name: "Zsofia", age: 35, location: "Miskolc", stars: 5, text: "A receptes alkalmazas nagyon hasznos... es a 'mi van a hutomben' funkcio zsenialis, nem pazarlok etelt." }
];

const Reviews: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          ⭐ Valos vasarloi velemenyek
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {review.imageUrl && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={review.imageUrl}
                    alt={`Ertekeles ${review.name} altal`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}, {review.age} eves</h4>
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
                <p className="text-gray-700 italic">&quot;{review.text}&quot;</p>
                <div className="mt-4 flex items-center gap-2 text-green-700 text-xs font-bold uppercase">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> Ellenorzott Vasarlas
                </div>
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
      countryCode: 'HU',
      productKey: 'quickchef_hu',
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
    sessionStorage.setItem('ec_value', '39623'); // Price in HUF

    // Generate order code
    const orderCode = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('orderCode', orderCode);

    // Clear any previous conversion tracking
    sessionStorage.removeItem('conversionTracked');
    sessionStorage.removeItem('networkResponse');

    // Track Google Ads Conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17218323030/1p4UCO6X_PEbENaEq5JA',
        'value': 39623,
        'currency': 'HUF'
      });
      console.log('✅ Google Ads Conversion tracked (HU - QuickChef)');
    }

    // Send data to network API
    try {
      const apiFormData = new FormData();
      apiFormData.append('uid', NETWORK_CONFIG.uid);
      apiFormData.append('key', NETWORK_CONFIG.key);
      apiFormData.append('offer', NETWORK_CONFIG.offer);
      apiFormData.append('lp', NETWORK_CONFIG.lp);
      apiFormData.append('name', formData.firstName);
      apiFormData.append('phone', formData.phone);
      apiFormData.append('address', formData.fullAddress);
      // Add fingerprint if available
      if (typeof window !== 'undefined' && window.tmfp) {
        apiFormData.append('tmfp', window.tmfp);
      }

      const response = await fetch(NETWORK_CONFIG.apiUrl, {
        method: 'POST',
        body: apiFormData,
      });

      const responseText = await response.text();
      sessionStorage.setItem('networkResponse', responseText);
      console.log('✅ Network API response (HU):', responseText);
    } catch (error) {
      console.error('❌ Network API error (HU):', error);
    }

    // Redirect to thank you page
    router.push('/ty/hu');
  };

  if (isSubmitting) {
    return (
      <div id="order-form" className="py-12 px-4 bg-green-50 text-center rounded-xl border-4 border-green-500 max-w-2xl mx-auto my-8 scroll-mt-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-4">Rendelés feldolgozása...</h2>
      </div>
    );
  }

  // Fallback - not used as we redirect
  const submitted = false;
  if (submitted) {
    return (
      <div id="order-form" className="py-12 px-4 bg-green-50 text-center rounded-xl border-4 border-green-500 max-w-2xl mx-auto my-8 scroll-mt-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <ShieldCheck size={48} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-green-800 mb-4">Koszonjuk a rendelest!</h2>
        <p className="text-xl text-gray-700 mb-6">
          Munkatarsunk hamarosan felhivja a <strong className="whitespace-nowrap">{formData.phone}</strong> szamon a szallitas megerositesere.
        </p>
        <div className="bg-white p-4 rounded-lg border border-gray-200 inline-block text-left">
          <p className="font-bold text-gray-800 mb-1">Mi tortenik most?</p>
          <ol className="list-decimal list-inside text-gray-600 space-y-1">
            <li>A rendeleset rogzitettuk.</li>
            <li>Megerosito hivast kapsz (magyar szam).</li>
            <li>A futar 24/48 oran belul kiszallitja.</li>
            <li>Keszpenzzel fizetsz atvetelekor.</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <section id="order-form" className="py-12 px-4 bg-red-50 border-t-4 border-red-600 scroll-mt-20">
      {/* Network Click Pixel */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://offers.italiadrop.com/forms/api/ck/?o=${NETWORK_CONFIG.offer}&uid=${NETWORK_CONFIG.uid}&lp=${NETWORK_CONFIG.lp}`}
        width="1"
        height="1"
        alt=""
        style={{ position: 'absolute', visibility: 'hidden' }}
      />
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-red-600 p-6 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12"></div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 uppercase relative z-10">
            Rendelesi Urlap
          </h2>
          <p className="font-medium opacity-90 relative z-10">Toltsd ki az 50% kedvezmenyert</p>
        </div>

        <div className="p-5 md:p-8">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-gray-500 line-through text-sm">Listaár: 79 246 Ft</p>
              <p className="text-red-600 font-bold text-2xl">Összesen: 39 623 Ft</p>
              <p className="text-green-600 font-semibold text-sm">Megtakarítasz 39 623 Ft-ot!</p>
            </div>
            <div className="text-right flex flex-col gap-2">
              <span className="bg-red-600 text-white text-sm font-black px-3 py-1 rounded-lg shadow">-50%</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">GYORS SZALLITAS</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Nev *</label>
              <input
                type="text"
                name="firstName"
                required
                autoComplete="name"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Pl: Kovacs Janos"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Telefon (Mobil) *</label>
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Pl: 06 30 123 4567"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <ShieldCheck size={12}/> Fontos a szallitas megerositésehez
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Teljes Cim (Utca, Hazszam, Varos, Iranyitoszam) *</label>
              <textarea
                name="fullAddress"
                required
                autoComplete="street-address"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg h-32"
                placeholder="Pl: Fo utca 10, 1011 Budapest"
                value={formData.fullAddress}
                onChange={handleChange}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-4 cursor-pointer hover:bg-gray-100 transition-colors">
               <label className="flex items-start gap-3 cursor-pointer pointer-events-none">
                 <input type="radio" checked readOnly className="w-5 h-5 text-green-600 mt-1" />
                 <div>
                   <span className="block font-bold text-gray-800">Fizetes Atvetkor (Keszpenz)</span>
                   <span className="block text-xs text-gray-500">Kozvetlenul a futarnak fizetsz a csomag atvetelekor. Nincs kockazat.</span>
                 </div>
               </label>
            </div>

            <Button type="submit" fullWidth pulse variant="primary" className="mt-6 shadow-xl text-xl">
              RENDELES MEGEROSITESE
            </Button>

            <div className="flex justify-center items-center gap-4 text-xs text-gray-400 mt-4">
              <span className="flex items-center gap-1"><Lock size={12}/> SSL Biztonsagos 256-bit</span>
              <span className="flex items-center gap-1"><Truck size={12}/> Gyors Szallitas</span>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

// 13. Faq Component
const faqs: FaqItem[] = [
  { question: "Fizethetek atvetelekor?", answer: "Igen, termeszetesen. Keszpenzzel fizetsz kozvetlenul a futarnak a csomag atvetelekor. Nincs eloleg." },
  { question: "Mennyi ido a kiszallitas?", answer: "Expressz futarral szallitunk 24/48 munkaoran belul egesz Magyarorszagon." },
  { question: "Tudni kell fozni?", answer: "Nem! A robot lepesrol lepesre vezet az erintokepernyon es az alkalmazason keresztul. Pont azoknak keszult akiknek nincs idejuk vagy kedvuk fozni, de jol akarnak enni." },
  { question: "Konnyuen tisztithato?", answer: "Igen, van ontisztito funkcioja es az edenynek tapadasmentes keramia bevonatja van, ami egy mozdulattal tisztithato." },
  { question: "Mit fozhetek?", answer: "Gyakorlatilag mindent: rizotto, teszta, kremleves, parolas (hal/zoldseg), pizza es kenyer teszta, desszertek, joghurt es meg sok mas." },
  { question: "Mi van ha nem tetszik?", answer: "2 ev garanciát kapsz. Raadásul magyar ugyfelszolgalatot biztositunk minden kerdesre vagy problémara." }
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
          Gyakran Ismetelt Kerdesek
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
          A <span className="font-bold text-white">QuickChef®</span> bejegyzett vedjegy, kizarolag az{' '}
          <Link href="/" className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2">
            Ecomotiq
          </Link>
          {' '}altal forgalmazva - A megbizhato tech wholesale partnered
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
          <a href="#" className="text-white hover:underline">Vissza a tetejere</a>
        </div>
        <div className="max-w-[1500px] mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">Cegunk</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/chi-siamo" className="hover:text-white">Rolunk</Link></li>
                <li><Link href="/assistenza" className="hover:text-white">Kapcsolat</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Jogi</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/termini-e-condizioni" className="hover:text-white">ASZF</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white">Adatvedelem</Link></li>
                <li><Link href="/cookie-policy" className="hover:text-white">Cookie Szabalyzat</Link></li>
                <li><Link href="/politiche-spedizione" className="hover:text-white">Szallitasi Szabalyzat</Link></li>
                <li><Link href="/politiche-reso" className="hover:text-white">Visszakuldesi Szabalyzat</Link></li>
                <li><Link href="/garanzia" className="hover:text-white">Garancia</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Fizetes</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/pagamento-alla-consegna" className="hover:text-white">Fizetesi Modok</Link></li>
                <li><Link href="/pagamento-alla-consegna" className="hover:text-white font-bold text-blue-400">Fizetes Atvetkor</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Segitseg</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/assistenza" className="hover:text-white">Hol a Csomagom</Link></li>
                <li><Link href="/politiche-spedizione" className="hover:text-white">Szallitas</Link></li>
                <li><Link href="/politiche-reso" className="hover:text-white">Visszakuldes es Csere</Link></li>
                <li><Link href="/assistenza" className="hover:text-white">Ugyfelszolgalat</Link></li>
                <li><Link href="/assistenza" className="hover:text-white">GYIK</Link></li>
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
            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Ecommise SAS - Adoszam FR 84 529 317 648</p>
          </div>
        </div>
      </footer>
    </>
  );
};

// 16. StickyMobileCTA Component
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
            <span className="text-xs text-gray-400 line-through">79 246 Ft</span>
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">-50%</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-red-600">39 623 Ft</span>
          </div>
        </div>

        <div className="flex-grow">
          <Button onClick={scrollToForm} fullWidth size="md" className="shadow-none py-3 text-lg" icon={<ShoppingCart size={18} />}>
            RENDELES -50%
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function Home() {
  // Google Ads Pageview Tracking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17218323030';
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { window.dataLayer!.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', 'AW-17218323030');
        console.log('✅ Google Ads PageView tracked (HU - QuickChef)');
      };

      // Load fingerprint script for network tracking
      const fpScript = document.createElement('script');
      fpScript.src = 'https://offers.italiadrop.com/forms/tmfp/';
      fpScript.crossOrigin = 'anonymous';
      fpScript.defer = true;
      document.head.appendChild(fpScript);
      console.log('✅ Network fingerprint script loaded (HU)');
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

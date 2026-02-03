'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  apiUrl: 'https://offers.supertrendaffiliateprogram.com/forms/api/',
  uid: '63',
  key: '7e776a7ae7c90b43ce5b6ec6e7a60e',
  offer: '207',
  lp: '207',
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
            Zapri
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
          <Truck size={14} /> DOSTAVA 24/48H
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1 text-yellow-300">
          <Banknote size={14} /> PLACILO OB PREVZEMU
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} /> 2 LETI GARANCIJE
        </div>
        <div className="hidden md:inline">|</div>
        <div className="hidden md:flex items-center gap-1">
          <Phone size={14} /> SLOVENSKA PODPORA
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
  <span key="1"><strong className="text-red-700">EKSKLUZIVNA NOVOST:</strong> Avtomatsko dodajanje sestavin (vse naredi sam)</span>,
  <span key="2"><strong className="text-gray-900">45 Funkcij v 1:</strong> najbolj popoln robot na trgu</span>,
  <span key="3">Zaslon na dotik <strong className="text-gray-900">7&quot; SoftScreen</strong> velik in pregleden - vodi vas korak za korakom</span>,
  <span key="4">Aplikacija z <strong className="text-gray-900">1000+ recepti</strong> - izberite in sledite kot vadnici</span>,
  <span key="5">Funkcija <strong className="text-gray-900">&quot;Kaj imam v hladilniku?&quot;</strong> - prihranite pri nakupih</span>,
  <span key="6"><strong className="text-gray-900">Vgrajena tehtnica</strong> natancna na gram - konec z odmerjanjem &quot;na oko&quot;</span>,
  <span key="7">Posoda <strong className="text-gray-900">keramicna nelepljiva</strong> - nic ne zagori, enostavno ciscenje</span>,
  <span key="8">Kuhanje do <strong className="text-gray-900">180°C</strong> + pravo prazenje</span>,
  <span key="9">Sistem <strong className="text-gray-900">OneClick</strong> - menjava dodatkov brez razstavljanja</span>,
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
          <span className="text-red-600 block mb-2 text-xl md:text-2xl uppercase tracking-wide">Ste naveličani izgubljanja časa v kuhinji?</span>
          Odkrijte prvi robot, ki <span className="bg-yellow-200 px-2">sam dodaja sestavine.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
          Pozabite na lonce in stres. Vse dajte v dozirnik, izberite recept na zaslonu in <strong className="text-gray-900">on kuha namesto vas, medtem ko vi počivate.</strong>
          <br className="my-2"/>
          <strong className="text-green-700 bg-green-50 px-3 py-1 rounded inline-block mt-2 border border-green-200 shadow-sm">✅ Popoln rezultat (tudi ce ne znate kuhati)</strong>
        </p>

        <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-100 max-w-xl mx-auto group bg-gray-100">
           <div className="relative aspect-square w-full">
             <img
               src={carouselImages[currentSlide]}
               alt={`Kuhinjski robot slika ${currentSlide + 1}`}
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

        {/* Sličice pod karuselom */}
        <div className="flex justify-center gap-2 md:gap-3 max-w-xl mx-auto mb-8">
          {carouselImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-200 ${idx === currentSlide ? 'ring-3 ring-red-600 scale-105 shadow-lg' : 'ring-2 ring-gray-200 opacity-70 hover:opacity-100 hover:ring-gray-400'}`}
            >
              <img
                src={img}
                alt={`Sličica ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        <div className="bg-yellow-50/60 rounded-xl p-6 md:p-8 mb-8 text-left max-w-2xl mx-auto border-2 border-yellow-200 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center leading-tight">
              🟡 Robot, ki vam omogoca kuhanje kot Šef <br className="hidden sm:block"/>brez umazanih loncev
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
            Omejena Ponudba
          </div>

          <div className="flex flex-col items-center justify-center mb-6 mt-6">
             <div className="bg-yellow-400 text-gray-900 font-black text-3xl md:text-4xl px-8 py-3 rounded-lg mb-4 shadow-md">
               -50%
             </div>
             <div className="flex items-center gap-3">
               <span className="text-gray-400 line-through text-2xl decoration-2">199,98 €</span>
               <span className="text-5xl md:text-6xl font-black text-red-600 tracking-tighter">99,99<span className="text-3xl"> €</span></span>
             </div>
             <p className="text-green-700 font-bold mt-2">Prihranite 99,99 €!</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100 text-left space-y-4">
             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0">
                 <Truck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Hitra Dostava</p>
                 <p className="text-sm text-gray-500 mt-1">Zagotovljena dostava v 24/48 urah</p>
               </div>
             </div>

             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 shrink-0">
                 <Banknote size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Placilo ob Prevzemu</p>
                 <p className="text-sm text-gray-500 mt-1">Brez predplacila, gotovina kurirju</p>
               </div>
             </div>

             <div className="flex items-center gap-3">
               <div className="bg-blue-100 p-2 rounded-full text-blue-700 shrink-0">
                 <ShieldCheck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">2 Leti Garancije</p>
                 <p className="text-sm text-gray-500 mt-1">Tehnicna podpora vkljucena</p>
               </div>
             </div>
          </div>

          <Button onClick={scrollToForm} fullWidth pulse size="xl" subtext="🔒 Kreditna kartica ni potrebna">
            NAROCITE ZDAJ S POPUSTOM
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
          4,8/5 na podlagi vec kot 3000 ocen
        </h3>
        <p className="text-lg text-gray-600 italic mb-6">
          &quot;Koncno dobro kuham brez norosti.&quot;
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ThumbsUp className="text-blue-600" />
            <span className="font-bold text-gray-700">Enostavno</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Clock className="text-green-600" />
            <span className="font-bold text-gray-700">Hitro</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Zap className="text-yellow-500" />
            <span className="font-bold text-gray-700">Nelepljivo</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ChefHat className="text-red-500" />
            <span className="font-bold text-gray-700">Vodeni Recepti</span>
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
            🔴 Ce se prepoznate v teh situacijah... <br/>vam bo ta robot spremenil zivljenje.
          </h2>

          <ul className="space-y-5 mb-8">
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Odprete hladilnik in <strong className="text-red-700">ne veste kaj skuhati.</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Recepti vam uspejo <strong className="text-red-700">&quot;tako-tako&quot;</strong> in izgubite voljo.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800"><strong>Umazete tisoc loncev</strong> in porabite ure za pomivanje.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Koncate tako, da si <strong>narocite hitro hrano</strong> in zapravite prevec.</span>
            </li>
          </ul>

          <div className="text-center bg-white p-6 rounded-lg border border-gray-100 shadow-md">
            <p className="text-xl font-bold text-green-700 mb-6 leading-tight">
              ✅ Od zdaj naprej avtomatsko kuhate zdrave obroke,<br/> tudi <span className="underline decoration-green-500 decoration-4">brez izkusenj.</span>
            </p>
            <Button onClick={scrollToForm} variant="primary" size="lg" className="mx-auto">
              DA, ZELIM GA - PLACAM OB PREVZEMU
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
          Kako deluje?
        </h2>
        <p className="text-lg text-gray-600 mb-8">✅ Enostavnejse kot mikrovalovna. <strong className="text-gray-900">Vse naredi sam:</strong></p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">1</div>
            <h3 className="font-bold text-xl mb-2">Napolnite Dozirnik</h3>
            <p className="text-gray-600">Vstavite sestavine v <strong className="text-gray-900">6 predalov</strong>. Ni jih treba tehtati, tehtnica to naredi namesto vas.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">2</div>
            <h3 className="font-bold text-xl mb-2">Izberite Recept</h3>
            <p className="text-gray-600">Izberite iz <strong className="text-gray-900">7&quot; zaslona</strong> ali iz aplikacije med 1000+ vodenimi jedmi.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">3</div>
            <h3 className="font-bold text-xl mb-2">Pritisnite START in Odidite</h3>
            <p className="text-gray-600">On dozira sestavine <strong className="text-gray-900">v pravem trenutku</strong>, kuha in mesa. Obvesti vas, ko je koncano!</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-900 p-5 rounded-lg inline-block text-base md:text-lg shadow-sm">
          💡 <span className="font-bold">TEHNOLOGIJA QUICKSENSE™:</span> Edini robot, ki sam dodaja sestavine med kuhanjem. <br/>
          <span className="text-sm text-blue-700">Ni vam treba stati ob njem!</span>
        </div>
      </div>
    </section>
  );
};

// 8. FeaturesGrid Component
const features: FeatureBox[] = [
  {
    id: 1,
    title: "Nikoli se ne zmotite",
    description: "Sledite zaslonu in robot vse odmeri. 100% zagotovljen rezultat.",
    imageUrl: "/images/quickchef img/Non sbagli mai.png"
  },
  {
    id: 2,
    title: "Vse naredi sam",
    description: "Zahvaljujoc avtomatskemu DOZIRNIKU vam ni treba dodajati sestavin med kuhanjem.",
    imageUrl: "/images/quickchef img/DISPENSER AUTOMATICO.png"
  },
  {
    id: 3,
    title: "Funkcija Izprazni-Hladilnik",
    description: "V aplikacijo napisete, kaj imate v hladilniku, in on ustvari popoln recept. Brez odpadkov.",
    imageUrl: "/images/quickchef img/Funzione Svota-Frigo.png"
  },
  {
    id: 4,
    title: "Nelepljiva Keramika",
    description: "Posoda Unique s keramicno povrsino: nic se ne prilepi in se ocisti z enim potegom.",
    imageUrl: "/images/quickchef img/Ceramica Antiaderente.png"
  },
  {
    id: 5,
    title: "45 Funkcij v 1",
    description: "Sekljanje, gnetenje, kuhanje na pari, fermentacija, slow cooking, jogurt... nadomesti 10 aparatov.",
    imageUrl: "/images/quickchef img/45 Funzioni in 1.png"
  },
  {
    id: 6,
    title: "Rezultati kot od Šefa",
    description: "Zametne kreme, popolna testa za pico, goste omake. Vse avtomatsko.",
    imageUrl: "/images/quickchef img/Risultati da Chef.png"
  }
];

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          ✅ Zakaj ga vsi izbirajo:
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
          🔥 Hitra primerjava (brez ovinkov)
        </h2>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="p-4 text-gray-600 font-bold text-sm md:text-base w-1/3 uppercase tracking-wider">Lastnost</th>
                <th className="p-4 bg-green-50 text-green-800 font-extrabold text-center border-l border-r border-green-200 w-1/3 text-sm md:text-xl shadow-inner">
                  ✅ QuickChef
                </th>
                <th className="p-4 text-gray-400 font-medium text-center text-sm md:text-base w-1/3">
                  ❌ Drugi Roboti
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                [<span key="1">Avtomatski Dozirnik <br/><span className="text-xs font-normal text-gray-500">(Sam dodaja sestavine)</span></span>, true, "Manjka (Morate sami)"],
                [<span key="2">Stevilo Funkcij</span>, "45 (Najbolj popoln)", "Pribl. 12-20"],
                [<span key="3">Zaslon na Dotik</span>, "7\" SoftScreen", "Majhen ali Manjka"],
                [<span key="4">App + Izprazni-Hladilnik</span>, "Da (1000+ Receptov)", "Malo receptov"],
                [<span key="5">Material Posode</span>, "Nelepljiva Keramika", "Jeklo (Se prilepi)"],
                [<span key="6">Prostornina</span>, "3,3L (Druzinski)", "2,2L (Majhen)"],
                [<span key="7">Ciscenje</span>, "Samociscenje + Pomivalni stroj", "Rocno pomivanje"],
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
            NAROCITE ZDAJ - PLACATE OB PREVZEMU
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
               KOMPLETNI SET
             </div>
             <div className="aspect-square w-full rounded-xl shadow-2xl border-4 border-white overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 bg-white">
                <img
                  src="/images/quickchef img/1.png"
                  alt="Vsebina paketa QuickChef"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="text-blue-600" size={32} /> Kaj najdete v paketu:
            </h2>
            <ul className="space-y-4">
              {[
                <span key="1">Robot <strong>QuickChef 45 Funkcij</strong></span>,
                <span key="2">Posoda <strong>Keramicna Nelepljiva (3,3L)</strong></span>,
                <span key="3"><strong className="text-blue-700">Avtomatski Dozirnik</strong> QuickSense™</span>,
                <span key="4">Dodatek <strong>Lopatica Saute</strong> (za rižote/omake)</span>,
                <span key="5">XL Parnik 2-nadstropni</span>,
                <span key="6">Set za rezanje: Rezila, Metulj, Zlica</span>,
                <span key="7"><strong className="text-green-700">BONUS:</strong> Premium Aplikacija z 1000+ Recepti</span>,
                <span key="8"><strong className="text-gray-900">2 Leti Garancije</strong></span>
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
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Dostava</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Hitra 24/48h</p>
                  </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-gray-100">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-700 shrink-0">
                      <Banknote size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Placilo</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Ob Prevzemu</p>
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
  { id: 1, name: "Marija", age: 57, location: "Ljubljana", stars: 5, text: "Nikoli nisem bila dobra v kuhinji... s tem mi vse uspe. Zaslon pove kaj narediti, zelo udobno.", imageUrl: "/images/quickchef img/recensione 1.jpg" },
  { id: 2, name: "Janez", age: 63, location: "Maribor", stars: 5, text: "Kuhanje je postalo naporno. Zdaj vse dam notri in on naredi. Ciscenje veliko enostavnejse.", imageUrl: "/images/quickchef img/recensione 2.jpg" },
  { id: 3, name: "Eva", age: 41, location: "Celje", stars: 5, text: "Delam in nimam casa. To mi resuje vecere. Tudi testa in omake uspejo popolno.", imageUrl: "/images/quickchef img/recensione 3.jpg" },
  { id: 4, name: "Peter", age: 52, location: "Kranj", stars: 5, text: "Vgrajena tehtnica super, koncno se ne zmotim pri odmerkah... prej je polovica receptov koncala v kosih." },
  { id: 5, name: "Ana", age: 60, location: "Koper", stars: 5, text: "Posoda se ne prilepi, to me je prepricalo. Prej sem morala stalno strgati." },
  { id: 6, name: "Zala", age: 35, location: "Novo mesto", stars: 5, text: "Aplikacija z recepti zelo uporabna... in funkcija 'kaj imam v hladilniku' je genialna, ne zapravljam hrane." }
];

const Reviews: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          ⭐ Prave ocene strank
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {review.imageUrl && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={review.imageUrl}
                    alt={`Ocena od ${review.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}, {review.age} let</h4>
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
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> Preverjen Nakup
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save Enhanced Conversions data to sessionStorage
    sessionStorage.setItem('ec_name', formData.firstName);
    sessionStorage.setItem('ec_phone', formData.phone);
    sessionStorage.setItem('ec_address', formData.fullAddress);
    sessionStorage.setItem('ec_value', '99.99'); // Price in EUR

    // Generate order code
    const orderCode = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('orderCode', orderCode);

    // Clear any previous conversion tracking
    sessionStorage.removeItem('conversionTracked');
    sessionStorage.removeItem('networkResponse');

    // Track Google Ads Conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17218323030/1RhLCLyY-_EbENaEq5JA',
        'value': 99.99,
        'currency': 'EUR'
      });
      console.log('✅ Google Ads Conversion tracked (SL - QuickChef)');
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
      console.log('✅ Network API response (SL):', responseText);
    } catch (error) {
      console.error('❌ Network API error (SL):', error);
    }

    // Redirect to thank you page
    router.push('/ty/sl');
  };

  if (isSubmitting) {
    return (
      <div id="order-form" className="py-12 px-4 bg-green-50 text-center rounded-xl border-4 border-green-500 max-w-2xl mx-auto my-8 scroll-mt-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-4">Obdelava narocila...</h2>
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
        <h2 className="text-3xl font-bold text-green-800 mb-4">Hvala za narocilo!</h2>
        <p className="text-xl text-gray-700 mb-6">
          Nas sodelavec vas bo kmalu poklical na stevilko <strong className="whitespace-nowrap">{formData.phone}</strong> za potrditev dostave.
        </p>
        <div className="bg-white p-4 rounded-lg border border-gray-200 inline-block text-left">
          <p className="font-bold text-gray-800 mb-1">Kaj se zdaj dogaja?</p>
          <ol className="list-decimal list-inside text-gray-600 space-y-1">
            <li>Vase narocilo je bilo registrirano.</li>
            <li>Prejeli boste potrditveni klic (slovenska stevilka).</li>
            <li>Kurir dostavi v 24/48h.</li>
            <li>Placate z gotovino ob prevzemu.</li>
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
        src={`https://offers.supertrendaffiliateprogram.com/forms/click?uid=${NETWORK_CONFIG.uid}&offer=${NETWORK_CONFIG.offer}&lp=${NETWORK_CONFIG.lp}`}
        width="1"
        height="1"
        alt=""
        style={{ position: 'absolute', visibility: 'hidden' }}
      />
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-red-600 p-6 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12"></div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 uppercase relative z-10">
            Obrazec za Narocilo
          </h2>
          <p className="font-medium opacity-90 relative z-10">Izpolnite za 50% popust</p>
        </div>

        <div className="p-5 md:p-8">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-gray-500 line-through text-sm">Kataloska cena: 199,98 €</p>
              <p className="text-red-600 font-bold text-2xl">Skupaj: 99,99 €</p>
              <p className="text-green-600 font-semibold text-sm">Prihranite 99,99 €!</p>
            </div>
            <div className="text-right flex flex-col gap-2">
              <span className="bg-red-600 text-white text-sm font-black px-3 py-1 rounded-lg shadow">-50%</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">HITRA DOSTAVA</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Ime in Priimek *</label>
              <input
                type="text"
                name="firstName"
                required
                autoComplete="name"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Npr: Janez Novak"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Telefon (Mobilni) *</label>
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Npr: 040 123 456"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <ShieldCheck size={12}/> Pomembno za potrditev dostave
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Polni Naslov (Ulica, Stevilka, Mesto, Postna stevilka) *</label>
              <textarea
                name="fullAddress"
                required
                autoComplete="street-address"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg h-32"
                placeholder="Npr: Slovenska cesta 10, 1000 Ljubljana"
                value={formData.fullAddress}
                onChange={handleChange}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-4 cursor-pointer hover:bg-gray-100 transition-colors">
               <label className="flex items-start gap-3 cursor-pointer pointer-events-none">
                 <input type="radio" checked readOnly className="w-5 h-5 text-green-600 mt-1" />
                 <div>
                   <span className="block font-bold text-gray-800">Placilo ob Prevzemu (Gotovina)</span>
                   <span className="block text-xs text-gray-500">Placate neposredno kurirju ob prevzemu paketa. Brez tveganja.</span>
                 </div>
               </label>
            </div>

            <Button type="submit" fullWidth pulse variant="primary" className="mt-6 shadow-xl text-xl">
              POTRDITE NAROCILO
            </Button>

            <div className="flex justify-center items-center gap-4 text-xs text-gray-400 mt-4">
              <span className="flex items-center gap-1"><Lock size={12}/> SSL Varno 256-bit</span>
              <span className="flex items-center gap-1"><Truck size={12}/> Hitra Dostava</span>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

// 13. Faq Component
const faqs: FaqItem[] = [
  { question: "Lahko placam ob prevzemu?", answer: "Da, seveda. Placate z gotovino neposredno kurirju ob dostavi paketa. Brez predplacila." },
  { question: "Kako dolgo traja dostava?", answer: "Posiljamo z ekspresnim kurirjem v 24/48 delovnih urah po vsej Sloveniji." },
  { question: "Moram znati kuhati?", answer: "Ne! Robot vas vodi korak za korakom prek zaslona na dotik in aplikacije. Ustvarjen je za ljudi, ki nimajo casa ali volje za kuhanje, a zelijo jesti zdravo." },
  { question: "Se enostavno ocisti?", answer: "Da, ima funkcijo samociscenja in posoda ima keramicno nelepljivo povrsino, ki se ocisti z enim potegom." },
  { question: "Kaj lahko skuham?", answer: "Prakticno vse: rizoto, testenine, kremne jube, kuhanje na pari (ribe/zelenjava), testo za pico in kruh, sladice, jogurt in se veliko vec." },
  { question: "Kaj ce mi ne ustreza?", answer: "Imate 2 leti garancije. Poleg tega zagotavljamo slovensko podporo strankam za vsako vprasanje ali tezavo." }
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
          Pogosto Zastavljena Vprasanja
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
          <span className="font-bold text-white">QuickChef®</span> je registrirana blagovna znamka, ki jo prodaja izkljucno{' '}
          <Link href="/" className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2">
            Ecomotiq
          </Link>
          {' '}- Vas zanesljivi tech wholesale partner
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
          <a href="#" className="text-white hover:underline">Nazaj na vrh</a>
        </div>
        <div className="max-w-[1500px] mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">Nase Podjetje</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/chi-siamo" className="hover:text-white">O Nas</Link></li>
                <li><Link href="/assistenza" className="hover:text-white">Kontakt</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Pravno</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/termini-e-condizioni" className="hover:text-white">Pogoji Poslovanja</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white">Politika Zasebnosti</Link></li>
                <li><Link href="/cookie-policy" className="hover:text-white">Politika Piskotkov</Link></li>
                <li><Link href="/politiche-spedizione" className="hover:text-white">Pogoji Dostave</Link></li>
                <li><Link href="/politiche-reso" className="hover:text-white">Vracilo Blaga</Link></li>
                <li><Link href="/garanzia" className="hover:text-white">Garancija</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Placilo</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/pagamento-alla-consegna" className="hover:text-white">Nacini Placila</Link></li>
                <li><Link href="/pagamento-alla-consegna" className="hover:text-white font-bold text-blue-400">Placilo ob Prevzemu</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Pomoc</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/assistenza" className="hover:text-white">Kje Je Moj Paket</Link></li>
                <li><Link href="/politiche-spedizione" className="hover:text-white">Dostava</Link></li>
                <li><Link href="/politiche-reso" className="hover:text-white">Vracilo in Zamenjava</Link></li>
                <li><Link href="/assistenza" className="hover:text-white">Podpora Strankam</Link></li>
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
            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Ecommise SAS - ID DDV FR 84 529 317 648</p>
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
            <span className="text-xs text-gray-400 line-through">199,98 €</span>
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">-50%</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-red-600">99,99 €</span>
          </div>
        </div>

        <div className="flex-grow">
          <Button onClick={scrollToForm} fullWidth size="md" className="shadow-none py-3 text-lg" icon={<ShoppingCart size={18} />}>
            NAROCITE -50%
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
        console.log('✅ Google Ads PageView tracked (SL - QuickChef)');
      };

      // Load fingerprint script for network tracking
      const fpScript = document.createElement('script');
      fpScript.src = 'https://offers.supertrendaffiliateprogram.com/forms/tmfp/';
      fpScript.crossOrigin = 'anonymous';
      fpScript.defer = true;
      document.head.appendChild(fpScript);
      console.log('✅ Network fingerprint script loaded (SL)');
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

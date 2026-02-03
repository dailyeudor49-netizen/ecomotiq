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
  offer: '204',
  lp: '204',
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
            Zavrit
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
          <Truck size={14} /> DORUCENI 24/48H
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1 text-yellow-300">
          <Banknote size={14} /> PLATBA PRI PREVZETI
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} /> ZARUKA 2 ROKY
        </div>
        <div className="hidden md:inline">|</div>
        <div className="hidden md:flex items-center gap-1">
          <Phone size={14} /> CESKA PODPORA
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
  <span key="1"><strong className="text-red-700">EXKLUZIVNI NOVINKA:</strong> Automaticke davkovani ingredienci (dela vse sam)</span>,
  <span key="2"><strong className="text-gray-900">45 Funkci v 1:</strong> nejkompletnejsi robot na trhu</span>,
  <span key="3">Dotyková obrazovka <strong className="text-gray-900">7&quot; SoftScreen</strong> velka a prehledna - vede vas krok za krokem</span>,
  <span key="4">Aplikace s <strong className="text-gray-900">1000+ recepty</strong> - vyberte a postupujte jako v tutorialu</span>,
  <span key="5">Funkce <strong className="text-gray-900">&quot;Co mam v lednici?&quot;</strong> - setrite na nakupech</span>,
  <span key="6"><strong className="text-gray-900">Vestavena vaha</strong> presna na gram - konec s davkovanim &quot;od oka&quot;</span>,
  <span key="7">Nadoba <strong className="text-gray-900">keramicka nepripaliva</strong> - nic nepripali, snadne cisteni</span>,
  <span key="8">Vareni do <strong className="text-gray-900">180°C</strong> + skutecne opekani</span>,
  <span key="9">System <strong className="text-gray-900">OneClick</strong> - vymena prislusenstvi bez demontaze</span>,
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
          <span className="text-red-600 block mb-2 text-xl md:text-2xl uppercase tracking-wide">Mate dost ztraceneho casu v kuchyni?</span>
          Objevte Prvni Robot ktery <span className="bg-yellow-200 px-2">Sam Pridava Ingredience.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
          Zapomente na hrnce a stres. Vlozte vse do davkovace, vyberte recept na obrazovce a <strong className="text-gray-900">on vari za vas zatimco vy odpocivate.</strong>
          <br className="my-2"/>
          <strong className="text-green-700 bg-green-50 px-3 py-1 rounded inline-block mt-2 border border-green-200 shadow-sm">✅ Dokonaly vysledek (i kdyz neumite varit)</strong>
        </p>

        <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-100 max-w-xl mx-auto group bg-gray-100">
           <div className="relative aspect-square w-full">
             <img
               src={carouselImages[currentSlide]}
               alt={`Kuchynsky robot snimek ${currentSlide + 1}`}
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

        {/* Miniatury pod karuselem */}
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
              🟡 Robot ktery vam umozni varit jako Sefkuchar <br className="hidden sm:block"/>bez spinavych hrncu
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
            Omezena Nabidka
          </div>

          <div className="flex flex-col items-center justify-center mb-6 mt-6">
             <div className="bg-yellow-400 text-gray-900 font-black text-3xl md:text-4xl px-8 py-3 rounded-lg mb-4 shadow-md">
               -50%
             </div>
             <div className="flex items-center gap-3">
               <span className="text-gray-400 line-through text-2xl decoration-2">4 888 Kč</span>
               <span className="text-5xl md:text-6xl font-black text-red-600 tracking-tighter">2 444<span className="text-3xl"> Kč</span></span>
             </div>
             <p className="text-green-700 font-bold mt-2">Ušetříte 2 444 Kč!</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100 text-left space-y-4">
             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0">
                 <Truck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Rychle Doruceni</p>
                 <p className="text-sm text-gray-500 mt-1">Garantovane doruceni do 24/48 hodin</p>
               </div>
             </div>

             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 shrink-0">
                 <Banknote size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Platba Pri Prevzeti</p>
                 <p className="text-sm text-gray-500 mt-1">Zadna zaloha, hotovost kuryrovi</p>
               </div>
             </div>

             <div className="flex items-center gap-3">
               <div className="bg-blue-100 p-2 rounded-full text-blue-700 shrink-0">
                 <ShieldCheck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Zaruka 2 Roky</p>
                 <p className="text-sm text-gray-500 mt-1">Technicka podpora v cene</p>
               </div>
             </div>
          </div>

          <Button onClick={scrollToForm} fullWidth pulse size="xl" subtext="🔒 Kreditni karta neni potreba">
            OBJEDNAT NYNI SE SLEVOU
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
          4,8/5 na zaklade vice nez 3000 hodnoceni
        </h3>
        <p className="text-lg text-gray-600 italic mb-6">
          &quot;Konecne varim dobre bez silenstvi.&quot;
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ThumbsUp className="text-blue-600" />
            <span className="font-bold text-gray-700">Jednoduchy</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Clock className="text-green-600" />
            <span className="font-bold text-gray-700">Rychly</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Zap className="text-yellow-500" />
            <span className="font-bold text-gray-700">Nepripalivy</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ChefHat className="text-red-500" />
            <span className="font-bold text-gray-700">Navodene Recepty</span>
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
            🔴 Pokud se v techto situacich poznavate... <br/>tento robot vam zmeni zivot.
          </h2>

          <ul className="space-y-5 mb-8">
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Otevrete lednici a <strong className="text-red-700">nevite co uvarit.</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Recepty vam vychazi <strong className="text-red-700">&quot;tak-tak&quot;</strong> a ztracite chut.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800"><strong>Usinite tisic hrncu</strong> a stravite hodiny mytim.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Skoncite tak ze si <strong>objednate fast food</strong> a utratite moc.</span>
            </li>
          </ul>

          <div className="text-center bg-white p-6 rounded-lg border border-gray-100 shadow-md">
            <p className="text-xl font-bold text-green-700 mb-6 leading-tight">
              ✅ Odted varite automaticky zdrava jidla,<br/> i <span className="underline decoration-green-500 decoration-4">bez zkusenosti.</span>
            </p>
            <Button onClick={scrollToForm} variant="primary" size="lg" className="mx-auto">
              ANO, CHCI HO - PLATIM PRI PREVZETI
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
          Jak to funguje?
        </h2>
        <p className="text-lg text-gray-600 mb-8">✅ Jednodussi nez mikrovlnka. <strong className="text-gray-900">Dela vse sam:</strong></p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">1</div>
            <h3 className="font-bold text-xl mb-2">Naplnte Davkovac</h3>
            <p className="text-gray-600">Vlozte ingredience do <strong className="text-gray-900">6 prihrádek</strong>. Nemusite je vazit, vaha to udela za vas.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">2</div>
            <h3 className="font-bold text-xl mb-2">Vyberte Recept</h3>
            <p className="text-gray-600">Vyberte z <strong className="text-gray-900">7&quot; obrazovky</strong> nebo z aplikace mezi 1000+ navedenymi jidly.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">3</div>
            <h3 className="font-bold text-xl mb-2">Stisknete START a Odejdete</h3>
            <p className="text-gray-600">On davkuje ingredience <strong className="text-gray-900">ve spravny moment</strong>, vari a micha. Upozorni vas kdyz je hotovo!</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-900 p-5 rounded-lg inline-block text-base md:text-lg shadow-sm">
          💡 <span className="font-bold">TECHNOLOGIE QUICKSENSE™:</span> Jediny robot ktery sam pridava ingredience behem vareni. <br/>
          <span className="text-sm text-blue-700">Nemusite u neho stat!</span>
        </div>
      </div>
    </section>
  );
};

// 8. FeaturesGrid Component
const features: FeatureBox[] = [
  {
    id: 1,
    title: "Nikdy se nespletete",
    description: "Nasledujte obrazovku a robot vse odmeri. 100% garantovany vysledek.",
    imageUrl: "/images/quickchef img/Non sbagli mai.png"
  },
  {
    id: 2,
    title: "Dela vse sam",
    description: "Diky automatickemu DAVKOVACI nemusite pridavat ingredience behem vareni.",
    imageUrl: "/images/quickchef img/DISPENSER AUTOMATICO.png"
  },
  {
    id: 3,
    title: "Funkce Vyprazdnit-Lednici",
    description: "Napisete do aplikace co mate v lednici a on vytvori dokonaly recept. Zadne plytvani.",
    imageUrl: "/images/quickchef img/Funzione Svota-Frigo.png"
  },
  {
    id: 4,
    title: "Nepripalivy Keramika",
    description: "Nadoba Unique s keramickym povrchem: nic nepripali a cisti se jednim pohybem.",
    imageUrl: "/images/quickchef img/Ceramica Antiaderente.png"
  },
  {
    id: 5,
    title: "45 Funkci v 1",
    description: "Sekani, hneteni, vareni v pare, kvaseni, slow cooking, jogurt... nahrazuje 10 spotrebicu.",
    imageUrl: "/images/quickchef img/45 Funzioni in 1.png"
  },
  {
    id: 6,
    title: "Vysledky jako od Sefkuchare",
    description: "Sametove kremy, dokonala testa na pizzu, huste omacky. Vse automaticky.",
    imageUrl: "/images/quickchef img/Risultati da Chef.png"
  }
];

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          ✅ Proc ho vsichni vybiraji:
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
          🔥 Rychle srovnani (bez okolku)
        </h2>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="p-4 text-gray-600 font-bold text-sm md:text-base w-1/3 uppercase tracking-wider">Vlastnost</th>
                <th className="p-4 bg-green-50 text-green-800 font-extrabold text-center border-l border-r border-green-200 w-1/3 text-sm md:text-xl shadow-inner">
                  ✅ QuickChef
                </th>
                <th className="p-4 text-gray-400 font-medium text-center text-sm md:text-base w-1/3">
                  ❌ Jine Roboty
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                [<span key="1">Automaticky Davkovac <br/><span className="text-xs font-normal text-gray-500">(Sam pridava ingredience)</span></span>, true, "Chybi (Musite sami)"],
                [<span key="2">Pocet Funkci</span>, "45 (Nejkompletnejsi)", "Cca 12-20"],
                [<span key="3">Dotykova Obrazovka</span>, "7\" SoftScreen", "Mala nebo Chybi"],
                [<span key="4">App + Vyprazdnit-Lednici</span>, "Ano (1000+ Receptu)", "Malo receptu"],
                [<span key="5">Material Nadoby</span>, "Nepripalivy Keramika", "Ocel (Pripali)"],
                [<span key="6">Objem</span>, "3,3L (Rodinny)", "2,2L (Maly)"],
                [<span key="7">Cisteni</span>, "Samocisteni + Mycka", "Rucni myti"],
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
            OBJEDNAT NYNI - PLATITE PRI PREVZETI
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
               KOMPLETNI SADA
             </div>
             <div className="aspect-square w-full rounded-xl shadow-2xl border-4 border-white overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 bg-white">
                <img
                  src="/images/quickchef img/1.png"
                  alt="Obsah baleni QuickChef"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="text-blue-600" size={32} /> Co najdete v baleni:
            </h2>
            <ul className="space-y-4">
              {[
                <span key="1">Robot <strong>QuickChef 45 Funkci</strong></span>,
                <span key="2">Nadoba <strong>Keramicka Nepripalivy (3,3L)</strong></span>,
                <span key="3"><strong className="text-blue-700">Automaticky Davkovac</strong> QuickSense™</span>,
                <span key="4">Prislusenstvi <strong>Lopatka Saute</strong> (na rizoto/omacky)</span>,
                <span key="5">XL Naparka 2-patrova</span>,
                <span key="6">Sada na Krajeni: Cepele, Motyl, Lzice</span>,
                <span key="7"><strong className="text-green-700">BONUS:</strong> Premium Aplikace s 1000+ Recepty</span>,
                <span key="8"><strong className="text-gray-900">Zaruka 2 Roky</strong></span>
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
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Doruceni</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Rychle 24/48h</p>
                  </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-gray-100">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-700 shrink-0">
                      <Banknote size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Platba</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Pri Prevzeti</p>
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
  { id: 1, name: "Marie", age: 57, location: "Praha", stars: 5, text: "Nikdy jsem nebyla dobra v kuchyni... s timto mi vse vychazi. Obrazovka rika co delat, super pohodlne.", imageUrl: "/images/quickchef img/recensione 1.jpg" },
  { id: 2, name: "Josef", age: 63, location: "Brno", stars: 5, text: "Vareni bylo unavujici. Ted vse vlozim a on to udela. Cisteni mnohem jednodussi.", imageUrl: "/images/quickchef img/recensione 2.jpg" },
  { id: 3, name: "Eva", age: 41, location: "Ostrava", stars: 5, text: "Pracuji a nemam cas. Toto mi zachranuje vecery. I testa a omacky vychazi dokonale.", imageUrl: "/images/quickchef img/recensione 3.jpg" },
  { id: 4, name: "Petr", age: 52, location: "Plzen", stars: 5, text: "Vestavena vaha super, konecne se nespletu v davkach... drive polovina receptu koncila v kosi." },
  { id: 5, name: "Anna", age: 60, location: "Liberec", stars: 5, text: "Nadoba nepripali, to me presvedcilo. Drive jsem musela porad skrabat." },
  { id: 6, name: "Zuzana", age: 35, location: "Olomouc", stars: 5, text: "Aplikace s recepty velmi uzitecna... a funkce 'co mam v lednici' je genialni, neplytvam jidlem." }
];

const Reviews: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          ⭐ Skutecne recenze zakazniku
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {review.imageUrl && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={review.imageUrl}
                    alt={`Recenze od ${review.name}`}
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
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> Overeny Nakup
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
    sessionStorage.setItem('ec_value', '2444'); // Price in CZK

    // Generate order code
    const orderCode = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('orderCode', orderCode);

    // Clear any previous conversion tracking
    sessionStorage.removeItem('conversionTracked');
    sessionStorage.removeItem('networkResponse');

    // Track Google Ads Conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17218323030/TEcBCOyh_PEbENaEq5JA',
        'value': 2444,
        'currency': 'CZK'
      });
      console.log('✅ Google Ads Conversion tracked (CZ - QuickChef)');
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
      console.log('✅ Network API response (CZ):', responseText);
    } catch (error) {
      console.error('❌ Network API error (CZ):', error);
    }

    // Redirect to thank you page
    router.push('/ty/czk');
  };

  if (isSubmitting) {
    return (
      <div id="order-form" className="py-12 px-4 bg-green-50 text-center rounded-xl border-4 border-green-500 max-w-2xl mx-auto my-8 scroll-mt-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-4">Zpracování objednávky...</h2>
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
        <h2 className="text-3xl font-bold text-green-800 mb-4">Dekujeme za objednavku!</h2>
        <p className="text-xl text-gray-700 mb-6">
          Nas pracovnik vam brzy zavola na cislo <strong className="whitespace-nowrap">{formData.phone}</strong> pro potvrzeni doruceni.
        </p>
        <div className="bg-white p-4 rounded-lg border border-gray-200 inline-block text-left">
          <p className="font-bold text-gray-800 mb-1">Co se ted deje?</p>
          <ol className="list-decimal list-inside text-gray-600 space-y-1">
            <li>Vase objednavka byla zaregistrovana.</li>
            <li>Dostanete potvrzujici hovor (ceske cislo).</li>
            <li>Kuryr doruci do 24/48h.</li>
            <li>Zaplatite hotovosti pri prevzeti.</li>
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
            Objednavkovy Formular
          </h2>
          <p className="font-medium opacity-90 relative z-10">Vyplnte pro ziskani 50% slevy</p>
        </div>

        <div className="p-5 md:p-8">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-gray-500 line-through text-sm">Katalogová cena: 4 888 Kč</p>
              <p className="text-red-600 font-bold text-2xl">Celkem: 2 444 Kč</p>
              <p className="text-green-600 font-semibold text-sm">Ušetříte 2 444 Kč!</p>
            </div>
            <div className="text-right flex flex-col gap-2">
              <span className="bg-red-600 text-white text-sm font-black px-3 py-1 rounded-lg shadow">-50%</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">RYCHLE DORUCENI</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Jmeno a Prijmeni *</label>
              <input
                type="text"
                name="firstName"
                required
                autoComplete="name"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Napr: Jan Novak"
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
                placeholder="Napr: 777 123 456"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <ShieldCheck size={12}/> Dulezite pro potvrzeni doruceni
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Uplna Adresa (Ulice, Cislo, Mesto, PSC) *</label>
              <textarea
                name="fullAddress"
                required
                autoComplete="street-address"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg h-32"
                placeholder="Napr: Hlavni 10, 110 00 Praha"
                value={formData.fullAddress}
                onChange={handleChange}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-4 cursor-pointer hover:bg-gray-100 transition-colors">
               <label className="flex items-start gap-3 cursor-pointer pointer-events-none">
                 <input type="radio" checked readOnly className="w-5 h-5 text-green-600 mt-1" />
                 <div>
                   <span className="block font-bold text-gray-800">Platba Pri Prevzeti (Hotovost)</span>
                   <span className="block text-xs text-gray-500">Platite primo kuryrovi pri prevzeti baliku. Zadne riziko.</span>
                 </div>
               </label>
            </div>

            <Button type="submit" fullWidth pulse variant="primary" className="mt-6 shadow-xl text-xl">
              POTVRDIT OBJEDNAVKU
            </Button>

            <div className="flex justify-center items-center gap-4 text-xs text-gray-400 mt-4">
              <span className="flex items-center gap-1"><Lock size={12}/> SSL Zabezpecene 256-bit</span>
              <span className="flex items-center gap-1"><Truck size={12}/> Rychle Doruceni</span>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

// 13. Faq Component
const faqs: FaqItem[] = [
  { question: "Mohu platit pri prevzeti?", answer: "Ano, samozrejme. Platite hotovosti primo kuryrovi pri doruceni baliku. Zadna zaloha." },
  { question: "Jak dlouho trva doruceni?", answer: "Posilame expresnim kuryrem do 24/48 pracovnich hodin po cele Ceske republice." },
  { question: "Musim umet varit?", answer: "Ne! Robot vas vede krok za krokem pres dotykovou obrazovku a aplikaci. Je vytvoreny pro lidi, kteri nemaji cas nebo chut na vareni, ale chteji jist zdrave." },
  { question: "Cisti se snadno?", answer: "Ano, ma funkci samocisteni a nadoba ma keramicky nepripalivy povrch, ktery se cisti jednim pohybem." },
  { question: "Co mohu uvarit?", answer: "Prakticky vse: rizoto, testoviny, kremove polevky, vareni v pare (ryby/zelenina), testo na pizzu a chleb, dezerty, jogurt a mnoho dalsiho." },
  { question: "A kdyz mi nevyhovuje?", answer: "Mate 2 roky zaruky. Navic poskytujeme ceskou zakaznickou podporu na jakoukoli otazku nebo problem." }
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
          Casto Kladene Dotazy
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
          <span className="font-bold text-white">QuickChef®</span> je registrovana ochrana znacka prodavana vyhradne{' '}
          <Link href="/" className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2">
            Ecomotiq
          </Link>
          {' '}- Vas spolehliv tech wholesale partner
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
          <a href="#" className="text-white hover:underline">Zpet nahoru</a>
        </div>
        <div className="max-w-[1500px] mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">Nase Firma</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/chi-siamo" className="hover:text-white">O Nas</Link></li>
                <li><Link href="/assistenza" className="hover:text-white">Kontakt</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Pravni</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/termini-e-condizioni" className="hover:text-white">Obchodni Podminky</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white">Ochrana Soukromi</Link></li>
                <li><Link href="/cookie-policy" className="hover:text-white">Cookie Pravidla</Link></li>
                <li><Link href="/politiche-spedizione" className="hover:text-white">Dodaci Podminky</Link></li>
                <li><Link href="/politiche-reso" className="hover:text-white">Vraceni Zbozi</Link></li>
                <li><Link href="/garanzia" className="hover:text-white">Zaruka</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Platba</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/pagamento-alla-consegna" className="hover:text-white">Zpusoby Platby</Link></li>
                <li><Link href="/pagamento-alla-consegna" className="hover:text-white font-bold text-blue-400">Platba Pri Prevzeti</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Pomoc</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/assistenza" className="hover:text-white">Kde Je Muj Balik</Link></li>
                <li><Link href="/politiche-spedizione" className="hover:text-white">Doruceni</Link></li>
                <li><Link href="/politiche-reso" className="hover:text-white">Vraceni a Vymena</Link></li>
                <li><Link href="/assistenza" className="hover:text-white">Zakaznicka Podpora</Link></li>
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
            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Ecommise SAS - DIC FR 84 529 317 648</p>
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
            <span className="text-xs text-gray-400 line-through">4 888 Kč</span>
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">-50%</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-red-600">2 444 Kč</span>
          </div>
        </div>

        <div className="flex-grow">
          <Button onClick={scrollToForm} fullWidth size="md" className="shadow-none py-3 text-lg" icon={<ShoppingCart size={18} />}>
            OBJEDNAT -50%
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
        console.log('✅ Google Ads PageView tracked (CZ - QuickChef)');
      };

      // Load fingerprint script for network tracking
      const fpScript = document.createElement('script');
      fpScript.src = 'https://offers.supertrendaffiliateprogram.com/forms/tmfp/';
      fpScript.crossOrigin = 'anonymous';
      fpScript.defer = true;
      document.head.appendChild(fpScript);
      console.log('✅ Network fingerprint script loaded (CZ)');
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

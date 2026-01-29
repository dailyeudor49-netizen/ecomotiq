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
  apiUrl: 'https://offers.italiadrop.com/forms/api/',
  uid: '019bfb2f-317f-7e20-a4a8-44c22cb7bd03',
  key: '05fddd0847c3627b81e1d6',
  offer: '2220',
  lp: '2259',
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
            Zamknij
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
          <Truck size={14} /> WYSYLKA 24/48H
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1 text-yellow-300">
          <Banknote size={14} /> PLATNOSC PRZY ODBIORZE
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} /> GWARANCJA 2 LATA
        </div>
        <div className="hidden md:inline">|</div>
        <div className="hidden md:flex items-center gap-1">
          <Phone size={14} /> POLSKA OBSLUGA KLIENTA
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
  <span key="1"><strong className="text-red-700">EKSKLUZYWNA NOWOSC:</strong> Automatyczne dozowanie skladnikow (robi wszystko sam)</span>,
  <span key="2"><strong className="text-gray-900">45 Funkcji w 1:</strong> najbardziej kompletny robot na rynku</span>,
  <span key="3">Ekran dotykowy <strong className="text-gray-900">7&quot; SoftScreen</strong> duzy i czytelny - prowadzi Cie krok po kroku</span>,
  <span key="4">Aplikacja z <strong className="text-gray-900">1000+ przepisow</strong> - wybierz i postepuj jak w tutorialu</span>,
  <span key="5">Funkcja <strong className="text-gray-900">&quot;Co mam w lodowce?&quot;</strong> - oszczedzasz na zakupach</span>,
  <span key="6"><strong className="text-gray-900">Wbudowana waga</strong> dokladna co do grama - koniec z dawkowaniem &quot;na oko&quot;</span>,
  <span key="7">Misa <strong className="text-gray-900">ceramiczna nieprzywierajaca</strong> - nic sie nie przypala, latwo sie myje</span>,
  <span key="8">Gotowanie do <strong className="text-gray-900">180°C</strong> + prawdziwe smazenie</span>,
  <span key="9">System <strong className="text-gray-900">OneClick</strong> - zmieniasz akcesoria bez demontazu</span>,
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
          <span className="text-red-600 block mb-2 text-xl md:text-2xl uppercase tracking-wide">Masz dosc tracenia czasu w kuchni?</span>
          Odkryj Pierwszy Robot ktory <span className="bg-yellow-200 px-2">Sam Dodaje Skladniki.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
          Zapomnij o garnkach i stresie. Wloz wszystko do dozownika, wybierz przepis na ekranie i <strong className="text-gray-900">on gotuje za Ciebie, gdy Ty odpoczywasz.</strong>
          <br className="my-2"/>
          <strong className="text-green-700 bg-green-50 px-3 py-1 rounded inline-block mt-2 border border-green-200 shadow-sm">✅ Idealny rezultat (nawet jesli nie umiesz gotowac)</strong>
        </p>

        <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl border-4 border-gray-100 max-w-xl mx-auto group bg-gray-100">
           <div className="relative aspect-square w-full">
             <img
               src={carouselImages[currentSlide]}
               alt={`Robot kuchenny slajd ${currentSlide + 1}`}
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
              🟡 Robot ktory pozwala Ci gotowac jak Szef Kuchni <br className="hidden sm:block"/>bez brudnych garnkow
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
            Oferta Limitowana
          </div>

          <div className="flex flex-col items-center justify-center mb-6 mt-6">
             <div className="bg-yellow-400 text-gray-900 font-black text-3xl md:text-4xl px-8 py-3 rounded-lg mb-4 shadow-md">
               -50%
             </div>
             <div className="flex items-center gap-3">
               <span className="text-gray-400 line-through text-2xl decoration-2">598 zł</span>
               <span className="text-5xl md:text-6xl font-black text-red-600 tracking-tighter">299<span className="text-3xl"> zł</span></span>
             </div>
             <p className="text-green-700 font-bold mt-2">Oszczędzasz 299 zł!</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100 text-left space-y-4">
             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0">
                 <Truck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Szybka Wysylka</p>
                 <p className="text-sm text-gray-500 mt-1">Gwarantowana dostawa w 24/48 godzin</p>
               </div>
             </div>

             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 shrink-0">
                 <Banknote size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Platnosc Przy Odbiorze</p>
                 <p className="text-sm text-gray-500 mt-1">Bez zaliczki, gotowka u kuriera</p>
               </div>
             </div>

             <div className="flex items-center gap-3">
               <div className="bg-blue-100 p-2 rounded-full text-blue-700 shrink-0">
                 <ShieldCheck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Gwarancja 2 Lata</p>
                 <p className="text-sm text-gray-500 mt-1">Wsparcie techniczne w cenie</p>
               </div>
             </div>
          </div>

          <Button onClick={scrollToForm} fullWidth pulse size="xl" subtext="🔒 Karta kredytowa nie jest wymagana">
            ZAMOW TERAZ ZE ZNIZKA
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
          4,8/5 na podstawie ponad 3000 opinii
        </h3>
        <p className="text-lg text-gray-600 italic mb-6">
          &quot;Wreszcie gotuje dobrze bez szalenstwa.&quot;
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ThumbsUp className="text-blue-600" />
            <span className="font-bold text-gray-700">Latwy</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Clock className="text-green-600" />
            <span className="font-bold text-gray-700">Szybki</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Zap className="text-yellow-500" />
            <span className="font-bold text-gray-700">Nieprzywierajacy</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ChefHat className="text-red-500" />
            <span className="font-bold text-gray-700">Przepisy z Przewodnikiem</span>
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
            🔴 Jesli rozpoznajesz te sytuacje... <br/>ten robot zmieni Twoje zycie.
          </h2>

          <ul className="space-y-5 mb-8">
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Otwierasz lodowke i <strong className="text-red-700">nie wiesz co ugotowac.</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Przepisy wychodza Ci <strong className="text-red-700">&quot;tak sobie&quot;</strong> i tracisz ochote.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800"><strong>Brudzisz tysiac garnkow</strong> i spedzasz godziny na myciu.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Konczysz <strong>zamawiajac smieci</strong> i wydajac za duzo.</span>
            </li>
          </ul>

          <div className="text-center bg-white p-6 rounded-lg border border-gray-100 shadow-md">
            <p className="text-xl font-bold text-green-700 mb-6 leading-tight">
              ✅ Od dzis gotujesz automatycznie zdrowe dania,<br/> nawet <span className="underline decoration-green-500 decoration-4">bez doswiadczenia.</span>
            </p>
            <Button onClick={scrollToForm} variant="primary" size="lg" className="mx-auto">
              TAK, CHCE GO - PLACE PRZY ODBIORZE
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
          Jak to dziala?
        </h2>
        <p className="text-lg text-gray-600 mb-8">✅ Latwiejszy niz mikrofalowka. <strong className="text-gray-900">Robi wszystko sam:</strong></p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">1</div>
            <h3 className="font-bold text-xl mb-2">Zaladuj Dozownik</h3>
            <p className="text-gray-600">Wloz skladniki do <strong className="text-gray-900">6 przegrodek</strong>. Nie musisz ich wazyc, waga to zrobi.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">2</div>
            <h3 className="font-bold text-xl mb-2">Wybierz Przepis</h3>
            <p className="text-gray-600">Wybierz z <strong className="text-gray-900">ekranu 7&quot;</strong> lub z aplikacji sposrod 1000+ dan z instrukcjami.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">3</div>
            <h3 className="font-bold text-xl mb-2">Nacisnij START i Odejdz</h3>
            <p className="text-gray-600">On dozuje skladniki <strong className="text-gray-900">we wlasciwym momencie</strong>, gotuje i miesza. Powiadomi Cie gdy bedzie gotowe!</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-900 p-5 rounded-lg inline-block text-base md:text-lg shadow-sm">
          💡 <span className="font-bold">TECHNOLOGIA QUICKSENSE™:</span> Jedyny robot ktory sam dodaje skladniki podczas gotowania. <br/>
          <span className="text-sm text-blue-700">Nie musisz przy nim stac!</span>
        </div>
      </div>
    </section>
  );
};

// 8. FeaturesGrid Component
const features: FeatureBox[] = [
  {
    id: 1,
    title: "Nigdy sie nie pomylisz",
    description: "Postepuj wedlug ekranu, a robot odmierzy wszystko. Rezultat gwarantowany w 100%.",
    imageUrl: "/images/quickchef img/Non sbagli mai.png"
  },
  {
    id: 2,
    title: "Robi wszystko sam",
    description: "Dzieki automatycznemu DOZOWNIKOWI nie musisz dodawac skladnikow podczas gotowania.",
    imageUrl: "/images/quickchef img/DISPENSER AUTOMATICO.png"
  },
  {
    id: 3,
    title: "Funkcja Oproznij-Lodowke",
    description: "Wpisz w aplikacji co masz w lodowce, a on stworzy idealny przepis. Zero marnowania.",
    imageUrl: "/images/quickchef img/Funzione Svota-Frigo.png"
  },
  {
    id: 4,
    title: "Ceramika Nieprzywierajaca",
    description: "Misa Unique pokryta ceramika: nic nie przywiera i myje sie jednym ruchem.",
    imageUrl: "/images/quickchef img/Ceramica Antiaderente.png"
  },
  {
    id: 5,
    title: "45 Funkcji w 1",
    description: "Siekanie, zagniatanie, gotowanie na parze, fermentacja, slow cooking, jogurt... zastepuje 10 urzadzen.",
    imageUrl: "/images/quickchef img/45 Funzioni in 1.png"
  },
  {
    id: 6,
    title: "Rezultaty jak u Szefa Kuchni",
    description: "Aksamitne kremy, idealne ciasta na pizze, geste sosy. Wszystko automatycznie.",
    imageUrl: "/images/quickchef img/Risultati da Chef.png"
  }
];

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          ✅ Dlaczego wszyscy go wybieraja:
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
          🔥 Szybkie porownanie (bez owijania w bawelne)
        </h2>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="p-4 text-gray-600 font-bold text-sm md:text-base w-1/3 uppercase tracking-wider">Cecha</th>
                <th className="p-4 bg-green-50 text-green-800 font-extrabold text-center border-l border-r border-green-200 w-1/3 text-sm md:text-xl shadow-inner">
                  ✅ QuickChef
                </th>
                <th className="p-4 text-gray-400 font-medium text-center text-sm md:text-base w-1/3">
                  ❌ Inne Roboty
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                [<span key="1">Automatyczny Dozownik <br/><span className="text-xs font-normal text-gray-500">(Sam dodaje skladniki)</span></span>, true, "Brak (Musisz sam)"],
                [<span key="2">Liczba Funkcji</span>, "45 (Najbardziej kompletny)", "Okolo 12-20"],
                [<span key="3">Ekran Dotykowy</span>, "7\" SoftScreen", "Maly lub Brak"],
                [<span key="4">Aplikacja + Oproznij-Lodowke</span>, "Tak (1000+ Przepisow)", "Malo przepisow"],
                [<span key="5">Material Misy</span>, "Ceramika Nieprzywierajaca", "Stal (Przywiera)"],
                [<span key="6">Pojemnosc</span>, "3,3L (Rodzinna)", "2,2L (Mala)"],
                [<span key="7">Czyszczenie</span>, "Samoczyszczenie + Zmywarka", "Reczne mycie"],
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
            ZAMOW TERAZ - PLACISZ PRZY ODBIORZE
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
               KOMPLETNY ZESTAW
             </div>
             <div className="aspect-square w-full rounded-xl shadow-2xl border-4 border-white overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 bg-white">
                <img
                  src="/images/quickchef img/1.png"
                  alt="Zawartosc opakowania QuickChef"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="text-blue-600" size={32} /> Co znajdziesz w paczce:
            </h2>
            <ul className="space-y-4">
              {[
                <span key="1">Robot <strong>QuickChef 45 Funkcji</strong></span>,
                <span key="2">Misa <strong>Ceramiczna Nieprzywierajaca (3,3L)</strong></span>,
                <span key="3"><strong className="text-blue-700">Automatyczny Dozownik</strong> QuickSense™</span>,
                <span key="4">Akcesoria <strong>Lopatka Saute</strong> (do risotta/sosow)</span>,
                <span key="5">Parownik XL 2-poziomowy</span>,
                <span key="6">Zestaw do Krojenia: Ostrza, Motylek, Lyzka</span>,
                <span key="7"><strong className="text-green-700">BONUS:</strong> Aplikacja Premium z 1000+ Przepisami</span>,
                <span key="8"><strong className="text-gray-900">Gwarancja 2 Lata</strong></span>
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
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Wysylka</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Szybka 24/48h</p>
                  </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-gray-100">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-700 shrink-0">
                      <Banknote size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Platnosc</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Przy Odbiorze</p>
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
  { id: 1, name: "Marta", age: 57, location: "Warszawa", stars: 5, text: "Nigdy nie bylam dobra w kuchni... z tym wszystko mi wychodzi. Ekran mowi co robic, super wygodne.", imageUrl: "/images/quickchef img/recensione 1.jpg" },
  { id: 2, name: "Tomasz", age: 63, location: "Krakow", stars: 5, text: "Gotowanie stawalo sie meczace. Teraz wkladam wszystko i on robi. Mycie duzo latwiejsze.", imageUrl: "/images/quickchef img/recensione 2.jpg" },
  { id: 3, name: "Ewa", age: 41, location: "Gdansk", stars: 5, text: "Pracuje i nie mam czasu. To ratuje mi wieczory. Nawet ciasta i sosy wychodza idealnie.", imageUrl: "/images/quickchef img/recensione 3.jpg" },
  { id: 4, name: "Pawel", age: 52, location: "Wroclaw", stars: 5, text: "Wbudowana waga super, wreszcie nie mylę dawek... wczesniej polowa przepisow ladowala w koszu." },
  { id: 5, name: "Anna", age: 60, location: "Poznan", stars: 5, text: "Misa nie przywiera, to mnie przekonalo. Wczesniej musialem ciagle skrobac." },
  { id: 6, name: "Zofia", age: 35, location: "Lodz", stars: 5, text: "Aplikacja z przepisami bardzo przydatna... a funkcja 'co mam w lodowce' to geniusz, nie marnuje jedzenia." }
];

const Reviews: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          ⭐ Prawdziwe opinie klientow
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {review.imageUrl && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={review.imageUrl}
                    alt={`Recenzja od ${review.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}, {review.age} lat</h4>
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
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> Zweryfikowany Zakup
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
    sessionStorage.setItem('ec_value', '299'); // Price in PLN

    // Generate order code
    const orderCode = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('orderCode', orderCode);

    // Clear any previous conversion tracking
    sessionStorage.removeItem('conversionTracked');
    sessionStorage.removeItem('skipConversion');

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
      console.log('✅ Network API response (PL):', responseText);

      // Check for DOUBLE response - skip Google Ads conversion
      if (responseText.toUpperCase().includes('DOUBLE')) {
        sessionStorage.setItem('skipConversion', 'true');
        console.log('⚠️ DOUBLE detected - will skip Google Ads conversion');
      }
    } catch (error) {
      console.error('❌ Network API error (PL):', error);
    }

    // Redirect to thank you page
    router.push('/ty-pl');
  };

  if (isSubmitting) {
    return (
      <div id="order-form" className="py-12 px-4 bg-green-50 text-center rounded-xl border-4 border-green-500 max-w-2xl mx-auto my-8 scroll-mt-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-4">Przetwarzanie zamówienia...</h2>
      </div>
    );
  }

  // This block is no longer needed as we redirect, but keep for fallback
  const submitted = false;
  if (submitted) {
    return (
      <div id="order-form" className="py-12 px-4 bg-green-50 text-center rounded-xl border-4 border-green-500 max-w-2xl mx-auto my-8 scroll-mt-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <ShieldCheck size={48} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-green-800 mb-4">Dziekujemy za zamowienie!</h2>
        <p className="text-xl text-gray-700 mb-6">
          Nasz konsultant wkrotce zadzwoni pod numer <strong className="whitespace-nowrap">{formData.phone}</strong> aby potwierdzic wysylke.
        </p>
        <div className="bg-white p-4 rounded-lg border border-gray-200 inline-block text-left">
          <p className="font-bold text-gray-800 mb-1">Co sie teraz dzieje?</p>
          <ol className="list-decimal list-inside text-gray-600 space-y-1">
            <li>Twoje zamowienie zostalo zarejestrowane.</li>
            <li>Otrzymasz telefon potwierdzajacy (numer polski).</li>
            <li>Kurier dostarczy w 24/48h.</li>
            <li>Zaplacisz gotowka przy odbiorze.</li>
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
            Formularz Zamowienia
          </h2>
          <p className="font-medium opacity-90 relative z-10">Wypelnij aby otrzymac 50% znizki</p>
        </div>

        <div className="p-5 md:p-8">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-gray-500 line-through text-sm">Cena Katalogowa: 598 zł</p>
              <p className="text-red-600 font-bold text-2xl">Razem: 299 zł</p>
              <p className="text-green-600 font-semibold text-sm">Oszczędzasz 299 zł!</p>
            </div>
            <div className="text-right flex flex-col gap-2">
              <span className="bg-red-600 text-white text-sm font-black px-3 py-1 rounded-lg shadow">-50%</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">SZYBKA WYSYLKA</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Imie i Nazwisko *</label>
              <input
                type="text"
                name="firstName"
                required
                autoComplete="name"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Np: Jan Kowalski"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Telefon (Komorkowy) *</label>
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Np: 500 123 456"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <ShieldCheck size={12}/> Wazne dla potwierdzenia wysylki
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Pelny Adres (Ulica, Numer, Miasto, Kod) *</label>
              <textarea
                name="fullAddress"
                required
                autoComplete="street-address"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg h-32"
                placeholder="Np: ul. Kwiatowa 10, 00-001 Warszawa"
                value={formData.fullAddress}
                onChange={handleChange}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-4 cursor-pointer hover:bg-gray-100 transition-colors">
               <label className="flex items-start gap-3 cursor-pointer pointer-events-none">
                 <input type="radio" checked readOnly className="w-5 h-5 text-green-600 mt-1" />
                 <div>
                   <span className="block font-bold text-gray-800">Platnosc Przy Odbiorze (Gotowka)</span>
                   <span className="block text-xs text-gray-500">Placisz bezposrednio kurierowi po otrzymaniu paczki. Bez ryzyka.</span>
                 </div>
               </label>
            </div>

            <Button type="submit" fullWidth pulse variant="primary" className="mt-6 shadow-xl text-xl">
              POTWIERDZ ZAMOWIENIE
            </Button>

            <div className="flex justify-center items-center gap-4 text-xs text-gray-400 mt-4">
              <span className="flex items-center gap-1"><Lock size={12}/> SSL Secure 256-bit</span>
              <span className="flex items-center gap-1"><Truck size={12}/> Szybka Wysylka</span>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

// 13. Faq Component
const faqs: FaqItem[] = [
  { question: "Czy moge zaplacic przy odbiorze?", answer: "Tak, oczywiscie. Placisz gotowka bezposrednio kurierowi przy dostawie paczki. Bez zaliczki." },
  { question: "Ile trwa dostawa?", answer: "Wysylamy kurierem ekspresowym w 24/48 godzin roboczych na terenie calej Polski." },
  { question: "Czy trzeba umiec gotowac?", answer: "Nie! Robot prowadzi Cie krok po kroku przez ekran dotykowy i aplikacje. Jest stworzony dla osob, ktore nie maja czasu lub ochoty na gotowanie, ale chca jesc zdrowo." },
  { question: "Czy latwo sie czyści?", answer: "Tak, ma funkcje samoczyszczenia, a misa ma powloke ceramiczna nieprzywierajaca, ktora myje sie jednym ruchem gabki." },
  { question: "Co moge ugotowac?", answer: "Praktycznie wszystko: risotto, makaron, zupy-kremy, gotowanie na parze (ryby/warzywa), ciasta na pizze i chleb, desery, jogurt i wiele innych." },
  { question: "A jesli mi nie odpowiada?", answer: "Masz 2-letnia gwarancje. Dodatkowo oferujemy polska obsluge klienta na kazde pytanie lub problem." }
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
          Czesto Zadawane Pytania
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
          <span className="font-bold text-white">QuickChef®</span> to zastrzezony znak towarowy sprzedawany wylacznie przez{' '}
          <Link href="/" className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2">
            Ecomotiq
          </Link>
          {' '}- Twoj zaufany partner tech wholesale
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
          <a href="#" className="text-white hover:underline">Powrot na gore</a>
        </div>
        <div className="max-w-[1500px] mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">Nasza Firma</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/chi-siamo" className="hover:text-white">O Nas</Link></li>
                <li><Link href="/assistenza" className="hover:text-white">Kontakt</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Prawne</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/termini-e-condizioni" className="hover:text-white">Regulamin</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white">Polityka Prywatnosci</Link></li>
                <li><Link href="/cookie-policy" className="hover:text-white">Polityka Cookies</Link></li>
                <li><Link href="/politiche-spedizione" className="hover:text-white">Polityka Wysylki</Link></li>
                <li><Link href="/politiche-reso" className="hover:text-white">Polityka Zwrotow</Link></li>
                <li><Link href="/garanzia" className="hover:text-white">Gwarancja</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Platnosc</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/pagamento-alla-consegna" className="hover:text-white">Metody Platnosci</Link></li>
                <li><Link href="/pagamento-alla-consegna" className="hover:text-white font-bold text-blue-400">Platnosc Przy Odbiorze</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Pomoc</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/assistenza" className="hover:text-white">Gdzie Jest Moja Paczka</Link></li>
                <li><Link href="/politiche-spedizione" className="hover:text-white">Wysylka</Link></li>
                <li><Link href="/politiche-reso" className="hover:text-white">Zwroty i Wymiany</Link></li>
                <li><Link href="/assistenza" className="hover:text-white">Kontakt z Obsluga</Link></li>
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
            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Ecommise SAS - NIP FR 84 529 317 648</p>
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
            <span className="text-xs text-gray-400 line-through">598 zł</span>
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">-50%</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-red-600">299 zł</span>
          </div>
        </div>

        <div className="flex-grow">
          <Button onClick={scrollToForm} fullWidth size="md" className="shadow-none py-3 text-lg" icon={<ShoppingCart size={18} />}>
            ZAMOW -50%
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
        console.log('✅ Google Ads PageView tracked (PL - QuickChef)');
      };

      // Load fingerprint script for network tracking
      const fpScript = document.createElement('script');
      fpScript.src = 'https://offers.italiadrop.com/forms/tmfp/';
      fpScript.crossOrigin = 'anonymous';
      fpScript.defer = true;
      document.head.appendChild(fpScript);
      console.log('✅ Network fingerprint script loaded (PL)');
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

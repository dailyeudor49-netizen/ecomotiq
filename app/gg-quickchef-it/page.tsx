'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
import { validateForm } from '@/app/utils/formValidation';

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
            Chiudi
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
          <Truck size={14} /> SPEDIZIONE 24/48H
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1 text-yellow-300">
          <Banknote size={14} /> PAGA ALLA CONSEGNA
        </div>
        <div className="hidden sm:inline">|</div>
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} /> GARANZIA 2 ANNI
        </div>
        <div className="hidden md:inline">|</div>
        <div className="hidden md:flex items-center gap-1">
          <Phone size={14} /> ASSISTENZA ITALIANA
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
  <span key="1"><strong className="text-red-700">NOVITÀ ESCLUSIVA:</strong> Dosaggio Automatico ingredienti (fa tutto da solo)</span>,
  <span key="2"><strong className="text-gray-900">45 Funzioni in 1:</strong> il robot più completo sul mercato</span>,
  <span key="3">Touchscreen <strong className="text-gray-900">7" SoftScreen</strong> grande e chiaro → ti guida passo passo</span>,
  <span key="4">App con <strong className="text-gray-900">1000+ ricette</strong> → scegli e segui come un tutorial</span>,
  <span key="5">Funzione <strong className="text-gray-900">“Cosa ho in frigo?”</strong> → risparmi sulla spesa</span>,
  <span key="6"><strong className="text-gray-900">Bilancia integrata</strong> precisa al grammo → addio dosi “a occhio”</span>,
  <span key="7">Caraffa <strong className="text-gray-900">Ceramica Antiaderente</strong> → niente bruciato, si pulisce in un attimo</span>,
  <span key="8">Cottura fino a <strong className="text-gray-900">180°C</strong> + Soffritto vero</span>,
  <span key="9">Sistema <strong className="text-gray-900">OneClick</strong> → cambi accessori senza smontare nulla</span>,
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
          <span className="text-red-600 block mb-2 text-xl md:text-2xl uppercase tracking-wide">Sei stanco di perdere tempo in cucina?</span>
          Scopri il Primo Robot che <span className="bg-yellow-200 px-2">Aggiunge gli Ingredienti da Solo.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
          Dimentica pentole e stress. Metti tutto nel dispenser, scegli la ricetta sullo schermo e <strong className="text-gray-900">lui cucina per te mentre tu ti riposi.</strong>
          <br className="my-2"/>
          <strong className="text-green-700 bg-green-50 px-3 py-1 rounded inline-block mt-2 border border-green-200 shadow-sm">✅ Risultato perfetto (anche se non sai cucinare)</strong>
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
              🟡 Il robot che ti fa cucinare da Chef <br className="hidden sm:block"/>senza sporcare nulla
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
            Offerta Limitata
          </div>

          <div className="flex flex-col items-center justify-center mb-6 mt-6">
             <div className="bg-yellow-400 text-gray-900 font-black text-3xl md:text-4xl px-8 py-3 rounded-lg mb-4 shadow-md">
               -50%
             </div>
             <div className="flex items-center gap-3">
               <span className="text-gray-400 line-through text-2xl decoration-2">€299</span>
               <span className="text-5xl md:text-6xl font-black text-red-600 tracking-tighter">€149<span className="text-3xl">,90</span></span>
             </div>
             <p className="text-green-700 font-bold mt-2">Risparmi €149,10!</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100 text-left space-y-4">
             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0">
                 <Truck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Spedizione Veloce</p>
                 <p className="text-sm text-gray-500 mt-1">Consegna assicurata in 24/48 ore</p>
               </div>
             </div>

             <div className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
               <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 shrink-0">
                 <Banknote size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Paghi Solo alla Consegna</p>
                 <p className="text-sm text-gray-500 mt-1">Nessun anticipo, contanti al corriere</p>
               </div>
             </div>
             
             <div className="flex items-center gap-3">
               <div className="bg-blue-100 p-2 rounded-full text-blue-700 shrink-0">
                 <ShieldCheck size={24} strokeWidth={2} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 leading-none text-lg">Garanzia Italia 2 Anni</p>
                 <p className="text-sm text-gray-500 mt-1">Assistenza tecnica inclusa</p>
               </div>
             </div>
          </div>
          
          <Button onClick={scrollToForm} fullWidth pulse size="xl" subtext="🔒 Nessuna carta di credito richiesta">
            ORDINA ORA IN SCONTO
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
          4,8/5 basato su oltre 3.000 recensioni
        </h3>
        <p className="text-lg text-gray-600 italic mb-6">
          “Finalmente cucino bene senza impazzire.”
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ThumbsUp className="text-blue-600" />
            <span className="font-bold text-gray-700">Facile</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Clock className="text-green-600" />
            <span className="font-bold text-gray-700">Veloce</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <Zap className="text-yellow-500" />
            <span className="font-bold text-gray-700">Antiaderente</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
            <ChefHat className="text-red-500" />
            <span className="font-bold text-gray-700">Ricette Guidate</span>
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
            🔴 Se ti riconosci in queste situazioni… <br/>questo robot ti cambia la vita.
          </h2>
          
          <ul className="space-y-5 mb-8">
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Apri il frigo e <strong className="text-red-700">non sai mai cosa cucinare.</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Le ricette ti vengono <strong className="text-red-700">“così così”</strong> e ti passa la voglia.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800"><strong>Sporchi mille pentole</strong> e passi ore a pulire.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 p-1 rounded-full shrink-0 mt-1">
                <X className="text-red-600" size={22} strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-800">Finisci per <strong>ordinare cibo spazzatura</strong> e spendere troppo.</span>
            </li>
          </ul>

          <div className="text-center bg-white p-6 rounded-lg border border-gray-100 shadow-md">
            <p className="text-xl font-bold text-green-700 mb-6 leading-tight">
              ✅ Da oggi cucini in automatico piatti sani,<br/> anche <span className="underline decoration-green-500 decoration-4">senza esperienza.</span>
            </p>
            <Button onClick={scrollToForm} variant="primary" size="lg" className="mx-auto">
              SÌ, LO VOGLIO – PAGO ALLA CONSEGNA
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
          Come funziona?
        </h2>
        <p className="text-lg text-gray-600 mb-8">✅ È più facile di un microonde. <strong className="text-gray-900">Fa tutto da solo:</strong></p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">1</div>
            <h3 className="font-bold text-xl mb-2">Carica il Dispenser</h3>
            <p className="text-gray-600">Inserisci gli ingredienti nei <strong className="text-gray-900">6 scomparti</strong>. Non devi pesarli prima, ci pensa la bilancia.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">2</div>
            <h3 className="font-bold text-xl mb-2">Scegli la Ricetta</h3>
            <p className="text-gray-600">Seleziona dal <strong className="text-gray-900">Touchscreen 7"</strong> o dall'App tra 1000+ piatti guidati.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-12 h-12 bg-green-100 text-green-700 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">3</div>
            <h3 className="font-bold text-xl mb-2">Premi START e Vai Via</h3>
            <p className="text-gray-600">Lui dosa gli ingredienti <strong className="text-gray-900">al momento giusto</strong>, cucina e mescola. Ti avvisa quando è pronto!</p>
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-900 p-5 rounded-lg inline-block text-base md:text-lg shadow-sm">
          💡 <span className="font-bold">TECNOLOGIA QUICKSENSE™:</span> L'unico robot che aggiunge gli ingredienti da solo mentre cucina. <br/>
          <span className="text-sm text-blue-700">Non devi restare lì a guardarlo!</span>
        </div>
      </div>
    </section>
  );
};

// 8. FeaturesGrid Component
const features: FeatureBox[] = [
  {
    id: 1,
    title: "Non sbagli mai",
    description: "Segui lo schermo e il robot dosa tutto. Risultato garantito al 100%.",
    imageUrl: "/images/quickchef img/Non sbagli mai.png"
  },
  {
    id: 2,
    title: "Fa tutto da solo",
    description: "Grazie al DISPENSER automatico, non devi aggiungere ingredienti durante la cottura.",
    imageUrl: "/images/quickchef img/DISPENSER AUTOMATICO.png"
  },
  {
    id: 3,
    title: "Funzione Svota-Frigo",
    description: "Scrivi cosa hai in frigo nell'App e lui ti crea la ricetta perfetta. Zero sprechi.",
    imageUrl: "/images/quickchef img/Funzione Svota-Frigo.png"
  },
  {
    id: 4,
    title: "Ceramica Antiaderente",
    description: "Caraffa Unique rivestita in ceramica: non attacca mai e si pulisce con una passata.",
    imageUrl: "/images/quickchef img/Ceramica Antiaderente.png"
  },
  {
    id: 5,
    title: "45 Funzioni in 1",
    description: "Trita, impasta, cuoce a vapore, fermenta, slow cooking, yogurt... sostituisce 10 elettrodomestici.",
    imageUrl: "/images/quickchef img/45 Funzioni in 1.png"
  },
  {
    id: 6,
    title: "Risultati da Chef",
    description: "Creme vellutate, impasti per pizza perfetti, sughi densi. Tutto in automatico.",
    imageUrl: "/images/quickchef img/Risultati da Chef.png"
  }
];

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          ✅ Perché tutti lo stanno scegliendo:
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
          🔥 Confronto veloce (senza giri di parole)
        </h2>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="p-4 text-gray-600 font-bold text-sm md:text-base w-1/3 uppercase tracking-wider">Caratteristica</th>
                <th className="p-4 bg-green-50 text-green-800 font-extrabold text-center border-l border-r border-green-200 w-1/3 text-sm md:text-xl shadow-inner">
                  ✅ QuickChef
                </th>
                <th className="p-4 text-gray-400 font-medium text-center text-sm md:text-base w-1/3">
                  ❌ Altri Robot
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                [<span key="1">Dispenser Automatico <br/><span className="text-xs font-normal text-gray-500">(Aggiunge ingredienti da solo)</span></span>, true, "Assente (Devi farlo tu)"],
                [<span key="2">Funzioni Totali</span>, "45 (Il più completo)", "Circa 12-20"],
                [<span key="3">Touchscreen</span>, "7\" SoftScreen", "Piccolo o Assente"],
                [<span key="4">App + Svotafrigo</span>, "Sì (1000+ Ricette)", "Poche ricette"],
                [<span key="5">Materiale Caraffa</span>, "Ceramica Antiaderente", "Acciaio (Si attacca)"],
                [<span key="6">Capienza</span>, "3,3L (Famiglia)", "2,2L (Piccola)"],
                [<span key="7">Pulizia</span>, "Autopulizia + Lavastoviglie", "Noiosa a mano"],
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
            PRENDILO ORA – PAGHI ALLA CONSEGNA
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
                  alt="Contenuto della confezione QuickChef"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="text-blue-600" size={32} /> Cosa trovi nel pacco:
            </h2>
            <ul className="space-y-4">
              {[
                <span key="1">Robot <strong>QuickChef 45 Funzioni</strong></span>,
                <span key="2">Caraffa <strong>Ceramica Antiaderente (3,3L)</strong></span>,
                <span key="3"><strong className="text-blue-700">Dispenser Automatico</strong> QuickSense™</span>,
                <span key="4">Accessorio <strong>Pala Sauté</strong> (per risotti/sughi)</span>,
                <span key="5">Vaporiera XL a 2 livelli</span>,
                <span key="6">Kit Taglio: Lame, Farfalla, Cucchiaio</span>,
                <span key="7"><strong className="text-green-700">BONUS:</strong> App Premium con 1000+ Ricette</span>,
                <span key="8"><strong className="text-gray-900">Garanzia Italia 2 Anni</strong></span>
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
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Spedizione</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Veloce 24/48h</p>
                  </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-t sm:border-t-0 sm:border-l border-gray-100">
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-700 shrink-0">
                      <Banknote size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Pagamento</p>
                      <p className="font-bold text-gray-900 text-lg leading-none mt-1">Alla Consegna</p>
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
  { id: 1, name: "Marina", age: 57, location: "Torino", stars: 5, text: "Non sono mai stata brava in cucina… con questo mi viene tutto bene. Lo schermo ti dice cosa fare, comodissimo." },
  { id: 2, name: "Giuseppe", age: 63, location: "Bari", stars: 5, text: "Cucinare stava diventando pesante. Ora metto tutto e fa lui. Pulizia molto più semplice." },
  { id: 3, name: "Elena", age: 41, location: "Roma", stars: 5, text: "Io lavoro e non ho tempo. Questo mi salva la sera. Anche impasti e sughi vengono perfetti." },
  { id: 4, name: "Paolo", age: 52, location: "Milano", stars: 5, text: "Bilancia integrata top, finalmente non sbaglio più le dosi… prima buttavo metà ricette." },
  { id: 5, name: "Anna", age: 60, location: "Verona", stars: 5, text: "La caraffa non attacca, è quello che mi ha convinta. Prima dovevo grattare sempre." },
  { id: 6, name: "Sonia", age: 35, location: "Napoli", stars: 5, text: "App con ricette utilissima… e la cosa del ‘cosa ho in frigo’ è geniale, non spreco più." }
];

const Reviews: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          ⭐ Recensioni vere di clienti
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div key={review.id} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}, {review.age} anni</h4>
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
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Acquisto Verificato
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
  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    fullAddress: '', 
  });
  const [submitted, setSubmitted] = useState(false);
  const pageLoadTime = useRef(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm({
      name: formData.firstName,
      phone: formData.phone,
      address: formData.fullAddress,
      countryCode: 'IT',
      productKey: 'quickchef_it',
      pageLoadTime: pageLoadTime.current,
    });
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setSubmitted(true);
    const formElement = document.getElementById('order-form');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div id="order-form" className="py-12 px-4 bg-green-50 text-center rounded-xl border-4 border-green-500 max-w-2xl mx-auto my-8 scroll-mt-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <ShieldCheck size={48} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-green-800 mb-4">Grazie per il tuo ordine!</h2>
        <p className="text-xl text-gray-700 mb-6">
          Un nostro operatore ti chiamerà a breve al numero <strong className="whitespace-nowrap">{formData.phone}</strong> per confermare la spedizione.
        </p>
        <div className="bg-white p-4 rounded-lg border border-gray-200 inline-block text-left">
          <p className="font-bold text-gray-800 mb-1">Cosa succede ora?</p>
          <ol className="list-decimal list-inside text-gray-600 space-y-1">
            <li>Il tuo ordine è stato registrato.</li>
            <li>Riceverai una chiamata di conferma (prefisso italiano).</li>
            <li>Il corriere consegnerà in 24/48h.</li>
            <li>Pagherai in contanti alla consegna.</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <section id="order-form" className="py-12 px-4 bg-red-50 border-t-4 border-red-600 scroll-mt-20">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-red-600 p-6 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12"></div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 uppercase relative z-10">
            Modulo Ordine
          </h2>
          <p className="font-medium opacity-90 relative z-10">Compila per ricevere l'offerta 50% sconto</p>
        </div>

        <div className="p-5 md:p-8">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-gray-500 line-through text-sm">Prezzo Listino: €299,00</p>
              <p className="text-red-600 font-bold text-2xl">Totale: €149,90</p>
              <p className="text-green-600 font-semibold text-sm">Risparmi €149,10!</p>
            </div>
            <div className="text-right flex flex-col gap-2">
              <span className="bg-red-600 text-white text-sm font-black px-3 py-1 rounded-lg shadow">-50%</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">SPEDIZIONE VELOCE</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Nome e Cognome *</label>
              <input 
                type="text" 
                name="firstName" 
                required 
                autoComplete="name"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Es: Mario Rossi"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Telefono (Cellulare) *</label>
              <input 
                type="tel" 
                name="phone" 
                required 
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg"
                placeholder="Es: 333 1234567"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <ShieldCheck size={12}/> Importante per la conferma spedizione
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 text-sm uppercase tracking-wide">Indirizzo Completo (Via, Civico, Città, CAP) *</label>
              <textarea 
                name="fullAddress" 
                required 
                autoComplete="street-address"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 outline-none transition-colors text-lg h-32"
                placeholder="Es: Via Garibaldi 10, 00100 Roma"
                value={formData.fullAddress}
                onChange={handleChange}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-4 cursor-pointer hover:bg-gray-100 transition-colors">
               <label className="flex items-start gap-3 cursor-pointer pointer-events-none">
                 <input type="radio" checked readOnly className="w-5 h-5 text-green-600 mt-1" />
                 <div>
                   <span className="block font-bold text-gray-800">Pagamento alla Consegna (Contanti)</span>
                   <span className="block text-xs text-gray-500">Paghi direttamente al corriere quando arriva il pacco. Nessun rischio.</span>
                 </div>
               </label>
            </div>

            <Button type="submit" fullWidth pulse variant="primary" className="mt-6 shadow-xl text-xl">
              CONFERMA ORDINE
            </Button>
            
            <div className="flex justify-center items-center gap-4 text-xs text-gray-400 mt-4">
              <span className="flex items-center gap-1"><Lock size={12}/> SSL Secure 256-bit</span>
              <span className="flex items-center gap-1"><Truck size={12}/> Spedizione Veloce</span>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

// 13. Faq Component
const faqs: FaqItem[] = [
  { question: "Posso pagare alla consegna?", answer: "Sì, assolutamente. Paghi in contanti direttamente al corriere quando ti consegna il pacco. Nessun pagamento anticipato richiesto." },
  { question: "Quanto ci mette ad arrivare?", answer: "Spediamo con corriere espresso in 24/48 ore lavorative in tutta Italia." },
  { question: "Serve essere bravi in cucina?", answer: "No! Il robot ti guida passo dopo passo tramite il touchscreen e l'App. È pensato proprio per chi non ha tempo o voglia di cucinare ma vuole mangiare bene." },
  { question: "Si pulisce facilmente?", answer: "Sì, ha la funzione di autopulizia e la caraffa ha un rivestimento ceramico antiaderente che si lava con una passata di spugna." },
  { question: "Cosa posso cucinare?", answer: "Praticamente tutto: risotti, pasta, vellutate, cottura a vapore (pesce/verdure), impasti per pizza e pane, dolci, yogurt e molto altro." },
  { question: "Se non mi trovo bene?", answer: "Hai la garanzia di 2 anni. Inoltre, offriamo assistenza clienti italiana dedicata per qualsiasi dubbio o problema." }
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
          Domande Frequenti
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
          <span className="font-bold text-white">QuickChef®</span> è un marchio registrato venduto esclusivamente da{' '}
          <Link href="/" className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2">
            Ecomotiq
          </Link>
          {' '}- Il tuo partner tech wholesale di fiducia
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

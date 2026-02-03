"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Star,
  ShieldCheck,
  Truck,
  HandCoins,
  Flashlight,
  Wrench,
  Camera,
  Eye,
  Droplets,
  Wifi,
  Usb,
  PackageCheck,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type Review = {
  name: string;
  city: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
};

const BRAND = {
  name: "InspectaPRO 360™",
  series: "360 Control Series",
  slogan: "Vedi dove gli altri indovinano.",
};

const OFFER = {
  listPrice: "129,99€",
  salePrice: "64,99€",
  discountLabel: "-50%",
  shipping: "Spedizione 24/48h",
  payment: "Pagamento alla Consegna",
  warranty: "Garanzia 2 anni",
  guarantee: "30 giorni soddisfatto o rimborsato",
};

const HERO = {
  headline: "Guarda DENTRO tubi e motori... in 30 secondi (senza smontare nulla).",
  subheadline:
    "Lo strumento boomer-proof che ti fa vedere subito il problema, recuperare oggetti e risparmiare una chiamata costosa. Paghi solo alla consegna.",
  socialProof: { rating: 4.8, count: 1247, badge: "Best Seller 2025" },
  bullets: [
    "Schermo grande HD: vedi chiaro anche senza occhiali",
    "Snodo controllato fino a 210°: guidi la punta nei punti impossibili",
    "Doppia visuale (frontale/laterale): vedi 'dietro l'angolo'",
    "LED PRO regolabili: buio totale? si vede lo stesso",
    "Sonda IP67: perfetta per tubi, scarichi, ambienti difficili",
    "Cavo semirigido lungo: arrivi in profondità senza incastrarti",
    "Foto/Video + memoria: salvi e confronti 'prima/dopo'",
    "Recovery Kit PRO: magnete + gancio + specchio + mini-artiglio",
    "Schermo + Wi-Fi opzionale: quando vuoi lo vedi anche sul telefono",
    "Valigetta rigida ordinata: tutto al suo posto, zero caos",
  ],
};

const VISUAL_SECTIONS = [
  {
    title: "Vedi dove non puoi arrivare",
    body:
      "Inquadri dentro tubi, motori, controsoffitti. Niente smontaggi inutili: trovi il punto esatto e agisci.",
    icon: Eye,
  },
  {
    title: "Controllo guidato: lo snodo fa il lavoro sporco",
    body:
      "La punta si orienta: tu decidi la direzione. Addio endoscopi che 'vanno a caso'.",
    icon: Wrench,
  },
  {
    title: "Doppia visuale: frontale + laterale",
    body:
      "Quando serve, cambi camera e vedi anche i dettagli nascosti dietro curve e ostacoli.",
    icon: Camera,
  },
  {
    title: "Buio totale? LED PRO regolabili",
    body:
      "Illuminazione potente e modulabile: vedi dettagli, crepe, perdite, oggetti piccoli.",
    icon: Flashlight,
  },
  {
    title: "Pronto subito (boomer-proof)",
    body:
      "Accendi, inserisci, guarda. 3 step semplici, senza essere esperto.",
    icon: CheckCircle2,
  },
  {
    title: "Recupero oggetti: non guardi soltanto... riprendi",
    body:
      "Con magnete/gancio/specchio e mini-artiglio, recuperi viti, chiavi, piccoli oggetti.",
    icon: PackageCheck,
  },
  {
    title: "Documenta e risparmia tempo",
    body:
      "Salvi foto e video per mostrare il problema o confrontare la situazione dopo l'intervento.",
    icon: Usb,
  },
  {
    title: "Strumento serio, non un giocattolo",
    body:
      "Sonda resistente, valigetta rigida, accessori completi. Lo usi oggi, lo tieni per anni.",
    icon: ShieldCheck,
  },
];

const OBJECTIONS = [
  { q: "Non sono capace.", a: "È fatto per chi non è tecnologico: 3 step, fine." },
  { q: "Non si vedrà bene.", a: "Schermo HD + LED regolabili: vedi anche al buio." },
  { q: "Si blocca nel tubo.", a: "Cavo semirigido + controllo punta: entri e ti muovi meglio." },
  { q: "È fragile.", a: "Valigetta rigida + sonda IP: è pensato per lavori veri." },
  { q: "Io non lo userò mai.", a: "Basta una sola ispezione evitata e ti ripaga." },
  { q: "Serve l'app?", a: "No: schermo integrato. Wi-Fi solo se vuoi." },
  { q: "E se non mi piace?", a: "30 giorni soddisfatto o rimborsato." },
  { q: "Pagare online non mi va.", a: "Paghi alla consegna: zero carte, zero ansia." },
  { q: "Arriva tardi?", a: "Spedizione rapida 24/48h (quando disponibile)." },
  { q: "È uguale agli altri.", a: "No: snodo controllato + doppia visuale + kit recovery PRO." },
];

const REVIEWS: Review[] = [
  {
    name: "Giovanni R.",
    city: "Roma",
    rating: 5,
    title: "Mi ha evitato una chiamata",
    body:
      "L'ho usato per controllare uno scarico e ho visto subito dov'era il problema. Arrivato velocissimo e il fatto che paghi alla consegna è comodissimo.",
    verified: true,
  },
  {
    name: "Salvatore P.",
    city: "Firenze",
    rating: 5,
    title: "Immagine chiara anche al buio",
    body:
      "Pensavo fosse complicato, invece accendi e guardi. I LED fanno la differenza. Ho salvato le foto e ho risolto senza smontare mezzo lavandino.",
    verified: true,
  },
  {
    name: "Mauro L.",
    city: "Milano",
    rating: 4,
    title: "Perfetto per l'auto",
    body:
      "L'ho preso per il vano motore e per recuperare una vite caduta. Con magnete e gancio è una bomba. Prodotto serio.",
    verified: true,
  },
  {
    name: "Elena S.",
    city: "Bologna",
    rating: 5,
    title: "Finalmente recupero oggetti",
    body:
      "Ho recuperato un piccolo oggetto caduto dietro un mobile senza smontare nulla. Sembra una cosa da officina ma lo uso anche io.",
    verified: true,
  },
];

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full;
        const isHalf = i === full && half;
        return (
          <Star
            key={i}
            className={classNames(
              "h-4 w-4",
              filled || isHalf ? "text-yellow-500" : "text-gray-300"
            )}
            fill={filled || isHalf ? "currentColor" : "none"}
          />
        );
      })}
    </div>
  );
}

function SectionTitle({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="mb-4">
      {kicker ? (
        <div className="text-xs font-bold uppercase tracking-wider text-red-600">
          {kicker}
        </div>
      ) : null}
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
        {title}
      </h2>
    </div>
  );
}

function BadgeRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <div className="flex items-center gap-2 rounded-xl border p-3 bg-white">
        <HandCoins className="h-5 w-5 text-green-700" />
        <div className="text-sm font-semibold">{OFFER.payment}</div>
      </div>
      <div className="flex items-center gap-2 rounded-xl border p-3 bg-white">
        <Truck className="h-5 w-5 text-green-700" />
        <div className="text-sm font-semibold">{OFFER.shipping}</div>
      </div>
      <div className="flex items-center gap-2 rounded-xl border p-3 bg-white">
        <ShieldCheck className="h-5 w-5 text-green-700" />
        <div className="text-sm font-semibold">{OFFER.warranty}</div>
      </div>
    </div>
  );
}

function ImageSlider({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const current = images[idx];

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border bg-gray-50">
        <img
          src={current}
          alt="Immagine prodotto"
          className="w-full aspect-square object-cover"
        />
        <button
          onClick={() => setIdx((v) => (v - 1 + images.length) % images.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border px-3 py-2 text-sm font-bold"
          aria-label="prev"
        >
          &lt;
        </button>
        <button
          onClick={() => setIdx((v) => (v + 1) % images.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border px-3 py-2 text-sm font-bold"
          aria-label="next"
        >
          &gt;
        </button>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIdx(i)}
            className={classNames(
              "h-16 w-16 rounded-xl border overflow-hidden shrink-0",
              i === idx ? "ring-2 ring-green-600" : ""
            )}
            aria-label={`thumb-${i}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function PriceBox({ onOrder }: { onOrder: () => void }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-bold text-gray-700">OFFERTA LIMITATA</div>
        <div className="rounded-full bg-red-600 text-white text-xs font-extrabold px-3 py-1">
          {OFFER.discountLabel}
        </div>
      </div>

      <div className="mt-3 flex items-end gap-3">
        <div className="text-4xl font-extrabold text-gray-900">{OFFER.salePrice}</div>
        <div className="text-lg font-bold text-gray-400 line-through">{OFFER.listPrice}</div>
      </div>

      <div className="mt-3 text-sm text-gray-700">
        <span className="font-bold text-gray-900">ERRORE DI PREZZO:</span>{" "}
        strumenti simili da officina costano molto di più - qui prendi il kit completo.
      </div>

      <button
        onClick={onOrder}
        className="mt-4 w-full rounded-2xl bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-extrabold shadow"
      >
        ORDINA ORA (PAGHI ALLA CONSEGNA)
      </button>

      <div className="mt-3 text-xs text-gray-600">
        {OFFER.guarantee} - Assistenza rapida - Nessuna carta richiesta
      </div>
    </div>
  );
}

function FeaturesGrid() {
  const items = [
    { title: "Snodo guidato fino a 210°", desc: "Tu decidi la direzione.", icon: Wrench },
    { title: "Doppia visuale", desc: "Frontale + laterale.", icon: Camera },
    { title: "LED PRO regolabili", desc: "Vedi anche al buio.", icon: Flashlight },
    { title: "Sonda IP67", desc: "Per tubi e ambienti difficili.", icon: Droplets },
    { title: "Wi-Fi opzionale", desc: "Schermo + telefono quando vuoi.", icon: Wifi },
    { title: "Foto/Video", desc: "Documenti e confronti.", icon: Usb },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {items.map((it) => (
        <div key={it.title} className="rounded-2xl border bg-white p-3">
          <div className="flex items-center gap-2">
            <it.icon className="h-5 w-5 text-green-700" />
            <div className="font-extrabold text-gray-900">{it.title}</div>
          </div>
          <div className="mt-1 text-sm text-gray-700">{it.desc}</div>

          <img
            src={`https://picsum.photos/seed/${encodeURIComponent(it.title)}/600/600`}
            alt=""
            className="mt-3 w-full aspect-square object-cover rounded-xl border"
          />
        </div>
      ))}
    </div>
  );
}

function ProblemAgitation() {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <SectionTitle kicker="IL PROBLEMA" title="Stanco di andare a tentativi (e spendere soldi)?" />
      <div className="space-y-3 text-gray-800 text-lg leading-relaxed">
        <p>
          Scarico lento? Odori strani? Rumori nel motore? Oggetti caduti dove la mano non entra?
        </p>
        <p className="font-bold">
          Il punto è uno: se non VEDI, indovini. E quando indovini... paghi due volte.
        </p>
        <p>
          Non è colpa tua: ti manca lo strumento giusto. Ed è proprio per questo che{" "}
          <span className="font-extrabold">{BRAND.name}</span> vende così tanto.
        </p>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "1) Accendi",
      body: "Premi il tasto. Schermo pronto.",
      img: "https://picsum.photos/seed/step1/800/800",
    },
    {
      title: "2) Inserisci",
      body: "Infili la sonda dove serve. Guida la punta.",
      img: "https://picsum.photos/seed/step2/800/800",
    },
    {
      title: "3) Guarda e risolvi",
      body: "Vedi il problema, recuperi oggetti, fai la scelta giusta.",
      img: "https://picsum.photos/seed/step3/800/800",
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-5">
      <SectionTitle kicker="COME FUNZIONA" title="3 step a prova di bambino" />
      <div className="grid md:grid-cols-3 gap-3">
        {steps.map((s) => (
          <div key={s.title} className="rounded-2xl border bg-gray-50 p-3">
            <div className="text-lg font-extrabold text-gray-900">{s.title}</div>
            <div className="mt-1 text-sm text-gray-700">{s.body}</div>
            <img src={s.img} alt="" className="mt-3 w-full aspect-square object-cover rounded-xl border" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CompareTable() {
  const rows = [
    { label: "Vedi senza smontare", us: true, them: true },
    { label: "Snodo guidato (fino a 210°)", us: true, them: false },
    { label: "Doppia visuale", us: true, them: false },
    { label: "Recovery Kit PRO completo", us: true, them: false },
    { label: "Schermo integrato boomer-proof", us: true, them: true },
    { label: "Wi-Fi opzionale", us: true, them: false },
    { label: "Paghi alla consegna", us: true, them: false },
  ];

  return (
    <div className="rounded-2xl border bg-white p-5">
      <SectionTitle kicker="CONFRONTO" title="Noi vs Loro (qui capisci l'errore di prezzo)" />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th className="p-3 border-b text-sm font-extrabold text-gray-900">Caratteristica</th>
              <th className="p-3 border-b text-sm font-extrabold text-green-700">InspectaPRO 360</th>
              <th className="p-3 border-b text-sm font-extrabold text-gray-500">Endoscopio base</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="align-top">
                <td className="p-3 border-b text-sm text-gray-800">{r.label}</td>
                <td className="p-3 border-b">
                  {r.us ? <CheckCircle2 className="h-5 w-5 text-green-700" /> : <XCircle className="h-5 w-5 text-red-600" />}
                </td>
                <td className="p-3 border-b">
                  {r.them ? <CheckCircle2 className="h-5 w-5 text-green-700" /> : <XCircle className="h-5 w-5 text-red-600" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-sm text-gray-800">
        Gli strumenti veramente pro costano anche 5-10 volte tanto. Qui prendi il kit completo con un prezzo da promo.
      </div>
    </div>
  );
}

function BundleSection() {
  const items = [
    { name: "InspectaPRO 360™ (unità principale + sonda)", value: "Valore 99€" },
    { name: "Recovery Kit PRO (magnete + gancio + specchio + mini-artiglio)", value: "Valore 29€" },
    { name: "Guaina stiffener + set cappucci protezione lente", value: "Valore 19€" },
    { name: "Valigetta rigida organizzata", value: "Valore 19€" },
    { name: "BONUS digitale: checklist + mini-video 10 ispezioni", value: "Valore 15€" },
  ];

  return (
    <div className="rounded-2xl border bg-white p-5">
      <SectionTitle kicker="IL BUNDLE" title="Oggi ti porti a casa PIÙ valore di quanto paghi" />
      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-2xl border bg-gray-50 p-4">
          <div className="text-lg font-extrabold text-gray-900">Dentro al pacco trovi:</div>
          <ul className="mt-3 space-y-2">
            {items.map((it) => (
              <li key={it.name} className="flex items-start justify-between gap-3 rounded-xl bg-white border p-3">
                <div className="text-sm font-semibold text-gray-800">{it.name}</div>
                <div className="text-sm font-extrabold text-red-600">{it.value}</div>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-sm text-gray-800 font-bold">
            Totale valore percepito: <span className="text-red-600">181€+</span> - oggi paghi <span className="text-green-700">{OFFER.salePrice}</span>.
          </div>
        </div>

        <div className="rounded-2xl border bg-gray-50 p-4">
          <div className="text-lg font-extrabold text-gray-900">Perché conviene ADESSO</div>
          <div className="mt-2 text-sm text-gray-800">
            Questa promo nasce per svuotare un lotto. Quando finisce, il prezzo torna su.
          </div>

          <img
            src="https://picsum.photos/seed/bundle/900/900"
            alt=""
            className="mt-4 w-full aspect-square object-cover rounded-2xl border"
          />

          <div className="mt-4 grid gap-2">
            <div className="flex items-center gap-2 rounded-xl border bg-white p-3">
              <Clock className="h-5 w-5 text-red-600" />
              <div className="text-sm font-bold text-gray-900">Offerta a tempo + scorte limitate</div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border bg-white p-3">
              <HandCoins className="h-5 w-5 text-green-700" />
              <div className="text-sm font-bold text-gray-900">Paghi dopo: alla consegna</div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border bg-white p-3">
              <ShieldCheck className="h-5 w-5 text-green-700" />
              <div className="text-sm font-bold text-gray-900">{OFFER.guarantee}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewsSection() {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <SectionTitle kicker="RECENSIONI" title="Chi lo prova capisce subito perché è da officina" />
      <div className="grid md:grid-cols-2 gap-3">
        {REVIEWS.map((r) => (
          <div key={r.name + r.title} className="rounded-2xl border bg-gray-50 p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-sm font-extrabold text-gray-900">{r.name}</div>
                <div className="text-xs text-gray-600">{r.city}</div>
              </div>
              <div className="text-right">
                <Stars rating={r.rating} />
                {r.verified ? (
                  <div className="text-xs font-bold text-green-700">Acquisto verificato</div>
                ) : null}
              </div>
            </div>
            <div className="mt-3 text-sm font-extrabold text-gray-900">{r.title}</div>
            <div className="mt-1 text-sm text-gray-800 leading-relaxed">{r.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <SectionTitle kicker="DUBBI?" title="Risposte secche (come piacciono a noi)" />
      <div className="grid md:grid-cols-2 gap-3">
        {OBJECTIONS.map((x) => (
          <div key={x.q} className="rounded-2xl border bg-gray-50 p-4">
            <div className="text-sm font-extrabold text-gray-900">&quot;{x.q}&quot;</div>
            <div className="mt-1 text-sm text-gray-800">{x.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderForm({ minutes = 15 }: { minutes?: number }) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="rounded-2xl border bg-white p-5">
      <SectionTitle kicker="ORDINA ORA" title="Compila 3 campi. Ti richiamiamo per confermare." />

      <div className="mb-3 rounded-2xl border bg-red-50 p-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-red-600" />
          <div className="font-extrabold text-red-700">Promo bloccata per: {mm}:{ss}</div>
        </div>
        <div className="mt-1 text-sm text-red-700">
          Se scade, il prezzo può tornare su (lotti promo limitati).
        </div>
      </div>

      <div className="grid gap-3">
        <input
          className="w-full rounded-2xl border p-4 text-lg"
          placeholder="Nome e Cognome"
        />
        <input
          className="w-full rounded-2xl border p-4 text-lg"
          placeholder="Telefono (meglio cellulare)"
        />
        <textarea
          className="w-full rounded-2xl border p-4 text-lg min-h-[120px]"
          placeholder="Indirizzo completo (via, numero civico, città, CAP, eventuali note)"
        />

        <button className="w-full rounded-2xl bg-green-600 hover:bg-green-700 text-white py-4 text-xl font-extrabold shadow">
          COMPLETA L&apos;ORDINE (PAGHI ALLA CONSEGNA)
        </button>

        <div className="text-xs text-gray-600">
          Nessuna carta richiesta - {OFFER.shipping} - {OFFER.warranty} - {OFFER.guarantee}
        </div>
      </div>
    </div>
  );
}

function StickyBar({ onOrder }: { onOrder: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-4xl px-3 py-2 flex items-center justify-between gap-2">
        <div>
          <div className="text-xs font-bold text-gray-700">Oggi</div>
          <div className="text-lg font-extrabold text-gray-900">
            {OFFER.salePrice}{" "}
            <span className="text-sm font-bold text-gray-400 line-through">{OFFER.listPrice}</span>
          </div>
        </div>
        <button
          onClick={onOrder}
          className="rounded-2xl bg-green-600 hover:bg-green-700 text-white px-5 py-3 text-base font-extrabold shadow"
        >
          ORDINA
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  const orderRef = useRef<HTMLDivElement | null>(null);

  const heroImages = useMemo(
    () => [
      "https://picsum.photos/seed/inspecta-hero-1/900/900",
      "https://picsum.photos/seed/inspecta-hero-2/900/900",
      "https://picsum.photos/seed/inspecta-hero-3/900/900",
      "https://picsum.photos/seed/inspecta-hero-4/900/900",
    ],
    []
  );

  const goToOrder = () => orderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="bg-white text-gray-900 pb-24">
      {/* TOP BAR */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl border bg-gray-50 grid place-items-center font-extrabold">
              IP
            </div>
            <div>
              <div className="text-sm font-extrabold">{BRAND.name}</div>
              <div className="text-xs text-gray-600">{BRAND.series} - {BRAND.slogan}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              <Stars rating={HERO.socialProof.rating} />
              <div className="text-sm font-extrabold">{HERO.socialProof.rating.toFixed(1)}/5</div>
            </div>
            <div className="text-xs text-gray-600">
              {HERO.socialProof.count.toLocaleString("it-IT")} recensioni -{" "}
              <span className="font-bold text-red-600">{HERO.socialProof.badge}</span>
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-4xl px-4 py-6">
        <div className="rounded-2xl border bg-gray-50 p-4 md:p-6">
          <div className="grid md:grid-cols-2 gap-5 items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-600 text-white px-3 py-1 text-xs font-extrabold">
                OFFERTA LIMITATA {OFFER.discountLabel}
              </div>

              <h1 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
                {HERO.headline}
              </h1>
              <p className="mt-3 text-lg text-gray-800 leading-relaxed">{HERO.subheadline}</p>

              <div className="mt-4">
                <BadgeRow />
              </div>

              <ul className="mt-4 space-y-2">
                {HERO.bullets.slice(0, 6).map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-gray-800">
                    <CheckCircle2 className="h-5 w-5 text-green-700 shrink-0 mt-0.5" />
                    <span className="font-semibold">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <PriceBox onOrder={goToOrder} />
              </div>
            </div>

            <div>
              <ImageSlider images={heroImages} />
              <div className="mt-3 rounded-2xl border bg-white p-4">
                <div className="text-sm font-extrabold text-gray-900">Incluso: Recovery Kit PRO + Valigetta rigida</div>
                <div className="mt-1 text-xs text-gray-600">
                  Magnete - gancio - specchio - mini-artiglio - guaina stiffener - bonus digitale
                </div>
              </div>

              <div className="mt-3 rounded-2xl border bg-white p-4">
                <div className="flex items-center gap-2">
                  <HandCoins className="h-5 w-5 text-green-700" />
                  <div className="text-sm font-extrabold text-gray-900">Paghi dopo</div>
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  Compili il modulo, ti richiamiamo per confermare, ricevi e paghi al corriere.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO / FEATURES */}
      <section className="mx-auto max-w-4xl px-4 py-6">
        <SectionTitle kicker="DEMO" title="Le caratteristiche che ti fanno dire: Ok, lo voglio." />
        <FeaturesGrid />
      </section>

      {/* PROBLEM / AGITATION */}
      <section className="mx-auto max-w-4xl px-4 py-6">
        <ProblemAgitation />
      </section>

      {/* SOLUTION + HOW IT WORKS */}
      <section className="mx-auto max-w-4xl px-4 py-6 space-y-4">
        <div className="rounded-2xl border bg-white p-5">
          <SectionTitle kicker="LA SOLUZIONE" title="InspectaPRO 360™: la bacchetta magica senza sforzo" />
          <ul className="mt-3 space-y-2">
            {HERO.bullets.map((b) => (
              <li key={b} className="flex gap-2 text-sm text-gray-800">
                <CheckCircle2 className="h-5 w-5 text-green-700 shrink-0 mt-0.5" />
                <span className="font-semibold">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <HowItWorks />
      </section>

      {/* VISUAL SECTIONS */}
      <section className="mx-auto max-w-4xl px-4 py-6">
        <SectionTitle kicker="PERCHÉ FUNZIONA" title="8 motivi semplici (che convincono anche i più scettici)" />
        <div className="grid md:grid-cols-2 gap-3">
          {VISUAL_SECTIONS.map((s) => (
            <div key={s.title} className="rounded-2xl border bg-gray-50 p-4">
              <div className="flex items-center gap-2">
                <s.icon className="h-5 w-5 text-green-700" />
                <div className="text-lg font-extrabold text-gray-900">{s.title}</div>
              </div>
              <div className="mt-2 text-sm text-gray-800 leading-relaxed">{s.body}</div>
              <img
                src={`https://picsum.photos/seed/${encodeURIComponent(s.title)}/800/800`}
                alt=""
                className="mt-3 w-full aspect-square object-cover rounded-2xl border"
              />
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="mx-auto max-w-4xl px-4 py-6">
        <CompareTable />
      </section>

      {/* BUNDLE */}
      <section className="mx-auto max-w-4xl px-4 py-6">
        <BundleSection />
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-4xl px-4 py-6">
        <ReviewsSection />
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-6">
        <FAQ />
      </section>

      {/* ORDER FORM */}
      <section ref={orderRef} className="mx-auto max-w-4xl px-4 py-6">
        <OrderForm minutes={15} />
      </section>

      <StickyBar onOrder={goToOrder} />
    </main>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero - Bold indigo gradient style */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full text-indigo-300 text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                Barcelona-Based Tech Distributor
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Tech That <span className="text-indigo-300">Moves</span> Your Business
              </h1>
              <p className="text-xl text-indigo-100/80 mb-10 leading-relaxed">
                From Barcelona to all of Europe. Premium electronics at wholesale prices, delivered fast and reliably to your door.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products" className="px-8 py-4 bg-white text-indigo-900 font-semibold rounded-xl hover:bg-indigo-50 transition shadow-xl">
                  Explore Products
                </Link>
                <Link href="/contact" className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition border border-indigo-500">
                  Request Quote
                </Link>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { num: "2,900+", label: "Products" },
                { num: "420+", label: "Partners" },
                { num: "6+", label: "Years" },
                { num: "72h", label: "EU Delivery" },
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10 text-center">
                  <div className="text-3xl font-bold text-white">{stat.num}</div>
                  <div className="text-indigo-200 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Stats */}
      <section className="lg:hidden py-8 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-4 gap-4 text-center">
          {[{ num: "2,900+", label: "Products" }, { num: "420+", label: "Partners" }, { num: "6+", label: "Years" }, { num: "72h", label: "Delivery" }].map((stat, i) => (
            <div key={i}><div className="text-lg font-bold text-white">{stat.num}</div><div className="text-indigo-200 text-xs">{stat.label}</div></div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Catalogue</h2>
            <p className="text-gray-500 max-w-xl mx-auto">2,900+ carefully selected products from leading manufacturers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {[
              { icon: "🔊", name: "Audio", count: "450+" },
              { icon: "⚡", name: "Power", count: "380+" },
              { icon: "⌚", name: "Wearables", count: "320+" },
              { icon: "📱", name: "Mobile", count: "580+" },
              { icon: "💻", name: "Computer", count: "420+" },
              { icon: "🏠", name: "Smart Home", count: "350+" },
            ].map((cat, i) => (
              <Link key={i} href={`/products#${cat.name.toLowerCase()}`} className="group p-6 bg-gray-50 rounded-2xl hover:bg-indigo-50 hover:shadow-lg transition-all text-center border border-transparent hover:border-indigo-200">
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700">{cat.name}</h3>
                <p className="text-gray-400 text-sm">{cat.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Ecomotiq?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Built for retailers who value reliability and quality</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Strategic Location", desc: "Barcelona port gives us access to fast shipping routes across Europe and Mediterranean." },
              { title: "Quality Assured", desc: "Every product batch inspected. We only ship what we would sell ourselves." },
              { title: "Flexible Terms", desc: "Pay on delivery, NET-30 for established accounts, volume discounts available." },
              { title: "Personal Service", desc: "Spanish and English support team. Real humans, not chatbots." },
            ].map((f, i) => (
              <div key={i} className="p-6 bg-slate-800 rounded-2xl">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-5">
                  <span className="text-xl font-bold">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start?</h2>
          <p className="text-indigo-100 text-lg mb-10">Join 420+ partners across Europe. No minimum order for new accounts.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-10 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition shadow-lg">
              Get a Quote
            </Link>
            <a href="mailto:info@ecomotiq.com" className="px-10 py-4 bg-indigo-700 text-white font-semibold rounded-xl hover:bg-indigo-800 transition">
              info@ecomotiq.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

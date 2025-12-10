import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = { title: "About", description: "About Ecomotiq - Spanish wholesale electronics distributor." };

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Ecomotiq</h1>
          <p className="text-gray-600">Barcelona-based tech distributor since 2018</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Founded in Barcelona in 2018, Ecomotiq was born from a simple idea: European retailers deserve better access to quality electronics at fair prices.</p>
                <p>Our strategic location near Barcelona&apos;s port gives us excellent logistics capabilities, allowing us to serve over 420 partners across Europe efficiently.</p>
                <p>We&apos;ve built our reputation on reliability, quality products, and genuine customer service - in Spanish, English, and beyond.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[{ num: "6+", label: "Years" }, { num: "2,900+", label: "Products" }, { num: "420+", label: "Partners" }, { num: "12", label: "Countries" }].map((stat, i) => (
                <div key={i} className="p-8 bg-indigo-50 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-indigo-600">{stat.num}</div>
                  <div className="text-gray-600 text-sm mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-indigo-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Partner With Us</h2>
          <p className="text-indigo-100 mb-8">Join our network of successful European retailers</p>
          <Link href="/contact" className="inline-block px-10 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition">Get Started</Link>
        </div>
      </section>
    </div>
  );
}

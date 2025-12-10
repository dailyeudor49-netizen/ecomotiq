import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Products", description: "Ecomotiq wholesale electronics catalogue - 2,900+ products." };

export default function ProductsPage() {
  const categories = [
    { id: "audio", name: "Audio", items: ["Bluetooth Speakers", "Earbuds", "Headphones", "Soundbars", "Portable Audio", "Studio Mics"] },
    { id: "power", name: "Power", items: ["Power Banks", "Wireless Chargers", "Wall Chargers", "Car Chargers", "Cables", "Solar Chargers"] },
    { id: "wearables", name: "Wearables", items: ["Smartwatches", "Fitness Bands", "Kids Watches", "GPS Trackers", "Health Monitors", "Sports Watches"] },
    { id: "mobile", name: "Mobile", items: ["Cases", "Screen Protectors", "Stands", "Mounts", "Grips", "Lenses"] },
    { id: "computer", name: "Computer", items: ["Mice", "Keyboards", "Webcams", "Hubs", "Stands", "Storage"] },
    { id: "smarthome", name: "Smart Home", items: ["Smart Plugs", "LED Strips", "Cameras", "Sensors", "Speakers", "Controls"] },
  ];

  return (
    <div className="bg-white">
      <section className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Catalogue</h1>
          <p className="text-gray-600 max-w-xl mx-auto">2,900+ products ready for wholesale. Volume pricing available.</p>
        </div>
      </section>
      <section className="sticky top-16 z-30 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="px-4 py-2 text-sm font-medium bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 whitespace-nowrap transition">{c.name}</a>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-20">
          {categories.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b">{cat.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {cat.items.map((item, i) => (
                  <div key={i} className="p-5 bg-gray-50 rounded-xl hover:bg-indigo-50 transition text-center">
                    <p className="text-sm font-medium text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-indigo-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need Custom Pricing?</h2>
          <p className="text-indigo-100 mb-8">Contact us for volume discounts and partnership terms.</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}

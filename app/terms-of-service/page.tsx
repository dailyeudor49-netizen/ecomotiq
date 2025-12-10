import { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service" };
export default function TermsPage() {
  return (
    <div className="bg-white"><section className="bg-indigo-50 py-12"><div className="max-w-7xl mx-auto px-4"><h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1><p className="text-gray-600 mt-2">Last updated: January 2025</p></div></section>
    <section className="py-14"><div className="max-w-4xl mx-auto px-4 prose prose-gray">
      <h2 className="text-xl font-bold mb-3">1. Agreement</h2><p className="text-gray-600 mb-6">By using Ecomotiq services, you accept these terms.</p>
      <h2 className="text-xl font-bold mb-3">2. Products</h2><p className="text-gray-600 mb-6">Subject to availability. Prices may change.</p>
      <h2 className="text-xl font-bold mb-3">3. Delivery</h2><p className="text-gray-600 mb-6">72h EU delivery. Times are estimates.</p>
      <h2 className="text-xl font-bold mb-3">4. Returns</h2><p className="text-gray-600 mb-6">Defective items within 14 days. Original packaging required.</p>
      <h2 className="text-xl font-bold mb-3">5. Governing Law</h2><p className="text-gray-600 mb-6">Spanish law applies. Barcelona courts.</p>
      <h2 className="text-xl font-bold mb-3">6. Contact</h2><p className="text-gray-600">Ecomotiq S.L.<br/>91 Digital Hub, 08003 Barcelona<br/>CIF: ES B67284159<br/>info@ecomotiq.com</p>
    </div></section></div>
  );
}

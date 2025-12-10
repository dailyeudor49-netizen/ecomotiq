import { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white"><section className="bg-indigo-50 py-12"><div className="max-w-7xl mx-auto px-4"><h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1><p className="text-gray-600 mt-2">Last updated: January 2025</p></div></section>
    <section className="py-14"><div className="max-w-4xl mx-auto px-4 prose prose-gray">
      <h2 className="text-xl font-bold mb-3">1. Data Controller</h2><p className="text-gray-600 mb-6">Ecomotiq S.L., 91 Digital Hub, 08003 Barcelona, Spain. CIF: ES B67284159</p>
      <h2 className="text-xl font-bold mb-3">2. Data We Collect</h2><p className="text-gray-600 mb-6">Contact details, company info, orders, communications, website usage.</p>
      <h2 className="text-xl font-bold mb-3">3. Your Rights (GDPR)</h2><p className="text-gray-600 mb-6">Access, rectification, erasure, restriction, portability, objection. Contact info@ecomotiq.com</p>
      <h2 className="text-xl font-bold mb-3">4. Contact</h2><p className="text-gray-600">Ecomotiq S.L., 91 Digital Hub, 08003 Barcelona. Email: info@ecomotiq.com</p>
    </div></section></div>
  );
}

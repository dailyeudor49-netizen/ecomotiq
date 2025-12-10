import { Metadata } from "next";
export const metadata: Metadata = { title: "Cookie Policy" };
export default function CookiePolicyPage() {
  return (
    <div className="bg-white"><section className="bg-indigo-50 py-12"><div className="max-w-7xl mx-auto px-4"><h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1><p className="text-gray-600 mt-2">Last updated: January 2025</p></div></section>
    <section className="py-14"><div className="max-w-4xl mx-auto px-4 prose prose-gray">
      <h2 className="text-xl font-bold mb-3">Cookies</h2><p className="text-gray-600 mb-6">Small files for site functionality. We use essential, analytics, and functional cookies.</p>
      <h2 className="text-xl font-bold mb-3">Managing</h2><p className="text-gray-600 mb-6">Control via browser settings.</p>
      <h2 className="text-xl font-bold mb-3">Contact</h2><p className="text-gray-600">info@ecomotiq.com</p>
    </div></section></div>
  );
}

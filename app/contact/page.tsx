import { Metadata } from "next";

export const metadata: Metadata = { title: "Contact", description: "Contact Ecomotiq for wholesale electronics enquiries." };

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600">We respond within 4 business hours</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Send a message</h2>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Name</label><input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Company</label><input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500" /></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Email</label><input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Subject</label><select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"><option>Quote Request</option><option>Product Enquiry</option><option>Partnership</option><option>Other</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Message</label><textarea rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"></textarea></div>
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition">Send Message</button>
              </form>
            </div>
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl"><div className="text-sm text-gray-500">Email</div><div className="font-medium text-gray-900">info@ecomotiq.com</div></div>
                  <div className="p-4 bg-gray-50 rounded-xl"><div className="text-sm text-gray-500">Address</div><div className="font-medium text-gray-900">91 Digital Hub<br/>08003 Barcelona, Spain</div></div>
                  <div className="p-4 bg-gray-50 rounded-xl"><div className="text-sm text-gray-500">Hours</div><div className="font-medium text-gray-900">Mon-Fri: 9:00-18:00 CET</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

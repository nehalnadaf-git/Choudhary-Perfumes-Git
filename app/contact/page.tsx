
"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            {/* Header */}
            <div className="bg-black text-white pt-32 pb-16 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Get in Touch</h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg font-light">
                        We're here to help you find your perfect fragrance.
                    </p>
                </div>
            </div>

            <section className="py-20 container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-serif font-bold mb-6 text-black">Contact Information</h2>
                            <p className="text-gray-600 mb-8">
                                Have questions about our products or need a recommendation? creating a custom gift set? Reach out to us directly.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <ContactCard
                                icon={<FaWhatsapp className="text-2xl" />}
                                title="Chat on WhatsApp"
                                value="+91 6363 278 962"
                                action="Chat Now"
                                href="https://wa.me/916363278962"
                                color="bg-green-50 text-green-600 border-green-200"
                            />
                            <ContactCard
                                icon={<FaPhone className="text-2xl" />}
                                title="Call Us"
                                value="+91 6363 278 962"
                                action="Call Now"
                                href="tel:+916363278962"
                                color="bg-blue-50 text-blue-600 border-blue-200"
                            />
                            <ContactCard
                                icon={<FaMapMarkerAlt className="text-2xl" />}
                                title="Visit Our Store"
                                value="Madani Colony near Akshaya Park, Hubli"
                                action="Get Directions"
                                href="https://maps.google.com/?q=Choudhary+Perfumes+Madani+Colony+Hubli"
                                color="bg-orange-50 text-orange-600 border-orange-200"
                            />
                            <ContactCard
                                icon={<FaInstagram className="text-2xl" />}
                                title="Follow Us"
                                value="@choudharyperfumes"
                                action="View Profile"
                                href="https://instagram.com/choudharyperfumes"
                                color="bg-pink-50 text-pink-600 border-pink-200"
                            />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-serif font-bold mb-6">Send a Message</h3>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-colors" placeholder="Your Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                    <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-colors" placeholder="Mobile Number" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-colors">
                                    <option>Product Inquiry</option>
                                    <option>Order Status</option>
                                    <option>General Question</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-colors" placeholder="How can we help you?" />
                            </div>
                            <button className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gold hover:text-black transition-all duration-300">
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </main>
    )
}

function ContactCard({ icon, title, value, action, href, color }: any) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`flex items-center p-4 border rounded-xl transition-transform hover:-translate-y-1 hover:shadow-md ${color} bg-opacity-50 border-opacity-50 group`}>
            <div className={`p-3 rounded-full bg-white shadow-sm mr-4 text-xl`}>
                {icon}
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-gray-900">{title}</h4>
                <p className="text-sm text-gray-600">{value}</p>
            </div>
            <span className="text-sm font-medium underline opacity-0 group-hover:opacity-100 transition-opacity">
                {action}
            </span>
        </a>
    )
}

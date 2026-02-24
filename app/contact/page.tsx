
"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

export default function ContactPage() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('General Inquiry');
    const [message, setMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        const whatsappMessage = `Hello Choudhary Perfumes,\n\nName: ${name}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}\n\nThank you!`;
        const url = `https://wa.me/916363278962?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(url, '_blank');
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <div className="relative bg-black pt-28 pb-12 md:pt-40 md:pb-28 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
                <div className="container mx-auto text-center relative z-10">
                    <p className="text-gold text-xs md:text-base font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">We'd Love to Hear From You</p>
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-3 md:mb-6">Get in Touch</h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-base md:text-xl font-light leading-relaxed px-4">
                        Whether you need a fragrance recommendation or have a question about your order, our team is here to assist you.
                    </p>
                </div>
            </div>

            <section className="py-10 md:py-24 container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 max-w-7xl mx-auto items-start">

                    {/* Left Column: Contact Details */}
                    <div>
                        <div className="mb-8 md:mb-12 text-center md:text-left">
                            <h2 className="text-2xl md:text-4xl font-serif font-bold mb-3 md:mb-4 text-black">Contact Information</h2>
                            <p className="text-gray-500 leading-relaxed text-sm md:text-lg font-light">
                                Visit our store to experience our collection in person, or reach out to us via phone or email for personalized assistance.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                            <ContactCard
                                icon={<FaWhatsapp />}
                                title="WhatsApp Support"
                                value="+91 6363 278 962"
                                subtext="Available 24/7"
                                href="https://wa.me/916363278962"
                            />
                            <ContactCard
                                icon={<FaPhone />}
                                title="Phone Call"
                                value="+91 6363 278 962"
                                subtext="Mon - Sat, 10am - 9pm"
                                href="tel:+916363278962"
                            />
                            <ContactCard
                                icon={<FaMapMarkerAlt />}
                                title="Visit Our Store"
                                value="Madani Colony, Hubli"
                                subtext="Near Akshaya Park"
                                href="https://maps.google.com/?q=Choudhary+Perfumes+Madani+Colony+Hubli"
                            />
                            <ContactCard
                                icon={<FaInstagram />}
                                title="Follow Us"
                                value="@choudharyperfumes"
                                subtext="For latest updates"
                                href="https://instagram.com/choudharyperfumes"
                            />
                        </div>
                    </div>

                    {/* Right Column: Message Form */}
                    <div className="bg-gray-50 p-6 md:p-12 rounded-3xl border border-gray-100 relative overflow-hidden mt-4 md:mt-0">

                        {/* Decorative Background Element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <h3 className="text-xl md:text-3xl font-serif font-bold mb-2">Send us a Message</h3>
                            <p className="text-gray-500 mb-6 md:mb-8 font-light text-sm md:text-base">We usually respond within a few hours.</p>

                            <form onSubmit={handleSendMessage} className="space-y-4 md:space-y-6">
                                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            className="w-full px-4 py-3 md:px-5 md:py-4 bg-white border border-gray-200 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-gray-300 font-medium text-sm md:text-base"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            className="w-full px-4 py-3 md:px-5 md:py-4 bg-white border border-gray-200 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-gray-300 font-medium text-sm md:text-base"
                                            placeholder="+91..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Subject</label>
                                    <div className="relative">
                                        <select
                                            value={subject}
                                            onChange={e => setSubject(e.target.value)}
                                            className="w-full px-4 py-3 md:px-5 md:py-4 bg-white border border-gray-200 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all appearance-none font-medium cursor-pointer text-sm md:text-base"
                                        >
                                            <option>General Inquiry</option>
                                            <option>Product Recommendation</option>
                                            <option>Order Support</option>
                                            <option>Wholesale / Bulk Order</option>
                                        </select>
                                        <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <FiChevronDown size={18} />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Message</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        className="w-full px-4 py-3 md:px-5 md:py-4 bg-white border border-gray-200 rounded-xl focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-gray-300 resize-none font-medium text-sm md:text-base"
                                        placeholder="How can we help you find your signature scent?"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-3.5 md:py-5 rounded-xl font-bold text-base md:text-lg hover:bg-gold hover:text-black transition-all duration-300 shadow-lg hover:shadow-gold/20 mt-2 tracking-wide uppercase"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    )
}

function ContactCard({ icon, title, value, subtext, href }: any) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-5 md:p-6 bg-white border border-gray-100 rounded-2xl hover:border-gold/30 hover:shadow-lg transition-all duration-300 h-full"
        >
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-gold text-xl shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-gray-900 group-hover:text-gold transition-colors text-lg mb-1">{title}</h4>
                <p className="font-medium text-gray-800 mb-0.5">{value}</p>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{subtext}</p>
            </div>
        </a>
    )
}

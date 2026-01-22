"use client";

import { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer({
  backgroundColor = "#1f2937",
  textColor = "#f9fafb",
  accentColor = "#3b82f6",
  companyName = "Plein Cap Croisières",
  showNewsletter = true
}) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="w-full" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: accentColor }}>
              {companyName}
            </h3>
            <p className="mb-4" style={{ color: textColor }}>
              Depuis plus de 40 ans, nous vous proposons des croisières culturelles d'exception, enrichies par des conférenciers passionnés.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-75 transition-opacity" style={{ color: accentColor }}>
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:opacity-75 transition-opacity" style={{ color: accentColor }}>
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:opacity-75 transition-opacity" style={{ color: accentColor }}>
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:opacity-75 transition-opacity" style={{ color: accentColor }}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: accentColor }}>
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                "Croisières",
                "Voyages",
                "Nos Bateaux",
                "Visioconférence",
                "L'Esprit Plein Cap"
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:underline transition-all"
                    style={{ color: textColor }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: accentColor }}>
              Contactez-nous
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <span style={{ color: textColor }}>251 route des Crêtes, 06560 Sophia Antipolis</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" style={{ color: accentColor }} />
                <span style={{ color: textColor }}>04 93 20 21 20</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" style={{ color: accentColor }} />
                <span style={{ color: textColor }}>contact@plein-cap.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {showNewsletter && (
            <div>
              <h3 className="text-lg font-bold mb-4" style={{ color: accentColor }}>
                Newsletter
              </h3>
              <p className="mb-4" style={{ color: textColor }}>
                Inscrivez-vous à notre newsletter pour recevoir nos actualités et offres.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="px-4 py-2 rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: accentColor }}
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md font-medium transition-colors"
                    style={{ backgroundColor: accentColor, color: textColor }}
                  >
                    {subscribed ? "Inscrit !" : "S'inscrire"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Divider */}
        <div 
          className="h-px w-full my-8" 
          style={{ backgroundColor: `${accentColor}40` }}
        ></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0" style={{ color: textColor }}>
            © {new Date().getFullYear()} {companyName}. Tous droits réservés.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:underline" style={{ color: textColor }}>
              Politique de confidentialité
            </a>
            <a href="#" className="text-sm hover:underline" style={{ color: textColor }}>
              Conditions générales
            </a>
            <a href="#" className="text-sm hover:underline" style={{ color: textColor }}>
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

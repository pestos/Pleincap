"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';
import { navItems, logoPlaceholder, sectionContent } from '../data/navigationData';
import type { NavigationMenuProps, NavigationSection, SectionContentWithTypes } from '../types/navigation';

const isSectionWithTypes = (section: typeof sectionContent[NavigationSection]): section is SectionContentWithTypes => {
  return 'types' in section;
};

export default function NavigationMenu({
  backgroundColor = "transparent",
  textColor = "#ffffff",
  accentColor = "#3182ce",
  mobileBreakpoint = 768
}: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<NavigationSection | "">("");
  const [hoverItem, setHoverItem] = useState<NavigationSection | null>(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  const currentSection = activeItem ? sectionContent[activeItem] : null;
  const isTypeSection = currentSection && isSectionWithTypes(currentSection);

  // Font loading
  useEffect(() => {
    if (localStorage.getItem('fontLoaded') === 'true') {
      setFontLoaded(true);
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap';
    
    link.onload = () => {
      setFontLoaded(true);
      localStorage.setItem('fontLoaded', 'true');
    };

    link.onerror = () => {
      console.warn('Failed to load font, falling back to system fonts');
      setFontLoaded(true);
    };

    document.head.appendChild(link);
  }, []);


  // Mobile menu scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleItemClick = (item: NavigationSection) => {
    setActiveItem(prev => prev === item ? "" : item);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const fontFamily = fontLoaded ? "'Playfair Display', serif" : "'Georgia', serif";

  return (
    <>
      <header 
        className="absolute top-0 left-0 w-full z-50 bg-transparent"
      >
        {/* Top utility bar */}
        <div className="hidden lg:block bg-transparent">
          <div className="container mx-auto px-4 py-2 flex items-center justify-end space-x-6 text-sm" style={{ color: textColor, fontFamily }}>
            <a href="tel:+33123456789" className="font-medium hover:text-blue-400 transition-colors whitespace-nowrap">Conseiller&nbsp;: 04&nbsp;93&nbsp;20&nbsp;21&nbsp;20</a>
            {[
              { label: 'Contact', href: '#contact' },
              { label: 'Newsletter', href: '#newsletter' },
              { label: 'Brochure', href: '#brochure' },
              { label: 'Blog', href: '#blog' },
              { label: 'Parrainage', href: '#parrainage' }
            ].map(link => (
              <a key={link.label} href={link.href} className="hover:text-blue-400 transition-colors whitespace-nowrap">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center space-x-2">
                <ImageWithFallback 
                  src={logoPlaceholder}
                  alt="Logo Plein Cap Croisière"
                  className="object-contain h-12 md:h-24 w-auto"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "")}`}
                  className="relative"
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item);
                  }}
                  onMouseEnter={() => setHoverItem(item)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <span
                    className="text-[22px] lg:text-[25px] font-medium transition-colors duration-300"
                    style={{ 
                      color: activeItem === item || hoverItem === item ? accentColor : textColor,
                      fontFamily
                    }}
                  >
                    {item}
                  </span>
                </a>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md focus:outline-none focus:ring-2"
                style={{ color: textColor }}
              >
                <span className="sr-only">Open menu</span>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden"
            style={{ backgroundColor: backgroundColor === "transparent" ? "rgba(255,255,255,0.9)" : backgroundColor }}
          >
            <div className="pt-2 pb-4 px-4 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "")}`}
                  className="block px-3 py-4 text-[25px] font-medium border-b last:border-0"
                  style={{ 
                    color: activeItem === item || hoverItem === item ? accentColor : textColor,
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    fontFamily
                  }}
                  onMouseEnter={() => setHoverItem(item)}
                  onMouseLeave={() => setHoverItem(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item);
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      {/* Expanded content section */}
      {activeItem && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed top-[200px] left-0 w-full z-40 max-h-[calc(100vh-200px)] overflow-y-auto"
          style={{ 
            backgroundColor: "rgba(255, 255, 255, 0.98)", 
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
          }}
        >
          <div className="container mx-auto px-4 py-12">
            {currentSection && isTypeSection ? (
              <div className="flex flex-col md:flex-row">
                {/* Left section */}
                <div className="md:w-1/3 mb-8 md:mb-0 md:pr-10">
                  <div className="flex items-center mb-4">
                    {React.createElement(sectionContent[activeItem].icon, { className: "w-12 h-12 text-blue-500" })}
                    <h2 className="text-3xl font-medium ml-4" style={{ fontFamily, color: accentColor }}>
                      {sectionContent[activeItem].title}
                    </h2>
                  </div>
                  <p className="text-gray-700 text-lg mb-6" style={{ fontFamily }}>
                    {sectionContent[activeItem].description}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {isTypeSection && currentSection.types.map((type, index: number) => (
                      <div 
                        key={index} 
                        className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                        style={{ fontFamily }}
                      >
                        <div className="flex items-center mb-2">
                          {React.createElement(type.icon, { className: "w-6 h-6 text-blue-500" })}
                          <h3 className="text-xl font-medium ml-2" style={{ color: accentColor }}>
                            {type.name}
                          </h3>
                        </div>
                        <p className="text-gray-600 mb-3">{type.description}</p>
                        <a 
                          href="#" 
                          className="inline-flex items-center text-sm font-medium transition-colors duration-300"
                          style={{ color: accentColor }}
                        >
                          Découvrir <ChevronRight className="ml-1" size={16} />
                        </a>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    className="flex items-center text-white py-2 px-4 rounded transition-all duration-300"
                    style={{ 
                      backgroundColor: accentColor,
                      fontFamily
                    }}
                  >
                    {activeItem === 'CROISIERES' ? 'Toutes nos croisières' : 
                     activeItem === 'VOYAGES' ? 'Tous nos voyages' : 
                     activeItem === 'NOS BATEAUX' ? 'Tous nos bateaux' : 
                     'Toutes nos visioconférences'} <ChevronRight className="ml-2" size={18} />
                  </button>
                </div>

                {/* Right section with cards */}
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isTypeSection && currentSection.offers.map((offer, index: number) => (
                    <div 
                      key={index}
                      className={`rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 ${offer.highlight==='rose' ? 'hover:border-rose-400' : 'hover:border-blue-300'}`}
                      style={{ fontFamily }}
                    >
                      <div className="relative">
                        <ImageWithFallback 
                          src={offer.image} 
                          alt={offer.name}
                          className="w-full h-48 object-cover"
                        />
                        {offer.tag && (
                          <div 
                            className={`absolute top-0 right-0 text-white px-3 py-1 rounded-bl-lg ${offer.highlight==='rose' ? 'bg-rose-500' : 'bg-blue-500'}`}
                            style={{ fontFamily }}
                          >
                            {offer.tag}
                          </div>
                        )}
                        <div 
                          className={`absolute bottom-0 left-0 text-white px-3 py-1 rounded-tr-lg ${offer.highlight==='rose' ? 'bg-rose-500' : 'bg-blue-500'}`}
                          style={{ fontFamily }}
                        >
                          {offer.type === 'maritime' ? 'Croisière maritime' : 
                           offer.type === 'fluvial' ? 'Croisière fluviale' : 
                           offer.type === 'train' ? 'Voyage en train' : 
                           offer.type === '5stars' ? 'Bateau 5★' : 
                           offer.type === '4stars' ? 'Bateau 4★' : 
                           offer.type === 'live' ? 'Visio en direct' : 
                           offer.type === 'replay' ? 'Replay' : 'Voyage'}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`${offer.featured ? 'text-2xl' : 'text-xl'} font-medium`} style={{ color: offer.highlight==='rose' ? '#e11d48' : accentColor }}>
                            {offer.name}
                          </h3>
                          {offer.price && (
                            <div className="text-right">
                              <p className="text-sm text-gray-500">à partir de</p>
                              <p className="text-lg font-bold" style={{ color: offer.highlight==='rose' ? '#e11d48' : accentColor }}>{offer.price}</p>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{offer.description}</p>
                        <a 
                          href="#" 
                          className={`inline-flex items-center font-medium transition-all duration-300 ${offer.highlight==='rose' ? 'text-white bg-rose-500 hover:bg-rose-600 py-2 px-4 rounded' : offer.featured ? 'text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded' : 'text-blue-500'}`}
                          style={{ fontFamily }}
                        >
                          {activeItem === 'NOS BATEAUX' || activeItem === 'VISIOCONFÉRENCE' ? 'En savoir plus' : 
                           offer.featured ? 'Réserver maintenant' : 'En savoir plus'} 
                          <ChevronRight className="ml-1" size={16} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row">
                {/* Left section for L'ESPRIT PLEIN CAP */}
                <div className="md:w-1/3 mb-8 md:mb-0 md:pr-10">
                  <div className="flex items-center mb-4">
                    {React.createElement(sectionContent[activeItem].icon, { className: "w-12 h-12 text-blue-500" })}
                    <h2 className="text-3xl font-medium ml-4" style={{ fontFamily, color: accentColor }}>
                      {sectionContent[activeItem].title}
                    </h2>
                  </div>
                  <p className="text-gray-700 text-lg mb-6" style={{ fontFamily }}>
                    {sectionContent[activeItem].description}
                  </p>
                  <button 
                    className="flex items-center text-white py-2 px-4 rounded transition-all duration-300"
                    style={{ 
                      backgroundColor: accentColor,
                      fontFamily
                    }}
                  >
                    Voir tout <ChevronRight className="ml-2" size={18} />
                  </button>
                </div>

                {/* Right section with items grid */}
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {!isTypeSection && currentSection.items.map((item, index: number) => (
                    <div 
                      key={index}
                      className={`p-5 rounded-lg transition-all duration-300 hover:shadow-lg relative overflow-hidden group`}
                      style={{ 
                        border: "1px solid rgba(0,0,0,0.1)",
                        fontFamily
                      }}
                    >
                      {item.image && (
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                          style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                      )}
                      <h3 className={`text-xl font-medium mb-2`} style={{ color: accentColor }}>
                        {item.name}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                      <a 
                        href="#" 
                        className="inline-block mt-4 text-sm font-medium transition-colors duration-300"
                        style={{ color: accentColor }}
                      >
                        En savoir plus
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setActiveItem("")}
            aria-label="Fermer le panneau"
          >
            <X size={24} className="text-gray-700" />
          </button>
        </motion.div>
      )}

      {/* Overlay backdrop */}
      {activeItem && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setActiveItem("")}
        />
      )}
    </>
  );
}

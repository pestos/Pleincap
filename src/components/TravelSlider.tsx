"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ImageWithFallback from "./ImageWithFallback";

export default function TravelSlider({ 
  transitionDuration = 5,
  fadeSpeed = 0.5
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      title: "Croisière maritime\net fluviales",
      image: "https://www.plein-cap.com/images/stories/MsHamburg/ms-hamburg-pool-01.jpg",
      alt: "Bateau de croisière sur l'eau",
      description:
        "Depuis 44 ans, nous naviguons avec passion pour vous offrir bien plus qu'un voyage : une véritable expérience. Avec notre savoir-faire unique, chaque escale devient un souvenir inoubliable. Parce que quand l'expérience fait la différence, la mer et les fleuves se vivent autrement."
    },
    {
      title: "Voyage en train",
      image: "https://www.plein-cap.com/images/2025/train/shutterstock_353334314_cleanup.jpg",
      alt: "Train traversant un beau paysage",
      description:
        "Partez à la découverte autrement : confort, authenticité et paysages qui défilent sous vos yeux. Le voyage en train, c'est l'art de prendre le temps et de savourer chaque instant entre deux destinations."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, transitionDuration * 1000);

    return () => clearInterval(interval);
  }, [transitionDuration, slides.length]);

  return (
    <div className="relative w-full h-[70vh] md:h-full overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === activeIndex ? 1 : 0 }}
          transition={{ duration: fadeSpeed, ease: "easeInOut" }}
          style={{
            zIndex: index === activeIndex ? 1 : 0
          }}
        >
          <div className="relative w-full h-full">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={index === activeIndex ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: transitionDuration, ease: "linear" }}
            >
              <ImageWithFallback
                src={slide.image}
                alt={slide.alt}
                className="object-cover w-full h-full"
              />
            </motion.div>

            {/* subtle dark overlay for gentle shadow effect */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: index === activeIndex ? 0 : 20, 
                  opacity: index === activeIndex ? 1 : 0 
                }}
                transition={{ 
                  duration: fadeSpeed, 
                  delay: index === activeIndex ? fadeSpeed / 2 : 0 
                }}
                className="whitespace-pre-line text-[70px] font-medium text-white mb-4 tracking-wider max-w-2xl mx-auto drop-shadow-lg" 
                style={{fontFamily: 'Poppins, sans-serif'}}
              >
                {slide.title}
              </motion.h2>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: index === activeIndex ? 0 : 20, 
                  opacity: index === activeIndex ? 1 : 0 
                }}
                transition={{ 
                  duration: fadeSpeed, 
                  delay: index === activeIndex ? fadeSpeed : 0 
                }}
              >
                <p className="max-w-2xl mx-auto text-white text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-lg" 
                   style={{fontFamily: 'Poppins, sans-serif'}}>
                  {slide.description}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Award, ShieldCheck, Target } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

// Centralised URLs so the JSX below stays concise and the file smaller
const IMAGE = {
  main: "https://www.plein-cap.com/images/2026/egypte/shutterstock_1909404877.jpg",
  hiker: "https://www.plein-cap.com/images/stories/MsLadyDiletta/LADY_DILETTA_exterior_duesseldorf_02.jpg",
  portrait: "https://www.plein-cap.com/images/stories/pc/photo-direction.jpg"
} as const;

export default function AdventureAndTravels() {
  return (
    <div className="bg-blue-100/40 dark:bg-background-dark font-display w-full py-16">
      <div className="max-w-7xl mx-auto">
        <div className="w-full p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-center">
            {/* Images section */}
            <div className="order-2 lg:order-1 lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="col-span-2 md:max-h-96 overflow-hidden">
                <ImageWithFallback 
                  alt="Woman in a pink dress on a boat in a beautiful lake with limestone karsts" 
                  className="rounded-2xl w-full h-full object-cover" 
                  src={IMAGE.main} 
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <ImageWithFallback 
                  alt="Hiker with a red backpack looking at a limestone karst in the water" 
                  className="rounded-2xl w-full h-full object-cover" 
                  src={IMAGE.hiker}
                />
              </div>
              <div className="col-span-2 sm:col-span-1 bg-blue-500 text-white p-6 rounded-2xl flex flex-col justify-center items-center text-center md:self-end">
                <div className="text-5xl mb-2 text-white">
                  <Award size={64} />
                </div>
                <p className="text-4xl font-bold">40</p>
                <p className="text-xl">années d'expérience</p>
              </div>
            </div>
            {/* Text section */}
            <div className="order-1 lg:order-2 lg:col-span-7 mt-8 lg:mt-0">
              <div className="relative">
                <p className="text-primary font-semibold text-lg mb-2">À propos de l'entreprise</p>
                <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark leading-tight mb-6">La meilleure opportunité pour l'aventure et l'évasion</h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-xl">
                  Embarquez pour un voyage rempli de paysages à couper le souffle, d'expériences palpitantes et de souvenirs inoubliables. Que vous soyez explorateur ou voyageur, c'est l'occasion idéale de découvrir les merveilles du monde.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                  <div className="flex items-start space-x-4">
                    <div className="text-primary text-5xl">
                      <ShieldCheck size={48} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-text-light dark:text-text-dark">Des voyages enrichis par un conférencier de confiance</h3>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark">La découverte du monde, enrichie par la culture.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="text-primary text-5xl">
                      <Target size={48} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-text-light dark:text-text-dark">Mission &amp; Vision</h3>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark">Notre mission chaque voyage devient une leçon de culture.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <button className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-xl hover:bg-blue-600 transition-colors w-full sm:w-auto">
                    Partez à l'aventure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

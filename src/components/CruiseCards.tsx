"use client";

import { useState, useMemo } from "react";
import { Star, BedDouble, Plane, SlidersHorizontal } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

export default function CruiseCards() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [filterBy, setFilterBy] = useState<string | null>(null);
  
  // Mock data for cruise cards
  const cruises = [
    {
      id: 1,
      destination: "De l'Afrique du Sud aux Trésors de l'Océan Indien",
      price: 1299,
      nights: 7,
      departureDate: "12 juin 2024",
      departureDateTimestamp: new Date("2024-06-12").getTime(),
      nextDepartures: ["12 juin 2024", "26 juin 2024", "10 juil 2024"],
      description: "Croisière tropicale entre plages de sable blanc et eaux turquoises.",
      flightIncluded: true,
      rating: 5,
      shipImage: "https://www.plein-cap.com/images/2026/dakar/shutterstock_2376674363.jpg",
      secondaryImage: "https://www.plein-cap.com/images/2026/dakar/carte.jpg",
      shipProfile: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=64&auto=format&fit=crop",
      shipName: "MS Hamburg"
    },
    {
      id: 2,
      destination: "Méditerranée",
      price: 1599,
      nights: 10,
      departureDate: "5 juillet 2024",
      departureDateTimestamp: new Date("2024-07-05").getTime(),
      nextDepartures: ["5 juillet 2024", "19 juillet 2024", "2 août 2024"],
      description: "Explorez les trésors historiques et culinaires de la Méditerranée.",
      flightIncluded: true,
      rating: 4.5,
      shipImage: "https://images.unsplash.com/photo-1580541631971-a0e2bf36d6f5?q=80&w=987&auto=format&fit=crop",
      shipProfile: "https://images.unsplash.com/photo-1605039836047-01b730a6806f?q=80&w=64&auto=format&fit=crop",
      shipName: "MSC Grandiosa"
    },
    {
      id: 3,
      destination: "Les Trésors du Golfe Arabo-Persique",
      price: 1899,
      nights: 12,
      departureDate: "20 août 2024",
      departureDateTimestamp: new Date("2024-08-20").getTime(),
      description: "Plongez dans le fascinant Golfe Persique, où l'hospitalité arabe offre un luxe inégalé. Embarquez sur une croisière qui vous emmènera de l'effervescence de Doha au fascinant archipel de Bahreïn.",
      flightIncluded: false,
      rating: 5,
      shipImage: "https://www.plein-cap.com/images/2026/qatar/shutterstock_1440933581.jpg",
      shipProfile: "https://www.plein-cap.com/images/stories/MsCelestyal/CelestyalJourney_Santorini_13_09_2023-HR.jpg",
      nextDepartures: ["20 août 2024", "3 sept 2024", "17 sept 2024"],
      shipName: "MS Celestyal Journey"
    },
    {
      id: 4,
      destination: "Îles Grecques",
      price: 1499,
      nights: 8,
      departureDate: "10 sept 2024",
      departureDateTimestamp: new Date("2024-09-10").getTime(),
      nextDepartures: ["10 sept 2024", "24 sept 2024", "8 oct 2024"],
      description: "Partez à la découverte des îles grecques et de leurs mythes.",
      flightIncluded: true,
      rating: 4.5,
      shipImage: "https://images.unsplash.com/photo-1535951058-e0717e201610?q=80&w=1064&auto=format&fit=crop",
      shipProfile: "https://images.unsplash.com/photo-1533760881669-80db4d7b4c15?q=80&w=64&auto=format&fit=crop",
      shipName: "Celebrity Edge"
    },
    {
      id: 5,
      destination: "De l'Afrique du Sud aux Trésors de l'Océan Indien",
      price: 2199,
      nights: 14,
      departureDate: "3 mai 2024",
      departureDateTimestamp: new Date("2024-05-03").getTime(),
      nextDepartures: ["3 mai 2024", "17 mai 2024", "31 mai 2024"],
      description: "Un itinéraire entre Afrique du Sud, Madagascar, îles de La Réunion & Maurice pour terminer en apothéose aux Seychelles…",
      flightIncluded: true,
      rating: 5,
      shipImage: "https://www.plein-cap.com/images/2026/ocean_indien/shutterstock_109722815.jpg",
      secondaryImage: "https://www.plein-cap.com/images/2026/dakar/carte.jpg",
      shipProfile: "https://www.plein-cap.com/images/stories/MsHamburg/ms-hamburg-2024-01.jpg",
      shipName: "MS Hanburg"
    },
    {
      id: 6,
      destination: "Caraïbes du Sud",
      price: 1399,
      nights: 9,
      departureDate: "15 novembre 2024",
      departureDateTimestamp: new Date("2024-11-15").getTime(),
      nextDepartures: ["15 novembre 2024", "29 novembre 2024", "13 déc 2024"],
      description: "Découvrez les îles paradisiaques des Caraïbes du Sud et leurs plages magnifiques.",
      flightIncluded: true,
      rating: 4,
      shipImage: "https://images.unsplash.com/photo-1566288623394-377af472d81b?q=80&w=1064&auto=format&fit=crop",
      shipProfile: "https://images.unsplash.com/photo-1625245488600-33cad8a3f0f5?q=80&w=64&auto=format&fit=crop",
      shipName: "Caribbean Princess"
    },
  ];

  // Sort cruises based on filter selection
  const sortedCruises = useMemo(() => {
    let sorted = [...cruises];
    
    if (filterBy === "dateProche") {
      sorted.sort((a, b) => a.departureDateTimestamp - b.departureDateTimestamp);
    } else if (filterBy === "dateLoin") {
      sorted.sort((a, b) => b.departureDateTimestamp - a.departureDateTimestamp);
    } else if (filterBy === "prixCher") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (filterBy === "prixPasCher") {
      sorted.sort((a, b) => a.price - b.price);
    }
    
    return sorted;
  }, [filterBy]);

  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={`star-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={`star-half-${i}`} className="relative w-4 h-4">
            <Star className="absolute w-4 h-4 text-gray-300 fill-current" />
            <div className="absolute w-2 h-4 overflow-hidden">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={`star-empty-${i}`} className="w-4 h-4 text-gray-300" />
        );
      }
    }
    
    return stars;
  };

  return (
    <div
      className="w-full flex flex-col items-center relative py-16 overflow-visible bg-gradient-to-b from-gray-100 to-white">
      {/* Decorative top-right image */}
      <ImageWithFallback
        src="https://i.postimg.cc/4y4YW6T0/Chat-GPT-Image-24-sept-2025-21-10-51.png"
        alt="Decoration top right"
        className="absolute top-0 right-0 w-[320px] max-w-none object-cover pointer-events-none select-none z-10"
      />
      {/* Decorative bottom-left image (rotated 180°) */}
      <ImageWithFallback
        src="https://i.postimg.cc/4y4YW6T0/Chat-GPT-Image-24-sept-2025-21-10-51.png"
        alt="Decoration bottom left"
        className="absolute bottom-0 left-0 w-[320px] max-w-none object-cover pointer-events-none select-none z-10 rotate-180"
      />
      <div className="relative z-20 w-full max-w-[90rem] mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium text-gray-900">Nos croisières</h1>
          
          {/* Filter options */}
          <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
            <div className="flex items-center mr-3">
              <SlidersHorizontal className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm text-gray-600 font-medium">Filtrer par:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 text-sm rounded-md transition-colors ${filterBy === 'dateProche' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                onClick={() => setFilterBy('dateProche')}
              >
                Date la plus proche
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md transition-colors ${filterBy === 'dateLoin' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                onClick={() => setFilterBy('dateLoin')}
              >
                Date la plus lointaine
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md transition-colors ${filterBy === 'prixCher' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                onClick={() => setFilterBy('prixCher')}
              >
                Prix le plus cher
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md transition-colors ${filterBy === 'prixPasCher' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                onClick={() => setFilterBy('prixPasCher')}
              >
                Prix le moins cher
              </button>
            </div>
          </div>
        </div>
        
        {/* Grid layout for cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCruises.map((cruise) => (
            <div
              key={cruise.id}
              className="bg-white rounded-lg shadow-sm relative flex flex-col h-full group"
              onMouseEnter={() => setHoveredId(cruise.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* TOP IMAGE */}
              <div className="relative w-full h-56 flex-shrink-0 overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={hoveredId === cruise.id && cruise.secondaryImage ? cruise.secondaryImage : cruise.shipImage}
                  alt={cruise.shipName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none"></div>
                {/* Price badge top-right */}
                <div className="absolute top-2 right-2 z-10">
                  <div className="bg-blue-600 text-white px-2 py-1 rounded-md text-center shadow-lg">
                    <div className="text-[10px] font-semibold uppercase leading-none">PRIX PAR PERSONNE</div>
                    <div className="font-bold text-sm">{cruise.price} €</div>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                {/* Top section with title and price */}
                <div className="flex justify-between items-start">
                  {/* Left side - title and description */}
                  <div className="max-w-md">
                    <h2 className="text-xl font-bold text-gray-800">{cruise.destination}</h2>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{cruise.description}</p>
                  </div>
                </div>
                
                {/* Main content - 2 columns */}
                <div className="flex mt-4 gap-4">
                  {/* Left column - badges and departure */}
                  <div className="flex-1">
                    {/* Info badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <BedDouble className="w-4 h-4" />
                        {cruise.nights} nuits
                      </div>
                      {cruise.flightIncluded && (
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <Plane className="w-4 h-4" />
                          Vol inclus
                        </div>
                      )}
                    </div>
                    
                    {/* Next departures */}
                    <div className="flex flex-col">
                      <div className="flex items-center pt-0.5 mb-1">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        <span className="text-xs text-gray-700 font-semibold">Prochains départs</span>
                      </div>
                      <div className="ml-4 grid grid-cols-2 gap-x-2 gap-y-1">
                        {cruise.nextDepartures?.slice(0, 3).map((dateStr) => (
                          <span
                            key={dateStr}
                            className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full text-[11px] font-medium shadow-sm text-center whitespace-nowrap"
                          >
                            {dateStr}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right column - ship image and rating */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-gray-100">
                      <ImageWithFallback
                        src={cruise.shipProfile}
                        alt={cruise.shipName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-medium text-gray-800 mb-1">{cruise.shipName}</p>
                    <div className="flex">
                      {renderStars(cruise.rating)}
                    </div>
                  </div>
                </div>
                
                {/* Bottom section with button aligned to right */}
                <div className="flex justify-end mt-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors text-sm">
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* See more button */}
        <div className="mt-8 flex justify-center">
          <button className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-10 py-3 rounded-md font-medium transition-colors">
            Voir plus de croisières
          </button>
        </div>
      </div>
    </div>
  );
}

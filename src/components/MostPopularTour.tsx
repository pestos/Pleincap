"use client";

import React from "react";
import { CalendarDays, Star } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

export default function MostPopularTour() {
  const tours = [
    {
      id: 1,
      title: "Romantic Getaway to Paris",
      description:
        "Experience timeless romance and elegance in the iconic settings of Paris, the City of Love.",
      duration: "5 Days, 4 Nights",
      rating: 4.8,
      price: 440,
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60",
      featured: false,
    },
    {
      id: 2,
      title: "Santorini Escape",
      description:
        "Bask in breathtaking sunsets and the crystal-blue waters of the Aegean Sea on this dreamy island.",
      duration: "7 Days, 6 Nights",
      rating: 4.8,
      price: 840,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      featured: true,
    },
    {
      id: 3,
      title: "Tokyo Cultural Immersion",
      description:
        "Dive into the vibrant streets of Tokyo and discover a harmonious blend of tradition and technology.",
      duration: "5 Days, 4 Nights",
      rating: 4.8,
      price: 860,
      image:
        "https://images.unsplash.com/photo-1518548419970-58e66ec96342?auto=format&fit=crop&w=800&q=60",
      featured: false,
    },
  ];

  return (
    <div className="w-full bg-background-light dark:bg-background-dark py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-primary font-semibold text-base md:text-lg">Wonderful place for You</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-heading-light dark:text-heading-dark">
            Most Popular Tour
          </h2>
        </div>

        {/* Cards */}
        {/* Stack vertically on mobile & tablet, switch to 3-column grid on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-full sm:max-w-[340px] md:max-w-md transition-transform duration-300 ${
                tour.featured
                  ? "border-2 border-blue-500 transform lg:scale-105 lg:mt-14 mb-8 lg:mb-0"
                  : "hover:-translate-y-2"
              }`}
            >
              {/* image wrapper for consistent border radius */}
              <div className={tour.featured ? "p-3 md:p-4" : ""}>
                <ImageWithFallback
                  src={tour.image}
                  alt={tour.title}
                  className={`w-full h-48 sm:h-52 md:h-56 object-cover ${tour.featured ? "rounded-lg" : ""}`}
                />
              </div>
              <div className={`p-4 md:p-6 ${tour.featured ? "pt-4 lg:pt-6" : ""}`}>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {tour.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {tour.description}
                </p>

                {/* meta */}
                <div className="flex justify-between items-center text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
                  <div className="flex items-center">
                    <CalendarDays size={16} className="mr-1 md:mr-2" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                    <span>{tour.rating}</span>
                  </div>
                </div>

                {/* price & button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                  <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                    ${tour.price}
                  </p>
                  {tour.featured ? (
                    <a
                      href="#"
                      className="w-full sm:w-auto text-center bg-blue-500 text-white px-4 md:px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                    >
                      More Details
                    </a>
                  ) : (
                    <a
                      href="#"
                      className="w-full sm:w-auto text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 md:px-6 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      More Details
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TestimonialsCarousel({
  primaryColor = "#23A6F0",
  secondaryColor = "#252B42",
  carouselSpeed = 300,
  autoplayInterval = 5000,
  enableAutoplay = false
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(enableAutoplay);

  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Guy Hawkins",
      role: "TOURIST",
      rating: 5,
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal letters distribution of letters, as opposed to using.",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      highlightColor: primaryColor
    },
    {
      id: 2,
      name: "Jacob Jones",
      role: "TOURIST",
      rating: 4,
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal letters distribution of letters, as opposed to using.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      highlightColor: secondaryColor
    },
    {
      id: 3,
      name: "Eleanor Pena",
      role: "ADVENTURER",
      rating: 5,
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal letters distribution of letters, as opposed to using.",
      image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      highlightColor: "#ff7846",
    },
    {
      id: 4,
      name: "Theresa Webb",
      role: "EXPLORER",
      rating: 5,
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal letters distribution of letters, as opposed to using.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      highlightColor: "#3C7FA8",
    },
  ];

  // Number of testimonials to display at once (1 on mobile, 2 on desktop)
  const getVisibleCount = () => window.innerWidth >= 1024 ? 2 : 1;
  const [visibleCount, setVisibleCount] = useState(2);

  // Responsive adjustment
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total pages based on visible count
  const totalPages = Math.ceil(testimonials.length / visibleCount);

  // Autoplay effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (autoplay) {
      interval = setInterval(() => {
        goToNextSlide();
      }, autoplayInterval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, currentIndex, autoplayInterval]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex(prev => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    if (enableAutoplay) setAutoplay(false);
  };

  const handleMouseLeave = () => {
    if (enableAutoplay) setAutoplay(true);
  };

  // Get current visible testimonials
  const getCurrentTestimonials = () => {
    const startIndex = currentIndex * visibleCount;
    return testimonials.slice(startIndex, startIndex + visibleCount);
  };

  // Render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < rating ? "#FFCE31" : "none"}
            color={i < rating ? "#FFCE31" : "#D9D9D9"}
          />
        ))}
      </div>
    );
  };

  // Get current visible testimonials
  const currentTestimonials = getCurrentTestimonials();

  return (
    <div className="bg-white py-16 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h3 className="text-[#23A6F0] font-semibold text-lg mb-2">Vos témoignages</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-[#252B42]">Quels sont leurs propos ?</h2>
        </div>
        
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-20 max-w-[2000px] mx-auto">
          {/* Left column with image */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 mx-auto md:mx-0">
            <div className="rounded-lg overflow-hidden shadow-lg h-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none mx-auto">
              <img 
                alt="A smiling female traveler with a backpack and a map, pointing upwards." 
                className="w-full h-full object-cover" 
                src="https://i.postimg.cc/L5VLCQPj/view-travel-adventure-essentials.jpg"
              />
            </div>
          </div>
          
          {/* Right column with testimonials */}
          <div 
            className="w-full lg:w-3/4 relative flex flex-col justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Wrapper to keep grid + controls together */}
            <div className="w-fit mx-auto">
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 overflow-visible place-items-center"
                initial={false}
                animate={{ opacity: 1 }}
              >
                {currentTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="bg-white rounded-lg p-8 pr-32 shadow-md border border-gray-100 relative h-full overflow-visible">
                      {/* Stars */}
                      <div className="flex items-center mb-6">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Testimonial text */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-14 max-w-lg">
                        {testimonial.text}
                      </p>

                      {/* Profile image */}
                      <div className="absolute -top-4 -right-4 z-10">
                        <img
                          alt={`Profile picture of ${testimonial.name}`}
                          className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                          src={testimonial.image}
                        />
                      </div>

                      {/* Name card */}
                      <div
                        className="absolute bottom-6 right-6 py-3 px-6 rounded-lg text-white"
                        style={{ backgroundColor: testimonial.highlightColor }}
                      >
                        <h4 className="font-bold text-sm whitespace-nowrap">{testimonial.name}</h4>
                        <p className="text-xs opacity-90">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            
              {/* Pagination & navigation */}
              <div className="mt-6 flex items-center justify-end gap-4">
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === currentIndex 
                          ? 'bg-[#23A6F0] w-6' 
                          : 'bg-gray-300 w-2.5'
                      }`}
                      style={{ backgroundColor: index === currentIndex ? primaryColor : undefined }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    className="bg-white text-gray-600 p-2.5 rounded-full shadow-md hover:bg-gray-50 transition-all border border-gray-100"
                    onClick={goToPrevSlide}
                    aria-label="Previous testimonials"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    className="text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition-all"
                    onClick={goToNextSlide}
                    aria-label="Next testimonials"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <ChevronRight size={20} />
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

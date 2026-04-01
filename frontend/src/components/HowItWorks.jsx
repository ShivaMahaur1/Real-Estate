// frontend/src/components/HowItWorks.jsx

import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaHandshake, FaKey, FaArrowRight } from 'react-icons/fa';

const steps = [
  {
    icon: <FaSearch />,
    title: "Search Properties",
    description: "Use our advanced search and filters to find properties that match your exact criteria and lifestyle."
  },
  {
    icon: <FaHandshake />,
    title: "Connect with an Agent",
    description: "Get in touch with one of our expert agents who will provide insights and guide you through the process."
  },
  {
    icon: <FaKey />,
    title: "Close the Deal",
    description: "Finalize the purchase with confidence and get the keys to your new dream home."
  }
];

const HowItWorks = () => {
  // State to track which cards are visible
  const [visibleCards, setVisibleCards] = useState(new Array(steps.length).fill(false));
  // Refs for each card to be observed
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Find the index of the card that is intersecting
          const index = cardRefs.current.indexOf(entry.target);
          if (index !== -1 && entry.isIntersecting) {
            // When a card is visible, update its state
            setVisibleCards((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
            // Stop observing the card once it has appeared
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Start the animation when the card is 15% visible
        threshold: 0.15,
      }
    );

    // Observe each card
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    // IMPROVEMENT: A more dynamic and warm gradient background
    <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="container mx-auto px-4">
        {/* IMPROVEMENT: More prominent header with a decorative element */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How It Works
            <span className="block w-24 h-1.5 bg-secondary mx-auto mt-4 rounded-full"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Finding your perfect home is a seamless journey with EstateHub. Follow our simple three-step process to turn your dream into reality.
          </p>
        </div>

        {/* IMPROVEMENT: Grid with relative positioning for connecting lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* 
                IMPROVEMENT: Enhanced card with "late appear" animation.
                The ref is attached here, and classes are conditional based on the visibleCards state.
              */}
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className={`relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-1000 ease-out ${
                  visibleCards[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                // Stagger the animation delay for each card
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Background Step Number */}
                <span className="absolute top-4 right-6 text-7xl font-bold text-yellow-200 opacity-50 select-none">
                  {`0${index + 1}`}
                </span>

                {/* Icon Circle */}
                <div className="flex items-center justify-center w-16 h-16 mb-6 bg-secondary rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                  {/* CHANGE: Icon color is now white for better contrast on the yellow background */}
                  <div className="text-white text-2xl">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {/* IMPROVEMENT: Visual connector between steps on medium screens and up */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 items-center justify-center text-secondary">
                  {/* The arrow is positioned between the cards */}
                  <div 
                    className="w-full border-t-2 border-dashed border-yellow-300"
                    style={{ 
                      left: `calc(100% / ${steps.length} * ${index + 1} - 50%)`, 
                      width: `calc(100% / ${steps.length} - 4rem)` 
                    }}
                  ></div>
                  <FaArrowRight className="absolute bg-white p-2 rounded-full shadow-md text-2xl" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
import React, { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const ClientTestimonials = ({ testimonials = [] }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  // --- Effect for the "Late Appear" Animation ---
  useEffect(() => {
    setVisibleCards(new Array(testimonials.length).fill(false));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [testimonials.length]);

  // --- Star Rating Component ---
  const StarRating = ({ rating }) => {
    return (
      <div className="flex justify-center mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    // --- Clean, Modern Theme Section ---
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* --- Enhanced Header --- */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Client Success Stories
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear directly from the people we've helped find their dream homes.
          </p>
        </div>

        {/* --- Testimonial Grid with Staggered Animation --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`transform transition-all duration-700 ease-out ${
                visibleCards[index]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* --- Enhanced Testimonial Card --- */}
              <div className="bg-white p-8 rounded-2xl shadow-lg h-full flex flex-col justify-between relative hover:shadow-2xl transition-shadow duration-300">
                {/* Large Quotation Mark Icon */}
                <FaQuoteLeft className="absolute top-4 right-4 text-6xl text-primary/10" />
                
                <div>
                  <StarRating rating={testimonial.rating} />
                  <p className="text-gray-700 mb-6 relative z-10">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="flex items-center mt-auto">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-200"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
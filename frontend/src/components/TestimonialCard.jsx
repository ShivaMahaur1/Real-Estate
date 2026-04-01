import React from 'react';
import { FaStar } from 'react-icons/fa';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <FaStar key={i} className="text-secondary" />
        ))}
      </div>
      <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
      <p className="font-semibold text-dark">- {testimonial.name}</p>
    </div>
  );
};

export default TestimonialCard;
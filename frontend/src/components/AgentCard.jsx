import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const AgentCard = ({ agent }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden text-center group">
      <img src={agent.image} alt={agent.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1 text-dark">{agent.name}</h3>
        <p className="text-gray-600 mb-4">{agent.role}</p>
        <div className="flex justify-center space-x-4 text-gray-500">
          <a href={`tel:${agent.phone}`} className="hover:text-secondary transition-colors" title="Phone">
            <FaPhoneAlt />
          </a>
          <a href={`mailto:${agent.email}`} className="hover:text-secondary transition-colors" title="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
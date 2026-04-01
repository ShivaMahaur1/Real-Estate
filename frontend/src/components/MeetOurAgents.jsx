import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaArrowRight, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { agents } from '../data/agents';
import AgentCard from './AgentCard';

const MeetOurAgents = () => {
  const featuredAgents = agents.slice(0, 4);
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  // --- Effect for the "Late Appear" Animation ---
  useEffect(() => {
    setVisibleCards(new Array(featuredAgents.length).fill(false));

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
  }, [featuredAgents.length]);

  return (
    // --- Striking Dark Theme Section ---
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Subtle background pattern for texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* --- Enhanced Header --- */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 bg-white/10 text-white font-semibold text-sm rounded-full mb-4 backdrop-blur-sm">
            <FaUsers className="mr-2" />
            The Team
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Meet Our Expert Agents
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            Our team of dedicated professionals is here to guide you every step of the way, ensuring a seamless and successful real estate experience.
          </p>
        </div>

        {/* --- Agent Grid with Staggered Animation --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredAgents.map((agent, index) => (
            <div
              key={agent.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`transform transition-all duration-700 ease-out ${
                visibleCards[index]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* --- Enhanced Agent Card Wrapper --- */}
              <div className="bg-gray-800 rounded-2xl p-6 text-center group hover:bg-gray-750 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="relative mb-4 mx-auto w-32 h-32">
                  <img src={agent.image} alt={agent.name} className="w-full h-full rounded-full object-cover border-4 border-gray-700 group-hover:border-secondary transition-colors" />
                  {/* Optional: Add social media icons on hover */}
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href="#" className="text-white mx-1 hover:text-secondary"><FaLinkedin /></a>
                    <a href="#" className="text-white mx-1 hover:text-secondary"><FaTwitter /></a>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
                <p className="text-secondary font-semibold mb-3">{agent.role}</p>
                <p className="text-gray-400 text-sm mb-4">{agent.bio}</p>
                <a href={`mailto:${agent.email}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {agent.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* --- Call-to-Action Button --- */}
        <div className="text-center mt-16">
          <Link
            to="/agents" // Assuming you have an agents page
            className="inline-flex items-center px-8 py-4 bg-secondary text-gray-900 font-bold text-lg rounded-xl hover:bg-yellow-400 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Meet the Full Team
            <FaArrowRight className="ml-3" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MeetOurAgents;
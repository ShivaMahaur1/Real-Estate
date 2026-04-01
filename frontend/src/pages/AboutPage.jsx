import React, { useState, useEffect, useRef } from 'react';
import { FaReact, FaCss3Alt, FaJsSquare, FaNpm, FaGithub, FaLinkedin, FaEnvelope, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiJsonwebtokens, SiExpress } from 'react-icons/si'; // CORRECT IMPORT

const AboutPage = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // --- Team Data (Order updated as requested) ---
  const teamMembers = [
    {
      name: "Shiva Mahaur",
      role: "Lead Developer & Project Architect",
      description: "Shiva was the driving force behind the project, leading the development of core features, architecting the component structure, and implementing state management.",
      photo: "./shiva-photo.png",
      github: "https://github.com/ShivaMahaur1",
      linkedin: "https://www.linkedin.com/in/shiva-mahaur-914063356/",
      email: "shivamahaur714@gmail.com",
    },
    {
      name: "Sachin Kumar",
      role: "UI/UX Designer & Frontend Developer",
      description: "Sachin was responsible for the stunning visual design and user experience. He crafted the responsive layouts and ensured a seamless, intuitive interface.",
      photo: "sachin.jpeg",
      github: "https://github.com/sachin1082",
      linkedin: "https://www.linkedin.com/in/sachin-kumar-843b713a2",
      email: "imsachin5411@gmail.com",
    },
    {
      name: "Sarthak Swami",
      role: "Backend Integration & API Specialist",
      description: "Sarthak focused on the data layer, managing API integrations, handling data fetching logic, and ensuring the application's data flow was efficient and reliable.",
      photo: "sarthak.jpeg",
      github: "https://share.google/7bNdOoCzKsTXG8Gto",
      linkedin: "https://linkedin.com/in/sarthak-swami",
      email: "sarthakswami555@gmail.com",
    },
  ];

  // --- Tech Stack Data (Updated with Node and Express) ---
  const techStack = [
    { name: "React", icon: <FaReact className="text-5xl text-cyan-400" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-5xl text-green-500" /> },
    { name: "Express.js", icon: <SiExpress className="text-5xl text-gray-100" /> }, // CORRECT ICON
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-5xl text-cyan-500" /> },
    { name: "JavaScript ES6+", icon: <FaJsSquare className="text-5xl text-yellow-400" /> },
    { name: "React Router", icon: <FaReact className="text-5xl text-red-400" /> },
    { name: "JWT Auth", icon: <SiJsonwebtokens className="text-5xl" /> },
  ];

  return (
    <div>
      {/* --- Hero Section --- */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">About EstateHub</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            A modern real estate platform built by a passionate team of developers.
          </p>
        </div>
      </section>

      {/* --- Project Description Section --- */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                EstateHub was conceived as a final year college project to demonstrate our skills in modern web development. Our mission was to create a full-featured, intuitive, and visually appealing platform that simplifies the real estate search process, connecting users with their dream properties.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-dark mb-4">The Project</h2>
              <p className="text-gray-700 leading-relaxed">
                This website is a testament to our collaborative effort and technical expertise. Built from the ground up using the MERN stack principles for the frontend, it showcases a dynamic single-page application (SPA) with component-based architecture, efficient state management, and a polished user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMPROVED The Team Section --- */}
      <section ref={sectionRef} className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
              The Creators
            </span>
            <h2 className="text-4xl font-bold text-dark">Meet Our Team</h2>
            <p className="mt-4 text-xl text-gray-600">The talented students behind EstatePro.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <img src={member.photo} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-dark">{member.name}</h3>
                  <p className="text-secondary font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4 text-sm">{member.description}</p>
                  <div className="flex justify-center space-x-4">
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" title="GitHub">
                      <FaGithub className="text-2xl" />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors" title="LinkedIn">
                      <FaLinkedin className="text-2xl" />
                    </a>
                    <a href={member.email} className="text-gray-400 hover:text-red-600 transition-colors" title="Email">
                      <FaEnvelope className="text-2xl" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Tech Stack Section --- */}
      <section className="py-16 bg-dark text-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Technologies We Used</h2>
          <p className="text-xl text-gray-400 mb-12">Built with a modern and powerful tech stack.</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className={`transform transition-all duration-700 ease-out hover:scale-110 ${
                  visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center">
                  {tech.icon}
                  <p className="mt-2 text-sm font-semibold">{tech.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
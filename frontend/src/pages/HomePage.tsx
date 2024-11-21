import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaCalendarAlt, FaHospitalUser, FaBuilding } from 'react-icons/fa';
import { HiOutlineArrowRight } from 'react-icons/hi';
import Logo from "@/assets/logo.svg";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img src={Logo} alt="Ubuzima Connect Logo" className="h-8 w-auto" />
          </div>
          <div className="flex items-center space-x-4">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
            <Link to="/signup" className="bg-[#1F58E7] text-white px-4 py-2 rounded-md hover:bg-[#1A4AC2] transition-colors">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Streamline Your Healthcare Management
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ubuzima Connect provides a comprehensive platform for managing appointments, patients, doctors, and departments all in one place.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center bg-[#1F58E7] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#1A4AC2] transition-colors"
            >
              Get Started
              <HiOutlineArrowRight className="ml-2" />
            </Link>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<FaCalendarAlt className="text-[#1F58E7] text-4xl mb-4" />}
                title="Appointment Management"
                description="Easily schedule and manage appointments for patients and doctors."
              />
              <FeatureCard
                icon={<FaHospitalUser className="text-[#1F58E7] text-4xl mb-4" />}
                title="Patient Records"
                description="Securely store and access patient information and medical history."
              />
              <FeatureCard
                icon={<FaUserMd className="text-[#1F58E7] text-4xl mb-4" />}
                title="Doctor Profiles"
                description="Manage doctor information, specialties, and availability."
              />
              <FeatureCard
                icon={<FaBuilding className="text-[#1F58E7] text-4xl mb-4" />}
                title="Department Organization"
                description="Organize and oversee various hospital departments efficiently."
              />
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="Ubuzima Connect has revolutionized how we manage our healthcare facility. It's intuitive and efficient!"
                author="Dr. Sarah Johnson"
                role="Hospital Administrator"
              />
              <TestimonialCard
                quote="The appointment management system is a game-changer. It's saved us countless hours and improved patient satisfaction."
                author="Mark Thompson"
                role="Clinic Manager"
              />
              <TestimonialCard
                quote="As a doctor, having all patient information at my fingertips has greatly improved my ability to provide quality care."
                author="Dr. Emily Chen"
                role="General Practitioner"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img src={Logo} alt="Ubuzima Connect Logo" className="h-8 w-auto" />
            <p className="mt-2 text-sm text-gray-400">© 2023 Ubuzima Connect. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      {icon}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <div className="font-semibold text-gray-900">{author}</div>
      <div className="text-sm text-gray-500">{role}</div>
    </div>
  );
};

export default LandingPage;


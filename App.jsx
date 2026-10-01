import React, { useState, useEffect } from 'react';
import { presetDoctors } from './data/presetDoctors';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import ExperienceSection from './components/ExperienceSection';
import ServicesSection from './components/ServicesSection';
import ScheduleSection from './components/ScheduleSection';
import PublicationsSection from './components/PublicationsSection';
import TestimonialsSection from './components/TestimonialsSection';
import AppointmentModal from './components/AppointmentModal';
import CVModal from './components/CVModal';
import AdminPanel from './components/AdminPanel';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import { Sliders } from 'lucide-react';

export default function App() {
  const [activeDoctor, setActiveDoctor] = useState(presetDoctors[0]);
  const [activePalette, setActivePalette] = useState('teal');
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [initialService, setInitialService] = useState('');
  const [initialLocation, setInitialLocation] = useState('');

  const handleOpenAppointment = (serviceOrLocation = '') => {
    if (serviceOrLocation) {
      if (activeDoctor.practiceLocations.some(l => l.hospitalName === serviceOrLocation)) {
        setInitialLocation(serviceOrLocation);
        setInitialService('');
      } else {
        setInitialService(serviceOrLocation);
        setInitialLocation('');
      }
    } else {
      setInitialService('');
      setInitialLocation('');
    }
    setIsAppointmentOpen(true);
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900 transition-colors duration-300">
      
      {/* Sticky Header Navigation */}
      <Navbar
        doctorData={activeDoctor}
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* Main Portfolio Sections */}
      <main>
        <Hero
          doctorData={activeDoctor}
          onOpenAppointment={() => handleOpenAppointment()}
          onOpenCV={() => setIsCVOpen(true)}
        />

        <AboutSection doctorData={activeDoctor} />

        <EducationSection doctorData={activeDoctor} />

        <ExperienceSection doctorData={activeDoctor} />

        <ServicesSection
          doctorData={activeDoctor}
          onOpenAppointment={handleOpenAppointment}
        />

        <ScheduleSection
          doctorData={activeDoctor}
          onOpenAppointment={handleOpenAppointment}
        />

        {activeDoctor.publications && activeDoctor.publications.length > 0 && (
          <PublicationsSection doctorData={activeDoctor} />
        )}

        {activeDoctor.testimonials && activeDoctor.testimonials.length > 0 && (
          <TestimonialsSection doctorData={activeDoctor} />
        )}
      </main>

      {/* Footer */}
      <Footer
        doctorData={activeDoctor}
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* Interactive Modals */}
      <AppointmentModal
        doctorData={activeDoctor}
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        initialService={initialService}
        initialLocation={initialLocation}
      />

      <CVModal
        doctorData={activeDoctor}
        isOpen={isCVOpen}
        onClose={() => setIsCVOpen(false)}
      />

      <AdminPanel
        activeDoctor={activeDoctor}
        onUpdateDoctor={(updatedDoc) => setActiveDoctor(updatedDoc)}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Floating WhatsApp Button (Bottom Right) */}
      <FloatingWhatsApp doctorData={activeDoctor} />

      {/* Floating Super Admin Panel Trigger (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 no-print flex items-center gap-2">
        <button
          onClick={() => setIsAdminOpen(!isAdminOpen)}
          className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-teal-400 font-bold text-xs shadow-2xl border border-slate-700/80 transition-all hover:scale-105 active:scale-95 group"
        >
          <div className="p-1.5 rounded-xl bg-teal-500/20 text-teal-400 group-hover:rotate-45 transition-transform">
            <Sliders className="w-4 h-4" />
          </div>
          <span>Super Admin Generator</span>
          <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-[10px] text-teal-300 font-extrabold uppercase">
            Live
          </span>
        </button>
      </div>

    </div>
  );
}

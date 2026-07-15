import React, { useState, useEffect, useRef } from 'react';
import { 
  Hammer, 
  Wrench, 
  Layout, 
  Star, 
  Shield, 
  Clock, 
  Compass, 
  Phone, 
  Mail, 
  MapPin, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  Send, 
  Sparkles, 
  MessageSquare, 
  Plus, 
  Trash2, 
  LogIn, 
  LogOut, 
  Settings as SettingsIcon, 
  Users, 
  Image as ImageIcon, 
  Menu, 
  X, 
  ArrowRight, 
  Layers, 
  IndianRupee,
  Activity,
  Briefcase,
  CheckCircle,
  FileText
} from 'lucide-react';
import { 
  initialServices, 
  initialProjects, 
  initialGallery, 
  initialTestimonials, 
  initialEnquiries, 
  initialMessages, 
  defaultSettings, 
  Service, 
  Project, 
  Testimonial, 
  Enquiry, 
  Message, 
  BusinessSettings 
} from './data/mockData';

export default function App() {
  // Public state
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('All');
  const [sliderRatio, setSliderRatio] = useState<number>(50);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [testimonialIndex, setTestimonialIndex] = useState<number>(0);

  // Dynamic cost estimator state
  const [estType, setEstType] = useState<string>('modular-kitchen');
  const [estArea, setEstArea] = useState<number>(120);
  const [estQuality, setEstQuality] = useState<string>('premium');
  const [estName, setEstName] = useState<string>('');
  const [estPhone, setEstPhone] = useState<string>('');
  const [estLocation, setEstLocation] = useState<string>('');
  const [estimatorSuccess, setEstimatorSuccess] = useState<boolean>(false);

  // Contact form state
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactMsg, setContactMsg] = useState<string>('');
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  // Persistent-like state (re-synced dynamically)
  const [services, setServices] = useState<Service[]>(initialServices);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [gallery, setGallery] = useState<string[]>(initialGallery);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [settings, setSettings] = useState<BusinessSettings>(defaultSettings);

  // Admin state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminUsername, setAdminUsername] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [adminError, setAdminError] = useState<string>('');
  const [adminActiveTab, setAdminActiveTab] = useState<string>('overview');

  // Admin Form creation states
  const [newProjTitle, setNewProjTitle] = useState<string>('');
  const [newProjCat, setNewProjCat] = useState<string>('Kitchen');
  const [newProjImg, setNewProjImg] = useState<string>('');
  const [newProjLoc, setNewProjLoc] = useState<string>('');
  const [newProjBudget, setNewProjBudget] = useState<string>('');
  const [newProjSpecs, setNewProjSpecs] = useState<string>('');

  const [newGalImg, setNewGalImg] = useState<string>('');

  // Refs for drag handle
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  // Animated counters state (triggered on load)
  const [expCount, setExpCount] = useState<number>(0);
  const [projCount, setProjCount] = useState<number>(0);
  const [famCount, setFamCount] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);

  useEffect(() => {
    if (currentPage === 'home') {
      const expTimer = setInterval(() => {
        setExpCount(prev => (prev < 20 ? prev + 1 : 20));
      }, 50);
      const projTimer = setInterval(() => {
        setProjCount(prev => (prev < 500 ? prev + 15 : 500));
      }, 15);
      const famTimer = setInterval(() => {
        setFamCount(prev => (prev < 200 ? prev + 6 : 200));
      }, 20);
      const reviewTimer = setInterval(() => {
        setReviewCount(prev => (prev < 100 ? prev + 3 : 100));
      }, 25);

      return () => {
        clearInterval(expTimer);
        clearInterval(projTimer);
        clearInterval(famTimer);
        clearInterval(reviewTimer);
      };
    }
  }, [currentPage]);

  // Autoplay testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Handle slider interaction
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderRatio(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleSliderMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleSliderMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  // Live dynamic cost estimator calculations
  const calculateEstimate = () => {
    let basePricePerUnit = 1200; // per sq ft / unit
    if (estType === 'modular-kitchen') basePricePerUnit = 2800;
    else if (estType === 'wardrobes') basePricePerUnit = 2200;
    else if (estType === 'false-ceiling') basePricePerUnit = 110;
    else if (estType === 'tv-units') basePricePerUnit = 250;
    else if (estType === 'wood-flooring') basePricePerUnit = 180;

    let multiplier = 1.0;
    if (estQuality === 'premium') multiplier = 1.4;
    else if (estQuality === 'elite') multiplier = 1.9;

    const total = estArea * basePricePerUnit * multiplier;
    return Math.round(total);
  };

  // Submit quote enquiry
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!estName || !estPhone) return;

    const newEnq: Enquiry = {
      id: "enq-" + (enquiries.length + 1),
      name: estName,
      phone: estPhone,
      location: estLocation || "Not provided",
      projectType: services.find(s => s.id === estType)?.name || estType,
      budget: "₹" + calculateEstimate().toLocaleString('en-IN') + " (Est.)",
      requirements: `Area: ${estArea} units, Quality Tier: ${estQuality.toUpperCase()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'New'
    };

    setEnquiries([newEnq, ...enquiries]);
    setEstimatorSuccess(true);
    setEstName('');
    setEstPhone('');
    setEstLocation('');
  };

  // Submit contact message
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !contactMsg) return;

    const newMsg: Message = {
      id: "msg-" + (messages.length + 1),
      name: contactName,
      email: contactEmail || "Not provided",
      phone: contactPhone,
      text: contactMsg,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'Unread'
    };

    setMessages([newMsg, ...messages]);
    setContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactMsg('');
  };

  // Admin login process
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername === 'admin' && adminPassword === 'admin123') {
      setIsAdminLoggedIn(true);
      setCurrentPage('admin-dashboard');
      setAdminError('');
    } else {
      setAdminError('Invalid credentials. Use admin / admin123 for demo.');
    }
  };

  // Admin actions
  const handleDeleteEnquiry = (id: string) => {
    setEnquiries(enquiries.filter(e => e.id !== id));
  };

  const handleUpdateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    setEnquiries(enquiries.map(e => e.id === id ? { ...e, status } : e));
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const handleUpdateMessageStatus = (id: string, status: Message['status']) => {
    setMessages(messages.map(m => m.id === id ? { ...m, status } : m));
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle || !newProjImg) return;

    const newProj: Project = {
      id: "proj-" + (projects.length + 1),
      title: newProjTitle,
      category: newProjCat,
      image: newProjImg,
      location: newProjLoc || "On-site",
      budget: newProjBudget || "Custom",
      specs: newProjSpecs || "Standard raw materials"
    };

    setProjects([newProj, ...projects]);
    setNewProjTitle('');
    setNewProjImg('');
    setNewProjLoc('');
    setNewProjBudget('');
    setNewProjSpecs('');
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleAddGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalImg) return;
    setGallery([newGalImg, ...gallery]);
    setNewGalImg('');
  };

  const handleDeleteGalleryImage = (img: string) => {
    setGallery(gallery.filter(g => g !== img));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings updated successfully!");
  };

  const triggerScrollToSection = (sectionId: string) => {
    setCurrentPage('home');
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen sophisticated-dark-bg text-white flex flex-col justify-between" id="top">
      
      {/* GLOWING AMBIENT DECORATIONS */}
      <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-[#C5A059]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[80vh] right-1/4 w-[35rem] h-[35rem] bg-[#8E6D3A]/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* FLOATING ACTION BAR FOR MOBILE / DESKTOP CONTACT */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a 
          href={`tel:${settings.phone}`}
          id="floating-call-btn"
          className="bg-black/60 border border-[#C5A059]/30 text-[#C5A059] p-4 rounded-full shadow-2xl hover:scale-110 duration-300 backdrop-blur-md flex items-center justify-center group"
          title="Call Owner Ranjodh Singh"
        >
          <Phone className="w-6 h-6 group-hover:rotate-12 duration-300" />
        </a>
        <a 
          href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          id="floating-whatsapp-btn"
          className="whatsapp-glow text-white p-4 rounded-full shadow-2xl hover:scale-110 duration-300 flex items-center justify-center group"
          title="WhatsApp Free Estimate"
        >
          <MessageSquare className="w-6 h-6 fill-white group-hover:scale-110 duration-300" />
        </a>
      </div>

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0F0F0F]/85 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div 
            onClick={() => { setCurrentPage('home'); setSelectedService(null); }}
            className="flex items-center gap-3 cursor-pointer group"
            id="brand-logo"
          >
            <div className="bg-gradient-to-br from-[#C5A059] to-[#8E6D3A] p-2.5 rounded-xl shadow-lg shadow-[#C5A059]/10 group-hover:scale-105 duration-300">
              <Hammer className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block uppercase">
                {settings.businessName}
              </span>
              <span className="text-[10px] text-[#C5A059] font-medium tracking-[0.2em] uppercase -mt-1 block">
                {settings.ownerName} • Expert Interior
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest font-medium">
            <button 
              onClick={() => { setCurrentPage('home'); setSelectedService(null); }}
              className={`transition-all hover:text-white ${currentPage === 'home' ? 'text-white font-bold' : 'text-gray-400'}`}
            >
              Home
            </button>
            <button 
              onClick={() => triggerScrollToSection('why-choose-us')}
              className="text-gray-400 transition-all hover:text-white"
            >
              About
            </button>
            <button 
              onClick={() => { setCurrentPage('services'); setSelectedService(null); }}
              className={`transition-all hover:text-white ${currentPage === 'services' ? 'text-white font-bold' : 'text-gray-400'}`}
            >
              Services
            </button>
            <button 
              onClick={() => { setCurrentPage('projects'); setSelectedService(null); }}
              className={`transition-all hover:text-white ${currentPage === 'projects' ? 'text-white font-bold' : 'text-gray-400'}`}
            >
              Projects
            </button>
            <button 
              onClick={() => { setCurrentPage('gallery'); setSelectedService(null); }}
              className={`transition-all hover:text-white ${currentPage === 'gallery' ? 'text-white font-bold' : 'text-gray-400'}`}
            >
              Gallery
            </button>
            <button 
              onClick={() => { setCurrentPage('testimonials'); setSelectedService(null); }}
              className={`transition-all hover:text-white ${currentPage === 'testimonials' ? 'text-white font-bold' : 'text-gray-400'}`}
            >
              Reviews
            </button>
            <button 
              onClick={() => { setCurrentPage('contact'); setSelectedService(null); }}
              className={`transition-all hover:text-white ${currentPage === 'contact' ? 'text-white font-bold' : 'text-gray-400'}`}
            >
              Contact
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => { setCurrentPage('quote'); setSelectedService(null); }}
              className="px-6 py-2 border border-[#C5A059] text-[#C5A059] rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059] hover:text-black transition-all"
              id="header-quote-btn"
            >
              Request Quote
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 duration-200"
            id="mobile-menu-toggle"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0F0F0F] border-b border-white/10 py-6 px-6 flex flex-col gap-5 animate-fade-in" id="mobile-menu-drawer">
            <button 
              onClick={() => { setCurrentPage('home'); setSelectedService(null); setIsMenuOpen(false); }}
              className={`text-left text-base font-semibold ${currentPage === 'home' ? 'text-[#C5A059]' : 'text-gray-300'}`}
            >
              Home
            </button>
            <button 
              onClick={() => triggerScrollToSection('why-choose-us')}
              className="text-left text-base font-semibold text-gray-300"
            >
              About
            </button>
            <button 
              onClick={() => { setCurrentPage('services'); setSelectedService(null); setIsMenuOpen(false); }}
              className={`text-left text-base font-semibold ${currentPage === 'services' ? 'text-[#C5A059]' : 'text-gray-300'}`}
            >
              Services
            </button>
            <button 
              onClick={() => { setCurrentPage('projects'); setSelectedService(null); setIsMenuOpen(false); }}
              className={`text-left text-base font-semibold ${currentPage === 'projects' ? 'text-[#C5A059]' : 'text-gray-300'}`}
            >
              Projects
            </button>
            <button 
              onClick={() => { setCurrentPage('gallery'); setSelectedService(null); setIsMenuOpen(false); }}
              className={`text-left text-base font-semibold ${currentPage === 'gallery' ? 'text-[#C5A059]' : 'text-gray-300'}`}
            >
              Gallery
            </button>
            <button 
              onClick={() => { setCurrentPage('testimonials'); setSelectedService(null); setIsMenuOpen(false); }}
              className={`text-left text-base font-semibold ${currentPage === 'testimonials' ? 'text-[#C5A059]' : 'text-gray-300'}`}
            >
              Reviews
            </button>
            <button 
              onClick={() => { setCurrentPage('contact'); setSelectedService(null); setIsMenuOpen(false); }}
              className={`text-left text-base font-semibold ${currentPage === 'contact' ? 'text-[#C5A059]' : 'text-gray-300'}`}
            >
              Contact
            </button>
            <button 
              onClick={() => { setCurrentPage('quote'); setSelectedService(null); setIsMenuOpen(false); }}
              className="w-full py-3 rounded-full border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-black font-semibold text-center flex items-center justify-center gap-2 duration-200"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* MAIN VIEW CONTROLLER */}
      <main className="flex-grow">
        
        {/* ========================================================= */}
        {/* VIEW 1: HOME PAGE */}
        {/* ========================================================= */}
        {currentPage === 'home' && (
          <div className="animate-fade-in">
            
            {/* HERO SECTION */}
            <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-6 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80" 
                  alt="Luxury wooden interior lounge" 
                  className="w-full h-full object-cover opacity-25 scale-105 animate-pulse-slow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                  <span className="w-2 h-2 bg-[#C5A059] rounded-full animate-pulse"></span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-300 font-medium">
                    Award Winning Interior Studio
                  </span>
                </div>

                <h1 className="text-[60px] md:text-[80px] leading-[0.95] font-bold tracking-tighter text-white mb-6 uppercase">
                  Transform <br/>
                  <span className="gold-text-gradient">
                    Your Home
                  </span><br/>
                  Into Luxury
                </h1>

                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                  Bespoke Modular Kitchens, Designer Wardrobes, and Custom Woodwork hand-crafted by owner <span className="text-[#C5A059] font-medium">{settings.ownerName}</span> with a 20-Year Heritage.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => setCurrentPage('quote')}
                    className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-bold text-sm flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300"
                    id="hero-quote-btn"
                  >
                    <span>📞 Call Ranjodh Singh</span>
                  </button>
                  <a 
                    href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=Hi%20Ranjodh%2C%20I%27m%20interested%20in%20modular%20interior%20work.%20Please%20contact%20me.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(37,211,102,0.2)]"
                    id="hero-whatsapp-btn"
                  >
                    <span>💬 WhatsApp</span>
                  </a>
                </div>

                {/* SCROLL INDICATOR */}
                <div 
                  onClick={() => triggerScrollToSection('statistics')}
                  className="mt-16 inline-flex flex-col items-center gap-2 text-gray-500 hover:text-white duration-300 cursor-pointer"
                >
                  <span className="text-xs uppercase tracking-widest font-semibold">Discover Heritage</span>
                  <div className="w-6 h-10 border-2 border-white/10 rounded-full flex justify-center py-2">
                    <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* STATISTICS SECTION */}
            <section className="bg-black/40 py-16 border-y border-white/10" id="statistics">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                  <div className="text-center">
                    <span className="block text-4xl md:text-6xl font-black text-[#C5A059] mb-2">
                      {expCount}+
                    </span>
                    <span className="text-sm font-medium uppercase tracking-widest text-gray-400">
                      Years Experience
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block text-4xl md:text-6xl font-black text-white mb-2">
                      {projCount}+
                    </span>
                    <span className="text-sm font-medium uppercase tracking-widest text-gray-400">
                      Projects Completed
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block text-4xl md:text-6xl font-black text-[#C5A059] mb-2">
                      {famCount}+
                    </span>
                    <span className="text-sm font-medium uppercase tracking-widest text-gray-400">
                      Happy Families
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-[#C5A059] mb-2">
                      <Star className="w-6 h-6 fill-[#C5A059] stroke-[#C5A059]" />
                      <Star className="w-6 h-6 fill-[#C5A059] stroke-[#C5A059]" />
                      <Star className="w-6 h-6 fill-[#C5A059] stroke-[#C5A059]" />
                      <Star className="w-6 h-6 fill-[#C5A059] stroke-[#C5A059]" />
                      <Star className="w-6 h-6 fill-[#C5A059] stroke-[#C5A059]" />
                    </div>
                    <span className="block text-xl font-bold text-white uppercase tracking-wider">
                      5 Star Rated
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
                      On Google Review
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SERVICES PREVIEW */}
            <section className="py-24 px-6 relative">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
                  <div>
                    <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest block mb-2">
                      Our Specializations
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
                      Artisanal Woodwork & Renovation
                    </h2>
                  </div>
                  <button 
                    onClick={() => setCurrentPage('services')}
                    className="text-[#C5A059] font-semibold hover:text-[#F1D592] flex items-center gap-2 group duration-200"
                  >
                    <span>View All Services</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 duration-200" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.slice(0, 6).map((srv) => (
                    <div 
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className="bg-luxury-card bg-luxury-card-hover rounded-3xl overflow-hidden group duration-300 cursor-pointer flex flex-col justify-between hover:translate-y-[-4px] glow-card"
                      id={`srv-card-${srv.id}`}
                    >
                      <div>
                        <div className="relative h-64 overflow-hidden">
                          <img 
                            src={srv.image} 
                            alt={srv.name} 
                            className="w-full h-full object-cover group-hover:scale-105 duration-500"
                          />
                          <div className="absolute top-4 left-4 bg-black/80 border border-[#C5A059]/30 backdrop-blur-md text-[#C5A059] text-xs font-bold px-3 py-1.5 rounded-full">
                            Starting {srv.priceRange.split(' - ')[0]}
                          </div>
                        </div>
                        <div className="p-8">
                          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#C5A059] duration-200 uppercase">
                            {srv.name}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {srv.description}
                          </p>
                        </div>
                      </div>
                      <div className="p-8 pt-0 flex items-center justify-between border-t border-white/5 mt-auto">
                        <span className="text-xs text-gray-500 font-medium">Click to see specs & materials</span>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#C5A059] group-hover:text-black duration-300 flex items-center justify-center text-gray-400">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* MASONRY HERO - DYNAMIC BEFORE & AFTER COMPARISON */}
            <section className="py-24 px-6 bg-black/20 relative">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest block mb-2">
                    Visual Evidence of Quality
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 uppercase">
                    The Art of Transformation
                  </h2>
                  <p className="text-gray-400 text-base max-w-2xl mx-auto font-light">
                    Drag the gold slider handle to witness the extreme difference between a raw structural layout (Before) and our premium hand-crafted wooden renovation (After).
                  </p>
                </div>

                {/* THE BEFORE-AFTER SLIDER */}
                <div 
                  ref={sliderContainerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchMove={handleTouchMove}
                  className="relative h-[450px] w-full rounded-3xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl"
                  id="before-after-slider"
                >
                  {/* BEFORE STATE (Underneath layer) */}
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80" 
                      alt="Before renovation" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-6 left-6 bg-[#0F0F0F]/80 backdrop-blur-md px-4 py-2 rounded-xl text-gray-400 text-sm font-semibold border border-white/10">
                      Before (Bare Wall Frame)
                    </div>
                  </div>

                  {/* AFTER STATE (Sliding overlay layer) */}
                  <div 
                    className="absolute inset-0 z-10 overflow-hidden"
                    style={{ width: `${sliderRatio}%` }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80" 
                      alt="After premium carpentry" 
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ width: sliderContainerRef.current?.getBoundingClientRect().width }}
                    />
                    <div className="absolute bottom-6 left-6 bg-[#C5A059] text-black px-4 py-2 rounded-xl text-sm font-black shadow-lg">
                      After (Premium Carpenter Hub Fitted Woodwork)
                    </div>
                  </div>

                  {/* SLIDER SEPARATOR LINE AND HANDLE */}
                  <div 
                    className="absolute top-0 bottom-0 z-20 w-1 bg-gradient-to-b from-[#C5A059] to-[#8E6D3A] cursor-ew-resize"
                    style={{ left: `${sliderRatio}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-[#0F0F0F] border-2 border-[#C5A059] rounded-full flex items-center justify-between px-2.5 text-[#C5A059] shadow-2xl">
                      <ChevronLeft className="w-4 h-4 text-[#C5A059]" />
                      <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center bg-white/5 p-5 rounded-2xl border border-white/10 text-xs text-gray-400">
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#C5A059]" /> 
                    100% termite proof calibrated ply.
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                    Completed in 15 working days.
                  </span>
                </div>
              </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="py-24 px-6 relative border-t border-white/10" id="why-choose-us">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest block mb-2">
                      Owner's Commitment
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 uppercase">
                      Bespoke Master Craftsmanship By Ranjodh Singh
                    </h2>
                    <p className="text-gray-300 text-base leading-relaxed mb-8 font-light">
                      At Carpenter Hub, we do not outsource your family's dream to amateur sub-contractors. Every blueprint is reviewed and signed off by Ranjodh Singh personally. We select only premium IS-certified waterproof hardwood, robust multi-coat anti-bacterial PU lacquer, and state-of-the-art hydraulic fittings that last for decades.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#C5A059]/10 p-2.5 rounded-xl border border-[#C5A059]/20 mt-1">
                          <Shield className="w-5 h-5 text-[#C5A059]" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1 uppercase text-sm tracking-wider">Premium Materials Only</h4>
                          <p className="text-gray-400 text-xs">Calibrated HDMR, Century Marine Ply, Duro Veneers.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-[#C5A059]/10 p-2.5 rounded-xl border border-[#C5A059]/20 mt-1">
                          <Clock className="w-5 h-5 text-[#C5A059]" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1 uppercase text-sm tracking-wider">Strict Delivery Deadlines</h4>
                          <p className="text-gray-400 text-xs">Liquidated damages if your modular kitchen delays.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-[#C5A059]/10 p-2.5 rounded-xl border border-[#C5A059]/20 mt-1">
                          <IndianRupee className="w-5 h-5 text-[#C5A059]" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1 uppercase text-sm tracking-wider">Transparent Pricing</h4>
                          <p className="text-gray-400 text-xs">Itemized quote with zero hidden charges or revisions.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-[#C5A059]/10 p-2.5 rounded-xl border border-[#C5A059]/20 mt-1">
                          <Compass className="w-5 h-5 text-[#C5A059]" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1 uppercase text-sm tracking-wider">Latest Global Designs</h4>
                          <p className="text-gray-400 text-xs">German minimalist concepts and handleless setups.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    {/* Visual overlapping collage */}
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80" 
                        alt="Carpenter Hub carpentry workspace" 
                        className="w-full h-[500px] object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent"></div>
                      <div className="absolute bottom-8 left-8 right-8 bg-[#0F0F0F]/90 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl text-left">
                        <h4 className="text-[#C5A059] font-black text-xl mb-1 uppercase">"Quality is not an accident."</h4>
                        <p className="text-gray-300 text-xs leading-relaxed font-light">
                          "We work with seasoned timber and precise joinery to ensure every wardrobe drawer, kitchen slider, and ceiling panel stays absolutely flawless for 20+ years."
                        </p>
                        <span className="block text-right text-xs font-bold text-white mt-4">— Ranjodh Singh, Owner</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: SERVICES DIRECTORY */}
        {/* ========================================================= */}
        {currentPage === 'services' && (
          <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest block mb-2">
                What We Do
              </span>
              <h1 className="text-5xl font-black tracking-tight text-white mb-4 uppercase">
                Premium Carpentry & Design Catalog
              </h1>
              <p className="text-gray-400 text-base max-w-2xl mx-auto font-light">
                Explore our modular systems and bespoke wooden creations. Every service includes material warranty certificates and dynamic architectural designs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {services.map((srv) => (
                <div 
                  key={srv.id}
                  className="bg-luxury-card bg-luxury-card-hover rounded-3xl overflow-hidden flex flex-col sm:flex-row group duration-300 shadow-xl"
                  id={`srv-row-${srv.id}`}
                >
                  <div className="sm:w-2/5 relative min-h-[250px]">
                    <img 
                      src={srv.image} 
                      alt={srv.name} 
                      className="w-full h-full object-cover group-hover:scale-102 duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#C5A059] text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      Starting {srv.priceRange.split(' - ')[0]}
                    </div>
                  </div>
                  <div className="p-8 sm:w-3/5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#C5A059] duration-200 uppercase">
                        {srv.name}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed mb-4 font-light">
                        {srv.longDescription}
                      </p>

                      <div className="mb-6">
                        <span className="block text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-1.5">Materials:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {srv.materials.map((m, i) => (
                            <span key={i} className="text-[10px] bg-black/40 text-gray-300 border border-white/10 px-2 py-0.5 rounded-md">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                      <div>
                        <span className="block text-[10px] text-gray-500 uppercase font-semibold">Delivery Time</span>
                        <span className="text-xs text-gray-200 font-bold">{srv.duration}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedService(srv)}
                        className="text-xs font-bold text-[#C5A059] hover:text-[#F1D592] flex items-center gap-1 group"
                      >
                        <span>Specifications</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 duration-200" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: PROJECTS MASONRY */}
        {/* ========================================================= */}
        {currentPage === 'projects' && (
          <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest block mb-2">
                Our Work Portfolio
              </span>
              <h1 className="text-5xl font-black tracking-tight text-white mb-4 uppercase">
                Recently Delivered Masterpieces
              </h1>
              <p className="text-gray-400 text-base max-w-2xl mx-auto font-light">
                Filter through our luxury bedroom, living, kitchen and commercial fittings. Witness real site executions with exact specifications.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['All', 'Kitchen', 'Bedroom', 'Living Room', 'Office', 'Restaurant', 'Hotel'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                    projectFilter === cat 
                      ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-lg shadow-[#C5A059]/10' 
                      : 'bg-white/5 text-gray-400 border-white/5 hover:border-[#C5A059]/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry layout (simulated beautiful grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .filter(p => projectFilter === 'All' || p.category === projectFilter)
                .map((proj) => (
                  <div 
                    key={proj.id}
                    className="bg-luxury-card bg-luxury-card-hover rounded-3xl overflow-hidden group duration-300 flex flex-col justify-between"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img 
                        src={proj.image} 
                        alt={proj.title} 
                        className="w-full h-full object-cover group-hover:scale-105 duration-500"
                      />
                      <div className="absolute bottom-4 left-4 bg-[#0F0F0F]/90 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/10 text-xs text-[#C5A059] font-bold">
                        {proj.category}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C5A059] duration-200 uppercase">
                          {proj.title}
                        </h3>
                        <p className="text-gray-400 text-xs flex items-center gap-1.5 mb-4">
                          <MapPin className="w-3.5 h-3.5 text-gray-500" />
                          <span>{proj.location}</span>
                        </p>
                        <div className="bg-black/40 p-4 rounded-2xl border border-white/5 mb-6 text-[11px] text-gray-300 flex flex-col gap-1.5">
                          <div>
                            <span className="text-gray-500 font-medium">Fittings & Specs:</span> {proj.specs}
                          </div>
                          <div>
                            <span className="text-gray-500 font-medium">Final Investment:</span> <span className="text-[#C5A059] font-bold">{proj.budget}</span>
                          </div>
                        </div>
                      </div>

                      <a 
                        href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=Hi%20Ranjodh%20Singh%2C%20I%20saw%20your%20project%20%22${proj.title}%22%20and%20want%20a%20similar%20design.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-[#C5A059] hover:text-black text-xs font-bold text-gray-300 text-center transition-all duration-300 block hover:border-transparent"
                      >
                        Ask pricing for similar design
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 4: GALLERY */}
        {/* ========================================================= */}
        {currentPage === 'gallery' && (
          <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest block mb-2">
                Sight Showcase
              </span>
              <h1 className="text-5xl font-black tracking-tight text-white mb-4 uppercase">
                The Woodcraft Design Vault
              </h1>
              <p className="text-gray-400 text-base max-w-2xl mx-auto font-light">
                Explore real finished products. High resolution captures of closets, kitchens, designer beds, ceilings and fluted profiles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gallery.map((imgUrl, i) => (
                <div 
                  key={i}
                  className="relative rounded-2xl overflow-hidden group border border-white/10 hover:border-[#C5A059]/40 duration-300 h-64 shadow-lg cursor-pointer"
                >
                  <img 
                    src={imgUrl} 
                    alt="Bespoke furniture setup" 
                    className="w-full h-full object-cover group-hover:scale-105 duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 duration-300 flex items-center justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] border border-[#C5A059]/30 px-4 py-2 rounded-full backdrop-blur-md">
                      Interactive View
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 5: TESTIMONIALS */}
        {/* ========================================================= */}
        {currentPage === 'testimonials' && (
          <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest block mb-2">
                Client Gratitude
              </span>
              <h1 className="text-5xl font-black tracking-tight text-white mb-4 uppercase">
                What Happy Families Say
              </h1>
              <p className="text-gray-400 text-base max-w-2xl mx-auto font-light">
                Real feedback from our premium residential and commercial clients across Punjab, Chandigarh, and Himachal.
              </p>
            </div>

            {/* Premium slider block */}
            <div className="max-w-4xl mx-auto bg-luxury-card border border-white/10 p-8 md:p-16 rounded-3xl relative shadow-2xl overflow-hidden glow-card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full border-2 border-[#C5A059] p-1 mb-8 overflow-hidden shadow-xl shadow-[#C5A059]/10">
                  <img 
                    src={testimonials[testimonialIndex].image} 
                    alt={testimonials[testimonialIndex].name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div className="flex items-center gap-1 text-[#C5A059] mb-6">
                  {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-[#C5A059] stroke-[#C5A059]" />
                  ))}
                </div>

                <p className="text-lg md:text-2xl text-gray-200 italic font-light leading-relaxed max-w-2xl mb-8">
                  "{testimonials[testimonialIndex].text}"
                </p>

                <div>
                  <h4 className="text-xl font-bold text-white uppercase">
                    {testimonials[testimonialIndex].name}
                  </h4>
                  <span className="text-xs font-semibold text-[#C5A059] uppercase tracking-widest block mt-1">
                    {testimonials[testimonialIndex].role}
                  </span>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
                <button
                  onClick={() => setTestimonialIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="p-3 bg-black/40 border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-[#C5A059]/40 hover:scale-105 duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setTestimonialIndex(idx)}
                      className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${testimonialIndex === idx ? 'w-6 bg-[#C5A059]' : 'w-2 bg-white/10'}`}
                    ></div>
                  ))}
                </div>

                <button
                  onClick={() => setTestimonialIndex(prev => (prev + 1) % testimonials.length)}
                  className="p-3 bg-black/40 border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-[#C5A059]/40 hover:scale-105 duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 6: CONTACT & MAP */}
        {/* ========================================================= */}
        {currentPage === 'contact' && (
          <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest block mb-2">
                Get In Touch
              </span>
              <h1 className="text-5xl font-black tracking-tight text-white mb-4 uppercase">
                Schedule A Premium Consultation
              </h1>
              <p className="text-gray-400 text-base max-w-2xl mx-auto font-light">
                Visit our showroom/workspace or fill out the message form below to arrange an on-site design inspection.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Form card */}
              <div className="bg-luxury-card border border-white/10 rounded-3xl p-8 md:p-12 shadow-xl relative">
                <h3 className="text-2xl font-bold text-white mb-6 uppercase">Send A Direct Message</h3>

                {contactSuccess ? (
                  <div className="bg-[#C5A059]/10 border border-[#C5A059]/30 p-6 rounded-2xl text-center">
                    <Check className="w-12 h-12 text-[#C5A059] mx-auto mb-4" />
                    <h4 className="text-white font-bold text-lg mb-2">Message Sent Successfully!</h4>
                    <p className="text-gray-300 text-xs">
                      Thank you for contacting Carpenter Hub. Ranjodh Singh will review your query and call you within 2 business hours.
                    </p>
                    <button 
                      onClick={() => setContactSuccess(false)}
                      className="mt-6 text-xs text-[#C5A059] font-bold underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Gurpreet Singh"
                        className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] text-white placeholder-gray-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Phone Number *</label>
                        <input 
                          type="tel" 
                          required
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="e.g. +91 98765 XXXXX"
                          className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] text-white placeholder-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Email Address</label>
                        <input 
                          type="email" 
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="e.g. info@domain.com"
                          className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] text-white placeholder-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Describe Your Interior Needs *</label>
                      <textarea 
                        rows={4}
                        required
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        placeholder="e.g. I need custom wooden slide cupboards for 2 bedrooms and solid teak sofa set design..."
                        className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] text-white placeholder-gray-600 resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="btn-luxury-solid w-full py-4 rounded-xl text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Message & Arrange Callback</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Informational sidebar */}
              <div className="flex flex-col gap-8">
                <div className="bg-luxury-card border border-white/10 rounded-3xl p-8 flex flex-col gap-6">
                  <h3 className="text-2xl font-bold text-white mb-2 uppercase">Corporate Headquarters</h3>

                  <div className="flex items-start gap-4">
                    <div className="bg-black/40 p-2.5 rounded-xl border border-white/10 mt-1">
                      <MapPin className="w-5 h-5 text-[#C5A059]" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-500 uppercase">Showroom Address</span>
                      <p className="text-gray-300 text-sm mt-1 leading-relaxed font-light">
                        {settings.address}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-black/40 p-2.5 rounded-xl border border-white/10 mt-1">
                        <Phone className="w-5 h-5 text-[#C5A059]" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-500 uppercase">Phone & Call</span>
                        <a href={`tel:${settings.phone}`} className="text-gray-300 text-sm hover:text-[#C5A059] mt-1 block">
                          {settings.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-black/40 p-2.5 rounded-xl border border-white/10 mt-1">
                        <Mail className="w-5 h-5 text-[#C5A059]" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-500 uppercase">Email Support</span>
                        <a href={`mailto:${settings.email}`} className="text-gray-300 text-sm hover:text-[#C5A059] mt-1 block">
                          {settings.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-white/5 pt-6 mt-2">
                    <div className="bg-black/40 p-2.5 rounded-xl border border-white/10 mt-1">
                      <Clock className="w-5 h-5 text-[#C5A059]" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-500 uppercase">Business Hours</span>
                      <div className="text-gray-300 text-sm mt-1 leading-relaxed font-light">
                        <p>Mon - Fri: {settings.hoursWeekdays}</p>
                        <p>Sat - Sun: {settings.hoursWeekends}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Stylized Luxury Map */}
                <div className="bg-luxury-card border border-white/10 rounded-3xl overflow-hidden h-[240px] relative">
                  {/* Premium Stylized Map canvas background */}
                  <div className="absolute inset-0 bg-[#0F0F0F] flex flex-col items-center justify-center p-6 text-center select-none">
                    <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] animate-pulse mb-3">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h4 className="text-white font-bold text-sm uppercase">Carpenter Hub Design Showroom</h4>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-semibold">
                      Industrial Area Phase 2, Jalandhar, Punjab
                    </p>
                    
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 px-4 py-2 bg-[#0F0F0F] border border-white/10 text-xs font-bold text-[#C5A059] rounded-lg hover:bg-white/5 duration-200"
                    >
                      Open Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 7: REQUEST QUOTE COST ESTIMATOR */}
        {/* ========================================================= */}
        {currentPage === 'quote' && (
          <div className="max-w-7xl mx-auto px-6 py-20 animate-fade-in">
            <div className="text-center mb-16">
              <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest block mb-2">
                Instant Pricing Analysis
              </span>
              <h1 className="text-5xl font-black tracking-tight text-white mb-4 uppercase">
                Dynamic Project Cost Estimator
              </h1>
              <p className="text-gray-400 text-base max-w-2xl mx-auto font-light">
                Select your parameters below to get a highly accurate baseline estimation for custom modular wood fittings immediately.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Estimator Controls */}
              <div className="lg:col-span-7 bg-luxury-card border border-white/10 rounded-3xl p-8 md:p-12 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-8 uppercase">1. Project Specifications</h3>

                <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-6">
                  
                  {/* Service type Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-3">Select Design Category</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {services.map((s) => (
                        <div 
                          key={s.id}
                          onClick={() => setEstType(s.id)}
                          className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all duration-200 ${
                            estType === s.id 
                              ? 'bg-[#C5A059]/10 border-[#C5A059] text-white shadow-md' 
                              : 'bg-black/40 border-white/10 text-gray-400 hover:border-[#C5A059]/40 hover:text-white'
                          }`}
                        >
                          <span className="block text-xs font-bold tracking-tight">{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Slider of Area / Units */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold uppercase text-gray-400">
                        Approximate Scope / Area Size
                      </label>
                      <span className="text-[#C5A059] font-bold text-sm">
                        {estArea} {estType === 'wood-flooring' || estType === 'false-ceiling' ? 'sq. ft.' : 'Running Feet / Units'}
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="1000" 
                      value={estArea}
                      onChange={(e) => setEstArea(parseInt(e.target.value))}
                      className="w-full accent-[#C5A059] cursor-pointer h-2 bg-[#0F0F0F] rounded-lg border border-white/10"
                    />
                    <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                      <span>10 Units (Small fitted niche)</span>
                      <span>1000 Units (Full Mansion overlay)</span>
                    </div>
                  </div>

                  {/* Wood & Finish Quality Tiers */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-3">Material Quality Tier</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      
                      <div 
                        onClick={() => setEstQuality('standard')}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                          estQuality === 'standard' 
                            ? 'bg-[#C5A059]/10 border-[#C5A059]/60 text-white' 
                            : 'bg-black/40 border-white/10 text-gray-400 hover:border-[#C5A059]/40 hover:text-white'
                        }`}
                      >
                        <span className="block text-xs font-black uppercase tracking-wider text-[#C5A059]">Standard</span>
                        <p className="text-[10px] text-gray-400 mt-1 leading-relaxed font-light">Commercial BWR ply + branded laminates. Anti-termite base coating.</p>
                      </div>

                      <div 
                        onClick={() => setEstQuality('premium')}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                          estQuality === 'premium' 
                            ? 'bg-[#C5A059]/10 border-[#C5A059]/60 text-white' 
                            : 'bg-black/40 border-white/10 text-gray-400 hover:border-[#C5A059]/40 hover:text-white'
                        }`}
                      >
                        <span className="block text-xs font-black uppercase tracking-wider text-[#C5A059]">Premium Choice</span>
                        <p className="text-[10px] text-gray-400 mt-1 leading-relaxed font-light">German Calibrated HDMR board, acrylic/PU finishes, hydraulic hinges.</p>
                      </div>

                      <div 
                        onClick={() => setEstQuality('elite')}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                          estQuality === 'elite' 
                            ? 'bg-[#C5A059]/10 border-[#C5A059]/60 text-white' 
                            : 'bg-black/40 border-white/10 text-gray-400 hover:border-[#C5A059]/40 hover:text-white'
                        }`}
                      >
                        <span className="block text-xs font-black uppercase tracking-wider text-[#C5A059]">Elite Teak / Gloss</span>
                        <p className="text-[10px] text-gray-400 mt-1 leading-relaxed font-light">Solid seasoned A-grade Teak wood framing or BWR Marine board + heavy lacquer.</p>
                      </div>

                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-6 mt-2">
                    <h4 className="text-white font-bold mb-4 text-sm uppercase">2. Enter Contact Details to Lock Free Inspection</h4>

                    {estimatorSuccess ? (
                      <div className="bg-[#C5A059]/10 border border-[#C5A059]/30 p-6 rounded-2xl text-center">
                        <Check className="w-12 h-12 text-[#C5A059] mx-auto mb-3" />
                        <h4 className="text-white font-bold text-lg mb-1">Enquiry Registered!</h4>
                        <p className="text-gray-300 text-xs leading-relaxed font-light">
                          Your quote estimation has been forwarded to Ranjodh Singh. We will call you on the registered phone number shortly.
                        </p>
                        <button 
                          onClick={() => setEstimatorSuccess(false)}
                          className="mt-4 text-xs font-bold text-[#C5A059] hover:underline"
                        >
                          Calculate another quote
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <input 
                              type="text" 
                              required
                              value={estName}
                              onChange={(e) => setEstName(e.target.value)}
                              placeholder="Your Name *"
                              className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] text-white placeholder-gray-600"
                            />
                          </div>
                          <div>
                            <input 
                              type="tel" 
                              required
                              value={estPhone}
                              onChange={(e) => setEstPhone(e.target.value)}
                              placeholder="Phone Number *"
                              className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] text-white placeholder-gray-600"
                            />
                          </div>
                        </div>

                        <div>
                          <input 
                            type="text" 
                            value={estLocation}
                            onChange={(e) => setEstLocation(e.target.value)}
                            placeholder="Your Site Location (e.g. Model Town, Ludhiana)"
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] text-white placeholder-gray-600"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="btn-luxury-solid w-full py-4 rounded-xl text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Confirm & Book On-Site Inspection</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                </form>
              </div>

              {/* LIVE ESTIMATION OUTPUT SIDE PANEL */}
              <div className="lg:col-span-5 bg-luxury-card border border-white/10 rounded-3xl p-8 shadow-xl sticky top-28 text-left">
                <span className="text-xs font-black uppercase text-[#C5A059] tracking-wider">Dynamic Costing sheet</span>
                <h3 className="text-2xl font-black text-white mt-1 mb-6 uppercase">Estimated Cost Breakdown</h3>

                <div className="flex flex-col gap-5 border-b border-white/5 pb-6 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Design Category</span>
                    <span className="text-white text-sm font-bold uppercase">
                      {services.find(s => s.id === estType)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Scope Dimension</span>
                    <span className="text-white text-sm font-bold">{estArea} Units</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Material Choice</span>
                    <span className="text-[#C5A059] text-xs font-black uppercase">
                      {estQuality} Tier
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-gray-500 text-[10px] uppercase font-black tracking-widest block mb-2">
                    Scope of Work & Fittings Included:
                  </span>
                  <ul className="flex flex-col gap-2">
                    <li className="flex items-center gap-2 text-xs text-gray-300 font-light">
                      <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span>Termite & moisture resistant wood seasoning</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-300 font-light">
                      <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span>Soft close luxury sliding rails & push channels</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-300 font-light">
                      <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span>3D conceptual visualizer CAD mapping</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-300 font-light">
                      <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span>Direct 20-Year guarantee overlay certificate</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-[#C5A059]"></div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">
                    TOTAL ESTIMATED INVESTMENT
                  </span>
                  <span className="text-3xl md:text-4xl font-black text-[#C5A059] tracking-tight block mt-1">
                    ₹{calculateEstimate().toLocaleString('en-IN')}
                  </span>
                  <span className="text-[9px] text-gray-500 block mt-2">
                    *This is an average turnkey projection. Real quote might change after physical laser measurements on-site.
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 8: ADMIN PORTAL LOGIN / DASHBOARD */}
        {/* ========================================================= */}
        {currentPage === 'admin-login' && (
          <div className="max-w-md mx-auto px-6 py-24 animate-fade-in">
            <div className="bg-luxury-card border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative text-center">
              <div className="w-12 h-12 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-full flex items-center justify-center text-[#C5A059] mx-auto mb-6">
                <Shield className="w-6 h-6 animate-pulse" />
              </div>

              <h1 className="text-3xl font-black text-white mb-2 uppercase">Admin Panel Access</h1>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-8">
                Carpenter Hub Management Engine
              </p>

              {adminError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs text-left mb-6 font-medium">
                  {adminError}
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="flex flex-col gap-4 text-left">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Username</label>
                  <input 
                    type="text" 
                    required
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="Enter admin"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] text-white placeholder-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Secret Password</label>
                  <input 
                    type="password" 
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter admin123"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] text-white placeholder-gray-700"
                  />
                </div>

                <button 
                  type="submit"
                  className="btn-luxury-solid w-full py-3.5 mt-4 rounded-xl text-black font-bold uppercase tracking-wider text-xs cursor-pointer"
                >
                  Authorize System Unlock
                </button>
              </form>

              <div className="mt-8 pt-4 border-t border-white/5 text-[10px] text-gray-500 flex flex-col gap-1">
                <p>Private workspace bypass demo keys:</p>
                <p className="font-mono text-[#C5A059] font-bold">username: admin | password: admin123</p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 9: ADMIN PORTAL DASHBOARD ENGINE */}
        {/* ========================================================= */}
        {currentPage === 'admin-dashboard' && isAdminLoggedIn && (
          <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in text-left">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 pb-6 border-b border-white/5 gap-4">
              <div>
                <span className="text-xs text-[#C5A059] font-black uppercase tracking-widest">
                  Secure Administrative Console
                </span>
                <h1 className="text-4xl font-black text-white mt-1 uppercase">
                  Carpenter Hub Control Panel
                </h1>
              </div>

              <button 
                onClick={() => { setIsAdminLoggedIn(false); setCurrentPage('home'); }}
                className="px-5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs font-bold text-red-400 hover:bg-red-950/20 hover:border-red-500/30 flex items-center gap-2 duration-200 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Lock Dashboard</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Admin Side Nav Menu */}
              <div className="lg:col-span-3 bg-luxury-card border border-white/10 rounded-3xl p-6 flex flex-col gap-2 shadow-xl">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 px-3 mb-2">Management Tools</span>
                {[
                  { id: 'overview', label: 'Dashboard Overview', icon: Activity },
                  { id: 'enquiries', label: 'Total Enquiries', icon: FileText, count: enquiries.length },
                  { id: 'messages', label: 'Client Messages', icon: MessageSquare, count: messages.length },
                  { id: 'projects', label: 'Projects Manager', icon: Briefcase, count: projects.length },
                  { id: 'gallery', label: 'Gallery Vault', icon: ImageIcon, count: gallery.length },
                  { id: 'settings', label: 'Business Profile', icon: SettingsIcon }
                ].map((item) => {
                  const IconComp = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setAdminActiveTab(item.id)}
                      className={`w-full px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all duration-200 cursor-pointer ${
                        adminActiveTab === item.id 
                          ? 'bg-[#C5A059] text-black shadow-lg shadow-[#C5A059]/10' 
                          : 'bg-black/40 text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      {item.count !== undefined && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${adminActiveTab === item.id ? 'bg-black text-white' : 'bg-[#C5A059]/10 text-[#C5A059] font-bold'}`}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Admin Tab Core Content Panel */}
              <div className="lg:col-span-9 bg-luxury-card border border-white/10 rounded-3xl p-8 shadow-xl">
                
                {/* TAB OVERVIEW */}
                {adminActiveTab === 'overview' && (
                  <div className="animate-fade-in flex flex-col gap-8">
                    <h3 className="text-xl font-bold text-white uppercase">Business Metrics Overview</h3>
                    
                    {/* Stat boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest">Enquiries today</span>
                          <span className="text-3xl font-black text-white mt-1 block uppercase">{enquiries.filter(e => e.status === 'New').length} New</span>
                        </div>
                        <div className="p-3 bg-[#C5A059]/10 rounded-xl border border-[#C5A059]/20 text-[#C5A059]">
                          <FileText className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest">Client Messages</span>
                          <span className="text-3xl font-black text-white mt-1 block uppercase">{messages.filter(m => m.status === 'Unread').length} Unread</span>
                        </div>
                        <div className="p-3 bg-[#C5A059]/10 rounded-xl border border-[#C5A059]/20 text-[#C5A059]">
                          <MessageSquare className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest">Active Projects</span>
                          <span className="text-3xl font-black text-white mt-1 block uppercase">{projects.length} Total</span>
                        </div>
                        <div className="p-3 bg-[#C5A059]/10 rounded-xl border border-[#C5A059]/20 text-[#C5A059]">
                          <Briefcase className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    {/* Chart visualizer (Custom responsive clean SVG Bar Chart) */}
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/10 text-left">
                      <h4 className="text-white font-bold text-sm mb-4 uppercase">Project Categories Statistics</h4>
                      
                      <div className="h-48 flex items-end gap-6 pt-4 px-4 border-b border-white/5">
                        {[
                          { name: 'Kitchens', val: 55, h: 'h-3/4', color: 'from-[#C5A059] to-[#DFBA73]' },
                          { name: 'Wardrobes', val: 40, h: 'h-1/2', color: 'from-[#C5A059] to-[#DFBA73]' },
                          { name: 'Ceilings', val: 25, h: 'h-1/3', color: 'from-[#C5A059] to-white/20' },
                          { name: 'TV Units', val: 18, h: 'h-1/4', color: 'from-white/10 to-white/5' },
                          { name: 'Flooring', val: 12, h: 'h-[15%]', color: 'from-white/10 to-white/5' }
                        ].map((bar, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                            <span className="text-[10px] text-gray-400 font-bold">{bar.val}</span>
                            <div className={`w-full ${bar.h} bg-gradient-to-t ${bar.color} rounded-t-lg transition-all duration-1000`}></div>
                            <span className="text-[10px] text-gray-500 uppercase font-semibold text-center truncate w-full">{bar.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB ENQUIRIES */}
                {adminActiveTab === 'enquiries' && (
                  <div className="animate-fade-in flex flex-col gap-6">
                    <h3 className="text-xl font-bold text-white mb-2 uppercase">Total On-Site Estimator Enquiries</h3>
                    <div className="flex flex-col gap-4">
                      {enquiries.map((enq) => (
                        <div key={enq.id} className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <div className="flex-grow">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-white uppercase">{enq.name}</span>
                              <span className="text-[10px] font-mono text-gray-500 bg-black/40 border border-white/10 px-2 py-0.5 rounded">
                                {enq.date}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase ${
                                enq.status === 'New' ? 'bg-[#C5A059] text-black' :
                                enq.status === 'Contacted' ? 'bg-indigo-600 text-white' :
                                enq.status === 'In Progress' ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
                              }`}>
                                {enq.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-3 text-xs text-gray-300 font-light">
                              <p><span className="text-gray-500">Phone:</span> {enq.phone}</p>
                              <p><span className="text-gray-500">Location:</span> {enq.location}</p>
                              <p><span className="text-gray-500">Category:</span> {enq.projectType}</p>
                              <p><span className="text-gray-500">Budget Projection:</span> <span className="text-[#C5A059] font-bold">{enq.budget}</span></p>
                            </div>
                            <p className="text-gray-400 text-[11px] mt-2 italic bg-[#0F0F0F] p-2 rounded-lg border border-white/5 font-light">
                              "Requirements: {enq.requirements}"
                            </p>
                          </div>

                          <div className="flex md:flex-col gap-2 shrink-0">
                            <div className="flex gap-1">
                              <button 
                                onClick={() => handleUpdateEnquiryStatus(enq.id, 'Contacted')}
                                className="px-2.5 py-1 bg-indigo-950 border border-indigo-900 text-[10px] font-bold rounded text-indigo-400 hover:bg-indigo-900 hover:text-white cursor-pointer"
                              >
                                Mark Contacted
                              </button>
                              <button 
                                onClick={() => handleUpdateEnquiryStatus(enq.id, 'In Progress')}
                                className="px-2.5 py-1 bg-amber-950 border border-amber-900 text-[10px] font-bold rounded text-amber-400 hover:bg-amber-900 hover:text-white cursor-pointer"
                              >
                                Start Work
                              </button>
                            </div>
                            <button 
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="px-2.5 py-1.5 bg-red-950 border border-red-900 text-[10px] font-bold rounded text-red-400 hover:bg-red-600 hover:text-black flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB MESSAGES */}
                {adminActiveTab === 'messages' && (
                  <div className="animate-fade-in flex flex-col gap-6">
                    <h3 className="text-xl font-bold text-white mb-2 uppercase">Direct Client Message Logs</h3>
                    <div className="flex flex-col gap-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-white uppercase">{msg.name}</span>
                              <span className="text-[10px] text-gray-500 font-mono">{msg.date}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${msg.status === 'Unread' ? 'bg-[#C5A059] text-black' : 'bg-black/40 text-gray-400 border border-white/10'}`}>
                                {msg.status}
                              </span>
                            </div>
                            <div className="flex gap-4 mt-2 text-xs text-gray-400 font-light">
                              <p>Phone: {msg.phone}</p>
                              <p>Email: {msg.email}</p>
                            </div>
                            <p className="text-gray-300 text-xs bg-[#0F0F0F] p-4 rounded-xl border border-white/5 mt-3 leading-relaxed font-light">
                              "{msg.text}"
                            </p>
                          </div>

                          <div className="flex gap-2 justify-end pt-2 border-t border-white/5">
                            {msg.status === 'Unread' && (
                              <button 
                                onClick={() => handleUpdateMessageStatus(msg.id, 'Replied')}
                                className="px-3 py-1.5 bg-emerald-950 border border-emerald-900 text-[10px] font-bold text-emerald-400 rounded hover:bg-emerald-600 hover:text-black cursor-pointer"
                              >
                                Mark Replied
                              </button>
                            )}
                            <button 
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="px-3 py-1.5 bg-red-950 border border-red-900 text-[10px] font-bold text-red-400 rounded hover:bg-red-600 hover:text-black flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete Record</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB PROJECTS MANAGER */}
                {adminActiveTab === 'projects' && (
                  <div className="animate-fade-in flex flex-col gap-8">
                    
                    {/* Add project form */}
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
                      <h4 className="text-white font-bold mb-4 text-sm uppercase">Add New Project to Website Catalog</h4>
                      <form onSubmit={handleAddProject} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input 
                            type="text" 
                            required
                            value={newProjTitle}
                            onChange={(e) => setNewProjTitle(e.target.value)}
                            placeholder="Project Title (e.g. Modern Teak Sofa fitout) *"
                            className="bg-[#0F0F0F] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600"
                          />
                          <select 
                            value={newProjCat}
                            onChange={(e) => setNewProjCat(e.target.value)}
                            className="bg-[#0F0F0F] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                          >
                            <option value="Kitchen">Kitchen</option>
                            <option value="Bedroom">Bedroom</option>
                            <option value="Living Room">Living Room</option>
                            <option value="Office">Office</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Hotel">Hotel</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input 
                            type="text" 
                            required
                            value={newProjImg}
                            onChange={(e) => setNewProjImg(e.target.value)}
                            placeholder="Unsplash Image URL *"
                            className="bg-[#0F0F0F] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600"
                          />
                          <input 
                            type="text" 
                            value={newProjLoc}
                            onChange={(e) => setNewProjLoc(e.target.value)}
                            placeholder="Location (e.g. Sector 15, Chandigarh)"
                            className="bg-[#0F0F0F] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input 
                            type="text" 
                            value={newProjBudget}
                            onChange={(e) => setNewProjBudget(e.target.value)}
                            placeholder="Final Budget Range (e.g. ₹2.5 Lakhs)"
                            className="bg-[#0F0F0F] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600"
                          />
                          <input 
                            type="text" 
                            value={newProjSpecs}
                            onChange={(e) => setNewProjSpecs(e.target.value)}
                            placeholder="Fittings & materials used (e.g. Hafele hardware, BWR plywood)"
                            className="bg-[#0F0F0F] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="btn-luxury-solid py-2.5 px-4 rounded-lg text-black text-xs font-bold tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Publish Project Live</span>
                        </button>
                      </form>
                    </div>

                    {/* Current catalog */}
                    <div>
                      <h4 className="text-white font-bold mb-4 text-sm uppercase">Active Website Catalog ({projects.length})</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {projects.map((p) => (
                          <div key={p.id} className="bg-[#0F0F0F] rounded-xl overflow-hidden border border-white/5 flex items-center gap-4 p-4">
                            <img src={p.image} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                            <div className="flex-grow min-w-0 text-left">
                              <h5 className="text-xs font-bold text-white truncate uppercase">{p.title}</h5>
                              <span className="text-[10px] text-[#C5A059] font-bold block">{p.category}</span>
                              <span className="text-[9px] text-gray-500 block">{p.location}</span>
                            </div>
                            <button 
                              onClick={() => handleDeleteProject(p.id)}
                              className="p-2 text-red-500 hover:bg-red-950/20 rounded-lg shrink-0 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB GALLERY VAULT */}
                {adminActiveTab === 'gallery' && (
                  <div className="animate-fade-in flex flex-col gap-8">
                    
                    {/* Add gallery image */}
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
                      <h4 className="text-white font-bold mb-4 text-sm uppercase">Add Image URL to Masonry Design Vault</h4>
                      <form onSubmit={handleAddGalleryImage} className="flex gap-4">
                        <input 
                          type="text" 
                          required
                          value={newGalImg}
                          onChange={(e) => setNewGalImg(e.target.value)}
                          placeholder="Paste Unsplash image URL here... *"
                          className="flex-grow bg-[#0F0F0F] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600"
                        />
                        <button 
                          type="submit"
                          className="btn-luxury-solid py-2 px-5 rounded-lg text-black text-xs font-bold shrink-0 cursor-pointer"
                        >
                          Add Image
                        </button>
                      </form>
                    </div>

                    {/* Current gallery */}
                    <div>
                      <h4 className="text-white font-bold mb-4 text-sm uppercase">Design Vault Media ({gallery.length})</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {gallery.map((imgUrl, i) => (
                          <div key={i} className="relative rounded-lg overflow-hidden h-28 border border-white/5 group">
                            <img src={imgUrl} className="w-full h-full object-cover" />
                            <button 
                              onClick={() => handleDeleteGalleryImage(imgUrl)}
                              className="absolute top-1.5 right-1.5 bg-black/90 text-red-500 p-1 rounded hover:bg-red-600 hover:text-white duration-200 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB SETTINGS */}
                {adminActiveTab === 'settings' && (
                  <div className="animate-fade-in text-left">
                    <h3 className="text-xl font-bold text-white mb-6 uppercase">Business Profile Settings</h3>
                    <form onSubmit={handleSaveSettings} className="flex flex-col gap-5">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Business Name</label>
                          <input 
                            type="text" 
                            required
                            value={settings.businessName}
                            onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Owner Full Name</label>
                          <input 
                            type="text" 
                            required
                            value={settings.ownerName}
                            onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Call Phone Number</label>
                          <input 
                            type="text" 
                            required
                            value={settings.phone}
                            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">WhatsApp Contact link (with country code)</label>
                          <input 
                            type="text" 
                            required
                            value={settings.whatsapp}
                            onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Instagram Handle</label>
                          <input 
                            type="text" 
                            required
                            value={settings.instagram}
                            onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Email Support</label>
                          <input 
                            type="email" 
                            required
                            value={settings.email}
                            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Office Showcase Address</label>
                        <input 
                          type="text" 
                          required
                          value={settings.address}
                          onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                          className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Working Hours Weekdays</label>
                          <input 
                            type="text" 
                            required
                            value={settings.hoursWeekdays}
                            onChange={(e) => setSettings({ ...settings, hoursWeekdays: e.target.value })}
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Working Hours Weekends</label>
                          <input 
                            type="text" 
                            required
                            value={settings.hoursWeekends}
                            onChange={(e) => setSettings({ ...settings, hoursWeekends: e.target.value })}
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="btn-luxury-solid w-full py-4 rounded-xl text-black font-bold uppercase tracking-wider text-xs cursor-pointer"
                      >
                        Commit Changes Globally
                      </button>
                    </form>
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* SERVICE DETAILS SHEET / SPECIFICATIONS MODAL */}
      {/* ========================================================= */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in" id="specs-modal">
          <div className="bg-luxury-card border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative text-left glow-card animate-scale-up">
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 bg-black/60 border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-[#C5A059]/40 duration-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-48 overflow-hidden relative">
              <img src={selectedService.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <h3 className="text-3xl font-black text-white uppercase">{selectedService.name}</h3>
                <span className="text-xs text-[#C5A059] font-bold tracking-wider uppercase block mt-1">Detailed Engineering Blueprint</span>
              </div>
            </div>

            <div className="p-8">
              <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                {selectedService.longDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-black/40 p-6 rounded-2xl border border-white/5">
                <div>
                  <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-2">Technical Standards & Materials</span>
                  <ul className="flex flex-col gap-1.5">
                    {selectedService.materials.map((m, i) => (
                      <li key={i} className="text-xs text-gray-300 flex items-center gap-1.5 font-light">
                        <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block">Estimated Turnaround</span>
                    <span className="text-sm font-bold text-white mt-1 block">{selectedService.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block">Turnkey Pricing</span>
                    <span className="text-sm font-bold text-[#C5A059] mt-1 block">{selectedService.priceRange}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=Hi%20Ranjodh%20Singh%2C%20I%27m%20interested%20in%20modular%20${encodeURIComponent(selectedService.name)}%20work.%20Please%20send%20me%20design%20catalog.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 text-center duration-200 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Request WhatsApp Catalog</span>
                </a>
                <button 
                  onClick={() => { setSelectedService(null); setCurrentPage('quote'); }}
                  className="btn-luxury-solid flex-1 py-3 text-black font-black text-xs rounded-xl text-center cursor-pointer"
                >
                  Book Site Measurement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#080808] border-t border-white/5 pt-16 pb-8 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#C5A059] p-2.5 rounded-xl shadow-lg">
                <Hammer className="w-5 h-5 text-black stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase">{settings.businessName}</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm mb-6 font-light">
              Carpenter Hub is an award-winning wooden carpentry and interior design atelier headed by veteran master Ranjodh Singh. We specialize in turn-key premium modular kitchens, architectural wardrobes, TV consoles, ceiling rafters and solid timber.
            </p>
            <div className="text-xs text-gray-600 font-light">
              © {new Date().getFullYear()} {settings.businessName}. All rights reserved.
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-bold text-sm tracking-wide mb-6 uppercase">Signature Services</h4>
            <ul className="flex flex-col gap-3 text-xs text-gray-400">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <button 
                    onClick={() => { setSelectedService(s); setCurrentPage('home'); }}
                    className="hover:text-[#C5A059] text-left duration-200 cursor-pointer"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-white font-bold text-sm tracking-wide mb-6 uppercase">Design Showroom</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4 font-light">
              {settings.address}
            </p>
            <div className="flex flex-col gap-2 text-xs text-gray-300 font-light">
              <p><span className="text-gray-600">Call Now:</span> <a href={`tel:${settings.phone}`} className="hover:text-[#C5A059] duration-200">{settings.phone}</a></p>
              <p><span className="text-gray-600">Email us:</span> <a href={`mailto:${settings.email}`} className="hover:text-[#C5A059] duration-200">{settings.email}</a></p>
              <p><span className="text-gray-600">Instagram:</span> <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A059] duration-200">@{settings.instagram}</a></p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <button 
                onClick={() => { 
                  if (isAdminLoggedIn) {
                    setCurrentPage('admin-dashboard');
                  } else {
                    setCurrentPage('admin-login');
                  }
                }}
                className="text-[10px] uppercase font-black tracking-widest text-gray-600 hover:text-[#C5A059] transition-colors cursor-pointer"
                id="footer-admin-link"
              >
                {isAdminLoggedIn ? '✦ Open Admin Dashboard' : '⚙ Private Admin System Portal'}
              </button>
              <button 
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-[10px] uppercase font-bold text-gray-600 hover:text-white transition-all cursor-pointer"
              >
                Back To Top ↑
              </button>
            </div>
          </div>

        </div>
      </footer>

  </div>
  );
}

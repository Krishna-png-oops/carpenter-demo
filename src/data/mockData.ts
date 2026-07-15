export interface Service {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  priceRange: string;
  materials: string[];
  duration: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  budget: string;
  specs: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  image: string;
  text: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  location: string;
  projectType: string;
  budget: string;
  requirements: string;
  date: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Completed';
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  text: string;
  date: string;
  status: 'Unread' | 'Replied' | 'Archived';
}

export interface BusinessSettings {
  ownerName: string;
  businessName: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  email: string;
  address: string;
  hoursWeekdays: string;
  hoursWeekends: string;
}

export const initialServices: Service[] = [
  {
    id: "modular-kitchen",
    name: "Modular Kitchen",
    description: "Premium German & Italian style hydraulic soft-close kitchens with customized pull-outs.",
    longDescription: "Our signature modular kitchens combine ergonomic layout designs with high-resistance structural materials. Fully engineered for thermal resilience, water exposure, and heavy load capacities. We use premium hardware with lifetime guarantees.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    priceRange: "₹1.5 Lakhs - ₹8 Lakhs",
    materials: ["Century Ply HDMR", "Action TESA BWR Marine Board", "Hafele/Hettich Hydraulic Hardware", "Acrylic & PU Finishes"],
    duration: "14 - 21 Days"
  },
  {
    id: "wardrobes",
    name: "Wardrobe Design",
    description: "Elegant floor-to-ceiling sliding & walk-in wardrobes with sensory profile lighting.",
    longDescription: "Bespoke storage solutions tailored to your space constraints. Features customizable drawer compartments, automated jewelry safes, built-in tie racks, and LED sensor light strips with elegant glass or laminate shutters.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    priceRange: "₹80,000 - ₹4 Lakhs",
    materials: ["Gurjan IS:303 Block Board", "Duro High-Gloss Laminates", "Hettich Sliding Channels", "Sensa LED Profiles"],
    duration: "10 - 15 Days"
  },
  {
    id: "false-ceiling",
    name: "False Ceiling",
    description: "Contemporary suspended ceilings with ambient cove lighting and wooden rafters.",
    longDescription: "Aesthetic suspended layouts integrating premium Saint-Gobain gypsum boards, heavy-gauge steel framing, thermal insulation inserts, and designer wood rafters. Designed for acoustics, wire concealment, and luxury lighting.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    priceRange: "₹40,000 - ₹2 Lakhs",
    materials: ["Saint-Gobain Gypsum", "Gypsteel Ultra Frame", "Warm Cove LED Profiles", "Teak Wood Veneer Rafters"],
    duration: "5 - 8 Days"
  },
  {
    id: "tv-units",
    name: "Luxury TV Units",
    description: "Minimalist console panels with marble backdrops, wooden flutes, and hidden wiring.",
    longDescription: "Bespoke media panels featuring premium charcoal louvers, Italian stone slabs or matching high-gloss marble laminates, floating cabinets, and integrated smart wire management tracks.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    priceRange: "₹35,000 - ₹1.5 Lakhs",
    materials: ["HDMR core", "Italian Quartz / Charcoal Panels", "Soft-touch push drawers", "Warm Amber backlight LEDs"],
    duration: "4 - 7 Days"
  },
  {
    id: "wooden-furniture",
    name: "Wooden Furniture",
    description: "Solid Teak & Sheesham wood custom sofas, dining tables, and beds built for generations.",
    longDescription: "Indestructible hand-crafted solid wood joinery. Each piece is treated against termites, seasoned for zero warping, and hand-polished with high-end PU matte or gloss lacquer to bring out the natural wood grains.",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
    priceRange: "₹50,000 - ₹3 Lakhs",
    materials: ["A-Grade CP Teak Wood", "Seasoned Sheesham Wood", "Sayerlack PU Wood Polish", "High-density 40-density foam cushioning"],
    duration: "15 - 30 Days"
  },
  {
    id: "office-interiors",
    name: "Office Interiors",
    description: "Ergonomic executive desks, modular workstations, and executive conference units.",
    longDescription: "Commercial-grade executive fitouts focusing on workspace optimization, aesthetic corporate branding, integrated cable management systems, soundproof acoustic wall panels, and dynamic reception layouts.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    priceRange: "Custom Corporate Quote",
    materials: ["Fire-retardant ply", "Anti-scratch laminate sheets", "Aluminium raceways", "Acoustic fabric panels"],
    duration: "20 - 45 Days"
  },
  {
    id: "home-renovation",
    name: "Home Renovation",
    description: "Full-scale luxury home transformations from civil work to bespoke wood styling.",
    longDescription: "End-to-end master renovation covering partition removal, premium wood paneling, designer glass partitions, custom flooring overlays, fresh painting schemes, and comprehensive hardware upgrades.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    priceRange: "₹4 Lakhs - ₹25 Lakhs",
    materials: ["Full structural ply", "Veneer + Polish coatings", "Italian tile adhesive overlays", "Designer glass & gold metal strips"],
    duration: "30 - 60 Days"
  },
  {
    id: "custom-furniture",
    name: "Custom Furniture",
    description: "Tailor-made items fitted to specific niches, curved arches, and structural pillars.",
    longDescription: "We craft custom console tables, specialized prayer temples (Mandirs), shoe credenzas, curved window daybeds, bar counters, and wall-embedded storage cases to fit non-standard spaces with mm-level accuracy.",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
    priceRange: "₹25,000 - ₹2 Lakhs",
    materials: ["Calibrated Gurjan Ply", "High-pressure laminates", "Solid wood beadings", "Ebco specialty hinges"],
    duration: "7 - 14 Days"
  },
  {
    id: "wood-flooring",
    name: "Wood Flooring",
    description: "Imported engineered wooden planks and laminate flooring with sound-dampening underlay.",
    longDescription: "Premium AC4 & AC5 commercial grade floating laminate wood flooring or exotic engineered teak wood planks. Includes moisture-resistant PE foam underlay and precise edge profile-matching skirting boards.",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
    priceRange: "₹180 - ₹450 / sq. ft.",
    materials: ["German Laminate Planks", "Engineered Wood Planks", "2mm Sound Barrier PE Foam", "Matching profile skirting"],
    duration: "2 - 5 Days"
  },
  {
    id: "interior-designing",
    name: "Interior Designing",
    description: "Turnkey luxury residential interiors with full 3D renderings and material boards.",
    longDescription: "A complete conceptual layout service including space planning, detailed CAD blueprints, structural lighting drafts, customized material mood boards, and live project supervisor tracking from inception to key handover.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    priceRange: "₹3 Lakhs - ₹30 Lakhs",
    materials: ["All materials specified bespoke", "Comprehensive mood board", "Detailed 3D designs", "Onsite project engineers"],
    duration: "45 - 90 Days"
  }
];

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "Luxury Charcoal & Gold Modular Kitchen",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    location: "Green Avenue, Jalandhar",
    budget: "₹4.8 Lakhs",
    specs: "Hydraulic Blum hinges, Quartz top, TESA HDMR"
  },
  {
    id: "proj-2",
    title: "Minimalist Master Bedroom Walk-In Wardrobe",
    category: "Bedroom",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    location: "Sarabha Nagar, Ludhiana",
    budget: "₹3.2 Lakhs",
    specs: "Frosted sensor-LED glass, custom jewelry drawers"
  },
  {
    id: "proj-3",
    title: "Bespoke Walnut Floating Media Station",
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    location: "Sector 15, Chandigarh",
    budget: "₹1.4 Lakhs",
    specs: "Italian Marble veneer, backlighting, solid oak frames"
  },
  {
    id: "proj-4",
    title: "Modern Executive Conference Space & Louver Walls",
    category: "Office",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    location: "Mohali IT Park",
    budget: "₹12.5 Lakhs",
    specs: "Acoustic wooden panels, dual-conduit wire desks"
  },
  {
    id: "proj-5",
    title: "Teak & Velvet Premium Diner Lounge",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
    location: "Model Town, Ludhiana",
    budget: "₹8.5 Lakhs",
    specs: "Solid seasoned teak wood, 40-density HR foam seats"
  },
  {
    id: "proj-6",
    title: "Presidential Luxury Suite Wood Paneling",
    category: "Hotel",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    location: "Kasauli Premium Resort",
    budget: "₹18 Lakhs",
    specs: "Wall flutes, gold trim panels, bespoke headboard"
  },
  {
    id: "proj-7",
    title: "Elegant Oak Suspended Gypsum Ceiling",
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    location: "Urban Estate, Patiala",
    budget: "₹1.8 Lakhs",
    specs: "Saint-Gobain, TESA oak wood rafters, Philip light fixtures"
  }
];

export const initialGallery: string[] = [
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Gurpreet Singh",
    role: "Villa Owner, Amritsar",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    text: "Ranjodh Singh and his team built our modular kitchen and walking closets. The quality of ply and the hydraulic hardware are unmatched. Every corner is perfectly aligned. Truly worth every rupee!"
  },
  {
    id: "test-2",
    name: "Simran Kaur",
    role: "Apartment Owner, Chandigarh",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    text: "I hired Carpenter Hub for a complete false ceiling and TV unit overhaul in Sector 15. The modern glassmorphism design looks stunning. They finished the job in just 6 days without compromising on wood quality."
  },
  {
    id: "test-3",
    name: "Vikram Malhotra",
    role: "MD, Zenith Commercials",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    text: "Our new office layout in Mohali IT park is a masterpiece. The ergonomic desks and acoustic wooden louver wall designed by Carpenter Hub completely redefined our branding. Highly recommended!"
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: "enq-1",
    name: "Amrik Singh",
    phone: "+91 98765 43210",
    location: "Sarabha Nagar, Ludhiana",
    projectType: "Modular Kitchen & Wardrobes",
    budget: "₹5 - ₹8 Lakhs",
    requirements: "Full premium hydraulic setup, Century HDMR, acrylic white shutters",
    date: "2026-07-10 10:30 AM",
    status: "New"
  },
  {
    id: "enq-2",
    name: "Rohan Khanna",
    phone: "+91 88877 66554",
    location: "Sector 34, Chandigarh",
    projectType: "False Ceiling & TV Console",
    budget: "₹2 - ₹3 Lakhs",
    requirements: "Modern suspended gypsum board with wooden veneer rafters",
    date: "2026-07-09 03:15 PM",
    status: "Contacted"
  },
  {
    id: "enq-3",
    name: "Jaspreet Bajwa",
    phone: "+91 94632 12121",
    location: "GT Road, Jalandhar",
    projectType: "Full House Renovation",
    budget: "₹15 Lakhs+",
    requirements: "Interior design and custom wooden work for 4 BHK Villa",
    date: "2026-07-08 11:00 AM",
    status: "In Progress"
  }
];

export const initialMessages: Message[] = [
  {
    id: "msg-1",
    name: "Karan Johar",
    email: "karan@joharrenovators.com",
    phone: "+91 99123 44556",
    text: "Hello, we have a project of 12 luxury apartments in Chandigarh. Need custom wardrobes and modular kitchens on scale. Can we schedule an onsite visit with Ranjodh Singh?",
    date: "2026-07-11 02:30 PM",
    status: "Unread"
  },
  {
    id: "msg-2",
    name: "Preeti Sharma",
    email: "preeti.sharma@gmail.com",
    phone: "+91 98112 23344",
    text: "Do you offer free home measurement visits in Patiala? Looking to install solid CP Teak sofa set and dining unit.",
    date: "2026-07-09 09:12 AM",
    status: "Replied"
  }
];

export const defaultSettings: BusinessSettings = {
  ownerName: "Ranjodh Singh",
  businessName: "Carpenter Hub",
  phone: "+91 98725 46311",
  whatsapp: "+91 98725 46311",
  instagram: "carpenter_hub_interiors",
  email: "info@carpenterhub.com",
  address: "Plot No. 42, Industrial Area Phase 2, Jalandhar, Punjab, 144001",
  hoursWeekdays: "09:00 AM - 08:30 PM",
  hoursWeekends: "10:00 AM - 06:00 PM"
};

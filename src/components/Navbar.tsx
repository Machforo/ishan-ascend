import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, Phone, Mail, ChevronDown,
  BookOpen, Users, Award, Building2, GraduationCap,
  Camera, Microscope, ArrowRight, FileText, Shield,
  MessageSquare, Briefcase, Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIIMTData } from "../hooks/useIIMTData";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavLink { label: string; href: string; }
interface MegaColumn { heading: string; icon: React.ElementType; links: NavLink[]; }
interface FeaturedCard { img: string; title: string; desc: string; href: string; }
interface NavItem {
  label: string;
  featured: FeaturedCard;
  columns: MegaColumn[];
  extraImgs?: { img: string; caption: string; href: string }[];
}

// ─── Navigation Data ──────────────────────────────────────────────────────────
const navLinks: NavItem[] = [
  {
    label: "About Us",
    featured: {
      img: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
      title: "30 Years of Excellence",
      desc: "Pioneering professional education in Knowledge Park, Greater Noida since 1994.",
      href: "/about",
    },
    columns: [
      {
        heading: "Institution",
        icon: Building2,
        links: [
          { label: "About IIMT", href: "/about" },
          { label: "Director's Message", href: "/director-message" },
          { label: "Mission & Vision", href: "/mission-vision" },
          { label: "Why Choose Us", href: "/why-iimt" },
          { label: "Best Practices", href: "/best-practices" },
          { label: "Green Initiatives", href: "/green-initiatives" },
          { label: "Approvals & Affiliations", href: "/approvals" },
          { label: "Mandatory Disclosure", href: "/mandatory-disclosure" },
        ],
      },
      {
        heading: "Faculty",
        icon: Users,
        links: [
          { label: "Faculty Directory", href: "/faculty" },
          { label: "Visiting Faculty", href: "/visiting-faculty" },
          { label: "Research Journal", href: "/research-journal" },
          { label: "FAQs", href: "/faqs" },
        ],
      },
      {
        heading: "Placements",
        icon: Award,
        links: [
          { label: "Placement Overview", href: "/placements" },
          { label: "Placement Testimonials", href: "/placements#testimonials" },
          { label: "Alumni Network", href: "/e-cell#alumni" },
          { label: "Entrepreneurship Cell", href: "/e-cell" },
        ],
      },
    ],
  },
  {
    label: "Academics",
    featured: {
      img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
      title: "6 Professional Programmes",
      desc: "Undergraduate & postgraduate courses in Management, Commerce, IT and Teacher Education.",
      href: "/education-overview",
    },
    columns: [
      {
        heading: "Management & Commerce",
        icon: BookOpen,
        links: [
          { label: "BBA", href: "/courses/bba" },
          { label: "B.Com", href: "/courses/bcom" },
          { label: "M.Com", href: "/courses/mcom" },
        ],
      },
      {
        heading: "Technology",
        icon: Microscope,
        links: [
          { label: "BCA", href: "/courses/bca" },
        ],
      },
      {
        heading: "Education",
        icon: GraduationCap,
        links: [
          { label: "Education Overview", href: "/education-overview" },
          { label: "B.Ed", href: "/courses/bed" },
          { label: "M.Ed", href: "/courses/med" },
          { label: "Pedagogy Labs", href: "/pedagogy-labs" },
        ],
      },
      {
        heading: "Admissions",
        icon: ArrowRight,
        links: [
          { label: "Admissions 2025-26", href: "/admissions" },
          { label: "Admissions Enquiry", href: "/admissions-enquiry" },
          { label: "Scholarships", href: "/scholarships" },
          { label: "Certificate Programs", href: "/certificate-programs" },
        ],
      },
    ],
  },
  {
    label: "Campus Life",
    featured: {
      img: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80",
      title: "Vibrant Campus Experience",
      desc: "State-of-the-art facilities, cultural festivals, and endless opportunities to grow.",
      href: "/infrastructure",
    },
    columns: [
      {
        heading: "Learning & Activities",
        icon: BookOpen,
        links: [
          { label: "News & Events", href: "/news-events" },
          { label: "Events Calendar", href: "/events-calendar" },
          { label: "Skill Development", href: "/skill-development" },
          { label: "Cultural & Kshitiz", href: "/cultural-activities" },
          { label: "Debates & GD", href: "/debates-gd" },
          { label: "Industrial Visits", href: "/industrial-visits" },
          { label: "Guest Lectures", href: "/guest-lectures" },
        ],
      },
      {
        heading: "Campus Facilities",
        icon: Building2,
        links: [
          { label: "Infrastructure", href: "/infrastructure" },
          { label: "IT Lab", href: "/it-lab" },
          { label: "Library", href: "/library" },
          { label: "Auditorium", href: "/auditorium" },
          { label: "Hostel", href: "/hostel" },
          { label: "Sports", href: "/sports" },
        ],
      },
      {
        heading: "Gallery & Media",
        icon: Camera,
        links: [
          { label: "Photo Gallery", href: "/photo-gallery" },
          { label: "Video Gallery", href: "/video-gallery" },
          { label: "Press Coverage", href: "/press-coverage" },
        ],
      },
    ],
  },
  {
    label: "Student Zone",
    featured: {
      img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
      title: "Everything You Need",
      desc: "Your one-stop hub for academic resources, portals, policies and student welfare.",
      href: "/student-portal",
    },
    columns: [
      {
        heading: "Resources",
        icon: FileText,
        links: [
          { label: "Downloads", href: "/downloads" },
          { label: "Past Exam Papers", href: "/past-papers" },
          { label: "Fee Payment", href: "/fee-payment" },
          { label: "Student Portal", href: "/student-portal" },
        ],
      },
      {
        heading: "Policies & Welfare",
        icon: Shield,
        links: [
          { label: "Code of Conduct", href: "/code-of-conduct" },
          { label: "Anti-Ragging", href: "/anti-ragging" },
          { label: "Grievance Redressal", href: "/grievance-redressal" },
          { label: "Privacy Policy", href: "/privacy-policy" },
        ],
      },
    ],
    extraImgs: [
      { img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80", caption: "Library & Resources", href: "/library" },
      { img: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=500&q=80", caption: "Campus Examinations", href: "/past-papers" },
    ],
  },
  {
    label: "Contact",
    featured: {
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      title: "We're Here to Help",
      desc: "Reach out to our admissions team, explore career opportunities, or share your feedback.",
      href: "/contact",
    },
    columns: [
      {
        heading: "Get in Touch",
        icon: MessageSquare,
        links: [
          { label: "Contact Us", href: "/contact" },
          { label: "Admissions Enquiry", href: "/admissions-enquiry" },
          { label: "Feedback", href: "/feedback" },
        ],
      },
      {
        heading: "Work With Us",
        icon: Briefcase,
        links: [
          { label: "Careers at IIMT", href: "/careers" },
        ],
      },
    ],
    extraImgs: [
      { img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80", caption: "Knowledge Park Campus", href: "/contact" },
      { img: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=500&q=80", caption: "Admissions Helpdesk", href: "/admissions-enquiry" },
    ],
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────
const getColIcon = (col: any) => {
  if (col.icon && typeof col.icon !== 'string') return col.icon;
  const heading = (col.heading || "").toLowerCase();
  if (heading.includes("institution") || heading.includes("campus") || heading.includes("facility")) return Building2;
  if (heading.includes("faculty") || heading.includes("alumni") || heading.includes("student") || heading.includes("zone")) return Users;
  if (heading.includes("placement") || heading.includes("career") || heading.includes("work")) return Award;
  if (heading.includes("management") || heading.includes("commerce") || heading.includes("academic") || heading.includes("program")) return BookOpen;
  if (heading.includes("tech") || heading.includes("lab") || heading.includes("science")) return Microscope;
  if (heading.includes("education")) return GraduationCap;
  if (heading.includes("gallery") || heading.includes("media")) return Camera;
  if (heading.includes("contact") || heading.includes("get in touch") || heading.includes("policy") || heading.includes("welfare")) return MessageSquare;
  return BookOpen;
};
export default function Navbar({ isNotFound = false }: { isNotFound?: boolean }) {
  const { data } = useIIMTData("homepage");
  const headerData = data?.header;

  const phone = headerData?.phone || "+91 8448797700";
  const email = headerData?.email || "info@ishan.ac";
  const logoText = headerData?.logoText || "ISHAN";
  const logoSubtext = headerData?.logoSubtext || "Institute of Management & Technology";
  const alertText = headerData?.alertText;
  const alertLinkText = headerData?.alertLinkText;
  const alertLink = headerData?.alertLink;

  const portalLinks = headerData?.portalLinks && headerData.portalLinks.length > 0
    ? headerData.portalLinks
    : [
        { label: "Fee Payment", href: "/fee-payment" },
        { label: "Student Portal", href: "/student-portal" },
        { label: "News", href: "/news-events" }
      ];

  const dynamicNavLinks = headerData?.navLinks && headerData.navLinks.length > 0
    ? headerData.navLinks
    : navLinks;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Searchable items
  const searchableItems = [
    { name: "BBA", href: "/courses/bba" },
    { name: "BCA", href: "/courses/bca" },
    { name: "B.Com", href: "/courses/bcom" },
    { name: "M.Com", href: "/courses/mcom" },
    { name: "B.Ed", href: "/courses/bed" },
    { name: "M.Ed", href: "/courses/med" },
    { name: "Admissions", href: "/admissions" },
    { name: "Placements", href: "/placements" },
    { name: "Faculty", href: "/faculty" },
    { name: "Contact Us", href: "/contact" },
    { name: "Infrastructure", href: "/infrastructure" },
    { name: "News & Events", href: "/news-events" },
  ];

  const filteredItems = searchQuery.trim().length > 0 
    ? searchableItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  useEffect(() => { 
    setMobileOpen(false); 
    setOpenDropdown(null); 
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  const adjustFont = (amount: number) => {
    const root = document.documentElement;
    // Default to 16 if not set
    const currentSize = parseFloat(getComputedStyle(root).getPropertyValue('--base-font-size') || "16");
    const newSize = Math.max(12, Math.min(24, currentSize + amount));
    root.style.setProperty('--base-font-size', `${newSize}px`);
    localStorage.setItem('iimt_font_size', newSize.toString());
  };

  const resetFont = () => {
    document.documentElement.style.setProperty('--base-font-size', '16px');
    localStorage.setItem('iimt_font_size', '16');
  };

  useEffect(() => {
    const savedSize = localStorage.getItem('iimt_font_size');
    if (savedSize) {
      document.documentElement.style.setProperty('--base-font-size', `${savedSize}px`);
    }
  }, []);

  const activeLink = dynamicNavLinks.find((l) => l.label === openDropdown) ?? null;
  const textCls = (scrolled || isNotFound)
    ? "text-navy/80 hover:text-navy hover:bg-muted"
    : "text-white hover:text-white hover:bg-white/10 drop-shadow-lg";

  return (
    <>
      {/* ═══════════════════════ HEADER ═══════════════════════ */}
      {/* Must be `relative` so absolute mega-panel child is positioned from header bottom */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${(scrolled || isNotFound) ? "bg-card shadow-lg" : "bg-transparent"}`}
        onMouseLeave={closeMenu}
      >

        {/* ── Top info bar ── */}
        <div className={`bg-navy/10 backdrop-blur-sm text-white text-sm hidden md:block transition-all duration-500 ${scrolled ? "h-0 overflow-hidden" : "py-2 border-b border-white/10"}`}>
          <div className="container-wide flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a href={`mailto:${email}`} className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                <Mail className="w-3.5 h-3.5" /> {email}
              </a>
              <a href={`tel:${phone}`} className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                <Phone className="w-3.5 h-3.5" /> {phone}
              </a>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              {/* Font controls */}
              <div className="flex items-center gap-1.5 opacity-80 border-r border-white/20 pr-4">
                <span className="text-[10px] uppercase tracking-wider opacity-60">Text:</span>
                <button onClick={() => adjustFont(-1)} className="w-5 h-5 flex items-center justify-center hover:bg-white/10 rounded transition-colors" title="Decrease font size" aria-label="Decrease font size">A-</button>
                <button onClick={resetFont} className="w-5 h-5 flex items-center justify-center hover:bg-white/10 rounded transition-colors" title="Reset font size" aria-label="Reset font size">A</button>
                <button onClick={() => adjustFont(1)} className="w-5 h-5 flex items-center justify-center hover:bg-white/10 rounded transition-colors" title="Increase font size" aria-label="Increase font size">A+</button>
              </div>
              {portalLinks.map((pl, idx) => (
                <span key={pl.label} className="inline-flex items-center gap-4">
                  {idx > 0 && <span className="opacity-30">|</span>}
                  {pl.href.startsWith("http") ? (
                    <a href={pl.href} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">{pl.label}</a>
                  ) : (
                    <Link to={pl.href} className="opacity-80 hover:opacity-100 transition-opacity">{pl.label}</Link>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main nav bar ── */}
        <div className={`container-wide flex items-center justify-between transition-all duration-500 ${scrolled ? "h-14 md:h-[64px]" : "h-16 md:h-20"}`}>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src="/favicon.png" alt="IIMT Logo" className="h-8 md:h-10 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className={`font-display font-bold text-lg md:text-xl tracking-tight transition-colors duration-500 ${(scrolled || isNotFound) ? "text-navy" : "text-white drop-shadow-lg"}`}>
                {logoText}
              </span>
              <span className={`text-[9px] uppercase font-bold tracking-[0.15em] leading-none transition-colors duration-500 ${(scrolled || isNotFound) ? "text-muted-foreground" : "text-white/90 drop-shadow-md"}`}>
                {logoSubtext}
              </span>
            </div>
          </Link>

          {/* Desktop nav — only trigger buttons here */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {dynamicNavLinks.map((link) => (
              <button
                key={link.label}
                className={`flex items-center gap-1 px-3 py-1.5 text-[13px] font-bold transition-all rounded-md ${textCls} ${openDropdown === link.label ? "bg-white/10" : ""}`}
                onMouseEnter={() => openMenu(link.label)}
              >
                {link.label}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`} />
              </button>
            ))}
          </nav>

          {/* Search + CTA + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className={`hidden md:flex p-2 rounded-xl transition-all ${scrolled ? "hover:bg-muted text-navy" : "text-white hover:bg-white/10"}`}
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/admissions"
              className={`hidden md:inline-flex items-center px-5 py-2.5 text-[13px] font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] ${scrolled ? "bg-gold text-navy hover:scale-[1.02]" : "bg-white text-navy hover:bg-gold hover:scale-[1.05]"}`}
            >
              Apply Now
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all ${scrolled ? "hover:bg-muted text-navy" : "text-white hover:bg-white/10"}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ═══════════════ FULL-WIDTH MEGA MENU PANEL ═══════════════
            Rendered as a DIRECT child of <header> so top:100% = bottom of header.
            left-0 right-0 makes it span the full viewport width.            */}
        {activeLink && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 animate-slide-in-nav shadow-[0_16px_64px_hsl(0,0%,0%,0.18)]"
            onMouseEnter={() => openMenu(activeLink.label)}
          >
            {/* Thin visual separator */}
            <div className="h-px w-full bg-border/60" />

            <div className="bg-card">
              {/* Inner centred content — uses same max-width as the rest of the site */}
              <div className="container-wide py-6">
                <div className="flex gap-6">

                  {/* Left: featured image card */}
                  <Link
                    to={activeLink.featured.href}
                    className="relative w-72 shrink-0 rounded-2xl overflow-hidden group"
                    style={{ minHeight: "240px" }}
                  >
                    <img
                      src={activeLink.featured.img}
                      alt={activeLink.featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-1">Explore</p>
                      <h3 className="font-display font-bold text-base leading-tight mb-1">{activeLink.featured.title}</h3>
                      <p className="text-[12px] text-white/75 leading-snug">{activeLink.featured.desc}</p>
                      <span className="inline-flex items-center gap-1 mt-3 text-[11px] font-bold text-gold group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>

                  {/* Right: columns + optional image tiles */}
                  <div className="flex-1 min-w-0">

                    {/* Link columns */}
                    <div
                      className="grid gap-6"
                      style={{ gridTemplateColumns: `repeat(${activeLink.columns.length}, minmax(0,1fr))` }}
                    >
                      {activeLink.columns.map((col) => {
                        const ColIcon = getColIcon(col);
                        return (
                          <div key={col.heading}>
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
                              <div className="w-5 h-5 rounded bg-gold/10 flex items-center justify-center shrink-0">
                                <ColIcon className="w-3 h-3 text-gold" />
                              </div>
                              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-foreground/50">
                                {col.heading}
                              </p>
                            </div>
                            <ul className="space-y-0.5">
                              {col.links.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    to={item.href}
                                    className="block px-2 py-[5px] text-[13px] font-medium text-foreground/70 rounded-md hover:text-navy hover:bg-muted transition-all hover:pl-3"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>

                    {/* Extra image tiles (Student Zone & Contact) */}
                    {activeLink.extraImgs && activeLink.extraImgs.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-border/40">
                        {activeLink.extraImgs.map((tile) => (
                          <Link
                            key={tile.href}
                            to={tile.href}
                            className="relative rounded-xl overflow-hidden group h-[80px]"
                          >
                            <img
                              src={tile.img}
                              alt={tile.caption}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-navy/50 group-hover:bg-navy/60 transition-colors" />
                            <span className="absolute bottom-2 left-3 text-[11px] font-bold text-white drop-shadow">
                              {tile.caption}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-card animate-fade-up max-h-[80vh] overflow-y-auto">
            <div className="container-wide py-4 space-y-1">
              <Link to="/" className="block px-3 py-2.5 text-sm font-bold text-navy">🏠 Home</Link>
              {dynamicNavLinks.map((link) => {
                const allChildren = link.columns.flatMap((c) => c.links);
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold text-foreground/80 rounded-md hover:bg-muted"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                    </button>
                    {openDropdown === link.label && (
                      <div className="pl-4 space-y-0.5 pb-2">
                        {allChildren.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block px-3 py-2 text-sm text-foreground/60 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Link to="/admissions" className="block mx-3 mt-3 text-center px-5 py-2.5 text-sm font-semibold bg-gold text-foreground rounded-lg">
                Apply Now
              </Link>
            </div>
          </div>
        )}

        {/* ── Global Search Overlay ── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-xl flex flex-col p-6 md:p-20"
            >
              <div className="w-full max-w-4xl mx-auto flex flex-col h-full">
                <div className="flex items-center justify-between mb-12">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">Institutional Search</span>
                  <button 
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    className="w-12 h-12 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-gold hover:text-navy transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="relative mb-12">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gold w-8 h-8" />
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search courses, pages, faculty..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-white/10 pb-6 pl-12 text-3xl md:text-5xl font-display font-bold text-white outline-none focus:border-gold transition-all placeholder:text-white/10"
                  />
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
                  {searchQuery.trim().length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                          <Link 
                            key={item.href}
                            to={item.href}
                            className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex items-center justify-between"
                          >
                            <div>
                              <p className="text-[10px] text-gold font-bold uppercase tracking-widest mb-1">Result</p>
                              <h4 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{item.name}</h4>
                            </div>
                            <ArrowRight className="text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))
                      ) : (
                        <div className="col-span-full py-20 text-center">
                          <p className="text-white/40 text-xl italic">No matches found for "{searchQuery}"</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6">Popular Searches</p>
                      <div className="flex flex-wrap gap-3">
                        {["BBA", "BCA", "B.Com", "Admissions", "Placements", "Contact"].map(tag => (
                          <button 
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="px-6 py-3 rounded-xl bg-white/5 text-white/80 hover:bg-gold hover:text-navy transition-all font-bold text-sm"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>
      {alertText && (
        <div className="fixed top-5 right-5 z-[999999] bg-white/95 backdrop-blur-md border border-slate-200 p-4 px-5 rounded-2xl shadow-2xl font-sans text-sm text-slate-800 max-w-[320px] leading-relaxed text-left pointer-events-auto transition-all animate-fade-in hover:shadow-gold/5">
          <p className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1">
            <span>⚠️ Alert Notice</span>
          </p>
          <span className="text-slate-600 text-xs font-medium">{alertText}</span>
          {alertLink && alertLinkText && (
            <a 
              href={alertLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-navy hover:text-gold font-bold text-xs underline block mt-2 transition-colors"
            >
              {alertLinkText}
            </a>
          )}
        </div>
      )}
    </>
  );
}

import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "About IIMT", href: "/about" },
  { label: "Programs", href: "/education-overview" },
  { label: "Admissions", href: "/admissions" },
  { label: "Placements", href: "/placements" },
  { label: "Contact", href: "/contact" },
];

const programs = [
  { label: "BBA", href: "/courses/bba" },
  { label: "BCA", href: "/courses/bca" },
  { label: "B.Com", href: "/courses/bcom" },
  { label: "B.Ed", href: "/courses/bed" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/ishanedu", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/ishanfamily", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@ishanedu", label: "YouTube" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/ishanfamily", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/ishan_ac", label: "Twitter" },
];

import { useIIMTData } from "../hooks/useIIMTData";

export default function Footer() {
  const { data } = useIIMTData("homepage");
  const footerData = data?.footer;

  const dynamicQuickLinks = footerData?.quickLinks && footerData.quickLinks.length > 0 ? footerData.quickLinks : quickLinks;
  const dynamicPrograms = footerData?.programs && footerData.programs.length > 0 ? footerData.programs : programs;
  const dynamicLegalLinks = footerData?.legalLinks && footerData.legalLinks.length > 0 ? footerData.legalLinks : [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Anti-Ragging", href: "/anti-ragging" },
    { label: "Grievance", href: "/grievance-redressal" },
    { label: "Disclosures", href: "/mandatory-disclosure" },
  ];
  
  const logoText = footerData?.logoText || "ISHAN";
  const tagline = footerData?.description || "NAAC Accredited | Affiliated to CCS University, Meerut | Approved by UGC & AICTE. Pioneering professional education since 1994.";
  const copyrightText = footerData?.copyright || `© ${new Date().getFullYear()} Ishan Institute of Management & Technology. All rights reserved.`;

  const contactDetails = footerData?.contact || {
    address: "Knowledge Park-III, Greater Noida, UP 201308",
    phone: "8448797700",
    email: "info@ishan.ac"
  };

  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("facebook")) return Facebook;
    if (p.includes("instagram")) return Instagram;
    if (p.includes("youtube")) return Youtube;
    if (p.includes("linkedin")) return Linkedin;
    if (p.includes("twitter") || p.includes("x.com")) return Twitter;
    return Facebook; // fallback
  };

  const dynamicSocialLinks = footerData?.socialLinks && footerData.socialLinks.length > 0
    ? footerData.socialLinks.map((s: any) => ({
        label: s.platform,
        href: s.href,
        icon: getSocialIcon(s.platform)
      }))
    : socialLinks;

  return (
    <footer className="bg-navy-dark text-primary-foreground border-t border-white/5">
      <div className="container-wide py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/favicon.png" alt="IIMT Logo" className="h-10 w-auto" />
              <div>
                <p className="font-display font-bold text-lg leading-tight">{logoText}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-primary-foreground/40 leading-tight">Institute of Management & Technology</p>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/50 leading-relaxed max-w-xs">
              {tagline}
            </p>
            <div className="flex gap-2">
              {dynamicSocialLinks.map((s: any) => (
                <a 
                  key={s.label} 
                  href={s.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold hover:text-navy flex items-center justify-center transition-all duration-300"
                  aria-label={s.label}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              {dynamicQuickLinks.map((l: any) => (
                <li key={l.label}>
                  {l.href.startsWith("http") ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/50 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.href} className="text-sm text-primary-foreground/50 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-gold">Top Programs</h4>
            <ul className="space-y-3">
              {dynamicPrograms.map((p: any) => (
                <li key={p.label}>
                  {p.href.startsWith("http") ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/50 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                      {p.label}
                    </a>
                  ) : (
                    <Link to={p.href} className="text-sm text-primary-foreground/50 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                      {p.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-gold mt-0.5" />
                <span className="text-sm text-primary-foreground/50 leading-relaxed">{contactDetails.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-gold" />
                <a href={`tel:${contactDetails.phone}`} className="text-sm text-primary-foreground/50 hover:text-white transition-colors">{contactDetails.phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-gold" />
                <a href={`mailto:${contactDetails.email}`} className="text-sm text-primary-foreground/50 hover:text-white transition-colors">{contactDetails.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 bg-black/20">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-primary-foreground/30">
            {copyrightText}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {dynamicLegalLinks.map((l: any) => (
              <span key={l.label}>
                {l.href.startsWith("http") ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[11px] text-primary-foreground/30 hover:text-gold transition-colors uppercase tracking-widest font-medium">
                    {l.label}
                  </a>
                ) : (
                  <Link to={l.href} className="text-[11px] text-primary-foreground/30 hover:text-gold transition-colors uppercase tracking-widest font-medium">
                    {l.label}
                  </Link>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

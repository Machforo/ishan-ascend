import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Calendar, ArrowRight, X, MapPin, Tag, Share2 } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";
import { motion, AnimatePresence } from "framer-motion";

const defaultNews = [
  {
    title: "Awareness Program on Gynecological Disorder",
    date: "April 15, 2025",
    location: "IIMT Auditorium",
    category: "Health",
    description: "A health awareness session organized for students featuring expert medical practitioners discussing women's health issues and preventive care.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Vyaparniti: The Art of Business and Innovation",
    date: "April 3, 2025",
    location: "Seminar Hall, IIMT",
    category: "Management",
    description: "Annual business competition where students showcase entrepreneurial skills through business plans and case study presentations.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Ishan Cultural Fest Kshitiz-2025",
    date: "March 26, 2025",
    location: "IIMT Campus",
    category: "Cultural",
    description: "The flagship cultural festival featuring music, dance, drama, art, and inter-college competitions across three days.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Digi-Udaya: Seminar on Digital Currency",
    date: "March 6, 2025",
    location: "IIMT Auditorium",
    category: "Seminar",
    description: "Expert-led seminar exploring the future of digital currencies, blockchain technology, and their impact on financial systems.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80"
  }
];

export default function NewsSection() {
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const { data } = useIIMTData("newsevents");
  const news = data?.data?.length > 0 ? data.data : (Array.isArray(data) && data.length > 0 ? data : defaultNews);
  const ref = useScrollReveal([news]);

  return (
    <section className="py-20 md:py-28 bg-section-alt" ref={ref}>
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Latest Updates</p>
            <h2 className="reveal delay-100 text-3xl md:text-4xl font-display font-bold text-foreground">
              News &amp; Events
            </h2>
          </div>
          <a href="/news" className="reveal delay-200 inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors group">
            View All News
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item: any, i: number) => (
            <article
              key={item.title || i}
              onClick={() => setSelectedNews(item)}
              className={`reveal delay-${Math.min(i, 4)}00 group bg-card rounded-xl border overflow-hidden shadow-[0_2px_12px_hsl(var(--navy)/0.04)] hover:shadow-[0_8px_30px_hsl(var(--navy)/0.1)] transition-shadow cursor-pointer`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-navy rounded-full uppercase tracking-wider">
                    {item.category || "General"}
                  </span>
                </div>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </div>
                <h3 className="font-semibold text-sm text-foreground leading-snug line-clamp-2 group-hover:text-navy transition-colors">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

        {/* ── News Detail Modal ── */}
        <AnimatePresence>
          {selectedNews && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedNews(null)}
                className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                className="relative w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh]"
              >
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/20 hover:bg-gold text-navy hover:text-white transition-all shadow-lg backdrop-blur-md"
                >
                  <X size={20} />
                </button>

                {/* Left: Image Side */}
                <div className="w-full md:w-5/12 h-60 md:h-auto relative overflow-hidden bg-navy">
                  <img 
                    src={selectedNews.image} 
                    alt={selectedNews.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span className="px-3 py-1 bg-gold text-white text-[10px] font-bold rounded-md uppercase tracking-widest">
                      {selectedNews.category || "General"}
                    </span>
                  </div>
                </div>

                {/* Right: Content Side */}
                <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-gold" />
                        {selectedNews.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-gold" />
                        {selectedNews.location || "IIMT Campus"}
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-navy leading-tight">
                      {selectedNews.title}
                    </h2>
                  </div>

                  <div className="space-y-6 flex-grow">
                    <div className="prose prose-sm prose-navy max-w-none">
                      <p className="text-foreground/70 leading-relaxed text-base md:text-lg">
                        {selectedNews.description || "Stay tuned for more updates regarding this event. Detailed coverage and media highlights will be shared soon."}
                      </p>
                    </div>
                    
                    <div className="pt-8 mt-auto border-t border-muted flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-muted text-navy hover:bg-gold hover:text-white transition-all shadow-sm">
                          <Share2 size={16} />
                        </button>
                        <button className="p-2 rounded-lg bg-muted text-navy hover:bg-gold hover:text-white transition-all shadow-sm">
                          <Tag size={16} />
                        </button>
                      </div>
                      <button className="px-8 py-3 rounded-xl bg-navy text-white text-sm font-bold hover:bg-gold transition-all shadow-lg active:scale-95">
                        Read Full Story
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Calendar, ArrowRight, Search, X } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultEvents = [
  { title: "Awareness Program on Gynecological Disorder", date: "April 15, 2025", category: "Seminar", excerpt: "A health awareness session organized for students featuring expert medical practitioners discussing women's health issues.", image: "https://iimt.ishan.ac/images/news/news-1.jpg" },
  { title: "Vyaparniti: The Art of Business and Innovation", date: "April 3, 2025", category: "Event", excerpt: "Annual business competition where students showcase entrepreneurial skills through business plans and case study presentations.", image: "https://iimt.ishan.ac/images/news/news-2.jpg" },
  { title: "Ishan Cultural Fest Kshitiz-2025", date: "March 26, 2025", category: "Cultural", excerpt: "The flagship cultural festival featuring music, dance, drama, art, and inter-college competitions across three days.", image: "https://iimt.ishan.ac/images/news/news-3.jpg" },
  { title: "Digi-Udaya: Seminar on Digital Currency", date: "March 6, 2025", category: "Seminar", excerpt: "Expert-led seminar exploring the future of digital currencies, blockchain technology, and their impact on financial systems.", image: "https://iimt.ishan.ac/images/news/news-4.jpg" },
  { title: "Annual Sports Meet 2025", date: "February 20, 2025", category: "Sports", excerpt: "Inter-department sports competition featuring cricket, basketball, badminton, athletics and more.", image: "" },
  { title: "Industrial Visit to Reserve Bank of India", date: "February 8, 2025", category: "Industrial Visit", excerpt: "B.Com and BBA students visited the RBI facility to understand monetary policy, currency management, and central banking operations.", image: "" },
  { title: "Guest Lecture: Career in Data Science", date: "January 22, 2025", category: "Guest Lecture", excerpt: "Mr. Amit Sharma from Infosys delivered an insightful session on career opportunities in data science and AI for BCA students.", image: "" },
  { title: "Republic Day Celebration", date: "January 26, 2025", category: "Event", excerpt: "Flag hoisting ceremony followed by cultural performances celebrating India's Republic Day with the entire IIMT family.", image: "" },
];

export default function NewsEventsPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("newsevents");
  const eventsData = data?.data?.length > 0 ? data.data : (Array.isArray(data) && data.length > 0 ? data : defaultEvents);
  const events = eventsData.map((e: any) => ({ ...e, excerpt: e.description || e.excerpt }));

  const categories = ["All", ...Array.from(new Set(events.map((e: any) => e.category))).filter(Boolean) as string[]];
  const [activeCategory, setActiveCategory] = useState("All");
  const [newsSearch, setNewsSearch] = useState("");

  const filteredEvents = events.filter((e: any) => {
    const matchesCategory = activeCategory === "All" || e.category === activeCategory;
    const matchesSearch = newsSearch.trim() === "" || 
      e.title.toLowerCase().includes(newsSearch.toLowerCase()) || 
      (e.excerpt || "").toLowerCase().includes(newsSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <PageHeader
        title="News & Events"
        subtitle="Stay updated with the latest happenings at IIMT — seminars, festivals, sports, and more"
        breadcrumbs={[{ label: "News & Events" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="reveal max-w-2xl mx-auto mb-10 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-gold transition-colors" />
            <input 
              type="text" 
              placeholder="Search news, events, seminars..."
              value={newsSearch}
              onChange={(e) => setNewsSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-card border rounded-2xl outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 transition-all text-sm"
            />
            {newsSearch && (
              <button 
                onClick={() => setNewsSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="reveal flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all active:scale-[0.97] ${
                  activeCategory === cat ? "bg-navy text-white shadow-lg" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((item: any, i: number) => (
              <article key={item.title || i} className={`reveal delay-${Math.min(i % 3, 2)}00 group bg-card rounded-xl border overflow-hidden shadow-sm hover:shadow-[0_8px_30px_hsl(var(--navy)/0.1)] transition-shadow cursor-pointer`}>
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl font-display font-bold text-muted-foreground/20">{(item.category || item.title || "N")?.[0]}</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    {item.category && <span className="px-2.5 py-1 rounded-md bg-gold-light text-xs font-medium text-navy">{item.category}</span>}
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground leading-snug mb-2 group-hover:text-navy transition-colors">{item.title}</h3>
                  {item.excerpt && <p className="text-xs text-foreground/60 leading-relaxed line-clamp-2">{item.excerpt}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

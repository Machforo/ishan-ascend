import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultGalleryImages = [
  { title: "Smart Classrooms", img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80", category: "Campus" },
  { title: "Computer Lab", img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80", category: "Academic" },
  { title: "Central Library", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80", category: "Library" },
  { title: "Sports Complex", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80", category: "Sports" },
  { title: "Seminar Hall", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", category: "Events" },
  { title: "Lush Green Lawns", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80", category: "Campus" },
  { title: "Cafeteria", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80", category: "Social" },
  { title: "Student Lounge", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", category: "Campus" },
  { title: "Placement Cell", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80", category: "Career" },
  { title: "Hostel Facility", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80", category: "Hostel" }
];

export default function CampusExperience() {
  const { data } = useIIMTData("homepage");
  const galleryImages = data?.lifeAtIimt?.images && data.lifeAtIimt.images.length > 0
    ? data.lifeAtIimt.images.map((img: any, i: number) => {
      const imageUrl = typeof img === 'string' ? img : (img?.url || "");
      return { title: `Campus View ${i + 1}`, img: imageUrl, category: "Campus" };
    })
    : defaultGalleryImages;
  const ref = useScrollReveal([galleryImages]);

  const [activeIndices, setActiveIndices] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // Subtle rotation of images in specific tiles to keep it "dynamic"
  useEffect(() => {
    if (galleryImages.length === 0) return;
    const interval = setInterval(() => {
      const tileToChange = Math.floor(Math.random() * 10);
      const nextImage = Math.floor(Math.random() * galleryImages.length);
      setActiveIndices(prev => {
        const next = [...prev];
        next[tileToChange] = nextImage;
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-16 md:py-24 bg-navy text-white overflow-hidden min-h-screen flex flex-col justify-center snap-start" ref={ref}>
      <div className="container-wide">
        <div className="mb-10 md:mb-12">
          <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-gold mb-3 opacity-80">Life at IIMT</p>
          <h2 className="reveal delay-100 text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight max-w-4xl">
            {data?.lifeAtIimt?.heading || "Experience the Holistic Campus Ecosystem"}
          </h2>
        </div>

        {/* High-Density Masonry Collage Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[180px]">
          {/* Main Hero Tile */}
          <div className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndices[0]}
                src={galleryImages[activeIndices[0] % galleryImages.length].img}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80";
                }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{galleryImages[activeIndices[0] % galleryImages.length].category}</span>
              <h3 className="text-lg md:text-xl font-display font-bold mt-1">{galleryImages[activeIndices[0] % galleryImages.length].title}</h3>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[1]} src={galleryImages[activeIndices[1] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"; }} />
          </div>

          <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[2]} src={galleryImages[activeIndices[2] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80"; }} />
          </div>

          <div className="row-span-2 relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[3]} src={galleryImages[activeIndices[3] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e0875dedf3f?auto=format&fit=crop&w=800&q=80"; }} />
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[4]} src={galleryImages[activeIndices[4] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"; }} />
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[5]} src={galleryImages[activeIndices[5] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"; }} />
          </div>

          <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[6]} src={galleryImages[activeIndices[6] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"; }} />
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[7]} src={galleryImages[activeIndices[7] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"; }} />
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[8]} src={galleryImages[activeIndices[8] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"; }} />
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[9]} src={galleryImages[activeIndices[9] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"; }} />
          </div>
        </div>
      </div>
    </section>
  );
}

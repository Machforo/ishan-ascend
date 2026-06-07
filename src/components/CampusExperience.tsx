import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultGalleryImages = [
  { title: "Academic Excellence", img: "https://www.burohappold.com/wp-content/uploads/2022/05/BS-CMU_02_Albert-Vecerka-Esto-1024x683.jpg", category: "Campus" },
  { title: "Smart Resources", img: "https://studyus.dapodik.co.id/wp-content/uploads/2023/08/Exploring-US-University-Facilities-and-Resources-8QR-MPR.jpg", category: "Facilities" },
  { title: "Student Life", img: "https://www.kclas.ac.in/wp-content/uploads/2021/01/gallery-05.jpg", category: "Community" },
  { title: "Sports Academy", img: "https://www.sanskriti.edu.in/images/sports1.jpg", category: "Sports" },
  { title: "Indoor Training", img: "https://www.accurate.in/engg/img/sports/sports.webp", category: "Fitness" },
  { title: "Campus Architecture", img: "https://woxsen.edu.in/uploads/A20230824084254.webp", category: "Architecture" },
  { title: "Event Plenary", img: "https://lavasa.christuniversity.in/uploads/userfiles/IMG_1100_JPG.jpg", category: "Events" },
  { title: "Lush Greenery", img: "https://www.iecaonline.com/wp-content/uploads/2018/03/College-Campus-cropped-scaled.jpg", category: "Environment" },
];

export default function CampusExperience() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("homepage");
  const galleryImages = data?.lifeAtIimt?.images?.length > 0 
    ? data.lifeAtIimt.images.map((img: string, i: number) => ({ title: `Campus View ${i+1}`, img, category: "Campus" }))
    : defaultGalleryImages;

  const [activeIndices, setActiveIndices] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // Subtle rotation of images in specific tiles to keep it "dynamic"
  useEffect(() => {
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

  return (
    <section id="experience" className="py-16 md:py-24 bg-navy text-white overflow-hidden min-h-screen flex flex-col justify-center snap-start" ref={ref}>
      <div className="container-wide">
        <div className="mb-10 md:mb-12">
          <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-gold mb-3 opacity-80">Life at IIMT</p>
          <h2 className="reveal delay-100 text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight max-w-4xl">
            Experience the <span className="text-gold">Holistic</span> Campus Ecosystem
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
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=1200&q=80";
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
            <motion.img key={activeIndices[1]} src={galleryImages[activeIndices[1] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800"; }} />
          </div>

          <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[2]} src={galleryImages[activeIndices[2] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800"; }} />
          </div>

          <div className="row-span-2 relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[3]} src={galleryImages[activeIndices[3] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=800"; }} />
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[4]} src={galleryImages[activeIndices[4] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=800"; }} />
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[5]} src={galleryImages[activeIndices[5] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=800"; }} />
          </div>

          <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[6]} src={galleryImages[activeIndices[6] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=800"; }} />
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[7]} src={galleryImages[activeIndices[7] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=800"; }} />
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[8]} src={galleryImages[activeIndices[8] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=800"; }} />
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <motion.img key={activeIndices[9]} src={galleryImages[activeIndices[9] % galleryImages.length].img} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=800"; }} />
          </div>
        </div>
      </div>
    </section>
  );
}

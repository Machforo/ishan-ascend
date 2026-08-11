import PageSections from './PageSections';
import PageGallery from './PageGallery';
import Navbar from "./Navbar";
import Footer from "./Footer";
import SubNav from "./SubNav";
import { WhatsAppButton, ChatBot, QuickEnquiry } from "./FloatingActions";
import ExitIntentPopup from "./ExitIntentPopup";
import AnnouncementPopup from "./AnnouncementPopup";

export default function Layout({ children, isNotFound = false }: { children: React.ReactNode, isNotFound?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col relative selection:bg-gold/30">
      <Navbar isNotFound={isNotFound} />
      <SubNav />
      <main className="flex-1 w-full bg-background mt-0">{children}</main>
      <PageSections />
      <PageGallery />
      <Footer />
      
      {/* Global Elements */}
      <WhatsAppButton />
      <ChatBot />
      <QuickEnquiry />
      <ExitIntentPopup />
      <AnnouncementPopup />
    </div>
  );
}

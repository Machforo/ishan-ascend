import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Search, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout isNotFound={true}>
      <div className="min-h-[80vh] flex items-center justify-center bg-background relative overflow-hidden pt-24 md:pt-32">
        {/* Background Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-navy/5 rounded-full blur-3xl -z-10" />

        <div className="container-wide text-center px-4 relative z-10 py-20">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-xl mb-8">
            <Search className="w-10 h-10 text-gold" />
          </div>
          
          <h1 className="text-8xl md:text-[120px] font-display font-bold text-navy leading-none mb-4 drop-shadow-sm">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
            Oops! You've strayed from the campus path.
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-muted hover:border-navy text-navy font-bold rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            <Link 
              to="/" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-navy hover:bg-navy-dark text-white font-bold rounded-xl shadow-[0_8px_30px_rgba(10,20,50,0.3)] hover:shadow-[0_12px_40px_rgba(10,20,50,0.4)] transition-all hover:-translate-y-1"
            >
              <Home className="w-5 h-5" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;

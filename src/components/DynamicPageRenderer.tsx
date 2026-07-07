import { useEffect, useState, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import Layout from "./Layout";

interface PageData {
  title: string;
  template: string;
  content: any;
  published: boolean;
}


function RawHtmlIframe({ html, title }) {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState("100vh");

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.type === "resize") {
        setHeight(`${e.data.height}px`);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (doc) {
        doc.open();
        const injectedHtml = html + `
          <script>
            function sendHeight() {
              const h = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
              );
              window.parent.postMessage({ type: 'resize', height: h }, '*');
            }
            window.addEventListener('load', sendHeight);
            window.addEventListener('resize', sendHeight);
            new MutationObserver(sendHeight).observe(document.body, { attributes: true, childList: true, subtree: true });
            setTimeout(sendHeight, 500);
            setTimeout(sendHeight, 1500);
          </script>
        `;
        doc.write(injectedHtml);
        doc.close();
      }
    }
  }, [html]);
  
  return (
    <iframe 
      ref={iframeRef}
      title={title}
      style={{ height, overflow: "hidden" }}
      scrolling="no"
      className="w-full border-none m-0 p-0 block"
    />
  );
}

export default function DynamicPageRenderer({ portal }: { portal: string }) {
  const { slug } = useParams();
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${apiBase.replace('/api', '')}/api/dynamic-pages/${portal}/${slug}`);
        
        if (!res.ok) throw new Error("Not found");
        const page = await res.json();
        
        if (!page.published) throw new Error("Not published");
        
        setData(page);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) fetchPage();
  }, [slug, portal]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return <Navigate to="/404" replace />;
  }

  // STANDARD TEMPLATE
  if (data.template === "standard") {
    

    return (
      <Layout>
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
          {data.content?.image && (
            <div className="w-full h-[40vh] md:h-[60vh] mb-12 relative">
              <img 
                src={data.content.image} 
                alt={data.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container-wide text-center">
                  <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                    {data.content.heading || data.title}
                  </h1>
                </div>
              </div>
            </div>
          )}
          
          <div className="container-wide max-w-4xl mx-auto">
            {!data.content?.image && (
              <h1 className="text-3xl md:text-5xl font-display font-bold text-navy mb-10 text-center">
                {data.content.heading || data.title}
              </h1>
            )}
            
            {(() => {
              const bodyHTML = data.content?.body || "";
              const isFullHtml = bodyHTML.trim().toLowerCase().startsWith("<!doctype html") || bodyHTML.trim().toLowerCase().startsWith("<html");
              if (!isFullHtml) {
                return (
                  <div 
                    className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-a:text-gold"
                    dangerouslySetInnerHTML={{ __html: bodyHTML }}
                  />
                );
              }
              return null;
            })()}
          </div>
          
          {(() => {
             const bodyHTML = data.content?.body || "";
             const isFullHtml = bodyHTML.trim().toLowerCase().startsWith("<!doctype html") || bodyHTML.trim().toLowerCase().startsWith("<html");
             if (isFullHtml) {
               return (
                 <div className="w-full -mt-6 sm:-mt-10">
                   <RawHtmlIframe html={bodyHTML} title={data.title} />
                 </div>
               );
             }
             return null;
          })()}
          <div className="hidden">
          </div>
        </div>
      </Layout>
    );
  }

  // GALLERY TEMPLATE
  if (data.template === "gallery") {
    const images = data.content?.images || [];
    return (
      <Layout>
        <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
          <div className="container-wide">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4 text-center">
              {data.content?.heading || data.title}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {images.map((img: string, i: number) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-lg group">
                  <img 
                    src={img} 
                    alt={`Gallery image ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  
  // CUSTOM HTML (WITH NAVBAR/FOOTER)
  if (data.template === "custom_html") {
    const htmlToRender = data.content?.html || data.content?.body || "";
    return (
      <Layout>
        <div className="w-full mt-[80px]">
          <RawHtmlIframe html={htmlToRender} title={data.title} />
        </div>
      </Layout>
    );
  }

  // RAW HTML (BLANK CANVAS)
  if (data.template === "raw_html") {
    return <RawHtmlIframe html={data.content?.html || data.content?.body || ""} title={data.title} />;
  }

  // Fallback for unknown templates
  return (
    <Layout>
      <div className="pt-32 pb-20 min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500">Unknown template: {data.template}</p>
      </div>
    </Layout>
  );
}

import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function PrivacyPolicyPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("studentzone");
  const privacyPolicy = data?.privacyPolicy;

  return (
    <Layout>
      <PageHeader 
        title={privacyPolicy?.pageTitle || "Privacy Policy"} 
        subtitle={privacyPolicy?.pageSubtitle || ""} 
        breadcrumbs={[{ label: "Privacy Policy" }]} 
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto reveal space-y-6 text-sm text-foreground/70 leading-relaxed">
            {privacyPolicy?.content ? (
              <div 
                className="[&>p]:mb-4 [&>h2]:text-lg [&>h2]:font-display [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4"
                dangerouslySetInnerHTML={{ __html: privacyPolicy.content }}
              />
            ) : (
              <>
                <p>Ishan Educational Group ("we," "us," "our") is committed to protecting the privacy of visitors to our websites (ishan.ac and all sub-sites including iimt.ishan.ac). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or submit forms.</p>
                <h2 className="text-lg font-display font-bold text-foreground">Information We Collect</h2>
                <p>We may collect personal information that you voluntarily provide when filling out enquiry forms, admission applications, feedback forms, or fee payment portals. This includes: name, email address, phone number, mailing address, date of birth, educational qualifications, and payment information.</p>
                <h2 className="text-lg font-display font-bold text-foreground">How We Use Your Information</h2>
                <p>We use the information collected to: process admission applications, respond to enquiries, send academic communications, process fee payments, improve our website and services, comply with legal obligations, and maintain student records as required by UGC and university regulations.</p>
                <h2 className="text-lg font-display font-bold text-foreground">Cookies</h2>
                <p>Our website may use cookies to enhance user experience. Cookies are small files stored on your device that help us understand website usage patterns. You may disable cookies through your browser settings, though this may affect certain website functionalities.</p>
                <h2 className="text-lg font-display font-bold text-foreground">Data Security</h2>
                <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of electronic transmission or storage is 100% secure.</p>
                <h2 className="text-lg font-display font-bold text-foreground">Contact Us</h2>
                <p>For questions about this Privacy Policy, contact us at <a href="mailto:info@ishan.ac" className="text-navy font-semibold">info@ishan.ac</a> or write to: Ishan Educational Group, Knowledge Park-III, Greater Noida, UP 201308.</p>
                <p className="text-xs text-muted-foreground">Last updated: January 2025</p>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

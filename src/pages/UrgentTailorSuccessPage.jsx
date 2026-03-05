import useLegacyIndexBehavior from "../hooks/useLegacyIndexBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";
import HomeLayout from "../components/storefront/HomeLayout";
import SiteFooter from "../components/storefront/SiteFooter";

export default function UrgentTailorSuccessPage() {
  useLegacyIndexBehavior();
  useWhatsAppWidget();
  return (
    <HomeLayout activeNav="urgent-tailor">
<main className="urgent-tailor-page">
            <section className="urgent-tailor-main">
              <div className="container urgent-wrap">
                <div className="urgent-header">
                  <h2>Urgent Tailoring Service</h2>
                  <p>Premium bespoke stitching with 72-hour express delivery.</p>
                </div>
      
                <div className="urgent-steps" aria-label="Tailoring progress">
                  <div className="urgent-step done"><i className="bx bx-check"></i></div>
                  <div className="urgent-step done"><i className="bx bx-check"></i></div>
                  <div className="urgent-step done"><i className="bx bx-check"></i></div>
                </div>
      
                <section className="urgent-success" aria-labelledby="urgent-success-heading">
                  <div className="urgent-success-icon"><i className="bx bx-check"></i></div>
                  <h2 id="urgent-success-heading">Request Received!</h2>
                  <p>
                    Your urgent tailoring request has been sent to our master tailors.
                    We will call you shortly to confirm the details.
                  </p>
                  <a href="/userpage/index.html" className="urgent-return-home">Return to Home</a>
                </section>
              </div>
            </section>
          </main>
      <SiteFooter />

</HomeLayout>
  );
}


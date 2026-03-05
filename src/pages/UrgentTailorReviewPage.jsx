import useLegacyIndexBehavior from "../hooks/useLegacyIndexBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";
import HomeLayout from "../components/storefront/HomeLayout";
import SiteFooter from "../components/storefront/SiteFooter";

export default function UrgentTailorReviewPage() {
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
                  <div className="urgent-step active"><span>3</span></div>
                </div>
      
                <section className="urgent-card" aria-labelledby="urgent-review-heading">
                  <h3 id="urgent-review-heading">Review &amp; Confirm</h3>
                  <p>Double check your details before submitting.</p>
      
                  <div className="urgent-review-box">
                    <div className="urgent-review-row urgent-review-service">
                      <span>Service</span>
                      <strong>Urgent Express (72h)</strong>
                    </div>
                    <div className="urgent-review-divider"></div>
                    <div className="urgent-review-row">
                      <div>
                        <span>Full Name</span>
                        <strong>Ngozi Oaker</strong>
                      </div>
                      <div>
                        <span>Contact</span>
                        <strong>+234 801 234 5678</strong>
                      </div>
                    </div>
                  </div>
      
                  <div className="urgent-actions">
                    <a href="/userpage/urgent-tailor-measurements.html" className="urgent-back-btn">Back</a>
                    <a href="/userpage/urgent-tailor-success.html" className="urgent-next-btn">Submit Request</a>
                  </div>
                </section>
              </div>
            </section>
          </main>
      <SiteFooter />

</HomeLayout>
  );
}


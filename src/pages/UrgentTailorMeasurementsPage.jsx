import useLegacyIndexBehavior from "../hooks/useLegacyIndexBehavior";
import useUrgentTailorMeasurementsBehavior from "../hooks/useUrgentTailorMeasurementsBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";
import HomeLayout from "../components/storefront/HomeLayout";
import SiteFooter from "../components/storefront/SiteFooter";

export default function UrgentTailorMeasurementsPage() {
  useLegacyIndexBehavior();
  useUrgentTailorMeasurementsBehavior();
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
                  <div className="urgent-step active"><span>2</span></div>
                  <div className="urgent-step"><span>3</span></div>
                </div>
      
                <section className="urgent-card" aria-labelledby="urgent-measurement-heading">
                  <h3 id="urgent-measurement-heading">Body Measurements</h3>
                  <p>Please provide accurate measurements in inches.</p>
      
                  <form
                    className="urgent-form"
                    id="urgent-step-two-form"
                    action="urgent-tailor-review.html"
                    method="get"
                    noValidate
                  >
                    <div className="urgent-measure-grid">
                      <label>
                        Chest (inches)
                        <input name="chest" type="number" step="0.1" min="0" placeholder="0.0" required />
                        <span className="urgent-field-error" aria-live="polite"></span>
                      </label>
                      <label>
                        Waist (inches)
                        <input name="waist" type="number" step="0.1" min="0" placeholder="0.0" required />
                        <span className="urgent-field-error" aria-live="polite"></span>
                      </label>
                      <label>
                        Hips (inches)
                        <input name="hips" type="number" step="0.1" min="0" placeholder="0.0" required />
                        <span className="urgent-field-error" aria-live="polite"></span>
                      </label>
                      <label>
                        Shoulder (inches)
                        <input name="shoulder" type="number" step="0.1" min="0" placeholder="0.0" required />
                        <span className="urgent-field-error" aria-live="polite"></span>
                      </label>
                      <label>
                        Sleeve (inches)
                        <input name="sleeve" type="number" step="0.1" min="0" placeholder="0.0" required />
                        <span className="urgent-field-error" aria-live="polite"></span>
                      </label>
                      <label>
                        Length (inches)
                        <input name="length" type="number" step="0.1" min="0" placeholder="0.0" required />
                        <span className="urgent-field-error" aria-live="polite"></span>
                      </label>
                    </div>
      
                    <label className="urgent-notes-label">
                      Additional Notes (Special Requests)
                      <textarea
                        name="notes"
                        rows="3"
                        placeholder="E.g., high neck, flared sleeves..."
                        required
                      ></textarea>
                      <span className="urgent-field-error" aria-live="polite"></span>
                    </label>
      
                    <div className="urgent-actions">
                      <a href="/userpage/urgent-tailor.html" className="urgent-back-btn">Back</a>
                      <button type="submit" className="urgent-next-btn">Review Request</button>
                    </div>
                  </form>
                </section>
              </div>
            </section>
          </main>
      <SiteFooter />

</HomeLayout>
  );
}


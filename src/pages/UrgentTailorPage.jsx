import useLegacyIndexBehavior from "../hooks/useLegacyIndexBehavior";
import useUrgentTailorBehavior from "../hooks/useUrgentTailorBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";
import HomeLayout from "../components/storefront/HomeLayout";
import SiteFooter from "../components/storefront/SiteFooter";

export default function UrgentTailorPage() {
  useLegacyIndexBehavior();
  useUrgentTailorBehavior();
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
                  <div className="urgent-step active"><span>1</span></div>
                  <div className="urgent-step"><span>2</span></div>
                  <div className="urgent-step"><span>3</span></div>
                </div>
      
                <section className="urgent-card" aria-labelledby="urgent-form-heading">
                  <h3 id="urgent-form-heading">Inspiration &amp; Contact</h3>
                  <p>Upload the style you want and provide your contact details.</p>
      
                  <form
                    className="urgent-form"
                    id="urgent-step-one-form"
                    action="urgent-tailor-measurements.html"
                    method="get"
                    noValidate
                  >
                    <div className="urgent-grid">
                      <label>
                        First Name
                        <input id="first-name" name="first_name" type="text" placeholder="John" />
                        <span id="first-name-error" className="urgent-field-error" aria-live="polite"></span>
                      </label>
      
                      <label>
                        Last Name
                        <input id="last-name" name="last_name" type="text" placeholder="Doe" />
                        <span id="last-name-error" className="urgent-field-error" aria-live="polite"></span>
                      </label>
                    </div>
      
                    <div className="urgent-grid urgent-phone-grid">
                      <label>
                        Country Code
                        <select id="country-code" name="country_code" className="urgent-country-code">
                          <option value="+234" data-country="NG" data-min="10" data-max="10">Nigeria (+234)</option>
                          <option value="+1" data-country="US" data-min="10" data-max="10">United States (+1)</option>
                          <option value="+44" data-country="GB" data-min="10" data-max="10">United Kingdom (+44)</option>
                          <option value="+91" data-country="IN" data-min="10" data-max="10">India (+91)</option>
                          <option value="+233" data-country="GH" data-min="9" data-max="9">Ghana (+233)</option>
                          <option value="+27" data-country="ZA" data-min="9" data-max="9">South Africa (+27)</option>
                          <option value="+254" data-country="KE" data-min="9" data-max="9">Kenya (+254)</option>
                        </select>
                      </label>
      
                      <label>
                        Contact Number
                        <input
                          id="phone-number"
                          name="phone_number"
                          type="tel"
                          inputmode="numeric"
                          placeholder="8012345678"
                        />
                        <span id="phone-number-error" className="urgent-field-error" aria-live="polite"></span>
                      </label>
                    </div>
      
                    <label className="urgent-upload-label">Upload Style Picture</label>
                    <label className="urgent-upload-box" htmlFor="style-upload">
                      <input id="style-upload" name="style_picture" type="file" accept=".png,.jpg,.jpeg" />
                      <i className="bx bx-upload"></i>
                      <strong>Click or drag to upload image</strong>
                      <span>PNG, JPG up to 10MB</span>
                    </label>
                    <span id="style-upload-error" className="urgent-field-error urgent-upload-error" aria-live="polite"></span>
      
                    <button type="submit" className="urgent-next-btn">Continue to Measurements</button>
                  </form>
                </section>
              </div>
            </section>
          </main>
      <SiteFooter />

</HomeLayout>
  );
}


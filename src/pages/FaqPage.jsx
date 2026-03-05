import useLegacyIndexBehavior from "../hooks/useLegacyIndexBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";
import HomeLayout from "../components/storefront/HomeLayout";
import SiteFooter from "../components/storefront/SiteFooter";

export default function FaqPage() {
  useLegacyIndexBehavior();
  useWhatsAppWidget();
  return (
    <HomeLayout activeNav="">
<main className="faq-page">
            <section className="faq-hero">
              <div className="container">
                <div className="faq-hero-icon" aria-hidden="true"><i className="bx bx-question-mark"></i></div>
                <h1>Frequently Asked Questions</h1>
                <p>Everything you need to know about shopping with Ankara &amp; Co.</p>
              </div>
            </section>
      
            <section className="faq-main">
              <div className="container faq-container">
                <article className="faq-group">
                  <h2><i className="bx bx-package"></i> Shipping &amp; Delivery</h2>
                  <div className="faq-list">
                    <details>
                      <summary>How long does delivery take?</summary>
                      <p>Orders are processed within 24-48 hours. Delivery usually takes 2-5 business days in Nigeria and 5-10 business days for international orders.</p>
                    </details>
                    <details>
                      <summary>Do you ship internationally?</summary>
                      <p>Yes, we ship worldwide. Shipping fees and delivery windows are shown at checkout based on your location.</p>
                    </details>
                    <details>
                      <summary>Can I track my order?</summary>
                      <p>Yes. Once your order ships, you will receive a tracking link by email and SMS.</p>
                    </details>
                  </div>
                </article>
      
                <article className="faq-group">
                  <h2><i className="bx bx-credit-card"></i> Orders &amp; Payments</h2>
                  <div className="faq-list">
                    <details>
                      <summary>What payment methods do you accept?</summary>
                      <p>We accept major cards, bank transfer, and secure online payment gateways available at checkout.</p>
                    </details>
                    <details>
                      <summary>Can I modify my order after placing it?</summary>
                      <p>Yes, if it has not been processed. Contact support as soon as possible with your order number.</p>
                    </details>
                  </div>
                </article>
      
                <article className="faq-group">
                  <h2><i className="bx bx-undo"></i> Returns &amp; Exchanges</h2>
                  <div className="faq-list">
                    <details>
                      <summary>What is your return policy?</summary>
                      <p>Returns are accepted within 7 days for unused items in original condition, excluding cut fabrics and custom orders.</p>
                    </details>
                    <details>
                      <summary>How do I initiate a return?</summary>
                      <p>Send a message through our contact page with your order number and reason for return. We will guide you through next steps.</p>
                    </details>
                  </div>
                </article>
      
                <article className="faq-group">
                  <h2><i className="bx bx-shield"></i> Fabric Care</h2>
                  <div className="faq-list">
                    <details>
                      <summary>How should I wash my Ankara fabrics?</summary>
                      <p>Use cold water with mild detergent and hand wash or gentle cycle. Air dry in shade to keep colors vibrant.</p>
                    </details>
                    <details>
                      <summary>Does your Asooke require special care?</summary>
                      <p>Yes. Dry cleaning is best for Asooke and handwoven pieces to preserve texture and finish.</p>
                    </details>
                  </div>
                </article>
      
                <section className="faq-support">
                  <h3>Still have questions?</h3>
                  <p>Our team is happy to help you with anything else you might need.</p>
                  <a href="/userpage/contact.html" className="faq-support-btn">Contact Support</a>
                </section>
              </div>
            </section>
          </main>
      <SiteFooter />

</HomeLayout>
  );
}


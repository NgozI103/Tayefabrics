import useLegacyIndexBehavior from "../hooks/useLegacyIndexBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";
import HomeLayout from "../components/storefront/HomeLayout";
import SiteFooter from "../components/storefront/SiteFooter";

export default function ContactPage() {
  useLegacyIndexBehavior();
  useWhatsAppWidget();
  return (
    <HomeLayout activeNav="contact">
<main className="contact-page">
            <section className="contact-hero">
              <div className="container">
                <h1>Contact Us</h1>
                <p>
                  We'd love to hear from you. Whether you have a question about our fabrics,
                  pricing, or need assistance with an order.
                </p>
              </div>
            </section>
      
            <section className="contact-main">
              <div className="container">
                <div className="contact-grid">
                  <div className="contact-details">
                    <h2>Get in Touch</h2>
                    <p>
                      Our team is available Monday to Saturday, 9am to 6pm. Visit our store
                      or send us a message.
                    </p>
      
                    <article className="contact-card">
                      <i className="bx bx-map"></i>
                      <div>
                        <h3>Visit Us</h3>
                        <p>123 Fabric Lane, Victoria Island, Lagos</p>
                      </div>
                    </article>
      
                    <article className="contact-card">
                      <i className="bx bx-phone"></i>
                      <div>
                        <h3>Call Us</h3>
                        <p>+234 800 123 4567</p>
                      </div>
                    </article>
      
                    <article className="contact-card">
                      <i className="bx bx-envelope"></i>
                      <div>
                        <h3>Email Us</h3>
                        <p>hello@ankaraandco.com</p>
                      </div>
                    </article>
                  </div>
      
                  <div className="contact-form-wrap">
                    <h2>Send a Message</h2>
                    <form className="contact-form">
                      <div className="contact-field-grid">
                        <label>
                          Name
                          <input type="text" placeholder="Your name" />
                        </label>
                        <label>
                          Email
                          <input type="email" placeholder="your@email.com" />
                        </label>
                      </div>
      
                      <label>
                        Subject
                        <input type="text" placeholder="How can we help?" />
                      </label>
      
                      <label>
                        Message
                        <textarea rows="6" placeholder="Your message here..."></textarea>
                      </label>
      
                      <button type="submit" className="contact-submit-btn">
                        <i className="bx bx-send"></i>
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </main>
      <SiteFooter />

</HomeLayout>
  );
}


import useLegacyIndexBehavior from "../hooks/useLegacyIndexBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";
import HomeLayout from "../components/storefront/HomeLayout";
import SiteFooter from "../components/storefront/SiteFooter";

export default function AboutPage() {
  useLegacyIndexBehavior();
  useWhatsAppWidget();
  return (
    <HomeLayout activeNav="about">
<main className="about-page">
            <section className="about-hero">
              <div className="about-hero-overlay"></div>
              <img src="../Images/hero.png" alt="Fabric Store Interior" className="about-hero-image" />
              <div className="about-hero-content">
                <h1>Our Story</h1>
                <p>Preserving heritage through premium African textiles since 2010.</p>
              </div>
            </section>
      
            <section className="about-story">
              <div className="container">
                <div className="about-story-grid">
                  <div className="about-story-copy">
                    <h2>Crafting Excellence</h2>
                    <p>
                      Fabrics-by-Taye was born out of a passion for the vibrant colors and rich textures of
                      African textiles. What started as a small boutique in Lagos has grown into a premium
                      destination for fabric lovers worldwide.
                    </p>
                    <p>
                      We believe every piece of fabric tells a story. Our mission is to provide authentic,
                      high-quality materials that empower designers and individuals to express their unique
                      cultural identity through fashion.
                    </p>
                  </div>
      
                  <div className="about-story-visual">
                    <img src="../Images/aseobi.png" alt="Happy Customers" />
                    <div className="about-years-badge">
                      <strong>5+ Years</strong>
                      <span>Of Fabric Excellence</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
      
            <section className="about-values">
              <div className="container">
                <div className="about-heading">
                  <h2>Our Core Values</h2>
                  <span></span>
                </div>
      
                <div className="about-values-grid">
                  <article className="about-value-card">
                    <i className="bx bx-shield-quarter"></i>
                    <h3>Authenticity</h3>
                    <p>We source directly from local artisans and trusted mills.</p>
                  </article>
                  <article className="about-value-card">
                    <i className="bx bx-heart"></i>
                    <h3>Passion</h3>
                    <p>Every fabric is hand-selected for its quality and design.</p>
                  </article>
                  <article className="about-value-card">
                    <i className="bx bx-group"></i>
                    <h3>Community</h3>
                    <p>Supporting local weavers and the African fashion ecosystem.</p>
                  </article>
                  <article className="about-value-card">
                    <i className="bx bx-star"></i>
                    <h3>Quality</h3>
                    <p>Rigorous quality checks to ensure your garments last generations.</p>
                  </article>
                </div>
              </div>
            </section>
      
            <section className="about-founder">
              <div className="container">
                <div className="about-heading">
                  <h2>A Message from our Founder</h2>
                </div>
      
                <img src="../Images/hero page image 1.png" alt="Founder" className="about-founder-avatar" />
                <p className="about-founder-quote">
                  "Our goal isn't just to sell fabric; it's to weave the future of African fashion while staying rooted in our traditions."
                </p>
                <p className="about-founder-name">Taye A. - Founder & CEO</p>
              </div>
            </section>
          </main>
      <SiteFooter />

</HomeLayout>
  );
}


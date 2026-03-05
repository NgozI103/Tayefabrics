import useLegacyIndexBehavior from "../hooks/useLegacyIndexBehavior";
import useHeroSlider from "../hooks/useHeroSlider";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";
import HomeLayout from "../components/storefront/HomeLayout";
import SiteFooter from "../components/storefront/SiteFooter";

export default function IndexPage() {
  useLegacyIndexBehavior();
  useHeroSlider();
  useWhatsAppWidget();
  return (
    <HomeLayout activeNav="home" showHero>
<section className="section category-section">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="section-title">Shop by Category</h2>
                <div className="underline-accent"></div>
              </div>
      
              <div className="category-grid">
                <a href="/userpage/shop.html?category=ankara" className="category-card group">
                  <div className="overlay"></div>
                  <img
                    src="../Images/material.jpg"
                    alt="Fabrics"
                    className="zoom-img"
                  />
                  <div className="category-content">
                    <h3 className="category-title">Ankara Fabrics</h3>
                    <span className="explore-link">
                      Explore <i className="bx bx-right-arrow-alt"></i>
                    </span>
                  </div>
                </a>
      
                <a href="/userpage/shop.html?category=lace" className="category-card group">
                  <div className="overlay"></div>
                  <img
                    src="../Images/asoebi.png"
                    alt="Lace"
                    className="zoom-img"
                  />
                  <div className="category-content">
                    <h3 className="category-title">Asoebi</h3>
                    <span className="explore-link">
                      Explore <i className="bx bx-right-arrow-alt"></i>
                    </span>
                  </div>
                </a>
      
                <a href="/userpage/shop.html?category=accessories" className="category-card group">
                  <div className="overlay"></div>
                  <img
                    src="../Images/Accessories.jpg"
                    alt="Casual"
                    className="zoom-img"
                  />
                  <div className="category-content">
                    <h3 className="category-title">Accessories</h3>
                    <span className="explore-link">
                      Explore <i className="bx bx-right-arrow-alt"></i>
                    </span>
                  </div>
                </a>
      
                <a href="/userpage/shop.html?category=ready-to-wear" className="category-card group">
                  <div className="overlay"></div>
                  <img
                    src="../Images/readytowear.svg"
                    alt="Ankara"
                    className="zoom-img"
                  />
                  <div className="category-content">
                    <h3 className="category-title">Ready-to-Wear</h3>
                    <span className="explore-link">
                      Explore <i className="bx bx-right-arrow-alt"></i>
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </section>
          
      
          <section className="section arrivals-section">
            <div className="container">
              <div className="arrivals-header">
                <div>
                  <h2 className="section-title">New Arrivals</h2>
                  <p className="subtitle">Fresh from the loom to your wardrobe.</p>
                </div>
                <a href="/userpage/shop.html" className="view-all-desktop">
                  View All Products <i className="bx bx-right-arrow-alt"></i>
                </a>
              </div>
      
              <div className="products-grid">
                <a href="/userpage/shop.html" className="product-card">
                  <div className="product-img-wrapper">
                    <span className="product-tag">New Arrival</span>
                    <img
                      src="../Images/image 18.png"
                      alt="Product"
                    />
                  </div>
                  <div className="product-info">
                    <p className="product-category">LADIES</p>
                    <h4 className="product-name">Royal Blue & Gold Ankara</h4>
                    <p className="product-price">₦15,000</p>
                  </div>
                </a>
      
                <a href="/userpage/shop.html" className="product-card">
                  <div className="product-img-wrapper">
                    <span className="product-tag">New Arrival</span>
                    <img
                      src="../Images/image 11.png"
                      alt="Product"
                    />
                  </div>
                  <div className="product-info">
                    <p className="product-category">ASEOBI</p>
                    <h4 className="product-name">Emerald Green Lace</h4>
                    <p className="product-price">₦45,000</p>
                  </div>
                </a>
      
                <a href="/userpage/shop.html" className="product-card">
                  <div className="product-img-wrapper">
                    <span className="product-tag">New Arrival</span>
                    <img
                      src="../Images/image 8.png"
                      alt="Product"
                    />
                  </div>
                  <div className="product-info">
                    <p className="product-category">ASOKE</p>
                    <h4 className="product-name">Handwoven Magenta Asooke</h4>
                    <p className="product-price">₦85,000</p>
                  </div>
                </a>
      
                <a href="/userpage/shop.html" className="product-card">
                  <div className="product-img-wrapper">
                    <span className="product-tag">New Arrival</span>
                    <img
                      src="../Images/image 20.png"
                      alt="Product"
                    />
                  </div>
                  <div className="product-info">
                    <p className="product-category">MEN</p>
                    <h4 className="product-name">Men's Senator Polish Cotton</h4>
                    <p className="product-price">₦25,000</p>
                  </div>
                </a>
              </div>
      
              <div className="view-all-mobile">
                <a href="/userpage/shop.html" className="btn-outline">View All Products</a>
              </div>
            </div>
          </section>
      
          <section className="features-section">
            <div className="container">
              <div className="features-grid">
                <div className="feature-item">
                  <div className="icon-circle"><i className="bx bxs-truck"></i></div>
                  <h3>Nationwide Delivery</h3>
                  <p>Fast and reliable shipping across Nigeria and beyond.</p>
                </div>
                <div className="feature-item">
                  <div className="icon-circle"><i className="bx bx-shield-quarter"></i></div>
                  <h3>Authentic Quality</h3>
                  <p>100% genuine fabrics sourced directly from manufacturers.</p>
                </div>
                <div className="feature-item">
                  <div className="icon-circle"><i className="bx bx-time-five"></i></div>
                  <h3>24/7 Support</h3>
                  <p>Our customer service team is always here to help you.</p>
                </div>
              </div>
            </div>
          </section>
      <SiteFooter />

</HomeLayout>
  );
}

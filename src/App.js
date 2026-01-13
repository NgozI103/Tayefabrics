import React, { useState } from 'react';
import './App.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <h1 className="logo">Ankara & Co.</h1>
            <p className="logo-subtitle">PREMIUM AFRICAN FABRICS</p>
          </div>
          <nav className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#home" className="nav-link">HOME</a>
            <a href="#shop" className="nav-link">SHOP</a>
            <a href="#contact" className="nav-link">CONTACT US</a>
          </nav>
          <div className="header-actions">
            <div className="search-container">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input type="text" placeholder="Search fabrics..." className="search-input" />
            </div>
            <button className="icon-button" aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            <button className="icon-button cart-button" aria-label="Shopping Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-count">0</span>
            </button>
          </div>
          <button 
            className="mobile-menu-toggle" 
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">Timeless African Elegance</h2>
          <p className="hero-description">
            Discover our curated collection of premium Ankara, handwoven Asooke, and exquisite Lace fabrics for the modern African.
          </p>
          <button className="cta-button">Shop Collection</button>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-image">
                <img src="/image 1.png" alt="Ladies Material" />
              </div>
              <div className="category-overlay">
                <h3>Ladies Material</h3>
              </div>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img src="/image 2.png" alt="Men's Material" />
              </div>
              <div className="category-overlay">
                <h3>Men's Material</h3>
              </div>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img src="/image 3.png" alt="Asoebi Specials" />
              </div>
              <div className="category-overlay">
                <h3>Asoebi Specials</h3>
              </div>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img src="/image 4.png" alt="Royal Asooke" />
              </div>
              <div className="category-overlay">
                <h3>Royal Asooke</h3>
              </div>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img src="/image 5.png" alt="Accessories" />
              </div>
              <div className="category-overlay">
                <h3>Accessories</h3>
              </div>
            </div>
            <div className="category-card">
              <div className="category-image">
                <img src="/image 6.png" alt="Ready to Wear" />
              </div>
              <div className="category-overlay">
                <h3>Ready to Wear</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="new-arrivals-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-subtitle">Fresh from the loom to your wardrobe.</p>
            </div>
            <a href="#all-products" className="view-all-link">View All Products →</a>
          </div>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <img src="/image 7.png" alt="Royal Blue & Gold Ankara" />
                <span className="product-badge new">New Arrival</span>
                <span className="product-category-badge">LADIES</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">Royal Blue & Gold Ankara</h3>
                <p className="product-price">N15,000</p>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <img src="/image 8.png" alt="Emerald Green Lace" />
                <span className="product-category-badge">ASEOBI</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">Emerald Green Lace</h3>
                <p className="product-price">N45,000</p>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <img src="/image 9.png" alt="Handwoven Magenta Asooke" />
                <span className="product-badge new">New Arrival</span>
                <span className="product-category-badge">ASOOKE</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">Handwoven Magenta Asooke</h3>
                <p className="product-price">N85,000</p>
              </div>
            </div>
            <div className="product-card">
              <div className="product-image">
                <img src="/image 10.png" alt="Men's Senator Polish Cotton" />
                <span className="product-category-badge">MEN</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">Men's Senator Polish Cotton</h3>
                <p className="product-price">N25,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"></path>
                  <path d="M5 8v4M9 8v4M13 8v4"></path>
                </svg>
              </div>
              <h3 className="feature-title">Nationwide Delivery</h3>
              <p className="feature-description">Fast and reliable shipping across Nigeria and beyond.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="feature-title">Authentic Quality</h3>
              <p className="feature-description">100% genuine fabrics sourced directly from manufacturers.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-description">Our customer service team is always here to help you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3 className="footer-logo">Ankara & Co.</h3>
              <p className="footer-description">
                Bringing you the finest selection of authentic African fabrics, from vibrant Ankara prints to elegant Lace and handwoven Asooke.
              </p>
              <div className="social-icons">
                <a href="#" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Shop</h4>
              <ul className="footer-links">
                <li><a href="#">Ankara Fabrics</a></li>
                <li><a href="#">Lace Materials</a></li>
                <li><a href="#">Men's Collection</a></li>
                <li><a href="#">Ready To Wear</a></li>
                <li><a href="#">Accessories</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Contact Us</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>123 Fabric Lane, Victoria Island, Lagos, Nigeria</span>
                </div>
                <div className="contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+234 800 123 4567</span>
                </div>
                <div className="contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>hello@ankaraandco.com</span>
                </div>
              </div>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Newsletter</h4>
              <p className="newsletter-text">Subscribe to get updates on new arrivals and special offers.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email" className="newsletter-input" />
                <button className="newsletter-button">Join</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="copyright">© 2025 Ankara & Co. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;


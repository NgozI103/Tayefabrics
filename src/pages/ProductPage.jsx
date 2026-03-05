import useLegacyIndexBehavior from "../hooks/useLegacyIndexBehavior";
import useProductBehavior from "../hooks/useProductBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";
import HomeLayout from "../components/storefront/HomeLayout";
import SiteFooter from "../components/storefront/SiteFooter";

export default function ProductPage() {
  useLegacyIndexBehavior();
  useProductBehavior();
  useWhatsAppWidget();
  return (
    <HomeLayout activeNav="shop">
<main className="product-detail-page">
            <div className="product-detail-container">
              <a href="/userpage/shop.html" className="product-back-link">
                <i className="bx bx-chevron-left"></i>
                Back to Shop
              </a>
      
              <section className="product-detail-layout" id="product-detail-view">
                <div className="product-detail-media">
                  <img id="product-detail-image" src="" alt="Product image" />
                </div>
      
                <div className="product-detail-info">
                  <p className="product-detail-category" id="product-detail-category"></p>
                  <h1 className="product-detail-name" id="product-detail-name"></h1>
                  <p className="product-detail-price" id="product-detail-price"></p>
      
                  <div className="product-divider"></div>
      
                  <p className="product-detail-description" id="product-detail-description"></p>
      
                  <div className="product-quality-grid">
                    <p><i className="bx bx-shield-quarter"></i> 100% Authentic Quality</p>
                    <p><i className="bx bx-package"></i> Nationwide Delivery</p>
                    <p><i className="bx bx-check-shield"></i> 7-Day Easy Returns</p>
                  </div>
      
                  <div className="product-divider"></div>
      
                  <div className="product-option-block" id="product-detail-options"></div>
                  <p className="product-option-error" id="product-option-error" aria-live="polite"></p>
      
                  <div className="product-detail-actions">
                    <button type="button" className="product-cart-btn">
                      <i className="bx bx-cart-add"></i>
                      Add to Cart
                    </button>
                    <button type="button" className="product-wishlist-btn">Wishlist</button>
                  </div>
      
                  <div className="product-meta">
                    <h3>Product Details</h3>
                    <div className="product-meta-grid">
                      <p>Material</p>
                      <p id="product-detail-material"></p>
                      <p>Length</p>
                      <p id="product-detail-length"></p>
                      <p>Origin</p>
                      <p id="product-detail-origin"></p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
      <SiteFooter />

</HomeLayout>
  );
}


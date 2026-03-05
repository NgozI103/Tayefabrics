import useLegacyIndexBehavior from "../hooks/useLegacyIndexBehavior";
import useShopBehavior from "../hooks/useShopBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";
import HomeLayout from "../components/storefront/HomeLayout";
import SiteFooter from "../components/storefront/SiteFooter";

export default function ShopPage() {
  useLegacyIndexBehavior();
  useShopBehavior();
  useWhatsAppWidget();
  return (
    <HomeLayout activeNav="shop">
<main className="shop-page">
            <section className="shop-section">
              <div className="container">
                <div className="shop-layout">
                  <aside className="shop-sidebar" id="shop-sidebar">
                    <button id="mobile-filter-close" className="shop-filter-close" type="button" aria-label="Close filters">
                      <i className="bx bx-x"></i>
                    </button>
                    <h1 className="shop-title">Shop</h1>
                    <p className="shop-results" id="result-count">Showing 0 results</p>
      
                    <div className="filter-group">
                      <h3>Categories</h3>
                      <div id="category-filters" className="category-filters"></div>
                    </div>
      
                    <div className="filter-group">
                      <h3>Price Range</h3>
                      <input
                        id="price-range"
                        type="range"
                        min="0"
                        max="200000"
                        step="500"
                        value="200000"
                      />
                      <div className="price-scale">
                        <span>₦0</span>
                        <span id="price-range-value">₦200,000.00</span>
                      </div>
                    </div>
                  </aside>
      
                  <section className="shop-content">
                    <button id="mobile-filter-toggle" className="mobile-filter-toggle" type="button">
                      Filters <i className="bx bx-slider-alt"></i>
                    </button>
                    <div id="shop-products" className="shop-products-grid"></div>
                    <div id="shop-pagination" className="shop-pagination"></div>
                  </section>
                </div>
              </div>
            </section>
          </main>
      <SiteFooter />

</HomeLayout>
  );
}


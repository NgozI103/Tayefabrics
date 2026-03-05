import useLegacyIndexBehavior from "../hooks/useLegacyIndexBehavior";
import useCartWishlistBehavior from "../hooks/useCartWishlistBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";
import HomeLayout from "../components/storefront/HomeLayout";
import SiteFooter from "../components/storefront/SiteFooter";

export default function CartPage() {
  useLegacyIndexBehavior();
  useCartWishlistBehavior();
  useWhatsAppWidget();
  return (
    <HomeLayout activeNav="">
<main className="cart-wishlist-page" data-page="cart">
            <section className="container cart-wishlist-wrap">
              <h3 className="cart-wishlist-title">My Cart</h3>
              <div className="cw-header-divider" aria-hidden="true"></div>
      
              <div className="cw-empty" id="cart-empty-state">
                <div className="cw-empty-illustration"><i className="bx bx-cart"></i></div>
                <h2>Your cart is empty</h2>
                <p>Add items you love and find them here</p>
                <a href="/userpage/shop.html" className="cw-primary-btn cw-empty-btn"
                  ><i className="bx bx-store"></i><span>Start Shopping</span></a
                >
              </div>
      
              <div className="cw-content" id="cart-content" hidden>
                <div className="cw-list" id="cart-items"></div>
                <aside className="cw-summary">
                  <h3>Cart Summary</h3>
                  <div className="cw-summary-row">
                    <span>Item Count</span>
                    <strong id="cart-item-count">0</strong>
                  </div>
                  <div className="cw-summary-row">
                    <span>Subtotal</span>
                    <strong id="cart-subtotal">₦0.00</strong>
                  </div>
                  <div className="cw-summary-row">
                    <span>Total</span>
                    <strong id="cart-total">₦0.00</strong>
                  </div>
                  <button type="button" className="cw-primary-btn" id="checkout-btn">Checkout</button>
                </aside>
              </div>
            </section>
          </main>
      <SiteFooter />

</HomeLayout>
  );
}


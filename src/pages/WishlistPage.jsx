import useLegacyIndexBehavior from "../hooks/useLegacyIndexBehavior";
import useCartWishlistBehavior from "../hooks/useCartWishlistBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";
import HomeLayout from "../components/storefront/HomeLayout";
import SiteFooter from "../components/storefront/SiteFooter";

export default function WishlistPage() {
  useLegacyIndexBehavior();
  useCartWishlistBehavior();
  useWhatsAppWidget();
  return (
    <HomeLayout activeNav="">
<main className="cart-wishlist-page" data-page="wishlist">
            <section className="container cart-wishlist-wrap">
              <h3 className="cart-wishlist-title">My Wishlist</h3>
              <div className="cw-header-divider" aria-hidden="true"></div>
      
              <div className="cw-empty" id="wishlist-empty-state">
                <div className="cw-empty-illustration"><i className="bx bx-heart"></i></div>
                <h2>Your wishlist is empty</h2>
                <p>Save items you love and find them here</p>
                <a href="/userpage/shop.html" className="cw-primary-btn cw-empty-btn"
                  ><i className="bx bx-store"></i><span>Start Shopping</span></a
                >
              </div>
      
              <div className="cw-content" id="wishlist-content" hidden>
                <div className="cw-list" id="wishlist-items"></div>
              </div>
            </section>
          </main>
      <SiteFooter />

</HomeLayout>
  );
}


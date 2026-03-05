import useLegacyIndexBehavior from "../hooks/useLegacyIndexBehavior";
import useCheckoutBehavior from "../hooks/useCheckoutBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";
import HomeLayout from "../components/storefront/HomeLayout";

export default function CheckoutPage() {
  useLegacyIndexBehavior();
  useCheckoutBehavior();
  useWhatsAppWidget();
  return (
    <HomeLayout activeNav="" showBottomNav={false}>
<main className="checkout-page">
            <section className="container checkout-wrap">
              <h1 className="checkout-title">Checkout</h1>
              <div className="checkout-grid">
                <form id="checkout-form" className="checkout-form" noValidate>
                  <div className="checkout-section">
                    <h2>Shipping Address</h2>
                    <div className="checkout-field-grid">
                      <label>Name<input type="text" id="ship-name" required /></label>
                      <label>Street<input type="text" id="ship-street" required /></label>
                      <label>City<input type="text" id="ship-city" required /></label>
                      <label>State<input type="text" id="ship-state" required /></label>
                      <label>ZIP<input type="text" id="ship-zip" required /></label>
                      <label>Country<input type="text" id="ship-country" required /></label>
                    </div>
                  </div>
      
                  <div className="checkout-section">
                    <h2>Payment Method</h2>
                    <div className="checkout-payment-options">
                      <label><input type="radio" name="payment" value="Credit Card" required /> Credit Card</label>
                      <label><input type="radio" name="payment" value="PayPal" /> PayPal</label>
                      <label><input type="radio" name="payment" value="Cash on Delivery" /> Cash on Delivery</label>
                    </div>
                  </div>
      
                  <p id="checkout-error" className="checkout-error" aria-live="polite"></p>
                  <button type="submit" className="cw-primary-btn checkout-confirm-btn">Confirm Order</button>
                </form>
      
                <aside className="checkout-summary">
                  <h2>Order Summary</h2>
                  <div id="checkout-items" className="checkout-items"></div>
                  <div className="checkout-summary-row">
                    <span>Items Total</span>
                    <strong id="checkout-items-total">₦0.00</strong>
                  </div>
                  <div className="checkout-summary-row">
                    <span>Delivery Fee</span>
                    <strong id="checkout-delivery-fee">₦5,000.00</strong>
                  </div>
                  <div className="checkout-summary-row checkout-summary-grand">
                    <span>Grand Total</span>
                    <strong id="checkout-grand-total">₦0.00</strong>
                  </div>
                </aside>
              </div>
            </section>
          </main>
    </HomeLayout>
  );
}

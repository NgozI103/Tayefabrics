import { useEffect } from "react";
import { navigateWithinApp } from "../utils/navigation";

export default function useCheckoutBehavior() {
  useEffect(() => {
    const CART_KEY = "taye_cart";
    const DELIVERY_FEE = 5000;

    const form = document.getElementById("checkout-form");
    const errorNode = document.getElementById("checkout-error");
    const itemsNode = document.getElementById("checkout-items");
    const itemsTotalNode = document.getElementById("checkout-items-total");
    const deliveryNode = document.getElementById("checkout-delivery-fee");
    const grandNode = document.getElementById("checkout-grand-total");

    const naira = (value) =>
      new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
        Number(value) || 0,
      );

    const readCart = () => {
      try {
        const raw = localStorage.getItem(CART_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    };

    const cart = readCart();

    const getOptions = (item) => {
      const options = item && item.selectedOptions ? item.selectedOptions : {};
      const entries = Object.entries(options).filter(([, value]) => Boolean(value));
      if (!entries.length) return "";
      return entries
        .map(([key, value]) => `${key.charAt(0).toUpperCase()}${key.slice(1)}: ${value}`)
        .join(" | ");
    };

    const subtotal = cart.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * Math.max(1, Number(item.quantity) || 1),
      0,
    );

    const renderSummary = () => {
      if (!itemsNode) return;
      if (!cart.length) {
        itemsNode.innerHTML =
          "<p class='checkout-empty'>Your cart is empty. <a href='shop.html'>Go to shop</a>.</p>";
      } else {
        itemsNode.innerHTML = cart
          .map((item) => {
            const optionLabel = getOptions(item);
            const qty = Math.max(1, Number(item.quantity) || 1);
            return `
              <article class="checkout-item">
                <div>
                  <h3>${item.name || "Product"}</h3>
                  ${optionLabel ? `<p>${optionLabel}</p>` : ""}
                  <p>Qty: ${qty}</p>
                </div>
                <strong>${naira((Number(item.price) || 0) * qty)}</strong>
              </article>
            `;
          })
          .join("");
      }

      if (itemsTotalNode) itemsTotalNode.textContent = naira(subtotal);
      if (deliveryNode) deliveryNode.textContent = naira(DELIVERY_FEE);
      if (grandNode) grandNode.textContent = naira(subtotal + (cart.length ? DELIVERY_FEE : 0));
    };

    const showSuccessBanner = (orderNo) => {
      const banner = document.createElement("div");
      banner.className = "checkout-success-banner";
      banner.innerHTML = `
        <p><strong>Order Placed Successfully!</strong> Order number: ${orderNo}</p>
      `;
      document.body.prepend(banner);
      window.requestAnimationFrame(() => {
        banner.classList.add("show");
      });
    };

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!cart.length) {
          if (errorNode) errorNode.textContent = "Your cart is empty.";
          return;
        }

        const requiredFields = form.querySelectorAll("input[required]");
        const allFilled = Array.from(requiredFields).every((input) => String(input.value || "").trim());
        const paymentSelected = Boolean(form.querySelector('input[name="payment"]:checked'));

        if (!allFilled || !paymentSelected) {
          if (errorNode) errorNode.textContent = "Please complete all shipping and payment fields.";
          return;
        }

        if (errorNode) errorNode.textContent = "";

        const orderNo = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
        showSuccessBanner(orderNo);
        localStorage.setItem(CART_KEY, JSON.stringify([]));
        window.dispatchEvent(new Event("taye-storage-update"));

        window.setTimeout(() => {
          navigateWithinApp("home.html");
        }, 3000);
      });
    }

    renderSummary();
  }, []);
}

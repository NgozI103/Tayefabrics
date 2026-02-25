const CART_KEY = "taye_cart";
const WISHLIST_KEY = "taye_wishlist";

const naira = (value) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    Number(value) || 0
  );

const readStorage = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

let cart = readStorage(CART_KEY);
let wishlist = readStorage(WISHLIST_KEY);

const persist = () => {
  writeStorage(CART_KEY, cart);
  writeStorage(WISHLIST_KEY, wishlist);
};

const cartList = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty-state");
const cartContent = document.getElementById("cart-content");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");

const wishlistList = document.getElementById("wishlist-items");
const wishlistEmpty = document.getElementById("wishlist-empty-state");
const wishlistContent = document.getElementById("wishlist-content");

const renderCart = () => {
  if (!cartList || !cartEmpty || !cartContent) return;

  if (!cart.length) {
    cartEmpty.hidden = false;
    cartContent.hidden = true;
    return;
  }

  cartEmpty.hidden = true;
  cartContent.hidden = false;

  cartList.innerHTML = cart
    .map(
      (item) => `
      <article class="cw-item" data-id="${item.id}">
        <img src="${item.image || "/Images/image 18.png"}" alt="${item.name || "Product"}" class="cw-image" />
        <div class="cw-info">
          <h3>${item.name || "Fabric Item"}</h3>
          <p>${naira(item.price)}</p>
        </div>
        <div class="cw-actions">
          <label>
            Qty
            <input class="cw-qty-input" type="number" min="1" value="${item.quantity || 1}" data-action="cart-qty" data-id="${item.id}" />
          </label>
          <button type="button" class="cw-link-btn" data-action="cart-remove" data-id="${item.id}">Remove</button>
        </div>
      </article>
    `
    )
    .join("");

  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  if (cartSubtotal) cartSubtotal.textContent = naira(subtotal);
  if (cartTotal) cartTotal.textContent = naira(subtotal);
};

const renderWishlist = () => {
  if (!wishlistList || !wishlistEmpty || !wishlistContent) return;

  if (!wishlist.length) {
    wishlistEmpty.hidden = false;
    wishlistContent.hidden = true;
    return;
  }

  wishlistEmpty.hidden = true;
  wishlistContent.hidden = false;

  wishlistList.innerHTML = wishlist
    .map(
      (item) => `
      <article class="cw-item" data-id="${item.id}">
        <img src="${item.image || "/Images/image 18.png"}" alt="${item.name || "Product"}" class="cw-image" />
        <div class="cw-info">
          <h3>${item.name || "Fabric Item"}</h3>
          <p>${naira(item.price)}</p>
        </div>
        <div class="cw-actions">
          <button type="button" class="cw-secondary-btn" data-action="wishlist-move" data-id="${item.id}">Move to Cart</button>
          <button type="button" class="cw-link-btn" data-action="wishlist-remove" data-id="${item.id}">Remove</button>
        </div>
      </article>
    `
    )
    .join("");
};

const render = () => {
  renderCart();
  renderWishlist();
};

document.addEventListener("click", (event) => {
  const actionEl = event.target.closest("[data-action]");
  if (!actionEl) return;

  const { action, id } = actionEl.dataset;
  if (!id) return;

  if (action === "cart-remove") {
    cart = cart.filter((item) => String(item.id) !== id);
  }

  if (action === "wishlist-remove") {
    wishlist = wishlist.filter((item) => String(item.id) !== id);
  }

  if (action === "wishlist-move") {
    const wishlistItem = wishlist.find((item) => String(item.id) === id);
    if (wishlistItem) {
      const existingCartItem = cart.find((item) => String(item.id) === id);
      if (existingCartItem) {
        existingCartItem.quantity = (Number(existingCartItem.quantity) || 1) + 1;
      } else {
        cart.push({ ...wishlistItem, quantity: 1 });
      }
      wishlist = wishlist.filter((item) => String(item.id) !== id);
    }
  }

  persist();
  render();
});

document.addEventListener("input", (event) => {
  const qtyInput = event.target.closest('[data-action="cart-qty"]');
  if (!qtyInput) return;

  const id = qtyInput.dataset.id;
  const quantity = Math.max(1, Number(qtyInput.value) || 1);
  const item = cart.find((cartItem) => String(cartItem.id) === id);
  if (!item) return;

  item.quantity = quantity;
  persist();
  renderCart();
});

const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    alert("Checkout flow not connected yet.");
  });
}

render();

window.TayeCartWishlist = {
  addToCart(product) {
    if (!product || !product.id) return;
    const existing = cart.find((item) => String(item.id) === String(product.id));
    if (existing) {
      existing.quantity = (Number(existing.quantity) || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    persist();
    renderCart();
  },
  addToWishlist(product) {
    if (!product || !product.id) return;
    const exists = wishlist.some((item) => String(item.id) === String(product.id));
    if (!exists) wishlist.push(product);
    persist();
    renderWishlist();
  },
};

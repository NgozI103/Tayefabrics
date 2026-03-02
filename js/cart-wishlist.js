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
  window.dispatchEvent(new Event("taye-storage-update"));
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
const cartItemCount = document.getElementById("cart-item-count");

const wishlistList = document.getElementById("wishlist-items");
const wishlistEmpty = document.getElementById("wishlist-empty-state");
const wishlistContent = document.getElementById("wishlist-content");

const getOptionLabel = (item) => {
  const options = item && item.selectedOptions ? item.selectedOptions : {};
  const entries = Object.entries(options).filter(([, value]) => Boolean(value));
  if (!entries.length) return "";
  return entries
    .map(([key, value]) => `${key.charAt(0).toUpperCase()}${key.slice(1)}: ${value}`)
    .join(" | ");
};

const itemIdentity = (item) =>
  `${item.id}::${encodeURIComponent(JSON.stringify(item.selectedOptions || {}))}`;

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
    .map((item) => {
      const identity = itemIdentity(item);
      const optionLabel = getOptionLabel(item);
      return `
      <article class="cw-item" data-id="${identity}">
        <img src="${item.image || "/Images/image 18.png"}" alt="${item.name || "Product"}" class="cw-image" />
        <div class="cw-info">
          <h3>${item.name || "Fabric Item"}</h3>
          ${optionLabel ? `<p class="cw-option-note">${optionLabel}</p>` : ""}
          <p>${naira(item.price)}</p>
        </div>
        <div class="cw-actions">
          <div class="cw-qty-control" aria-label="Quantity selector">
            <button type="button" class="cw-qty-btn" data-action="cart-decrease" data-id="${identity}" aria-label="Decrease quantity">-</button>
            <span class="cw-qty-value">${Math.max(1, Number(item.quantity) || 1)}</span>
            <button type="button" class="cw-qty-btn" data-action="cart-increase" data-id="${identity}" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="cw-link-btn" data-action="cart-remove" data-id="${identity}">Remove</button>
        </div>
      </article>
    `;
    })
    .join("");

  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * Math.max(1, Number(item.quantity) || 1),
    0
  );
  const count = cart.reduce((sum, item) => sum + Math.max(1, Number(item.quantity) || 1), 0);

  if (cartSubtotal) cartSubtotal.textContent = naira(subtotal);
  if (cartTotal) cartTotal.textContent = naira(subtotal);
  if (cartItemCount) cartItemCount.textContent = String(count);
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
    .map((item) => {
      const identity = itemIdentity(item);
      const optionLabel = getOptionLabel(item);
      return `
      <article class="cw-item" data-id="${identity}">
        <img src="${item.image || "/Images/image 18.png"}" alt="${item.name || "Product"}" class="cw-image" />
        <div class="cw-info">
          <h3>${item.name || "Fabric Item"}</h3>
          ${optionLabel ? `<p class="cw-option-note">${optionLabel}</p>` : ""}
          <p>${naira(item.price)}</p>
        </div>
        <div class="cw-actions">
          <button type="button" class="cw-secondary-btn" data-action="wishlist-move" data-id="${identity}">Add to Cart</button>
          <button type="button" class="cw-link-btn" data-action="wishlist-remove" data-id="${identity}">Remove</button>
        </div>
      </article>
    `;
    })
    .join("");
};

const render = () => {
  renderCart();
  renderWishlist();
};

const findByIdentity = (items, identity) =>
  items.find((item) => itemIdentity(item) === identity);

const removeWithAnimation = (identity, listNode, onDone) => {
  const row = listNode
    ? Array.from(listNode.querySelectorAll("[data-id]")).find((item) => item.dataset.id === identity)
    : null;
  if (!row) {
    onDone();
    return;
  }
  row.classList.add("is-removing");
  window.setTimeout(onDone, 220);
};

document.addEventListener("click", (event) => {
  const actionEl = event.target.closest("[data-action]");
  if (!actionEl) return;

  const { action, id } = actionEl.dataset;
  if (!id) return;

  if (action === "cart-remove") {
    removeWithAnimation(id, cartList, () => {
      cart = cart.filter((item) => itemIdentity(item) !== id);
      persist();
      render();
    });
    return;
  }

  if (action === "wishlist-remove") {
    removeWithAnimation(id, wishlistList, () => {
      wishlist = wishlist.filter((item) => itemIdentity(item) !== id);
      persist();
      render();
    });
    return;
  }

  if (action === "wishlist-move") {
    const wishlistItem = findByIdentity(wishlist, id);
    if (wishlistItem) {
      const existingCartItem = findByIdentity(cart, id);
      if (existingCartItem) {
        existingCartItem.quantity = Math.max(1, Number(existingCartItem.quantity) || 1) + 1;
      } else {
        cart.push({ ...wishlistItem, quantity: 1 });
      }
    }
    persist();
    renderCart();
    return;
  }

  if (action === "cart-increase") {
    const item = findByIdentity(cart, id);
    if (!item) return;
    item.quantity = Math.max(1, Number(item.quantity) || 1) + 1;
    persist();
    renderCart();
    return;
  }

  if (action === "cart-decrease") {
    const item = findByIdentity(cart, id);
    if (!item) return;
    const nextQty = Math.max(1, Number(item.quantity) || 1) - 1;
    item.quantity = Math.max(1, nextQty);
    persist();
    renderCart();
  }
});

const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (!cart.length) return;
    window.location.href = "checkout.html";
  });
}

render();

window.TayeCartWishlist = {
  addToCart(product) {
    if (!product || !product.id) return;
    const existing = findByIdentity(cart, itemIdentity(product));
    if (existing) {
      existing.quantity = Math.max(1, Number(existing.quantity) || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    persist();
    renderCart();
  },
  addToWishlist(product) {
    if (!product || !product.id) return;
    const exists = wishlist.some((item) => itemIdentity(item) === itemIdentity(product));
    if (!exists) wishlist.push(product);
    persist();
    renderWishlist();
  },
};

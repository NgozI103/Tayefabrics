const detailImage = document.getElementById("product-detail-image");
const detailCategory = document.getElementById("product-detail-category");
const detailName = document.getElementById("product-detail-name");
const detailPrice = document.getElementById("product-detail-price");
const detailDescription = document.getElementById("product-detail-description");
const detailMaterial = document.getElementById("product-detail-material");
const detailLength = document.getElementById("product-detail-length");
const detailOrigin = document.getElementById("product-detail-origin");
const detailView = document.getElementById("product-detail-view");
const optionBlock = document.getElementById("product-detail-options");
const optionError = document.getElementById("product-option-error");

const cartButton = document.querySelector(".product-cart-btn");
const wishlistButton = document.querySelector(".product-wishlist-btn");

const CART_KEY = "taye_cart";
const WISHLIST_KEY = "taye_wishlist";

const products = Array.isArray(window.TAYE_PRODUCTS) ? window.TAYE_PRODUCTS : [];

function formatPrice(value) {
  return `₦${value.toLocaleString()}`;
}

function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("taye-storage-update"));
}

function showToast(message, type = "success") {
  let toast = document.getElementById("shop-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "shop-toast";
    toast.className = "shop-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.remove("show", "error");
  if (type === "error") toast.classList.add("error");

  window.requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function isReadyToWear(category) {
  return String(category || "").toLowerCase().includes("ready-to-wear");
}

function renderMissingState() {
  if (!detailView) return;
  detailView.innerHTML = `
    <div class="product-not-found">
      <h2>Product not found</h2>
      <p>The product you selected is unavailable.</p>
      <a href="shop.html">Go back to Shop</a>
    </div>
  `;
}

function renderOptionSelectors(product) {
  if (!optionBlock || !product) return;

  if (isReadyToWear(product.category)) {
    optionBlock.innerHTML = `
      <div class="product-option-group">
        <h4>Select Size</h4>
        <div class="product-option-buttons" data-option-group="size">
          <button type="button" class="product-option-btn" data-option-value="S">S</button>
          <button type="button" class="product-option-btn" data-option-value="M">M</button>
          <button type="button" class="product-option-btn" data-option-value="L">L</button>
          <button type="button" class="product-option-btn" data-option-value="XL">XL</button>
        </div>
      </div>
      <div class="product-option-group">
        <h4>Select Color</h4>
        <div class="product-option-buttons" data-option-group="color">
          <button type="button" class="product-option-btn" data-option-value="Red">Red</button>
          <button type="button" class="product-option-btn" data-option-value="Blue">Blue</button>
          <button type="button" class="product-option-btn" data-option-value="Black">Black</button>
          <button type="button" class="product-option-btn" data-option-value="Green">Green</button>
        </div>
      </div>
    `;
  } else {
    optionBlock.innerHTML = `
      <div class="product-option-group">
        <h4>Select Length (Yards)</h4>
        <div class="product-option-buttons" data-option-group="length">
          <button type="button" class="product-option-btn" data-option-value="3 yards">3 Yards</button>
          <button type="button" class="product-option-btn" data-option-value="6 yards">6 Yards</button>
        </div>
      </div>
    `;
  }

  optionBlock.querySelectorAll(".product-option-buttons").forEach((groupNode) => {
    groupNode.querySelectorAll(".product-option-btn").forEach((button) => {
      button.addEventListener("click", () => {
        groupNode.querySelectorAll(".product-option-btn").forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        if (optionError) optionError.textContent = "";
      });
    });
  });
}

function collectSelectedOptions(product) {
  if (!optionBlock || !product) return { valid: false, options: {} };

  if (isReadyToWear(product.category)) {
    const size =
      optionBlock.querySelector('[data-option-group="size"] .product-option-btn.active')?.dataset.optionValue || "";
    const color =
      optionBlock.querySelector('[data-option-group="color"] .product-option-btn.active')?.dataset.optionValue || "";
    if (!size || !color) return { valid: false, options: {} };
    return { valid: true, options: { size, color } };
  }

  const length =
    optionBlock.querySelector('[data-option-group="length"] .product-option-btn.active')?.dataset.optionValue || "";
  if (!length) return { valid: false, options: {} };
  return { valid: true, options: { length } };
}

function addToCart(product, selectedOptions) {
  const cart = readStorage(CART_KEY);
  const optionKey = JSON.stringify(selectedOptions || {});

  const existing = cart.find(
    (item) => String(item.id) === String(product.id) && JSON.stringify(item.selectedOptions || {}) === optionKey
  );

  if (existing) {
    existing.quantity = (Number(existing.quantity) || 1) + 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      image: product.image,
      price: Number(product.price) || 0,
      quantity: 1,
      category: product.category,
      selectedOptions,
    });
  }

  writeStorage(CART_KEY, cart);
}

function addToWishlist(product, selectedOptions) {
  const wishlist = readStorage(WISHLIST_KEY);
  const optionKey = JSON.stringify(selectedOptions || {});

  const exists = wishlist.some(
    (item) => String(item.id) === String(product.id) && JSON.stringify(item.selectedOptions || {}) === optionKey
  );

  if (exists) return false;

  wishlist.push({
    id: product.id,
    name: product.name,
    image: product.image,
    price: Number(product.price) || 0,
    category: product.category,
    selectedOptions,
  });

  writeStorage(WISHLIST_KEY, wishlist);
  return true;
}

function renderProductDetails(product) {
  if (!product) {
    renderMissingState();
    return;
  }

  detailImage.src = product.image;
  detailImage.alt = product.name;
  detailCategory.textContent = product.category.toUpperCase();
  detailName.textContent = product.name;
  detailPrice.textContent = formatPrice(product.price);
  detailDescription.textContent = product.description || "";
  detailMaterial.textContent = product.material || "Premium Cotton Wax";
  detailLength.textContent = product.length || "6 Yards";
  detailOrigin.textContent = product.origin || "West Africa";

  renderOptionSelectors(product);

  if (cartButton) {
    cartButton.addEventListener("click", () => {
      const { valid, options } = collectSelectedOptions(product);
      if (!valid) {
        if (optionError) optionError.textContent = "Please select required options first.";
        return;
      }
      if (optionError) optionError.textContent = "";
      addToCart(product, options);
      showToast("Added to cart.");
    });
  }

  if (wishlistButton) {
    wishlistButton.addEventListener("click", () => {
      const { valid, options } = collectSelectedOptions(product);
      if (!valid) {
        if (optionError) optionError.textContent = "Please select required options first.";
        return;
      }
      if (optionError) optionError.textContent = "";
      const added = addToWishlist(product, options);
      showToast(added ? "Added to wishlist." : "Item already in wishlist.", added ? "success" : "error");
    });
  }
}

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
const intent = params.get("intent");
const selectedProduct = products.find((product) => product.id === productId);

renderProductDetails(selectedProduct);

if (intent && optionError) {
  optionError.textContent = "Select options below, then add to cart or wishlist.";
}

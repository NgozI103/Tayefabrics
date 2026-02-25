const detailImage = document.getElementById("product-detail-image");
const detailCategory = document.getElementById("product-detail-category");
const detailName = document.getElementById("product-detail-name");
const detailPrice = document.getElementById("product-detail-price");
const detailDescription = document.getElementById("product-detail-description");
const detailMaterial = document.getElementById("product-detail-material");
const detailLength = document.getElementById("product-detail-length");
const detailOrigin = document.getElementById("product-detail-origin");
const detailView = document.getElementById("product-detail-view");

const products = Array.isArray(window.TAYE_PRODUCTS) ? window.TAYE_PRODUCTS : [];

function formatPrice(value) {
  return `₦${value.toLocaleString()}`;
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
}

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
const selectedProduct = products.find((product) => product.id === productId);

renderProductDetails(selectedProduct);

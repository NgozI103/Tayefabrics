const productContainer = document.getElementById("shop-products");
const paginationContainer = document.getElementById("shop-pagination");
const resultCount = document.getElementById("result-count");
const categoryFilters = document.getElementById("category-filters");
const priceRange = document.getElementById("price-range");
const priceRangeValue = document.getElementById("price-range-value");
const mobileFilterToggle = document.getElementById("mobile-filter-toggle");
const mobileFilterClose = document.getElementById("mobile-filter-close");
const sidebar = document.getElementById("shop-sidebar");

const products = Array.isArray(window.TAYE_PRODUCTS) ? window.TAYE_PRODUCTS : [];

const categories = [...new Set(products.map((product) => product.category))];

const itemsPerPage = 6;
let currentPage = 1;
let selectedCategories = new Set(categories);
let selectedMaxPrice = 200000;

function formatPrice(value) {
  return `₦${value.toLocaleString()}`;
}

function renderCategoryFilters() {
  if (!categoryFilters) return;

  categoryFilters.innerHTML = `
    <label class="filter-check">
      <input type="checkbox" value="__all__" data-select-all="true" checked />
      <span>Select All</span>
    </label>
    ${categories
      .map(
        (category) => `
          <label class="filter-check">
            <input type="checkbox" value="${category}" checked />
            <span>${category}</span>
          </label>
        `,
      )
      .join("")}
  `;

  const selectAllCheckbox = categoryFilters.querySelector("input[data-select-all='true']");
  const categoryCheckboxes = categoryFilters.querySelectorAll("input[type='checkbox']:not([data-select-all='true'])");

  const syncSelectAllCheckbox = () => {
    if (!selectAllCheckbox) return;
    selectAllCheckbox.checked = selectedCategories.size === categories.length;
  };

  categoryFilters.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.dataset.selectAll === "true") {
        if (checkbox.checked) {
          selectedCategories = new Set(categories);
          categoryCheckboxes.forEach((item) => {
            item.checked = true;
          });
        } else {
          selectedCategories.clear();
          categoryCheckboxes.forEach((item) => {
            item.checked = false;
          });
        }
        currentPage = 1;
        renderShop();
        return;
      }

      if (checkbox.checked) {
        selectedCategories.add(checkbox.value);
      } else {
        selectedCategories.delete(checkbox.value);
      }
      syncSelectAllCheckbox();
      currentPage = 1;
      renderShop();
    });
  });

  syncSelectAllCheckbox();
}

function getFilteredProducts() {
  return products.filter((product) => {
    const inCategory = selectedCategories.has(product.category);
    const inPrice = product.price <= selectedMaxPrice;
    return inCategory && inPrice;
  });
}

function renderProducts(filteredProducts) {
  if (!productContainer) return;

  if (!filteredProducts.length) {
    productContainer.innerHTML = "<p class='empty-state'>No products match your filters.</p>";
    return;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  productContainer.innerHTML = pageProducts
    .map(
      (product) => `
        <article class="shop-product-card" data-product-id="${product.id}" tabindex="0" role="link" aria-label="View ${product.name}">
          <div class="shop-image-wrap">
            <img src="${product.image}" alt="${product.name}" />
            <div class="shop-product-actions" aria-label="Quick actions">
              <button class="shop-action-btn" type="button" aria-label="Add to wishlist">
                <i class="bx bx-heart"></i>
              </button>
              <button class="shop-action-btn" type="button" aria-label="Add to cart">
                <i class="bx bx-cart"></i>
              </button>
            </div>
          </div>
          <div class="shop-product-info">
            <h3 class="shop-product-title">${product.name}</h3>
            <p class="shop-product-price">${formatPrice(product.price)}</p>
            <button class="shop-add-basket" type="button">
              Add to basket <i class="bx bx-cart"></i>
            </button>
          </div>
        </article>
      `,
    )
    .join("");

  bindProductCardNavigation();
}

function bindProductCardNavigation() {
  if (!productContainer) return;

  productContainer.querySelectorAll(".shop-product-card").forEach((card) => {
    const goToProduct = () => {
      const productId = card.dataset.productId;
      if (!productId) return;
      window.location.href = `product.html?id=${productId}`;
    };

    card.addEventListener("click", (event) => {
      if (event.target.closest("button, a, input, label")) return;
      goToProduct();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        goToProduct();
      }
    });
  });
}

function renderPagination(filteredProducts) {
  if (!paginationContainer) return;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  if (totalPages <= 1) {
    paginationContainer.innerHTML = "";
    return;
  }

  const numberButtons = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `<button type="button" class="page-btn ${page === currentPage ? "active" : ""}" data-page="${page}">${page}</button>`;
  }).join("");

  paginationContainer.innerHTML = `
    <button type="button" class="page-btn" data-page="prev" ${currentPage === 1 ? "disabled" : ""}>
      <i class="bx bx-chevron-left"></i>
    </button>
    ${numberButtons}
    <button type="button" class="page-btn" data-page="next" ${currentPage === totalPages ? "disabled" : ""}>
      <i class="bx bx-chevron-right"></i>
    </button>
  `;

  paginationContainer.querySelectorAll(".page-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.dataset.page;
      if (page === "prev" && currentPage > 1) {
        currentPage -= 1;
      } else if (page === "next" && currentPage < totalPages) {
        currentPage += 1;
      } else if (page !== "prev" && page !== "next") {
        currentPage = Number(page);
      }
      renderShop();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function renderShop() {
  const filteredProducts = getFilteredProducts();
  if (resultCount) {
    resultCount.textContent = `Showing ${filteredProducts.length} results`;
  }
  renderProducts(filteredProducts);
  renderPagination(filteredProducts);
}

function bindControls() {
  const closeFilter = () => {
    if (!sidebar) return;
    sidebar.classList.remove("open");
    document.body.classList.remove("filter-open");
  };

  const openFilter = () => {
    if (!sidebar) return;
    sidebar.classList.add("open");
    document.body.classList.add("filter-open");
  };

  if (priceRange) {
    priceRange.addEventListener("input", () => {
      selectedMaxPrice = Number(priceRange.value);
      if (priceRangeValue) {
        priceRangeValue.textContent = formatPrice(selectedMaxPrice);
      }
      currentPage = 1;
      renderShop();
    });
  }

  if (mobileFilterToggle && sidebar) {
    mobileFilterToggle.addEventListener("click", () => {
      if (sidebar.classList.contains("open")) {
        closeFilter();
      } else {
        openFilter();
      }
    });
  }

  if (mobileFilterClose) {
    mobileFilterClose.addEventListener("click", closeFilter);
  }

  document.addEventListener("click", (event) => {
    if (!sidebar || !mobileFilterToggle) return;
    if (!sidebar.classList.contains("open")) return;
    if (window.innerWidth > 1100) return;
    if (sidebar.contains(event.target) || mobileFilterToggle.contains(event.target)) return;
    closeFilter();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeFilter();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) {
      closeFilter();
    }
  });
}

function applyCategoryFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const categoryQuery = params.get("category");
  if (!categoryQuery) return;

  const map = {
    textiles: "Ankara Fabrics",
    lace: "Aseobi",
    casual: "Ready-to-Wear",
    ankara: "Ankara Fabrics",
    accessories: "Accessories",
    mens: "Ready-to-Wear",
    "ready-to-wear": "Ready-to-Wear",
  };

  const resolved = map[categoryQuery.toLowerCase()];
  if (!resolved) return;

  selectedCategories = new Set([resolved]);
  document.querySelectorAll("#category-filters input[type='checkbox']").forEach((checkbox) => {
    if (checkbox.dataset.selectAll === "true") {
      checkbox.checked = false;
      return;
    }
    checkbox.checked = checkbox.value === resolved;
  });
}

if (productContainer) {
  renderCategoryFilters();
  applyCategoryFromQuery();

  if (priceRangeValue) {
    priceRangeValue.textContent = formatPrice(selectedMaxPrice);
  }

  bindControls();
  renderShop();
}

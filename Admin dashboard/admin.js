'use strict';

// ------------------------------------------------------- //
// ----------------------- Recent Summary Cards ------------------ //

const summarySection = document.getElementById('summary');
const recentProductsBody = document.getElementById('recent-products');

// Summary
const summary = [
    { icon: 'bx bx-pie-chart-alt-2', label: 'Total Revenue', value: 0, trend: '+12% from last month', dataTabTarget: 'analytics-pane' },
    { icon: 'bx bx-list-check', label: 'Orders Completed', value: 7455, trend: '+5% from last month', dataTabTarget: 'orders-pane' },
    { icon: 'bx bx-layer', label: 'Total Products', value: 86, trend: 'Products out of stock', dataTabTarget: 'products-pane' },
    { icon: 'bx bx-group', label: 'Total Customers', value: 5400, trend: '+20% from last month', dataTabTarget: 'customers-pane' },
];

// Recent Products Data
const productsData = [
    {
        img: 'https://i.pravatar.cc/100',
        name: 'Vintage Leather Wallet',
        price: 25000,
        stock: 0,
        status: 'Published',
        sold: 120,
        actions: ['Delete']
    },
    {
        img: 'https://i.pravatar.cc/200',
        name: 'Denim Jacket',
        price: 150000,
        stock: 0,
        status: 'Published',
        sold: 20,
        actions: ['Delete']
    },
    {
        img: 'https://i.pravatar.cc/300',
        name: 'Ankara Shirt',
        price: 35000,
        stock: 13,
        status: 'Published',
        sold: 12,
        actions: ['Delete']
    },
    {
        img: 'https://i.pravatar.cc/400',
        name: 'Minimalist Wooden Desk Lamp',
        price: 35000,
        stock: 42,
        sold: 5,
        status: 'Published',
        actions: ['Delete']
    },
    {
        img: 'https://i.pravatar.cc/500',
        name: 'Noise Cancelling Headphones',
        price: 35000,
        stock: 5,
        sold: 1,
        status: 'Published',
        actions: ['Delete']
    },
];

// Function to format numbers
function formatNumber(n) {
    if (n >= 1000) {
        return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return n.toString();
}

// Render summary cards
summary.forEach((item, index) => {
    // create element
    const card = document.createElement('div');
    // Base card classes
    let baseClasses = 'flex flex-col gap-2 items-center rounded-lg p-3 md:p-6 border flex-1 min-w-44 max-w-full hover:-translate-y-0.5 hover:shadow-xl transition duration-500 cursor-default';

    // Special style for the FIRST ELEMENT
    let specialStyle = index === 0 ? 'bg-black text-white border-black' : 'bg-white text-black border-stone-300 hover:border-0';

    // Apply classes
    card.className = `${baseClasses} ${specialStyle}`;

    // Add content to the card
    card.innerHTML = `
    <p data-tab-target="${item.dataTabTarget}" class="sidebar-tab text-sm font-semibold md:text-[18px] lg:text-base w-full cursor-pointer justify-center leading-normal flex items-center gap-2 text-nowrap">
        <i data-tab-target="${item.dataTabTarget}" class="${item.icon} text-xs md:text-sm sidebar-tab"></i>
        ${item.label}
    </p>
    <button data-tab-target="${item.dataTabTarget}" class="sidebar-tab tracking-tight cursor-pointer w-full text-xl md:text-2xl lg:text-[32px] font-bold leading-tight">
        ${index === 0 ? `₦${item.value.toLocaleString('en-NG')}` : formatNumber(item.value)}
    </button>
    <p data-tab-target="${item.dataTabTarget}" class="${item.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'} sidebar-tab cursor-pointer w-full text-xs md:text-[13px] font-medium leading-normal">
        ${item.trend}
    </p>
    `;

    // Append the card to the summary section
    summarySection.appendChild(card);
});

// count the number of out of stock products and render it in summary section
function updateProductsSummaryCard() {
    function countOutOfStock(products) {
        return products.reduce((count, product) => {
            return product.stock === 0 ? count + 1 : count;
        }, 0);
    }

    function updateProduct() {
        const card = summarySection.children[2];
        const valueEl = card.querySelector('button');
        const trendEl = card.querySelector('p:last-of-type');

        const total = productsData.length;
        const outOfStock = countOutOfStock(productsData);

        valueEl.innerHTML = total;
        trendEl.innerHTML = `${outOfStock} product${outOfStock !== 1 ? 's' : ''} out of stock`;
    }
    updateProduct();
}
updateProductsSummaryCard();

// Calculate Total Revenue and render it in summary section
function totalRevenue(products) {
    return products.reduce((total, product) => total + product.price * product.sold, 0);
}

const revenueCard = summarySection.children[0];
const revenueValue = revenueCard.querySelector('button');
const totalRev = totalRevenue(productsData);
revenueValue.innerHTML = `₦${totalRev.toLocaleString('en-NG')}`;

// Update Total Products in summary section
function updateTotalProducts(products) {
    const totalProductsCard = summarySection.children[2];
    const totalProductsValue = totalProductsCard.querySelector('button');
    totalProductsValue.innerHTML = products.length;
}
updateTotalProducts(productsData);

// ----------------------- Recent Products Table ------------------ //
let products = [...productsData];
let deleteIndex = null;

const deleteModal = document.getElementById('deleteModal');
const closeModal = document.getElementById('closeModal');
const cancelDelete = document.getElementById('cancelDelete');
const confirmDelete = document.getElementById('confirmDelete');

function openDeleteModal(index) {
    deleteIndex = index;
    deleteModal.classList.remove('hidden');
}

function closeDeleteModal() {
    deleteIndex = null;
    deleteModal.classList.add('hidden');
}

// Attach to modal buttons
closeModal.addEventListener('click', closeDeleteModal);
cancelDelete.addEventListener('click', closeDeleteModal);
confirmDelete.addEventListener('click', () => {
    if (deleteIndex !== null) {
        products.splice(deleteIndex, 1);
        renderTable();
        closeDeleteModal();
    }
});

// Render Table Function
function renderTable() {
    recentProductsBody.innerHTML = '';

    products.forEach((prod, i) => {
        const tr = document.createElement('tr');
        tr.className = 'border-t border-t-stone-200';

        const deleteAction = prod.actions[0]
            ? `<a class="hover:text-black cursor-pointer" onclick="openDeleteModal(${i})">${prod.actions[0]}</a>`
            : '';

        tr.innerHTML = `
            <td class="h-[72px] px-4 md:px-6 py-2">
                <div class="flex items-center gap-4">
                <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-md w-8 md:w-10"
                    style="background-image: url('${prod.img}');"></div>
                <span class="text-stone-600 text-sm font-medium text-nowrap">${prod.name}</span>
                </div>
            </td>

            <td class="h-[72px] px-4 md:px-6 py-2 text-left text-stone-600 text-sm font-medium">₦${prod.price.toLocaleString('en-NG')}</td>
            <td class="h-[72px] px-4 md:px-6 py-2 text-left text-stone-600 text-sm font-medium">${prod.stock}</td>
            <td class="h-[72px] px-4 md:px-6 py-2 text-left text-nowrap">
                <span class="${prod.stock > 20 ? 'text-green-700 bg-green-100' : prod.stock === 0 ? 'text-red-700 bg-red-100' : 'text-yellow-700 bg-yellow-100'} rounded-full px-3 py-1 text-xs font-medium">
                ${prod.stock > 20 ? 'In Stock' : prod.stock === 0 ? 'Out Of Stock' : 'Low Stock'}
                </span>
            </td>

            <td class="h-[72px] px-4 md:px-6 py-2 text-left text-stone-600 text-sm font-medium">${prod.sold.toLocaleString()}</td>
            <td class="h-[72px] px-4 md:px-6 py-2 text-left text-red-300 text-xs font-medium">
            <div class="flex gap-1 items-center">
              <i class="bx bx-trash"></i>
              <a class="hover:text-red-500" href="#" onclick="handleDelete(${i})">${deleteAction}</a>
            </div>
            </td>
        `;
        recentProductsBody.appendChild(tr);
    });
}

function handleDelete(index) {
    products.splice(index, 1);
    renderTable();
}
renderTable();


// Tab Functionality
const tabButtons = document.querySelectorAll('.sidebar-tab');
const tabPanes = document.querySelectorAll('.tab-pane');
const sidebar = document.querySelector('aside');
const mobileMenuButton = document.getElementById('mobile-menu-button');

const switchTab = (button) => {
    const targetId = button.dataset.tabTarget;

    tabButtons.forEach((btn) =>
        btn.classList.remove('active', 'bg-black')
    );
    tabPanes.forEach((pane) => pane.classList.add('hidden'));

    // if tabs are active add styles not just on click
    tabButtons.forEach((btn) => {
        if (btn.dataset.tabTarget === targetId) {
            btn.classList.add('active', 'bg-black', 'text-white');
        } else {
            btn.classList.remove('active', 'bg-black', 'text-white');
        }
    });

    const targetPane = document.getElementById(targetId);
    if (targetPane) {
        targetPane.classList.remove('hidden');
        targetPane.classList.add('active');
    }

    if (window.innerWidth < 768) {
        sidebar.classList.add('flex');
        sidebar.classList.add('hidden');
    }
};

// tabButtons.forEach((button) => {
//     button.addEventListener("click", () => switchTab(button));
// });

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.sidebar-tab');
    if (!btn) return;
    switchTab(btn);
});


// sidebar on mobile button click
if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
    });
}
const defaultBtn = document.querySelector(
    '.sidebar-tab[data-tab-target="dashboard-pane"]'
);
if (defaultBtn) {
    switchTab(defaultBtn);
}

// Modal Functionality
function setupModal(modalClass, openBtnClass, closeBtnClass) {
    const modal = document.querySelector(`.${modalClass}`);
    const openBtn = document.querySelector(`.${openBtnClass}`);
    const closeBtn = document.querySelector(`.${closeBtnClass}`);

    if (!modal || !openBtn) return;

    const openModal = () => modal.classList.remove('hidden');
    const closeModal = () => modal.classList.add('hidden');

    openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close modal if clicking outside (optional)
    document.addEventListener('click', (e) => {
        if (!modal.contains(e.target) && !openBtn.contains(e.target)) {
            closeModal();
        }
    });

    // close modal if li or a tag is clicked (don't know if this is correct works though)
    const links = document.querySelectorAll('li', 'a');
    links.forEach((tag) => {
        tag.addEventListener('click', () => {
            closeModal();
        });
    });
}

// Example usage for your notifications modal
setupModal('modal-notification', 'open-notification', 'close-notification');
setupModal('modal-profile', 'open-profile', 'close-profile');
setupModal('delete-modal', 'open-delete', 'close-delete');



// ------------------------------------------------------- //
// ----------------------- Customers section ------------------ //
const reviewGrid = document.getElementById('reviewGrid');

const reviewsData = [
    {
        label: 'Total Reviews',
        value: 1200,
        trend: '+2.1%',
        description: 'Growth in reviews this year'
    },
    {
        label: 'Average Rating',
        value: 0,
        trend: '★★★★',
        description: 'Average rating this year'
    },
    {
        label: 'Positive Reviews',
        value: '82%',
        trend: '+1.4%',
        description: 'Percentage of reviews rated 4 stars and above'
    }
];

reviewsData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = `flex flex-col gap-3 border border-stone-300 rounded-lg p-4 w-full md:w-auto`;
    card.innerHTML = `
    <p class="text-sm font-semibold text-black">${item.label}</p>
    <h2 class="text-xl md:text-2xl font-bold text-black flex items-center gap-2">
      ${item.value}
      <span class="bg-green-100 text-green-700 text-[10px] py-1 px-2 rounded-2xl w-fit">${item.trend}</span>
    </h2>
    <p class="text-xs md:text-sm text-stone-400">${item.description}</p>
  `;

    reviewGrid.appendChild(card);
});


// Review data
const reviews = [
    {
        name: 'Onwuka Emmanuel',
        totalSpend: 120000,
        rating: 4.0,
        review:
            'Really happy with this purchase! The item arrived quickly and matched the description perfectly. The quality feels premium, and it works exactly as expected. Definitely worth the price. Highly recommend it!',
        date: '2025-10-24',
        icon: 'bx bx-like',
        dataTabTarget: 'messages-pane'
    },
    {
        name: 'Aisha Bello',
        totalSpend: 85000,
        rating: 5.0,
        review:
            'Amazing quality and fast delivery. The product exceeded my expectations. Will definitely order again. Great experience overall!',
        date: '2025-11-01',
        icon: 'bx bx-like',
        dataTabTarget: 'messages-pane'
    },
    {
        name: 'Chidi Okafor',
        totalSpend: 45000,
        rating: 3.5,
        review:
            'Product is decent and works as described. Delivery was a bit slow but overall satisfied.',
        date: '2025-11-05',
        icon: 'bx bx-like',
        dataTabTarget: 'messages-pane'
    },
    {
        name: 'Chidi Okafor',
        totalSpend: 45000,
        rating: 4.5,
        review:
            'Very satisfied with this purchase. It’s reliable, durable, and exactly what I needed. Easy to use and maintain. Shipping was fast, and the seller provided excellent support throughout the process.',
        date: '2025-11-05',
        icon: 'bx bx-like',
        dataTabTarget: 'messages-pane'
    },
    {
        name: 'Somebody Else',
        totalSpend: 45000,
        rating: 5,
        review:
            'Very satisfied with this purchase. It’s reliable, durable, and exactly what I needed. Easy to use and maintain. Shipping was fast, and the seller provided excellent support throughout the process.',
        date: '2025-11-05',
        icon: 'bx bx-like',
        dataTabTarget: 'messages-pane'
    },
    {
        name: 'Somebody Else',
        totalSpend: 45000,
        rating: 3.5,
        review:
            'Very satisfied with this purchase. It’s reliable, durable, and exactly what I needed. Easy to use and maintain. Shipping was fast, and the seller provided excellent support throughout the process.',
        date: '2025-11-05',
        icon: 'bx bx-like',
        dataTabTarget: 'messages-pane'
    }
];

const reviewsContainer = document.getElementById('reviewsContainer');

// Random color generator for avatar background
function randomColor() {
    const colors =
        [
            'bg-orange-600',
            'bg-blue-900',
            'bg-green-700',
            'bg-red-700',
            'bg-yellow-700',
            'bg-purple-700',
            'bg-pink-600',
            'bg-teal-700'
        ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// sum up reviews and render it at the top of reviews section
function calculateAverageRating(reviews) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
}
const averageRating = calculateAverageRating(reviews);
const averageRatingElement = document.querySelector(
    '#reviewGrid > div:nth-child(2) > h2'
);
averageRatingElement.textContent = averageRating;

// calculate positive review percentage and render it at the top of reviews section
function getPositiveReviewPercentage(reviews) {
    const total = reviews.length;
    if (total === 0) return '0%';

    const positive = reviews.filter(r => r.rating >= 4).length;
    const percent = (positive / total) * 100;

    return percent.toFixed(1) + '%';
}
const positiveReviewPercentage = getPositiveReviewPercentage(reviews);
const positiveReviewElement = document.querySelector(
    '#reviewGrid > div:nth-child(3) > h2'
);
positiveReviewElement.textContent = positiveReviewPercentage;

// total reviews count and render it at the top of reviews section
const totalReviewsCount = reviews.length;
const totalReviewsElement = document.querySelector(
    '#reviewGrid > div:nth-child(1) > h2'
);
totalReviewsElement.textContent = totalReviewsCount;


// Render reviews
reviews.forEach((item) => {
    const reviewDiv = document.createElement('div');
    reviewDiv.className =
        'flex flex-col md:flex-row justify-between items-start py-6 border-b border-stone-200 gap-y-4 md:gap-20';

    const firstLetter = item.name.charAt(0).toUpperCase();
    const formattedSpend = `₦${item.totalSpend.toLocaleString('en-NG')}`;
    const reviewDate = new Date(item.date);
    const formattedDate = `${String(reviewDate.getDate()).padStart(2, '0')}-${String(
        reviewDate.getMonth() + 1
    ).padStart(2, '0')}-${reviewDate.getFullYear()}`;

    reviewDiv.innerHTML = `
    <div class="flex items-center gap-3 md:gap-4 flex-shrink-0">
      <div class="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xs font-medium ${randomColor()} text-white">
        ${firstLetter}
      </div>
      <div class="flex flex-col gap-1 text-xs text-stone-600">
        <p class="font-semibold">${item.name}</p>
        <p>Total spend <span class="text-stone-600 font-semibold">${formattedSpend}</span></p>
        <p>Rating: <span class="text-stone-600 font-semibold">${item.rating.toFixed(1)}</span></p>
      </div>
    </div>

    <div class="flex flex-col gap-2 md:max-w-xl w-full">
      <p class="text-xs text-stone-400">${formattedDate}</p>
      <p class="text-sm text-stone-700 font-medium break-words">${item.review}</p>
      <div class="flex flex-wrap md:flex-nowrap items-center gap-2 mt-3">
        <button data-tab-target="${item.dataTabTarget}"
            class="sidebar-tab py-2 px-4 text-xs font-medium rounded-lg cursor-pointer bg-black text-white hover:opacity-75 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl">
            Direct Message
        </button>

        <button class="p-2 border text-xs font-medium border-stone-300 rounded-lg cursor-pointer hover:border-0 hover:bg-stone-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl">
          <i class="thumbs-up ${item.icon} cursor-pointer"></i>
        </button>
      </div>
    </div>
  `;

    reviewsContainer.appendChild(reviewDiv);
});


// Thumbs Up Toggle Functionality
function toggleThumbsUp(event) {
    const thumbsUpIcon = event.target;
    thumbsUpIcon.classList.toggle('bx-like');
    thumbsUpIcon.classList.toggle('bxs-like');
}

const thumbsUpIcons = document.querySelectorAll('.thumbs-up');
thumbsUpIcons.forEach((icon) => {
    icon.addEventListener('click', toggleThumbsUp);
});

// funtion to get month name and year from filter button and set it to the span inside the button
const filterDateSpan = document.getElementById('filter-date');
const currentDate = new Date();
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];
filterDateSpan.textContent = `${monthNames[currentDate.getMonth()]}, ${currentDate.getFullYear()}`;


// -------------------------  Order section ----------------------------- //
const orderSummaryGrid = document.getElementById('orderSummaryGrid');

const orderData = [
    {
        label: 'Total Cost',
        value: 123000,
        statColor: 'bg-green-600',
        description: 'New cost last 365 days'
    },
    {
        label: 'Total Order',
        value: 127,
        statColor: 'bg-yellow-400',
        description: 'Total order last 365 days'
    },
    {
        label: 'Completed',
        value: 100,
        statColor: 'bg-green-600',
        description: 'Completed order last 365 days'
    },
    {
        label: 'canceled',
        value: 27,
        statColor: 'bg-red-500',
        description: 'Canceled order last 365 days'
    }
];

orderData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = `flex flex-col gap-3 border border-stone-300 rounded-lg p-4 w-full md:w-auto`;
    card.innerHTML = `
    <p class="text-sm font-semibold text-black">${item.label}</p>
    <h2 class="text-xl md:text-2xl font-bold text-black flex items-center gap-2">
      ${index === 0 ? `₦${item.value.toLocaleString('en-NG')}` : item.value.toLocaleString('en-NG')}
       <span class="${item.statColor} text-green-400 text-sm w-3 h-3 rounded-full block"></span>
    </h2>
    <p class="text-xs md:text-sm text-stone-400">${item.description}</p>
  `;

    orderSummaryGrid.appendChild(card);
});

// table
const orderProduct = document.getElementById('order-prouduct');

const orderProductData = [
    { id: 658945, prodName: 'Coco Nu Lab, Organic', date: '12 Jan 2025', status: 'Completed', payment: 'COD', price: 50 },
    { id: 658945, prodName: 'Coco Nu Lab, Organic', date: '12 Jan 2025', status: 'Completed', payment: 'COD', price: 50 },
    { id: 658945, prodName: 'Coco Nu Lab, Organic', date: '12 Jan 2025', status: 'Completed', payment: 'COD', price: 50 },
    { id: 658945, prodName: 'Coco Nu Lab, Organic', date: '12 Jan 2025', status: 'Completed', payment: 'BT', price: 50 },
    { id: 658945, prodName: 'Coco Nu Lab, Organic', date: '12 Jan 2025', status: 'Pending', payment: 'CC', price: 50 },
    { id: 658945, prodName: 'Coco Nu Lab, Organic', date: '12 Jan 2025', status: 'Canceled', payment: 'COD', price: 50 },
    { id: 658945, prodName: 'Coco Nu Lab, Organic', date: '12 Jan 2025', status: 'Completed', payment: 'BT', price: 50 },
    { id: 658945, prodName: 'Coco Nu Lab, Organic', date: '12 Jan 2025', status: 'Completed', payment: 'CC', price: 50 },
];

orderProductData.forEach((prod, i) => {
    const tr = document.createElement('tr');
    tr.className = 'border-t text-center border-t-stone-200 text-nowrap text-sm font-medium';

    tr.innerHTML = `
        <td class="h-[72px] px-4 md:px-6 py-2 text-stone-500 text-sm font-medium">#${prod.id}</td>
        <td class="h-[72px] px-4 md:px-6 py-2 text-stone-800 text-sm font-medium">${prod.prodName}</td>
        <td class="h-[72px] px-4 md:px-6 py-2 text-stone-500 text-sm font-medium">${prod.date}</td>
        <td class="h-[72px] px-4 md:px-6 py-2 ${prod.status === 'Completed' ? 'text-green-500' : prod.status === 'Canceled' ? 'text-red-500' : 'text-yellow-500'} text-sm font-medium">${prod.status}</td>
        <td class="h-[72px] px-4 md:px-6 py-2 text-stone-500 text-sm font-medium">${prod.payment}</td>
        <td class="h-[72px] px-4 md:px-6 py-2 text-stone-500 text-sm font-medium">₦${prod.price.toLocaleString('en-NG')}</td>
    `;

    orderProduct.appendChild(tr);
});

// ------------------------- Product form ----------------------------- //
const addProductForm = document.getElementById('add-product-form');
const productCategoryInput = document.getElementById('product-category');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const discountPercentInput = document.getElementById('discount-percent');
const couponCodeInput = document.getElementById('coupon-code');
const discountPreview = document.getElementById('discount-preview');
const generateCouponBtn = document.getElementById('generate-coupon-btn');
const readyToWearGroup = document.getElementById('group-ready-to-wear');
const fabricGroup = document.getElementById('group-fabric');
const accessoriesGroup = document.getElementById('group-accessories');

function toggleCategoryFields() {
    if (!productCategoryInput) return;

    const category = productCategoryInput.value;
    if (readyToWearGroup) readyToWearGroup.classList.add('hidden');
    if (fabricGroup) fabricGroup.classList.add('hidden');
    if (accessoriesGroup) accessoriesGroup.classList.add('hidden');

    if (category === 'ready-to-wear' && readyToWearGroup) {
        readyToWearGroup.classList.remove('hidden');
    }
    if (category === 'fabric' && fabricGroup) {
        fabricGroup.classList.remove('hidden');
    }
    if (category === 'accessories' && accessoriesGroup) {
        accessoriesGroup.classList.remove('hidden');
    }
}

function updateDiscountPreview() {
    if (!productPriceInput || !discountPercentInput || !discountPreview) return;

    const basePrice = Number(productPriceInput.value) || 0;
    const discount = Math.min(100, Math.max(0, Number(discountPercentInput.value) || 0));
    const finalPrice = basePrice - (basePrice * discount / 100);
    discountPreview.textContent = `Final price after discount: ₦${finalPrice.toLocaleString('en-NG')}`;

    if (generateCouponBtn) {
        generateCouponBtn.disabled = discount <= 0;
    }

    if (discount <= 0 && couponCodeInput) {
        couponCodeInput.value = '';
    }
}

function generateCouponCode() {
    if (!couponCodeInput || !discountPercentInput) return;
    const discount = Math.min(100, Math.max(0, Number(discountPercentInput.value) || 0));
    if (discount <= 0) {
        couponCodeInput.value = '';
        return;
    }
    const productPrefix = (productNameInput?.value || 'FAB').replace(/[^A-Za-z0-9]/g, '').slice(0, 4).toUpperCase() || 'FAB';
    const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
    couponCodeInput.value = `${productPrefix}${discount}${randomPart}`;
}

if (productPriceInput && discountPercentInput) {
    productPriceInput.addEventListener('input', updateDiscountPreview);
    discountPercentInput.addEventListener('input', updateDiscountPreview);
}

if (productCategoryInput) {
    productCategoryInput.addEventListener('change', toggleCategoryFields);
    toggleCategoryFields();
}

if (generateCouponBtn) {
    generateCouponBtn.addEventListener('click', generateCouponCode);
}

if (addProductForm) {
    addProductForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Product saved successfully.');
    });
}

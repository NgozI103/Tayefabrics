const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");
const hamburgerIcon = hamburger ? hamburger.querySelector("i") : null;

if (hamburger && navList) {
  const setMenuState = (isOpen) => {
    navList.classList.toggle("open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    if (hamburgerIcon) {
      hamburgerIcon.classList.toggle("bx-menu-alt-left", !isOpen);
      hamburgerIcon.classList.toggle("bx-x", isOpen);
    }
  };

  const toggleMenu = () => {
    const isOpen = navList.classList.contains("open");
    setMenuState(!isOpen);
  };

  hamburger.addEventListener("click", toggleMenu);

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navList.classList.contains("open")) {
      setMenuState(false);
    }
  });
}

const container = document.getElementById("hero-container");

const heroContent = [
  {
    title: "Welcome to Taye's Fabrics",
    subTitle:"Where Tradition Meets Style",
    description:
      "Discover a world of vibrant colors and exquisite textures at Taye's Fabrics. Our collection features a wide range of high-quality fabrics, perfect for all your creative projects..",
    buttonText: "Shop Now",
    image: "./Images/hero.png",
  },

  {
    title: "Taye's Fabrics",
    subTitle: "Timeless African Elegance",
    description:
      "Discover our curated collection of premium Ankara, handwoven Asooke, and exquisite Lace fabrics for the modern African.",
    buttonText: "Discover More",
    image: "./Images/hero-page-image-1.png",
  },

  {
    title: "",
    subTitle: "",
    description: "",
    buttonText: "",
    image: "./Images/launchhero.png",
  },
];

if (container) {
  const slidesHTML = heroContent
    .map((content) => {
      return `
      <li class="glide__slide has-overlay" style="background-image: url(${content.image})">
        <div class="center">
          <div class="left">
            <span>${content.title}</span>
            <h1>${content.subTitle}</h1>
            <p>${content.description}</p>
            <a href="" class=${content?.buttonText ? "hero-btn" : ""}>${content?.buttonText}</a>
          </div>
        </div>
      </li>
    `;
    })
    .join("");

  container.innerHTML = slidesHTML;
}

const PROFILE_STORAGE_KEY = "taye_profile_data";
const SIGNUP_SUCCESS_PARAM_KEY = "signup";
const SIGNUP_SUCCESS_PARAM_VALUE = "success";
const HOMEPAGE_SUCCESS_URL = "home.html?signup=success";

const hasExistingProfile = () => {
  try {
    const rawProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!rawProfile) return false;
    const parsed = JSON.parse(rawProfile);
    const hasName = Boolean(
      parsed && typeof parsed.firstName === "string" && parsed.firstName.trim()
    );
    const hasContact = Boolean(
      parsed &&
        ((typeof parsed.mobile === "string" && parsed.mobile.trim()) ||
          (typeof parsed.email === "string" && parsed.email.trim()))
    );
    return hasName && hasContact;
  } catch (error) {
    return false;
  }
};

const profileDropdownSelector =
  ".desktop-profile-dropdown, .mobile-profile-dropdown, .mobile-bottom-profile-dropdown";
const profileToggleSelector =
  ".desktop-profile-toggle, .mobile-profile-toggle, .mobile-bottom-profile-toggle";
const profileMenuSelector =
  ".desktop-profile-menu, .mobile-profile-menu, .mobile-bottom-profile-menu";
const profileLogoutSelector =
  ".desktop-logout-btn, .mobile-logout-btn, .mobile-bottom-logout-btn";
const initProfileDropdowns = () => {
  const profileDropdownRoots = Array.from(document.querySelectorAll(profileDropdownSelector));
  if (!profileDropdownRoots.length) return;

  const closeProfileMenu = (root) => {
    const toggle = root.querySelector(profileToggleSelector);
    const menu = root.querySelector(profileMenuSelector);
    root.classList.remove("open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    if (menu) menu.setAttribute("aria-hidden", "true");
  };

  const closeAllProfileMenus = () => {
    profileDropdownRoots.forEach(closeProfileMenu);
  };

  const openProfileMenu = (root) => {
    const toggle = root.querySelector(profileToggleSelector);
    const menu = root.querySelector(profileMenuSelector);
    root.classList.add("open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    if (menu) menu.setAttribute("aria-hidden", "false");
  };

  const setAllProfileStates = () => {
    const state = hasExistingProfile() ? "auth" : "guest";
    profileDropdownRoots.forEach((root) => {
      root.setAttribute("data-profile-state", state);
    });
  };

  setAllProfileStates();

  document.addEventListener("click", (event) => {
    const logoutButton = event.target.closest(profileLogoutSelector);
    if (logoutButton) {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
      setAllProfileStates();
      closeAllProfileMenus();
      window.location.href = "login.html";
      return;
    }

    const toggle = event.target.closest(profileToggleSelector);
    if (toggle) {
      event.preventDefault();
      event.stopPropagation();
      const root = toggle.closest(profileDropdownSelector);
      if (!root) return;
      const isOpen = root.classList.contains("open");
      closeAllProfileMenus();
      if (!isOpen) openProfileMenu(root);
      return;
    }

    const clickedInsideProfile = event.target.closest(profileDropdownSelector);
    if (!clickedInsideProfile) {
      closeAllProfileMenus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllProfileMenus();
    }
  });
};

const initSignupSuccessBanner = () => {
  if (typeof window === "undefined" || !document.body) return;

  const currentUrl = new URL(window.location.href);
  const signupParam = currentUrl.searchParams.get(SIGNUP_SUCCESS_PARAM_KEY);
  if (signupParam !== SIGNUP_SUCCESS_PARAM_VALUE) return;

  const path = currentUrl.pathname.toLowerCase();
  const isHomepage =
    path.endsWith("/home.html") ||
    path.endsWith("/index.html") ||
    path === "/" ||
    path === "";

  if (!isHomepage) {
    window.location.href = HOMEPAGE_SUCCESS_URL;
    return;
  }

  const existingBanner = document.getElementById("signup-success-banner");
  if (existingBanner) return;

  const banner = document.createElement("div");
  banner.id = "signup-success-banner";
  banner.className = "home-signup-banner";
  banner.setAttribute("role", "status");
  banner.setAttribute("aria-live", "polite");
  banner.innerHTML = `
    <span>Account created successfully! Welcome to our community.</span>
    <button type="button" aria-label="Close success message">
      <i class="bx bx-x"></i>
    </button>
  `;

  const closeBanner = () => {
    banner.classList.add("fade-out");
    window.setTimeout(() => {
      banner.remove();
    }, 240);

    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete(SIGNUP_SUCCESS_PARAM_KEY);
    window.history.replaceState({}, "", cleanUrl.pathname + cleanUrl.search + cleanUrl.hash);
  };

  const closeButton = banner.querySelector("button");
  if (closeButton) closeButton.addEventListener("click", closeBanner);

  document.body.prepend(banner);
  window.requestAnimationFrame(() => {
    banner.classList.add("show");
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initProfileDropdowns();
    initSignupSuccessBanner();
  });
} else {
  initProfileDropdowns();
  initSignupSuccessBanner();
}

import { useEffect } from "react";
import { navigateWithinApp } from "../utils/navigation";

export default function useLegacyIndexBehavior() {
  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    const navList = document.querySelector(".nav-list");
    const hamburgerIcon = hamburger ? hamburger.querySelector("i") : null;

    if (hamburger && navList) {
      const closeMobileSearchUI = () => {
        const mobileSearchBar = document.querySelector(".mobile-search-bar");
        const mobileSearchToggle = document.querySelector(".mobile-search-toggle");
        if (mobileSearchBar) mobileSearchBar.classList.remove("open");
        if (mobileSearchToggle) {
          mobileSearchToggle.classList.remove("active");
          mobileSearchToggle.setAttribute("aria-label", "Open search");
        }
      };

      const setMenuState = (isOpen) => {
        navList.classList.toggle("open", isOpen);
        document.body.classList.toggle("menu-open", isOpen);
        if (isOpen) closeMobileSearchUI();
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
        subTitle: "Where Tradition Meets Style",
        description:
          "Discover a world of vibrant colors and exquisite textures at Taye's Fabrics. Our collection features a wide range of high-quality fabrics, perfect for all your creative projects..",
        buttonText: "Shop Now",
        image: "../Images/hero.png",
      },
      {
        title: "Taye's Fabrics",
        subTitle: "Timeless African Elegance",
        description:
          "Discover our curated collection of premium Ankara, handwoven Asooke, and exquisite Lace fabrics for the modern African.",
        buttonText: "Discover More",
        image: "../Images/hero-page-image-1.png",
      },
      {
        title: "",
        subTitle: "",
        description: "",
        buttonText: "",
        image: "../Images/launchhero.png",
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
    const CART_STORAGE_KEY = "taye_cart";
    const WISHLIST_STORAGE_KEY = "taye_wishlist";
    const SIGNUP_SUCCESS_PARAM_KEY = "signup";
    const SIGNUP_SUCCESS_PARAM_VALUE = "success";
    const HOMEPAGE_SUCCESS_URL = "home.html?signup=success";

    const hasExistingProfile = () => {
      try {
        const rawProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
        if (!rawProfile) return false;
        const parsed = JSON.parse(rawProfile);
        const hasName = Boolean(
          parsed && typeof parsed.firstName === "string" && parsed.firstName.trim(),
        );
        const hasContact = Boolean(
          parsed &&
            ((typeof parsed.mobile === "string" && parsed.mobile.trim()) ||
              (typeof parsed.email === "string" && parsed.email.trim())),
        );
        return hasName && hasContact;
      } catch {
        return false;
      }
    };

    const getProfileData = () => {
      try {
        const rawProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
        return rawProfile ? JSON.parse(rawProfile) : null;
      } catch {
        return null;
      }
    };

    const clearProfileData = () => {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    };

    const readCollection = (key) => {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    };

    const setTextForSelectors = (selectors, value) => {
      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((node) => {
          node.textContent = String(value);
        });
      });
    };

    const syncHeaderCounts = () => {
      const cart = readCollection(CART_STORAGE_KEY);
      const wishlist = readCollection(WISHLIST_STORAGE_KEY);

      const cartCount = cart.length;
      const wishlistCount = wishlist.length;

      setTextForSelectors(
        [
          '.icons a[href$="cart.html"] span',
          '.mobile-bottom-item[href$="cart.html"] .mobile-badge',
          ".desktop-cart span",
        ],
        cartCount,
      );
      setTextForSelectors(
        [
          '.icons a[href$="wishlist.html"] span',
          '.mobile-bottom-item[href$="wishlist.html"] .mobile-badge',
        ],
        wishlistCount,
      );
    };

    const syncAuthButtons = () => {
      const isLoggedIn = hasExistingProfile();
      const desktopGroups = Array.from(document.querySelectorAll(".desktop-auth-group"));
      const mobileAuthBlocks = Array.from(document.querySelectorAll(".mobile-auth-actions"));
      const profile = getProfileData();
      const displayName =
        profile && profile.firstName ? String(profile.firstName).split(" ")[0] : "Account";

      desktopGroups.forEach((group) => {
        if (isLoggedIn) {
          group.innerHTML = `
            <span class="desktop-auth-user">Hi, ${displayName}</span>
            <button type="button" class="desktop-signup-btn desktop-logout-main-btn" data-main-auth-logout="true">Logout</button>
          `;
        } else {
          group.innerHTML = `
            <a href="login.html" class="desktop-auth-link">Login</a>
            <a href="signup.html" class="desktop-signup-btn">Sign Up</a>
          `;
        }
      });

      mobileAuthBlocks.forEach((block) => {
        if (isLoggedIn) {
          block.innerHTML = `
            <button type="button" class="mobile-auth-btn mobile-auth-btn-solid" data-main-auth-logout="true">Logout</button>
          `;
        } else {
          block.innerHTML = `
            <a href="login.html" class="mobile-auth-btn mobile-auth-btn-outline">Login</a>
            <a href="signup.html" class="mobile-auth-btn mobile-auth-btn-solid">Sign Up</a>
          `;
        }
      });
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
        syncAuthButtons();
      };

      setAllProfileStates();

      document.addEventListener("click", (event) => {
        const logoutButton = event.target.closest(profileLogoutSelector);
        if (logoutButton) {
          clearProfileData();
          setAllProfileStates();
          closeAllProfileMenus();
          navigateWithinApp("home.html");
          return;
        }

        const mainLogoutButton = event.target.closest("[data-main-auth-logout='true']");
        if (mainLogoutButton) {
          clearProfileData();
          setAllProfileStates();
          closeAllProfileMenus();
          navigateWithinApp("home.html");
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
        path.endsWith("/home.html") || path.endsWith("/index.html") || path === "/" || path === "";

      if (!isHomepage) {
        navigateWithinApp(HOMEPAGE_SUCCESS_URL, { replace: true });
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

    const initGlobalSearch = () => {
      const searchInputs = Array.from(document.querySelectorAll(".desktop-header-search input"));
      if (!searchInputs.length) return;

      const submitSearch = (value) => {
        const query = String(value || "").trim();
        const target = query ? `shop.html?search=${encodeURIComponent(query)}` : "shop.html";
        navigateWithinApp(target);
      };

      searchInputs.forEach((input) => {
        input.addEventListener("keydown", (event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          submitSearch(input.value);
        });

        const icon = input.closest(".desktop-header-search")?.querySelector("i");
        if (icon) {
          icon.style.cursor = "pointer";
          icon.addEventListener("click", () => {
            submitSearch(input.value);
          });
        }
      });
    };

    const initMobileSearch = () => {
      const navCenter = document.querySelector(".navigation .nav-center");
      const navigation = document.querySelector(".navigation");
      if (!navCenter || !navigation) return;

      if (!navCenter.querySelector(".mobile-search-toggle")) {
        const hamburgerBtn = navCenter.querySelector(".hamburger");
        const searchToggle = document.createElement("button");
        searchToggle.type = "button";
        searchToggle.className = "mobile-search-toggle";
        searchToggle.setAttribute("aria-label", "Open search");
        searchToggle.innerHTML = '<i class="bx bx-search"></i>';
        if (hamburgerBtn && hamburgerBtn.parentNode === navCenter) {
          navCenter.insertBefore(searchToggle, hamburgerBtn);
        } else {
          navCenter.appendChild(searchToggle);
        }
      }

      if (!navigation.querySelector(".mobile-search-bar")) {
        const mobileForm = document.createElement("form");
        mobileForm.className = "mobile-search-bar";
        mobileForm.setAttribute("role", "search");
        mobileForm.innerHTML = `
          <input type="text" class="mobile-search-input" placeholder="Search fabrics..." aria-label="Search fabrics" />
          <button type="submit" class="mobile-search-submit" aria-label="Search">
            <i class="bx bx-search"></i>
          </button>
        `;
        navigation.appendChild(mobileForm);
      }

      const searchToggle = navCenter.querySelector(".mobile-search-toggle");
      const mobileForm = navigation.querySelector(".mobile-search-bar");
      const mobileInput = mobileForm ? mobileForm.querySelector(".mobile-search-input") : null;

      const submitSearch = (value) => {
        const query = String(value || "").trim();
        const target = query ? `shop.html?search=${encodeURIComponent(query)}` : "shop.html";
        navigateWithinApp(target);
      };

      if (searchToggle && mobileForm) {
        searchToggle.addEventListener("click", () => {
          const willOpen = !mobileForm.classList.contains("open");
          mobileForm.classList.toggle("open", willOpen);
          searchToggle.classList.toggle("active", willOpen);
          searchToggle.setAttribute("aria-label", willOpen ? "Close search" : "Open search");
          if (willOpen && mobileInput) {
            window.setTimeout(() => mobileInput.focus(), 0);
          }
        });
      }

      if (mobileForm && mobileInput) {
        mobileForm.addEventListener("submit", (event) => {
          event.preventDefault();
          submitSearch(mobileInput.value);
        });
      }

      document.querySelectorAll(".nav-list .icons .icon i.bx-search").forEach((icon) => {
        const clickable = icon.closest(".icon");
        if (!clickable) return;
        clickable.addEventListener("click", (event) => {
          event.preventDefault();
          if (!mobileForm || !searchToggle) return;
          mobileForm.classList.add("open");
          searchToggle.classList.add("active");
          searchToggle.setAttribute("aria-label", "Close search");
          if (mobileInput) mobileInput.focus();
        });
      });
    };

    syncAuthButtons();
    syncHeaderCounts();
    initProfileDropdowns();
    initSignupSuccessBanner();
    initGlobalSearch();
    initMobileSearch();

    window.addEventListener("storage", syncHeaderCounts);
    window.addEventListener("taye-storage-update", syncHeaderCounts);
  }, []);
}

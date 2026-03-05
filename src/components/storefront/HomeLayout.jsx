const TOP_NAV_LINKS = [
  { href: "/userpage/about.html", label: "About Us" },
  { href: "/userpage/faq.html", label: "FAQ" },
  { href: "/userpage/contact.html", label: "Contact" },
];

const MAIN_NAV_LINKS = [
  { key: "home", href: "/userpage/home.html", label: "Home" },
  { key: "shop", href: "/userpage/shop.html", label: "Shop" },
  { key: "about", href: "/userpage/about.html", label: "About" },
  { key: "urgent-tailor", href: "/userpage/urgent-tailor.html", label: "Urgent Tailor" },
  { key: "contact", href: "/userpage/contact.html", label: "Contact" },
];

const PROFILE_MENU_LINKS = [
  { href: "/userpage/profile-details.html", label: "My Account" },
  { href: "/userpage/wishlist.html", label: "Wishlist" },
  { href: "#", label: "My Orders" },
  { href: "#", label: "Address" },
];

const MOBILE_MENU_LEGAL_LINKS = [
  { href: "#", label: "Terms Of Service" },
  { href: "#", label: "Privacy Policy" },
  { href: "/userpage/contact.html", label: "Support" },
];

const HEADER_ICON_LINKS = [
  { href: "#", icon: "bx-search" },
  { href: "/userpage/wishlist.html", icon: "bx-heart", withCount: true },
  { href: "/userpage/cart.html", icon: "bx-cart", withCount: true },
];

const BOTTOM_NAV_ITEMS = [
  { type: "link", href: "/userpage/shop.html", icon: "bx-grid-alt", label: "Shop" },
  {
    type: "link",
    href: "/userpage/wishlist.html",
    icon: "bx-heart",
    label: "Wishlist",
    withBadge: true,
  },
  {
    type: "link",
    href: "/userpage/cart.html",
    icon: "bx-cart",
    label: "Cart",
    withBadge: true,
  },
  { type: "profile" },
  {
    type: "link",
    href: "/userpage/contact.html",
    icon: "bx-support",
    label: "Support",
  },
];

function navClass(activeNav, key) {
  return `nav-link${activeNav === key ? " active" : ""}`;
}

function ProfileMenu({ menuClass, logoutClass }) {
  return (
    <div className={menuClass} role="menu" aria-hidden="true">
      <ul className="desktop-profile-menu-list profile-state-auth" role="none">
        {PROFILE_MENU_LINKS.map((item) => (
          <li key={`${menuClass}-${item.label}`} role="none">
            <a role="menuitem" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
        <li role="none">
          <button type="button" className={logoutClass} role="menuitem">
            Logout
          </button>
        </li>
      </ul>
      <div className="profile-state-guest">
        <p>No profile found.</p>
        <a href="/userpage/login.html">Create an account to continue</a>
      </div>
    </div>
  );
}

function BottomNavItem({ item }) {
  if (item.type === "profile") {
    return (
      <div className="mobile-bottom-item mobile-bottom-profile-dropdown">
        <button
          type="button"
          className="mobile-bottom-profile-toggle"
          aria-haspopup="true"
          aria-expanded="false"
          aria-label="Profile menu"
        >
          <i className="bx bx-user"></i>
          <span>Profile</span>
        </button>
        <ProfileMenu
          menuClass="mobile-bottom-profile-menu"
          logoutClass="mobile-bottom-logout-btn"
        />
      </div>
    );
  }

  return (
    <a
      href={item.href}
      className={`mobile-bottom-item${item.withBadge ? " has-badge" : ""}`}
    >
      <i className={`bx ${item.icon}`}></i>
      {item.withBadge && <span className="mobile-badge">0</span>}
      <span>{item.label}</span>
    </a>
  );
}

export default function HomeLayout({
  activeNav = "",
  showBottomNav = true,
  showHero = false,
  children,
}) {
  return (
    <>
      <header className="header" id="header">
        <div className="top-nav">
          <div className="container d-flex">
            <p>Order Online or Call Us: +234 706 370 1725</p>
            <ul className="d-flex">
              {TOP_NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="navigation">
          <div className="nav-center container d-flex">
            <img src="../Images/logo.png" alt="Brand Logo" className="logo" />
            <ul className="nav-list d-flex">
              <li className="mobile-menu-header">
                <img
                  src="../Images/logo.png"
                  alt="Taye's Fabrics"
                  className="mobile-menu-logo"
                />
              </li>

              {MAIN_NAV_LINKS.map((item) => (
                <li key={`desktop-${item.key}`} className="nav-item desktop-nav-item">
                  <a href={item.href} className={navClass(activeNav, item.key)}>
                    {item.label}
                  </a>
                </li>
              ))}

              {MAIN_NAV_LINKS.map((item) => (
                <li key={`mobile-${item.key}`} className="nav-item mobile-nav-item">
                  <a href={item.href} className={navClass(activeNav, item.key)}>
                    {item.label}
                  </a>
                </li>
              ))}

              <li className="mobile-auth-actions">
                <a href="/userpage/login.html" className="mobile-auth-btn mobile-auth-btn-outline">
                  Login
                </a>
                <a href="/userpage/signup.html" className="mobile-auth-btn mobile-auth-btn-solid">
                  Sign Up
                </a>
              </li>

              <li className="mobile-menu-legal">
                {MOBILE_MENU_LEGAL_LINKS.map((item) => (
                  <a key={item.label} href={item.href}>
                    {item.label}
                  </a>
                ))}
              </li>

              <li className="icons d-flex">
                <div className="mobile-profile-dropdown">
                  <button
                    type="button"
                    className="mobile-profile-toggle icon"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-label="Profile menu"
                  >
                    <i className="bx bx-user"></i>
                  </button>
                  <ProfileMenu menuClass="mobile-profile-menu" logoutClass="mobile-logout-btn" />
                </div>

                {HEADER_ICON_LINKS.map((item) => (
                  <a key={item.icon} href={item.href} className="icon">
                    <i className={`bx ${item.icon}`}></i>
                    {item.withCount && <span className="d-flex">0</span>}
                  </a>
                ))}
              </li>
            </ul>

            <div className="desktop-header-actions">
              <label className="desktop-header-search">
                <i className="bx bx-search"></i>
                <input type="text" placeholder="Search fabrics..." />
              </label>

              <div className="desktop-profile-dropdown">
                <button
                  type="button"
                  className="desktop-profile-toggle"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-label="Profile menu"
                >
                  <i className="bx bx-user"></i>
                  <i className="bx bx-chevron-down"></i>
                </button>
                <ProfileMenu menuClass="desktop-profile-menu" logoutClass="desktop-logout-btn" />
              </div>

              <div className="desktop-auth-group">
                <a href="/userpage/login.html" className="desktop-auth-link">
                  Login
                </a>
                <a href="/userpage/signup.html" className="desktop-signup-btn">
                  Sign Up
                </a>
              </div>

              <a href="/userpage/cart.html" className="desktop-cart" aria-label="Cart">
                <i className="bx bx-cart"></i>
                <span>0</span>
              </a>
            </div>

            <div className="hamburger">
              <i className="bx bx-menu-alt-left"></i>
            </div>
          </div>
        </div>

        {showHero && (
          <div className="hero">
            <div className="glide" id="glide1">
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides" id="hero-container"></ul>

                <div className="glide__bullets" data-glide-el="controls[nav]">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={`hero-bullet-${index}`}
                      className="glide__bullet"
                      data-glide-dir={`=${index}`}
                      aria-label={`Go to slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {children}

      {showBottomNav && (
        <nav className="mobile-bottom-nav" aria-label="Mobile quick links">
          {BOTTOM_NAV_ITEMS.map((item, index) => (
            <BottomNavItem key={`bottom-nav-${item.type}-${index}`} item={item} />
          ))}
        </nav>
      )}
    </>
  );
}

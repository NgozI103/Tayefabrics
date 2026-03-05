const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/fabricsby_tayejenifa?igsh=MXdnbGN0NHlsYWo2bA==",
    label: "Instagram",
    icon: "bxl-instagram",
  },
  {
    href: "https://www.facebook.com/share/1ChAwKeiYn/?mibextid=wwXIfr",
    label: "Facebook",
    icon: "bxl-facebook",
  },
  {
    href: "https://www.tiktok.com/@fabricsby_tayejenifa?_r=1&_t=ZS-928Trwu4lUr",
    label: "TikTok",
    icon: "bxl-tiktok",
  },
];

const SHOP_LINKS = [
  { href: "/userpage/shop.html?category=ankara", label: "Ankara Fabrics" },
  { href: "/userpage/shop.html?category=lace", label: "Asoebi" },
  { href: "/userpage/shop.html?category=ready-to-wear", label: "Ready-to-Wear" },
  { href: "/userpage/shop.html?category=accessories", label: "Accessories" },
];

const CONTACT_ITEMS = [
  {
    icon: "bx-map",
    text: "Oke-Ado High School, Ibadan Ring Road and Ikeja, Lagos State, Nigeria.",
  },
  { icon: "bx-phone", text: "+234 706 370 1725" },
  { icon: "bx-envelope", text: "tayefabrics@gmail.com" },
];

const COMPANY_LINKS = [
  { href: "/userpage/about.html", label: "About Us" },
  { href: "/userpage/contact.html", label: "Contact" },
  { href: "/userpage/faq.html", label: "FAQs" },
];

const FOOTER_LEGAL_LINKS = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col footer-brand">
            <img src="../Images/footerlogo.png" alt="Footer Logo" className="footer-logo" />
            <p>
              Bringing you the finest selection of authentic African fabrics,
              from vibrant Ankara prints to elegant Lace and handwoven Asooke.
            </p>
            <div className="footer-social">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`bx ${item.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col footer-nav-col">
            <h3>Shop</h3>
            <ul className="footer-links">
              {SHOP_LINKS.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-nav-col">
            <h3>Contact Us</h3>
            <ul className="footer-contact">
              {CONTACT_ITEMS.map((item) => (
                <li key={item.text}>
                  <i className={`bx ${item.icon}`}></i>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-nav-col">
            <h3>Company</h3>
            <ul className="footer-links">
              {COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>&copy; 2025 Taye&apos;s Fabrics. All rights reserved.</p>
          <div className="footer-legal">
            {FOOTER_LEGAL_LINKS.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

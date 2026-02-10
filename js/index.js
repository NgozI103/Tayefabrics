const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburger && navList) {
  hamburger.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

const container = document.getElementById("hero-container");

const heroContent = [
  {
    title: "Welcome to Taye's Fabrics",
    description:
      "Discover a world of vibrant colors and exquisite textures at Taye's Fabrics. Our collection features a wide range of high-quality fabrics, perfect for all your creative projects. Whether you're a fashion designer, a home decorator, or a DIY enthusiast, we have the perfect fabric for you. Shop now and bring your ideas to life with Taye's Fabrics.",
    buttonText: "Shop Now",
    image: "./Images/hero.png",
  },

  {
    title: "New Inspiration",
    description:
      "Shop now and embrace the beauty of tradition with a modern twist.",
    buttonText: "Discover More",
    image: "./Images/newinspiration.png",
  },
];

heroContent.map((content) => {
  container.innerHTML += `
      <li class="glide__slide has-overlay">
      <div class="center">
        <div class="left">
          <span>${content.title}</span>
          <h1>${content.title}</h1>
          <p>
            ${content.description}
          </p>
          <a href="" class="hero-btn">${content.buttonText}</a>
        </div>
        <div class="right">
          <img
            src="${content.image}"
            class="img1 hero-img"
            alt="Hero Image"
          />
        </div>
      </div>
    </li>
  `;
});
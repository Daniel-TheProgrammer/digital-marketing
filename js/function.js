document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("phoneInput");

  phoneInput.value = "+7";

  phoneInput.addEventListener("input", function (e) {
    let value = e.target.value;

    if (!value.startsWith("+7")) {
      value = "+7";
    }

    let digits = value.replace(/\D/g, "").substring(1);

    let formattedValue = "+7";
    if (digits.length > 0) {
      formattedValue += " (" + digits.substring(0, 3);
    }
    if (digits.length > 3) {
      formattedValue += ") " + digits.substring(3, 6);
    }
    if (digits.length > 6) {
      formattedValue += "-" + digits.substring(6, 8);
    }
    if (digits.length > 8) {
      formattedValue += "-" + digits.substring(8, 10);
    }

    e.target.value = formattedValue;
  });

  phoneInput.addEventListener("keydown", function (e) {
    if (
      e.target.selectionStart < 2 &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
  });

  const nav = document.querySelector("nav");
  const scrollOffset = 150;

  function handleScroll() {
    if (window.scrollY > scrollOffset) {
      nav.classList.add("fixed");
    } else {
      nav.classList.remove("fixed");
    }
  }

  window.addEventListener("scroll", handleScroll);

  const links = document.querySelectorAll("ul li a");
  const sections = document.querySelectorAll("section");

  function handleClick(event) {
    event.preventDefault();
    links.forEach((link) => link.parentElement.classList.remove("active"));
    event.target.parentElement.classList.add("active");
    const targetId = event.target.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  links.forEach((link) => {
    link.addEventListener("click", handleClick);
  });

  window.addEventListener("scroll", () => {
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute("id");
      }
    });
    links.forEach((link) => {
      link.parentElement.classList.remove("active");
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.parentElement.classList.add("active");
      }
    });
  });
});

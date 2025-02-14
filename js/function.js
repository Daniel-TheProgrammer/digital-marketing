document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".support_innner_container");
  const parent = container.parentElement;
  const clone = container.cloneNode(true);
  parent.appendChild(clone);

  const macbook = document.querySelector(".macbook_container");
  const megaphone = document.querySelector(".megaphone_container");
  const heart = document.querySelector(".notifyheart_container");
  const at = document.querySelector(".at_container");
  const dollarSm = document.querySelector(".dollar2_container");
  const dollarMd = document.querySelector(".dollar_container");
  const hashSm = document.querySelector(".hashiso_container");
  const hashMd = document.querySelector(".hashiso2_container");

  const IS_1900 = document.documentElement.clientWidth >= 1900;
  const IS_1600 = document.documentElement.clientWidth >= 1600;
  const IS_1400 = document.documentElement.clientWidth >= 1400;
  const IS_768 = document.documentElement.clientWidth >= 768;
  const IS_540 = document.documentElement.clientWidth >= 540;
  const IS_414 = document.documentElement.clientWidth >= 414;

  const sharedArgs = {
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
    duration: 4,
    repeatDelay: 0.2,
  };

  gsap.to(macbook, {
    rotation: 20,
    ...sharedArgs,
  });
  gsap.to(megaphone, {
    rotation: 12.5,
    y: IS_1900 ? -50 : IS_1600 ? -40 : IS_1400 ? -30 : IS_768 ? -20 : -10,
    x: IS_1900 ? 150 : IS_1600 ? 130 : IS_1400 ? 110 : IS_768 ? 80 : 40,
    ...sharedArgs,
  });
  gsap.to(heart, {
    rotation: 12.5,
    y: IS_1900 ? 120 : IS_1600 ? 100 : IS_1400 ? 80 : IS_768 ? 50 : 30,
    x: IS_1900 ? 120 : IS_1600 ? 100 : IS_1400 ? 80 : IS_768 ? 50 : 35,
    ...sharedArgs,
  });
  gsap.to(at, {
    rotation: 12.5,
    y: IS_1900 ? -30 : IS_1600 ? -20 : IS_1400 ? -10 : -10,
    x: IS_1900 ? 70 : IS_1600 ? 60 : IS_1400 ? 50 : IS_768 ? 30 : 20,
    ...sharedArgs,
  });
  gsap.to(dollarSm, {
    rotation: 12.5,
    y: IS_1900 ? -80 : IS_1600 ? -60 : IS_1400 ? -40 : IS_768 ? -30 : -10,
    x: IS_1900 ? 140 : IS_1600 ? 125 : IS_1400 ? 100 : IS_768 ? 80 : 40,
    ...sharedArgs,
  });
  gsap.to(dollarMd, {
    rotation: 12.5,
    x: IS_1900 ? 90 : IS_1600 ? 75 : IS_1400 ? 50 : IS_768 ? 30 : 30,
    ...sharedArgs,
  });
  gsap.to(hashSm, {
    rotation: 12.5,
    y: IS_1900 ? 5 : IS_1600 ? 3 : IS_1400 ? 2 : IS_768 ? 0 : -5,
    x: IS_1900 ? 90 : IS_1600 ? 80 : IS_1400 ? 70 : IS_768 ? 50 : 25,
    ...sharedArgs,
  });
  gsap.to(hashMd, {
    rotation: 12.5,
    y: IS_1900 ? 0 : IS_1600 ? 0 : IS_1400 ? 0 : IS_768 ? 0 : 0,
    x: IS_1900 ? 90 : IS_1600 ? 80 : IS_1400 ? 70 : IS_768 ? 30 : 30,
    ...sharedArgs,
  });

  let offset = 0;
  let speed = 3;
  function animate() {
    offset -= speed;
    if (offset <= -container.clientWidth) {
      offset = 0;
    }
    container.style.transform = `translateX(${offset}px)`;
    clone.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(animate);
  }
  animate();
  const phoneInput = document.getElementById("phoneInput");

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

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  window.addEventListener("scroll", () => {
    lenis.onScroll((e) => {});
  });

  lenis.on("scroll", () => {
    if (lenis.scroll > scrollOffset) {
      nav.classList.add("fixed");
    } else {
      nav.classList.remove("fixed");
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        lenis.scrollTo(targetSection);
      }
    });
  });
});

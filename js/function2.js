document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  function setupVerticalMarquee(column, speed, isReversed = false) {
    const images = [...column.children];
    const cloneContainer = document.createElement("div");

    images.forEach((img) => {
      const clone = img.cloneNode(true);
      cloneContainer.appendChild(clone);
    });

    column.appendChild(cloneContainer);

    let offset = isReversed ? -column.scrollHeight / 2 : 0;

    function animate() {
      offset += isReversed ? speed : -speed;
      if (isReversed && offset >= 0) {
        offset = -column.scrollHeight / 2;
      } else if (!isReversed && offset <= -column.scrollHeight / 2) {
        offset = 0;
      }
      column.style.transform = `translateY(${offset}px)`;
      requestAnimationFrame(animate);
    }
    animate();
  }

  setupVerticalMarquee(document.querySelector(".team_img_left"), 2.5, false);
  setupVerticalMarquee(document.querySelector(".team_img_right"), 2.5, true);

  const stepBlockContainer = document.querySelector(".step_blocks_container");
  const innerLine = document.querySelector(".inner-line");

  window.addEventListener("scroll", function () {
    const containerTop = stepBlockContainer.offsetTop;
    const containerHeight = stepBlockContainer.offsetHeight;
    const scrollY = window.scrollY + window.innerHeight;

    const scrollProgress = (scrollY - containerTop) / containerHeight;
    const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);

    console.log(clampedProgress)

    gsap.to(innerLine, {
      height: `${clampedProgress * 100}%`,
      ease: "none",
    });
  });

  gsap.utils.toArray(".line").forEach((line, i) => {
    const title = line.querySelector(".title");
    const paragraph = line.querySelector("p");
    const lineBefore = line.querySelector("::before");

    if (i === 0) {
      gsap.set(title, { fontWeight: "bold" });
      gsap.set(paragraph, { opacity: 1, y: 0 });
      line.classList.add("line_active");
    } else {
      gsap.set(paragraph, { opacity: 0, height: 0 });
      gsap.set(title, { fontWeight: "normal" });
    }

    ScrollTrigger.create({
      trigger: line,
      start: "top 70%",
      end: "bottom center",
      scrub: true,
      onEnter: () => {
        gsap.to(title, { fontWeight: "600", duration: 0.5 });
        gsap.to(paragraph, {
          opacity: 1,
          height: "auto",
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        const sectionTop = line.offsetTop;
        const sectionHeight = line.offsetHeight;
        const sectionProgress = (scrollY - sectionTop) / sectionHeight;
        const clampedSectionProgress = Math.min(
          Math.max(sectionProgress, 0),
          1
        );

        if (clampedSectionProgress > 0) {
          gsap.to(paragraph, {
            opacity: 1,
            y: 0,
            height: "auto",
            duration: 0.8,
          });
        }

        gsap.to(lineBefore, {
          backgroundColor: "#ff0000",
          opacity: 1,
          height: "100%",
          duration: 0.8,
          ease: "power2.out",
        });

        line.classList.add("line_active");
      },
      onLeaveBack: () => {
        if (i !== 0) {
          gsap.to(title, { fontWeight: "normal", duration: 0.5 });
          gsap.to(paragraph, {
            opacity: 0,
            height: 0,
            y: 50,
            duration: 0.5,
          });
          line.classList.remove("line_active");

          gsap.to(lineBefore, {
            backgroundColor: "#ffffff",
            opacity: 0,
            height: "0%",
            duration: 0.5,
          });
        }
      },
    });
  });
});

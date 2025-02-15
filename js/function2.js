document.addEventListener("DOMContentLoaded", function () {
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
});

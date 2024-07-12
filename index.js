const glide = new Glide(".glide");
const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scroll-to-top");

glide.mount();

window.addEventListener("scroll", () => {
  // 获取
  let height = headerEl.getBoundingClientRect().height;

  if (window.pageYOffset - height > 400) {
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }

  if (window.pageYOffset > 1000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

glide.on(["mount.after", "run.after"], () => {
  const captionsEL = document.querySelectorAll(".slide-caption");
  const caption = captionsEL[glide.index];
  if (caption) {
    const children = Array.from(caption.children);
    anime({
      targets: children,
      opacity: [0, 1],
      duration: 400,
      easing: "spring(1, 80, 10, 0)",
      delay: anime.stagger(400, { start: 300 }),
      translateY: [anime.stagger([40, 10]), 0],
    });
    console.log(caption);
  }
});

glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach((el) => {
    el.style.opacity = 0;
  });
});

const isotope = new Isotope(".cases", {
  layoutMode: "fitRows",
  itemSelector: ".case-item",
});

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", (e) => {
  let { target } = e;
  const filterOption = target.getAttribute("data-filter");
  if (filterOption) {
    document
      .querySelectorAll(".filter-btn.active")
      .forEach((btn) => btn.classList.remove("active"));
    target.classList.add("active");

    isotope.arrange({ filter: filterOption });
  }
});

const staggeringOption = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "bottom",
};

// interval设置等待时间
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 });


ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 350 });


const dataSectionEl = document.querySelector(".data-section");

ScrollReveal().reveal(".data-section", {
  beforeReveal: () => {
    anime({
      targets: ".data-piece .num",
      innerHTML: (el) => {
        return [0, el.innerHTML];
        // 从0到显示的数字过渡
      },
      duration: 1500,
      round: 1,
      // 一个一个增加
      easinge: "easeInExpo",
      // 逐渐加速的动画效果
    });
    dataSectionEl.style.backgroundPosition =
      "center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom/5}px)";
  },
});

// 暂时不知道是干什么的
window.addEventListener("scroll", () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom;
  const top = dataSectionEl.getBoundingClientRect.top;
  if (bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = "center calc(50% - ${bottom/5}px)";
  }
});

const scroll = new SmoothScroll(
  'nav a[href*="#"] , .scroll-to-top a[href*="#"]',
  {
    header: "header",
    offset: -50,
    // 更改偏移量
  }
);


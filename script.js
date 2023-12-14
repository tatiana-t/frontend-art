const tabTitles = document.body.querySelectorAll(".tabs__item");

//set active class for link
const tabsContent = document.body.querySelector(".tabs-content");
const tabsSections = document.body.querySelectorAll(".tabs-content__section");

const setActive = () => {
  const isMobile = window.innerWidth <= 820;
  const desktopContainerPosition = document.body
    .querySelector(".tabs-content")
    .getBoundingClientRect().top;

  const containerPosition = isMobile ? 0 : desktopContainerPosition;

  tabsSections.forEach((section) => {
    const sectionPosition = section.getBoundingClientRect().top;
    const diff = isMobile
      ? containerPosition - sectionPosition
      : Math.abs(containerPosition - sectionPosition);

    if (diff < 30 && diff > -70) {
      document.body
        .querySelector(".tabs__item_active")
        .classList.remove("tabs__item_active");
      document.body
        .querySelector(`[href='#${section.getAttribute("id")}']`)
        .classList.add("tabs__item_active");

      Promise.resolve(() => {
        location.hash = section.getAttribute("id");
      });
      // setTimeout(() => {
      // }, 100);

      if (isMobile) {
        document.body.querySelector(".tabs__item_active").scrollIntoView();
      }
    }
  });
};

let timerId;
const tabsContainer = document.body.querySelector(".tabs");

const setMobile = () => {
  const tabsPosition = tabsContainer.getBoundingClientRect().top;

  if (window.innerWidth <= 820) {
    document.addEventListener("scroll", setMobile);
    document.addEventListener("scroll", setActive);
    tabsContent.removeEventListener("scroll", setActive);

    if (tabsPosition < 70) {
      tabsContainer.classList.add("tabs_fixed");
    } else {
      tabsContainer.classList.remove("tabs_fixed");
    }
  } else {
    document.removeEventListener("scroll", setMobile);
    document.removeEventListener("scroll", setActive);
    tabsContent.addEventListener("scroll", setActive);

    tabsContainer.classList.remove("tabs_fixed");
  }
};

setMobile();

window.addEventListener("resize", () => {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    setMobile();
    setActive();
  }, 50);
});

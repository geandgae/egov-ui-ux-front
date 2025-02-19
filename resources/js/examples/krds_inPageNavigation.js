const krds_inPageNavigation = {
  quickIndicators: null,
  init() {
    this.quickIndicators = document.querySelectorAll(".krds-in-page-navigation-type .krds-in-page-navigation-area:not(.sample) .in-page-navigation-list");

    if (!this.quickIndicators.length) return;

    this.observeListChanges();
    this.setupAnchorScroll();
    this.updateActiveSection();
  },
  observeListChanges() {
    // in-page-navigation-list 변경 시 setupAnchorScroll 호출
    const quickList = document.querySelector(".krds-in-page-navigation-type .in-page-navigation-list");
    if (!quickList) return;
    const observer = new MutationObserver(() => {
      this.setupAnchorScroll();
    });
    observer.observe(quickList, {
      childList: true,
      subtree: true,
    });
  },
  setupAnchorScroll() {
    this.quickIndicators.forEach((indicator) => {
      const locationList = indicator.querySelectorAll("a");
      locationList.forEach((anchor) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          anchor.removeEventListener("click", this.applyScroll);
          anchor.removeEventListener("keydown", this.applyScroll);
          anchor.addEventListener("click", this.applyScroll.bind(this, target));
          anchor.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              this.applyScroll(target, event);
            }
          });
        }
      });
    });
  },
  applyScroll(target, event) {
    event.preventDefault();
    const headerHeight = this.calculateHeaderHeight();

    window.scrollTo({
      left: 0,
      top: target.getBoundingClientRect().top + window.scrollY - headerHeight,
      behavior: "smooth",
    });

    // enter 초점 이동
    if (event.type === "keydown") {
      const focusable = target.querySelector(".sec-tit");

      if (focusable) {
        focusable.setAttribute("tabindex", "-1");
        focusable.focus({ preventScroll: true });
      }
    }
  },
  calculateHeaderHeight() {
    const headerTop = document.querySelector("#krds-masthead")?.clientHeight || 0;
    const headerInner = document.querySelector("#krds-header .header-in")?.clientHeight || 0;
    return headerTop + headerInner;
  },
  updateActiveSection() {
    if (!this.quickIndicators) return;

    const winHeight = window.innerHeight;
    let sectionArea = [];
    const activeTab = document.querySelector(".tab-conts:not(.sample).active");

    // 탭이 아닐때와 탭일때 sectionArea 설정
    if (activeTab) {
      const id = activeTab.getAttribute("id");
      const dataTrue = activeTab.getAttribute("data-quick-nav");
      if (dataTrue === "true") {
        sectionArea = document.querySelectorAll(`#${id} .section-link`);
      }
    } else {
      sectionArea = document.querySelectorAll(".scroll-check .section-link");
    }

    //페이지 스크롤 시 퀵 네비게이션 해당메뉴 active
    if (sectionArea.length > 0) {
      const topHeight = Math.ceil(winHeight / 5); // 윈도우의 20%
      const firstSecTop = sectionArea[0].offsetTop;
      const scrollBottom = window.scrollY + winHeight;
      const scrollHeight = document.body.scrollHeight;
      sectionArea.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - topHeight;
        const sectionId = current.getAttribute("id");
        const navLink = document.querySelector(`.krds-in-page-navigation-area a[href*=${sectionId}]`);
        const firstAnchor = document.querySelector(".krds-in-page-navigation-area .in-page-navigation-list li:first-of-type a");
        const lastAnchor = document.querySelector(".krds-in-page-navigation-area .in-page-navigation-list li:last-of-type a");
        if (scrollBottom >= scrollHeight) {
          // 스크롤이 페이지 끝에 도달했을 때
          this.setActiveIndicator(lastAnchor);
        }
        else if (window.scrollY <= firstSecTop) {
          // 스크롤이 첫번째 섹션보다 위에 있을때
          this.setActiveIndicator(firstAnchor);
        } else if (window.scrollY > sectionTop && window.scrollY <= sectionTop + sectionHeight) {
          // 현재 섹션에 있을 때
          this.setActiveIndicator(navLink);
        }
      });
    }
  },
  setActiveIndicator(anchor) {
    if (anchor) {
      this.quickIndicators.forEach((indicator) => {
        const locationList = indicator.querySelectorAll("a");
        locationList.forEach((anchor) => {
          anchor.classList.remove("active");
        });
      });
      anchor.classList.add("active");
    }
  },
};
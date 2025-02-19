const krds_mainMenuMobile = {
  init() {
    const mobileGnb = document.querySelector(".krds-main-menu-mobile:not(.sample)");

    if (!mobileGnb) return;

    if (mobileGnb.classList.contains("is-open")) {
      this.openMainMenu(mobileGnb);
    } else {
      mobileGnb.style.display = "none";
    }

    // gnb 외부 클릭 처리
    mobileGnb.addEventListener("click", (event) => {
      if (!event.target.closest(".gnb-wrap")) {
        mobileGnb.querySelector(".gnb-wrap").focus();
      }
    });

    // 접근성 설정(tab)
    this.setupAriaAttributes(mobileGnb);

    this.attachEvents(mobileGnb);
  },
  setupAriaAttributes(mobileGnb) {
    const tabList = mobileGnb.querySelector(".menu-wrap");
    if (tabList) {
      tabList.querySelector(".menu-wrap ul").setAttribute("role", "tablist");
      tabList.querySelectorAll(".menu-wrap li").forEach((li) => li.setAttribute("role", "none"));

      const tabs = document.querySelectorAll(".menu-wrap .gnb-main-trigger");
      tabs.forEach((item, idx) => {
        item.setAttribute("role", "tab");
        item.setAttribute("aria-selected", "false");
        item.setAttribute("aria-controls", item.getAttribute("href").substring(1));
        item.setAttribute("id", `tab-${idx}`);

        // gnb-main-trigger 클릭시 해당 위치로 스크롤
        item.addEventListener("click", (event) => {
          event.preventDefault();
          const id = item.getAttribute("aria-controls");
          const top = document.getElementById(id).offsetTop
          const gnbBody = document.querySelector(".gnb-body");
          gnbBody.scrollTo({
            left: 0,
            top: top,
            behavior: "smooth",
          });
        })
      });

      const tabPanels = document.querySelectorAll(".submenu-wrap .gnb-sub-list");
      tabPanels.forEach((item, idx) => {
        item.setAttribute("role", "tabpanel");
        item.setAttribute("aria-labelledby", `tab-${idx}`);
      });
    }
  },
  attachEvents(mobileGnb) {
    const id = mobileGnb.getAttribute("id");
    const openGnb = document.querySelector(`[aria-controls=${id}]`);
    const closeGnb = mobileGnb.querySelector("#close-nav");

    openGnb.addEventListener("click", () => this.openMainMenu(mobileGnb));
    closeGnb.addEventListener("click", () => this.closeMainMenu(mobileGnb));
    this.setupAnchorScroll(mobileGnb);
    this.setupAnchorLinks(mobileGnb);

    // 반응형 처리
    window.addEventListener("resize", () => {
      const isPC = windowSize.getWinSize() === "pc";
      if (isPC) this.closeMainMenu(mobileGnb);
    });
  },
  openMainMenu(mobileGnb) {
    const navContainer = mobileGnb.querySelector(".gnb-wrap");
    // const id = mobileGnb.getAttribute("id");
    // const openGnb = document.querySelector(`[aria-controls=${id}]`);
    // const header = document.querySelector("#krds-header");

    mobileGnb.style.display = "block";
    navContainer.setAttribute("tabindex", 0);
    // openGnb.setAttribute("aria-expanded", "true");
    // header.style.zIndex = "1000";

    // active 메뉴로 스크롤 이동
    const activeTrigger = document.querySelector(".gnb-main-trigger.active");
    if (activeTrigger) {
      const id = activeTrigger.getAttribute("aria-controls");
      const top = document.getElementById(id).offsetTop;
      const gnbBody = document.querySelector(".gnb-body");
      gnbBody.style.scrollBehavior = "auto";
      gnbBody.scrollTop = top
    } 
    
    setTimeout(() => {
      mobileGnb.classList.add("is-backdrop");
      mobileGnb.classList.add("is-open");
      document.body.classList.add("is-gnb-mobile");
    }, 100);

    // transition 종료후 실행
    mobileGnb.addEventListener("transitionend", function onTransitionEnd() {
      navContainer.focus();
      mobileGnb.removeEventListener("transitionend", onTransitionEnd);

      // inert 설정
      document.querySelector("#krds-header .header-in").setAttribute("inert", "");
      document.getElementById("container")?.setAttribute("inert", "");
      document.getElementById("footer")?.setAttribute("inert", "");
      
      // 포커스 트랩 설정
      common.focusTrap(mobileGnb);
    });

  },
  closeMainMenu(mobileGnb) {
    const id = mobileGnb.getAttribute("id");
    const openGnb = document.querySelector(`[aria-controls=${id}]`);
    // const header = document.querySelector("#krds-header");

    mobileGnb.classList.remove("is-backdrop");
    mobileGnb.classList.remove("is-open");
    // openGnb.setAttribute("aria-expanded", "false");
    // header.style.zIndex = "";

    // inert 설정
    document.querySelector("#krds-header .header-in").removeAttribute("inert");
    document.getElementById("container")?.removeAttribute("inert");
    document.getElementById("footer")?.removeAttribute("inert");
    
    // transition 종료후 실행
    mobileGnb.addEventListener("transitionend", function onTransitionEnd() {
      openGnb.focus();
      mobileGnb.removeEventListener("transitionend", onTransitionEnd);
    });
    
    setTimeout(() => {
      mobileGnb.style.display = "none";
      document.body.classList.remove("is-gnb-mobile");
    }, 400);
  },
  setupAnchorScroll(mobileGnb) {
    const gnbBody = mobileGnb.querySelector(".gnb-body");
    const navContainer = mobileGnb.querySelector(".gnb-wrap");
    const navItems = mobileGnb.querySelectorAll(".submenu-wrap .gnb-sub-list");
    const headerTabArea = mobileGnb.querySelector(".gnb-tab-nav");
    const headerTabMenu = headerTabArea?.querySelector(".menu-wrap");

    gnbBody.addEventListener("scroll", () => {
      const scrollTop = gnbBody.scrollTop;
      const scrollHeight = gnbBody.scrollHeight;
      const bodyHeight = gnbBody.clientHeight;

      navItems.forEach((item) => {
        const id = item.getAttribute("id");
        const menuLink = mobileGnb.querySelector(`[href="#${id}"]`);
        const offset = item.offsetTop;
        if (scrollTop >= offset || bodyHeight + scrollTop >= scrollHeight) {
          this.resetAnchorMenu();
          menuLink.classList.add("active");
          menuLink.setAttribute("aria-selected", "true");
          if (headerTabArea) {
            const headerTabMenuUl = headerTabMenu.querySelector("ul");
            gnbBody.addEventListener("scrollend", () => {
              headerTabMenuUl.scrollLeft = menuLink.offsetLeft;
            });
          }
        }
      });

      this.handleTopScroll(headerTabArea, navContainer, gnbBody);
    });
  },
  handleTopScroll(headerTabArea, navContainer, gnbBody) {
    // gnb-mobile-type1(headerTabArea: gnb-tab-nav)
    let lastBodyScrollY = 0;

    if (!headerTabArea) return; // 요소가 없을 경우 함수 종료

    gnbBody.addEventListener("scroll", (event) => {
      const bodyScrollY = event.target.scrollTop;

      if (bodyScrollY > 0) {
        headerTabArea.style.height = `${headerTabArea.scrollHeight}px`;
        headerTabArea.style.transition = "ease-out .4s";
        navContainer.classList.add("is-active");
      } else if (bodyScrollY < 50 && bodyScrollY < lastBodyScrollY) {
        headerTabArea.style.height = "";
        headerTabArea.style.transition = "ease-out .4s .2s";
        setTimeout(() => {
          navContainer.classList.remove("is-active");
        }, 600);
      }

      lastBodyScrollY = bodyScrollY;
    });
  },
  setupAnchorLinks(mobileGnb) {
    const menuItems = mobileGnb.querySelectorAll(".menu-wrap .gnb-main-trigger");
    const navItems = mobileGnb.querySelectorAll(".submenu-wrap .gnb-sub-list");

    if (!document.querySelector(".menu-wrap .gnb-main-trigger.active")) {
      menuItems[0].classList.add("active");
      menuItems[0].setAttribute("aria-selected", "true");
    }

    // 3depth
    navItems.forEach((item) => {
      const depth3Items = item.querySelectorAll(".has-depth3");
      if (depth3Items.length > 0) {
        depth3Items.forEach((item) => {
          if (item.classList.contains("active")) {
            item.classList.add("active");
            item.setAttribute("aria-expanded", "true");
            item.nextElementSibling.classList.add("is-open");
          } else {
            item.setAttribute("aria-expanded", "false");
          }
          item.addEventListener("click", (event) => this.handleDepth3Click(event, item));
        });
      }
    });

    // 4depth
    navItems.forEach((item) => {
      const depth4Items = item.querySelectorAll(".has-depth4");
      if (depth4Items.length > 0) {
        depth4Items.forEach((item) => {
          item.addEventListener("click", (event) => this.handleDepth4Click(event, item));
        });
      }
    });
  },
  handleDepth3Click(event) {
    const isActive = event.target.classList.contains("active");

    const resetList = () => {
      document.querySelectorAll(".has-depth3").forEach((depth3) => {
        depth3.classList.remove("active");
        depth3.setAttribute("aria-expanded", "false");
        depth3.nextElementSibling.classList.remove("is-open");
      });
    };

    if (!isActive) {
      // resetList();
      event.target.classList.add("active");
      event.target.setAttribute("aria-expanded", "true");
      event.target.nextElementSibling.classList.add("is-open");
    } else {
      // resetList();
      event.target.classList.remove("active");
      event.target.setAttribute("aria-expanded", "false");
      event.target.nextElementSibling.classList.remove("is-open");
    }
  },
  handleDepth4Click(event) {
    const target = event.target.nextElementSibling;
    const prevButton = target.querySelector(".trigger-prev");
    const closeButton = target.querySelector(".trigger-close");

    target.style.display = "block";
    setTimeout(() => {
      target.classList.add("is-open");
    }, 0);
    prevButton.focus();

    const depth4Close = () => {
      target.classList.remove("is-open");
      event.target.focus();
      setTimeout(() => {
        target.style.display = "";
      }, 400);
    };

    prevButton.addEventListener("click", depth4Close);
    closeButton.addEventListener("click", depth4Close);

    // 포커스 트랩 설정
    common.focusTrap(target);
  },
  resetAnchorMenu() {
    document.querySelectorAll(".krds-main-menu-mobile .menu-wrap .gnb-main-trigger").forEach((menu) => {
      menu.classList.remove("active");
      menu.setAttribute("aria-selected", "false");
    });
  },
};
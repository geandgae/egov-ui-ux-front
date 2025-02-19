const krds_sideNavigation = {
  init() {
    this.setupSideNavLists();
    this.setupToggleEvents();
    this.setupPopupEvents();
  },
  setupSideNavLists() {
    const sideNavLists = document.querySelectorAll(".krds-side-navigation .lnb-list");
    sideNavLists.forEach((navList) => {
      const navItems = navList.querySelectorAll("li");
      navItems.forEach((navItem) => this.setupNavItem(navItem));
    });
  },
  setupNavItem(navItem) {
    const navButton = navItem.querySelector(".lnb-btn");
    if (!navButton || !navButton.className.includes("lnb-toggle")) return;

    const uniqueIdx = `lnbmenu-${Math.random().toString(36).substring(2, 9)}`;
    const navSubmenu = navButton.nextElementSibling;

    // aria 설정
    navButton.setAttribute("aria-controls", uniqueIdx);
    navButton.setAttribute("aria-expanded", navButton.classList.contains("active"));

    // 서브메뉴 id 설정 및 popup 처리
    if (navButton.classList.contains("lnb-toggle-popup")) {
      navButton.setAttribute("aria-haspopup", "true");
    }
    if (navSubmenu && navSubmenu.className.includes("lnb-submenu")) {
      const navSubmenuList = navSubmenu.classList.contains("lnb-submenu-lv2") ? navSubmenu : navSubmenu.querySelector(":scope > ul");
      navSubmenuList?.setAttribute("id", uniqueIdx);
    }
  },
  setupToggleEvents() {
    const toggleButtons = document.querySelectorAll(".krds-side-navigation .lnb-list:not(.exception-case) .lnb-toggle");
    toggleButtons.forEach((toggleButton) => {
      toggleButton.addEventListener("click", () => {
        const expand = toggleButton.getAttribute("aria-expanded") !== "true";
        this.toggleMenu(toggleButton, expand);
        this.closeSiblingMenus(toggleButton);
      });
    });
  },
  setupPopupEvents() {
    let lastClickedButton = null;

    const popupToggleButtons = document.querySelectorAll(".lnb-toggle-popup");
    const popupSubmenus = document.querySelectorAll(".lnb-submenu-lv2");

    // 팝업 토글 버튼
    popupToggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const popupSubmenu = button.nextElementSibling;
        if (popupSubmenu && popupSubmenu.classList.contains("lnb-submenu-lv2")) {
          popupSubmenu.classList.add("active");
          button.setAttribute("aria-expanded", "true");

          popupSubmenu.addEventListener(
            "transitionend",
            () => {
              popupSubmenu.querySelector(".lnb-btn-tit")?.focus();
            },
            { once: true }
          );

          lastClickedButton = button;
        }
      });
    });

    // 서브 메뉴가 포커스를 잃으면 비활성화
    popupSubmenus.forEach((popupSubmenu) => {
      popupSubmenu.addEventListener("focusout", (event) => {
        // 포커스가 서브메뉴 밖으로 나갔는지 확인
        if (!popupSubmenu.contains(event.relatedTarget)) {
          popupSubmenu.classList.remove("active");

          if (lastClickedButton) {
            lastClickedButton.setAttribute("aria-expanded", "false");
            popupSubmenu.addEventListener(
              "transitionend",
              () => {
                lastClickedButton.focus();
              },
              { once: true }
            );
          }
        }
      });

      // lnb-btn-tit 클릭 시 서브메뉴 닫기
      const subMenuTitleButton = popupSubmenu.querySelector(".lnb-btn-tit");
      subMenuTitleButton?.addEventListener("click", () => {
        lastClickedButton?.focus();
      });
    });
  },
  toggleMenu(toggleButton, expand) {
    const parentListItem = toggleButton.closest("li");
    toggleButton.setAttribute("aria-expanded", expand);
    toggleButton.classList.toggle("active", expand);
    parentListItem.classList.toggle("active", expand);
  },
  closeSiblingMenus(toggleButton) {
    const parentListItem = toggleButton.closest("li");
    const siblingButtons = parentListItem.parentNode.querySelectorAll(":scope > li > .lnb-toggle");
    siblingButtons.forEach((siblingButton) => {
      if (siblingButton !== toggleButton) {
        this.toggleMenu(siblingButton, false);
      }
    });
  },
  setActiveCurrentPage() {
    // 활성화된 페이지를 찾는 예(개발 환경에 맞게 수정)
    const currentPage = window.location.pathname.split("/").slice(-1)[0].replace(".html", "");
    const lnbLinks = document.querySelectorAll(".krds-side-navigation .lnb-link");
    lnbLinks.forEach((link) => {
      const linkPage = link.getAttribute("href").split("/").pop().replace(".html", "");
      if (linkPage === currentPage) {
        link.closest(".lnb-item").classList.add("active");
        link.closest(".lnb-item").querySelector(".lnb-toggle")?.classList.add("active");
        link.closest(".lnb-item").querySelector(".lnb-toggle")?.setAttribute("aria-expanded", "true");
        link.closest("li").classList.add("active");
        // 접근성 현재 페이지 표시 aria-current
        link.setAttribute("aria-current", "page");
      }
    });
  },
};
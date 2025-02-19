const krds_mainMenuPC = {
  init() {
    const gnbMenu = document.querySelector(".krds-main-menu:not(.sample) .gnb-menu");

    if (!gnbMenu) return;

    // gnb 속성설정
    gnbMenu.setAttribute("aria-label", "메인 메뉴");

    // dimed 요소를 설정, 기존 dimed가 없을 경우 생성
    this.backdrop = document.querySelector(".gnb-backdrop") || this.createBackdrop();

    // 주 메뉴 및 서브 메뉴의 트리거를 설정하고, 각 트리거에 이벤트를 연결
    const mainTriggers = gnbMenu.querySelectorAll(".gnb-main-trigger");
    const subTriggers = gnbMenu.querySelectorAll(".gnb-sub-trigger:not(.is-link)");
    mainTriggers.forEach((mainTrigger) => this.setupMainTrigger(mainTrigger));
    this.attachEvents(mainTriggers, subTriggers);
    this.setupKeyboardNavigation(mainTriggers);
  },
  setupMainTrigger(mainTrigger) {
    const toggleWrap = mainTrigger.nextElementSibling;
    if (toggleWrap) {
      const uniqueIdx = `gnb-main-menu-${Math.random().toString(36).substring(2, 9)}`;
      mainTrigger.setAttribute("aria-controls", uniqueIdx);
      mainTrigger.setAttribute("aria-expanded", "false");
      mainTrigger.setAttribute("aria-haspopup", "true");
      toggleWrap.setAttribute("id", uniqueIdx);

      // 하위 메뉴 설정
      const mainList = toggleWrap.querySelector(".gnb-main-list");
      if (mainList?.getAttribute("data-has-submenu") === "true") {
        const subTriggers = mainList.querySelectorAll(".gnb-sub-trigger");
        subTriggers.forEach((subTrigger) => this.setupSubTrigger(subTrigger));
        if (subTriggers.length > 0 && !subTriggers[0].classList.contains("is-link")) {
          subTriggers[0].classList.add("active");
          subTriggers[0].setAttribute("aria-expanded", "true");
          subTriggers[0].nextElementSibling?.classList.add("active");
        }
      }
    }
  },
  setupSubTrigger(subTrigger) {
    const hasMenu = subTrigger.nextElementSibling;
    if (hasMenu) {
      const uniqueIdx = `gnb-sub-menu-${Math.random().toString(36).substring(2, 9)}`;
      subTrigger.setAttribute("aria-controls", uniqueIdx);
      subTrigger.setAttribute("aria-expanded", "false");
      subTrigger.setAttribute("aria-haspopup", "true");
      hasMenu.setAttribute("id", uniqueIdx);
    }
  },
  toggleMainMenu(mainTrigger) {
    const isActive = mainTrigger.classList.contains("active");
    const isDropDown = mainTrigger.classList.contains("is-dropdown");
    if (!isActive && mainTrigger.nextElementSibling) {
      this.resetMainMenu();
      mainTrigger.setAttribute("aria-expanded", "true");
      mainTrigger.classList.add("active");
      mainTrigger.nextElementSibling.classList.add("is-open");
      if (!isDropDown) {
        this.toggleBackdrop(true);
        this.toggleScrollbar(true);
        this.adjustSubMenuHeight(mainTrigger.nextElementSibling.querySelector(".gnb-main-list"));
      }
    } else {
      this.closeMainMenu();
    }
  },
  toggleSubMenu(subTrigger) {
    const otherSubTriggers = subTrigger.closest("ul").querySelectorAll(".gnb-sub-trigger:not(.is-link)");
    otherSubTriggers.forEach((trigger) => {
      trigger.classList.remove("active");
      trigger.setAttribute("aria-expanded", "false");
      trigger.nextElementSibling?.classList.remove("active");
    });
    subTrigger.classList.add("active");
    subTrigger.setAttribute("aria-expanded", "true");
    subTrigger.nextElementSibling?.classList.add("active");
    this.adjustSubMenuHeight(subTrigger.closest(".gnb-main-list"));
  },
  createBackdrop() {
    const backdrop = document.createElement("div");
    backdrop.classList.add("gnb-backdrop");
    document.body.appendChild(backdrop);
    // backdrop.style.display = "none";
    return backdrop;
  },
  toggleBackdrop(isOpen) {
    this.backdrop?.classList.toggle("active", isOpen);
    document.body.classList.toggle("is-gnb-web", isOpen);
    // this.backdrop.style.display = isOpen ? "block" : "none";
  },
  adjustSubMenuHeight(target) {
    // 서브 메뉴 높이를 활성 메뉴에 맞춰 조정
    const activeSubList = target.querySelector(".gnb-sub-list.active");
    const height = activeSubList?.scrollHeight || 0;
    target.style.minHeight = `${height}px`;
  },
  toggleScrollbar(isEnabled) {
    const isScrollNeeded = document.body.scrollHeight > window.innerHeight;
    document.body.classList.toggle("hasScrollY", isEnabled && isScrollNeeded);
  },
  resetMainMenu() {
    document.querySelectorAll(".krds-main-menu:not(.sample) .gnb-main-trigger:not(.is-link)").forEach((mainTrigger) => {
      mainTrigger.classList.remove("active");
      mainTrigger.setAttribute("aria-expanded", "false");
    });
    document.querySelectorAll(".krds-main-menu:not(.sample) .gnb-toggle-wrap").forEach((toggleWrap) => {
      toggleWrap.classList.remove("is-open");
    });
  },
  closeMainMenu() {
    this.resetMainMenu();
    this.toggleBackdrop(false);
    this.toggleScrollbar(false);
  },
  attachEvents(mainTriggers, subTriggers) {
    // krds-main-menu 외부 클릭시 닫기
    document.addEventListener("click", ({ target }) => {
      if (!target.closest(".krds-main-menu")) this.closeMainMenu();
    });

    // 백드롭 클릭 시 메뉴 닫기
    // this.backdrop.addEventListener("click", () => this.closeMainMenu());

    // ESC 키를 눌러 메뉴를 닫거나, TAB 키로 초점이 메뉴 외부로 이동했을 때 메뉴 닫기
    document.addEventListener("keyup", (event) => {
      if (event.code === "Escape" || !event.target.closest(".krds-main-menu")) {
        this.closeMainMenu();
      }
    });

    // 메인 메뉴 트리거 설정
    mainTriggers.forEach((mainTrigger) => {
      mainTrigger.addEventListener("click", () => this.toggleMainMenu(mainTrigger));
    });

    // 서브 메뉴 트리거 설정
    subTriggers.forEach((subTrigger) => {
      subTrigger.addEventListener("click", () => this.toggleSubMenu(subTrigger));
    });
  },
  setupKeyboardNavigation(mainTriggers) {
    const focusMenuItem = (element) => {
      if (element) {
        element.focus();
      }
    };
    const findFocusableElement = (element, direction) => {
      const sibling = direction === "next" ? "nextElementSibling" : "previousElementSibling";
      const parent = element.closest("li")?.[sibling];
      return parent ? parent.querySelector("[data-trigger]") : null;
    };
    // Home, End, 방향키를 통해 메뉴 항목 간의 이동을 처리
    document.addEventListener("keydown", (event) => {
      const target = event.target;
      if (target.getAttribute("data-trigger")) {
        switch (event.key) {
          case "Home":
            event.preventDefault();
            focusMenuItem(mainTriggers[0]);
            break;
          case "End":
            event.preventDefault();
            focusMenuItem(mainTriggers[mainTriggers.length - 1]);
            break;
          case "ArrowRight":
          case "ArrowDown":
            event.preventDefault();
            const nextElement = findFocusableElement(target, "next");
            focusMenuItem(nextElement);
            break;
          case "ArrowLeft":
          case "ArrowUp":
            event.preventDefault();
            const previousElement = findFocusableElement(target, "prev");
            focusMenuItem(previousElement);
            break;
          default:
            break;
        }
      }
    });
  },
};
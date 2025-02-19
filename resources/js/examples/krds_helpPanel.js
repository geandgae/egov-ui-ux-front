const krds_helpPanel = {
  helpPanel: null,
  lastFocusedButton: null,
  executeButton: null,
  collapseButton: null,
  init() {
    this.helpPanel = document.querySelector(".krds-help-panel");

    if (!this.helpPanel) return;

    this.executeButton = document.querySelectorAll(".btn-help-exec");
    this.collapseButton = this.helpPanel.querySelector(".btn-help-panel.fold");

    this.setupPadding();
    this.observeMastHead();
    this.setupHelpButtons();
    this.toggleScrollLock();
  },
  setupPadding() {
    const topBannerHeight = document.querySelector("#krds-masthead")?.offsetHeight;
    const headerHeight = document.querySelector("#krds-header .header-in")?.offsetHeight;
    const defaultPadding = topBannerHeight + headerHeight;
    const hiddenBannerPadding = headerHeight;

    const expandBox = document.querySelector(".help-panel-wrap");
    const expandButton = document.querySelector(".btn-help-panel.expand");

    const applyPadding = (padding) => {
      expandButton.style.marginTop = padding;
      if (windowSize.getWinSize() === "pc") {
        expandBox.style.paddingTop = padding;
        this.collapseButton.style.marginTop = padding;
      } else {
        expandBox.removeAttribute("style");
        this.collapseButton.removeAttribute("style");
      }
    };

    // bn-hidden: 헤더 배너 숨김, scroll-down: 헤더 숨김
    if (document.body.classList.contains("bn-hidden")) {
      if (document.querySelector("#wrap").classList.contains("scroll-down")) {
        applyPadding("0");
      } else {
        applyPadding(`${hiddenBannerPadding}px`);
      }
    } else {
      applyPadding(`${defaultPadding}px`);
    }
  },
  observeMastHead() {
    const topBanner = document.querySelector("#krds-masthead");
    if (!topBanner) return;
    const body = document.body;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          body.classList.toggle("bn-hidden", !entry.isIntersecting);
        });
      },
      { root: null, threshold: 0 }
    );
    observer.observe(topBanner);
  },
  setupHelpButtons() {
    this.executeButton.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.lastFocusedButton = btn;
        this.toggleHelpPanel("open", btn);
      });
      btn.setAttribute("aria-expanded", "false");
    });
    if (this.collapseButton) {
      this.collapseButton.addEventListener("click", () => {
        this.toggleHelpPanel("close");
      });
    }
  },
  toggleHelpPanel(action, triggerBtn) {
    const helpWrap = document.querySelector(".help-panel-wrap");
    const innerContainer = document.querySelector("#container > .inner");

    if (!helpWrap || !innerContainer || !this.helpPanel) return;

    if (action === "open") {
      if (windowSize.getWinSize() === "mob") {
        document.body.classList.add("scroll-no");
      }

      this.helpPanel.classList.add("expand");
      helpWrap.setAttribute("tabindex", "0");

      if (triggerBtn) {
        setTimeout(() => {
          helpWrap.focus();
        }, 50);
      }

      // 도움패널은 페이지에 한개만 있고 컨트롤하는 버튼은 여러개일때
      this.executeButton.forEach((btn) => {
        btn.setAttribute("aria-expanded", "true");
      });

      // inner가 flexible인 경우
      if (innerContainer.classList.contains("help-panel-flexible")) {
        innerContainer.classList.add("help-panel-expanded");
      }
    } else if (action === "close") {
      if (windowSize.getWinSize() === "mob") {
        document.body.classList.remove("scroll-no");
      }

      this.helpPanel.classList.remove("expand");
      helpWrap.removeAttribute("tabindex");

      if (this.lastFocusedButton) {
        this.lastFocusedButton.focus();
      } else {
        // 처음 부터 오픈일때 지정 버튼으로 포커스 이동
        document.querySelector(".btn-help-panel.expand").focus();
      }

      // 도움패널은 페이지에 한개만 있고 컨트롤하는 버튼은 여러개일때
      this.executeButton.forEach((btn) => {
        btn.setAttribute("aria-expanded", "false");
      });

      // inner가 flexible인 경우
      if (innerContainer.classList.contains("help-panel-flexible")) {
        innerContainer.classList.remove("help-panel-expanded");
      }
    }
  },
  toggleScrollLock() {
    setTimeout(() => {
      if (windowSize.getWinSize() === "mob" && this.helpPanel.classList.contains("expand")) {
        document.body.classList.add("scroll-no");
      } else {
        document.body.classList.remove("scroll-no");
      }
    }, 0);
  },
};
const krds_tab = {
  layerTabArea: null,
  init() {
    this.layerTabArea = document.querySelectorAll(".krds-tab-area.layer");

    if (!this.layerTabArea.length) return;

    this.setupTabs();
  },
  setupTabs() {
    this.layerTabArea.forEach((tabArea) => {
      const layerTabs = tabArea.querySelectorAll(".tab > ul > li");

      // 탭 설정
      layerTabs.forEach((tab) => {
        // 이미 이벤트가 연결된 탭을 건너뜀
        if (!tab.dataset.listenerAttached) {
          // 연결된 탭 패널 찾기
          const control = tab.getAttribute("aria-controls");
          const selectedTabPanel = document.getElementById(control);

          // aria 설정
          tab.setAttribute("aria-selected", "false");
          tab.setAttribute("role", "tab");
          selectedTabPanel.setAttribute("role", "tabpanel");

          // 초기 active 설정
          if (tab.classList.contains("active")) {
            if (!tab.querySelector("button .sr-only")) {
              tab.setAttribute("aria-selected", "true");
              tab.querySelector("button").append(this.createAccText()); // 초점이 버튼이라 aria-selected 대체 텍스트 필요
            }
          }

          // 클릭 이벤트
          tab.addEventListener("click", () => {
            const closestTabs = tab.closest(".krds-tab-area.layer > .tab").querySelectorAll("li");
            const closestTabPanels = tab.closest(".krds-tab-area.layer").querySelectorAll(":scope > .tab-conts-wrap > .tab-conts");

            this.resetTabs(closestTabs, closestTabPanels);

            tab.classList.add("active");
            tab.querySelector("button").append(this.createAccText());
            tab.setAttribute("aria-selected", "true");
            selectedTabPanel.classList.add("active");
          });

          // 키보드 이벤트
          this.setupKeyboardNavigation(tab);

          // 이벤트가 추가된 탭을 표시
          tab.dataset.listenerAttached = "true";
        }
      });
    });
  },
  createAccText() {
    const tabAccTag = document.createElement("i");
    tabAccTag.classList.add("sr-only");
    tabAccTag.textContent = "선택됨";
    return tabAccTag;
  },
  resetTabs(closestTabs, closestTabPanels) {
    closestTabs.forEach((tab) => {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
      // 대체 텍스트 삭제
      const srOnly = tab.querySelector(".sr-only");
      if (srOnly) tab.querySelector("button").removeChild(srOnly);
    });
    closestTabPanels.forEach((panel) => {
      panel.classList.remove("active");
    });
  },
  setupKeyboardNavigation(tab) {
    tab.addEventListener("keydown", function (event) {
      let newTab;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        newTab = tab.nextElementSibling?.querySelector("button");
      } else if (event.key === "ArrowLeft") {
        newTab = tab.previousElementSibling?.querySelector("button");
      }
      newTab?.focus();
    });
  },
};
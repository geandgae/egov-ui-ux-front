const krds_tooltip = {
  tooltip: null,
  isMobile: null,
  init() {
    this.tooltip = document.querySelectorAll(".krds-tooltip");
    this.isMobile = windowSize.getWinSize() === "mob";

    if (!this.tooltip.length) return;

    this.setupTooltips();
    this.setupGlobalEvents();
  },
  setupTooltips() {
    this.tooltip.forEach((item, index) => {
      //  tooltipText
      const tooltipText = item.getAttribute("data-tooltip");
      const disabled = item.hasAttribute("disabled");

      if (!tooltipText || disabled) return;

      // ID 부여
      const uniqueIdx = `tooltip-popover-${index}${Math.random().toString(36).substring(2, 9)}`;
      item.setAttribute("aria-labelledby", uniqueIdx);

      // TooltipPopover 생성
      const tooltipBtnText = item.innerText;
      const tooltipPopover = this.createTooltipPopover(uniqueIdx, tooltipBtnText, tooltipText);
      item.parentNode.insertBefore(tooltipPopover, item.nextSibling);

      // Show/Hide 함수 정의
      const showTooltip = () => this.showTooltip(item, tooltipPopover);

      // 이벤트 등록
      this.registerEvents(item, showTooltip);

      // ESC 닫기
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" || event.key === "Esc") {
          this.closeAllTooltips();
        }
      });
    });
  },
  createTooltipPopover(uniqueIdx, tooltipBtnText, tooltipText) {
    const tooltipPopover = document.createElement("div");
    tooltipPopover.classList.add("krds-tooltip-popover");
    tooltipPopover.setAttribute("id", uniqueIdx);
    tooltipPopover.setAttribute("aria-hidden", "true");
    tooltipPopover.innerHTML = "";
    tooltipPopover.innerHTML = `
      <span class="sr-only">${tooltipBtnText}</span>
      ${tooltipText}
    `;

    return tooltipPopover;
  },
  registerEvents(item, showTooltip) {
    item.addEventListener("mouseover", showTooltip);
    item.addEventListener("mouseout", this.closeAllTooltips);
    item.addEventListener("focus", showTooltip);
    item.addEventListener("focusout", this.closeAllTooltips);
  },
  showTooltip(item, tooltipPopover) {
    // tooltip-box
    if (item.classList.contains("tooltip-box")) {
      tooltipPopover.classList.add("tooltip-box");
    }
    // tooltip-vertical
    if (item.classList.contains("tooltip-vertical")) {
      tooltipPopover.classList.add("tooltip-vertical");
    }

    tooltipPopover.classList.add("active");

    const { top, left } = this.calculateTooltipPosition(item, tooltipPopover);
    const mobileSmall = window.innerWidth <= 420;
    tooltipPopover.style.top = `${top}px`;
    tooltipPopover.style.left = mobileSmall ? "50%" : `${left}px`;
  },
  closeAllTooltips() {
    const otherPopovers = document.querySelectorAll(".krds-tooltip-popover");
    otherPopovers.forEach((popover) => {
      if (!popover.classList.contains("active")) return;
      popover.style = "";
      popover.className = "krds-tooltip-popover";
    });
  },
  calculateTooltipPosition(item, tooltipPopover) {
    // 툴팁과 기준 요소 간격
    const tooltipGap = 12;
    const { clientHeight: tooltipHeight, clientWidth: tooltipWidth } = tooltipPopover;
    const { top: itemTop, left: itemLeft, right: itemRight, height: itemHeight, width: itemWidth } = item.getBoundingClientRect();
    const halfWindowWidth = window.innerWidth / 2;
    const halfWindowHeight = window.innerHeight / 2;

    let tooltipTop;
    let tooltipLeft;

    const isVertical = this.isMobile || item.classList.contains("tooltip-box") || item.classList.contains("tooltip-vertical");

    if (isVertical) {
      if (itemTop + itemHeight > halfWindowHeight) {
        tooltipTop = itemTop - tooltipHeight - tooltipGap; // 위쪽
        tooltipPopover.classList.add("top");
      } else {
        tooltipTop = itemTop + itemHeight + tooltipGap; // 아래쪽
        tooltipPopover.classList.add("bottom");
      }
      // 좌우 위치
      if (itemLeft + itemWidth > halfWindowWidth) {
        tooltipLeft = itemRight - tooltipWidth; // 오른쪽 정렬
        tooltipPopover.classList.add("right");
        // 화면 오른쪽 여유 공간이 충분할 때 가운데 정렬
        if (window.innerWidth - (itemLeft + itemWidth) > tooltipWidth / 2) {
          tooltipLeft = itemLeft + (itemWidth - tooltipWidth) / 2;
          tooltipPopover.classList.remove("right");
        }
      } else {
        // 화면 왼쪽 여유 공간이 충분할 때 가운데 정렬
        tooltipLeft = itemLeft + (itemWidth - tooltipWidth) / 2;
        // 왼쪽 공간 부족 시 보정
        if (tooltipLeft < 0) {
          tooltipLeft = itemLeft;
          tooltipPopover.classList.add("left");
        } else {
          tooltipPopover.classList.remove("left");
        }
      }
    } else {
      // 가로형 툴팁
      tooltipTop = itemTop + (itemHeight - tooltipHeight) / 2;
      if (itemLeft + itemWidth > halfWindowWidth) {
        tooltipLeft = itemLeft - tooltipWidth - tooltipGap; // 왼쪽
        tooltipPopover.classList.add("right");
      } else {
        tooltipLeft = itemRight + tooltipGap; // 오른쪽
        tooltipPopover.classList.remove("right");
      }
    }
    return { top: tooltipTop, left: tooltipLeft };
  },
  setupGlobalEvents() {
    window.addEventListener("scroll", () => {
      this.closeAllTooltips();
    });
    window.addEventListener("resize", () => {
      this.isMobile = windowSize.getWinSize() === "mob";
      this.closeAllTooltips();
    });
  },
};
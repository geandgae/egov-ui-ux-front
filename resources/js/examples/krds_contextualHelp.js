const krds_contextualHelp = {
  tooltipButtons: null,
  init() {
    this.tooltipButtons = document.querySelectorAll(".krds-contextual-help .tooltip-btn");

    if (!this.tooltipButtons.length) return;

    this.setupTooltips();
    this.setupFocusOutEvent();
  },
  setupTooltips() {
    this.tooltipButtons.forEach((button) => {
      const tooltipContainer = button.closest(".krds-contextual-help");
      const tooltipPopover = tooltipContainer.querySelector(".tooltip-popover");
      const closeButton = tooltipPopover.querySelector(".tooltip-close");

      button.setAttribute("aria-expanded", "false");
      tooltipPopover.setAttribute("role", "tooltip");

      // tooltipWrap에 포지션이 없을때 기본값 설정
      if (tooltipContainer && tooltipContainer.classList.length === 1) {
        tooltipContainer.classList.add("top", "left");
      }

      button.addEventListener("click", () => {
        this.toggleTooltip(button, tooltipPopover, tooltipContainer);
      });
      closeButton.addEventListener("click", () => {
        this.closeAllTooltips();
      });

      window.addEventListener("resize", () => {
        this.adjustTooltipPosition(tooltipContainer, tooltipPopover);
      });

      // ESC 닫기
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" || event.key === "Esc") {
          this.closeAllTooltips();
        }
      });
    });
  },
  toggleTooltip(button, tooltipPopover, tooltipContainer) {
    const isVisible = tooltipPopover.style.display === "block";

    this.closeAllTooltips();

    if (!isVisible) {
      tooltipPopover.style.display = "block";
      const focusables = tooltipPopover.querySelector(`a, button, [tabindex="0"], input, textarea, select`);
      focusables?.focus();
      button.setAttribute("aria-expanded", "true");

      this.adjustTooltipPosition(tooltipContainer, tooltipPopover);
    }
  },
  closeAllTooltips() {
    const otherPopovers = document.querySelectorAll(".krds-contextual-help .tooltip-popover");
    otherPopovers.forEach((popover) => {
      popover.style.display = "none";
    });
    this.tooltipButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  },
  adjustTooltipPosition(tooltipContainer, tooltipPopover) {
    // const isMobile = windowSize.getWinSize() === "mob";
    const isMobile = window.innerWidth <= 768;
    const tooltipAction = tooltipContainer.querySelector(".tooltip-action");

    if (isMobile) {
      const rootStyles = getComputedStyle(document.querySelector(":root"));
      const contentsPaddingX = rootStyles.getPropertyValue("--krds-contents-padding-x").trim().split("px")[0];
      const tooltipActionRect = tooltipAction.getBoundingClientRect();
      const offsetLeft = tooltipActionRect.left - contentsPaddingX;
      const width = document.body.clientWidth - (contentsPaddingX * 2);
      tooltipPopover.style.left = `-${offsetLeft}px`;
      tooltipPopover.style.width = `${width}px`;
    } else {
      tooltipPopover.style.left = "";
      tooltipPopover.style.right = "";
      tooltipPopover.style.width = "360px";
    }
  },
  setupFocusOutEvent() {
    document.addEventListener("click", (event) => {
      const clickedInsideTooltip = event.target.closest(".tooltip-action");
      if (!clickedInsideTooltip) {
        this.closeAllTooltips();
      } else {
        const FocusPopover = clickedInsideTooltip.querySelector(".tooltip-popover");
        FocusPopover.addEventListener("focusout", (event) => {
          if (FocusPopover.contains(event.relatedTarget)) {
            return;
          }
          this.closeAllTooltips();
          clickedInsideTooltip.querySelector(".tooltip-btn")?.focus();
        });
      }
    });
  },
};
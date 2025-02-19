const krds_modal = {
  modalOpenTriggers: null,
  modalCloseTriggers: null,
  outsideClickHandlers: {},
  init() {
    this.modalOpenTriggers = document.querySelectorAll(".open-modal");
    this.modalCloseTriggers = document.querySelectorAll(".close-modal");

    if (!this.modalOpenTriggers.length || !this.modalCloseTriggers.length) return;

    this.setupTriggers();
  },
  setupTriggers() {
    // 모달 열기 이벤트 설정
    this.modalOpenTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        const modalId = trigger.getAttribute("data-target");

        if (modalId) {
          // aria 설정
          trigger.setAttribute("data-modal-id", modalId);
          trigger.classList.add("modal-opened");
          trigger.setAttribute("tabindex", "-1");

          this.openModal(modalId);
        }
      });
    });
    // 모달 닫기 이벤트 설정
    this.modalCloseTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        const modalId = trigger.closest(".krds-modal").getAttribute("id");

        if (modalId) {
          this.closeModal(modalId);
        }
      });
    });
  },
  openModal(id) {
    const modalElement = document.getElementById(id);
    const dialogElement = modalElement.querySelector(".modal-content");
    const modalBack = modalElement.querySelector(".modal-back");
    // const modalTitle = modalElement.querySelector(".modal-title");
    const modalConts = modalElement.querySelector(".modal-conts");

    document.querySelector("body").classList.add("scroll-no");
    dialogElement.removeAttribute("tabindex");
    modalElement.setAttribute("role", "dialog");
    modalElement.classList.add("shown");
    modalBack.classList.add("in");
    // modalTitle.setAttribute("tabindex", "0");

    // modal-conts 스크롤 일때 tabindex 처리
    if (modalConts.scrollHeight > modalConts.clientHeight) {
      modalConts.setAttribute("tabindex", "0");
    } else {
      modalConts.removeAttribute("tabindex");
    }

    // css transition 딜레이
    setTimeout(() => {
      modalElement.classList.add("in");
    }, 150);
    
    //열린 팝업창 포커스
    const focusables = modalElement.querySelectorAll(`a, button, [tabindex="0"], input, textarea, select`);
    setTimeout(() => {
      // modalTitle.focus();
      focusables[0].focus();
    }, 350);

    // ESC 모달 닫기
    dialogElement.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape" || event.key === "Esc") {
          this.closeModal(dialogElement.closest(".krds-modal").id);
        }
      },
      { once: true }
    );

    // 모달 외부 클릭 처리 핸들러 정의 및 저장
    if (!this.outsideClickHandlers[id]) {
      this.outsideClickHandlers[id] = (event) => {
        if (!event.target.closest(".modal-content")) {
          // modalTitle.focus();
          focusables[0].focus();

          // dialogElement.focus();
          // this.closeModal(id);
        }
      };
    }
    // 이벤트 리스너 제거 후 다시 등록
    modalElement.removeEventListener("click", this.outsideClickHandlers[id]);
    modalElement.addEventListener("click", this.outsideClickHandlers[id]);

    // 포커스 트랩 설정
    common.focusTrap(dialogElement);

    // 2개 이상의 모달이 열려 있는 경우 z-index 업데이트
    this.updateZIndex(modalElement);

    // inert 설정
    document.getElementById("wrap")?.setAttribute("inert", "");
  },
  closeModal(id) {
    const modalElement = document.getElementById(id);
    const openModals = document.querySelectorAll(".modal.in:not(.sample)");
    const modalBack = modalElement.querySelector(".modal-back");

    modalElement.classList.remove("in");
    modalBack.classList.remove("in");

    // css transition 딜레이
    setTimeout(() => {
      modalElement.classList.remove("shown");
    }, 350);

    // 마지막 모달이 닫힐 때 페이지 스크롤 복원
    if (openModals.length < 2) {
      document.querySelector("body").classList.remove("scroll-no");
    }
    
    // inert 설정
    document.getElementById("wrap")?.removeAttribute("inert");

    // 모달을 열었던 버튼으로 포커스 복귀
    this.returnFocusToTrigger(id);
  },
  updateZIndex(modalElement) {
    const openModals = document.querySelectorAll(".modal.in:not(.sample)");
    const openModalsLengtn = openModals.length + 1;
    const newZIndex = 1010 + openModalsLengtn;
    if (openModalsLengtn > 1) {
      modalElement.style.zIndex = newZIndex;
      modalElement.querySelector(".modal-back").classList.remove("in");
    }
  },
  returnFocusToTrigger(id) {
    const triggerButton = document.querySelector(`.modal-opened[data-modal-id="${id}"]`);
    if (triggerButton) {
      triggerButton.focus();
      triggerButton.setAttribute("tabindex", "0");
      triggerButton.classList.remove("modal-opened");
      triggerButton.removeAttribute("data-modal-id");
    }
  },
};
const krds_disclosure = {
  disclosures: null,
  init() {
    this.disclosures = document.querySelectorAll(".krds-disclosure");

    if (!this.disclosures.length) return;

    this.setupDisclosure();
  },
  setupDisclosure() {
    this.disclosures.forEach((disclosure) => {
      const disclosureButton = disclosure.querySelector(".btn-conts-expand");
      const disclosureContent = disclosure.querySelector(".expand-wrap");
      const uniqueIdx = `disclosure-${Math.random().toString(36).substring(2, 9)}`;

      // 예외 처리: disclosureButton 없이 active 상태를 직접 설정하여 확장 상태를 제어하는 경우
      if (!disclosureButton) return;

      // aria 속성 설정
      disclosureButton.setAttribute("aria-expanded", "false");
      disclosureButton.setAttribute("aria-controls", uniqueIdx);
      disclosureContent.setAttribute("id", uniqueIdx);
      // disclosureContent.setAttribute("aria-hidden", "true"); // 임시: disclosure 내용이 일부만 노출되는 경우
      disclosureContent.setAttribute("inert", "");
      if (disclosure.classList.contains("active")) {
        disclosureButton.setAttribute("aria-expanded", "true");
        // disclosureContent.setAttribute("aria-hidden", "false"); // 임시: disclosure 내용이 일부만 노출되는 경우
        disclosureContent.removeAttribute("inert");
      }

      disclosureButton.addEventListener("click", () => {
        this.toggleDisclosure(disclosure, disclosureButton, disclosureContent);
      });
    });
  },
  toggleDisclosure(disclosure, disclosureButton, disclosureContent) {
    const isExpanded = disclosureButton.getAttribute("aria-expanded") === "true";

    disclosure.classList.toggle("active", !isExpanded);
    disclosureButton.setAttribute("aria-expanded", !isExpanded);

    // disclosureContent.setAttribute("aria-hidden", isExpanded); // 임시: disclosure 내용이 일부만 노출되는 경우
    if (isExpanded) {
      disclosureContent.setAttribute("inert", "");
    } else {
      disclosureContent.removeAttribute("inert");
    }
  },
};
"use strict";

// s : function
(function () {
  // global
  const pathParts = window.location.pathname.split("/");
  const currentDir = pathParts.slice(-2, -1)[0];
  let currentPage = pathParts.slice(-1)[0].replace(".html", "");
  const basePath = currentDir === "site" ? "./" : "../";

  const menuData = [
    // 시작하기
    {
      category: "시작하기",
      dir: "outline",
      type: "main-link",
      // type: "main-toggle",
      // type: "main-toggle-lv2",
      sub: [
        { name: "KRDS 시작하기", file: "outline_01", type: "link" },
        { name: "디자이너", file: "outline_02", type: "link" },
        { name: "개발자", file: "outline_03", type: "link" },
        { name: "정부관계자", file: "outline_04", type: "link" },
        { name: "리소스 다운로드", file: "outline_05", type: "link" },
      ],
    },
    // 디자인 스타일
    {
      category: "디자인 스타일",
      dir: "style",
      type: "main-link",
      // type: "main-toggle",
      sub: [
        { name: "디자인 스타일 소개", file: "style_01", type: "link" },
        { name: "색상", label: "Color", file: "style_02", type: "link" },
        { name: "타이포그래피", label: "Typography", file: "style_03", type: "link" },
        { name: "형태", label: "Shape", file: "style_04", type: "link" },
        { name: "레이아웃", label: "Layout", file: "style_05", type: "link" },
        { name: "아이콘", label: "Icon", file: "style_06", type: "link" },
        { name: "엘리베이션", label: "Elevation", file: "style_08", type: "link" },
        { name: "선명한 화면 모드", label: "High contrast mode", file: "style_09", type: "link" },
        { name: "디자인 토큰", label: "Design token", file: "style_07", type: "link" },
      ],
    },
    // 컴포넌트
    {
      category: "컴포넌트",
      dir: "component",
      type: "main-link",
      // type: "main-toggle",
      // type: "main-toggle-lv2",
      // class: "exception-case",
      sub: [
        { name: "컴포넌트 소개", file: "component_summary", type: "link" },
        {
          name: "아이덴티티",
          file: "component_02_01",
          type: "toggle",
          sub: [
            { name: "공식 배너", label: "Masthead", file: "component_02_01", type: "link" },
            { name: "운영기관 식별자", label: "Identifier", file: "component_02_02", type: "link" },
            { name: "헤더", label: "Header", file: "component_02_03", type: "link" },
            { name: "푸터", label: "Footer", file: "component_02_04", type: "link" },
          ],
        },
        {
          name: "탐색",
          file: "component_03_01",
          type: "toggle",
          sub: [
            { name: "건너뛰기 링크", label: "Skip link", file: "component_03_01", type: "link" },
            { name: "메인 메뉴", label: "Main menu", file: "component_03_02", type: "link" },
            { name: "브레드크럼", label: "Breadcrumb", file: "component_03_03", type: "link" },
            { name: "사이드 메뉴", label: "Side navigation", file: "component_03_04", type: "link" },
            { name: "콘텐츠 내 탐색", label: "In-page navigation", file: "component_03_05", type: "link" },
            { name: "페이지네이션", label: "Pagination", file: "component_03_06", type: "link" },
            { name: "탭바", label: "Tab bars", file: "component_03_07", type: "link" },
          ],
        },
        {
          name: "레이아웃 및 표현",
          file: "component_04_01",
          type: "toggle",
          sub: [
            { name: "구조화 목록", label: "Structured list", file: "component_04_01", type: "link" },
            { name: "긴급 공지", label: "Critical alerts", file: "component_04_02", type: "link" },
            { name: "달력", label: "Calendar", file: "component_04_03", type: "link" },
            { name: "디스클로저", label: "Disclosure", file: "component_04_04", type: "link" },
            { name: "모달", label: "Modal", file: "component_04_05", type: "link" },
            { name: "배지", label: "Badge", file: "component_04_06", type: "link" },
            { name: "아코디언", label: "Accordion", file: "component_04_07", type: "link" },
            { name: "이미지", label: "Image", file: "component_04_08", type: "link" },
            { name: "캐러셀", label: "Carousel", file: "component_04_09", type: "link" },
            { name: "탭", label: "Tab", file: "component_04_10", type: "link" },
            { name: "표", label: "Table", file: "component_04_11", type: "link" },
            { name: "스플래시 스크린", label: "Splash screen", file: "component_04_12", type: "link" },
            { name: "텍스트 목록", label: "Text list", file: "component_04_13", type: "link" },
          ],
        },
        {
          name: "액션",
          file: "component_05_01",
          type: "toggle",
          sub: [
            { name: "링크", label: "Link", file: "component_05_01", type: "link" },
            { name: "버튼", label: "Button", file: "component_05_02", type: "link" },
          ],
        },
        {
          name: "선택",
          file: "component_06_01",
          type: "toggle",
          sub: [
            { name: "라디오 버튼", label: "Radio button", file: "component_06_01", type: "link" },
            { name: "체크박스", label: "Checkbox", file: "component_06_02", type: "link" },
            { name: "셀렉트", label: "Select", file: "component_06_03", type: "link" },
            { name: "태그", label: "Tag", file: "component_06_04", type: "link" },
            { name: "토글 스위치", label: "Toggle switch", file: "component_06_07", type: "link" },
          ],
        },
        {
          name: "피드백",
          file: "component_07_01",
          type: "toggle",
          sub: [
            { name: "단계 표시기", label: "Step indicator", file: "component_07_01", type: "link" },
            { name: "스피너", label: "Spinner", file: "component_07_02", type: "link" },
          ],
        },
        {
          name: "도움",
          file: "component_08_01",
          type: "toggle",
          sub: [
            { name: "도움 패널", label: "Help panel", file: "component_08_01", type: "link" },
            { name: "따라하기 패널", label: "Tutorial panel", file: "component_08_02", type: "link" },
            { name: "맥락적 도움말", label: "Contextual help", file: "component_08_03", type: "link" },
            { name: "코치마크", label: "Coach mark", file: "component_08_04", type: "link" },
            { name: "툴팁", label: "Tooltip", file: "component_08_05", type: "link" },
          ],
        },
        {
          name: "입력",
          file: "component_09_01",
          type: "toggle",
          sub: [
            { name: "날짜 입력 필드", label: "Date input", file: "component_09_01", type: "link" },
            { name: "텍스트 영역", label: "Textarea", file: "component_09_02", type: "link" },
            { name: "텍스트 입력 필드", label: "Text input", file: "component_09_03", type: "link" },
            { name: "파일 업로드", label: "File upload", file: "component_09_04", type: "link" },
          ],
        },
        {
          name: "설정",
          file: "component_10_01",
          type: "toggle",
          sub: [
            { name: "언어 변경", label: "Language switcher", file: "component_10_01", type: "link" },
            { name: "화면 크기 조정", label: "Resize", file: "component_10_02", type: "link" },
          ],
        },
        {
          name: "콘텐츠",
          file: "component_11_01",
          type: "toggle",
          sub: [
            { name: "접근 가능한 미디어", label: "Accessible multimedia", file: "component_11_01", type: "link" },
            { name: "숨긴 콘텐츠", label: "Visually hidden", file: "component_11_02", type: "link" },
          ],
        },
      ],
    },
    // 기본 패턴
    {
      category: "기본 패턴",
      dir: "global",
      type: "main-link",
      // type: "main-toggle",
      sub: [
        { name: "기본 패턴 소개", file: "global_summary", type: "link" },
        { name: "개인 식별 정보 입력", file: "global_01", type: "link" },
        { name: "도움", file: "global_02", type: "link" },
        { name: "동의", file: "global_03", type: "link" },
        { name: "목록 탐색", file: "global_04", type: "link" },
        { name: "사용자 피드백", file: "global_05", type: "link" },
        { name: "상세 정보 확인", file: "global_06", type: "link" },
        { name: "오류", file: "global_07", type: "link" },
        { name: "입력폼", file: "global_08", type: "link" },
        { name: "첨부파일", file: "global_09", type: "link" },
        { name: "필터링·정렬", file: "global_10", type: "link" },
        { name: "확인", file: "global_11", type: "link" },
      ],
    },
    // 서비스 패턴
    {
      category: "서비스 패턴",
      dir: "service",
      type: "main-link",
      // type: "main-toggle",
      // type: "main-toggle-lv2",
      // class: "exception-case",
      sub: [
        { name: "서비스 패턴 소개", file: "service_summary", type: "link" },
        {
          name: "방문",
          file: "service_01_01",
          type: "toggle",
          sub: [
            { name: "개요", file: "service_01_01", type: "link" },
            { name: "방문", file: "service_01_02", type: "link" },
          ],
        },
        {
          name: "검색",
          file: "service_02_01",
          type: "toggle",
          sub: [
            { name: "개요", file: "service_02_01", type: "link" },
            { name: "검색 기능 찾기", file: "service_02_02", type: "link" },
            { name: "검색어 입력", file: "service_02_03", type: "link" },
            { name: "검색 결과 확인", file: "service_02_04", type: "link" },
            { name: "상세 검색", file: "service_02_05", type: "link" },
            { name: "검색 결과 이용", file: "service_02_06", type: "link" },
            { name: "재검색", file: "service_02_07", type: "link" },
            { name: "검색 종료", file: "service_02_08", type: "link" },
          ],
        },
        {
          name: "로그인",
          file: "service_03_01",
          type: "toggle",
          sub: [
            { name: "개요", file: "service_03_01", type: "link" },
            { name: "로그인 기능 찾기", file: "service_03_02", type: "link" },
            { name: "로그인 안내", file: "service_03_03", type: "link" },
            { name: "로그인 방식 확인/선택", file: "service_03_04", type: "link" },
            { name: "로그인 정보 입력", file: "service_03_05", type: "link" },
            { name: "로그인 완료", file: "service_03_06", type: "link" },
            { name: "서비스 이용", file: "service_03_07", type: "link" },
            { name: "로그아웃", file: "service_03_08", type: "link" },
          ],
        },
        {
          name: "신청",
          file: "service_04_01",
          type: "toggle",
          sub: [
            { name: "개요", file: "service_04_01", type: "link" },
            { name: "신청 대상 탐색", file: "service_04_02", type: "link" },
            { name: "서비스 정보 확인", file: "service_04_03", type: "link" },
            { name: "유의 사항/자격 확인", file: "service_04_04", type: "link" },
            { name: "신청서 작성", file: "service_04_05", type: "link" },
            { name: "확인/확정", file: "service_04_06", type: "link" },
            { name: "완료", file: "service_04_07", type: "link" },
            { name: "신청 결과 확인", file: "service_04_08", type: "link" },
          ],
        },
        {
          name: "정책 정보 확인",
          file: "service_05_01",
          type: "toggle",
          sub: [
            { name: "개요", file: "service_05_01", type: "link" },
            { name: "정책 탐색", file: "service_05_02", type: "link" },
            { name: "정보 확인", file: "service_05_03", type: "link" },
            { name: "정책 자료 탐색", file: "service_05_04", type: "link" },
          ],
        },
      ],
    },
    // 소식/소통
    {
      category: "소식&middot;소통",
      dir: "community",
      type: "main-toggle",
      sub: [
        { name: "새소식", file: "community_01", type: "link" },
        { name: "자주 하는 질문", file: "community_02", type: "link" },
        { name: "적용사례", file: "community_03", type: "link" },
        { name: "자료실", file: "community_04", type: "link" },
        // { name: "문의하기", file: "community_05", type: "link" }, 삭제됨
        { name: "문의 및 건의", file: "community_06", type: "link" },
      ],
    },
    // KRDS 소개
    {
      category: "KRDS 소개",
      dir: "utility",
      type: "main-link",
      sub: [
        { name: "KRDS 소개", file: "utility_01", type: "link" },
        { name: "UI/UX 가이드라인 소개", file: "utility_07", type: "link" },
        { name: "디자인 원칙", file: "utility_02", type: "link" },
        { name: "네이밍 원칙", file: "utility_03", type: "link" },
        { name: "디지털 포용", file: "utility_04", type: "link" },
        { name: "이용안내", file: "utility_05", type: "link" },
        { name: "저작권", file: "utility_06", type: "link" },
      ],
    },
  ];

  // getMenuItem
  const getMenuItem = (dir, file) => {
    for (const menu of menuData) {
      if (menu.dir === dir) {
        for (const item of menu.sub) {
          if (item.file === file && !item.sub) {
            return { depth1: menu.category, depth2: item.name, suffix: "" };
          } else if (item.sub) {
            for (const subitem of item.sub) {
              if (subitem.file === file) {
                return { depth1: menu.category, depth2: subitem.name, suffix: item.name };
              }
            }
          }
        }
      }
    }
    return { depth1: "", depth2: "", suffix: "" };
  };
  let { depth1, depth2, suffix } = getMenuItem(currentDir, currentPage);

  // updateTitle
  const updateTitle = () => {
    if (!depth1 && !depth2 && !suffix) {
      // 수동적용
      // document.title = "KRDS";
    } else {
      if (depth1 === "소식&middot;소통") { 
        depth1 = "소식·소통";
      }
      document.title = `${depth2} | ${suffix ? `${suffix} - ` : ""}${depth1} - KRDS`;
    }
  };

  // initGnb
  const initGnb = (data) => {
    const menu = document.querySelector(".krds-main-menu:not(.sample) .gnb-menu");
    if (!menu) return;

    // index 링크 설정
    const logoLink = document.querySelector(".g-wrap #krds-header .logo a");
    logoLink.setAttribute("href", `${basePath}index.html`);

    let list = [];

    const createMenu = (data) => {
      if (data.type === "main-link") {
        return `<li><a href="${basePath}${data.dir}/${data.sub[0].file}.html" class="gnb-main-trigger is-link" data-trigger="gnb" data-dir="${data.dir}">${data.category}</a></li>`;
      } else if (data.type === "main-toggle") {
        return `
        <li class="gnb-dropdown">
          <button type="button" class="gnb-main-trigger is-dropdown" data-trigger="gnb" data-dir="${data.dir}">${data.category}</button>
          <div class="gnb-toggle-wrap">
            <ul>
              ${data.sub.map((subData) => createSubMenu(subData, data.dir)).join("")}
            </ul>
          </div>
        </li>
        `;
      } else if (data.type === "main-toggle-lv2") {
        return `
        <li>
          <button type="button" class="gnb-main-trigger" data-trigger="gnb" data-dir="${data.dir}">${data.category}</button>
          <div class="gnb-toggle-wrap">
            <div class="gnb-main-list" data-has-submenu="true">
              <ul>
                ${data.sub.map((subData) => createSubMenuLv2(subData, data.dir)).join("")}
              </ul>
            </div>
          </div>
        </li>
        `;
      } else if (data.type === "main-hide") {
        return "";
      }
    };
    const createSubMenu = (subData, dir) => {
      return `<li><a href="${basePath}${dir}/${subData.file}.html">${subData.name}</a></li>`;
    };
    const createSubMenuLv2 = (subData, dir) => {
      if (subData.type === "link") {
        return `
        <li>
          <a href="${basePath}${dir}/${subData.file}.html" class="gnb-sub-trigger" data-trigger="gnb">
            ${subData.name}
            <i class="svg-icon ico-angle right"></i>
          </a>
        </li>
        `;
      } else if (subData.type === "toggle") {
        return `
        <li>
          <button type="button" class="gnb-sub-trigger" data-trigger="gnb">${subData.name}</button>
          <div class="gnb-sub-list">
            <div class="gnb-sub-content">
              <h2 class="sub-title"><span>${subData.name}</span></h2>
              <ul>
                ${subData.sub.map((subDatalv3) => createSubMenuLv3(subDatalv3, dir)).join("")}
              </ul>
            </div>
          </div>
        </li>
        `;
      }
    };
    const createSubMenuLv3 = (subDatalv3, dir) => {
      if (subDatalv3.type === "link") {
        return `<li><a href="${basePath}${dir}/${subDatalv3.file}.html">${subDatalv3.name}</a></li>`;
      }
    };

    data.forEach((item) => list.push(createMenu(item)));
    menu.innerHTML = list.join("");
  };
  // initGnbMobile
  const initGnbMobile = (data) => {
    const gnb = document.querySelector(".krds-main-menu-mobile:not(.sample) .gnb-menu");
    if (!gnb) return;

    const mainMenu = gnb.querySelector(".menu-wrap > ul");
    const subMenu = gnb.querySelector(".submenu-wrap");

    let list = [];
    let listsub = [];

    const createMenu = (data) => {
      return `<li><a href="#mGnb-${data.dir}" class="gnb-main-trigger" data-dir="${data.dir}">${data.category}</a></li>`;
    };
    const createSubMenu = (data) => {
      return ` 
      <div class="gnb-sub-list" id="mGnb-${data.dir}">
        <h2 class="sub-title">${data.category}</h2>
        <ul>
          ${data.sub.map((subData) => createSubMenuLv2(subData, data.dir)).join("")}
        </ul>
      </div>
      `;
    };
    const createSubMenuLv2 = (subData, dir) => {
      if (subData.type === "link") {
        return `<li><a href="${basePath}${dir}/${subData.file}.html" class="gnb-sub-trigger">${subData.name}</a></li>`;
      } else if (subData.type === "toggle") {
        // <a href="${basePath}${dir}/${subData.file}.html" class="gnb-sub-trigger has-depth3">${subData.name}</a>
        return `
        <li>
          <a href="#;" class="gnb-sub-trigger has-depth3">${subData.name}</a>
          <div class="depth3-wrap">
            <ul>
              ${subData.sub.map((subDatalv3) => createSubMenuLv3(subDatalv3, dir)).join("")}
            </ul>
          </div>
        </li>
        `;
      }
    };
    const createSubMenuLv3 = (subDatalv3, dir) => {
      if (subDatalv3.type === "link") {
        return `<li><a href="${basePath}${dir}/${subDatalv3.file}.html" class="depth3-trigger">${subDatalv3.name}</a></li>`;
      }
    };

    data.forEach((item) => list.push(createMenu(item)));
    data.forEach((item) => listsub.push(createSubMenu(item)));
    mainMenu.innerHTML = list.join("");
    subMenu.innerHTML = listsub.join("");
  };

  // initLnb
  const initLnb = (data) => {
    const menuWrap = document.querySelector(".krds-side-navigation:not(.sample)");
    if (!menuWrap) return;

    const title = menuWrap.querySelector(".lnb-tit");
    const menu = menuWrap.querySelector(".lnb-list");
    let list = [];

    const filterByCategory = (data, category) => {
      const categoryItem = data.find((item) => item.dir === category);
      if (categoryItem && categoryItem.sub) {
        title.innerHTML = categoryItem.category;
        if (categoryItem.class) menu.classList.add(categoryItem.class);
        return categoryItem.sub;
      }
      return [];
    };
    const menuData = filterByCategory(data, currentDir);
    const createMenu = (menuData) => {
      if (menuData.type === "link") {
        return `
          <li class="lnb-item">
            <a 
              href="./${menuData.file}.html" 
              class="lnb-btn lnb-link" 
              data-main-title="${menuData.name}" 
              data-sub-title="${menuData.label ? menuData.label : ""}"
            >
              ${menuData.name}
            </a>
          </li>
        `;
      } else if (menuData.type === "toggle") {
        return `
          <li class="lnb-item">
            <button type="button" class="lnb-btn lnb-toggle">${menuData.name}</button>
            <div class="lnb-submenu">
              <ul>
                ${menuData.sub.map(createSubMenu).join("")}
              </ul>
            </div>
          </li>
        `;
      }
    };
    const createSubMenu = (menuData) => {
      if (menuData.type === "link") {
        return `
          <li class="lnb-subitem">
            <a 
              href="./${menuData.file}.html" 
              class="lnb-btn lnb-link" 
              data-main-title="${menuData.name}" 
              data-sub-title="${menuData.label ? menuData.label : ""}"
            >
              ${menuData.name} ${menuData.label ? "(" + menuData.label + ")" : ""}
            </a>
          </li>
        `;
      } else if (menuData.type === "toggle") {
        // 3depth 메뉴 현재는 사용 안 함
        return `
          <li class="lnb-subitem">
            <button type="button" class="lnb-btn lnb-toggle-popup">${menuData.name}</button>
            <div class="lnb-submenu-lv2">
              <button type="button" class="lnb-btn-tit">${menuData.name}</button>
              <ul>
                ${menuData.sub.map(createSubMenuLv2).join("")}
              </ul>
            </div>
          </li>
        `;
      }
    };
    const createSubMenuLv2 = (menuData) => {
      return `<li><a href="./${menuData.file}.html" class="lnb-btn">${menuData.name}</a></li>`;
    };

    menuData.forEach((item) => list.push(createMenu(item)));
    menu.innerHTML = list.join("");
  };
  // exceptionLnb
  const exceptionLnb = () => {
    const exceptionCase = document.querySelector(".lnb-list.exception-case");
    if (!exceptionCase) return;
    const lnbToggles = exceptionCase.querySelectorAll(".lnb-btn.lnb-toggle");
    lnbToggles.forEach((item) => {
      item.closest(".lnb-item").classList.add("active");
      setTimeout(() => {
        item.setAttribute("aria-expanded", "true");
      }, 0);

      item.addEventListener("click", () => {
        const isExpanded = item.getAttribute("aria-expanded") === "true";
        item.closest(".lnb-item").classList.toggle("active", !isExpanded);
        item.setAttribute("aria-expanded", !isExpanded);
      });
    });
  };

  // activePage
  const activePage = () => {
    const lnbLinks = document.querySelectorAll(".krds-side-navigation:not(.sample) .lnb-link");
    lnbLinks.forEach((link) => {
      const linkPage = link.getAttribute("href").split("/").slice(-1)[0].replace(".html", "");

      // 문의하기 에외 처리
      if (currentPage === "community_06_01") currentPage = "community_06";

      if (linkPage === currentPage) {
        const exceptionCase = link.closest(".lnb-list.exception-case");
        if (!exceptionCase) {
          link.closest(".lnb-item").classList.add("active");
          setTimeout(() => {
            link.closest(".lnb-item").querySelector(".lnb-btn.lnb-toggle")?.setAttribute("aria-expanded", "true");
          }, 300);
        }
        link.classList.add("active");
        link.classList.add("selected");
        link.setAttribute("aria-current", "page");
        // link.innerHTML += `<span class="sr-only">현재 페이지</span>`;
      }
    });

    // gnb pc
    const gnbMainPC = document.querySelectorAll(".krds-main-menu:not(.sample) .gnb-main-trigger");
    gnbMainPC.forEach((item) => {
      const dataDir = item.getAttribute("data-dir");
      if (dataDir === currentDir) {
        item.classList.add("selected");
        item.setAttribute("aria-current", "page");
        // item.innerHTML += `<span class="sr-only">현재 페이지</span>`;
      }
    });

    // gnb mobile
    const gnbMainMobile = document.querySelectorAll(".krds-main-menu-mobile:not(.sample) .gnb-main-trigger");
    gnbMainMobile.forEach((item) => {
      const dataDir = item.getAttribute("data-dir");
      if (dataDir === currentDir) {
        item.classList.add("active");
        item.setAttribute("aria-current", "page");
        // item.innerHTML += `<span class="sr-only">현재 페이지</span>`;
        setTimeout(() => {
          const targetElement = document.querySelector(item.getAttribute("href"));
          if (targetElement) {
            targetElement.scrollIntoView();
          }
        }, 500);
      }
    });
    const gnbSubMobile = document.querySelectorAll(".krds-main-menu-mobile:not(.sample) .gnb-sub-trigger, .krds-main-menu-mobile:not(.sample) .depth3-trigger");
    gnbSubMobile.forEach((item) => {
      const linkPage = item.getAttribute("href").split("/").slice(-1)[0].replace(".html", "");
      if (linkPage === currentPage) {
        item.classList.add("selected");
        item.setAttribute("aria-current", "page");
        // item.innerHTML += `<span class="sr-only">현재 페이지</span>`;
        if (item.closest(".depth3-wrap")) {
          item.closest(".depth3-wrap").closest("li").querySelector(".has-depth3")?.classList.add("active");
        }
      }
    });
  };

  // siteGnb 사이트 전용 속성
  const siteGnb = () => {
    const gnbDropDown = document.querySelector(".krds-main-menu:not(.sample) .gnb-dropdown");

    if (!gnbDropDown) return;

    const dropDonwLink = gnbDropDown.querySelectorAll(".gnb-toggle-wrap a");
    dropDonwLink.forEach((link) => {
      const linkPage = link.getAttribute("href").split("/").slice(-1)[0].replace(".html", "");
      if (linkPage === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
        link.innerHTML += `<span class="sr-only">현재 페이지</span>`;
      }
    });
  };

  // siteGnbMobileSearch
  const siteGnbMobileSearch = () => {
    const searchLayer = document.querySelector(".search-layer");

    if (!searchLayer) return;

    const searchInput = document.getElementById("mobileMenuSearchInput");
    const searchButton = document.getElementById("mobileMenuSearchButton");
    const searchClose = searchLayer.querySelector(".search-close");
    const searchResultsLayer = searchLayer.querySelector(".search-body");
    const dummyControl = document.querySelector(".dummy-control");
    const menuItems = document.querySelectorAll(".submenu-wrap a:not(.has-depth3)");
    const gnbWrapInner = document.querySelector(".gnb-wrap-inner");

    // Dummy 초기화
    const initDummy = () => {
      dummyControl.setAttribute("aria-haspopup", "true");
      dummyControl.setAttribute("aria-expanded", "false");
      dummyControl.setAttribute("aria-label", "메뉴 검색");
    };

    // 검색 레이어 열기
    const openSearchLayer = () => {
      searchLayer.classList.add("active");
      searchLayer.querySelector(`a, button, [tabindex="0"], input, textarea, select`).focus();
      searchLayer.setAttribute("tabindex", "-1");
      dummyControl.setAttribute("aria-expanded", "true");
      gnbWrapInner.setAttribute("inert", "");
      common.focusTrap(searchLayer);
    };

    // 검색 레이어 닫기
    const closeSearchLayer = () => {
      searchLayer.classList.remove("active");
      dummyControl.setAttribute("aria-expanded", "false");
      gnbWrapInner.removeAttribute("inert");
      dummyControl.focus();

      reset();
    };

    // 검색어 강조
    const highlightText = (text, keyword) => {
      const regex = new RegExp(keyword, "gi");
      return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
    };

    // 검색 결과 생성
    const createSearchResultItem = (item, searchValue) => {
      const results = [];
      const mainLink = item.closest(".gnb-sub-list")?.querySelector("a")?.href || "";

      // 1뎁스
      const depth1 = item.closest(".gnb-sub-list")?.querySelector(".sub-title")?.textContent || "";
      if (depth1) results.push(`<a href="${mainLink}">${depth1}</a>`);

      // 2뎁스
      if (item.classList.contains("depth3-trigger")) {
        const depth2 = item.closest("ul").closest("li")?.querySelector(".has-depth3")?.textContent || "";
        if (depth2) results.push(`<span>${depth2}</span>`);
      }

      // 현재 텍스트
      results.push(`<a href="${item.href}">${highlightText(item.textContent, searchValue)}</a>`);

      // 결과 텍스트 연결
      const resultText = results.join("<span>></span>");

      // 리스트 아이템 생성
      const listItem = document.createElement("li");
      listItem.classList.add("result-item");
      listItem.innerHTML = resultText;

      return listItem;
    };

    // 검색 실행
    const performSearch = () => {
      const searchValue = searchInput.value.trim().toLowerCase();
      const resultList = document.createElement("ul");
      resultList.classList.add("result-list");

      searchResultsLayer.innerHTML = "";

      if (!searchValue) {
        searchResultsLayer.innerHTML = `<div class="no-results">검색어를 입력하세요.</div>`;
        return;
      }

      let hasResults = false;

      menuItems.forEach((item) => {
        const itemText = item.textContent.trim().toLowerCase();
        if (itemText.includes(searchValue)) {
          hasResults = true;
          resultList.appendChild(createSearchResultItem(item, searchValue));
        }
      });

      if (hasResults) {
        searchResultsLayer.appendChild(resultList);
      } else {
        searchResultsLayer.innerHTML = `<div class="no-results"><strong>'${searchValue}'</strong> 에 대한 검색 결과가 없습니다.</div>`;
      }
    };

    // 검색 리셋
    const reset = () => {
      searchInput.value = "";
      searchResultsLayer.innerHTML = "";
    };

    // 이벤트 핸들러 등록
    const bindEvents = () => {
      dummyControl.addEventListener("click", openSearchLayer);
      searchClose.addEventListener("click", closeSearchLayer);
      searchButton.addEventListener("click", performSearch);
      searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          performSearch();
        }
      });
      // 외부 클릭시 초점 복귀
      document.addEventListener("click", ({ target }) => {
        if (!target.closest(".search-layer")) {
          searchLayer.focus();
        }
      });
    };

    initDummy();
    bindEvents();
  };

  // data-src-status=loaded
  const codeLanguageScroll = () => {
    setTimeout(() => {
      const codeLanguages = document.querySelectorAll("[data-src-status=loaded]");
      codeLanguages.forEach((item) => {
        if (item) {
          // console.log(item.scrollHeight > item.clientHeight);
          if (item.scrollHeight > item.clientHeight) {
            item.setAttribute('tabindex', '0');
          } else {
            item.removeAttribute('tabindex');
          }
        }
      });
    }, 500);
  }

  // quickNavTab
  const quickNavTab = () => {
    const quickType = document.querySelector(".krds-in-page-navigation-type");

    if (!quickType) return;

    const quickList = quickType.querySelector(".krds-in-page-navigation-area .in-page-navigation-list ul");
    const quickTabs = quickType.querySelectorAll(".krds-tab-area .has-anchor.tab:not(.sample) > ul > li");
    const quickTitle = quickType.querySelector(".in-page-navigation-header > .quick-title");

    // 메뉴 생성 함수
    const generateMenu = (id) => {
      let sectionLinks;
      if (id) {
        const hasTab = document.querySelector(`#${id}`).getAttribute("data-quick-nav");
        if (hasTab === "true") {
          sectionLinks = document.querySelectorAll(`#${id} .scroll-check .section-link`);
          quickType.querySelector(".krds-in-page-navigation-area").style.display = "flex";
        } else {
          quickType.querySelector(".krds-in-page-navigation-area").style.display = "none";
        }
      } else {
        sectionLinks = document.querySelectorAll(".scroll-check .section-link");
      }
      if (sectionLinks) {
        const title = document.querySelector(".lnb-btn.lnb-link.active");
        if (title) {
          quickTitle.innerHTML = title.innerHTML;
        } else {
          // lnb가 없는 경우(디자인 토큰 전체보기)
          quickTitle.innerHTML = document.querySelector(".page-title-wrap .h-tit").textContent;
        }
        let list = [];
        sectionLinks.forEach((item, index) => {
          const uniqueIdx = `anchor-${id ? id : "page"}-${index}`
          // console.log(uniqueIdx);
          // const uniqueIdx = `anchor-${index}${Math.random().toString(36).substring(2, 9)}`;
          const text = item.querySelector(".sec-tit")?.innerHTML;
          const activeClass = index === 0 ? `class="active"` : "";
          list.push(`<li><a ${activeClass} href="#${uniqueIdx}" title="페이지 내부 이동">${text}</a></li>`);
          setTimeout(() => {
            item.setAttribute("id", uniqueIdx);
          }, 0);
        });
        quickList.innerHTML = list.join("");
      }
    };
    window.quickNavTab = quickNavTab;

    // 초기 활성화된 탭에 대한 메뉴 생성
    const activeTab = document.querySelector(".tab-conts:not(.sample).active")?.getAttribute("id");
    if (activeTab) {
      setTimeout(() => {
        generateMenu(activeTab);
      }, 500);
    } else {
      generateMenu(false);
    }

    // 기존 탭 클릭 이벤트 제거 및 새 이벤트 추가
    quickTabs.forEach((btn) => {
      const newHandler = () => {
        const id = btn.getAttribute("aria-controls");
        generateMenu(id);
        codeLanguageScroll();
      };

      // 기존 이벤트 리스너 제거
      btn.removeEventListener("click", btn._quickNavTabHandler);

      // 새 이벤트 리스너 추가
      btn.addEventListener("click", newHandler);

      // 핸들러 참조 저장
      btn._quickNavTabHandler = newHandler;
    });
  };

  // breadcrumb
  const breadcrumb = () => {
    // 브레드 스크럼 임시
    const breadcrumbElement = document.querySelector(".breadcrumb");
    if (!breadcrumbElement) return;
    // const getPathText = (selector) => document.querySelector(selector)?.textContent.trim() || "";
    const getPathText = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return "";

      const clone = element.cloneNode(true);
      clone.querySelectorAll(".sr-only").forEach((srOnly) => srOnly.remove());

      return clone.textContent.trim();
    };
    const getPathTextToggle = () => {
      const element = document.querySelector(".lnb-btn.active")?.closest(".lnb-item.active")?.querySelector(".lnb-btn.lnb-toggle");
      return element?.textContent.trim() || "";
    };
    const paths = [
      getPathText(".krds-side-navigation .lnb-tit"),
      ...(getPathTextToggle() ? [getPathTextToggle()] : []),
      // getPathText(".krds-side-navigation .lnb-item.active > .lnb-btn.lnb-toggle"), // exceptionLnb 때문에 작동 안 함
      // getPathText(".krds-side-navigation .lnb-btn.active"),
    ];

    // Generate links
    const generateLinks = (currentPage, currentDir) => {
      const pageParts = currentPage.split("_");
      let link = "";
      let lastLink = "";

      if (pageParts.length === 3) {
        pageParts[pageParts.length - 1] = "01";
        link = `${pageParts[0]}_summary.html`;
        lastLink = `${pageParts.join("_")}.html`;
      } else if (pageParts.length === 2) {
        const dirs = ["utility", "community", "outline", "style"];
        lastLink = dirs.includes(currentDir) ? `${pageParts[0]}_01.html` : `${pageParts[0]}_summary.html`;
      }

      return { link, lastLink };
    };
    const { link, lastLink } = generateLinks(currentPage, currentDir);

    const breadcrumbItems = [`<li class="home"><a href="${basePath}index.html" class="txt">홈</a></li>`];
    const lastIndex = paths.length - 1;
    paths.forEach((path, index) => {
      if (path) {
        const isLast = index === lastIndex;
        breadcrumbItems.push(`<li><a href="${isLast ? lastLink : link}" class="txt">${path}</a></li>`);
      }
    });

    breadcrumbElement.innerHTML = breadcrumbItems.join("");

    // 타이틀 설정 임시
    const pageTitle = document.querySelector(".page-title-wrap .h-tit");
    if (!pageTitle) return;

    const activeLnb = document.querySelector(".krds-side-navigation .lnb-btn.active");
    const mainTitle = activeLnb.getAttribute("data-main-title");
    const subTitle = activeLnb.getAttribute("data-sub-title");

    if (subTitle) {
      pageTitle.innerHTML = subTitle ? `${mainTitle}<span class="badge-text">${subTitle}</span>` : mainTitle;
    } else {
      pageTitle.innerHTML = mainTitle;
    }
  };

  // skipLink
  const skipLink = () => {
    const skip = document.querySelector("#krds-skip-link > a");

    if (!skip) return;

    skip.addEventListener("click", (event) => {
      event.preventDefault();
      if (currentDir === "site") {
        const main = document.querySelector(".contents.main");
        const firstFocus = main.querySelector(`a, button, [tabindex="0"], input, textarea, select`);
        firstFocus.focus();
      } else {
        const home = document.querySelector(".krds-breadcrumb-wrap .home > a");
        home.focus();
      }
    })
  }

  // footerLink
  const footerLink = () => {
    const footerLinks = document.querySelectorAll("#krds-footer >.inner a.krds-btn");

    if (footerLinks.length === 0) return;

    //링크 설정
    footerLinks[0].setAttribute("href", `${basePath}community/community_06.html`); // 온라인 문의
    // footerLinks[1].setAttribute("href", "https://github.com/KRDS-uiux/krds-uiux"); // git
    // footerLinks[2].setAttribute("href", "https://www.figma.com/@krds"); // figma
    footerLinks[3].setAttribute("href", `${basePath}utility/utility_01.html`); // KRDS 소개
    footerLinks[4].setAttribute("href", `${basePath}utility/utility_05.html`); // 이용안내
    footerLinks[5].setAttribute("href", `${basePath}utility/utility_06.html`); // 저작권정책
  };

  const siteModalWrap = () => {
    const body = document.body;
  
    let modalWrap = document.querySelector(".modal-wrap");
    if (!modalWrap) {
      modalWrap = document.createElement("div");
      modalWrap.className = "modal-wrap";
      body.append(modalWrap);
    }

    const modalIds = ["modal_adjust_display", "modal_sample_03"];
    modalIds.forEach((id) => {
      const modal = document.getElementById(id);
      if (modal) {
        modalWrap.appendChild(modal.cloneNode(true));
        modal.remove();
      }
    });
  };
  
  // displaySettings
  const displaySettings = () => {
    const adjustDisplay = document.getElementById("modal_adjust_display");

    if (!adjustDisplay) return;

    // modalBack 투명 처리
    const modalBack = adjustDisplay.querySelector(".modal-back");
    modalBack.style.backgroundColor = "transparent";

    // 화면조정 모달 설정
    const root = document.querySelector("html");
    const scaleOptions = adjustDisplay.querySelectorAll(".scale-options .krds-form-check input[type=radio]");
    const viewModeOptions = adjustDisplay.querySelectorAll(".view-mode-options .krds-form-check input[type=radio]");
    const resetDisplay = document.getElementById("reset_display");

    const defaultScale = adjustDisplay.querySelector("#scale_level_medium");
    const defaultViewMode = adjustDisplay.querySelector("#view_mode_light");
    let selectedScale = 1;
    let selectedViewMode = defaultViewMode.value;

    // root 변수에서 스케일 값을 가져오기
    const rootStyles = getComputedStyle(document.querySelector(":root"));
    const getScaleValue = (scale) => {
      return rootStyles.getPropertyValue(`--krds-zoom-${scale}`).trim();
    };

    // 초기값
    root.setAttribute("data-krds-mode", selectedViewMode);

    // getLocalItem
    const getLocalItem = () => {
      const savedScale = localStorage.getItem("displayScale");
      const savedMode = localStorage.getItem("displayMode");
      if (savedScale) {
        selectedScale = savedScale;
        krds_adjustContentScale.scaleValue(savedScale);
        scaleOptions.forEach((option) => {
          const checkOption = getScaleValue(option.value);
          if (checkOption === savedScale) option.checked = true;
        });
      }
      if (savedMode) {
        selectedViewMode = savedMode;

        // view mode
        if (savedMode === "theme") {
          root.removeAttribute("data-krds-mode");
          // root.style.forcedColorAdjust = "unset";
        } else {
          root.setAttribute("data-krds-mode", savedMode);
          // root.style.forcedColorAdjust = "none";
        }

        viewModeOptions.forEach((option) => {
          if (option.value === savedMode) option.checked = true;
        });
      }
    };
    getLocalItem();

    // setLocalItem
    const setLocalItem = () => {
      localStorage.setItem("displayScale", selectedScale);
      localStorage.setItem("displayMode", selectedViewMode);

      setscaledLayout();
    };

    // setscaledLayout
    const setscaledLayout = () => {
      const zoomLevel = document.body.style.zoom;
      const wrap = document.getElementById("wrap");
      if (window.innerWidth >= 1024 && zoomLevel > 1) {
        wrap.classList.add("krds-scaled-layout");
      } else {
        wrap.classList.remove("krds-scaled-layout");
      }
    };
    setscaledLayout();

    window.addEventListener("resize", () => {
      setscaledLayout();
    });

    // applyDisplay
    const applyDisplay = () => {
      krds_adjustContentScale.scaleValue(selectedScale);

      // view mode
      if (selectedViewMode === "theme") {
        root.removeAttribute("data-krds-mode");
        // root.style.forcedColorAdjust = "unset";
      } else {
        root.setAttribute("data-krds-mode", selectedViewMode);
        // root.style.forcedColorAdjust = "none";
      }

      // 선택한 값을 로컬 스토리지에 저장
      setLocalItem();

      // 새로고침
      // location.reload();
    };

    // scaleOptions
    scaleOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const scale = option.value;
        selectedScale = getScaleValue(scale);
        applyDisplay();
      });
    });

    // viewModeOptions
    viewModeOptions.forEach((option) => {
      option.addEventListener("click", () => {
        selectedViewMode = option.value;
        applyDisplay();
      });
    });

    // resetDisplay
    resetDisplay.addEventListener("click", () => {
      defaultScale.checked = true;
      defaultViewMode.checked = true;

      selectedScale = 1;
      krds_adjustContentScale.scaleValue(selectedScale);

      selectedViewMode = defaultViewMode.value;
      root.setAttribute("data-krds-mode", selectedViewMode);
      // root.style.forcedColorAdjust = "none";

      // 선택한 값을 로컬 스토리지에 저장
      setLocalItem();

      // 새로고침
      // location.reload();
    });
  };

  // tableAutoCaption
  const tableAutoCaption = () => {
    const tables = document.querySelectorAll(".g-conts-area .tbl:not(.manual-caption)");

    if (tables.length === 0) return;

    tables.forEach((item) => {
      if (item.closest(".sr-only")) return;

      const ancestor = item.closest(".section-link");
      const secTitle = ancestor?.querySelector(".sec-tit")?.textContent;
      const parent = item.closest(".g-desc-box") ? item.closest(".g-desc-box") : item.closest(".g-conts-area");
      const conTitle = parent?.querySelector(".con-tit, .g-tit")?.textContent;

      const theadRows = item.querySelectorAll("thead tr");
      const tbodyRows = item.querySelectorAll("tbody tr");
      const theadColumns = [];
      const tbodyColumns = [];
      const caption = item.querySelector("caption");

      theadRows.forEach((row) => {
        const ths = Array.from(row.querySelectorAll("th"));
        ths.forEach((th) => {
          if (!theadColumns) theadColumns = [];
          theadColumns.push(th.innerText.trim());
        });
      });
      tbodyRows.forEach((row) => {
        const ths = Array.from(row.querySelectorAll("th"));
        ths.forEach((th) => {
          if (!tbodyColumns) tbodyColumns = [];
          tbodyColumns.push(th.innerText.trim());
        });
      });
      const titleText = `${secTitle ? secTitle : ""}${conTitle ? ", " + conTitle : ""}${!secTitle && !conTitle ? "이 표는" : "에 대한 표는"}`;
      const theadText = theadColumns.join(", ");
      const tbodyText = tbodyColumns.join(", ");
      let sentence;

      if (tbodyColumns.length > 0 && theadColumns.length > 0) {
        sentence = `${titleText} ${theadText}의 구성으로 이루어져 있으며, 세부 항목으로는 ${tbodyText} 항목을 포함한다.`;
      } else if (theadColumns.length === 0) {
        sentence = `${titleText} ${tbodyText}의 구성으로 이루어져 있다.`;
      } else {
        sentence = `${titleText} ${theadText}의 구성으로 이루어져 있다.`;
      }

      if (caption) {
        caption.textContent = sentence;
      } else {
        const createCaption = document.createElement("caption");
        item.prepend(createCaption);
        createCaption.textContent = sentence;
      }

      // test
      // console.log(item.querySelector("caption").textContent);
    });
  };

  // goTopBtn
  const goTopBtn = () => {
    const contentArea = document.querySelector(".g-wrap #container");
    if (contentArea) {
      const goTopTag = document.createElement("button");
      goTopTag.className = "page-top-button krds-tooltip";
      goTopTag.type = "button";
      goTopTag.innerHTML = `<i class="svg-icon ico-go-top"></i>`;
      goTopTag.setAttribute("data-tooltip", "페이지 상단으로 이동");
      contentArea.append(goTopTag);

      const home = contentArea.querySelector(".breadcrumb .home a");
      const toggleVisibility = () => {
        // if (document.getElementById("wrap").classList.contains("scroll-up")) {
        //   goTopTag.classList.toggle("active", window.scrollY > window.innerHeight * 1.5);
        // } else {
        //   goTopTag.classList.remove("active");
        // }
        goTopTag.classList.toggle("active", window.scrollY > window.innerHeight * 1.5);
      };
      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        home?.focus();
      };
      window.addEventListener("scroll", toggleVisibility);
      goTopTag.addEventListener("click", scrollToTop);
    }
  };

  // emptyAnchor
  const emptyAnchor = () => {
    const tagA = document.querySelectorAll("a");
    tagA.forEach((item) => {
      const href = item.getAttribute("href");
      item.addEventListener("click", (el) => {
        if (href === "#") el.preventDefault();
      });
    });
  };

  // customSelectSize
  const customSelectSize = () => {
    const sortSelect = document.querySelectorAll(".custom-select-size");
    const unit = 18;
    const space = 30;
    let maxWidth;

    const adjustWidth = (select) => {
      const optionWidth = unit * select.options[select.selectedIndex].textContent.trim().length + space;
      const currentWidth = optionWidth > maxWidth ? maxWidth : optionWidth;
      select.style.width = `${currentWidth}px`;
    };

    sortSelect.forEach((select) => {
      maxWidth = select.clientWidth;
      adjustWidth(select);
      select.addEventListener("change", () => adjustWidth(select));
    });
  };

  // guide용 기존 스크립트 동작 막기
  const guideExample = () => {
    const exampleWrap = document.querySelectorAll(".g-example-wrap");
    if (exampleWrap.length === 0) return;

    const addClassToElements = (elements, className) => {
      elements.forEach((el) => el.classList.add(className));
    };

    exampleWrap.forEach((wrap) => {
      // header
      const header = wrap.querySelectorAll("#krds-header");
      header.forEach((item) => {
        item.classList.add("sample");
        // item.querySelector(".krds-main-menu")?.classList.add("sample");
        // item.querySelector(".krds-main-menu-mobile")?.classList.add("sample");
        item.style.zIndex = "1";
        const dropLists = item.querySelectorAll(".krds-drop-wrap");
        dropLists.forEach((item) => {
          item.classList.add("sample");
        });
      });

      // krdsGnbPC
      // const krdsGnbPC = wrap.querySelector(".ex-gnb-pc .krds-main-menu");
      // if (krdsGnbPC) {
      //   const sampleMenu = krdsGnbPC.querySelector(".gnb-menu li:first-child");
      //   sampleMenu.querySelector(".gnb-main-trigger").classList.add("active");
      //   sampleMenu.querySelector(".gnb-toggle-wrap").classList.add("is-open");
      //   sampleMenu.querySelector(".gnb-main-list li:first-child .gnb-sub-trigger").classList.add("active");
      //   sampleMenu.querySelector(".gnb-main-list li:first-child .gnb-sub-list").classList.add("active");
      // }

      // modal
      const modal = wrap.querySelectorAll(".krds-modal:not(#modal_sample_03)");
      modal.forEach((item) => {
        item.classList.add("sample");
        item.querySelector(".modal-dialog").style.width = "100%";
        item.querySelector(".modal-back").style.display = "none";
        const closeButtons = item.querySelectorAll(".close-modal");
        closeButtons.forEach((close) => {
          close.classList.remove("close-modal");
        });
      });
      const modalSample01 = wrap.querySelector("[data-target=modal_sample_01]");
      if (modalSample01) modalSample01.style.display = "none";

      // lnb, quick
      [".krds-side-navigation", ".krds-in-page-navigation-area", ".krds-main-menu", ".krds-main-menu-mobile", "#krds-footer"].forEach((selector) => {
        const elements = wrap.querySelectorAll(selector);
        addClassToElements(elements, "sample");
      });

      // overflow
      // [".calendar-conts", ".krds-contextual-help", ".krds-drop-wrap", ".krds-coach-mark", "modal"].forEach((selector) => {
      //   const elements = wrap.querySelectorAll(selector);
      //   elements.forEach((item) => {
      //     if (item.closest("#krds-header") !== null) return;
      //     item.closest(".g-example-scroll").style.overflow = "unset";
      //   });
      // });
    });
  };

  const keyFilter = {
    init: () => {
      const keyWord = document.getElementById("keyword_search");
      const select = document.getElementById("sortSelect");

      if (keyWord) {
        keyFilter.total();
        keyFilter.exec();
        keyFilter.sortSelect();
      }
      if (select) {
        keyFilter.sortSelect();
      }

      document.getElementById("keyword_search")?.addEventListener("keydown", () => {
        clearTimeout(window.keydownTimer);

        window.keydownTimer = setTimeout(() => {
          const keyword = document.getElementById("keyword_search").value;
          // console.log(keyWord);
          // console.log(keyFilter.isValidInput(keyword));
          if (keyFilter.isValidInput(keyword)) {
            if (keyword.trim() === "") {
              keyFilter.filter();
              keyFilter.total();
              keyFilter.noData("");
            } else {
              keyFilter.filter();
            }
          } else if (keyword === "") {
            keyFilter.filter();
            keyFilter.total();
            keyFilter.noData("");
          }
        }, 500);
      });
    },

    isValidInput: (text) => {
      // 한글, 영문, 숫자 허용
      return /^[가-힣a-zA-Z0-9\s]+$/.test(text);
    },

    filter: () => {
      const keywords = document.getElementById("keyword_search").value.toLowerCase().split(/\s+/).filter(Boolean);
      const list = document.querySelectorAll("#keyword_sch_area .krds-structured-list .search-item");
      const selectBox = document.querySelector("#sortSelect");

      const resetHighlights = () => {
        list.forEach((e) => {
          const textElements = e.querySelectorAll(".c-tit.keyword, .c-txt.keyword, .c-sub-txt.keyword");
          textElements.forEach((el) => {
            el.innerHTML = el.innerHTML.replace(/<span class="keyword">(.*?)<\/span>/gi, "$1"); // 기존 하이라이트 제거
          });
        });
      };

      const highlightKeyword = (el, keyword) => {
        const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false); // 텍스트 노드만 순회
        const nodesToHighlight = [];

        // 텍스트 노드 추출
        while (walk.nextNode()) {
          const node = walk.currentNode;
          if (node.nodeValue.toLowerCase().includes(keyword)) {
            nodesToHighlight.push(node);
          }
        }

        // 텍스트 노드에 하이라이트 처리
        nodesToHighlight.forEach((node) => {
          const parent = node.parentNode;
          const regex = new RegExp(`(${keyword})`, "gi");
          const highlightedHTML = node.nodeValue.replace(regex, '<span class="keyword">$1</span>');
          const wrapper = document.createElement("span");
          wrapper.innerHTML = highlightedHTML;
          parent.replaceChild(wrapper, node);
          while (wrapper.firstChild) {
            parent.insertBefore(wrapper.firstChild, wrapper);
          }
          parent.removeChild(wrapper);
        });
      };

      resetHighlights();

      list.forEach((e) => {
        const textElements = e.querySelectorAll(".c-tit.keyword, .c-txt.keyword, .c-sub-txt.keyword");

        const matchesKeyword = keywords.every((keyword) =>
          Array.from(textElements).some((el) => {
            const text = el.textContent.toLowerCase().trim();
            if (!text) return false; // 빈 텍스트는 무시
            const match = text.includes(keyword);
            if (match) highlightKeyword(el, keyword);
            return match;
          })
        );

        if (!selectBox) {
          matchesKeyword ? e.classList.remove("hide") : e.classList.add("hide");
        } else {
          const selectValue = selectBox.value;
          const matchesSort = selectValue === "all" || Array.from(textElements).some((el) => el.dataset.keyword === selectValue);

          matchesKeyword && matchesSort ? e.classList.remove("hide") : e.classList.add("hide");
        }
      });

      keyFilter.resultTxt(keywords.join(" "));
      keyFilter.total();
      keyFilter.noData(keywords.join(" "));
    },

    total: () => {
      const totalLength = document.querySelectorAll("#keyword_sch_area .krds-structured-list .search-item:not(.hide)").length;
      const totalText = document.querySelector("#keyword_sch_area .sch-info .total");
      totalText.innerText = totalLength;
    },

    noData: (keyword) => {
      const list = document.querySelectorAll("#keyword_sch_area .krds-structured-list .search-item");
      const listLen = list.length;
      const listHide = document.querySelectorAll("#keyword_sch_area .krds-structured-list .search-item.hide");
      const listHideLen = listHide.length;

      const noDataItem = document.querySelector("#keyword_sch_area .no-data");
      if (keyword) noDataItem.querySelector(".keyword").innerText = `"${keyword}" `;

      setTimeout(() => {
        if (listLen === listHideLen) {
          noDataItem.classList.remove("hide");
        } else {
          noDataItem.classList.add("hide");
        }
      }, 50);
    },

    exec: () => {
      const btn = document.querySelector("#keyword_sch_area .btn-exec");
      const input = document.querySelector("#keyword_sch_area .krds-input");

      btn.addEventListener("click", () => {
        keyFilter.filter();
      });

      input.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          keyFilter.filter();
        }
      });
    },

    sortSelect: () => {
      const selectBox = document.querySelector("#sortSelect");

      if (selectBox) {
        const listItems = document.querySelectorAll(".krds-structured-list .search-item");

        selectBox.addEventListener("change", (e) => {
          const selectValue = e.target.value;
          const selectText = e.target.querySelector("option:checked").text;

          listItems.forEach((li) => {
            const badges = li.querySelectorAll(".krds-badge") || li.querySelectorAll(".category");

            let showItem = false;
            badges.forEach((badge) => {
              if (selectValue === "all" || badge.dataset.keyword === selectValue) return (showItem = true);
            });

            !showItem ? li.classList.add("hide") : li.classList.remove("hide");

            keyFilter.noData(selectText);
            keyFilter.total();
          });
        });
      }
    },

    resultTxt: (keyword) => {
      const schInfoTxt = document.querySelector("#keyword_sch_area .sch-info");
      schInfoTxt.closest('.search-list-top').classList.add('result'); //임시: 검색어 입력 후, 디자인변경으로 인한 클래스 추가
      let schInfoResult = "";

      schInfoResult += `
      <li>적용된 검색어 <span class="point keyword">${keyword}</span></li>
      <li><span class="search-result">검색 결과 <span class="point total">10</span>개</span></li>
    `;
      schInfoTxt.innerHTML = schInfoResult;
    },
  };

  // 사용성 가이드라인 체크리스트 필터
  const checkFilter = () => {
    const levelFilter = document.querySelector("#apply-level-filter");
    if (!levelFilter) return;

    const chFilter = () => {
      const checkBoxs = levelFilter.querySelectorAll(".krds-form-check input");
      const checkItems = document.querySelectorAll(".g-filter-list > li");
      const filterItems = document.querySelectorAll(".g-filter-item");

      checkBoxs.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
          const selectedFilters = Array.from(checkBoxs)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.id);

          // 리스트 항목 필터링
          Array.from(checkItems).forEach((item) => {
            const dataType = item.querySelector("span").getAttribute("data-type").split(" ");
            const isVisible = selectedFilters.length === 0 || selectedFilters.some((filter) => dataType.includes(filter));

            item.style.display = isVisible ? item.classList.remove("hide") : item.classList.add("hide");
          });

          // 각 filterItem의 li 요소 중 hide 클래스 개수 체크
          filterItems.forEach((filterItem) => {
            const items = filterItem.querySelectorAll(".g-filter-list li");
            let visibleCount = 0;

            items.forEach((li) => {
              if (!li.classList.contains("hide")) {
                visibleCount++;
              }
            });

            const noData = filterItem.querySelector(".no-data");
            if ( visibleCount == 0 ) {
              if (!noData) {
                const noDataElement = document.createElement("p");
                noDataElement.classList.add("no-data");
                noDataElement.innerText = "선택하신 조건에 맞는 검색결과가 없습니다.";
                filterItem.querySelector(".g-filter-cont").appendChild(noDataElement);
              }
            } else {
              filterItem.querySelector(".no-data")?.remove();
            }
          });
        });
      });
    };

    chFilter();
  };

  //prism 타이틀 추가
  const prismTitle = () => {
    if (typeof Prism !== "undefined") {
      Prism.hooks.add("complete", function (e) {
        const toolbar = e.element.closest(".code-toolbar");

        if (toolbar) {
          const preTag = toolbar.querySelector("pre");
          const dataTitle = preTag.getAttribute("data-title");

          const titleTag = document.createElement("h5");
          titleTag.classList.add("toolbar-title");
          titleTag.textContent = dataTitle ? dataTitle : "코드 예시";
          toolbar.prepend(titleTag);
        }
      });
    }
  };

  // run
  updateTitle();

  initGnb(menuData);
  initGnbMobile(menuData);
  initLnb(menuData);
  exceptionLnb();
  activePage();
  siteGnb();
  siteGnbMobileSearch();
  footerLink();

  guideExample();
  skipLink();
  codeLanguageScroll();
  quickNavTab();
  breadcrumb();
  siteModalWrap();
  displaySettings();
  tableAutoCaption();
  goTopBtn();
  emptyAnchor();

  // 검색필터
  keyFilter.init();
  checkFilter();

  //prism title
  prismTitle();

  setTimeout(() => {
    customSelectSize();
  }, 500);
})();
// e : function

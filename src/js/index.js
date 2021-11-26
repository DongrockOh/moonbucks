// TODO localStorage Read &  Write
// localStorage에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다.
// - [] localStorage에 데이터를 저장한다.
// - [x] 메뉴를 추가할 때
// - [] 메뉴를 수정할 때
// - [] 메뉴를 삭제할 때
// - [] localStorage에 있는 데이터를 읽어온다.

// TODO 카테고리별 메뉴판 관리
// 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다.
// - [] 에스프레소 메뉴판 관리
// - [] 푸라푸치노 메뉴판 관리
// - [] 블렌디드 메뉴판 관리
// - [] 티바나 메뉴판 관리
// - [] 디저트 메뉴판 관리

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// 페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다.
// - [] 페이지가 최초로 로딩될때 LocalStorage에 에스프레소 메뉴를 읽어온다.
// - [] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// - [] 품절 버튼을 추가한다.
// - [] 품절 버튼을 클릭하면 LocalStroage에 상태값이 저장된다.
// - [] 클릭 이벤트에서 가장 가까운 li태그의 class속성 값에 sold-out을 추가한다.

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    localStorage.getItem("menu");
  },
};

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명
  this.menu = [];

  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  // 메뉴 추가 [변수]
  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value;
    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    const template = this.menu
      .map((menuItem, index) => {
        return `
      <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>`;
      })
      .join("");

    $("#espresso-menu-list").innerHTML = template;
    updateMenuCount();
    $("#espresso-menu-name").value = "";
  };

  // 메뉴 수정 [변수]
  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updateMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    this.menu[menuId].name = updateMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updateMenuName;
  };

  // 메뉴 제거 [변수]
  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      updateMenuCount();
    }
  };

  // 메뉴 수정, 삭제 [클릭 이벤트]
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  // 메뉴 전송 기본값 제거 이벤트
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 메뉴 추가 [이벤트]
  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  // 메뉴 엔터로 추가 [이벤트]
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

const app = new App();

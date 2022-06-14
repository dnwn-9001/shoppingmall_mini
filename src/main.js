"use strict";

// Fetch the items from the JSON file
// fetch함수를 통해 data.json의 데이터를 response 객체로 리턴받기
function loadItems() {
  return fetch("../data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

//html로 만든 데이터를 list에 그리기.
function displayItems(items) {
  const container = document.querySelector(".list");
  container.innerHTML = items.map((item) => creatHTMLString(item)).join("");
}

//item데이터를 html의 li 형태로 만들기.
function creatHTMLString(item) {
  return `
        <li class="list__dtl">
            <img src="${item.image}" alt="${item.type}" class="list__thumbnail"/>
            <span class="item__description">${item.gender}, ${item.size}</span>
        </li>
    `;
}

// 버튼 클릭시 카테고리에 맞는 리스트 보여지게하기.
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key; //type
  const value = dataset.value; //tshirt

  if (key == null || value == null) {
    return;
  }

  // container가 매번 업데이트되는 문제.
  const filtered = items.filter((item) => item[key] === value);
  console.log(filtered);
  displayItems(filtered);

  // updateItems(items, key, value);
}

// ** 위의 filtered를 사용하는 방법대신 classList.add/remove 방법을 사용하면
//매번 업데이트하지않고 css를 통해 원하는 것만 보여줄수있음.
// function updateItems(items, key, value) {
//   items.forEach((item) => {
//     if (item[key] === value) {
//       console.log(item);
//       item.classList.add("invisible");
//     } else {
//       item.classList.remove("invisible");
//     }
//   });
// }

function setEventListeners(items) {
  const logo = document.querySelector(".main__img");
  const buttons = document.querySelector(".button");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

//main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log());

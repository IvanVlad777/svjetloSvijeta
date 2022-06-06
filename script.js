"use strict";

// Loading all Data
let dataName = "";
const loadingDataList = function (dataSet, dataNameVar) {
  dataSet.forEach((obj, ind) => {
    const topicHTML = `<div class="topic_name" data-order=${ind}>${obj.topicName}</div>`;
    const rightElement = document.querySelector(`[data-name='${dataNameVar}']`);
    rightElement.children[0].innerHTML += topicHTML;
  });
};
loadingDataList(dogmaticsData, "dogmatics");
loadingDataList(moralData, "moral");
loadingDataList(historyData, "history");
loadingDataList(scriptureData, "scripture");

// Adding elements to variables from HTML

const mainLinks = document.querySelector(".main_links");
const allButtons = document.querySelectorAll(".link_big");
const listDogmatics = document.querySelector(".dogmatics_list");
const listMoral = document.querySelector(".moral_list");
const listHistory = document.querySelector(".history_list");
const listScripture = document.querySelector(".scripture_list");
const expandedTabs = document.querySelectorAll(".content_expanded");
// Hide or show Tabs

mainLinks.addEventListener("click", function (e) {
  const clicked = e.target.closest(".link_big");
  //Guard clause
  if (!clicked) return;
  //Active Button
  const dataType = clicked.dataset.type;
  dataName = clicked.dataset.type;
  document
    .querySelectorAll(".content_tabs")
    .forEach((el) => el.classList.add("hidden"));
  if (!clicked.classList.contains("link_big_active")) {
    allButtons.forEach((b) => b.classList.remove("link_big_active"));
    clicked.classList.add("link_big_active");
    document
      .querySelector(`[data-name="${dataType}"]`)
      .classList.remove("hidden");
  } else {
    allButtons.forEach((b) => b.classList.remove("link_big_active"));
  }
});

const loadQuestions = function (mainEl, dataSet) {
  mainEl.addEventListener("click", function (el) {
    const clicked = el.target.closest(".topic_name");
    if (!clicked) return;
    const rightElement = document.querySelector(`[data-name='${dataName}']`);
    Array.from(mainEl.children).forEach((el) => {
      el.classList.remove("topic_name_selected");
    });
    clicked.classList.add("topic_name_selected");
    rightElement.children[1].innerHTML = "";
    rightElement.children[1].innerHTML += `<h3>${
      dataSet[`${clicked.dataset.order}`].topicName
    }</h3>`;
    dataSet[`${clicked.dataset.order}`].topicQuestions.forEach((qu, ind) => {
      const questionAnswerHTML = `
          <div class="question_answer" data-questionnum="${ind}">
            <div class="question">${qu.qText}</div>
            <div class="answer hidden">${qu.qAnswer}</div>
          </div>`;
      rightElement.children[1].innerHTML += questionAnswerHTML;
    });
  });
};
loadQuestions(listDogmatics, dogmaticsData);
loadQuestions(listMoral, moralData);
loadQuestions(listHistory, historyData);
loadQuestions(listScripture, scriptureData);

expandedTabs.forEach((tab) => {
  tab.addEventListener("click", function (e) {
    const clicked = e.target.closest(".question_answer");
    if (!clicked) return;
    clicked.children[1].classList.toggle("hidden");
  });
});
